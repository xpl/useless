/*  Uncaught exception handling facility
    ======================================================================== */

(function () {

    var globalUncaughtExceptionHandler = _.globalUncaughtExceptionHandler = function (e) {
        
        var chain = arguments.callee.chain
                    arguments.callee.chain = _.reject (chain, _.property ('catchesOnce'))

        if (chain.length) {
            for (var i = 0, n = chain.length; i < n; i++) {
                try {
                    chain[i] (e)
                    break }
                catch (newE) {
                    if (i === n - 1) {
                        throw newE }
                    else {
                        if (newE && (typeof newE === 'object')) { newE.originalError = e }
                        e = newE } } } }
        else {
            console.log ('Uncaught exception: ', e)
            throw e } }

    _.withUncaughtExceptionHandler = function (handler, context_) { var context = context_ || _.identity

        if (context_) {
            handler.catchesOnce = true }

                               globalUncaughtExceptionHandler.chain.unshift (handler)
        context (function () { globalUncaughtExceptionHandler.chain.remove  (handler) }) }

    globalUncaughtExceptionHandler.chain = []

    var listenEventListeners = function (genAddEventListener, genRemoveEventListener) {

        var override = function (obj) {

            obj.addEventListener    = genAddEventListener    (obj.addEventListener)
            obj.removeEventListener = genRemoveEventListener (obj.removeEventListener) }

        if (window.EventTarget) {
            override (window.EventTarget.prototype) }

        else {
            override (Node.prototype)
            override (XMLHttpRequest.prototype) } }

    var globalAsyncContext = undefined

    switch (Platform.engine) {
        case 'node':
            require ('process').on ('uncaughtException', globalUncaughtExceptionHandler); break;

        case 'browser':
            window.addEventListener ('error', function (e) {

                if (e.error) {
                    globalUncaughtExceptionHandler (e.error) }

                else { // emulate missing .error (that's Safari)

                    globalUncaughtExceptionHandler (_.extend (new Error (e.message), {
                        stub: true,
                        stack: 'at ' + e.filename + ':' + e.lineno + ':' + e.colno })) } })

            var asyncHook = function (originalImpl, callbackArgumentIndex) {
                return __supressErrorReporting = function () {

                        var asyncContext = {
                            name: name,
                            stack: (new Error ()).stack,
                            asyncContext: globalAsyncContext }

                        var args = _.asArray (arguments)
                        var fn   = args[callbackArgumentIndex]

                        args[callbackArgumentIndex] = _.extendWith ({ __uncaughtJS_wraps: fn }, __supressErrorReporting = function () {

                            globalAsyncContext = asyncContext

                            try       { return fn.apply (this, arguments) }
                            catch (e) { globalUncaughtExceptionHandler (_.extend (e, {
                                            asyncContext: asyncContext })) } })

                        return originalImpl.apply (this, args) } }

            window.setTimeout = asyncHook (window.setTimeout, 0)

            /*  Manually catch uncaught exceptions at async call boundaries (providing missing .error for Safari)
             */ 
            listenEventListeners (
                function (addEventListener) { return asyncHook (addEventListener, 1) },
                function (removeEventListener) {
                    return function (name, fn, bubble, untrusted) {
                       return removeEventListener.call (this, name, fn.__uncaughtJS_wraps || fn, bubble) } }) }

}) ();