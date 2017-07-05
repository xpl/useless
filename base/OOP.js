"use strict";

const _ = require ('underscore')

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Hot-wires some common C++/Java/C# ways to OOP with JavaScript's ones.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_.hasOOP = true

_.withTest ('OOP', {

    '$prototype / $extends': function () {

    /*  Prototypes are defined via $prototype
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Foo = $prototype ({

        /*  If constructor is not defined (like here), it's default impl. will equal
            to the following:                                                               */

//          constructor: function (cfg) { _.extend (this, cfg) },

        /*  $static is used to designate type-level members (context-free ones),
            effectively porting that shit from C++/C#/Java world.                           */

            method:                  function () { return 'foo.method' },
            staticMethod:   $static (function () { return 'Foo.staticMethod' }),

        /*  $property is used to tag a value as an property definition.
            Property definitions expand itself within properties.js module, which
            is separate from OOP.js                                                         */

            property:                $property (function () { return 'foo.property' }),
            staticProperty: $static ($property (function () { return 'Foo.staticProperty' })),

        /*  Tags on members can be grouped like this, to reduce clutter if you have lots
            of members tagged with same tag.                                                */

            $static: {
                $property: {
                    one: 1,
                    two: 2,
                    three: 3 } },

        /*  Demonstrates some semantics of property definitions, provided by properties.js
            See that module for further investigation.                                      */

            $property: {
                static42:       $static (42),
                just42:         42,
                just42_too:     function () { return 42 },
                fullBlown:  {
                    enumerable:     false,  // will be visible as object's own property (defaults to true)
                    configurable:   true,   // can be deleted by delete operator (defaults to false)
                    get:            function () { return 42 },
                    set:            function (x) { $stub } } } })


    /*  Inherited prototypes are defined via $extends
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Bar = $extends (Foo, $final ({

        /*  If constructor is not defined (like here), it's default impl.
            will be equal to the following one (calls base constructor):     */

//          constructor: function () { Foo.prototype.constructor.apply (this, arguments)) } 

            staticMethod: $static (function () {
                return 'Bar.staticMethod' }),

            method: function () {
                return 'bar.method' } }))


    /*  Instances of $prototype/$extends are created by the 'new' operator, as
        this pair of utility is just a thin wrapper over native JS prototypes.

        The 'new' operator calls 'constructor' member from a prototype
        definition. If no constructor is specified, default one takes first
        argument and extends constructed instance with it, overriding any member
        value that is specified at prototype definition (and this is a
        really common way to define prototype constructors in JavaScript)

        Such semantics could be treated as somewhat similar to the 'anonymous
        classes' feature in Java, which is a useful mechanism for ad-hoc
        specialization of constructed prototypes.   
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var foo = new Foo ()
        var fuu = new Foo ({ method: function () { return 'fuu.method' }})
        var bar = new Bar ({ hi: 'there' })

        $assert (bar.hi         === 'there')
        $assert (fuu.method ()  === 'fuu.method')

        $assert ([foo.just42,   bar.just42],   [42, 42])        //  inheritance should work
        $assert ([Foo.static42, Bar.static42], [42, undefined]) //  (static members do not inherit)

    /*  Overriding should work
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ([foo.method (),        bar.method ()],         ['foo.method',       'bar.method'])
        $assert ([Foo.staticMethod (),  Bar.staticMethod ()],   ['Foo.staticMethod', 'Bar.staticMethod'])

    /*  Regular members shouln't be visible at type level
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ([foo.property,         foo.staticProperty], ['foo.property',       undefined])
        $assert ([Foo.staticProperty,   Foo.property],       ['Foo.staticProperty', undefined])

    /*  Until explicitly stated otherwise, properties are constant.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows (function () { foo.just42 = 43 },
            _.matches ({ message: 'cannot change just42 (as it\'s sealed to 42)' })) },


/*  Use $final to tag a thing as non-overrideable (comes from Java)
    ======================================================================== */

    '$final': function () {

    /*  Tagging arbitrary member as $final
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows (function () {

            var A = $prototype ({
                        constructor: $final (function () {}) })

            var B = $extends (A, {
                        constructor: function () {} }) },   // will throw Error

            _.matches ({ message: 'Cannot override $final constructor' }))

    /*  Tagging whole prototype as $final
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows (function () {

            var A = $prototype ($final ({}))
            var B = $extends (A) }, // will throw Error

             _.matches ({ message: 'Cannot derive from $final-marked prototype' })) },

/*  Use $alias to make member aliases with correct semantics
    ======================================================================== */

    'ES6 properties comprehension': function () {

        let Foo = $prototype ({

            get foo () {

                $assert (Meta.unwrap (this.constructor.$definition.foo).get instanceof Function)
                $assert (Meta.tags (this.constructor.$definition.foo), { 'property': true })

                return 42
            },

            $static: {
                get bar () {
                    return 42
                }
            }
        })

        $assert (Meta.unwrap (Foo.$definition.bar).get instanceof Function)
        $assert (Meta.tags (Foo.$definition.bar), { 'static': true, 'property': true })
        $assert (Foo.bar, 42)

        let foo = new Foo ()
        $assert (foo.foo, 42)
    },

/*  Use $alias to make member aliases with correct semantics
    ======================================================================== */

    '$alias': function () {

        var foo = new ($prototype ({

            error: function () { return 'foo.error' },

            failure:              $alias ('error'),
            crash:                $alias ('error'),
            finalCrash:   $final ($alias ('crash')) /* chaining works */        })) ()
                
                var def = foo.constructor.$definition

                $assert (foo.finalCrash, foo.crash, foo.failure, foo.error) // all point to same function

                $assert    ($final.is (def.finalCrash))   // you can add new tags to alias members
                $assertNot ($final.is (def.crash))        // adding tags to alias members does not affect original members 
                $assertNot ($final.is (def.error))

        /*  Ad-hoc property aliases (applicable even when there's no explicitly declared member at what alias points to)
         */
        var size = new ($prototype ({
            w:  $alias ($property ('x')),
            h:  $alias ($property ('y')) })) ()

                $assert ([size.x = 42, size.y = 24], [size.w, size.h], [42, 24]) },


/*  Static (compile-time) constructor gets called at prototype generation
    ======================================================================== */

    '$constructor': function () {
        $assertEveryCalledOnce (function (mkay) {
            var foo = new ($prototype ({
                $constructor: function () {
                    mkay ()  } })) }) },


/*  Run-time type information APIs
    ======================================================================== */

    'RTTI': function () {

        var Foo = $prototype ({ $static: { noop: _.noop } }),
            Bar = $extends (Foo) // empty definition argument read as {}

        var foo = new Foo (),
            bar = new Bar ()

    /*  Basically, the simplest way to check a type, relying on some native JavaScript prototype semantics.
        But it does not account inheritance.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert (foo.constructor === Foo)
        $assert (bar.constructor === Bar)

    /*  A functional crossbrowser version of 'instanceof' (accounts inheritance):
     
            1.  Boils down to native 'instanceof' where available
            2.  In elder browsers, emulates with correct semantics
     
        Why use (instead of native syntax):
        
            -   cross-browser
            -   functional (can be partial'ed to yield a predicate)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert (_.isTypeOf (Function,  foo.constructor.noop))           
        $assert (_.isTypeOf (Meta,      foo.constructor.$definition.noop)) // note how $static group is collapsed to normal form

    /*  Infix version (a static member of every $prototype)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ( Foo.isTypeOf (foo))
        $assert (!Bar.isTypeOf (foo))
        $assert (Bar.isTypeOf (bar))
        $assert (Foo.isTypeOf (bar))

    /*  Another infix version (a member of every $prototype)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert ( foo.isInstanceOf (Foo))
        $assert (!foo.isInstanceOf (Bar))
        $assert (bar.isInstanceOf (Bar))
        $assert (bar.isInstanceOf (Foo))
    },


/*  This is how to decide whether a function is $prototype constructor
    ======================================================================== */

    'isConstructor': function () {

        var Proto = $prototype (),  // empty argument read as {}
            dummy = function () {}

        $assert ($prototype.isConstructor (Proto), true)
        $assert ($prototype.isConstructor (dummy), false)
        $assert ($prototype.isConstructor (null),  false) // regression

        $assert ([Proto, dummy].map ($prototype.isConstructor), [true, false]) },


/*  $prototype.inheritanceChain for traversing inheritance chain
    ======================================================================== */

    'inheritanceChain': function () {

        var A = $prototype ()
        var B = $extends (A)
        var C = $extends (B)

        $assert ($prototype.inheritanceChain (C), [C,B,A]) },

/*  $prototype.defines for searching for members on definition chain
    ======================================================================== */

    'defines': function () {

        var A = $prototype ({ toString: function () {} })
        var B = $extends (A)
        var C = $prototype ()

        $assert ([$prototype.defines (B, 'toString'),
                  $prototype.defines (C, 'toString')], [true, false]) },

/*  $prototype is really same as $extends, if passed two arguments
    ======================================================================== */

    'two-argument syntax of $prototype': function () {

        var A = $prototype ()
        var B = $prototype (A, {}) // same as $extends (Base, def)

        $assert (B.$base === A.prototype) },


/*  You can enumerate members grouped by tag name via $membersByTag
    ======================================================================== */

    '$membersByTag': function () {

        var foo = $static ($property (1)),
            bar =          $property (2)

        $assertMatches ($prototype ({ foo: foo, bar: bar }).$membersByTag, { 'static'  : { 'foo': foo },
                                                                             'property': { 'foo': foo, 'bar': bar } }) },


/*  Tags on definition render to static properties
    ======================================================================== */

    'tags on definition': function () {

        $assertMatches ($prototype ($static ($final ({}))), { $static: true, $final: true }) },


/*  $mixin to extend existing types with $prototype-style definitions
    ======================================================================== */

    '$mixin': function () { var Type = $prototype ()

        $mixin (Type, {
            twentyFour: $static ($property (24)),
            fourtyTwo:           $property (42) })

        $assert ([Type    .twentyFour,
             (new Type ()).fourtyTwo], [24, 42]) }                                  }, function () {


/*  PUBLIC API
    ======================================================================== */

    _(['property', 'static', 'final', 'alias', 'memoized', 'private', 'builtin', 'hidden', 'testArguments'])
        .each (Meta.globalTag)

    _.extend ($global, {
    
        $prototype: function (arg1, arg2) {
                        return $prototype.impl.compile.apply ($prototype.impl,
                                    (arguments.length > 1)
                                        ? _.asArray (arguments).reverse ()
                                        : arguments) },

        $extends: function (base, def) {
                        return $prototype (base, def || {}) },

        $mixin: function (constructor, def) {
                            return (constructor === Array)
                                ? $prototype.impl.compileMixin ({ constructor: constructor, $hidden: def })
                                : $prototype.impl.compileMixin (_.extend (def, { constructor: constructor })) }
    })

    _.extend ($prototype, {

        isConstructor: function (what) {
            return _.isPrototypeConstructor (what) },

        macro: function (arg, fn) {
            if (arguments.length === 1) {
                $prototype.impl.alwaysTriggeredMacros.push (arg) }
            else {
                $prototype.impl.memberNameTriggeredMacros[arg] = fn } },

        macroTag: function (name, fn) {

            Meta.globalTag (name)
            $prototype.impl.tagTriggeredMacros[name] = fn },

        each: function (visitor) { var namespace = $global
            for (var k in namespace) {
                if (!(k[0] === '$')) { var value = namespace[k]
                    if ($prototype.isConstructor (value)) {
                        visitor (value, k) } } } },

        defines: function (constructor, member) {
            return (_.find ($prototype.inheritanceChain (constructor), function (supa) {
                        return (supa.$definition && supa.$definition.hasOwnProperty (member)) || false })) ? true : false },

        inheritanceChain: function (def) { var chain = []
            while (def) {
                chain.push (def)
                def = def.$base && def.$base.constructor }
            return chain },

    /*  INTERNALS
        ==================================================================== */

        impl: {

            alwaysTriggeredMacros:     [],
            memberNameTriggeredMacros: {},
            tagTriggeredMacros:        {},

            compile: function (def, base) {    var impl = ((base && base.$impl) || this)
                                    return $untag (impl
                                                    .sequence (def, base)
                                                    .call (impl, def || {})
                                                    .constructor) },

            sequence: function (def, base) { return _.sequence (

                /*  TODO: optimize performance (there's PLENTY of room to do that)
                 */
                this.convertPropertyAccessors,
                this.extendWithTags,
                this.flatten,
                this.generateCustomCompilerImpl (base),
                this.ensureFinalContracts (base),
                this.generateConstructor (base),
                this.evalAlwaysTriggeredMacros (base),
                this.evalMemberTriggeredMacros (base),
                this.contributeTraits (base),
                this.evalPrototypeSpecificMacros (base),
                this.generateBuiltInMembers (base),
                this.callStaticConstructor,
                this.expandAliases,
                this.groupMembersByTagForFastEnumeration,
                this.defineStaticMembers,
                this.defineInstanceMembers) },

            compileMixin: function (def) {
                return _.sequence (
                    this.convertPropertyAccessors,
                    this.flatten,
                    this.contributeTraits (),
                    this.expandAliases,
                    this.evalMemberTriggeredMacros (),
                    this.defineStaticMembers,
                    this.defineInstanceMembers).call (this, def || {}).constructor },

            convertPropertyAccessors: function (def) { // converts { get foo () {} } to { get: $property (...) }

                for (let name of Object.getOwnPropertyNames (def)) {
                    const desc = Object.getOwnPropertyDescriptor (def, name)

                    if ((desc.get instanceof Function ||
                         desc.set instanceof Function)) {

                        Object.defineProperty (def, name, { value: $property (desc) }) } }

                return def
            },

            flatten: function (def) {

            /*  merge groups    */

                var tagGroups    = _.pick (def, this.isTagGroup)
                var mergedTagGroups = _.object (_.flatten (_.map (tagGroups, function (membersDef, tag) {
                    return _.map (this.flatten (this.convertPropertyAccessors (membersDef)), function (member, memberName) {
                        return [memberName, $global[tag] (member)] }) }, this), true))

                var memberDefinitions   = _.omit (def, this.isTagGroup)

                return _.extend (memberDefinitions, mergedTagGroups) },

            evalAlwaysTriggeredMacros: function (base) {
                return function (def) { var macros = $prototype.impl.alwaysTriggeredMacros
                    for (var i = 0, n = macros.length; i < n; i++) {
                        def = (macros[i] (def, base)) || def }
                    return def } },

            evalMemberTriggeredMacros: function (base) {
                return function (def) { var names = $prototype.impl.memberNameTriggeredMacros,
                                            tags  = $prototype.impl.tagTriggeredMacros

                    _.each (def, function (value, name) {
                        if (names.hasOwnProperty (name)) {
                            def = (names[name] (def, value, name, base)) || def }

                        Meta.eachTag (value, (tag => { if (tags.hasOwnProperty (tag)) {
                            def = (tags [tag] (def, value, name, base)) || def } })) })

                     return def } },

            evalPrototypeSpecificMacros: function (base) { return function (def) {
                if (!def.isTraitOf) {
                    var macroTags = $untag (def.$macroTags || (base && base.$definition && base.$definition.$macroTags))
                    if (macroTags) {
                        this.applyMacroTags (macroTags, def) } } return def } },

            applyMacroTags: function (macroTags, def) {
                _.each (def, function (memberDef, memberName) {
                            _.each (macroTags, function (macroFn, tagName) { memberDef = def[memberName]
                                if (Meta.hasTag (memberDef, tagName)) {
                                    def[memberName] = macroFn.call (def, def, memberDef, memberName) || memberDef } }, this) }, this)
                return def },

            generateCustomCompilerImpl: function (base) {
                return function (def) {
                    if (def.$impl) {
                        def.$impl = _.extend (Object.create ((base && base.$impl) || this), def.$impl) // sets prototype to base.$impl || this
                        def.$impl = $static ($builtin ($property (def.$impl))) }
                    else if (base && base.$impl) {
                        def.$impl = $static ($builtin ($property (base.$impl))) }
                    return def } },

            contributeTraits: function (base) {
                        return function (def) {
                
                if (def.$traits) { var traits = def.$traits

                    this.mergeTraitsMembers (def, traits, base)

                    def.$traits  = $static ($builtin ($property (traits)))
                    def.hasTrait = $static ($builtin (function (Constructor) {
                        return traits.indexOf (Constructor) >= 0 })) }

                return def } },

            mergeTraitsMembers: function (def, traits, base) {
                _.each (traits, function (trait) {
                    _.defaults (def, _.omit (trait.$definition, (v, k) => $builtin.is (v) || k === 'constructor')) }) },

            extendWithTags: function (def) {                    
                return _.extendWith ($untag (def), _.object (_.map (Meta.tags (def), (v, k) => ['$' + k, $static (v)]))) },

            callStaticConstructor: function (def) { 
                if (!def.isTraitOf) { 
                    _.each ($untag (def.$traits), function (T) {
                                                    if (T.$definition.$constructor) {
                                                        $untag (T.$definition.$constructor).call (def) } })
                    if (def.$constructor) {
                        $untag (def.$constructor).call (def) } } return def },

            generateConstructor: function (base) { return function (def) {

                return _.extend (def, { constructor:
                    Meta.modify (def.hasOwnProperty ('constructor') ? def.constructor : this.defaultConstructor (base),
                        function (fn) {
                            if (base) { fn.prototype = Object.create (base.prototype);
                                        fn.prototype.constructor = fn }
                            return fn }) }) } },

            generateBuiltInMembers: function (base) { return function (def) {

                if (def.$constructor) {
                    def.$constructor = $builtin ($static (def.$constructor)) }

                return _.defaults (def, {
                    $base:          $builtin ($static ($property (_.constant (base && base.prototype)))),
                    $definition:    $builtin ($static ($property (_.constant (_.extend ({}, base && base.$definition, def))))),
                    isTypeOf:       $builtin ($static (_.partial (_.isTypeOf, $untag (def.constructor)))),
                    isInstanceOf:   $builtin (function (constructor) { return _.isTypeOf (constructor, this) }),
                    $:              $builtin ($prototype.impl.$) }) }},

            $: function (fn) { return _.$.apply (null, [this].concat (_.asArray (arguments))) },
            
            defaultConstructor: function (base) {
                return (base ?
                    function ()    { base.prototype.constructor.apply (this, arguments) } :
                    function (cfg) { _.extend (this, cfg || {}) }) },

            defineStaticMembers: function (def) {
                this.defineMembers ($untag (def.constructor), _.pick (def, $static.is))
                return def },

            defineInstanceMembers: function (def) {
                this.defineMembers ($untag (def.constructor).prototype, _.omit (def, $static.is))
                return def },

            defineMembers: function (targetObject, def) {
                _.each (def, function (value, key) {
                    if (key !== 'constructor' && def.hasOwnProperty (key)) {
                        this.defineMember (targetObject, value, key) } }, this) },

            defineMember: function (targetObject, def, key) {

                const tags = Meta.tags (def)

                if (tags.property) {
                    (tags.memoized ? _.defineMemoizedProperty : _.defineProperty) (targetObject, key, def, tags.hidden ? { enumerable: false } : {})
                }
                else {

                    try {
                        Object.defineProperty (targetObject, key, {
                            value: $untag (def),
                            configurable: true, writable: true,
                            enumerable: !tags.hidden })
                    } catch (e) {

                        console.log ('Failed to define property', key, 'on', targetObject, 'with def =', def)
                        console.log (e)
                    }
                }
            },

            ensureFinalContracts: function (base) { return function (def) {
                                        if (base) {
                                            if (base.$final) {
                                                throw new Error ('Cannot derive from $final-marked prototype') }

                                            if (base.$definition) {
                                                var invalidMembers = _.intersection (
                                                    _.keys (_.pick (base.$definition, $final.is)),
                                                    _.keys (def))
                                                if (invalidMembers.length) {
                                                    throw new Error ('Cannot override $final ' + invalidMembers.join (', ')) } } }

                                        return def } },

            expandAliases: function (def) {
                                _.each (def, function (v, k) { def[k] = this.resolveMember (def, k, v)[1] }, this); return def },

            resolveMember: function (def, name, member) { member = member || def[name]

                                if ($alias.is (member)) { var ref      = this.resolveMember (def, $untag (member))
                                                          var refName  = ref[0]
                                                          var refValue = ref[1]

                                    return [refName, ($property.is (member)

                                                      ? $property ({ get ()  { return this[refName]     },
                                                                     set (x) {        this[refName] = x } })

                                                      : Meta.replaceTags (refValue, _.omit (Meta.tags (member), 'alias'))) ] }

                                else { return [name, member] } },

            groupMembersByTagForFastEnumeration: function (def) { var membersByTag = {}

                                                    _.each (def, function (m, name) {
                                                        Meta.eachTag (m, tag => (membersByTag[tag] = (membersByTag[tag] || {}))[name] = m)
                                                    })

                                                    def.$membersByTag = $static ($builtin ($property (membersByTag))); return def },

            isTagGroup: function (value_, key) { var value = $untag (value_)
                return (key[0] === '$') && _.isFunction ($global[key]) && (typeof value === 'object') && !_.isArray (value) },

            modifyMember: function (member, newValue) {
                return ($property.is (member) && Meta.modify (member, function (value) { return _.extend (value, _.map2 (_.pick (value, 'get', 'set'), newValue)) })) ||
                       (_.isFunction ($untag (member)) && Meta.modify (member, newValue)) || member } } }) })


