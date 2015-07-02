var fs   = require ('fs'),
    path = require ('path')

/*  Chainable request processing primitives for basic I/O
 */

module.exports = $trait ({

    /*  Converts random CPS routine to request handler
     */
    evals: function (fn) {
        return function (context) {
            fn (function () {
                context.jsonSuccess () }) } },


    /*  Executes a function before chain (for logging and debugging of chains)
     */
    onBefore: function (thisCallsBefore, then) {
        return this.$ (function (context) {
            thisCallsBefore.apply (this, arguments)
            then.apply (this, arguments) }) },


    /*  Makes whole chain $interlocked (see concurrency.js for details), as
        being a wrapper over it, lifting it to request handling chain level.
     */
    interlocked: function (then) {
        return $interlocked (this.$ (function (context, releaseLock) {
            _.onAfter (context, 'end', releaseLock)
            then.call (this, context) })) },


    /*  JSON I/O
     */
    jsonInput: function (then) { return this.$ (function (context) {
        context.json (this.$ (function (data) {
            if (data) {
                context.jsonInput = data                        // temporary (some handlers still need jsonInput isolated)
                context.env = _.extend ({}, data, context.env)  // prevents overriding of previous context.env variables
                then.call (this, context) }
            else {
                context.jsonFailure ('Неправильный формат данных')  } })) }) },

    jsonSuccess: function (returnField) { return this.$ (function (context) {
        context.jsonSuccess (context.env[returnField]) })},


    /*  Parses POST params (x-www-form-urlencoded), writing them to context.env (as in jsonInput)
     */
    postInput: function (then) { return function (context) {
        context.data (this.$ (function (data) { 
            var postVars = _.object (_.map (data.split ('&'), function (keyValue) {
                return _.map (keyValue.split ('='), decodeURIComponent) }))

            log.info ('POST INPUT:', postVars)

            context.env = _.extend (postVars, context.env)

            then.call (this, context) })) }},


    /*  Renders "var varName = { ... }" as JavaScript
     */
    jsVariable: function (varName, what) {
        return function (context) {
            var value = _.isFunction (what) ? what (context) : what
            var jsValue = Format.javascript (value)
            context.success ('var ' + varName + ' = ' + jsValue, { 'Content-Type': 'text/javascript' }) } },


    /*  Serves file's contents
     */
    file: function (location) { var isDirectory = fs.lstatSync (location).isDirectory ()
        return function (context) {
            return context.file (isDirectory ? path.join (location, context.env.file) : location) } },

})