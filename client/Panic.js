"use strict";

/*  TODO: REWRITE THIS MESS WITH REACT
	======================================================================== */

(function ($ /* JQUERY */) {

StackTracey.isThirdParty.include (path => (path.indexOf ('useless/') === 0))

$global.Panic = (what, cfg) => { cfg = _.defaults (_.clone (cfg || {}), { dismiss: _.identity, raw: false })

	if (what === undefined) {
		what = _.errorWithAsync (new Error ('Panic!'))
	}
	
	if (_.isTypeOf (Error, what)) {
		_.extend (cfg, _.pick (what, 'retry', 'dismiss')) }

	Panic.widget.append (what, cfg.raw)

	if (_.isFunction (cfg.retry)) {
		Panic.widget.onRetry (cfg.retry) }

	if (_.isFunction (cfg.dismiss)) {
		Panic.widget.onClose (cfg.dismiss) } }

$global.Panic.close = function () {

	if (Panic.widget.modalBody) {
		Panic.widget.close ()
	}
}

Panic.init = () => {
	if (!Panic._initialized) {
		 Panic._initialized = true
	   _.withUncaughtExceptionHandler (function (e) { Panic (e); throw e /* re-throw, to make it visible in WebInspector */ }) } }

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

		el.appendTo (document.body)
		
		$(document).ready (function () {
			el.appendTo (document.body) })

		try {
			$(window).resize (this.layout).resize ()
			this.modal.enablePanicScrollFaders ({ scroller: this.modalBody })
			$(document).keydown (this.$ (function (e) { if (e.keyCode === 27) { this.close () } })) }

		catch (e) {
			_.delay (function () { Panic (e) }) }

		return el })),

	layout () { var maxContentWidth = _.coerceToUndefined (_.max (_.map (this.modal.find ('pre'), _.property ('scrollWidth'))))

		this.modal.css ({ 'max-height': $(window).height () - 100,
						  'width': maxContentWidth && (maxContentWidth + 120) })

		this.modalBody.scroll () },

	toggleVisibility (yes) {
		if (yes !== !(this.el.css ('display') === 'none')) {
	        if (yes) {
	            this.el.css ('display', '') }
	        this.el.animateWith (yes ? 'panic-modal-appear' : 'panic-modal-disappear', this.$ (function () {
	            if (!yes) {
	                this.el.css ('display', 'none') } })) } },

	onRetry (retry) {
		this.retryTriggered (retry)
		this.btnRetry.css ('display', '') },

	onClose (close) {
		this.closeTriggered (close)
		this.btnClose.css ('display', '') },

	retry () {
		this._clean ()
		this.closeTriggered.off ()
		this.toggleVisibility (false)
		this.retryTriggered () },

	close () {
		this._clean ()
		this.retryTriggered.off ()
		this.toggleVisibility (false)
		this.closeTriggered () },

   _clean () {
		this.modalBody.find ('.panic-alert-error').remove ()
		this.modalBody.scroll ()
		this.btnRetry.css ('display', 'none')
		this.btnClose.css ('display', 'none') },

	append (what, raw) { var id = 'panic' + this.hash (what)

		var counter = $('#' + id + ' .panic-alert-counter')
		if (counter.length) {
			counter.text ((counter.text () || '1').parsedInt + 1) }
		else {
			$('<div class="panic-alert-error">').attr ('id', id)
												.append ('<span class="panic-alert-counter">')
												.append (this.print (what, raw))
												.insertAfter (this.el.find ('.panic-modal-title')) }
		this.toggleVisibility (true)
		this.layout ()  },

	hash (what) {
		return ((_.isTypeOf (Error, what) ? (what && what.stack) :
				(_.isTypeOf (Test, what)  ? (what.suite + what.name) :
                String.ify (what))) || '').hash },

	print (what, raw) {
		return (_.isTypeOf (Error, what) ?
						this.printError (what) :
			   (_.isTypeOf (Test, what) ?
						this.printFailedTest (what) :
						this.printUnknownStuff (what, raw))) },

	printUnknownStuff (what, raw) {
		return raw ? what : $('<span>').text (log.impl.stringify (what)) },

	printLocation (where) {
		return $('<span class="location">')
					.append ([$('<span class="callee">').text (where.calleeShort),
							  $('<span class="file">')  .text (where.fileName), 
							  $('<span class="line">')  .text (where.line)]) },

	printFailedTest (test) { var logEl = $('<pre class="test-log" style="margin-top: 13px;">')

		log.withWriteBackend (
			params => { if (_.isTypeOf (Error, params.args.first)) { console.log (params.args.first) }

				logEl.append (_.isTypeOf (Error, params.args.first)
						? ($('<div class="inline-exception-entry">')
								.append ([_.escape (params.indentation),
											$('<div class="panic-alert-error inline-exception">').append (
												this.printError (params.args.first))]))
						: $('<div class="log-entry">')
								.append (
									_.map (params.lines, function (line, i, lines) {
															return $('<div class="line">')
																		.append (_.escape (params.indentation))
																		.append (_.map (line, function (run) {
																								return $('<span>')
																									.attr ('style', (run.config.color && run.config.color.css) || '')
																									.text (run.text) }))
																		.append ((i === lines.lastIndex) ?
																			[params.where && this.printLocation (params.where),
																			 params.trailNewlines.replace (/\n/g, '<br>')] : []) }, this))) },

			done => {
				test.evalLogCalls ()
				done () })

		return [$('<div class="panic-alert-error-message" style="font-weight: bold;">')
				    .text (test.name)
				    .append ('<span style="float:right; opacity: 0.25;">test failed</span>'), logEl] },

	printError (e) {

		var stackEntries = StackTracey.fromErrorWithAsync (e).withSources

		return [

			$('<div class="panic-alert-error-message" style="font-weight: bold;">')
				.text (e.message)
				.append (_.any (stackEntries, function (e, i) { return (e.thirdParty || e['native'] || e.hide) && (i !== 0) })
							? '<a class="clean-toggle" href="javascript:{}"></a>'
							: '')
				.click (this.$ (function (e) {
					$(e.delegateTarget).parent ()
						.toggleClass ('all-stack-entries')
						.transitionend (this.$ (function () {
							this.modalBody.scroll () })) })),

			$('<div class="not-matching" style="margin-top: 5px; padding-left: 10px;">').append (_.map (_.coerceToArray (e.notMatching || []), function (s) {
				return $('<pre>').text (log.impl.stringify (s)) })),

			$('<ul class="callstack">').append (_.map (stackEntries, this.$ (function (entry) {

				var dom = $('<li class="callstack-entry">')
						.toggleClass ('third-party', entry.thirdParty || false)
                        .toggleClass ('hide',        entry.hide || false)
						.toggleClass ('native',      entry['native'] || false)
						.append ([
							$('<span class="file">').text (_.nonempty ([entry.index ? '(index)' : entry.fileShort,
																		entry.line]).join (':')),
							$('<span class="callee">').text (entry.calleeShort),
							$('<span class="src">').text ((entry.sourceLine || '').trim ()).click (this.$ (function (e) { var el = $(e.delegateTarget)

								if (dom.is ('.full')) {
									dom.removeClass ('full')
									dom.transitionend (function () {
										if (!dom.is ('.full')) {
											el.text ((entry.sourceLine || '').trim ()) } }) }

								else {

									const lines = (entry.sourceFile || { lines: [] }).lines

									dom.addClass ('full')
									el.html (lines.map (line => $('<div class="line">').text (line)))

									var line = el.find ('.line').eq (entry.line - 1).addClass ('hili')
									if (line.length) {
										var offset = line.offset ().top - el.offset ().top
										el.scrollTop (offset - 100) }

									_.delay (this.$ (function () {
										var shouldScrollDownMore = ((el.outerBBox ().bottom + 242) - this.modalBody.outerBBox ().bottom)
										if (shouldScrollDownMore > 0) {
											this.modalBody.animate ({
												scrollTop: this.modalBody.scrollTop () + shouldScrollDownMore }, 250) }})) } })) ])

				return dom }))) ] } })

$.fn.extend ({
	enablePanicScrollFaders: function (cfg) {
		var horizontal = cfg && cfg.horizontal
		var faderTop, faderBottom, scroller = this.find ((cfg && cfg.scroller) || '.scroller')

		this.css ({ position: 'relative' })
		this.append (faderTop = $('<div class="panic-scroll-fader panic-scroll-fader-' + (horizontal ? 'left' : 'top') + '"></div>'))
			.append (faderBottom = $('<div class="panic-scroll-fader panic-scroll-fader-' + (horizontal ? 'right' : 'bottom') + '"></div>'))
		
		scroller.scroll (function () {
				var scrollTop = horizontal ? $(this).scrollLeft () : $(this).scrollTop (),
					height = horizontal ? $(this).width () : $(this).height (),
					max = (horizontal ? this.scrollWidth : this.scrollHeight) - 1
				faderTop.css ({ opacity: scrollTop > 0 ? 1 : 0 })
				faderBottom.css ({ opacity: (scrollTop + height) < max ? 1 : 0 }) }).scroll ()

		return this } })

// -- end of namespace

}) (require ('jquery'));