/*  $trait  A combinatoric-style alternative to inheritance.
            (also known as "mixin" in some languages)
    ======================================================================== */

    _.withTest (['OOP', '$traits'], function () {

        var Closeable = $trait ({
            close: function () {} })

        var Movable = $trait ({
            move: function () {} })

        var Enumerable = $trait ({
            each: function (iter) {},
            length: $property (function () { return 0; }) })

        var JustCloseable     = $prototype ({ $traits: [Closeable] })
        var MovableEnumerable = $prototype ({ $traits: [Movable, Enumerable], move: function () {} })

        var movableEnumerable = new MovableEnumerable ()

        $assert (movableEnumerable.move === MovableEnumerable.prototype.move)

        $assertThrows (function () { new Closeable () },
            _.matches ({ message: 'Traits are not instantiable (what for?)' }))

        $assertTypeMatches (movableEnumerable, {
            move: 'function',
            each: 'function',
            length: 'number' })

        $assert ([
            movableEnumerable.isInstanceOf (Movable),
            movableEnumerable.isInstanceOf (Enumerable),
            movableEnumerable.isInstanceOf (Closeable)], [true, true, false])

        $assert (Movable.isTypeOf (movableEnumerable))
        $assert (Movable.isTraitOf (movableEnumerable))

        $assert (MovableEnumerable.hasTrait (Enumerable))

        $assertMatches (MovableEnumerable,  { $traits: [Movable, Enumerable] })
        $assertMatches (JustCloseable,      { $traits: [Closeable] })

        $assertCallOrder (function (t1_constructed, t2_constructed, proto_constructed) {

            var T1, T2

            $assertNotCalled (function (not_now) {
                T1 = $trait ({ $constructor: function () { not_now (); t1_constructed () } })
                T2 = $trait ({ $constructor: function () { not_now (); t2_constructed () } }) })

            var Proto = $prototype ({
                            $traits: [T1, T2],
                            $constructor: function () { proto_constructed () } }) })

}, function () {

    _.isTraitOf = function (Trait, instance) {
        var constructor = instance && instance.constructor
        return (constructor &&
            constructor.hasTrait &&
            constructor.hasTrait (Trait)) || false }    //  indexOf is fast if has 1-2 traits,
                                                        //  no need to pre-index
    _.isTypeOf = _.or (_.isTypeOf, _.isTraitOf)

    $global.$trait = function (arg1, arg2) {
        var constructor = undefined
        var def = _.extend (arguments.length > 1 ? arg2 : arg1, {
                        constructor: _.throwsError ('Traits are not instantiable (what for?)'),
                          isTraitOf: $static ($builtin (function (instance) {
                            return _.isTraitOf (constructor, instance) })) })

        return (constructor = $prototype.impl.compile (def, arguments.length > 1 ? arg1 : arg2)) } })


