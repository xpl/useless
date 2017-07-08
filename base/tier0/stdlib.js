"use strict";

const _    = require ('underscore')
const O    = require ('es7-object-polyfill')
const Meta = require ('meta-fields')

_.hasStdlib = true

/*  _.throwsError
    ======================================================================== */

_.withTest (['stdlib', 'throwsError'], function () {

        $assertThrows (_.throws ('foo'), 'foo')

        $assertThrows (_.throwsError (           'неуловимый Джо'),  _.matches ({ message: 'неуловимый Джо' }))
        $assertThrows (_.throwsError (new Error ('неуловимый Джо')), _.matches ({ message: 'неуловимый Джо' }))   },

    function () {

        _.throwsError = _.higherOrder (
            _.throwError = function (msg) {
                             throw (msg instanceof Error) ? msg : new Error (msg) })

        _.throws = _.higherOrder (
                        _.throw = function (msg) { throw msg })

        _.overrideThis   = _.throwsError ('override this')
        _.notImplemented = _.throwsError ('not implemented') })


/*  Abstract _.values
    ======================================================================== */

_.withTest (['stdlib', 'values2'], function () {

    $assert (_.values2 (undefined), [])
    $assert (_.values2 (_.identity), [_.identity])
    $assert (_.values2 ('foo'), ['foo'])
    $assert (_.values2 (['foo', 'bar']), ['foo', 'bar'])
    $assert (_.values2 ({ f: 'foo', b: 'bar' }), ['foo', 'bar'])

}, function () { _.mixin ({
                    values2: function (x) {
                             if (_.isArrayLike (x))         { return x }
                        else if (_.isStrictlyObject (x))    { return _.values (x) }
                        else if (_.isEmpty (x))             { return [] }
                        else                                { return [x] } } }) })

/*  Map 2.0
    ======================================================================== */

/*  Semantically-correct abstract map (maps any type of value)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'map2'], function () {

                                 var plusBar =   _.appends ('bar')

    $assert (_.map2 (       'foo',   plusBar),           'foobar'  )
    $assert (_.map2 ([      'foo'],  plusBar),    [      'foobar' ])
    $assert (_.map2 ({ foo: 'foo' }, plusBar),    { foo: 'foobar' })

    $assert (Array.from (_.map2 (new Set (['foo',    'bar']), plusBar).values ()),
                                          ['foobar', 'barbar'])

    /*  With flipped order of arguments (callback first)
     */
    $assert (_.mapWith (plusBar, { foo: 'foo' }), { foo: 'foobar' })

}, function () { _.mixin ({     map2: function (value,                       fn,      context) { return (
                                 _.isArrayLike (value) ? _.map       (value, fn,      context) : (
                                (value instanceof Set) ? _.mapSet    (value, fn,      context) : (
                            _.isStrictlyObject (value) ? _.mapValues (value, fn,      context) :
                                                                             fn.call (context, value)))) } })

                _.mapSet = function (set, fn, ctx) { var out = new Set ()
                                                     for (var x of set) { out.add (fn.call (ctx, x)) }
                                                     return out }
                _.mapsWith = _.higherOrder (
                _.mapWith  = _.flip2 (_.map2)) })

/*  Pluck 2.0
    ======================================================================== */

_.pluck2 = function (x, prop) {
                return _.map2 (x, _.property (prop)) }


