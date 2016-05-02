/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
   ------------------------------------------------------------------- */

$uselessFile = 'useless.micro.js'

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


/*  Tests stub
 */
_.tests = {}
_.deferTest = _.withTest = function (name, test, subj) { subj () }

/*  Internal dependencies
    ======================================================================== */


//  $include ('./base/3rd/unicode_hack')  // provides missing unicode regexp syntax
//  $include ('./base/3rd/Base64')        // Base64 encoder/decoder

    $include ('./base/tier0/platform')    // platform abstraction layer
//  $include ('./base/tier0/assert')      // $assert syntax
    $include ('./base/tier0/arguments')   // argument count tracking utility (to streamline metaprogramming utilities)
    $include ('./base/tier0/function')    // function-centric utilities
    $include ('./base/tier0/busybox')     // a vocabulary for functional expressions that process real stuff
    $include ('./base/tier0/type')        // type system extensions
    $include ('./base/tier0/stdlib')      // consider it as underscore 2.0
    $include ('./base/tier0/properties')  // properties 2.0
    $include ('./base/tier0/keywords')    // metaprogramming utility
    $include ('./base/tier0/typeMatch')   // advanced type system extensions
    $include ('./base/tier0/stringify')   // configurable object printer
    $include ('./base/tier0/squash')      // dependency list / tree squashing algorithms

    $include ('./base/CPS')

    $include ('./base/infix/extensionMethods')    // bootstrap
    $include ('./base/infix/Function')            // extends Function
    $include ('./base/infix/Array')               // extends Array
    $include ('./base/infix/String')              // extends String

    $include ('./base/dynamic/bindable')          // for ad-hoc dependency injection in any object's method
    $include ('./base/dynamic/stream')            // a generalization of Event (multicast model for function calls)

    $include ('./base/OOP')


    $include ('./base/math')      // clumsy math utils
//  $include ('./base/Parse')     // clumsy parsing utils
//  $include ('./base/Sort')      // (this one is normal)


/*  Self-awareness utils
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

//  $include ('./base/reflection')  // callstack access + source code access
//  $include ('./base/profiling')   // performance measurement utility


/*  Otherwise basic utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

//  $include ('./base/log')             // logging facility
    $include ('./base/concurrency')     // concurrency utility
    $include ('./base/component')       // component model
//  $include ('./base/Testosterone')    // unit test shell
//  $include ('./base/Rx')              // regular expressions helper


/*  Experimental stuff
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

//  $include ('./base/AOP')
    $include ('./base/Promise+')


/*  Networking
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./base/Http')


/*  Browser-related code
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $include ('./client/jQueryPlus')

