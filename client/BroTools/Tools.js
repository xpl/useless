BroTune = Bro.Tool ({

    name:  $static ('tune'),
    Entry: $static ({

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


BroButton = Bro.Tool ({
    name: $static ('btn'),
    Entry: $static ({

        click: $trigger (),

        configure: function (click) {
            this.click (click) },

        widget: function (container) {
            container.click (this.click) },

        printValue: $memoized (function () {
            return escodegen.generate (this.expr.arguments[0])
        })
    }),
})

BroPrint = Bro.Tool ({
    name: $static ('print'),
    Entry: $static ({
        widget: function () {
            return undefined },
    }),
})

BroProp = Bro.Tool ({

    name:  $static ('prop'),
    stub:  $static (function (obj, prop, v) { obj[prop] = v }),
    Entry: $static ({

        configure: function (obj, prop, v) {
            obj[prop] = v
            obj[prop + 'Change'] (this.$ (function (v) {
                this.commitValueChange (v) })) },

        printValue: function () {
            return 'new Vec2 (' + this.value.x.toFixed (3) + ', ' + this.value.y.toFixed (3) + ')' },

        updatedExpr: function () { var newVec2 = this.expr.arguments[2].arguments
            newVec2[0] = this.numberExpr (this.value.x)
            newVec2[1] = this.numberExpr (this.value.y)
            return this.expr },

        call: function (x) {
            return this.value },

        widget: function () {
            return undefined }
    }),

    valueFromArguments: function (obj, prop, v) { return v } })



