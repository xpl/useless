/*  For marking custom assertions
 */
_.defineTagKeyword ('assertion')

/*  The protocol:

        1. Runs code base tests first (everything that Testosterone.js collected)
        2. Runs app-specific tests, initializing test environment and passing `this` context to them.

    It also accounts 'supervisor' trait mechanics, so that it does not run tests if they're already
    executed at master process (and code didn't change since then). This is needed for faster start-up.
 */
module.exports = $trait ({

    $depends: [require ('./args'),
               require ('./exceptions')],

    $defaults: {

        argKeys: {
            noTests: 1 },

        supressCodeBaseTests:     false,
        supressAppComponentTests: false },


    /*  Set to `false` this in your app to get $traits tests run early (before init, not after).
     */
    deferAppComponentTests: true,


    /*  That's how you define tests:
     */
    test: function () { },                          // single test
    tests: {                                        // a suite
        syncTest: function () {},
        asyncTest: function (done) { done () } },


    /*  You can add new assertions by tagging members with $assertion.
     */
    assertRequest: $async ($assertion (function (url, ctx, then) {
                                            this.serveRequest (_.extend ({}, ctx, { url: url,
                                                success: result => { then (this, result) },
                                                failure: result => { log.error (result); $fail; then () } })) })),

    /*  Overrideable
     */
    withTestEnvironment: function (what) {
                                   what (() => { /* release environment here */ }) },


    /*  Impl
     */
    beforeInit: function (then) {

        /*  Skip tests if...
         */
        if ((this.testsAlreadyExecutedAtMasterProcess = (this.args.spawnedBySupervisor && !this.args.respawnedBecauseCodeChange)) ||
             this.args.noTests || this.supressCodeBaseTests) { then () }

        else {  log.ii ('Running code base tests')
                Testosterone.run ({
                    verbose: false,
                    silent:  true }, okay => {
                                        if (okay) {
                                            if (this.deferAppComponentTests) {                            then () }
                                                                       else  { this.runAppComponentTests (then) } } })} },

    afterInit: function (then) {
        if ( this.args.noTests ||
            !this.deferAppComponentTests) {                            then () }
                                     else { this.runAppComponentTests (then) } },

    runAppComponentTests: function (then) {

            if (this.supervisorState === 'supervisor') { // don't run at master process
                then () }

            else {
                log.i ('Running app components tests')

                /*  Adds custom assertions to help test application traits
                 */
                Testosterone.defineAssertions (this.constructor.$membersByTag.$assertion || {})

                /*  Init test environment and run tests within that context.
                 */
                this.withTestEnvironment (releaseEnvironment => {

                    _.cps.map (this.constructor.$traits || [], (Trait, return_) => {

                        Trait.$meta (meta => {
                            var tests = (Trait.prototype.test || 
                                         Trait.prototype.tests)
                            return_ (tests && { name: (meta.name === 'exports' ? meta.file : meta.name), tests: tests }) }) },

                        suites => {
                            Testosterone.run ({                             
                                 context: this,
                                codebase: false,
                                 verbose: false,
                                  silent: false,
                                  suites: _.nonempty (suites) }, okay => { releaseEnvironment (); then () }) }) }) } },    
})
