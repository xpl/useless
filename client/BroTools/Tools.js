BroTune = Bro.Tool ({

    name:  $const ('tune'),
    Entry: $const ({

    	$requires: {
   			value: 'number',
            where: 'object' },

    	$defaults: {
    		min: -10,
    		max:  10 },

    	configure: function (v, cfg) {
    		_.extend (this, cfg) },

        printValue: function () {
            return this.value.toFixed (3) },

        call: function (x) {
        	return this.value },

        widget: function () {

        	this.slidah = new Sliddah ({
        		min: this.min,
        		max: this.max,
        		value: this.value })

        	this.slidah.valueChange (this.commitValueChange)

        	return this.slidah.dom }
    }),

	valueFromArguments: function (x) { return x } })


BroProp = Bro.Tool ({

    name:  $const ('prop'),
    Entry: $const ({

        $defaults: {
            min: -10,
            max:  10 },

        configure: function (obj, prop, v) {
            obj[prop] = v
            obj[prop + 'Change'] (this.$ (function (v) {
                this.commitValueChange (v) })) },

        parseArguments: function (args) {
            return _.rest (args.match (/(.+),\s*(.+),\s*(.*\(.*\).*)/)) },

        printValue: function () {
            return 'new Vec2 (' + this.value.x.toFixed (3) + ', ' + this.value.y.toFixed (3) + ')' },

        call: function (x) {
            return this.value },

        printArguments: function () {
            console.log (this)
            this.arguments[2] = this.printValue ()
            return this.arguments.join (', ') },

        widget: function () {

            return undefined }
    }),

    valueFromArguments: function (obj, prop, v) { return v } })



