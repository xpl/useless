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

        if (_.hasTags) {

            var complex =  { foo: $constant ($get ({ foo: 7 }, 1)), nil: null, nope: undefined, fn: _.identity, bar: [{ baz: "garply", qux: [1, 2, 3] }] }
                complex.bar[0].bar = complex.bar

            var renders = '{ foo: $constant ($get ({ foo: 7 }, 1)), nil: null, nope: undefined, fn: <function>, bar: [{ baz: "garply", qux: [1, 2, 3], bar: <cyclic> }] }'

            var Proto = $prototype ({})

            $assert (_.stringify (Proto),   Platform.NodeJS ? 'Proto ()' : '<prototype>')

            $assert (_.stringify (undefined),'undefined')
            $assert (_.stringify (123),     '123')
            $assert (_.stringify (complex, { pretty: false }), renders) }

        $assert (_.pretty ({    array: ['foo',
                                        'bar',
                                        'baz'],
                                 more:  'qux',
                             evenMore:   42    }), ['{    array: [ "foo",'    ,
                                                    '              "bar",'    ,
                                                    '              "baz"  ],' ,
                                                    '      more:   "qux",'    ,
                                                    '  evenMore:    42       }'].join ('\n'))

        var obj = {}
        $assert (_.stringify ([obj, obj, obj]), '[{  }, <ref:1>, <ref:1>]') }, function () {

    _.alignStringsRight = function (strings) {
                                                var              lengths = strings.map (_.count)
                                                var max = _.max (lengths)
                            return                              [lengths,  strings].zip (function (ln,   str) {
                                return ' '.repeats (max -                                          ln) + str }) }

    _.bullet = function (bullet,        str) { var indent = ' '.repeats (bullet.length)
              return _.joinWith  ('\n',
                     _.splitWith ('\n', str).map (function (line, i) { return (i === 0)
                                                                                 ? (bullet + line)
                                                                                 : (indent + line) })) }
                        
    _.stringifyOneLine = function (x, cfg) {
                            return _.stringify (x, _.extend (cfg || {}, { pretty: false })) }

    _.pretty = function (x, cfg) {
                    return _.stringify  (x, _.extend (cfg || {}, { pretty: true })) }

    _.stringify = function  (x, cfg) { cfg = cfg || {}
                    var measured = _.stringifyImpl (x, [], [], 0, cfg)
                    return (measured.length < 80 || 'pretty' in cfg) ? measured : _.pretty (x, cfg) }

    _.stringifyPrototype = function (x) {
            if (Platform.NodeJS && x.$meta) { var name = ''
                x.$meta (function (values) { name = values.name })
                return name && (name + ' ()') }
            else return '<prototype>' }

    _.stringifyImpl     = function (x, parents, siblings, depth, cfg) {

                            var customFormat = cfg.formatter && cfg.formatter (x)

                            if (customFormat) {
                                return customFormat }

                            if ((typeof jQuery !== 'undefined') && _.isTypeOf (jQuery, x)) {
                                x = _.asArray (x) }

                            if (x === $global) {
                                return '$global' }

                            else if (parents.indexOf (x) >= 0) {
                                return cfg.pure ? undefined : '<cyclic>' }

                            else if (siblings.indexOf (x) >= 0) {
                                return cfg.pure ? undefined : '<ref:' + siblings.indexOf (x) + '>' }

                            else if (x === undefined) {
                                return 'undefined' }

                            else if (x === null) {
                                return 'null' }

                            else if (_.isFunction (x)) {
                                return cfg.pure ? x.toString () : ((_.isPrototypeConstructor (x) && _.stringifyPrototype (x)) || '<function>') }

                            else if (typeof x === 'string') {
                                return _.quoteWith ('"', x) }

                            else if (_.isTypeOf (Tags, x)) {
                                return _.reduce (Tags.get (x), function (memo, value, tag) {
                                                                    return _.isBoolean (value)
                                                                        ? (tag + ' ' + memo.quote ('()'))
                                                                        : (tag + ' (' + _.stringifyImpl (value, parents, siblings, 0, { pretty: false }) + ', ' + memo + ')') },
                                    _.stringifyImpl ($untag (x), parents, siblings, depth + 1, cfg)) }

                            else if (!cfg.pure && _.hasOOP && _.isPrototypeInstance (x) && $prototype.defines (x.constructor, 'toString')) {
                                return x.toString () }

                            else if (_.isObject (x) && !((typeof $atom !== 'undefined') && ($atom.is (x)))) { var isArray = _.isArray (x)

                                var pretty = cfg.pretty || false

                                if ((_.platform ().engine === 'browser')) {
                                    if (_.isTypeOf (Element, x)) {
                                        return '<' + x.tagName.lowercase + '>' }
                                    else if (_.isTypeOf (Text, x)) {
                                        return '@' + x.wholeText } }

                                if (x.toJSON) {
                                    return _.quoteWith ('"', x.toJSON ()) } // for MongoDB ObjectID

                                if (!cfg.pure && (depth > (cfg.maxDepth || 5) || (isArray && x.length > (cfg.maxArrayLength || 30)))) {
                                    return isArray ? '<array[' + x.length + ']>' : '<object>' }

                                var parentsPlusX = parents.concat ([x])

                                siblings.push (x)

                                var values  = _.pairs (x)

                                var oneLine = !pretty || (values.length < 2)

                                var impl = _.stringifyImpl.tails2 (parentsPlusX, siblings, depth + 1, cfg)

                                if (pretty) {
                                        values        = _.values (x)
                                    var printedKeys   = _.alignStringsRight (_.keys   (x).map (_.appends (': ')))
                                    var printedValues =                            values.map (impl)

                                    var leftPaddings = printedValues.map (function (x, i) {
                                                                            return (((x[0] === '[') ||
                                                                                     (x[0] === '{')) ? 3 :
                                                                                        _.isString (values[i]) ? 1 : 0) })
                                    var maxLeftPadding = _.max (leftPaddings)

                                    var indentedValues = [leftPaddings, printedValues].zip (function (padding,   x) {
                                                                 return ' '.repeats (maxLeftPadding - padding) + x })

                                    var internals = isArray ? indentedValues :
                                                [printedKeys, indentedValues].zip (_.bullet)

                                    var printed = _.bullet (isArray ? '[ ' :
                                                                      '{ ', internals.join (',\n'))
                                    var lines = printed.split ('\n')

                                    return printed +  (' '.repeats (_.max (lines.map (_.count)) -
                                                                    _.count (lines.last)) + (isArray ? ' ]' :
                                                                                                       ' }')) }

                                return _.quoteWith (isArray ? '[]' : '{  }', _.joinWith (', ',
                                            _.map (values, function (kv) {
                                                        return (isArray ? '' : (kv[0] + ': ')) + impl (kv[1]) }))) }

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

