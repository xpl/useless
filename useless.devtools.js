$include ('./base/tier0/typeMatch')
$include ('./base/tier0/assert')
$include ('./base/uncaught')
$include ('./base/uncaughtAsync')
$include ('./base/reflection')
$include ('./base/log')
$include ('./base/Testosterone')
$include ('./base/profiling')
$include ('./client/Panic')
$include ('./client/LogOverlay')

/*  ======================================================================== */

(function ($ /* JQUERY */) {
	
	Panic.init ()

	CallStack.isThirdParty.intercept (function (file, originalImpl) {
	    return (file.indexOf ('underscore') >= 0) ||
	           (file.indexOf ('jquery') >= 0)     ||
	           (file.indexOf ('useless') >= 0)    ||
	           (file.indexOf ('mootools') >= 0) })

    $('head').append ([
    	$('<style type="text/css">').text ($includeStr ('client/Panic.css')),
    	$('<style type="text/css">').text ($includeStr ('client/LogOverlay.css')) ]) }) (jQuery);