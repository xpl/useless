 "use strict";

const _  = require ('underscore')

 module.exports = $trait ({

    tests: {

        /*  Supports two way of defining URLs:

                1. { key: value, .. } (object notation)
                2. [[key, value], ..] (list notation)

            These notations can be intermixed freely. While former is more comfortable to humans,
            the latter is more usable for programmatic generation.
         */
        canonicalize () {

            var input = {
                'echo':             { post: _.identity },
                'api': {
                    'source/:file': _.identity,     // expands
                    'git-commits':  _.identity },

                'lists-way-works-too': [
                    ['foo', { get: _.identity }],
                    ['bar', {                       // allows inclusion of new syntax
                        qux: _.identity,
                        zap: _.identity }]] }

            var output = [
                ['echo', { post: _.identity }],
                ['api',  [
                    ['source',      [[':file', { get: _.identity }]]],
                    ['git-commits',            { get: _.identity }] ]],

                ['lists-way-works-too', [
                    ['foo', { get: _.identity }],
                    ['bar', [
                        ['qux', { get: _.identity }],
                        ['zap', { get: _.identity }]]]]],] },


        /*  This algorithm allows incremental updates to API schema
         */
        collapse () {

            $assert (APISchema.collapse ([['foo', { get: _.identity } ]]),
                                         [['foo', { get: _.identity } ]])

            var input = [
                ['foo', { get: _.identity }],
                ['api', [
                    ['dropdb', { get: _.identity }]]],

                ['bar', { get: _.identity }],
                ['foo', { post: _.noop }],
                ['foo', { get: _.noop }],
                ['api',  [
                    ['source',      [['',       { get: _.identity }]]],
                    ['source',      [[':file',  { get: _.identity }]]],
                    ['git-commits', { get: _.identity }] ]]]

            var result = [
                ['bar', { get: _.identity }],
                ['foo', { get: _.noop, post: _.noop }], // merged handlers
                ['api',  [
                    ['dropdb', { get: _.identity }],
                    ['source',      [
                        ['',        { get: _.identity }],
                        [':file',   { get: _.identity }]]],
                    ['git-commits', { get: _.identity }] ]]]

            $assert (APISchema.collapse (input), result) } },

    beforeInit () { log.minor ('Reading API schema')

        this.apiSchema = APISchema.validate (
                         APISchema.collapse (
                            _.flat (_.filter2 ((this.constructor.$traits || []).reversed, this.$ (function (Trait) {
                                return (Trait.prototype.api ? APISchema.canonicalize (Trait.prototype.api.call (this)) : false) }))))) },

    afterInit () {
        if (_.isFunction (this.api)) {
            this.defineAPIs (this.api ()) } },

    defineAPIs (schemaPart) {
        return (this.apiSchema = APISchema.collapse (this.apiSchema.concat (this.normalizeAPIs (schemaPart)))) },

    normalizeAPIs (routes) {
        return APISchema.validate (APISchema.collapse (APISchema.canonicalize (routes))) } })


/* 

Implementation */

