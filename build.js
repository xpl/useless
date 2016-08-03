require ('./useless')

var fs          = require ('fs'),
    util        = require ('./server/base/util'),
    webpack     = require ('./server/base/webpack')
    querystring = require ('querystring'),
    http        = require ('http'),
    process     = require ('process'),
    path        = require ('path'),
    esprima     = require ('esprima'),
    escodegen   = require ('escodegen')

/*  ======================================================================== */

BuildApp = $singleton (Component, {

    deferAppComponentTests: false,

    $defaults: {
        argKeys: { noCompress: 1, noStripped: 1 },
        inputFiles: ['./useless.client.js', './useless.devtools.js', './panic.js'],
        buildPath:   './build' },

    $depends: [
        require ('./server/args'),
        require ('./server/tests'),
        require ('./server/supervisor')],

    argsReady: function (args) {

        var directories =   args.values.groupBy (
                                fs.lstatSync.catches (null,
                                    _.method ('isDirectory')))
                                                           
        this.inputFiles =                    _.coerceToUndefined (directories['false']) || this.inputFiles
        this.buildPath  =  path.resolve (process.cwd (), _.first (directories['true'])  || this.buildPath)

        if (!this.args.spawnedBySupervisor) {
            log.pink (log.config ({ pretty: true }),
                        _.extend ({ keys: args.keysDashed },
                        _.pick (this, 'inputFiles',
                                      'buildPath'))) } },

    init: function () {
            __.all (this.testsFailed ? [] : this.inputFiles.map (this.compile)).panic.finally (function () {
                process.exit () // call explicitly, because supervisor's ipc.js prevents from auto-exiting (while listening to messages)
            })
    },

    compile: function (file) { log.w ('Compiling', log.color.boldOrange, ' ' + file)

        var name = _.initial (path.basename (file).split ('.')).join ('.')

        return webpack (file, path.join (this.buildPath, name + '.js')).then (compiledSrc => {

            var strippedSrc = this.stripCommentsAndTests (compiledSrc.replace (/_\.withTest \(/g, '_.deferTest ('), name,
                                    !this.args.noStripped &&
                                     this.buildPath)

            if (!this.args.noCompress) {
                return this.compileWithGoogle (strippedSrc).then (
                       this.writeCompiled.$ (name + '.min.js', this.buildPath)) } }) },

    stripCommentsAndTests: function (src, name, path) { log.hint ('Stripping tests...')

        var testExpr = fnName => { return { expression: {
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

        var sourceAST = esprima.parse (src, { loc: true })

        _.each (sourceAST.body[0].expression.arguments[0].elements, scope => {

            scope.body.body = _.map (scope.body.body, expr => {

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
                        return fn.body } }

                else {
                    return expr } }) })

        var output = escodegen.generate (sourceAST, { sourceMap: name + '.stripped.js.map', sourceMapWithCode: true })

        if (path) {
            this.writeCompiled (name + '.stripped.js', path,
                '/*    AUTO GENERATED from ' + name + '.js (stripped unit tests and comments) */\n\n' + output.code)

            this.writeCompiled (name + '.stripped.js.map', path, output.map.toString ())  }

        return output.code },

    compileWithGoogle: function (src) { log.info ('Calling Google Closure compiler...')

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
            post_req.end () }) },

    writeCompiled: function (file, dir, src) {

        var fullPath = path.resolve (process.cwd (), path.join (dir, file))

            log.ok ('Writing', fullPath)
            util.writeFile (fullPath, src) }

})