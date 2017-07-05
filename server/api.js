 "use strict";

const _ = require ('underscore')
const URIRouter = $global.APISchema /* legacy name */ = require ('./base/uri-router')

module.exports = $trait ({

    lineFromStdin (line) {

        if (line === 'routes') {

            URIRouter.prettyPrint (this.apiSchema); return true
        }
    },

    beforeInit () {

        log.info ('Collecting HTTP route handlers', `(type ${'routes'.bright.yellow} to show schema)`.bright.cyan)

    /*  ...returned from api() methods (DEPRECATED)  */

        const routes = _.flat (
                            _.filter2 (this.constructor.$traits.reversed,
                                ({ $definition: { api = () => ({}) } }) => URIRouter.canonicalize (api && api.call (this))))

    /*  ...via member definitions (new way)    */

        // const evaluate = interpreter ({ 'this': this })

        for (const k of _.keys (this.constructor.prototype)) {

            if (k[0] === '/') {

                const handlers = this[k]

                routes.push ([k === '/' ? '/' : k.slice (1), _.map2 (handlers, m => m.bind (this))])
            }
        }

        this.apiSchema = URIRouter.validate (
                         URIRouter.collapse ( 
                         URIRouter.canonicalize (routes)))
    },

    defineAPIs (schemaPart) {
        return (this.apiSchema = URIRouter.collapse (this.apiSchema.concat (URIRouter.normalize (schemaPart)))) },

})



