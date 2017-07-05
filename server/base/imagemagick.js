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
                                     cfg.crop && ('-crop ' + cfg.crop.width + 'x' + cfg.crop.height + '+' + cfg.crop.left + '+' + cfg.crop.top),
                                    (cfg.width || cfg.height) && ('-resize ' + [cfg.width || '', cfg.height || ''].join ('x')),
                                     cfg.quality && ('-quality ' + cfg.quality),
                                    _.quote (cfg.srcPath),
                                    _.quote (cfg.dstPath)]).join (' ')) },

    async toJPEG (srcPath, dstPath) { // calls convert if not JPEG, copies as is otherwise

        log.ww ('toJPEG', srcPath, '→', dstPath)

        const features = await imagemagick.identify (srcPath)

        log.pp (features)

        if (features.format === 'JPEG') {
            
            exec ('cp ' + _.quote (srcPath) + ' ' + _.quote (dstPath))
        
        } else {
        
            await imagemagick.convert ({
                            srcPath: srcPath,
                            dstPath: dstPath,
                            quality: 90 })
        }

        return features
    },

    cropTop (cfg) {

        const { originalWidth, originalHeight, targetWidth, targetHeight } = cfg

        const originalAspect = originalWidth / originalHeight
        const targetAspect = targetWidth / targetHeight

        return imagemagick.convert (_.extended (cfg, (targetAspect > originalAspect) ?

            /*
                --------
                |//////|        targetAspect=2
                |------
                |      |
                |      |
                --------
            */

            {
                width: targetWidth, // resize

                crop: {

                    left: 0,
                    top: 0,
                    width: originalWidth,
                    height: Math.floor (originalHeight / targetAspect)
                }
            } :

            /*

                --------------
                |    |//|    |     targetAspect = 0.5
                |    |//|    |
                |    |//|    |
                |    |//|    |
                --------------
            */
            {
                height: targetHeight, // resize

                crop: {

                    left: Math.floor ((originalWidth / 2) - (targetWidth / 2)),
                    top: 0,
                    width: Math.floor (originalHeight * targetAspect),
                    height: originalHeight
                }
            })
        )
    }
}