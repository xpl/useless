"use strict";

var is = function (tag) { return function () { return this.tagName === tag } }

/*  Constructors
    ======================================================================== */

/*  N (tag)                                                                  */

    $global.N = function (tag, children) {
                    var n = document.createElement (tag.uppercase)
                        return children ? n.append (children) : n }

/*  N.text                                                                   */

    N.text = function (text) {
                return document.createTextNode (text) }

/*  N.span / N.div ...                                                       */

    _.each (['br', 'p', 'div', 'em', 'a', 'b', 'i', 'u', 's', 'strong', 'span',
             'sup', 'sub', 'button', 'iframe', 'pre', 'img', 'video', 'source',
             'h1', 'h2', 'h3', 'h4', 'h5', 'textarea', 'input', 'style'],

             function (tag) {

                var TAG = tag.uppercase

                _.defineProperty (N, tag, function () {
                                            return document.createElement (TAG) }) })


/*  Querying                                                                 */

    N.all = document.querySelectorAll.bind (document)
    N.one = document.querySelector.bind (document)


/*  Node+
    ======================================================================== */

    $mixin (Node, {

        $: $prototype.impl.$,    // brings this.$ semantics from $prototype

        
    /*  Various predicates
        ------------------

        New $callableAsFreeFunction tag means that its subject will be available
        as context-free (static) version along with instance method. For example,
        following two calls are equivalent:

            console.log (document.body.isLinebreak)
            console.log (Node.isLinebreak (document.body))

        Having dual calling convention for common predicates is super useful, as
        you can use them in functional data-crunching expressions, where free
        functions are far more suitable than instance methods.

        It was inspired by $extensionMethods from Useless, where it carries the
        exact same semantics for member definitions. Those definitions served
        a very limited purpose of merging Underscore functions to built-in types,
        so a more generic tool needed.
        
        ======================================================================== */

        $callableAsFreeFunction: {

            $property: {

                isElement: function () { return (this.nodeType === Node.ELEMENT_NODE) },
                isText:    function () { return (this.nodeType === Node.TEXT_NODE) },

                isLinebreak: is ('BR'),
                isDiv:       is ('DIV'),
                isParagraph: is ('P'),
                isHyperlink: is ('A'),

                isAttachedToDocument: function () {
                    return this.matchUpwards (_.equals (document.body)) ? true : false },

                /*  TODO: make use of native .isContentEditable
                 */
                forbidsEditing: function () {
                    return (this.nodeType === Node.ELEMENT_NODE) &&
                           (this.getAttribute ('contenteditable') === 'false') } } },


    /*  Up/outside means
        ======================================================================== */

        grandParentNode: $property (function () { return this.parentNode && this.parentNode.parentNode }),

        isFirstInParent: $property (function () { return this.parentNode && (this.parentNode.firstChild === this) }),
        isLastInParent:  $property (function () { return this.parentNode && (this.parentNode.lastChild  === this) }),

        removeFromParent: $callableAsFreeFunction (function () { this.parentNode.removeChild (this); return this }),

        outerLeftBoundaryIn: function (container) { var n = this
            while (n.grandParentNode && (n.parentNode !== container) && n.isFirstInParent) { n = n.parentNode }
            return n },

        outerRightBoundaryIn: function (container) { var n = this
            while (n.grandParentNode && (n.parentNode !== container) && n.isLastInParent) { n = n.parentNode }
            return n },

        matchUpwards: function (x) { const pred = (typeof x === 'function') ? x : (n => n.matches && n.matches (x))

                                        var n = this
                   while (n && !pred (n)) { n = n.parentNode }
                                     return n },

        isLeftmostNodeIn: function (parent) {
                             return parent && ((this.matchUpwards (function (n) {
                                                                     return (n === parent) ||
                                                                            !n.isFirstInParent })) === parent) },

        isRightmostNodeIn: function (parent) {
                             return parent && ((this.matchUpwards (function (n) {
                                                                     return (n === parent) ||
                                                                            !n.isLastInParent })) === parent) },

    /*  Down/inside means
        ======================================================================== */

        hasChildren: $property (function () { return   this.hasChildNodes () }),
        noChildren:  $property (function () { return !(this.hasChildNodes ()) }),
        numChildren: $property (function () { return   this.childNodes.length }),

        length: $property (function () { return (this.childNodes ? this.childNodes.length :
                                                (this.nodeValue  ? this.nodeValue .length  : 0)) }),

        /*  If you modify childNodes while iterating it, you'll get into problem.
            Use following method to safely do so.
         */
        safeEnumChildren: function (fn, context) {
                                _.each (this.childNodesArray, fn, context || this); return this },

        /*  childNodes is not really an array, so to get Array instance, use this helper
         */
        childNodesArray: $property (function () {
                                        return _.asArray (this.childNodes) }),

        add:    $alias ('appendChildren'),
        append: $alias ('appendChildren'),

        addClass (cls) {
            this.classList.add (cls)
            return this
        },

        appendHTML (html) {
            return this.appendChildren (N.div.html (html).childNodesArray)
        },

        appendChildren: function (arg1, arg2) {
                            for (var arr = (arg2 === undefined ? _.coerceToArray (arg1) : arguments), i = 0, len = arr.length; i < len; i++) {
                                var n = arr[i]
                                this.appendChild (_.isString (n) ? document.createTextNode (n) : n) }
                            return this },

        removeChildren: function (nodes) {
                            for (var arr = _.coerceToArray (nodes), i = 0, len = arr.length; i < len; i++) {
                                this.removeChild (arr[i]) }
                            return this },

        removeAllChildren: function () {
                                return this.removeChildren (this.childNodesArray) },

        walkTree: function (cfg, accept) { accept = (arguments.length === 1) ? cfg : accept

                    let node
                    let walker = document.createTreeWalker (this,   (cfg && cfg.what) || NodeFilter.SHOW_ALL,
                                                                    (cfg && cfg.filter) || null,
                                                                    (cfg && cfg.entityReferenceExpansion) || null)

                    while ((node = walker.nextNode ())) { accept (node) } },

        firstInnermostChild: $callableAsMethod ($property (function (n) { while (n && n.firstChild) { n = n.firstChild } return n })),

        /*  foo<b>123</b>bar    →   <b>.unwrapChildren  →   foo123bar
         */
        unwrapChildren: $callableAsFreeFunction (function () {      this.insertAfterMe (this.childNodesArray)
                                                       var parent = this.parentNode
                                                           parent.removeChild (this)
                                                    return parent }),

    /*  Sideways means
        ======================================================================== */

        prevSiblings: $property (function ()  { var r = [],     n = this.previousSibling
                                    while (n) {     r.push (n); n =    n.previousSibling } return r.reversed }),

        nextNextSibling: $property (function () {
            return (this.nextSibling && this.nextSibling.nextSibling) }),

        nextOutermostSibling: $callableAsMethod ($property (function ( n) {
                                                                while (n && !n.nextSibling) { n = n.parentNode  } // walk upwards until has next sibling
                                                                   if (n)                   { n = n.nextSibling } // take next sibling
                                                                return n })),

        nextInnermostSibling: $callableAsMethod ($property (function (n) {
                                                                return Node.firstInnermostChild (
                                                                        Node.nextOutermostSibling (this)) })),

        appendTo: function (ref) {
            ref.appendChild (this); return this },

        prependTo: function (ref) {
            ref.insertBefore (this, ref.firstChild); return this },

        replaceWith: function (what) { this.insertBeforeMe (what).removeFromParent () },

        insertMeBefore: function (ref) {
            ref.parentNode.insertBefore (this, ref); return this },

        insertMeAfter: function (ref) {
            ref.parentNode.insertBefore (this, ref.nextSibling); return this },

        insertBeforeMe: function (nodes) { var parent = this.parentNode
                                           var me     = this

            _.each (_.coerceToArray (nodes).reversed, function (n) { parent.insertBefore (n, me) }); return this },

        insertAfterMe: function (nodes) { var parent = this.parentNode
                                          var next   = this.nextSibling

            _.each (_.coerceToArray (nodes).reversed, function (n) { parent.insertBefore (n, next) }); return this },


    /*  Events
        ======================================================================== */

        on (event, fn) { this.addEventListener (event, fn); return this },

        once (event) {
            
            const p = new Channel () // use Channel instead of Promise because Channel is synchronous, while Promise's "then" is called on next event loop iteration
            
            this.addEventListener (event, p.resolve = p.resolve.bind (p))

            p.finally (() => this.removeEventListener (event, p.resolve))

            return p
        },

        touched (fn) {
            return this.on ($platform.touch ? 'touchstart' : 'click', fn) },

    /*  Properties
        ======================================================================== */

        extend: function (props) { return _.extend (this, props) },


    /*  Attributes
        ======================================================================== */

        cls: function (x) { this.className = x; return this },
        css: function (x) { _.extend (this.style, x); return this; },

        hasClass: function (x) { return this.classList ? this.classList.contains (x) : false },

        toggleAttr: function (name, value) { var arg1 = arguments.length < 2

                        if (arg1) {
                            value = !this.hasAttribute (name) }

                            if (value) { this.setAttribute    (name, value) }
                                else { this.removeAttribute (name) }

                        return arg1 ? value : this },

        toggleAttrs:   function (cfg) { _.map (cfg, _.flip2 (this.toggleAttr),   this); return this },
        setAttributes: function (cfg) { _.map (cfg, _.flip2 (this.setAttribute), this); return this },

        intAttribute: function (name) { return (this.getAttribute (name) || '').parsedInt },

        attr (a, b) {
            if (typeof a === 'string') {
                this.setAttribute (a, b)
                return this
            } else {
                return this.setAttributes (a)
            }
        },

        removeAttr: function (name) { this.removeAttribute (name); return this },

        copyAttributes (node) {
            for (var i = 0, attrs = node.attributes, n = attrs.length; i < n; i++) {
                var a = attrs[i]
                this.setAttribute (a.name, a.value)
            }
            return this
        },


    /*  Splitting
        ======================================================================== */

        splitSubtreeBefore: function (node) { // returns right (remaining) subtree
            if (!node || (node.parentNode === this)) {
                return node }
            else {
                return this.splitSubtreeBefore (
                                    !node.previousSibling // if first node in parent, nothing to split – simply proceed to parent
                                        ? node.parentNode
                                        : document.createElement  (node.parentNode.tagName)
                                                  .copyAttributes (node.parentNode)
                                                  .insertMeBefore (node.parentNode)
                                                  .appendChildren (node.prevSiblings)
                                                  .nextSibling) } },

        splitSubtreeAt: function (location) { var n = location.node, i = location.offset
            return (i > 0) ? (location.node.isText ?
                                this.splitSubtreeBefore (N.text (n.nodeValue.substr (i)).insertMeAfter (_.extend (n, { nodeValue: n.nodeValue.substr (0, i) }))) :
                                this.splitSubtreeBefore (n.childNodes[i])) :
                                this.splitSubtreeBefore (n) },


    /*  innerHTML/innerText
        ======================================================================== */

        html: function (x) { this.innerHTML = x; return this },
        text: function (x) { this.innerText = x; return this },


    /*  Animation
        ======================================================================== */

        attributeUntil: function (attr, promise) {
                                                                     this.   setAttribute (attr, true)
                      return promise.done (this.$ (function (e, x) { this.removeAttribute (attr) })) },

        busyUntil: function (promise) { return this.attributeUntil ('busy', promise) },

        onceAnimationEnd: $property (function () {
            return this.once ($platform.WebKit ? 'webkitAnimationEnd' : 'animationend') }),

        onceTransitionEnd: $property (function () {
            return this.once ($platform.WebKit ? 'webkitTransitionEnd' : 'transitionend') }),

        animateWithAttribute: function (attr) {

        /*  If already animating with this attribute — return previously allocated promise    */

            if (this.hasAttribute (attr) && this._onceAnimationEnd) {
                return this._onceAnimationEnd }

        /*  If already animating — finalize the existing promise */

            if (this._onceAnimationEnd) {
                this._onceAnimationEnd.resolve () }

        /*  Allocate new promise    */

            this.setAttribute (attr, true)

            this._onceAnimationEnd = this.onceAnimationEnd

            return this._onceAnimationEnd.then (this.$ (function () {
                    this.removeAttribute (attr)
                    this.getBoundingClientRect () // forces layout recalc, otherwise new animation (if set in callback) may not start
                    this._onceAnimationEnd = undefined })) },

        animatedWithAttribute: function (attr) {
                                    this.animateWithAttribute (attr); return this },

        //transitionWithAttribute: function (attr) { this.setAttribute (attr, true)
        //     return this.onceTransitionEnd.then ( this.removeAttribute.bind (this, attr)).delay () }
    })


