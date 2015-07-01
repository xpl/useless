/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Hot-wires some common C++/Java/C# ways to OOP with JavaScript's ones.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_.hasOOP = true

_.deferTest ('OOP', {

    '$prototype / $extends': function () {

    /*  Prototypes are defined via $prototype
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Foo = $prototype ({

        /*  If constructor is not defined (like here), it's default impl. will equal
            to the following:                                                               */

//          constructor: function (cfg) { _.extend (this, cfg) },

        /*  $static keyword is used to designate type-level members (context-free ones),
            effectively porting that shit from C++/C#/Java world.                           */

            method:                  function () { return 'foo.method' },
            staticMethod:   $static (function () { return 'Foo.staticMethod' }),

        /*  $property keyword is used to tag a value as an property definition.
            Property definitions expand itself within properties.js module, which
            is separate from OOP.js                                                         */

            property:                $property (function () { return 'foo.property' }),
            staticProperty: $static ($property (function () { return 'Foo.staticProperty' })),

        /*  Tags on members can be grouped like this, to reduce clutter if you have lots
            of members tagged with same keyword. Currently no more than one level is
            supported.                                                                      */

            $static: {
                one: function () { return 1 },
                two: function () { return 2 },
                three: $property (3) },

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
        classed' feature in Java, which is a useful mechanism for ad-hoc
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

    '$alias': function () {

        var foo = new $prototype ({
            failure: $alias ('error'),
            crash:   $alias ('error'),
            error:   function () { return 'foo.error' } })

        $assert (foo.crash, foo.failure, foo.error) }, // all point to same function


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
        $assert (_.isTypeOf (Tags,      foo.constructor.$definition.noop)) // note how $static group is collapsed to normal form

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

    /*  A private impl of isTypeOf (one shouldn't invoke these directly)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert (_.isTypeOf_ES5 (Bar, bar))     // isTypeOf impl. for ECMAScript level 5
        $assert (_.isTypeOf_ES5 (Foo, bar))     // (validate inheritance)

        $assert (_.isTypeOf_ES4 (Bar, bar))     // isTypeOf impl. for ECMAScript level 4 (IE8 and below)
        $assert (_.isTypeOf_ES4 (Foo, bar)) },  // (validate inheritance)


/*  This is how to decide whether a function is $prototype constructor
    ======================================================================== */

    'isConstructor': function () {

        var Proto = $prototype (),  // empty argument read as {}
            dummy = function () {}

        $assert ($prototype.isConstructor (Proto), true)
        $assert ($prototype.isConstructor (dummy), false)
        $assert ($prototype.isConstructor (null),  false) // regression

        $assert ([Proto, dummy].map ($prototype.isConstructor), [true, false]) },


/*  $trait  A combinatoric-style alternative to inheritance.
            (also known as "mixin" in some languages)
    ======================================================================== */

    '$trait / $traits': function () {

        var Closeable = $trait ({
            close: function () {} })

        var Movable = $trait ({
            move: function () {} })

        var Enumerable = $trait ({
            each: function (iter) {},
            length: $property (function () { return 0; }) })

        var JustCloseable     = $prototype ({ $trait:  Closeable })
        var MovableEnumerable = $prototype ({ $traits: [Movable, Enumerable], move: function () {} })

        var movableEnumerable = new MovableEnumerable ()

        $assert (movableEnumerable.move === MovableEnumerable.prototype.move)

        $assertThrows (function () { new Closeable () },
            _.matches ({ message: 'Traits are not instantiable (what for?)' }))

        $assertTypeof (movableEnumerable, {
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
        $assertMatches (JustCloseable,      { $traits: [Closeable],
                                              $trait:  undefined }) },


/*  $prototype.inheritanceChain for traversing inheritance chain
    ======================================================================== */

    'inheritanceChain': function () {

        var A = $prototype ()
        var B = $extends (A)
        var C = $extends (B)

        $assert ($prototype.inheritanceChain (C), [C,B,A]) },


/*  $prototype is really same as $extends, if passed two arguments
    ======================================================================== */

    'two-argument syntax of $prototype': function () {

        var A = $prototype ()
        var B = $prototype (A, {}) // same as $extends (Base, def)

        $assert (B.$base === A.prototype) },


/*  Adds value contracts to arguments for unit testing purposes
    ======================================================================== */

    'value contracts for arguments': function () {

        var Proto = $prototype ($test ({

            frobnicate:  function (_777, _foo_bar_baz, unaffected) {},
            noMistake:   function () {} }))

        var obj = new Proto ()

        $assertFails (function () {
            obj.frobnicate (999, 'not right') })

        obj.frobnicate (777, 'foo bar baz')
        obj.noMistake () },


/*  $const (xxx) as convenient alias for $static ($property (xxx))
    ======================================================================== */

    '$const': function () {

        var A = $prototype ({
            $const: {
                foo: 'foo',
                bar: 'bar' },
            qux: $const ('qux'),
            zap: $const ('zap') })

        $assert ([A.foo, A.bar, A.qux, A.zap], ['foo', 'bar', 'qux', 'zap'])
        $assertThrows (function () { A.foo = 'bar '}) },


/*  Tags on definition render to static properties
    ======================================================================== */

    'tags on definition': function () {

        $assertMatches ($prototype ($static ($final ({}))), { $static: true, $final: true }) } }, function () {


/*  PUBLIC API
    ======================================================================== */

    _(['property', 'static', 'final', 'alias', 'memoized', 'private', 'builtin', 'test'])
        .each (_.defineTagKeyword)

    $prototype = function (arg1, arg2) {
                    return $prototype.impl.compile.apply ($prototype.impl,
                                (arguments.length > 1)
                                    ? _.asArray (arguments).reverse ()
                                    : arguments) }

    $extends = function (base, def) {
                    return $prototype (base, def || {}) }

    _.extend ($prototype, {

        isConstructor: function (what) {
            return _.isPrototypeConstructor (what) },

        macro: function (arg, fn) {
            if (arguments.length === 1) {
                $prototype.impl.alwaysTriggeredMacros.push (arg) }
            else {
                $prototype.impl.memberNameTriggeredMacros[arg] = fn } },

        each: function (visitor) { var namespace = $global
            for (var k in namespace) {
                if (!_.isKeyword (k)) { var value = namespace[k]
                    if ($prototype.isConstructor (value)) {
                        visitor (value, k) } } } },

        inheritanceChain: function (def) { var chain = []
            while (def) {
                chain.push (def)
                def = def.$base && def.$base.constructor }
            return chain },

        mapMethods: function (def, op) {
                        return Tags.map (def, function (fn, k, t) {
                            return _.isFunction (fn) ? op (fn, k, t).wraps (fn) : fn }) },


    /*  INTERNALS
        ==================================================================== */

        impl: {

            alwaysTriggeredMacros: [],
            memberNameTriggeredMacros: {},

            compile: function (def, base) { return Tags.unwrap (_.sequence (
                this.extendWithTags,
                this.flatten,
                this.generateArgumentContractsIfTaggedAsTest,
                this.ensureFinalContracts (base),
                this.generateConstructor (base),
                this.evalAlwaysTriggeredMacros (base),
                this.evalMemberNameTriggeredMacros (base),
                this.contributeTraits,
                this.generateBuiltInMembers (base),
                this.expandAliases,
                this.defineStaticMembers,
                this.defineInstanceMembers).call (this, def || {}).constructor) },

            evalAlwaysTriggeredMacros: function (base) {
                return function (def) { var macros = $prototype.impl.alwaysTriggeredMacros
                    for (var i = 0, n = macros.length; i < n; i++) {
                        def = macros[i] (def, base) }
                    return def } },

            evalMemberNameTriggeredMacros: function (base) {
                return function (def) { var macros = $prototype.impl.memberNameTriggeredMacros
                    _.each (def, function (value, name) {
                        if (macros.hasOwnProperty (name)) {
                            def = macros[name] (def, value, name, base) } })
                    return def } },

            generateArgumentContractsIfTaggedAsTest: function (def) {
                return def.$test ? $prototype.mapMethods (def, function (fn, name) {
                                                                     return function () { var args = _.asArray (arguments)
                                                                        $assertArguments (args.copy, fn.original, name)
                                                                         return fn.apply (this, args) } }) : def },

            contributeTraits: function (def) {
                if (def.$trait) {
                    def.$traits = [def.$trait]
                    delete def.$trait }

                if (def.$traits) { var traits = def.$traits
                    _.each (traits,
                        function (constructor) {
                            _.defaults (def, _.omit (constructor.$definition,
                                _.or ($builtin.matches, _.key (_.equals ('constructor'))))) } ) 

                    def.$traits  = $static ($builtin ($property (traits)))
                    def.hasTrait = $static ($builtin (function (Constructor) {
                        return traits.indexOf (Constructor) >= 0 })) }

                return def },

            extendWithTags: function (def) {
                return _.extendWith (Tags.unwrap (def), _.objectMap (Tags.get (def), $static)) },

            generateConstructor: function (base) { return function (def) {
                return _.extend (def, { constructor:
                    Tags.modifySubject (def.hasOwnProperty ('constructor') ? def.constructor : this.defaultConstructor (base),
                        function (fn) {
                            if (base) { fn.prototype.__proto__ = base.prototype }
                            return fn }) }) } },

            generateBuiltInMembers: function (base) { return function (def) {
                return _.defaults (def, {
                    $base:          $builtin ($static ($property (_.constant (base && base.prototype)))),
                    $definition:    $builtin ($static ($property (_.constant (_.extend ({}, base && base.$definition, def))))),
                    isTypeOf:       $builtin ($static (_.partial (_.isTypeOf, Tags.unwrap (def.constructor)))),
                    isInstanceOf:   $builtin (function (constructor) { return _.isTypeOf (constructor, this) }),
                    $:              $builtin (function (fn)          { return _.$.apply (null, [this].concat (_.asArray (arguments))) }) }) }},

            defaultConstructor: function (base) {
                return (base ?
                    function ()    { base.prototype.constructor.apply (this, arguments) } :
                    function (cfg) { _.extend (this, cfg || {}) }) },

            defineStaticMembers: function (def) {
                this.defineMembers (Tags.unwrap (def.constructor), _.pick (def, $static.matches))
                return def },

            defineInstanceMembers: function (def) {
                this.defineMembers (Tags.unwrap (def.constructor).prototype, _.omit (def, $static.matches))
                return def },

            defineMembers: function (targetObject, def) {
                _.each (def, function (value, key) {
                    if (key !== 'constructor' && def.hasOwnProperty (key)) {
                        this.defineMember (targetObject, value, key) } }, this) },

            defineMember: function (targetObject, def, key) {
                if (def && def.$property) {
                    if (def.$memoized) {
                        _.defineMemoizedProperty (targetObject, key, def) }
                    else {
                        _.defineProperty (targetObject, key, def) } }
                else {
                    var what = Tags.unwrap (def)
                    targetObject[key] = what } },

            ensureFinalContracts: function (base) { return function (def) {
                if (base) {
                    if (base.$final) {
                        throw new Error ('Cannot derive from $final-marked prototype') }

                    if (base.$definition) {
                        var invalidMembers = _.intersection (
                            _.keys (_.pick (base.$definition, $final.matches)),
                            _.keys (def))
                        if (invalidMembers.length) {
                            throw new Error ('Cannot override $final ' + invalidMembers.join (', ')) } } }

                return def } },

            expandAliases: function (def) {
                return _.objectMap (def, function (v) { return ($alias.matches (v) ? def[Tags.unwrap (v)] : v) }) },

            flatten: function (def) {
                var tagKeywordGroups    = _.pick (def, this.isTagKeywordGroup)
                var mergedKeywordGroups = _.object (_.flatten (_.map (tagKeywordGroups, function (membersDef, keyword) {
                    return _.map (membersDef, function (member, memberName) {
                        return [memberName, $global[keyword] (member)] }) }), true))

                var memberDefinitions   = _.omit (def, this.isTagKeywordGroup)

                return _.extend (memberDefinitions, mergedKeywordGroups) },

            isTagKeywordGroup: function (value_, key) { var value = Tags.unwrap (value_)
                return _.isKeyword (key) && _.isFunction ($global[key]) && (typeof value === 'object') && !_.isArray (value) } } }) })


/*  $traits impl.
    ======================================================================== */

    _.isTraitOf = function (Trait, instance) {
        var constructor = instance && instance.constructor
        return (constructor &&
            constructor.hasTrait &&
            constructor.hasTrait (Trait)) || false }    //  indexOf is fast if has 1-2 traits,
                                                        //  no need to pre-index
    _.isTypeOf = _.or (_.isTypeOf, _.isTraitOf)

    $trait = function (arg1, arg2) {
        var constructor = undefined
        var def = _.extend (arguments.length > 1 ? arg2 : arg1, {
                        constructor: _.throwsError ('Traits are not instantiable (what for?)'),
                        isTraitOf: $static ($builtin (function (instance) {
                            return _.isTraitOf (constructor, instance) })) })

        return (constructor = $prototype.impl.compile (def, arguments.length > 1 ? arg1 : arg2)) }


/*  Context-free implementation of this.$
    ======================================================================== */

    _.$ = function (this_, fn) {
                return _.bind.apply (undefined, [fn, this_].concat (_.rest (arguments, 2))) }


/*  Adds this.$ to jQuery objects (to enforce code style consistency)
    ======================================================================== */

    if (typeof jQuery !== 'undefined') {
        jQuery.fn.extend ({ $: function (f) { return _.$ (this, f) } })}


/*  $const is alias for static property
    ======================================================================== */

    _.defineKeyword ('const', function (x) { return $static ($property (x)) })


/*  $singleton (a humanized macro to new ($prototype (definition)))
    ======================================================================== */

     _.withTest ('$singleton', function () { $assertCalls (2, function (mkay) {

            var Base    = $prototype ({
                            method:    _.constant (42) })

        /*  returns constructed instance of a definition passed as argument
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

            var Simple  = $singleton ({
                            constructor: function () { mkay () },
                            method:      function () { return 42 } })

        /*  can inherit from a prototype
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

            var Derived = $singleton (Base, {
                            constructor: function () { mkay (); Base.prototype.constructor.apply (this, arguments) } })

            $assert (Simple.method (), Derived.method (), 42) }) }, function () {

        /*  IMPLEMENTATION
            ==================================================================== */

            $singleton = function (arg1, arg2) {
                    return new ($prototype.apply (null, arguments)) () } })




        