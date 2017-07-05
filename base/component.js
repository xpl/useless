"use strict";

const _ = require ('underscore')

/*  What for:

    -   Hierarchy management (parent-child relationship)
    -   Destructors ('destroy' method), propagating through hierarchy
    -   bindable on $prototypes, auto-disconnecting if involved component gets destroyed
    -   trigger/barrier on $prototypes, auto-disconnecting if involved component gets destroyed

    Component facility provides unified mechanics for deinitialization, thus allowing
    to freely combine distinct components into more complex structure with no need to
    know how to specifically deinitialize each of them.

    Use to define highly configurable/reusable objects having limited lifetime, holding
    system resources and organizing into hierarchies, e.g. UI components, like dialogs,
    menus, embeddable data views. They hold DOM references and bound events, so one needs
    to properly free those resources during deinitialization. Case studies:

    -   For example, a pop-up menu could render itself into top-level 'document' element, 
        so just by destroying its parent component's DOM, things created by this pop-up
        wont be destroyed, and that's why explicit 'destroy' method is needed. With
        Component, you call 'destroy' on parent component, and it propagates to child
        components automatically, triggering their 'destroy' methods.

    -   A component could dynamically bind to other components with help of $bindable and
        $trigger facilities. If such component gets destroyed, those links became invalid
        and should be removed, otherwise it's considered as 'memory leak'. Component handles
        such situation, removing those links if any involved component gets destroyed.

    Component could be considered as basic tool for dynamic code binding at macro level,
    promoting functional code binding tools (defined in dynamic/stream.js) to $prototypes.
 */

