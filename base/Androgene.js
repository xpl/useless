"use strict";

/*  A sketch of a new test system based on Promises.
    ======================================================================== */

(function () {

    $mixin (Promise, {

        shouldBe: function (x) {
                    return this.then (function (y) { if (x !== y) { throw new AndrogeneError () } }) },

        shouldFail: $property (function () {
                                    return this.then (function () { throw new AndrogeneError () },
                                                      function () {}) }) })

    var AndrogeneError = class extends Error { constructor (msg) { super (msg || 'assertion failed') } }
    var OriginalPromise = Promise

    Promise.guard = function (fn) {
                        return Promise.resolve ().then (fn) }

    var AndrogenePromise = class extends Promise {

        constructor (fn) { super (fn)

            if (Promise.current) {
                Promise.current.eventLog.push (this) }

            this.eventLog = []
            this.callStack = $callStack
            this.stackOffset = 4
        }

        then (resolve, reject) {

            var next = super.then (this.guard (resolve),
                                   this.guard (reject))

            next.prev = this
            next.stackOffset = 5

            return next
        }

        static guard (fn) {
            return AndrogenePromise.resolve ().then (fn)
        }

        get prevChain () {
            return [this].concat (this.prev ? this.prev.prevChain : [])
        }

        get root () {
            return (this.prev && this.prev.root) || this
        }

        guard (fn) { var self = this

            return fn && (function () {

                var prevLogBackend = log.writeBackend.value,
                    PrevPromise    = Promise,
                    prevPromise    = Promise.current,
                    result         = undefined

                /*  Push
                 */
                Promise                = AndrogenePromise
                Promise.current        = self
                log.writeBackend.value = function (params) { self.eventLog.push (params) }

                /*  Eval
                 */
                  try     { result = fn.apply (this, arguments) }
                catch (e) { result = Promise.reject (e) }


                /*  Pop
                 */
                Promise.current        = prevPromise
                Promise                = PrevPromise
                log.writeBackend.value = prevLogBackend

                /*  Done
                 */
                return result
            })
        }
    }

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

    var result = test ()

    function printLog (p, indent) {

            var state = { state: 'rejected' }

            var where = p.callStack[p.stackOffset]
            var src = where.source || 'Promise'
            var color = log.color[{ 'fulfilled': 'green', 'pending': 'orange', 'rejected': 'red' }[state.state]]

            log.write (color, log.config ({ indent: indent, location: true, where: where }), src)
            log.write (color, log.config ({ indent: indent }), '-'.repeats (src.length))

            for (var event of p.eventLog) {
                if (event instanceof Promise) {

                    if (event.eventLog.length) {
                        log.newline ()
                        printLog (event, indent + 1) }

                } else {
                    log.writeBackend () (_.extended (event, { indentation:
                        '\t'.repeats (indent + 1) + event.indentation }))
                }
            }
    }

    Promise.guard (_.constant (result)).finally (function (e, x) {

        printLog (result.root, 0)
        log.newline ()

        //log (e, x, result.prevChain.length)

    }).catch (function (e) {
        log.ee (e)
    })

/*  ======================================================================== */

    function test () {

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

    }


/*  ======================================================================== */

}) ();