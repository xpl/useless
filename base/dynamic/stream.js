/*  Generic functional primitives for dynamic code binding
    ======================================================================== */

_.tests.stream = {

    'triggerOnce': function () { $assertEveryCalledOnce (function (mkay) {
                                    var t = _.triggerOnce ()
                                    var f = function (_321) { $assert (_321 === 321); mkay () }
                                     t (f)
                                     t (f)
                                     t (321)
                                     t (123) }) },

    'observable': function () {

        /*  Should accept value as constructor, it should be accessible by .value property
         */
        var initedWithValue = _.observable (555)
        $assert (initedWithValue.value, 555)

        /*  Should call with current value when upon binding
         */
        $assertEveryCalledOnce (function (mkay) { var valueChanged = _.observable ()
            valueChanged (999)
            valueChanged (function (_999) { $assert (_999, 999); mkay () }) })

        /*  Should call previously bound callback if changed
         */
        $assertEveryCalled (function (mkay__3) { var valueChanged = _.observable ()
            valueChanged (mkay__3)
            valueChanged (123)
            valueChanged (345)
            valueChanged (567) })

        /*  Should pass last distinct value as argument to callbacks, not calling if its not changed
         */
        $assertEveryCalledOnce (function (mkay) { var valueChanged = _.observable ()
            valueChanged (function (_111) {
                            $assert (111, _111)
                            mkay () })
            valueChanged (111)
            valueChanged (111) })

        /*  Should pass previous value as second argument
         */
        $assertEveryCalledOnce (function (mkay) { var valueChanged = _.observable (444)
            valueChanged (function (_666, _444) { if (_444) { $assert ([_666, _444], [666, 444]); mkay () } })
            valueChanged (666) }) },

    'observable.when': function () {

        $assertEveryCalledOnce (function (mkay) {
            var value = _.observable (234)
                value.when (          234, function () { mkay () }) }) // passing constant should work

        $assertEveryCalledOnce (function (mkay) {
            var value = _.observable ()
                value.when (_.equals (432), function () { mkay () })
                value (432) })

        $assertNotCalled (function (mkay) {
            var value = _.observable ()
                value.when (_.equals (432), function () { mkay () })
                value (7) })

        $assertEveryCalledOnce (function (mkay) {
            var value = _.observable ()
                value.when (_.equals ('bar'), function () { mkay () })
                value ('bar')
                value ('foo')
                value ('bar') }) },

    'once': function () { $assertEveryCalledOnce (function (mkay) {

        var whenSomething = _.trigger ()
            whenSomething.once (mkay)
            whenSomething.once (mkay)
            whenSomething ()
            whenSomething () }) },

    '_.gatherChanges': function () {

        var valueA   = _.observable (),
            valueB   = _.observable (),
            changes  = []

        _.gatherChanges (valueA, valueB, function (a, b) {
            changes.push ([a, b]) })

        valueA (123)
        valueB (777)

        $assert (changes, [[123, undefined], [123, 777]]) },

    'context': function () {
        var trigger = _.extend (_.trigger (), { context: 42 })

        trigger (function () { $assert (this, 42) })
        trigger () },

    '_.off (bound)': function () {  var react = function () { $fail }
                                    var act = _.trigger (react)
        _.off (react)
        act () },

    '_.off (stream)': function () { var fail = function () { $fail }
                                    var act = _.trigger (fail)
        _.off (act)
        act () },

    '_.barrier (defaultListener)': function () {
        $assertEveryCalled (function (mkay) {
             _.barrier (function () { mkay () }) () }) },

    /*  Need to rewrite it for clariy
     */
    'all shit': function () {

        var obj = {
            somethingReady: _.barrier (),
            whenSomething:  _.trigger () }


        /*  Test conventional semantics (1:1 multicast)
         */
        $assertEveryCalled (function (mkay1__2, mkay2__2) {

            obj.whenSomething (mkay1__2)                // that's how you bind
            obj.whenSomething (mkay2__2)

            obj.whenSomething ()                        // that's how you trigger it
            obj.whenSomething ()     })                      


        /*  Test unbinding
         */
        $assertEveryCalledOnce (function (shouldCall) {

            var whenSomething = _.trigger ()

            var shouldBeCalled    = function () { shouldCall () },
                shouldNotBeCalled = function () { $fail }

            whenSomething (shouldBeCalled)
            whenSomething (shouldNotBeCalled)
            whenSomething.off (shouldNotBeCalled) // that's how you unbind specific listeners
            whenSomething () })


        /*  Test 'barrier' semantics + test argument passing
         */
        $assertEveryCalledOnce (function (mkay1, mkay2) {

            obj.somethingReady (function (x) {
                $assert (x === 'foo')               // you may pass arguments to callbacks
                obj.somethingReady (x)              // should not call anything
                mkay1 () })

            obj.somethingReady (function (x) {
                $assert (x === 'foo')
                mkay2 () })

            obj.somethingReady ('foo') })   // that's how you trigger it (may pass arguments)
        obj.somethingReady ('bar')          // should not call anything


        /*  Test _.allTriggered
         */
        var t1 = _.triggerOnce (), t2 = _.triggerOnce (),       // test pair1
            t3 = _.triggerOnce (), t4 = _.triggerOnce ()        // test pair2

        _.allTriggered ([t1, t2], function () { $fail }); t1 ()     // pair1: should not cause _.allTriggered to trigger

        $assertEveryCalledOnce (function (mkay) {
            _.allTriggered ([t3, t4], mkay); t3 (); t4 () })        // pair2: should trigger _.allTriggered
    },

    '_.barrier reset': function () {
        var b = _.barrier ()

        b ('not_42')
        b.reset ()

        $assertEveryCalledOnce (function (mkay) {
            b (function (value) { mkay (); $assert (value, 42) })
            b (42) }) },

    '_.barrier (value)': function () { $assertEveryCalledOnce (function (mkay) {
             var willBe42 = _.barrier (42)
        $assert (willBe42.already)
                 willBe42 (function (_42) { $assert (_42, 42); mkay () }) }) },
}

