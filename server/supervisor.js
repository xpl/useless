var fs              = require ('fs'),
    path            = require ('path'),
    process         = require ('process'),
    util            = require ('./base/util')

module.exports = Supervisor = $trait ({

    $depends: [require ('./args'),
               require ('./require')],

    $defaults: $const ({ argKeys: { respawnedBecauseCodeChange: 1,
                                           spawnedBySupervisor: 1,
                                                  noSupervisor: 1,
                                                    supervisor: 1 } }),

    currentProcessFileName: $property (process.argv[1]),

    supervisorState: $memoized ($property (function () { return _.find (
                                                            _.keys (Supervisor.$defaults.argKeys),
                                                            _.propertyOf (this.args)) || 'supervisor' })),

    beforeInit: function (then) {
                    this[this.supervisorState] (then) },

    respawnedBecauseCodeChange: _.cps.identity,
           spawnedBySupervisor: _.cps.identity,
                  noSupervisor: _.cps.identity,
                    supervisor: function () {
                                    this.watchDirectory (process.cwd (), this.onSourceChange, this.spawnSupervisedProcess) },

    /*  Other traits can vote via subscribing to this trigger
     */
    shouldRestartOnSourceChange: $trigger (function (action, file, yes, no) {
                                    if ((action !== 'add') && (action !== 'addDir')) {
                                        if (!(file.contains (this.buildPath) ||
                                             (file.contains (path.join (process.cwd (), './node_modules') &&
                                             !file.contains ($uselessPath) &&
                                             !file.contains (path.join ($uselessPath, './node_modules')))))) { yes () } } }),

    onSourceChange: function (action, file) {

                        var yes = false
                        var no  = false

                        this.shouldRestartOnSourceChange (action, file,
                            () => { yes = true },
                            () => { no  = true })

                        if (yes && !no) {

                            log.e ('\nRestarting because ', log.color.boldRed, file, log.color.red, ' changed\n')

                                if (!this.supervisedProcess.args.contains ('respawned-because-code-change')) {
                                     this.supervisedProcess.args.push     ('respawned-because-code-change') }

                                this.supervisedProcess.restart () } },

    spawnSupervisedProcess: function () { log.gg ('Spawning supervised process')

                                this.require ('foreverMonitor', () => {

                                    this.supervisedProcess = new foreverMonitor.Monitor (this.currentProcessFileName, {
                                                                    max: 0,                                                                     
                                                                    args: _.concat (this.args.all, ['spawned-by-supervisor']) })

                                    this.supervisedProcess.on ('exit:code', code => {
                                        log.brown ('Exited with code', code)
                                        log.w ('Waiting for file change (or press Ctrl-C to exit)....\n')
                                        this.supervisedProcess.stop () /* prevents Forever from restarting it */ })

                                    this.supervisedProcess.start () }) },

    restart: function () {

                log.e ('\nRestarting', log.line, '\n')
                
                if (this.supervised) { process.exit (0) }
                                else { this.supervisedProcess.restart () }  },

    watchDirectory: function (path, changed, then) {

                        this.require ('chokidar', function () {

                            log.pink ('Watching:', path)

                            chokidar.watch (path, { ignoreInitial: true }).on ('all',
                                function (stat, f) { changed (stat, fs.realpathSync (f)) })
                            
                            if (then)
                                then () }) }

})







