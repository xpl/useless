/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Thats how u talk to server

TODO: refactor, l10n for messages

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

API = $singleton (Component, {

	get: function (path, cfg, then) {
		this.request ('GET', path, _.extend ({ stackOffset: 1 }, cfg), then) },

	post: function (path, cfg, then) {
		this.request ('POST', path, _.extend ({ stackOffset: 1 }, cfg), then) },

	request: function (type, path, cfg, then) { cfg = cfg || {}

		var stackBeforeCall = _.hasReflection && $callStack.offset ((cfg.stackOffset || 0) + 1).asArray

		var prePath = (cfg.protocol || cfg.hostname || cfg.port) ?
						 	((cfg.protocol || window.location.protocol) + '//' +
						 	 (cfg.hostname || window.location.hostname) + ':' +
						 	 (cfg.port     || window.location.port)) : ''

		var success  = cfg.success   || _.identity
		var progress = cfg.progress  || _.identity
		var failure  = cfg.failure   || _.identity
		
		var retry = Http.request (type, prePath + '/api/' + path, _.extend ({}, cfg, {
			data: cfg.data || (cfg.what && JSON.stringify (cfg.what)),
			dataType: cfg.what ? 'json' : (cfg.data || undefined),
			success: function (response) {
				console.log ('API:', type, path, response)
				if (typeof response != 'object') {
					response = { success: false, error: 'Ошибка сервера' } }
				if (response.success) {
					progress (1)
            		success (response.value)
            		if (then) {
            			then (response.value) } }
            	else {
					if (response.parsedStack) { // cross-machine exception throwing

						_.globalUncaughtExceptionHandler (_.extend (new Error ('SERVER: ' + response.error), {
							remote: true,
							parsedStack: response.parsedStack.concat (stackBeforeCall || []) }))
						
						/*throw _.extend (new Error ('SERVER: ' + response.error), {
							remote: true,
							parsedStack: response.parsedStack.concat (stackBeforeCall || []) })*/ }
					else {
						failure (response.error, retry) } } } })) },

	uploadFile: function (path, file, then) { var xhr = new XMLHttpRequest ()

		var error = function (response) {
			throw _.extend (new Error (response.error), {
										remote: true,
										parsedStack: response.parsedStack,
										retry: API.uploadFile.partial (path, file, then),
										dismiss: then.partial (undefined, response.error) }) }

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) { var	response = { success: false, error: 'Ошибка сервера' }
				if (xhr.status == 200) {
					try			{ 			response = JSON.parse (xhr.responseText) }
					catch (e)	{} }
				else {
					response.error = 'Код ' + xhr.status }
				if (response.success) {
					then (response.value) }
				else {
					error (response) } } }

		xhr.open ('POST', path, true)
		xhr.setRequestHeader ('Content-Type',  'binary/octet-stream')
		xhr.setRequestHeader ('X-File-Name',	Parse.fileName (file.name || 'file').transliterate || 'file')
		xhr.setRequestHeader ('X-File-Size',	file.size)
		xhr.setRequestHeader ('X-File-Type',	file.type)
		xhr.setRequestHeader ('Cache-Control', 'no-cache')
		xhr.send (file) },

	/*	These requests should not resolve to any logic-level errors,
		their execution is obligatory. Any connection error should be fixed
		by user before execution continues. This is done primarily
		to maintain continuous data consistency across UI and server and
		to keep UI logic clear and simple, not bothering with any UI state change burden.
		In other words, it eliminates the whole 'wait/loading' paradigm for the UI.
	 */
	queue: function (cfg) {
		this.pendingRequests.push (cfg)
		this.processPendingRequests ()
	},

	/*	queue impl (experimental)
	 */
	pendingRequests: [],
	commitingRequests: 0,
	processPendingRequests: function () {
		if (this.pendingRequests.length > 0) {
			var cfg = this.pendingRequests[0]
			this.commitingRequests++
			this.pendingRequests = this.pendingRequests.slice (1)
			this.request (cfg.method, cfg.path, _.extend ({}, cfg, {
				success: _.$ (this, function (response) {
					try {
						if (cfg.success) {
							cfg.success (response)
						}
					} catch (e) {
						console.log (e.stack)
						this.reallyWeirdUnexpectedErrorThatTearsEverythingApartAndMakesChildrenCry (e.toString ())
					}
					this.processPendingRequests ()
				}),
				failure: _.$ (this, function (err, retry, connectionError) {
					if (connectionError) {
						alert ('Потеряна связь с сервером. Проверьте соединение и нажмите ОК, чтобы повторить запрос.')
						retry () }
					else {
						this.reallyWeirdUnexpectedErrorThatTearsEverythingApartAndMakesChildrenCry (err)
						this.processPendingRequests () } }),
				complete: _.$ (this, function () {
					this.commitingRequests-- }) })) } },

	/*	this just should not happen
	 */
	reallyWeirdUnexpectedErrorThatTearsEverythingApartAndMakesChildrenCry: function (what) {
		alert ('Произошла непредвиденная ошибка. Во избежание потери данных, перезагрузите страницу.\n\n(' + what + ')') },

	init: function () {
		jQuery (window).on ('beforeunload', function () {
			if (API.commitingRequests > 0) {
				return 'Некоторые изменения ещё не были синхронизированы с сервером.' } }) } })

/*	low-level http protocol utilities
	======================================================================== */

Http = $singleton (Component, {

	loadFile: function (path, cfg) {
		var request = new XMLHttpRequest();
		request.open ('GET', path, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			cfg.success (request.response) }
		request.onerror = function () {
			if (cfg.failure) {
				cfg.failure (request.response.error) } }
		if (cfg.progress) {
			request.onprogress = API.progressCallbackWithSimulation (cfg.progress) }
		request.send () },

	progressCallbackWithSimulation: function (progress) {
		progress (0)
    	var simulatedProgress = 0
    	return function (e) {
	    	if (e.lengthComputable) {
	    		cfg.progress.call (context, e.loaded / e.total) }
	    	else {
	    		simulatedProgress += 0.1
	    		if (simulatedProgress > 1) {
	    			simulatedProgress = 0 }
	    		progress (simulatedProgress) } } },

	get: function (path, cfg) {
		this.request ('GET', path, cfg) },

	post: function (path, cfg) {
		this.request ('POST', path, cfg) },

	request: function (type, url, cfg) {
		var retry = function () {
			Http.request (cfg) }
		jQuery.ajax (_.extend ({
			type: type,
			url: url,
			// TODO: doesnt work in modern browsers except Chrome??
			/*xhr: function() {
			    var xhr = jQuery.ajaxSettings.xhr ()
	        	var addListener = ((type == 'POST' && xhr.upload) ? xhr.upload.addEventListener : xhr.addEventListener)
	        	addListener ('progress', Http.progressCallbackWithSimulation (cfg.progress), false)
		        return xhr
		    }*/
		    error: function (e) {
		    	if (cfg.failure) {
					cfg.failure ('Ошибка соединения (' + e.statusText + ')', retry, true /* connection error */) } } }, cfg))
		return retry },

})