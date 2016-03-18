/*  ======================================================================== */

$mixin (Node, {

    /*  A helper for positioning nodes

        NB: we use 'prev' instead of 'next' (which would be more natural,
            requiring twice less code in the set accessor) to exclude media
            placeholder from appearing in Wyg history. This is kind of
            hack, but it works, not affecting overall semantics.
     */
    treeLocation: $property ({
        get: function () { return { parent: this.parentNode, prev: this.previousSibling } },
        set: function (where) {
                   if (where.prev) { where.parent.insertBefore (this, where.prev.nextSibling) }
                              else { where.parent.insertBefore (this, where.parent.firstChild) } } }),

    /*  Filters jQuery-generated random elements. Google for 'expando' and 'sizzle'
        for the details on subject.
     */
    isJQuerySizzleGarbage: $property (function () {
        return this.id && (this.id.indexOf ('sizzle') === 0) }) })

/*  ======================================================================== */

DOMObserver = $component ({

    $traits: [//Testosterone.ValidatesRecursion,
              //Testosterone.LogsMethodCalls,
              DOMReferenceWeak,
              DOMEvents],

/*  Test (TODO: make it more explicit/readable)
    ======================================================================== */

    $test: function () {

            var h = []

            var div = Node.div.insertMeAfter (document.body.lastChild)
                div.toggleAttribute ('contenteditable', true)

            var obs = new DOMObserver ({
                                target: div,
                                changed: function (node, change) { h.push ([node, change.what]) }})

                div.innerHTML = '<p>1234</p><p>56789</p>'
                var p1 = div.firstChild,
                    p2 = div.lastChild

                Range.current = Range.make ({ startContainer: p1.firstChild, startOffset: 2,
                                                endContainer: p2.firstChild,   endOffset: 3 })

                document.execCommand ('delete', false, null)

                /*$assert (_.filter (h, function (e) { return (e[0] === p1) || (e[0] === p2) }),
                    [[p1, 'insert'],
                     [p2, 'insert'],
                     [p2, 'remove']])*/

                div.innerHTML = '<p>123</p>'
                               var _123 = div.firstChild.firstChild

                var textChanged = [] 
                obs.textChanged (function (n, was) { textChanged.push ([was, n.nodeValue]) })

                    _123.nodeValue = 'foo'
                    _123.nodeValue = 'bar'
                    _123.nodeValue = 'baz'

                    $assert (textChanged, [['123',  'foo'],
                                                   ['foo',  'bar'],
                                                           ['bar', 'baz']])

            obs.destroy ()
            div.removeFromParent () },

/*  Public API
    ======================================================================== */

    $defaults: {
        target:   undefined,
        filter: _.constant (true) },

    changed:        $trigger (),
    inserted:       $trigger (),
    removed:        $trigger (),
    attrChanged:    $trigger (),
    textChanged:    $trigger (),

    doWith: $static (function (cfg, actions) { var obs = new DOMObserver (cfg)
                                    actions ();    obs.destroy () }),

/*  Links observed Node instances with DOMObserver context
    ======================================================================== */

    allocId: $static (function () {
        return arguments.callee.counterValue =
              (arguments.callee.counterValue || 0) + 1 }),

    nodeContext: function (n) {      var prop = 'DOMObserverContext_' + this.id
                                return (n && (n[prop] || (n[prop] = {}))) || {} },

/*  ======================================================================== */

    init: function () { var self = this

        this.id = DOMObserver.allocId ()

        /*  Add garbage filtering to event listeners
         */
        _.each (this.constructor.DOMEventListeners, function (eventNames, methodName) {
            var fn = self[methodName]
                     self[methodName] = function (e) { if (self.shouldObserve (e.target)) { fn.call (self, e) } } })

        this.domReady (this.target || document) },

    shouldObserve: function (n) { return !n.isJQuerySizzleGarbage && this.filter (n) },

/*  DOMNodeInserted workaround. The bug (WebKit):
        
        1. When inserting <p><a>123</a></p>, it reports only <p>
        2. When removing <p>, it removes its children too (<a> from <p>, and 123 from <a>)
        3. It results to unability to restore previous state when un-doing #2

    Fix: manually call inserted() on sub nodes
    ======================================================================== */

    DOMNodeInserted: $log ($green ($on (function (e) { this.insertedWithSubtree (e.target) }))),

    insertedWithSubtree: $allowsRecursion (function (n) { if (this.shouldObserve (n)) {

         var nodeContext = this.nodeContext (n)

        if (!nodeContext.prevLocation ||
            (nodeContext.prevLocation.parent !== n.parentNode) ||
            (nodeContext.prevLocation.prev   !== n.previousSibling)) {

                     var parentContext = this.nodeContext (nodeContext.prevLocation &&
                                                           nodeContext.prevLocation.parent)

                    /*  Call DOMNodeRemoved to virtually 'remove' from previous location first if node
                        was relocated. This is kind of ambiguous, but required for the correct overall semantics.
                     */
                    if ((parentContext.prevChildren || []).contains (n)) {
                         parentContext.prevChildren.remove (n)

                        this.DOMNodeRemoved ({  emulated:   true,
                                                relocating: true,
                                                target: n,
                                                prevValue: nodeContext.prevLocation }) }

                    /*  The bug (WebKit):   Sometimes it calls DOMNodeInserted in wrong order, so that prevSibling points to
                                            a node that is not reported with DOMNodeInserted yet. You can reproduce this
                                            by simply calling execCommand ('insertLinebreak') at the middle of a text node.

                                     Fix:   Manually report with inserted() on prevSibling.
                     */
                    if (n.previousSibling) {
                        this.insertedWithSubtree (n.previousSibling) }

                    this.changed   (n, { what: 'insert' })
                    this.inserted  (n)

                    nodeContext.prevLocation = n.treeLocation
                    nodeContext.prevCharData = n.nodeValue
            _.each (nodeContext.prevChildren = n.childNodesArray, this.insertedWithSubtree) }

        else { /*log.d (n, '- already inserted')*/ } } }),

/*  DOMNodeRemoved emulation. The bug (WebKit):

        1.  It does not always report with DOMNodeRemoved when it removes
            nodes from parent. It occurs not only when removing subtrees,
            so cannot fix it like DOMNodeInserted was fixed.

        2.  Upon node removal, it deletes even the character data (but
            fails to report on that).

    Fix: It seems like at least DOMSubtreeModified is called properly.
         So manually detect removal with the help of it. Detect character
         data change on removal.
    ======================================================================== */

    DOMSubtreeModified: $on ($log (function (e) { this.checkIfChildrenRemoved (e.target) })),

    checkIfChildrenRemoved: $allowsRecursion (function (parent) { if (this.shouldObserve (parent)) {

                        var parentContext = this.nodeContext (parent)
        for (var children = parentContext.prevChildren || [],   i = children.lastIndex;
                                                                i >= 0;
                                                                i--) { // reversed enum to guarantee
            var child        = children[i]                             // right insertion/removal order
            var childContext = this.nodeContext (child)                // in history, so that prevSibling
                                                                       // always points to already inserted node
            if (this.shouldObserve (child) &&
                                    child.parentNode !== parent) {
                
                if ((childContext.prevCharData !== undefined) &&
                    (childContext.prevCharData !== child.nodeValue)) {
                    this.DOMCharacterDataModified ({
                        emulated:   true,
                        target:     child,
                        prevValue:  childContext.prevCharData }) }

                this.checkIfChildrenRemoved (child)

                this.DOMNodeRemoved ({
                        emulated:   true,
                        target:     child,
                        prevValue:  { parent: parent, prev: children[i - 1] || null } }) } }

        parentContext.prevChildren = parent.childNodesArray
        parentContext.inserted     = false } }),

    DOMNodeRemoved: $log ($red (function (e) { // emulated (hence not bound with $on)

        this.changed (e.target, { what: 'remove', was: e.prevValue,   relocating: e.relocating })
        this.removed (e.target,                        e.prevValue, { relocating: e.relocating }) })),
    
/*  ======================================================================== */

    DOMCharacterDataModified: $log ($orange ($on (function (e) {

        var n = e.target, was = (e.prevValue === 'null' ? null : e.prevValue)

        this.nodeContext (n).prevCharData = n.nodeValue
        this.changed     (n, { what: 'text', was:   was })
        this.textChanged (n,                        was) })))

/*  ======================================================================== */

})





