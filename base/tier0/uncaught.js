/*  Uncaught exception handling facility
    ======================================================================== */

var globalUncaughtExceptionHandler = function (e) { var chain = arguments.callee.chain
    if (chain.length) {
        for (var i = 0, n = chain.length; i < n; i++) {
            try {
                chain[i] (e); break }
            catch (newE) {
                if (i === n - 1) {
                    throw newE }
                else {
                    newE.originalError = e
                    e = newE } } } }
    else {
        console.log ('Uncaught exception: ', e)
        throw e } }

_.withUncaughtExceptionHandler = function (handler, context) { context = context || _.identity

                           globalUncaughtExceptionHandler.chain.unshift (handler)
    context (function () { globalUncaughtExceptionHandler.chain.remove  (handler) }) }

globalUncaughtExceptionHandler.chain = []

switch (_.platform ().engine) {
    case 'node':
        require ('process').on ('uncaughtException', globalUncaughtExceptionHandler); break;
    case 'browser':
        window.addEventListener ('error', function (e) { globalUncaughtExceptionHandler (e.error) }) }