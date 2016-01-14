var fs              = require ('fs'),
    path            = require ('path'),
    util            = require ('./base/util'),
    exec            = require ('child_process').exec

module.exports = $trait ({

    buildScriptSearchLocations: [process.cwd (), $uselessPath],
    buildScripts: ['useless.js', 'useless.micro.js', 'useless.devtools.js'],
    buildPath: undefined,

    locateBuildScript: function (file) { log.i (fs.lstatSync.catches (123, true) ('foo'))

        return _.find (this.buildScriptSearchLocations.map (path.joinsWith (file).arity1),
                       fs.lstatSync.catches (false, true)) || util.fatalError ('Unable to locate ' + file) },

    buildScript: function (name) { log.info ('Building monolithic ' + name)

        var includeFile = fs.readFileSync (this.locateBuildScript (name), { encoding: 'utf8' })
        var compiledSrc = util.compileScript ({ source: includeFile, includePath: $uselessPath })
        fs.writeFileSync (path.join (this.buildPath || ($uselessPath + 'build/'), name), compiledSrc, { encoding: 'utf8' }) },

    /*  Self deployment protocol
     */
    beforeInit: function (then) { _.each (this.buildScripts, this.buildScript); then () } })




