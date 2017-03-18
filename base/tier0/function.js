"use strict";

const _ = require ('underscore')

/*  Useful for debugging and tests
    ======================================================================== */

_.debugEcho = function () { return [this].concat (_.asArray (arguments)) }


/*  Context-free version of fn.call (for consistency)
    ======================================================================== */

_.call = function (fn, this_, ...args) { return fn.apply (this_, args) }

/*  Limits function to given number of arguments
    ======================================================================== */

_.arity = function (N, fn) { return function (...args) {
                                        return fn.apply (this, args.slice (0, N)) }}

_.arity0 = function (fn) { return function () {
                                    return fn.call (this) }}

_.arity1 = function (fn) { return function (a) {
                                    return fn.call (this, a) }}

_.arity2 = function (fn) { return function (a, b) {
                                    return fn.call (this, a, b) }}

_.arity3 = function (fn) { return function (a, b, c) {
                                    return fn.call (this, a, b, c) }}

_.arityFn = function (N) { return _['arity' + N] }


/*  A version of _.partial that binds to tail of argument list
    ======================================================================== */

_.tails = $restArg (function (fn, ...tailArgs) {
                                        return function () {
                                            return fn.apply (this, _.asArray (arguments).concat (tailArgs)) }})

_.tails2 = $restArg (function (fn, ...tailArgs) {
                                        return function (a) {
                                            return fn.apply (this, [a].concat (tailArgs)) }})

_.tails3 = $restArg (function (fn, ...tailArgs) {
                                        return function (a, b) {
                                            return fn.apply (this, [a, b].concat (tailArgs)) }})


/*  Userful for higher order operations
    ======================================================================== */

_.withTest (['function', 'calls / tails'], function () {

    var fn       = _.debugEcho
    var  foo42_  = _.callsWith ('foo', 42)
    var _foo42   = _.tailsWith ('foo', 42)

    var foo42_fn =   foo42_ (fn)
    var fn_foo42 =  _foo42  (fn)

    var _fn       = _.callsTo (fn)
    var  fn_      = _.tailsTo (fn)
    var fn_bar24  =  fn_ ('bar', 24)
    var bar24_fn  = _fn  ('bar', 24)

    $assert (foo42_fn.call ('lol', 777), ['lol', 'foo', 42, 777])
    $assert (bar24_fn.call ('lol', 777), ['lol', 'bar', 24, 777])

    $assert (fn_foo42.call ('lol', 777), ['lol', 777, 'foo', 42])
    $assert (fn_bar24.call ('lol', 777), ['lol', 777, 'bar', 24])

    $assertEveryCalledOnce (function (mkay) {
        _.argumentPrependingWrapper (fn, function (fn) {
            $assert (fn (777), ['lol', 777, 'foo', 42]); mkay () }).call ('lol', 'foo', 42) })

}, function () {

    _.callsTo = function (fn) {
                    return $restArg (function () {
                        return _.callsWith.apply (null, arguments) (fn) }) }

    _.tailsTo = function (fn, then) {
                    return $restArg (function () {
                        return _.tailsWith.apply (null, arguments) (fn) }) }

    _.callsWith = $restArg (function (/* args */) { var args = _.asArray (arguments)
                                        return function (fn) {
                                            return _.withSameArgs (fn, function () {
                                                return fn.apply (this, args.concat (_.asArray (arguments))) }) } }) // @hide


    _.tailsWith = $restArg (function (/* args */) { var args = _.asArray (arguments)
                                        return function (fn) {
                                            return _.withSameArgs (fn, function () {
                                                return fn.apply (this, _.asArray (arguments).concat (args)) }) } }) // @hide

    _.argumentAppendingWrapper = function (fn, then) {
        return _.withSameArgs (fn, function () { var this_ = this, args = _.asArray (arguments)
                                        return then (function () {
                                            return fn.apply (this_, args.concat (_.asArray (arguments))) }) }) } // @hide

    _.argumentPrependingWrapper = function (fn, then) {
        return _.withSameArgs (fn, function () { var this_ = this, args = _.asArray (arguments)
                                        return then (function () {
                                            return fn.apply (this_, _.asArray (arguments).concat (args)) }) }) } }) // @hide


/*  binding to constructor arguments (cannot do this with bind/partial)
    ======================================================================== */

_.new = $restArg (function (Constructor, a, b, c, d) {
            switch (arguments.length) {
                case 1: return new Constructor ()
                case 2: return new Constructor (a)
                case 3: return new Constructor (a, b)
                case 4: return new Constructor (a, b, c)
                case 5: return new Constructor (a, b, c, d)
                default: _.notImplemented () } })

