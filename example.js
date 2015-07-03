/*  Run this file with

    > node example.js
 */

require ('./useless')

var path = require ('path'),
    fs   = require ('fs')

Examples = $singleton (Component, {

    api: function () { return {
        '/':               this.file ('./example/index.html'),
        'useless.js':      this.file ('./build/useless.js'),
        'useless/:file':   this.file ('./client/'),
        'example/:file':   this.file ('./example/') } },

    $traits: [
        
        require ('./server/exceptions'),
        require ('./server/tests'),
        require ('./server/deploy'),
        require ('./server/api'),
        require ('./server/io'),
        require ('./server/http'),
        require ('./server/templating'),
        require ('./server/devtools'),
        require ('./server/uptime') ],

    init: function (then) {
        log.green ('Example app is running at http://localhost:1333')
        then () } })