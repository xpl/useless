/*  Promise-centric extensions (SKETCH)
    ======================================================================== */

TimeoutError = $extends (Error, { message: 'timeout expired' })                                

__ = Promise.coerce = function (x) {
                        return ((x instanceof Promise)   ?  x :
                               ((x instanceof Function)  ?  new Promise (function (resolve) { resolve (x ()) }) : // @hide
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

__.safe = function (fn) {
            return function () {
                        try     { return Promise.resolve (fn.apply (this, arguments)) }
                      catch (e) { return Promise.reject (e) } } }

__.map = __.safe (function (x, fn) {

                    if (_.isStrictlyObject (x)) {

                        var result = _.coerceToEmpty (x),
                            tasks = []

                        _.each2 (x, function (v, k) {
                            tasks.push (__.identity (fn (v, k)).then (function (v) { result[k] = v })) })

                        return __.all (tasks).then (_.constant (result)) }

                    else {
                        return fn (x) } })

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
    log: $property (function () { return this.then (log, log.e.then (_.throwError)) }),
    alert: $property (function () { return this.then (alert2, alert2.then (_.throwError)) }),

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

    assertRejected: function (desired) { var check = (arguments.length > 0)
                        return this.catch (function (x) { if (check) { $assert (x, desired) } return x }) },

    panic: $property (function () {
                return this.catch (function (e) { ($global.Panic || $global.log) (e); throw e }) })
})

$mixin (Function, {
    
    promisifyAll: $static (function (obj, cfg) { var except = new Set ((cfg || {}).except || [])
                                return _.map2 (obj, function (x, k) {
                                    if (x instanceof Function) {
                                        var fn = x.bind (obj)
                                        return except.has (k) ? fn : fn.promisify }
                                    else {
                                        return x } }) }),

    promisify: $hidden ($property (
                            function () {            var f    = this
                                return function () { var self = this, args = arguments
                                    return new Promise (function (resolve, reject) {
                                        f.apply (self, _.asArray (args).concat (function (err, what) {
                                                                                      if (err) { reject (err) }
                                                                                                 resolve (what) })) }) } })) })

if ($platform.NodeJS) {
    $global.requirePromisified = function (module, cfg) {
                                    return Function.promisifyAll (require (module), cfg) } }

_.tests['Promise'] = {

    'promisify': function () {

        var fs = {
            42: 42,
            dontTouchMe: function () { return 42 },
            readFile: function (path,   callback) { $assert (this === fs)
                            if (path) { callback (null, 'contents of ' + path) }
                                 else { callback ('path empty') } } }

        fsAsync = Function.promisifyAll (fs, { except: ['dontTouchMe'] })

        $assert (fsAsync.dontTouchMe (), fsAsync['42'], 42)

        return __.all ([    fsAsync.readFile (null) .assertRejected ('path empty'),
                            fsAsync.readFile ('foo').assert         ('contents of foo') ]) },

    'seq/map': function () {
                        return __.all ([
                                    __.seq (123).assert (123),
                                    __.seq (_.constant (123)).assert (123),
                                    __.seq ([123, 333]).assert (333),
                                    __.seq ([123, _.constant (333)]).assert (333),
                                    __.seq ([123, __.constant (333)]).assert (333),
                                    __.seq ([123, __.rejects ('foo')]).assertRejected ('foo'),
                                    __.seq ([123, __.delays (0), _.appends ('bar')]).assert ('123bar'),
                                    __.map (       123 ,   _.appends ('bar')).assert (       '123bar'),
                                    __.map (      [123],   _.appends ('bar')).assert (      ['123bar']),
                                    __.map ({ foo: 123 },  _.appends ('bar')).assert ({ foo: '123bar' }),
                                    __.map ({ foo: 123 }, __.constant ('bar')).assert ({ foo: 'bar' }) ]) }
}

