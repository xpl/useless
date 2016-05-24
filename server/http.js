"use strict";

var http    = require ('http'),
    util    = require ('./base/util'),
    ass     = require ('./base/assertion_syntax'),
    fs      = require ('./base/fs'),
    url     = require ('url'),
    path    = require ('path')

/*  ======================================================================== */

module.exports = $trait ({

    $depends: [require ('./api')],


/*  ======================================================================== */

    $defaults: {
        config: {
            port: 1333,
            maxFileSize: 16 * 1024 * 1024,
            requestTimeout: 2000 } },


/*  The $http thing prototype
    ======================================================================== */

    HttpContext: $component ({

        ForbiddenError: $property (function () {
                                        return _.extend (new Error ('Forbidden (403)'), { code: 403 }) }),

        NotFoundError: $property (function () {
                                        return _.extend (new Error ('Not Found (404)'), { code: 404 }) }),

        mime: {
            'html'       : 'text/html',
            'text'       : 'text/plain',
            'json'       : 'application/json',
            'binary'     : 'binary/octet-stream',
            'jpeg'       : 'image/jpeg',
            'jpg'        : 'image/jpeg',
            'png'        : 'image/png',
            'js'         : 'text/javascript',
            'javascript' : 'text/javascript',
            'css'        : 'text/css',
            'svg'        : 'image/svg+xml',
            'ico'        : 'image/x-icon',
            'appcache'   : 'text/cache-manifest',

            guess: function (x) {
                        return _.isString (x) ? this.text : this.json },

            guessFromFileName: function (x) {
                                    return this[path.extname (x).split ('.')[1]] },

            addUTF8: function (x) {
                    return x && (x + (((x.split ('/')[0] === 'text') ||
                                             (x === 'application/json'))
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
                                        env: _.omit (cfg, 'json', 'method', 'url', 'code', 'nonce', 'headers', 'cookies') }) }),

        init: function () {

            _.defaults (this, {

                code: undefined,
                timeout: undefined,
                headers: {},
                nonce: String.randomHex (6),
                cookies: _.object (_.map ((this.request.headers &&
                                           this.request.headers.cookie &&
                                           this.request.headers.cookie.split (';')) || [], cookie => cookie.split ('=').map (
                                                                                                        val => (val || '').trimmed))),
                env: {
                    when: Date.now (),
                    who:  null } })

            this.uri       = this.request && this.request.url && url.parse (this.request.url)
            this.path      = this.uri && this.uri.path.split ('/')
            this.method    = this.request.method
            this.isJSONAPI = (this.path && this.path[1]) === 'api'

            if (this.method === 'POST') {
                this.request.pause () } }, // pauses incoming data receiving, until explicitly resumed

        setCode: function (code) {
                this.code = code; return this },

        setHeaders: function (headers) {
                        _.extend (this.headers, headers); return this },

        redirect: function (to) {
                        return this.setCode (302)
                                   .setHeaders ({ 'Location': to }) },

        setCookies: function (cookies) {
                        return _.extend2 (this, {
                                            cookies: cookies,
                                            headers: {
                                                'Set-Cookie': _.map (cookies, (value, name) =>
                                                    name + '=' + (value || '<<deleted>>') + '; Expires=Wed, 13-Jan-2100 22:23:01 GMT; Path=/') } } ) },

        removeCookies: function (cookies) {
                            return this.cookies (_.object (cookies.map (x => [x, undefined]))) },

        data: $property (function () {
                return new Promise ((then, err) => {
                                        var data = ''
                                        this.request.on ('data', chunk => { data += chunk })
                                        this.request.on ('end', () => { then (data) })
                                        this.request.on ('error', err)
                                        this.request.resume () }) }),

        nocache: function () { // iOS aggressively caches even POST requests, so this is needed to prevent that
                    return this.setHeaders ({
                                'Pragma': 'no-cache',
                                'Cache-control': 'no-cache' }) },

        writeHead: function () {
                    if (!this.headWritten) {
                         this.headWritten = true
                         this.response.writeHead (this.code || 200,
                                                    _.nonempty (_.extended (
                                                                this.headers, {
                                                                    'Content-Type': this.mime.addUTF8 (this.headers['Content-Type']) }))) }; return this },

        write: function (x) {
                    if (!this.ended) {
                         this.response.write (_.isString (x) ? x : JSON.stringify (x)) }; return this },

        end: function () {
                if (!this.ended) {
                     this.ended = true
                     this.response.end () }; return this },

        file: function (file) {

                return fs.stat (file)
                         .then (stat => {   if (!stat.isFile ()) {
                                                throw this.NotFoundError }

                                            this.setHeaders ({
                                                    'Content-Type': $http.mime.guessFromFileName (file) || this.mime.binary,
                                                    'Content-Length': stat.size })
                                                 .writeHead ()

                                            return new Promise ((then, err) =>
                                                                    fs.createReadStream (file, { 'bufferSize': 4 * 1024 })
                                                                        .on ('error', err)
                                                                        .on ('close', then.arity0)
                                                                        .pipe (this.response)) })

                    .catch (e => { throw this.NotFoundError }) } }),

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
                                                        resolve (this.callAPIHandler ()
                                                                     .timeout (this.config.requestTimeout)) })
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

                        log.withConfig (log.config ({ indentPattern: '    ' }), () => {
                            if ((result.processContext.root.printEvents ({ verbose: e ? true : false }).all > 0) &&
                                (x !== undefined)) {
                                    log.margin ()
                                    log.green (log.indent (1), log.thinLine)
                                    log.margin ()
                                    log.gg (log.indent (1), _.isString (x) ? x.limitedTo (120) : x, '\n') } }) })

                .catch (log.ee.$ (log.config ({ indent: 1, location: false }), '\n')) },

    callAPIHandler: function () {

                        var match = APISchema.match (this.apiSchema, $http.method, $http.path)

                        if (!match) {   log.newline ()
                                        APISchema.debugTrace (this.apiSchema, $http.method, $http.path)
                                        throw $http.NotFoundError }

                        else {
                            _.extend ($http.env, match.vars); return match.fn () } },

    writeResult: function (x) {

                if ((x !== undefined) && (x !== $http)) {

                /*  Make /api/ URLS respond with { success: true, value: .. } pattern by default, but only if
                    no Content-Type was explicitly specified. So that a handler can override that behavior by
                    specifying a Content-Type.                                                                  */

                    if (!$http.headers['Content-Type']) {
                         $http.headers['Content-Type'] = $http.mime.guess (
                                                            x = ($http.isJSONAPI ? { success: true, value : x } : x)) }
                    $http.writeHead ()
                         .write (x) }

                return x },

    writeError: function (e) { // TODO: construct asynchronous error stack from AndrogeneProcessContext

        if ( ($http.headers['Content-Type'] === $http.mime.json) || // if JSON
            (!$http.headers['Content-Type']  && $http.isJSONAPI)) { // or if /api/ and no Content-Type explicitly specified
            
            if (e instanceof Error) {
                $http.setCode (e.httpCode || $http.code || 500)
                     .writeHead ()
                     .write ({
                        success: false,
                        error: e.message,
                        parsedStack: CallStack.fromError (e).asArray.map (e => _.extend (e, { remote: true })) }) }
            else {
                $http.writeHead ()
                     .write ({
                        success: false,
                        error: e }) } }

        else { var x = log.impl.stringify (e)

            $http.setCode ($http.code || 500)
                 .writeHead ()
                 .write (($http.headers['Content-Type'] === $http.mime.html) ?
                            ('<html><body><pre>' + _.escape (x) + '</pre></body></html>') : x) }

        throw e },


