"use strict";

var http    = require ('http'),
    util    = require ('./base/util'),
    ass     = require ('./base/assertion_syntax'),
    url     = require ('url'),
    path    = require ('path'),
    fs      = requirePromisified ('fs', { except: ['createReadStream', 'lstatSync'] }) // a feature of Promise+.js

/*  ======================================================================== */

module.exports = $trait ({

    $depends: [require ('./exceptions'),
               require ('./api'),
               require ('./io')],


/*  ======================================================================== */

    $defaults: {
        config: {
            port: 1333,
            requestTimeout: 2000 } },


/*  The $http thing prototype
    ======================================================================== */

    HttpContext: $prototype ({

        Error: class extends Error {}, // @hide

        NotFoundError: $property (function () {
                                        return _.extend (new this.Error ('Not Found (404)'), { code: 404 }) }),

        mime: {
            'html'       : 'text/html; charset=utf-8',
            'text'       : 'text/plain; charset=utf-8',
            'json'       : 'application/json; charset=utf-8',
            'binary'     : 'binary/octet-stream',
            'jpeg'       : 'image/jpeg',
            'jpg'        : 'image/jpeg',
            'png'        : 'image/png',
            'js'         : 'text/javascript; charset=utf-8',
            'javascript' : 'text/javascript; charset=utf-8',
            'css'        : 'text/css; charset=utf-8',
            'svg'        : 'image/svg+xml; charset=utf-8',
            'appcache'   : 'text/cache-manifest; charset=utf-8',

            guess: function (x) {
                        return _.isString (x) ? this.text : this.json } },

        coerce: $static (function (what) {
                            return (what instanceof this) ? what : this.stub (what) }),

        stub: $static (function (cfg) {
                            return new this ({
                                        request: _.extend ({ method: 'POST', pause: _.identity },
                                                                cfg.request,
                                                                    _.pick (cfg, 'url', 'method', 'headers', 'cookies')),
                                        response: cfg.response,
                                        cookies: cfg.cookies,
                                        stub: true,
                                        env: _.omit (cfg, 'json', 'method', 'url', 'headers', 'cookies') }) }),

        constructor: function (cfg) {

            _.extend2 (this, {

                code: undefined,
                timeout: undefined,
                headers: {},
                nonce: String.randomHex (6),
                cookies: cfg.cookies || _.object (_.map (
                                                        (cfg && cfg.request &&
                                                                cfg.request.headers &&
                                                                cfg.request.headers.cookie &&
                                                                cfg.request.headers.cookie.split (';')) || [],

                                                         cookie => cookie.split ('=').map (val => (val || '').trimmed))),
                env: {
                    when: Date.now (),
                    who:  null } }, cfg)

            this.uri       = this.request && this.request.url && url.parse (this.request.url)
            this.path      = this.uri && this.uri.path.split ('/')
            this.method    = this.request.method
            this.isJSONAPI = (this.path && this.path[0]) === 'api'

            if (this.isJSONAPI && !this.hasContentType) {
                this.setContentType (this.mime.json) }

            if (this.method === 'POST') {
                this.request.pause () } }, // pauses incoming data receiving, until explicitly resumed

        setCode: function (code) {
                this.code = code; return this },

        setHeaders: function (headers) {
                    _.extend (this.headers, headers) },

        redirect: function (to) {
                        return this.code (302).headers ({ 'Location': to }) },

        setCookies: function (cookies) {
                        return _.extend2 (this, {
                                            cookies: cookies,
                                            headers: {
                                                'Set-Cookie': cookies.map ((value, name) =>
                                                    name + '=' + (value || '<<deleted>>') + '; Expires=Wed, 13-Jan-2100 22:23:01 GMT; Path=/') } } ) },

        removeCookies: function (cookies) {
                            return this.cookies (_.object (cookies.map (x => [x, undefined]))) },

        is: function (x) {
                return this.headers['Content-Type'] === x },

        setContentType: function (x) {
                            return (this.headers['Content-Type'] = x), this },

        setContentLength: function (x) {
                            return (this.headers['Content-Length'] = x), this },

        $property: {

            isHTML: function () { return this.is (this.mime.html) },
            isJSON: function () { return this.is (this.mime.json) },

            hasContentType: function () { return this.headers['Content-Type'] ? true : false },

            data: function () {
                    return new Promise ((then, err) => {
                                            var data = ''
                                            this.request.on ('data', chunk => { data += chunk })
                                            this.request.on ('end', then)
                                            this.request.on ('error', err)
                                            this.request.resume () }) } },

        nocache: function () { // iOS aggressively caches even POST requests, so this is needed to prevent that
                    return this.setHeaders ({
                                'Pragma': 'no-cache',
                                'Cache-control': 'no-cache' }) },

        writeHead: function () {
                    if (!this.headWritten) {
                         this.headWritten = true
                         this.response.writeHead (this.code || 200, _.nonempty (this.headers)) }; return this },

        write: function (x) {
                    if (!this.ended) {
                         this.response.write (
                                    (_.isString (x) ? x :
                                    (this.isJSONAPI ? { success: true, value: JSON.stringify (x) } : JSON.stringify (x)))) }; return this },

        end: function () {
                if (!this.ended) {
                     this.ended = true
                     this.response.end () }; return this } }),

/*  ======================================================================== */

    $assertion: {
        $async: {

            assertRequest: function (url, ctx, then) {
                                this.serveRequest (_.extend ({}, ctx, { url: url,
                                    success: function (result) { then (this, result) },
                                    failure: function (result) { log.ee (result); $fail; then () } })) },

            assertRequestFails: function (url, ctx, desiredResult, then) {
                                    this.serveRequest (_.extend ({}, ctx, { url: url,
                                        success: function (result) { $fail; then () },
                                        failure: function (result) { $assert (result, desiredResult); then () } })) } } },

/*  Entry point
    ======================================================================== */

    beforeInit: function (then) {

        log.ii ('Starting HTTP @ localhost:' + this.config.port)

        /*  Creates $http thing
         */
        $global.define ('$http', {
            get: () => AndrogeneProcessContext.current.env,
            set: x  => AndrogeneProcessContext.current.env = x })

        this.httpServer = http
                            .createServer ((request, response) => {
                                this.serveRequest (new this.HttpContext ({
                                    request: request,
                                    response: response })) })
                            
                            .listen (this.config.port, then.arity0) },


/*  Entry point for all requests, now accepting either actual Context or
    it's config for ad-hoc evaluation.
    ======================================================================== */

    serveRequest: function (context) { context = this.HttpContext.coerce (context)
        
        var result = new AndrogenePromise (resolve => { $global.$http = context
                                                        resolve (this.callAPIHandler ().timeout (this.config.requestTimeout)) })
                        .then (this.writeResult,
                               this.writeError)

        return result
                .disarmAndrogene ()
                .finally ((e, x) => {

                        result.processContext.within (() => context.writeHead ().end ()) () // finalizes request

                        log (context.method === 'GET'
                                ? log.color.green
                                : log.color.pink, context.method, ': ', log.color.bright, context.request.url)

                        result.processContext.root.printEvents () })

                .catch (log.ee) },

    callAPIHandler: function () {
                        return __.seq (_.coerceToArray (APISchema.match (
                                                            $http,
                                                            this.apiSchema) || this.noAPIMatch)) },

    noAPIMatch: function () {
                    APISchema.debugTrace ($http, this.apiSchema)
                    throw $http.NotFoundError },

    writeResult: function (x) {
                if (x && (x !== $http)) {
                    $http.setContentType ($http.headers['Content-Type'] || $http.mime.guess (x))
                         .writeHead ()
                         .write (x) } },

    writeError: function (e) { // TODO: construct asynchronous error stack from AndrogeneProcessContext

        if ($http.isJSON) { // JSONAPI errors get passed with HTTP 200 by default, so no other codes here, until explicitly set
            
            if (error instanceof Error) {
                $http.setCode (((error instanceof $http.Error) && error.code) || $http.code)
                     .writeHead ()
                     .write ({
                        success: false,
                        error: error.message,
                        parsedStack: CallStack.fromError (error).asArray.map (e => _.extend (e, { remote: true })) }) }

            else {
                $http.writeHead ()
                     .write ({
                        success: false,
                        error: error }) } }

        else { var x = log.impl.stringify (e)

            $http.setCode ($http.code || 500)
                 .writeHead ()
                 .write (http.isHTML ? ('<html><body><pre>' + _.escape (x) + '</pre></body></html>') : x) } },


/*  REQUEST PROCESSING PRIMITIVES
    ======================================================================== */

    interlocked: function (then) {
                    return _.interlocked (releaseLock => { _.onAfter ($http, 'end', releaseLock); then () }) },

    allowOrigin: function (value) { $http.headers ({ 'Access-Control-Allow-Origin': value }) },

    jsVariable: function (rvalue, lvalue) {
            $http.contentType ($http.mime.javascript)
            return 'var ' + rvalue +
                    ' = ' + _.stringify (lvalue, { pure: true, pretty: true }) },

    receiveJSON: function () {
                    return $http.data
                                .log
                                .then (JSON.parse)
                                .then (obj => {
                                    $http.jsonInput = obj                            // temporary (some handlers still need jsonInput isolated)
                                    $http.env = _.extendWith ($http.env, obj) }) },  // prevents overriding of previous context.env variables

    receiveForm: function () {
                    return $http.data
                                .then (data => {
                                    $http.env = _.extendWith ($http.env,
                                                    log.i ('POST vars:',
                                                        _.object (
                                                        _.map (data.split ('&'), kv => kv.split ('=').map (decodeURIComponent))))) }) },

    receiveFile: function () {

        if (!$http.is ($http.mime.binary)) {
            throw new Error ('Content-Type should be' + $http.mime.binary) }

        var maxFileSize = 16 * 1024 * 1024
        var fileSize = parseInt (this.request.headers['x-file-size'], 10)
        
        if (fileSize <= 0) {
            throw new Error ('file is empty') }
        
        else if (fileSize > maxFileSize) {
            throw new Error ('file is too big') }

        else {
            return util.writeRequestDataToFile ({
                request: this.request,
                filePath: path.join (process.env.TMP || process.env.TMPDIR || process.env.TEMP || '/tmp' || process.cwd (), String.randomHex (32)) }) } },

    file: function (location) { var isDirectory = fs.lstatSync (location).isDirectory ()
            return () => {      var file        = isDirectory ? path.join (location, $http.env.file) : location

                return fs.stat (file)
                         .then (stat => {

                            if (!stat.isFile ()) {
                                throw $http.NotFoundError }

                            $http.setContentType ($http.mime[path.extname (file).split ('.')[1]] || $http.mime.binary)
                                 .setContentLength (stat.size)
                                 .writeHead ()

                            return new Promise ((then, err) =>
                                                    fs.createReadStream (file, { 'bufferSize': 4 * 1024 })
                                                        .on ('error', err)
                                                        .on ('close', then.arity0)
                                                        .pipe ($http.response)) }) } },

/*  ======================================================================== */

})
