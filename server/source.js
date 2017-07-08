 "use strict";

const _  = require ('underscore')

const fs        = require ('fs'),
      path      = require ('path'),
      process   = require ('process'),
      getSource = require ('get-source')

module.exports = $trait ({

    $defaults: {

        sourceRoot: process.cwd ()
    },

    beforeInit () {

        if (!this.requireDeveloper) {
             this.requireDeveloper = _.identity
             log.warn ("Implement requireDeveloper() to restrict access to source code API") }
    },

    '/api/source/:file': {

        async get () {

            await this.requireDeveloper ()

            this.allowOrigin ('*')

            $http.headers['Content-Type'] =
                $http.mime.guessFromFileName ($http.env.file)

            const src = getSource (($http.env.file[0] === '/')
                                        ? $http.env.file
                                        : path.join (this.sourceRoot, $http.env.file))

            if (src.error) {
                throw src.error }

            else {
                return src.text }
        },
        
        // post () { return __.seq (
        //                     this.requireDeveloper,
        //                     this.allowOrigin ('*'),
        //                     this.receiveJSON,
        //                     function (input) {
        //                             return new Promise (then => {
        //                                                     log.w ('Writing source:', $http.env.file)
        //                                                     SourceFiles.write (
        //                                                             path.join (this.sourceRoot, $http.env.file),
        //                                                             input.text,
        //                                                             then.arity0) }) }) }
    },

})