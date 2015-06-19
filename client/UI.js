/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

UNSORTED UI CODE (SUBJECT TO REFACTORING)

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*  some handy jQuery extensions
    ======================================================================== */

if (jQuery) { (function ($) {

var translateTouchEvent = function (e, desiredTarget) {
    return (e.originalEvent.touches &&
            _.find (e.originalEvent.touches, function (touch) {
                                                return $(touch.target).hasParent (desiredTarget) })) || e }

$.svg = function (tag) {
            return $(document.createElementNS ('http://www.w3.org/2000/svg', tag)) }

$.fn.extend ({
    item: function (value) { /* links controller/data instance to its DOM counterpart */
        if (value) {                                                // setter
            if (this.length) {
                this[0]._item = value }
            return this }
        else {                                                      // getter
            return this.length ? this[0]._item : undefined } },
    
    waitUntil: function (fn, then) { this.addClass ('wait').attr ('disabled', true)
        fn (this.$ (function () {
            this.removeClass ('wait').removeAttr ('disabled')
            if (then) {
                then.apply (null, arguments) } })); return this },

    hasParent: function (el) {
        var parent = this
        while (parent.length > 0) {
            if (parent[0] == (el[0] || el)) {
                return true }
            parent = parent.parent () }
        return false },

    nonemptyValue: function () {
        var value = $.trim (this.val ())
        return (value.length == 0) ? undefined : value },

    intValue: function () {
        var value = parseInt ($(this).nonemptyValue (), 10)
        return isNaN (value) ? undefined : value },

    hitTest: function (event) {
        var offset = this.offset ()
        var pt = {
            x: event.clientX - offset.left,
            y: event.clientY - offset.top }
        return (pt.x >= 0) && (pt.y >= 0) && (pt.x < $(this).width ()) && (pt.y < $(this).height ()) },

    belongsTo: function (selector) {
        return (this.is (selector) || this.parents (selector).length) },

    selectClass: function (key, classes) {
        return this.removeClass (_.values (classes).join (' ')).addClass (classes[key]) },

    integerAttr: function (name) {
        return (this.attr (name) || '').integerValue },

    eachChild: function (selector, fn) {
        _.each (this.children (selector), function (el) { fn ($(el)) }); return this },

    transitionend: function (fn) {
        return this.one ('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', fn) },
        
    animationend: function (fn) {
        return this.one ('animationend webkitAnimationEnd oAnimationEnd oanimation MSAnimationEnd', fn) },
        
    drag: function (cfg) {

        if (!Platform.touch && !window.__globalDragOverlay) {
             window.__globalDragOverlay =
                 $('<div>').css ({
                    display: 'none',
                    position: 'fixed',
                    top: 0, right: 0, bottom: 0, left: 0,
                    zIndex: 999999 }).appendTo (document.body) }

        var overlay = window.__globalDragOverlay
            
        var begin = this.$ (function (initialEvent) { var relativeTo = (cfg.relativeTo || this)
            
            if (Platform.touch || initialEvent.which === 1) { var offset = relativeTo.offset (), memo = undefined
                
                if (!cfg.start || ((memo = cfg.start.call (this, new Vec2 (
                        // position (relative to delegate target)
                        initialEvent.pageX - offset.left,
                        initialEvent.pageY - offset.top), initialEvent)) !== false)) /* one can cancel drag by returning false from 'start' */ {
                    
                    var abort = undefined, unbind = undefined, end = undefined

                    memo = _.clone (memo)

                    var move = this.$ (function (e) {
                        if (Platform.touch || e.which === 1) {
                            e.preventDefault ()
                            var translatedEvent = translateTouchEvent (e, this[0])
                            var offset = relativeTo.offset ()

                            cfg.move.call (this, memo, new Vec2 (
                                // offset (relative to initial event)
                                translatedEvent.pageX - initialEvent.pageX,
                                translatedEvent.pageY - initialEvent.pageY), new Vec2 (
                                // position (relative to delegate target)
                                translatedEvent.pageX - offset.left,
                                translatedEvent.pageY - offset.top),
                                // the event
                                translatedEvent) }
                        else {
                            abort (e) } })

                    unbind = function () { $(overlay || document.body)
                                            .css (overlay ? { display: 'none' } : {})
                                            .off ('mouseup touchend',    end)
                                            .off ('mousemove touchmove', move) }

                    end = this.$ (function (e) { unbind ()
                        if (cfg.end) { var translatedEvent = translateTouchEvent (e, this[0])
                            cfg.end.call (this, memo, new Vec2 (
                                // offset (relative to initial event)
                                translatedEvent.pageX - initialEvent.pageX,
                                translatedEvent.pageY - initialEvent.pageY), translatedEvent) } })

                    abort = this.$ (function (e) { unbind (); end (e) })

                    $(overlay || document.body)
                        .css (overlay ? { display: '', cursor: cfg.cursor || '' } : {})
                        .on ('mousemove touchmove', move)
                        .one ('mouseup touchend', end)

                    if (cfg.callMoveAtStart) {
                        cfg.move.call (this, memo, Vec2.zero, new Vec2 (
                            // position (relative to delegate target)
                            initialEvent.pageX - offset.left,
                            initialEvent.pageY - offset.top),
                            // the event
                            initialEvent) } } } })

        return this.on (Platform.touch ? 'touchstart' : 'mousedown', _.$ (this, function (e) {
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
                e.stopPropagation () } })) },

    selectorItem: function (cfg_) {             var cfg = _.extend ({ detoggleable: true }, cfg_)
        return this.touchClick (function (e) {  var item = $(this)
            
            if ( (e.target === e.delegateTarget) || (
                !(e.target.tagName === 'BUTTON') && !(e.target.tagName === 'A'))) {
                if (cfg.detoggleable) {
                    item.toggleClass ('active') }
                else {
                    item.addClass ('active') }

                if (!cfg.multiByDefault && !(cfg.multi && (e.altKey || e.ctrlKey || e.shiftKey))) {
                    item.siblings ().removeClass ('active')
                    if (item.hasClass ('inner')) { // And cousins too...
                        item.parent ().siblings ().children ().removeClass ('active') } }
                
                if (cfg.multi || cfg.multiByDefault) {
                    cfg.selectionChanged (item.parent ().children ('.active')) }
                else {
                    cfg.selectionChanged (item.hasClass ('active') ? item : $()) }

                e.preventDefault () }

            return false }, { disableTouch: cfg.touchClick ? false : true }) },

    transform: function (cfg) {
        return this.css ('-webkit-transform',
            (cfg.translate ? ('translate(' + cfg.translate.x + 'px,' + cfg.translate.y + 'px) ') : '') +
            (cfg.rotate ? ('rotate(' + cfg.rotate + 'rad) ') : '') +
            (cfg.scale ? ('scale(' + cfg.scale.x + ',' + cfg.scale.y + ')') : '')) },

    disappear: function (fade) {
        if (fade) {
            return this.addClass ('disappear').on ('transitionend', function () {
                $(this).remove () }) }
        else {
            return this.remove () } },

    monitorInput: function (cfg) {
        var change = function () {
            if ($.trim ($(this).val ()) === '') {
                cfg.empty (true) }
            else {
                cfg.empty (false) } }
        return this
            .keyup (change)
            .change (change)
            .focus (_.bind (cfg.focus || _.noop, cfg, true))
            .blur (_.bind (cfg.focus || _.noop, cfg, false)) },

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

    translate: function (pt) {
        return this.attr ('transform', 'translate(' + pt.x + ',' + pt.y + ')') },
    
    transform: function (t) {
        var m = t.components
        return this.attr ('transform', 'matrix(' +
            m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')') },
    
    clientBBox: function () {
        var rect = this[0].getBoundingClientRect ()
        return new BBox (rect.left, rect.top, rect.width, rect.height) } })

}) (jQuery) }