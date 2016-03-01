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


/*  A contract for custom assertions, says that assertion is asynchronous.
 */
_.defineTagKeyword ('async')


/*  This is test suite for tests framework itself.

    As you can see, tests are defined as _.tests.xxx. So, if you have module called 'foo',
    place tests for that module in _.tests.foo — it will be picked up by tests framework
    automagically ©
 */
_.tests.Testosterone = {

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

        /*  $test/$tests renders to static immutable property $tests
         */
        $assertTypeMatches (DummyPrototypeWithTests.$tests, [{ '*': 'function' }])
        $assertThrows (function () { DummyPrototypeWithTests.$tests = 42 })

        /*  Tests are added to Testosterone.prototypeTests
         */
        $assertMatches (_.pluck (Testosterone.prototypeTests, 'tests'), [DummyPrototypeWithTest .$tests,
                                                                         DummyPrototypeWithTests.$tests]) }
 }


/*  For marking methods in internal impl that should publish themselves as global keywords (like $assert)
 */
_.defineTagKeyword ('assertion')


/*  The mighty framework
 */
Testosterone = $singleton ({

    prototypeTests: [],

    isRunning: $property (function () {
        return this.currentAssertion !== undefined }),

    /*  Hook up to assertion syntax defined in common.js
     */
    constructor: function () {

        _.each (_.assertions, function (fn, name) {
                                    this.defineAssertion (name, (name === 'assertFails') ?
                                        $shouldFail (function (what) { what.call (this) }) : fn) }, this);

        /*  For defining tests inside prototype definitions
         */
        (function (register) {
            $prototype.macro ('$test',  register)
            $prototype.macro ('$tests', register) }) (this.$ (function (def, value, name) {
                                                        this.prototypeTests.push ({
                                                            proto: def.constructor,
                                                            tests: value })

                                                        def.$tests = $static ($property ($constant (
                                                            (_.isStrictlyObject (value) && value) || _.object ([['test', value]]))))

                                                        return def }))
        this.run = this.$ (this.run) },

    /*  Entry point
     */
    run: _.interlocked (function (releaseLock, cfg_, optionalThen) { var then = arguments.length === 3 ? optionalThen : _.identity

        /*  Configuration
         */
        var defaults = {
            suites: [],
            silent:  true,
            verbose: false,
            timeout: 2000,
            filter: _.identity,
            testStarted:  function (test) {},
            testComplete: function (test) {} }

        var cfg = this.runConfig = _.extend (defaults, cfg_)

        /*  Read cfg.suites
         */
        var suitesIsArray = _.isArray (cfg.suites) // accept either [{ name: xxx, tests: yyy }, ...] or { name: tests, ... }
        var suites = _.map (cfg.suites, this.$ (function (suite, name) {
            return this.testSuite (suitesIsArray ? suite.name : name, suitesIsArray ? suite.tests : suite, cfg.context) }))

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

            _.assertTypeMatches (_.map (_.pluck (this.runningTests, 'routine'), $untag), ['function'])

            this.runningTests = _.filter (this.runningTests, cfg.filter || _.identity)

            /*  Go
             */
            _.cps.each (this.runningTests,
                    this.$ (this.runTest),
                    this.$ (function () { //console.log (_.reduce (this.runningTests, function (m, t) { return m + t.time / 1000 }, 0))

                                _.assert (cfg.done !== true)
                                          cfg.done   = true

                                this.printLog (cfg)
                                this.failedTests = _.filter (this.runningTests, _.property ('failed'))
                                this.failed = (this.failedTests.length > 0)
                                then (!this.failed)
                                
                                releaseLock () }) ) })) }),

    onException: function (e) {
        if (this.currentAssertion) 
            this.currentAssertion.onException (e)
        else
            throw e },

    /*  You may define custom assertions through this API
     */
    defineAssertions: function (assertions) {
        _.each (assertions, function (fn, name) {
            this.defineAssertion (name, fn) }, this) },

    /*  Internal impl
     */
    runTest: function (test, i, then) { var self = this, runConfig = this.runConfig

        log.impl.configStack = [] // reset log config stack, to prevent stack pollution due to exceptions raised within log.withConfig (..)
    
        runConfig.testStarted (test)
        
        test.verbose = runConfig.verbose
        test.timeout = runConfig.timeout

        test.startTime = Date.now ()

        test.run (function () { test.time = Date.now () - test.startTime;

            if (_.numArgs (runConfig.testComplete) === 2) { runConfig.testComplete (test,  then)   }
                                                    else  { runConfig.testComplete (test); then () } }) },

    collectTests: function () {
        return _.map (_.tests, this.$ (function (suite, name) {
            return this.testSuite (name, suite) } )) },

    collectPrototypeTests: function (then) {
        _.cps.map (this.prototypeTests, this.$ (function (def, then) {
            def.proto.$meta (this.$ (function (meta) {
                then (this.testSuite (meta.name, def.tests, undefined, def.proto)) })) }), then) },

    testSuite: function (name, tests, context, proto) { return { 
        name: name || '',
        tests: _(_.pairs (((typeof tests === 'function') && _.object ([[name, tests]])) || tests))
                .map (function (keyValue) {
                        var test = new Test ({ proto: proto, name: keyValue[0], routine: keyValue[1], suite: name, context: context })
                            test.complete (function () {
                                if (!(test.hasLog = (test.logCalls.length > 0))) {
                                         if (test.failed)  { log.red   ('FAIL') }
                                    else if (test.verbose) { log.green ('PASS') } } })

                            return test }) } },

    defineAssertion: function (name, def) { var self = this
        _.deleteKeyword (name)
        _.defineKeyword (name, Tags.modify (def,
                                    function (fn) {
                                        return _.withSameArgs (fn, function () { var loc = $callStack.safeLocation (Platform.Browser ? 0 : 1)
                                            if (!self.currentAssertion) {
                                                return fn.apply (self, arguments) }
                                            else {
                                                return self.currentAssertion.babyAssertion (name, def, fn, arguments, loc) } }) })) },

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
        _.defaults (this, cfg, {
            name:       '<< UNNAMED FOR UNKNOWN REASON >>',
            failed:     false,
            routine:    undefined,
            verbose:    false,
            depth:      1,
            indent:     0,
            failedAssertions: [],
            context:    this,
            complete: _.extend (_.barrier (), { context: this }) })

        this.babyAssertion = _.interlocked (this.babyAssertion) },

    finalize: function () {
        this.babyAssertion.wait (this.$ (function () {
            if (this.canFail && this.failedAssertions.length) {
                this.failed = true }
            this.complete (true) })) },

    babyAssertion: function (releaseLock, name, def, fn, args, loc) { var self = this

        var assertion = new Test ({
            mother: this,
            name: name,
            shouldFail: def.$shouldFail || this.shouldFail,
            depth: this.depth + 1,
            location: loc,
            context: this.context,
            timeout: this.timeout / 2,
            verbose: this.verbose,
            silent:  this.silent,
            routine: Tags.modify (def, function (fn) {
                                            return function (done) {
                                                    if ($async.is (args[0])) {
                                                        _.cps.apply (fn, self.context, args, function (args, then) {
                                                                                                         if (then)
                                                                                                             then ()
                                                                                                         done ()             }) }
                                                    else {
                                                        try       { fn.apply (self.context, args); done () }
                                                        catch (e) { assertion.onException (e) } } } }) })

        var doneWithAssertion = function () {
            if (assertion.failed && self.canFail) {
                self.failedAssertions.push (assertion) }
            releaseLock () }

        assertion.run (function () {
            Testosterone.currentAssertion = self
            if (assertion.failed || (assertion.verbose && assertion.logCalls.notEmpty)) {
                    assertion.location.sourceReady (function (src) {
                        log.red (log.config ({ location: assertion.location, where: assertion.location }), src)
                        assertion.evalLogCalls ()
                        doneWithAssertion () }) }
            else {
                doneWithAssertion () } }) },

    canFail: $property (function () {
        return !this.failed && !this.shouldFail }),

    fail: function () {
        this.failed = true
        this.finalize () },

    assertionStack: $property (function () { var result = [],
                                                      a = this; do { result.push (a); a = a.mother } while (a)
                                          return result }),

    onException: function (e) {

            if (this.canFail || this.verbose) {

                if (_.isAssertionError (e)) {
                    //  • a
                    //  • b
                    if ('notMatching' in e) { var notMatching = _.coerceToArray (e.notMatching)
                        if (e.asColumns) {
                            log.orange (
                                log.columns (_.map (notMatching, function (obj) {
                                    return ['• ' + _.keys (obj)[0], _.stringify (_.values (obj)[0])] })).join ('\n')) }
                        else {
                            var cases  = _.map (notMatching, log.impl.stringify.arity1.then (_.bullet.$ ('• ')))
                            var common = _.reduce2 (cases, _.longestCommonSubstring) || ''
                            if (common.length < 4) {
                                common = undefined }

                            _.each (cases, function (what) {

                                    if (common) {                                  var where  = what.indexOf (common)
                                        log.write ( log.color.orange,  what.substr (0, where),
                                                    log.color.dark,    common,
                                                    log.color.orange,  what.substr (where + common.length)) }

                                    else {
                                        log.orange (what) } }) }} }
                        
                    // print exception
                else {
                    if (this.depth > 1) { log.newline () }
                                          log.write (e) }
                                          log.newline () }

            if (this.canFail) { this.fail () }
                        else  { this.finalize () } },

    run: function (then) { var self    = Testosterone.currentAssertion = this,
                               routine = Tags.unwrap (this.routine)

        this.shouldFail = $shouldFail.is (this.routine)
        this.failed = false
        this.hasLog = false
        this.logCalls = []
        this.failureLocations = {}

        _.withTimeout ({
            maxTime: self.timeout,
            expired: function () { if (self.canFail) { log.error ('TIMEOUT EXPIRED'); self.fail () } } },
            self.complete)

        _.withUncaughtExceptionHandler (self.$ (self.onException), self.complete)

        log.withWriteBackend (_.extendWith ({ indent: self.depth + (self.indent || 0) },
                                    function (x) { /*log.impl.defaultWriteBackend (x);*/ self.logCalls.push (x) }),

                              function (doneWithLogging)  { self.complete (doneWithLogging.arity0)
                                                if (then) { self.complete (then) }

                                    if (routine.length > 0) routine.call (self.context,  self.$ (self.finalize))
                                    else                   (routine.call (self.context),         self.finalize ()) }) },
        
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


