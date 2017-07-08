"use strict";

(function () {

    const _ = require ('underscore')
    const O = Object
    const StackTracey = require ('stacktracey')
    const ololog = require ('ololog')

/*  ------------------------------------------------------------------------ */

    const locationId = x => ('' + x.file + (x.line || '')) // do not count column, because we show whole source lines (TODO: maybe implement column highlighting)


/*  TODO: move outta here
    ------------------------------------------------------------------------ */

    $mixin (Promise, {

        shouldBe: function (x) {
                    return this.then (function (y) { if (x !== y) { throw new AndrogeneError () } }) },

        shouldFail: $property (function () {
                                    return this.then (function () { throw new AndrogeneError () },
                                                      function () {}) }) })

/*  ------------------------------------------------------------------------ */

    var AndrogeneError = class extends Error { constructor (msg) { super (msg || 'assertion failed') } }
    var OriginalPromise = Promise

/*  ------------------------------------------------------------------------ */

    $global.AndrogeneProcessContext = $prototype ({

        current: undefined,

        constructor: function () {

            this.eventLog = []
            this.numLogMessages = 0
            this.numErrors = 0
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
            
            var logHook = function () {

                context.addEvent ([log.config ({ where: (new StackTracey ()).withSource (5) })].concat (_.initial (arguments)))

                return _.find (arguments, _.not (_.instanceOf (log.Config))) }
            
            log.impl.write.intercept (logHook)

            const olologRender = ololog.impl.render

            ololog.impl.render = function (text) {

                context.addEvent ({ olologRender, text: text })
            }

            return function /* pop */ () {  AndrogeneProcessContext.current     = prev
                                            Promise = PrevPromise
                                            log.impl.write.off (logHook)
                                            ololog.impl.render = olologRender } }),

        addEvent (e) {

            for (let ctx = this; ctx; ctx = ctx.parent) {

                if (e instanceof Error) { ctx.numErrors++ }
                else if (e.olologRender || Array.isArray (e)) { ctx.numLogMessages++ }
            }

            this.eventLog.push (e)
        },

        get hasSomethingToReport () {

            return (this.numErrors + this.numLogMessages) > 0
        },

        within: function (fn) { var self = this
                    return function () {
                                                                    var pop = AndrogeneProcessContext.push (self)
                        try       { var x = fn.apply (this, arguments); pop (); return x } // @hide
                        catch (e) {                                     pop (); throw  e } } },

        stackTracey: function (where) {

            return new StackTracey (where).filter ((e, i) => !(e.line === 5)) // Babeled sources produce stacktraces with a glitch, fast-fix for it
        },

        report (state = {}) {

            const { indent = 0, prevLocations = [] } = state

            const supressRedundantNesting = (this.eventLog.length === 1) && (this.eventLog[0] instanceof AndrogeneProcessContext)

            const head = this.reportLocation (state)
            const body = this.reportContents (O.assign ({}, state, {
                                                                indent: indent + (((head.length === 0) || supressRedundantNesting) ? 0 : 1),
                                                                prevLocations: new Set ([...prevLocations, ..._.map (head, m => locationId (m.data.where))])
                                                            }))
            
            return (state.verbose || (body.length > 0))
                        ? [...head, ...body]
                        : []
        },
    
        reportLocation: function (state = {}) {

            const { prevLocations } = state
            const color = log.color[{ 'fulfilled': 'green', 'pending': 'orange', 'rejected': 'red', '': 'purple' }[this.state || '']]

            const stack = this.stackTracey (this.where)
                                .slice (3)
                                .clean
                                .filter (e => !e.hide && !e.native && e.sourceLine && !prevLocations.has (locationId (e)))
                                .reverse ()

            return stack.map (loc => ({ type: 'location', data: this.log (color, log.config ({ indent: state.indent || 0, location: true, where: loc }), '·', (loc.sourceLine || '').trim ()) }))
        },

        reportContents (state = {}) {

            const { indent = 0, visited = new Set () } = state

            const report = []

            return this.eventLog

                    .filter (x => !visited.has (x))
                    .each (x => visited.add (x))

                    .map (x => ((x instanceof AndrogeneProcessContext)
                                        ? x.report (O.assign (state, { visited })) :
                               
                               ((x instanceof Error)
                                        ? this.reportError (x, state) :

                                (Array.isArray (x)
                                        ? [ { type: 'log', data: this.log (log.indent (indent), ...(x || [])) } ]
                                        : [ { type: 'log', data: this.log (log.indent (indent), x.text) } ]))))

                    .reduce ((a, b) => [...a, ...b], [])
        },

        reportError (e, { indent = 0 }) {

            const loc = this.stackTracey (e).withSource (e.stackOffset || 0)

            return [
                ...loc ? [{ type: 'location', data: this.log (log.config ({ indent: indent,     color: log.color ('boldRed'), location: true, where: loc }), '·', (loc.sourceLine || '').trim ()) }] : [],
                          { type: 'error',    data: this.log (log.config ({ indent: indent + 1, color: log.color ('bright') }), '[EXCEPTION] ' + e.message) }
            ]
        },

        log (...args) {

            return log.impl.processArguments (args)
        },

        displayReport (report = this.report ()) {

            const blocks = _.partition2 (report, ({ type, data: { lines, config: { indent } } }, i) => // generates unique 'block id'

                                                          (type + indent)            // groups entries by type/indent
                                                        + ((lines.length > 1) && i)  // separates multiline log items
                                        ) 

            for (const block of blocks) {

                for (const { data } of block) {

                    log.writeBackend () (data)
                }

                log.newline ()
            }
        }
    })

/*  ------------------------------------------------------------------------ */

    AndrogeneProcessContext.within = function (fn) {
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
                            reject  = function (e) { processContext.addEvent (e); reject_ (e) } })

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

        static eval (x) {
                return ((x instanceof AndrogenePromise) ? x :
                       ((x instanceof Function)         ? new AndrogenePromise (function (resolve) { resolve (x ()) }) : // @hide
                                                          AndrogenePromise.resolve (x))) } }

/*  ------------------------------------------------------------------------ */

}) ();