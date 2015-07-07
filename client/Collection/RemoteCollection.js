/*	A wrap-up over Collection to provide remoting interface for server-side collections
	======================================================================== */

RemoteCollection = $extends (Collection, {

	/*	for querying items by id  */

	item: function (id, then) {
		this.restoredFromRemoteOrigin (function () {
			then (this.index[id]) }) },


	/*	Query API (for arbitrary querying the DB driver directly) */

	query: function (query, then) {
		this.get ('query/' + encodeURIComponent (_.json (query)), this.$ (function (items) {
			if (this.processItem) {
				_.each (items, this.processItem, this) }
			then (items) })) },


	/*	Examples:	addItem ({ foo: 1 }, { supressHistoryWrite: true }, then)
					addItem ({ foo: 1 }, then)
					addItem ({ foo: 1 })										*/

	addItem: function (item, arg1, arg2) {
		this.post ('', item, arg1, arg2) },

	upsertItem: function (item, arg1, arg2) {
		if ('_id' in item) {
			this.modifyItem (item._id, _.omit (item, '_id'), arg1, arg2) }
		else {
			this.addItem (item, arg1, arg2) } },

	modifyItem: function (which, changes, arg1, arg2) { var id = Collection.coerceToId (which)
		$assert (_.isNonemptyString (id))
		this.post (id, changes, arg1, arg2) },

	deleteItem: function (which, arg1, arg2) { var id = Collection.coerceToId (which)
		$assert (_.isNonemptyString (id))
		this.post (id + '/delete', {}, arg1, arg2) },

	/*	Nested array operators

		Examples:	addToSet (listId, 'users', userId, then)
					addToSet (listId, 'users', [userId1, userId2], then)
					
					pull (listId, 'users', userId, then)
					pull (listId, 'users', [userId1, userId2], then)	*/

	addToSet: function (which, field, values, arg1, arg2) { var id = Collection.coerceToId (which)
		$assert (_.isNonemptyString (id))
		this.post (id, { $addToSet: _.object ([[field, { $each: _.coerceToArray (values) }]]) }, arg1, arg2) },

	pull: function (which, field, values, arg1, arg2) { var id = Collection.coerceToId (which)
		$assert (_.isNonemptyString (id))
		this.post (id, { $pullAll: _.object ([[field, _.coerceToArray (values)]]) }, arg1, arg2) },

	pullNotOnlyAll: function (which, field, value, arg1, arg2) {

		var id = Collection.coerceToId (which)
		$assert (_.isNonemptyString (id))
		this.post (id, { $pull: _.object ( [[ field, value ]] ) }, arg1, arg2)
	},

	/*	Ex.:	collection.html (userId)
				collection.html (user)				→ <span data-collection="users" data-id="id">Василий Петрович</span>
				collection.html (userId, 'isAdmin')	→ <span data=collection="users" data-id="id" data-field="isAdmin">да</span> */

	html: function (which, field, shortie) {	var item = this.coerceToItem (which), id = Collection.coerceToId (which)
												if (field) {
													return '<span data-id="' + id + '" data-collection="' + this.name + '" data-field="' + field +'">' +
																(shortie ? this.fields[field].htmlShort : this.fields[field].html) (item[field]) + '</span>' }
												else {
													return '<span data-id="' + id + '" data-collection="' + this.name + '">' +
																_.escape ((item && this.text (item)) || id) + '</span>' } },


	htmlShort: function (which, field) {
					return this.html (which, field, true) },


	/*	Ex.:	collection.text (user)				→ Василий Петрович
				collection.text (user,   'isAdmin') → да	*/

	text: function (which, field) {	var item = this.coerceToItem (which), id = Collection.coerceToId (which)
									if (arguments.length > 1) {
										return this.fields[field].text (item[field]) }
									else {
										return (item && this.schema.text (item)) || id } },


	/*	Use to execute code that depends on loaded collection contents */

	restoredFromRemoteOrigin: $barrier (),


	/*	Private APIs
	 */

	$private: {

		get: function (url, then) {
			API.get (this.name + '/' + url, {
				failure: UI.error,
				success: then || _.noop }) },

		post: function (url, changes, arg1, arg2) {
			var options	= (_.isFunction (arg1) && arg2) || arg1
			var then	= (_.isFunction (arg1) && arg1) || arg2

			API.post (this.name + '/' + url, {
				what: _.extend ({ changes: changes, nonce: Live.nonce }, options),
				failure: UI.error,
				success: function (updates) {
					Live.commit (updates)
					if (then) {
						then (updates) } } }) },

		init: function () {
			Collection.prototype.init.call (this)
			this.initDataBind ()
			this.initSchemaExtensions ()
			this.restoreFromRemoteOrigin () },

		initSchemaExtensions: function () {
			if (this.fields) {
				this.fields = _.mapObject (this.fields, function (field) {
					return _.extend ({}, field, {
						values:		field.values && Collection.coerce (field.values),	// field.values as Collection
						text:		RemoteCollection.fieldStringifier (field),		// field.html/text with databindings
						html:		RemoteCollection.fieldStringifier (field, { html:      true }),
						htmlShort:	RemoteCollection.fieldStringifier (field, { htmlShort: true }) }) }) } },

		fieldStringifier: $static (function (field, cfg_) {
			var cfg = cfg_ || {}
			var defaultMethod = cfg.htmlShort ? field.htmlShort : (cfg.html ? field.html : field.text)

			if (field.trait === 'id') { //	handle 'id' trait
				var methodForCollection = function (name) {
					var collection = DataManager[name]
					var method = cfg.htmlShort ? collection.htmlShort : (cfg.html ? collection.html : collection.text)

					if (field.type === 'string') {
						return method }
					else if (field.type === 'array') {
						return function (val) { var array = _.coerceToArray (val)
							return (!array || array.length === 0) ? 'пусто' :
								((array.length > 10) ? _.quote (array.length, '[]') : _.map (array, method.arity1).join (', ')) } } }

				if (typeof field.collection === 'string') {
					return methodForCollection (field.collection) }
				else {
					/*	TODO: need to supply field stringifier not only with field value but with whole item
						value to make function-type .collection work */ } }
			
			return defaultMethod }), //	fall back to default stringifier

		initDataBind: function () {
			this.updated (this.$ (function () {
				this.dataBindEval ($('[data-collection=' + this.name + ']')) }))

			this.itemUpdated (this.$ (function (item) {
				this.dataBindEval ($('[data-collection=' + this.name + '][data-id=' + item._id + ']'), item) })) },

		dataBindEval: function (jquery, item_, field_, predicate_) {
			_.each (jquery, function (dom) {	var	el		= $(dom)
												var item	= item_  || this.index[el.attr ('data-id')]
												var field	= field_ || el.attr ('data-field')
				this._dataBindEval (el,
					(field && item) ? item[field] : item,
					field ? this.fields[field] : undefined,
					predicate_ || dom._dataBindPredicate) }, this) },

		_dataBindEval: function (el, value, field, predicate) {
			if (_.isStrictlyObject (predicate)) {
				_.each (predicate, function (jqueryMethod, args_) { var args = _.coerceToArray (args_)
					el[jqueryMethod].apply (el, _.initial (args).concat ([
						this._eval (value, field, _.last (args))])) }, this) }
			else {
				el.html (this._eval (value, field, predicate || '$html') + '') } },

		_eval: function (value, field, predicate) {
			if (typeof predicate === 'function') {
				return predicate (value) }
			else if (typeof predicate === 'string' && predicate[0] === '$') { var method = predicate.slice (1)
				return (method && this[method](value, field)) || value }
			else {
				return value } },

		restoreFromRemoteOrigin: function () {
			if (this.supressRemoting !== true) {
				API.get (this.name + '/', {
					failure: UI.error,
					success: this.$ (function (items) {
						log.green ('RemoteCollection: restored', this.name, 'from remote origin')
						Collection.prototype.update.call (this, items)
						this.restoredFromRemoteOrigin (true) }) }) } } } })


