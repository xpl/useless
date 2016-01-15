var imagemagick = require ('./base/imagemagick'),
    path        = require ('path')
    
ServerUploads = module.exports = $trait ({


    uploadPhoto: function (getTargetPath) { return this.$ (function (context) {

        if ('image' !== _.first ((context.request.headers['x-file-type'] || 'unknown/unknown').split ('/'))) {
            context.jsonFailure ('Загруженный файл не является изображением') }

        else { getTargetPath.call (this, context, this.$ (function (targetDir, photoId) {

            context.handleFileUpload (this.$ (function (uploadedFilePath) {
                var targetFilePath = path.join (targetDir, photoId + '.jpg')

                imagemagick.toJPEG (uploadedFilePath, targetFilePath, this.$ (function (err, features) {

                    if (err) {
                        log.error (err)
                        context.jsonFailure ('Формат изображения не поддерживается') }

                    else {
                        log.success ('uploadPhoto: saved ', targetFilePath)
                        context.jsonSuccess ({
                            id: photoId,
                            w: features.width,
                            h: features.height }) } })) })) })) } })} })