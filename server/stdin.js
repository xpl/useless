module.exports = $trait ({

    $depends: [require ('./ipc')],

/*  Bind to this    */

    lineFromStdin: $trigger (line => {}),

/*  Impl    */

    beforeInit () {

        if (!this.isSupervisedProcess) {

            log.minor ('Initializing command line interface...')

            require ('readline').createInterface ({

                input: process.stdin,
                output: process.stdout,
                terminal: false

            }).on ('line', line => { this._lineFromStdin (line) })
        }
    },

    // TODO: implement ability to do $callableFromMasterProcess ($trigger (...)), to get rid of this shim
    
    _lineFromStdin: $callableFromMasterProcess (function (line) {

        this.lineFromStdin (line)
    })
})