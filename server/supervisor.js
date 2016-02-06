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

    currentProcessFileName: $property (function () { return process.argv[1] }),

    supervisorState: $memoized ($property (function () {
                                           return _.find (
                                                    _.keys (Supervisor.$defaults.argKeys),
                                                    _.propertyOf (this.args)) || 'supervisor' })),

    beforeInit: function (then) {
        this[this.supervisorState] (then) },

    noSupervisor:               _.cps.identity,
    spawnedBySupervisor:        _.cps.identity,
    respawnedBecauseCodeChange: _.cps.identity,

    sourceChanged: $trigger (function (stat, file) {

        log.e ('\nRestarting because ', log.color.bloody, file, log.color.red, ' changed\n')

        if (!this.supervisedProcess.args.contains ('respawned-because-code-change')) {
             this.supervisedProcess.args.push     ('respawned-because-code-change') }

        this.supervisedProcess.restart () }),

    onSourceChange: function (stat, file) {

        if ((stat !== 'add') && (stat !== 'addDir')) {

            if (!(file.contains (this.buildPath) ||
                 (file.contains (path.join (process.cwd (), './node_modules') &&
                 !file.contains ($uselessPath) &&
                 !file.contains (path.join ($uselessPath, './node_modules')))))) {

                 this.sourceChanged (stat, file) } } },

    spawnSupervisedProcess: function () { log.gg ('Spawning supervised process')

        this.require ('foreverMonitor', function () {

            this.supervisedProcess = new foreverMonitor.Monitor (this.currentProcessFileName, {
                                            max: 0,                                                                     
                                            args: _.concat (this.args.all, ['spawned-by-supervisor']) })

            this.supervisedProcess.on ('exit:code', this.$ (function (code) {
                log.brown ('Exited with code', code)
                log.w ('Waiting for file change (or press Ctrl-C to exit)....')
                this.supervisedProcess.stop () /* prevents Forever from restarting it */ }))

            this.supervisedProcess.start () }) },

    supervisor: function () {
            this.watchDirectory (process.cwd (), this.onSourceChange, this.spawnSupervisedProcess) },

    restart: function ()     { log.e ('\nRestarting', log.line, '\n')
        if (this.supervised) { process.exit (0) }
                        else { this.supervisedProcess.restart () }  },

    MonitorReady: $barrier (function () {
                                Monitor.start () }),

    watchDirectory: function (path, changed, then) {
                        this.require ('chokidar', function () {

                            log.pink ('Watching:', path)

                            chokidar.watch (path, {}).on ('all', function (stat, f) { changed (stat, fs.realpathSync (f)) })

                            if (then)
                                then () }) }

})







