module.exports = $trait ({

    $depends: [require ('./stdin')],

    beforeInit () {

        log.ii ('REPL mode ready')
    },

    lineFromStdin (line) {

        if (line) {

            try {

                eval (`Promise.resolve (${line}).then (x => { log.pp (x); log.margin () }).catch (e => { log.margin (); log.ee (e) })`)
            
            } catch (e) {

                log.margin ()
                log.ee (e)
            }
            
            return true
        }
    }
})