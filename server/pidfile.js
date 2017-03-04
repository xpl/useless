"use strict";

const
    _       = require ('underscore'),
    fs      = require ('fs'),
    path    = require ('path'),
    process = require ('process')

module.exports = $trait ({

    $depends: [
        require ('./args')
    ],

    $defaults: {
        pidFile: path.resolve ('./' + path.parse (process.argv[1]).name + '.pid')
    },

    beforeInit () {

        if (!this.isSupervisedProcess) {

            log.ok ('Writing PID to', this.pidFile)

            fs.writeFileSync (this.pidFile, process.pid + '\n', { encoding: 'ascii' })

            process.on ('SIGINT', () => {
                log.e ('Removing PID', this.pidFile)
                try { fs.unlinkSync (this.pidFile) } catch (e) {}
                process.exit ()
            })
        }
    }
})