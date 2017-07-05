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

        //log.gg (this.constructor.$definition)

    /*  ...returned from api() methods (DEPRECATED)  */

        const routes = _.flat (
                            _.filter2 (this.constructor.$traits.reversed,
                                ({ $definition: { api = () => ({}) } }) => URIRouter.canonicalize (api && api.call (this))))

    /*  ...via member definitions (new way)    */

        // const mapMethods = (handler, fn) =>
        //                         _.isArray (handler)
        //                                 ? handler.map (fn)
        //                                 : (handler.get || handler.post)
        //                                         ? { get:  fn (handler.get),
        //                                             post: fn (handler.post) }
        //                                         : fn (handler)

        // const evaluate = interpreter ({ 'this': this })

        for (const k of _.keys (this.constructor.prototype)) {

            if (k[0] === '/') {

                // routes.push ([k, mapMethods (prototype[k], evaluate)])

                routes.push ([k === '/' ? '/' : k.slice (1), this[k]])
            }
        }

        this.apiSchema = URIRouter.validate (
                         URIRouter.collapse ( 
                         URIRouter.canonicalize (routes)))
    },

    defineAPIs (schemaPart) {
        return (this.apiSchema = URIRouter.collapse (this.apiSchema.concat (URIRouter.normalize (schemaPart)))) },

})



