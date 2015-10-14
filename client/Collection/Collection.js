// TODO: REFACTOR

Collection = $extends (Component, {

	$traits: [Changeable],

	/*	Coerces following input values to proper Collection instances:
	 */
	coerce: $static (function (what) {
		if (_.isEmpty (what)) {
			return new Collection () }							// undefined / null / [] / {}

		else if (_.isArray (what)) { if (_.isNumber (what[0]) ||
										 _.isString (what[0])) {

			return new Collection ({ items: _.map (what,		// ['foo', 'bar'] / [1,2,3]
				function (item) { return {
					_id: item, name: item } }) }) }

			else {
				return new Collection ({ items: what }) } }		// [{ _id: 'foo' }, { _id: bar }]

		else if (what.isCollection) {
			return what }									

		else {
			return new Collection ({ items: _.map (what,		// { 'foo': {}, 'bar': {} }
									function (v, k) {
										return _.extend ({ _id: k }, v) }) }) } }),

	/*	Use to coerce id|item → id (a useful tool for flexible parameterization of various data access APIs)
	 */
	coerceToId:	$static (function (itemOrId) {
		return itemOrId && ((typeof itemOrId === 'string') ? itemOrId : itemOrId._id) }),

	/*	Use to coerce id|item → item
	 */
	coerceToItem: function (itemOrId) {
		return (typeof itemOrId === 'string') ? this.index[itemOrId] : itemOrId },

	/*	Some events
	 */
	notEmpty:			$barrier (),
	updated:			$trigger (),
	itemUpdated:		$trigger (),
	itemDeleted:		$trigger (),
	manyItemsUpdated:	$trigger (),

	/*	for RTTI, as our Collections zoo not deriving from single base class
	 */
	isCollection: $property (true),

	/*	Other stuff (subject to refactoring)
	 */
	init: function () {		
		_.defaults (this, {
			index: {},
			items: [],
			initial: true})

		if (this.items) {
			this.update (this.items) }},

	_clear: function () {
		this.index = {}
		this.items = []
	},
	update: function (items) {
		if (!this.initial) { // WORKAROUND for a bug with some references to index stored at startup
			this._clear ()
		}
		this.initial = false
		var i, id, obj, index = this.index
		for (i = 0, n = items.length; i < n; i++) {
			obj = items[i]
			index[obj._id] = obj
			if (this.processItem) {
				this.processItem (obj)
			}
		}
		this.items = items
		this.updated (items)
		this.notEmpty (true)
		this.triggerChange ()
	},
	mapItem: function (id, fn) {
		var oldItem = this.index[id]
		var newItem = fn (oldItem)
		if (newItem) {
			if (oldItem && newItem && oldItem !== newItem) {
				throw new Error ('mapItem semantics should be mutating, returning copy is not allowed') }
			Collection.prototype.updateItem.call (this, newItem) }
		else {
			Collection.prototype.deleteItem.call (this, id) }
	},
	updateItem: function (item, was) { 						// one should provide 'was' if item was mutated in-place
		var id = item._id
		var current = this.index[id]
		var before = current ? (was || _.clone (current)) : undefined
		if (this.processItem) {
			this.processItem (item) }
		if (was === undefined) {									// if item was mutated in-place, 
			if (current === undefined) {
				this.items.push (item)	// add new
			} else {
				this.items[this.items.indexOf (item)] = item } }	// no need to update array (cuz references stay the same)
		this.index[id] = item
		this.itemUpdated (item, was)
		this.notEmpty (true)
		this.triggerChange ()
	},
	updateManyItems: _.throwsError ('NOT IMPLEMENTED'), /*function (items) {
		for (var i = 0, n = items.length, item; i < n; i++) {
			item = items[i]
			this.index[item._id] = item
			if (this.processItem) {
				this.processItem (item)
			}
		}
		this.manyItemsUpdated (items)
		this.notEmpty (true)
		this.triggerChange ()
	},*/
	deleteItem: function (itemOrId) { var id = Collection.coerceToId (itemOrId)
		var item = this.index[id]
		if (item) {
			delete this.index[id]
			this.items.remove (item)
			this.itemDeleted (item)
			this.triggerChange ()
		}
	},
	isClustered: function () {
		return false
	},
	originalSource: $property (function () { // for proxy collections (unwinds chain)
		return this
	})
})



