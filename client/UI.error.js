/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Error reporting UI

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

if (typeof UI === 'undefined') {
	UI = {} }

UI.error = function (what, retry, dismiss) {
	if (_.isTypeOf (Error, what)) {
		retry   = retry   || what.retry
		dismiss = dismiss || what.dismiss }

	ErrorOverlay.append (what)
	
	if (_.isFunction (retry)) {
		ErrorOverlay.onRetry (retry) }
	if (_.isFunction (dismiss)) {
		ErrorOverlay.onClose (dismiss) } }

ErrorOverlay = $singleton (Component, {

	retryTriggered: $triggerOnce (),
	closeTriggered: $triggerOnce (),

	el: $memoized ($property (function () {
		var el = $('<div class="ui-error-modal-overlay" style="z-index:5000;">').append ([
			$('<div class="background">'),
			$('<div class="ui-error-modal loading error">').append ([
				this.modalBody = $('<div class="ui-error-modal-body">').append ('<h5>Now panic!</h5>'),
				$('<div class="modal-footer">').append ([
					this.btnRetry = $('<button type="button" class="ui-error-btn ui-error-btn-warning" style="display:none;">Try again</button>')
						.touchClick (this.retry),
					this.btnClose = $('<button type="button" class="ui-error-btn ui-error-btn-danger" style="display:none;">Close</button>')
						.touchClick (this.close) ]) ]) ]).appendTo (document.body)
		return el })),

	onRetry: function (retry) {
		this.retryTriggered (retry)
		this.btnRetry.show () },

	onClose: function (close) {
		this.closeTriggered (close)
		this.btnClose.show () },

	retry: function () {
		this._clean ()
		this.closeTriggered.off ()
		this.el.fadeOut (500)
		this.retryTriggered () },

	close: function () {
		this._clean ()
		this.retryTriggered.off ()
		this.el.fadeOut (500)
		this.closeTriggered () },

	_clean: function () {
		this.modalBody.find ('.alert').remove ()
		this.btnRetry.hide ()
		this.btnClose.hide () },

	append: function (what) {
		this.el.find ('.ui-error-modal-body')
			.append ($('<div class="alert ui-error-alert-error fade in">').append (
				$('<span class="message">').append (
					_.isTypeOf (Error, what) ? ErrorOverlay.printError (what) : log.impl.stringify (what))))
		this.el.fadeIn (500)
		_.delay (this.$ (function () {
			this.modalBody.scrollTop (this.modalBody[0].scrollHeight) }))  },

	readRemoteSource: _.cps.memoize (function (file, then) {
		$.get ('/api/source/' + encodeURIComponent (file), then, 'text') }),

	printError: function (e) {
		var stackEntries = CallStack.fromError (e)
		var readSource = (e.remote ? ErrorOverlay.readRemoteSource : _.readSource)

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
												var offset = line.offset ().top - el.offset ().top
												el.scrollTop (offset - 100)
											})
										}
									})
							})])

				entry.sourceReady (function (text) {
					dom.find ('.src').text (text) })

				return dom })) ] } })