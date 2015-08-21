Nav = $singleton (Component, {

	$defaults: {
		stateValue: {} },

/*	Tabs should derive from this
	======================================================================== */

	Tab: $component ({
		$defaults: {
			id: 'tab id will store here' },

		/*	Bind on this.stateChange to receive state updates
		 */
		state: $observableProperty ({}),

		/*	Behavior customization
		 */
		init:				function () {},				// called only when tab is activated first time (do all your heavy shit here)
		backgroundInit:		function () {}, 			// called at constructor (unlike init), currently used to implement navbar counters
		activated:			function () {},				// called when switched to this tab
		deactivated:		function ()	{},				// called when swiched from this tab

		/*	Public API
		 */
		isActive: $property (function () {
			return Nav.currentTab === this }),

		changeState: function (state) {
			
			// log.error (new Date (), arguments, $callStack.clean)
			
			if (this.isActive) {
				Nav.state = { tab: this.id, tabState: _.nonempty (state) } }
			else {
				this.state = _.nonempty (state) } },

		activate: function (state /* optional */) {
			Nav.state = { tab: this.id, tabState: state || this.state } } }),

/*	PERSISTENCE (window.location.hash based)
	======================================================================== */

	/*	Public API
	 */
	state: $property ({
		get: function () {
			return this.stateValue },

		set: function (state) {
			window.location.hash = _.nonempty ([
				state.tab,
				_.nonempty (_.map (state.tabState,  Nav.urlEncodeKeyValue.flip2)).join ('/')]).join ('/') } }),

	/*	PRIVATE IMPL
	 */
	hashChange: function () {
		var state = this.urlDecodeState ((window.location.hash.toString () || '#').slice (1))
		var tab = (state.tab && this.tabs[state.tab]) || this.defaultTab

		if (state.tabState) {
			this.stateValue.tabState = state.tabState
			tab.initialized (function () {
				if (!_.isEqual (tab.state, state.tabState)) {
					tab.state = state.tabState } }) }		// push tabState to tab instance (when it's initialized)

		if (tab !== this.currentTab) {
			this.activateTab (tab, state.tabState) } },

	urlDecodeState: function (afterHashPart) {
		var buckets = afterHashPart.split ('/')
		return {
			tab: _.first (buckets),
			tabState: _.object (_.rest (buckets).map (function (encodedKeyValue) {
				var keyValue = encodedKeyValue.split ('=').map (decodeURIComponent)
				return [keyValue[0], JSON.parse (keyValue[1])] })) } },

	urlEncodeKeyValue: function (key, value) {
		var encodedValue = encodeURIComponent (JSON.stringify (value))
		return (encodedValue && (encodeURIComponent (key) + '=' + encodedValue)) || undefined },

/*	TAB MANAGEMENT
	======================================================================== */

	currentTab: $property (function () {
		return this.tabs[this.state.tab] }),

	/*	do not call directly, use Nav.state or Tab.activate to change tabs
	 */
	activateTab: function (tab, state) { var prevTab = this.currentTab
		this.stateValue.tab = tab.id 

		this.el.find ('.nav-item.active').removeClass ('active')
		tab.navItem.addClass ('active')
		$(document.body).attr ('data-tab', tab.id)

		if (prevTab) {
			prevTab.el.removeClass ('visible')
			prevTab.deactivated () }

		tab.el.addClass ('visible')									// show current tab
		if (!tab.initialized.already) {								// initialize, if not already
			if (state) {
				tab.state = state }	// make sure current tab state is accessible by init
			tab.init ()
			tab.stateChange.force () } // force call stateChange to make sure tab state is commited to UI
		tab.activated () },

	initTabs: function () {
		this.tabs = _.nonempty (_.object (_.map (this.el.find ('.nav-item[data-tab]'), function (navItemEl) {
			var navItem = $(navItemEl)
			var id = navItem.attr ('data-tab')

			navItem.touchClick (function (e) {
				Nav.tabs[id].activate ()
				e.preventDefault ()
				return false })

			return [id, (navItem.hasClass ('hide-on-ios') && Platform.iOS) ? undefined :
				this.tabInstance ({
					id: navItem.attr ('data-tab'),
					navItem: navItem })] }, this))) },

	tabInstance: function (cfg) {
		var constructorName = cfg.id.capitalized + 'UI' // users → UsersUI
		var shouldRender = (cfg.navItem.hasClass ('hide-on-ios') && Platform.iOS)
		var constructor = window[constructorName]
		if (!constructor) {
			throw new Error ('Unable to find Tab: ' + constructor) }

		var tab = new constructor (_.extendWith (cfg, {
				init: false, // deferred init(), called on first activation
				el: $('body > .content > .tab.' + cfg.id) }))

		if (!tab.isInstanceOf (Nav.Tab)) {
			throw new Error (constructorName + ' should inherit from Nav.Tab') }

		if (cfg.navItem.hasClass ('active')) {
			this.defaultTab = tab }

		if (this.state.tab !== cfg.id) {
			tab.backgroundInit () }

		return tab },

/*	ONLINE STATUS INDICATOR
	======================================================================== */

	initOnlineStatus: function () {
		DataManager.onlineStatus (function (status) {
			$('.nav-item.online-status').attr ('class', 'nav-item online-status ' + status)
			$('.nav-item.online-status span').empty () })

		DataManager.updateProgress (function (progress) {
			$('.nav-item.online-status.updating span').text (progress ? (Math.round (progress * 100.0) + '%') : '') }) },

/*	LOGOUT
	======================================================================== */

	initLogout: function () {
		$('#logout').click (function (e) {
			if (confirm ('Are you sure?')) {
				$(e.delegateTarget).waitUntil (API.post.partial ('logout', {
					success: function () { window.location = '/' },
					failure: Panic })) } }) },

/*	ENTRY POINT
	======================================================================== */

	afterTests: function (then) {
		$(document.body).showLoadingUntil (function (done, overlay) {
			overlay.title ('Don\'t panic. Running tests...')
			Testosterone.run ({ verbose: false, silent: true }, done) },
			then) },

	init: function () { $(document).ready (this.$ (function () {

		this.afterTests (this.$ (function () {

			this.el = $('body > .navbar')
			this.initTabs ()

			window.onhashchange = this.hashChange
			this.hashChange ()

			if (!this.currentTab) {
				this.defaultTab.activate () }

			this.initLogout ()
			this.initOnlineStatus () })) })) } })




