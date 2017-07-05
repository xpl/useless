/*  !!!
    avoid ES6 in this file
    !!!                                         */

var path = require ('path')
var moduleLocator = require ('./server/base/module-locator')

if (process.argv.indexOf ('spawned-by-supervisor') < 0) {

    console.log ('\u001b\[2m' + 'Loading ES6+ transpiler...' + '\u001b\[22m')
}

var fs = require ('fs')
var babelRc = path.resolve ('./.babelrc')

var pluginPaths = function () {

    var pluginNames = JSON.parse (fs.readFileSync (babelRc)).plugins // our .babelrc has es2015 preset (for browsers), but it kills server code, so fetch only the "plugins" part from it
    
    return pluginNames.map (name => path.resolve ('./node_modules/babel-plugin-' + name))  // resolve full paths, otherwise it will fail to locate plugins in symlinked folders
}

const config = fs.existsSync (babelRc)
                    ? { babelrc: false, plugins: pluginPaths () }
                    : {}

config.ignore = function (file) { return !moduleLocator.hasBabelrc (file) } // do not transpile irrelevant things

require ('babel-polyfill') 
require ('babel-register') (config) // replaces default 'require' implementation with ES7 transpiling one 