/*  Maps one-to-many
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'scatter/obj/arr'], function () {

    $assert (undefined, _.scatter ([], _.noop))

    $assert ([1,10, 2,20, 3,30],         _.scatter ([1,2,3], function (x, i, return_) { return_ (x); return_ (x * 10) }))
    $assert ({ 'b': 0, 'a': 1, 'r': 2 }, _.scatter ('bar',   function (x, i, return_) { _.each (x.split (''), _.flip (return_)) }))

    $assert (_.obj (_.noop),
             _.arr (_.noop), undefined)

    $assert (_.obj (function (emit) {
                              emit (42, 'foo')
                              emit (43, 'bar') }), { foo: 42, bar: 43 })

    $assert (_.arr (function (emit) {
                              emit (42)
                              emit (43, 44) }), [42, [43, 44]])

}, function () { _.mixin ({
                    scatter: function (obj, elem) { var result = undefined
                                _.map2 (obj, function (x, i) {
                                                 elem (x, i, function (v, k) {
                                                                if (arguments.length < 2) { (result = result || []).push (v) }  
                                                                                     else { (result = result || {})[k] = v } }) }); return result } })
                 _.obj = function (emitItems) {
                            var x = undefined; emitItems (function (v, k)  { (x = x || {})[k] = v  })
                         return x }

                 _.arr = function (emitItems) {
                            var x = undefined; emitItems (function (v    ) { (x = x || []).push ((arguments.length < 2) ? v : _.asArray (arguments)) })
                         return x } })


/*  Maps keys (instead of values)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'mapKeys'], function () {

    $assert (_.mapKeys ({ 'foo':    [1, 2,{ 'gay':    3 }]}, _.appends ('bar')),
                        { 'foobar': [1, 2,{ 'gaybar': 3 }]})

}, function () { _.mapKeys = function (x, fn) {
                        if (_.isArrayLike (x)) {
                            return _.map (x, _.tails2 (_.mapKeys, fn)) }
                        else if (_.isStrictlyObject (x)) {
                            return _.fromPairs (_.map (O.entries (x), function (kv) { return [fn (kv[0]), _.mapKeys (kv[1], fn)] })) }
                        else {
                            return x } } })              


/*  Hyper map (deep) #1 — maps leafs
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'mapMap'], function () {

        $assert (_.mapMap ( 7,  _.typeOf),  'number')   // degenerate cases
        $assert (_.mapMap ([7], _.typeOf), ['number'])

        $assert (_.mapMap ( {   foo: 7,
                                bar: ['foo', {
                                    bar: undefined } ] }, _.typeOf),
                            
                            {   foo: 'number',
                                bar: ['string', {
                                    bar: 'undefined' } ] }) },
    function () {

        _.mapMap = _.hyperOperator (_.unary, _.map2) })


/*  Hyper map (deep) #2 — maps branches & leafs 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'hyperMap'], function () {

        var complexObject = {  garply:         { bar: { baz: 5 } },
                               frobni: { foo: [{ bar: { baz: 5 } }] } }
    /*                                         -----------------             */

        var barBazSubstructure =    _.matches ({ bar: { baz: 5 } })

        var transformedObject = _.hyperMap (complexObject, function (x) {
                                                                if (barBazSubstructure (x)) { return 'pwned!' } })

        $assert (transformedObject, { garply:         'pwned!',
                                      frobni: { foo: ['pwned!'] } })         },

    function () {

        _.hyperMap =  function (data, op) {
                        return _.hyperOperator (_.unary, function    (expr, f) {
                                                           return op (expr) ||
                                                              _.map2 (expr, f) }) (data, _.identity) } })


/*  Abstract _.pairs
    ======================================================================== */

_.withTest (['stdlib', 'pairs2'], function () {

    $assert (_.pairs2 (undefined),              [[undefined, undefined]]) // TODO: unify semantics with _.values2
    $assert (_.pairs2 (_.identity),             [[undefined, _.identity]])
    $assert (_.pairs2 ('foo'),                  [[undefined, 'foo']])
    $assert (_.pairs2 (['foo', 'bar']),         [[ 0,  'foo'], [ 1,  'bar']])
    $assert (_.pairs2 ({ 0: 'foo', 1: 'bar' }), [['0', 'foo'], ['1', 'bar']]) },

        function () {

            _.pairs2 = function (x) { return _.scatter (x, function (x, i, return_) { return_ ([i, x]) }) } })



/*  Filter 2.0
    ======================================================================== */

