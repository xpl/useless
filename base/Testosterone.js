/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Testosterone is a cross-platform unit test shell. Features:

    - asynchronous tests
    - asynchronous assertions
    - log handling (log.xxx calls are scheduled to current test log)
    - exception handling (uncaught exceptions are nicely handled)

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*  A contract for test routines that says that test should fail and it's the behavior expected
 */
_.defineTagKeyword ('shouldFail')


/*  A contract for custom assertions, says that assertion is asynchronous. Such assertion
    should call Testosterone.
 */
_.defineTagKeyword ('async')


/*  This is test suite for tests framework itself.

    As you can see, tests are defined as _.tests.xxx. So, if you have module called 'foo',
    place tests for that module in _.tests.foo — it will be picked up by tests framework
    automagically ©
 */
_.tests.itself = {

    /*  For reference on basic syntax of assertions, see assert.js, here's only
        extra function provided by this module:
     */

     /* 1.  If an exception is thrown by JS interpreter, it should be handled correctly
            by tests framework, contributing nice error report to test's log.
     */
    'exceptions': $shouldFail (function () {
        someUndefinedShit + someOtherUndefinedShit }),


    /*  3.  To write asynchronous tests, define second argument in your test routine, which
            is 'done' callback. The framework will look into argument count of your routine,
            and if second argument is there, your routine will be considered as asynchronous,
            i.e. not completing until 'done' is explicitly triggered.
     */
    'async': function (done) {
        _.delay (function () {
            done () }) },


    /*  4.  Use $tests to define unit tests on prototypes (works only on stuff in global namespace)
     */
    '$tests': function () {

        DummyPrototypeWithTest  = $prototype ({ $test: function () {} })
        DummyPrototypeWithTests = $prototype ({ $tests: { dummy: function () {} } })

        /*  $test/$tests renders to static immutable property
         */
        $assertThrows (function () { DummyPrototypeWithTest .$test  = 42 })
        $assertThrows (function () { DummyPrototypeWithTests.$tests = 42 })

        /*  Tests are added to Testosterone.prototypeTests
         */
        $assert ([DummyPrototypeWithTest .$test,
                  DummyPrototypeWithTests.$tests], _.filter2 (Testosterone.prototypeTests, function (def) {
                                                        return ((def.tests === DummyPrototypeWithTest .$test) ||
                                                                (def.tests === DummyPrototypeWithTests.$tests)) ? def.tests : false })) }
 }


/*  For marking methods in internal impl that should publish themselves as global keywords (like $assert)
 */
_.defineTagKeyword ('assertion')


/*  The mighty framework
 */
