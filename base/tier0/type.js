/*  isTypeOf (bootstrap for OOP.js)
    ======================================================================== */

_.isInstanceofSyntaxAvailable = function () { var e = new Error ()
    try       { return e instanceof Error }
    catch (e) { return false } }

_.isTypeOf_ES4 = function (constructor, what) {
    while (what) {
        if (what.constructor === constructor) {
            return true }
        what = what.constructor.$base }
    return false }

_.isTypeOf_ES5 = function (constructor, what) {
    return what instanceof constructor }

_.isTypeOf = _.isInstanceofSyntaxAvailable () ? _.isTypeOf_ES5 : _.isTypeOf_ES4

_.isPrototypeInstance = function (x) {
    return x && x.constructor && _.isPrototypeConstructor (x.constructor) }

_.isPrototypeConstructor = function (x) {
    return (x && (x.$definition !== undefined)) || false }

/*  Useful for defining functions that accept either [x] or x as argument
    ======================================================================== */

_.coerceToArray = function (x) {
                        return (x === undefined) ? [] : (_.isArray (x) ? x : [x]) }

/*  Fixes _.isArray to account objects that derive from Array prototype
    ======================================================================== */

_.deferTest (['type', 'isArray'], function () {

        var CustomArray = $extends (Array, {
            method: function () { return 42 } })

        $assert (_.isArray (new CustomArray ())) }, function () {

    $overrideUnderscore ('isArray', function (isArray) {
        return function (x) {
            return _.isTypeOf (Array, x) || isArray (x) } }) })

/*  Better _.matches / $assertMatches: +regexp feature, +deep matching
    ======================================================================== */

_.deferTest (['type', 'matches(regex)'], function () {

    var test = function (a, pattern) {
        $assert (_.match (a, pattern))
        $assert (_.matches (pattern) (a))
        $assertMatches (a, pattern) }

    $assertFails (function () {
        test ({ foo: [1,2], bar: 2 },
              { foo: [3], bar: 2 })
        test ({ bar: { foo: 'foo' } },
              { bar: { foo: /[0-9]+/ } })
        test ({}, { foo: 1 }) })

    $assertFails (function () {
        test ({ foo: 1 }, undefined)    // differs from original impl in that
        test ('.DS_Store', /.+\.js/) }) // regression

    test ({ foo: [1,2], bar: 2 },
          { foo: [2] })
    test ({ bar: { foo: '123', qux: 1 } },
          { bar: { foo: /[0-9]+/ } })
    test ({ foo: 1 }, {}) },

    function () { _.mixin ({

        matches: function (pattern) {
                        return ((arguments.length === 0) && _.constant (true)) ||
                                                            _.tails2 (_.match, pattern) },

        match: function (a, ptrn) {
                        return  (a === ptrn)
                            ||  (_.isArray (a)  && _.isArray (ptrn)  && _.arrayMatch (a, ptrn))
                            ||  (_.isObject (a) && _.isObject (ptrn) && _.objectMatch (a, ptrn))
                            ||  (_.isTypeOf (RegExp, ptrn) && _.isString (a) && (a.match (ptrn) !== null)) },

        arrayMatch: function (a, pattern) {
            return _.every (pattern, _.propertyOf (_.index (a))) },
         
        objectMatch: function (a, pattern) {
                            return _.reduce (_.pairs (pattern),
                                function (result, kv) {
                                    return result && _.match (a[kv[0]], kv[1]) }, true) } }) })

/*  POD data types
    ======================================================================== */

_.withTest (['type', 'POD'], function () {

    $assert (_.every ([[], {}, 42, 'foo', null, undefined, true].map (_.isPOD)))
    $assert (_.every ([/foo/, new Date ()].map (_.isNonPOD)))

}, function () { _.extend (_, {

    isNonPOD: function (v) {
        return (v && v.constructor) &&
            (v.constructor !== Object) &&
            (v.constructor !== Array) &&
            (v.constructor !== String) &&
            (v.constructor !== Number) &&
            (v.constructor !== Boolean) },

    isPOD: function (v) {
        return !_.isNonPOD (v) } }) })

/*  Numbers
    ======================================================================== */

_.withTest (['type', 'numbers'], function () {

    $assert (_.every (_.map ([0,        1,     -7,    200003, 12344567788], _.arity1 (_.not (_.isDecimal)))))
    $assert (_.every (_.map ([0.1, -0.001, 0.0001, -0.000001,    0.000001], _.arity1 (       _.isDecimal))))

    $assert (_.isDecimal (0.003, 0.01), false) // custom tolerance

}, function () {

    if (typeof Number.EPSILON === 'undefined') {
        Object.defineProperty (Number, 'EPSILON', { enumerable: true,
                                                    get:  _.constant (2.2204460492503130808472633361816E-16) }) } // NodeJS lack this

    _.extend (_, {
        isDecimal: function (x, tolerance) {
                        if (!_.isNumber (x) || _.isNaN (x)) {
                            return false }
                        else {
                            return (Math.abs (Math.floor (x) - x) > (tolerance || Number.EPSILON)) } } }) })

