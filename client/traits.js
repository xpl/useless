
/*	Defines common behaviors for anything that is changeable in complex ways
	======================================================================== */

Changeable = $trait ({

	$defaults: {
		_changed: false,
		_changing: 0 },

	changed: $trigger (),

	atomicChange: function (applyChanges) { this._changing++
		applyChanges (this.$ (function () {
			this._changing--
			if (this._changed) {
				this._changed = false
				this.triggerChange () } })) },

	postponeChange: function () {
		this.triggerChange (true) },

	triggerChange: function (postpone) {
		if (this._changing > 0) {
			this._changed = true }
		else {
			if (postpone === true) {
				this.changed.postpone (this) }
			else {
				this.changed (this) } } } })


/*	(EXPERIMENTAL) A trait for components that depend on window size
	======================================================================== */

DependsOnWindowSize = $trait ({
	init: function () {
		$(window).resize (this.windowSizeChanged)
		_.delay (this.windowSizeChanged) },

	viewportSize: $observableProperty (),

	windowSizeChanged: function () {
		if (this.viewport && this.viewport.is (':visible')) {
			this.viewportSize = new Vec2 (this.viewport.width (), this.viewport.height ()) } },

	destroy: function () {
		$(window).off ('resize', this.windowSizeChanged) } })


/*	(EXPERIMENTAL) A trait for components that own DOM elements
	======================================================================== */

OwningDOM = $trait ({

	$requires: {
		el: _.isElement.or (_.property('constructor').then (_.equals (jQuery))) },

	domReady: $barrier (),

	destroy: function () {
		this.el.remove () } })


