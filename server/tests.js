require ('./base/assertion_syntax.js')

/*  The protocol:

        1. Runs code base tests first (everything that Testosterone.js collected)
        2. Runs app-specific tests, initializing test environment and passing `this` context to them.

    It also accounts 'supervisor' trait mechanics, so that it does not run tests if they're already
    executed at master process (and code didn't change since then). This is needed for faster start-up.
 */
ServerTests = module.exports = $trait ({

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


    /*  Example of a custom assertion
     */
    assert101: $assertion (function (x) { $assert (x, 101) }),


    /*  Example of a custom asynchronous assertion.
     */
    assert101AfterDelay: $assertion ($async (function (x, then) {
                                                _.delay (function () {
                                                    $assert101 (x); then ('you may pass arguments to callback') }) })),


    /*  A single test (example).
     */
    test: function () {
        $assert (ServerTests.isTraitOf (this)) // test routines are supplied with 'this'
        $assert101 (101) },


    /*  A test suite (example).
     */
    tests: {

        /*  Simple synchronous test
         */
        'sync test': function () { $assert101 (101) },

        /*  An asynchronous test with explicit termination callback.
            Runs under timeout, so if you forget to call 'done', it won't hang.
         */
        'explicit async test': function (done) { done () },

        /*  Fun part with $async-marked assertions is that Testosterone supervises their
            execution, allowing to omit that tedious 'done' calling burden. The test
            will automatically finish after the last asynchronous assertion completes.
            Each asynchronous assertion creates its own execution context, waiting
            until child tasks complete.
         */
        'implicit async test': function () {

            $assert101AfterDelay (101)
            $assert101AfterDelay (101, function (arg) { $assert (arg, 'you may pass arguments to callback')
                $assert101AfterDelay (101)
                $assert101AfterDelay (101) }) } },


    /*  Sometimes it is more convenient to define tests along with methods.
        This is good for documenting purposes (tests-as-documentation).
     */
    exampleOfMethodWithTest: $withTest (function () {
                                $assert (this.exampleOfMethodWithTest (123), 124) },
        function (x) {
            return x + 1 }),


    /*  Overrideable
     */
    withTestEnvironment: function (what) {
                                   what (() => { /* release environment here */ }) },

    withTestRoutineEnvironment: function (test, what) {
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
                                            if (this.deferAppComponentTests ||
                                                this.supressAppComponentTests) {                            then () }
                                                                         else  { this.runAppComponentTests (then) } } })} },

    afterInit: function (then) {
        if ( this.args.noTests ||
             this.supressAppComponentTests ||
            !this.deferAppComponentTests) {                            then () }
                                     else { this.runAppComponentTests (then) } },

    runAppComponentTests: function (doneWithTests) {

            if ((this.supervisorState === 'supervisor') &&
                (this.deferAppComponentTests !== false)) { // don't run at master process
                doneWithTests () }

            else {
                log.i ('Running app components tests')

                /*  Adds custom assertions to help test application traits
                 */
                Testosterone.defineAssertions (this.constructor.$membersByTag.assertion || {})

                /*  Init test environment and run tests within that context.
                 */
                this.withTestEnvironment (releaseEnvironment => {

                    _.cps.map (this.constructor.$traits || [], 

                        /*  Extract test suite from $trait
                         */
                        (Trait, return_) => {
                            Trait.$meta (meta => {

                                /*  Gather tests from 'test', 'tests' and $withTest-tagged methods.
                                 */
                                return_ ({ name: (meta.name === 'exports' ? meta.file : meta.name),
                                           proto: Trait,
                                           tests: _.nonempty (_.extended (Trait.prototype.tests || {},
                                                                          Trait.prototype.test ? { '': Trait.prototype.test } : {},
                                                                  _.map2 (Trait.$membersByTag.withTest, _.property ('$withTest')))) }) }) },

                        /*  Run collected tests
                         */
                        suites => {
                            Testosterone.run ({                             
                                 context: this,
                                codebase: false,
                                 verbose: false,
                                  silent: false,
                                  suites: _.nonempty (suites),
                             testStarted: this.withTestRoutineEnvironment }, okay => { releaseEnvironment (); doneWithTests () }) }) }) } },    
})



