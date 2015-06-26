Bro = $singleton (Component, {

    $defaults: {
        init: false,
        entries: [],
        entriesByStackLocation: {},
        entriesByComponentName: {},
        triggersByComponentName: {},
        toolsByName: {} },

    BaseEntry: $component ({

        init: function () {
            $assertTypeof (this.parse (), { before: 'string', after: 'string', arguments: [] })
            this.el = this.widgetContainer ()
            this.el.append (this.widget ()) },

        configure: _.identity,

        call: function () {
            return this.value },

        parseHints: function (parsed) {
            var varName = parsed.before.match (/var\s*(.+)\s*=.+/)
            var comment = parsed.after.match (/\/\/\s*(.+)/)
            return _.extend ({}, parsed,
                        varName ? { varName: varName[1] } : {},
                        comment ? { comment: comment[1] } : {}) },

        parse: function () {
                    var parsed = this.constructor.tool.matchExpr.parse (this.where.source)
                    return _.extend (this, this.parseHints ({
                        before:           parsed.before,
                        arguments: _.map (parsed.arguments.split (','), _.trimmed),
                        after:            parsed.after })) },

        print: function () {
                    return [this.before, '(' + this.printArguments () + ')', this.after].join ('') },

        printValue: function () {
            return this.value + '' },

        printArguments: function () {
            this.arguments[0] = this.printValue ()
            return this.arguments.join (', ') },

        patchSource: function () { SourcePector.patchLine (
                                        this.where,
                                        this.$ (function (text, apply) { apply (this.printValue ()) })) },

        commitValueChange: function (value) {
            this.value = value
            this.valueEl.text (this.printValue ())
            Bro.entryValueChange (this) },

        widget: _.notImplemented,

        widgetContainer: function () {
            return $('<div class="entry">').attr ('data-line', this.where.line)
                        .append ($('<div class="src">')
                            .append (this.headEl  = $('<span class="head">').text (this.varName || this.before)
                                                                               .toggleClass ('var', this.varName !== undefined))

                            .append (this.valueEl = $('<span class="value">').text (this.printValue ()))

                            .append (this.restEl  = $('<span class="rest">')
                                                            .append ($('<em>').text (this.comment || this.after)))) } }),
    
    BaseTool: $component ({

        init: function () { log.i ('BroTools™: installing', '$' + this.constructor.name)

            this.Entry = $extends (Bro.BaseEntry,
                            _.extend (this.constructor.Entry, { tool: $const (this) }))

            _.defineKeyword (this.constructor.name, this.call) },

        matchExpr: $memoized ($property (function () {
            return  $r.expr ('before',     $r.anything.text ('$' + this.constructor.name).something).then (
                    $r.expr ('arguments',  $r.someOf.except.text (')')).inParentheses.then (
                    $r.expr ('after',      $r.anything))).$ })),

        call: function (args) {
            var callArgs = _.asArray (arguments)
            var where = $callStack.safeLocation (2)
            var entry = Bro.locateEntry (where)
            if (!entry) {
                entry = _.tryEval (this.$ (function () { return new this.Entry ({
                                                            where:             where,
                                                            initArguments:     callArgs,
                                                            value:             this.valueFromArguments.apply (null, callArgs) }) }),
                                    function (e) {
                                        UI.error (e) },

                                    function (entry) { if (entry) { Bro.addEntry (entry)
                                                                    entry.configure.apply (null, callArgs)
                                                       return entry } }) }

            if (entry) {
                return entry.call.apply (null, callArgs) }
            else {
                return this.eval.apply (null, callArgs) } },

        valueFromArguments: _.identity,

        eval: function () {
            return this.valueFromArguments.apply (null, arguments) }
    }),

    Tool: function (def) {
        var tool = $extends (this.BaseTool, def)
        this.toolsByName[tool.name] = new tool ()
        return tool },

    init: function () {

        _.defineKeyword ('afterTune', this.afterTune)

        $(document).ready (this.$ (function () {
            this.el = $('<div class="tuning-hall visible">').appendTo (document.body)

            $('<button class="entry save-changes">Save changes</button>')
                .click (this.saveChanges)
                .appendTo (this.el)

            $(document).keydown (this.$ (function (e) {
                if (e.keyCode === 192 /* ~ */) {
                    this.el.toggleClass ('visible') } })) })) },

    entryValueChange: function (entry) {
        this.el.addClass ('changed')
        SourcePector.patchLine (entry.where, function (text, apply) {
            apply (entry.print ()) })

        if (this.triggersByComponentName[entry.compo]) {
            this.triggersByComponentName[entry.compo] () } },

    saveChanges: function () {
        SourcePector.saveChanges ()
        this.el.removeClass ('changed') },

    locateEntry: function (where) {
        return this.entriesByStackLocation[where.beforeParse] },

    addEntry: function (entry) {
        this.entriesByStackLocation[entry.where.beforeParse] = entry
        this.entries.push (entry)
        this.investigateComponentForEntry (entry)
        this.addToDashboard (entry) },

    afterTune: function (callMe) {
        SourcePector.whatComponent ($callStack.safeLocation (2), this.$ (function (compo) { if (compo) {
                                                                        (this.triggersByComponentName[compo] ||
                                                                        (this.triggersByComponentName[compo] = _.trigger ())) (callMe) } } )) },

    investigateComponentForEntry: function (entry) {
        
        SourcePector.whatComponent (entry.where, this.$ (function (compo) {
                    entry.compo = compo
                    this.entriesByComponentName[compo] = (this.entriesByComponentName[compo] || []).concat ([entry]) })) },

    addToDashboard: function (entry) {
                        var minors = this.el.children ().filter (function () { return $(this).integerAttr ('data-line') > entry.where.line })
                        if (minors.length) {
                            entry.el.insertBefore (minors[0]) }
                        else {
                            entry.el.appendTo (this.el) }
                        return entry } })

