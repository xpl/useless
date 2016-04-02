module.exports = RemoteRequire = $trait ({

    $depends: [require ('./io')],

    /*  Loaded modules are returned either as arguments:
            1. require (['esprima', 'escodegen'], function (esprima, escodegen) { })

        Or pushed to global namespace, if callback has no arguments:
            2. require (['esprima', 'escodegen'], function () { $assert (esprima !== undefined) })
     */
    require: function ( jsNames, then) {          jsNames = _.coerceToArray (jsNames);
                  var npmNames = _.coerceToArray (jsNames).map (_.camelCaseToDashes); var self = this

            _.cps.map (npmNames, function (name, i, return_) { 
                                var module = $global[jsNames[i]]
                                if (module) { return_ (module) } else {
                                                require.$ (name).catch_ (
                                                       function (catched) { log.w ('Fetching ./node_modules/' + name + ' from remote repository...')
                                                                self.                    exec ('npm install ' + name, function ( e, ___,                        stderr) {
                                                                                                        if (e) { module.exports.fatalError (stderr) }
                                                                                                        else { _.delay (function () { var module = require (name)
                                                                                                                                      if (module) { log.ok    ('Installed',       name) }
                                                                                                                                      else        { log.error ('Install failed:', name) }
                                                                                                                                 return_ (module) }) } }) },
                                                        function (module) { return_ (module || util.fatalError ('Init failed:', name)) } ) } },
                                     

                     function (                  modules) {
                        then.apply (self, _.map (modules,
                                       function (module, i) { (self[jsNames[i] + 'Ready'] || _.identity) (module, jsNames[i])
                                                                                                          $global[jsNames[i]] = module
                                                                                                                          return module })) }) } })