_.tests.component = {

    /*  - Passing config to constructor will extend constructed instance with that object
        - Component constructors exhibit CPS interface (last function argument interprets as continuation)
     */
    'constructor([cfg, ][then])': function () { $assertNotCalled (function (mkay) {

        var Compo = $component ({})

        /*  1. constructor (cfg)
         */
        $assertMatches (new Compo ({ foo: 42 }), { foo: 42 })

        /*  2. constructor (then)
         */
        //new Compo (mkay)

        /*  3. constructor (cfg, then)
         */
        /*$assertMatches (new Compo ({ foo: 42 }, mkay), { foo: 42 })*/ }) },


    /*  init() should be entry point to a component, calling at constructor by default
     */
    'init': function () { $assertEveryCalledOnce (function (mkay) {
                            $singleton (Component, {
                                init: function () {
                                    mkay () } }) }) },


    /*  init(then) means your initialization is defined in CPS style
     */
    /*'CPS init': function () { $assertEveryCalled (function (compo1, compo2) {

                            var Compo = $prototype ({
                                init: function (then) { // you're required to call then, to complete init
                                    then () } })

                            var compo = new Compo (function () {
                                compo1 () })

                            var compo2 = new Compo ({ _42: 42 }, function () {
                                $assert (this._42, 42)
                                compo2 () }) }) },*/

    /*  constructor overriding is prohibited (by $final), use init() API for configuration means
     */
    'no constructor overriding': function () { $assertThrows (function () {
                                        $singleton (Component, {
                                            constructor: function () {} }) }) },


    /*  If you don't want init() to be called at constructor (to call it manually later),
        pass init:false to constructor's config
     */
    'manual init()': function () { $assertNotCalled (function (fail) {
                                        var Compo = $component ({ init: function () { fail () } })
                                        var compo = new Compo ({ init: false })
                                        $assert (typeof compo.init, 'function') }) }, // shouldn't be replaced by false

    /*  initialized is a _.barrier that opens after initialization
     */
    'initialized (barrier)': function () {
        var Compo = $component ({ init: function () {} })
        var compo = new Compo ({ init: false })

        $assert (!compo.initialized.already)
        $assertEveryCalledOnce (function (mkay) {
            compo.initialized (function () { mkay () })
            compo.init () }) },

    /*  'thiscall' semantics for methods (which can be defined by a variety of ways)
     */
    'thiscall for methods': function () {
        $assertEveryCalledOnce (function (prototypeMethod, instanceMethod) {
            var instance = null
            var Compo = new $component ({
                prototypeMethod: function () { $assert (this === instance); prototypeMethod () } })
            instance = new Compo ({
                instanceMethod:  function () { $assert (this === instance); instanceMethod () } })

            instance.prototypeMethod.call (null)
            instance.instanceMethod.call (null) }) },

    /*  Pluggable init/destroy with $traits (tests all combinations of CPS / sequential style method calling)
     */
    'pluggable init with $traits': function () { var A, B, C, D

        var A = $trait ({
            beforeInit: function () { A = true; return Promise.resolve () },
            afterInit:  function () { B = true; return Promise.resolve () } })

        var B = $trait ({
            beforeInit: function () { C = true; },
            afterInit:  function () { D = true; }
        })

        var C = $component ({
            $traits: [B, A] })

        return (new C ()).initialized.promise.then (function () {
                                                        $assert (A,B,C,D,true) }) },


    /*  $defaults is convenient macro to extract _.defaults thing from init() to definition level
     */
    '$defaults basic': function () {
        var Compo = $component ({ $defaults:           { foo: 42 }})
        $assert ($untag (Compo.$definition.$defaults), { foo: 42 })
        $assert (        Compo.            $defaults,  { foo: 42 })

        var Compo2 = $component ({ $traits: [$trait ({ $defaults: { foo: 11 } })], $defaults: { } })
        $assert ($untag (Compo2.$definition.$defaults), { foo: 11 })
        $assert (        Compo2.            $defaults,  { foo: 11 })
    },

    '$defaults': function () {
        var Trait = $trait ({ $defaults: { pff: 'pff', inner: { fromTrait: 1 } }})
        var Base = $component ({ $defaults: { foo: 12, qux: 'override me', inner: { fromBase: 1 } } })
        var Derived = $extends (Base, {
            $traits: [Trait],
            $defaults: { bar: 34, qux: 'overriden', inner: { fromDerived: 1 } } })
        
        //$assert (Derived.$ownDefaults,
        //               { bar: 34, qux: 'overriden', inner: { fromDerived: 1 } } )

        /* TODO: fix bug not allowing derived to not have $defaults
           var Derived2 = $extends (Derived, {}) */
 
        $assert (new Derived ().inner !== new Derived ().inner) // should clone $defaults at instance construction

        $assertMatches (new Derived ({ pff: 'overriden from cfg' }), { pff: 'overriden from cfg', foo: 12, bar: 34, qux: 'overriden', inner: { fromTrait: 1, fromBase: 1, fromDerived: 1 } }) },


    '$defaults cloning semantics': function () { var set = new Set ([1,2,3])

        var S = $component ({ $defaults: { foo: set,
                                           bar: new Set () } })

        var s = new S ()

        $assert (s.foo instanceof Set,
                 s.bar instanceof Set,
                 true)

        $assert (s.foo !== set)
    },

    /*  Use $requires to specify required config params along with their type signatures
     */
    '$requires': function () {
        var SomeType = $prototype ()
        var CompoThatRequires = $component ({
                                    $requires: {
                                        foo: SomeType,                      // requires foo to be instance of SomeType
                                        ffu: { a: 'number', b: 'string' },  // breakdown test
                                        bar: 'number',
                                        qux: ['number'],
                                        baz: _.not (_.isEmpty) } })         // custom requirement predicate


        var DerivedCompoThatRequiresMore =
            $extends (CompoThatRequires, {
                $requires: { more: 'string' } })


        $assertFails (function () {
            new CompoThatRequires ({ baz: {} }) }) // $requires behaves like assertion in case of failure

        $assertFails (function () {
            new DerivedCompoThatRequiresMore ({ more: 'hey how about other requirements' }) })

        new DerivedCompoThatRequiresMore ({
            foo: new SomeType (),
            bar: 42,
            qux: [1,2,3],
            more: 'blah blah',
            ffu: { a: 1, b: '2' },
            baz: 'blahblah' }) },


    /*  $overrideThis is a macro that requires a method to be overriden
     */
    /*'overrideThis': function () {
        $assertThrows (function () { $singleton (Component, { foo: $overrideThis (function () {}) }) },
            _.matches ({ message: 'foo should be overriden' })) },*/


    /*  $bindable lifts _.bindable to Component level, opening new venues to hooking onto existing impl,
        in ad-hoc way, with no need to specify hard-coded callback structure beforehand.

        Use to implement common beforeXXX and afterXXX semantics.
     */
    '$bindable': function () { $assertEveryCalledOnce (function (method, before, after) {

        var compo = $singleton (Component, {
                        method: $bindable (function (x) { method ()
                            return 42 }) })

        compo.method.onBefore (function (_5) { before ()
            $assert (this === compo)
            $assert (_5, 5) })

        compo.method.onAfter (function (_5, _result) { after ()
            $assert (this === compo)
            $assert (_5, 5)
            $assert (_result, 42) })

        $assert (compo.method (5), 42) }) },


    /*  Trigger has many names in outer world, like Event, Signal (and legion of
        many other misleading buzzwords).

        In our implementation, Trigger is a partial case of 'stream' concept, which
        is a highly abstract functional I/O primitive for multicasting of data/events).
        See dynamic/stream.js for its amazingly simple implementation.

            1.  If called with some value arguments (or no argument), it performs
                multicast of these arguments to all bound listeners (readers).
                In terms of 'streams' that operation is called 'write'.

            2.  If called with function argument, it adds that function to the wait
                queue mentioned before. In terms of 'streams' it is called 'read'.

        Component manages those streams (defined by $-syntax at its prototype definition),
        auto-disconnecting bound methods, so that no method of Component bound
        to such streams will ever be called after destroy().
     */
    '$trigger': function () { $assertEveryCalled (function (mkay__2) {
        
        var compo = $singleton (Component, {
                        mouseMoved: $trigger () })

        compo.mouseMoved (function (x, y) { $assert ([x, y], [7, 12]); mkay__2 () })
        compo.mouseMoved (7, 12)
        compo.mouseMoved (7, 12) }) },

    'init streams from config': function () { $assertEveryCalled (function (atDefinition, atInit) {

        var Compo = $component ({
                        mouseMoved: $trigger (atDefinition),
                        init: function () {
                            this.mouseMoved () } })

        new Compo ({ mouseMoved: atInit }) }) },

    /*  A variation of trigger. On 'write' operation, it flushes wait queue, so
        no callback bound previously gets called in future (until explicitly
        queued again by 'read' operation).
     */
    '$triggerOnce': function () {
        var compo = $singleton (Component, {
                        somthingHappened: $triggerOnce () })

        $assertEveryCalled (function (first, second) {
            compo.somthingHappened (function (what) { $assert (what, 'somthin'); first () })
            compo.somthingHappened (function (what) { $assert (what, 'somthin'); second () })
            compo.somthingHappened ('somthin') }) },


    /*  Another variation of stream, having 'memory fence / memory barrier' semantics,
        widely known as synchronization primitive in concurrent programming.

            1.  At first, barrier is in closed state, putting any callback passed to it
                to a queue.

            2.  When barrier is called with value argument, it state changes to 'opened',
                triggering all queued callbacks with that value argument passed in.

            3.  After barrier had opened, any futher callback gets called immediately
                with that value argument passed before, i.e. short-circuits.
     */
    '$barrier': function () { $assertEveryCalled (function (early, lately) {
        
        var compo = $singleton (Component, {
                        hasMessage: $barrier () })

        compo.hasMessage (function (_msg) { $assert (_msg, 'mkay'); early () })
        compo.hasMessage ('mkay')
        compo.hasMessage (function (_msg) { $assert (_msg, 'mkay'); lately () }) }) },


    /*  $observableProperty is a powerful compound mechanism for data-driven dynamic
        code binding, built around streams described previously.
     */
    '$observableProperty': function () { $assertEveryCalled (function (
                                            fromConstructor,
                                            fromConfig,
                                            fromLateBoundListener,
                                            fromDefinition,
                                            fromListenerOnlyVariant) {

        var Compo = $component ({
                        color: $observableProperty (),
                        smell: $observableProperty (),
                        shape: $observableProperty ('round', function (now) { $assert (now, 'round'); fromDefinition () }),
                        size:  $observableProperty (function (x) { $assert (x, 42); fromListenerOnlyVariant () }),
                        init: function () {
                            this.colorChange (function (now, was) { if (was) { fromConstructor ()
                                $assert ([now, was], ['green', 'blue']) } }) } })

        var compo = new Compo ({
            color: 'blue',
            size: 42,
            colorChange: function (now, was) { if (was) {   fromConfig ()
                                                            $assert ([now, was], ['green', 'blue']) } } })

        //console.log (compo.constructor.$definition)

        compo.smellChange (function (now, was) { fromLateBoundListener ()
            $assert (compo.smell, now, 'bad')
            $assert (undefined,   was) })

        compo.color = 'green'
        compo.smell = 'bad' }) },


    /*  $observableProperty automatically calls prototype constructor if supplied with non-prototype instance data
     */
    '$observableProperty (Prototype)': function () {
        var Compo = $component ({
                        position: $observableProperty (Vec2.zero),
                        init: function () {
                            this.positionChange (function (v) {
                                $assertTypeMatches (v, Vec2)
                                $assert (v.y, 42) }) } })

        var compo = new Compo ({ position: { x: 10, y: 42 }}) // supply POD value from constructor
        compo.position = { x: 20, y: 42 } },                  // supply POD value from property accessor

    'binding to streams with traits': function () {

        Meta.globalTag ('dummy')

        $assertEveryCalled (function (mkay1, mkay2) { var this_ = undefined

            var Trait = $trait ({
                somethingHappened: $trigger () })

            var Other = $trait ({
                somethingHappened: $dummy (function (_42) { $assert (this, this_); $assert (_42, 42); mkay1 () }) })

            var Compo = $component ({
                $traits: [Trait, Other],
                somethingHappened: function (_42) { $assert (this, this_); $assert (_42, 42); mkay2 () } })

            this_ = new Compo ()
            this_.somethingHappened (42) }) },

    'binding to bindables with traits': function () {

        $assertCallOrder (function (beforeCalled, interceptCalled, bindableCalled, afterCalled) { var this_ = undefined

            var Trait = $trait ({
                doSomething: $bindable (function (x) { $assert (this, this_); bindableCalled () }) })

            var Other = $trait ({
                beforeDoSomething: function (_42) { $assert (this, this_); $assert (_42, 42); beforeCalled () },
                interceptDoSomething: function (_42, impl) { interceptCalled (); $assert (this, this_); return impl (_42) } })

            var Compo = $component ({
                $traits: [Trait, Other],
                afterDoSomething: function (_42) { $assert (this, this_); $assert (_42, 42); afterCalled () } })

            this_ = new Compo ()
            this_.doSomething (42) }) },

    'binding to observable properties with traits': function () {

        $assertEveryCalled (function (one, two) { var this_ = undefined

            var Trait = $trait ({
                someValue: $observableProperty (42) })

            var Other = $trait ({
                someValue: function (_42) { one () } })

            var Compo = $component ({
                $traits: [Trait, Other],
                someValue: function (_42) { two () } })

            this_ = new Compo ()

            $assert (_.isFunction (this_.someValueChange))

            this_.someValue = 33 }) },

    'hierarchy management': function () { $assertEveryCalled (function (mkay__9) {
        
        var Compo = $extends (Component, {
            init:    function () { mkay__9 () },
            destroy: function () { mkay__9 () } })

        var parent = new Compo ().attach (
                        new Compo ().attach (
                            new Compo ()))

        var parrot = new Compo ()
                        .attachTo (parent)
                        .attachTo (parent)

        $assert (parrot.attachedTo === parent)
        $assert (parrot.detach ().attachedTo === undefined)

        var carrot = new Compo ()
        parent.attach (carrot)
        parent.attach (carrot)

        parent.destroy () })},

    'thiscall for streams': function () {
        
        var compo = $singleton (Component, {
            trig: $trigger () })

        compo.trig (function () {
            $assert (this === compo) })

        compo.trig.call ({}) },

    '$defaults can set $observableProperty': function () {

        var compo = $singleton (Component, {
            twentyFour: $observableProperty (42),
            $defaults: { twentyFour: 24 } })

        $assertEveryCalledOnce (function (mkay) {
            compo.twentyFourChange (function (val) { $assert (val, 24); mkay (); }) }) },

    'defer init with $defaults': function () {
        var compo = $singleton (Component, {
            $defaults: { init: false },
            init: function () { } })

        compo.init () },

    'stream members should be available at property setters when inited from config': function () {
        var compo = new ($component ({
            ready: $barrier (),
            value: $property ({
                set: function (_42) { $assertTypeMatches (this.ready, 'function') } }) })) ({ value: 42 }) },

    'observableProperty.force (regression)': function () { $assertEveryCalled (function (mkay__2) {
        
        var compo = $singleton (Component, {
            prop: $observableProperty () })

        compo.prop = 42
        compo.propChange (function (value) {
            $assert (value, 42)
            $assert (this === compo)
            mkay__2 () })

        compo.propChange.force () }) },

    'two-argument $observableProperty syntax': function () {

        $assertEveryCalled (function (mkay) {
            var compo = $singleton (Component, {
                                        prop: $observableProperty (42, function (value) { mkay ()
                                            if (compo) {
                                                $assert (this  === compo)
                                                $assert (value === compo.prop) } }) })
                compo.prop = 43 }) },

    'two-argument $observable': function () {

        $assertEveryCalled (function (mkay) {
            $assert ('foo', $singleton (Component, {
                foo: $observable ('foo', function (x) { $assert (x, 'foo'); mkay () }) }).foo.value)
        })
    },

    'destroyAll()': function () { $assertEveryCalled (function (destroyed__2) {
        
        var Compo = $extends (Component, {
            destroy: function () { destroyed__2 () } })

        var parent = new Compo ()
                        .attach (new Compo ())
                        .attach (new Compo ())

        $assert (parent.attached.length === 2)

        parent.destroyAll ()
        parent.destroyAll ()

        $assert (parent.attached.length === 0) })},

    '$macroTags for component-specific macros': function () {

        var Trait =    $trait ({   $macroTags: {
                                        add_2: function (def, fn, name) {
                                            return Meta.modify (fn, function (fn) {
                                                return fn.then (_.sum.$ (2)) }) } } })

        var Base = $component ({   $macroTags: {
                                        add_20: function (def, fn, name) {
                                            return Meta.modify (fn, function (fn) {
                                                return fn.then (_.sum.$ (20)) }) } } })

        var Compo = $extends (Base, {
            $traits: [Trait],
            $macroTags: { dummy: function () {} },

             testValue: $static ($add_2 ($add_20 (_.constant (20)))) })

        $assert (42, Compo.testValue ())
        $assertMatches (_.keys (Compo.$macroTags), ['dummy', 'add_2', 'add_20'])

        _.each (_.keys (Compo.$macroTags), function (name) { delete $global['$' + name] }) },

    '$raw for performance-critical methods (disables thiscall proxy)': function () {

        var compo = new ($component ({
            method:          function (this_) { $assert (this_ === this) },
            rawMethod: $raw (function (this_) { $assert (this_ !== this) }) }))

        var    method = compo.   method;    method (compo)
        var rawMethod = compo.rawMethod; rawMethod (compo) },

    'two-way $observable binding': function () {

        var Compo = $component ({ x: $observable ('foo') })
        var x = _.observable ('bar')

        var compo = new Compo ({ x: x })

        $assert (compo.x !== x)
        $assert (compo.x.value, x.value, 'bar')

        compo.x (42); $assert (x.value, 42)
        x ('lol'); $assert (compo.x.value, 'lol')

    /*  Test unbinding    */

        compo.destroy ()

        $assert (compo.x.queue, [])

        compo.x ('yo'); $assert (x.value, 'lol') // shouldnt change
        x ('oy'); $assert (compo.x.value, 'yo')  // shouldnt change
    },

    'member order' () {

        var X = $component ({

            $depends: [
                $trait ({ foo_1 () {} }),
                $trait ({ foo_2 () {} })
            ],

            foo_3 () {}
        })

        $assert (_.filter (_.keys (X.prototype), k => k.startsWith ('foo')),

                ['foo_1',
                 'foo_2',
                 'foo_3'])
    },

    /*  $alias (TODO: fix bugs)
     */
    /*'$alias': function () { var value = 41

        var compo = $singleton (Component, {

            foo: function () { return ++value },
            bar: $bindable ($alias ('foo')),
            baz: $memoize  ($alias ('bar')) })

        $assertEveryCalled (function (mkay) { compo.bar.onBefore (mkay)
            $assert (compo.baz (),
                     compo.baz (), 42) }) },*/

    /*  Auto-unbinding
     */
    'unbinding (simple)': function () {
        var somethingHappened = _.trigger ()
        var compo = $singleton (Component, { fail: function () { $fail } })

        somethingHappened (compo.fail)
        compo.destroy ()
        somethingHappened () }, // should not invoke compo.fail


    '(regression) undefined was allowed as trait': function () {
        $assertThrows (function () {
            var Compo = $component ({ $traits: [undefined] }) }, { message: 'invalid $traits value' }) },

    '(regression) undefined members fail': function () {
        var Compo = $component ({ yoba: undefined })
        $assert ('yoba' in Compo.prototype) },

    '(regression) $defaults with $traits fail': function () {
        var Compo = $component ({ $traits: [$trait ({ $defaults: { x: 1 }})], $defaults: { a: {}, b: [], c: 0 } })
        $assert (Compo.$defaults, { x: 1, a: {}, b: [], c: 0 }) },

    '(regression) $defaults with $traits fail #2': function () {
        var Compo = $component ({ $traits: [$trait ({ $defaults: { x: 1 }})] })
        $assert (Compo.$defaults, { x: 1 }) },

    '(regression) method overriding broken': function () {
        var Compo = $component ({ method: function () { $fail } })
        var compo = new Compo ({ value: 42, method: function () { return this.value } })
        $assert (compo.method (), 42) },

    '(regression) $observableProperty (false)': function () {
        $assertEveryCalledOnce (function (mkay) {
            $singleton (Component, {
                foo: $observableProperty (false),
                init: function () { this.fooChange (mkay) } }) }) },

    '(regression) was not able to define inner compos at singleton compos': function () {
        var Foo = $singleton (Component, {
            InnerCompo: $component ({
                foo: $observableProperty () }) })

        var Bar = $extends (Foo.InnerCompo, { bar: $observableProperty () })
        var bar = new Bar ()

        $assertTypeMatches (bar, { fooChange: 'function', barChange: 'function' }) },

    /*'(regression) postpone': function (testDone) { $assertEveryCalledOnce ($async (function (foo) {
        $singleton (Component, {
            foo: function () { foo (); },
            init: function () { this.foo.postpone () } }) }), testDone) },*/

    '(regression) undefined at definition': function () { $singleton (Component, { fail: undefined }) },

    '(regression) properties were evaluated before init': function () {
        $singleton (Component, {
            fail: $property (function () { $fail }) }) },

    '(regression) misinterpretation of definition': function () {
        $singleton (Component, { get: function () { $fail } }) },

    '(regression) alias incorrectly worked with destroy': function () {
            var test = $singleton (Component, {
                destroy: function () { mkay () },
                close: $alias ('destroy') })

            $assert (test.close, test.destroy) },

    '(regression) pollution of stream listeners': function () {

        var A = $trait ({ something: $bindable (function (x) { }) })
        var B = $trait ({ afterSomething (x) { $assert (false) }})

        var Y = $singleton (Component, { $depends: [A, B] })

        var Z = $singleton (Component, { $depends: [A] })

        Z.something ()
    },
}

