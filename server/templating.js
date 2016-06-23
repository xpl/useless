var fs   = require ('./base/fs'),
    path = require ('path')

module.exports = $trait ({

    $depends: [
        require ('./http')],

    $defaults: {
        templatesDir: path.join (process.cwd (), 'templates') },

    template: function (file, args) {

                $http.headers['Content-Type'] =
                    $http.mime.guessFromFileName (file)

                return this.compiledTemplate (file).call (this, _.extend ({ env: $http.env }, args)) },

    compiledTemplate: $memoize (function (file) {
                                    return  _.template (fs.readFileSync (path.join (this.templatesDir, file), { encoding: 'utf-8' })) }),


/*  Prevents restart when template changes (for speed) */

    shouldRestartOnSourceChange: function (action, file, yes, no) {
                                    if (file.contains (this.templatesDir)) {
                                        this.resetTemplateCache ()
                                        no () } },

    resetTemplateCache: function () {
                            log.w ('Resetting template cache... ', log.color.boldOrange, _.keys (this.compiledTemplate.cache))
                            this.compiledTemplate.cache = {} },

})