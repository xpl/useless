/*  Provides call stack persistence across async call boundaries.
    ======================================================================== */

(function () {

    if (Platform.Browser) {

        _.hasUncaughtAsync = true

        var globalAsyncContext = undefined

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
            return __supressErrorReporting = function () {

                    var asyncContext = {
                        name: name,
                        stack: (new Error ()).stack,
                        asyncContext: globalAsyncContext }

                    var args = _.asArray (arguments)
                    var fn   = args[callbackArgumentIndex]

                    if (!_.isFunction (fn)) { throw new Error ('[uncaughtAsync.js] callback should be a function')}

                    fn.__uncaughtJS_wrapper = args[callbackArgumentIndex] = __supressErrorReporting = function () {

                        globalAsyncContext = asyncContext

                        try       { return fn.apply (this, arguments) }
                        catch (e) { _.globalUncaughtExceptionHandler (_.extend (e, { asyncContext: asyncContext })) } }

                    return originalImpl.apply (this, args) } }

        window.setTimeout = asyncHook (window.setTimeout, 0)

        /*  Manually catch uncaught exceptions at async call boundaries (providing missing .error for Safari)
         */ 
        listenEventListeners (
            function (addEventListener) { return asyncHook (addEventListener, 1) },
            function (removeEventListener) {
                return function (name, fn, bubble, untrusted) {
                   return removeEventListener.call (this, name, fn.__uncaughtJS_wrapper || fn, bubble) } }) }

}) ()