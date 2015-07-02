/* jshint -W099 */

var path        = require ('path'),
    fs          = require ('fs'),
    exec        = require ('child_process').exec,
    util        = require ('./util')

module.exports = {
    identify: function (path, complete) {
        exec ('identify -format "%[width]@%[height]@%m" ' + _.quote (path), function (e, stdout, stderr) {
            if (e) {
                complete (e)
            } else {
                var features = stdout.split ('@')
                complete (null, {
                    width: parseInt (features[0], 10),
                    height: parseInt (features[1], 10),
                    format: features[2]
                })
            }
        })
    },
    convert: function (cfg, complete) {
        exec (_.nonempty (['convert',
            (cfg.width || cfg.height) && ('-resize ' + [cfg.width || '', cfg.height || ''].join ('x')),
            cfg.quality && ('-quality ' + cfg.quality),
            _.quote (cfg.srcPath),
            _.quote (cfg.dstPath)]).join (' '), complete)
    },
    toJPEG: function (srcPath, dstPath, complete) { // calls convert if not JPEG, copies as is otherwise
        module.exports.identify (srcPath, function (e, features) {
            if (e) {
                complete (e)
            } else {
                if (features.format === 'JPEG') {
                    exec ('cp ' + _.quote (srcPath) + ' ' + _.quote (dstPath), function (e) { complete (e, features) })
                } else {
                    module.exports.convert ({ srcPath: srcPath, dstPath: dstPath, quality: 90 }, function (e) { complete (e, features) })
                }
            }
        })
    }
}