ServerWebsocket = module.exports = $trait ({

    $defaults: {
        peers: [] },

    /*  Override this to specify who can connect via WebSocket
     */
    websocketAuth: function (msg, authorize, drop) {

        if (!this.db) {
            log.warn ('Add `auth` trait to restrict incoming WebSocket connections')
            authorize (msg) }

        else {
            var credentials = _.pick (msg, 'email', 'password')
            if (credentials.email && credentials.password) {
                this.db.users.findOne (_.extend ({ isAdmin: true }, credentials), this.$ (function (e, user) {
                    if (user) {
                        authorize (user) }
                    else {
                        drop ('invalid auth credentials') } })) }
            else {
                drop ('missing auth credentials') } } },

    websocketStringifyUser: function (user) {
        return ((this.entitySchema && this.entitySchema.users && this.entitySchema.users.text) || _.stringify) (user) },

    /*  Sends a message to connected peers via WebSocket
     */
    messageToPeers: function (obj, filterPredicate) {
        var msg = JSON.stringify (obj)
        var peers = (filterPredicate && this.peers.filter (function (peer) { return filterPredicate (peer.user) })) || this.peers

        _.invoke (peers, 'send', msg) },

    afterInit: function () { log.minor ('Starting WebSocket...')

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
                log.dark ('peer disconnected:', this.websocketStringifyUser (connection.user), '(' + connection.remoteAddress + ')') }))

            connection.on ('message', this.$ (function (message) {
                if (message.type === 'utf8') {
                    this.websocketAuth (JSON.parse (message.utf8Data), this.$ (function (user) {
                        log.gg ('peer authorized:', this.websocketStringifyUser (user), '(' + connection.remoteAddress + ')')
                        connection.send (JSON.stringify ({ what: 'handshake', uptime: this.uptime ? this.uptime () : undefined }))
                        connection.user = user
                        this.peers.push (connection) }), drop) }
                else {
                    drop ('invalid auth format') } })) })) } })