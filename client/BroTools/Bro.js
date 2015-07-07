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
            $assertTypeMatches (this.parse (), { before: 'string', after: 'string', arguments: [] })
            this.el = this.widgetContainer ().addClass (this.tool.constructor.name)
            this.el.append (this.widget (this.el)) },

        configure: _.identity,

        call: function () {
            return this.value },

        tool: $property (function () {
            return this.constructor.tool }),

        parseHints: function (parsed) {
            var varName = parsed.before.match (/var\s*(.+)\s*=.+/)
            var comment = parsed.after.match (/\/\/\s*(.+)/)
            return _.extend ({}, parsed,
                        varName ? { varName: varName[1] } : {},
                        comment ? { comment: comment[1] } : {}) },

        parse: function () { //console.log (this.expr.loc.start.column, this.where.source)
                    return this.parseHints (_.extend (this, {
                        before: this.where.source.substr (0, this.expr.loc.start.column),
                        after:  this.expr.loc.end.line === this.expr.loc.start.line ?
                                    this.where.source.substr (this.expr.loc.end.column, this.where.source.length - this.expr.loc.end.column) : '' })) },

        print: function () {
            try {
                    return this.before + escodegen.generate (this.updatedExpr (), { format: { indent: { style: '' }, newline: ' ' }})
                            .replace (/\n/g, ' ')
                            .replace (/\(/g, ' (') + this.after
            } catch (e) {
                log.error (e)
                return 'FAILURE' } },

        numberExpr: function (n) {
            var literal = { "type": "Literal", "value": Math.abs (n) }
            return (n < 0) ? {
                            "type": "UnaryExpression",
                            "operator": "-",
                            "argument": literal } : literal },

        updatedExpr: function () {
            if (this.value !== undefined) {
                this.expr.arguments[0] = this.numberExpr (this.value)
            }
            return this.expr },

        printValue: function () {
            return this.value + '' },

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
                            .append (this.headEl  = $('<span class="head">').text (this.varName || this.before.trimmed)
                                                                               .toggleClass ('var', this.varName !== undefined))

                            .append (this.valueEl = $('<span class="value">').text (this.printValue ()))

                            .append (this.restEl  = $('<span class="rest">')
                                                            .append ($('<em>').text (this.comment || this.after.trimmed)))) } }),
    
    BaseTool: $component ({

        init: function () { log.i ('BroTools™: installing', '$' + this.constructor.name)

            this.Entry = $extends (Bro.BaseEntry,
                            _.extend (this.constructor.Entry, { tool: $const (this) }))

            _.defineKeyword (this.constructor.name, this.call) },

        matchExpr: $memoized ($property (function () {
            return  $r.expr ('before',    $r.anything.text ('$' + this.constructor.name).anyOf.except.text ('(')).text('(').then (
                    $r.expr ('arguments', $r.anything.then ($r.expr ('inner', $r.anything.inParentheses).maybe).then ($r.anyOf.except.text (')'))).text (')').then (
                    $r.expr ('after',     $r.anything))).$ })),

        call: function (args) {

            var callArgs = _.asArray (arguments)
            var where = $callStack.safeLocation (2)
            var entry = Bro.locateEntry (where)

            if (!entry) {
                SourcePector.whatComponent (where, this.$ (function (compo) { if (!(compo in Bro.ignoreComponents)) {
                    SourcePector.locateStackEntry (where, this.$ (function (line, expr) {
                        _.tryEval (this.$ (function () { return new this.Entry ({
                                                                where:             _.extend (where, { source: line }),
                                                                compo:             compo,
                                                                expr:              expr,
                                                                initArguments:     callArgs,
                                                                value:             this.valueFromArguments.apply (null, callArgs) }) }),
                                        function (e) {
                                            UI.error (e) },

                                        function (entry) { if (entry) { Bro.addEntry (entry)
                                                                        entry.configure.apply (null, callArgs)
                                                           return entry } }) })) } })) }

            if (entry) {
                return entry.call.apply (null, callArgs) }
            else {
                return this.eval.apply (null, callArgs) } },

        valueFromArguments: _.identity,

        eval: function () {
            return this.valueFromArguments.apply (null, arguments) }
    }),

    Tool: function (def) {
        var toolPrototype = $extends (this.BaseTool, def)
        var toolInstance  = this.toolsByName[toolPrototype.name] = new toolPrototype ({ init: false })

        $global['$' + toolPrototype.name] = toolPrototype.stub || _.identity

        this.initialized (function () {
            toolInstance.init () })

        return toolPrototype },

    init: function () {

        this.ignoreComponents = _.index (_.coerceToArray (this.ignoreComponents || []))

        $(document).ready (this.$ (function () {
            this.el = $('<div class="tuning-hall visible">').appendTo (document.body)

            $('<button class="entry btn save-changes">Save changes</button>')
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
        this.entriesByComponentName[entry.compo] = (this.entriesByComponentName[entry.compo] || []).concat ([entry])
        this.entries.push (entry)
        this.addToDashboard (entry) },

    afterTune: function (where, callMe) {
        SourcePector.whatComponent (where, this.$ (function (compo) { if (compo) {
                                                                        (this.triggersByComponentName[compo] ||
                                                                        (this.triggersByComponentName[compo] = _.trigger ())) (callMe) } } )) },

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
                                        
                                        move:  this.$ (function (memo, offset) { handle.css (memo.add (offset).asLeftTop)
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

_.defineKeyword ('afterTune', function (what) { var where = $callStack.safeLocation (2)
    Bro.initialized (function () {
        Bro.afterTune (where, what) }) })

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


