const O   = Object
    , _   = require ('underscore')
    , log = require ('ololog')

    , extractQueryParams = (s, decode = _.identity, [, token, query = ''] = s.match (/^([^?]*)(?:\?(.*))?$/)) => [ // token | token?query)

        token,
        !query ? {} : query.split ('&')
                           .reduce ((result, kv) => { const [k,v=''] = kv.split ('='); result[k] = decode (v); return result }, {})
    ]

_.tests.URIRouter = {

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
                    ['zap', { get: _.identity }]]]]],]

        $assert (URIRouter.canonicalize (input), output)
    },


    /*  This algorithm allows incremental updates to API schema
     */
    collapse () {

        $assert (URIRouter.collapse ([['foo', { get: _.identity } ]]),
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

        $assert (URIRouter.collapse (input), result)
    },

    queryParams () {

        const { match, normalize } = URIRouter

        const schema = normalize ({

            'say/hello?name={}': ({ name }) => 'Hello ' + name,
            'export/?hash={[0-9a-f]+}&ids={(\\d+,?)+}&[optional]={}': ({ hash, ids, optional }) => ({ hash, ids: ids.split (',').map (Number), optional }),

            'something/:file': file => file,
        })

        $assert (match (schema, 'GET', '/say/hello?name=Sponge%20Bob')       .fn (),  'Hello Sponge Bob')
        $assert (match (schema, 'GET', '/say/hello?name=Sponge%20Bob&age=33').fn (),  'Hello Sponge Bob') // should tolerate extra params
        $assert (match (schema, 'GET', '/say/hello'),                                  undefined)         // `name` is required

        $assert (match (schema, 'GET', '/export/?hash=580ea7df&ids=123,45,678').fn (),               { hash: '580ea7df', ids: [123, 45, 678], optional: undefined })
        $assert (match (schema, 'GET', '/export/?hash=580ea7df&ids=123,45,678&optional=42').fn (),   { hash: '580ea7df', ids: [123, 45, 678], optional: '42' })
        $assert (match (schema, 'GET', '/export/?hash=BLAH&ids=123,45,678'),                undefined) // wrong hash (doesn't match the regex)
        $assert (match (schema, 'GET', '/export/?hash=580ea7df&ids=123,45,678,FOO'),        undefined) // wrong ids (doesn't match the regex)
        $assert (match (schema, 'GET', '/export/?hash=580ea7df'),                           undefined) // `ids` is required

        $assert (match (schema, 'GET', '/something/wat.jpg?v=123').fn (), 'wat.jpg') // cuts params off
    }
}

