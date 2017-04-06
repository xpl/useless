"use strict";

const O = require ('es7-object-polyfill')

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Testosterone is a cross-platform unit test shell. Features:

    - asynchronous tests
    - asynchronous assertions
    - log handling (log.xxx calls are scheduled to current test log)
    - exception handling (uncaught exceptions are nicely handled)

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

const bullet  = require ('string.bullet'),
      asTable = require ('as-table')

/*  A contract for test routines that says that test should fail and it's the behavior expected
 */
Meta.globalTag ('shouldFail')


/*  A contract for custom assertions, says that assertion is asynchronous.
 */
Meta.globalTag ('async')


/*  This is test suite for tests framework itself.

    As you can see, tests are defined as _.tests.xxx. So, if you have module called 'foo',
    place tests for that module in _.tests.foo — it will be picked up by tests framework
    automagically ©
 */
_.tests.Testosterone = {

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

        const DummyPrototypeWithTest  = $prototype ({ $test: function () {} })
        const DummyPrototypeWithTests = $prototype ({ $tests: { dummy: function () {} } })

        /*  $test/$tests renders to static immutable property $tests
         */
        $assertTypeMatches (DummyPrototypeWithTests.$tests, [{ '*': 'function' }])
        $assertThrows (function () { DummyPrototypeWithTests.$tests = 42 })

        /*  Tests are added to Testosterone.prototypeTests
         */
        $assertMatches (_.pluck (Testosterone.prototypeTests, 'tests'), [DummyPrototypeWithTest .$tests,
                                                                         DummyPrototypeWithTests.$tests]) }
 }

/*  For marking methods in internal impl that should publish themselves as global functions (like $assert)
 */
Meta.globalTag ('assertion')

