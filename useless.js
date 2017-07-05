"use strict";

var isBrowser = typeof window !== 'undefined'

if (!isBrowser) {

    require ('./babel') // transpiles ES6+ via the `require` hook
}

var $global = isBrowser ? window : global

$global.$uselessFile = 'useless.js'

var _ = $global._ = module.exports = require ('./base/3rd/underscore-fix') // latest underscore from GitHub, fixes strict-mode issue

/*  Internal dependencies
    ======================================================================== */

/*  Basics of basics
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/tier0/platform')    // platform abstraction layer
    require ('./base/tier0/meta-tags')   // metaprogramming utility
    require ('./base/tier0/assert')      // $assert syntax
    require ('./base/tier0/arguments')   // argument count tracking utility (to streamline metaprogramming utilities)
    require ('./base/tier0/function')    // function-centric utilities
    require ('./base/tier0/busybox')     // a vocabulary for functional expressions that process real stuff
    require ('./base/tier0/type')        // type system extensions
    require ('./base/tier0/stdlib')      // consider it as underscore 2.0
    require ('./base/tier0/properties')  // properties 2.0
    require ('./base/tier0/typeMatch')   // advanced type system extensions


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

    String.ify = require ('string.ify')

    $global.ansi = require ('ansicolor').nice
    
    require ('./base/uncaught')        // uncaught exception facility
    require ('./base/reflection')      // callstack access + source code access
    require ('./base/log')             // logging facility
    require ('./base/Testosterone')    // unit test shell
    require ('./base/Androgene')       // a "promising" evolution of Testosterone.js (SKETCH)


/*  Networking
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    require ('./base/http')

