// _.tests.AOP = {

//     'basics': function () {     var callLog = []

//                                 var Thing = $prototype ($testArguments ({

//                                     create:            function (_777)              { callLog.push ([this, 'Thing.create']) },
//                                     display:           function (_foobar, _778)     { callLog.push ([this, 'Thing.display']) },
//                                     destroy:           function ()                  { callLog.push ([this, 'Thing.destroy']); return 456 } }))

//                                 var NewFlavorOfThing = $aspect (Thing, $testArguments ({

//                                     beforeCreate:   function (_777)                        { callLog.push ([this, 'NewFlavorOfThing.beforeCreate']) },

//                                     display:        function (_foo, _123, originalMethod)  { callLog.push ([this, 'NewFlavorOfThing.display']);
//                                                                                              return originalMethod.call (this, _foo + 'bar', 778) },

//                                     afterDestroy:   function (_456)                        { callLog.push ([this, 'NewFlavorOfThing.afterDestroy']) } }))

//                                 var demo = new Thing ()

//                                 demo.create   (777)
//                                 demo.display  ('foo', 123)
//                                 demo.destroy  ()

//                                 $assert (callLog, [[demo, 'NewFlavorOfThing.beforeCreate'],
//                                                    [demo,            'Thing.create'      ],
//                                                    [demo, 'NewFlavorOfThing.display'     ],
//                                                    [demo,            'Thing.display'     ],
//                                                    [demo,            'Thing.destroy'     ],
//                                                    [demo, 'NewFlavorOfThing.afterDestroy']]) } };


// (function () {

//     var fnNameExpr = $r.expr ('how', $r.text ('before').or.text ('after')).expr ('name', $r.anything).$

//     var tryBind = function (target, methodName, bind, boundMethod) {
//         var method = target[methodName]
//         if (method && _.isFunction (method)) {
//             bind (target, methodName, boundMethod) } }

//     $global.$aspect = function (ofWhat, cfg) {

//         var aspectDef = Tags.unwrap (_.sequence (
//                             $prototype.impl.extendWithTags,
//                             $prototype.impl.flatten,
//                             $prototype.impl.generateArgumentContractsIfNeeded,
//                             $prototype.impl.contributeTraits ({}),
//                             $prototype.impl.expandAliases).call ($prototype.impl, cfg))
        
//         var motherDef = ofWhat.constructor && ofWhat.constructor.$definition
//         if (motherDef) {
//                 (motherDef.$aspects = motherDef.$aspects || []).push (aspectDef) }

//         _.each (aspectDef, function (value, name) {
        
//             if (aspectDef.hasOwnProperty (name) && _.isFunction (value)) {

//                 var parsed       = fnNameExpr.parse (name)
//                 var originalName = (parsed.name &&          parsed.name.decapitalized) || name
//                 var bindTool     = (parsed.how  && _['on' + parsed.how .capitalized])  || _.intercept

//                 if (bindTool) {

//                     tryBind (ofWhat,           originalName, bindTool, value)
//                     tryBind (ofWhat.prototype, originalName, bindTool, value) } } })

//         if (ofWhat.aspectAdded) {
//             ofWhat.aspectAdded (aspectDef) }

//         return aspectDef }

// }) ()