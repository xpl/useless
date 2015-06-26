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

	valueFromArguments: function (x) { return x },
})