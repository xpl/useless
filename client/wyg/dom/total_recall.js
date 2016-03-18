/*  ======================================================================== */

DOMTotalRecall = $trait ({


/*  Specification / test
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $test: function () { var $ = jQuery


        /*  Example component
            ------------------------------------------------------------ */

            var arnold = new ($component ({ 

                                    $traits:   [Testosterone.LogsMethodCalls,
                                                DOMReference,
                                                DOMTotalRecall,
                                                ContentEditable_ExecCommand],

                                    init: function () {
                                                this.domReady ($('<div contenteditable="true">')
                                                                    .appendTo (document.body)[0]) } }))


        /*  If you're not sure if it's safe to access history operations,
            put your code after the .historyReady barrier.
            ----------------------------------------------------------- */

            arnold.historyReady (function () {


            /*  Any operation that changes DOM gets reflected in mutation history
                ---------------------------------------------------------------- */

                arnold.dom.innerHTML = '<p>Quaid, <b>start</b> the reactor</p>'


            /*  Accessing current position in mutation history
                ----------------------------------------------------------- */

                var before = arnold.mutationHistoryCursor


                /*  Rewinding restores the DOM state "remembered" at a history position
                    ---------------------------------------------------------------- */

                    arnold.dom.innerHTML = '<p>I\'ll be back!</p>'
                    arnold.rewindHistoryTo (before)

                        $assert (arnold.dom.innerHTML, '<p>Quaid, <b>start</b> the reactor</p>')


                /*  You can rewind forward if you

                        1) rewinded backward previously
                        2) nothing changed since then
                        ---------------------------------------------------------------- */

                    arnold.rewindHistoryTo (arnold.mutationHistory.lastIndex)

                        $assert (arnold.dom.innerHTML, '<p>I\'ll be back!</p>')


                /*  Filters history by a node. Primarily used for debugging purposes,
                    hope you won't ever need that...
                    ---------------------------------------------------------------- */

                    $assert (arnold.mutationsThatInvolveNode (_.constant (true)).length > 0)


                /*  Should ignore nodes tagged with no-history attribute (which can
                    be read/set via the node.noHistory property)
                    ---------------------------------------------------------------- */

                    arnold.dom.firstChild.appendChild ($('<a no-history="true">foo</a>')[0])

                        $assert (arnold.dom.innerHTML, '<p>I\'ll be back!<a no-history="true">foo</a></p>')
                        $assert (arnold.mutationsThatInvolveNode (_.property ('noHistory')), [])


                /*  Consequent typing collapses to a single mutation history entry,
                    not cluttering the history.
                    ---------------------------------------------------------------- */

                    arnold.dom.innerHTML = 'qux'
                    arnold.dom.firstChild.moveCaret (0);    arnold.insertText ('foo_')
                                                            arnold.insertText ('bar_')
                                                            arnold.insertText ('baz_')

                        $assertNot (_.pluck (_.last (arnold.mutationHistory, 3), 'what'), ['text',
                                                                                           'text',
                                                                                           'text'])
                        $assertMatches (arnold.mutationHistory.last, {
                                            value: 'foo_bar_baz_qux',
                                              was:             'qux' })


                /*  There was a bug in DOMObserver that caused inconsistencies
                    when node was relocated within its parent.
                    ---------------------------------------------------------------- */

                    arnold.resetHistory ()
                    arnold.dom.innerHTML = '<b>foo</b><i>bar</i>'

                    before = arnold.mutationHistoryCursor

                        arnold.dom.appendChild (arnold.dom.firstChild)
                            $assert (arnold.dom.innerHTML, '<i>bar</i><b>foo</b>')

                        arnold.rewindHistoryTo (before)
                            $assert (arnold.dom.innerHTML, '<b>foo</b><i>bar</i>')


                /*  Bye..
                    ---------------------------------------------------------------- */

                    arnold.destroy () }) },


/*  State
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $defaults: {
        doingSilent: false,
        mutationHistory: [],
        mutationHistoryCursor: -1 },

    historyReady: $barrier (),


/*  History operations
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    resetHistory: $bindable ($log ($red (function () {
        this.mutationHistoryCursor = -1
        this.mutationHistory = [] }))),

    rewindHistoryTo: $log ('from = {{mutationHistoryCursor}}', $pink ($bindable (function (i) {

        this.silent ('rewindHistoryTo', this.$ (function () {

            while (i < this.mutationHistoryCursor) {
                this.mutationHistory[this.mutationHistoryCursor].rollback ()
                this.mutationHistoryCursor-- }

            while (this.mutationHistoryCursor < i) {
                this.mutationHistoryCursor++
                this.mutationHistory[this.mutationHistoryCursor].commit () } })) }))),


/*  Tag methods with $silent to get them skipped from history
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $macroTags: { // TODO: add support for tagging methods in CPS notation.

        silent: function (def, fn, name) {
                    return Tags.modify (fn, function (fn) {
                        return function (/* arguments */) { return this.silent (name, fn.applies (this, arguments)) } }) } },

    silent: $log ($darkBlue (function (name, what) {

         var prev = this.doingSilent
                    this.doingSilent = true
        what ();    this.doingSilent = prev })),



