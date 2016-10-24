"use strict";

const _  = require ('underscore')

const path        = require ('path'),
      fs          = require ('fs'),
      exec        = require ('child_process').exec.promisify,
      util        = require ('./util')

const imagemagick = module.exports = {

    identify (path) {
        return exec ('identify -format "%[width]@%[height]@%m" ' + _.quote (path)).then ((stdout, stderr) => {
            var features = stdout.split ('@')
            return {  width: parseInt (features[0], 10),
                     height: parseInt (features[1], 10),
                     format:           features[2]       } }) },

    convert (cfg) {
        return exec (_.nonempty (['convert',
                                    (cfg.width || cfg.height) && ('-resize ' + [cfg.width || '', cfg.height || ''].join ('x')),
                                     cfg.quality && ('-quality ' + cfg.quality),
                                    _.quote (cfg.srcPath),
                                    _.quote (cfg.dstPath)]).join (' ')) },

    toJPEG (srcPath, dstPath) { // calls convert if not JPEG, copies as is otherwise
        return imagemagick.identify (srcPath).then (features => {
                return ((features.format === 'JPEG')
                            ? exec ('cp ' + _.quote (srcPath) + ' ' + _.quote (dstPath))
                            : imagemagick.convert ({
                                    srcPath: srcPath,
                                    dstPath: dstPath,
                                    quality: 90 })).then (_.constant (features)) }) }
}