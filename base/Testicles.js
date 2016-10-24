"use strict";

const _ = require ('underscore')

var bullet = require ('string.bullet')

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

A new version of Testosterone.js (SKETCH)

1. Greatly simplified
2. Takes advantage of Androgene.js superpowers (for promise debugging)

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_.tests['Testicles'] = { // run "node test2 Testicles" to see output

    'assert': () => {

    /*  Single argument syntax: should strictly equal to true   */

        assert (false)

    /*  Asserts always execute asynchronously. So a failed assert wont stop execution.
        Here's deep comparison between objects:                                         */

        assert ({ foo: { bar: 'baz' } }, { foo: { bar: 'qux' } })

    /*  It accepts promises as arguments and returns promise:   */

        assert (assert (Promise.resolve (2 + 2), 4), true)
    },
    
    'assertThrows': () => {
        assertThrows (() => { throw 123 })
        assertThrows (assert (2 + 2, 5), { message: 'arguments do not match' })
    }
}

var printDiff = args => {

                    var cases  = _.map (args, log.impl.stringify.arity1.then (bullet.$ ('• ')))
                    var common = _.reduce2 (cases, _.longestCommonSubstring) || ''

                    if ((cases.length < 2) || (common.length < 4)) {
                        common = undefined }

                    _.each (cases, function (what) {

                            if (common) {                                  var where  = what.indexOf (common)
                                log.write ( log.color.orange,  what.substr (0, where),
                                            log.color.dark,    common,
                                            log.color.orange,  what.substr (where + common.length)) }

                            else {
                                log.orange (what) } })

                    log.newline () }

$global.assert = function () {
                    return __.all (arguments).then (args => {

                        if ( (args.length === 0) ||
                            ((args.length === 1) && (args[0] !== true)) ||
                            ((args.length   > 1) && (_.allEqual (args) !== true))) {

                                printDiff (args)
                                throw new Error ('arguments do not match') }

                        else {
                            return true } }) }

$global.assertThrows = function (what, errorPattern) { var hasErrorPattern = (arguments.length > 1)
                            return __(what)
                                        .then (() => { throw new Error ('not thrown when expected') })
                                        .catch (e => { if (hasErrorPattern && !_.match (e, errorPattern)) {
                                                        printDiff ([e, errorPattern])
                                                        throw new Error ('error pattern do not match') } }) }

$global.Testicles = cfg_ => {

    var cfg = _.defaults ({}, cfg_, {

        parallel: false,
        context: null,
        filter: () => true,
    })

/*  Gather tests    */

    var tests = _.arr (emit =>
                    _.each (_.tests, (tests, suiteName) => {
                        _.each2 (tests, (fn, name) => {
                            emit ({ suiteName: suiteName, name: name, fn: fn.$ (cfg.context) }) }) }))

/*  Filter tests    */

    tests = _.filter (tests, cfg.filter)

/*  Run     */

    return __.each (tests, (test, i) => {

        var result = new AndrogenePromise (resolve => {

            if (!test.fn.length) {
                resolve (test.fn ()) } // @hide

            else {
                test.fn (resolve) }
        })

        return result.delay (10) // TEMPORARY (FOR MOCKING PURPOSES)
                     .disarmAndrogene ()
                     .finally ((e, x) => {
                        if (result.processContext.root.numEvents.all > 0) {

                            log (log.color.blue,
                                '\n' + log.boldLine,
                                '\n' + test.suiteName.quote ('[]'), log.color.boldBlue, ' ' + test.name + ' ', log.color.blue,
                                (i + ' of ' + tests.length).quote ('()'),
                                log.color.boldRed, (e ? ' FAILED' : ''), '\n')

                            result.processContext.root.printEvents ({ verbose: e ? true : false })
                        }
                     })
    })


}