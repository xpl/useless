/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Modal overlay that outputs log.js for debugging purposes

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($ /* JQUERY */) {

	LogOverlay = $singleton (Component, {

		$defaults: {
			opaque: false,   // disables passing of printed log messages to default write backend (console.log) 
			init:   false }, // deferred init

		init: function () {
			
			log.withWriteBackend (this.write, function () {})

			$(document).keydown (this.$ (function (e) {
				if (e.keyCode === 192) { // ~
					this.toggle () } })) },

		el: $memoized ($property (function () {
			return $('<div class="useless-log-overlay" style="display: none;">').appendTo (document.body) })),

		toggle: function (yes) {
			this.el.toggle (yes) },

		write: function (params) {
			this.toggle (true)
			if (params.config.clear) {
				this.el.empty () }
            this.el.append ($('<div class="ulo-line">')
				            	.css ('color', params.color.css)
				            	.append ($('<span class="ulo-line-text">') .text (params.indentedText  + ' '))
				            	.append ($('<span class="ulo-line-where">').text (params.codeLocation  + ' '))
				            	.append ($('<span class="ulo-line-trail">').text (params.trailNewlines)))

            if (!this.opaque) {
				log.impl.defaultWriteBackend (params) } }

	})

// -- end of namespace

}) (jQuery);