Cubicle = $component ({

    value: $observableProperty ([0,0,1,1]),

    init: function () {

                this.dom = $('<div class="cubicle">')
                    .append (this.canvas  = $('<canvas width="200" height="200">'))
                    .append (this.handle1 = $('<div class="handle handle1">'))
                    .append (this.handle2 = $('<div class="handle handle1">'))

                _.each ([
                    this.handle1,
                    this.handle2], this.$ (function (handle) { handle.drag ({
                                                                    
                                        start: this.$ (function () {
                                                    this.dragging = true; return handle.offsetInParent () }),
                                        
                                        move:  this.$ (function (memo, offset) { handle.css (memo.add (offset).cssLeftTop)
                                                    this.update () }),
                                       
                                        end:   this.$ (function () {
                                                    this.dragging = false }) }) }))

                this.update ()

                this.valueChange (function (pts) {
                    this.cubic = Bezier.make.cubic1D (pts[0], pts[1], pts[2], pts[3])
                    this.adjustHandles ()
                    this.redraw () }) },

    adjustHandles: function () { if (!this.dragging) { var cnv = this.canvas[0]

            this.handle1.css ({ left: cnv.width * this.value[0],
                                top: cnv.height * this.value[1] })

            this.handle2.css ({ left: cnv.width * this.value[2],
                                top: cnv.height * this.value[3] }) } },

    update: function () { var cnv = this.canvas[0],
                              pt1 = this.handle1.offsetInParent (),
                              pt2 = this.handle2.offsetInParent ()
        this.value =
            [   pt1.x / cnv.width,
                pt1.y / cnv.height,
                pt2.x / cnv.width,
                pt2.y / cnv.height ] },

    redraw: function () { var cnv = this.canvas[0],
                              ctx = this.canvas[0].getContext ('2d')

        ctx.clearRect (0, 0, cnv.width, cnv.height)

        if (this.cubic) { ctx.beginPath (); var x = 0, cubic = this.cubic

                ctx.moveTo (0, 0)
            _.times (cnv.width, function (x) { var tx = x / cnv.width
                ctx.lineTo (x, cubic (tx) * cnv.height) })
                ctx.stroke () } },

    destroy: function () {
        this.dom.destroy ()
        delete this.dom } })

Sliddah = $component ({

    $requires: {
        min:   'number',
        max:   'number' },

    value: $observableProperty (),

    init: function () {
        this.dom = $('<div class="sliddah">')
            .append (this.handle = $('<em>'))
            .drag ({
                callMoveAtStart: true,
                move: this.$ (function (memo, where, offset) {
                    this.value = _.rescale (offset.x, [0, this.dom.width ()], [this.min, this.max], { clamp: true }) }) })

        _.delay (this.$ (function () {
            this.valueChange.readWith (this.$ (function (v) {
                this.handle.css ({
                    left: Math.round (_.rescale (v,
                                        [this.min, this.max],
                                        [0, this.dom.width ()], { clamp: true })) }) })) })) },

    destroy: function () {
        this.dom.destroy ()
        delete this.dom } })

SourcePector = $singleton (Component, {

    $defaults: {
        filesByName: {} },

    init: function () {},

    saveChanges: function () {
        _.each (this.filesByName, function (file) {
            if (file.changed) {
                file.saveChanges () } }) },

    file: function (name) {
                return this.filesByName[name] ||
                      (this.filesByName[name] = new SourceFile ({ fileName: name })) },
         
    patchLine: function (stackEntry, patch) { if (stackEntry && stackEntry.fileName) {
                    this.file (stackEntry.fileName).ready (function () {
                        this.patchLine (stackEntry.line, patch) }) } },

    whatComponent: function (stackEntry, then) { if (stackEntry && stackEntry.fileName) {
                    this.file (stackEntry.fileName).ready (function () {
                        then (this.whatComponent (stackEntry.line)) }) } } })

SourceFile = $component ({

    $requires: {
        fileName: 'string' },

    $defaults: {
        text:       undefined,
        lines:      [] },

    ready: $barrier (),

    init: function () { _.readSource ('/static/' + this.fileName, this.$ (function (text) {

            this.text = text
            this.lines = _.map (text.split ('\n'), function (line, i) {

                var def = (line.indexOf ('$component') >= 0) ||
                          (line.indexOf ('$prototype') >= 0) ||
                          (line.indexOf ('$extends')   >= 0) ||
                          (line.indexOf ('$singleton') >= 0)
                return {
                    number: (i + 1),
                    text:    line,
                    compo:  (def && line.split (' ')[0]) || undefined } })

            _.reduce (this.lines, function (compo, line) {
                                        return line.compo ?
                                            ((line.compo === compo) ? compo : line.compo) :
                                             (line.compo   = compo) }, undefined)
            this.ready (true) })) },

    patchLine: function (number, patch) { 
        var line = this.lines[number - 1]
        if (line) {
            patch (line.text, this.$ (function (result) { //log.warn (this.fileName + ':' + number, '\t', result)
                                            line.text = result
                                            this.changed = true })) } },

    saveChanges: function (then) {
        this.changed = false
        API.post ('source/static/' + this.fileName, {
            what:    { text: _.pluck (this.lines, 'text').join ('\n') },
            failure: UI.error,
            success: this.$ (function () {
                log.ok (this.fileName, '— successfully saved')
                if (then) { then () } }) }) },

    whatComponent: function (lineNumber) {
            return this.lines[lineNumber - 1] && this.lines[lineNumber - 1].compo } })


