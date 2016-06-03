/*  Promise-centric extensions
    ======================================================================== */

_.tests['Promise+'] = {

/*  ------------------------------------------------------------------------ */

    promisify: function () {

    /*  Example object  */

        var fs = {

        /*  Shouldn't be converted  */

            42: 42,
            dontTouchMe:  function () { $assert (arguments.length === 0); return 42 },
            dontTouchMe2: function () { $assert (arguments.length === 0); return 42 },
            readFileSync: function () { $assert (arguments.length === 0); return 42 },

        /*  Will be promisified */

            readFile: function (path,   callback) { $assert (this === fs)
                            if (path) { callback (null, 'contents of ' + path) }
                                 else { callback ('path empty') } } }

    /*  Run     */

        fsAsync = Function.promisifyAll (fs, { except: _.endsWith.$$ ('Sync').or (['dontTouchMe', 'dontTouchMe2'].asSet.matches) })

    /*  Check if 'except' worked successfully */

        $assert (fsAsync.dontTouchMe (),
                 fsAsync.dontTouchMe2 (),
                 fsAsync.readFileSync (), fsAsync['42'], 42)

    /*  Check if 'readFile' converted successfully */

        return __.all ([    fsAsync.readFile (null) .assertRejected ('path empty'),
                            fsAsync.readFile ('foo').assert         ('contents of foo') ]) },


/*  ------------------------------------------------------------------------ */

    __: function () { var adds = function (a, b) {
                                    return function (x, y) { return [x + a, y + b] } }
        return [
            __(123).assert (123),
            __(Promise.resolve (123)).assert (123),
            __(function () { return 123 }).assert (123),
            __(function () { throw 123 }).assertRejected (123),
            __(adds ('foo', 'bar'), 123, 456).assert (['123foo', '456bar']) ] },

/*  ------------------------------------------------------------------------ */

    seq: function () { return [
                            __.seq (123).assert (123),
                            __.seq (_.constant (123)).assert (123),
                            __.seq ([123, 333]).assert (333),
                            __.seq ([Promise.resolve (123), Promise.resolve (333)]).assert (333),
                            __.seq ([123, _.constant (333)]).assert (333),
                            __.seq ([123, __.constant (333)]).assert (333),
                            __.seq ([123, __.rejects ('foo')]).assertRejected ('foo'),
                            __.seq ([123, __.delays (0), _.appends ('bar')]).assert ('123bar')
                        ] },

/*  ------------------------------------------------------------------------ */

    map: function () {
            return [
                        __.map (       111 ,   _.appends ('bar')).assert (       '111bar'),
                        __.map (      [222],   _.appends ('bar')).assert (      ['222bar']),
                        __.map (    __(333),   _.appends ('bar')).assert (       '333bar'),
                        __.map ({ foo: 444 },  _.appends ('bar')).assert ({ foo: '444bar' }),
                        __.map ({ foo: 555 }, __.constant ('bar')).assert ({ foo: 'bar' }) ] },

/*  ------------------------------------------------------------------------ */

    filter: function () {
            return [
                        __.filter (123, 456).assert (456),
                        __.filter (['foo', 456], _.isString).assert (['foo']),
                        __.filter (['foo', 456], _.constant ('baz')).assert (['baz', 'baz']),
                        __.filter ({ foo: 123, bar: '456' }, _.isNumber).assert ({ foo: 123 })
                    ] },

/*  ------------------------------------------------------------------------ */

    each: function () {

        var pairs = function (input) { var pairs = []
                        return __.each (input, function (x, i) { pairs.push ([x, i]) })
                                    .then (_.constant (pairs)) }

        return [    pairs ()         .assert ([]),
                    pairs (undefined).assert ([]),

                    pairs (42).assert ([[42, undefined]]),
                    
                    pairs ([    42,    48]) .assert ([[42,  0],  [48,  1 ]]),
                    pairs ({ 0: 42, 1: 48 }).assert ([[42, '0'], [48, '1']]),

                    __.each ([1,2], _.throws ('foo')).assertRejected ('foo') ] }

/*  END OF TESTS ----------------------------------------------------------- */

}


/*  IMPLEMENTATION
    ======================================================================== */

TimeoutError = $extends (Error, { message: 'timeout expired' })                                

__ = Promise.coerce = function ( x) { var this_ = this,
                                          args = _.rest (arguments)

                        return ((x instanceof Promise)   ?  x :
                               ((x instanceof Function)  ?  new Promise (function (resolve) { resolve (x.apply (this_, args)) }) : // @hide
                                                            Promise.resolve (x))) }

__.noop = function () {
            return Promise.resolve () }

__.identity = function (x) {
                return Promise.resolve (x) }

