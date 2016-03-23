/*  Concurrency primitives
 */

/*  Unit test / documentation / specification / how-to.
    ======================================================================== */

_.tests.concurrency = {

    'mapReduce': function (testDone) {

        var data = _.times (42, Format.randomHexString)
        var numItems = 0

        /*  Keep in mind that mapReduce is not linear! It does not guaranteee sequential order of execution,
            it allows out-of-order, and it happens. Of course, you can set maxConcurrency=1, but what's the
            point? For sequential processing, use _.enumerate, as it's way more simple.

            maxConcurrency forbids execution of more than N tasks at once (useful when you have depend on
            limited system resources, e.g. a number of simultaneously open connections / file system handles.

            By default it's equal to array's length, meaning *everything* will be triggered at once. This
            behavior was chosen to force utility user to make decision on it's value, cuz no 'common value'
            exists to be the default one.

            Also, it does not share standard 'reduce' semantics. Reduce operator from FP is known to be
            linear and referentially transparent, and that's neither feasible nor sensible if you need
            to parallelize your tasks. So it's memo is a shared state object/array that is kept until
            execution ends, which you can use as execution context (to not explicitly specify one externally).
         */
        _.mapReduce (data, {
            maxConcurrency: 10,
            memo: {                                 // memo is optional
                processedItems: [],
                skippedItems: [] },

            next: function (item, itemIndex, then, skip, memo) {
                numItems++
                $assert (!_.find (memo.processedItems, item))
                $assert (!_.find (memo.skippedItems, item))

                if (_.random (7) === 0) {
                    memo.skippedItems.push (item)
                    skip () }                       // for short circuiting (not delegating execution to some
                                                    // scheduled utility) use skip (otherwise, a call stack
                                                    // overrun may occur)
                else {
                    _.delay (function () {
                    memo.processedItems.push (item)
                    then () }, _.random (10)) }},   // simulate job

            complete: function (memo) {
                $assert ((memo.processedItems.length + memo.skippedItems.length), data.length)
                testDone () } }) },


    'asyncJoin': function (testDone) {
        var tasksDone = []

        _.asyncJoin ([
            function (done) { _.delay (function () { tasksDone[0] = true; done () }, _.random (20)) },
            function (done) { _.delay (function () { tasksDone[1] = true; done () }, _.random (20)) },
            function (done) { _.delay (function () { tasksDone[2] = true; done () }, _.random (20)) } ],
            function (/* complete */) {
                $assert (_.filter (tasksDone, _.identity).length === 3)
                testDone () }) },

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

    'interlocked': function (testDone) { var isNowRunning = false
        _.mapReduce (_.times (30, Format.randomHexString), {
                complete: testDone,
                maxConcurrency: 10,
                next: _.interlocked (function (releaseLock, item, itemIndex, then, skip, memo) { $assert (!isNowRunning)
                                        isNowRunning = true
                                        _.delay (function () {
                                            then (); isNowRunning = false; releaseLock (); }, _.random (10)) }) }) } }


/*  Actual impl
    ======================================================================== */

_.enumerate = _.cps.each

_.mapReduce = function (array, cfg) {
    
    var cursor = 0
    var complete = false
    var length = (array && array.length) || 0
    var maxPoolSize = cfg.maxConcurrency || length
    var poolSize = 0
    var memo = cfg.memo

    if (length === 0) {
        cfg.complete (cfg.memo || array) }

    else { var fetch = function () {
            while ((cursor < length) && (poolSize < maxPoolSize)) {
                poolSize += 1
                cfg.next (
                    /* item */  array[cursor],
                    /* index */ cursor++,
                    /* done */  function () {
                                    poolSize--
                                    if (!complete) {
                                        if (cursor >= length) {
                                            if (poolSize === 0) {
                                                setTimeout (function () { cfg.complete (cfg.memo || array) }, 0)
                                                complete = true }}
                                            else {
                                                fetch () }} },

                    /* skip */  function () { poolSize-- },
                    /* memo */  memo) }

            if (!complete && (cursor >= length) && (poolSize == 0)) {
                cfg.complete (cfg.memo || array) }}

        fetch () }}


_.asyncJoin = function (functions, complete, context) {
    _.mapReduce (functions, {
        complete: complete.bind (context),
        next: function (fn, i, next, skip) {
            fn.call (context, next, skip) } }) }


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

   
/*  Adds _.interlocked(fn) utility that wraps passed function into lock. Unfortunately,
    it cannot be released automagically © at the moment, because _.interlocked does
    not know how to bind to your chains of continuations, and no general mechanism
    exist. Should look into Promise concept (as its now core JS feature)...

    'Release' trigger passed as last argument to your target function.
 */
_.interlocked = function (fn) { var lock = new Lock ()
    return _.extendWith ({ wait: lock.$ (lock.wait) },
        _.argumentPrependingWrapper (Tags.unwrap (fn),
                                        function (fn) {
                                            lock.acquire (function () {
                                                fn (lock.$ (lock.release)) }) })) }


/*  EXPERIMENTAL (TBD)
 */
_.defineKeyword ('scope', function (fn) { var releaseStack = undefined
                                                    
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
                                                             trigger () } }) }) })

if (Platform.NodeJS) {
    module.exports = _ }