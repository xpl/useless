"use strict";

const _ = require ('underscore')

/*  converts 'arguments' (and any other array mimick) to real Array
    ======================================================================== */

_.withTest (['stdlib', 'asArray'], function () {

    (function (a, b) {
        var args = _.asArray (arguments)

        $assert (_.isArray (args))
        $assert (args.length === 2)
        $assert (args[0] === a)
        $assert (args[1] === b) }) (42, 43)

        $assert (_.asArray (42), [42])

        /*  Should not mutate its argument (regression)
         */
        var foo =     { 0: 'foo', length: 1 }
        $assert (_.asArray (foo), ['foo'])
        $assert (foo, { 0: 'foo', length: 1 }) }, function () { _.extend (_, {

    asArray: function (x) {
                return (x.length !== undefined) ? [].slice.call (x, 0) : [x] } }) })

/*  Argument count tracking module (provides hinting to several metaprogramming
    utilities, like property definitions)
    ======================================================================== */

_.withTest ('argcount tracking', function () {

    var none        = function () {}
    var one         = function (a) {}
    var three       = function (a, b, c) {}
    var many        = $restArg (function () {})

    $assert (_.noArgs (none)    === true)
    $assert (_.hasArgs (none)   === false)
    $assert (_.numArgs (three)  === 3)
    $assert (_.hasArgs (three)  === true)
    $assert (_.restArg (many)   === true)
    $assert (_.noArgs (many)    === false)
    $assert (_.oneArg (one)     === true)

    var sameAsThree = _.withSameArgs (three, function () {})
    var oneArgLess  = _.withArgs (_.numArgs (three) - 1, _.restArg (three), function () {})

    $assert ([_.numArgs (sameAsThree), _.restArg (sameAsThree)], [3, false])
    $assert ([_.numArgs (oneArgLess ), _.restArg (oneArgLess )], [2, false])


}, function () { _.extend (_, {

    /*  Querying
     */
    numArgs: function (fn) {
                return fn._ac === undefined ? fn.length : fn._ac },     // short name for speed

    restArg: function (fn) {
                return fn._ra || false },                               // short name for speed

    noArgs: function (fn) {
                return (_.numArgs (fn) === 0) && !fn._ra },

    hasArgs: function (fn) {
                return (_.numArgs (fn) > 0) && !fn._ra },

    oneArg: function (fn) {
                return (_.numArgs (fn) === 1) && !fn._ra },

    /*  Setting
     */
    withRestArg: $global.$restArg = function (fn) {
                                        Object.defineProperty (fn, '_ra', { enumerable: false, writable: true, value: true })
                                        return fn },

    withArgs: function (numArgs, restArg, fn) {
                        if (numArgs !== undefined) {
                            Object.defineProperty (fn, '_ac', { enumerable: false, writable: true, value: numArgs }) }
                        if (restArg !== undefined) {
                            Object.defineProperty (fn, '_ra', { enumerable: false, writable: true, value: restArg }) }
                        return fn },

    withSameArgs: function (other, fn) {
                        return _.withArgs (_.numArgs (other), _.restArg (other), fn) } }) })

/*  Adds argcount tracking to some underscore functions.
    Will test it for speed in future, and if slow in app code,
    will be de-mounted, thus sacrificing clarity in some places.
    ======================================================================== */

;(function () {

    var override = function (name, genImpl) {
                        return _[name] = genImpl (_[name]) }

    override ('memoize',
        function (memoize) {
            return function (fn) {
                        return _.withSameArgs (fn, memoize (fn)) } })

    override ('partial',
        function (partial) {
            return $restArg (function (fn) {
                                    return _.withArgs (
                                        Math.max (0, _.numArgs (fn) - (arguments.length - 1)), fn._ra,
                                            partial.apply (this, arguments)) }) })

    override ('bind',
        function (bind) {
            return $restArg (function (fn, this_) {
                                return _.withArgs (
                                    Math.max (0, _.numArgs (fn) - (arguments.length - 2)), fn._ra,
                                        bind.apply (this, arguments)) }) })

}) ();
