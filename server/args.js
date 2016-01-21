var util = require ('./base/util')

/*	======================================================================== */

module.exports = CommandLineArguments = $trait ({

	$defaults: {
		argKeys: { /* 'example-option': 1 */ },
		args:    { values: [],
				   all:    [] } },

	argsReady: $barrier (),

    beforeInit: function (then) {
    	this.argsReady (this.args = this.parseProcessArgs (_.keys (this.argKeys)))
    	then () },

    $private: {
	    parseProcessArgs: function (proposedKeys) {
	        var arguments     = _.rest (process.argv, 2)
	        var incomingKeys  = _.intersection (arguments, _.map (proposedKeys, _.camelCaseToDashes))
	        var keysCamelCase = 						   _.map (incomingKeys, _.dashesToCamelCase)
	        return _.extend (
	        		_.index (keysCamelCase), { keys: 			keysCamelCase,
	        								   keysDashed: 		incomingKeys,
	        								   all:      		arguments,
	            							   values: 		  _.without.apply (null, [arguments].concat (incomingKeys)) }) } } })

/*	======================================================================== */