var imagemagick = require ('./base/imagemagick'),
    util        = require ('./base/util'),
    path        = require ('path')

ServerUploads = module.exports = $trait ({

    uploadImageTo: function (path) {
                        return this.uploadImageAsJPEG (this.genFileName (path)) },

    genFileName: function (dir, ext) { dir = path.join (process.cwd (), dir)
                    return () => {
                        return { dir: dir,
                                name: util.uniqueFileName (dir, String.randomHex (8), ext),
                                 ext: ext } } },

    uploadImageAsJPEG: function (getTargetPath) {

        var fileType = ($http.request.headers['x-file-type'] || 'unknown/unknown')
        if (fileType.split ('/').first !== 'image') {
            throw new Error ('Uploaded file is not an image') }

        else { return __(getTargetPath ())
                            .then (target => {
                                    var targetPath = path.join (target.dir, target.name + '.' + (target.ext || 'jpg'))
                                    return this.receiveFile ()
                                               .then (file =>
                                                    imagemagick.toJPEG (file, targetPath)
                                                               .then (features => { log.pp ('saved', targetPath)
                                                                        return {
                                                                            id: target.name,
                                                                             w: features.width,
                                                                             h: features.height } })) }) } } })