$global.APISchema = {

    prettyPrint (routes, depth) { depth = depth || 0
        _.each (routes, route => {
            if (APISchema.isHandler (route[1])) {
                log.green (log.indent (depth), route[0] || '(empty)',
                    _.nonempty ([route[1].get && 'GET', route[1].post && 'POST']).join (' ')) }
            else {
                log.orange (log.indent (depth), route[0] || '(empty)', ':')
                APISchema.prettyPrint (route[1], depth + 1)
                log.write ('') } }) },

    debugTrace (routes, method, path) {
                    return this.match (routes, method, path, true) },


/*  Requires all elements in handler chains to be functions. This is needed to prevent 'swallowing' of
    errors when evaluating something like [this.nonexistentFunction, ...], because __.seq allows
    constants as chain elements.                                                                        */

    validate (routes, /* optional */ path) {

                    _.each (routes, route => { var subpath = (path || '') + '/' + route[0],
                                                   subj    = route[1]
                        if (!_.isArray (subj)) {
                            _.each (subj, handler => {
                                if (!_.every (_.coerceToArray (handler), _.isFunction)) {
                                    log.ee ('\nFound non-function in ',
                                            log.color.bright, subpath || "''",
                                            log.color.boldRed, ' handler chain: ', subj); throw new Error ('wrong handler chain') } }) }
                        else {
                            APISchema.validate (subj, subpath) } })

                    return routes },

    match (routes, method, path, /* optional */ debug, depth, vars, virtualTrailSlashCase) {

        var trace = (debug === true)
                        ? (function () { log.write.apply (log,
                                            [log.color.dark, _.times (depth, _.constant ('→   ')).join (''),
                                             log.color.black].concat (_.asArray (arguments))) })
                        : _.identity

        depth = depth || 1
        vars  = vars  || {}
        
        if ((virtualTrailSlashCase === undefined) && path.length <= depth) {
            return false }

        else {
            var element = virtualTrailSlashCase ? '' : path[depth]

            for (var i = 0, n = routes.length; i < n; i++) {

                var route       = routes[i]
                var match       = route[0]
                var handler     = route[1]
                var subroutes   = _.isArray (handler) ? handler : undefined

                var isJsonBinding   = (match[0] === '@')
                var isBinding       = (match[0] === ':') || isJsonBinding
                
                trace (match, '← ', log.color.bright, element)

                if (isBinding || element == match) {
                    if (isBinding) {
                        var key    = match.slice (1)
                        var value  = decodeURIComponent (subroutes ? element : path.slice (depth).join ('/'))
                        vars[key]  = isJsonBinding ? JSON.parse.catches () (value) : value

                        trace (match + ' = ' + vars[key]) }
                    else {
                        trace (log.color.green, '    matched ', log.color.boldGreen, element) }

                    if (subroutes) {
                        trace (log.color.darkBlue, '    going deeper') // here's pic of "we need to go deeper" DiCaprio from Inception
                        
                        if (depth < (path.length - 1)) {
                            return APISchema.match (subroutes, method, path, debug, depth + 1, vars) }

                        else if (!virtualTrailSlashCase) { // makes "/foo" respond to "/foo/" handler
                            
                            trace (log.color.blue, '    trying to find trail-slash handler')
                            return APISchema.match (subroutes, method, path, debug, depth + 1, vars, true) }

                        else {
                            trace (log.color.orange, '    nowhere to go deeper') } }

                    else if (virtualTrailSlashCase || (depth == (path.length - 1)) || isBinding) {

                        var handler = handler[method.lowercase]
                        if (!handler) {
                            trace (log.color.red, '    no appropriate handler found') }
                        else {

                        /*  Prepend Promise chain with argument(s)  */

                            var args  = _.values (vars)
                            var chain =  (args.length > 1 ? [match.vars] :
                                          args.length > 0 ? args : []).concat (_.coerceToArray (handler))

                            return { fn: function () { return __(__.seq (chain)) }, vars: vars } } } // @hide

                    else {
                        trace (route)
                        trace (log.color.red, '    maxed at depth ' + (depth + 1) + ' but path has ' + path.length + ' subroutes') } } }

            trace (log.color.boldRed, 'match not found\n')
            return undefined } },

/*  PRIVATE */

    isHandler (obj) {
        return obj && (APISchema.isFunctionOrChain (obj.get) ||
                       APISchema.isFunctionOrChain (obj.post)) },

    isFunctionOrChain (obj) {
        return (obj instanceof Function) || (_.isArray (obj) && !(obj.isEmpty || _.isString (obj[0]) || _.isArray (obj[0]))) },

    isCanonicalRoute (obj) {
        return _.isArray (obj) && (typeof obj[0] === 'string') },

    map (obj, fn) {
        if (APISchema.isCanonicalRoute (obj)) {
            return [fn (obj[1], obj[0])] }
        return _.map (obj, _.isArray (obj) ?
            function (route) { return fn (route[1], route[0]) } : fn) },

    canonicalize (obj) {
        if (!obj) {
            return [] }
        else if (APISchema.isFunctionOrChain (obj)) {
            return { get: obj } }
        else if (APISchema.isHandler (obj)) {
            return obj }
        return APISchema.map (obj, (value, key) => {
            var subpaths = key.split ('/')
            if (subpaths.length > 1) {
                return _.reduceRight (subpaths, (memo, path) => {
                    return [path, _.isArray (memo) ? [memo] : memo] }, APISchema.canonicalize (value)) }
            return [key, APISchema.canonicalize (value)] }, this) },

    collapse (routes) {

        var handlers = _.filter (routes, APISchema.isHandler)
        if (handlers.length) {
            return _.extend.apply (null, [{}].concat (handlers)) }

        var groups = _.groupBy (routes, route => {
            return route[0] })

        return _.reversed (_.filter2 (routes.reversed, route => {
            if (!_.isArray (route)) {
                return route }
            var name = route[0]
            var group = groups[name]
            if (group) {
                delete groups[name]
                var merged = _.flatten (_.map (group, route => route[1]), true)
                return [name, APISchema.collapse (merged)] }
            return false })) }

}




