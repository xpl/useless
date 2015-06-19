var fs   = require ('fs'),
	_    = require ('useless')
	util = require ('./server/base/util')

function readMainFile () {
	return fs.readFileSync ('./useless.js', { encoding: 'utf8' }) }

function compileMacros () {
	return require ('./server/base/util').compileScript ({ source: readMainFile (), includePath: './' }) }

Testosterone.run ({                             
    codebase: true,
    verbose:  false,
    silent:   true },

    function (okay) { if (okay) {

        log.red ('Checking dependencies')
    	util.require (['esprima', 'escodegen'], function (esprima, escodegen) { log.info (_.asArray (arguments))
    		fs.writeFileSync ('./build/useless-base.js', compileMacros (), { encoding: 'utf8' }) })  } })