/*  General syntax
 */
$global.$component = function (definition) {
                        return $extends (Component, definition) }

_([ 'extendable', 'trigger', 'triggerOnce', 'barrier', 'bindable', 'memoize', 'interlocked',
    'memoizeCPS', 'debounce', 'throttle', 'overrideThis', 'listener', 'postpones', 'reference', 'raw', 'binds', 'observes'])
    .each (Meta.globalTag)

;(function () {

    var impl = function (tag, a, b) {

        if (arguments.length < 3) {

            const listener = $untag (a)

            return _.isFunction (listener)
                        ? Meta.setTag (tag, listener)       // $observableProperty (listener)
                        : Meta.setTag (tag, true, a)        // $observableProperty (value)

        } else {

            const listener = $untag (b)

            return Meta.setTag (tag, _.isFunction (listener) ? listener : true, a) // $observableProperty (value, listener)
        }
    }

    Meta.globalTag ('observableProperty', impl) 
    Meta.globalTag ('observable',         impl)

}) ();

$global.$observableRef = function (x) { return $observableProperty ($reference (x)) }

$prototype.macro ('$depends', function  (def, value, name) {
                                       (def.$depends = $builtin ($const (_.coerceToArray (value))))
                                 return def })

$prototype.macroTag ('extendable',
            function (def, value, name) {
                      def[name] = $builtin ($const (value))
               return def })

