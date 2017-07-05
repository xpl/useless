"use strict";

const _  = require ('underscore')

const imagemagick = require ('./base/imagemagick'),
      util        = require ('./base/util'),
      path        = require ('path'),
      fs          = require ('./base/fs')

module.exports = $trait ({

    async uploadImageAsJPEG (location /* file or directory */) {

        const locatedPath = this.safeFilePath ({ location })
        const isDirectory = (await fs.stat (locatedPath)).isDirectory ()

        const { 'x-file-type': fileType = 'unknown/unknown' } = $http.request.headers

        if (!fileType.match (/^image\/.+/)) {

            throw new Error ('file is not an image')
        }

        try {

            const features = await imagemagick.toJPEG (await this.receiveFile (), isDirectory
                                                                                    ? util.uniqueFilePath (locatedPath, String.randomHex (8), 'jpg')
                                                                                    : locatedPath)

            return {

                id: target.name,
                 w: features.width,
                 h: features.height
            }

        } catch (e) {

            throw new Error ('cannot process the uploaded file (bad format)')
        }
    }

})