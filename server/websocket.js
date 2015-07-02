module.exports = $trait ({

    /*  Sends a message to connected peers via WebSocket
     */
    messageToPeers: function (obj, filterPredicate) {
        var msg = JSON.stringify (obj)
        var peers = (filterPredicate && this.peers.filter (function (peer) { return filterPredicate (peer.user) })) || this.peers

        _.invoke (peers, 'send', msg) },

    afterInit: function (then) { log.info ('Starting WebSocket')

        var websocket = require ('websocket')
        
        this.peers = []
        this.websocketServer = new websocket.server ({
            httpServer: this.httpServer })

        this.websocketServer.on ('request', this.$ (function (request) {
            var connection = request.accept (null, request.origin)
            var drop = function (why) {
                log.error ('dropping peer:', connection.remoteAddress, '(' + why + ')')
                connection.drop (websocket.connection.CLOSE_REASON_POLICY_VIOLATION, why) }

            log.info ('peer connected: ' + connection.remoteAddress)

            connection.on ('close', this.$ (function () {
                this.peers = _.reject (this.peers, connection)
                log.warn ('peer disconnected:', Collections.users.text (connection.user), '(' + connection.remoteAddress + ')') }))

            connection.on ('message', this.$ (function (message) {
                if (message.type === 'utf8') {

                    var credentials = _.pick (_.json (message.utf8Data), 'email', 'password')
                    if (credentials.email && credentials.password) {

                        this.db.users.findOne (_.extend ({ isAdmin: true }, credentials), this.$ (function (e, user) {
                            if (user) {
                                log.success ('peer authorized:', Collections.users.text (user), '(' + connection.remoteAddress + ')')
                                connection.send (_.json ({ what: 'handshake', uptime: this.uptime () }))
                                connection.user = user
                                this.peers.push (connection) }
                            else {
                                drop ('invalid auth credentials') }})) }

                    else {
                        drop ('invalid auth credentials') }}
                    else {
                        drop ('invalid auth format') }}))}))

        then () } })