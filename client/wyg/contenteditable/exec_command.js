/*  ======================================================================== */ 

ContentEditable_ExecCommand = $trait ({

    $defaults: {
        doingExecCommand:   false,
        doingCustomCommand: false },


/*  Working with the native execCommand API
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    insertText: function (s) {
                    return this.insertHTML (_.map (s.split ('\n'), _.escaped).join ('<br>')) },

    insertHTML: function (s) {
                        var result = this.execCommand ('insertHTML', s)
                    return  result },

    execCommand: $log ($bindable (function (name, value) { if (!Range.isWithinNode (Range.current, this.dom)) { this.dom.moveCaret () }

                                                             var prev = this.doingExecCommand
                                                                        this.doingExecCommand = name
        var result = document.execCommand (name, false, value || null); this.doingExecCommand = prev })),

/*  Use $customCommand/execCustomCommand for designating DOM manipulations
    which bypass the native execCommand API (e.g. by calling Element methods).
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $macroTags: {

        /*  TODO: add CPS support
         */
        customCommand: function (def, fn, name) {
                            return Tags.modify (fn, function (fn) {
                                return $log ($boldBlue (function (/* ... */) { var callFn = fn.applies (this, arguments)
                                    return this.execCustomCommand (name, function (done) { callFn (); done () }) })) }) } },

    /*  TODO:   Make $bindable work with CPS convetion - this way explicit afterRecordDOMMutations wouldn't be needed.
                It could be like $bindable ($CPS (function (.., then) { ... })).
     */
    execCustomCommand: function (name, what) {

                                        var prev  = this.doingCustomCommand
                                                    this.doingCustomCommand = name

                                                    /*  Will work even if DOMTotalRecall is not plugged in, thanks to NaN magic (NaN !== NaN)
                                                     */
                                                    var offset   = _.coerceToNaN (this.mutationHistoryCursor)
            what.call (this, this.$ (function () {  if (offset !== _.coerceToNaN (this.mutationHistoryCursor)) { if (prev === false) {
                                                                                                                    this.afterExecCustomCommand (name, what) } }
                                                    this.doingCustomCommand = prev })) },

    /*  Gets called after a custom command completes.

            1.  Gets called only for top level command in the stack (swallowing nested commands)
            2.  Gets called only if the command had actually changed anything (requires DOMTotalRecall)
     */
    afterExecCustomCommand: $trigger (function (name, what) {
                                        if (!this.doingSilent &&
                                             this.dispatchEvent) {
                                             this.dispatchEvent ('input') } }), // dispatch 'input' just as execCommand does


    /*  This is kind of hack, because does not actually preventing from interacting.
        For example, user still can use menus and other shit to mess up things. But
        really this is not an issue, as it is really hard to get to menus while
        doing drag&drop operations, for example.

        A robust solution would be issuing execCommand ('contentReadOnly') until
        custom command finishes, but it somehow messes up with selection and causing
        crashes, so need to further investigate on subject...
     */
    preventFromInteractingWhileCustomCommandIsExecuting: $on ({ what: 'keydown cut copy paste',
                                                                target: document },

                                                            function (e) { if (this.doingCustomCommand) {
                                                                                e.stopImmediatePropagation ()
                                                                                e.stopPropagation ()
                                                                                e.preventDefault () } })

/*  ======================================================================== */ 

})







