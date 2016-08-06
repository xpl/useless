/* 
    Aspects are units of behavior expressed in terms of ad-hoc
    patching of existing components' internals. They embody the
    powerful idea of a source code patches that are fully defined
    and maintained by sole terms of that source code itself, with
    no help of external tool to operate.

    To better understand why this is reasonable, here's overview
    of every stuff you can use to extend existing behavior of
    a component.

 1. Simply edit the original component, hardwiring desired behavior
    into it. And that's the actual way of how we manage things around,
    not surprisingly.

 2. Good old inheritance. Key difference is that inheritance produces
    new versions of a component. Instead, $aspect will change existing
    one - which is more often scenario.

 3. Traits. Comparing to inheritance, $trait looks similar to $aspect,
    but really they're opposite of each other. Here's why:

    Traits are reasonable when implementing new components. Being
    generic and abstract, $traits sum up inside of a component,
    producing it's final implementation, as seen by it's developer.

 4. Aspects do the exact opposite: they define and carry so-called
   "weak modifications", which are external / temporary / optional /
    situative by nature, as seen by the external user of a component.

    It's something you'd solve with plugins or extensions...
    if only you'd had enough time to pre-mind all possible scenarios
    of code customization. That's why $aspects here.

    They require none, and allow to drop complex pluggable
    architectures completely - to focus on _what_ we do, not how.
*/

_.tests.AOP = {

    'basics': function () {     var callLog = []

                                var Thing = $prototype ($testArguments ({

                                    create:            function (_777)              { callLog.push ([this, 'Thing.create']) },
                                    display:           function (_foobar, _778)     { callLog.push ([this, 'Thing.display']) },
                                    destroy:           function ()                  { callLog.push ([this, 'Thing.destroy']); return 456 } }))

                                var NewFlavorOfThing = $aspect (Thing, $testArguments ({

                                    beforeCreate:   function (_777)                        { callLog.push ([this, 'NewFlavorOfThing.beforeCreate']) },

                                    display:        function (_foo, _123, originalMethod)  { callLog.push ([this, 'NewFlavorOfThing.display']);
                                                                                             return originalMethod.call (this, _foo + 'bar', 778) },

                                    afterDestroy:   function (_456)                        { callLog.push ([this, 'NewFlavorOfThing.afterDestroy']) } }))

                                var demo = new Thing ()

                                demo.create   (777)
                                demo.display  ('foo', 123)
                                demo.destroy  ()

                                $assert (callLog, [[demo, 'NewFlavorOfThing.beforeCreate'],
                                                   [demo,            'Thing.create'      ],
                                                   [demo, 'NewFlavorOfThing.display'     ],
                                                   [demo,            'Thing.display'     ],
                                                   [demo,            'Thing.destroy'     ],
                                                   [demo, 'NewFlavorOfThing.afterDestroy']]) } };


(function () {

    var fnNameExpr = $r.expr ('how', $r.text ('before').or.text ('after')).expr ('name', $r.anything).$

    var tryBind = function (target, methodName, bind, boundMethod) {
        var method = target[methodName]
        if (method && _.isFunction (method)) {
            bind (target, methodName, boundMethod) } }

    $global.$aspect = function (ofWhat, cfg) {

        var aspectDef = Tags.unwrap (_.sequence (
                            $prototype.impl.extendWithTags,
                            $prototype.impl.flatten,
                            $prototype.impl.generateArgumentContractsIfNeeded,
                            $prototype.impl.contributeTraits ({}),
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

        return aspectDef }

}) ()