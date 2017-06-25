"use strict";

/*  Provides call stack persistence across async call boundaries.
    ======================================================================== */

(function () {

    if ($platform.Browser) {

        _.hasUncaughtAsync = true

        var globalAsyncContext = undefined

        _.errorWithAsync = (e = new Error ()) => (e.asyncContext = globalAsyncContext, e) // @hide

        var listenEventListeners = function (genAddEventListener, genRemoveEventListener) {

            var override = function (obj) {

                obj.addEventListener    = genAddEventListener    (obj.addEventListener)
                obj.removeEventListener = genRemoveEventListener (obj.removeEventListener) }

            if (window.EventTarget) {
                override (window.EventTarget.prototype) }

            else {
                override (Node.prototype)
                override (XMLHttpRequest.prototype) } }

        var asyncHook = function (originalImpl, callbackArgumentIndex) {
            return function () { // @hide

                    var asyncContext = {
                        name: name,
                        stack: (new Error ()).stack, // @hide
                        asyncContext: globalAsyncContext }

                    var args = _.asArray (arguments)
                    var fn   = args[callbackArgumentIndex]

                    if (!_.isFunction (fn)) { throw new Error ('[uncaughtAsync.js] callback should be a function')}

                    var wrappers = (fn.__uncaughtJS_wrappers = (fn.__uncaughtJS_wrappers || []))
                    var wrapper = args[callbackArgumentIndex] = function () { // @hide

                        globalAsyncContext = asyncContext

                        try       { return fn.apply (this, arguments) } // @hide
                        catch (e) { _.globalUncaughtExceptionHandler (_.errorWithAsync (e)) } }

                    wrappers.push (wrapper)

                    return originalImpl.apply (this, args) } }

        window.setTimeout = asyncHook (window.setTimeout, 0)

        /*  Manually catch uncaught exceptions at async call boundaries (providing missing .error for Safari)
         */ 
        listenEventListeners (
            function (addEventListener) { return asyncHook (addEventListener, 1) },
            function (removeEventListener) {
                return function (name, fn, bubble, untrusted) {
                    for (var x of (fn.__uncaughtJS_wrappers || [fn])) {
                        removeEventListener.call (this, name, x, bubble) } } }) }

}) ()


