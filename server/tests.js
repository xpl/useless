"use strict";

const _  = require ('underscore')

require ('./base/assertion_syntax.js')

/*  The protocol:

        1. Runs code base tests first (everything that Testosterone.js collected)
        2. Runs app-specific tests, initializing test environment and passing `this` context to them.

    It also accounts 'supervisor' trait mechanics, so that it does not run tests if they're already
    executed at master process (and code didn't change since then). This is needed for faster start-up.
 */
const ServerTests = module.exports = $trait ({

    $depends: [require ('./args'),
               require ('./exceptions')],

    $defaults: {

        argKeys: {
            noTests: 1,
            testsFailed: 1 },

        supressCodeBaseTests:     false,
        supressAppComponentTests: false,

        testsConfig: {}
    },


    /*  Set to `false` this in your app to get $traits tests run early (before init, not after).
     */
    deferAppComponentTests: true,


    /*  Custom assertions example
     */
    assert101:           $assertion (function (x) { $assert (x, 101) }),
    assert101AfterDelay: $assertion (function (x) { return __.delay (0).assert (101) }),


    /*  A single test (example).
     */
    test: function () {
        $assert (ServerTests.isTraitOf (this)) // test routines are supplied with 'this'
        $assert101 (101) },


    /*  A test suite (example).
     */
    tests: {

        'sync test': function () { $assert101 (101) },
        'async test with callback': function (done) { done () },
        'async test with Promise': function () { return new Promise (function (resolve) { resolve () }) } },


    /*  Sometimes it is more convenient to define tests along with methods.
        This is good for documenting purposes (tests-as-documentation).
     */
    exampleOfMethodWithTest: $withTest (function () {
                                $assert (this.exampleOfMethodWithTest (123), 124) },
        function (x) {
            return x + 1 }),


    /*  Overrideable
     */
    //withTestEnvironment: function (run) {
    //                               return run (task =>
    //                                           task.then (() => { /* release environment here */ })) },

    //withTestRoutineEnvironment: function (test) { },


    /*  Impl
     */
    beforeInit () {
        this.testsFailed = this.args.testsFailed ? true : false

        var skip = (this.testsAlreadyExecutedAtMasterProcess = (this.args.spawnedBySupervisor && !this.args.respawnedBecauseCodeChange)) ||
                    this.args.noTests ||
                    this.supressCodeBaseTests

        /*  Skip tests if...
         */
        if (!skip) {
            log.ii ('Running code base tests')
            return Testosterone.run ({ verbose: false, silent:  true })
                               .then (okay => { this.testsFailed = this.testsFailed || !okay })} },

    afterInit () {

        var skip =  this.args.noTests ||
                    this.supressAppComponentTests ||
                   (this.supervisorState === 'supervisor')

        if (!skip) {

            log.i ('Running app components tests')

            /*  Adds custom assertions to help test application traits
             */
            Testosterone.defineAssertions (this.constructor.$membersByTag.assertion || {})

            const suites = _.map (this.constructor.$traits || [], 

                /*  Extract test suite from $trait
                    Gather tests from 'test', 'tests' and $withTest-tagged methods.
                 */
                Trait => ({
                    name: Trait.$meta.name,
                    proto: Trait,
                    tests: _.nonempty (_.extended (Trait.prototype.tests || {},
                                                   Trait.prototype.test ? { '': Trait.prototype.test } : {},

                                       _.map2 (Trait.$membersByTag.withTest, $withTest.read)))
                    })
            )

            return Testosterone.run ({    

                ...this.testsConfig,

                 context: this,
                codebase: false,
                 verbose: false,
                  silent: false,
                  suites: _.nonempty (suites) }).then (okay => {
                                                        this.testsFailed = this.testsFailed || !okay })
        }
    },    
})



