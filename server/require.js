var util = require ('./base/util')

module.exports = RemoteRequire = $trait ({

    /*  Loaded modules are returned either as arguments:
            1. require (['esprima', 'escodegen'], function (esprima, escodegen) { })

        Or pushed to global namespace, if callback has no arguments:
            2. require (['esprima', 'escodegen'], function () { $assert (esprima !== undefined) })
     */
    require: function (jsNames, then) {

                var npmNames = (jsNames = _.coerceToArray (jsNames)).map (_.camelCaseToDashes),
                    exec = require ('child_process').exec

                _.cps.map (npmNames,

                    (name, i, return_) => { 
                    
                        var module = $global[jsNames[i]]
                        if (module) {
                            return_ (module) }

                        else {
                            require.$ (name).catch_ (
                                
                                catched => {    log.w ('Fetching ./node_modules/' + name + ' from remote repository...')
                                                exec ('npm install ' + name, (e, ___, stderr) => {
                                                    
                                                if (e) {
                                                    util.fatalError (stderr) }

                                                else {
                                                    _.delay (() => {

                                                        var module = require (name)

                                                        if (module) { log.ok    ('Installed',       name) }
                                                        else        { log.error ('Install failed:', name) }
                                                        
                                                        return_ (module) }) } }) },

                                module =>
                                    return_ (module || util.fatalError ('Init failed:', name)) ) } },
                                             
                        modules => {

                            then (_.map (modules,

                                (module, i) => {

                                    (this[jsNames[i] + 'Ready'] || _.identity) (module, jsNames[i]) // calls this.xxxReady
                                    
                                    $global[jsNames[i]] = module
                                    
                                    return module })) }) } })



