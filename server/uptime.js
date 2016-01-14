var exec = require ('child_process').exec

module.exports = $trait ({

    afterInit: function () {
        this.birthdate = Date.now () },

    uptime: function () {
        return Date.now () - (this.birthdate || Date.now ()) } })