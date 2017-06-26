 "use strict";

const _  = require ('underscore')

const util    = require ('./base/util'),
      process = require ('process'),
      path    = require ('path'),
      fs      = require ('fs')

module.exports = $trait ({

    $depends: [require ('./args')],

    $defaults: {

        argKeys: {
            resetConfig: 1 },
        
        configPath:
            path.join (process.cwd (), '/config.json'),

        config: {
            logTimestamps: false } },

    /*  Configures 'supervisor' trait.
     */
    shouldRestartOnSourceChange (action, file, restart, supressRestart) {

        if (file.contains (this.configPath)) {

            const newConfig = this.totalConfig

            if (_.isEqual (newConfig, this.config)) {

                supressRestart ()

            } else {
                
                log.pp (_.diff (this.config, newConfig))

                this.config = newConfig

                restart ()
            }
        }
    },

    get totalConfig () {

        return _.extendedDeep (this.config, this.fileConfig, this.commandLineConfig)
    },

    get fileConfig () {

        return fs.existsSync (this.configPath) ? JSON.parse (fs.readFileSync (this.configPath, { encoding: 'utf-8' })) : {}
    },

    get commandLineConfig () {

        const cfg = {}

        for (const arg of this.args.values) {

            const [ , k, v] = arg.match (/^(.+)=(.+)$/)

            const path = k.split ('.')
            
            let cursor = cfg

            for (const nestedProp of _.initial (path)) {

                cursor = cursor[nestedProp] ||
                        (cursor[nestedProp] = {})
            }

            try {

                const [,str] = v.match (/^\"(.+)\"$/)

                cursor[_.last (path)] = str

            } catch (e) {

                cursor[_.last (path)] = _.isFinite (Number (v)) ? Number (v) :
                                            ((v === 'false') ? false :
                                            ((v === 'true') ? true : v))
            }
        }

        return cfg
    },

    saveConfig () {

        log.g ('Writing', this.configPath.bright)
        log.w (this.config)

        util.writeFile (this.configPath, String.ify.configure ({ pretty: true, json: true }) (this.config))
    },

    lineFromStdin (line) {

        if (line === 'saveConfig') this.saveConfig ()
    },

    beforeInit () {

        if (this.args.resetConfig) {

            log.e (`Removing ${'config.json'.bright}`)
            fs.unlinkSync (this.configPath)
        }

        this.config = this.totalConfig

        if (!fs.existsSync (this.configPath)) {

            this.saveConfig ()

        } else {

            const overrides = String.ify.noPretty (this.commandLineConfig)

            log.i (`Reading ${'config.json'.bright}` + (overrides === '{  }' ? '' : ` + ${overrides.bright.magenta}`))

            if (!this.args.spawnedBySupervisor) {

                log.p (this.config)
            }
        }

        if (this.config.logTimestamps) {
            log.timestampEnabled = this.config.logTimestamps
        }
    }
})



