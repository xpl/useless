_ = require ('underscore')


/*  Self-awareness module
    ======================================================================== */

_.tests.reflection = {

    'file paths': function () {
        $assert ($sourcePath .length > 0)
        $assert ($uselessPath.length > 0) },

    'readSource': function () {
        _.readSource ($uselessPath + 'useless.js', function (text) {
            $assert (text.length > 0) })

        _.readSourceLine ($uselessPath + 'useless.js', 0, function (line) {
            $assert (line.length > 0) }) },

    'CallStack from error': function () {
        try {
            throw new Error ('oh fock') }
        catch (e) {
            $assertTypeof (CallStack.fromError (e), CallStack) } },

    '$callStack': function () {

        /*  That's how you access call stack at current location
         */
        var stack = $callStack

        /*  It is an array of entries...
         */
        $assert (_.isArray (stack))

        /*  ...each having following members
         */
        $assertTypeof (stack[0], {
            callee:         'string',       // function name
            calleeShort:    'string',       // short function name (only the last part of dot-sequence)
            file:           'string',       // full path to source file at which call occurred
            fileName:       'string',       // name only (with extension)
            fileShort:      'string',       // path relative to $sourcePath
            thirdParty:     'boolean',      // denotes whether the call location occured at 3rd party library
            line:           'number',       // line number
            column:         'number',       // character number
            source:         'string',       // source code (may be not ready right away)
            sourceReady:    'function' })   // a barrier, opened when source is loaded (see dynamic/stream.js on how-to use)

        /*  $callStack is CallStack instance, providing some helpful utility:
         */
        $assert (_.isTypeOf (CallStack, stack))

        /*  1. clean CallStack (with 3rdparty calls stripped)
         */
        $assert (_.isTypeOf (CallStack, stack.clean))

        /*  2. shifted by some N (useful for error reporting, to strip error reporter calls)
         */
        $assert (_.isTypeOf (CallStack, stack.offset (2)))

        /*  3. filter and reject semantics supported, returning CallStack instances
         */
        $assert (_.isTypeOf (CallStack, stack.filter (_.identity)))
        $assert (_.isTypeOf (CallStack, stack.reject (_.identity)))

        /*  4. source code access, either per entry..
         */
        if (Platform.NodeJS) { // on client it's async so to test it properly, need to extract this test part to separate async routine
            $assertCalls (1, function (mkay) {
                stack[0].sourceReady (function (src) { mkay ()  // sourceReady is barrier, i.e. if ready, called immediately
                    $assert (typeof src, 'string') }) })

        /*  5. ..or for all stack
         */
            $assertCalls (1, function (mkay) {
                stack.sourcesReady (function () { mkay ()       // sourcesReady is barrier, i.e. if ready, called immediately
                    _.each (stack, function (entry) {
                        $assert (typeof entry.source, 'string') }) }) })

        /*  Safe location querying
         */
        $assertCPS (stack.safeLocation (777).sourceReady, '??? WRONG LOCATION ???') } },

    'Prototype.$sourceFile': function () {
        if (Platform.NodeJS) {
            var Proto = $prototype ()
            $assert (Proto.$sourceFile, 'base/reflection.js') } }
}


/*  Custom syntax (defined in a way that avoids cross-dependency loops)
 */
_.defineKeyword ('callStack',   function () {
    return CallStack.fromRawString (CallStack.currentAsRawString).offset (Platform.NodeJS ? 1 : 0) })

_.defineKeyword ('currentFile', function () {
    return (CallStack.rawStringToArray (CallStack.currentAsRawString)[Platform.NodeJS ? 3 : 1] || { file: '' }).file })

_.defineKeyword ('uselessPath', _.memoize (function () {
    return _.initial ($currentFile.split ('/'), Platform.NodeJS ? 2 : 1).join ('/') + '/' }) )

_.defineKeyword ('sourcePath', _.memoize (function () { var local = ($uselessPath.match (/(.+)\/node_modules\/(.+)/) || [])[1]
    return local ? (local + '/') : $uselessPath }))

/*  Source code access (cross-platform)
 */
_.readSourceLine = function (file, line, then) {
    _.readSource (file, function (data) {
        then ((data.split ('\n')[line] || '').trimmed) }) }


_.readSource = _.cps.memoize (function (file, then) {
                                if (!file || !file.match (/.+\.js/)) { // oh, dont waste my time.. are you even script?
                                    then ('') }
                                else {
                                    if (Platform.NodeJS) {
                                        try {
                                            then (require ('fs').readFileSync (file, { encoding: 'utf8' }) || '') }
                                        catch (e) {
                                            then ('') } }
                                    else {
                                        jQuery.get (file, then, 'text') } } })