$global.Testosterone = $singleton ({

    prototypeTests: [],

    get isRunning () {
        return this.currentAssertion !== undefined },

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
            $prototype.macro ('$tests', register) }) ((def, value, name) => {
                                                        this.prototypeTests.push ({
                                                            proto: def.constructor,
                                                            tests: value })

                                                        def.$tests = $static ($property ($constant (
                                                            (_.isStrictlyObject (value) && value) || _.object ([['test', value]]))))

                                                        return def })
        this.run = this.$ (this.run) },

    /*  Entry point
     */
    run: _.interlocked (function (cfg_) {
        
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
            return this.testSuite (suitesIsArray ? suite.name : name, suitesIsArray ? suite.tests : suite, cfg.context, suite.proto) }))

        /*  Pick prototype tests
         */
        var prototypeTests = cfg.codebase === false ? [] : this.collectPrototypeTests ()

        /*  Gather tests
         */
        var baseTests   = cfg.codebase === false ? [] : this.collectTests ()
        var allTests    = _.flatten (_.pluck (baseTests.concat (suites).concat (prototypeTests), 'tests'))
        var selectTests = _.filter (allTests, cfg.shouldRun || _.constant (true))

        /*  Reset context (assigning indices)
         */
        this.runningTests = _.map (selectTests, function (test, i) { return _.extend (test, { indent: cfg.indent, index: i }) })

        _.each (this.runningTests, function (t) {
            if (!(t.routine instanceof Function)) {
                log.ee (t.suite, t.name, '– test routine is not a function:', t.routine)
                throw new Error () } })

        this.runningTests = _.filter (this.runningTests, cfg.filter || _.identity)

        /*  Go
         */
        return    __.each (this.runningTests, this.$ (this.runTest))
                    .then (() => {
                            _.assert (cfg.done !== true)
                                      cfg.done   = true

                            this.printLog (cfg)
                            this.failedTests = _.filter (this.runningTests, _.property ('failed'))
                            this.failed = (this.failedTests.length > 0)
                            
                            return !this.failed })
                    
                    .catch (e => {
                                log.margin ()
                                log.ee (log.boldLine, 'TESTOSTERONE CRASHED', log.boldLine, '\n\n', e)
                                throw e })
    }),

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
    runTest: function (test, i) { var self = this, runConfig = this.runConfig

        log.impl.configStack = [] // reset log config stack, to prevent stack pollution due to exceptions raised within log.withConfig (..)
    
        return __.then (runConfig.testStarted (test), function () {

            test.verbose = runConfig.verbose
            test.timeout = runConfig.timeout
            test.startTime = Date.now ()
            return test.run ()
                       .then (function () {
                                test.time = (Date.now () - test.startTime)
                                return runConfig.testComplete (test) }) }) },

    collectTests: function () {
        return _.map (_.tests, this.$ (function (suite, name) {
            return this.testSuite (name, suite) } )) },

    collectPrototypeTests () {
        return this.prototypeTests.map (def =>
                this.testSuite (
                    (def.proto.$meta && def.proto.$meta.name) || '<prototype>',
                    def.tests, undefined, def.proto))
    },

    testSuite: function (name, tests, context, proto) { return { 
        name: name || '',
        tests: _(O.entries (((typeof tests === 'function') && _.fromPairs ([[name, tests]])) || tests))
                .map (function (keyValue) {
                        var test = new Test ({ proto: proto, name: keyValue[0], routine: keyValue[1], suite: name, context: context })
                            test.complete (function () {
                                if (!(test.hasLog = (test.logCalls.length > 0))) {
                                         if (test.failed)  { log.red   ('FAIL') }
                                    else if (test.verbose) { log.green ('PASS') } } })

                            return test }) } },

    defineAssertion: function (name, def) {

        var self = this
        var fn   = $untag (def)

        delete $global['$' + name]
               $global['$' + name] = _.withSameArgs (fn, function () {

                    var loc = (new StackTracey ()).withSource (($platform.Browser && !$platform.Chrome) ? 0 : 1)
                    
                    if (!self.currentAssertion) {
                        return fn.apply (self, arguments) }
                    else {
                        return self.currentAssertion.babyAssertion (name, def, fn, arguments, loc) } })
    },

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
$global.Test = $prototype ({

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

    babyAssertion: function (name, def, fn, args, loc) { var self = this

        var assertion = new Test ({
            mother: this,
            name: name,
            shouldFail: $shouldFail.is (def) || this.shouldFail,
            depth: this.depth + 1,
            location: loc,
            context: this.context,
            timeout: this.timeout / 2,
            verbose: this.verbose,
            silent:  this.silent,
            routine: Meta.modify (def, function (fn) {
                                            return function (done) {
                                                    if ($async.is (args[0]) || $async.is (def)) {
                                                        _.cps.apply (fn, self.context, args, function (args, then) {
                                                                                                         if (then) {
                                                                                                             then.apply (this, args) }
                                                                                                         done () }) }
                                                    else {
                                                        try       { fn.apply (self.context, args); done (); }
                                                        catch (e) { assertion.onException (e); } } } }) })

        return assertion.run ()
                        .finally (function (e, x) {
                                Testosterone.currentAssertion = self
                                if (assertion.failed || (assertion.verbose && assertion.logCalls.notEmpty)) {
                                    var src = assertion.location.sourceLine.trim ()
                                    log.red (log.config ({ location: assertion.location, where: assertion.location }), src)
                                    assertion.evalLogCalls ()
                                    return src } })

                        .then (function () {
                            if (assertion.failed && self.canFail) {
                                self.failedAssertions.push (assertion) } })

                        .catch (function (e) {

                            log.ee (log.boldLine, 'TESTOSTERONE CRASHED', log.boldLine, '\n\n', e)

                        }) },

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
                                asTable (_.map (notMatching, function (obj) {
                                    return ['\t• ' + _.keys (obj)[0], String.ify (_.values (obj)[0])] }))) }
                        else {
                            var cases  = _.map (notMatching, log.impl.stringify.arity1.then (bullet.$ ('\t• ')))
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

    run: function () { var self    = Testosterone.currentAssertion = this,
                           routine = Meta.unwrap (this.routine)

        return new Channel (this.$ (function (then) {

            this.shouldFail = $shouldFail.is (this.routine)
            this.failed = false
            this.hasLog = false
            this.logCalls = []
            this.failureLocations = {}

            _.withTimeout ({
                maxTime: self.timeout,
                expired: function () { if (self.canFail) { log.ee ('TIMEOUT EXPIRED'); self.fail () } } },
                self.complete)

            _.withUncaughtExceptionHandler (self.$ (self.onException), self.complete)

            log.withWriteBackend (_.extendWith ({ indent: 1 },
                                        function (x) { /*log.impl.defaultWriteBackend (x);*/ self.logCalls.push (x) }),

                                  function (doneWithLogging)  { self.complete (doneWithLogging.arity0)
                                                    if (then) { self.complete (then) }

                                        /*  Continuation-passing style flow control
                                         */
                                        if (routine.length > 0) {
                                            routine.call (self.context, self.$ (self.finalize)) }

                                        /*  Return-style flow control
                                         */
                                        else {

                                        /*  TODO:   investigate why Promise.resolve ().then (self.$ (self.finalize))
                                                    leads to broken unhandled exception handling after the Testosterone run completes  */

                                            var result = undefined

                                            try       { result = routine.call (self.context) }
                                            catch (e) { self.onException (e) }

                                            if (_.isArrayLike (result) && (result[0] instanceof Promise)) {
                                                result = __.all (result) }

                                            if (result instanceof Promise) {
                                                result.then (
                                                    function (x) { self.finalize () }.postponed,
                                                    function (e) { self.onException (e) }) }
                                            else {
                                                self.finalize () } } }) })) },
            
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
Meta.globalTag ('allowsRecursion')

_.limitRecursion = function (max, fn, name) { if (!fn) { fn = max; max = 0 }
                        var depth       = -1
                        var reported    = false
                            return function () {
                                if (!reported) {
                                    if (depth > max) { reported = true
                                        throw _.extendWith ({ notMatching: _.map (arguments, function (arg, i) { return 'arg' + (i + 1) + ': ' + String.ify (arg) }) },
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

            const allowsRecursion = $allowsRecursion.read (member)

            if (_.isFunction ($untag (member)) && (name !== 'constructor') && (!allowsRecursion || (allowsRecursion.max !== undefined))) {
                this[name] = Meta.modify (member, function (fn) {
                    return _.limitRecursion ((allowsRecursion && allowsRecursion.max) || 0, fn, name) }) } }, this) } })

/*  $log for methods
 */
;(function () { var colors = _.keys (_.omit (log.color, 'none'))
                    colors.each (Meta.globalTag)

    var stringify = String.ify.configure ({ pretty: false })

    Meta.globalTag ('verbose')

    Testosterone.LogsMethodCalls = $trait ({

/*
        $test: $platform.Browser ? (function () {}) : function (testDone) {

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
*/
        $macroTags: {

            log: function (def, member, name) { var logTag        = $log.read (member)
                                                var param         = (_.isBoolean (logTag) ? undefined : logTag) || ($verbose.is (member) ? '{{$proto}}' : '')
                                                var meta          = def.$meta || {}
                                                var color         = log.color[_.find (colors, Meta.hasTag.$ (member))]
                                                var template      = param && _.template (param, { interpolate: /\{\{(.+?)\}\}/g })

                return $prototype.impl.modifyMember (member, function (fn, name_) { return function () { var this_      = this,
                                                                                                             arguments_ = _.asArray (arguments)

                        var this_dump = (template && template.call (this, _.extend ({ $proto: meta.name }, _.map2 (this, stringify)))) || this.desc || ''
                        var args_dump = _.map (arguments_, stringify).join (', ').quote ('()')

                    log.write (log.config ({
                        color: color,
                        location: true,
                        where: $verbose.is (member) ? undefined : { calleeShort: meta.name } }), _.nonempty ([this_dump, name, name_]).join ('.'), args_dump)

                    return log.withConfig ({ indent: 1,
                                             color: color,
                                             protoName: meta.name }, function () {

                                                                        var numWritesBefore = log.impl.numWrites
                                                                        var result          = fn.apply (this_, arguments_);          

                                                                        if (result !== undefined) {
                                                                            log.write ('→', stringify (result)) }

                                                                        if ((log.currentConfig ().indent < 2) &&
                                                                            (log.impl.numWrites - numWritesBefore) > 0) { log.newline () }

                                                                        return result }) } }) } } }) }) ();


if ($platform.NodeJS) {
    module.exports = Testosterone }