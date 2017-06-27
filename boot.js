/*	!!!
	avoid ES6 in this file
	!!!											*/

var entry = process.argv[2]

if (!entry) {
	
	console.log ('Usage: npm start <module>\n')
	process.exit ()

} else {

	if (process.argv.indexOf ('spawned-by-supervisor') < 0) {

		console.log ('\u001b\[2m' + 'Loading ES6+ transpiler...' + '\u001b\[22m')
	}

	require ('babel-polyfill') 
	require ('babel-register') ({ // replaces default 'require' implementation with ES7 transpiling one 

	/*	Our .babelrc has es2015 preset (for browsers), but it kills server code, so fetch only the "plugins" part from it:	*/

		babelrc: false,
		plugins: JSON.parse (require ('fs').readFileSync ('./.babelrc')).plugins,

	/*	Do not transpile node_modules	*/

	    ignore: function (file) {

	        return !(file.indexOf (__dirname) >= 0) ||
	                (file.indexOf (__dirname + '/node_modules') >= 0)
	    }
	})

	require (require ('path').resolve (entry))
}