/*
 */
_.defineTagKeyword ('allowsRecursion')

_.limitRecursion = function (max, fn, name) { if (!fn) { fn = max; max = 0 }
                        var depth       = -1
                        var reported    = false
                            return function () {
                                if (!reported) {
                                    if (depth > max) { reported = true
                                        throw _.extendWith ({ notMatching: _.map (arguments, function (arg, i) { return 'arg' + (i + 1) + ': ' + _.stringify (arg) }) },
                                            new Error (name + ': max recursion depth reached (' + max + ')')) }
                                    else {
                                        var result = ((++depth), fn.apply (this, arguments)); depth--
                                            return result } } } }
                                            
Testosterone.ValidatesRecursion = $trait ({

    $test: function () {

        var test = new ($component ({

            $traits: [Testosterone.ValidatesRecursion],

            foo: function () {},
            bar: function () { this.bar () },
            baz: $allowsRecursion ({ max: 2 }, function () { this.baz () }),
            qux: $allowsRecursion (function () { if (!this.quxCalled) { this.quxCalled = true; this.qux () } }) }))

                       test.foo ()
        $assertThrows (test.bar, { message: 'bar: max recursion depth reached (0)' })
                       test.bar () // should not report second time (to prevent overflood in case of buggy code)
        $assertThrows (test.baz, { message: 'baz: max recursion depth reached (2)' })
                       test.qux () },

    $constructor: function () {
        _.each (this, function (member, name) {
            if (_.isFunction ($untag (member)) && (name !== 'constructor') && (!member.$allowsRecursion || (member.$allowsRecursion.max !== undefined))) {
                this[name] = Tags.modify (member, function (fn) {
                    return _.limitRecursion ((member && member.$allowsRecursion && member.$allowsRecursion.max) || 0, fn, name) }) } }, this) } })

