/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Error reporting UI

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($ /* JQUERY */) {

if (typeof UI === 'undefined') {
	UI = {} }

Panic = function (what, cfg) { cfg = _.defaults (_.clone (cfg || {}), { dismiss: _.identity })

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
		 CallStack.enableSetTimeoutHook ()
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
						.touchClick (this.close) ]) ]) ]).appendTo (document.body)

					  var setMaxHeight = this.$ (function () { this.modal.css ('max-height', $(window).height () - 100) })
						  setMaxHeight ()
		$(window).resize (setMaxHeight)

		return el })),

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

		this.toggleVisibility (true)  },

	readRemoteSource: _.cps.memoize (function (file, then) {
		$.get ('/api/source/' + file, then, 'text') }),

	hash: function (what) {
		return ((_.isTypeOf (Error, what) ? (what && what.stack) : what) || '').hash },

	printError: function (e) { var stackEntries = CallStack.fromError (e),
								   readSource = (e.remote ? Panic.widget.readRemoteSource : _.readSource)
		return [

			$('<div class="panic-alert-error-message" style="font-weight: bold;">')
				.text (e.message)
				.append ('<a class="clean-toggle" href="javascript:{}"></a>').click (function (e) {
					$(e.delegateTarget).parent ().parent ().toggleClass ('all') }),

			$('<ul class="callstack">').append (_.map (stackEntries, function (entry) {

				var dom = $('<li class="callstack-entry">')
						.toggleClass ('third-party', entry.thirdParty)
						.append ([
							$('<span class="file">').text (_.nonempty ([entry.fileShort || '(index)', ':', entry.line]).join ('')),
							$('<span class="callee">').text (entry.calleeShort),
							$('<span class="src">').text (entry.source || '').click (function (e) { var el = $(e.delegateTarget)
								el.waitUntil (readSource.partial (entry.file), function (text) {
									if (el.is ('.full')) {
										el.removeClass ('full').text (entry.source) }
									else {
										el.addClass ('full').html (_.map (text.split ('\n'), function (line) {
											return $('<div class="line">').text (line) }))
										_.delay (function () {
											var line = el.find ('.line').eq (entry.line - 1).addClass ('hili')
											if (line.length) {
												var offset = line.offset ().top - el.offset ().top
												el.scrollTop (offset - 100) } }) } }) })])

				entry.sourceReady (function (text) {
					dom.find ('.src').text (text) })

				return dom })) ] } })

// -- end of namespace

}) (jQuery);