_.withTest (['stdlib', 'filter 2.0'], function () { var foo = _.equals ('foo')

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

    // hyper-filter #1 (works on leafs)

    $assert (_.filterFilter (
                    { foo: 'foo',   bar: [7, 'foo', { bar: 'foo' }] }, _.not (_.equals ('foo'))),
                    {               bar: [7,        {            }] })  

    // there was a bug

    $assert (_.hyperFilter ({ foo: /regexp/ }, _.constant (true)).foo instanceof RegExp)

}, function () {

    _.reject2 = function (value, op) {
        return _.filter2 (value, _.not (op)) }

    _.filter2 = function (value, op) {
        if (_.isArrayLike (value)) {                            var result = []
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
                return undefined } } }

        _.filterFilter = _.hyperOperator (_.unary, _.filter2)

        _.hyperFilter =  function (data, op) {
                           return _.hyperOperator (_.unary, function (                   expr, f) {
                                                           var x =                   op (expr)
                                                      return ((x === true) && _.filter2 (expr, f)) || x }) (data, _.identity) }

        _.hyperReject = function (data, op) {
            return _.hyperFilter (data, function (x) { var  opa = op (x)
                                        return _.isBoolean (opa) ?
                                                           !opa  :
                                                            opa }) }
})

/*  ------------------------------------------------------------------------ */

_.withTest (['stdlib', 'each 2.0'], function () {

    var test = function (input) {                                        var output = []
                _.each2 (input, function ( x,     i,          n) {           output.push (
                                         [ x,     i,          n]) }); return output }
                            
        $assert (test ( 'foo'),         [['foo',  undefined,  1]])        
        $assert (test (['foo', 'bar']), [['foo',  0,          2],
                                         ['bar',  1,          2]])
        $assert (test ({ 'f': 'oo',
                         'b': 'ar' }),  [[ 'oo', 'f',         2],
                                         [ 'ar', 'b',         2]])
}, function () { 

    _.each2 =            function (x,                                                                           f) {
           if (     _.isArrayLike (x)) {                          for (var     i = 0, n = x.length; i < n; i++) f (x[       i ],     i, n) } // @hide
      else if (_.isStrictlyObject (x)) { var k = Object.keys (x); for (var ki, i = 0, n = k.length; i < n; i++) f (x[ki = k[i]],    ki, n) }
         else                          {                                                                        f (x,        undefined, 1) } } })


/*  Reduce on steroids
    ======================================================================== */

_.withTest (['stdlib', 'reduce 2.0'], function () {

    $assert (_.reduce2 (     3,   [7,    9 ], _.sum), 19)
    $assert (_.reduce2 ([    3,    7,    9 ], _.sum), 19)
    $assert (_.reduce2 ({ a: 3, b: 7, c: 9 }, _.sum), 19)
    $assert (_.reduce2 (     3   + 7   + 9  , _.sum), 19)

    $assert (_.reduce2 ([1], _.sum), 1)
    $assert (_.reduce2 ([],  _.sum), undefined)

    $assert (              1 + 20 + 3 + 4 + 5,
        _.reduceReduce ([[[1], 20],[3,[ 4,  5]]], function (a, b) { return (_.isNumber (a) && _.isNumber (b)) ? (a + b) : b }))

}, function () {

    /*  Because hyperOperator is fractal thing, it is nessesary to define a compatible argument
        order for _.reduce and its functor operand, as they get melted together to form a generic
        self-similar routine of a higher order.

        And that becames kinda "Yodish" when applied to familiar 'reduce'. See how they dont match:

            1. _.reduce (value, op, memo)
            2.       op (memo, value)
    */

    _.reduce2 = function (        _1,                 _2,      _3) { var no_left = arguments.length < 3
                       var left = _1,        rights = _2, op = _3
         if (no_left) {    left = undefined; rights = _1; op = _2 }

         _.each2 (rights, function (right, i) {
                  left =  no_left ? right :
                          op (left, right); no_left = false }); return left } // @hide

    _.reduceReduce = function (_1, _2, _3) {                             var initial = _1, value = _2, op = _3
                        if (arguments.length < 3) {                          initial = {}; value = _1; op = _2 }
                        return _.hyperOperator (_.binary,
                                                _.reduce2,
                                                _.goDeeperAlwaysIfPossible) (initial,      value,      op) }
 })


/*  Abstract concat
    ======================================================================== */