Testosterone = $singleton ({

    prototypeTests: [],

    isRunning: $property (function () {
        return this.currentTest !== undefined }),

    /*  Hook up to assertion syntax defined in common.js
     */
    constructor: function () {

        this.defineAssertion ('assertFails', $shouldFail (function (what) { what.call (this) }))

        _.each (_.omit (_.assertions, 'assertFails'), function (fn, name) {
            this.defineAssertion (name, name in _.asyncAssertions ? $async (fn) : fn) }, this);

        /*  For defining tests inside prototype definitions
         */
        (function (register) {
            $prototype.macro ('$test',  register)
            $prototype.macro ('$tests', register) }) (this.$ (function (def, value, name) {
                                                        this.prototypeTests.push ({
                                                            readPrototypeMeta: Tags.unwrap (def.$meta),
                                                            tests: value })
                                                        def[name] = $static ($property ($constant (def[name])))
                                                        return def }))

        this.run = this.$ (this.run) }, //  I wish I could simply derive from Component.js here for that purpose,
                                        //  but it's a chicken-egg class problem

    /*  Entry point
     */
    run: $interlocked (function (releaseLock, cfg_, optionalThen) { var then = arguments.length === 3 ? optionalThen : _.identity

        /*  Configuration
         */
        var defaults = {
            silent:  true,
            verbose: false,
            timeout: 2000,
            testStarted:  function (test) {},
            testComplete: function (test) {} }

        var cfg = this.runConfig = _.extend (defaults, cfg_)

        /*  Read cfg.suites
         */
        var suites = _.map (cfg.suites || [], this.$ (function (suite) {
            return this.testSuite (suite.name, suite.tests, cfg.context) }))

        var collectPrototypeTests = (cfg.codebase === false ? _.cps.constant ([]) : this.$ (this.collectPrototypeTests))

        /*  Pick prototype tests
         */
        collectPrototypeTests (this.$ (function (prototypeTests) {

            /*  Gather tests
             */
            var baseTests   = cfg.codebase === false ? [] : this.collectTests ()
            var allTests    = _.flatten (_.pluck (baseTests.concat (suites).concat (prototypeTests), 'tests'))
            var selectTests = _.filter (allTests, cfg.shouldRun || _.constant (true))

            /*  Reset context (assigning indices)
             */
            this.runningTests = _.map (selectTests, function (test, i) { return _.extend (test, { indent: cfg.indent, index: i }) })

            /*  Go
             */
            _.cps.each (selectTests,
                    this.$ (this.runTest),
                    this.$ (function () {
                                _.assert (cfg.done !== true)
                                          cfg.done   = true

                                this.printLog (cfg)
                                this.failedTests = _.filter (this.runningTests, _.property ('failed'))
                                this.failed = (this.failedTests.length > 0)
                                then (!this.failed)
                                releaseLock () }) ) })) }),

    /*  You may define custom assertions through this API
     */
    defineAssertions: function (assertions) {
        _.each (assertions, function (fn, name) {
            this.defineAssertion (name, fn) }, this) },

    /*  Internal impl
     */
    runTest: function (test, i, then) { var self = this, runConfig = this.runConfig
        this.currentTest = test
        
        runConfig.testStarted (test)
        
        test.verbose = runConfig.verbose
        test.timeout = runConfig.timeout

        test.run (function () {
            runConfig.testComplete (test)
            delete self.currentTest
            then () }) },

    collectTests: function () {
        return _.map (_.tests, this.$ (function (suite, name) {
            return this.testSuite (name, suite) } )) },

    collectPrototypeTests: function (then) {
        _.cps.map (this.prototypeTests, this.$ (function (def, then) {
            def.readPrototypeMeta (this.$ (function (meta) {
                then (this.testSuite (meta.name, def.tests)) })) }), then) },

    testSuite: function (name, tests, context) { return { 
        name: name || '',
        tests: _(_.pairs (((typeof tests === 'function') && _.object ([[name, tests]])) || tests))
                .map (function (keyValue) {
                        return new Test ({ name: keyValue[0], routine: keyValue[1], suite: name, context: context }) }) } },

    defineAssertion: function (name, def) { var self = this

        _.deleteKeyword (name)
        _.defineKeyword (name, Tags.modifySubject (def,

                                    function (fn) { return _.withSameArgs (fn, function () {

                                        if (!self.currentTest) {
                                            return fn.apply (self, arguments) }
                                        else {
                                            return self.currentTest.runAssertion (name, def, fn, arguments) } }) })) },

    printLog: function (cfg) { if (!cfg.supressLog) {

        var loggedTests = _.filter (this.runningTests, function (test) { return test.failed || (!cfg.silent && test.hasLog) })
        var failedTests = _.filter (this.runningTests, _.property ('failed'))

        _.invoke (cfg.verbose ? this.runningTests : loggedTests, 'printLog')

        if (failedTests.length) {
            log.orange ('\n' + log.boldLine + '\n' + 'SOME TESTS FAILED:', _.pluck (failedTests, 'name').join (', '), '\n\n') }

        else if (cfg.silent !== true) {
            log.green ('\n' + log.boldLine + '\n' + 'ALL TESTS PASS\n\n') } } } })


