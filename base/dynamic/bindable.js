/*  Interceptable/observable methods
    ======================================================================== */


/*  TODO: rewrite test
 */
_.deferTest ('bindable', function () {

    /*  Test subject
     */
    var obj = {
        plusOne: function (x) {
            return x + 1 },

        innocentMethod: function (x) {
            return x } }

    $assertEveryCalled (function (before__1, after__1, intercept__2, secondIntercept__1, bindable__1, infixBefore__1) {

        /*  That's how you observe method calls
         */
        _.onBefore (obj, 'plusOne', function (x)            { before__1 (); $assert (x === 7) })
        _.onAfter  (obj, 'plusOne', function (x, result)    { after__1 (); $assert ([x, result], [7, 8]) })

        $assert (obj.plusOne (7), 8)

        /*  That's how you intercept method calls
         */
        _.intercept (obj, 'innocentMethod', function (x, method) {
            intercept__2 ()
            return method (x + 1) * 2 })

        $assert (obj.innocentMethod (42), (42 + 1) * 2) 

        /*  Consequent interceptors wrap-up previous ones
         */
        _.intercept (obj, 'innocentMethod', function (x, method) {
            secondIntercept__1 ()
            $assert (method (x), (42 + 1) * 2) 
            return 'hard boiled shit' })

        $assert (obj.innocentMethod (42), 'hard boiled shit')

        /*  Test infix calls
         */
        var method = _.bindable (function (x) { bindable__1 (); $assert (x === 42) })
            method.onBefore (function (x) { infixBefore__1 (); $assert (x === 42) })
            method (42) })

    /*  Test 'once' semantics
     */
    var obj2 = { plusOne: function (x) { return x + 1 } }

    $assertEveryCalledOnce (function (beforeCalled, afterCalled) {

        var before = function (x) { beforeCalled (); $assert (x === 7) }
        var after  = function (x, result) { afterCalled ();  $assert ([x, result], [7, 8]) }

        _.times (2, function () {
            _.onceBefore (obj, 'plusOne', before)
            _.onceAfter  (obj, 'plusOne', after) })

        $assert (obj.plusOne (7), 8)
        $assert (obj.plusOne (7), 8) })

}, function () {

    /*  Internal impl
     */
    var hooks      = ['onceBefore', 'onceAfter', 'onBefore', 'onAfter', 'intercept']
    var hooksShort = ['onceBefore', 'onceAfter', 'before', 'after', '']

    var copyHooks = function (from, to) {
        _.extend (to, _.map2 (_.pick (from, hooks), _.clone)) }

    var makeBindable = function (obj, targetMethod) { var method = obj[targetMethod]
                            return _.isBindable (method) ? method : (obj[targetMethod] = _.bindable (method)) }

    var hookProc = function (name) {
                        return function (obj, targetMethod, delegate) {
                               var bindable = makeBindable (obj, targetMethod)
                            return bindable[name].call (bindable, delegate) } }

    var mixin = function (method, context) { if (typeof method !== 'function') { throw new Error ('method should be a function') }

                    return _.extend ({}, method, { _bindable: true, impl: method, _wrapped: method, context: context },

                                /*  .onBefore, .onAfter, .intercept (API methods)
                                 */
                                _.object (_.map (hooks, function (name) { var queueName = ('_' + name)
                                                                          var once      = (name.indexOf ('once') >= 0)

                                                            return [name, function (fn) {
                                                                            if (!_.isBindable (this)) {
                                                                                throw new Error ('wrong this') }

                                                                            var queue = this[queueName]
                                                                            if (!once || queue.indexOf (fn) < 0) {
                                                                                this[queueName].push (fn) }

                                                                            return this }] })),

                                /*  ._onBefore, ._onAfter, ._intercept (queues)
                                 */
                                _.object (_.map (hooks, function (name) {
                                                            return ['_' + name, []] }))) }

    /*  Public API
     */
    _.extend (_, _.mapObject (_.invert (hooks), hookProc.flip2), {

        unbind: function (obj, targetMethod, delegate) {
                var method = obj[targetMethod]
                if (_.isBindable (method)) {
                    _.each (hooks, function (hook) {
                        method['_' + hook] = _.without (method['_' + hook], delegate) }) } },

        isBindable: function (fn) {
            return (fn && fn._bindable) ? true : false },

        bindable: _.extendWith ({ hooks: hooks, hooksShort: hooksShort }, function (method, context) {
            return _.withSameArgs (method, _.extendWith (mixin (method, context), function () {   

                var wrapper     = arguments.callee
                var onceBefore  = wrapper._onceBefore
                var onceAfter   = wrapper._onceAfter
                var before      = wrapper._onBefore
                var after       = wrapper._onAfter
                var intercept   = wrapper._intercept
                var this_       = context || this
                var i, ni       = undefined

                /*  Call onceBefore
                 */
                if (onceBefore.length) {
                    for (i = 0, ni = onceBefore.length; i < ni; i++) {
                        onceBefore[i].apply (this_, arguments) }
                    onceBefore.removeAll () }

                /*  Call before
                 */
                for (i = 0, ni = before.length; i < ni; i++) {
                    before[i].apply (this_, arguments) }

                /*  Call intercept
                 */
                var result = (intercept.length ? _.cps.compose ([method].concat (intercept)) : method).apply (this_, arguments)

                if (after.length || onceAfter.length) { var args = _.asArray (arguments).concat (result)

                    /*  Call after
                     */
                    for (i = 0, ni = after.length; i < ni; i++) {
                        after[i].apply (this_, args) }

                    /*  Call onceAfter
                     */
                    if (onceAfter.length) {
                        for (i = 0, ni = onceAfter.length; i < ni; i++) {
                            onceAfter[i].apply (this_, args) }
                        onceAfter.removeAll () } }

                return result } )) }) }) })
