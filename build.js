"use strict";

const _    = require ('./useless'),
      path = require ('path'),
      fs   = require ('fs')

/*  ------------------------------------------------------------------------ */

const BuildApp = $singleton (Component, {

    deferAppComponentTests: false,

    $defaults: {
        argKeys: { noCompress: 1, noStripped: 1, webpackWatch: 1 },
        inputFiles: ['./useless.client.js', './useless.devtools.js'],
        config: {
            webpack: {
                devServer: false,
                hotReload: false,
                separateCSS: false,
                compress: true
            }
        }
    },

    $depends: [
        require ('./server/args'),
        require ('./server/tests'),
        //require ('./server/supervisor'),
        require ('./server/webpack')
    ],

    argsReady (args) {

        if (args.noCompress) {
            this.config.webpack.compress = false
        }

        if (args.webpackWatch) {
            this.config.webpack.devServer = true
        }

        var directories =   args.values.groupBy (
                                fs.lstatSync.catches (null,
                                    _.method ('isDirectory')))

        var inputFiles = _.coerceToUndefined (directories['false']) || this.inputFiles

        this.config.webpack.entry = _.object (_.map (inputFiles, file => [path.parse (file).name, file]))

        if (this.supervisorState !== 'spawnedBySupervisor') {
            log.pp (this.config.webpack, '\n')
        }

        if (!this.config.webpack.buildPath) {
             this.config.webpack.buildPath = path.resolve (process.cwd (), (directories['true'] || [])[0])
        }
    },

    init () {
        if (!this.config.webpack.devServer) {
            process.exit ()
        }
    }
})