var http    = require ('http'),
    util    = require ('./base/util'),
    Context = require ('./base/context')
              require ('./base/assertion_syntax')

ServerHttp = module.exports = $trait ({

    $depends: [require ('./exceptions'),
               require ('./api')],

    $assertion: {
        $async: {

            assertRequest: function (url, ctx, then) {
                                this.serveRequest (_.extend ({}, ctx, { url: url,
                                    success: function (result) { then (this, result) },
                                    failure: function (result) { log.error (result); $fail; then () } })) },

            assertRequestFails: function (url, ctx, desiredResult, then) {
                                    this.serveRequest (_.extend ({}, ctx, { url: url,
                                        success: function (result) { $fail; then () },
                                        failure: function (result) { $assert (result, desiredResult); then () } })) } } },

    beforeInit: function (then) { var portNumber = this.port || 1333

        log.ii ('Starting HTTP @ localhost:' + portNumber)

        this.httpServer = http
            .createServer (this.$ (function (request, response) {
                log (request.method === 'GET' ? log.color.green : log.color.pink, request.method, ': ', log.color.bright, request.url)
                this.serveRequest (new Context ({ request: request, response: response })) }))
            .listen (this.port || 1333, then.arity0) },


    /*  entry point for all requests, now accepting either actual Context or it's config for ad-hoc evaluation
     */
    serveRequest: function (context_) { var context = (_.isTypeOf (Context, context_) && context_) || this.newContext (context_)
        if (!APISchema.match (
            context,
            this.apiSchema,
            this.$ (function (context, handler) {

                if (!context.stub) {
                    this.addExceptionHandlingToContext (context) }

                handler.call (this, context) }), this.apiDebug)) { context.notFound () } },

    /*  a stub context constructor
     */
    newContext: function (cfg) {

        var success = cfg.success || _.identity
        var failure = cfg.failure || _.identity
        var end     = cfg.end || _.identity

        return new Context ({
            request: _.extend ({ method: 'POST', pause: _.identity }, cfg.request, _.pick (cfg, 'url', 'method', 'headers', 'cookies')),
            response: cfg.response,
            cookies: cfg.cookies,

            stub: true,

            end: function () { end () },

            // bind to JSON-related and other methods to derive flow control
            success:        function ()         { success.apply (this, arguments); this.end () },
            jsonSuccess:    function (result)   { success.apply (this, arguments); this.end () },
            jsonFailure:    function (result)   { failure.apply (this, arguments); this.end () },
            notFound:       function ()         { failure.call  (this, '404: не найдено'); this.end () },
            json:           function (done)     { done (cfg.json || {}) },

            // gather 'env' variables
            env: _.omit (cfg, 'json', 'end', 'success', 'failure', 'method', 'url', 'headers', 'cookies') }) }

})
