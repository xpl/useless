/*	Raw level filtering layer (also exposes some legacy API for back compat)
	======================================================================== */

FilterChain_AdHoc = $component ({

	$tests: {
		'semantics': function () {
			var chain = new FilterChain_AdHoc ({
								collection: new SortedFilteredCollection () })

			$assertCalls (3, function (mkay) {
				chain.changed (function () {
					mkay () })

				chain.atomicChange (function (done) {
					chain.set ('foo', { predicate: _.constant (true) })
					chain.set ('bar', { predicate: _.constant (true) })
					done () })

				chain.set ('baz', { predicate: _.constant (true) })
				chain.set ('qux', { predicate: _.constant (true) }) })

			chain.changed.off () // remove mkay listener

			$assertTypeMatches (chain.filters, {
				foo: 'object', bar: 'object', baz: 'object', qux: 'object' })

			chain.remove ('foo')
			chain.remove ('bar')

			$assertTypeMatches (chain.filters, {
				foo: 'undefined', bar: 'undefined', baz: 'object', qux: 'object' })

			$assert (chain.any)

			chain.remove ('baz')

			$assertCalls (1, function (mkay) {
				chain.removed (function (filter, name) {
					$assert (name === 'qux')
					$assertTypeMatches (filter.predicate, 'function'); mkay () })

				chain.remove ('qux') })

			$assert (chain.empty)

			$assertCalls (1, function (mkay) {
				chain.wasSet (function (filter, name) {
					$assert (name === 'qux')
					$assertTypeMatches (filter.predicate, 'function'); mkay () })

				chain.set ('qux', { predicate: _.constant (true) }) }) } },

/*	PUBLIC API
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	$defaults: {
		filters: {},
		_changing: 0 },

	$requires: {
		collection: _.property ('isCollection') },

	$trait: Changeable,

	has: function (id) {
		return (id in this.filters) },

	any: $property (function () {
		return !this.empty }),

	empty: $property (function () {
		return _.isEmpty (this.filters) }),

	set: function (id, cfg) {
		_.defaults (this.filters[id] = cfg, { id: id, removed: _.noop, changed: _.noop })
		this.wasSet (cfg, id)
		this.triggerChange () },

	wasSet: $trigger (),

	remove: function (id) {
		var filter = this.filters[id]
		if (filter) {
			delete this.filters[id]
			filter.removed ()
			filter.changed (undefined)
			this.removed (filter, id)
			this.triggerChange () } },

	removed: $trigger (),

	changed: $trigger (function () { this.rebuild () }),

	rebuild: function () {

		var predicates = _.nonempty (_.map (this.filters,
			function (f) {
				return (f.evalPredicate && f.evalPredicate ()) || f.predicate }))

		var n = predicates.length || 0

		this.collection.filterBy (n === 0 ? undefined : function (item) {
			for (var i = 0; i != n; i++) {
				if (predicates[i] (item) === false) {
					return false } }
			return true }) } })

