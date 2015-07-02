module.exports = $trait ({

    beforeInit: function (then) {
        require ('../db').init (this.dbName, this.$ (function (db) {
                                                        this.db = db
                                                        then () })) },


    /*  Defines common CRUD API for collections (for use in URL schema definition)
     */
    collectionAPI: function (name, cfg_) { var cfg = cfg_ || {}

        var api = [
            ['',    { post: cfg.create || this.adminAccess (this.jsonInput (this.newEntity (name))),
                      get:  cfg.read   || this.adminAccess (this.allEntities (name)) }],
            ['query/@query', cfg.query || this.adminAccess (this.queryEntities (name))] ]

        var itemAPI = [
            [':id/',        { get:  cfg.readItem,
                              post: cfg.update || this.adminAccess (this.jsonInput (this.updateEntity (name, cfg.updated))) }],
            [':id/delete',  { post: cfg.del    || this.adminAccess (this.jsonInput (this.deleteEntity (name, cfg.deleted))) }] ]

        return [name, api
            .concat (APISchema.canonicalize (cfg.methods))
            .concat (itemAPI)
            .concat (APISchema.canonicalize ({ ':id': cfg.itemMethods }))] },


    /*  Below are chainable request processing primitives for generic database
        manipulation. They're subject to change, and none of them should be
        considered as stable and reasonable. They served a limited purpose to
        define internal API on data operations, not bothering with any possible
        application beyond that. So that specific behaviors they exhibit should
        be considered when designing a layer of security constraints.

        E.g. a short-circuiting in things resolution, yet being a convenient
        utility at server's internals, should be reviewed for a potential of
        malicious use.

        There also gonna be DB manipulation methods that would allow direct
        configuration of underlying query mechanisms, and thats definitely
        a danger if to be used directly in restricted environments. Even current
        semantics of modifyEntity allows to configure update operators directly,
        and that's seems incompatible with previous _.secureUserProfileChanges
        implementation, and should be revised.
     */


    /*  A generic method for collection querying (context.env.query should be set to query object)
     */
    queryEntities: function (kind) { return function (context) {
        log.info ('Querying', kind, 'with', context.env.query)
        this.db[kind].find (this.db[kind].convertObjectIds (context.env.query), { sort: [['when', 'desc']] })
            .toArray (function (e, items) {
                context.jsonSuccess (items) }) } },


    /*  Outputs a whole collection as result
     */
    allEntities: function (kind) { return this.$ (function (context) {
        this.db[kind].find ().toArray (function (e, items) {
            context.jsonSuccess (items) }) })},


    /*  A macro over the most frequent use of findEntity, looks by _id, as specified in context.env.id
     */
    findEntityById: function (kind, then) {
        return this.findEntity (kind, this.$ (function (context) {
            return { _id: this.db.objectId (context.env.id) }}), then) },


    /*  Encapsulates a frequent pattern of requiring a single specific entity to be
        found in target collection, as specified by matching criteria.

    -   Requiring means that an error gets thrown, if no matching entity found, and that
        translates to context.jsonFailure call, abandoning any further execution of handling
        chain (provided as optional 'then' argument).

    -   Criteria can be specified as in either of the following examples:
            
            findEntity ('users', 'email')                   // matches user.email to context.env.email
            findEntity ('messages', function (context) {    // custom criteria predicate
                return { messageId: context.env.id }}) 

    -   Writes found entity to context.env.entity

    -   Exhibits short-circuiting behavior: immediately skips to next handler in chain,
        if context.env.entity already specified. Thus allowing to spoof findEntity
        behavior for some legal applications

     */
    findEntity: function (kind, criteria_, then) { return this.$ (function (context) {
        
        if (context.env.entity) {
            then.call (this, context) } // already obtained → short circuit

        else {
            var criteria = _.nonempty (_.isFunction (criteria_) ?
                criteria_.call (this, context) :
                _.object ([[criteria_, context.env[criteria_]]]))

            if (_.isEmpty (criteria)) {
                context.jsonFailure ('Не указан критерий выборки ' + Collections[kind].names[1]) }

            else { this.db[kind].findOne (criteria, this.$ (function (err, entity) {
                if (entity) {
                    context.env.entity = entity
                    then.call (this, context) }

                else {
                    context.jsonFailure (Collections[kind].names[0].capitalized + ' ' + context.env.id + ' не существует') } })) } } } )},


    /*  Adds new entity to target collection (should be passed as env.changes, to maintain consistency
        across partial cases of modifyEntity).
     */
    newEntity: function (kind, then) {
        return this.modifyEntity (kind, {
            what: 'add',
            desc: 'создать',
            dbAction: function (cfg) {
                this.db[kind].insert (
                    _.extend ({ created: Date.now () }, cfg.changes),
                    function (err, what) {
                        cfg.then (err, what.ops[0]) }) }}, then) },

    /*  Updates an entity in target collection, as specified by context.env.id parameter
     */
    updateEntity: function (kind, then) {
        
        return this.findEntityById (kind, this.modifyEntity (kind, {
            what: 'update',
            desc: 'изменить',
            dbAction: function (cfg) {
                var changes = DAL.prepareMongoUpdateChanges (cfg.changes, cfg.entity)

                if (!_.isEmpty (changes)) {
                    log.warn ('modifying', cfg.entityId.toString (), 'with', changes)

                    this.db[kind].findOneAndUpdate (
                        /* query */ { _id: cfg.entityId },
                        /* update */ changes,
                        /* options */ { upsert: false, returnOriginal: false },
                        /* callback */ function (e, result) {
                            cfg.then (e, result && result.value, changes) }) } } }, then)) },

    deleteEntity: function (kind, then) {
        return this.findEntityById (kind, this.modifyEntity (kind, {
            what: 'delete',
            desc: 'удалить',
            dbAction: function (cfg) {
                this.db[kind].remove ({ _id: cfg.entityId }, cfg.then.arity1) } }, then)) },

    /* Core data manipulation primitive. Do not call directly, use (defined above)
       newEntity/updateEntity/deleteEntity abstractions.

       DISCLAIMER: all following is temporary
     */
    modifyEntity: function (kind, cfg, then) { return this.$ (function (context) {

        var changes = context.env.changes || cfg.changes
        var entity = context.env.entity
        var isComment = changes && changes.comment
        if (isComment) {
            changes.commented = context.env.when } // last comment date

        cfg.dbAction.call (this, {
            entity: entity,
            entityId: entity && entity._id,
            changes: _.extend (context.env.supressMarkAsModified ? {} : { modified: context.env.when }, changes || entity),
            then: this.$ (function (err, newEntity, evaluatedChanges) {

                if (err) {
                    // e.g. Невозможно изменить пользователя такого-то: причина
                    context.jsonFailure ('Невозможно ' + cfg.desc + ' ' + Collections[kind].names[1] + ' ' + context.env.id + ': ' + err) }
                
                else { var resultEntity = (newEntity || entity)

                    if (!resultEntity || !resultEntity._id) {
                        context.jsonFailure ('modifyEntity: не указан id (или MongoDB опять наебнулся)') }

                    else { 
                        var history = _.nonempty (_.extend ({
                            who: context.env.who._id,
                            whoName: Collections.users.text (context.env.who),
                            target: kind,
                            what: isComment ? 'comment' : cfg.what,
                            which: resultEntity._id,
                            whichName: Collections[kind].text (resultEntity),
                            changes: cfg.what == 'add' ? newEntity : (evaluatedChanges || changes),
                            supressHistoryWrite: resultEntity.supressHistoryWrite,
                            was: cfg.what == 'delete' ? entity : undefined },
                            _.pick (context.env,
                                'metadata',                 // deprecated stuff for photos
                                'nonce',                    // 'nonce' is uniq. id of client session
                                'when',                     // one can override 'when'
                                'supressPeerNotify',        // supresses notifying of peers via WebSocket
                                'supressHistoryWrite',      // supresses updating of 'history' collection
                                'supressMarkAsModified')))  // supresses updating of 'modified' field

                        this.writeHistory (history, function () {
                            if (then) {
                                then.call (this, context, resultEntity, history, function () {
                                    context.jsonSuccess (history) }) }
                            else {
                                context.jsonSuccess (history) } }) } } })}) }) }

})