/*  Flips function signature (argument order)
    ======================================================================== */

_.flipN = function (fn) { return $restArg (function () {
             return fn.apply (this, _.asArray (arguments).reverse ()) })}

_.flip = function (fn) {
            if (_.restArg (fn)) { return _.flipN (fn) }
            else { switch (_.numArgs (fn)) {
                                    case 0:
                                    case 1: return fn
                                    case 2: return _.flip2 (fn)
                                    case 3: return _.flip3 (fn)
                                    default: throw new Error ('flip: unsupported arity') } } }

_.flip2 = function (fn) { return function (a, b) {
                                    return fn.call (this, b, a) }}

_.flip3 = function (fn) { return function (a, b, c) {
                                    return fn.call (this, c, b, a) }}

/*  Logical composition operators
    ======================================================================== */

_.or = function (a, b) { return function () {
        return a.apply (this, arguments) || b.apply (this, arguments) }},

_.and = function (a, b) { return function () {
        return a.apply (this, arguments) && b.apply (this, arguments) }},

_.not = function (x) { return function () {
        return !x.apply (this, arguments) } }

/*  Y combinator (for anonymous recursive functions)
    ======================================================================== */

_.withTest (['function', 'Y combinator'], function () {

    var countTo5 = _.Y (function (self) {
        return function (n) {
            return n >= 5 ? n : self (n + 1) } })

    $assert (countTo5 (0), 5) }, function () { _.extend (_, {

    Y: function (eatSelf) {
        var self = eatSelf (function () {
            return self.apply (this, arguments) }); return self } }) });


/*  converts regular things like map/zip to hyper versions, that traverse
    deep structures (tested later, via its derivatives: zipZip/mapMap etc)
    ======================================================================== */

/*  Operator argument is the thing that walks down the tree and transforms it.
    But its predicate gets called only on the leaves of a tree (end values).

    Essentially, it abstracts you from structure, making it 'transparent'
    for any kind of previously defined one-dimensional operators like
    map/filter/zip/reduce/etc.

    Example:    hyperMap = _.hyperOperator (_.unary,  _.map2)
                hyperZip = _.hyperOperator (_.binary, _.zip2)
 */

 (function () {

    /*  N number denotes how many arguments underlying operation accepts
     */
    _.hyperOperator = function (N, operator, diCaprioPredicate, nonTrivial) {
                                                                          var arity            = _.arityFn (N)       || _.identity
                                                                          var weNeedToGoDeeper =  (diCaprioPredicate || _.goDeeperWhenFirstArgumentIsGood) (N, nonTrivial || _.isNonTrivial)
                            return function () {                          var subOperator      = _.last (arguments)
                                return _.Y (function (hyperOperator_) {   var hyperOperator    = _.tails (operator, arity (hyperOperator_))
                                    return function () {
                                        return (weNeedToGoDeeper (arguments) ?
                                                    hyperOperator :
                                                    subOperator)
                                                        .apply (this, arguments) } }).apply (this, _.initial (arguments)) } }

    /*  Combinatoric complexity classifiers for exact configuration of hyperOperator behavior
     */
    _.goDeeperWhenFirstArgumentIsGood= function (N, canGoDeeper) { 
        return function (args) { return   (args.length > 0) ? canGoDeeper (args[0]) : false } }

    _.goDeeperAlwaysIfPossible= function (N, canGoDeeper) {
             if (N === 0) {                          return _.constant (false)                                }
        else if (N === 1) { return function (args) { return   canGoDeeper (args[0])                           } }
        else if (N === 2) { return function (args) { return   canGoDeeper (args[0]) || canGoDeeper (args[1])  } }
        else              { return function (args) { return _.some (_.asArray (args),  canGoDeeper)           } } }

    _.goDeeperOnlyWhenNessesary = function (N, canGoDeeper) {
             if (N === 0) {                          return _.constant (false)                                }
        else if (N === 1) { return function (args) { return   canGoDeeper (args[0])                           } }
        else if (N === 2) { return function (args) { return   canGoDeeper (args[0]) && canGoDeeper (args[1])  } }
        else              { return function (args) { return _.every (_.asArray (args), canGoDeeper)           } } }

    _.isTrivial = function (x) { return            _.isEmpty (x) || _.isString (x) || _.isNumber (x) || (x instanceof RegExp) || (x instanceof Date) ||
                                        !(_.isStrictlyObject (x) || _.isArray (x)) || _.isPrototypeInstance (x) || _.isMeta (x) }

    _.isMeta = _.constant (false)

    _.isNonTrivial = _.not (_.isTrivial)

    /*  Self-descriptive constants (for clarity)
     */
    _.binary = 2
    _.unary  = 1 }) ()

