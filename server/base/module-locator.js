"use strict";

/*  ------------------------------------------------------------------------ */

const fs   = require ('fs'),
      path = require ('path')

/*  ------------------------------------------------------------------------ */

module.exports = {

    locateFromFile (file) {
        return _.find (this.parentDirsOf (file),
                    dir => this.isFile (path.join (dir, 'package.json')))
    },

/*  Locates NPM module path     */

    locate (name) {
        return _.find (this.parentDirsOf (process.cwd ()),
                    dir => this.isDirectory (path.join (dir, 'node_modules', name)))
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
