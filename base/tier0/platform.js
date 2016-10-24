"use strict";

const _ = require ('underscore')

/*  $platform / $global
    ======================================================================== */

;(function () {

    var p = (function () {

                if ((typeof window !== 'undefined') && (window.window === window) && (window.navigator !== undefined)) {
                        
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

                else if ((typeof global !== 'undefined') && (global.global === global)) {
                    return { engine: 'node' } }

                else {
                    return {} } }) ()

    if (p.system === 'iOS') {
        var match = navigator.userAgent.match (/OS (\d+)_(\d+)/)
        if (match) {
            p.systemVersion = { major: Number (match[1]), minor: Number (match[2]) }
        }
    }

    var $global = (p.engine === 'browser') ? window :
                  (p.engine === 'node')    ? global : undefined

    $global.property = function (name, v, cfg) { 

                            if (name in $global) {
                                throw new Error ('cannot redefine global ' + name) }

                            else {
                                var def = (v instanceof Function)
                                            ? { get: v, set: function () { throw new Error ('cannot set global ' + name) } }
                                            : v

                                return Object.defineProperty ($global, name, Object.assign ({}, def, { enumerable: true }, cfg)) } }

    $global.const = function (name, v, cfg) {
                        return $global.property (name, { value: v, writable: false }, cfg) }

    $global.const ('$global', $global)
    $global.const ('$platform', {   engine:  p.engine,
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
                                    iOS:     p.system === 'iOS',

                                    iPhone4: (p.device === 'iPhone') && (window.screen.height === 480),

                                    systemVersion: p.systemVersion
                                })

}) ();
