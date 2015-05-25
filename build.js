var fs = require ('fs'),
	_  = require ('useless')

Testosterone.run ({                             
    codebase: true,
    verbose:  false,
    silent:   true },

    function (okay) { if (okay) {
    	fs.writeFileSync ('./build/useless-base.js',
			require ('./server/base/util').compileScript ({
												source:       fs.readFileSync ('./useless.js', { encoding: 'utf8' }),
												includePath: './' }),
											  { encoding:    'utf8' }) } })
