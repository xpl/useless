

_.tests.AOP = {

	'basics': function () { $assertCalls (1, function (createCalled) {
							$assertCalls (1, function (displayCalled) {
							$assertCalls (1, function (destroyCalled) {

		var Proto = $prototype ($test ({

			create:  function (_777) {  },
			display: function () {},
			destroy: function () { return 456 } }))

		$aspect (Proto, $test ({

			afterCreate:   function (_777) 			      { createCalled () },
			display:       function (_foo, _123, display) { displayCalled () },
			beforeDestroy: function () 					  { destroyCalled () } }))

		var demo = new Proto ()

		demo.create (777)
		demo.display ('foo', 123)
		demo.destroy () }) }) })
	}
};

(function () {

	var fnNameExpr = $r.expr ('how', $r.text ('before').or.text ('after')).expr ('name', $r.anything).$

	var tryBind = function (target, methodName, bind, boundMethod) {
		var method = target[methodName]
		if (method && _.isFunction (method)) {
			bind (target, methodName, boundMethod) } }

	_.defineKeyword ('aspect', function (ofWhat, cfg) {

        var aspectDef = Tags.unwrap (_.sequence (
			                $prototype.impl.extendWithTags,
			                $prototype.impl.flatten,
			                $prototype.impl.generateArgumentContractsIfTaggedAsTest,
			                $prototype.impl.contributeTraits,
			                $prototype.impl.expandAliases).call ($prototype.impl, cfg))

		var motherDef = ofWhat.constructor && ofWhat.constructor.$definition
		if (motherDef) {
				(motherDef.$aspects = motherDef.$aspects || []).push (aspectDef) }

		_.each (aspectDef, function (value, name) {
		
			if (aspectDef.hasOwnProperty (name) && _.isFunction (value)) {

				var parsed       = fnNameExpr.parse (name)
				var originalName = (parsed.name &&          parsed.name.decapitalized) || name
				var bindTool     = (parsed.how  && _['on' + parsed.how .capitalized])  || _.intercept

				if (bindTool) {

					tryBind (ofWhat,           originalName, bindTool, value)
					tryBind (ofWhat.prototype, originalName, bindTool, value) } } })

		if (ofWhat.aspectAdded) {
			ofWhat.aspectAdded (aspectDef) }

		return aspectDef })

}) ()