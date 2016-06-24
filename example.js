/*  Run this file with this command in console

    > node example.js
 */

require ('./useless')

Examples = $singleton (Component, {

    api: function () { return {

        '/':               this.file ('./example/index.html'),
        'build/:file':     this.file ('./build/'),
        'client/:file':    this.file ('./client/'),
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

    erroneousMethod: function () {
                        unknownFunction () },

    init: function () {
                log.green ('Example app is running at http://localhost:1333') } })
