var fs = require ('fs')

ServerTemplating = module.exports = $trait ({

    $defaults: {
        compiledTemplates: {} },

    $depends: [require ('./io')],

    /*  Front-end (as request processing chain primitive)
     */
    template: function (fileName, args, headers) {
        return this.htmlErrors (context => {
            this.compiledTemplate (fileName, template =>
                                                context.success (template (_.extend ({ env: context.env }, args)), headers)) }) },

    htmlTemplate: function (fileName, args) {
        return this.template (fileName, args, { 'Content-Type': 'text/html' }) },


    /*  Back-end
     */
    evalTemplate: function (fileName, args, then) {
        this.compiledTemplate (fileName, template => then (template (args))) },

    compiledTemplate: function (fileName, then) {

        if (      this.compiledTemplates[fileName]) {
            then (this.compiledTemplates[fileName]) }

        else {
            fs.readFile ('templates/' + fileName, { encoding: 'utf-8' }, (err, data) => {
                if (err) { log.error (err) }
                    else { then (this.compiledTemplates[fileName] = _.template (data)) } }) } } })