SortedFilteredCollection = $extends (Component, {

	$traits: [Changeable],

	notEmpty:			$barrier (),
	updated:			$trigger (),
	itemUpdated:		$trigger (),
	itemDeleted:		$trigger (),
	manyItemsUpdated:	$trigger (),

	isCollection: $property (true), // for RTTI, as our Collections zoo not deriving from single base class

	destroy: function () {
		/*	Component works its magic, disconnecting active bindings to this.source
		 */ },

	init: function () {
		_.defaults (this, {
			items: [],
			clusters: [],
			clusterIndices: {},
			index: {},
			subset: undefined,
			filter: undefined,
			sort: undefined,
			fields: (this.source && this.source.fields) || {},
			sortOrder: Sort.Ascending })

		if (!this.source) {
			this.source = new Collection (_.pick (this, 'processItem'))
			delete this.processItem
		}

		this.source.updated (this.updateFromSource)
		this.source.manyItemsUpdated (this.updateFilters)
		this.source.itemUpdated (this._updateItem)
		this.source.itemDeleted (this._deleteItem)
		this.source.changed (this._sourceChanged)

		_.delay (this.$ (function () {
			this.updateFromSource () }))

		this.source.notEmpty (this.notEmpty)
	},
	_sourceChanged: function () {
		this.index = this.source.index
		this.postponeChange ()
	},
	_updateItem: function (item, before) {
		if (!this.filter || this.filter (item)) {
			var id = item._id
			var inserted = false
			var insertedAt = this.items.length
			if (this.sort) {
				var sortField = this.sortField
				var sort = this.sort
				var sortOrder = this.sortOrder
				var sortFieldValue = item[sortField]
				for (var i = 0, length = this.items.length; i < length; i++) {
					var otherItem = this.items[i]
					if (otherItem._id == id) {
						this.items.splice (i, 1)
						length--; i--
					} else if (!inserted && (sort (otherItem[sortField], sortFieldValue) * sortOrder) > 0) {
						this.items.splice (i, 0, item)
						inserted = true
						insertedAt = i
					}
				}
			} else {
				for (var i = 0, length = this.items.length; i < length; i++) {
					if (this.items[i]._id == id) {
						this.items[i] = item
						inserted = true
						insertedAt = i
					}
				}
			}
			if (!inserted) {
				this.items.push (item)
			}
			this.itemUpdated (item, before, insertedAt)
		} else {
			this._deleteItem (item)
		}
		this.updateClusters ()	// this is slow, need to split clustering mechanics into separate collection, like CountedFieldValuesCollection,
								// where all updates are incremental
	},
	_deleteItem: function (item) {
		if (!this.filter || this.filter (item)) {
			for (var i = 0, length = this.items.length, id = item._id; i < length; i++) {
				if (this.items[i]._id == id) {
					this.items.splice (i, 1)
					this.itemDeleted (item)
					break
				}
			}
		}
	},
	updateFromSource: function (items) {
		this.index = this.source.index
		this.updateFilters (true)
		this.updated (this.items)
		this.postponeChange ()
	},
	update: function (items) {
		this.source.update (items)
	},
	updateManyItems: function (items) {
		this.source.updateManyItems (items)
	},
	deleteItem: function (id) {
		this.source.deleteItem (id)
	},
	updateItem: function (item) {
		this.source.updateItem (item)
	},
	updateFilters: function (silent) {
		var filter = this.filter, sourceItems = this.source.index, destItems = this.items
		destItems.length = 0
		if (this.subset) {
			var subset = this.subset
			for (var i = 0, n = subset.length; i < n; i++) {
				var sourceItem = sourceItems[subset[i]]
				if (!filter || filter (sourceItem)) {
					destItems.push (sourceItem)
				}
			}
		} else {
			for (var i in sourceItems) {
				var sourceItem = sourceItems[i]
				if (!filter || filter (sourceItem)) {
					destItems.push (sourceItem)
				}
			}
		}
		this.updateSort (silent)
		if (!(silent === true)) {
			this.updated (this.items)
		}
	},
	updateSort: function (silent) {
		if (this.sort) {
			var sort = this.sort
			var sortField = this.sortField
			var sortOrder = this.sortOrder
			this.items.sort (function (a, b) {
				return sort (a[sortField], b[sortField]) * sortOrder
			})
			this.updateClusters ()
			if (!(silent === true)) {
				this.updated (this.items)
				this.postponeChange ()
			}
		}
	},
	clusterIndexForItem: function (itemIndex) {
		return this.clusterIndices[this.clusterOperator (this.items[itemIndex])]
	},
	updateClusters: function () {
		if (this.clusterOperator) {
			var sourceItems = this.items
			var clusters = this.clusters = []
			var clusterIndices = this.clusterIndices = {}
			var lastCluster = undefined
			var operator = this.clusterOperator
			for (var i = 0, length = sourceItems.length; i < length; i++) {
				var item = sourceItems[i]
				var clusterId = operator (item)
				if (!lastCluster || (clusterId != lastCluster._id)) {
					if (lastCluster) {
						clusters.push (lastCluster)
					}
					lastCluster = { _id: clusterId, items: [item] }
				} else {
					lastCluster.items.push (item)
				}
			}
			if (lastCluster) {
				clusters.push (lastCluster)
			}
			this.updateClustersSort ()
		}
	},
	updateClustersSort: function () {
		if (this.sortClusters) {
			var clusters = this.clusters
			var sort = this.sortClusters
			var order = this.sortClustersOrder

			clusters.sort (function (a, b) { return sort (a, b) * order })

			/* rebuild items array from clusters, this is needed to properly display clustered data even when its not supported
			 * ex. in list-view mode of TileView (one-dimensional single column mode) */

			var clusterIndices = this.clusterIndices = {}
			var allItems = this.items

			allItems.length = 0

			for (var i = 0, ni = clusters.length; i < ni; i++) {
				var cluster = clusters[i]
				var items = cluster.items
				clusterIndices[cluster._id] = i
				for (var j = 0, nj = items.length; j < nj; j++) {
					allItems.push (items[j])
				}
			}
		}
	},
	sortClustersBy: function (sort, sortOrder, silent) {
		this.sortClusters = sort
		this.sortClustersOrder = sortOrder
		if (!silent) {
			this.updateClustersSort ()
			this.postponeChange ()
		}
	},
	filterBy: function (filter) {
		this.filter = filter
		this.updateFilters ()
		this.postponeChange ()
	},
	sortBy: function (field, sort, sortOrder, silent) {
		this.sortField = field
		this.sort = sort
		if (!(sortOrder === undefined)) {
			this.sortOrder = sortOrder
		}
		if (!silent) {
			this.updateSort ()
			this.postponeChange ()
		}
	},
	isClustered: function () {
		return this.clusterOperator != undefined
	},
	clusterBy: function (operator, silent) {
		this.clusterOperator = operator
		if (!silent) {
			this.updateClusters ()
			this.postponeChange ()
		}
	},
	removeCluster: function (silent) {
		this.clusterOperator = undefined
		this.sortClusters = undefined
		if (!silent) {
			this.postponeChange ()
		}
	},
	removeSort: function (silent) {
		this.sort = undefined
		if (!silent) {
			this.updateFilters ()
			this.postponeChange ()
		}
	},
	limitToSubset: function (ids, silent) {
		this.subset = ids
		if (!silent) {
			this.updateFilters ()
			this.postponeChange ()
		}
	},
	originalSource: $property (function () {
		return this.source ? this.source.originalSource : this
	})
})

