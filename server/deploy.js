var fs              = require ('fs'),
    path            = require ('path'),
    webpack         = require ('./base/webpack'),
    util            = require ('./base/util'),
    exec            = require ('child_process').exec

 module.exports = ServerDeploy = $trait ({

    buildScriptPaths: [process.cwd (), $uselessPath],
    buildScripts: ['useless.client.js', 'useless.devtools.js'],
    buildPath: $uselessPath + 'build/',

    buildScript: function (name) { log.blue ('Building monolithic ', log.color.pink, name)

        return webpack (name, path.join (this.buildPath, name)).panic
    },

    /*  Self deployment protocol
     */
    beforeInit: function () { this.buildScripts.each (this.buildScript) } })




