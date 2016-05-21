var fs   = require ('./base/fs'),
    path = require ('path')

ServerTemplating = module.exports = $trait ({

    $depends: [require ('./http')],

    template: function (file, args) {

                    $http.headers['Content-Type'] =
                        $http.mime.guessFromFileName (file)

                    return this.compiledTemplate (file).call (this, _.extend ({ env: $http.env }, args)) },

    compiledTemplate: $memoize (function (file) {
                                    return  _.template (fs.readFileSync (path.join (process.cwd (), 'templates', file), { encoding: 'utf-8' })) })
})