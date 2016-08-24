"use strict";

/*  ------------------------------------------------------------------------ */

const O = Object

/*  ------------------------------------------------------------------------ */

_.hasReflection = true

/*  ------------------------------------------------------------------------ */

$global.getSource = require ('get-source')

/*  ------------------------------------------------------------------------ */

$global.StackTracey = O.assign (require ('stacktracey'), {

    fromErrorWithAsync (e) {

        let stackEntries = new StackTracey (e),
            asyncContext = e.asyncContext

        while (asyncContext) {
            stackEntries = stackEntries.concat (new StackTracey (asyncContext.stack))
            asyncContext = asyncContext.asyncContext }

        return stackEntries.mergeRepeatedLines }
})

/*  ------------------------------------------------------------------------ */

_.tests.reflection = {

    'file paths': function () {
        $assert (typeof $uselessPath, 'string')
        $assert ($sourcePath .length > 0)
        $assert ($uselessPath.length > 0) },
}

;(function () {

    var currentFile = $platform.Browser
                        ? ((new StackTracey ())[2] || { file: '' }).file
                        : __filename

    $global.const ('$uselessPath', _.initial (currentFile.split ('/'), $platform.NodeJS ? 2 : 1).join ('/') + '/')
    $global.const ('$sourcePath',  (function () {
                                        var local = ($uselessPath.match (/(.+)\/node_modules\/(.+)/) || [])[1]
                                        return local ? (local + '/') : $uselessPath }) ())

}) ();

/*  ------------------------------------------------------------------------ */

const asTable = require ('as-table')

StackTracey.prototype[Symbol.for ('String.ify')] = function (stringify) {

    return asTable (this.map (entry => [
                        '\t' + 'at ' + entry.calleeShort.slice (0, 30),
                        (entry.fileShort && (entry.fileShort + ':' + entry.line)) || '',
                        (entry.sourceLine.trim () || '').slice (0, 80) ]))
}

Error.prototype[Symbol.for ('String.ify')] = function (stringify) {

    try {        
        var stack   = StackTracey.fromErrorWithAsync (this).slice (this.stackOffset || 0).clean
        var why     = stringify.limit ((this.message || '').replace (/\r|\n/g, '').trim (), 120)

        return ('[EXCEPTION] ' + why +

                (this.notMatching && ([].concat (this.notMatching).map (x => '\t' + stringify (x)).join ('\n') + '\n\n') || '') +

            '\n\n') + stringify (stack) + '\n' }

    catch (sub) {
        return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack +
            '\n\nORIGINAL EXCEPTION:\n\n' + this.stack + '\n\n' }
}

/*  ------------------------------------------------------------------------ */

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

$prototype.impl.findMeta = stack => then => {

    for (let location of stack.withSources.reverse ()) {

        let match = location.sourceLine.match (/([A-z]+)\s*=\s*\$(prototype|singleton|component|extends|trait)/)
            match = match && { name: match[1], type: match[2], file: location.fileShort }

        if (match) {
            then (match)
        }
    }
}

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

        var findMeta = _.cps.memoize ($prototype.impl.findMeta (new StackTracey ()))

        _.defineMemoizedProperty (findMeta, 'promise', function () {
              return new Promise (findMeta) })

        def.$meta = $static (findMeta) }

    return def })

/*  ------------------------------------------------------------------------ */