/*  Callstack API
 */
CallStack = $extends (Array, {

    current: $static ($property (function () {
        return CallStack.fromRawString (CallStack.currentAsRawString).offset (1) })),

    fromError: $static (function (e) {
        if (e.parsedStack) {
            return CallStack.fromParsedArray (_.map (e.parsedStack, function (entry) {
                return _.extend (entry, { sourceReady: _.constant (entry.source) }) })) }
        else {
            return CallStack.fromRawString (e.stack) } }),

    locationEquals: $static (function (a, b) {
        return (a.file === b.file) && (a.line === b.line) && (a.column === b.column) }),

    safeLocation: function (n) {
        return this[n] || {
            callee: '', calleeShort: '', file: '',
            fileName: '', fileShort: '', thirdParty:    false,
            source: '??? WRONG LOCATION ???',
            sourceReady: _.cps.constant ('??? WRONG LOCATION ???') } },

    clean: $property (function () {
        return this.reject (_.property ('thirdParty')) }),

    asArray: $property (function () {
        return _.asArray (this) }),

    offset: function (N) {
        return CallStack.fromParsedArray (_.rest (this, N)) },

    filter: function (fn) {
        return CallStack.fromParsedArray (_.filter (this, fn)) },

    reject: function (fn) {
        return CallStack.fromParsedArray (_.reject (this, fn)) },

    reversed: $property (function () {
        return CallStack.fromParsedArray (_.reversed (this)) }),

    sourcesReady: function (then) {
        return _.allTriggered (_.pluck (this, 'sourceReady'), then) },

    /*  Internal impl.
     */
    constructor: function (arr) { Array.prototype.constructor.call (this)
        for (var i = 0, n = arr.length; i < n; i++) {
            this.push (arr[i]) } },

    fromParsedArray: $static (function (arr) {
        return new CallStack (arr) }),

    currentAsRawString: $static ($property (function () {
        var cut = _.platform ().engine === 'browser' ? 3 : 2
        return _.rest (((new Error ()).stack || '').split ('\n'), cut).join ('\n') })),

    shortenPath: $static (function (file) {
                    return file.replace ($sourcePath, '') }),

    isThirdParty: $static (function (file) { var local = file.replace ($sourcePath, '')
                    return (local.indexOf ('/node_modules/') >= 0) ||
                           (file.indexOf ('/node_modules/') >= 0 && !local) ||
                           (local.indexOf ('underscore') >= 0) ||
                           (local.indexOf ('jquery') >= 0) }),

    fromRawString: $static (_.sequence (
        function (rawString) {
            return CallStack.rawStringToArray (rawString) },

        function (array) {
            return _.map (array, function (entry) { var fileShort = CallStack.shortenPath (entry.file)
                return _.extend (entry, {
                            calleeShort:    _.last (entry.callee.split ('.')),
                            fileName:       _.last (entry.file.split ('/')),
                            fileShort:      fileShort,
                            thirdParty:     CallStack.isThirdParty (entry.file) }) }) },

        function (parsedArray) {
            return _.map (parsedArray, function (entry) {
                    entry.source = ''
                    entry.sourceReady = _.barrier ()

                    _.readSourceLine (entry.file, entry.line - 1, function (src) {
                        entry.source = src
                        entry.sourceReady (src) })

                    return entry }) },

        function (parsedArrayWithSourceLines) { return CallStack.fromParsedArray (parsedArrayWithSourceLines) })),

    rawStringToArray: $static (function (rawString) {
        var lines = _.rest ((rawString || '').split ('\n'), _.platform ().engine === 'browser' ? 1 : 0)
        return _.map (lines, function (line_) {
            var line = line_.trimmed
            var callee, fileLineColumn = []
            var match = line.match (/at (.+) \((.+)\)/)
            if (match) {
                callee = match[1]
                fileLineColumn = _.rest (match[2].match (/(.*):(.+):(.+)/) || []) }
            else {
                var planB = line.match (/at (.+)/)
                if (planB && planB[1]) {
                    fileLineColumn = _.rest (planB[1].match (/(.*):(.+):(.+)/) || []) }}
            return {
                beforeParse: line,
                callee: callee || '',
                file: fileLineColumn[0] || '',
                line: (fileLineColumn[1] || '').integerValue,
                column: (fileLineColumn[2] || '').integerValue } }) }) })


/*  Prototype.$sourceFile
 */
$prototype.macro (function (def, base) {
    var stackEntry = $callStack[Platform.NodeJS ? 5 : 5]
    def.$sourceFile = $static ($property (stackEntry ? stackEntry.fileShort : 'unknown'))
    return def })





