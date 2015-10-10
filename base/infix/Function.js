/*  Function extensions
    ======================================================================== */

_.tests.Function = {

    /*  Converts regular function (which returns result) to CPS function (which passes result to 'then')
     */
    'asContinuation': function () { $assertCalls (2, function (mkay) {

        var twoPlusTwo   = function () { return 2 + 2 }
        var shouldBeFour = function (result) {
            $assert (result == 4)
            mkay () }

        twoPlusTwo.asContinuation (shouldBeFour)
        _.asContinuation (twoPlusTwo) (shouldBeFour) }) },

    /*  Postpones execution
     */
    'postpone': function (testDone) {
        $assertCalls (2, function (mkay, done) { var testSecondCall = false
            var callMeLater = function () {
                if (testSecondCall) {
                    mkay ()
                    done ()
                    testDone () }
                else {
                    mkay ()
                    testSecondCall = true
                    callMeLater.postpone () } } // should be postponed again
            callMeLater.postpone ()
            callMeLater.postpone () }) },       // should not trigger double call

    'postponed': function (testDone) {
        $assertCalls (1, function (mkay, done) {
            (function (_42) { $assert (42, _42); mkay (); done (); testDone () }).postponed (42) }) },

    /*  Returns function that executed after _.delay
     */
    'delayed': function (testDone) {
        var eat42           = function (_42, then) { $assert (_42, 42); then () }
        var eat42_after5ms  = eat42.delayed (5)

        $assertCalls (1, function (mkay, done) {
            eat42_after5ms (42, function () { mkay (); done (); testDone () }) }) } }

/*  Impl.
 */
$extensionMethods (Function, {

    bind:           _.bind,
    partial:        _.partial,
    tails:          _.tails,
    tails2:         _.tails2,
    tails3:         _.tails3,
    compose:        _.compose,
    then:           _.then,
    flip:           _.flip,
    flip2:          _.flip2,
    flip3:          _.flip3,
    asFreeFunction: _.asFreeFunction,
    asMethod:       _.asMethod,

    asContinuation: function (f) {
        return $restArg (function () { _.last (arguments) (f.apply (this, _.initial (arguments))) }) },

    wraps: function (f, w) { 
        f._wrapped = _.withSameArgs (f, w); return f },

    wrapped: function (f) {
        return f._wrapped || f },

    original: function (f) {
        while (f && f._wrapped) { f = f._wrapped } return f },

    arity0:         _.arity0,
    arity1:         _.arity1,
    arity2:         _.arity2,
    arity3:         _.arity3,

    or:     _.or,
    and:    _.and,
    not:    _.not,

    applies: _.applies,

    memoized: _.memoize,
    throttled: _.throttle,
    
    debounced: function (func, wait, immediate) {
        
        var timestamp, timeout, result, args, context
        var later = function () {
            var last = Date.now () - timestamp
            if (last < wait && last > 0) {
                timeout = setTimeout (later, wait - last) }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply (context, args)
                    if (!timeout) {
                        context = args = null } } } }

        var debouncedFn = function() {
            context = this
            args = arguments
            timestamp = Date.now()
            var callNow = immediate && !timeout
            if (!timeout) {
                timeout = setTimeout(later, wait) }
            if (callNow) {
                result = func.apply(context, args)
                context = args = null }
            return result }

        debouncedFn.callImmediately = function () { // cancels timeout (set by fn.debounced/fn.throttled) and calls immediately
            if (timeout) {
                clearTimeout (timeout)
                timeout = null }
            func.apply (context, args) }

        return debouncedFn },

    postpone: $method (function (fn) { var args = _.rest (arguments)
        if (!fn._postponed) {
            fn._postponed = true
            _.delay (function () {
                fn._postponed = false
                fn.apply (null, args) }) } }),

    postponed: function (fn) {
        return function () {
            fn.postpone.apply (fn, arguments) } },

    delay: _.delay,
    delayed: function (fn, time) {
        return function () {
            var args = arguments, context = this
            _.delay (function () { fn.apply (context, args) }, time) } } })
