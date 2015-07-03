var http    = require ('http'),
    util    = require ('./base/util')
    Context = require ('./base/context.js')

module.exports = $trait ({

    beforeInit: function (then) { log.info ('Starting HTTP')

        this.httpServer = http
            .createServer (this.$ (function (request, response) {
                console.log (request.method, ': ', request.url)
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

                handler.call (this, context) }))) { context.notFound () } },

    /*  a stub context constructor
     */
    newContext: function (cfg) {

        var success = cfg.success || _.identity
        var failure = cfg.failure || _.identity
        var end     = cfg.end || _.identity

        return new Context ({
            request: _.extend ({ method: 'POST', pause: _.identity }, cfg.request, _.pick (cfg, 'url', 'method', 'headers')),
            response: cfg.response,

            stub: true,

            end: function () { end () },

            // bind to JSON-related and other methods to derive flow control
            success:        function ()         { success.apply (this, arguments); this.end () },
            jsonSuccess:    function (result)   { success.apply (this, arguments); this.end () },
            jsonFailure:    function (result)   { failure.apply (this, arguments); this.end () },
            notFound:       function ()         { failure.call  (this, '404: не найдено'); this.end () },
            json:           function (done)     { done (cfg.json || {}) },

            // gather 'env' variables
            env: _.omit (cfg, 'json', 'end', 'success', 'failure', 'method', 'url', 'headers') }) }

})
