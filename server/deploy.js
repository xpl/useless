var fs              = require ('fs'),
    path            = require ('path'),
    util            = require ('./base/util'),
    exec            = require ('child_process').exec

module.exports = $trait ({

    buildScriptPaths: [process.cwd (), $uselessPath],
    buildScripts: ['useless.js', 'useless.micro.js', 'useless.devtools.js'],
    buildPath: undefined,

    buildTargetPath: function (file) { return path.join (this.buildPath ||
                                                 ($uselessPath + 'build/'), file) },

    buildScript: function (name) { log.w ('Building monolithic ' + name)

        util.compileScript ({ sourceFile:    name,
                              includePaths:  this.buildScriptPaths,
                              outputFile:    this.buildTargetPath (name) }) },

    /*  Self deployment protocol
     */
    beforeInit: function (then) { _.each (this.buildScripts, this.buildScript); then () } })




