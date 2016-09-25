/*	__NO_COMPRESS__	*/

String.ify = require ('string.ify')

require ('./base/tier0/assert')
require ('./base/uncaught')
require ('./base/uncaughtAsync')
require ('./base/reflection')
require ('./base/log')
require ('./base/Testosterone')
require ('./base/profiling')

require ('./client/jQueryPlus')

require ('./client/Panic')
require ('./client/LogOverlay')
require ('./client/Panic.css')
require ('./client/LogOverlay.css')

/*  ------------------------------------------------------------------------ */

document.ready (() => {
	
	Panic.init ()
})