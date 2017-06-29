module.exports = $trait ({

    $depends: [require ('./stdin')],

    beforeInit () {

        log.ii ('REPL mode ready')
    },

    async lineFromStdin (line) {

        if (line) {

            try {

                eval (`__.then (${line}, result => { log (result); log.margin () })`)
            }
            catch (e) {

                log.margin ()
                log.ee (e)
            }

            return true
        }
    }
})