/*  You can listen to low-level change notifications via this API
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    nodeChanged: $trigger (),

    shouldRecordMutationForNode: $bindable (function (n) { return !(n.noHistory) }),

/*  Bindings to other traits
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    domReady: function () {
        this.resetHistory ()
        this.attach (this.historyReady (this.mutationObserver = new DOMObserver ({
                                                        target: this.dom,
                                                        filter: this.shouldRecordMutationForNode,
                                                       changed: this.nodeChanged,
                                               //  attrChanged: this.ifRecordingMutations (this.pushesMutation (AttrMutation)),
                                                   textChanged: this.ifRecordingMutations (this.pushesMutation (TextMutation)),
                                                       removed: this.ifRecordingMutations (this.pushesMutation (RemoveMutation)),
                                                      inserted: this.ifRecordingMutations (this.pushesMutation (InsertMutation)) }))) },

/*  Impl.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    ifRecordingMutations: function (what) {
                            return this.$ (function (node) {
                                                if (!this.doingSilent) { what.apply (this, arguments) } }) },

    pushesMutation: function (MutationConstructor) {
                        return this.$ (function (node, args) {
                            this.pushMutation (_.new_.$ (MutationConstructor, 1 + this.mutationHistoryCursor).apply (null, arguments)) }) },

    pushMutation: $bindable (function (m) { 

                        /*  Erase the future
                         */
                        this.mutationHistory = this.mutationHistory.take (1 + this.mutationHistoryCursor)

                        /*  Collapse too frequent mutations
                         */
                         var collapsed
                        if ((collapsed =
                                 m.collapseWith (this.mutationHistory.last)) !== m) { this.updateLastMutation (collapsed) }
                                                                               else { this.appendNextMutation (m) }
                        /*  Update cursor position
                         */
                        this.mutationHistoryCursor =
                            this.mutationHistory.lastIndex }),

    appendNextMutation: $log (function (m) {          this.mutationHistory.push (m) }),
    updateLastMutation: $log (function (m) { if (m) { this.mutationHistory[this.mutationHistory.lastIndex] = m }    // overwrite prev
                                               else { this.mutationHistory.pop () } }),                             // remove prev
    
    mutationsThatInvolveNode: function (predicate) { var matches = function (n) { return n && _.coerceToFunction (predicate) (n) }
        return _.filter (this.mutationHistory,
                            function (e) {
                                return matches (e.node) || (e.value && (matches (e.value.parent) || matches (e.value.prev))) ||
                                                           (e.was   && (matches (e.was  .parent) || matches (e.was  .prev))) }) } })


/*  Node addendums
    ======================================================================== */

$mixin (Node, {

    /*  Supresses history tracking for element and its children
     */
    noHistory: $property ({
                    set: function (value) {
                                this.toggleAttribute ('no-history', value) },

                    get: function () {
                         return this.matchUpwards (function (n) { return  n.getAttribute &&
                                                                         (n.getAttribute ('no-history') !== null) }) ? true : false } }) })

/*  Represents an abstract atomic DOM manipulation
    ======================================================================== */

NodeMutation = $prototype ({

    //$traits: [Testosterone.LogsMethodCalls],

    constructor: function (i, node, what, value, was) {
                    _.extend (this, {
                        i: i,
                        node:  node,
                        what:  what,
                        was:   was,
                        value: value,
                        when:  Date.now () }) },
    /*  Public API
     */
    rollback: $log ('#{{i}}, {{node}} @ {{value}} → {{was}} ', function () { this.pull () }),
    commit:   $log ('#{{i}}, {{node}} @ {{was}} → {{value}} ', function () { this.push () }),

    since: $property (function () { return Date.now () - this.when }),

    collapseWith: function (prev) {
                    return (prev &&
                           (prev.node === this.node) &&
                           (prev.what === this.what) &&
                           (prev.since < 1000))
                                ? _.extend (prev, { value: this.value })
                                : this },
    /*  To be overriden
     */
    push: _.notImplemented,
    pull: _.notImplemented })


/*  A bare minimum to encode the lifetime of a DOM tree
    ======================================================================== */

/*
AttrMutation = $extends (NodeMutation, {
     constructor: function (i, node, name, was) { NodeMutation.call (this, i, node, name, node.getAttribute (name), was) },
            push: function ()                   { this.put (this.value) },
            pull: function ()                   { this.put (this.was) },
            put:  function (x) {
                    if (x === null) { this.node.removeAttribute (this.name)    }
                               else { this.node.setAttribute    (this.name, x) } } })*/

/*  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

TextMutation = $extends (NodeMutation, {
     constructor: function (i, node, was) { NodeMutation.call (this, i, node, 'text', node.nodeValue, was) },
            push: function ()             { this.node.nodeValue = this.value },
            pull: function ()             { this.node.nodeValue = this.was } })

/*  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

InsertMutation = $extends (NodeMutation, {    
    constructor:               function (i, node) { NodeMutation.call (this, i, node, 'insert', node.treeLocation) },
           push: $log ($green (function ()        { this.node.treeLocation = this.value })),
           pull: $log ($red   (function ()        { this.value.parent.removeChild (this.node) })) })

/*  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

RemoveMutation = $extends (NodeMutation, {
    constructor:               function (i, node, was)   { NodeMutation.call (this, i, node, 'remove', null, was || node.treeLocation) },
           push: $log ($red   (function ()               { this.was.parent.removeChild (this.node) })),
           pull: $log ($green (function ()               { this.node.treeLocation = this.was })) })

/*  ======================================================================== */







