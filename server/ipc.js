_.defineTagKeyword ('callableFromMasterProcess')

module.exports = $trait ({

    beforeInit: function () {

                    var lastId = 1

                /*  Setup send  */

                    if (this.supervisorState === 'supervisor') {
                        this.mapMethods ((fn, name, def) => {
                            if (def && def.$callableFromMasterProcess) {
                                return function () {
                                    return new Promise (resolve => {

                                                            if (this.supervisedProcess.child) {

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
                                                                    methodArgs: _.asArray (arguments) }) }

                                                            else {
                                                                log.w ('Trying to call a child process method when the child process is not started yet...') } }) } } }) }

                /*  Setup receive   */

                    process.on ('message', msg => {
                        if (msg.methodName) {
                            __.then (this[msg.methodName].apply (this, msg.methodArgs), returnValue => {
                                process.send (_.extended (msg, { returnValue: returnValue })) }) } }) }
})