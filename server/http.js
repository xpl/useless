"use strict";

const   _         = require ('underscore'),
        http      = require ('http'),
        util      = require ('./base/util'),
        ass       = require ('./base/assertion_syntax'),
        fs        = require ('./base/fs'),
        url       = require ('url'),
        path      = require ('path'),
        stringify = require ('string.ify'),
        bullet    = require ('string.bullet'),
        O         = Object

/*  ------------------------------------------------------------------------ */

StackTracey.isThirdParty.except (path => path.includes ('useless/server'))

/*  ------------------------------------------------------------------------ */

module.exports = $trait ({

    $depends: [require ('./api')],

/*  ------------------------------------------------------------------------ */

    $defaults: {
        config: {
            port: 1333,
            maxFileSize: 16 * 1024 * 1024,
            requestTimeout: undefined,
            production: false
        }
    },

/*  The $http thing prototype
    ------------------------------------------------------------------------ */

    HttpContext: $component ({

        $property: _.object (_.map ({

            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            500: 'Internal Server',
            501: 'Not Implemented',

        }, (desc, code) =>

            /*  generates 'InternalServerError': $property (() => $http.Error (500, 'Internal Server'))    */

                [`${desc.replace (/\s/g, '')}Error`, $property (function () { return this.Error (code, desc) })]
            )
        ),

        Error: (code, desc = 'HTTP Error') => O.assign (new Error (`${desc} Error (${code})`), { httpErrorCode: code, stackOffset: 3 }),

        mime: {
            'html'       : 'text/html',
            'xml'        : 'text/xml',
            'text'       : 'text/plain',
            'json'       : 'application/json',
            'binary'     : 'binary/octet-stream',
            'jpeg'       : 'image/jpeg',
            'jpg'        : 'image/jpeg',
            'png'        : 'image/png',
            'js'         : 'text/javascript',
            'javascript' : 'application/javascript',
            'css'        : 'text/css',
            'svg'        : 'image/svg+xml',
            'ico'        : 'image/x-icon',
            'mp4'        : 'video/mp4',
            'webm'       : 'video/webm',
            'appcache'   : 'text/cache-manifest',

            guess (x) {
                return _.isString (x) ? this.text : this.json },

            guessFromFileName (x) {
                return this[path.extname (x).split ('.')[1]] },

            addUTF8 (x) {
                    return x && (x + (((x.split ('/')[0] === 'text') ||
                                             (x === 'application/json') ||
                                             (x === 'application/javascript'))
                                                    ? '; charset=utf-8'
                                                    : '')) } },

        coerce: $static (function (what) {
                            return (what instanceof this) ? what : this.stub (what) }),

        stub: $static (function (cfg) {
                            return new this ({
                                        request: _.extend ({ method: 'POST', pause: _.identity },
                                                                cfg.request,
                                                                    _.pick (cfg, 'url', 'method', 'code', 'nonce', 'headers', 'cookies')),
                                        response: cfg.response,
                                        cookies: cfg.cookies,
                                        stub: true,
                                        writeHead: function () { return this },
                                        write: function () { return this },
                                        end: function () { return this },
                                        receiveData: () => Promise.resolve ((cfg.data &&
                                                                (_.isString (cfg.data)
                                                                    ? cfg.data
                                                                    : JSON.stringify (cfg.data))) || '') }) }),

        init () {

            _.defaults (this, {

                code: undefined,
                timeout: undefined,
                headers: {},
                nonce: String.randomHex (6),
                cookies: _.fromPairs (_.map ((this.request.headers &&
                                              this.request.headers.cookie &&
                                              this.request.headers.cookie.split (';')) || [], cookie => cookie.split ('=').map (
                                                                                                        val => (val || '').trimmed))),
                env: _.extend ({ when: Date.now (), who: null }, $env, this.env) })

            this.url       = this.request.url || ''
            this.uri       = this.url && url.parse (this.url)
            this.path      = this.uri.pathname.split ('/')
            this.method    = this.request.method
            this.isJSONAPI = this.path[1] === 'api'

            if (this.method === 'POST') {
                this.request.pause () } }, // pauses incoming data receiving, until explicitly resumed

        setCode (code) {
                this.code = code; return this },

        setHeaders (headers) {
                        _.extend (this.headers, headers); return this },

        setMime (x) { return this.setHeaders ({ 'Content-Type': $http.mime[x] || x }) },

        setMimeIfNotAlready (x) { return this.setMime (this.headers['Content-Type'] || x) },

        redirect (to) {
                        return this.setCode (302)
                                   .setHeaders ({ 'Location': to }) },

        setCookies (cookies) {
                        return _.extend2 (this, {
                                            cookies: cookies,
                                            headers: {
                                                'Set-Cookie': _.map (cookies, (value, name) =>
                                                    name + '=' + (value || '<<deleted>>') + '; Expires=Wed, 13-Jan-2100 22:23:01 GMT; Path=/') } } ) },

        removeCookies (cookies) {
                        return this.cookies (_.fromPairs (cookies.map (x => [x, undefined]))) },

        receiveData () {
                        return new Promise ((then, err) => {
                                                var data = ''
                                                this.request.on ('data', chunk => { data += chunk })
                                                this.request.on ('end', () => { then (data) })
                                                this.request.on ('error', err)
                                                this.request.resume () }) },

        nocache () { // iOS aggressively caches even POST requests, so this is needed to prevent that
                    return this.setHeaders ({
                                'Pragma': 'no-cache',
                                'Cache-control': 'no-cache' }) },

        writeHead () {
                    if (!this.headWritten) {
                         this.headWritten = true
                         this.response.writeHead (this.code || 200,
                                                    _.nonempty (_.extended (
                                                                this.headers, {
                                                                    'Content-Type': this.mime.addUTF8 (this.headers['Content-Type']) }))) }; return this },

        write (x) {
                    if (!this.headWritten) {
                         this.writeHead () }
                    if (!this.ended) {
                         this.response.write (_.isString (x) ? x : JSON.stringify (x)) }; return this },

        end () {
                if (!this.ended) {
                     this.ended = true
                     this.response.end () }; return this },

        file (file) {

            return fs.stat (file)
                     .then (stat => { 

                        if (!stat.isFile ()) {
                            throw this.NotFoundError
                        }

                        let [, start, end] = (this.request.headers.range || 'bytes=0-').match (/bytes=(\d+)-(\d+)?/)

                        const isPartial = (end !== undefined)

                        start = Number (start)
                        end   = isPartial ? Number (end) : (stat.size - 1)

                        if (isPartial) {
                            this.setCode (206)
                            this.setHeaders ({
                                'Accept-Ranges': 'bytes',
                                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                                'Content-Type': 'multipart/byteranges',                                    
                                'Content-Length': (end - start) + 1,
                                'Connection': 'keep-alive'
                            })

                        } else {
                            this.setHeaders ({
                                'Content-Length': stat.size,
                                'Content-Type': ($http.mime.guessFromFileName (file) || this.mime.binary)
                            })
                        }

                        this.writeHead ()

                        return new Promise ((then, err) =>
                                                fs.createReadStream (file, { bufferSize: 4 * 1024, start: start, end: end })
                                                    .on ('error', err)
                                                    .on ('close', then.arity0)
                                                    .pipe (this.response))
                    })

                .catch (e => {

                    throw this.NotFoundError
                })
        }
    }),

/*  Entry point
    ------------------------------------------------------------------------ */

    beforeInit () {

        log.i ('Starting HTTP @ ', log.color.boldBlue, `localhost:${this.config.port}`)

        /*  Creates pseudo-global properties bound to the current HTTP request context
         */
        $global.property ('$http', {

            get: () => AndrogeneProcessContext.current &&  AndrogeneProcessContext.current.env,
            set: x  => AndrogeneProcessContext.current && (AndrogeneProcessContext.current.env = x) })

        $global.property ('$env', {

            get: () => ($http && $http.env) || {},
            set: x  => _.extend ($http.env, x) })

        $global.property ('$this', {

            get: () => ($http && $http.this_) || this,
        })


        /*  Starts HTTP server
         */
        return new Promise (then => {
                                this.httpServer = http.createServer ((request, response) => {
                                                                            this.serveRequest (new this.HttpContext ({ // @hide
                                                                                request: request,
                                                                                response: response,
                                                                                this_: this })) })

                                                                            .listen (this.config.port, then.arity0) }) },


/*  Entry point for all requests, now accepting either actual Context or
    it's config for ad-hoc evaluation.
    ------------------------------------------------------------------------ */

    serveRequest (context) { context = this.HttpContext.coerce (context)

        if (!this.initialized.already) {
            context.setCode (500).write ('Starting up...').end ()
            return
        }

        context.timeout = this.config.requestTimeout

        var result = new AndrogenePromise (resolve => { $global.$http = context
                                                        resolve (this.callAPIHandler ()
                                                                     .timeout (context.timeout)) })
                        .then (this.writeResult,
                               this.writeError)

        return result
                .disarmAndrogene ()
                .finally ((e, x) => {

                    result.processContext.within (() => context.writeHead ().end ()) () // finalizes request

                    log (e ? log.color.red : (context.method === 'GET'
                           ? log.color.green
                           : log.color.pink), context.method.pad (4), ': ', e ? log.color.boldRed
                                                                              : log.color.bright, context.request.url)

                    const androgene = result.processContext.root

                    if (androgene.hasSomethingToReport) {

                        log.withConfig (log.config ({ indentPattern: '    ', indent: 1 }), () => {

                            log.newline ()
                            androgene.displayReport (androgene.report ({ verbose: e ? true : false }))
                        })
                    }
                })
                .catch (function (e) {

                    log.ee (log.config ({ indent: 1, location: false }), '\n', e)
                    throw e
                })
    },

    callAPIHandler: function () {

                        var match = APISchema.match (this.apiSchema, $http.method, $http.url)

                        if (!match) {   log.newline ()
                                        APISchema.debugTrace (this.apiSchema, $http.method, $http.url)
                                        throw $http.NotFoundError }

                        else {
                            _.extend ($env, match.vars); return __(match.fn ()) } },

    writeResult: function (x) {

                if (x === $http) { // for $http-returning handlers like () => $http.setCookies (..)
                    x = undefined }

                if (x !== undefined || $http.isJSONAPI) {

                /*  Make /api/ URLS respond with { success: true, value: .. } pattern by default, but only if
                    no Content-Type was explicitly specified. So that a handler can override that behavior by
                    specifying a Content-Type.                                                                  */

                    if (!$http.headers['Content-Type']) {
                         $http.headers['Content-Type'] = $http.mime.guess (
                                                            x = ($http.isJSONAPI ? { success: true, value : x } : x)) }
                    $http.writeHead ()
                         .write (x)

                    if (AndrogeneProcessContext.current.root.hasSomethingToReport) {
                        log.gg (_.isString (x) ? x.limitedTo (120) : x, '\n')
                    }
                }

                return x },

    writeError: function (e) { // TODO: construct asynchronous error stack from AndrogeneProcessContext

        if ( ($http.headers['Content-Type'] === $http.mime.json) || // if JSON
            (!$http.headers['Content-Type']  && $http.isJSONAPI)) { // or if /api/ and no Content-Type explicitly specified
            
            $http.setCode (((e instanceof Error) && e.httpErrorCode) || $http.code || 500)
                 .setMime ('json')
                 .writeHead ()
                 .write ({
                    success: false,
                    error: e.message,
                    ...((e instanceof Error) ? { parsedStack: new StackTracey (e).map (e => _.extend (e, { remote: true })) } : {})
                })

        } else {

            const x = log.impl.stringify (e)
            const isHTML = $http.headers['Content-Type'] === $http.mime.html

            $http.setCode (((e instanceof Error) && e.httpErrorCode) || $http.code || 500)
                 .setMime (isHTML ? 'html' : 'text')
                 .writeHead ()
                 .write (isHTML ? ('<html><body><pre>' + _.escape (x) + '</pre></body></html>') : x)
        }

        throw e
    },


/*  REQUEST PROCESSING PRIMITIVES
    ------------------------------------------------------------------------ */

    env: x => () => { $env = x },

    mime (x) {
        $http.setMime (x) },

    timeout (ms) {
        $http.timeout = ms },

    noTimeout () {
        $http.timeout = undefined },

    interlocked (then) {
                    return _.interlocked (releaseLock => { _.onAfter ($http, 'end', releaseLock); then () }) },

    allowOrigin (value) {
                    return x => ($http.headers['Access-Control-Allow-Origin'] = value, x) },

    jsVariable (rvalue, lvalue) {
                    $http.setHeaders ({ 'Content-Type': $http.mime.javascript })
                    return bullet ('window.' + rvalue + ' = ', stringify.configure ({ pure: true, pretty: true }) (lvalue)) },

    receiveText () {
            return $http.receiveData ().then (log.ii) },

    receiveJSON () {
            return $http.receiveData ()
                        .then (log.ii)
                        .then (JSON.parse) },

    receiveForm () {
            return $http.receiveData ()
                        .then (data => {
                            return log.i ('POST vars:',
                                            _.fromPairs (
                                            _.map (data.split ('&'), kv => kv.split ('=').map (decodeURIComponent)))) }) },

    receiveFile () {

            if ($http.request.headers['content-type'] !== $http.mime.binary) {
                throw new Error ('Content-Type should be ' + $http.mime.binary + ' (found ' + $http.request.headers['content-type'] + ')') }

            var maxFileSize = this.config.maxFileSize
            var fileSize = parseInt ($http.request.headers['x-file-size'], 10)
            
            if (fileSize <= 0) {
                throw new Error ('file is empty') }
            
            else if (fileSize > maxFileSize) {
                throw new Error ('file is too big') }

            else {
                return util.writeRequestDataToFile ({
                    request: $http.request,
                    filePath: path.join (process.env.TMP || process.env.TMPDIR || process.env.TEMP || '/tmp' || process.cwd (), String.randomHex (32)) }) } },

    safeFilePath ({ location, dirRoot = process.cwd () }) {

        if (location.split ('/').includes ('..')) {

            log.e ('Contains forbidden symbols:', location.bright)
            
            throw $http.ForbiddenError }

        else {
            return path.join (path.resolve (dirRoot), location) }
    },

    async file (location, subLocation = $env.file) {

        const locatedPath = this.safeFilePath ({ location })
        const isDirectory = (await fs.stat (locatedPath)).isDirectory ()

        return $http.file (isDirectory ? this.safeFilePath ({ location: subLocation, dirRoot: locatedPath }) : locatedPath)
    },

    redirect (to) {
        return x => ($http.redirect (to), x) },

    hideFromProduction () {

        if (this.config.production === true) {
            throw $http.NotFoundError
        }
    }

/*  ------------------------------------------------------------------------ */

})
