"use strict";

/*  A sketch of a new test system based on Promises.
    ======================================================================== */

(function () {

    $mixin (Promise, {

        guard: $static (function (fn) {
                            return Promise.resolve ().then (fn) }),

        shouldBe: function (x) {
                    return this.then (function (y) { if (x !== y) { throw new AndrogeneError () } }) },

        shouldFail: $property (function () {
                                    return this.then (function () { throw new AndrogeneError () },
                                                      function () {}) }) })

/*  ======================================================================== */

    var AndrogeneError = class extends Error { constructor (msg) { super (msg || 'assertion failed') } }
    var OriginalPromise = Promise

/*  ======================================================================== */

    var AndrogeneProcessContext = $prototype ({

        current: undefined,

        constructor: function () {
            this.eventLog = []
            this.callStack = $callStack
            this.stackOffset = AndrogeneProcessContext.stackOffset || 0
            this.state = 'pending'
            
            if ((this.parent = AndrogeneProcessContext.current) !== undefined) {
                 this.parent.eventLog.push (this) } },

        root: $property (function () {
                            return (this.parent && this.parent.root) || this }),

        push: $static (function (context, stackOffset) { AndrogeneProcessContext.stackOffset = stackOffset

            var prev           = AndrogeneProcessContext.current
                                 AndrogeneProcessContext.current = context
            
            var PrevPromise    = Promise
                                 Promise = AndrogenePromise
            
            var logHook = function () { context.eventLog.push (
                                            [log.config ({ where: $callStack.safeLocation (5) })].concat (_.initial (arguments))) }
            
            log.impl.write.intercept (logHook)

            return function /* pop */ () {  AndrogeneProcessContext.current = prev
                                            Promise = PrevPromise
                                            log.impl.write.off (logHook) } }),

        within: function (fn, stackOffset) { var self = this
                    return function () {
                                                                    var pop = AndrogeneProcessContext.push (self, stackOffset || 0)
                        try       { var x = fn.apply (this, arguments); pop (); return x }
                        catch (e) {         log.newline (); log.ee (e); pop (); throw e } } },

        printLog: function (indent) { indent = indent || 0

            var where = this.callStack[5 + this.stackOffset]
            var src = where.source || 'Promise'
            var color = log.color[{ 'fulfilled': 'green', 'pending': 'orange', 'rejected': 'red', '': 'purple' }[this.state || '']]

            log.write (color, log.config ({ indent: indent, location: true, where: where }), src)
            log.write (color, log.config ({ indent: indent }), '-'.repeats (src.length))

            /*  Collapses redundant "Promise → then" case
             */
            var eventLog = (this.eventLog.length === 1 && (this.eventLog[0] instanceof AndrogeneProcessContext))
                                ? this.eventLog[0].eventLog
                                : this.eventLog

            for (var event of eventLog) {
                if (event instanceof AndrogeneProcessContext) {
                    if (event.eventLog.length) {
                        log.newline ()
                        event.printLog (indent + 1) } }
                else {
                    log.write.apply (null, [log.indent (indent + 1)].concat (event)) } } }
    })

/*  ======================================================================== */

    $global.AndrogenePromise = class extends Promise {

        constructor (fn) {

            if (AndrogenePromise.initializing === true) {
                super (fn) }

            else {

                var    processContext = new AndrogeneProcessContext ()
                super (processContext.within (fn))
                this  .processContext = processContext
                
                AndrogenePromise.initializing = true

                    super.then (                                                               // it creates an instance of AndrogenePromise,
                        _.$ (this, function () { this.processContext.state = 'fulfilled' }),   // so 'initializing' flag needed to prevent infinite init loop
                        _.$ (this, function () { this.processContext.state = 'rejected' }))

                delete AndrogenePromise.initializing } }

        then (resolve, reject) {

            var next = this.processContext.within (OriginalPromise.prototype.then, 2).apply (this,
                                                        _.map (arguments, function (fn) {
                                                                            return function (x) {
                                                                                return next.processContext.within (fn, -3) (x) }}))
            return next }

        disarm () {
            return new OriginalPromise (OriginalPromise.prototype.then.bind (this)) }

        static guard (fn) {
                return AndrogenePromise.resolve ().then (fn) } }

    var assertion = function (assert) {
                        return function () {
                            return AndrogenePromise.guard (assert.applies (null, arguments)) } }

/*  ======================================================================== */

    var assert = assertion (function (a, b) {
                                if (a !== b) {
                                    throw new AndrogeneError () } })

    var assertEveryCalled = assertion (function (acceptCallbacks) {
        
        var promises = [],
            callbacks = []

        for (var i = 0, n = acceptCallbacks.length; i < n; i++) {
            promises.push (new Promise (function (resolve) {
                callbacks.push (resolve.$ (true)) })) }

        acceptCallbacks.apply (this, callbacks)

        return Promise.all (promises) })

/*  ======================================================================== */

    var test = assertion (function () {

        //log.ww ('Ololo')
        //throw new Error ('pizda')
        //log.ii ('Foo')

        //assert (2 + 2, 5)
        //assert (2 + 2, 6).shouldFail

        return __('foo').then (_.appends ('bar')).shouldBe ('foobr')
    })

    var chainTest = assertion (function () {

        return new Promise (function (resolve) {

            log.i ('A');

            new Promise (function (resolve) {
                log.i ('AA')
                resolve ()

            }).then (function () {
                log.i ('B')
                resolve ()
            })

        }).then (function () {
            log.i ('C')
            //dasdasd ()
        })
    })

    var treeLogTest = assertion (function () {

                                //dsdsd ()

        var b = new Promise (function (resolve) {
                                log.i ('A')
                                resolve ('A') })

                    .then (function (_A) {
                        log.i ('B')
                        return 'B'
                    })

        return new Promise (function (resolve) {
            log.i ('C')
            resolve ('C')

        }).then (function (_С) {

            log.i ('D')

            return b.then (function (_D) {
                log.i ('E')
                return 'E' })

        }).then (function (_E) {
            log.i ('F')
            return 'F'
        })
    })

    // run "node test.js Androgene" to see output

    _.tests['Androgene'] = function () {

        var result = chainTest ()

        return result.disarm ().finally (function (e, x) {

            result.processContext.root.printLog ()
            log.newline ()

        }).catch (log.ee)
    }

/*  ======================================================================== */

}) ();