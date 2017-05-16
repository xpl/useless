"use strict";

const _  = require ('underscore')

const stringify = require ('string.ify')

module.exports = $trait ({

    $defaults: {
        peers: [] },

    /*  Override this to specify who can connect via WebSocket
     */
    websocketAuth (msg, authorize, drop) {
        log.warn ('Override websocketAuth() to restrict incoming WebSocket connections')
        return Promise.resolve ({} /* user */)
    },

    websocketStringifyUser (user) { return '<user>' },

    /*  Sends a message to connected peers via WebSocket
     */
    messageToPeers (obj, filterPredicate) {

        var msg = JSON.stringify (obj)
        var peers = (filterPredicate && this.peers.filter (peer => filterPredicate (peer.user))) || this.peers

        _.invoke (peers, 'send', msg) },

    afterInit () { log.minor ('Starting WebSocket...')

        var websocket = require ('websocket')
        
        this.peers = []
        this.websocketServer = new websocket.server ({
            httpServer: this.httpServer })

        this.websocketServer.on ('request', this.$ (function (request) {

            var connection = request.accept (null, request.origin)
            
            var drop = function (why) {
                log.ee ('dropping peer:', connection.remoteAddress, '(' + why + ')')
                connection.drop (websocket.connection.CLOSE_REASON_POLICY_VIOLATION, why) }

            log.ww ('peer connected: ' + connection.remoteAddress)

            connection.on ('close', this.$ (function () {
                this.peers = _.reject (this.peers, connection)
                log.dark ('peer disconnected:', connection.user, '(' + connection.remoteAddress + ')') }))

            connection.on ('message', this.$ (function (message) {
                if (message.type === 'utf8') {
                    this.websocketAuth (JSON.parse (message.utf8Data))
                        .then (this.$ (function (user) {
                            log.gg ('peer authorized:', this.websocketStringifyUser (user), '(' + connection.remoteAddress + ')')
                            connection.send (JSON.stringify ({ what: 'handshake', uptime: this.uptime ? this.uptime () : undefined }))
                            connection.user = user
                            this.peers.push (connection) }))
                        .catch (drop)
                }
                else {
                    drop ('invalid auth format') } })) })) } })