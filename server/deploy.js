var fs				= require ('fs'),
    path			= require ('path'),
    util            = require ('./base/util'),
    exec			= require ('child_process').exec

module.exports = $trait ({

    /*  Self deployment protocol
     */
    beforeInit: function (then) { log.info ('Building monolithic useless.js')

        var includeFile = fs.readFileSync ($uselessPath + 'useless.js', { encoding: 'utf8' })
        var compiledSrc = util.compileScript ({ source: includeFile, includePath: $uselessPath })

        fs.writeFileSync ($uselessPath + 'build/useless.js', compiledSrc, { encoding: 'utf8' })

        then () } })




