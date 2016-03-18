/*  ======================================================================== */

KeyCodes = $prototype ({ $const: {
                            Backspace: 8,
                            Enter:     13,
                            Esc:       27,
                            A:         65,
                            Z:         90 }})

/*  ======================================================================== */

ContentEditable_KeyboardInput = $trait ({

       escapeKeyPressed: $trigger (),
    ctrlEnterKeyPressed: $trigger (),

/*  ======================================================================== */

    setLinebreakModeWhenFocused: $on ('focus', function () {
                                                  document.execCommand ('insertBrOnReturn', false, true) }),

    keydown: $on (function (e) {
                                 if ((e.keyCode === KeyCodes.Backspace))                  { this.doBackspace      () ; e.preventDefault () }
                            else if ((e.keyCode === KeyCodes.Esc))                        { this.escapeKeyPressed () ; e.preventDefault () }
                            else if ((e.keyCode === KeyCodes.A) && e.metaKey)             { this.doSelectAll      () ; e.preventDefault () }
                            else if ((e.keyCode === KeyCodes.Enter) && !Platform.Firefox) { this.doCaretReturn    () ; e.preventDefault () } }),
    $bindable: {

          doSelectAll: function () { Range.current = Range.withinNode (this.currentParagraph) },
        doCaretReturn: function () { this.execCommand ('insertLinebreak') },
          doBackspace: function () { var p  = this.currentParagraphIfCaretAtStart
                                     if (p) { this.joinConsequentParagraphsWithLinebreak (p.previousSibling, p) }
                                       else { this.execCommand ('delete') } } }, 

    /*doBackspace: function () {
        var range = Range.current
        if (range && (range = range.normalized) && range.isWithinNode (this.dom)) {

            var start = new NormalizedCaretPosition (range.startContainer, range.startOffset)
            var end   = new NormalizedCaretPosition (range.endContainer, range.endOffset)

            var startP = start.node.matchUpwards (Node.isParagraph)
            var endP   =   end.node.matchUpwards (Node.isParagraph)

            if ((start.offset === 0) && start.node.isLeftmostNodeIn (startP)) {
                if (range.collapsed) {
                    this.joinConsequentParagraphsWithLinebreak (startP.previousSibling, startP) }
                else {

                }
            } }
    },*/

/*  ======================================================================== */

    currentParagraphIfCaretAtStart: $property (function () {
            var cursor = NormalizedCaretPosition.current, p = undefined
        return (cursor &&
               (cursor.offset === 0) &&
                cursor.node.isLeftmostNodeIn (p = cursor.node.matchUpwards (Node.isParagraph)) && p) }),

    currentParagraph: $property (function () {
           var cursor = NormalizedCaretPosition.current
        return cursor && cursor.node.matchUpwards (Node.isParagraph) }),

    joinConsequentParagraphsWithLinebreak:
        $customCommand (function (prev, next) {
               if (prev &&
                   prev.isParagraph &&
                  !prev.forbidsEditing) { CaretPosition.survives (this.dom, function () {
                                                prev.appendChildren ([Node.linebreak].concat (
                                                                        next.removeFromParent ()
                                                                            .childNodesArray))  }) } }),

/*  ======================================================================== */

    $tests: (function () {

        /*  Emulates layout conditions (Safari behaves differently when absolute positioning is on)
         */
        document.head.appendChild (Node.make ('style').append (
            '.wyg-keyboard-input-test-instance   { position: relative; }\n' +
            '.wyg-keyboard-input-test-instance p { position: absolute; }'))

        var Compo = undefined
        var withTestHTML = function (html, doWith) {
            
            Compo = Compo || $component ({

                $traits: [Testosterone.ValidatesRecursion,
                          //Testosterone.LogsMethodCalls,
                          DOMReference,
                          DOMEvents,
                          ContentEditable_ExecCommand,
                          ContentEditable_MarkupNormalization,
                          ContentEditable_KeyboardInput,
                          TextSelectionCodecForTestingPurposes],

                $defaults: {
                    allowedTags: {
                        'b'     : {},
                        'br'    : { i: true }, // for marking caret position
                        'em'    : {} } },

                init: function () { this.dom = _.extend (Node.div
                                                             .toggleAttribute ('contenteditable', true)
                                                             .insertMeAfter (document.body.lastChild), {
                                                                className: 'wyg-keyboard-input-test-instance',
                                                                innerHTML: this.html })

                                    if (window.wygTestInstanceCreated) {
                                        window.wygTestInstanceCreated (this) }

                                    this.domReady (this.dom) } })

                var ed = new Compo ({ html: html })
            doWith (ed)
                    ed.destroy () }

        Testosterone.defineAssertions ({

            assertWygTyping: function (sequence) { sequence = _.asArray (arguments)

                withTestHTML   (_.first (sequence), function (ed) {
                        _.each (_.rest  (sequence), function (arg, i) {
                            
                            if ((i % 2) === 0) { // operation

                                ed.decodeTextSelection ()

                                _.each (_.coerceToArray (arg),
                                           function (key) {
                                     if (_.isNumber (key)) { ed.keydown ({ keyCode: key, preventDefault: _.identity }) }
                                                      else { ed.insertText (key) } }) }

                            else { // state
                                $assert (arg, ed.encodeTextSelection ()) } }) }) } })

        return {

            /*  | encodes caret position in text nodes, [] encodes selection range
                <br i=""> encodes caret position set to <br>

                This is magic provided by TextSelectionCodecForTestingPurposes trait.
             */
            'basic typing': function () {
                $assertWygTyping ('<p>foo|baz</p>', 'bar', '<p>foobar|baz</p>') },

            'double enter': function () {
                $assertWygTyping ('foo|bar',              KeyCodes.Enter,
                                  '<p>foo<br>|bar</p>',   KeyCodes.Enter,
                                  '<p>foo</p><p>|bar</p>') },

            'enter before br': function () {
                $assertWygTyping ('<p>1111|<br>2222</p>', KeyCodes.Enter, '<p>1111</p><p>|2222</p>') },

            'enter at empty paragraph': function () {
                $assertWygTyping ('<p>1111</p><p><br i=""></p><p>2222</p>', KeyCodes.Enter,
                                  '<p>1111</p><p><br i=""></p><p>2222</p>') },

            'backspace leading to empty paragraph': function () {
                $assertWygTyping ('<p>1|</p><p>2222</p>', KeyCodes.Backspace,
                                  '<p><br i=""></p><p>2222</p>')

                $assertWygTyping ('<p>[1111]</p><p>2222</p>', KeyCodes.Backspace,
                                  '<p><br i=""></p><p>2222</p>')

                $assertWygTyping ('<p>[1111</p><p>2222]</p><p>3333</p>', KeyCodes.Backspace,
                                  '<p><br i=""></p><p>3333</p>')

                $assertWygTyping ('<p>[123]4</p>',            KeyCodes.Backspace, '<p>|4</p>')    // negative cases
                $assertWygTyping ('<p>[1234</p><p>567]8</p>', KeyCodes.Backspace, '<p>|8</p>') },

            'backspace-at-paragraph-start behavior': function () {
                $assertWygTyping ('<p>1111</p><p>|2222</p>', KeyCodes.Backspace,
                                  '<p>1111<br>|2222</p>')

                $assertWygTyping ('<p>1111|</p>', [KeyCodes.Enter,
                                                   KeyCodes.Enter,
                                                   KeyCodes.Backspace,
                                                   KeyCodes.Backspace], '<p>1111<br i=""></p>') } } }) (),


 
 })







