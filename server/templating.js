var fs   = requirePromisified ('fs'),
    path = require ('path')

ServerTemplating = module.exports = $trait ({

    $depends: [require ('./io')],

    /*  Front-end (as request processing chain primitive)
     */
    template: function (fileName, args) {

        return () => {

            if (!$http.headers['Content-Type']) {
                 $http.headers['Content-Type'] = path.extname (fileName).split ('.')[1] }

            this.compiledTemplate (fileName)
                .then (fn => fn.call (this, _.extend ({ env: $http.env }, $http.globalTemplateArgs, args))) } },

    /*  Back-end
     */
    evalTemplate: function (fileName, args) {
                    return this.compiledTemplate (fileName).then (fn => fn.call (this, args)) },

    compiledTemplate: $memoize (function (fileName) {
                                    return fs.readFile ('templates/' + fileName, { encoding: 'utf-8' }).then (_.template) }) })