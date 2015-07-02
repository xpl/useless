var exec = require ('child_process').exec

module.exports = $trait ({

    afterInit: function () {
        this.birthdate = Date.now () },

    uptime: function () {
        return Date.now () - (this.birthdate || Date.now ()) },

    restart: function () { // assumes we are running in supervisor/nodemon context)
        if (!this.restarting) { log.warn ('Restarting...')
             this.restarting = true
             _.delay (function () { exec ('touch main.js', _.identity) }, 1000) } } })