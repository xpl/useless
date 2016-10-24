"use strict";

const _ = require ('underscore')

/*  Set extensions
    ======================================================================== */

_.deferTest ('Set extensions', function () {

    var set = new Set ([1,2,3])

    $assert (set.copy !== set)
    $assert (set.asArray, set.copy.asArray, [1,2,3])
    $assert (set.extend   (new Set ([4,5])).asArray, [1,2,3,4,5])
    $assert (set.extended (new Set ([6,7])).asArray, [1,2,3,4,5,6,7])
    $assert (set.asArray, [1,2,3,4,5])

    $assert (_.reject ([7,2,3,8], [2,3].asSet.matches), [7,8])

}, function () {

    $mixin (Array, {

        asSet: $property (function () { return new Set (this) }) })

    $mixin (Set, {

        copy:     $property (function () { return new Set (this) }),
        asArray:  $property (function () { return Array.from (this.values ()) }),

        matches:  $property (function () { var self = this; return function (x) { return self.has (x) } }),

        extend:   function (b) { for (var x of b) { this.add (x) }; return this },
        extended: function (b) { return this.copy.extend (b) } })
})
