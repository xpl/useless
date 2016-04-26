/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
   ------------------------------------------------------------------- */

$uselessFile = 'useless.js'

/* -------------------------------------------------------------------
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/*  As we do not run macro processor on server scripts, $include reduces to
    built-in require (if running in Node.js environment)
    ======================================================================== */

if (typeof require !== 'undefined') {
    _ = require ('underscore')
    $include = require }


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

    $include ('./base/3rd/unicode_hack')  // provides missing unicode regexp syntax
    $include ('./base/3rd/Base64')        // Base64 encoder/decoder


/*  Basics of basics
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/tier0/platform')    // platform abstraction layer
    $include ('./base/tier0/assert')      // $assert syntax
    $include ('./base/tier0/arguments')   // argument count tracking utility (to streamline metaprogramming utilities)
    $include ('./base/tier0/function')    // function-centric utilities
    $include ('./base/tier0/busybox')     // a vocabulary for functional expressions that process real stuff
    $include ('./base/tier0/type')        // type system extensions
    $include ('./base/tier0/stdlib')      // consider it as underscore 2.0
    $include ('./base/tier0/properties')  // properties 2.0
    $include ('./base/tier0/keywords')    // metaprogramming utility
    $include ('./base/tier0/typeMatch')   // advanced type system extensions
    $include ('./base/tier0/stringify')   // configurable object printer


/*  Delivers continuation-passing style notation to various common things
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/CPS')


/*  Provides infix notation for stdlib utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/infix/extensionMethods')    // bootstrap
    $include ('./base/infix/Function')            // extends Function
    $include ('./base/infix/Array')               // extends Array
    $include ('./base/infix/String')              // extends String


/*  Dynamic code binding toolbox
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/dynamic/bindable')          // for ad-hoc dependency injection in any object's method
    $include ('./base/dynamic/stream')            // a generalization of Event (multicast model for function calls)


/*  OOP paradigm
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/OOP')


/*  Otherwise basic utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/Parse')           // clumsy parsing utils
    $include ('./base/Sort')            // (this one is normal)

    $include ('./base/concurrency')     // concurrency utility
    $include ('./base/math')            // math utility
    $include ('./base/component')       // component facility
    $include ('./base/Rx')              // regular expressions helper


/*  Developer tools
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/uncaught')        // uncaught exception facility
    $include ('./base/reflection')      // callstack access + source code access
    $include ('./base/log')             // logging facility
    $include ('./base/Testosterone')    // unit test shell
    $include ('./base/profiling')       // performance measurement utility


/*  Experimental stuff
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/AOP')
    $include ('./base/Promise+')


/*  Networking
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/Http')


/*  Browser-related code
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (Platform.Browser) {
        $include ('./client/jQueryPlus')
    }

/*  ==================================================================== */

    if (Platform.NodeJS) { // Should strip it from client with conditional macro in future...
        module.exports = _ }