// A source for combining multiple sources into one
// Behaves as a default source, etc...
// Usage:
//	var multiset = 
//		new MultipleSourcesCollection ({
//			sources: {
//				'users': new SortedFilteredCollection ({
//					source: DataManager.users,
//				}),
//				'operations': DataManager.operations,
//			}
//		})

MultipleSourcesCollection = $extends (Collection, {
	init: function () {

		_.defaults (this, {
			sources: [],
		})

		Collection.prototype.init.call (this)

		_.each (this.sources, this.addSource, this)
	},

	addSource: function (source, sourceName) {
		this.sources[sourceName] = source
		source.updated (_.partial (this.sourceUpdated, source, sourceName))
		source.itemUpdated (_.partial (this.sourceItemUpdated, source, sourceName))
		source.itemDeleted (_.partial (this.sourceItemDeleted, source, sourceName))
		this.sourceUpdated (source, sourceName)
	},

	sourceNameId: function (sourceName, id) {
		return sourceName + ':' + id
	},

	sourceUpdated: function (source, sourceName) {
		console.log ('MultipleSourcesCollection sourceUpdated')
		this.update (_.flatten (_.map (this.sources, this.$ (function (source, sourceName) {
			return _.map (source.items || [], this.$ (function (item) {
				return {
					_id: this.sourceNameId (sourceName, item._id),
					name: item.name,
					sourceItem: item,
					source: source,
					sourceName: sourceName
				}
			}))
		}))))
	},

	sourceItemUpdated: function (source, sourceName, nowItem, wasItem) {
		console.log ('MultipleSourcesCollection sourceItemUpdated', nowItem, wasItem)
		this.mapItem (this.sourceNameId (sourceName, wasItem._id), function (item) {
			return item && _.extend (item, { sourceItem: nowItem, name: nowItem.name })
		})
	},

	sourceItemDeleted: function (source, sourceName, wasItem) {
		console.log ('MultipleSourcesCollection sourceItemDeleted', wasItem)
		this.deleteItem (this.sourceNameId (sourceName, wasItem._id))
	},

	originalSource: $property (function () {
		return _.map (this.sources, function (source) {
			return source.originalSource
		})
	})
})

