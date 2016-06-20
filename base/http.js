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

    request: function (type, path, cfg_) { var cfg = cfg_ || {}
                                           
                /*  Reference to the abort method (will be initialized at Promise construction)
                 */
                var abort = undefined

                /*  returned Promise
                 */
                var p = new Promise (function (resolve, reject) {

                    if ($platform.Browser) {

                        var prePath = (cfg.protocol || cfg.hostname || cfg.port) ?
                                     ((cfg.protocol || window.location.protocol) + '//' +
                                      (cfg.hostname || window.location.hostname) + ':' +
                                      (cfg.port     || window.location.port)) : ''

                        /*  Init XMLHttpRequest
                         */
                        var xhr = new XMLHttpRequest ()
                            xhr.open (type, prePath + path, true)

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

                                    var response = (xhr.responseType === 'arraybuffer')
                                                        ? xhr.response
                                                        : xhr.responseText

                                    if (xhr.status === 200) { resolve (response) }
                                                       else { reject  (_.extend (new Error (xhr.statusText), {
                                                                                        httpResponse: response,
                                                                                        httpStatus: xhr.status })) } } }
                        /*  Set up the abort method
                         */
                        abort = function () {
                                    xhr.abort ()
                                    reject ('aborted') }

                        /*  Send
                         */
                        if (cfg.data) { xhr.send (cfg.data) }
                                 else { xhr.send () } }

                    else {
                        reject ('not implemented') } })

                /*  Add abort method to the returned Promise
                 */
                return _.extend (p, { abort: abort }) },

    progressCallbackWithSimulation: function (progress) { var simulated = 0
                                                        progress (0)
        return function (e) { if (e.lengthComputable) { progress (e.loaded / e.total) }
                                                 else { progress (simulated = ((simulated += 0.1) > 1) ? 0 : simulated) } } },
})

/*  An example of custom API layer over Http:

    1.  Converts request I/O to JSON
    2.  Interprets { success: true/false, value: ... } semantics
    3.  Adds cross-machine exception throwing
    
    ------------------------------------------------------------------------ */

JSONAPI = $singleton (Component, {

    $traits: [HttpMethods],

    request: function (type, path, cfg) { var stackBeforeCall = _.hasReflection && $callStack.offset ((cfg.stackOffset || 0) + 1).asArray

                var cfg = _.extend2 ({ headers: {
                                            'Cache-Control': 'no-cache',
                                            'Content-Type' : 'application/json; charset=utf-8' } }, cfg)

                if (cfg.what) {
                    cfg.data = JSON.stringify (cfg.what) }

                return Http
                        .request (type, '/api/' + path, cfg)
                        .finally (function (e, response) {

                            if (response) {
                                return JSON.parse (response) }

                            else if (e) {
                                if (e.httpResponse) {
                                    return JSON.parse (e.httpResponse) }
                                else {
                                    throw e } }

                            else {
                                throw new Error ('empty response') } })

                        .then (function (response) {
                            if (response.success) {
                                return response.value }
                            else {
                                if (response.parsedStack) {
                                    throw _.extend (new Error ('SERVER: ' + response.error), {
                                                        remote: true,
                                                        parsedStack: response.parsedStack.concat (stackBeforeCall || []) }) }
                                else {
                                    throw new Error (response.error) } } }) } })