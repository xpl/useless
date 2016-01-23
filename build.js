_ = require ('./useless')

var fs          = require ('fs'),
    util        = require ('./server/base/util'),
    querystring = require ('querystring'),
    http        = require ('http'),
    process     = require ('process'),
    path        = require ('path')

/*  ======================================================================== */

BuildApp = $singleton (Component, {

    deferAppComponentTests: false,

    $defaults: {
        argKeys: { noCompress: 1, noStripped: 1 },
        inputFiles: ['./useless.js'],
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

/*  ======================================================================== */

    init: function (then) {
        this.require (['esprima', 'escodegen'],
            this.$ (function () { _.each (this.inputFiles, this.compileFile.$ ()); then () })) },

/*  ======================================================================== */

    writeCompiled: function (file, dir, src) { var fullPath = path.resolve (process.cwd (), path.join (dir, file))
        log.ok ('Writing', fullPath)
        util.writeFile (fullPath, src) },

    compileWithGoogle: function (src, then) { log.info ('Calling Google Closure compiler...')

            var post_data = querystring.stringify ({
                'compilation_level' : 'SIMPLE_OPTIMIZATIONS',
                'output_format': 'text',
                'output_info': 'compiled_code',
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
                                                            function (response) {
                                                                if (response.trimmed.length) {
                                                                    then (response) }
                                                                else {
                                                                    throw new Error ('compilation')  } }))

            post_req.write (post_data)
            post_req.end () },

    stripCommentsAndTests: function (src, name, path) {
        log.hint ('Stripping comments and tests...')

        var matchesRequire =
            _.matches ({  expression: { operator: "=",
                                        left:     { name: "_"  },
                                        right:    { callee: { name: "require"  } }  }  })

        var testExpr = function (fnName) {
            return { expression: {
                            callee:    {
                                object:   { name: "_"  },
                                property: { name: fnName }  } } } }

        var matchesTestsDefExpr = _.matches ({ expression:  {
                                                    operator: "=",
                                                    left:     {
                                                        object:   {
                                                            object:   { name: "_"  },
                                                            property: { name: "tests"  }  }  } } })

        var matchesTestsDefExpr2 = _.matches ({ expression:  {
                                                    operator: "=",
                                                    left:     {
                                                        object:   {
                                                            object:   { object:   { name: "_"  },
                                                                        property: { name: "tests"  } },
                                                            property: {}  }  } } })

        var matchesTest = _.matches (testExpr ('deferTest')).or (
                          _.matches (testExpr ('withTest')))

        var matchesHasModuleEqualsTrue = _.matches ({
            expression: {
                operator: "=",
                left:     {
                    object:   {
                        name: "_"  },
                    property: { }  },
                right:    {
                    value: true, raw:   "true"  }  }  })

        var hasModules = {}

        var matchesIfHasModule = _.matches ({
            type:       "IfStatement",
            test:       {
                object:   {
                    name: "_"  },
                property: {
                    name: /^has.+/  }  } })

        var hasVarDeclarations = function (body) {
            return _.find (body, _.matches ({ type: 'VariableDeclaration' })) || false }

        var stripped = {
            type: 'Program',
            body: _.flatten (_.filter2 (esprima.parse (src, { raw: true, tokens: true, range: true }).body,
                function (expr) {

                    if (matchesHasModuleEqualsTrue (expr)) { var module = expr.expression.left.property.name
                        log.write ('+', module.match (/^has(.+)/)[1])
                        hasModules[module] = true
                        return true }

                    else if (matchesIfHasModule (expr)) {
                        return hasModules[expr.test.property.name] ? expr : false }

                    else if (matchesRequire (expr) ||
                             matchesTestsDefExpr (expr) ||
                             matchesTestsDefExpr2 (expr)) { return false }

                    else if (matchesTest (expr)) {

                        var fn = expr.expression.arguments[2]

                        if (hasVarDeclarations (fn.body.body)) {
                            return {
                                type: "ExpressionStatement",
                                expression: { type: "CallExpression", callee: fn, arguments: [] }  } }
                        else {
                            return fn.body.body } }

                    else {
                        return true } })) }

    //  log.info (_.stringify (stripped, { pretty: true, maxArrayLength: 10000, maxDepth: 10 }))

    //  log.write (escodegen.generate (stripped))

        var output = escodegen.generate (stripped)

        if (path) {
            this.writeCompiled (name + '.stripped.js', path,
                '/*    AUTO GENERATED from ' + name + '.js (stripped unit tests and comments) */\n\n' + output) }

        return output },

    compileFile: function (file) { log.w ('Compiling', log.color.boldOrange, ' ' + file)

        var name = _.initial (path.basename (file).split ('.')).join ('.')
        var compiledSrc = util.compileScript ({ sourceFile: file })
        var strippedSrc = this.stripCommentsAndTests (compiledSrc.replace (/_\.withTest \(/g, '_.deferTest ('), name,
                                !this.args.noStripped &&
                                 this.buildPath)

        if (!this.args.noCompress) {
            this.compileWithGoogle (
                strippedSrc,
                this.writeCompiled.$ (name + '.min.js', this.buildPath)) }

        this.writeCompiled (name + '.js', this.buildPath, compiledSrc) }

})