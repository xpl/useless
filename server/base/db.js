/*  DB driver
 */

var mongo           = require ('mongodb'),
      _             = require ('underscore'),
    util            = require ('./util')

Db = $prototype ({

    /* opens mongodb connection
     */
    constructor: function (dbName, schema, complete) {
        new mongo.Db (dbName, this.server = new mongo.Server ('localhost', 27017, {
                safe: true,
                auto_reconnect: true,
                fsync: true,
                journal: true }))
        
            .open (this.$ (function (err, db) {
                this.db = db
                this.schema = schema
                this.collections = {}
                if (!err) {
                    this.openCollections (complete) }
                else {
                    log.error (err.message, db)
                    throw "Failed to open DB: " + JSON.stringify (err) } })) },

    /*  Makes aliases + adds custom properties/methods to a collection
     */
    initCollection: function (id, collection) { var schema = this.schema[id]
        _.extend (this[id] = this.collections[id] = collection, {
            schema: schema,
            convertObjectIds: function (obj) {
                return _.mapObject (obj, function (value, key) {
                    return ((schema.fields[key] || {}).isObjectID) ? (new mongo.ObjectID (value)) : value }) } }) },

    /*  acquires handles to mongodb 'tables' (im not sure if it's safe to keep them persistent)
     */
    openCollections: function (complete) {
        _.enumerate (_.keys (Collections), this.$ (function (id, i, next) {
            this.db.collection (id, this.$ (function (err, collection) {
                if (!err) {
                    this.initCollection (id, collection)

                    _.each (collection.schema.indexes || [], function (field) {
                        collection.ensureIndex (field, function (err) {
                            if (err) {
                                log.error ('Failed to create index for ', id, JSON.stringify (field)) } }) })

                    if (collection.schema.mirrorProductionData) {
                        Db.mirrorProductionData (collection, id, next) }
                    else {
                        next () } }
                else {
                    log.error ('Failed to open DB collection', id, err, '(check whether the MongoDB instance is up and running at correct target path)')
                    next () } })) }),

            complete.partial (this).arity0) },

    /*  Once enabled at collections.js in a target collection definition,
        will copy data of that collection from remote server at startup.
        It is useful for local debugging of remote data-dependent glitchery.
     */
    mirrorProductionData: $static (function (collection, collectionName, complete) {
        log.info ('mirroring collection', collectionName)
        util.httpGet ({
            path: '/api/' + collectionName,
            host: serverConfig.serverName,
            port: 80,
            headers: {
                'Cookie': _.map ({
                        'email': serverConfig.mirrorProductionDataEmail,
                        'password': serverConfig.mirrorProductionPassword }, function (v, k) {
                            return [k,v].join ('=') }).join (';') },
            success: function (str) { var data = (_.json (str) || {}).value
                if (_.isArray (data) && data.length) {
                    collection.drop (function () {
                        _.each (data, function (item) {
                            try       { item._id = new mongo.ObjectID (item._id) } // this is crucial, otherwise they will be strings, ruining consistency
                            catch (e) {} })
                        collection.insert (data, function (e) {
                            if (!e) {
                                log.success ('mirrored', collectionName + ', fetched', data.length, 'entries') }
                            else {
                                log.error ('error mirroring', collectionName + ':', e) }
                            complete () }) }) }
                else {
                    log.warn (collectionName, 'has empty data')
                    complete () } },

            failure: log.error }) }),

    /* this is how you reference entries through mongodb queries
     */
    objectId: function (src) {
        return (typeof src == 'string' && src !== 'root') ? new mongo.ObjectID (src) : src },

    /* use this for generation of incremental IDs
     */
    incrementCounter: function (name, next) {
        this.counters.findAndModify ({ _id: name }, [], { $inc: { n: 1 } }, { upsert: true, 'new': true },
            function (err, entry) {
                next ((entry && entry.value) ? (entry.value.n || 0) : null) }) },

    counterValue: function (name, next) {
        this.counters.findOne ({ _id: name }, function (e, entry) {
            next ((entry && entry.value && entry.value.n) || 0) }) },

    setCounterValue: function (name, value, next) {
        this.counters.findAndModify ({ _id: name }, [], { $set: { n: value } }, { upsert: true, 'new': true },
            function (err, entry) {
                next ((entry && entry.value) ? (entry.value.n || 0) : null) }) },

    /*  A concurrency utility, similar to _.asyncJoin except that operates on
        methods of MongoDB collections [rather than on general JS functions],
        carrying their output to the compound 'then' handler.

            As a bonus, it generalizes Mongo's cluttered output format spec (NOT YET).
            And in case if you weren't aware: Mongo operation methods exploit
            about four (namely, THE FANTASTIC FOUR) distinct ways to carry
            their result through the API:

                collection.operation (..., function (e, result) {
                    log.info ('result is', result) })

                collection.operation (..., function (e, result) {
                    log.info ('result is', result.value) })

                collection.operation (..., function (e, result) {
                    log.info ('result is', result.ops[0]) })

                collection.operation (...).toArray (function (e, result) {
                    log.info ('result is', result) })

            Look at this. Now THAT'S creeped. Regarding to this, the shittest
            part of our code's crap could easily be considered as true temple
            of precise elaboration and conscious design. Did I mention that
            shit's rapidly changes from revision to revision, easily breaking
            the compatibility, while not even bothering with even a minor
            documentation on the issue?

            These issues were the reason for switching from the 1.x production
            version of Mongo's wrapper (taken from npm) to the 2.0 beta branch
            from developer's git repo, as somehow's it turned out to be more
            stable and consistent.


        Rationale: needed a way to asynchronously call a bunch of operations,
        joining their execution flow to a single 'complete' handler. And after
        'asynchronously' here we assume 'in parallel' (as opposed to 'sequental'),
        rather then 'non-blocking' [The latter simply cannot be the case, because
        you hardly can (and would) define a blocking operation in Node, so pretty
        much everything is nonblocking as the general behavior, carried through
        the Node architecture and its extensions]

        The tool was written originally to streamline the migration procedures
        which operate on tons of data, so that sequential evaluation was not
        acceptable due to poor performance. But later I found it's use rather
        reasonable even in simple application logic, to flatten some cumbersome
        sequential chains of MongoDB calls, as being the only naive way to
        derive the 'all ops complete' callback. And that frequently occuring
        chaining pattern suffers not only from creepy code formatting (having tons
        of semantically dull indentation levels), but also from the performance
        penalty (as operations not executed in parallel).

        To cut the shit, consider this (a simple case of use):

            db.users.remove ({ _id: id }, function (err, result) {
                db.users.remove ({ which: id }, function (err, result) {
                    then ()
                })
            })
            
            db.async ([
                ['users.remove', { _id: id }],
                ['history.remove', { which: id }]], then)


        TODO: show how it handles result
     */
    async: function (actions, then) {
        var results = {}
        _.mapReduce (_.pairs (actions), {
            next: _.$ (this, function (entry, i, next) {
                var resultField = entry[0]
                var dbAction = _.first (entry[1]).split ('.')
                var dbArguments = _.rest (entry[1])
                var collectionName = dbAction[0]
                var methodName = dbAction[1]
                var dbCallback = function (e, result) {
                    if (!e) {
                        results[resultField] = result }
                    next () }
                dbArguments.push (function (e, result) {
                    if (result && result.toArray) {
                        result.toArray (dbCallback) }
                    else {
                        dbCallback (e, result) } })
                this[collectionName][methodName].apply (this[collectionName], dbArguments) }),
            complete: function () {
                then (results) } }) },

    /* erases everything (preserving worktime, only needed in pre-release stage)
     */
    drop: function (complete) {
        this.worktime.find ().toArray (this.$ (function (e, worktime) {
            this.todos.find ().toArray (this.$ (function (e, todos) {
                this.db.dropDatabase (_.bind (this.openCollections, this, this.$ (function () {
                    _.asyncJoin ([
                        this.$ (function (done) { if (worktime.length) { this.worktime.insert (worktime, done) } else { done () } }),
                        this.$ (function (done) { if (todos.length) { this.todos.insert (todos, done) } else { done () } }) ],
                        complete) }))) })) })) } })

module.exports = {
    init: function (name, then) {
        return new Db (name, then) } }
