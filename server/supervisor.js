var fs              = require ('fs'),
    path            = require ('path'),
   	process         = require ('process'),
    util            = require ('./base/util')

module.exports = Supervisor = $trait ({

	$depends: [require ('./args'),
			   require ('./require')],

	$defaults: $const ({ argKeys: { spawnedBySupervisor: 1,
										   noSupervisor: 1,
										   	 supervisor: 1 } }),

	currentProcessFileName: $property (function () { return process.argv[1] }),

	supervisorState: $memoized ($property (function () {
										   return _.find (
										   			_.keys (Supervisor.$defaults.argKeys),
										   			_.propertyOf (this.args)) || 'supervisor' })),

    beforeInit: function (then) {
    	this[this.supervisorState] (then) },

			    noSupervisor:        function (then) { then () },
			    spawnedBySupervisor: function (then) { log.e ('Running under supervisor'); then () },
			    supervisor:          function () 	 { log.w ('Spawning puppet process')

												    	this.require ('foreverMonitor', function () {

															this.supervisedProcess = new foreverMonitor.Monitor (this.currentProcessFileName, {
																    						max: 1,
																    						silent: false,
																    						watch: true,
																    						watchDirectory: process.cwd (),
																    						watchIgnorePatterns: [path.join (this.buildPath || process.cwd (), '*')],
																    						args: _.concat (this.args.all, ['spawned-by-supervisor']) })

															this.supervisedProcess.on('watch:restart', this.$ (function(info) {
																
															    log.e ('Restaring because', info, 'changed')
															}))

															this.supervisedProcess.on ('exit:code', this.$ (function (code) {
																log.w ('Exited with code', code)
																//this.supervisedProcess.start ()
															}))
															this.supervisedProcess.on ('started', this.$ (function () {
															}))

															this.supervisedProcess.start () })
												    },

    restart: function () 	 { log.e ('\nRestarting', log.line, '\n')
    	if (this.supervised) { process.exit (0) }
    					else { process.kill (this.supervisedProcess.childData.pid, 'SIGINT') }  },

    MonitorReady: $barrier (function () {
    							Monitor.start () }),

    watchFile: function (path, changed) {
			        this.require ('Monitor', function () {
			        	Monitor.FileProbe.watch (util.locateFile (path), {}, this.$ (changed)) }) }




})







