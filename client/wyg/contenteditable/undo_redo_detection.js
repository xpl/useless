if (Platform.Safari) {

/*  The most obvious impl (does not detect menu actions).
    ======================================================================== */

ContentEditable_UndoRedoDetection = $trait ({

    undoHappened: $trigger (),
    redoHappened: $trigger (),

    detectCmdZ: $on ('keydown', function (e) {
                                    if ((e.metaKey || e.ctrlKey) && (e.keyCode === KeyCodes.Z)) {
                                         e.stopImmediatePropagation ()
                                         e.preventDefault ()
                                        if (e.shiftKey) { this.redoHappened () }
                                                   else { this.undoHappened () } } }) }) }
else {

/*  Detects native undo and redo actions, making possible to override the
    default behavior (which is not feasible with any built-in API).
    ======================================================================== */

ContentEditable_UndoRedoDetection = $trait ({

    undoHappened: $trigger (),
    redoHappened: $trigger (),

/*  How-to / spec / test
    ======================================================================== */

    $tests: {

        /*  NB: Fails on Safari. Need a work-around to reset undo history.
                A possible option is to re-attach children to another
                contenteditable container (undo history is stored per node).
         */
        'assure that consequent execCommand do not collapse upon undo': function (done) {

            var node =  Node.div
                            .toggleAttributes ({ contenteditable: true })
                            .append ('---')
                            .appendTo (document.body)

            node.moveCaret (0)

            document.execCommand ('insertHTML', false, '111');  $assert (node.innerHTML, '111---')
            document.execCommand ('insertHTML', false, '222');  $assert (node.innerHTML, '111222---')
            //  resetting undo history at this point would solve the problem on Safari
            document.execCommand ('insertHTML', false, '333');  $assert (node.innerHTML, '111222333---')
            document.execCommand ('undo');                      $assert (node.innerHTML, '111222---')

                                                    _.delay (function () {
                                                                $assert (node.innerHTML, '111222---') // should not undo further in next event loop iteration (fails on Safari)
                                                                node.removeFromParent ()
                                                                done () }) },

        'undo/redo detection': function () {

            /*  Example component
             */
            Schwarzenegger = $component ({

                $traits: [  Testosterone.ValidatesRecursion,
                            Testosterone.LogsMethodCalls,
                            DOMReference,
                            DOMEvents,
                            DOMTotalRecall,
                            ContentEditable_ExecCommand,
                            ContentEditable_UndoRedoDetection],

                simulateUndo: function () { this.execCommand ('undo') },
                simulateRedo: function () { this.execCommand ('redo') },

                init: function () {
                    this.domReady (Node.div .toggleAttribute ('contenteditable', true)
                                            .append (Node.paragraph.append ('and motorcycle.'))
                                            .appendTo (document.body)) } })

            /*  Generate some content via execCommand API (to make native history non empty)
             */
            var arnold = new Schwarzenegger ()
                arnold.dom.firstChild.moveCaret ()
                arnold.insertHTML ('I need your clothes ')

                    $assert (arnold.dom.innerHTML, '<p>I need your clothes and motorcycle.</p>')


                /*  In this test, we will consider triggering 'input' event as a failure, as we won't
                    futher call any input APIs. Undo and redo should not be treated as an user input,
                    because it does not generate any new information - otherwise, it would cause logic
                    loops as we try to manage our own history stack. If you need to respond to the undo
                    or redo event [e.g. for layout updating or auto-saving] check the undoHappened/
                    redoHappened API instead.
                 */
                arnold.dom.addEventListener ('input', function () { $fail })


                /*  History traps are special markup that is injected upon input events via the native
                    editing API (execCommand, namely), and then immediately deleted (by native API too).
                    As the result, traps should not be visible to the user, but they're visible to the
                    native history manager. This allows to intercept the native undo/redo navigation
                    means, by watching on these traps appear in the markup.
                 */
                arnold.emitHistoryTraps ()
                
                    $assert (arnold.dom.innerHTML,  '<p>I need your clothes and motorcycle.</p>')


                /*  Should detect undo and redo any number of times without touching contents.

                    NB: this trait only does the detection job, being only a replacement for the missing
                        undo/redo events. For the implementation of an actual history stack, see the
                        undo_redo.js, DOMTotalRecall and the DOMObserver.
                 */
                $assertEveryCalled (function (undo__3, redo__3, undo_again__3) {

                    arnold.undoHappened (undo__3)

                        arnold.simulateUndo ()
                        arnold.simulateUndo ()
                        arnold.simulateUndo ()
                     
                            $assert (arnold.dom.innerHTML,  '<p>I need your clothes and motorcycle.</p>')

                                arnold.undoHappened.off (undo__3)

                    arnold.redoHappened (redo__3)

                        arnold.simulateRedo ()
                        arnold.simulateRedo ()
                        arnold.simulateRedo ()
                     
                            $assert (arnold.dom.innerHTML,  '<p>I need your clothes and motorcycle.</p>')

                    arnold.undoHappened (undo_again__3)

                        arnold.simulateUndo ()
                        arnold.simulateUndo ()
                        arnold.simulateUndo ()
                     
                            $assert (arnold.dom.innerHTML,  '<p>I need your clothes and motorcycle.</p>') })


                /*  History traps should not appear in history (if they are, something is seriosly broken out there)
                 */
                $assert ([], arnold.mutationsThatInvolveNode (_.property ('tagName').then (_.equals ('A'))))


                /*  Undo and redo detection should not disturb caret position
                 */
                $assertMatches (NormalizedCaretPosition.current, { node: arnold.dom.firstChild.firstChild, offset: 0 })


                /*  Bye
                 */
                arnold.destroy () } },


/*  Bindings
    ======================================================================== */

    filterUndoRedoActionsFromInputEvent: $on ('input', function (e) {

                        /*  Prohibit this.execCommand from triggering input event, as browser's execCommand
                            couldn't be called recursively, and it does happen, because our trap emission
                            mechanics relies on synchronous execCommand (see emitHistoryTraps () for details).
                         */
                        if (this.doingSilent ||
                            this.doingExecCommand) { e.stopImmediatePropagation () }

                        else {  /*  Detect the undo/redo event with the help of so-called 'traps'.
                                 */
                                var trap  = this.dom.querySelector ('a[history-trap]')
                                if (trap) { e.stopImmediatePropagation (); this.historyTrapDetected (trap) }

                                    /*  Re-emit traps after any actual input happened. This will prevent the
                                        browser from unrolling its internal history stack upon native undo/redo
                                        commands. These traps will help intercept the native undo/redo, letting
                                        us to unroll our own history stack instead, and to drop the internal
                                        history completely.
                                     */
                                    else  { this.emitHistoryTraps () /*this.emitHistoryTrapsButNotTooFrequently ()*/ } } }),

    historyTrapDetected: $log ($pink ($silent (function (trap) {

                                    /*  Dismiss trap (so that user won't see it)
                                     */
                                    trap.removeFromParent ()

                                    /*  Trigger undo/redo listeners
                                     */
                                    if (trap.getAttribute ('undo-happened')) { this.undoHappened () }
                                                                        else { this.redoHappened () }
                                    /*  Re-emit traps
                                     */
                                    this.emitHistoryTraps () }))),


    /*  As we prohibited this.execCommand from triggering 'input' before,
        compensate with manually dispatching 'input' after the execCommand
        completes. This happens synchronously, thanks to $bindable semantics.
     */
    afterExecCommand: function () {
                                if (!this.doingSilent) {
                                     this.dispatchEvent ('input') } },


    /*  When 'redo' command is issued, WebKit generates dummy <br> insertion at the beginning of editor's <div>,
        followed by immediate removal. This prevents 'redo' from work, as pushMutation erases any future mutations.

        In other words, such dummy <br> generation is not expected, and we cannot prevent it from recording using
        'silent' semantics - as it happens outside of any of our logic procedures... But we can filter it by
        overriding 'shouldRecordMutationForNode' filter, defined by DOMTotalRecall trait.
     */
    interceptShouldRecordMutationForNode: function (n, shouldRecordMutationForNode) {
        return shouldRecordMutationForNode (n) && !(n.dummyBr = (
                                                    n.dummyBr || ((n.isLinebreak && (n.nextSibling &&
                                                                                     n.nextSibling.isParagraph))))) },

/*  Impl
    ======================================================================== */

    emitHistoryTrapsButNotTooFrequently: $log ($boldGreen ($debounce ({ wait: 200 }, function () {      // TODO: deactivate $debounce/$throttle/$postpones upon destroy
                                                                                        if (this.dom) { // may call after destroy due to debounce..
                                                                                            this.emitHistoryTraps () } }))),
    emitHistoryTraps: $log ($pink (function () {
                                        if (this.dom.isAttachedToDocument) { // wont work if detached from document DOM, as it relies on selection mechanics
                                            var p = this.firstTextParagraph
                                            if (p) {
                                                Range.survives (this.emitUndoTrap.$ (p).then (
                                                                this.emitRedoTrap.$ (p))) } } })),

    /*  Insert then delete → native undo will make the trap reappear
     */
    emitUndoTrap: $silent (function  (hostNode) {                        
        NormalizedCaretPosition.move (hostNode)                        ; this.insertHTML ('<a history-trap="1" undo-happened="1" no-history="1">®</a>')
        Range.selectNode (this.dom.querySelector ('a[undo-happened]')) ; this.execCommand ('delete') }),

    
    /*  Insert then undo → native redo will make the trap reappear
     */
    emitRedoTrap: $silent (function  (hostNode) {                       
        NormalizedCaretPosition.move (hostNode)                        ; this.insertHTML ('<a history-trap="1" redo-happened="1" no-history="1">®</a>')
                                                                         this.execCommand ('undo') }),
    
    /*  We put traps into first text paragraph, assuming that the
        ContentEditable_MarkupNormalization is plugged in. It guarantees that there
        will be paragraphs at top level, wrapping orphan text into them.
     */                                                         
    firstTextParagraph: $property (function () {
                                        return _.find (this.dom.childNodes, function (n) {
                                            return n.isParagraph && !n.forbidsEditing }) }),

/*  ======================================================================== */

})

}









