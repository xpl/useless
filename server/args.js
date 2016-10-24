 "use strict";

const _  = require ('underscore')
const util = require ('./base/util')

/*  ------------------------------------------------------------------------ */

module.exports = $trait ({

    $defaults: {
        argKeys: { /* 'example-option': 1 */ },
        args:    { values: [],
                   all:    [] } },

    argsReady: $barrier (),

    beforeInit () {
        this.argsReady (this.args = this.parseProcessArgs (_.keys (this.argKeys))) },

    $private: {
        parseProcessArgs (proposedKeys) {
            var args          = process.argv.slice (2)
            var incomingKeys  = _.intersection (args, _.map (proposedKeys, _.camelCaseToDashes))
            var keysCamelCase =                       _.map (incomingKeys, _.dashesToCamelCase)
            return _.extend (
                    _.index (keysCamelCase), { keys:            keysCamelCase,
                                               keysDashed:      incomingKeys,
                                               all:             args,
                                               values:        _.without.apply (null, [args].concat (incomingKeys)) }) } } })

/*  ------------------------------------------------------------------------ */