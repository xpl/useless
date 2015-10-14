/*  Uncaught exception handling facility
    ======================================================================== */

(function () {

    _.hasUncaught = true

    var reThrownTag = ' [re-thrown by a hook]' // marks error as already processed by globalUncaughtExceptionHandler

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
                        newE.message += reThrownTag
                        throw newE }
                    else {
                        if (newE && (typeof newE === 'object')) { newE.originalError = e }
                        e = newE } } } }
        else {
            e.message += reThrownTag
            throw e } }

    _.withUncaughtExceptionHandler = function (handler, context_) { var context = context_ || _.identity

        if (context_) {
            handler.catchesOnce = true }

                               globalUncaughtExceptionHandler.chain.unshift (handler)
        context (function () { globalUncaughtExceptionHandler.chain.remove  (handler) }) }

    globalUncaughtExceptionHandler.chain = []

    switch (Platform.engine) {
        case 'node':
            require ('process').on ('uncaughtException', globalUncaughtExceptionHandler); break;

        case 'browser':
            window.addEventListener ('error', function (e) {

                if (e.message.indexOf (reThrownTag) < 0) { // if not already processed by async hooks

                    if (e.error) {
                        globalUncaughtExceptionHandler (e.error) }

                    else { // emulate missing .error (that's Safari)
                        globalUncaughtExceptionHandler (_.extend (new Error (e.message), {
                            stub: true,
                            stack: 'at ' + e.filename + ':' + e.lineno + ':' + e.colno })) } } }) }
}) ()