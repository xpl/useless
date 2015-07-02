var _               = require ('underscore'),
    fs              = require ('fs'),
    sys             = require ('sys'),
    url             = require ('url'),
    path            = require ('path'),
    util            = require ('./util'),
    serverConfig    = {}//require ('../config')

Context = $prototype ({

    mimeTypes: $static ($property ({
        'html':'text/html', 'jpeg':'image/jpeg', 'jpg':'image/jpeg',
        'png':'image/png', 'js':'text/javascript', 'css':'text/css', 'svg':'image/svg+xml',
        'appcache': 'text/cache-manifest' })),

    constructor: function (cfg) { _.extend2 (this, { // extend2 means you can extend context.env without losing env.when
        headers: {},
        cookies: _.object (_.map (
            (cfg && cfg.request && cfg.request.headers && cfg.request.headers.cookie && cfg.request.headers.cookie.split (';')) || [], function (cookie) {
                return _.map (cookie.split ('='), function (val) { return (val || '').trim () })})),
        env: {
            when: Date.now (),
            who:  null,
            serverConfig: serverConfig }}, cfg) 
    
        this.uri    = this.request && this.request.url && url.parse (this.request.url)
        this.path   = this.uri && this.uri.path.split ('/') },

    end: function () {  // bind with _.onAfter to execute something after request handling ends
        this.response.end () },

    setCookies: function (cookies) { return _.extend2 (this, {
        cookies: cookies,
        headers: { 'Set-Cookie': _.map (cookies, function (value, name) {
                                    return name + '=' + value + '; Expires=Wed, 13-Jan-2100 22:23:01 GMT; Path=/' }) } } ) },

    removeCookies: function (cookies) { return _.extend2 (this, {
        cookies: cookies,
        headers: { 'Set-Cookie': _.map (cookies, function (name) {
                                    return name + '=<<deleted>>; Expires=Wed, 13-Jan-1970 22:23:01 GMT; Path=/' }) } } ) },

    head: function (code, headers) {
        this.response.writeHead (code, _.extend (this.headers, headers)) },

    data: function (next) {
        var data = ''
        this.request.on ('data', function (chunk) { data += chunk })
        this.request.on ('end', function() { next (data) })
        this.request.resume () },

    redirect: function (to) {
        this.head (302, { 'Location': to })
        this.end () },

    notFound: function () {
        log.warn ('404: ' + this.request.url)
        this.head (404, { 'Content-Type': 'text/plain' })
        this.response.write ('404 Not Found\n')
        this.end () },

    file: function (file, headers) {
        fs.stat (file, this.$ (function (err, stats) {
            if (err || !stats.isFile ()) {
                this.notFound () }
            else {
                this.head (200, _.extend ({
                    'Content-Type': Context.mimeTypes[path.extname (file).split ('.')[1]],
                    'Content-Length': stats.size }, headers))

                fs.createReadStream (file, {
                    'bufferSize': 4 * 1024 })
                    .pipe (this.response) } })) },

    success: function (text, headers) {
        this.head (200, _.extend ({}, headers, {
            'Content-Type': ((headers && headers['Content-Type']) || 'text/plain') + '; charset=utf-8',
            /*'Content-Length': Buffer.byteLength (text, 'utf8'), // should perfomance-test this before (for >50mb of data it IS the concern)*/ }))
        
        this.response.write (text) // default encoding of 'write' is utf8
        this.end () },

    html: function (text, headers) {
        this.success (text, _.extend ({ 'Content-Type': 'text/html' }, headers)) },

    json: function (argument, headers) {
        if (typeof argument == 'function') { // receive JSON and pass it to 'argument' callback
            this.data (function (data) {
                var json = undefined
                try {
                    log.info ('JSON INPUT: ', data)
                    json = JSON.parse (data) }
                catch (e) {
                    log.error ('Invalid JSON: ' + data) }
                argument (json) }) }

        else { // send JSON
            this.success (JSON.stringify (argument), _.extend ({
                'Content-Type': 'application/json',
                'Pragma': 'no-cache', // iOS aggressively caches even POST requests
                'Cache-control': 'no-cache' }, headers)) } },

    jsonSuccess: function (value) {
        this.json ({ success: true, value: value }) },

    jsonFailure: function (error) {
        log.warn (error, $callStack)
        this.json ({ success: false, error: error }) },

    handleFileUpload: function (success) {
        if (this.request.headers['content-type'] != 'binary/octet-stream') {
            this.jsonFailure ('Invalid content type') }
        else {
            var maxFileSize = 16 * 1024 * 1024
            var fileSize = parseInt (this.request.headers['x-file-size'], 10)
            if (fileSize <= 0) {
                this.jsonFailure ('Файл пуст') }
            else if (fileSize > maxFileSize) {
                this.jsonFailure ('Файл слишком большой') }
            else {
                util.writeRequestDataToFile ({
                    request: this.request,
                    filePath: path.join (process.env.TMP || process.env.TMPDIR || process.env.TEMP || '/tmp' || process.cwd (), Format.randomHexString (32)),
                    success: success,
                    failure: this.$ (function () {
                        this.jsonFailure ('Ошибка при загрузке файла') }) }) } } } })

module.exports = Context