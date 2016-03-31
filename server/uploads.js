var imagemagick = require ('./base/imagemagick'),
    util        = require ('./base/util'),
    path        = require ('path')

ServerUploads = module.exports = $trait ({

    uploadImageTo: function (path) {
                    return this.uploadImageAsJPEG (this.saveImageTo (path)) },

    saveImageTo: function (targetDir) {
                    return (context, then) => {
                                var targetPath = path.join (process.cwd (), targetDir)
                                then (targetPath, util.uniqueFileName (targetPath, Format.randomHexString (8), 'jpg')) } },

    uploadImageAsJPEG: function (getTargetPath) { return context => {

        if ('image' !== _.first ((context.request.headers['x-file-type'] || 'unknown/unknown').split ('/'))) {
            context.jsonFailure ('Uploaded file is not an image') }

        else { getTargetPath.call (this, context, (targetDir, fileName) => {
                                                        context.handleFileUpload (uploadedFilePath => {
                                                            var targetFilePath = path.join (targetDir, fileName + '.jpg')
                                                                imagemagick.toJPEG (uploadedFilePath, targetFilePath, (err, features) => {
                                                                                        if (err) {
                                                                                            log.error (err)
                                                                                            context.jsonFailure ('Image format is not supported') }
                                                                                        else {
                                                                                            log.success ('uploadPhoto: saved ', targetFilePath)
                                                                                            context.jsonSuccess ({
                                                                                                id: fileName,
                                                                                                 w: features.width,
                                                                                                 h: features.height }) } }) }) }) } } } })