// Unique collection

UniqueCollection = $extends (Collection, {

	init: function () {

		_.defaults (this, {
			uniqueField:	'name',			// default field that should be unique
			filter:			undefined,		// for filtering out specific items
			group:			undefined,		// for specific uniqueness grouping
			source: 		[],
		})

		Collection.prototype.init.call (this)

		this.source.updated (this.$ (this.sourceUpdated))
		this.source.itemUpdated (this.$ (this.sourceItemUpdated))
		this.source.itemDeleted (this.$ (this.sourceItemDeleted))
		this.sourceUpdated ()
	},

	sourceUpdated: function () {

		console.log ('UniqueCollection sourceUpdated')

		this.update (_.map (_.groupBy (
			_.filter (this.source.items || [],
				this.$ (this.filter || function (item) { return item[this.uniqueField] })),
			this.group || this.uniqueField), _.first))
	},

	sourceItemUpdated: function (nowItem, wasItem) {
		console.log ('UniqueCollection sourceItemUpdated', nowItem, wasItem)
		this.mapItem (nowItem._id, function (item) { return item })
		// this.sourceUpdated ()
	},

	sourceItemDeleted: function (wasItem) {
		console.log ('UniqueCollection sourceItemDeleted', wasItem)
		this.deleteItem (wasItem._id)
		// this.sourceUpdated ()
	},

	originalSource: $property (function () {
		return this.source ? this.source.originalSource : this
	})
})