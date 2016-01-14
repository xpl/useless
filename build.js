var fs          = require ('fs'),
    _           = require ('./useless'),
    util        = require ('./server/base/util'),
    querystring = require ('querystring'),
    http        = require ('http'),
    process     = require ('process'),
    path        = require ('path')

function compileMacros (file) {
    return util.compileScript ({ source:
        fs.readFileSync ('./' + file, { encoding: 'utf8' }), includePath: './' }) }

function writeCompiled (file, dir, src) {
    log.success ('Writing', file)
    fs.writeFileSync (path.join (dir, file), src, { encoding: 'utf8' }) }

function compileWithGoogle (src, then) { log.info ('Calling Google Closure compiler...')

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
        post_req.end () }

function stripCommentsAndTests (src, name, path) {
    log.warn ('Stripping comments and tests...')

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
                    matchesTestsDefExpr (expr)) { return false }

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
        writeCompiled (name + '.stripped.js', path, '/*    AUTO GENERATED from ' + name + '.js (stripped unit tests and comments) */\n\n' + output) }

    return output }

function compile (cfg) { _.each (cfg.inputFiles, function (file) { log.w ('Compiling ', file)

    var name = _.initial (path.basename (file).split ('.')).join ('.')
    var compiledSrc = compileMacros (file)
    var strippedSrc = stripCommentsAndTests (compiledSrc.replace (/_\.withTest \(/g, '_.deferTest ('), name, !cfg['no-stripped'] && cfg.outputPath)

    if (!cfg['no-compress']) {
        compileWithGoogle (
            strippedSrc,
            writeCompiled.partial (name + '.min.js', cfg.outputPath)) }

    writeCompiled (name + '.js', cfg.outputPath, compiledSrc) }) }

console.log ('Running code base tests...')

Testosterone.run ({                             
    codebase: true,
    verbose:  false,
    silent:   true },

    function (okay) { if (okay) {

        var args = util.parseCommandLineOptions ('no-compress', 'no-stripped')

        var directories = args.rest.groupBy (
                                fs.lstatSync.catches (null,
                                    _.method ('isDirectory')))
                                                           
        var cfg = _.extend ({ inputFiles: _.coerceToUndefined (directories['false' ])  || ['./useless.js'],
                              outputPath:             _.first (directories['true'])    ||  './build' }, args.options)

        log.pretty.i (cfg)

        log ('Checking dependencies...')

        util.require (['esprima', 'escodegen'], compile.partial (cfg)) } })