$global.Component = $prototype ({

    $defaults:  $extendable ({}),
    $requires:  $extendable ({}),
    $macroTags: $extendable ({}),

    /*  Overrides default OOP.js implementation
     */
    $impl: {

        sequence: function (def, base) { return _.sequence (
            this.convertPropertyAccessors,
            this.extendWithTags,
            this.flatten,
            this.generateCustomCompilerImpl (base),
            this.ensureFinalContracts (base),
            this.generateConstructor (base),
            this.evalAlwaysTriggeredMacros (base),
            this.evalMemberTriggeredMacros (base),
            this.expandTraitsDependencies,
            this.mergeExtendables (base),
            this.contributeTraits (base),
            this.mergeStreams,
            this.mergeBindables,
            this.generateBuiltInMembers (base),
            this.callStaticConstructor,
            this.expandAliases,
            this.groupMembersByTagForFastEnumeration,
            this.defineStaticMembers,
            this.defineInstanceMembers) },

        expandTraitsDependencies: function (def) {

                if (_.isNonempty ($untag (def.$depends)) &&
                    _.isEmpty    ($untag (def.$traits))) {
                                          def.$traits = DAG.sortedSubgraphOf (def, {
                                                                nodes: function (def) {
                                                                    return $untag (def.$depends) } }) }; return def },

        mergeExtendables: function (base) { return function (def) {

                _.each (base.$definition, function (value, name) {
                    if ($extendable.is (value)) {
                        def[name] = Meta.modify (                       value,
                                        function (                      value) {
                                                                        value =    _.extendedDeep (value, $untag (def[name] || {}))
                                    _.each ($untag (def.$traits),
                                                function (trait) { if (!trait) {    log.e (def.$traits)
                                                                                    throw new Error ('invalid $traits value') }
                                                      var traitVal = trait.$definition [name]
                                                      if (traitVal) {   value =   _.extendedDeep ($untag (traitVal), value) } })
                                                               return   value }) } }); 
               return def } },

        mergeTraitsMembers: function (def, traits) {

            var newDef = {} // clone to re-add members in correct order (traits first)

            var pool = {}, bindables = {}, streams = {}

            var macroTags = $untag (def.$macroTags)
            var definitions = _.pluck (traits, '$definition').concat (_.clone (def))

            _.each (definitions, function (traitDef) {
                _.each ((macroTags && this.applyMacroTags (macroTags,
                                                _.extend (_.clone (traitDef), {
                                                    constructor: def.constructor }))) || traitDef,
                    function (member, name) {
                        if ($builtin.isNot (member) &&
                            $builtin.isNot (def[name]) && (name !== 'constructor')) {

                            if ($bindable.is (member))                  { bindables[name] = member }
                            if (Component.isStreamDefinition (member))  {   streams[name] = member }
                            (pool[name] || (pool[name] = [])).push (member); newDef[name] = member } }) }, this)

            def.__bindables     = bindables
            def.__streams       = streams
            def.__membersByName = pool

        /*  Re-add members in correct order */
        
            for (const k of Object.keys (newDef)) {
                delete def[k]
            }

            for (const k of Object.keys (newDef)) {
                def[k] = newDef[k]
            }
        },

        mergeStreams: function (def) { var pool = def.__membersByName

            _.each (def.__streams, function (stream, name) {

                    var clonedStream = def[name] = Meta.new (stream)
                        clonedStream.listeners = []

                    _.each (pool[name], function (member) {
                                            if (member !== stream) {
                                                clonedStream.listeners.push ($untag (member)) } }) }); return def },

        mergeBindables: function (def) { var pool = def.__membersByName

            _.each (def.__bindables, (member, name) => {

                var bound = _.filter2 (_.bindable.hooks, function (hook, i) {
                                                            var bound = pool[_.bindable.hooksShort[i] + name.capitalized]
                                                            return bound ? [hook, bound] : false })

                if (bound.length) { var hooks = {}

                    _.each (bound, function (kv) {
                        _.each (kv[1], function (fn) { fn = $untag (fn)
                            if (_.isFunction (fn)) { var k = '_' + kv[0]; (hooks[k] || (hooks[k] = [])).push (fn) } }) })

                    def[name] = $bindable ({ hooks: hooks }, member)            
                }
            })

            return def
        }
    },


    /*  Syntax helper
     */
    isStreamDefinition: $static (function (def) {

        const tags = Meta.tags (def)

        return tags.trigger || tags.triggerOnce || tags.barrier || tags.observable || tags.observableProperty }),
    

    /*  Another helper (it was needed because _.methods actually evaluate $property values while enumerating keys,
        and it ruins most of application code, because it happens before Component is actually created).
     */
    mapMethods: function (/* [predicate, ] iterator */) { var iterator  = _.last (arguments),
                                                               predicate = (arguments.length === 1 ? _.constant (true) : arguments[0])
        var methods = []
        for (var k in this) {
            var def = this.constructor.$definition[k]
            if ($property.isNot (def)) { var fn = this[k]
                if (_.isFunction (fn) && !_.isPrototypeConstructor (fn) && predicate (def))  {
                    this[k] = iterator.call (this, fn, k, def) || fn } } } },

    enumMethods: function (_1, _2) {
        if (arguments.length === 2) { this.mapMethods (_1, _2.returns (undefined)) }
                               else { this.mapMethods (    _1.returns (undefined)) } },


    /*  Thou shall not override this
     */
    constructor: $final (function (arg1, arg2) {

        this.parent_ = undefined
        this.children_ = []

        var cfg                 = this.cfg = ((typeof arg1 === 'object') ? arg1 : {}),
            componentDefinition = this.constructor.$definition


        /*  Apply $defaults
         */
        if (this.constructor.$defaults) {
            cfg = this.cfg = _.extend (_.cloneDeep (this.constructor.$defaults), cfg) }


        /*  Add thiscall semantics to methods
         */
        this.mapMethods (function (fn, name, def) {
            if ((name !== '$') && (name !== 'init') && $raw.isNot (def)) { return this.$ (fn) }
        })


        /*  Listen self destroy method
         */
        _.onBefore  (this, 'destroy', this._beforeDestroy)
        _.onAfter   (this, 'destroy', this._afterDestroy)


        var initialStreamListeners = []
        var excludeFromCfg = { init: true }


        /*  Expand macros
            TODO: execute this substitution at $prototype code-gen level, not at instance level
         */
        _.each (componentDefinition, function (def, name) { if (def !== undefined) {

            const member = Meta.unwrap (def)
            const tags   = Meta.tags (def)

            /*  Expand $observableProperty
                TODO: rewrite with $prototype.macro
             */
            if (tags.observableProperty) {  var definitionValue = member
                                            var defaultValue = (name in cfg) ? cfg[name] : definitionValue
                                            var streamName   = name + 'Change'

                /*  xxxChange stream
                 */
                var observable           = excludeFromCfg[streamName] = this[streamName] = _.observable ()
                    observable.context   = this
                    observable.postpones = tags.postpones

                /*  auto-coercion of incoming values to prototype instance
                 */
                if (_.isPrototypeInstance (definitionValue)) { var constructor = definitionValue.constructor
                    observable.beforeWrite = function (value) {
                        return constructor.isTypeOf (value) ? value : (new constructor (value)) } }

                /*  tracking by reference
                 */
                if (tags.reference) {
                    observable.trackReference = true }


                /*  property
                 */
                _.defineProperty (this, name, {
                        get: function ()  { return observable.value },
                        set: function (x) { observable.write.call (this, x) } })

                /*  Default listeners (come from traits)
                 */
                if (def.listeners) {
                    _.each (def.listeners, function (value) {
                        initialStreamListeners.push ([observable, value]) }) }

                /*  Default listener which comes from $observableProperty (defValue, defListener) syntax
                 */
                if (_.isFunction (tags.observableProperty)) {
                      initialStreamListeners.push ([observable, tags.observableProperty]) }

                /*  write default value
                 */
                if (defaultValue !== undefined) {
                    observable (defaultValue) } }

            /*  Expand streams
             */
            else if (Component.isStreamDefinition (def)) {
                var stream = excludeFromCfg[name] = this[name] = _.extend (
                                (tags.trigger       ? _.trigger :
                                (tags.triggerOnce   ? _.triggerOnce :
                                (tags.observable    ? _.observable :
                                (tags.barrier       ? _.barrier : undefined)))) (member), { context: this, postpones: tags.postpones })

                /*  tracking by reference
                 */
                if (tags.reference) {
                    observable.trackReference = true }

                if (def.listeners) {
                    _.each (def.listeners, function (value) {
                        initialStreamListeners.push ([stream, value]) }) }

                /*  Default listener which comes from $observable (defValue, defListener) syntax
                 */
                if (_.isFunction (tags.observable)) {
                      initialStreamListeners.push ([stream, tags.observable]) }

                var defaultListener = cfg[name]                
                if (defaultListener) {
                    if (tags.observable && defaultListener.isObservable) { // two-way observable binding
                        defaultListener.tie (stream) }
                    else {
                        initialStreamListeners.push ([stream, defaultListener]) } } }

            /*  Expand $listener (TODO: REMOVE)
             */
            if (tags.listener) {
                this[name].queuedBy = [] }

            /*  Expand $interlocked
             */
            if (tags.interlocked) {
                this[name] = _.interlocked (this[name]) }

            /*  Expand $bindable
             */
            if (tags.bindable) {
                this[name] = _.extend (_.bindable (this[name], this),
                                       _.map2 (tags.bindable.hooks || {}, hooks => _.map (hooks, f => this.$ (f)))) }
            /*  Expand $debounce
             */
            if (tags.debounce) { var fn = this[name], opts = _.coerceToObject (tags.debounce)
                this[name] = fn.debounced (opts.wait || 500, opts.immediate) }

            /*  Expand $throttle
             */
            if (tags.throttle) { var fn = this[name], opts = _.coerceToObject (tags.throttle)
                this[name] = _.throttle (fn, opts.wait || 500, opts) }

            /*  Expand $memoize
             */
                 if (tags.memoize) {
                this[name] = _.memoize (this[name]) }
            else if (tags.memoizeCPS) {
                this[name] = _.cps.memoize (this[name]) } } }, this)

        /*  Add before/after stage to init
         */
        var init  = this.init
                    this.init = this._beforeInit
                                     .then (init
                                     .then (this._afterInit)).bind (this)

        /*  Apply cfg thing
         */
        _.each (cfg, function (value, name) {
            if (!(name in excludeFromCfg)) {
                this[name] = _.isFunction (value) ? this.$ (value) : value } }, this)


        /*  Fixup aliases (they're now pointing to nothing probably, considering what we've done at this point)
         */
        _.each (componentDefinition, function (def, name) {
            if ($alias.is (def) && $raw.isNot (def)) {
                this[name] = this[$untag (def)] } }, this)


        /*  Check $overrideThis
         */
        /*_.each (componentDefinition, function (def, name) {
            if (def.$overrideThis && this[name] === undefined) {
                throw new Error (name + ' should be overriden') } })*/


        /*  Check $requires (TODO: make human-readable error reporting)
         */
        if (_.hasAsserts) {
            _.each (this.constructor.$requires, function (contract, name) {
                $assertTypeMatches (_.fromPairs ([[name, this[name]]]),
                                    _.fromPairs ([[name, contract]])) }, this) }


        /*  Subscribe default listeners
         */
        _.each (initialStreamListeners, function (v) { v[0].call (this, v[1]) }, this)


        /*  Call init (if not marked as deferred)
         */
        if (!(cfg.init === false || (this.constructor.$defaults && (this.constructor.$defaults.init === false)))) {
            var result = this.init ()
            if (result instanceof Promise) {
                result.panic } } }),

    /*  Arranges methods defined in $traits in chains and evals them
     */
    methodChain (name, { reverse = false, until = () => false } = {}) {

        const methods = _.filter2 (this.constructor.$traits || [], Trait => {
                                                            const method = Trait.prototype[name]
                                                            return (method && method.bind (this)) || false })

        return (...args) => __.each (reverse ? methods.reverse () : methods, (fn, i, break_) => (

            __.then (fn (...args), returnValue => {

                if (until (returnValue)) {
                    break_ ()
                }
            })
        ))
    },

    /*  LEGACY
        TODO: find why methodChain () does not work as a replacement    */

    callChainMethod: function (name) { var self = this

        //console.log ('callChainMethod', this.constructor.$meta.name, name)

        const methods = _.filter2 (this.constructor.$traits || [], function (Trait) {

                                                                        var method = Trait.prototype[name]

                                                                        // if (method) {
                                                                        //     return (...args) => {
                                                                        //         console.log ('Calling', Trait.$meta.name, name)
                                                                        //         return method.call (self, ...args)
                                                                        //     }
                                                                        // }

                                                                        return (method && method.bind (self)) || false })

        return __.seq (methods) },



    /*  Lifecycle
     */
    _beforeInit: function () {
        if (this.initialized.already) {
            throw new Error ('Component: I am already initialized. Probably you\'re doing it wrong.') }

        return this.callChainMethod ('beforeInit') },

    init: function () { /* return Promise for asynchronous init */ },

    _afterInit: function () { var cfg  = this.cfg,
                                  self = this

        return __.then (this.callChainMethod.$ ('afterInit'), function () {

                        self.initialized (true)
                        self.alive (true)

                        /*  Bind default property listeners. Doing this after init, because property listeners
                            get called immediately after bind (observable semantics), and we're want to make
                            sure that component is initialized at the moment of call.

                            We do not do this for other streams, as their execution is up to component logic,
                            and they're might get called at init, so their default values get bound before init.
                         */
                        _.each (self.constructor.$definition, function (def, name) {
                            if ($observableProperty.is (def)) {
                                name += 'Change'
                                var defaultListener = cfg[name]
                                if (defaultListener) {
                                    self[name] (defaultListener) } } })

                        return true }) },
    
    initialized: $barrier (),
    alive:       $observable (false),

    _beforeDestroy: function () {
        if (this.destroyed_) {
            throw new Error ('Component: I am already destroyed. Probably you\'re doing it wrong.') }
        if (this.destroying_) {
            throw new Error ('Component: Recursive destroy() call detected. Probably you\'re doing it wrong.') }
            this.destroying_ = true

        _.each (this.constructor.$traits, function (Trait) {
            if (Trait.prototype.beforeDestroy) {
                Trait.prototype.beforeDestroy.call (this) } }, this)

        this.alive (false)

        /*  Unbind streams
         */
        this.enumMethods (_.off.arity1)

        /*  Destroy children
         */
        _.each (this.children_, _.method ('destroy'))
                this.children_ = [] },

    destroy: function () {},

    _afterDestroy: function () {

        _.each (this.constructor.$traits, function (Trait) {
            if (Trait.prototype.destroy) {
                Trait.prototype.destroy.call (this) }
            if (Trait.prototype.afterDestroy) {
                Trait.prototype.afterDestroy.call (this) } }, this)

        delete this.destroying_
        this.parent_ = undefined
        this.destroyed_ = true },


    /*  Parent manip.
     */ 
    attachedTo: $property (function () {
                            return this.parent_ }),

    attachTo: function (p) {
                    if (p === this) {
                        throw new Error ('smells like time-travel paradox.. how else can I be parent of myself?') }

                    if (this.parent_ !== p) {
                        if ((this.parent_) !== undefined) {
                            this.parent_.children_.remove (this) }
                            
                        if ((this.parent_ = p) !== undefined) {
                            this.parent_.children_.push (this) }} return this },

    detach: function () {
                return this.attachTo (undefined) },

    /*  Child manip.
     */
    attached: $property (function () {
                            return this.children_ }),

    attach: function (c) {
                _.invoke (_.coerceToArray (c), 'attachTo', this); return this },

    detachAll: function () {
                    _.each (this.children_, function (c) { c.parent_ = undefined })
                            this.children_ = []
                            return this },

    destroyAll: function () {
                    _.each (this.children_, function (c) { c.parent_ = undefined; c.destroy () })
                            this.children_ = []
                            return this } })