/*  $log for methods
 */
;(function () { var colors = _.keys (_.omit (log.color, 'none'))
                    colors.each (_.defineTagKeyword)

    _.defineTagKeyword ('verbose')

    Testosterone.LogsMethodCalls = $trait ({

        $test: Platform.Browser ? (function () {}) : function (testDone) {

                    var Proto = $prototype ({ $traits: [Testosterone.LogsMethodCalls] })
                    var Compo = $extends (Proto, {
                                        foo: $log ($pink ($verbose (function (_42) { $assert (_42, 42); return 24 }))) })

                    var compo = new Compo ()
                    var testContext = this

                    Compo.$meta (function () {
                        $assert (compo.foo (42), 24)
                        $assert (_.pluck (testContext.logCalls, 'text'), ['Compo.foo (42)', '→ 24', ''])
                        $assert (testContext.logCalls[0].color === log.color ('pink'))
                        testDone () }) },

        $macroTags: {

            log: function (def, member, name) { var param         = (_.isBoolean (member.$log) ? undefined : member.$log) || (member.$verbose ? '{{$proto}}' : '')
                                                var meta          = {}
                                                var color         = _.find2 (colors, function (color) { return log.color ((member['$' + color] && color)) || false })
                                                var template      = param && _.template (param)

                $untag (def.$meta) (function (x) { meta = x }) // fetch prototype name

                return $prototype.impl.modifyMember (member, function (fn, name_) { return function () { var this_      = this,
                                                                                                             arguments_ = _.asArray (arguments)

                        var this_dump = (template && template.call (this, _.extend ({ $proto: meta.name }, _.map2 (this, _.stringifyOneLine.arity1)))) || this.desc || ''
                        var args_dump = _.map (arguments_, _.stringifyOneLine.arity1).join (', ').quote ('()')

                    log.write (log.config ({
                        color: color,
                        location: true,
                        where: member.$verbose ? undefined : { calleeShort: meta.name } }), _.nonempty ([this_dump, name, name_]).join ('.'), args_dump)

                    return log.withConfig ({ indent: 1,
                                             color: color,
                                             protoName: meta.name }, function () {

                                                                        var numWritesBefore = log.impl.numWrites
                                                                        var result          = fn.apply (this_, arguments_);          

                                                                        if (result !== undefined) {
                                                                            log.write ('→', _.stringifyOneLine (result)) }

                                                                        if ((log.currentConfig ().indent < 2) &&
                                                                            (log.impl.numWrites - numWritesBefore) > 0) { log.newline () }

                                                                        return result }) } }) } } }) }) ();


if (Platform.NodeJS) {
    module.exports = Testosterone }