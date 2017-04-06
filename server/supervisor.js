"use strict";

const _  = require ('underscore')

const fs              = require ('fs'),
      path            = require ('path'),
      process         = require ('process'),
      chokidar        = require ('chokidar'),
      foreverMonitor  = require ('forever-monitor'),
      util            = require ('./base/util')

/*  Supresses $callAtMasterProcess-marked methods from calling at supervised process (usually it's beforeInit method)   */

Meta.globalTag ('callAtMasterProcess', (tag, x) =>
                                            Meta.setTag (tag, true,
                                                Meta.modify (x, beforeInitMethod =>
                                                                    function (...args) {
                                                                        return this.isSupervisedProcess
                                                                                    ? undefined
                                                                                    : beforeInitMethod.call (this, ...args) })))

const Supervisor = module.exports = $trait ({

    $depends: [require ('./args'),
               require ('./ipc')],

    $defaults: $const ({ argKeys: { respawnedBecauseCodeChange: 1,
                                           spawnedBySupervisor: 1,
                                                  noSupervisor: 1,
                                                    supervisor: 1 } }),

    currentProcessFileName: $memoized ($property (function () {
                                                        var file = process.argv[1]
                                                        return file && ((path.extname (file) && file) || (file + '.js')) })),

    supervisorState: $memoized ($property (function () { return _.find (
                                                            _.keys (Supervisor.$defaults.argKeys),
                                                            _.propertyOf (this.args)) || 'supervisor' })),

    beforeInit () {

        /*  Call .beforeInit() methods marked with $callAtMasterProcess   */

            if (this.isSupervisorProcess) {

                _.each (this.constructor.$traits, Trait => {
                    if ($callAtMasterProcess.is (Trait.$definition.beforeInit)) {
                        Trait.prototype.beforeInit.call (this)
                    }
                })
            }

        /*  Dispatch further init based on current state (see below)   */

            return this[this.supervisorState] ()
    },

/*  One of these gets called at beforeInit ()   */

    respawnedBecauseCodeChange () {},
           spawnedBySupervisor () {},
                  noSupervisor () {},
                    supervisor () {
                                    if (this.currentProcessFileName) {
                                        this.watchDirectory (process.cwd (), this.onSourceChange)
                                        this.spawnSupervisedProcess ()
                                        return __.eternity
                                    }
                                },

    get isSupervisorProcess () {
        return this.supervisorState === 'supervisor'
    },

    get isSupervisedProcess () {
        return (this.supervisorState === 'spawnedBySupervisor') ||
               (this.supervisorState === 'respawnedBecauseCodeChange')
    },

/*  Other traits can vote via subscribing to this trigger   */

    shouldRestartOnSourceChange: $trigger (function (action, file, yes, no) {

                                    if (file in require.cache) {
                                        yes ()
                                    }
                                }),

    voteForRestartOnSourceChange: $callableFromMasterProcess (function (action, file) {

                                    var yes = false
                                    var no  = false

                                    this.shouldRestartOnSourceChange (action, file, // ask traits
                                        () => { yes = true },
                                        () => { no  = true })

                                    return (yes && !no) }),

    onSourceChange: function (action, file) {

                        __.then (this.voteForRestartOnSourceChange (action, file), yes => {

                            if (yes && !this.supervisedProcess.isRestarting) {

                                log.e ('\nRestarting because ', log.color.boldRed, file, log.color.red, ' changed\n')

                                if (!this.supervisedProcess.args.contains ('respawned-because-code-change')) {
                                     this.supervisedProcess.args.push     ('respawned-because-code-change') }

                                this.supervisedProcess.restart () } }) },

    spawnSupervisedProcess: function () {

                                if (this.currentProcessFileName) {

                                    log.gg ('Spawning supervised process')

                                    let supervisedProcess =
                                        this.supervisedProcess = new foreverMonitor.Monitor (this.currentProcessFileName, {
                                                                    max: 0,
                                                                    fork: true, // for IPC to work
                                                                    args: _.concat (this.args.all, ['spawned-by-supervisor']
                                                                                                        .concat (this.testsFailed ?
                                                                                                            'tests-failed' : [])) })

                                    supervisedProcess.on ('exit:code', code => {
                                        log.brown ('Exited with code', code)
                                        log.w ('Waiting for file change (or press Ctrl-C to exit)....\n')
                                        supervisedProcess.stop () /* prevents Forever from restarting it */ })

                                    _.intercept (supervisedProcess, 'restart', function (restart) {
                                        
                                        if (!supervisedProcess.isRestarting) {
                                            supervisedProcess.isRestarting = true
                                            restart.call (this)
                                        }
                                    })

                                    supervisedProcess.on ('restart', () => {
                                        supervisedProcess.isRestarting = false
                                    })

                                    supervisedProcess.start ()
                                }
                            },

    restart: function () { log.e ('\nRestarting', log.line, '\n')
                
                if (this.supervised) { process.exit (0) }
                                else { this.supervisedProcess.restart () }  },

    watchDirectory: function (path, changed) { log.pink ('Watching:', path)

                        chokidar.watch (path, { ignoreInitial: true })
                                .on ('all', (stat, f) => { changed (stat, fs.realpathSync.catches (f) (f)) }) },

    

})







