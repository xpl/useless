module.exports = TestsItself = $trait ({

    $depends: [require ('./args'),
               require ('./exceptions')],

    supressAllTests:          false,
    supressCodeBaseTests:     false,
    supressAppComponentTests: false,

    /*  Set to `false` this in your app to get $traits tests run early (before init, not after).
     */
    deferAppComponentTests: true,

    /*  Example of a single test routine
     */
    test: function () { },

    /*  Example of test suite
     */
    tests: {
        syncTest: function () {},
        asyncTest: function (done) { done () } },

    /*  Tests codebase
     */
    beforeInit: function (then) {

        if ((this.testsAlreadyExecutedAtMasterProcess = (this.args.spawnedBySupervisor && !this.args.respawnedBecauseCodeChange)) ||
             this.supressAllTests || this.supressCodeBaseTests) { then () }

        else {  log.info ('Running code base tests')
                Testosterone.run ({
                    verbose: false,
                    silent:  true }, this.$ (function (okay) {
                                                if (okay) {
                                                    if (this.deferAppComponentTests) {                            then () }
                                                    else                             { this.runAppComponentTests (then) } } }))} },

    afterInit: function (then) {
        if (!this.testsAlreadyExecutedAtMasterProcess && !this.supressAllTests && this.deferAppComponentTests) {
             this.runAppComponentTests (then) }
        else {
             then () } },

    /*  Tests $traits (app components)
     */
    runAppComponentTests: function (then) {

            log.info ('Running app components tests')

            /*  Adds custom assertions to help test App framework
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

            /*  Init test database and run tests within that context
             */
            this.withTestDb (this.$ (function (putBackProductionDb) {

                _.cps.map (this.constructor.$traits || [], function (Trait, return_) {

                    Trait.$meta (function (meta) {
                        var tests = (Trait.prototype.test || 
                                     Trait.prototype.tests)
                        return_ (tests && { name: (meta.name === 'exports' ? meta.file : meta.name), tests: tests }) }) },

                    this.$ (function (suites) {
                        Testosterone.run ({                             
                            context: this,
                            codebase: false,
                            verbose: false,
                            silent: false,
                            suites: _.nonempty (suites) }, function (okay) { putBackProductionDb (); then () }) })) })) },


    withTestDb: function (what) {

        if (!this.dbName) {
            log.info ('Skipping DB tests')
            what (_.identity) }
            
        else {
            log.warn ('Preparing Test DB')

            require ('./base/db').init (
                            this.dbName + '_test',
                            this.entitySchema,
                            this.$ (function (testDb) { var productionDb = this.db;
                                                                           this.db = testDb
                this.dropDb (this.newContext ({
                    success: this.$ (function () { 
                       what (this.$ (function () { this.db = productionDb })) }) })) })) } },
    
})