/*  ========================================================================= */

    $mixin (Element, {

    /*  Selectors   */

        all: Element.prototype.querySelectorAll,
        one: Element.prototype.querySelector,


    /*  New Safari (as seen in technology preview) defines its own Element.append
        method, which gets into conflict with our previously-defined Node.append
        So will explicitly overrride it.    */

        append: Node.prototype.append,

    /*  Chrome Canary defines .replaceWith on Element...   */

        replaceWith: Node.prototype.replaceWith,


    /*  Metrics
        ======================================================================== */

        clientBBox: $property (function () { return BBox.fromLTWH (this.getBoundingClientRect ()) }),
              bbox: $property (function () { return this.clientBBox.offset (document.bbox.leftTop) }),

        setWidthHeight: function (v) {
                            this.style.width = v.x + 'px'
                            this.style.height = v.y + 'px'
                            return this },

        setTransform: function (x) { this.transform = x; return this },

        transform: $property ({

            get: function () {
                    var components = (this.css ('transform') || '').match (/^matrix\((.+\))$/)
                    if (components) {
                        var m = components[1].split (',').map (parseFloat)
                        return new Transform ({ a: m[0], b: m[1], c: m[2], d: m[3], e: m[4], f: m[5] }) }
                    else {
                        return Transform.identity } },

            /*  Example value: { translate: new Vec2 (a, b),  scale: new Vec2 (x, y), rotate: 180 }
             */
            set: function (cfg) {
                this.style.transform = (_.isStrictlyObject (cfg) && (
                                            (cfg.translate ? ('translate(' + cfg.translate.x.toFixed (0) + 'px,' + cfg.translate.y.toFixed (0) + 'px) ') : '') +
                                            (cfg.rotate ? ('rotate(' + cfg.rotate + 'rad) ') : '') +
                                            (cfg.scale ? ('scale(' + (new Vec2 (cfg.scale).separatedWith (',')) + ')') : ''))) || '' } }),

    /*  Experimental FRP stuff
        ======================================================================== */

        reads: function (stream, fn) { // DEPRECATED
                    stream (this.$ (function (x) { x = (fn || _.identity).call (this, x)
                        this.removeAllChildren ()
                        this.add (x instanceof Node ? x : (x + '')) }))
                    return this },

        $toggleAttr: function (name, value) {
                                value (this.$ (function (value) { this.toggleAttr (name, value) })); return this },

        $add: function (nodes) { // TODO: make it default .add impl (but keep .appendChildren intact)

                if (nodes instanceof Promise) {
                    var placeholder = document.createElement ('PROMISE')
                        this.appendChild (placeholder)
                        nodes.then (function (nodes) {
                            placeholder.replaceWith (nodes) }).panic }
                else {
                    this.add (nodes) }

                return this },

        $mouseEntered: $property (function () {

            if (!this._mouseEntered) {
                 
                 this._mouseEntered = _.observable (false)
                 this._mouseEntered.context = this

                 this.on ('mouseenter', () => { this._mouseEntered (true) })
                 this.on ('mouseleave', () => { this._mouseEntered (false) })
             }

            return this._mouseEntered
        })
    })

