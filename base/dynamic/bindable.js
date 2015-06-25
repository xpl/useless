/*  Interceptable/observable methods
    ======================================================================== */

_.deferTest ('bindable', function () {

    /*  Test subject
     */
    var obj = {
        plusOne: function (x) {
            return x + 1 },

        innocentMethod: function (x) {
            return x } }

    $assertCalls (7, function (mkay) {

        /*  That's how you observe method calls
         */
        _.onBefore (obj, 'plusOne', function (x)            { mkay (); $assert (x === 7) })
        _.onAfter  (obj, 'plusOne', function (x, result)    { mkay (); $assert ([x, result], [7, 8]) })

        $assert (obj.plusOne (7), 8)

        /*  That's how you intercept method calls
         */
        _.intercept (obj, 'innocentMethod', function (x, method) {
            mkay ()
            return method (x + 1) * 2 })

        $assert (obj.innocentMethod (42), (42 + 1) * 2) 

        /*  Consequent interceptors wrap-up previous ones
         */
        _.intercept (obj, 'innocentMethod', function (x, method) {
            mkay ()
            $assert (method (x), (42 + 1) * 2) 
            return 'hard boiled shit' })

        $assert (obj.innocentMethod (42), 'hard boiled shit')

        /*  Test infix calls
         */
        var method = _.bindable (function (x) { mkay (); $assert (x === 42) })
            method.onBefore (function (x) { mkay (); $assert (x === 42) })
            method (42) })

}, function () {

    /*  Internal impl
     */
    var hooks = ['onBefore', 'onAfter', 'intercept']

    var makeBindable = function (obj, targetMethod) { var method = obj[targetMethod]
                            return _.isBindable (method) ? method : (obj[targetMethod] = _.bindable (method)) }

    var hookProc = function (name) { return function (obj, targetMethod, delegate) {
                                        return makeBindable (obj, targetMethod)['_' + name].push (delegate) } }

    var mixin = function (method) {
                    return _.extend ({}, method, { _bindable: true, impl: method, _wrapped: method },

                                /*  .onBefore, .onAfter, .intercept (API methods)
                                 */
                                _.object (_.map (hooks, function (name) {
                                                            return [name, function (fn) {
                                                                            if (!_.isBindable (this)) {
                                                                                throw new Error ('wrong this') }
                                                                            return this['_' + name].push (fn), this }] })),

                                /*  ._onBefore, ._onAfter, ._intercept (queues)
                                 */
                                _.object (_.map (hooks, function (name) {
                                                            return ['_' + name, []] }))) }

    /*  Public API
     */
    _.extend (_, _.objectMap (_.invert (hooks), hookProc.flip2), {

        off: function (obj, targetMethod, delegate) {
                var method = obj[targetMethod]
                if (_.isBindable (method)) {
                    _.each (hooks, function (hook) {
                        method['_' + hook] = _.without (method['_' + hook], delegate) }) } },

        isBindable: function (fn) {
            return (fn && fn._bindable) ? true : false },

        bindable: function (method, context) {
            return _.withSameArgs (method, _.extendWith (mixin (method), function () {      

                var wrapper     = arguments.callee
                var before      = wrapper._onBefore
                var after       = wrapper._onAfter
                var intercept   = wrapper._intercept
                var this_       = context || this

                /*  Call before
                 */
                for (var i = 0, ni = before.length; i < ni; i++) {
                    before[i].apply (this_, arguments) }

                /*  Call intercept
                 */
                var result = _.cps.compose ([method].concat (intercept)).apply (this_, arguments)

                /*  Call after
                 */
                if (after.length) {
                    for (var j = 0, nj = after.length, args = _.asArray (arguments).concat (result); j < nj; j++) {
                        after[j].apply (this_, args) } }

                return result } )) } }) })
