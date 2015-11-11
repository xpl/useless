/*  Platform abstraction layer
 */

_.platform = function () {

                return arguments.callee.__value || (arguments.callee.__value = (function () {

                    if ((typeof window !== 'undefined') && window._ && (window._.platform === _.platform) &&
                        (typeof navigator !== 'undefined') && navigator.platform && navigator.platform.indexOf) {
                            return _.extend ({
                                    engine: 'browser',
                                    browser: 
                                        ((navigator.userAgent.indexOf ('Firefox') >= 0) ? 'Firefox' :
                                         (navigator.userAgent.indexOf ('Trident') >= 0) ? 'IE' : undefined) },

                                    ((navigator.platform .indexOf ("Linux arm") >= 0)
                                ||   (navigator.platform .indexOf ("Android")   >= 0)
                                ||   (navigator.userAgent.indexOf ("Android")   >= 0) ? { touch: true, system: 'Android' } :

                                        ((navigator.platform .indexOf ("iPad")      >= 0) ? { touch: true, system: 'iOS', device: 'iPad' }  :
                                        ((navigator.platform .indexOf ("iPhone")    >= 0)
                                    ||   (navigator.platform .indexOf ("iPod")      >= 0) ? { touch: true, system: 'iOS', device: 'iPhone' } : {} )))) }

                    else if ((typeof global !== 'undefined') && global._ && (global._.platform === _.platform)) {
                        return { engine: 'node' } }

                    else {
                        return {} } }) ()) }

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
    alert (_.map (arguments, _.stringify).join (', ')); return arguments[0] })
