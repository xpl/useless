"use strict";

const _ = require ('underscore')

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
                value (432)
                value (234) })

        $assertNotCalled (function (mkay) {
            var value = _.observable ()
                value.when (_.equals (432), function () { mkay () })
                value (7) }) },

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

    },

    'call order consistency': function (done) {

        var abc = ''
        var put = function (x) { return _.barrier (function () { abc += x }) }
        var a = put ('a'),
            b = put ('b'),
            c = put ('c')

        var barr = _.barrier ()
            barr (a) (function () { barr.postpones = true; barr (c); barr.postpones = false }) (b) // C is bound after B, so it should be executed after B
            barr (true)

        _.allTriggered ([a,b,c], function () { $assert (abc, 'abc'); done () })
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

    'observable.item': function () {

        var items = _.observable ({ foo: 7, bar: 8 })
        var foo = items.item ('foo')
        var bar = items.item ('bar')

        $assert (foo, items.item ('foo')) // should be same cached observable
        $assert (foo.value, 7)
        $assert (bar.value, 8)

        foo (77)

        $assert (foo.value, 77)
        $assert (items.value, { foo: 77, bar: 8 })

        items ({ bar: 88 })

        $assert (foo.value, undefined)
        $assert (bar.value, 88)
        $assert (items.value, { bar: 88 })
    },

    'postpone works with _.trigger (regression)': function (done) {

        _.trigger (done).postpone ()
    }
}

_.extend (_, {

    gatherChanges: function (...args) {

        var observables = _.isArray (args[0]) ? args[0] : _.initial (args)
        var accept      = _.last (args)
        var gather      =   function (value) {
                                accept.apply (this, _.pluck (observables, 'value')) }

        _.each (observables, function (read) {
            read (gather) }) },

    allTriggered (triggers, then /* deprecated */) {

        return Promise.all (triggers.map (t => t.promise)).then (then)
    },

    observableRef: function (...args) {
        return _.extend (_.observable.apply (this, args), { trackReference: true }) },

    observable: function (...args) { const value = args[0]
        var stream = _.stream ({

                        isObservable: true,
                        hasValue:     args.length > 0,
                        value:      _.isFunction (value) ? undefined : value,

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

        if (args.length) {
            stream.apply (this, args) }

        return _.extend (stream, {

            force: function (value) {
                stream.hasValue = false
                stream (arguments.length ? value : stream.value) },

            then: function (fn) {
                        var next = _.observable ()
                            next.beforeWrite = fn
                        stream (function (x) { next.write (x) })
                        return next },

            toggle: function () {
                        return stream (!stream.value) },

            tie: function (other) {

                stream (other)
                 other (stream)

                return stream },

            item: function (id) {

                var all = stream.itemObservables || (stream.itemObservables = {})
                var item = all[id]
                if (!item) { item = all[id] = _.observable ((stream.value && stream.value)[id])

                    item (function (x) {
                        var oldValue = (stream.value && stream.value[x])
                        if (oldValue !== x) {
                            (stream.value || (stream.value = {}))[id] = x
                            stream.force () } })

                    stream (function (items) {
                        item.write (items[id]) }) }

                return item
            },

            when: function (match, then) { var matchFn       = _.isFunction (match) ? match : _.equals (match),
                                               alreadyCalled = false
                stream (function callee (...args) {
                    if (matchFn (args[0])) {
                        if (!alreadyCalled) {
                             alreadyCalled = true
                             stream.off (callee)
                             then.apply (this, args) }
                        else { 
                            /* log.w ('WTF') */ } } }) } }) },


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
                                        ((barrier.postpones || barrier.commitingReads) ? // solves problem outlined in 'call order consistency' test
                                            returnResult.postponed :
                                            returnResult).call (this, barrier.value) }
                                    else {
                                        schedule.call (this, returnResult) } } } })

        if (defaultListener) {
            barrier (defaultListener) }

        return barrier },


    triggerOnce: $restArg (function (...args) {
                var stream = _.stream ({
                                read: function (schedule) {
                                            return function (listener) {
                                                if (stream.queue.indexOf (listener) < 0) {
                                                    schedule.call (this, listener) } } },
                                write: function (writes) {
                                    return writes.partial (true) } }).apply (this, args); return stream }),

    trigger: $restArg (function (...args) {
                return _.stream ({
                            read: _.identity,
                            write: function (writes) {
                                return writes.partial (false) } }).apply (this, args) }),

    off: function (...args) { const fn = args[0], what = args[1]

        if (fn.queue) {
            if (args.length === 1) { fn.queue.off ()     }
            else                   { fn.queue.off (what) } }
        if (fn.queuedBy) {
            _.each (fn.queuedBy, function (queue) { queue.remove (fn) })
             delete fn.queuedBy } },

    stream: function (cfg_) {

                var cfg         = cfg_ || {}
                var queue       = _.extend ([], { off: function (...args) { const fn = args[0]

                                                    if (this.length) {
                                                        if (args.length === 0) {
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

                var commitPendingReads = function (flush, ...args) {
                    var context     = self.context || this,
                        schedule    = queue.copy

                    if (flush) {
                        queue.off () }

                    self.commitingReads = true

                    for (var i = 0, n = schedule.length; i < n; i++) {
                        (self.postpones ? schedule[i].postponed : schedule[i]).apply (context, args) }

                    delete self.commitingReads }

                var write = cfg.write (commitPendingReads)
                var read  = cfg.read (scheduleRead)

                /*  I/O API (two-way)
                 */
                var frontEnd  = function (...args) { const fn = args[0]

                                    if (_.isFunction (fn)) {
                                        read.call (this, fn) }

                                    else {
                                        write.apply (this, args) }

                                    return frontEnd }

                /*  Once semantics
                 */
                var once = function (then) {
                                if (!_.find (queue, function (f) { return f.onceWrapped_ === then })) {
                                    read (_.extend (function callee (v) { _.off (self, callee); then (v) }, { onceWrapped_: then })) } }

                /*  Constructor
                 */
                self = _.extend ($restArg (frontEnd), cfg, {
                    queue:    queue,
                    once:     once,
                    off:    _.off.asMethod,
                    read:     read,
                    write:    write,
                    postpone (...args) { self.postponed.apply (self.context, args) },

                })

                _.defineProperty (self, 'promise', () => new Promise (resolve => self (resolve)))

                return self
            }
        })


/*  Observable.map (experimental)
    ======================================================================== */

_.deferTest (['stream', 'observable.map'], function () {

/*  General semantics   */

    var foo = _.observable ('foo'),
        bar = _.observable ('bar')

    var fooBar = _.observable.map ([foo, bar], _.appends ('42'))

    var results = []

    fooBar (function (value) {
        results.push (value.copy) })

    $assert (results, [['foo42', 'bar42']])

    foo ('qux')
    bar ('zap')

    $assert (results, [['foo42', 'bar42'],
                       ['qux42', 'bar42'],
                       ['qux42', 'zap42']])


/*  Works over objects  */

    _.observable.map ({ 'foo': _.observable ('bar') }) (function (obj) {
                                                            $assert ({ 'foo': 'bar' }, obj) })

}, function () {

    _.observable.map = function (obj, fn) { fn = fn || _.identity

        var value = _.isArray (obj) ? new Array (obj.length) : {}
        var result = _.observable (value)

        _.each (obj, function (read, i) {
                        read (function (x) {
                                value[i] = fn (x, i); result.force (value) }) })

        return result
    }

    _.observable.all = _.observable.map

})


