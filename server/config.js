var util    = require ('./base/util'),
    process = require ('process'),
    path    = require ('path'),
    fs      = require ('fs')

module.exports = $trait ({

    $defaults: {
        configPath:
            path.join (process.cwd (), '/config.json'),

        config: {
            logTimestamps: false } },

    /*  Configures 'supervisor' trait.
     */
    shouldRestartOnSourceChange: function (action, file, yes, no) {

                                    if (file.contains (this.configPath)) {

                                        /*  If nothing changed actually, supress restart. This is needed because we
                                            over-write config at startup, and we don't want restart loops.
                                         */
                                        if (_.isEqual (this.readConfig (), this.config)) {
                                            no () }

                                        /*  Config changed: apply, report and restart.
                                         */
                                        else {
                                            this.applyConfig (this.readConfig ())
                                            log.pp (log.config ({ pretty: true }), this.config)
                                            yes () } } },

    readConfig: function () {
              try { return JSON.parse (fs.readFileSync (this.configPath, { encoding: 'utf-8' })) }
        catch (e) { return {} } },

    applyConfig: function (cfg) {
        _.extend (this.config, cfg)
        log.timestampEnabled = this.config.logTimestamps
        return this.config },

    beforeInit: function () {

                    /*  Re-write config at startup (with default values and pretty printed).
                     */
                    util.writeFile (this.configPath,
                        _.stringify (this.applyConfig (this.readConfig ()), {
                            pretty: true, json: true }))

                    /*  Supresses double-reporting when running under supervisor.
                     */
                    if (!this.args.spawnedBySupervisor) {
                        log.p (log.config ({ pretty: true }), this.config) } } })



