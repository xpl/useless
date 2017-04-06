// This is temporary (until refactoring done)

$global.Meta = require ('meta-fields')

Meta.$definition = {} // to make it recognizeable by OOP.js

$global.$untag = Meta.unwrap

Meta.unwrapAll = x => _.map2 (Meta.unwrap (x), Meta.unwrap)

;['constant', 'get', 'once', 'async', 'atom'].forEach (Meta.globalTag); // TODO: get rid of this

$atom.unwrap = function (x) { // WTF? get rid of this

	return ($atom.read (x) === true) ? Meta.unwrap (x) : x
}