/*  ========================================================================= */

    $mixin (HTMLInputElement, {

        $value: $property (function () {

                            if (!this._observableValue) {
                                 this._observableValue = _.observable (this.value)
                                 this._observableValue.context = this
                                 this.on ('input', this.$ (function () {
                                     this._observableValue (this.value) })) }

                            return this._observableValue })

    })

/*  ========================================================================= */

    $mixin (Image, {
        
        fetch: $static (function (url) {
                            return new Promise (function (resolve, reject) {
                                                _.extend (new Image (), {
                                                                src: url,
                                                             onload: function ()  { resolve (this) },
                                                            onerror: function (e) { reject (e) } }) }) }) })


/*  document.clientBBox
    ======================================================================== */

    _.defineProperties (document, {

                            bbox: function () {
                                    return this.clientBBox.offset (Vec2.xy (window.pageXOffset, window.pageYOffset)) },
                                    
                            clientBBox: function () {
                                            return BBox.fromLTWH (0, 0,
                                                            window.innerWidth  || document.documentElement.clientWidth,
                                                            window.innerHeight || document.documentElement.clientHeight) } })

/*  document.ready
    ======================================================================== */

    document.ready = _.barrier ()
    document.on ('DOMContentLoaded', function () {

        try { document.ready () }
        catch (e) { _.delay (() => { throw e }) } // rethrow after some delay, to let devtools load itself beforehand
    })

