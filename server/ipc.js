"use strict";

const _  = require ('underscore')

Meta.globalTag ('callableFromMasterProcess')

module.exports = $trait ({

    beforeInit () {

            var lastId = 1

        /*  Setup send  */

            if (this.supervisorState === 'supervisor') {
                this.mapMethods ((fn, name, def) => {
                    
                    if ($callableFromMasterProcess.is (def)) {

                        return (...args) => {
                            
                            return new Promise (resolve => {

                                if (this.supervisedProcess.child && this.supervisedProcess.child.connected) {

                                    var id = lastId++,
                                        waitForReturnValue = msg => {
                                            if (msg.id === id) { 
                                                this.supervisedProcess.child.removeListener ('message', waitForReturnValue)
                                                resolve (msg.returnValue) } }

                                    this.supervisedProcess.child.setMaxListeners (100)
                                    this.supervisedProcess.child.on ('message', waitForReturnValue)
                                    this.supervisedProcess.child.send ({
                                        id: id,
                                        methodName: name,
                                        methodArgs: args }) }

                                else {
                                    
                                    resolve (fn.apply (null, args))
                                }
                            })
                        }
                    }
                })
            }

        /*  Setup receive   */

            process.on ('message', msg => {
                if (msg.methodName) {
                    __.then (this[msg.methodName].apply (this, msg.methodArgs), returnValue => {
                        process.send (_.extended (msg, { returnValue: returnValue })) }) } }) }
})