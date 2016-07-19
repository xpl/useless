/*  $platform and $global
    ======================================================================== */

;(function () {

    var p = (function () {

                if ((typeof window !== 'undefined') && (typeof navigator !== 'undefined') && navigator.platform && navigator.platform.indexOf) {
                        
                    var platform            = navigator.platform,
                        userAgent           = navigator.userAgent,
                        platformOrUserAgent = platform + '\n' + userAgent

                        return _.extend ({
                                engine: 'browser',
                                browserEngine: ((userAgent.indexOf ('AppleWebKit') >= 0) ? 'WebKit' : undefined),
                                browser: 
                                    ((userAgent.indexOf ('Firefox') >= 0) ? 'Firefox' :
                                    ((userAgent.indexOf ('Chrome')  >= 0) ? 'Chrome' :
                                    ((userAgent.indexOf ('Safari')  >= 0) ? 'Safari' :
                                    ((userAgent.indexOf ('Trident') >= 0) ? 'IE' : undefined)))) },

                                ((platform           .indexOf ("Linux arm") >= 0)
                            ||   (platformOrUserAgent.indexOf ("Android")   >= 0) ? { touch: true, system: 'Android' } :

                                    ((platformOrUserAgent.indexOf ("iPad")   >= 0) ? { touch: true, system: 'iOS', device: 'iPad' }  :
                                    ((platformOrUserAgent.indexOf ("iPhone") >= 0)
                                ||   (platformOrUserAgent.indexOf ("iPod")   >= 0) ? { touch: true, system: 'iOS', device: 'iPhone' } : {} )))) }

                else if ((typeof global !== 'undefined') && global._) {
                    return { engine: 'node' } }

                else {
                    return {} } }) ()

    var $global = (p.engine === 'browser') ? window :
                  (p.engine === 'node')    ? global : undefined

    $global.define = function (name, v, cfg) {  if (name in $global) {
                                                    throw new Error ('cannot define global ' + name + ': already there') }

        var def = (v && (v.get instanceof Function) && (v.set instanceof Function) && v) || // { get: .., set: .. }
                       ((v instanceof Function) && (v.length === 0) && { get: v }) ||       // getter function () { }
                       { value: v }                                                         // constant value

        return Object.defineProperty ($global, name, _.extend (def, { enumerable: true }, cfg)) }


    $global.define ('$global', $global)
    $global.define ('$platform', Object.defineProperties ({}, _.mapObject ({

                                            engine:  p.engine,
                                            system:  p.system,
                                            device:  p.device,
                                            touch:   p.touch || false,

                                            IE:      p.browser       === 'IE',
                                            Firefox: p.browser       === 'Firefox',
                                            Safari:  p.browser       === 'Safari',
                                            Chrome:  p.browser       === 'Chrome',
                                            WebKit:  p.browserEngine === 'WebKit',

                                            Browser: p.engine === 'browser',
                                            NodeJS:  p.engine === 'node',
                                            iPad:    p.device === 'iPad',
                                            iPhone:  p.device === 'iPhone',
                                            iOS:     p.system === 'iOS'

                                        }, function (v, k) { return { enumerable: true, value: v } })))
}) ();

/*  Use this helper to override underscore's functions
    ======================================================================== */

$overrideUnderscore = function (name, genImpl) {
    return _[name] = genImpl (_[name]) }

/*  alert2 for ghetto debugging in browser
    ======================================================================== */

if ($platform.NodeJS) {
    $global.alert = function (args) {
        var print = ($global.log && _.partial (log.warn, log.config ({ stackOffset: 2 }))) || console.log
        print.apply (print, ['ALERT:'].concat (_.asArray (arguments))) } }
 
$global.alert2 = function (args) {
    alert (_.map (arguments, _.stringify).join (', ')); return arguments[0] }

$global.log = function () { console.log.apply (console, arguments) } // placeholder for log.js


