/*  Keywords
    ======================================================================== */

_.withTest ('keywords', function () {

    if ($global['$fourtyTwo'] === undefined) { // coz this test called twice during startup

        _.defineKeyword ('fourtyTwo',       42)
        _.defineKeyword ('fourtyTwo_too',   function ()  { return 42 })
        _.defineKeyword ('fourtyTwo_orDie', function (x) { $assert (x == 42); return 42 })

        _.defineTagKeyword ('foo')
        _.defineTagKeyword ('bar')
        _.defineTagKeyword ('qux')

        $assert (_.isTagKeyword ('qux'))

        _.defineModifierKeyword ('plusOne', function (x) { return x + 1 }) }

    $assert (42,
        $fourtyTwo,
        $fourtyTwo_too,
        $fourtyTwo_orDie (42))

    /*  Tags produce objects containing them as boolean flags. You can tag anything.
        Order doesn't matter, redundancy is legal.
     */
    $assert ($foo (42).$foo,    true)
    $assert ($bar (null).$bar,  true)
    $assert ($foo (42).$bar,    undefined)
    $assert ($foo ($bar (42)),  $bar ($foo ($foo (42))))

    /*  Example of complex object containing tagged fields.
     */
    var test = {
        fourtyOne: $bar ($foo (41)),
        fourtyTwo: $foo ($bar (42)),
        notTagged: 40 }

    /*  This is how you coerce what-might-be-tagged to actual values:
     */
    $assert (Tags.unwrap (42), Tags.unwrap (test.fourtyTwo), 42)
    $assert (Tags.unwrapAll (test), { fourtyTwo: 42, fourtyOne: 41, notTagged: 40 })

    /*  Tags have .matches property, which is a predicate to test objects for those tags.
     */
    $assert ($foo.matches ($foo ()))
    $assert ($foo.matches (test.fourtyOne))
    $assert ($foo.matches (42) === false)

    /*  These predicates could be combined to produce complex test (a generic feature of Function provided by common.js)
     */
    $assert ({ fourtyOne: 41, fourtyTwo: 42 },  Tags.unwrapAll (_.pick (test, _.and ($foo.matches, $bar.matches))))
    $assert ({ notTagged: 40 },                 Tags.unwrapAll (_.omit (test, $foo.matches)))

    /*  You can replace value that might be tagged, i.e. $foo($bar(x)) → $foo($bar(y))
     */
    $assert (43,                Tags.modifySubject (42,         function (subject) { return subject + 1 })) // not tagged
    $assert ($foo (43),         Tags.modifySubject ($foo (42),  _.constant (43)))
    $assert ($foo ($bar (43)),  Tags.modifySubject ($foo (42),  function (subject) { return $bar (subject + 1) }))

    /*  Previous mechanism is essential to so-called 'modifier keywords'
     */
    $assert ($plusOne (            41),                 42)
    $assert ($plusOne ($foo ($bar (41))),   $foo ($bar (42)))

    /*  Low-level way of tags addition, for run-time shit.
     */
    $assert (Tags.add ('qux', 42).$qux)
    $assert (Tags.add ('qux', test.fourtyTwo).$qux)

    /*  Wrapping nothing is now legal
     */
    $assert (Tags.hasSubject ($foo ()),   false)
    $assert (Tags.hasSubject ($foo (42)), true)

    /*  Map over tagged values:
     */
    $assert (     $qux ([8, 9, $foo ($bar (10))]),
        Tags.map ($qux ([1, 2, $foo ($bar (3))]), _.sums (7)))

}, function () {

    Tags = _.extend2 (

        function (subject) { if (subject !== undefined) {
                                this.subject = subject } }, {

    $definition: {}, // to make it recognizeable by _.isPrototypeInstance

    prototype: {

        /* instance methods (internal impl)
         */
        add: function (name) {
                return this[_.keyword (name)] = true, this },

        clone: function () {
            return _.extend (new Tags (this.subject), _.pick (this, _.keyIsKeyword)) },

        modifySubject: function (changesFn) {
                            this.subject = changesFn (this.subject)
                            if (_.isTypeOf (Tags, this.subject)) {
                                return _.extend (this.subject, _.pick (this, _.keyIsKeyword)) }
                            else {
                                return this }} },

        /* static methods (actual API)
         */
        get: function (def) {
            return _.isTypeOf (Tags, def) ? _.pick (def, _.keyIsKeyword) : {} },

        hasSubject: function (def) {
                        return (_.isTypeOf (Tags, def) && ('subject' in def)) },

        matches: function (name) {
                    return _.matches (_.object ([[_.keyword (name), true]])) },

        unwrapAll: function (definition) {
                        return _.map2 (definition, Tags.unwrap) },

        unwrap: function (what) {
                    return _.isTypeOf (Tags, what) ? what.subject : what },

        wrap: function (what) {
            return _.isTypeOf (Tags, what) ? what : ((arguments.length === 0) ? new Tags () : new Tags (what)) },

        modifySubject: function (what, changesFn) {
                            return _.isTypeOf (Tags, what) ?
                                        what.clone ().modifySubject (changesFn) : changesFn (what) }, // short circuits if not wrapped

        map: function (obj, op) { return Tags.modifySubject (obj,
                                                function (obj) {
                                                    return _.map2 (obj, function (t, k) {
                                                        return Tags.modifySubject (t, function (v) {
                                                            return op (v, k, _.isTypeOf (Tags, t) ? t : undefined) }) }) }) },

        add: function (name, args) {
                return Tags.wrap.apply (null, _.rest (arguments, 1)).add (name) } })

    _.keyword = function (name) {
                    return '$' + name }

    _.isKeyword = function (key) {
                    return key[0] == '$' }

    _.keywordName = function (x) {
        return _.isKeyword (x) ? x.slice (1) : x }

    _.keywords = function (obj) { return _.pick (obj, _.keyIsKeyword) }

    _.tagKeywords = {}

    _.isTagKeyword = function (k) {
                        return _.keywordName (k) in _.tagKeywords }

    _.keyIsKeyword = function (value, key) {
                        return _.isKeyword (key[0]) }

    _.defineKeyword = function (name, value) {
                        _.defineProperty (_.global (), _.keyword (name), value) }

    _.defineKeyword ('global', _.global)

    _.defineTagKeyword = function (k) {
                            if (!(_.keyword (k) in $global)) { // tag keyword definitions may overlap
                                _.defineKeyword (k, Tags.add ('constant',
                                    _.extend (_.partial (Tags.add, k), { matches: Tags.matches (k) })))
                                _.tagKeywords[k] = true }

                                var kk = _.keyword (k)

                            return _.extend ($global[kk], {
                                        is: function (x) { return  (_.isTypeOf (Tags, x) && kk) || undefined },
                                     isNot: function (x) { return !(_.isTypeOf (Tags, x) && kk) || undefined },
                                    unwrap: function (x) { return  ($atom.matches (x) === true) ? Tags.unwrap (x) : x } }) }


    _(['constant', 'get'])
        .each (_.defineTagKeyword)

    _.defineModifierKeyword = function (name, fn) {
                                _.defineKeyword (name, function (val) {
                                                            return Tags.modifySubject (val, fn) }) }

    _.deleteKeyword = function (name) {
                        delete $global[_.keyword (name)] } } )

