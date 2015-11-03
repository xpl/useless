_.hasStdlib = true

/*  _.throwsError
    ======================================================================== */

_.withTest (['stdlib', 'throwsError'], function () {

        $assertThrows (
            _.throwsError ('неуловимый Джо'),
            _.matches ({ message: 'неуловимый Джо' })) }, function () { _.extend (_, {

    throwsError: function (msg) {
                    return function () {
                        throw new Error (msg) }} }) })

_.overrideThis   = _.throwsError ('override this')
_.notImplemented = _.throwsError ('not implemented')


/*  A functional try/catch
    ======================================================================== */

_.deferTest (['stdlib', 'tryEval'], function () {

    /*  'return' interface
     */
    $assert ('ok',     _.tryEval (_.constant ('ok'),
                                  $fails))

    $assert ('failed', _.tryEval (_.throwsError ('yo'),
                                  $assertMatches.partial ({ message: 'yo'}).then (_.constant ('failed'))))

   /*   CPS interface
    */
    $assertCPS (_.tryEval.partial (_.constant ('ok'),
                                   _.constant ('failed')), 'ok')
 
    $assertCPS (_.tryEval.partial (_.throwsError ('yo'),
                                   _.constant ('failed')), 'failed')

}, function () { _.mixin ({
                    tryEval: function (try_, catch_, then_) { var result = undefined
                        try       { result = try_ ()    }
                        catch (e) { result = catch_ && catch_ (e) }
                        return then_ ?
                                    then_ (result) :
                                    result } }) })


/*  Abstract _.values
    ======================================================================== */

_.deferTest (['stdlib', 'values2'], function () {

    $assert (_.values2 (undefined), [])
    $assert (_.values2 (_.identity), [_.identity])
    $assert (_.values2 ('foo'), ['foo'])
    $assert (_.values2 (['foo', 'bar']), ['foo', 'bar'])
    $assert (_.values2 ({ f: 'foo', b: 'bar' }), ['foo', 'bar'])

}, function () { _.mixin ({
                    values2: function (x) {
                        if (_.isArray (x))                  { return x }
                        else if (_.isStrictlyObject (x))    { return _.values (x) }
                        else if (_.isEmpty (x))             { return [] }
                        else                                { return [x] } } }) })

/*  Map 2.0
    ======================================================================== */

/*  Semantically-correct abstract map (maps any type of value)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'map2'], function () { var plusBar = _.appends ('bar')

    $assert (_.map2 ('foo', plusBar), 'foobar')
    $assert (_.map2 (['foo'], plusBar), ['foobar'])
    $assert (_.map2 ({ foo: 'foo' }, plusBar), { foo: 'foobar' })

}, function () { _.mixin ({
                    map2: function (value, fn, context) {
                        if (_.isArray (value)) {
                            return _.map (value, fn, context) }
                        else if (_.isStrictlyObject (value)) {
                            return _.mapObject (value, fn, context) }
                        else {
                            return fn.call (context, value) } } })})

/*  Hyper map (deep) #1 — maps leafs
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'mapMap'], function () {

    $assert (_.mapMap ( 7,  _.typeOf),  'number')   // degenerate cases
    $assert (_.mapMap ([7], _.typeOf), ['number'])

    $assert (_.mapMap ( {   foo: 7,
                            bar: ['foo', {
                                bar: undefined } ] }, _.typeOf),
                        
                        {   foo: 'number',
                            bar: ['string', {
                                bar: 'undefined' } ] }) },

    function () {

        _.mixin ({ mapMap: _.hyperOperator (_.unary, _.map2) }) })


/*  Filter 2.0
    ======================================================================== */

