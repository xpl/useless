const _  = require ('underscore')
const fs = require ('fs')

module.exports = $trait ({

    $defaults: {

        thumbQuality: 60 // this is because we always request photos in double-resolution, which targets 2:1 pixel ratio displays
    },

/*  
    TODO:

        - Size set restriction (for preventing thumb flood DoS attack)
        - Configurable cropping behavior, e.g. top/center (current is "top", which is hard-coded)


    Basic usage:

        'a/b/:file' =>  this.fileOrThumbnail.$ ('./from/some/dir')


    Manually serving the resolved file:

        'a/b/:file' => [this.fileOrThumbnailPath.$ ('./from/some/dir'), path => $http.file (path)]


    Accepts file names of this form:

        some_file                      - pass through
        some_file_w150.jpg             — resize to 150px wide (preserving aspect ratio)
        some_file_w200.jpg             — resize to 200px tall
        some_file_w150_h300.jpg        - resize/crop, fitting 150x300px (TODO: )

    */

    async fileOrThumbnail (...args) {

        return $http.file (await this.fileOrThumbnailPath (...args))
    },

    async fileOrThumbnailPath (dirRoot, location = $env.file) {

        const [, sourceLocation, w = null, h = null] =

                location.match (/^(.+)_w(\d+)_h(\d+)\.jpg$/) || // width + height (crop mode)
                location.match (/^(.+)_w(\d+)\.jpg$/) ||        // width only
                location.match (/^(.+)_h(\d+)\.jpg$/) || []     // height only

        const target = this.safeFilePath ({ dirRoot, location: location })
        
        if ((w || h) && !fs.existsSync (target)) {
            
            await this.generateThumbnail ({
                
                source: this.safeFilePath ({ dirRoot, location: sourceLocation + '.jpg' }),
                target,
                targetWidth: w && Number (w),
                targetHeight: h && Number (h)
            })
        }

        return target
    },

    async generateThumbnail ({ source, target, targetWidth, targetHeight }) {

        if (!fs.existsSync (source)) {

            log ('SOURCE NOT FOUND:'.bright.red, source.bright)

            throw $http.NotFoundError
        }

        const imagemagick = require ('./base/imagemagick')

        const imConfig = {

            srcPath: source,
            dstPath: target,
            quality: this.thumbQuality, 
        }

        if (targetWidth && targetHeight /* crop mode */) {

            const { width: originalWidth, height: originalHeight } = await imagemagick.identify (source)

            await imagemagick.cropTop (log.pp ({

                ...imConfig,

                originalWidth,
                originalHeight, 
                targetWidth,
                targetHeight
            }))

        } else {

            await imagemagick.convert (log.ww ({ ...imConfig, width: targetWidth, height: targetHeight }))
        }
    }
})