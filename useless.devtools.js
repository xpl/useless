String.ify = require ('string.ify')

require ('./base/tier0/assert')
require ('./base/uncaught')
require ('./base/uncaughtAsync')
require ('./base/reflection')
require ('./base/log')
require ('./base/Testosterone')
require ('./base/profiling')

jQuery = require ('jquery')

require ('./client/jQueryPlus')

require ('./client/Panic')
require ('./client/LogOverlay')
require ('./client/Panic.css')
require ('./client/LogOverlay.css')

/*  ======================================================================== */

document.ready (function () {
	
	Panic.init ()
})