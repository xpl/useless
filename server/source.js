 "use strict";

const _  = require ('underscore')

const fs        = require ('fs'),
      path      = require ('path'),
      process   = require ('process'),
      getSource = require ('get-source')

module.exports = $trait ({

    $depends: [require ('./http')],

    $defaults: {

        sourceRoot: process.cwd ()
    },

    devHint: log.warn,

    api () {

        if (!this.requireDeveloper) {
             this.requireDeveloper = _.identity
             this.devHint ("Implement requireDeveloper() to restrict access to source code API") }

        return {

            'api': {
                'source/:file': { get:  [this.requireDeveloper, this.allowOrigin ('*'), this.readSource],
                                  // post: [this.requireDeveloper, this.allowOrigin ('*'), this.receiveJSON, this.writeSource]
                                },
            }
        }
    },

    readSource () {

                    $http.headers['Content-Type'] =
                        $http.mime.guessFromFileName ($http.env.file)

                    const src = getSource (($http.env.file[0] === '/')
                                                ? $http.env.file
                                                : path.join (this.sourceRoot, $http.env.file))

                    if (src.error) {
                        throw src.error }

                    else {
                        return src.text } },

    // writeSource: function (input) {
    //                 return new Promise (then => {
    //                                         log.w ('Writing source:', $http.env.file)
    //                                         SourceFiles.write (
    //                                                 path.join (this.sourceRoot, $http.env.file),
    //                                                 input.text,
    //                                                 then.arity0) }) },

})