/*  Generates higher order stuff from regular routine
    ======================================================================== */

_.withTest (['function', 'higherOrder'], function () {

        var file = []
        var write = function (x) { file.push (x) }
        var writes = _.higherOrder (write)

        _.times (3, writes ('foo'))

        $assert (file, ['foo', 'foo', 'foo']) }, function () {

    _.higherOrder = _.callsTo })

/*  coerces x|fn()→x to x (useful for configuration parameters)
    ======================================================================== */

_.deferTest (['function', 'eval/evals'], function () {

        var cfg = {
            value1: 42,
            value2: function () { return 42 },
            value3: _.property ('number')
        }

        var evl = _.evals ({ number: 42 }) // higher order

        $assert (_.eval (cfg.value1), _.eval (cfg.value2), evl (cfg.value3), 42) }, function () {

    _.eval = function (x) {
                return _.isFunction (x) ? x.call (this) : x  }

    _.evals = function (__args__) {
                var arguments_ = arguments
                return function (x) {
                    return _.isFunction (x) ? x.apply (this, arguments_) : x } } })

/*  in rhyme with _.property, this one calls a method
    ======================================================================== */

_.method = function (name, ...args) {
                    return function (obj) {
                        return obj[name].apply (obj, args) } }

/*  Converts between calling conventions
    ======================================================================== */

_.asFreeFunction = function (fn) { return function (this_, ...args) {
                                            return fn.apply (this_, args) } }

_.asMethod = function (fn) { return function () {
                                        return fn.apply (undefined, [this].concat (_.asArray (arguments))) } } // @hide


/*  _.once
    ======================================================================== */

_.withTest (['function', 'once'], function () {

    $assertEveryCalledOnce (function (mkay) {
        var f = _.once (function () { mkay () })
        f ()
        f () }) },                                          function () {

    _.once = function (fn) {
                var called = false
                return function () {
                    if (!called) { called = true
                        return fn.apply (this, arguments) } } } })

/*  _.withTimeout
    ======================================================================== */

_.deferTest (['function', 'withTimeout'], function (testDone) {

    _.withTimeout ({
        maxTime: 10,
        expired: function () { $fail } },
        function (done) { done () })

    _.withTimeout ({
        maxTime: 10,
        expired: function (then) { testDone () } },
        function (done) { _.delay (done, 20) },
        function () { // 'then' should not be called if expired (though you may call it explicitly at expired() callback)
            $fail })

}, function () {

    _.withTimeout = function (cfg, what, then) {
        var expired = false
        var timeout = setTimeout (function () {
            expired = true
            if (cfg.expired) {
                cfg.expired (then) } }, cfg.maxTime)

        what (function () {
            if (!expired) {
                clearTimeout (timeout)
                if (then) {
                    then.apply (this, arguments) } } }) } })

/*  Sequential composition operator (inverted _.compose, basically)
    ======================================================================== */

_.withTest (['function', 'sequence / then'], function () {

        var context = { foo: 'bar' }

        var makeCookies = function (from) { $assert (this === context)
            return 'cookies from ' + from }

        var eatCookies = function (cookies) { $assert (this === context)
            return 'nice ' + cookies }

        var lifeProcess = makeCookies.then ?                            // available in both notations
                                makeCookies.then (eatCookies) :
                                _.then (makeCookies, eatCookies)

        var anotherWay = _.sequence (makeCookies, eatCookies)
        var wayAnother = _.sequence ([makeCookies, eatCookies])

        $assert (lifeProcess.call (context, 'shit'), 'nice cookies from shit')
        $assert (anotherWay.call  (context, 'shit'), 'nice cookies from shit')
        $assert (wayAnother.call  (context, 'shit'), 'nice cookies from shit')

        $assert (_.sequence ([]).call (context, 'foo'), 'foo')

        var plusBar = _.then (function (x) { return Promise.resolve (x) },
                              function (x) { return x + 'bar' })

        return plusBar ('foo').then (function (x) { $assert (x, 'foobar') })

    }, function () {

        _.sequence = function (arg) { // was _.flip (_.compose) before... but it needs performance
            var chain = _.isArray (arg) ? arg : _.asArray (arguments)
            var length = chain.length
            return (length === 0) ? _.identity : function (x) {
                for (var i = 0; i < length; i++) { x = chain[i].call (this, x) }
                return x } }

        _.seq = _.sequence

        _.then = function (fn1, fn2) { return function (args) {
                                                var r = fn1.apply (this, arguments)
                                                return (r instanceof Promise)
                                                            ? r.then (fn2.bind (this))
                                                            : fn2.call (this, r) }} })


