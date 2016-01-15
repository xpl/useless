 module.exports = NiceExceptions = $trait ({

    beforeInit: function (then) { log.info ('Setting up exception handling')

        _.withUncaughtExceptionHandler (this.$ (function (e) {

            if (!this.restarting) {
                log.writeUsingDefaultBackend ('\n', e) }  // Swallow errors if we're restarting (as they're expected)

            if (e.fatal) {
                log.e (log.boldLine + ' cannot continue ' + log.boldLine + '\n')
                process.exit () } }))
        
        then () },

    /*  Mark your request processing chains with this method, to select proper error printer
     */
    htmlErrors: function (then) {
        return this.$ (function (context) {
            context.htmlErrors = true
            then.apply (this, arguments) }) },

    addExceptionHandlingToContext: function (context) {

        if (context.hasExceptionHandling) {
            throw 'How this happens? Something is srsly fckdup... or someone' }
        else {
            context.hasExceptionHandling = true }

        var onError = function (e) { log.write ('\n', e)
            if (context.htmlErrors) {
                context.html ('<html><body><pre>' + _.escape (log.impl.stringifyError (e)) + '</pre></body></html>') }
            else {
                context.json ({
                    success: false,
                    error: e.message,
                    parsedStack: _.map (CallStack.fromError (e).asArray,
                                        function (e) { return _.extend (e, { remote: true }) }) }) } }

        _.withUncaughtExceptionHandler (onError, function (off) {
            _.onAfter (context, 'end', off) }) } })