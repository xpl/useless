/*  Function extensions
    ======================================================================== */

_.tests.Function = {

    '$ for partial application': function () {
             var sum = function (a, b) { return a + b }
        $assert (sum.$ (5) (42), 47) },

    'Fn.callsWith': function () {
        $assert (42, (function (a,b,c) {
                      $assert ([a,b,c],
                               [1,2,3]); return 42; }).callsWith (1,2) (3)) },

    /*  Converts regular function (which returns result) to CPS function (which passes result to 'then')
     */
    'asContinuation': function () { $assertEveryCalled (function (mkay__2) {

        var twoPlusTwo   = function () { return 2 + 2 }
        var shouldBeFour = function (result) {
            $assert (result == 4)
            mkay__2 () }

        twoPlusTwo.asContinuation (shouldBeFour)
        _.asContinuation (twoPlusTwo) (shouldBeFour) }) },

    /*  Postpones execution
     */
    'postpone': function (testDone) {
        $assertEveryCalledOnce ($async (function (mkay1, mkay2) { var testSecondCall = false
            var callMeLater = function () {
                if (testSecondCall) {
                    mkay2 ()
                    testDone () }
                else {
                    mkay1 ()
                    testSecondCall = true
                    callMeLater.postpone () } } // should be postponed again
            callMeLater.postpone ()
            callMeLater.postpone () })) },       // should not trigger double call

    'postponed': function (testDone) {
        $assertEveryCalledOnce ($async (function (mkay) {
            (function (_42) { $assert (42, _42); mkay (); }).postponed (42) }), testDone) },

    /*  Returns function that executed after _.delay
     */
    'delayed': function (testDone) {
        var eat42           = function (_42, then) { $assert (_42, 42); then () }
        var eat42_after5ms  = eat42.delayed (5)

        $assertEveryCalledOnce ($async (function (mkay) {
            eat42_after5ms (42, function () { mkay () }) }), testDone) } }

/*  Impl.
 */
$extensionMethods (Function, {

    $:     $method (_.partial),
    bind:           _.bind,
    partial:        _.partial,
    tails:          _.tails,
    tails2:         _.tails2,
    tails3:         _.tails3,
    compose:        _.compose,
    then:           _.then,
    flip:           _.flip,
    with_:          _.flipN,
    flip2:          _.flip2,
    flip3:          _.flip3,
    asFreeFunction: _.asFreeFunction,
    asMethod:       _.asMethod,

    callsWith: _.callsTo,
    tailsWith: _.tailsTo,

    returns: function (              fn,                                returns) {
                return function () { fn.apply (this, arguments); return returns } },
                                                
    asPromise: function (       f) {
            return new Promise (f) },

    asContinuation: function (f) {
        return $restArg (function () { _.last (arguments) (f.apply (this, _.initial (arguments))) }) },

    wraps: function (f, w) { f._wrapped = _.withSameArgs (f, w); return f },
    wrapped: function (f) { return f._wrapped || f },
    original: function (f) {  while (f && f._wrapped) {
                                     f  = f._wrapped } return f },

    arity0:         _.arity0,
    arity1:         _.arity1,
    arity2:         _.arity2,
    arity3:         _.arity3,

    or:     _.or,
    and:    _.and,
    not:    _.not,

    applies: _.applies,

    new_: _.new_,

    oneShot: function (fn) { var called = false
        return function () {   if (!called) {
                                    called = true; return fn.apply (this, arguments) } } },

    memoized: _.memoize,
    throttled: _.throttle,
    
    debounced: function (func, wait, immediate) {
        
        var timestamp, timeout, result, args, context
        var later = function () {
            var last = Date.now () - timestamp
            if (last < wait && last > 0) {
                timeout = setTimeout (later, wait - last) }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply (context, args)
                    if (!timeout) {
                        context = args = null } } } }

        var debouncedFn = function() {
            context = this
            args = arguments
            timestamp = Date.now()
            var callNow = immediate && !timeout
            if (!timeout) {
                timeout = setTimeout(later, wait) }
            if (callNow) {
                result = func.apply(context, args)
                context = args = null }
            return result }

        debouncedFn.cancel = function () {
            if (timeout) {
                clearTimeout (timeout)
                timeout = null } }

        debouncedFn.callImmediately = function () { // cancels timeout (set by fn.debounced/fn.throttled) and calls immediately
            debouncedFn.cancel ()
            func.apply (context, args) }

        return debouncedFn },

    postpone: $method (function (fn) { fn.postponed.apply (null, arguments) }),

    postponed: function (fn) {
        return function () {               var args  = arguments, this_ = this
            if (!fn._postponed) {      fn._postponed = true
                _.delay (function () { fn._postponed = false
                    fn.apply (this, args) }) } } },

    delay: _.delay,
    delayed: function (fn, time) {
        return function () {
            var args = arguments, context = this
            _.delay (function () { fn.apply (context, args) }, time) } } })


/*  A functional try/catch
    ======================================================================== */

_.tests.Function.catches = function () {

    $assert (           'yo',
         _.constant    ('yo').catches ($fails) (),
         _.identity          .catches ($fails) ('yo'),
         _.throwsError ('xx').catches          ('yo')   ())

    $assertThrows (function () {
        _.constant ('yo').catches (function () { $assert ('catch handler shoudnt work on passed continuations') }, _.throwsError ('xx')) () })

    $assert ((function (x) { throw x }).catches (
                                            _.appends ('+error_case'),
                                            _.appends ('+no_error_case'),
                                            _.appends ('+finally')) ('foo'), 'foo+error_case+finally')

    $assertMatches (
         _.throwError.catches () ('yo'), {
                         message: 'yo' })

    $assert (_.catches (_.throwsError (  42 ), $assertMatches
                          .$ ({ message: 42 })
                              .returns ('yo')) (),
                                        'yo')

    $assertCPS (_.constant ('yo').catches ($fails),
                            'yo') }

$extensionMethods (Function, { catch_:  function (fn, catch_, then, finally_) { return fn.catches (catch_, then) () },
                               catches: function (fn, catch_, then, finally_) {
                                                              var args = arguments.length
                                                        catch_ = (args > 1 ? _.coerceToFunction (catch_)   : _.identity)
                                                         then  = (args > 2 ? _.coerceToFunction (then)     : _.identity)
                                                    finally_   = (args > 3 ? _.coerceToFunction (finally_) : _.identity)
                                          return function () {     var result = undefined, catched = false
                                                      try          {   result = fn.apply (this, arguments) }
                                                      catch (e)    {   result = catch_ (e); catched = true }
                                                     if (!catched) {   result = then (result) }
                                                  return finally_  (   result) } } })


if (typeof Promise !== 'undefined') {
    Promise.prototype.done = function (resolve, reject) {
        return this.then (resolve, reject)
                   .catch (_.globalUncaughtExceptionHandler || _.throws) } }