/*  'empty' classifiers (fixes underscore shit)
    ======================================================================== */

_.withTest (['type', 'empty-centric routines'], function () {

    $assert (_.coerceToObject ({ foo: 42 }), { foo: 42 })
    $assert (_.coerceToObject ([1,2,3]),     [1,2,3])
    $assert (_.coerceToObject (42),          {})
    $assert (_.coerceToObject (undefined),   {})

    $assert (_.coerceToEmpty (42), undefined)
    $assert (_.coerceToEmpty ([42]), [])
    $assert (_.coerceToEmpty ({ foo: 42 }), {})

    $assert ([
        _.isNonemptyString ('foo'),
        _.isNonemptyString (''),
        _.isNonemptyString ([])], [true, false, false])

    $assert (_.isEmptyArray ([]),           true)
    $assert (_.isEmptyArray ([1,2,3]),      false)
    $assert (_.isEmptyArray (undefined),    false)
    $assert (_.isEmptyArray (null),         false)
    $assert (_.isEmptyArray (''),           false)

    $assert (_.isEmptyObject ({}),          true)
    $assert (_.isEmptyObject ([]),          false)
    $assert (_.isEmptyObject ({ foo: 1 }),  false)
    $assert (_.isEmptyObject (undefined),   false) 
    $assert (_.isEmptyObject (null),        false)
    $assert (_.isEmptyObject (''),          false)
    $assert (_.isEmptyObject (0),           false)
    $assert (_.isEmptyObject (false),       false)

    $assert (_.isEmpty (0),         false)
    $assert (_.isEmpty (false),     false)
    $assert (_.isEmpty (/.+\.js/),  false) // regression
    $assert (_.isEmpty (null),      true)
    $assert (_.isEmpty ({}),        true)
    $assert (_.isEmpty ([]),        true)

    $assert (_.isNonempty ('foo'),  true) // negated _.isEmpty

    $assert (_.coerceToUndefined (undefined),   undefined)
    $assert (_.coerceToUndefined ({}),          undefined)
    $assert (_.coerceToUndefined ([]),          undefined)
    $assert (_.coerceToUndefined (''),          undefined)
    $assert (_.coerceToUndefined (null),        undefined)
    $assert (_.coerceToUndefined (0),           0)
    $assert (_.coerceToUndefined (Math.NaN),    undefined)
    $assert (_.coerceToUndefined (false),       false)
    $assert (_.coerceToUndefined ({ foo: 1 }),  { foo: 1 })
    $assert (_.coerceToUndefined ([1, 2]),      [1, 2])  }, function () { _.extend (_, {

    /*  These two override underscore's one, because the original stuff is semantically incorrect.
        A word needs to be spoken here, because it's not the first routine we override, and not
        the last. So what about semantics?

        For instance, 0 and false should NOT be treated as empty. But they are (in underscore).
        This is ridiculous. Can think of hundreds of applications of the correct impl., and
        just none of that for the creeped original version. Why would one ever need to treat 0
        as 'empty'? Shit, its just a regular number, no worse or better than 1 or 42. And 'false'?
        Keep hands off boolean logic. If someone states that something's false - it's false, not
        a 'void non-existing piece of nothing'. It's a value. It has value. And it's false. Oh,
        fock, just don't get me started...
     */
    isEmpty: function (obj) {
        return _.coerceToUndefined (obj) === undefined },

    isNonempty: function (obj) {
        return _.coerceToUndefined (obj) !== undefined },

    isEmptyObject: function (v) {
                        return   !_.isArray (v) &&
                                 !_.isFunction (v) &&
                                  _.isObject (v) &&
                                 (_.keys (v).length === 0) },

    isStrictlyObject: function (v) {
        return (v && (typeof v === 'object')) ? true : false },

    isEmptyArray: function (v) {
                        return _.isArray (v) && v.length === 0 },

    isNonemptyString: function (v) {
        return (typeof v === 'string') && (v.length > 0) },

    coerceToObject: function (x) {
        return _.isStrictlyObject (x) ? x : {} },

    coerceToEmpty: function (x) {
        if (_.isArray (x)) { return [] }
        else if (_.isStrictlyObject (x)) { return {} }
        else { return undefined } },

    /*  Projects a variety of input values through 'undefined/non-undefined' dichotomy.
     */
    coerceToUndefined: function (v) {
                            return ((v === undefined) ||
                                    (v === null) ||
                                    (v === Math.NaN) ||
                                    (v === '') ||
                                    (_.isPOD (v) &&
                                        (_.isEmptyObject (v) ||
                                        (v.length === 0)))) ? undefined : v } })} )