_.deferTest (['stdlib', 'filter 2.0'], function () { var foo = _.equals ('foo')

    // generic filter behavior for any container type

    $assert (_.filter2 (     'foo'  ,   foo),        'foo' )
    $assert (_.filter2 ([    'foo' ],   foo),   [    'foo' ])
    $assert (_.filter2 ({ f: 'foo' },   foo),   { f: 'foo' })
    
    $assert (_.filter2 (     'foo'  ,   _.not (foo)),   undefined)
    $assert (_.filter2 ([    'foo' ],   _.not (foo)),   [])
    $assert (_.filter2 ({ f: 'foo' },   _.not (foo)),   {})

    // map behavior, if predicate returns not boolean (mixed-behavior test not needed - although its the expected case of use)

    $assert (_.filter2 (     'foo' ,    _.constant ('bar')),         'bar'  )
    $assert (_.filter2 ([    'foo' ],   _.constant ('bar')),    [    'bar' ])
    $assert (_.filter2 ({ f: 'foo' },   _.constant ('bar')),    { f: 'bar' })

    // hyper-filter

    $assert (_.filterFilter (
                    { foo: 'foo',   bar: [7, 'foo', { bar: 'foo' }] }, _.not (_.equals ('foo'))),
                    {               bar: [7,        {            }] })

}, function () { _.mixin ({

    reject2: function (value, op) {
        return _.filter2 (value, _.not (op)) },

    filter2: function (value, op) {
        if (_.isArray (value)) {                                var result = []
            for (var i = 0, n = value.length; i < n; i++) {     var v = value[i], opSays = op (v, i)
                if (opSays === true) {
                    result.push (v) }
                else if (opSays !== false) {
                    result.push (opSays) } } return result }

        else if (_.isStrictlyObject (value)) {                  var result = {}
            _.each (Object.keys (value), function (key) {       var v = value[key], opSays = op (v, key)
                if (opSays === true) {
                    result[key] = v }
                else if (opSays !== false) {
                    result[key] = opSays } }); return result }

        else {                                                  var opSays = op (value)
            if (opSays === true) {
                return value }
            else if (opSays !== false) {
                return opSays }
            else {
                return undefined } } } })

    _.mixin ({

        filterFilter: _.hyperOperator (_.unary, _.filter2) }) })


/*  Reduce on steroids
    ======================================================================== */

_.deferTest (['stdlib', 'reduce 2.0'], function () {

    /*$assert (_.reduce2 ([    3,    7,    9 ], _.sum), 19)
    $assert (_.reduce2 ({ a: 3, b: 7, c: 9 }, _.sum), 19)
    $assert (_.reduce2 (     3   + 7   + 9  , _.sum), 19)

    $assert (_.reduce2 ([1], _.sum), 1)
    $assert (_.reduce2 ([],  _.sum), undefined)

    $assert (              1 + 20 + 3 + 4 + 5,
        _.reduceReduce ([[[1], 20],[3,[ 4,  5]]], function (a, b) { return (_.isNumber (a) && _.isNumber (b)) ? (a + b) : b }))*/

}, function () {

    /*  Because hyperOperator is fractal thing, it is nessesary to define a compatible argument
        order for _.reduce and its functor operand, as they get melted together to form a generic
        self-similar routine of a higher order.

        And that becames kinda "Yodish" when applied to familiar 'reduce'. See how they dont match:

            1. _.reduce (value, op, memo)
            2.       op (memo, value)
    */
    _.reduce2 = function (value, memo, op_) {

                    var op     = _.last (arguments)

                    var safeOp = function (value, memo) { var hasMemo = (memo !== undefined)
                                                          var result  = (hasMemo ? op (value, memo) : value)
                        return (result === undefined) ?
                                    (hasMemo ? memo : value) :
                                    (result) }

                    if (_.isArray (value)) {                                
                        for (var i = 0, n = value.length; i < n; i++) {
                            memo = safeOp (value[i],   memo) } }

                    else if (_.isStrictlyObject (value)) {                  
                        _.each (Object.keys (value), function (key) {
                            memo = safeOp (value[key], memo) }) }

                    else {
                            memo = safeOp (value,      memo) } return memo }

    _.reduceReduce = function (initial, value, op) {
                        return _.hyperOperator (_.binary, _.reduce2, _.goDeeperAlwaysIfPossible) (value, initial, op.flip2) }
 })

/*  Zip 2.0
    ======================================================================== */

