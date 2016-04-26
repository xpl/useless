/*  Promise-based HTTP protocol API (cross-platform)
    ======================================================================== */

Http = $singleton (Component, {

    /*  You can re-use the HttpMethods trait to build API-specific layers over Http
     */

    $traits: [HttpMethods = $trait ({

                                get: function (path, cfg) {
                                            return this.request ('GET',  path, cfg) },

                                post: function (path, cfg) {
                                            return this.request ('POST', path, cfg) },

                                loadFile: function (path, cfg) {
                                            return this.request ('GET', path, { responseType: 'arraybuffer' }) },

                                uploadFile: function (path, file, cfg) {
                                                return this.post (path, _.extend2 ({
                                                    data: file,
                                                    headers: {
                                                        'Content-Type': 'binary/octet-stream',
                                                        'X-File-Name': Parse.fileName (file.name || 'file').transliterate || 'file',
                                                        'X-File-Size': file.size,
                                                        'X-File-Type': file.type } }, cfg)) } }) ],

    /*  Impl
     */

    request: function (type, path, cfg_) { var cfg = _.extend2 ({ headers: { 'Cache-Control': 'no-cache' } }, cfg_)

                return new Promise (function (resolve, reject) {

                    if (Platform.Browser) {

                        /*  Init XMLHttpRequest
                         */
                        var xhr = new XMLHttpRequest ()
                            xhr.open (type, path, true)

                        /*  Set to 'arraybuffer' to receive binary data
                         */
                        if (cfg.responseType)
                            xhr.responseType = cfg.responseType

                        /*  Set headers
                         */
                        _.each (cfg.headers, function (value, key) {
                            xhr.setRequestHeader (key, value) })

                        /*  Bind events
                         */
                        if (cfg.progress) {
                            xhr.onprogress = Http.progressCallbackWithSimulation (cfg.progress) }

                            xhr.onreadystatechange = function () {
                                                        if (xhr.readyState === 4) {
                                                            if (cfg.progress) {
                                                                cfg.progress (1) }
                                                            if (xhr.status === 200) { resolve ((xhr.responseType === 'arraybuffer') ? xhr.response : xhr.responseText) }
                                                                               else { reject  (xhr.statusText) } } }
                        /*  Send
                         */
                        if (cfg.data) { xhr.send (cfg.data) }
                                 else { xhr.send () } }

                    else {
                        reject ('not implemented') } }) },

    progressCallbackWithSimulation: function (progress) { var simulated = 0
                                                        progress (0)
        return function (e) { if (e.lengthComputable) { progress (e.loaded / e.total) }
                                                 else { progress (simulated = ((simulated += 0.1) > 1) ? 0 : simulated) } } },
})