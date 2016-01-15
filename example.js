/*  Run this file with

    > node example.js
 */

require ('./useless')

Examples = $singleton (Component, {

    api: function () { return {
        '/':               this.file ('./example/index.html'),
        'useless.js':      this.file ('./build/useless.js'),
        'useless/:file':   this.file ('./client/'),
        'example/:file':   this.file ('./example/'),

        'api/erroneous-method': { post: this.erroneousMethod } } },

    $depends: [
        
        require ('./server/supervisor'),
        require ('./server/tests'),
        require ('./server/deploy'),
        require ('./server/http'),
        require ('./server/templating'),
        require ('./server/websocket'),
        require ('./server/devtools'),
        require ('./server/uptime') ],

    erroneousMethod: function (context) { 2 + 2 = 5 },

    init: function (then) { log.green ('Example app is running at http://localhost:1333'); then () } })