/*  Abstract zip that reduces any types of matrices.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'zip2'], function () {

    $assert (_.zip2 ([  'f',
                        'o',
                        'o'], _.concat), 'foo')

    $assert (_.zip2 ([  ['f', 'b'],
                        ['o', 'a'],
                        ['o', 'r']], _.concat), ['foo', 'bar'])

    $assert (_.zip2 ([  { foo:'f', bar:'b' },
                        { foo:'o', bar:'a' },
                        { foo:'o', bar:'r' }], _.concat), { foo: 'foo', bar: 'bar' })

    $assert (_.zip2 (   { foo:'f', bar:'b' },           // passing rows as arguments
                        { foo:'o', bar:'a' },
                        { foo:'o', bar:'r' },  _.concat), { foo: 'foo', bar: 'bar' })

    $assert (_.zip2 (undefined, _.concat), undefined)   // degenerate cases
    $assert (_.zip2 (5,         _.concat), 5)
    $assert (_.zip2 ([],        _.concat), [])
    $assert (_.zip2 (['foo'],   _.concat), 'foo')

    // internals (regression tests)

    $assert (_.zipObjectsWith ([
                { name: 'string' },
                { born: 123 }], _.array),
            
                { name: ['string',  undefined],
                  born: [undefined, 123] })

}, function () { _.mixin ({

    zipObjectsWith: function (objects, fn) {
        return _.reduce (_.rest (objects), function (memo, obj) {
            _.each (_.union (_.keys (obj), _.keys (memo)), function (k) {
                var zipped = fn (memo && memo[k], obj && obj[k])
                if (zipped === undefined) {
                    delete memo[k] }
                else {
                    memo[k] = zipped } }); return memo }, _.clone (objects[0])) },

    zip2: function (rows_, fn_) {   var rows = arguments.length === 2 ? rows_ : _.initial (arguments)
                                    var fn   = arguments.length === 2 ? fn_   : _.last (arguments)
        if (!_.isArray (rows) || rows.length === 0) {
            return rows }
        else {
            if (_.isArray (rows[0])) {
                return _.zipWith (rows, fn) }
            else if (_.isStrictlyObject (rows[0])) {
                return _.zipObjectsWith (rows, fn) }
            else {
                return _.reduce (rows, fn) } } } }) })

/*  Hyperzip (deep one).
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'zipZip'], function () {

    $assert (_.zipZip (
            { phones: [{ number: 'number' }] },
            { phones: [{ number: 333 }] }, _.array),
            { phones: [{ number: ['number', 333] }] })

    $assert (_.zipZip ([{   foo: 7,
                            bar: ['foo', {
                                bar: undefined } ] },
                        
                        {   foo: 'number',
                            bar: ['string', {
                                bar: 'undefined' } ] } ], _.array),

                        {   foo: [7, 'number'],
                            bar: [['foo', 'string'], {
                                bar: [undefined, 'undefined'] } ] }) },
function () {

    _.mixin ({ zipZip: _.hyperOperator (_.binary, _.zip2) }) })


/*  Find 2.0 + Hyperfind
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest (['stdlib', 'findFind'], function () {

    var obj = { x: 1, y: { z: 2 }}

    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.constant (false)), false)
    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.equals (2)),       2)
    $assert (_.findFind ({ foo: { bar: obj     } }, _.equals (obj)),     obj) },

function () {

    _.findFind = function (obj, pred_) {
                    return _.hyperOperator (_.unary,
                             function (value, pred) {
                                    if (_.isArray (value)) {                                
                                        for (var i = 0, n = value.length; i < n; i++) { var x = pred (value[i])
                                                          if (typeof x !== 'boolean') { return x }
                                                                 else if (x === true) { return value[i] } } }

                                    else if (_.isStrictlyObject (value)) {        
                                        for (var i = 0, ks = Object.keys (value), n = ks.length; i < n; i++) { var k = ks[i]; var x = pred (value[k])
                                                                                 if (typeof x !== 'boolean') { return x }
                                                                                        else if (x === true) { return value[k] } } }

                                                                                          var x = pred_ (value)
                                                            if (typeof x !== 'boolean') { return x }
                                                                   else if (x === true) { return value }
                                                                                          return false }) (obj, pred_) } })


/*  Most useful _.extend derivatives
    ======================================================================== */

