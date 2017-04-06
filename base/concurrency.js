"use strict";

const _ = require ('underscore')

/*  Unit test / documentation / specification / how-to.
    ======================================================================== */

_.tests.concurrency = {

    'scope': function (testDone) { var releases = [],
                                       acquires = [],
                                       count    = 10

        var method = $scope (function (release, id, then) {           acquires.push (id)
                        _.delay (function () { release (function () { releases.push (id)
                                                            if (then)
                                                                then () }) }, 10) })

        method (42, function /* released */ () {
            $assert (count + 1, acquires.length, releases.length)
            $assert (acquires, releases.reversed)
            testDone () })

        _.times (count, function () { method (_.random (1000)) }) },

    'interlocked': function () { var isNowRunning = false

        var op = _.interlocked (function (item, i) { $assert (         !isNowRunning)
                                                                        isNowRunning = true
                    return __.delay (_.random (2)).then (function () { isNowRunning = false }) })

        return __.scatter (_.times (15, String.randomHex), op, { maxConcurrency: 10 }) } }


/*  Mutex/lock (now supports stand-alone operation, and it's re-usable).
 */
$global.Lock = class {

    acquire (then) {
        this.wait (() => {
            if (!this.waitQueue) {
                 this.waitQueue = [] }
            then () }) }

    acquired () {
        return this.waitQueue !== undefined }

    wait (then) {
        if (this.acquired ()) {     
            this.waitQueue.push (then) }
        else {
            then () }}

    release () {
        if (this.waitQueue.length) {
            var queueFirst = this.waitQueue[0]
            this.waitQueue = this.waitQueue.slice (1)
            queueFirst () }
        else
            delete this.waitQueue } }

_.interlocked = function (fn) { var lock = new Lock (),
                                    fn   = $untag (fn)
    return _.extendWith ({
                lock: lock,
                wait: lock.wait.bind (lock) }, function (...args) {
                                                return new Promise (resolve => {
                                                                        lock.acquire (() => {
                                                                            __.then (fn.apply (this, args),
                                                                                     x => { lock.release (); resolve (x) }) }) }) }) }
/*  EXPERIMENTAL (TBD)
 */
$global.$scope = function (fn) { var releaseStack = undefined
                                                    
    return _.argumentPrependingWrapper (Meta.unwrap (fn),

            function /* acquire */ (fn) {

                            var released     = { when: undefined };
                               (releaseStack = (releaseStack || [])).push (released)

                    fn (function /* release */ (then) { if (released.when) throw new Error ('$scope: release called twice')
                                                            released.when = then
                        while (releaseStack &&
                               releaseStack.last &&
                               releaseStack.last.when) { var trigger =  releaseStack.last.when
                                                                   if ((releaseStack = _.initial (releaseStack)).isEmpty) {
                                                                        releaseStack = undefined }
                                                             trigger () } }) }) }
