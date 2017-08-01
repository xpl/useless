module.exports = $trait ({

    $depends: [require ('./ipc')],

    $defaults: {
        config: {
            noStdin: false
        }
    },

/*  Implement this in traits:       */

    lineFromStdin (line) {

        /* return true */       // return "true" to stop evaluaing 'lineFromStdin' methods defined in traits
    },


/*  Impl    */

    _lineFromStdin: $callableFromMasterProcess (function (line) {

        this.methodChain ('lineFromStdin', { reverse: true, until: returnValue => returnValue === true }) (line)
    }),

    beforeInit () {

        if (!this.isSupervisedProcess && !this.config.noStdin) {

            log.minor ('Initializing command line interface...')

            require ('readline').createInterface ({

                input: process.stdin,
                output: process.stdout,
                terminal: false

            }).on ('line', line => { this._lineFromStdin (line) })
        }
    }
})