/*  REQUEST PROCESSING PRIMITIVES
    ======================================================================== */

    interlocked: function (then) {
                    return _.interlocked (releaseLock => { _.onAfter ($http, 'end', releaseLock); then () }) },

    allowOrigin: function (value) {
                    return function (x) {
                        $http.headers['Access-Control-Allow-Origin'] = value; return x } },

    jsVariable: function (rvalue, lvalue) {
                    $http.contentType ($http.mime.javascript)
                    return 'var ' + rvalue +
                            ' = ' + _.stringify (lvalue, { pure: true, pretty: true }) },

    receiveJSON: function () {
                    return $http.data.then (log.ii)
                                     .then (JSON.parse) },

    receiveForm: function () {
                    return $http.data
                                .then (data => {
                                    return log.i ('POST vars:',
                                                    _.object (
                                                    _.map (data.split ('&'), kv => kv.split ('=').map (decodeURIComponent)))) }) },

    receiveFile: function () {

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

    file: function (location) { var location    = path.join (process.cwd (), location),
                                    isDirectory = fs.lstatSync (location).isDirectory ()
            return () => {
                var file = isDirectory ? $http.env.file : ''
                if (file.split ('/').find (x => (x === '.') || (x === '..'))) {
                    throw $http.ForbiddenError }
                else {
                    return $http.file (path.join (location, file)) } } },

/*  ======================================================================== */

})
