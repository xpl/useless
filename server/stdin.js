module.exports = $trait ({

/*  Bind to this    */

    lineFromStdin: $trigger (line => {}),

/*  Impl    */

    beforeInit () {

        log.minor ('Initializing command line interface...')

        require ('readline').createInterface ({

            input: process.stdin,
            output: process.stdout,
            terminal: false

        }).on ('line', this.lineFromStdin)
    }
})