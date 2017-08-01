"use strict";

const _  = require ('underscore')

const fs              = require ('fs'),
      path            = require ('path'),
      process         = require ('process'),
      chokidar        = require ('chokidar'),
      foreverMonitor  = require ('forever-monitor'),
      util            = require ('./base/util'),
      log             = require ('ololog')

const CODE_RESTART = 3

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
               require ('./ipc'),
               require ('./stdin')],

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

        if (this.isSupervisorProcess) {

        /*  Call .beforeInit() methods marked with $callAtMasterProcess   */

            _.each (this.constructor.$traits, Trait => {
                if ($callAtMasterProcess.is (Trait.$definition.beforeInit)) {
                    Trait.prototype.beforeInit.call (this)
                }
            })

        /*  Terminate child process when master process exits   */

            process.on ('SIGINT', () => {
                if (!this.receivedSIGINT) {
                    this.receivedSIGINT = true
                    this.supervisedProcess.stop ()
                    _.delay (() => process.exit (0))
                }
            })
        }

    /*  Dispatch further init based on current state (see below)   */

        return this[this.supervisorState] ()
    },

    lineFromStdin (line) {

        if (line === 'restart' ||
            line === 'r') {

            this.restart ()
            return true
        }
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

                                log.red ('\nRestarting because', file.bright, 'changed\n')

                                if (!this.supervisedProcess.args.contains ('respawned-because-code-change')) {
                                     this.supervisedProcess.args.push     ('respawned-because-code-change') }

                                this.supervisedProcess.restart () } }) },

    spawnSupervisedProcess: function () {

                                if (this.currentProcessFileName) {

                                    log (ansi.bright.green ('Spawning supervised process') +
                                         ansi.bright.yellow (' (type ' + 'r'.red + ' to restart)'))

                                    let supervisedProcess =
                                        this.supervisedProcess = new foreverMonitor.Monitor (this.currentProcessFileName, {
                                                                    max: 0,
                                                                    fork: true, // for IPC to work
                                                                    args: _.concat (this.args.all, ['spawned-by-supervisor']
                                                                                                        .concat (this.testsFailed ?
                                                                                                            'tests-failed' : [])) })

                                    supervisedProcess.on ('exit:code', code => {

                                        log.dim.yellow ('Exited with code', code)

                                        if (!this.receivedSIGINT) {

                                            if (code !== CODE_RESTART) {

                                                log.yellow (`Waiting for file change (or press ${'Ctrl-C'.bright} to exit)....\n`)
                                                supervisedProcess.stop () /* prevents Forever from restarting it */ 
                                                
                                            } else {
                                                
                                                supervisedProcess.restart ()
                                            }
                                        }
                                    })

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

    restart () {

        if (this.isSupervisedProcess) {

            log.red ('\Restarting (from child process)', log.line, '\n')
            process.exit (CODE_RESTART)

        } else {

            log.red ('\Restarting (from master process)', log.line, '\n')
            this.supervisedProcess.restart ()
        } 
    },

    watchDirectory: function (path, changed) { log.magenta ('Watching', path.bright)

                        chokidar.watch (path, { ignoreInitial: true })
                                .on ('all', (stat, f) => { changed (stat, fs.realpathSync.catches (f) (f)) }) },

    

})