_.withTest (['stdlib', 'concat2'], function () {

    $assert (_.concat ([1,2], [3], [4,5]), [1,2,3,4,5])
    $assert (_.concat ( { foo: 1 }, { bar: 2 }),  { foo: 1, bar: 2 })
    $assert (_.concat ([{ foo: 1 }, { bar: 2 }]), { foo: 1, bar: 2 })
    $assert (_.concat (1,2,3), 6)

}, function () { 

    _.concat = function (a, b) { var      first,          rest
            if (arguments.length === 1) { first = a[0];   rest =  a.slice (1) }
            else {                        first = a;      rest =  [].slice.call (arguments, 1) }

            return _.isArrayLike (first)
                          ? first.concat.apply (first, rest)
                          :          _.reduce2 (first, rest, function (              a,  b) {
                                                                if (_.isObject (     a) &&
                                                                    _.isObject (         b)) {
                                                                return _.extend ({}, a,  b)  }
                                                        else {  return               a + b   } }) } })

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

    $assert (_.zipObjectsWith ([
                { name: 'string' },
                { born: 123 }], _.array),
            
                { name: ['string',  undefined],
                  born: [undefined, 123] })

    $assert ([3], _.zipSetsWith ([
                    new Set ([2,3]),
                    new Set ([3,4])], function (a, b) { return a && b }).asArray)

}, function () { _.mixin ({

    zipSetsWith: function (sets, fn) {
                    return _.reduce (sets.slice (1), function (memo, obj) {
                        _.each (_.union (( obj && Array.from ( obj.values ())) || [],
                                         (memo && Array.from (memo.values ())) || []), function (k) {

                            var zipped = fn ((memo && memo.has (k)) ? k : undefined,
                                              (obj &&  obj.has (k))  ? k : undefined)
                            if (zipped === undefined) {
                                memo.delete (k) }
                            else {
                                memo.add (zipped) } }); return memo }, new Set (sets[0])) },

    zipObjectsWith: function (objects, fn) {
        return _.reduce (objects.slice (1), function (memo, obj) {
            _.each (_.union (_.keys (obj), _.keys (memo)), function (k) {
                var zipped = fn (memo && memo[k], obj && obj[k])
                if (zipped === undefined) {
                    delete memo[k] }
                else {
                    memo[k] = zipped } }); return memo }, _.clone (objects[0])) },

    zip2: function (rows_, fn_) {   var rows = arguments.length === 2 ? rows_ : _.initial (arguments)
                                    var fn   = arguments.length === 2 ? fn_   : _.last (arguments)
        if (!_.isArrayLike (rows) || rows.length === 0) {
            return rows }
        else {
                 if (_.isArrayLike (rows[0]))      { return _.zipWith        (rows, fn) }
            else if (rows[0] instanceof Set)       { return _.zipSetsWith    (rows, fn) }
            else if (_.isStrictlyObject (rows[0])) { return _.zipObjectsWith (rows, fn) }
                                              else { return _.reduce2        (rows, fn) } } } }) })


