"use strict";

const _ = require ('underscore')

/*  DEPRECATED. Don't add new utility here. Will be refactored:

    1.  Http utils will go to /base/http.js (cross-platform)
    2.  Filesystem utils will go to base/fs.js
 */

const   path        = require ('path'),
        fs          = require ('fs'),
        process     = require ('process'),
        http        = require ('http'),
        https       = require ('https'),
        exec        = require ('child_process').exec,
        Buffer      = require ('buffer').Buffer,
        jsStrEscape = require ('js-string-escape'),
        log         = require ('ololog')

path.joins     = _.higherOrder (path.join)
path.joinWith  = _.flipN       (path.join)
path.joinsWith = _.higherOrder (path.joinWith)

const util = module.exports = {

    fatalError: function (...args) {
                    log.bright.red.error.configure ({ locate: { where: (new StackTracey ().clean.at (2)) } }) (...args)
                    throw _.extend (new Error (args.join (' ')), { fatal: true, stackOffset: 1 }) },

    locateFile: function (name, searchPaths) {
        return _.find (_.cons (name, (searchPaths || [process.cwd ()]).map (path.joinsWith (name).arity1)),
                        fs.lstatSync.catches (false, true)) || module.exports.fatalError ('Unable to locate ' + name) },

    readFile: function (name, searchPaths) {
        return fs.readFileSync.catches (module.exports.fatalError.$ ('Cannot read', name)) (
                                        module.exports.locateFile (name, searchPaths), { encoding: 'utf-8' }) },

    writeFile: function (file, what) {
        fs.writeFileSync.$ (file, what, { encoding: 'utf-8'})
          .catches (module.exports.fatalError.$ ('Cannot write', file)) ()  },

    isDirectory: x => fs.statSync.catches ({ isDirectory: () => false }) (path.resolve (x)).isDirectory (),

    mkdir: function (dirPath, root_ = process.cwd ()) {

        if (dirPath[0] === '/') { dirPath = path.relative (root_, dirPath) }

        var dirs = dirPath.split ('/')
        var dir = dirs.shift ()
        var root = path.join (root_, dir)
        try {
            if (!fs.existsSync (root)) {
                log.yellow ('mkdir', root.bright)
                fs.mkdirSync (root)
            }
        } catch (e) {
            if (fs.statSync (root).isDirectory () !== true) {
                throw 'directory creation failed';
            }
        }
        return (dirs.length === 0 ? root : false) || module.exports.mkdir (dirs.join ('/'), root);
    },
    uniqueFilePath: function (root, name, extension) {
        var n = 1, resultPath, resultName = name
        while (fs.existsSync (resultPath = path.join (root, resultName) + (extension ? ('.' + extension) : ''))) {
            resultName = name + '_' + (n++)
        }
        return resultPath
    },
    uniqueFileName: function (...args) {
        return path.basename (util.uniqueFilePath (...args))
    },
    // httpGet_and_downloadFile_example: function () {
    //     module.exports.httpGet ({
    //         path: '/',                  // URL part after the hostname
    //         host: 'www.cian.ru',        // if you encounter "getaddrinfo ENOTFOUND" error, probably your 'host' is not correct (DNS failure)
    //         port: 80,                   // 443 for HTTPS, any other (usually 80) for HTTP
    //         encoding: 'cp1251',         // default encoding is 'utf8' (if not explicitly set), other accepted values are 'cp1251' and 'binary'
    //         rejectUnauthorized: false,  // ignores SSL certificate errors (for HTTPS case)
    //         headers: {
    //             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    //             'Accept-Encoding': '',
    //             'Accept-Language': 'en-US,en;q=0.8,ru;q=0.6',
    //             'Cache-Control': 'max-age=0',
    //             'Connection': 'keep-alive',
    //             'Host': 'www.cian.ru',
    //             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36'
    //         },
    //         success: function (data) { log.success ('httpGot', data) },
    //         failure: log.error
    //     })
    //     module.exports.downloadFile ({
    //         overwrite: false, // if false, skips download if file already exists at 'dst' (default is true)
    //         dst: path.join (process.cwd (), 'static/photos/index.html'), // target path in file system
    //         src: {
    //             path: '/',
    //             host: 'cian.ru',
    //             port: 443,
    //             rejectUnauthorized: false, // ignores SSL certificate errors
    //             headers: {
    //                 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    //                 'Accept-Encoding': '',
    //                 'Accept-Language': 'en-US,en;q=0.8,ru;q=0.6',
    //                 'Cache-Control': 'max-age=0',
    //                 'Connection': 'keep-alive',
    //                 'Host': 'cian.ru',
    //                 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36'
    //             }
    //         },
    //         success: function (dst) { log.success ('downloaded', dst) },
    //         failure: log.error
    //     })
    // },
    readHttpResponse: function (encoding, then, error) {
        return function (response) {
            var data = ''
            response.setEncoding ((encoding == 'cp1251') ? 'binary' : (encoding || 'utf8'))
            response.on ('data', function (chunk) {
                data += chunk
            })
            response.on ('error', error || function () {})
            response.on ('end', function() {
                switch (encoding) {
                    case 'cp1251':
                        then (new (require ('iconv').Iconv) ('windows-1251', 'utf-8//IGNORE').convert (new Buffer (data, 'binary')).toString ()); break;
                    case 'binary':
                        then (new Buffer (data, 'binary')); break;
                    default:
                        then (data.toString (encoding)); break; } }) }
    },
    httpGet: function (cfg) {
        log.cyan ('httpGet:', cfg.host + cfg.path)
        var req = (cfg.port === 443 ? https : http).get (cfg, module.exports.readHttpResponse (cfg.encoding, cfg.success))
        req.on ('error', cfg.failure)
    },
    downloadFile: function (cfg) {
        if (cfg.overwrite === false && fs.existsSync (cfg.dst)) {
            log.green ('downloadFile: already exists at', cfg.dst)
            cfg.success (cfg.dst)
        } else {
            log.warn ('downloadFile: downloading', cfg.src.path)
            var req = (cfg.src.port === 443 ? https : http).get (cfg.src, function (response) {
                module.exports.writeRequestDataToFile (_.extend (_.pick (cfg, 'success', 'failure'), {
                    request: response,
                    filePath: cfg.dst
                }))
            })
            req.on ('error', function(err) {
                cfg.failure (err.message)
            })
        }
    },
    curl: function (url, complete) {
        exec ('curl  "' + url + '"', function (e, stdout, stderr) {
            complete.call (this, e, stdout, stderr)
        })
    },
    writeRequestDataToFile: function (cfg) {

        return new Promise (function (success, failure) {

            /* configure writer */
            log.cyan ('Writing file ' + cfg.filePath)

            var bytesReceived = 0
            var allDataReceived = false
            var allDataWritten = true
            var fileStream = fs.createWriteStream (cfg.filePath, { encoding: 'binary' })
            var finalize = AndrogeneProcessContext.within (function () {
                fileStream.end ()
                success (cfg.filePath)
            })
            fileStream.addListener ('error', failure)
            fileStream.addListener ('drain', AndrogeneProcessContext.within (function () {
                allDataWritten = true
                if (allDataReceived) {
                    finalize ()
                } else {
                    cfg.request.resume ()
                }
            }))
            /* configure reader */
            cfg.request.on ('data', AndrogeneProcessContext.within (data => {
                var chunk = new Buffer (data, 'binary')
                log.cyan ('writing chunk of size ' + chunk.length)
                bytesReceived += chunk.length
                if (cfg.maxSize && (bytesReceived > cfg.maxSize)) {
                    log.bright.red.error ('writeRequestDataToFile: exceeded max file size, terminating')
                    cfg.request.end ()
                } else {
                    if (!(allDataWritten = fileStream.write (chunk, 'binary'))) {
                        cfg.request.pause ()
                    }
                }
            }))
            cfg.request.on ('end', AndrogeneProcessContext.within (function() {
                allDataReceived = true
                if (allDataWritten) {
                    finalize ()
                }
            }))
            cfg.request.resume ()
        })
    }
}