/*  $macroTags
    ======================================================================== */

    $prototype.macro ('$macroTags', function (def, value, name) {
        _.each ($untag (value), function (v, k) { Meta.globalTag (k) }) })


/*  Context-free implementation of this.$
    ======================================================================== */

    _.$ = (this_, fn, ...args) =>
            (args.length) ?
                _.bind.apply (undefined, [fn, this_].concat (args)) :
                _.withSameArgs (fn, (...args) => fn.apply (this_, args)) // @hide


/*  $const (xxx) as convenient alias for $static ($property (xxx))
    ======================================================================== */
 
    _.withTest (['OOP', '$const'], function () {
 
        var A = $prototype ({
            $const: {
                foo: 'foo',
                bar: 'bar' },
            qux: $const ('qux'),
            zap: $const ('zap') })
 
        $assert ([A.foo, A.bar, A.qux, A.zap], ['foo', 'bar', 'qux', 'zap'])
        $assertThrows (function () { A.foo = 'bar '}) }, function () {

    $global.$const = function (x) { return $static ($property (x)) }  })



/*  Dual call interface
    ======================================================================== */

    /*  method → free function
     */
    _.withTest (['OOP', '$callableAsFreeFunction'], function () {

            const X = $prototype ({
                        foo: $callableAsFreeFunction ($property (function () { $assert (this._42, 42); return 42 })) }),

                  x = new X ({ _42: 42 })

            $assert (x.foo, X.foo (x), 42) },       function () {

                /*  Impl
                 */
                Meta.globalTag  ('callableAsFreeFunction')
                $prototype.macroTag ('callableAsFreeFunction',
                    function (def, value, name) {
                              def.constructor[name] = $untag (value).asFreeFunction
                       return def }) })

    /*  free function → method
     */
    _.withTest (['OOP', '$callableAsMethod'],       function () {

            const X = $prototype ({
                        foo: $callableAsMethod (function (this_, _42) { $assert (this_._42, _42, 42); return 42 }) }),

                  x = new X ({ _42: 42 })

            $assert (x.foo (42), X.foo (x, 42), 42) },  function () {

                /*  Impl 
                 */
                Meta.globalTag  ('callableAsMethod')
                $prototype.macroTag ('callableAsMethod',
                    function (def, value, name) {
                              def[name] = Meta.modify (value, _.asMethod)
                              def.constructor[name] = $untag (value)
                       return def }) })


/*  $singleton (a humanized macro to new ($prototype (definition)))
    ======================================================================== */

     _.withTest (['OOP', '$singleton'], function () { $assertEveryCalledOnce (function (baseConstructor, derivedConstructor) {

            var Base    = $prototype ({
                            method:    _.constant (42) })

        /*  returns constructed instance of a definition passed as argument
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

            var Simple  = $singleton ({
                            constructor: function () { baseConstructor () },
                            method:      function () { return 42 } })

        /*  can inherit from a prototype
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

            var Derived = $singleton (Base, {
                            constructor: function () { derivedConstructor (); Base.prototype.constructor.apply (this, arguments) } })

            $assert (Simple.method (), Derived.method (), 42) })

        /*  inner prototypes
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

            var Outside = $singleton ({
                Inside: $prototype ({ foo: function () {} }) })

            $assertTypeMatches ((new Outside.Inside ()).foo,  'function')           }, function () {

        /*  IMPLEMENTATION
            ==================================================================== */

            $global.$singleton = function (arg1, arg2) {
                    return new ($prototype.apply (null, arguments)) () } })

