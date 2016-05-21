var fs   = require ('./base/fs'),
    path = require ('path')

ServerTemplating = module.exports = $trait ({

    $depends: [require ('./http')],

    /*  Front-end (as request processing chain primitive)
     */
    template: function (fileName, args) {

        return () => {

            $http.headers['Content-Type'] =
                $http.mime.guessFromFileName (fileName)

            this.compiledTemplate (fileName)
                .then (fn => fn.call (this, _.extend ({ env: $http.env }, $http.globalTemplateArgs, args))) } },

    /*  Back-end
     */
    evalTemplate: function (fileName, args) {
                    return this.compiledTemplate (fileName).then (fn => fn.call (this, args)) },

    compiledTemplate: $memoize (function (fileName) {
                                    return fs.readFile ('templates/' + fileName, { encoding: 'utf-8' }).then (_.template) }) })