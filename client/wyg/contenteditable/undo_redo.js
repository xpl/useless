/*  Glues DOMTotalRecall with undo/redo detection API
    ======================================================================== */

ContentEditable_UndoRedo = $trait ({

    $defaults: {
        undoStack: [],
        redoStack: [] },


    /*  Bindings
     */

    //saveSelection: $on ('keydown', function (e) { var range = Range.current
    //                            this.lastSelection = (range && range.data) || undefined }), // thou shall not store original Range reference,
                                                                                            // as it suddenly mutates over time

    contentReseted: function () {  this.undoStack = []
                                   this.redoStack = [] },

    beforePushMutation: function () {   if ( this.mutationHistory.last &&
                                            (this.mutationHistory.last.since > 1000)) { this.undoStack.push (this.currentMilestone ())
                                                                                        this.redoStack.removeAll () } },

    undoHappened: $log ('{{undoStack}} → {{mutationHistoryCursor}} → {{redoStack}}', $boldRed (function () {

        if (this.undoStack.length) {
            this.redoStack.push  (this.currentMilestone ())
            this.undoStack.pop ().rewind ()                     } })),

    redoHappened: $log ('{{undoStack}} → {{mutationHistoryCursor}} → {{redoStack}}', $boldGreen (function () {

        if (this.redoStack.length) {
            this.undoStack.push  (this.currentMilestone ())
            this.redoStack.pop ().rewind ()                     } })),


    /*  Milestone mechanics
     */

    currentMilestone: $log ('{{undoStack}} ← {{mutationHistoryCursor}}', $boldOrange (function () {

                    /*  TODO:   Achieve native selection restoring experience. Current implementation is so-so...
                     */
                    var cursor     = this.mutationHistoryCursor
                    //var rangeData  = this.lastSelection
                    var rangeData =  Range.current &&
                                     Range.current.data // thou shall not store original Range reference, as it suddenly mutates over time

                    return {    where:  cursor,
                                rewind: this.$ (function () {
                                        this.rewindHistoryTo (cursor)
                                        try         { Range.current = rangeData && Range.make (rangeData) }
                                        catch (e)   { log.warn ('Unable to set range data', rangeData) } }) } })),

    /*  Tests
     */

    $tests: (function () {

            var Schwarzenegger = undefined
            var withArnold = function (then) {

                    Schwarzenegger = Schwarzenegger || $component ({

                        $defaults: {
                            value: {
                                blocks: [
                                    { type: 'p',
                                      html: '12345' },

                                    { type: 'p',
                                      html: '6789' } ] } },

                        $traits: [  Testosterone.ValidatesRecursion,
                                    Testosterone.LogsMethodCalls,
                                    DOMReference,
                                    DOMTotalRecall,
                                    DOMEvents,
                                    ContentEditable_ExecCommand,
                                    ContentEditable_UndoRedoDetection,
                                    ContentEditable_UndoRedo,
                                    ContentEditable_MarkupNormalization,
                                    ContentEditable_KeyboardInput,
                                    Wyg_ContentAPI],

                        init: function () {
                            this.domReady (Node.div .toggleAttribute ('contenteditable', true)
                                                    .insertMeAfter (document.body.lastChild)) },

                        undo: $log (function () { if (Platform.Safari) { this.undoHappened () } else { this.execCommand ('undo') } }),
                        redo: $log (function () { if (Platform.Safari) { this.redoHappened () } else { this.execCommand ('redo') } }),

                        contentChanged: function () {
                            log.green (log.indent (1), '→', this.html) } })

                    var arnold = new Schwarzenegger (); then (arnold)
                        arnold.destroy () }

            return {

                /*  TODO: selection restoring test
                 */

                'undo/redo basics': function () { withArnold (function (arnold) {

                    arnold.dom.firstChild.firstChild.moveCaret (2)
                        $assert (arnold.html, '<p>12345</p><p>6789</p>')

                    arnold.mutationHistory.last.when = -1 // prevents history from collapsing
                    arnold.doCaretReturn ()
                        $assert (arnold.html, '<p>12<br>345</p><p>6789</p>')

                    arnold.undo ()
                        $assert (arnold.html, '<p>12345</p><p>6789</p>')

                    arnold.undo () // nothing to undo here, so should not mess up
                        $assert (arnold.html, '<p>12345</p><p>6789</p>')

                    arnold.redo ()
                        $assert (arnold.html, '<p>12<br>345</p><p>6789</p>')

                    arnold.redo () // nothing to redo here
                        $assert (arnold.html, '<p>12<br>345</p><p>6789</p>')

                    arnold.undo ()
                        $assert (arnold.html, '<p>12345</p><p>6789</p>') }) },



             } }) (),

})