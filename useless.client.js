const $global = (typeof window === 'undefined' ? global : window)

$global.$uselessFile = 'useless.client.js'

$global._ = module.exports = require ('./base/3rd/underscore-fix') // latest underscore from GitHub, fixes strict-mode issue

/*  Tests stub
 */
_.tests = {}
_.deferTest = _.withTest = function (name, test, subj) { subj () }

/*  Polyfills   */

    require ('babel-polyfill')

    require ('es6-object-assign').polyfill ()

/*  Internal dependencies
    ======================================================================== */

    require ('./base/tier0/platform')    // platform abstraction layer
    require ('./base/tier0/meta-tags')   // metaprogramming utility
    require ('./base/tier0/arguments')   // argument count tracking utility (to streamline metaprogramming utilities)
    require ('./base/tier0/function')    // function-centric utilities
    require ('./base/tier0/busybox')     // a vocabulary for functional expressions that process real stuff
    require ('./base/tier0/type')        // type system extensions
    require ('./base/tier0/stdlib')      // consider it as underscore 2.0
    require ('./base/tier0/properties')  // properties 2.0
    require ('./base/tier0/typeMatch')   // advanced type system extensions

    require ('./base/CPS')

    require ('./base/infix/extensionMethods')    // bootstrap
    require ('./base/infix/Function')            // extends Function
    require ('./base/infix/Array')               // extends Array
    require ('./base/infix/String')              // extends String

    require ('./base/dynamic/bindable')          // for ad-hoc dependency injection in any object's method
    require ('./base/dynamic/stream')            // a generalization of Event (multicast model for function calls)

    require ('./base/OOP')

    require ('./base/math')      // clumsy math utils
    require ('./base/Parse')     // clumsy parsing utils
    require ('./base/Sort')      // (this one is normal)


/*  Otherwise basic utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/concurrency')     // concurrency utility
    require ('./base/component')       // component model
    //require ('./base/Rx')              // regular expressions helper


/*  Experimental stuff
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/Promise+')
    require ('./base/Channel')


/*  Networking
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/http')


/*  Browser-related code
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./client/node+')
    require ('./client/DOMReference')
    require ('./client/anim')

