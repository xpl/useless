var fs              = require ('fs'),
    path            = require ('path'),
    util            = require ('./base/util'),
    exec            = require ('child_process').exec

 module.exports = ServerDeploy = $trait ({

    buildScriptPaths: [process.cwd (), $uselessPath],
    buildScripts: ['useless.js', 'useless.client.js', 'useless.devtools.js'],
    buildPath: $uselessPath + 'build/',

    buildTargetPath: function (file) { return path.join (this.buildPath, file) },

    buildScript: function (name) { log.blue ('Building monolithic ', log.color.pink, name)

        util.compileScript ({ sourceFile:    name,
                              includePaths:  this.buildScriptPaths,
                              outputFile:    this.buildTargetPath (name) }) },

    /*  Self deployment protocol
     */
    beforeInit: function () { _.each (this.buildScripts, this.buildScript) } })




