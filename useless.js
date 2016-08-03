/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
   ------------------------------------------------------------------- */

$uselessFile = 'useless.js'

/* -------------------------------------------------------------------
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_ = require ('underscore')


/*  Bootstrap code (couple of absolutely urgent fixes to underscore.js)
    ======================================================================== */

_ = (function () {

    _.mixin ({
        zipWith: function (rows, zippo) {
                    return _.reduce (_.rest (rows), function (memo, row) {
                        return _.times (Math.max ((memo && memo.length) || 0, (row && row.length) || 0), function (i) {
                            return zippo (memo && memo[i], row && row[i]) }) }, _.first (rows)) } })

    if ('a1 b2 c3' !== _.zipWith ([['a','b','c'], [1,2,3]], function (a, b) { return a + b }).join (' ')) {
        throw new Error ('_.zipWith broken') }

    return _ }) ()


/*  Internal dependencies
    ======================================================================== */


/*  Third party (free-licensed)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/3rd/unicode_hack')  // provides missing unicode regexp syntax
    require ('./base/3rd/Base64')        // Base64 encoder/decoder


/*  Basics of basics
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/tier0/platform')    // platform abstraction layer
    require ('./base/tier0/assert')      // $assert syntax
    require ('./base/tier0/arguments')   // argument count tracking utility (to streamline metaprogramming utilities)
    require ('./base/tier0/function')    // function-centric utilities
    require ('./base/tier0/busybox')     // a vocabulary for functional expressions that process real stuff
    require ('./base/tier0/type')        // type system extensions
    require ('./base/tier0/stdlib')      // consider it as underscore 2.0
    require ('./base/tier0/properties')  // properties 2.0
    require ('./base/tier0/keywords')    // metaprogramming utility
    require ('./base/tier0/typeMatch')   // advanced type system extensions
    require ('./base/tier0/stringify')   // configurable object printer
    require ('./base/tier0/squash')      // dependency list / tree squashing algorithms


/*  Delivers continuation-passing style notation to various common things
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/CPS')


/*  Provides infix notation for stdlib utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/infix/extensionMethods')    // bootstrap
    require ('./base/infix/Function')            // extends Function
    require ('./base/infix/Array')               // extends Array
    require ('./base/infix/String')              // extends String


/*  Dynamic code binding toolbox
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/dynamic/bindable')          // for ad-hoc dependency injection in any object's method
    require ('./base/dynamic/stream')            // a generalization of Event (multicast model for function calls)



/*  OOP paradigm
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/OOP')


/*  Otherwise basic utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/infix/Set')
    require ('./base/Promise+')
    require ('./base/Channel')
    require ('./base/Parse')           // clumsy parsing utils
    require ('./base/Sort')            // sort utils
    require ('./base/concurrency')     // concurrency utility
    require ('./base/math')            // math utility
    require ('./base/component')       // component facility
    require ('./base/Rx')              // regular expressions helper


/*  Developer tools
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/uncaught')        // uncaught exception facility
    require ('./base/reflection')      // callstack access + source code access
    require ('./base/log')             // logging facility
    require ('./base/Testosterone')    // unit test shell
    require ('./base/Androgene')       // a "promising" evolution of Testosterone.js (SKETCH)


/*  Experimental stuff
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/AOP')


/*  Networking
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/http')


/*  ==================================================================== */

    if ($platform.NodeJS) {
        module.exports = _ }

