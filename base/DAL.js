/*  Database Abstraction Layer (draft)

    Someday there will be cross-platform database access API, unifying
    client and server ways to access and modify data in our DB.
 */

_.tests.dal = {
    escape: function () {
        var id = { _bsontype: 'ObjectID', id: 'blabla' }
        var a  = { id: id, '$addToSet': { users: { '$each': [1,2] }}}
        var b  = { id: id, '€addToSet': { users: { '€each': [1,2] }}}

        $assert (DAL.escapeMongoOperators (a), b)
        $assert (DAL.unescapeMongoOperators (b), a)
        $assert (DAL.escapeMongoOperators (a).id === a.id) }, // BSON ids should not be traversed and escaped

    prepare: function () {
        var test    = { $keyword: 1, setMe: 2, removeMe: null }
        var result  = { $keyword: 1, $set: { setMe: 2 }, $unset: { removeMe: null } }

        $assert (DAL.prepareMongoUpdateChanges (test), result) },

    moveOperator: function () {
        $assert (
            DAL.evalMoveOperator ({ bars: [['a',0,1]] }, { bars: ['a','b'] }),
            { $set: { bars: ['b','a'] } })

        $assert (
            DAL.explainMoveOperator ({ bars: [['a',0,1], ['a',1,2]] }),
            { bars: [{ id: 'a', from: 0, to: 2 }] }) } }


DAL = {}


DAL.fieldTraitToTypeContract = function (field) { var trait = field.trait
    if (trait === 'id') {
        return function (id) { return _.isNonemptyString (id) && (id.length === 32) } }
    else if (trait === 'date') {
        return function (date) { return _.isNumber (date) && (date > -1733022000000) } }
    else if (trait === 'enum') {
        return function (value) { return _.isNonemptyString (value) && (!field.values || (value in field.values)) } }
    else {
        if (trait === 'cm' || trait === 'kg') {
            return 'number' }
        return trait } }

DAL.typeContractForCollection = function (collection) {
    return _.filter2 (collection.fields || {}, function (field) {
        if (field.type === 'array') {
            return field.trait ? [DAL.fieldTraitToTypeContract (field)] : [] }
        else if (field.type === 'object') {
            return field.trait ? DAL.fieldTraitToTypeContract (field) : 'object' }
        else {
            return field.trait ? DAL.fieldTraitToTypeContract (field) : field.type } }) }


// code behind all that .html/.text stuff

DAL.makeStringifierForCollectionField = function (field, html, htmlShort) {

    /*  check if overrides (htmlShort / html / string method specified)
     */
    if (htmlShort && field.htmlShort) {
        return field.htmlShort }
    if (html && field.html) {
        return field.html }
    if (html && field.text) {
        return function (x) { return _.escape (field.text (x)) } }
    if (field.text) {
        return field.text }

    /*  try match to known type & trait
     */
    switch (field.type) {

        case 'string': switch (field.trait) {

            case 'enum': var values = field.values

                if (htmlShort && field.asIcons) {
                    var iconCls = _.mapObject (values, _.property ('iconCls'))
                    return function (x) {
                                return '<span class="' + iconCls[x] + '"></span>' } }

                else { return function (x) {
                                var value = (values && values[x]) || x
                                return (value && value.name) || x } }

            case 'html':
                return function (html) {
                    return html.replace (/<[^>]*>/g, '').replace (/\s+/g, ' ').trimmed.escaped }

            default:
                return html ? _.escape : _.identity }

        case 'boolean':
            return Format.bool

        case 'number': switch (field.trait) {
            case 'date':
                return function (x) {
                    return x && (field.age ?
                        Format.ageFromTimestamp (x) :
                        (field.relativeTime === false ?
                            Format.dateFromTimestamp (new Date (x)) :
                            Format.relativeTime (new Date (x), { withAgoText: field.withAgoText !== false }))) }
            case 'cm':
                return Format.cm
            case 'kg':
                return Format.kg

            default:
                return _.identity }

        case 'array':
            return function (arr) {
                return (arr && arr.length && ('[' + arr.length + ']')) || 'пусто' }

        default:
            return _.constant ('???') } }


/*  mongo bongo
 */

DAL.isMongoObjectId = function (x) {
                        return x && (x._bsontype === 'ObjectID') }

if (Platform.NodeJS) { var mongo = require ('mongodb')
    DAL.coerceToObjectId = function (x) {
        return DAL.isMongoObjectId (x) ? x : new mongo.ObjectID (x) } }

DAL.replaceKeySign = function (a, b, object) {
                        return _.object (_.map (object,
                            function (value, key) { var traversable = _.isObject (value) && !_.isArray (value) && !DAL.isMongoObjectId (value)
                                return [
                                    (key[0] === a && (b + key.slice (1))) || key,
                                    (traversable && DAL.replaceKeySign (a, b, value)) || value] })) }

DAL.escapeMongoOperators    = DAL.replaceKeySign.partial ('$', '€')
DAL.unescapeMongoOperators  = DAL.replaceKeySign.partial ('€', '$')


DAL.evalMoveOperator = function (operatorValue, entity) {
                            return { $set: _.mapObject (operatorValue, function (moves, field) {
                                var array = _.clone (entity[field])
                                _.each (moves, function (action) { var from = action[1], to = action[2]
                                    var val = array[from]
                                    array.removeAt (from)
                                    array.insertAt (val, to) })
                                return array }) } }


DAL.explainMoveOperator = function (operatorValue) {
    return _.mapObject (operatorValue, function (moves) { var index = {}, result = []
        
        _.each (moves, function (packed) { var move = { id: packed[0], from: packed[1], to: packed[2] }
            if (move.id in index) {
                index[move.id].to = move.to }
            else {
                result.push (index[move.id] = move) } })

        return _.reject (result, function (move) { return move.from === move.to }) }) }


DAL.prepareMongoUpdateChanges = function (rawChanges, originalEntity) {

    /*  Interpret null-values as $unset, canonicalize $set
     */
    var changes = _.nonempty (_.extend2 (_.pick (rawChanges, _.keyIsKeyword), {
        $set: _.omit (rawChanges, _.isNull.or (_.keyIsKeyword)),
        $unset: _.pick (rawChanges, _.isNull.and (_.not (_.keyIsKeyword))) }))

    /*  Evaluate $move operator
     */
    changes = (changes.$move ?
        _.extend2 (_.omit (_.cloneDeep (changes), '$move'), DAL.evalMoveOperator (changes.$move, originalEntity)) : changes)

    /*  Omit not changed (actually) fields
     */
    if (changes.$set && originalEntity) { // omit 
        changes.$set = _.omit (changes.$set, function (value, field) {
            return _.isEqual (originalEntity[field], value) }) }

    return _.nonempty (changes) }


if (Platform.NodeJS) {
    module.exports = DAL }