_.withTest (['stdlib', 'extend 2.0'], function () {

        /*  Inverted version of _.extend, for humanized narration where it makes sense (not here,
            but see AOP impl for example of such one)
         */
        [(function () {
            var input   = { foo:1,  bar:1 }
            var plus    = { foo:42, qux:1 }
            var gives   = { foo:42, qux:1, bar: 1 }

            $assert (_.extendWith (plus, input), gives) }) (),

        /*  Higher-order version of _.extend, allows to use it as _.map operator, which cuts
            shit in typical arrays-of-objects crunching routines
         */
        (function () {
            var input   = [{ bar:1 }, {}]
            var plus    = _.extendsWith ({ foo:42 })
            var gives   = [{ bar:1, foo:42 }, { foo:42 }]

            $assert (_.map (input, _.arity1 (plus)), gives) }) (),

        /*  Deep version of _.extend, allowing to extend two levels deep (super useful one)
         */
        (function () {
            var input   = { foo:1,  bar: { qux:1 } }
            var plus    = { foo:42, bar: { baz:1 } }
            var gives   = { foo:42, bar: { baz:1, qux:1 }}

            $assert (_.extend2 (input, plus), gives) }) ()]  }, function () {

    _.extend = $restArg (_.extend) // Mark as having rest argument (to make _.flip work on that shit)

    _.extendWith = _.flip (_.extend)                                        
    _.extendsWith = _.flip (_.partial (_.partial, _.flip (_.extend)))   // higher order shit

    _.extend2 = $restArg (function (what) { 
                                return _.extend (what, _.reduceRight (arguments, function (right, left) {
                                    return _.object (_.map (_.union (_.keys (left), _.keys (right)),
                                                            function (key) {
                                                                var lvalue = left[key]
                                                                return [key, (key in right) ?
                                                                                (typeof lvalue === 'object' ?
                                                                                    _.extend (lvalue, right[key]) :
                                                                                    right[key]) :
                                                                                lvalue] }))}, {})) }) })


/*  removes empty contents from any kinds of objects
    ======================================================================== */

_.withTest (['stdlib', 'nonempty'], function () {

    var obj = { blank: {}, empty: [], one: 1, none: undefined, nil: null, clear: '', zero: 0, no: false }
    var arr = [{}, [], 1, undefined, null, '', 0, false]

    $assert (_.nonempty (obj), { one: 1, zero: 0, no: false })
    $assert (_.nonempty (arr), [1, 0, false])

    $assert (_.nonempty (null), undefined)
    $assert (_.nonempty (''),   undefined)

}, function () {

    _.nonempty = function (obj) { return _.filter2 (obj, _.isNonempty) } })


/*  deep cloning of objects (as _.clone is shallow)
    ======================================================================== */

_.deferTest (['stdlib', 'cloneDeep'], function () {
    var obj     = { a: [{ b: { c: 'd' } }], b: {} }
    var copy    = _.cloneDeep (obj)

    $assert (obj   !== copy)    // should be distinct references
    $assert (obj.a !== copy.a)  // should be distinct references
    $assert (obj.b !== copy.b)  // should be distinct references

    $assert (obj, copy)     // structure should not change

}, function () { _.extend (_, {

    cloneDeep: _.tails2 (_.mapMap, _.clone) }) })


/*  given objects A and B, _.diff subtracts A's structure from B,
    and returns difference in terms of B
    ======================================================================== */

_.deferTest (['stdlib', 'diff'], function () {

        $assert (_.diff ('foo', 'foo'), undefined)
        $assert (_.diff ('foo', 'bar'), 'bar')

        $assert (_.diff ({ a: 1, b: 2, c: 3 },
                         { a: 1, b: 3,      d: 4 }),
                         {       b: 3,      d: 4 })

        $assert (_.diff ([1,2,3], [1,2,3]), undefined)

        $assert (_.diff ([1,'foo',2], [1,2,3]), [2,3])

}, function () {

    _.hyperMatch = _.hyperOperator (_.binary, function (a, b, pred) {
                                        return _.coerceToUndefined (_.nonempty (_.zip2 (a, b, pred))) })

    _.diff = _.tails3 (_.hyperMatch, function (a, b) { 
                                        return  ((($atom.unwrap (a) === $atom.unwrap (b)) || (a === $any) || (b === $any)) ? undefined : b) }) })


