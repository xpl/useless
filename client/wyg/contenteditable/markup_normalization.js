/*  Helpers
    ======================================================================== */

$mixin (Node, {
    excessLinebreak: $static ($property (function () {
        return _.extend (Node.linebreak, { isExcessLinebreak: true }) })) })

/*  
    If it looks as paragraph on screen, it should be <p>
    If it looks as linebreak on screen, it should be <br>
    ======================================================================== */


ContentEditable_MarkupNormalization = $trait ({
    

/*  Tests
    ======================================================================== */

    $tests: (function () {

        var br = '<br>'
        var toyDOM = function (x) {
            return _.isStrictlyObject (x) ? _.map (x, function (value, tag) {
                return  _.isArray (x) ? toyDOM (value) :
                    (tag.quote ('<>') + toyDOM (value) + tag.quote ('</>')) }).join ('') : x }

        var Compo = undefined
        var withTestHTML = function (html, doThings) {

            Compo = Compo || $component ({

                $traits: [
                    Testosterone.ValidatesRecursion,
                    Testosterone.LogsMethodCalls,
                    DOMReference,
                    DOMEvents,
                    ContentEditable_ExecCommand,
                    ContentEditable_MarkupNormalization],

                $defaults: {
                    allowedTags: { 'b': {}, 'em': {} } },

                init: function () {
                       
                        this.dom = _.extend (
                            Node.div
                                .toggleAttribute ('contenteditable', true)
                                .insertMeAfter (document.body.lastChild), { innerHTML: this.html })

                        if (window.wygTestInstanceCreated) {
                            window.wygTestInstanceCreated (this) }

                        this.domReady (this.dom)
                        this.normalizeMarkup ()
                        CaretPosition.reset () } })

                  var ed = new Compo ({ html: html })
            doThings (ed)
                      ed.destroy () }

        Testosterone.defineAssertions ({
            assertWygNormalization: function (before, after) {
                                        withTestHTML (toyDOM (before), function (ed) {
                                             $assert (toyDOM (after),            ed.dom.innerHTML) }) } })
        return {

            'wrap orphan text to paragraphs': function () {
                $assertWygNormalization (1111, { p: 1111 }) },

            'strip unwanted markup': function () {
                $assertWygNormalization ({ p: [1111, { span: { em: 1111 } }, 2222] },
                                         { p: [1111,         { em: 1111 }  , 2222] }) },

            'remove empty nodes (preserving <br>)': function () {
                $assertWygNormalization ({ p: [1111, { b: { em: {} } }, br, 2222] },
                                         { p: [1111,                    br, 2222] }) },

            '<br> uplifting': function () {
                $assertWygNormalization ({ p: [1111, { b: [br, 2222, br] }, 3333] },
                                         { p: [1111, br,  { b: 2222 }, br,  3333] })

                $assertWygNormalization ([{ p: [1111, br] }, { p: { b: [2222, br] } }, { p: [3333, { b: [br] }] }],
                                         [{ p: [1111] }, { p: [{ b: 2222 }] }, { p: [3333] }]) }, // brs will be removed by removeExcessLinebreaks procedure

            '<div> splits markup with consistent <br>': function () {
                $assertWygNormalization ([1111, { div: 2222 }, 3333], { p: [1111, br, 2222, br, 3333] })

                $assertWygNormalization ([{ div: 1111 }, 2222], { p: [1111, br, 2222] })
                $assertWygNormalization ([1111, { div: 2222 }], { p: [1111, br, 2222] })

                $assertWygNormalization ([{ div: 1111 }, { div: 2222 }, { div: 3333 }], { p: [1111, br, 2222, br, 3333] })

                $assertWygNormalization ([{ b: { div: 1111 } }, { div: 2222 }], { p: [{ b: 1111 }, br, 2222] }) },

            'consequent linebreaks generate paragraphs #1 (explicit)': function () {
                $assertWygNormalization ({ p: { b: [1111, br, br, 2222] } }, [{ p: { b: [1111] } }, { p: { b: [2222] } }]) },

            'consequent linebreaks generate paragraphs #2 (implicit)': function () {
                $assertWygNormalization ({ p: [1111, { b: [2222, br] }, { b: [br, 3333] }, 4444] },
                                        [{ p: [1111, { b:  2222 }]   }, { p: [{ b: 3333 },  4444] }]) } } }) (),

/*  API
    ======================================================================== */

    $defaults: {
        allowedTags: {
            p:  { style: true },
            br: {} } },

    normalizeMarkup: $customCommand (function () {
                                        CaretPosition.survives (this.dom, this.$ (function (cursor) {
                                                                                        this.cleanupTagsAndAttributes      (this.dom)
                                                                                        this.wrapOrphanTextToParagraphs    ()
                                                                                        this.splitParagraphsWithLinebreaks (this.dom)
                                                                                        this.cleanupParagraphs             (cursor)
                                                                                        this.markupIsDirty = false })) }),

/*  Bindings
    ======================================================================== */

    nodeChanged: function (node, change) {
        if ((change.what === 'insert') || (change.what === 'remove')) {
            this.markupIsDirty = true } },  // re-normalize after DOM structurally changed

    normalizeAfterInput: $on ('input', function () {
                                            if (this.doingCustomCommand !== 'normalizeMarkup') {
                                                if (!DOMTotalRecall.isTraitOf (this) || this.markupIsDirty) {
                                                    this.normalizeMarkup () } } }),

    contentReseted: function () { this.normalizeMarkup () },

	//cleanupRedundantEmptyPromptParagraphsOnDefocus: $on ('blur', function () { this.normalizeMarkup.postpone () }),


/*  Private impl.
    ======================================================================== */

    outermostParagraphForNode: function (node) {
        return node.matchUpwards (Node.isParagraph.or (_.equals (this.dom))) },

    cleanupTagsAndAttributes: $allowsRecursion (function (parent) {

        parent.safeEnumChildren (function (node, i, nodes) {

            if (node.nodeType === Node.TEXT_NODE) {                             // remove empty text nodes
                if (!node.nodeValue) {
                    node.removeFromParent () } }

            else if (node.nodeType === Node.ELEMENT_NODE) {
                if (!node.forbidsEditing) {

                    this.cleanupTagsAndAttributes (node)

                    if (node.parentNode) {                              // if not removed

                        /*  remove empty element nodes
                         */
                        if (node.noChildren && !node.isLinebreak) {
                            node.removeFromParent () }

                        /*  <div> converts to <br>
                         */
                        if (node.isDiv) { var p = this.outermostParagraphForNode (node)

                            Node.excessLinebreak.insertMeBefore (node.outerLeftBoundaryIn  (p))
                            Node.excessLinebreak.insertMeAfter  (node.outerRightBoundaryIn (p)) }

                        /*  <br> uplifting
                         */
                        else if (node.isLinebreak) { var p = this.outermostParagraphForNode (node)

                                 if (i === 0)               { node.insertMeBefore (node.outerLeftBoundaryIn  (p)) }
                            else if (i === nodes.lastIndex) { node.insertMeAfter  (node.outerRightBoundaryIn (p)) } }

                        /*  tag & attribute filter
                         */
                        var allowedAttributes = this.allowedTags[(node.tagName || '').lowercase]
                        if (allowedAttributes) {
                            _.each (_.clone (node.attributes), function (attr) {
                                if (!_.evals (node.getAttribute (attr.nodeName)) (allowedAttributes[attr.nodeName.lowercase])) {
                                    node.removeAttribute (attr.nodeName) } }) }
                        else {
                            node.unwrapChildren () } } } }

            else {
                node.removeFromParent () } }, this) }),


    /*  Ensures everything is wrapped in <p> at top level
     */
    wrapOrphanTextToParagraphs: function () { var shouldNotWrap = function (n) {
                                                                        return n.isParagraph ||
                                                                               n.forbidsEditing }
        _.each (_.partition2 (this.dom.childNodes, shouldNotWrap), function (group) {
            if (!shouldNotWrap (group.first)) {
                Node.paragraph
                    .insertMeBefore (group.first)
                    .appendChildren (group) } }) },


    /*  Splits <p> with <br><br>
     */
    splitParagraphsWithLinebreaks: function (parent) {
        parent.safeEnumChildren (this.splitWithLinebreaks) }, // at this point, every root element is guaranteed to be <p>

    /*  TODO: rewrite with cycle (otherwise stack overflow can occur for large copypasta with many <br><br>)
     */
    splitWithLinebreaks: (function () { var findDoubleLinebreak = function (parent) {
                                                return _.find2 (parent.childNodes,
                                                    function (node) { 
                                                          if (node.isLinebreak && node.nextSibling && node.nextSibling.isLinebreak) {
                                                              return node }
                                                          else if (node.nodeType === Node.ELEMENT_NODE) {
                                                              return findDoubleLinebreak (node) || false }
                                                          else {
                                                              return false } }) }

        return $allowsRecursion (function (node) { var br1 = findDoubleLinebreak (node)

            if (br1) { var br2     = br1.nextSibling,
                           afterBr = br1.nextNextSibling

                if (afterBr) { // exclude tailing double-linebreak case (generated by WebKit when pressing enter at the end of <p>)

                    if (br1.isExcessLinebreak ||
                        br2.isExcessLinebreak) { // collapse excess <br>'s caused by consequent <div> elimination

                        ((br1.isExcessLinebreak && br1) ||
                         (br2.isExcessLinebreak && br2)).removeFromParent ()

                        this.splitWithLinebreaks (node) }

                    else {
                        
                        br1.removeFromParent ()
                        br2.removeFromParent ()

                        this.splitWithLinebreaks (this.dom.splitSubtreeBefore (afterBr)) } } } }) }) (),

    /*  Performs final <p> cleanup, after all heavy processing is done
     */
    cleanupParagraphs: function (cursor) { var cursorNode = cursor && cursor.node

        var textParagraphsLeft = _.filter (this.dom.childNodesArray, function (p) {

            if (p.isParagraph && !p.forbidsEditing) {

                /*  Remove heading and tailing linebreaks (TODO: remove not just first ones)
                    Do not touch selected ones, as <br> acts as cursor placeholder in empty paragraphs. Doing this would destroy selelection.
                 */
                if (p.firstChild) {
                    if (p.firstChild.isLinebreak && (p.firstChild !== cursorNode)) {
                        p.firstChild.removeFromParent () }
                    if (p.lastChild && p.lastChild.isLinebreak && (p.lastChild !== cursorNode)) {
                        p.lastChild.removeFromParent () } }

                /*  Remove empty <p>
                 */
                if (p.noChildren) {
                    p.removeFromParent (); return false }
                else {
                    return true } } })

        if (!textParagraphsLeft.length) {
            Node.paragraph                       // create prompt paragraph
                .appendChildren (Node.linebreak) // append <br>, this will be the cursor placeholder (WebKit does not like <p></p>)
                .prependTo (this.dom) } } })



