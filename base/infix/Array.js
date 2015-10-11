/*  Array extensions
    ======================================================================== */

_.withTest ('Array extensions', function () {

    var excess = [3,1,2,3,3,4,3]

    $assert (excess.lastIndex, 6)

    $assert (excess.copy, excess)
    $assert (excess.copy !== excess)

    $assert (excess.remove (3), [1,2,4]) // it is fast
    $assert (excess,            [1,2,4]) // and mutates original (thats why fast)
                                         // for immutable version, use underscore's _.without

    $assert (excess.removeAll (),   [])
    $assert (excess,                [])

    $assert (['a','b','c'].removeAt (1),    ['a','c'])      // NOTE: mutates original
    $assert (['a','c'].insertAt ('b', 1),   ['a','b','c'])  // NOTE: mutates original

    $assert ([0,1,2].itemAtWrappedIndex (4) === 1)

         var arr =         [1,2,3]
    $assert (arr.reversed, [3,2,1])
    $assert (arr,          [1,2,3]) // does not mutate original (in contrary to .reverse)
                                        
    $assert ([[1], [[2], 3], 4].flat,         [1, [2], 3, 4])
    $assert ([[1,2,3], [4,5,6]].zip (_.sum),  [5,7,9])
    $assert (_.zap ([1,2,3], [4,5,6], _.sum), [5,7,9])

    $assert (['a','b','c'].swap (1,2), ['a','c','b']) // NOTE: mutates original

    $assert ([1].random === 1) // returns random item from array
    $assert ([].random === undefined)

}, function () {

    $extensionMethods (Array, {

        lastIndex: function (arr) { return arr.length - 1 },

        last: function (arr) { return _.last (arr) },
        
        random: function (arr) {
            return arr[_.random (0, arr.lastIndex)] },

        copy: function (arr) {
            return arr.slice (0) },

        removeAll: $method (function (arr) {
                        return arr.splice (0, arr.length), arr }),

        remove: function (arr, item) {
            var i; while ((i = arr.indexOf (item)) !== -1) {
                arr.splice (i, 1) } return arr },

        removeAt: function (arr, index) {
            arr.splice (index, 1); return arr },

        insertAt: function (arr, item, index) {
            arr.splice (index, 0, item); return arr },

        itemAtWrappedIndex: function (arr, i) {
            return arr[i % arr.length] },

        reversed: function (arr) {
            return arr.slice ().reverse () },

        flat: function (arr) {
            return _.flatten (arr, true) },

        swap: $method (function (arr, indexA, indexB) {
            var a = arr[indexA], b = arr[indexB]
            arr[indexA] = b
            arr[indexB] = a
            return arr }),

        zip: _.zipWith })

    _.zap = function (firstArg) { /* (arg1..argN fn) syntax */
        var zippo = _.last (arguments)
        return _.reduce (_.rest (_.initial (arguments)), function (memo, row) {
                        return _.times (Math.max (memo.length, row.length), function (i) {
                            return zippo (memo[i], row[i]) }) }, firstArg) } })

