"use strict";

/*  ------------------------------------------------------------------------ */

const _ = require ('underscore')
const O = Object

/*  ------------------------------------------------------------------------ */

if (!$global.XMLHttpRequest) {
     $global.XMLHttpRequest = require ('xhr2')
}

/*  ------------------------------------------------------------------------ */

$global.Http = $singleton (Component, {

/*  You can re-use the HttpMethods trait to build API-specific layers over Http */

    $traits: [$global.HttpMethods = $trait ({

                get (path, cfg) {
                    return this.request ('GET',  path, cfg) },

                post (path, cfg) {
                    return this.request ('POST', path, cfg) },

                loadFile (path, cfg) {
                    return this.request ('GET', path, { responseType: 'arraybuffer' }) },

                uploadFile (path, file, cfg) {
                    return this.post (path, _.extend2 ({
                        data: file,
                        headers: {
                            'Content-Type': 'binary/octet-stream',
                            'X-File-Name': Parse.fileName (file.name || 'file').transliterate || 'file',
                            'X-File-Size': file.size,
                            'X-File-Type': file.type } }, cfg)) } }) ],

    request (type, path, cfg_) { const cfg = cfg_ || {}
                                           
            /*  Local state (will be initialized at Promise construction) */

                let xhr, abort
                let progress = _.observable (0)

                if (cfg.progress) {
                    progress (cfg.progress)
                }

            /*  returned Promise     */

                const p = new Promise ((resolve, reject) => {

                    var prePath = ($platform.Browser && (cfg.protocol || cfg.hostname || cfg.port)) ?
                                 ((cfg.protocol || window.location.protocol) + '//' +
                                  (cfg.hostname || window.location.hostname) + ':' +
                                  (cfg.port     || window.location.port)) : ''

                    /*  Init XMLHttpRequest
                     */
                    xhr = new XMLHttpRequest ()
                    xhr.open (type, prePath + path, true)

                    /*  Set to 'arraybuffer' to receive binary data
                     */
                    if (cfg.responseType)
                        xhr.responseType = cfg.responseType

                    /*  Set headers
                     */
                    _.each (cfg.headers, (value, key) => {
                        xhr.setRequestHeader (key, value) })

                    /*  Bind events
                     */
                    xhr.onprogress = Http.progressCallbackWithSimulation (progress)
                    xhr.onload =
                    xhr.onerror = () => {

                        if (cfg.progress) {
                            cfg.progress (1) }

                        const response = (xhr.responseType === 'arraybuffer')
                                            ? xhr.response
                                            : xhr.responseText

                        if (xhr.status === 200) { resolve (response) }
                                           else { reject  (_.extend (new Error (xhr.statusText), {
                                                                            httpResponse: response,
                                                                            httpStatus: xhr.status })) }
                    }

                    /*  Send
                     */
                    if (cfg.data) { xhr.send (cfg.data) }
                             else { xhr.send () }

                 })

            /*  Publish some additional methods as properties of the returned Promise */

                p.progress = function (accept) { progress (accept); return this }

                p.abortableWith (() => xhr.abort ())

                return p
            },

    progressCallbackWithSimulation (accept) { let simulated = 0

                                                accept (0)
        return e => { if (e.lengthComputable) { accept (e.loaded / e.total) }
                                         else { accept (simulated = ((simulated += 0.1) > 1) ? 0 : simulated) } } },
})

/*  An example of custom API layer over Http:

    1.  Converts request I/O to JSON
    2.  Interprets { success: true/false, value: ... } semantics
    3.  Adds cross-machine exception throwing
    
    ------------------------------------------------------------------------ */

$global.JSONAPI = $singleton (Component, {

    $traits: [HttpMethods],

    request (type, path, cfg_) {

                const isAbsolutePath = /^[^\/]*:/.test (path)

                const cfg = _.extend2 ({ headers: {
                                            'Cache-Control': 'no-cache',
                                            'Content-Type' : 'application/json; charset=utf-8' } }, cfg_)

                if (cfg.what) {
                    cfg.data = JSON.stringify (cfg.what) }

                const stackBeforeCall = _.hasReflection && (new StackTracey ()) // @hide 

                return Http
                        .request (type, isAbsolutePath ? path : ('/api/' + path), cfg)
                        .finally ((e, response) => {

                            if (response) {
                                return JSON.parse (response) }

                            else if (e) {
                                if (e.httpResponse) {
                                    return JSON.parse (e.httpResponse) }
                                else {
                                    throw e } }

                            else {
                                throw new Error ('empty response') } })

                        .then (response => {

                            if (response.success) {
                                return response.value }

                            else {

                                if (response.parsedStack) {

                                    const fieldName = (typeof Symbol !== 'undefined') ? Symbol.for ('StackTracey') : '__StackTracey'
                                    const joinedStack = response.parsedStack
                                                         .map (e => O.assign (e, { file: '/api/source/' + e.file }))
                                                         .concat (stackBeforeCall || [])

                                    throw O.assign (new Error ('SERVER: ' + response.error), {
                                        remote: true,
                                        [fieldName]: joinedStack
                                    })
                                }

                                else {
                                    throw new Error (response.error) } } })
    }
})