__.constant = function (x) {
                return function () {
                    return Promise.resolve (x) } }

__.reject = function (e) { return Promise.reject (e) }
__.rejects = function (e) { return function () { return Promise.reject (e) } }

__.scatter = function (x, fn) {

            return __.then (x, function (x) {

                if (_.isStrictlyObject (x)) {

                    var result = _.coerceToEmpty (x),
                        tasks = []

                    _.each2 (x, function (v, k) {
                                    tasks.push (__(fn, v, k, x).then (
                                        function (vk) {
                                            if (vk instanceof Array) {
                                                result[vk.second] = vk.first }
                                            else if (vk !== undefined) {
                                                if (result instanceof Array) {
                                                    result.push (vk) }
                                                else {
                                                    result[k] = vk } } })) })

                    return __.all (tasks).then (_.constant (result)) }

                else {
                    return __(fn, x, undefined, x).then (function (vk) {
                                                            return (vk instanceof Array) ? vk.first : vk }) } }) }

__.map = function (x, fn) {
            return __.scatter (x, __.$ (fn)) }

__.filter = function (x, fn) {
                return __.scatter (x, function (v, k, x) {
                                        return __(fn, v, k, x).then (
                                            function (decision) {
                                                return ((decision === false) ? undefined :
                                                       ((decision === true)  ? v
                                                                             : decision)) }) }) }

__.each = function (obj, fn) {
                return __.then (obj, function (obj) {
                    return new Promise (function (complete, whoops) {
                                        _.cps.each (obj, function (x, i, then) {
                                                            __(fn (x, i))
                                                                .then (then)
                                                                .catch (whoops) }, complete) }) }) }

__.then = function (a, b) { return __(a).then (_.coerceToFunction (b)) }

__.seq = function (seq) {
            return __(_.reduce2 (seq, __.then)) }

__.all = function (x) {
            return Promise.all (x) }

__.delay = function (ms) { return __.delays (ms) () }

__.delays = function (ms) {
                return function (x) {
                    return new Promise (function (return_) { setTimeout (function () { return_ (x) }, ms || 0) }) } }

$mixin (Array, {

    race: $property (function () { return Promise.race (this) })
})

$mixin (Promise, {

    race: function (other) { return [this, other].race },
    reject: function (e) { return this.then (_.throwsError (e)) },
    delay: function (ms) { return this.then (__.delays (ms)) },
    timeout: function (ms) { return this.race (__.delay (ms).reject (new TimeoutError ())) },
    now: $property (function () { return this.timeout (0) }),
    log: $property (function () { return this.then (function (x) { log (x); return x }, log.e.then (_.throwError)) }),
    alert: $property (function () { return this.then (alert2, alert2.then (_.throwError)) }),

    chain: function (fn) { return this.then (function (x) { fn (x); return x; }) },

    done: function (fn) { return this.then (function (x) { return fn (null, x) },
                                            function (e) {        fn (e, null); throw e }) },

    finally: function (fn) { return this.then (function (x) { return fn (null, x) },
                                               function (e) { return fn (e, null) }) },

    /*state: $property (function () {
                        return this.then (
                            function (x) { return { state: 'fulfilled', fulfilled: true, value: x } },
                            function (e) { return { state: 'rejected', rejected: true, value: x } }).now.catch (function () {
                                           return { state: 'pending', pending: true } }) }),*/

    assert: function (desired) {
                return this.then (function (x) { $assert (x, desired); return x }) },

    assertTypeMatches: function (desired) {
                return this.then (function (x) { $assertTypeMatches (x, desired); return x }) },

    assertRejected: function (desired) { var check = (arguments.length > 0)
                        return this.catch (function (x) { if (check) { $assert (x, desired) } return x }) },

    panic: $property (function () {
                return this.catch (function (e) { ($global.Panic || $global.log) (e); throw e }) })
})

$mixin (Function, {
    
    promisifyAll: $static (function (obj, cfg) { var cfg    = cfg || {},
                                                     except = cfg.except || _.noop

                                if (except instanceof Array) {
                                    except = except.asSet.matches }

                                var result = {}

                                for (var k in obj) {
                                    var x = obj[k]
                                    if (x instanceof Function) {
                                        var fn = x.bind (obj)
                                        result[k] = except (k) ? fn : fn.promisify }
                                    else {
                                        result[k] = x } }

                                return result }),

    promisify: $hidden ($property (
                            function () {            var f    = this
                                return function () { var self = this, args = arguments
                                    return new Promise (function (resolve, reject) {
                                        f.apply (self, _.asArray (args).concat (function (err, what) {
                                                                                      if (err) { reject (err) }
                                                                                                 resolve (what) })) }) } })) })

