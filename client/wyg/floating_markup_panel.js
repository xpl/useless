;(function ($ /* JQUERY */) {

/*  The thing that pops up when you select text in Wyg editor.
    ======================================================================== */

Wyg_FloatingMarkupPanel = $trait ({

    $defaults: {

        /*  You can define new buttons via configuring this field in $defaults
         */
        buttons: {
            'bold':      { click: function () { this.execCommand ('bold')      } },
            'italic':    { click: function () { this.execCommand ('italic')    } },
            'underline': { click: function () { this.execCommand ('underline') } } },

        /*  Configures order of buttons in the bar
         */
        buttonsBar: ['bold', 'italic', 'underline'] },

    /*  You can utilize following method in custom buttons impl.
     */
    toggleWrapSelectionIn: $customCommand (function (tagName) {

        var range = Range.current
        if (range &&
            range.isWithinNode (this.dom)) {

            var outer = range.commonAncestorContainer &&
                        range.commonAncestorContainer.matchUpwards (_.property ('tagName').then (_.equals (tagName.uppercase)))

            /*  Detoggle case
             */
            if (outer) {

                /*  <outer>111<span>222</span>333</outer>
                 */
                var span = range.wrapIn (Node.span)

                /*  Save range
                 */
                var rangeData = { startContainer: span.firstChild, startOffset: 0,
                                    endContainer: span.lastChild,    endOffset: span.lastChild.length }

                /*  <outer>111</outer>|<outer><span>222</span>333</outer>
                 */
                var rightPart = outer.parentNode.splitSubtreeBefore (span)

                /*  <outer>111</outer>|<outer><span>222</span></outer>|<outer>333</outer>
                 */
                rightPart.parentNode.splitSubtreeBefore (span.nextSibling)

                /*  <outer>111</outer>|222|<outer>333</outer>
                 */
                span.unwrapChildren ().unwrapChildren ()

                /*  Restore range
                 */
                Range.current = Range.make (rangeData) }

            /*  Toggle case
             */
            else {
                range.wrapIn (Node.make (tagName)) } } }),


    /*  Supresses panel interaction while selecting text
     */
    supressPanelPointerEventsOnSelectionStart: $on ('selectstart', function () {
        $(this.floatingMarkupPanel).css ('pointer-events', 'none') }),

    resumePanelPointerEventsOnSelectionEnd: $on ({ what: 'mouseup touchend', target: document }, function () {
        $(this.floatingMarkupPanel).css ('pointer-events', '') }),


    /*  Bindings/impl
     */
    contentReseted: function () {
        this.floatingMarkupPanelAnchor =
            $('<div class="wyg-floating-markup-panel-anchor hide" contenteditable="false" no-history no-layout>').append (
                this.floatingMarkupPanel =
                    $('<div class="wyg-floating-markup-panel">').append (
                        _.map (this.buttonsBar,
                               this.initBarButton))).appendTo (this.dom) },

    initBarButton: function (id) {
        return $('<button>')
                    .addClass (id)
                    .touchClick (this.$ (this.buttons[id].click)) },

    toggleMarkupPanelOnSelectionChange: $on ({ what: 'selectionchange', target: document }, function () {

        if (this.floatingMarkupPanelAnchor) {

            /*  NB: Latter condition is needed because our wrapSelectionIn does not
                    work properly in case when selection spans across paragraphs. So
                    need a mechanism to work around that, disabling markup bar when
                    selection is spanned across block elements.
             */
            var range = Range.current
            if (range &&
               !range.collapsed &&
                range.isWithinNode (this.dom) &&
                range.normalized.commonAncestorContainer.matchUpwards (Node.isParagraph)) {

                var  thisRect = BBox.fromLTWH (this.dom.getBoundingClientRect ())
                var rangeRect = BBox.fromLTWH (_.find (range.getClientRects (), _.property ('width').then (_.notZero)))
                if (rangeRect) {
                    this.floatingMarkupPanelAnchor.css (
                                rangeRect
                                    .offset (Vec2.fromLT (thisRect).inverse)  // transform rangeRect to local coords
                                    .leftTop
                                    .add (Vec2.x (rangeRect.extent.half.x))   // shift to center of rangeRect horizontally
                                    .asLeftTop).removeClass ('hide') } }
            else {
                this.floatingMarkupPanelAnchor.addClass ('hide') } } }),

/*  ======================================================================== */

    $tests: function () {

        /*  Create test component
            ---------------------------------------------------------------- */

        var editor = new ($component ({

            $traits: [
                DOMReference,
                ContentEditable_ExecCommand,
                Wyg_FloatingMarkupPanel],

            init: function () {
                    this.domReady (Node.make ('div').appendTo (document.body)) } }))


        /*  Test tag toggle
            ---------------------------------------------------------------- */

        editor.dom.innerHTML = '111222333'
        /*                         ---                                       */

            Range.selectNode (editor.dom.firstChild, 3, 6)
            editor.toggleWrapSelectionIn ('i')
            
                $assert (editor.dom.innerHTML, '111<i>222</i>333')


        /*  Test tag detoggle
            ---------------------------------------------------------------- */

        editor.dom.innerHTML = '111<i>222333444</i>555'
        /*                               ---                                 */

            Range.selectNode (editor.dom.childNodes[1].firstChild, 3, 6)
            editor.toggleWrapSelectionIn ('i')

                $assert (editor.dom.innerHTML, '111<i>222</i>333<i>444</i>555')

                $assert (Range.current &&
                         Range.current.data, { startContainer: editor.dom.childNodes[2], startOffset: 0,
                                                 endContainer: editor.dom.childNodes[2],   endOffset: 3 })

        /*  Bye..
         */
        editor.destroy ()
    }
})

/*  ======================================================================== */

}) (jQuery);