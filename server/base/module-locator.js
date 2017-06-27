"use strict";

const _  = require ('underscore')

/*  ------------------------------------------------------------------------ */

const fs   = require ('fs'),
      path = require ('path')

/*  ------------------------------------------------------------------------ */

const locator = module.exports = {

    hasBabelrc (x) {

        const moduleDir  = locator.locateFromFile (x)
        const hasBabelrc = locator.isFile (module && path.join (moduleDir, '.babelrc'))

        return hasBabelrc },

    modulePath (name, searchFrom) {
        var basePath = locator.locate (name, searchFrom)
        return basePath && path.join (basePath, 'node_modules', name)
    },

    cache: {},

    locateFromFile (file) {

        const dir = path.dirname (file)

        return this.cache[dir] || (
               this.cache[dir] = _.find (locator.parentDirsOf (file),
                                            dir => locator.isFile (path.join (dir, 'package.json'))))
    },

/*  Locates NPM module path     */

    locate (name, where) {
        return _.find (locator.parentDirsOf (where || process.cwd ()),
                    dir => locator.isDirectory (path.join (dir, 'node_modules', name)))
    },

/*  Returns full paths to all parent directories, including itself     */

    parentDirsOf: _.memoize (function (fileOrDirectory) { const dirs = [path.dirname (fileOrDirectory)]

        while (true) {
            let current = dirs[dirs.length - 1]
            let parent = path.resolve (path.join (current, '..'))
            if (parent === current) {
                return dirs }
            else {
                dirs.push (parent) }
        }
    }),

/*  Helper predicates   */

    isDirectory (x) {
        try { return fs.lstatSync (x).isDirectory () } catch (e) { return false } },

    isFile (x) {
        try { return fs.lstatSync (x).isFile () } catch (e) { return false } },

}

/*  ------------------------------------------------------------------------ */
