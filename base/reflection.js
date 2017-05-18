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
                        ((entry.sourceLine || '').trim () || '').slice (0, 80) ]))
}

Error.prototype[Symbol.for ('String.ify')] = function (stringify) {

    try {        
        var stack   = StackTracey.fromErrorWithAsync (this).slice (this.stackOffset || 0).clean
        var why     = stringify.limit ((this.message || '').replace (/\r|\n/g, '').trim (), 120)

        return ('[EXCEPTION] ' + why +

                (this.notMatching && ([].concat (this.notMatching).map (x => '\t' + stringify.noPretty (x)).join ('\n') + '\n\n') || '') +

            '\n\n') + stringify (stack) + '\n' }

    catch (sub) {
        return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack +
            '\n\nORIGINAL EXCEPTION:\n\n' + this.stack + '\n\n' }
}

/*  ------------------------------------------------------------------------ */

_.tests.prototypeMeta = {

    'Prototype.$meta': function () {

        const DummyProto = $prototype ()
        const DummyTrait = $trait ()

        $assertMatches (DummyProto.$meta, { name: 'DummyProto', type: 'prototype' })
        $assertMatches (DummyTrait.$meta, { name: 'DummyTrait', type: 'trait' })
    },

    'String.ify': function () {

        const Dummy = $prototype ({})

        $assert (String.ify (Dummy), 'Dummy ()')
    }
}

;(() => {

    const findMeta = stack => _.find2 (stack.withSources.reverse (), location => {

        let match = location.sourceLine.match (/([A-z]+)\s*=\s*\$([A-Za-z0-9_]+)/)

        return (match && { name: (match[1] === 'exports') ? location.fileName : match[1],
                           type:  match[2],
                           file:  location.fileShort }) || false
    })

    $prototype.macro (function (def, base) {

        if (typeof Symbol !== 'undefined') {
            def.constructor[Symbol.for ('String.ify')] = function () {
                return ((this.$meta && this.$meta.name) || '<prototype>') + ' ()' }
        }

    /*  NB: memoization is here because findMeta performs slow (needs to fetch sources and sourcemaps),
            and we dont wanna do this at construction of each prototype. Better do this on first $meta request.    */
        
        if (!def.$meta) {
            const stack = new StackTracey ()
            def.$meta = $static ($property (_.memoize (() => findMeta (stack)))) }

        return def
    })

}) ();

/*  ------------------------------------------------------------------------ */



