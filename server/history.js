ServerHistory = module.exports = $trait ({

    $depends: [require ('./entity'),
               require ('./websocket')],

    api: function () {
        return { 'api': this.collectionAPI ('history', {
                            methods: {
                                'last-month': this.adminAccess (this.historyForLastMonth) } }) } },


    historyForLastMonth: function (context) {
        this.db.history.find ({ when: { $gt: Date.now () - 1000 * 60 * 60 * 24 * 30 }}).toArray (function (e, items) {
            context.jsonSuccess (items) }) },

    writeHistory: function (entry, then) {

        if (entry.supressHistoryWrite === true) {
            if (entry.supressPeerNotify !== true) {
                this.messageToPeers (entry) }
            if (then) {
                then.call (this, entry) } }

        else { this.db.incrementCounter ('history', this.$ (function (n) {
                _.extend (entry, {
                    index: n,
                    when: entry.when || Date.now (),
                    self: entry.which === entry.who })

                //log.success ('writing history', entry)
                
                this.db.history.insertOne (DAL.escapeMongoOperators (entry), this.$ (function (e, what) {
                    if (entry.supressPeerNotify !== true) {
                        _.delay (this.messageToPeers.partial (_.extend ({ _id: what.ops[0]._id }, entry)), 1000) } }))

                if (then) {
                    then.call (this, entry) } })) } } })