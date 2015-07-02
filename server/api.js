module.exports = $trait ({

	tests: {


		/*	1. This is new humanized URL schema syntax.
			2. We translate it to old one (thus not changing underlying impl).
			3. But the old one sometimes more convenient.. so both ways are allowed, intermixed freely
		 */
		canonicalize: function () {

			var input = {
				'echo':				{ post: _.identity },
				'api': {
					'source/:file': _.identity, 	// expands
					'git-commits':	_.identity },

				'lists-way-works-too': [
					['foo', { get: _.identity }],
					['bar', {						// allows inclusion of new syntax
						qux: _.identity,
						zap: _.identity }]] }

			var output = [
				['echo', { post: _.identity }],
				['api',  [
					['source', 		[[':file', { get: _.identity }]]],
					['git-commits',            { get: _.identity }] ]],

				['lists-way-works-too', [
					['foo', { get: _.identity }],
					['bar', [
						['qux', { get: _.identity }],
						['zap', { get: _.identity }]]]]],] },


		/*	This algorithm allows incremental updates to API schema
		 */
		collapse: function () {

			$assert (APISchema.collapse ([['foo', { get: _.identity } ]]),
									 	 [['foo', { get: _.identity } ]])

			var input = [
				['foo', { get: _.identity }],
				['api', [
					['dropdb', { get: _.identity }]]],

				['bar', { get: _.identity }],
				['foo', { post: _.noop }],
				['foo', { get: _.noop }],
				['api',  [
					['source', 		[['', 		{ get: _.identity }]]],
					['source', 		[[':file',  { get: _.identity }]]],
					['git-commits', { get: _.identity }] ]]]

			var result = [
				['bar', { get: _.identity }],
				['foo', { get: _.noop, post: _.noop }], // merged handlers
				['api',  [
					['dropdb', { get: _.identity }],
					['source', 		[
						['',		{ get: _.identity }],
						[':file',   { get: _.identity }]]],
					['git-commits', { get: _.identity }] ]]]

			$assert (APISchema.collapse (input), result) } },


	/*	Public API
	 */

	beforeInit: function (then) {
		this.apiSchema = APISchema.collapse (
			_.flat (_.filterMap.call (this, (this.constructor.$traits || []).reversed, function (Trait) {
				if (Trait.prototype.api) {
					return APISchema.canonicalize (Trait.prototype.api.call (this)) } })))
		then () },

	afterInit: function (then) {
		//APISchema.prettyPrint (this.apiSchema)
		if (_.isFunction (this.api)) {
			this.defineAPIs (this.api ()) }
		then () },

	defineAPIs: function (schemaPart) {
		return (this.apiSchema = APISchema.collapse (this.apiSchema.concat (this.normalizeAPIs (schemaPart)))) },

	normalizeAPIs: function (routes) {
		return APISchema.collapse (APISchema.canonicalize (routes)) } })


/*	Implementation */

APISchema = {

	prettyPrint: function (routes, depth) { depth = depth || 0
		_.each (routes, function (route) {
			if (APISchema.isHandler (route[1])) {
				log.green (log.indent (depth), route[0] || '(empty)', 'is handler:',
					_.nonempty ([route[1].get && 'GET', route[1].post && 'POST']).join (' ')) }
			else {
				log.orange (log.indent (depth), route[0] || '(empty)', ':')
				APISchema.prettyPrint (route[1], depth + 1)
				log.write ('') } }) },

	isHandler: function (obj) {
		return	obj && ((typeof obj.get === 'function') || (typeof obj.post === 'function')) },

	isCanonicalRoute: function (obj) {
		return _.isArray (obj) && (typeof obj[0] === 'string') },

	map: function (obj, fn) {
		if (APISchema.isCanonicalRoute (obj)) {
			return [fn (obj[1], obj[0])] }
		return _.map (obj, _.isArray (obj) ?
			function (route) { return fn (route[1], route[0]) } : fn) },

	canonicalize: function (obj) {
		if (!obj) {
			return [] }
		else if (typeof obj === 'function') {
			return { get: obj } }
		else if (APISchema.isHandler (obj)) {
			return obj }
		return APISchema.map (obj, function (value, key) {
			var subpaths = key.split ('/')
			if (subpaths.length > 1) {
				return _.reduceRight (subpaths, function (memo, path) {
					return [path, _.isArray (memo) ? [memo] : memo] }, APISchema.canonicalize (value)) }
			return [key, APISchema.canonicalize (value)] }, this) },

	collapse: function (routes) {

		var handlers = _.filter (routes, APISchema.isHandler)
		if (handlers.length) {
			return _.extend.apply (null, [{}].concat (handlers)) }

		var groups = _.groupBy (routes, function (route) {
			return route[0] })

		return _.reversed (_.filterMap (routes.reversed, function (route) {
			if (!_.isArray (route)) {
				return route }
			var name = route[0]
			var group = groups[name]
			if (group) {
				delete groups[name]
				var merged = _.flatten (_.map (group, function (route) { return route[1] }), true)
				return [name, APISchema.collapse (merged)] } })) },

	match: function (context, routes, then, depth, virtualTrailSlashCase) {
		var trace = function (msg) { /*log.blue (_.times (depth, _.constant (' → ')).join (''), msg)*/ }
		var depth = depth || 1
		
		if ((virtualTrailSlashCase == undefined) && context.path.length <= depth) {
			return false }

		else {
			var element = virtualTrailSlashCase ? '' : context.path[depth]

			for (var i = 0, n = routes.length; i < n; i++) {
				var route		= routes[i]
				var match		= route[0]
				var handler		= route[1]
				var subroutes	= _.isArray (handler) ? handler : undefined

				var isJsonBinding	= (match[0] === '@')
				var isBinding		= (match[0] === ':') || isJsonBinding
				
				trace (match + ' ← ' + element)

				if (isBinding || element == match) {
					if (isBinding) {
						var key				= match.slice (1)
						var value			= decodeURIComponent (subroutes ? element : context.path.slice (depth).join ('/'))
						context.env[key]	= isJsonBinding ? _.json (value) : value

						trace (match + ' = ' + context.env[key]) }
					else {
						trace ('matched!') }

					if (subroutes) {
						trace ('going deeper') // here's pic of "we need to go deeper" DiCaprio from Inception
						
						if (depth < context.path.length - 1) {
							return APISchema.match (context, subroutes, then, depth + 1) }

						else if (!virtualTrailSlashCase) { // makes "/foo" respond to "/foo/" handler
							
							trace ('trying to find trail-slash handler')
							return APISchema.match (context, subroutes, then, depth + 1, true) }

						else {
							trace ('nowhere to go deeper') } }

					else if (virtualTrailSlashCase || (depth == context.path.length - 1) || isBinding) {
						if (context.request.method == 'GET' && handler.get) {
							then (context, handler.get)
							return true }

						else if (context.request.method == 'POST' && handler.post) {
							context.request.pause ()
							then (context, handler.post)
							return true }

						else {
							trace ('no appropriate handler found for ' + context.request.method) } }

					else {
						trace ('maxed at depth ' + (depth + 1) + ' but path has ' + context.path.length + ' subroutes') } } }

			trace ('match not found')
			return false } } }




