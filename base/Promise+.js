/*  Promise-centric extensions (SKETCH)
    ======================================================================== */

Promise.prototype.seq = function (seq) {
                            return _.reduce2 (this, seq, function (a, b) { return a.then (b) }) }

Promise.prototype.assert = function (desired) {
                                return this.then (function (x) { $assert (x, desired); return x }) }

Promise.prototype.assertRejected = function (desired) { var check = (arguments.length > 0)
                                        return this.catch (function (x) { if (check) { $assert (x, desired) } return x }) }

TimeoutError = $extends (Error, { message: 'timeout expired' })

__ = function (x) {
        return (x instanceof Function) ? (new Promise (x)) : Promise.resolve (x) }

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

__.then = function (a, b) { return __.identity (a).then (_.coerceToFunction (b)) }

__.seq = function (seq) {
            return __.identity (_.reduce2 (seq, __.then)) }

__.all = function (x) {
            return Promise.all (x) }

__.delay = function (ms) { return __.delays (ms) () }

__.delays = function (ms) {
                return function (x) {
                    return new Promise (function (return_) {
                                            setTimeout (function () { return_ (x) }, ms || 0) }) } }

$mixin (Array, {

    race: $property (function () { return Promise.race (this) })
})

$mixin (Promise, {

    $: Promise.prototype.then,
    race: function (other) { return [this, other].race },
    reject: function (e) { return this.then (__.rejects (e)) },
    delay: function (ms) { return this.then (__.delays (ms)) },
    timeout: function (ms) { return this.race (__.delay (ms).reject (new TimeoutError ())) },
    now: $property (function () { return this.timeout (0) }),
    log: $property (function () { return this.then (log, log.e.then (_.throwError)) }),
    alert: $property (function () { return this.then (alert2, alert2.then (_.throwError)) }),

    done: function (fn) { return this.then (function (x) { fn (null, x) },
                                            function (e) { fn (e, null); throw e }) },

    finally: function (fn) { return this.then (function (x) { fn (null, x) },
                                               function (e) { fn (e, null) }) },

    state: $property (function () {
                        return this.then (
                            function (x) { return { state: 'fulfilled', fulfilled: true, value: x } },
                            function (e) { return { state: 'rejected', rejected: true, value: x } }).now.catch (function () {
                                           return { state: 'pending', pending: true } }) })
})

_.tests['Promise'] = function () {
                        return __.all ([
                                    __.seq (123).assert (123),
                                    __.seq ([123, 333]).assert (333),
                                    __.seq ([123, _.constant (333)]).assert (333),
                                    __.seq ([123, __.constant (333)]).assert (333),
                                    __.seq ([123, __.rejects ('foo')]).assertRejected ('foo'),
                                    __.seq ([123, __.delays (0), _.appends ('bar')]).assert ('123bar'),
                                    __.map (       123 ,   _.appends ('bar')).assert (       '123bar'),
                                    __.map (      [123],   _.appends ('bar')).assert (      ['123bar']),
                                    __.map ({ foo: 123 },  _.appends ('bar')).assert ({ foo: '123bar' }),
                                    __.map ({ foo: 123 }, __.constant ('bar')).assert ({ foo: 'bar' }) ]) }