_.extend (_, {

    gatherChanges: function (observables_) {

        var observables = _.isArray (observables_) ? observables_ : _.initial (arguments)
        var accept      = _.last (arguments)
        var gather      =   function (value) {
                                accept.apply (this, _.pluck (observables, 'value')) }

        _.each (observables, function (read) {
            read (gather) }) },

    allTriggered: function (triggers, then) {
                        var triggered = []
                        if (triggers.length > 0) {
                            _.each (triggers, function (t) {
                                t (function () {
                                    triggered = _.union (triggered, [t])
                                    if (then && (triggered.length === triggers.length)) {
                                        then ()
                                        then = undefined } }) }) }
                        else {
                            then () } },

    observableRef: function (value) {
        return _.extend (_.observable.apply (this, arguments), { trackReference: true }) },

    observable: function (value) {
        var stream = _.stream ({
                        hasValue: arguments.length > 0,
                        value:    value,
                        read:   _.identity,

                        read: function (schedule) {
                                return function (returnResult) {
                                    if (stream.hasValue) {
                                        returnResult.call (this, stream.value) }
                                    schedule.call (this, returnResult) } },

                        write: function (returnResult) {
                                    return function (value) {

                                        if (stream.beforeWrite) {
                                            value = stream.beforeWrite (value) }

                                        if (!stream.hasValue ||
                                            !(stream.trackReference ?
                                                (stream.value === value) :
                                                _.isEqual (stream.value, value))) {

                                            var prevValue = stream.value
                                            var hadValue = stream.hasValue

                                            stream.hasValue = true
                                            stream.value = value

                                            if (hadValue) {
                                                returnResult.call (this, false /* flush */, stream.value, prevValue) }
                                            else {
                                                returnResult.call (this, false /* flush */, stream.value) } } } } })
        if (arguments.length) {
            stream.apply (this, arguments) }

        return _.extend (stream, {

            force: function (value) {
                stream.hasValue = false
                stream (value || stream.value) },
                
            when: function (match, then) { var matchFn = _.isFunction (match) ? match : _.equals (match)
                stream (function (val) {
                    if (matchFn (val)) {
                        stream.off (arguments.callee)
                        then (val) } }) } }) },


    barrier: function (defaultValue) { var defaultListener = undefined

        if (_.isFunction (defaultValue)) {
            defaultListener = defaultValue
            defaultValue = undefined }

        var barrier = _.stream ({
                    already: defaultValue !== undefined,
                    value: defaultValue,

                    reset: function () {
                        barrier.already = false
                        delete barrier.value },

                    write: function (returnResult) {
                                return function (value) {
                                    if (!barrier.already) {
                                        barrier.already = true
                                        barrier.value = value }
                                    
                                    returnResult.call (this, true /* flush schedule */, barrier.value) } },

                    read: function (schedule) {
                                return function (returnResult) {
                                    if (barrier.already) {
                                        returnResult.call (this, barrier.value) }
                                    else {
                                        schedule.call (this, returnResult) } } } })

        if (defaultListener) {
            barrier (defaultListener) }

        return barrier },


    triggerOnce: $restArg (function () {
                var stream = _.stream ({
                                read: function (schedule) {
                                            return function (listener) {
                                                if (stream.queue.indexOf (listener) < 0) {
                                                    schedule.call (this, listener) } } },
                                write: function (writes) {
                                    return writes.partial (true) } }).apply (this, arguments); return stream }),

    trigger: $restArg (function () {
                return _.stream ({
                            read: _.identity,
                            write: function (writes) {
                                return writes.partial (false) } }).apply (this, arguments) }),

    off: function (fn, what) {
        if (fn.queue) {
            if (arguments.length === 1) { fn.queue.off ()     }
            else                        { fn.queue.off (what) } }
        if (fn.queuedBy) {
            _.each (fn.queuedBy, function (queue) { queue.remove (fn) })
             delete fn.queuedBy } },

    stream: function (cfg_) {

                var cfg         = cfg_ || {}
                var queue       = _.extend ([], { off: function (fn) { if (this.length) {
                                                    if (arguments.length === 0) {
                                                        _.each (this, function (fn) {
                                                            fn.queuedBy.remove (this) }, this)
                                                        this.removeAll () }
                                                    else {
                                                        if (fn.queuedBy) {
                                                            fn.queuedBy.remove (this)
                                                            this.remove (fn) } } } } })

                var self = undefined

                var scheduleRead = function (fn) {
                    if (queue.indexOf (fn) < 0) {
                        if (fn.queuedBy) {
                            fn.queuedBy.push (queue) }
                        else {
                            fn.queuedBy = [queue] }
                        queue.push (fn) } }

                var commitPendingReads = function (flush, __args__) {
                    var args        = _.rest (arguments),
                        schedule    = queue.copy,
                        context     = self.context

                    if (flush) {
                        queue.off () }  // resets queue

                    _.each (schedule, function (fn) {
                        if (self.postpones) {
                            fn.postponed.apply (this, args) }
                        else {
                            fn.apply (this, args) } }, context || this) }

                var write = cfg.write (commitPendingReads)
                var read  = cfg.read (scheduleRead)

                /*  I/O API (two-way)
                 */
                var frontEnd  = function (fn) {
                                    if (_.isFunction (fn)) {
                                        read.call (this, fn) }

                                    else {
                                        write.apply (this, arguments) }

                                    return arguments.callee }

                /*  Once semantics
                 */
                var once = function (then) {
                                if (!_.find (queue, function (f) { return f.onceWrapped_ === then })) {
                                    read (_.extend (function (v) { _.off (self, arguments.callee); then (v) }, { onceWrapped_: then })) } }

                /*  Constructor
                 */
                return (self = _.extend ($restArg (frontEnd), cfg, {
                    queue:    queue,
                    once:     once,
                    off:    _.off.asMethod,
                    read:     read,
                    write:    write,
                    postpone: function () { this.postponed.apply (self.context, arguments) } })) } })



