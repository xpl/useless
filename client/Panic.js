/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Error reporting UI

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($ /* JQUERY */) {

if (typeof UI === 'undefined') {
	UI = {} }

Panic = function (what, retry, dismiss) { if (arguments.length < 3) { dismiss = _.identity }

	if (_.isTypeOf (Error, what)) {
		retry   = retry   || what.retry
		dismiss = dismiss || what.dismiss }

	Panic.widget.append (what)
	
	if (_.isFunction (retry)) {
		Panic.widget.onRetry (retry) }

	if (_.isFunction (dismiss)) {
		Panic.widget.onClose (dismiss) } }

Panic.init = function () {
	if (!Panic._initialized) {
		 Panic._initialized = true
		_.withUncaughtExceptionHandler (function (e) { Panic (e, undefined, _.identity) }) } }

Panic.widget = $singleton (Component, {

	retryTriggered: $triggerOnce (),
	closeTriggered: $triggerOnce (),

	el: $memoized ($property (function () {

		var el = $('<div class="ui-error-modal-overlay" style="z-index:5000; display:none;">').append ([
			this.bg    = $('<div class="ui-error-modal-overlay-background">'),
			this.modal = $('<div class="ui-error-modal">').append ([
				this.modalBody = $('<div class="ui-error-modal-body">').append (
					this.title = $('<div class="ui-error-modal-title">Now panic!</div>')),
				$('<div class="ui-error-modal-footer">').append ([
					this.btnRetry = $('<button type="button" class="ui-error-btn ui-error-btn-warning" style="display:none;">Try again</button>')
						.touchClick (this.retry),
					this.btnClose = $('<button type="button" class="ui-error-btn ui-error-btn-danger" style="display:none;">Close</button>')
						.touchClick (this.close) ]) ]) ]).appendTo (document.body)

					  var setMaxHeight = this.$ (function () { this.modal.css ('max-height', $(window).height () - 100) })
						  setMaxHeight ()
		$(window).resize (setMaxHeight)

		return el })),

	toggleVisibility: function (yes) {
		if (yes !== !(this.el.css ('display') === 'none')) {
	        if (yes) {
	            this.el.css ('display', '') }
	        this.el.animateWith (yes ? 'ui-error-modal-appear' : 'ui-error-modal-disappear', this.$ (function () {
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
		this.modalBody.find ('.ui-error-alert-error').remove ()
		this.btnRetry.hide ()
		this.btnClose.hide () },

	append: function (what) {
		$('<div class="ui-error-alert-error">').append (
			$('<span class="message">').append (
				_.isTypeOf (Error, what) ? Panic.widget.printError (what) : log.impl.stringify (what))).insertAfter (
					this.el.find ('.ui-error-modal-title'))
		this.toggleVisibility (true)  },

	readRemoteSource: _.cps.memoize (function (file, then) {
		$.get ('/api/source/' + file, then, 'text') }),

	printError: function (e) { var stackEntries = CallStack.fromError (e),
								   readSource = (e.remote ? Panic.widget.readRemoteSource : _.readSource)
		return [

			$('<div class="message" style="font-weight: bold;">')
				.text (e.message)
				.append ('<a class="clean-toggle" href="javascript:{}"></a>').click (function (e) {
					$(e.delegateTarget).parent ().parent ().toggleClass ('all') }),

			$('<ul class="callstack">').append (_.map (stackEntries, function (entry) {

				var dom = $('<li class="callstack-entry">')
						.toggleClass ('third-party', entry.thirdParty)
						.append ([
							$('<span class="file">').text (_.nonempty ([entry.fileShort || '(index)', ':', entry.line]).join ('')),
							$('<span class="callee">').text (entry.calleeShort),
							$('<span class="src">').text (entry.source || '').click (function (e) {
								var el = $(e.delegateTarget)
								el.waitUntil (readSource.partial (entry.file),
									function (text) {
										if (el.is ('.full')) {
											el.removeClass ('full').text (entry.source)
										} else {
											el.addClass ('full').html (_.map (text.split ('\n'), function (line) {
												return $('<div class="line">').text (line)
											}))
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