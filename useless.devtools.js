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

	CallStack.isThirdParty.intercept (function (file, originalImpl) {
	    return (file.indexOf ('underscore') >= 0) ||
	           (file.indexOf ('jquery') >= 0)     ||
	           (file.indexOf ('useless') >= 0)    ||
	           (file.indexOf ('mootools') >= 0) })
})