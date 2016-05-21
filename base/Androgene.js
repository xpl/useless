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

/*  ======================================================================== */

    var AndrogeneError = class extends Error { constructor (msg) { super (msg || 'assertion failed') } }
    var OriginalPromise = Promise

/*  ------------------------------------------------------------------------ */

    $global.AndrogeneProcessContext = $prototype ({

        current: undefined,

        constructor: function () {
            this.eventLog = []
            this.where = new Error () // @hide
            this.state = 'pending'

            if ((this.parent = AndrogeneProcessContext.current) !== undefined) {
                 this.parent.eventLog.push (this)
                 this.env = this.parent.env } },

        root: $property (function () {
                            return (this.parent && this.parent.root) || this }),

        push: $static (function (context) {

            var prev           = AndrogeneProcessContext.current
                                 AndrogeneProcessContext.current = context
            
            var PrevPromise    = Promise
                                 Promise = AndrogenePromise
            
            var logHook = function () { context.eventLog.push (
                                            [log.config ({ where: $callStack.safeLocation (5) })].concat (_.initial (arguments)))

                                        return _.find (arguments, _.not (_.instanceOf (log.Config))) }
            
            log.impl.write.intercept (logHook)

            return function /* pop */ () {  AndrogeneProcessContext.current     = prev
                                            Promise = PrevPromise
                                            log.impl.write.off (logHook) } }),

        within: function (fn) { var self = this
                    return function () {
                                                                    var pop = AndrogeneProcessContext.push (self)
                        try       { var x = fn.apply (this, arguments); pop (); return x } // @hide
                        catch (e) {                                     pop (); throw  e } } },

        /*  TODO: current impl does not account error doubling (solved by state.visited in printEvents)
         */ 
        numEvents: $memoized ($property (function () {
                                                return _.reduce2 ({ log: 0, errors: 0 }, this.eventLog, function (sum, e) {

                                                    var n = ((e instanceof AndrogeneProcessContext) ? e.numEvents :
                                                            ((e instanceof Error)                   ? { errors: 1 } :
                                                                                                      { log: 1 }))
                                                    sum.all = (sum.errors += (n.errors || 0)) +
                                                              (sum.log    += (n.log    || 0))

                                                    return sum }) })),

        printLog: function (state) { state = state || {}
                        if (state.verbose || (this.numEvents.all > 0)) {
                            log.withConfig (log.config ({ indentPattern: '    ' }), () => {
                                                                                    this.printWhere (state)
                                                                                    this.printEvents (state) }) } },

        printWhere: function (state) { var indent = (state && state.indent) || 0

            var color = log.color[{ 'fulfilled': 'green', 'pending': 'orange', 'rejected': 'red', '': 'purple' }[this.state || '']]

            log.margin ()

            for (var loc of CallStack.fromError (this.where)
                                        .offset (3)
                                        .clean
                                        .reject (x => x.native)
                                        .reversed) {
                
                log.write (color, log.config ({ indent: indent, location: true, where: loc }), '·', loc.source.trimmed) }

            log.margin () },

        printEvents: function (state) { var state = state || {},
                                            indent  = state.indent || 0,
                                            visited = state.visited || new Set () // contains errors already printed, to reduce clutter
            
            if (state.verbose || (this.numEvents.all > 0)) {

                for (var e of this.eventLog) {
                    if (e instanceof AndrogeneProcessContext) {
                        if (e.eventLog.length) {
                            e.printLog ({ indent: indent + 1, visited: visited, verbose: state.verbose }) } }
                    else if (e instanceof Error) {
                        if (!visited.has (e)) {
                             visited.add (e)
                             log.boldRed (log.indent (indent + 1), e) } }
                    else {
                        log.write.apply (null, [log.indent (indent + 1)].concat (e)) } }

                log.margin () } } })

/*  ------------------------------------------------------------------------ */

    AndrogeneProcessContext.within = function () {
        return (AndrogeneProcessContext.current && AndrogeneProcessContext.current.within (fn)) || fn }

/*  ------------------------------------------------------------------------ */

    $global.AndrogenePromise = class extends Promise {

        constructor (fn) {

            if (AndrogenePromise.constructing === true) {
                super (fn) }

            else {

                var processContext = new AndrogeneProcessContext () // @hide

                    /*  Run super constuctor to acquire resolve/reject triggers,
                        wrapping 'reject' so that it reports errors to the current log.
                     */
                    var resolve, reject
                        super (function (resolve_, reject_) {
                            resolve = resolve_
                            reject  = function (e) { processContext.eventLog.push (e); reject_ (e) } })

                    this.processContext = processContext

                    /*  Run 'fn' within created process context
                     */
                    try {
                        processContext.within (fn) (resolve, reject) } // @hide
                    catch (e) {
                        reject (e) }

                    /*  Bind to self to introduce the synchronous state flag. And hence 'then' method creates
                        an instance of AndrogenePromise internally, the 'constructing' flag needed to prevent
                        an infinite init loop.
                     */
                    AndrogenePromise.constructing = true

                        super.then (                                                               
                            function (x) { processContext.state = 'fulfilled' },
                            function (x) { processContext.state = 'rejected' })

                    delete AndrogenePromise.constructing } }

        then (resolve, reject) {
            var next = this.processContext.within (OriginalPromise.prototype.then, 2).apply (this, // @hide
                                                        _.map (arguments, function (fn) {
                                                                            return fn && (function (x) {
                                                                                return next.processContext.within (fn, -3) (x) }) })) // @hide
            return next }

        disarmAndrogene () {
            return new OriginalPromise (OriginalPromise.prototype.then.bind (this)) }

        static race (promises) {
            return OriginalPromise.race (promises) }

        static coerce (x) {
                return ((x instanceof AndrogenePromise) ? x :
                       ((x instanceof Function)         ? new AndrogenePromise (function (resolve) { resolve (x ()) }) : // @hide
                                                          AndrogenePromise.resolve (x))) } }

/*  ======================================================================== */

    var assertion = function (fn) {
                        return function () {
                            return AndrogenePromise.coerce (fn) } } // @hide

/*  ------------------------------------------------------------------------ */

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

/*  ------------------------------------------------------------------------ */

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

            log.i ('example log message #1');

            new Promise (function (resolve) {
                log.i ('example log message #2')
                resolve ()

            }).then (function () {
                log.i ('example log message #3')
                resolve ()
            })

        }).then (function () {
            log.i ('example log message #4')
            some_undefined_function ()
        })
    })

    var treeLogTest = assertion (function () {

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

    var raceTest = assertion (function () {
        return __('foo')
                    .then (_.appends ('bar'))
                    .delay (500)
                    .log
                    .then (function () { dasdsad () })
                    .timeout (600)
    })

    var throwTest = assertion (function () {
                                    throw new Error ('yo') })

    /*  TODO: investigate why fails
     */
    var thenFunctionTest = assertion (function () {
                                            return Promise.resolve ().then (function () { return function () { } })
                                                .then (function (x) { console.log (x) }) })

    // uncomment, then run "node test.js Androgene" to see output

    /*_.tests['Androgene'] = function () {

        var result = thenFunctionTest ()

        return result.disarmAndrogene ().finally (function (e, x) {

                                            result.processContext.root.printLog ({ verbose: true })
                                            log.margin ()

                                            if (e) { throw e } })
    }*/

/*  ======================================================================== */

}) ();