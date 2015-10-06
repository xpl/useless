/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Error reporting UI

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($ /* JQUERY */) {

if (typeof UI === 'undefined') {
	UI = {} }

Panic = function (what, cfg) { cfg = _.defaults (_.clone (cfg || {}), { dismiss: _.identity })

	if (what === null) {
		return }
		
	if (_.isTypeOf (Error, what)) {
		_.extend (cfg, _.pick (what, 'retry', 'dismiss')) }

	Panic.widget.append (what)

	if (_.isFunction (cfg.retry)) {
		Panic.widget.onRetry (cfg.retry) }

	if (_.isFunction (cfg.dismiss)) {
		Panic.widget.onClose (cfg.dismiss) } }

Panic.init = function () {
	if (!Panic._initialized) {
		 Panic._initialized = true
	   _.withUncaughtExceptionHandler (Panic.arity1) } }

Panic.widget = $singleton (Component, {

	retryTriggered: $triggerOnce (),
	closeTriggered: $triggerOnce (),

	el: $memoized ($property (function () {

		var el = $('<div class="panic-modal-overlay" style="z-index:5000; display:none;">').append ([
			this.bg    = $('<div class="panic-modal-overlay-background">'),
			this.modal = $('<div class="panic-modal">').append ([
				this.modalBody = $('<div class="panic-modal-body">').append (
					this.title = $('<div class="panic-modal-title">Now panic!</div>')),
				$('<div class="panic-modal-footer">').append ([
					this.btnRetry = $('<button type="button" class="panic-btn panic-btn-warning" style="display:none;">Try again</button>')
						.touchClick (this.retry),
					this.btnClose = $('<button type="button" class="panic-btn panic-btn-danger" style="display:none;">Close</button>')
						.touchClick (this.close) ]) ]) ])

		$(document).ready (function () {
			el.appendTo (document.body) })

		this.initAutosize ()

		this.modal.enableScrollFaders ({ scroller: this.modalBody })

		$(document).keydown (this.$ (function (e) {
			if (e.keyCode === 27) {
				this.toggleVisibility (false) } }))

		return el })),

	initAutosize: function () {
		$(window).resize (this.$ (function () { this.modal.css ('max-height', $(window).height () - 100)
					  		  					this.modalBody.scroll () })).resize () },

	toggleVisibility: function (yes) {
		if (yes !== !(this.el.css ('display') === 'none')) {
	        if (yes) {
	            this.el.css ('display', '') }
	        this.el.animateWith (yes ? 'panic-modal-appear' : 'panic-modal-disappear', this.$ (function () {
	            if (!yes) {
	                this.el.css ('display', 'none') } })) } },

	onRetry: function (retry) {
		this.retryTriggered (retry)
		this.btnRetry.show () },

	onClose: function (close) {
		this.closeTriggered (close)
		this.btnClose.show () },

	retry: function () {
		this._clean ()
		this.closeTriggered.off ()
		this.toggleVisibility (false)
		this.retryTriggered () },

	close: function () {
		this._clean ()
		this.retryTriggered.off ()
		this.toggleVisibility (false)
		this.closeTriggered () },

   _clean: function () {
		this.modalBody.find ('.panic-alert-error').remove ()
		this.modalBody.scroll ()
		this.btnRetry.hide ()
		this.btnClose.hide () },

	append: function (what) { var id = 'panic' + this.hash (what)

		var counter = $('#' + id + ' .panic-alert-counter')
		if (counter.length) {
			counter.text ((counter.text () || '1').parsedInt + 1) }
		else {
			$('<div class="panic-alert-error">').attr ('id', id)
				.append ('<span class="panic-alert-counter">')
				.append (
					_.isTypeOf (Error, what) ? this.printError (what) : log.impl.stringify (what)).insertAfter (
						this.el.find ('.panic-modal-title'))}

		this.toggleVisibility (true)
		this.modalBody.scroll ()  },

	hash: function (what) {
		return ((_.isTypeOf (Error, what) ? (what && what.stack) : what) || '').hash },

	printError: function (e) { var stackEntries = CallStack.fromError (e),
								   asyncContext = e.asyncContext

		while (asyncContext) {
			stackEntries = stackEntries.concat (CallStack.fromRawString (asyncContext.stack))
			asyncContext = asyncContext.asyncContext }

		stackEntries = stackEntries.mergeDuplicateLines

		return [

			$('<div class="panic-alert-error-message" style="font-weight: bold;">')
				.text (e.message)
				.append (_.any (stackEntries, function (e, i) { return (e.thirdParty || e['native']) && (i !== 0) })
							? '<a class="clean-toggle" href="javascript:{}"></a>'
							: '')
				.click (this.$ (function (e) {
					$(e.delegateTarget).parent ()
						.toggleClass ('all')
						.transitionend (this.$ (function () {
							this.modalBody.scroll () })) })),

			$('<ul class="callstack">').append (_.map (stackEntries, this.$ (function (entry) {

				var dom = $('<li class="callstack-entry">')
						.toggleClass ('third-party', entry.thirdParty)
						.toggleClass ('native', entry['native'])
						.append ([
							$('<span class="file">').text (_.nonempty ([entry.index ? '(index)' : entry.fileShort, entry.line]).join (':')),
							$('<span class="callee">').text (entry.calleeShort),
							$('<span class="src i-am-busy">').click (this.$ (function (e) { var el = $(e.delegateTarget)
								el.waitUntil (_.readSource.partial ((entry.remote ? 'api/source/' : '') + entry.file), this.$ (function (text) {
									if (dom.is ('.full')) {
										dom.removeClass ('full')
										dom.transitionend (function () {
											if (!dom.is ('.full')) { el.text (entry.source) } }) }
									else {
										dom.addClass ('full'); el.html (_.map (text.split ('\n'), function (line) {
																			return $('<div class="line">').text (line) }))

										var line = el.find ('.line').eq (entry.line - 1).addClass ('hili')
										if (line.length) {
											var offset = line.offset ().top - el.offset ().top
											el.scrollTop (offset - 100) }

										_.delay (this.$ (function () {
											var shouldScrollDownMore = ((el.outerBBox ().bottom + 242) - this.modalBody.outerBBox ().bottom)
											if (shouldScrollDownMore > 0) {
												this.modalBody.animate ({
													scrollTop: this.modalBody.scrollTop () + shouldScrollDownMore }, 250) }})) } })) })) ])

				entry.sourceReady (function (text) {
					dom.find ('.src').removeClass ('i-am-busy').text (text) })

				return dom }))) ] } })

$.fn.extend ({
	enableScrollFaders: function (cfg) {
		var horizontal = cfg && cfg.horizontal
		var faderTop, faderBottom, scroller = this.find ((cfg && cfg.scroller) || '.scroller')

		this.css ({ position: 'relative' })
		this.append (faderTop = $('<div class="scroll-fader scroll-fader-' + (horizontal ? 'left' : 'top') + '"></div>'))
			.append (faderBottom = $('<div class="scroll-fader scroll-fader-' + (horizontal ? 'right' : 'bottom') + '"></div>'))
		
		scroller.scroll (function () {
				var scrollTop = horizontal ? $(this).scrollLeft () : $(this).scrollTop (),
					height = horizontal ? $(this).width () : $(this).height (),
					max = horizontal ? this.scrollWidth : this.scrollHeight
				faderTop.css ({ opacity: scrollTop > 0 ? 1 : 0 })
				faderBottom.css ({ opacity: (scrollTop + height) < max ? 1 : 0 }) }).scroll ()

		return this } })

// -- end of namespace

}) (jQuery);