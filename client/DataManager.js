DataManager = $singleton (Component, {

/*	External APIs
	======================================================================== */

	onlineStatus:		$observable ('offline'),
	updateProgress:		$observable (0),
	appcacheUpdated:	$trigger (),
	itemUpdated:		$trigger (/* collectionName, item, before */),
	uptime: 			function () { return Date.now () - this.started },
	started:			Date.now (),


/*	Startup
	======================================================================== */

	init: function () {

		if (typeof Collections !== 'undefined') {
			_.each (Collections,
				this.initRemoteCollection) }

		if (true /*env.who*/) {
			this.initLiveUpdates () }

		if (this.appcacheEnabled ()) {
			this.initAppcache () } },


/*	RemoteCollections
	======================================================================== */

	initRemoteCollection: function (schema, name) {
		_.defineProperty (this, name, _.memoize (_.$ (this, function () {
			return (this.collections || (this.collections = {}))[name] =
				new RemoteCollection (_.omit (
					_.extend ({ name: name, schema: schema }, schema),
					_.keys (RemoteCollection.$definition))) }))) },


/*	Live updates
	======================================================================== */

	Live: $global['Live'] = $singleton (Component, {

		online: $observable (false),

		$defaults: {
			events: {},
			lastIndex: -1,
			nonce: Format.randomHexString (16) },

		on: function (what, delegate) {
			_.each (what.split (' '), _.$ (this, function (what) {
				(this.events[what] || (this.events[what] = _.trigger ())) (delegate) })) },

		commit: function (data) {
			if (data.what === 'log') {
				log.impl.writeBackend (data.params) } // remote logging

			else if ((data.index === undefined) || (data.index > this.lastIndex)) { console.log ('LIVE (incoming)', data)
				this.lastIndex = data.index || this.lastIndex
				if (data.what && (data.what in this.events)) {
					console.log ('LIVE: committing ' + data.what)
					this.events[data.what] (data) }
				else {
					console.log ('LIVE: unknown verb ' + data.what) } }
			else {
				console.log ('LIVE: skipping #' + data.index, 'because #' + this.lastIndex, 'already there') } },

		connect: function (ui) {
			this.connection = new WebSocket ('ws://' + window.location.host)

			this.connection.onopen = function () {
				this.send (JSON.stringify ((typeof env === 'undefined' || !env.who) ? {} : { email: env.who.email, password: env.who.password }))
				Live.online (true) }

			this.connection.onclose = this.$ (function () { console.log ('retrying LIVE connection')
				Live.online (false)
				this.connect.partial (ui).delay (1000) })

			this.connection.onmessage = this.$ (function (message) {
				var data = _.json (message.data)
				if (data.nonce != this.nonce) { // prevents 'echoing'
					this.commit (data) } }) } }),

	initLiveUpdates: function () {
		Live.online (this.$ (function (online) {
			if (online) {
				if (this.appcacheEnabled ()) { // update appcache on reconnect
					if (window.applicationCache.status === window.applicationCache.IDLE && this.onlineStatus.value === 'offline') {
						window.applicationCache.update () } }
				else {
					this.onlineStatus ('online') } }
			else {
				this.onlineStatus ('offline') } }))

		Live.on ('delete', this.$ (function (entry) {
			Collection.prototype.deleteItem.call (this[entry.target], entry.which) }))

		Live.on ('update comment add', this.$ (function (entry) {
			console.log ('DataManager:', entry.what + 'ing', 'to', entry.target, entry.changes)

			if (entry.target in this) {
				var item = (entry.what == 'add' ?
					_.extend ({ _id: entry.which }, entry.changes.$set) :
					this[entry.target].index[entry.which])

				if (item) {
					var before = _.clone (item)

					Collection.prototype.updateItem.call (this[entry.target],
						DataManager.applyMongoUpdateOperators (
							_.extend (item, { lastHistoryEntry: entry }), // virtual field, this is needed for Collection listeners who want to read history entry metadata
							entry.changes), before)

					this.itemUpdated (entry.target, item, before)
				}
				else {
					console.log ('DataManager: no such item', entry.which) } }
			else {
				console.log ('DataManager: no such target', entry.target) } }))

		this.handleDatabaseDropEvent () // remote in production

		Live.connect () },

	handleDatabaseDropEvent: function () {
		Live.on ('dropdb-begin', this.$ (function () {
			this.dropdbOverlay = new ProgressOverlay ({ renderTo: document.body }) }))
		Live.on ('dropdb-progress', this.$ (function (progress) {
			if (this.dropdbOverlay) {
				if (progress.msg) {
					this.dropdbOverlay.title (progress.msg) }
				this.dropdbOverlay.progress (progress.value) } }))
		Live.on ('dropdb-complete', this.$ (function () {
			window.location.reload () })) },

	applyMongoUpdateOperators: function (item, rawChanges) { var changes = DAL.prepareMongoUpdateChanges (rawChanges, item)

		_.extend (item, changes.$set)
		
		_.each (changes.$unset, function (value, key) { delete item[key] })

		_.each (changes.$pushAll, function (values, key) {
			log.warn ('applying $pushAll')
			item[key] = (item[key] || []).concat (values) })

		_.each (changes.$pullAll, function (values, key) {
			log.warn ('applying $pullAll')
			item[key] = (item[key] && _.difference (item[key], values)) || undefined })

		_.each (changes.$addToSet, function (value, key) { values = (value && value.$each) || value
			item[key] = _.difference (item[key], values).concat (values) })

		return item },


/*	AppCache (experimental and disabled for now)
	======================================================================== */

	appcacheEnabled: function () {
		return $('html').attr ('appcache') ? true : false },

	initAppcache: function () {
		var currentVersions = _.clone (appcacheVersions || {})

		$(window.applicationCache).on ('checking', function () {
			// checking manifest

		}).on ('noupdate', function () {
			// manifest checked, nothing changed
			DataManager.onlineStatus ('online')

		}).on ('downloading', function () {
			// cache changed, and we're updating it (downloading all the shit)
			DataManager.onlineStatus ('updating')
			DataManager.updateProgress (0)

		}).on ('progress', function (e) {
			// file downloaded
			DataManager.updateProgress (e.originalEvent.loaded / e.originalEvent.total)

		}).on ('cached', function () {
			// cache downloaded, everything is consistent
			DataManager.onlineStatus ('online')

		}).on ('updateready', function () {
			// commit downloaded resoures to cache
			window.applicationCache.swapCache ()

			// check whether new versions of data/code available
			Http.get ('appcache/versions.js', {
				dataType: 'script',
				cache: true,
				success: function () {
					// if data updated
					if (currentVersions.lastHistoryUpdate != appcacheVersions.lastHistoryUpdate) {
						_.invoke (DataManager.collections, 'restoreFromRemoteOrigin')
						DataManager.appcacheUpdated (Math.max (0, appcacheVersions.lastHistoryUpdate - currentVersions.lastHistoryUpdate)) }
					// if code updated
					if (currentVersions.lastCodeUpdate != appcacheVersions.lastCodeUpdate) {
						if (confirm ('Доступна новая версия клиента, перезагрузить страницу?')) {
							window.location.reload () } }

					// commit
					currentVersions = _.clone (appcacheVersions)
					DataManager.onlineStatus ('online') },

				failure: function (e, retry) {
					console.log ('retrying appcache/versions.js')
					_.delay (retry, 1000) } })

		}).on ('obsolete', function () {
			// wtf

		}).on ('error', function () {
			// this happens when we are in offline mode, just retry fetching manifest until connection resumes
			_.delay (_.$ (applicationCache, applicationCache.update), 1000) }) }
		
})

