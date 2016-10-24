"use strict";

const _ = require ('underscore')

$global.R = $singleton ({

    $test () {

        var $assertExpr = function (a, b) { $assert (a, _.quote (b.str, '//')) }

        /*  R should be used for code clarity purposes when one needs to generate a
            complex regular expression that is hard to read and maintain.
         */
        $assertExpr ('/[^\\s]*/',        $r.anyOf.except.space.$)
        $assertExpr ('/\\[.*\\]|[\\s]/', $r.anything.inBrackets.or.oneOf.space.$)

        var expr = $r.expr ('before',    $r.anything.text ('$print').something).then (
                   $r.expr ('argument',  $r.someOf.except.text (',)')).inParentheses.then (
                   $r.expr ('tail',      $r.anything))).$

        /*  Above construction generates the following regular expression
         */
        $assertExpr ('/(.*\\$print.+)\\(([^,\\)]+)\\)(.*)/', expr)

        /*  Main feature: named groups, easily accessible as dictionary elements.
         */
        $assert (expr.parse ( ' var x = $print (blabla) // lalala '),

                  {  before:  ' var x = $print ',
                   argument:  'blabla',              
                       tail:  ' // lalala ',        })

        /*  Based on Lisp-like list based syntax, for easy programmatic generation and stuff
         */
        $assert ([['[^', '\\s', "\]"], '*'], R.anyOf (R.except (R.space))) },


    constructor: function () {

        this.reduce = _.hyperOperator (_.binary, _.reduce2,
                                        _.goDeeperAlwaysIfPossible,
                                        _.isNonTrivial.and (_.not (this.isSubexpr)))

        this.initDSL () },

    expr (expr, subexprs) { subexprs = subexprs || []
            return new R.Expr (R.reduce ('', expr, (memo, s) => {
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

        parse (str) {
                var match = str.match (this.rx)
            return (match && _.extend.apply (null,
                                _.zipWith ([match.slice (1), this.subexprs], (match, subexpr) => _.fromPairs ([[ subexpr.name, match ]]) ))) || {} } }),

    escape: s => _.map (s, x => R.metacharacters[x] ? ('\\' + x) : x).join (''),

    text: $alias ('escape'),

    subexpr: (name, s) => ({ name: name, value: ['(', s, ')'] }),
 
    maybe:  s => [s, '?'],
    anyOf:  s => [s, '*'],
    someOf: s => [s, '+'],

    oneOf:  s => ['[',  s, ']'],
    except: s => ['[^', s, ']'],

    or: (a, b) => [a, '|', b],

    $property: {

        metacharacters: _.index ('\\^$.|?*+()[{'),

        begin:       '^',
        end:         '$',
        space:       '\\s',
        maybeSpaces: '\\s*',
        spaces:      '\\s+',
        anything:    '.*',
        something:   '.+',
        comma:       ','
    },

    parentheses: s => ['\\(', s, '\\)'],
    brackets:    s => ['\\[', s, '\\]'],

    isSubexpr:   s => (_.isStrictlyObject (s) && !_.isArray (s)) ? true : false,

    root: r => (r && r.$$) ? r.$$ : r,

    initDSL () {

        $global.property ('$r',  () => $$r ([]))
        $global.const    ('$$r', cursor => {

            const shift = x => (cursor.push (x), cursor.forward)
            const def   = _.defineHiddenProperty

            def (cursor, 'then', x =>      { cursor.push (R.root (x));                return cursor })
            def (cursor, 'text', x =>      { cursor.push (R.text (x));                return cursor })
            def (cursor, 'expr', (x, s) => { cursor.push (R.subexpr (x, R.root (s))); return cursor })

            def (cursor, 'forward', () => cursor.next || ((cursor.next = $r).prev = cursor).next)

            _.each (['maybe', 'anyOf', 'someOf', 'oneOf', 'except'], function (key) {
                def (cursor, key, () => shift (R[key] (cursor.forward))) })

            _.each (['parentheses', 'brackets'], key =>
                def (cursor, 'in' + key.capitalized, () =>
                    (cursor.$$.prev = $$r (R[key] (cursor.$$)))))

            _.each (['or'], key =>
                def (cursor, key, () => {
                    let next = $r
                    return (next.prev = (cursor.$$.prev = $$r (R[key] (cursor.$$, next)))).next = next }))

            _.each (['begin', 'end', 'space', 'anything', 'something'], key =>
                def (cursor, key, () => shift ([R[key], cursor.forward])))

            def (cursor, '$$', () => {
                let root = cursor
                while (root.prev) { root = root.prev }
                return root })

            def (cursor, '$', () => R.expr (cursor.$$))

            return cursor
        })
    }
})