var util = require ('./base/util')

module.exports = $trait ({

	$defaults: {
		optionNames: { 'example-option': 1 } },

	argsReady: $barrier (),

    beforeInit: function (then) {
    	this.argsReady (this.args = util.parseCommandLineOptions (_.keys (this.optionNames)))
    	then () } })