/*  Hyperzip (deep one).
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'zipZip'], function () {

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

        /*  NOW DEPRECATED, USE _.extendedDeep
         */
        (function () {
            var input   = { foo:1,  bar: { qux:1 } }
            var plus    = { foo:42, bar: { baz:1 } }
            var gives   = { foo:42, bar: { baz:1, qux:1 }}

            $assert (_.extend2 (input, plus), gives) }) (),

        /*  Deep version of _.extend, allowing to extend arbitrary levels deep (referentially transparent, so _.extendedDeep instead of _.extendDeep)
         */
        (function () {

            var input   = { foo:1,  bar: { qux:1 } }
            var plus    = { foo:42, bar: { baz:1 } }
            var gives   = { foo:42, bar: { baz:1, qux:1 }}

            $assert (_.extendedDeep (input, plus), gives)

            $assert (_.extendedDeep ({ foo: new Set ([7]) }, {}).foo instanceof Set)

            $assert (Array.from (_.extendedDeep ({ foo: new Set ([1,2]) },
                                                 { foo: new Set ([2,3]) }).foo.values ()), [1,2,3])

            $assert (_.extendedDeep ({ foo: 4 }, { bar: 5 }, { qux: 6 }), { foo: 4, bar: 5, qux: 6 }) // >2 arguments

            $assert (_.extendedDeep ({ foo: ['a', 'b'] }, { foo: ['c'] }), { foo: ['c'] })                     // default array merge semantics (replace)
            $assert (_.extendedDeep ({ foo: ['a', 'b'] }, { foo: $concat (['c']) }), { foo: ['a', 'b', 'c'] }) // optional merge semantics (concats arrays)

        }) (),

        /*  Referentially-transparent version (to be used in functional expressions)
         */
        (function () {
            var x = { foo: 1 }

            $assert (_.extended (x, { bar: 1 }), { foo: 1, bar: 1 })
            $assert (            x,              { foo: 1 }) }) () ]  }, function () {

    _.extend = $restArg (_.extend) // Mark as having rest argument (to make _.flip work on that shit)

    _.extended = $restArg (function () { return _.extend.apply (this, [{}].concat (_.asArray (arguments))) }) // referentially-transparent version

    _.extendWith = _.flip (_.extend)                                        
    _.extendsWith = _.flip (_.partial (_.partial, _.flip (_.extend)))   // higher order shit

    Meta.globalTag ('concat')

    _.extendedDeep = (...args) => _.reduce (args, (a, b) => _.extendedDeep.zipZip (a, b, ($a, $b) => {

        const a = $untag ($a),
              b = $untag ($b)

        return (b === undefined)
                    ? a
                    : (_.isArray (a) && $concat.is ($b))
                        ? a.concat (b)
                        : b
    }))

    _.extendedDeep.zipZip = _.hyperOperator (_.binary, _.zip2, _.goDeeperWhenFirstArgumentIsGood, x => !_.isArray (x) && _.isNonTrivial (x))

    _.extend2 = $restArg (function (what) { 
                                return _.extend (what, _.reduceRight (arguments, function (right, left) {
                                    return _.fromPairs (_.map (_.union (_.keys (left), _.keys (right)),
                                                                function (key) {
                                                                    var lvalue = left[key]
                                                                    return [key, (key in right) ?
                                                                                    (typeof lvalue === 'object' ?
                                                                                        _.extend (lvalue, right[key]) :
                                                                                        right[key]) :
                                                                                    lvalue] }))}, {})) }) })

