"use strict";

/*  How-to / spec / test
    ============================================================================ */

_.tests['DOMReference + DOMEvents'] = {

    'DOMReference + DOMEvents basics': function () {

        $assertEveryCalled (function (changeCalled, reactToFocusEventsCalled, reactToWindowResizeCalled, domReadyCalled) {

            /*  Example component that owns a DOM reference and listens to events
                ---------------------------------------------------------------- */

            var textarea = new ($component ({

                $traits: [DOMReference,
                          DOMEvents],

            /*  That's how you initialize DOMReference using $barrier (see the big
                comment below for the example on how to access the stored reference,
                and why/when you will need that domReady thing).
                ---------------------------------------------------------------- */

                init: function () { this.domReady (
                                            N.textarea
                                             .insertMeAfter (document.body.lastChild)) },

            /*  That's how you bind to events (simplest way)
                ---------------------------------------------------------------- */

                change: $on (function (e) { changeCalled () }),

            /*  Binding with custom method name
                ---------------------------------------------------------------- */

                shouldNotCall: $on ('input', function () { $fail }),

            /*  Multiple events
                ---------------------------------------------------------------- */

                reactToFocusEvents: $on ('focus blur', function (e) { reactToFocusEventsCalled () }),

            /*  Binding to 'window' or 'document' events
                ---------------------------------------------------------------- */

                reactToWindowResize: $on ({ what: 'resize', target: window }, function () { reactToWindowResizeCalled () }) })) ()


        /*  That's how you access DOM if you're 100% sure it's initialized
            -------------------------------------------------------------------- */

            var dom    = textarea.dom
                $assert (textarea.dom instanceof Node)


        /*  Often you stumble upon a situation when your code tries to access
            something that is not initialized yet (e.g. a DOM tree).

            Even if you 'fix' that by rearranging the call order, you cannot
            always rely on predictable outcome of that method: as components get
            more complex, you need to look forward for more reliable control
            mechanisms... at least, more reliable than shuffling init calls
            randomly to see if it 'solves' the problem.

            Normally, it solved by introducing some well-known concurrent
            programming techniques - like a barrier, in this case. By simply
            encapsulating all unsafe DOM accesses to the barrier context,
            you enforce the expected call order automagically™, paying a
            minuscule runtime overhead for that.
            -------------------------------------------------------------------- */

            textarea.domReady (function (dom) { $assert (dom instanceof Node); domReadyCalled () })


        /*  That's how you dispatch events programmatically
            TODO: configuration
            -------------------------------------------------------------------- */

            textarea.dispatchEvent ('change')
            textarea.dispatchEvent ('blur')

            /*  Dispatch window.resize
             */
                              var e = document.createEvent ('Event')
                                  e.initEvent ('resize', true, true)
            window.dispatchEvent (e)


        /*  That's how you enumerate listeners bound with $on 
            -------------------------------------------------------------------- */

            $assert (textarea.constructor.DOMEventListeners,

                     [{ e: 'change', fn: 'change' },
                      { e: 'input',  fn: 'shouldNotCall' },
                      { e: 'focus',  fn: 'reactToFocusEvents' },
                      { e: 'blur',   fn: 'reactToFocusEvents' },
                      { e: 'resize', fn: 'reactToWindowResize', target: window }])


        /*  Deinitialization semantics
            -------------------------------------------------------------------- */
        
            textarea.destroy ()

            textarea.dispatchEvent ('input')    /*  destroy () removes event listeners, so our .shouldNotCall listener shouldn't get called */
            $assert (!dom.isAttachedToDocument) /*  destroy () removes node from document */
            $assert (textarea.dom, undefined)   /*  destroy () sets .dom to undefined     */ }) },


/*  Listeners defined in traits are bound in order of appearance, so you can
    utilize built-in e.stopImmediatePropagation () semantics for the flow control.
    -------------------------------------------------------------------- */

    'Blocking event propagation in $traits with e.stopImmediatePropagation': function () {

        $assertEveryCalled (function (blockChangeEventCalled) {

            var textarea = new ($component ({

                    $traits: [DOMReference,
                              DOMEvents,
                              $trait ({ blockChangeEvent: $on ('change', function (e) { blockChangeEventCalled (); e.stopImmediatePropagation () }) }),
                              $trait ({ shouldNotCall:    $on ('change', function (e) { $fail }) }) ],

                    init: function () { this.domReady (
                                            N.textarea.insertMeAfter (document.body.lastChild)) } })) ()

                textarea.dispatchEvent ('change')
                textarea.destroy () }) } }


/*  Impl.
    ======================================================================== */

$global.DOMReference = $trait ({

        domReady: $barrier (function (dom) {
                                this.dom = dom

                                if (typeof jQuery !== 'undefined') {
                                    this.el = jQuery (this.dom) } }), // legacy

    afterDestroy: function () {

        if (this.dom) {
            this.dom.removeFromParent ()
            this.dom = undefined
            this.el  = undefined }

        this.domReady.reset () } })

/*  ------------------------------------------------------------------------ */

$global.DOMReferenceWeak = $trait ({
    
    domReady: $barrier (function (dom) { this.dom = dom }),
    afterDestroy:       function ()    { this.dom = undefined } })


/*  ------------------------------------------------------------------------ */

$global.DOMEvents = $trait ({

    /*  TODO: configuration
     */
    dispatchEvent: function (type) {
                        this.domReady (function (dom) { var e = document.createEvent ('Event')
                                                            e.initEvent (type, true /* bubbles */, true /* cancellable */)
                                         dom.dispatchEvent (e) }) },            
    /*  $on syntax
     */
    $macroTags: {

        on: function (def, method, methodName) {        var DOMEventListeners = (def.constructor.DOMEventListeners ||
                                                                                (def.constructor.DOMEventListeners = []))
                var on_def = $on.read (method)
                    on_def = (_.isString (on_def) ? { fn: methodName, e: on_def } :
                             (_.isObject (on_def) ? { fn: methodName, e: on_def.what, target: on_def.target } :
                                                    { fn: methodName, e: methodName }))

                _.each (on_def.e.split (' '), function (e) { DOMEventListeners.push (_.defaults ({ e: e }, on_def)) }) } },

    /*  Bindings
     */
    domReady: function (dom) {
                _.each (this.constructor.DOMEventListeners, function (on_def) { // @hide
                                                                (on_def.target || dom).addEventListener (
                                                                                                on_def.e,
                                                                                           this[on_def.fn]) }, this) },

    beforeDestroy: function () {
        this.domReady (function (dom) {
                _.each (this.constructor.DOMEventListeners, function (on_def) { // @hide
                                                                (on_def.target || dom).removeEventListener (
                                                                                                on_def.e,
                                                                                           this[on_def.fn]) }, this) }) } })

/*  ------------------------------------------------------------------------ */

$global.HideOnEscape = $trait ({

    hideOnEscape: $on ({ what: 'keydown', target: document }, function (e) {
                                                                if (e.keyCode === 27) {
                                                                    this.destroy ()
                                                                    e.preventDefault () } })
})

