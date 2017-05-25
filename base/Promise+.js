"use strict";

const _ = require ('underscore')

/*  Promise-centric extensions (WIP) /// TODO: REFACTOR
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

        const fsAsync = Function.promisifyAll (fs, { except: _.endsWith.$$ ('Sync').or (['dontTouchMe', 'dontTouchMe2'].asSet.matches) })

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

    first: function () {
            return [
                Promise.firstResolved ([Promise.reject (123), Promise.resolve (456)]).assert (456),
                Promise.firstResolved ([Promise.reject (123), Promise.reject  (456)]).assertRejected (null),
                Promise.firstResolved ([])                                           .assertRejected (null) ] },

/*  ------------------------------------------------------------------------ */

    all: function () {
            return [
                __.all ([                 123,                   456 ]).assert ([123, 456]),
                __.all ([     _.constant (123),      _.constant (456)]).assert ([123, 456]),
                __.all ([Promise.resolve (123), Promise.resolve (456)]).assert ([123, 456]) ] },

/*  ------------------------------------------------------------------------ */

    seq: function () {  $assert (__.seq (123), 123)
                        $assert (__.seq ([123, 333]), 333)
                        $assert (__.seq ([123, _.constant (333)]), 333)

                        $assert (__.seq ([_.constant (333)]), 333)

                        return [
                            __.seq ([Promise.resolve (123), Promise.resolve (333)]).assert (333),
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
                        __.map ({ foo: 555 }, __.constant ('bar')).assert ({ foo: 'bar' }),

                        __.map ({ foo: Promise.resolve (111), bar: Promise.resolve (222) }).assert ({ foo: 111, bar: 222 }),

                        __.map (['a','b','c','d','e'],
                            function (x,i) { return Promise.resolve ([i,x]).delay (10 - i) })
                                .assert ([[0,'a'], [1,'b'], [2,'c'], [3,'d'], [4,'e']]) ] },

/*  ------------------------------------------------------------------------ */

    filter: function () {
            return [
                        __.filter (123, _.constant (456)).assert (456),
                        __.filter (['foo', 456], _.isString).assert (['foo']),
                        __.filter (['foo', 456], __.constant ('baz')).assert (['baz', 'baz']),
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

                    __.each ([1,2], function (x, i) {
                                        if (i > 0) $fail // should stop at 0, due to rejection
                                        return Promise.reject ('foo') }).assertRejected ('foo') ] }

/*  END OF TESTS ----------------------------------------------------------- */

}


/*  IMPLEMENTATION
    ======================================================================== */


$global.TimeoutError = class extends Error {
    constructor () { super ('timeout expired') }
}

/*  ------------------------------------------------------------------------ */

$global.__ =
Promise.eval = function (x, ...args) {
                    return ((x instanceof Promise)   ?  x :
                           ((x instanceof Function)  ?  new Promise (resolve => { resolve (x.apply (this, args)) }) : // @hide
                                                            Promise.resolve (x))) }

Promise.coerce = function (x) {
                        return (x instanceof Promise) ? x : Promise.resolve (x) }

/*  ------------------------------------------------------------------------ */

__.noop = function () {
            return Promise.resolve () }

__.eternity = new Promise (function () {})

__.identity = function (x) {
                return Promise.resolve (x) }

__.constant = function (x) {
                return function () {
                    return Promise.resolve (x) } }

__.reject = function (e) { return Promise.reject (e) }
__.rejects = function (e) { return function () { return Promise.reject (e) } }

/*  ------------------------------------------------------------------------ */

__.then = function (a, b) { b = _.coerceToFunction (b)
                try {
                    var x = (a instanceof Function) ? a () : a
                    return  (x instanceof Promise)  ? x.then (b) : b (x) } // @hide
                catch (e) {
                    return Promise.reject (e) } }

/*  ------------------------------------------------------------------------ */

__.delay = function (ms) { return __.delays (ms) () }

__.delays = function (ms) {
                return function (x) {
                    return new Promise (function (return_) { setTimeout (function () { return_ (x) }, ms || 0) }) } }

$mixin (Promise, {
    delay:              function (ms) { return this.then (__.delays (ms)) },
    timeout:            function (ms) { return (ms === undefined) ? this : this.race (__.delay (ms).reject (new TimeoutError ())) },
    now:     $property (function (  ) { return this.timeout (0) }) })


/*  ------------------------------------------------------------------------ */

$mixin (Array, {
    
    race: $property (function () { return Promise.race (this) }) })

/*  ------------------------------------------------------------------------ */

