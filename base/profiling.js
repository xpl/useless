"use strict";

/*  Measures run time of a routine (either sync or async)
    ======================================================================== */

_.measure = function (routine, then) {
    if (then) {                             // async
        var now = _.now ()
        routine (function () {
            then (_.now () - now) }) }
    else {                                  // sync
        var now = _.now ()
        routine ()
        return _.now () - now } }


/*  Measures performance: perfTest (fn || { fn1: .., fn2: ... }, then)
    ======================================================================== */

_.perfTest = function (arg, then) {
    var rounds = 500
    var routines = _.isFunction (arg) ? { test: arg } : arg
    var timings = {}

    _.cps.each (routines, function (fn, name, then) {

        /*  Define test routine (we store and print result, to assure our routine
            won't be throwed away by optimizing JIT)
         */
        var result = []
        var run = function () {
            for (var i = 0; i < rounds; i++) {
                result.push (fn ()) }
            console.log (name, result) }

        /*  Warm-up run, to force JIT work its magic (not sure if 500 rounds is enough)
         */
        run ()

        /*  Measure (after some delay)
         */
        _.delay (function () {
            timings[name] = _.measure (run) / rounds
            then () }, 100) },

        /*  all done
         */
        function () {
            then (timings) }) }
