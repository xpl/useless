"use strict";

const exec = require ('child_process').exec

module.exports = $trait ({

    afterInit () {
        this.birthdate = Date.now () },

    uptime () {
        return Date.now () - (this.birthdate || Date.now ()) } })