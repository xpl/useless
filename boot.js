/*  !!!
    avoid ES6 in this file
    !!!                                         */

var entry = process.argv[2]

if (!entry) {
    
    console.log ('Usage: npm start <module>\n')
    process.exit ()

} else {

    if (process.argv.indexOf ('spawned-by-supervisor') < 0) {

        console.log ('\u001b\[2m' + 'Loading ES6+ transpiler...' + '\u001b\[22m')
    }

    var path = require ('path')
    var moduleLocator = require ('./server/base/module-locator')

    var pluginNames = JSON.parse (require ('fs').readFileSync ('./.babelrc')).plugins // our .babelrc has es2015 preset (for browsers), but it kills server code, so fetch only the "plugins" part from it
    var pluginPaths = pluginNames.map (name => path.join (process.cwd (), 'node_modules/babel-plugin-' + name))  // resolve full paths, otherwise it will fail to locate plugins in symlinked folders

    require ('babel-polyfill') 
    require ('babel-register') ({ // replaces default 'require' implementation with ES7 transpiling one 

        babelrc: false,
        plugins: pluginPaths,

        ignore: file => !moduleLocator.hasBabelrc (file) // do not transpile irrelevant things
    })

    require (require ('path').resolve (entry))
}