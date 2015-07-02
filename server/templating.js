var fs = require ('fs')

module.exports = $trait ({

    /*  Front-end (as request processing chain primitive)
     */
    template: function (fileName, args, headers) {
        return this.htmlErrors (function (context) {
            this.compiledTemplate (fileName, function (template) {
                context.success (template (_.extend ({ env: context.env }, args)), headers) }) }) },

    htmlTemplate: function (fileName, args) {
        return this.template (fileName, args, { 'Content-Type': 'text/html' }) },


    /*  Back-end
     */
    evalTemplate: function (fileName, args, then) {
        this.compiledTemplate (fileName, function (template) {
            then.call (this, template (args)) }) },

    compiledTemplate: function (fileName, then) {
        if (!this.compiledTemplates) {
            this.compiledTemplates = {} }

        if (this.compiledTemplates[fileName]) {
            then.call (this, this.compiledTemplates[fileName]) }

        else {
            fs.readFile ('templates/' + fileName, 'utf8', this.$ (function (err, data) {
                if (err) {
                    log.error (err) }
                else {
                    then.call (this, this.compiledTemplates[fileName] = _.template (data)) } })) } } })