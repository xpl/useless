/*  Concurrency primitives
 */

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
Lock = $prototype ({
    acquire: function (then) {
        this.wait (this.$ (function () {
            if (!this.waitQueue) {
                 this.waitQueue = [] }
            then () })) },

    acquired: function () {
        return this.waitQueue !== undefined },

    wait: function (then) {
        if (this.acquired ()) {     
            this.waitQueue.push (then) }
        else {
            then () }},

    release: function () {
        if (this.waitQueue.length) {
            var queueFirst = _.first (this.waitQueue)
            this.waitQueue = _.rest (this.waitQueue)
            queueFirst () }
        else
            delete this.waitQueue } })

_.interlocked = function (fn) { var lock = new Lock (),
                                    fn   = $untag (fn)
    return _.extendWith ({
                lock: lock,
                wait: lock.$ (lock.wait) }, function () { var this_ = this,
                                                              args_ = arguments;
                                                return new Promise (function (resolve) {
                                                                        lock.acquire (function () {
                                                                                        __.then (fn.apply (this_, args_),
                                                                                            function (x) {
                                                                                                lock.release (); resolve (x) }) }) }) }) }
/*  EXPERIMENTAL (TBD)
 */
$global.$scope = function (fn) { var releaseStack = undefined
                                                    
    return _.argumentPrependingWrapper (Tags.unwrap (fn),

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

if ($platform.NodeJS) {
    module.exports = _ }