/*  inverse of _.diff (returns similarities)
    ======================================================================== */

_.deferTest (['stdlib', 'undiff'], function () {

        $assert (_.undiff ('foo', 'foo'), 'foo')
        $assert (_.undiff ('foo', 'bar'), undefined)

        $assert (_.undiff ({ a: 1, b: 2, c: 3 },
                           { a: 1, b: 3,      d: 4 }),
                           { a: 1 })

        $assert (_.undiff ([1,2,3], [1,2,3]), [1,2,3])

        $assert (_.undiff ([1,2], [1,3]), [1,undefined])
        $assert (_.undiff ([1,2], [0,2]), [undefined,2])

}, function () {

    _.hyperMatch = _.hyperOperator (_.binary, function (a, b, pred) {
                                        return _.coerceToUndefined (_.zip2 (a, b, pred)) })

    _.undiff = _.tails3 (_.hyperMatch, function (a, b) {
                                            return (($atom.unwrap (a) === $atom.unwrap (b)) || (a === $any) || (b === $any))  ? b : undefined }) })


/*  Makes { foo: true, bar: true } from ['foo', 'bar']
    ======================================================================== */

_.withTest (['stdlib', 'index'], function () {
    
        $assert (_.index (['foo', 'bar']), { foo: true, bar: true }) }, function () { _.extend (_, {

    index: function (list) {
            var result = {}
            for (var i = 0, n = list.length; i < n; i++) {
                result[list[i]] = true }
            return result } }) })


/*  For string wrapping
    ======================================================================== */

_.withTest (['stdlib', 'quote'], function () {

        $assert (_.quote      ('qux'),           '"qux"')
        $assert (_.quote      ('qux', '[]'),     '[qux]')
        $assert (_.quote      ('qux', '/'),      '/qux/')
        $assert (_.quote      ('qux', '{  }'),   '{ qux }')
        $assert (_.quoteWith  ('[]', 'qux'), '[qux]') }, function () {

    _.quote = function (s, pattern_) {
                    var pattern = pattern_ || '"'
                    var splitAt = Math.floor (pattern.length / 2 + (pattern.length % 2))
                    var before  = pattern.slice (0, splitAt)
                    var after   = pattern.slice (splitAt) || before

                    return before + s + after }

    _.quoteWith  = _.flip2 (_.quote)
    _.quotesWith = _.higherOrder (_.quoteWith) })


/*  _.partition 2.0
    ======================================================================== */

_.withTest (['stdlib', 'partition2'], function () {

        $assert (_.partition2 (
                    [ 'a', 'b', 'c',   undefined, undefined,   'd'], _.isNonempty),
                    [['a', 'b', 'c'], [undefined, undefined], ['d']]) }, function () {

    _.partition2 = function (arr, pred) { var prevColor = undefined

            var result = []
            var group = []

            _.each (arr, function (x) { var color = pred (x)
                if (prevColor != color && group.length) {
                    result.push (group)
                    group = [] }
                group.push (x)
                prevColor = color })

            if (group.length) {
                result.push (group) }

            return result } })


/*  experimental shit (subject to removal)
    ======================================================================== */

_.key = function (fn) {
            return function (value, key) {
                return fn (key) } }

_.filterKeys = function (arr, predicate) {
                    return _.filter (arr, function (v, k) { return predicate (k) }) }

_.rejectKeys = function (arr, predicate) {
                    return _.reject (arr, function (v, k) { return predicate (k) }) }

_.pickKeys = function (obj, predicate) {
                    return _.pick (obj, function (v, k) { return predicate (k) }) }

_.omitKeys = function (obj, predicate) {
                    return _.omit (obj, function (v, k) { return predicate (k) }) }


