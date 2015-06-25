_.deferTest ('regexp helper', function () { var $assertExpr = function (a, b) { $assert (a, _.quote (b.str, '//')) }

    /*  R should be used for code clarity purposes when one needs to generate a
        complex regular expression that is hard to read and maintain.
     */
    $assertExpr ('/[^\\s]*/',        $r.anyOf.except.space.$)
    $assertExpr ('/\\[.*\\]|[\\s]/', $r.anything.inBrackets.or.oneOf.space.$)

    var expr = $r.expr ('before',    $r.anything.text ('$print').something).then (
               $r.expr ('argument',  $r.someOf.except.text (',(')).inParentheses.then (
               $r.expr ('tail',      $r.anything))).$

    /*  Above construction generates the following regular expression
     */
    $assertExpr ('/(.*\\$print.+)\\(([^,\\(]+)\\)(.*)/', expr)

    /*  Main feature: named groups, easily accessible as dictionary elements.
     */
    $assert (expr.parse ( ' var x = $print (blabla) // lalala '),

              {  before:  ' var x = $print ',
               argument:  'blabla',              
                   tail:  ' // lalala ',        })

    /*  Based on Lisp-like list based syntax, for easy programmatic generation and stuff
     */
    $assert ([['[^', '\\s', "\]"], '*'], R.anyOf (R.except (R.space))) },                       function () {

    /*  Implementation
     */
    R = $singleton ({

        constructor: function () {

            this.reduce = _.hyperOperator (_.binary, _.reduce2,
                                            _.goDeeperAlwaysIfPossible,
                                            _.isNonTrivial.and (_.not (this.isSubexpr)))

            this.initDSL () },

        expr: function (expr, subexprs) { subexprs = subexprs || []
                return new R.Expr (R.reduce (expr, '', function (s, memo) {
                                                            if (R.isSubexpr (s)) { subexprs.push (s)
                                                                return memo + R.expr (R.root (s.value), subexprs).str }
                                                            else {
                                                                return memo + s } }), subexprs) },

        Expr: $prototype ({

            constructor: function (str, subexprs) {
                            this.rx = new RegExp ()
                            this.rx.compile (str)
                            this.str = str
                            this.subexprs = subexprs },

            parse: function (str) {
                    var match = str.match (this.rx)
                return (match && _.extend.apply (null,
                                    _.zipWith ([_.rest (match), this.subexprs], function (match, subexpr) {
                                                                                    return _.object ([[ subexpr.name, match ]]) }))) || {} } }),

        metacharacters: $property (_.index ('\\^$.|?*+()[{')),

        escape:       function (s)    { return _.map (s, function (x) { return R.metacharacters[x] ? ('\\' + x) : x }).join ('') },

        text:         $alias ('escape'),

        subexpr:      function (name, s) { return { name: name, value: ['(', s, ')'] } },
     
        maybe:        function (s)    { return [s, '?'] },

        anyOf:        function (s)    { return [s, '*'] },
        someOf:       function (s)    { return [s, '+'] },

        oneOf:        function (s)    { return ['[',  s, ']'] },
        except:       function (s)    { return ['[^', s, ']'] },

        or:           function (a, b) { return [a, '|', b] },

        begin:       $property ('^'),
        end:         $property ('$'),
        space:       $property ('\\s'),
        anything:    $property ('.*'),
        something:   $property ('.+'),
        comma:       $property (','),

        parentheses: function (s) { return ['\\(', s, '\\)'] },
        brackets:    function (s) { return ['\\[', s, '\\]'] },

        isSubexpr: function (s) { return (_.isStrictlyObject (s) && !_.isArray (s)) ? true : false },

        root: function (r) { return (r && r.$$) ? r.$$ : r },

        initDSL: function () {

            _.defineKeyword ( 'r', function ()       { return $$r ([]) })
            _.defineKeyword ('$r', function (cursor) {

                var shift = function (x) { cursor.push (x); return cursor.forward }

                _.defineHiddenProperty (cursor, 'then', function (x)    { cursor.push (R.root (x));                return cursor })
                _.defineHiddenProperty (cursor, 'text', function (x)    { cursor.push (R.text (x));                return cursor })
                _.defineHiddenProperty (cursor, 'expr', function (x, s) { cursor.push (R.subexpr (x, R.root (s))); return cursor })

                _.defineHiddenProperty (cursor, 'forward', function () {
                    return cursor.next || ((cursor.next = $r).prev = cursor).next })

                _.each (['maybe', 'anyOf', 'someOf', 'oneOf', 'except'], function (key) {
                    _.defineHiddenProperty (cursor, key, function () {
                        return shift (R[key] (cursor.forward)) }) })

                _.each (['parentheses', 'brackets'], function (key) {
                    _.defineHiddenProperty (cursor, 'in' + key.capitalized, function () {
                        return (cursor.$$.prev = $$r (R[key] (cursor.$$))) }) })

                _.each (['or'], function (key) {
                    _.defineHiddenProperty (cursor, key, function () { var next = $r
                        return (next.prev = (cursor.$$.prev = $$r (R[key] (cursor.$$, next)))).next = next }) })

                _.each (['begin', 'end', 'space', 'anything', 'something'], function (key) {
                    _.defineHiddenProperty (cursor, key, function () {
                        return shift ([R[key], cursor.forward]); }) })

                _.defineHiddenProperty (cursor, '$$', function () { var root = cursor
                    while (root.prev) { root = root.prev }
                    return root })

                _.defineHiddenProperty (cursor, '$', function () {
                    return R.expr (cursor.$$) })

                return cursor }) } }) })