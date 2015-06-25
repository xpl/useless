_.extend ($global, {
    $tune:      _.identity,
    $cubic:       Bezier.cubic1D,
    $afterTune: _.identity,
    $print:     _.identity,
    $log:       _.identity })

BroTools = $singleton (Component, {

    $defaults: {
        init: false,
        entries: [],
        entriesByStackLocation: {},
        entriesByComponentName: {},
        triggersByComponentName: {} },

    init: function () {

        _.extend ($global, {
            $tune:      this.tune,
            $cubic:     this.cubic,
            $afterTune: this.afterTune,
            $print:     this.print,
            $log:       this.log })

        $(document).ready (this.$ (function () {
            this.el = $('<div class="tuning-hall visible">').appendTo (document.body)

            $('<button class="entry save-changes">Save changes</button>')
                .click (this.saveChanges)
                .appendTo (this.el)

            $(document).keydown (this.$ (function (e) {
                if (e.keyCode === 192 /* ~ */) {
                    this.el.toggleClass ('visible') } })) })) },

    saveChanges: function () {
        SourcePector.saveChanges ()
        this.el.removeClass ('changed') },

    afterTune: function (callMe) {

        SourcePector.whatComponent ($callStack.safeLocation (2), this.$ (function (compo) { if (compo) {
            
            var trigger = (this.triggersByComponentName[compo] ||
                          (this.triggersByComponentName[compo] = _.trigger ()))

            trigger (callMe)

            _.each (this.entriesByComponentName[compo],
                function (entry) {
                    if (entry.sliddah) {
                        entry.sliddah.handle.text (trigger.queue.length) } })} })) },

    cubic: function (t, p1, p2, p3, p4) { var value = this.eat ([p1, p2, p3, p4], { cubic: true })
                return Bezier.cubic1D (t,
                    value[0], value[1], value[2], value[3]) },

    print: function (value, cfg) {
                return this.eat (value, _.extend ({ print: true }, cfg)) },

    log: function (value, cfg) {
                return this.eat (value, _.extend ({ log: true }, cfg)) },

    tune: function (value, cfg) {
                return this.eat (value, _.extend ({ slider: true }, cfg)) },

    eat: function (value, cfg) { cfg = cfg || {}

        var where = $callStack.clean.safeLocation (1)
        var entry = this.entriesByStackLocation[where.beforeParse]

        if (!entry && (entry =
                            this.entriesByStackLocation[where.beforeParse] =
                                this.addToDashboard (entry = _.extend ({}, cfg, { where: where, value: value })))) {
            this.entries.push (entry)
            this.investigateComponentForEntry (entry) }

        if (entry) {            if (entry.print) {
                                    entry.value = value
                                    entry.valueEl.text (_.stringify (value, { precision: cfg.precision || 3 })) }
            return entry.value }

        else {
            return value } },

    investigateComponentForEntry: function (entry) {
        
        SourcePector.whatComponent (entry.where, this.$ (function (compo) { entry.compo = compo
                    
                    if (entry.sliddah) {
                        entry.sliddah.handle.text (this.triggersByComponentName[compo].queue.length) }

                    this.entriesByComponentName[compo] = (this.entriesByComponentName[compo] || []).concat ([entry]) })) },

    parsePrintExpr: function (line) {
                           var match = line.match (/(.*\$print.+\()([^,\)]+)(.*)/)
                        return match && {
                                head: match[1], value: match[2], rest: match[3] } },

    parseTuneExpr: function (line) {
                           var match = line.match (/(.*\$tune.+\()([^,\)]+)(.*)/)
                        return match && {
                                head: match[1], value: parseFloat (match[2]), rest: match[3] } },

    parseCubicExpr: function (line) {
                           var match = line.match (/(.*\$cubic.+\([^,\)]+\,)([^,\)]+)\,([^,\)]+)\,([^,\)]+)\,([^,\)]+)(.*)/)
                        return match && {
                                cubic: true,
                                head:  match[1], value: [
                                                    parseFloat (match[2]),
                                                    parseFloat (match[3]),
                                                    parseFloat (match[4]),
                                                    parseFloat (match[5])], rest: match[6] } },

    parseHints: function (expr) {                               if (!expr) return undefined
        var varName = expr.head.match (/var\s*(.+)\s*=.+/)
        var comment = expr.rest.match (/\/\/\s*(.+)/)
        return _.extend (expr,
            varName ? { varName: varName[1] } : {},
            comment ? { comment: comment[1] } : {}) },

    parseEntry: function (entry) {
                        return this.parseHints (entry.print ?
                                    this.parsePrintExpr (entry.where.source) : (entry.cubic ?
                                    this.parseCubicExpr (entry.where.source) :
                                    this.parseTuneExpr  (entry.where.source))) },

    printExprValue: function (expr, precision) { precision = precision || 2
        return expr.cubic ?
            (_.map      (expr.value, function (x) { return _.toFixed (x,          precision) }).join (', ')) :
            (_.isNumber (expr.value) ?                     _.toFixed (expr.value, precision) : undefined) },

    printExpr: function (expr) {
                        return [expr.head, expr.cubic ?
                                                _.map (expr.value, _.toFixed3).join (', ') :
                                                _.toFixed3 (expr.value),
                                expr.rest].join ('') },

    patchEntrySource: function (entry, value) { SourcePector.patchLine (entry.where, function (text, apply) {

                        var expr    = BroTools.parseEntry (_.extend2 (entry, { where: { source: text }}))
                        var printed = expr && BroTools.printExpr  (_.extend  (expr,  { value: value }))
                        if (printed) {
                            apply (printed) } }) },

    addToDashboard: function (entry) { var expr = BroTools.parseEntry (entry)

        if (!expr) { log.error ('Failed to recognize:', entry.where.source); return undefined }

        entry.el = $('<div class="entry">')
                        .attr ('data-line', entry.where.line)
                        .toggleClass ('cubic', entry.cubic || false)
        
        var minors = this.el.children ().filter (function () { return $(this).integerAttr ('data-line') > entry.where.line })
        
        if (minors.length) {
            entry.el.insertBefore (minors[0]) }
        else {
            entry.el.appendTo (this.el) }

        var commitValueChange = this.$ (function (value) {

                                    entry.value = value
                                    entry.valueEl.text (BroTools.printExprValue (entry, 2))

                                    if (entry.compo && this.triggersByComponentName[entry.compo]) {
                                                       this.triggersByComponentName[entry.compo] (entry) }

                                    this.patchEntrySource (entry, value)
                                    this.el.addClass ('changed') })

        entry.el.append ($('<div class="src">')
            .append (entry.headEl  = $('<span class="head">').text (expr.varName || expr.head)
                                                             .toggleClass ('var', expr.varName !== undefined))

            .append (entry.valueEl = $('<span class="value">').text (BroTools.printExprValue (expr, 2)))

            .append (entry.restEl  = $('<span class="rest">')
                                            .append ($('<em>').text (expr.comment || expr.rest))))
        
        if (entry.cubic) {
            entry.el.append ((entry.cubicle = new Cubicle ({ value: entry.value })).dom)
            entry.cubicle.valueChange (commitValueChange) }

        else if (!entry.print) {
            entry.el.append ((entry.sliddah = new Sliddah ({
                                    min:   entry.min == undefined ? -1 : entry.min,
                                    max:   entry.max == undefined ?  1 : entry.max,
                                    value: entry.value })).dom)

            entry.sliddah.valueChange (commitValueChange) }

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

    patchLine: function (number, patch) { //log.warn (this.fileName + ':' + number, '\t', text)
        var line = this.lines[number - 1]
        if (line) {
            patch (line.text, this.$ (function (result) {
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


