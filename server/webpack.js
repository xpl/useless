/*  NB: WORK IN PROGRESS    */

"use strict";

const fs                 = require ('fs'),
      path               = require ('path'),
      webpack            = require ('webpack'),
      WebpackServer      = require ('webpack-dev-server'),
      ExtractTextPlugin  = require ('extract-text-webpack-plugin'),
      CommonsChunkPlugin = require ('webpack/lib/optimize/CommonsChunkPlugin'),
      moduleLocator      = require ('./base/module-locator')

module.exports = $trait ({

    $depends: [
        require ('./api'),
        require ('./http')],

    $defaults: { config: { webpack: {

        buildPath: './build',
        entry: {},
        hotReload: false,
        port: 3000,
        separateCSS: false, // will be disabled if webpackHotReload=true (not compatible)
        compress: false,
        externals: {
            fs:   true,
            path: true
        },

    } } },

    api () {
        return {
            'build/:file': this.file ('./build/')
        }
    },

    test () {

    /*  See https://github.com/webpack/docs/wiki/optimization#multi-page-app    */

        const entries = {
            commons: {
                p1: 'p1.js',
                p2: 'p2.js',
                p3: 'p3.js',
                'admin-commons': {
                    a1: 'a1.js',
                    a2: 'a2.js'
                }
            }
        }

        $assert (this.transformEntries (entries), {

            entry: {
                p1: 'p1.js',
                p2: 'p2.js',
                p3: 'p3.js',
                a1: 'a1.js',
                a2: 'a2.js'
            },

            commons: [
                { name: 'admin-commons', minChunks: 2, chunks: ['a1', 'a2'] },
                { name: 'commons', minChunks: 2, chunks: ['p1', 'p2', 'p3', 'admin-commons.js'] }
            ]
        })
    },

    transformEntries (def) {

        const result = {
            entry: {},
            commons: []
        }

        const collectCommons = (entries, name) => ({

            name: name,
            minChunks: 2,
            chunks: _.map (entries, function (v, k) {

                if (_.isString (v)) {
                    result.entry[k] = v
                    return k }

                else {
                    const def = collectCommons (v, k)
                    result.commons.push (def)
                    return def.name + '.js'
                }
            })
        })

        collectCommons (def, '')

        return result
    },

    get shouldExtractStyles () {
            return this.config.webpack.separateCSS &&
                  !this.config.webpack.hotReload }, 

    get webpackServerURL () {
            return this.config.webpack.hotReload
                        ? (`http://${(this.config.serverName || 'localhost')}:${this.config.webpack.port}`)
                        : '' },

    webpackURL (path) {
            return this.webpackServerURL.concatPath ('build').concatPath (path) },

    webpackEmbed (name) {

        const hasStyle = this.shouldExtractStyles && fs.existsSync (path.resolve (`./build/${name}.css`))

        const style = hasStyle ? `<link rel="stylesheet" type="text/css" href="${this.webpackURL (name + '.css')}"></link>` : ''
        
        const script = (this.config.webpack.hotReload ? '<!-- HOT RELOAD ENABLED -->' : '') +
                       `<script type="text/javascript" src="${this.webpackURL (name + '.js')}"></script>`

        return style + script
    },

    beforeInit () { log.blue ('Building with WebPack...')

        try { fs.mkdirSync (path.resolve ('./build')) } catch (e) {}

        const config = this.config.webpack,
              input  = this.webpackInput = this.transformEntries (config.entry)

        const outputPath = path.resolve (config.buildPath),
              publicPath = this.webpackServerURL.concatPath ('build')

    /*  Full path here is for handling modules that are symlinked with `npm link`.
        Otherwise babel blames with `Error: Couldn't find preset "es2015" relative to
        directory <symlinked module path>`                                              */

        //const babelPresetPath           = moduleLocator.locate ('babel-preset-es2015')
        //const babelTransformRuntimePath = moduleLocator.locate ('babel-plugin-transform-runtime')

        const compiler = webpack (this.generatedWebpackConfig = {

        /*  TODO:   extract webpack-dev-server and webpack-hot-fix to separate entry (speeds up build)    */

            entry: _.map2 (input.entry, location =>
                                            [path.resolve (location),
                                             ...(config.hotReload ? [
                                                    'webpack/hot/only-dev-server',
                                                    `webpack-dev-server/client?${this.webpackServerURL}`,
                                                    path.join (__dirname, '../client/webpack-hot-fix')] : []) ]),

            devtool: 'source-map',

            output: {   path: outputPath,
                        filename: '[name].js',
                        publicPath: publicPath,
                        pathinfo: true },

            externals: config.externals, // ignores them

            plugins: [  ...(config.hotReload ? [new webpack.HotModuleReplacementPlugin ()] : []),
                        ...input.commons.map (def => new CommonsChunkPlugin (def)),
                        ...(this.shouldExtractStyles ? [new ExtractTextPlugin ('[name].css')] : []),
                     ],

            // resolveLoader: {
            //     alias: {
            //         'strip-tests-loader': path.join (__dirname, "./base/strip-tests-loader")
            //     }
            // },

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
                      include: moduleLocator.hasBabelrc,
                      loaders: [/*'react-hot', 'babel?presets[]=es2015,presets[]=react'*/
                                //...(config.compress ? ['strip-tests-loader'] : []),
                                'babel?cacheDirectory' // cacheDirectory speeds up ×2

                                ] },
                ]
            },
        })

        if (config.hotReload) {

            this.webpackServer = new WebpackServer (compiler, {

                publicPath: publicPath,
                hot: config.hotReload,
                historyApiFallback: true,
                quiet: false,
                noInfo: false,
                progress: true,
                stats: {
                    assets: false,
                    colors: true,
                    version: false,
                    hash: false,
                    timings: true,
                    chunks: false,
                    chunkModules: false
                }

            }).listen (config.port, this.config.serverName || 'localhost', (err, result) => {

                if (err) {
                    log ('Webpack error:', err) }

                else {
                    log.ok ('Webpack HotReload server is running at ', log.color.boldGreen, this.webpackServerURL) }
            })

        } else {

            compiler.run = compiler.run.promisify

            return compiler.run ().then (stats => { 

                console.log (stats.toString({
                    colors: true,
                    children: false,
                    timings: true,
                }))

                if (stats.toJson ('normal').errors.length > 0) {
                    throw new Error ('webpack failure') }
            })
        }
    }
})


