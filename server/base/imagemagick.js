var path        = require ('path'),
    fs          = require ('fs'),
    exec        = require ('child_process').exec.promisify,
    util        = require ('./util')

var imagemagick = module.exports = {

    identify: function (path) {
                    return exec ('identify -format "%[width]@%[height]@%m" ' + _.quote (path)).then (function (stdout, stderr) {
                        var features = stdout.split ('@')
                        return {  width: parseInt (features[0], 10),
                                 height: parseInt (features[1], 10),
                                 format:           features[2]       } }) },

    convert: function (cfg) {
                return exec (_.nonempty (['convert',
                                            (cfg.width || cfg.height) && ('-resize ' + [cfg.width || '', cfg.height || ''].join ('x')),
                                             cfg.quality && ('-quality ' + cfg.quality),
                                            _.quote (cfg.srcPath),
                                            _.quote (cfg.dstPath)]).join (' ')) },

    toJPEG: function (srcPath, dstPath) { // calls convert if not JPEG, copies as is otherwise
                return imagemagick.identify (srcPath).then (function (features) {
                        return ((features.format === 'JPEG')
                                    ? exec ('cp ' + _.quote (srcPath) + ' ' + _.quote (dstPath))
                                    : imagemagick.convert ({
                                            srcPath: srcPath,
                                            dstPath: dstPath,
                                            quality: 90 })).then (_.constant (features)) }) }
}