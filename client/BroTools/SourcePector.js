SourcePector = $singleton (Component, {

    $defaults: {
        filesByName: {} },

    init: function () {},

    saveChanges: function () {
        _.each (this.filesByName, function (file) {
            if (file.changed) {
                file.saveChanges () } }) },

    locateStackEntry: function (stackEntry, then) {
        return this.fileFor (stackEntry).locateStackEntry (stackEntry, then) },

    fileFor: function (stackEntry) {
        return stackEntry.fileName && this.file (stackEntry.fileName) },

    file: function (name) {
                return this.filesByName[name] ||
                      (this.filesByName[name] = new SourceFile ({ fileName: name })) },
         
    patchLine: function (stackEntry, patch) { if (stackEntry && stackEntry.fileName) {
                    this.fileFor (stackEntry).ready (function () {
                        this.patchLine (stackEntry.line, patch) }) } },

    whatComponent: function (stackEntry, then) { if (stackEntry && stackEntry.fileName) {
                    this.fileFor (stackEntry).ready (function () {
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
            this.parsed = esprima.parse (text, { loc: true, comment: true })
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

    locateStackEntry: function (stackEntry, then) { this.ready (function () { var line = stackEntry.line, col = stackEntry.column
            then (this.lines[line - 1].text,
                _.findFind (this.parsed, function (expr) {
                    if (expr && expr.loc && expr.type === 'CallExpression') {
                        return (line === expr.loc.start.line && col >= expr.loc.start.column && col <= expr.loc.end.column) }
                    else {
                        return false } })) }) },

    patchLine: function (number, patch) { 
        var line = this.lines[number - 1]
        if (line) {
            patch (line.text, this.$ (function (result) { log.warn (this.fileName + ':' + number, '\t', result)
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