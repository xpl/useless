"use strict";

const _  = require ('underscore')

const fs   = require ('./base/fs'),
      path = require ('path')

module.exports = $trait ({

    $defaults: {
        templatesDir: '' },

    template (file, args) {

            $http.setMimeIfNotAlready ($http.mime.guessFromFileName (file))

            const fullPath = path.resolve (path.join (this.templatesDir, file))

            return this.compiledTemplate (fullPath).call (this, _.extend ({ require, $args: args }, args)) },

    compiledTemplate: $memoize (function (file) {
                                    return  _.template (fs.readFileSync (file, { encoding: 'utf-8' })) }),

    shouldRestartOnSourceChange (action, file) {

        if (file in this.compiledTemplate.cache) {
            log.w ('Resetting template cache for ', log.color.boldOrange, file)
            delete this.compiledTemplate.cache[file]
        }
    },
})