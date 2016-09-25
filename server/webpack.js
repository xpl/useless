/*  NB: WORK IN PROGRESS    */

"use strict";

const fs                 = require ('fs'),
      path               = require ('path'),
      webpack            = require ('webpack'),
      WebpackServer      = require ('webpack-dev-server'),
      ExtractTextPlugin  = require ('extract-text-webpack-plugin'),
      CommonsChunkPlugin = require ('webpack/lib/optimize/CommonsChunkPlugin'),
      esprima            = require ('esprima'),
      escodegen          = require ('escodegen'),
      querystring        = require ('querystring'),
      http               = require ('http'),
      util               = require ('./base/util'),
      moduleLocator      = require ('./base/module-locator')

module.exports = $trait ({

    $depends: [
        require ('./api'),
        require ('./http')],

    $defaults: {

        compressedWebpackEntries: {},
        
        config: { webpack: {

            buildPath: './build',
            entry: {},
            hotReload: false,   // for development use only! enables Webpack HotModuleReplacement
            port: 3000,
            separateCSS: false, // meaningless when hotReload = true
            compress: false,    // meaningless when hotReload = true
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
        
        const scriptName = (this.compressedWebpackEntries[name] || name) + '.js'

        const script = (this.config.webpack.hotReload ? '<!-- HOT RELOAD ENABLED -->' : '') +
                       `<script type="text/javascript" src="${this.webpackURL (scriptName)}"></script>`

        return style + script
    },

    beforeInit () { log.gg ('Building with WebPack...')

        try { fs.mkdirSync (path.resolve ('./build')) } catch (e) {}

        const config = this.config.webpack,
              input  = this.webpackInput = this.transformEntries (config.entry)

        const outputPath = path.resolve (config.buildPath),
              publicPath = this.webpackServerURL.concatPath ('build')

        const dirs = moduleLocator.parentDirsOf (__filename)

    /*  Locate absolute paths to modules. We do this because webpack fails to locate them when Useless is symlinked    */

        const webpackPath          = moduleLocator.modulePath ('webpack', __filename),
              webpackDevServerPath = moduleLocator.modulePath ('webpack-dev-server', __filename)

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
                                                    webpackPath + '/hot/only-dev-server',
                                                    webpackDevServerPath + '/client?' + this.webpackServerURL,
                                                    path.join (__dirname, '../client/webpack-hot-fix')] : []) ]), // fixes webpack2 and webpack-dev-server incompatiblility

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

                console.log (stats.toString ({

                    colors: true,
                    children: false,
                    timings: true,

                }), '\n')

                if (stats.toJson ('normal').errors.length > 0) {
                    throw new Error ('webpack failure') }

                if (config.compress) {

                    return __.each (input.entry, (v, entry) => {

                        const inputFile = path.join (outputPath, entry + '.js')
                        const text = fs.readFileSync (inputFile, { encoding: 'utf-8' })

                        if (!text.includes ('__NO_COMPRESS__')) {
                            return this.compress (this.stripTests (inputFile, text)).then (compressedFile => {

                                this.compressedWebpackEntries[entry] = path.parse (compressedFile).name
                            })
                        }
                    })
                }

            })
        }
    },

    compress (file) {

        const parsedPath = path.parse (file)

        log.g ('Compressing with Google Closure Compiler: ', log.color.boldOrange, parsedPath.base)

        return this.callGoogleClosureCompiler (fs.readFileSync (file, { encoding: 'utf-8' })).then (compressedText => {

            const outputFile = path.join (parsedPath.dir, parsedPath.name + '.min.js')

            fs.writeFileSync (outputFile, compressedText, { 'encoding': 'utf-8' })

            return outputFile
        })
    },

    callGoogleClosureCompiler (src) {

        return new Promise ((resolve, reject) => {

            var post_data = querystring.stringify ({
                'compilation_level' : 'SIMPLE_OPTIMIZATIONS',
                'output_format': 'text',
                'output_info': 'compiled_code',
                'language_out': 'ecmascript5',
                'warning_level' : 'QUIET',
                'js_code' : src })

            var post_options = {
                host: 'closure-compiler.appspot.com',
                port: '80',
                path: '/compile',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': post_data.length } };

            var post_req = http.request(post_options, util.readHttpResponse ('utf-8',
                                                            response => {
                                                                if (response.trimmed.length) {
                                                                    resolve (response) }
                                                                else {
                                                                    reject (new Error ('Google Closure Compiler replied with empty response'))  } }))

            post_req.write (post_data)
            post_req.end ()
        })
    },

    stripTests (file, src) {

        const parsedPath = path.parse (file)

        const sourceAST = esprima.parse (src, { loc: true, sourceType: 'module' })

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