/*	jQuery extensions for declarative data-binding
	======================================================================== */

$.fn.extend ({

	/*	1.	bindTo (collection, item, [field,] [predicate])

				means:	DOM ← predicate ← item
						DOM ← predicate ← item.field	(if field specified)
								
				where predicate:

					1. constant
					3. '$html'							- value as HTML
					4. '$text'							- value as text
					5. '$'								- value itself
					6. function (value) { ... }	
					7. { 'jqueryMethod': jqueryMethodValue, ... }

					where jqueryMethodValue:

						1. predicate						- calls el.jqueryMethod (predicate ← item)
						2. [arg1, arg2, ..., predicate]		- calls el.jqueryMethod (arg1, arg2, ..., predicate ← item)

	 */
	bindTo: function (collectionOrContext, entityOrId, arg3, arg4) { // context is for back compat, deprecated API
		return this._bindTo (collectionOrContext, entityOrId,
			_.isStrictlyObject (arg3) ? undefined : arg3,
			_.isStrictlyObject (arg3) ? arg3 : arg4) },

	_bindTo: function (collection, item, field, pred) { DataManager[collection].dataBindEval (this, item, field, pred);
		if (this[0]) {
			this[0]._dataBindPredicate = pred }
		return this.attr ({
			'data-collection': collection,
			'data-id': Collection.coerceToId (item),
			'data-field': field }) },

	className: function (value) { // main feature: leaves classes set by other class-modifying methods intact
		this.each (function (i, dom) {
			dom.className = (dom._className ? dom.className.replace (dom._className, '') : '') + ' ' + value
			dom._className = value }) }

})