const URIRouter = module.exports = {

    normalize (routes) { return __.seq ([ routes, URIRouter.canonicalize, URIRouter.collapse, URIRouter.validate ]) },

    prettyPrint (routes, depth) { depth = depth || 0
        _.each (routes, route => {
            if (URIRouter.isHandler (route[1])) {
                log.green.indent (depth) (route[0] || '(empty)',
                    _.nonempty ([route[1].get && 'GET', route[1].post && 'POST']).join (' ')) }
            else {
                log.yellow.indent (depth) (route[0] || '(empty)', ':')
                URIRouter.prettyPrint (route[1], depth + 1)
                log.newline ()
            }
        })
    },

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
                                    log.bright.red.error (
                                        '\nFound non-function in ',
                                            (subpath || "''").white,
                                            ' handler chain: ', subj)
                                    throw new Error ('wrong handler chain')
                                }
                            })
                        } else {
                            URIRouter.validate (subj, subpath)
                        }
                    })

                    return routes },

    match (routes, method, path, debug = false, depth = 1, vars = {}, virtualTrailSlashCase = undefined) {

        if (typeof path === 'string') path = path.split ('/')

        const trace = (debug === true) ? log.configure ({ indent: { level: depth, pattern: '→   '} }) : log.null
        
        if ((virtualTrailSlashCase === undefined) && path.length <= depth) {
            return false }

        else {

            const [element, elementQueryParams] = extractQueryParams (virtualTrailSlashCase ? '' : path[depth], decode = decodeURIComponent)

            for (var i = 0, n = routes.length; i < n; i++) {

                const route = routes[i]
                const handler = route[1]
                const subroutes  = _.isArray (handler) ? handler : undefined

                const [match, queryParams] = !subroutes ? extractQueryParams (route[0]) : [route[0], {}]

                const isJsonBinding   = (match[0] === '@')
                const isNumberBinding = (match[0] === '%')
                const isBinding       = (match[0] === ':') || isJsonBinding || isNumberBinding

                trace (match, queryParams, '← ', element.bright, elementQueryParams)

                if (isBinding || element === match) {

                    if (isBinding) {
                        var key    = match.slice (1)
                        var value  = decodeURIComponent (subroutes ? element : extractQueryParams (path.slice (depth).join ('/'))[0])
                        vars[key]  = (isJsonBinding ? JSON.parse.catches () (value) :
                                     (isNumberBinding ? Number (value) : value))

                        trace (match + ' = ' + vars[key]) }
                    else {
                        trace ('    matched ', element.bright.green) }

                    if (subroutes) {
                        trace ('    going deeper'.dim.cyan) // here's pic of "we need to go deeper" DiCaprio from Inception
                        
                        if (depth < (path.length - 1)) {
                            return URIRouter.match (subroutes, method, path, debug, depth + 1, vars) }

                        else if (!virtualTrailSlashCase) { // makes "/foo" respond to "/foo/" handler
                            
                            trace.cyan ('    trying to find trail-slash handler')
                            return URIRouter.match (subroutes, method, path, debug, depth + 1, vars, true) }

                        else {
                            trace.yellow ('    nowhere to go deeper') } }

                    else if (virtualTrailSlashCase || (depth == (path.length - 1)) || isBinding) {

                        const validQueryParams = {}

                        for (let [k,vLeft] of O.entries (queryParams)) {

                            const [optionalMatch,key] = k.match (/^\[(.+)\]$/) || [null, k] // example: [optional]
                            const isOptional = optionalMatch !== null

                            const vRight = elementQueryParams[key]

                            trace.cyan (optionalMatch, isOptional, vRight)

                            if ((vRight === undefined) ||
                                ((vLeft !== '{}') && !(new RegExp ('^' + vLeft.slice (1, -1) + '$').test (vRight)))) { // TODO: cache regexp

                                if (!(isOptional && vRight === undefined)) {
                                    trace.red ('    ' + k.bright, 'doesnt match!')
                                    return undefined
                                }
                            }

                            validQueryParams[key] = vRight
                        }

                        const handlerForMethod = handler[method.lowercase]
                        if (!handlerForMethod) {
                            trace.red ('    no appropriate handler found') }
                        else {

                        /*  Prepend Promise chain with argument(s)  */

                            var args = (O.keys (validQueryParams).length > 0)
                                            ? [O.assign (validQueryParams, vars)]
                                            :  O.values (vars)

                            var chain =  (args.length > 1 ? [match.vars] :
                                          args.length > 0 ? args : []).concat (_.coerceToArray (handlerForMethod))

                            return { fn: function () { return __.seq (chain) }, vars: vars } } } // @hide

                    else {
                        trace (route)
                        trace.red ('    maxed at depth ' + (depth + 1) + ' but path has ' + path.length + ' subroutes') } } }

            trace.bright.red ('match not found\n')
            return undefined } },

/*  PRIVATE */

    isHandler (obj) {
        return obj && (URIRouter.isFunctionOrChain (obj.get) ||
                       URIRouter.isFunctionOrChain (obj.post)) },

    isFunctionOrChain (obj) {
        return (obj instanceof Function) || (_.isArray (obj) && !(obj.isEmpty || _.isString (obj[0]) || _.isArray (obj[0]))) },

    isCanonicalRoute (obj) {
        return _.isArray (obj) && (typeof obj[0] === 'string') },

    map (obj, fn) {
        if (URIRouter.isCanonicalRoute (obj)) {
            return [fn (obj[1], obj[0])] }
        return _.map (obj, _.isArray (obj) ?
            function (route) { return fn (route[1], route[0]) } : fn) },

    canonicalize (obj) {
        if (!obj) {
            return [] }
        else if (URIRouter.isFunctionOrChain (obj)) {
            return { get: obj } }
        else if (URIRouter.isHandler (obj)) {
            return obj }
        return URIRouter.map (obj, (value, key) => {
            var subpaths = key.split ('/')
            if (subpaths.length > 1) {
                return _.reduceRight (subpaths, (memo, path) => {
                    return [path, _.isArray (memo) ? [memo] : memo] }, URIRouter.canonicalize (value)) }
            return [key, URIRouter.canonicalize (value)] }, this) },

    collapse (routes, depth = 0) {

        var handlers = _.filter (routes, URIRouter.isHandler)
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
                return [name, URIRouter.collapse (merged, depth + 1)] }
            return false })) }

}