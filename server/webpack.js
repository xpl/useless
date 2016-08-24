"use strict";

const fs                = require ('fs'),
      path              = require ('path'),
      webpack           = require ('webpack'),
      WebpackServer     = require ('webpack-dev-server'),
      ExtractTextPlugin = require ('extract-text-webpack-plugin')

/*  TODO: strip tests (via plugin) */

module.exports = $trait ({

    $defaults: { config: { webpack: {

        buildPath: './build',
        buildScripts: ['./client/index.js'],
        hotReload: false,
        port: 3000,
        separateCSS: false, // will be disabled if webpackHotReload=true (not compatible)
        compress: false

    } } },

    get shouldExtractStyles () {
            return this.config.webpack.separateCSS &&
                  !this.config.webpack.hotReload }, 

    get webpackServerURL () {
            return this.config.webpack.hotReload
                        ? (`http://localhost:${this.config.webpack.port}`)
                        : '' },

    webpackEmbed (name) {

        const buildPath = this.webpackServerURL.concatPath ('build'),
              style  = `<link rel="stylesheet" type="text/css" href="${buildPath.concatPath ('styles.css')}"></link>`,
              script = `<script type="text/javascript" src="${buildPath.concatPath (name)}"></script>`

        return (this.config.webpack.hotReload ? '<!-- HOT RELOAD ENABLED -->' : '') +
               (this.shouldExtractStyles ? style : '') +
                script
    },

    shouldRestartOnSourceChange (action, file, yes, no) {
                                    if (file.contains (path.resolve (this.config.webpack.buildPath))) {
                                        no () } },

    beforeInit () {

        const config     = this.config.webpack,
              outputPath = path.resolve (config.buildPath),
              inputFiles = config.buildScripts.map (location => path.resolve (location)),
              publicPath = this.webpackServerURL.concatPath ('build')

        log.blue ('Building monolithic ',
                                log.color.pink, inputFiles,
                                log.color.blue, ' to', outputPath)

        const compiler = webpack ({

            entry: _.object (inputFiles.map (location =>
                                    [path.basename (location).split ('.')[0],
                                         [location,
                                         ...(config.hotReload ? [
                                                'webpack/hot/only-dev-server',
                                                `webpack-dev-server/client?${this.webpackServerURL}`] : []) ]])),

            devtool: 'source-map',

            output: {   path: outputPath,
                        filename: '[name].js',
                        publicPath: publicPath },

            plugins: [  //new webpack.optimize.DedupePlugin (),
                        new webpack.IgnorePlugin (/^fs$/), // ignores require ('fs') — we do not want that in client code
                       
                        ...(this.shouldExtractStyles ? [new ExtractTextPlugin ('styles.css')] : []),
                        ...(config.hotReload ? [new webpack.HotModuleReplacementPlugin ()] : []) ],

            resolveLoader: {
                alias: {
                    'strip-tests-loader': path.join (__dirname, "./base/strip-tests-loader")
                }
            },

            module: {
                loaders: [

                /*  CSS processing      */

                    { test: /\.css$/,
                      loader: this.shouldExtractStyles
                                ? ExtractTextPlugin.extract ({ loader: 'css-loader?-url' })
                                : 'style-loader!css-loader?-url' // -url tells not to inline URLs (pics, fonts)
                    }, 
                
                /*  JS  processing  */

                    { test: /\.js$/,
                      loaders: [/*'react-hot', 'babel?presets[]=es2015,presets[]=react'*/
                                ...(config.compress ? ['strip-tests-loader'] : []),
                                'babel?presets[]=es2015'],

                      exclude: /node_modules/ }
                ]
            }
        })

        if (config.hotReload) {

            this.webpackServer = new WebpackServer (compiler, {

                publicPath: publicPath,
                hot: config.hotReload,
                historyApiFallback: true,
                quiet: false,
                noInfo: false,
                stats: {
                    assets: false,
                    colors: true,
                    version: false,
                    hash: false,
                    timings: false,
                    chunks: false,
                    chunkModules: false
                }

            }).listen (config.port, 'localhost', (err, result) => {

                if (err) {
                    log.ee ('Webpack error:', err) }

                else {
                    log.ok ('Webpack HotReload server is running at ', log.color.boldGreen, this.webpackServerURL) }
            })

        } else {

            compiler.run = compiler.run.promisify

            return compiler.run ().then (stats => { stats = stats.toJson ('normal')

                if (stats.warnings.length > 0) {
                    stats.warnings.each (log.w) }

                if (stats.errors.length > 0) {
                    stats.errors.each (log.ee)
                    throw new Error ('webpack failure') }
            })
        }
    }
})