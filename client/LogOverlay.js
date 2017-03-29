"use strict";

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Modal overlay that renders log.js output for debugging purposes

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($ /* JQUERY */) {

	$global.LogOverlay = $singleton (Component, {

		$defaults: {
			opaque: false,     // disables passing of printed log messages to default write backend (console.log) 
			/*init: false*/ }, // deferred init

		init: function () {
				log.withWriteBackend (this.write, function () {})

				$(document).keydown (this.$ (function (e) {
					if (e.keyCode === 192) { // ~
						this.toggle () }
					else if (e.keyCode === 27) { // Esc
						this.body.empty () } })) },

		el: $memoized ($property (function () {
									var el = $('<div class="useless-log-overlay" style="display: none;">')
												.append ('<div class="useless-log-overlay-body">')

									$(document).ready (function () {
										el.appendTo (document.body)
									})

									return el
		})),

		body: $memoized ($property (function () {
										return this.el.find ('.useless-log-overlay-body') })),

		toggle: function (yes) {
					this.el.toggle (yes) },

		visible: $property (function () {
								return this.el.is (':visible') }),

		clip: function () {
		            var elHeight   = this.el.height ()
		            var bodyHeight = this.body.height ()

		            this.body.children ().filter (this.$ (function (i, line) {

		            	var lineTop 	= bodyHeight - $(line).offsetInParent ().y
		            	var lineBottom  = lineTop    - $(line).height ()
		            	var clipHeight  = elHeight / 2

		            	return (lineTop    > clipHeight) &&
		            		   (lineBottom > clipHeight) })).remove () },

		clear () {

			if (this.body) {
				this.body.empty ()
			}
		},

		write: function (params) { 	this.toggle (true)

									if (params.config.clear) {
										this.body.empty () }

						            this.body.append ($('<div class="ulo-line">')
										            	.attr ('style', (params.color && params.color.css) || '')
										            	.append ($('<span class="ulo-line-text">') .text (params.indentedText  + ' '))
										            	.append ($('<span class="ulo-line-where">').text (params.codeLocation  + ' '))
										            	.append ($('<span class="ulo-line-trail">').text (params.trailNewlines)))

						            this.clip.postpone ()

						            if (!this.opaque) {
										log.impl.defaultWriteBackend (params) } } })

// -- end of namespace

}) (require ('jquery'));