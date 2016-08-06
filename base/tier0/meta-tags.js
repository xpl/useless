"use strict";

const O = Object

/*  For checking whether the module is available
    ======================================================================== */

_.hasTags = true


/*  Unit test / spec
    ======================================================================== */

_.withTest ('meta-tags', function () {

/*  This is how you define tags     */

    Tags.define ('foo')
    Tags.define ('bar')
    Tags.define ('qux')

    $assert (Tags.isDefined ('foo'))
    $assert ($foo instanceof Function)

/*  Tags produce objects containing them as boolean flags. You can tag anything.
    Order doesn't matter, redundancy is legal.   */

    $assert ($foo (42).$foo,    true)
    $assert ($bar (null).$bar,  true)
    $assert ($foo (42).$bar,    undefined)
    $assert ($foo ($bar (42)),  $bar ($foo ($foo (42))))

/*  Safe way to check for a tag presence is $tag.is method:     */

    $assert ($foo.is ($foo (42)), true)
    $assert ($foo.is ($bar (42)), false)
    $assert ($foo.is (42),        false)

/*  Example of complex object containing tagged fields.     */

    var test = {
        fourtyOne: $bar ($foo (41)),
        fourtyTwo: $foo ($bar (42)),
        notTagged: 40 }

/*  This is how you coerce what-might-be-tagged to actual values:   */

    $assert ($untag (42), Tags.unwrap (42), Tags.unwrap (test.fourtyTwo), 42)
    $assert (Tags.unwrapAll (test), { fourtyTwo: 42, fourtyOne: 41, notTagged: 40 })

/*  Tags have .matches property, which is a predicate to test objects for those tags.   */

    $assert ($foo.matches ($foo ()))
    $assert ($foo.matches (test.fourtyOne))
    $assert ($foo.matches (42) === false)

/*  These predicates could be combined to produce complex test (a generic feature of Function provided by common.js)    */

    $assert ({ fourtyOne: 41, fourtyTwo: 42 },  Tags.unwrapAll (_.pick (test, _.and ($foo.matches, $bar.matches))))
    $assert ({ notTagged: 40 },                 Tags.unwrapAll (_.omit (test, $foo.matches)))

/*  You can replace value that might be tagged, i.e. $foo($bar(x)) → $foo($bar(y))  */

    $assert (43,                Tags.modify (42,         function (subject) { return subject + 1 })) // not tagged
    $assert ($foo (43),         Tags.modify ($foo (42),  _.constant (43)))
    $assert ($foo ($bar (43)),  Tags.modify ($foo (42),  function (subject) { return $bar (subject + 1) }))

/*  Low-level way of tags addition, for run-time shit.  */

    $assert (Tags.add ('qux', 42).$qux)
    $assert (Tags.add ('qux', test.fourtyTwo).$qux)

/*  Wrapping nothing is now legal   */

    $assert (Tags.hasSubject ($foo ()),   false)
    $assert (Tags.hasSubject ($foo (42)), true)

/*  Map over tagged values:     */

    $assert (     $qux ([8, 9, $foo ($bar (10))]),
        Tags.map ($qux ([1, 2, $foo ($bar (3))]), _.sums (7)))

/*  Enumerating tags with Tags.each (obj, iter)     */

    $assertMatches (['foo', 'bar', 'qux'], _.arr (function (iter) { Tags.each (test.fourtyTwo, iter) }))

/*  Tagging with non-boolean data   */

    $assert ($foo ({ some: 'params' }, 42).$foo, { some: 'params' })

/*  'Extend' algebra    */

    $assert (Tags.extend ($foo (7), $bar (8)), $foo ($bar (7)))
    $assert (Tags.extend ($foo (7),       8),  $foo (      7))
    $assert (Tags.extend (      7,  $foo (8)), $foo (      7))
    $assert (Tags.extend (      7,        8),              7)

/*  Tags.omit   */

    $assert (Tags.omit (            7,   '$foo'),          7)
    $assert (Tags.omit ($foo ($bar (7)), '$foo',  '$bar'), 7)
    $assert (Tags.omit ($foo ($bar (7)), '$foo'),  $bar (  7))

/*  String.ify  */

    if (String.ify) {

        $assert (String.ify ({ foo: $constant ($get ({ bar: 7 }, 1)) }),
                            '{ foo: $constant ($get ({ bar: 7 }, 1)) }')
        
        $assert (String.ify ({ foo: $constant ($get ([ 7,
                                                       8  ])) }, { pretty: true }),
                            '{ foo: $constant ($get ([ 7,\n'
                          + '                          8  ])) }')
    }

/*  Cleanup test stuff  */

    ;['$foo', '$bar', '$qux', '$plusOne'].forEach (function (x) { delete $global[x] })
        

/*  IMPLEMENTATION
    ======================================================================== */

}, function () {

/*  Tags object
    ======================================================================== */

    $global.Tags = function (subject, keys) { if (subject !== undefined) { this.subject = subject }
                                              if (keys    !== undefined) { _.extend (this, keys) } }

    Tags.$definition = {} // to make it recognizeable by ES3000


/*  Instance methods (internal API)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    
    O.assign (Tags.prototype, {

        add: function (name, additionalData) {
                    return this['$' + name] = additionalData || true, this },

        clone: function (newSubject) {
                    return O.assign (new Tags (newSubject || this.subject), Tags.get (this)) },

        modify: function (changesFn) {
                            this.subject = changesFn (this.subject)
                            if (this.subject instanceof Tags) {
                                return O.assign (this.subject, Tags.get (this)) }
                            else {
                                return this }},

        extend: function (other) {
                    return (other instanceof Tags) ? O.assign (this, Tags.get (other)) : this } })


/*  Static methods (public API)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    O.assign (Tags, {

        omit: $restArg (function (what, ___) {

            if (what instanceof Tags) {                   var keysToOmit = _.index (_.rest (arguments))
                                                          var keysLeft   = _.pick (what, function (v, k) { return (k[0] === '$') && !(k in keysToOmit) })
                        return (!_.isEmptyObject (            keysLeft)
                                    ? new Tags (what.subject, keysLeft)
                                    :           what.subject) }
            else {
                return what } }),
  
        clone: function (what, newSubject) {
                    return (what instanceof Tags) ? what.clone (newSubject) : (newSubject || what) },

        extend: function (what, other) { return (what instanceof Tags)  ? what.clone ().extend (other) : (
                                                (other instanceof Tags) ? Tags.wrap (what).extend (other) : what) },

        get: function (def) {
                    return ((def instanceof Tags) ? _.pick (def, function (v, k) { return k[0] === '$' }) : {}) },

        each: function (def, accept) {
                    if (def instanceof Tags) { _.each (def, function (v, k) { if (k[0] === '$') { accept (k.slice (1)) } }) } },

        hasSubject: function (def) {
                        return ((def instanceof Tags) && ('subject' in def)) },

        matches: function (name) {
                    return function (obj) { return obj && (obj['$' + name] !== undefined) } },

        unwrapAll: function (definition) {
                        return _.map2 (definition, Tags.unwrap) },

        unwrap: function (what) {
                    return (what instanceof Tags) ? what.subject : what },

        wrap: function (what) {
                    return (what instanceof Tags) ? what : ((arguments.length === 0) ? new Tags () : new Tags (what)) },

        modify: function (what, changesFn) {
                            return (what instanceof Tags) ?
                                        what.clone ().modify (changesFn) : changesFn (what) }, // short circuits if not wrapped

        map: function (obj, op) { return Tags.modify (obj,
                                                function (obj) {
                                                    return _.map2 (obj, function (t, k) {
                                                        return Tags.modify (t, function (v) {
                                                            return op (v, k, (t instanceof Tags) ? t : undefined) }) }) }) },

        add: function (name, toWhat, additionalData) {
                return Tags.wrap.apply (null, _.rest (arguments, 1)).add (name, additionalData) },

        all: new Set (),

        isDefined: function (k) {
                        return Tags.all.has (k) },

        define: function (k, fn) { // fn for additional processing of constructed function

                    Tags.all.add (k)

                    fn = (_.isFunction (fn) && fn) || _.identity

                    var $k = '$' + k

                    $global[$k] = fn (function (a, b) {
                                        if (arguments.length < 2) { return Tags.add (k, a) }       // $tag (value)
                                                             else { return Tags.add (k, b, a) } }) // $tag (params, value)
                    
                    return O.assign ($global[$k], {
                               matches: Tags.matches (k),
                                    is: function (x) { return  ((x instanceof Tags) && ($k in x)) || false },
                                 isNot: function (x) { return !((x instanceof Tags) && ($k in x)) || false },
                                unwrap: function (x) { return  ($atom.matches (x) === true) ? Tags.unwrap (x) : x } }) },
    })

/*  $untag
    ======================================================================== */

    $global.$untag = Tags.unwrap


/*  TODO: move out of this file
    ======================================================================== */

    ;['constant', 'get', 'once', 'async', 'atom'].forEach (Tags.define);

})

/*  Formatting shit
    ======================================================================== */

    if (typeof Symbol !== 'undefined') {

        var bullet = require ('string.bullet')

        Tags.prototype[Symbol.for ('String.ify')] = function (ctx) {

            if (ctx.json) {
                return ctx.goDeeper ($untag (this)) }

            var tags = Tags.get (this)
            var left = _.reduce (tags, function (memo, value, tag) {
                                            return _.isBoolean (value)
                                                ? (tag + ' (' + memo)
                                                : (tag + ' (' + ctx.goDeeper (value, { pretty: false }) + ', ' + memo) }, '')

            return bullet (left, ctx.goDeeper ($untag (this))) + ')'.repeats (_.keys (tags).length)
        }
    }