/*  ------------------------------------------------------------------------ */

_.tests.NodePlus = {

    'tree splitting': function () {

        Testosterone.defineAssertions ({
            assertSplitAtBr: function (html, desiredResult) {   var node = N.div.html (html)
                                                                    node.splitSubtreeBefore (node.one ('br'))
                                                                    return _.assert (node.innerHTML, desiredResult) } })
        
        $assertSplitAtBr ('<b><br>foo</b>', '<b><br>foo</b>')
        $assertSplitAtBr ('<b color="red">foo<br></b>', '<b color="red">foo</b><b color="red"><br></b>')
        $assertSplitAtBr ('<b>foo<i>bar<br>baz</i>qux</b>', '<b>foo<i>bar</i></b>' + '<b><i><br>baz</i>qux</b>')
    },

    /*'animateWithAttribute': function () {

        var style =

            N.style.text (
                '@keyframes slide-to-right {' +
                    '0%   { transform: translate(0,0); opacity: 1; }' +
                    '100% { transform: translate(100%,0); opacity: 0; } }' +

                '[slide-to-right] { animation: slide-to-right 1s ease-in-out; }' +
                '[slide-from-right] { animation: slide-to-right 1s ease-in-out; animation-direction: reverse; }'

            ).appendTo (document.body)

        var div =
            N.div.css ({
                position: 'fixed', left: '0px', top: '0px', width: '100px', height: '100px', background: 'red' }).appendTo (document.body)

        div.animateWithAttribute ('slide-to-right').then (function () {
            div.style.background = 'blue'
            div.animateWithAttribute ('slide-from-right').then (function () {
                div.style.background = 'green' }) })
    }*/

}

/*  ------------------------------------------------------------------------ */







