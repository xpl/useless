/*  Some handy jQuery extensions
    ======================================================================== */

if (jQuery) { (function ($) {

/*  We override some jQuery methods, so store previous impl. here
 */
var __previousMethods__ = _.clone ($.fn)

/*  Global functions
 */
_.extend ($, {

    /*  Instantiates svg elements
     */
    svg: function (tag) {
            return $(document.createElementNS ('http://www.w3.org/2000/svg', tag)) } })

/*  Element methods
 */
.fn.extend ({

    /*  Provides auto-unbinding of $component $listeners from DOM events upon destroy
     */
    on: function (what, method) { var el = this, method = _.find (arguments, _.isFunction)

            /*  See useless/base/dynamic/stream.js for that queue/queuedBy interface.
             */
            if (method.queuedBy) {
                method.queuedBy.push ({ remove: function () { el.off (what, method) } }) }

            /*  Call original impl.
             */
            return __previousMethods__.on.apply (this, arguments) },

    /*  Links a data (or controller instance) to its DOM counterpart
     */
    item: function (value) {
        if (value) {                                                // setter
            if (this.length) {
                this[0]._item = value }
            return this }
        else {                                                      // getter
            return this.length ? this[0]._item : undefined } },

    /*  Writes properties directly to DOM object
     */
    extend: function (what) {
        _.extend.apply (null, [this[0]].concat (arguments))
        return this },
    
    extend2: function (what) {
        _.extend2.apply (null, [this[0]].concat (arguments))
        return this },

    /*  Wait semantics
     */
    hasWait: function () {
        return this.hasClass ('i-am-busy') },

    waitUntil: function (fn, then) { this.addClass ('i-am-busy').attr ('disabled', true)
        fn (this.$ (function () {
            this.removeClass ('i-am-busy').removeAttr ('disabled')
            if (then) {
                then.apply (null, arguments) } })); return this },

    /*  Checks if has parent upwards the hierarchy
     */
    hasParent: function (el) {
        var parent = this
        while (parent.length > 0) {
            if (parent[0] == (el[0] || el)) {
                return true }
            parent = parent.parent () }
        return false },

    /*  Returns a value or undefined (coercing empty values to undefined)
     */
    nonemptyValue: function () {
        var value = $.trim (this.val ())
        return (value.length == 0) ? undefined : value },

    /*  Returns a valid integer value or undefined (coercing NaN to undefined)
     */
    intValue: function () {
        var value = parseInt (this.nonemptyValue (), 10)
        return isNaN (value) ? undefined : value },

    /*  Checks if a mouse/touch event occured within element bounds
     */
    hitTest: function (event) {
        var offset = this.offset ()
        var pt = {
            x: event.clientX - offset.left,
            y: event.clientY - offset.top }
        return (pt.x >= 0) && (pt.y >= 0) && (pt.x < $(this).width ()) && (pt.y < $(this).height ()) },

    /*  Returns multiple attributes as object of { attr1: value, attr2: value, .. } form
     */
    attrs: function (/* name1, name2, ... */) {
        return _.object (_.map (arguments, function (name) { return [name, this.attr (name)] }, this)) },

    /*  Checks if any element upwards the hierarchy (including this element) conforms to a selector
     */
    belongsTo: function (selector) {
        return (this.is (selector) || this.parents (selector).length) },

    /*  Selects which classes element should have, based on a key selector

        Example: btn.selectClass (state, {  loading: 'btn-wait btn-disabled',
                                            error: 'btn-invalid',
                                            ok: '' })
     */
    selectClass: function (key, classes) {
        return this.removeClass (_.values (classes).join (' ')).addClass (classes[key]) },

    /*  Returns a valid integer of an attribute (or undefined)
     */
    attrInt: function (name) { return (this.attr (name) || '').integerValue },
    cssInt:  function (name) { return (this.css  (name) || '').integerValue },

    /*  Enumerates children, returning each child as jQuery object (a handy thing that default .each lacks)
     */
    eachChild: function (selector, fn) {
        _.each (this.find (selector), function (el) { fn ($(el)) }); return this },

    /*  Calls fn when current CSS transition ends
     */
    transitionend: function (fn) {
        return this.one ('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', fn.oneShot) },
    
    /*  Calls fn when current CSS animation ends
     */
    animationend: function (fn) {
        return this.one ('animationend webkitAnimationEnd oAnimationEnd oanimation MSAnimationEnd', fn.oneShot) },

    /*  1. Adds a class (that brings CSS animation)
        2. Waits until CSS animation done
        3. Removes that class
        4. Calls 'done'
     */
    animateWith: function (cls, done) { 
        this.addClass (cls)
        this.animationend (this.$ (function () { this.removeClass (cls)
                                                 if (done) { done.call (this) } }))
        return this },

    /*  Powerful drag & drop abstraction, perfectly compatible with touch devices. Documentation pending.

        Simplest example:

            $(handle).drag ({
                start: function ()             { return this.leftTop () },                          // returns 'memo'
                move:  function (memo, offset) { this.css (memo.add (offset).asLeftTop) } }) })
     */
    drag: (function () {

        /*  Helper routine
         */
        var translateTouchEvent = function (e, desiredTarget) {
            return (e.originalEvent.touches &&
                    _.find (e.originalEvent.touches, function (touch) {
                                                        return $(touch.target).hasParent (desiredTarget) })) || e }
        /*  Impl
         */
        return function (cfg) {

            if (!Platform.touch && !window.__globalDragOverlay) {
                 window.__globalDragOverlay =
                     $('<div>').css ({
                        display: 'none',
                        position: 'fixed',
                        top: 0, right: 0, bottom: 0, left: 0,
                        zIndex: 999999 }).appendTo (document.body) }

            var overlay = window.__globalDragOverlay
            var button  = cfg.button || 1
                
            var begin = this.$ (function (initialEvent) { var relativeTo = (cfg.relativeTo || this)

                this.addClass (cfg.cls || '')
                
                if (Platform.touch || initialEvent.which === button) { var offset = relativeTo.offset (), memo = undefined
                    
                    if (!cfg.start || ((memo = cfg.start.call (cfg.context || this, new Vec2 (
                            // position (relative to delegate target)
                            initialEvent.pageX - offset.left,
                            initialEvent.pageY - offset.top), initialEvent)) !== false)) /* one can cancel drag by returning false from 'start' */ {
                        
                        var abort = undefined, unbind = undefined, end = undefined

                        memo = _.clone (memo)

                        var move = this.$ (function (e) {
                            if (Platform.touch || e.which === button) {
                                e.preventDefault ()
                                var translatedEvent = translateTouchEvent (e, this[0])
                                var offset = relativeTo.offset ()

                                memo = cfg.move.call (cfg.context || this, memo, new Vec2 (
                                    // offset (relative to initial event)
                                    translatedEvent.pageX - initialEvent.pageX,
                                    translatedEvent.pageY - initialEvent.pageY), new Vec2 (
                                    // position (relative to delegate target)
                                    translatedEvent.pageX - offset.left,
                                    translatedEvent.pageY - offset.top),
                                    // the event
                                    translatedEvent) || memo }
                            else {
                                abort (e) } })

                        unbind = function () { $(overlay || document.body)
                                                .css (overlay ? { display: 'none' } : {})
                                                .off ('mouseup touchend',    end)
                                                .off ('mousemove touchmove', move) }

                        end = this.$ (function (e) { unbind ()
                            
                            if (cfg.end) { var translatedEvent = translateTouchEvent (e, this[0])
                                cfg.end.call (cfg.context || this, memo, new Vec2 (
                                    // offset (relative to initial event)
                                    translatedEvent.pageX - initialEvent.pageX,
                                    translatedEvent.pageY - initialEvent.pageY), translatedEvent) }

                            this.removeClass (cfg.cls || '') })

                        abort = this.$ (function (e) { unbind (); end (e) })

                        $(overlay || document.body)
                            .css (overlay ? { display: '', cursor: cfg.cursor || '' } : {})
                            .on ('mousemove touchmove', move)
                            .one ('mouseup touchend', end)

                        if (cfg.callMoveAtStart) {
                            cfg.move.call (cfg.context || this, memo, Vec2.zero, new Vec2 (
                                // position (relative to delegate target)
                                initialEvent.pageX - offset.left,
                                initialEvent.pageY - offset.top),
                                // the event
                                initialEvent) } } } })

            var touchstartListener = _.$ (this, function (e) {
                var where = _.extend ({}, translateTouchEvent (e, this[0])) /* copy event, cuz on iPad it's re-used by browser */
                if (Platform.touch && cfg.longPress) {
                    var cancel = undefined
                    var timeout = window.setTimeout (_.$ (this, function () {
                        this.off ('touchmove touchend', cancel)
                        begin (where) }), 300)
                    cancel = this.$ (function () {
                        window.clearTimeout (timeout)
                        this.off ('touchmove touchend', cancel) })
                    this.one ('touchmove touchend', cancel) }
                else {
                    begin (where)
                    e.preventDefault ()
                    e.stopPropagation () } })

            this.on (Platform.touch ? 'touchstart' : 'mousedown', touchstartListener)

            return _.extend (this, {
                        cancel: this.$ (function () {
                            this.off (Platform.touch ? 'touchstart' : 'mousedown', touchstartListener) }) }) } }) (),

    /*  $(el).transform ({
                translate: new Vec2 (a, b),
                scale:     new Vec2 (x, y),
                rotate:    180 })
     */
    transform: function (cfg) {
        if (arguments.length === 0) { var components = (this.css ('transform') || '').match (/^matrix\((.+\))$/)
            if (components) {
                var m = components[1].split (',').map (parseFloat)
                return new Transform ({ a: m[0], b: m[1], c: m[2], d: m[3], e: m[4], f: m[5] }) }
            else {
                return Transform.identity } }
        else {
            return this.css ('transform', (_.isStrictlyObject (cfg) && (
                (cfg.translate ? ('translate(' + cfg.translate.x + 'px,' + cfg.translate.y + 'px) ') : '') +
                (cfg.rotate ? ('rotate(' + cfg.rotate + 'rad) ') : '') +
                (cfg.scale ? ('scale(' + (new Vec2 (cfg.scale).separatedWith (',')) + ')') : ''))) || '') } },

    /*  Other transform helpers
     */
    svgTranslate: function (pt) {
        return this.attr ('transform', 'translate(' + pt.x + ',' + pt.y + ')') },
    
    svgTransformMatrix: function (t) {
        var m = t.components
        return this.attr ('transform', 'matrix(' +
            m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')') },

    svgTransformToElement: function (el) {
        return Transform.svgMatrix (this[0].getTransformToElement (el[0])) },

    svgBBox: function (bbox) {
        if (arguments.length === 0) { return new BBox (this[0].getBBox ()) }
                               else { return this.attr (bbox.xywh) } },

    /*  To determine display size of an element
     */
    outerExtent:    function () { return new Vec2 (this.outerWidth (), this.outerHeight ()) },
    extent:         function () { return new Vec2 (this.width (),      this.height ()) },
    innerExtent:    function () { return new Vec2 (this.innerWidth (), this.innerHeight ()) },

    /*  BBox accessors
     */
    outerBBox:      function () { return BBox.fromLTWH (_.extend (this.offset (), this.outerExtent ().asWidthHeight)) },
    clientBBox:     function () { return BBox.fromLTWH (this[0].getBoundingClientRect ()) },

    /*  Position accessors
     */
    leftTop:        function () { return new Vec2.fromLT (this.offset ()) },
    offsetInParent: function () { return Vec2.fromLeftTop (this.offset ()).sub (
                                         Vec2.fromLeftTop (this.parent ().offset ())) },

    /*  $(input).monitorInput ({
                    empty: function (yes) { ... },    // called when empty state changes
                    focus: function (yes) { ... } })  // called when focus state changes
     */
    monitorInput: function (cfg) {
        var change = function () {
            if ($.trim ($(this).val ()) === '') { cfg.empty (true) }
            else                                { cfg.empty (false) } }
        return this
            .keyup (change)
            .change (change)
            .focus (_.bind (cfg.focus || _.noop, cfg, true))
            .blur (_.bind (cfg.focus || _.noop, cfg, false)) },

    /*  Use instead of .click for more responsive clicking on touch devices.
        Reverts to .click on desktop
     */
    touchClick: function (fn, cfg) {
        var self = this
        cfg = cfg || {}
        if (!cfg.disableTouch && Platform.touch) { // touch experience
            var touchstartHandler = function (e) {
                fn.apply (this, arguments)
                e.preventDefault () // prevents nasty delayed click-focus effect on iOS
                return false }

            var clickHandler = function (e) {
                e.preventDefault ()
                return false }

            if (cfg.handler) {
                cfg.handler ({
                    unbind: function () {
                        self.off ('touchstart', touchstartHandler).off ('click', clickHandler) } }) }

            return this.on ('touchstart', touchstartHandler).on ('click', clickHandler) }

        else { // mouse experience
            if (cfg.handler) {
                cfg.handler ({
                    unbind: function () {
                        self.off ('click', fn) } }) }
            return this.click (fn) } },

    /*  Use instead of .dblclick for responsive doubleclick on touch devices
        Reverts to .dblclick on desktop
     */
    touchDoubleclick: function (fn) {
        if (Platform.touch) {
            var lastTime = Date.now ()
            return this.on ('touchend', function () {
                var now = Date.now ()
                if ((now - lastTime) < 200) {
                    fn.apply (this, arguments) }
                lastTime = now }) }
        else {
            return this.dblclick (fn) } },

    /*  Taken from stackoverflow discussion on how to prevent zoom-on-double-tap behavior on iOS
     */
    nodoubletapzoom: function () {
        return $(this).bind ('touchstart', function preventZoom (e) {
            var t2 = e.timeStamp
            var t1 = $(this).data ('lastTouch') || t2
            var dt = t2 - t1
            var fingers = e.originalEvent.touches.length
            $(this).data ('lastTouch', t2)
            if (!dt || dt > 500 || fingers > 1) {
                return } // not double-tap
            e.preventDefault ()                     // double tap - prevent the zoom
            $(e.target).trigger ('click') }) }      // also synthesize click events we just swallowed up
    })

}) (jQuery) }