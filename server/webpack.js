"use strict";

const _  = require ('underscore')

const fs                 = require ('fs'),
      path               = require ('path'),
      webpack            = require ('webpack'),
      WebpackServer      = require ('webpack-dev-server'),
      ExtractTextPlugin  = require ('extract-text-webpack-plugin'),
      WriteFilePlugin    = require ('write-file-webpack-plugin'),
      CommonsChunkPlugin = require ('webpack/lib/optimize/CommonsChunkPlugin'),
      esprima            = require ('esprima'),
      escodegen          = require ('escodegen'),
      querystring        = require ('querystring'),
      util               = require ('./base/util'),
      fetch              = require ('node-fetch'),
      moduleLocator      = require ('./base/module-locator')

if (!$global.$callAtMasterProcess) {
    Meta.globalTag ('callAtMasterProcess')
}

module.exports = $trait ({

    $defaults: {

        argKeys: { 'webpack-build-and-quit': 1 }, // pass this arg to build everything and quit

        webpackEntries: {},

        config: {

            webpack: {

                offline: false,     // supresses WebPack from building everything at server's startup
                buildPath: './build',
                devServer: false,
                hotReload: false,   // for development use only! enables Webpack HotModuleReplacement
                port: 3000,
                separateCSS: true,  // meaningless when hotReload = true
                compress: false,    // meaningless when hotReload = true
                externals: {
                    fs:   true,
                    path: true,
                    xhr2: true
                },
            }
        }
    },

    '/build/:file' () { return this.file.$ (this.config.webpack.buildPath) },

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

    get isWebpackBuildAndQuitEnabled () {
        return this.args && this.args.webpackBuildAndQuit
    },

    get isWebpackHotReloadEnabled () {
        return (this.config.webpack.hotReload && !this.config.webpack.offline && !this.isWebpackBuildAndQuitEnabled) || false
    },

    get shouldExtractStyles () {
            return this.config.webpack.separateCSS &&
                  !this.isWebpackHotReloadEnabled }, 

    get webpackServerURL () {
            return this.isWebpackHotReloadEnabled
                        ? (`http://${(this.config.serverName || 'localhost')}:${this.config.webpack.port}`)
                        : '' },

    webpackURL (path) {
            return this.webpackServerURL.concatPath ('build').concatPath (path) },

    webpackFileTimestamp: $memoize (function (file) {

        if (this.isWebpackHotReloadEnabled) {
            return undefined
        }

        try {
            const stat = fs.statSync (path.resolve (file))            
            return stat && stat.mtime.getTime ()

        } catch (e) {
            return undefined
        }
    }),

    webpackScriptFile: $memoized (function (name) {

        const buildDir = this.config.webpack.buildPath

        const compressedFile = path.join (buildDir, name + '.stripped.min.js'),
                        file = path.join (buildDir, name + '.js')

        const compress = this.config.webpack.compress && !this.isWebpackHotReloadEnabled

        return (compress && fs.existsSync (compressedFile)) ? compressedFile : file
    }),

    webpackEmbed (name) {

        const cssFile = path.join (this.config.webpack.buildPath, name + '.css')
        const cssTimestamp = this.webpackFileTimestamp (cssFile)

        const hasStyle = this.shouldExtractStyles && (cssTimestamp !== undefined)

        const style = hasStyle ? `<link rel="stylesheet" type="text/css" href="${this.webpackURL (name + '.css')}?${cssTimestamp}" />` : ''
        
        const scriptFile      = this.webpackScriptFile (name),
              scriptName      = path.relative (this.config.webpack.buildPath, scriptFile),
              scriptTimestamp = this.webpackFileTimestamp (scriptFile),
              urlParams       = scriptTimestamp ? ('?' + scriptTimestamp) : ''

        const script = (this.isWebpackHotReloadEnabled ? '<!-- HOT RELOAD ENABLED -->' : '') +
                       `<script type="text/javascript" src="${this.webpackURL (scriptName)}${urlParams || ''}"></script>`

        return style + script
    },

/*  We want this method called BEFORE supervisor (i.e. at master process), so we can restart supervised process
    independently of the WebPack process.                                                                           */

    beforeInit: $callAtMasterProcess (function () {

        const config = _.extend ({}, this.webpack, this.config.webpack)

        try {
            fs.mkdirSync (path.resolve (config.buildPath))
            log.g ('Created ', log.color.boldOrange, config.buildPath)
        } catch (e) {}

        if (!this.isWebpackBuildAndQuitEnabled && config.offline) {
            log.i ('WebPack in running in offline mode')
            return
        }

        const input = this.webpackInput = this.transformEntries (config.entry /* legacy */ || this.webpackEntries)

        if (this.isWebpackBuildAndQuitEnabled) {

            log.pp (input)
        }

        const outputPath = path.resolve (config.buildPath),
              publicPath = this.webpackServerURL.concatPath ('build')

        const dirs = moduleLocator.parentDirsOf (__filename)

    /*  Locate absolute paths to modules. We do this because webpack fails to locate them when Useless is symlinked    */

        const modulePath = name => moduleLocator.modulePath (name, __filename)

        const webpackPath          = modulePath ('webpack'),
              webpackDevServerPath = modulePath ('webpack-dev-server'),
              styleLoaderPath      = modulePath ('style-loader'),
              cssLoaderPath        = modulePath ('css-loader'),
              babelLoaderPath      = modulePath ('babel-loader')

    /*  Full path here is for handling modules that are symlinked with `npm link`.
        Otherwise babel blames with `Error: Couldn't find preset "es2015" relative to
        directory <symlinked module path>`                                              */

        //const babelPresetPath           = moduleLocator.locate ('babel-preset-es2015')
        //const babelTransformRuntimePath = moduleLocator.locate ('babel-plugin-transform-runtime')

        const compiler = webpack (this.generatedWebpackConfig = {

        /*  TODO:   extract webpack-dev-server and webpack-hot-fix to separate entry (speeds up build)    */

            entry: _.map2 (input.entry, location =>
                                            [path.resolve (location),
                                             ...(this.isWebpackHotReloadEnabled ? [
                                                    webpackPath + '/hot/only-dev-server',
                                                    webpackDevServerPath + '/client?' + this.webpackServerURL,
                                                    path.join (__dirname, '../client/webpack-hot-fix')] : []) ]), // fixes webpack2 and webpack-dev-server incompatiblility

            devtool: 'source-map',

            output: {   path: outputPath,
                        filename: '[name].js',
                        publicPath: publicPath,
                        pathinfo: true },

            externals: config.externals, // ignores them

            plugins: [  ...(this.isWebpackHotReloadEnabled ? [new webpack.HotModuleReplacementPlugin (), new webpack.NamedModulesPlugin ()] : []),
                        ...input.commons.map (def => new CommonsChunkPlugin (def)),
                        ...(this.shouldExtractStyles ? [new ExtractTextPlugin ('[name].css')] : []),

                    /*  Writes devServer builds to filesystem   */

                        ...((config.devServer && !this.isWebpackHotReloadEnabled) ? [new WriteFilePlugin ()] : [])
                     ],

            module: {
                
                rules: [

                /*  CSS processing      */

                    {
                        test: /\.css$/,
                        use: this.shouldExtractStyles
                                    ? ExtractTextPlugin.extract ({ use: { loader: cssLoaderPath, options: { url: false } } })
                                    : [
                                        { loader: styleLoaderPath },
                                        { loader: cssLoaderPath, options: { url: false } }
                                    ]
                    },
                
                /*  JS  processing  */

                    {
                        test: /\.js$/,
                        //include: moduleLocator.hasBabelrc,
                        exclude: /node_modules/,
                        loaders: [                            
                            { loader: babelLoaderPath, query: { cacheDirectory: true } }
                        ]
                    }
                ]
            },
        })

        if (!this.isWebpackBuildAndQuitEnabled && (config.devServer || this.isWebpackHotReloadEnabled)) {

            log.ww ('Spawning WebPack server...')

            this.webpackServer = new WebpackServer (compiler, {

                //outputPath: outputPath,
                publicPath: publicPath,
                hot: this.isWebpackHotReloadEnabled,
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

            log.ww ('Building with WebPack (offline mode)...')

            compiler.run = compiler.run.promisify

            return compiler.run ().then (stats => { 

                console.log (stats.toString ({

                    colors: true,
                    children: false,
                    timings: true,

                }), '\n')

                if (stats.toJson ('normal').errors.length > 0) {
                    throw new Error ('webpack failure') }

                if (config.compress) {

                    const names = [...Object.keys (input.entry), ...input.commons.map (x => x.name)]

                    return __.each (names, name => {

                        const inputFile = path.join (outputPath, name + '.js')
                        const text = fs.readFileSync (inputFile, { encoding: 'utf-8' })

                        if (!text.includes ('__NO_COMPRESS__')) {
                            return this.compress (this.stripTests (inputFile, text))
                        }
                    })
                }

            }).then (() => {

                if (this.isWebpackBuildAndQuitEnabled) {
                    process.exit ()
                }
            })
        }
    }),

    compress (file) {

        const parsedPath = path.parse (file)

        log.g ('Compressing with Google Closure Compiler: ', log.color.boldOrange, parsedPath.base)

        return this.callGoogleClosureCompiler (fs.readFileSync (file, { encoding: 'utf-8' }), file).then (compressedText => {

            const outputFile = path.join (parsedPath.dir, parsedPath.name + '.min.js')

            fs.writeFileSync (outputFile, compressedText, { 'encoding': 'utf-8' })

            return outputFile
        })
    },

    async callGoogleClosureCompiler (src, what) {

        var post_data = querystring.stringify ({
            'compilation_level' : 'SIMPLE_OPTIMIZATIONS',
            'output_format': 'text',
            'output_info': 'compiled_code',
            'language_out': 'ecmascript5',
            'warning_level': 'QUIET',
            'js_code': src
        })

        const text = await (await fetch ('https://closure-compiler.appspot.com/compile', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': post_data.length
            },
            body: post_data
        })).text ()

        const [,err] = text.match (/<title>(.+)<\/title>/) || []
        if (err) {
            throw new Error (err)
        }

        return text
    },

    stripTests (file, src) {

        const parsedPath = path.parse (file)

        let sourceAST

        try {

            sourceAST = esprima.parse (src, { loc: true, sourceType: 'module' })
        
        } catch (e) {

            log.ee (`Failed to parse ${file} with ESPrima`)
            throw e
        }

        const

            testExpr = fnName => { return { expression: {
                                                callee:    {
                                                    object:   { name: "_" },
                                                    property: { name: fnName } } } } },

            matchesTestsDefExpr = _.matches ({ expression:  {
                                                    operator: "=",
                                                    left:     {
                                                        object:   {
                                                            object:   { name: "_"  },
                                                            property: { name: "tests"  }  }  } } }),

            matchesTestsDefExpr2 = _.matches ({ expression:  {
                                                    operator: "=",
                                                    left:     {
                                                        object:   {
                                                            object:   { object:   { name: "_"  },
                                                                        property: { name: "tests"  } },
                                                            property: {}  }  } } }),

            matchesTest = _.matches (testExpr ('deferTest')).or (
                          _.matches (testExpr ('withTest'))),

            hasVarDeclarations = body => (_.find (body, _.matches ({ type: 'VariableDeclaration' })) || false)

        const replace = expr => {

            /*  _.withTest or _.deferTest   */

                if (matchesTestsDefExpr  (expr) ||
                    matchesTestsDefExpr2 (expr)) { return { "type": "EmptyStatement" } }

            /*  _.tests.foo = { ... } or _.tests['foo'] = { ... }    */

                else if (matchesTest (expr)) {

                    var fn = expr.expression.arguments[2]

                    if (hasVarDeclarations (fn.body.body)) {
                        return {
                            type: "ExpressionStatement",
                            expression: { type: "CallExpression", callee: fn, arguments: [] }  } }

                    else {
                        return fn.body } } }

        sourceAST.body = _.hyperMap (sourceAST.body, replace)

    /*  TODO: source maps   */

        const outputFile = path.join (parsedPath.dir, parsedPath.name + '.stripped.js')

        fs.writeFileSync (outputFile, escodegen.generate (sourceAST), { encoding: 'utf-8' })

        return outputFile
    }
})