/*  Find 2.0 + Hyperfind
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest (['stdlib', 'findFind'], function () {

    var obj = { x: 1, y: { z: 2 }}

    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.constant (false)), false)
    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.equals (2)),       2)
    $assert (_.findFind ({ foo: { bar: obj     } }, _.equals (obj)),     obj) },

function () {

    _.find2 = function (value, pred) {
        if (_.isArrayLike (value)) {                                
            for (var i = 0, n = value.length; i < n; i++) { var x = pred (value[i], i, value)
                              if (typeof x !== 'boolean') { return x }
                                     else if (x === true) { return value[i] } } }
        else if (_.isStrictlyObject (value)) {        
            for (var i = 0, ks = Object.keys (value), n = ks.length; i < n; i++) { var k = ks[i]; var x = pred (value[k], k, value)
                                                     if (typeof x !== 'boolean') { return x }
                                                            else if (x === true) { return value[k] } } } }

    _.findFind = function (obj, pred_) {
                    return _.hyperOperator (_.unary,
                             function (value, pred) {
                                    if (_.isArrayLike (value)) {                                
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

    var Proto = $prototype ({})

    var obj     = { a: [{ b: { c: 'd' } }], b: {}, c: new Proto (), e: new Date ()  }
    var copy    = _.cloneDeep (obj)

    $assert (obj   !== copy)    // should be distinct references
    $assert (obj.a !== copy.a)  //
    $assert (obj.b !== copy.b)  //
    $assert (obj.c === copy.c)  // should be same instance (should consider prototype instances as atomic value)
    $assert (obj.e === copy.e)  // Date should not be cloned

    $assert (obj, copy)     // structure should not change

    $assert (            _.cloneDeep ({ foo: new Set ()        }).foo instanceof Set)
    $assert (Array.from (_.cloneDeep ({ foo: new Set ([1,2,3]) }).foo.values ()), [1,2,3])

}, function () { _.extend (_, {

    clone: function (x) {
                return  (x instanceof Set) ? new Set (x) :
                        ((x instanceof Date) ? x :
                         (!_.isObject (x)   ? x :
                         (_.isArray   (x)   ? x.slice () : _.extend ({}, x)))) },

    cloneDeep: _.tails2 (_.mapMap, function (value) {
                                        return ( _.isStrictlyObject    (value) &&
                                                !_.isPrototypeInstance (value)) ? _.clone (value) : value }) }) })


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

        $assert (_.quote      ('qux'),            'qux')
        $assert (_.quote      ('qux', '[]'),     '[qux]')
        $assert (_.quote      ('qux', '/'),      '/qux/')
        $assert (_.quote      ('qux', '{  }'),   '{ qux }')
        $assert (_.quote      ('qux', '</>'),    '</qux>')
        $assert (_.quoteWith  ('[]', 'qux'), '[qux]') }, function () {

    _.quote = function (s, pattern_) {
                    var pattern = pattern_ || ''
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
                    [ 'a', 'b', 'c',   undefined, undefined,   42], _.isNonempty),
                    [['a', 'b', 'c'], [undefined, undefined], [42]])

        $assert (_.partition3 ([ 'a', 'b', 'c', undefined, undefined, 42], _.typeOf),
                [{ label: 'string',    items: ['a', 'b', 'c'] },
                 { label: 'undefined', items: [undefined, undefined] },
                 { label: 'number',    items: [42] }])

        $assert (_.partition3 ([ { foo: 'a' }, { foo: 'a' }, { foo: 'b' }], 'foo'),

                    [{ foo: 'a', items: [{ foo: 'a' }, { foo: 'a' }] },
                     { foo: 'b', items: [{ foo: 'b' }]               }])



    }, function () {

    _.partition2 = function (arr, pick) { return _.pluck (_.partition3 (arr, pick), 'items') }

    _.partition3 = function (arr_, pick) {  var arr  = arr_ || []
                                            var spans = [],
                                                span  = { label: undefined, items: [arr.first] }

            const prop = _.isFunction (pick) ? 'label' : pick
            const pickFn = _.isFunction (pick) ? pick : x => x[pick]

            _.each (arr, function (x, i) { var value = pickFn (x, i)
                if ((span[prop] != value) &&
                     span.items.length) { spans.push (span = { [prop]: value, items: [x] }) }
                                   else { span.items.push (x) } })

            return (span.length && spans.push (span)),
                    spans } })


/*  Taken from  npmjs.com/package/longest-common-substring
    Props to    npmjs.com/~mirkok
    ======================================================================== */


_.withTest (['stdlib', 'longestCommonSubstring'], function () {

    $assert ('foo', _.longestCommonSubstring ('foo', 'ffooa'))

}, function () {
    
    var indexMap = function(list) {
        var map = {}
        _.each (list, function(each, i) {
            map[each] = map[each] || []
            map[each].push(i) })
        return map }

    _.longestCommonSubstring = function (a, b) {
        var where = _.indexOfLongestCommonSubstring (a, b)
        return (where.length) ? a.substr (where.a, where.length) : undefined }

    _.indexOfLongestCommonSubstring = function(a, b) {
        var result = { a:0, b:0, length:0}
        var indexMapBefore = indexMap(a)
        var previousOverlap = []
        _.each (b, function(eachAfter, indexAfter) {
            var overlapLength
            var overlap = []
            var indexesBefore = indexMapBefore[eachAfter] || []
            _.each (indexesBefore, function(indexBefore) {
                overlapLength = ((indexBefore && previousOverlap[indexBefore-1]) || 0) + 1;
                if (overlapLength > result.length) {
                    result.length = overlapLength;
                    result.a = indexBefore - overlapLength + 1;
                    result.b = indexAfter - overlapLength + 1; }
                overlap[indexBefore] = overlapLength })
            previousOverlap = overlap })
        return result } })


/*  experimental shit (subject to removal)
    ======================================================================== */

_.key = function (fn) {
            return function (value, key) {
                return fn (key) } }

_.pickKeys = function (obj, predicate) {
                    return _.pick (obj, function (v, k) { return predicate (k) }) }

