"use strict";

const _  = require ('underscore')

//var OriginalSource = require('webpack/lib/OriginalSource');

const path      = require ('path'),
	  esprima   = require ('esprima'),
	  escodegen = require ('escodegen')

module.exports = function (source, map) {

	//log.dark ('Stripping tests from', this._module.userRequest)

    this.cacheable ()

    let sourceAST = undefined

    try {

    	sourceAST = esprima.parse (source, { loc: true, sourceType: 'module' })

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
	                    return fn.body } }

	            else {
	                return expr } }

	    sourceAST.body = _.hyperMap (sourceAST.body, replace)

	    const generated = escodegen.generate (sourceAST, {
		    				sourceMap: this._module.identifier (),
		    				sourceMapWithCode: true })

    	return this.callback (null, generated.code, generated.map.toJSON ())

	} catch (e) {

	    //log (log.config ({ maxDepth: 1000 }), sourceAST.body)

    	log.ee (e)
    	throw new Error ('PARSING ERROR')
    }
};