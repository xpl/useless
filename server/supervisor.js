var fs              = require ('fs'),
    path            = require ('path'),
   	process         = require ('process'),
    util            = require ('./base/util')

module.exports = $trait ({

	$defaults: {
		optionNames: { 'supervised': 1, 'no-supervisor': 1 } },

	isSupervisor: $property (function () {
		return !this.args.options['no-supervisor'] && !this.args.options.supervised }),

    beforeInit: function (then) {
    	if (this.args.options['no-supervisor']) { then () }
    	else {
    		this.require (['monitor', 'child_process'], function () { 
		    	if (this.args.options.supervised) {
		    		this.supervised = true
		    		log.e ('Running as supervised instance...')
		    		then () }
		    	else {
			    	this.require (['forever-monitor'], function () { this.monitor.start ()
			    													 this.ForeverMonitor = this['forever-monitor'].Monitor
			    													 this.runSupervised (this.$ (function () {
			    													 	this.watchFilesystemChanges () })) }) } }) } },

    runSupervised: function (then) { log.w ('Starting supervised child process...')

		this.supervisedProcess = new (this.ForeverMonitor) (this.currentProcessFileName, {
			    						max: 1,
			    						silent: false,
			    						watch: true,
			    						watchDirectory: process.cwd (),
			    						watchIgnorePatterns: [path.join (this.buildPath, '*')],
			    						args: _.concat (this.args.all, ['supervised']) })

		this.supervisedProcess.on('watch:restart', this.$ (function(info) {
			
		    log.e ('Restaring because', info, 'changed')
		}))

		this.supervisedProcess.on ('started', this.$ (function () {
			then ()
		}))
		this.supervisedProcess.on ('exit:code', this.$ (function (code) {
			log.w ('Exited with code', code)
			//this.supervisedProcess.start ()
		}))
		this.supervisedProcess.start ()
    },

	require: function (names, then) {
		util.require (names, this.$ (function (modules) {
			_.each (_.asArray (arguments), this.$ (function (module, i) { this[names[i]] = module }))
			this.$ (then) () }) )},

	exec: function (what, fn) {
		this.child_process.exec (what, this.$ (fn)) },

	currentProcessFileName: $property (function () { return process.argv[1] }),

    restart: function () { log.e ('\nRestarting', log.line, '\n')

    	if (this.supervised) {
    		process.exit (0) }
    	else {
    		process.kill (this.supervisedProcess.childData.pid, 'SIGINT') }  },

    watchFile: function (path, changed) { log.ok ('Watching', path)
			        this.monitor.FileProbe.watch (util.locateFile (path), {}, this.$ (changed)) }





})