$mixin (Promise, {

    race: function (other) { return [this, other].race },

    firstResolved: $static (function (arr) {
                        return new Promise (function (resolve, reject) { var todo = arr && arr.length
                            if (!todo) {
                                reject (null) }
                            else {
                                _.each (arr, function (x) {
                                                Promise.coerce (x)
                                                       .then (function (x) { todo--
                                                                if (resolve) {
                                                                    resolve (x)
                                                                    resolve = undefined } })
                                                       .catch (function () { todo--
                                                            if (!todo) {
                                                                reject (null) } }) }) } }) }),

    reject: function (e) { return this.then (_.throwsError (e)) },

    chain: function (fn) { return this.then (function (x) { fn (x); return x; }) },

    done: function (fn) { return this.then (function (x) { fn (null, x); return x },
                                            function (e) { fn (e, null); throw e }) },

    finally: function (fn) { return this.then (function (x) { return fn (null, x) },
                                               function (e) { return fn (e, null) }) },

    $callableAsFreeFunction: {
        $property: {
            reflect: function () { return this.then (v => v, e => e) },
        },
    },

    /*state: $property (function () {
                        return this.then (
                            function (x) { return { state: 'fulfilled', fulfilled: true, value: x } },
                            function (e) { return { state: 'rejected', rejected: true, value: x } }).now.catch (function () {
                                           return { state: 'pending', pending: true } }) }),*/

    log:   $property (function () { return this.then (log, log.then (_.throwsError)) }),

    panic: $property (function () { return this.catch (function (e) {

                                                        if (_.globalUncaughtExceptionHandler) {
                                                            _.globalUncaughtExceptionHandler (e) }

                                                        throw e }) }),

    assert: function (desired) {
                return this.then (function (x) { $assert (x, desired); return x }) },

    assertTypeMatches: function (desired) {
                return this.then (function (x) { $assertTypeMatches (x, desired); return x }) },

    assertRejected: function (desired) { var check = (arguments.length > 0)
                        return this.catch (function (x) { if (check) { $assert (x, desired) } return x }) },

})

/*  ------------------------------------------------------------------------ */

_.deferTest (['Promise+', '_.scatter with pooling'], function () {

        var data = _.times (21, function (i) { return 'item_' + i })
        var numItems = 0
        var processedItems = []

        var op = function (item, i) {
                    numItems++
                    $assert (!processedItems.contains (item))
                    return __.delay (_.random (2))
                             .then (function () {
                                        processedItems.push (item)
                                        return item }) }

        return __.scatter (data, op, { maxConcurrency: 5 })
                 .then (function () { $assert (_.difference (data, processedItems).isEmpty) }) },

    /*  ------------------------------------------------------------------------ */

    function () {

        $global.TaskPool = $prototype ({

            constructor: function (cfg) {
                            
                            this.maxTime        = cfg && cfg.maxTime
                            this.pending        = []

                            if (this.maxConcurrency = cfg && cfg.maxConcurrency) {
                                this.numActive = 0
                                this.queue     = [] } },

            run: function (task) { var self = this

                        if (this.numActive >= this.maxConcurrency) { // queue task

                            return new Promise (function (resolve) {
                                                    self.queue.push (function () {
                                                                        return self.run  (task)
                                                                                   .then (resolve) }) }) }
                        else { // execute task

                            var p = __(task)

                            if (this.maxTime !== undefined) {
                                p = p.timeout (this.maxTime) }

                            if (this.maxConcurrency !== undefined) { // if queueing, wait until complete and pop next task

                                                           self.numActive++
                                p = p.then (function (x) { self.numActive--

                                                   return (self.queue.length &&
                                                          (self.numActive < self.maxConcurrency))
                                                                          ? self.queue.shift () ().then (_.constant (x))
                                                                          : x }) }
                            this.pending.push (p)

                            return p } },


            all: $property (function () {
                                return Promise.all (this.pending) }) }) // @hide

    /*  ------------------------------------------------------------------------ */

        __.scatter = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {

                    return __.then (x, function (x) {

                        if (_.isStrictlyObject (x)) {

                            var result = _.coerceToEmpty (x),
                                tasks  = new TaskPool (cfg)

                            _.each2 (x, function (v, k) {
                                            tasks.run (fn.$ (v, k, x)).then (
                                                                        function (vk) {
                                                                            if (vk) {
                                                                                result[vk[1]] = vk[0] } }) })
                            return tasks.all.then (_.constant (result)) }

                        else {
                            return __(fn, x, undefined, x).then (function (vk) { return vk[0] }) } }) }
})

/*  ------------------------------------------------------------------------ */

__.map = function (x, fn, cfg /* { maxConcurrency, maxTime } */) { fn = fn || _.identity
            return __.scatter (x, function (v, k, x) {
                return __.then (fn.$ (v, k, x), function (x) { return [x, k] }) }, cfg) }

__.map.configure = Cfg => (x, fn, cfg) => __.map (x, fn, Object.assign ({}, Cfg, cfg))

__.filter = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {
                return __.scatter (x, function (v, k, x) {
                                        return __.then (fn.$ (v, k, x),
                                            function (decision) {
                                                return ((decision === false) ? undefined :
                                                       ((decision === true)  ? [v, k]
                                                                             : [decision, k])) }) }, cfg) }
__.each = function (obj, fn) {
                return __.then (obj, function (obj) {
                    return new Promise (function (complete, whoops) {
                                        _.cps.each (obj, function (x, i, then) {
                                                            Promise.coerce (fn (x, i)) // @hide
                                                                   .then (then)
                                                                   .catch (whoops) }, complete) }) }) }

__.parallelEach = __.map

__.seq = function (arr) {
            return _.reduce2 (undefined, arr, __.then) }

__.all = function (arr) {
            return Promise.all (_.map (arr, __)) } // @hide

__.race = function (arr) {
            return Promise.race (_.map (arr, __)) } // @hide

/*  ------------------------------------------------------------------------ */

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
                                    return new Promise (function (resolve, reject) { // @hide
                                        f.apply (self, _.asArray (args).concat (function (err, what) {
                                                                                      if (err) { reject (err) }
                                                                                                 resolve (what) })) }) } })) })

