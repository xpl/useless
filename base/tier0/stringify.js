/*  Tired of wrapping JSON.parse to try/catch? Here's solution.
    Also, it's two-way (can either parse, or stringify).
    ======================================================================== */

_.json = function (arg) {
            if (typeof arg === 'string') {
                try         { return JSON.parse (arg) }
                catch (e)   { return {} } }
            else {
                return JSON.stringify (arg) } }
                
/*  Object stringifier
    ======================================================================== */

_.deferTest (['type', 'stringify'], function () {

        var complex =  { foo: 1, nil: null, nope: undefined, fn: _.identity, bar: [{ baz: "garply", qux: [1, 2, 3] }] }
            complex.bar[0].bar = complex.bar

        var renders = '{ foo: 1, nil: null, nope: undefined, fn: <function>, bar: [{ baz: "garply", qux: [1, 2, 3], bar: <cyclic> }] }'

        var Proto = $prototype ({})

        $assert (_.stringify (Proto),   '<prototype>')

        $assert (_.stringify (123),     '123')
        $assert (_.stringify (complex), renders)

        var obj = {}
        $assert (_.stringify ([obj, obj, obj]), '[{  }, <ref:1>, <ref:1>]') }, function () {

    _.stringify         = function (x, cfg) { return _.stringifyImpl (x, [], [], 0, cfg || {}, -1) }

    _.stringifyImpl     = function (x, parents, siblings, depth, cfg, prevIndent) {

                            if (x === $global) {
                                return '$global' }

                            var customFormat = cfg.formatter && cfg.formatter (x)
                            
                            if (customFormat) {
                                return customFormat }

                            else if (parents.indexOf (x) >= 0) {
                                return cfg.pure ? undefined : '<cyclic>' }

                            else if (siblings.indexOf (x) >= 0) {
                                return cfg.pure ? undefined : '<ref:' + siblings.indexOf (x) + '>' }

                            else if (x === undefined) {
                                return 'undefined' }

                            else if (x === null) {
                                return 'null' }

                            else if (_.isFunction (x)) {
                                return cfg.pure ? x.toString () : (_.isPrototypeConstructor (x) ? '<prototype>' : '<function>') }

                            else if (typeof x === 'string') {
                                return _.quoteWith ('"', x) }

                            else if (_.isObject (x) && !((typeof $atom !== 'undefined') && ($atom.is (x)))) { var isArray = _.isArray (x)

                                var pretty = cfg.pretty || false

                                if (x.toJSON) {
                                    return _.quoteWith ('"', x.toJSON ()) } // for MongoDB ObjectID

                                if (!cfg.pure && (depth > (cfg.maxDepth || 5) || (isArray && x.length > (cfg.maxArrayLength || 30)))) {
                                    return isArray ? '<array[' + x.length + ']>' : '<object>' }

                                var parentsPlusX = parents.concat ([x])

                                siblings.push (x)

                                var values  = _.pairs (x)

                                var oneLine = !pretty || (values.length < 2)

                                var indent  = prevIndent + 1
                                var tabs    = !oneLine ? '\t'.repeats (indent) : ''

                                if (pretty && !isArray) {
                                    var max = _.reduce (_.map (_.keys (x), _.count), _.largest, 0)
                                    values = _.map (values, function (v) {
                                        return [v[0], v[1], ' '.repeats (max - v[0].length)] }) }

                                var square  = !oneLine ? '[\n  ]' : '[]'
                                var fig     = !oneLine ? '{\n  }' : '{  }'
                                
                                return _.quoteWith (isArray ? square : fig, _.joinWith (oneLine ?  ', ' : ',\n',
                                            _.map (values, function (kv) {
                                                        return tabs + (isArray ? '' : (kv[0] + ': ' + (kv[2] || ''))) +
                                                            _.stringifyImpl (kv[1], parentsPlusX, siblings, depth + 1, cfg, indent) }))) }

                            else if (_.isDecimal (x) && (cfg.precision > 0)) {
                                return _.toFixed (x,     cfg.precision) }
                                
                            else {
                                return x + '' } } })

/*  Safe version of toFixed
    ======================================================================== */

_.toFixed = function (x, precision) {
    return (x && x.toFixed && x.toFixed (precision)) || undefined }

_.toFixed2 = function (x) {
    return _.toFixed (x, 2) }

_.toFixed3 = function (x) {
    return _.toFixed (x, 3) }

