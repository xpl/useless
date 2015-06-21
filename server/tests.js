module.exports = $trait ({

	/*	Example of a single test routine
	 */
	test: function () { },

	/*	Example of test suite
	 */
	tests: {
		syncTest: function () {},
		asyncTest: function (done) { done () } },

	/*	Tests codebase
	 */
	beforeInit: function (then) { 							log.info ('Running code base tests')

		Testosterone.run ({
			verbose: false,
			silent:  false }, function (okay) {
				if (okay) { then () } }) },

	/*	Tests $traits (app components)
	 */
	afterInit: function (then) {

		/*	Adds custom assertions to help test App framework
		 */
		Testosterone.defineAssertions ({

			assertFoundInDatabase: $async (function (kind, query, then) {
											this.db[kind].find (query).toArray (this.$ (function (e, items) {
												$assert (e, null)
												$assert (items.length > 0)
												then (items.length === 1 ? items[0] : items) })) }),

			assertRequest: $async (function (url, ctx, then) { this.serveRequest (_.extend ({}, ctx, { url: url,
					
				success: function (result) { then (this, result) },
				failure: function (result) { log.error (result); $fail; then () } })) }) })

		/*	Init test database and run tests within that context
		 */
		this.withTestDb (this.$ (function (putBackProductionDb) {	log.info ('Running app components tests')
			Testosterone.run ({								
				context: this,
				codebase: false,
				verbose: false,
				silent: false,
				suites: _.filterMap (this.constructor.$traits, function (Trait) {
					if (Trait.prototype.test) {
						return { name: Trait.$sourceFile, tests: { test: Trait.prototype.test } } }
					else if (Trait.prototype.tests) {
						return { name: Trait.$sourceFile, tests: Trait.prototype.tests } }
					else {
						return undefined } }) }, function (okay) {
													putBackProductionDb (); then () }) })) },


	withTestDb: function (what) {							log.warn ('Preparing Test DB')
		require ('../db').init (this.dbName + '_test',
						 this.$ (function (testDb) { var productionDb = this.db;
						 							  					this.db = testDb
			this.dropDb (this.newContext ({
				minimal: true,
				success: this.$ (function () { 
				   what (this.$ (function () { this.db = productionDb })) }) })) })) },
	
})
