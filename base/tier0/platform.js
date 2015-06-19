/*  Platform abstraction layer
 */

_ = require ('underscore')

_.platform = function () {
                if ((typeof window !== 'undefined') && (window._.platform === arguments.callee)) {
                    if (navigator.platform && navigator.platform.indexOf) {
                        return _.extend ({ engine: 'browser'},
                                ((navigator.platform .indexOf ("Linux arm") >= 0)
                            ||   (navigator.platform .indexOf ("Android")   >= 0)
                            ||   (navigator.userAgent.indexOf ("Android")   >= 0) ? { touch: true, system: 'Android' } :
                                ((navigator.platform .indexOf ("iPad")      >= 0) ? { touch: true, system: 'iOS', device: 'iPad' }  :
                                ((navigator.platform .indexOf ("iPhone")    >= 0)
                            ||   (navigator.platform .indexOf ("iPod")      >= 0) ? { touch: true, system: 'iOS', device: 'iPhone' } : {} )))) } }

                if ((typeof global !== 'undefined') && (global._.platform === arguments.callee)) {
                    return { engine: 'node' } }

                return {} }

_.global = function () {
                return ((_.platform ().engine === 'browser') ? window :
                        (_.platform ().engine === 'node')    ? global : undefined) }

_.defineGlobalProperty = function (name, value, cfg) {
                            if (_.global ()[name] !== undefined) {
                                throw new Error ('cannot defineGlobalProperty: ' + name + ' is already there') }

                            Object.defineProperty (_.global (), name, _.extend ({
                                        enumerable: true,
                                        get: (_.isFunction (value) && value.length === 0) ? value : _.constant (value) }, cfg))

                            return value }

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
        console.log (e)
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

/*  Use this helper to override underscore's functions
    ======================================================================== */

$overrideUnderscore = function (name, genImpl) {
    return _[name] = genImpl (_[name]) }

/*  alert2 for ghetto debugging in browser
    ======================================================================== */

if (_.platform ().engine !== 'browser') {
    _.defineGlobalProperty ('alert', function (args) {
        var print = ((_.global ()['log'] &&
            _.partial (log.warn, log.config ({ stackOffset: 2 }))) ||
            console.log)
        print.apply (print, ['ALERT:'].concat (_.asArray (arguments))) }) }

_.defineGlobalProperty ('alert2', function (args) {
    alert (_.map (arguments, _.stringify).join (', ')) })
