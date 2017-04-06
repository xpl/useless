"use strict";

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Unit tests (bootstrap code)

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_.hasAsserts = true

_.extend (_, {

/*  a namespace where you put tests (for enumeration purposes)
    ======================================================================== */

    tests: _.tests || {},

/*  A degenerate case of a test shell. We use it to bootstrap most critical
    useless.js internals, where real shell (Testosterone.js) is not available,
    as it itself depends on these utility. It takes test and test's subject as
    arguments (test before code, embodying test-driven philosophy) and executes
    test immediately, throwing exception if anything fails - which is simply
    the default behavior of $assert. So expect no advanced error reporting
    and no controlled execution by using this API.
    ======================================================================== */

    withTest:   function (name, test, defineSubject) {
                    defineSubject ()
                    _.runTest (name, test)
                    _.publishToTestsNamespace (name, test) },

/*  Publishes to _.tests namespace, but does not run
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    deferTest:  function (name, test, defineSubject) {
                    defineSubject ()
                    _.publishToTestsNamespace (name, test) },

    /*  INTERNALS (you won't need that)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        runTest:    function (name, test) {
                        try {
                            if (_.isFunction (test)) {                               test () }
                                                else { _.each (test, function (fn) { fn () }) } }
                        catch (e) {
                            if (_.isAssertionError (e)) { var printedName = ((_.isArray (name) && name) || [name]).join ('.')
                                                          console.log (printedName + ':', e.message, '\n' + _.times (printedName.length, _.constant ('~')).join ('') + '\n')
                                                         _.each (e.notMatching, function (x) { console.log ('  •', x) }) }
                            throw e } },

        publishToTestsNamespace: function (name, test) {
                        if (_.isArray (name)) { // [suite, name] case
                            (_.tests[name[0]] || (_.tests[name[0]] = {}))[name[1]] = test }
                        else {
                            _.tests[name] = test } } })
        
/*  TEST ITSELF
    ======================================================================== */

_.withTest ('assert.js bootstrap', function () {

/*  One-argument $assert (requires its argument to be strictly 'true')
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assert (true)

    $assert (                       // public front end, may be replaced by environment)
        _.assert ===                // member of _ namespace (original implementation, do not mess with that)
        _.assertions.assert)        // member of _.assertions (for enumeration purposes)

    $assertNot (false)
    $assertNot (5)                  // NB: assertNot means 'assert not true', hence this will pass

/*  Multi-argument assert (requires its arguments be strictly equal to each other)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assert (2 + 2, 2 * 2, 4)                    // any number of arguments
    $assert ({ foo: [1,2,3] }, { foo: [1,2,3] }) // compares objects (deep match)
    $assert ({ foo: { bar: 1 }, baz: 2 },        // ignores order of properties
             { baz: 2, foo: { bar: 1 } })

    $assertNot (2 + 2, 5)

/*  Nonstrict matching (a wrapup over _.matches)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertMatches ({ foo: 1, bar: 2 },
                    { foo: 1 })

/*  Nonstrict matching against complex objects (stdlib.js feature)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) { $assertMatches ( { foo: [1,2], bar: 3 },
                                        { foo: [1] }) }

/*  Regex matching (stdlib.js feature)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) { $assertMatches ('123', /[0-9]+/) }


/*  Type matching (plain)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) {  $assertTypeMatches (42, 'number')
                        $assertFails (function () {
                            $assertTypeMatches ('foo', 'number') }) }

/*  Type matching (array type)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) {  $assertTypeMatches ([1,2],   [])
                        $assertTypeMatches ([],      [])
                        $assertTypeMatches ([1,2,3], ['number'])
                        $assertTypeMatches ([],      ['number'])
                        $assertFails (function () {
                            $assertTypeMatches ([1,2,3],     ['string'])
                            $assertTypeMatches ([1,2,'foo'], ['number']) }) }

/*  Type matching (deep)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) {  $assertTypeMatches ({

                            /*  Input object */

                                foo: 42,
                                bar: {
                                    even: 4,
                                    many: ['foo','bar'] } }, {

                            /*  Type contract */

                                foo: 'number',      // simple type check
                                qux: 'undefined',   // nonexisting match 'undefined' 
                                bar: {                                              // breakdown of complex object 
                                    even: function (n) { return (n % 2) === 0 },    // custom contract predicate    
                                    many: ['string'] } }) }                         // array contract (here, 'array of strings')

/*  Type matching ($prototype)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasOOP) { var Foo = $prototype (),
                        Bar = $prototype ()

        $assertTypeMatches ({ foo: new Foo (),
                              bar: new Bar () },

                            { foo: Foo,
                              bar: Bar })

        $assertFails (function () {
            $assertTypeMatches (new Bar (), Foo) }) };

/*  Ensuring throw (and no throw)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertThrows (function () { throw 42 })
    $assertNotThrows (function () {})

/*  Ensuring throw (strict version)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertThrows (     function () { throw 42 }, 42) // accepts either plain value or predicate
    $assertThrows (     function () { throw new Error ('42') }, _.matches ({ message: '42' }))

    $assertFails (function () {
        $assertThrows ( function () { throw 42 }, 24)
        $assertThrows ( function () { throw new Error ('42') }, _.matches ({ message: '24' })) })

/*  Ensuring execution
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertEveryCalled     (function (a, b, c) { a (); a (); b (); c () })
    $assertEveryCalledOnce (function (a, b, c) { a ();       b (); c () })
    $assertEveryCalled     (function (x__3) { x__3 (); x__3 (); x__3 (); })

    /*$assertFails (function () {
        $assertEveryCalled     (function (a, b, c) { a (); b () })
        $assertEveryCalledOnce (function (a, b, c) { a (); b (); b (); c (); })
        $assertEveryCalled     (function (x__3) { x__3 (); x__3 (); }) })*/


/*  TODO:   1) add CPS support
            2) replace $assertCPS with this
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if (_.hasStdlib) {

            $assertCalledWithArguments (   ['foo',
                                           ['foo', 'bar']], function (fn) {

                                        fn ('foo')
                                        fn ('foo', 'bar') }) }


/*  Ensuring CPS routine result (DEPRECATED)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertCPS (function (then) { then ('foo', 'bar') }, ['foo', 'bar'])
    $assertCPS (function (then) { then ('foo') }, 'foo')
    $assertCPS (function (then) { then () })


/*  Ensuring assertion failure
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $assertFails (function () {
        $fail                                           // simplest way to generate assertion
        $stub                                           // to mark code stubs (throws error)
        $assert ('not true')                            // remember that assert is more strict than JavaScript if clauses
        $assert ({ foo: 1, bar: 2 }, { foo: 1 })        // not be confused with _.matches behavior (use $assertMatches for that)
        $assert ([1,2,3,4], [1,2,3])                    // same for arrays
        $assert (['foo'], { 0: 'foo', length: 1 })      // array-like objects not gonna pass (regression test)
        $assertFails (function () {}) })                // $assertFails fails if passed code don't

/*  Default fail behavior (never depend on that, as it's environment-dependent)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    if ($assert === _.assertions.assert) {
        $assertThrows (function () { $fail }) }


/*  IMPLEMENTATION
    ======================================================================== */

}, function () {

    var assertImpl = function (positive) {
                        return function (__) {  var args = [].splice.call (arguments, 0)

                                                if (args.length === 1) {
                                                    if (positive && (args[0] !== true)) {
                                                        _.assertionFailed ({ notMatching: args }) } }

                                                else if (positive && (_.allEqual (args) !== true)) {
                                                    _.assertionFailed ({ notMatching: args }) }

                                                return true } }

    /*  Fix for _.matches semantics (should not be true for _.matches (42) (24))
     */
    ;(function () {
        var _matches = _.matches
        _.matches = function (a) { return _.isObject (a) ? _matches (a) : function (b) { return a === b } } }) ();

    _.extend (_, _.assertions = {

        assert:    assertImpl (true),
        assertNot: assertImpl (false),

        assertCPS: function (fn, args, then) { var requiredResult = (args && (_.isArray (args) ? args : [args])) || []
            fn (function () {
                $assert ([].splice.call (arguments, 0), requiredResult)
                if (then) { then (); return true; } }) },

        assertNotCalled: function (context) {
            var inContext = true; context (function () { if (inContext) { $fail } }); inContext = false },

        assertEveryCalledOnce: function (fn, then) {
            return _.assertEveryCalled ($once (fn), then) },

        assertEveryCalled: function (fn_, then) { const fn    = $untag (fn_),
                                                        async = $async.is (fn_),
                                                        once  = $once.is (fn_)

            var match     = once ? null : fn.toString ().match (/.*function[^\(]\(([^\)]+)\)/)
            var contracts = once ? _.times (fn.length, _.constant (1)) :
                                   _.map (match[1].split (','), function (arg) {
                                                                    var parts = (arg.trim ().match (/^(.+)__(\d+)$/))
                                                                    var num = (parts && parseInt (parts[2], 10))
                                                                    return _.isFinite (num) ? (num || false) : true })
            var status    = _.times (fn.length, _.constant (false))
            var callbacks = _.times (fn.length, function (i) {
                                                    return function () {
                                                        status[i] =
                                                            _.isNumber (contracts[i]) ?
                                                                ((status[i] || 0) + 1) : true
                                                        if (async && _.isEqual (status, contracts))
                                                            then () } })
            fn.apply (null, callbacks)

            if (!async)   { _.assert (status, contracts)
                if (then) { then () } } },

        assertCalledWithArguments: function (argsPattern, generateCalls) {
                                        return _.assert (_.arr (generateCalls), argsPattern) },

        assertCallOrder: function (fn) {
            var callIndex = 0
            var callbacks = _.times (fn.length, i => function callee () { callee.callIndex = callIndex++ })
            fn.apply (null, callbacks)
            return _.assert (_.pluck (callbacks, 'callIndex'), _.times (callbacks.length, _.identity.arity1)) },

        assertMatches: function (value, ...args) {
            const pattern = args[0]
            try {       return _.assert (_.matches.apply (null, args) (value)) }
            catch (e) { throw _.isAssertionError (e) ? _.extend (e, { notMatching: [value, pattern] }) : e } },

        assertNotMatches: function (value, ...args) {
            const pattern = args[0]
            try {       return _.assert (!_.matches.apply (null, args) (value)) }
            catch (e) { throw _.isAssertionError (e) ? _.extend (e, { notMatching: [value, pattern] }) : e } },

        assertType: function (value, contract) {
            return _.assert (_.decideType (value), contract) },

        assertTypeMatches: function (value, contract) { const mismatches = _.typeMismatches (contract, value)
                                return _.isEmpty (mismatches)
                                    ? true
                                    : _.assertionFailed ({
                                        message: 'provided value type not matches required contract',
                                        asColumns: true,
                                        notMatching: [
                                            { provided: value },
                                            { required: contract },
                                            { mismatches: mismatches }] }) },

        assertFails: function (what) {
            return _.assertThrows.call (this, what, _.isAssertionError) },

        assertThrows: function (what, errorPattern) {
                            var e = undefined, thrown = false
                                try         { what.call (this) }
                                catch (__)  { e = __; thrown = true }

                            _.assert.call (this, thrown)

                            if (arguments.length > 1) {
                                _.assertMatches.call (this, e, errorPattern) } },

        assertNotThrows: function (what) {
            return _.assertEveryCalled (function (ok) { what (); ok () }) },

        fail: function () {
                _.assertionFailed () },

        fails: _.constant (function () {    // higher order version
                _.assertionFailed () }),

        stub: function () {
                _.assertionFailed () } })


    /*  DEFAULT FAILURE IMPL.
        ---------------------
        We do not subclass Error, because _.isTypeOf currently does not support
        inhertitance (UPDATE: now does) and it would cause troubles in test shell
        and logging facility. Thus a subclass is defined that way.
        ======================================================================== */

    _.extend (_, {

        assertionError: function (additionalInfo) {
                            return _.extend (new Error (
                                (additionalInfo && additionalInfo.message) || 'assertion failed'), additionalInfo, { assertion: true }) },

        assertionFailed: function (additionalInfo) {
                            throw _.extend (_.assertionError (additionalInfo), {
                                        stack: (new Error ()).stack.split ('\n').slice (3).join ('\n') }) },

        isAssertionError: function (e) {        
                            return e && (e.assertion === true) } })


    /*  $assert helper
        ======================================================================== */

    _.allEqual = function (values) {
                    return _.reduce (values, function (prevEqual, x) {
                        return prevEqual && _.isEqual (values[0], x) }, true) }

    /*  Publish asserts as $-things (will be replaced by Testosterone.js onwards,
        thus configurable=true)
        ======================================================================== */

    _.each (_.keys (_.assertions), function (name) {
                                        var define = ((_[name].length === 0) ? $global.property : $global.const)
                                        define ('$' + name, _[name], { configurable: true }) })
})




