"use strict";

/*  Self-awareness module
    ======================================================================== */

_.hasReflection = true

_.tests.reflection = {

    'file paths': function () {
        $assert (typeof $uselessPath, 'string')
        $assert ($sourcePath .length > 0)
        $assert ($uselessPath.length > 0) },

    'readSource': function () { var uselessJS = $uselessPath + $uselessFile

        SourceFiles.read (uselessJS, function (text) {
            $assert (text.length > 0) })

        SourceFiles.line (uselessJS, 0, function (line) {
            $assert (line.length > 0) }) },

    'CallStack from error': function () {
        try {
            throw new Error ('oh fock') }
        catch (e) {
            $assertTypeMatches (CallStack.fromError (e), CallStack) } },

    '$callStack': function (testDone) {

        /*  That's how you access call stack at current location
         */
        var stack = $callStack

        /*  It is an array of entries...
         */
        $assert (_.isArray (stack))

        /*  ...each having following members
         */
        $assertTypeMatches (stack[0], {
            callee:         'string',       // function name
            calleeShort:    'string',       // short function name (only the last part of dot-sequence)
            file:           'string',       // full path to source file at which call occurred
            fileName:       'string',       // name only (with extension)
            fileShort:      'string',       // path relative to $sourcePath
            thirdParty:     'boolean',      // denotes whether the call location occured at 3rd party library
            index:          'boolean',      // denotes whether the call location occured at index page
           'native':        'boolean',      // denotes whether the call location occured in native impl.
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

        $assertEveryCalled ($async (function (sourceReady, sourcesReady, safeLocationReady) {

            /*  4. source code access, either per entry..
             */
            stack[0].sourceReady (function (src) {               // sourceReady is barrier, i.e. if ready, called immediately
                $assert (typeof src, 'string'); sourceReady () })

            /*  5. ..or for all stack
             */
            stack.sourcesReady (function () {                     // sourcesReady is barrier, i.e. if ready, called immediately
                _.each (stack, function (entry) {
                    $assert (typeof entry.source, 'string') }); sourcesReady () })

            /*  Safe location querying
             */
            stack.safeLocation (7777).sourceReady (function (line) {
                $assert ('??? WRONG LOCATION ???', line); safeLocationReady () }) }), testDone) }
}

$global.property ('$callStack',   () => CallStack.fromRawString (CallStack.currentAsRawString).offset ($platform.NodeJS ? 1 : 0))
$global.property ('$currentFile', () => (CallStack.rawStringToArray (CallStack.currentAsRawString)[$platform.NodeJS ? 3 : 1] || { file: '' }).file)
$global.property ('$uselessPath', _.memoize (function () { return _.initial (__filename.split ('/'), $platform.NodeJS ? 2 : 1).join ('/') + '/' }))
$global.property ('$sourcePath',  _.memoize (function () {
                                                    var local = ($uselessPath.match (/(.+)\/node_modules\/(.+)/) || [])[1]
                                                    return local ? (local + '/') : $uselessPath }))

/*  Port __filename for browsers
 */
if ($platform.Browser) {
    $global.property ('__filename', () => $currentFile) }


/*  Source code access (cross-platform)
 */
$global.SourceFiles = $singleton (Component, {

    /*apiConfig: {
        port:      1338,
        hostname: 'locahost',
        protocol: 'http:' },*/

    line: function (file, line, then) {
        SourceFiles.read (file, function (data) {
            then ((data.split ('\n')[line] || '').trimmed) }) },

    read: $memoizeCPS (function (file, then) {
        if (file.indexOf ('<') < 0) { // ignore things like "<anonymous>"
            try {
                if ($platform.NodeJS) {
                    then (require ('fs').readFileSync (file, { encoding: 'utf8' }) || '') }
                else {
                    /*  Return response body regardless of status code
                     */
                    var xhr = new XMLHttpRequest ()
                    xhr.open ('GET', file, true)
                    xhr.onreadystatechange = function () { if (xhr.readyState == 4) { then (xhr.responseText) } }
                    xhr.send (null) } }
            catch (e) {
                then ('') } }
        else {
            then ('') } }),

    write: function (file, text, then) {

        if ($platform.NodeJS) {

            this.read (file, function (prevText) { // save previous version at <file>.backups/<date>

                var fs   = require ('fs'),
                    opts = { encoding: 'utf8' }

          try { fs.mkdirSync     (file + '.backups') } catch (e) {}
                fs.writeFileSync (file + '.backups/' + Date.now (), prevText, opts)
                fs.writeFileSync (file,                             text,     opts)

                then () }) }
            
        else {
            JSONAPI
                .post ('source/' + file, _.extend2 ({}, this.apiConfig, { what: { text: text } }))
                .then (function () {
                    log.ok (file, '— successfully saved')
                    if (then) {
                        then () } }) }} })


/*  Callstack API
 */
$global.CallStack = $extends (Array, {

    current: $static ($property (function () {
        return CallStack.fromRawString (CallStack.currentAsRawString).offset (1) })),

    fromError: $static (function (e) {
        if (e && e.parsedStack) {
            return CallStack.fromParsedArray (e.parsedStack).offset (e.stackOffset || 0) }
        else if (e && e.stack) {
            return CallStack.fromRawString (e.stack).offset (e.stackOffset || 0) }
        else {
            return CallStack.fromParsedArray ([]) } }),

    fromErrorWithAsync: $static (function (e) {
        var stackEntries = CallStack.fromError (e),
            asyncContext = e.asyncContext

        while (asyncContext) {
            stackEntries = stackEntries.concat (CallStack.fromRawString (asyncContext.stack))
            asyncContext = asyncContext.asyncContext }

        return stackEntries.mergeDuplicateLines }),

    locationEquals: $static (function (a, b) {
        return (a.file === b.file) && (a.line === b.line) && (a.column === b.column) }),

    safeLocation: function (n) {
        return this[n] || {
            callee: '', calleeShort: '', file: '',
            fileName: '', fileShort: '', thirdParty:    false,
            source: '??? WRONG LOCATION ???',
            sourceReady: _.barrier ('??? WRONG LOCATION ???') } },

    mergeDuplicateLines: $property (function () {
        return CallStack.fromParsedArray (
            _.map (_.partition2 (this, function (e) { return e.file + e.line }),
                    function (group) {
                        return _.reduce (_.rest (group), function (memo, entry) {
                            memo.callee      = (memo.callee      || '<anonymous>') + ' → ' + (entry.callee      || '<anonymous>')
                            memo.calleeShort = (memo.calleeShort || '<anonymous>') + ' → ' + (entry.calleeShort || '<anonymous>')
                            return memo }, _.clone (group[0])) })) }),

    clean: $property (function () {
        var clean = this.mergeDuplicateLines.reject (function (e, i) { return (e.thirdParty || e.hide) && (i !== 0) })
        return (clean.length === 0) ? this : clean }),

    asArray: $property (function () {
        return _.asArray (this) }),

    offset: function (N) {
        return (N && CallStack.fromParsedArray (_.rest (this, N))) || this },

    initial: function (N) {
        return (N && CallStack.fromParsedArray (_.initial (this, N))) || this },

    concat: function (stack) {
        return CallStack.fromParsedArray (this.asArray.concat (stack.asArray)) },

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

        _.each (arr, function (entry) {
            if (!entry.sourceReady) {
                 entry.sourceReady = _.barrier ()
                 SourceFiles.line ((entry.remote ? 'api/source/' : '') + entry.file, entry.line - 1, function (src) {
                    entry.hide = src.contains ('// @hide')
                    entry.sourceReady (entry.source = src.replace ('// @hide', '')) }) }

            this.push (entry) }, this) },

    fromParsedArray: $static (function (arr) {
        return new CallStack (arr) }),

    currentAsRawString: $static ($property (function () {
        var cut = $platform.Browser ? 3 : 2
        return _.rest (((new Error ()).stack || '').split ('\n'), cut).join ('\n') })),

    shortenPath: $static (function (path) {
                    var relative = path.replace ($uselessPath, '')
                                       .replace ($sourcePath,  '')
                    return (relative !== path)
                        ? relative.replace (/^node_modules\//, '')
                        : path.split ('/').last }), // extract last part of /-separated sequence

    isThirdParty: $static (_.bindable (function (file) { var local = file.replace ($sourcePath, '')
                    return ($platform.NodeJS && (file[0] !== '/')) || // from Node source
                           (local.indexOf ('/node_modules/') >= 0) ||
                           (file.indexOf  ('/node_modules/') >= 0 && !local) ||
                           (local.indexOf ('underscore') >= 0) ||
                           (local.indexOf ('jquery') >= 0) })),

    fromRawString: $static (_.sequence (
        function (rawString) {
            return CallStack.rawStringToArray (rawString) },

        function (array) {
            return _.map (array, function (entry) {
                return _.extend (entry, {
                            calleeShort:    _.last (entry.callee.split ('.')),
                            fileName:       _.last (entry.file.split ('/')),
                            fileShort:      CallStack.shortenPath (entry.file),
                            thirdParty:     CallStack.isThirdParty (entry.file) && !entry.index }) }) },

        function (parsedArrayWithSourceLines) { return CallStack.fromParsedArray (parsedArrayWithSourceLines) })),

    rawStringToArray: $static (function (rawString) { var lines = (rawString || '').split ('\n')

        return _.filter2 (lines, function (line) { line = line.trimmed

            var callee, fileLineColumn = [], native_ = false
            var planA = undefined, planB = undefined

            if ((planA = line.match (/at (.+) \((.+)\)/)) ||
                (planA = line.match (/(.*)@(.*)/))) {

                callee         =         planA[1]
                native_        =        (planA[2] === 'native')
                fileLineColumn = _.rest (planA[2].match (/(.*):(.+):(.+)/) || []) }

            else if ((planB = line.match (/^(at\s+)*(.+):([0-9]+):([0-9]+)/) )) {
                fileLineColumn = _.rest (planB, 2) }

            else {
                return false } // filter this shit out

            if ((callee || '').indexOf ('__supressErrorReporting') >= 0) {
                return false }

            return {
                beforeParse: line,
                callee:      callee || '',
                index:       $platform.Browser && (fileLineColumn[0] === window.location.href),
               'native':     native_,
                file:        fileLineColumn[0] || '',
                line:       (fileLineColumn[1] || '').integerValue,
                column:     (fileLineColumn[2] || '').integerValue } }) }) })

/*  Reflection for $prototypes
 */

_.tests.prototypeMeta = {

    'Prototype.$meta': function (done) {
        var Dummy = $prototype ()

        Dummy.$meta (function (meta) {
            $assertMatches (meta, { name: 'Dummy', type: 'prototype' })
            done () }) },

    'Trait.$meta': function (done) {
        var Dummy = $trait ()
        Dummy.$meta (function (meta) {
            $assertMatches (meta, { name: 'Dummy', type: 'trait' })
            done () }) },

    'String.ify': function () {

        var Proto = $prototype ({})

        $assert (String.ify (Proto), $platform.NodeJS ? 'Proto ()' : '<prototype>')
    }
}

$prototype.impl.findMeta = function (stack) {

    return function (then) {

        _.cps.find (CallStack.fromRawString (stack).reversed,

                    function (entry, found) {
                        entry.sourceReady (function (text) { var match = (text || '').match (
                                                                             /([A-z]+)\s*=\s*\$(prototype|singleton|component|extends|trait|aspect)/)
                            found ((match && {
                                name: match[1],
                                type: match[2],
                                file: entry.fileShort }) || false) }) },

                    function (found) {
                        then (found || {}) }) } }

$prototype.macro (function (def, base) {

    if (typeof Symbol !== 'undefined') {

        def.constructor[Symbol.for ('String.ify')] = function (ctx) {

            if ($platform.NodeJS) {
                var name = ''
                this.$meta (function (values) { name = ((values.name === 'exports') ? values.file : values.name) })
                return name && (name + ' ()') }

            else {
                return '<prototype>' } } }

    if (!def.$meta) {

        var findMeta = _.cps.memoize ($prototype.impl.findMeta (CallStack.currentAsRawString))

        _.defineMemoizedProperty (findMeta, 'promise', function () {
              return new Promise (findMeta) })

        def.$meta = $static (findMeta) }

    return def })