/*  Encapsulates internals of test's I/O.
 */
Test = $prototype ({

    constructor: function (cfg) {
        _.extend (this, cfg, {
            assertionStack: _.observableRef ([]) })

        _.defaults (this, {
            name:       'youre so dumb you cannot even think of a name?',
            failed:     false,
            routine:    undefined,
            verbose:    false,
            depth:      1,
            indent:     0,
            context:    this }) },

    currentAssertion: $property (function () {
        return this.assertionStack.value[0] }),

    waitUntilPreviousAssertionComplete: function (then) {
        if (this.currentAssertion && this.currentAssertion.async) {
            this.assertionStack.when (_.isEmpty, function () {
                then () }) }
        else {
            then () } },

    runAssertion: function (name, def, fn, args) { var self = this

        var assertion = {
            name: name,
            async: def.$async,
            shouldFail: def.$shouldFail,
            depth: self.depth + self.assertionStack.value.length + 1,
            location: def.$async ? $callStack.safeLocation (2) : undefined }

        this.waitUntilPreviousAssertionComplete (function () {

            if (assertion.async) {
                assertion = new Test (_.extend (assertion, {
                    context: self.context,
                    timeout: self.timeout / 2,
                    routine: Tags.modifySubject (def, function (fn) {
                        return function (done) {
                            _.cps.apply (fn, self.context, args, function (args, then) {
                                if (!assertion.failed && then) {
                                    then.apply (self.context, args) }
                                done () }) } }) }))

                self.beginAssertion (assertion)

                assertion.run (function () {
                    if (assertion.failed && self.fail ()) {
                        assertion.location.sourceReady (function (src) {
                            log.red (src, log.config ({ location: assertion.location, where: assertion.location }))
                            assertion.evalLogCalls ()
                            self.endAssertion (assertion) }) }
                    else {
                        self.endAssertion (assertion) } }) }

            else {
                self.beginAssertion (assertion)

                try {
                    var result = fn.apply (self.context, args)
                    self.endAssertion (assertion)
                    return result }

                catch (e) {
                    self.onException (e)
                    self.endAssertion (assertion) } } }) },

    beginAssertion: function (a) {
        if (a.async) {
            Testosterone.currentTest = a }
        this.assertionStack ([a].concat (this.assertionStack.value)) },

    endAssertion: function (a) {
        if (Testosterone.currentTest === a) {
            Testosterone.currentTest = this }

        if (a.shouldFail && !a.failed) {
            this.onException (_.assertionError ({ notMatching: 'not failed (as should)' })) }

        this.assertionStack (_.without (this.assertionStack.value, a)) },

    fail: function () {
        var shouldFail = _.find (_.rest (this.assertionStack.value), _.matches ({ shouldFail: true }))

        if (shouldFail) {
            shouldFail.failed = true
            return false }

        else {
            this.failed = true
            return true } },

    mapStackLocations: function (error, then) {

        var assertionStack  = this.assertionStack.value.copy,
            callStack       = CallStack.fromError (error)
        
        callStack.sourcesReady (function () {
            then (_.map (assertionStack, function (assertion) {
                var found = _.find (callStack, function (loc, index) {
                    if ((assertion.location && CallStack.locationEquals (loc, assertion.location)) ||
                        (loc.source.indexOf ('$' + assertion.name) >= 0)) {
                            callStack = callStack.offset (index + 1)
                            return true } })

                return found || assertion.location || callStack.safeLocation (5) })) }) },

    onException: function (e, then) { var self = this

        if (this.done) {
            throw e } // not our exception, re-throw

        if (!this.fail ()) {
            if (then) {
                then.call (this) } }

        else {
            this.mapStackLocations (e, function (locations) {

                if (self.logCalls.length > 0) {
                    log.newline () }

                //  $assertMatches (blabla...
                _.each (locations.reversed, function (loc, i) {
                    if (loc) {
                        log.red (log.config ({ indent: i, location: true, where: loc }), loc.source) } })
                
                if (_.isAssertionError (e)) {
                    //  • a
                    //  • b
                    if ('notMatching' in e) { var notMatching = _.coerceToArray (e.notMatching)
                        if (e.asColumns) {
                            log.orange (log.indent (locations.length),
                                log.columns (_.map (notMatching, function (obj) {
                                    return ['• ' + _.keys (obj)[0], _.stringify (_.values (obj)[0])] })).join ('\n')) }
                        else {
                            _.each (notMatching, function (what, i) {
                                log.orange (log.indent (locations.length), '•', what) }) } } }
                        
                    // print exception
                else {
                    if (self.depth > 1) { log.newline () }
                    log.write (log.indent (locations.length), e) }

                log.newline ()

                if (then) {
                    then.call (self) } }) } },

    tryCatch: function (routine, then) { var self = this
                                                    self.afterUnhandledException = then
        routine.call (self.context, function () {   self.afterUnhandledException = undefined
            then () }) },

    onUnhandledException: function (e) {
        this.onException (e, function () { 
            if (this.afterUnhandledException) {
                var fn =    this.afterUnhandledException
                            this.afterUnhandledException = undefined
                    fn () } }) },

    run: function (then) { var self = this
        this.failed = false
        this.hasLog = false
        this.logCalls = []
        this.assertionStack ([])
        this.failureLocations = {}

        var routine     = Tags.unwrap (this.routine)
        var doRoutine   = function (then) {
                                var done = function () {
                                                self.done = true
                                                then () }
                                try { 
                                    if (_.noArgs (routine)) {
                                        routine.call (self.context)
                                        done () }
                                    else {
                                        self.tryCatch (routine, done) } }

                                catch (e) {
                                    self.onException (e, then) } }

        var beforeComplete = function () {
            if (self.routine.$shouldFail) {
                self.failed = !self.failed }
            
            if (!(self.hasLog = (self.logCalls.length > 0))) {
                if (self.failed) {
                    log.red ('FAIL') }
                else if (self.verbose) {
                    log.green ('PASS') } } }

        var timeoutExpired = function (then) {
                                self.failed = true
                                log.error ('TIMEOUT EXPIRED')
                                then () }

        var waitUntilAssertionsComplete = function (then) {
                                                self.assertionStack.when (_.isEmpty, then) }

        var withTimeout     = _.withTimeout.partial ({ maxTime: self.timeout, expired: timeoutExpired })
        
        var withLogging     = log.withWriteBackend.partial (
                                    _.extendWith ({ indent: self.depth + (self.indent || 0) }, function (args) {
                                        self.logCalls.push (args) }))

        var withExceptions  = _.withUncaughtExceptionHandler.partial (self.$ (self.onUnhandledException))

        withLogging (           function (doneWithLogging) {
            withExceptions (    function (doneWithExceptions) {
                withTimeout (   function (doneWithTimeout) {
                                    _.cps.sequence (
                                        doRoutine,
                                        waitUntilAssertionsComplete,
                                        doneWithTimeout) () },

                                function () {
                                    beforeComplete ()
                                    doneWithExceptions ()
                                    doneWithLogging () }) }) }, then) },

    printLog: function () { var suiteName = (this.suite && (this.suite !== this.name) && (this.suite || '').quote ('[]')) || ''

        log.write (log.color.blue,
            '\n' + log.boldLine,
            '\n' + _.nonempty ([suiteName, this.name]).join (' '),
            (this.index + ' of ' + Testosterone.runningTests.length).quote ('()') +
            (this.failed ? ' FAILED' : '') + ':',
            '\n')

        this.evalLogCalls () },

    evalLogCalls: function () {
        _.each (this.logCalls, log.writeBackend ().arity1) } })


if (Platform.NodeJS) {
    module.exports = Testosterone }