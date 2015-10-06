var fs              = require ('fs'),
    path            = require ('path'),
    util            = require ('./base/util'),
    exec            = require ('child_process').exec

module.exports = $trait ({

    buildScript: function (name) { log.info ('Building monolithic ' + name)

        var includeFile = fs.readFileSync ($uselessPath + name, { encoding: 'utf8' })
        var compiledSrc = util.compileScript ({ source: includeFile, includePath: $uselessPath })
        fs.writeFileSync ($uselessPath + 'build/' + name, compiledSrc, { encoding: 'utf8' }) },

    /*  Self deployment protocol
     */
    beforeInit: function (then) {

        this.buildScript ('useless.js')
        this.buildScript ('useless.devtools.js')

        then () } })




