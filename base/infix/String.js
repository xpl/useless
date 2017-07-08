"use strict";

const _ = require ('underscore')

const { ansiEscapeCodes,
        printableCharacters,
        nonPrintableCharacters } = require ('printable-characters')

/*  String extensions
    ======================================================================== */

_.deferTest ('String extensions', function () {

    /*  Convenient infix versions of string-crunching basics. The
        naming scheme of reversed/capitalized/trimmed is chosen to
        not cause conflicts with built-in methods/properties doing
        the same (which are implementation-dependent, e.g. str.trim
        method).
     */
    $assert ('ж'.repeats (0)    === '')
    $assert ('ж'.repeats (4)    === 'жжжж')
    $assert ('жопа'.first (2)   === 'жо')
    $assert ('жопа'.reversed    === 'апож')
    $assert ('жопа'.capitalized === 'Жопа') // capital Zhopa
    $assert ('  жопа  '.trimmed === 'жопа')
    $assert ('<жопа>'.escaped   === '&lt;жопа&gt;')
    $assert ('па'.prepend   ('жо'),
             'жо'.append    ('па'), 'жопа')

    $assert (['жопа'.contains ('опа'),
              'жопа'.contains ('апож')], [true, false])

    $assert  (['жопа'.startsWith ('ж'),
               'жопа'.startsWith ('жо'),
               'жопа'.startsWith ('о')], [true,
                                          true,
                                          false])
    $assert  (['жопа'.endsWith ('а'),
               'жопа'.endsWith ('па'),
               'жопа'.endsWith ('ж')], [true,
                                        true,
                                        false])

    /*  Higher order version of former utility
     */
    $assert ([  _.map ([1, 2, 3], _.prepends ('foo')), // higher order version
                _.map ([1, 2, 3], _.appends  ('bar'))].zip (_.append), ['foo11bar', 'foo22bar', 'foo33bar'])

    /*  This one is defined via unicode_regexp_hack and is super slow
     */
    $assert ('}|{О/7A с Py4K()Й ololo 321321'.latinAlphanumericValue,   '7APy4Kololo321321')
    $assert ('}|{О/7A с Py4K()Й ololo 321321'.alphanumericValue,        'О7AсPy4KЙololo321321')

    /*  This one is defined though regexps, and is kinda slow. Don't use
        in performance-critical code (like mass object rendering in UI)
     */
    $assert ('+7(965)412-63-21'.numericValue, '79654126321')
    $assert ('+7(965)412-63-21'.integerValue,   79654126321)
    $assert ('foo'.integerValue,                undefined)      // NOTE: returns undefined instead of NaN (for consistency reasons)
    $assert ('0'.integerValue,                  0)              // regression test (was resulting to undefined due to bug)

    /*  Use str.parsedInt instead of raw parseInt(), because latter requires
        base-10 argument, often mistakengly omited, thus resulting something
        like '010' to be parsed as octal number. I once spend hours of debugging
        to catch this kind of mistake, and now not want for someone's got
        trapped into the same shitty situation.
     */
    $assert ('123'.parsedInt,   123)
    $assert ('foo'.parsedInt,   undefined)      // NOTE: returns undefined instead of NaN (for consistency reasons)
    $assert ('0'.parsedInt,     0)              // regression test (was resulting to undefined due to bug)

    /*  This one is taken from Java's object hasher. Not to ever be used in
        some security-critical calculations, as it's not secure. It's fast.
     */
    $assert ('foo'.hash, 101574)

    /*  Use for filename/URL-part generation
     */
    $assert ('Пися Камушкинъ'.transliterate, 'pisyakamushkin')

    /*  This one is really convetient!
     */
    $assert  ('qux'.quote (''),     'qux')
    $assert  ('qux'.quote ('"'),    '"qux"')
    $assert  ('qux'.quote ('[]'),   '[qux]')
    $assert  ('qux'.quote ('/'),    '/qux/')
    $assert  ('qux'.quote ('{  }'), '{ qux }')
    $assert  ('qux'.quote ('</>'),  '</qux>')

    $assert  (_.isTypeOf (Uint8Array, 'foo'.bytes))
    $assert  (_.asArray ('foo'.bytes), [102, 111, 111])

    $assert  (['foobar'  .limitedTo (6),
               'tooloong'.limitedTo (6),
               ''        .limitedTo (0)], ['foobar',
                                           'toolo…', ''])

    $assert  ('жоп'.pad (5),      'жоп  ')
    $assert  ('жоп'.pad (5, '→'), 'жоп→→')

    $assert ('foo'.pluck ([    { foo: 10 },    { foo: 11 } ]), [    10,    11 ])
    $assert ('foo'.pluck ({ a: { foo: 10 }, b: { foo: 11 } }), { a: 10, b: 11 })

    $assert ('foo/'.concatPath ('/bar'),
             'foo' .concatPath ('/bar'),
             'foo/'.concatPath ( 'bar'),
             'foo' .concatPath ( 'bar'), 'foo/bar')

    $assert ('/'.concatPath ('/bar'), '/bar')
    $assert ('/'.concatPath ('bar'),  '/bar')

    $assert ('123456'.first (2), '12')
    $assert ('123456'.last  (2), '56')

}, function () { $extensionMethods (String, {

    quote: _.quote,

    concatPath: function (a, b) {

                    var a_endsWithSlash = (a[a.length - 1] === '/')
                    var b_startsWithSlash = (b[0] === '/')

                    return a + ((a_endsWithSlash || b_startsWithSlash) ? '' : '/') +
                               ((a_endsWithSlash && b_startsWithSlash) ? b.substring (1) : b) },

    pluck: function (s, arr) {
                return _.pluck2 (arr, s) },

    contains: function (s, other) { return s.indexOf (other) >= 0 },

    startsWith: function (s, x) {
                    return (x.length === 1) ? (s[0] === x) : (s.substring (0, x.length) === x) },

    endsWith: function (s, x) {
                    return (x.length === 1) ? (s[s.length - 1] === x) : (s.substring (s.length - x.length) === x) },

    pad: function (s, len, filler) {
        return s += (filler || ' ').repeats (Math.max (0, len - s.length)) },

    cut: function (s, from) {
        return s.substring (0, from - 1) + s.substring (from, s.length) },

    insert: function (s, position, what) {
        return s.substring (0, position) + what + s.substring (position, s.length) },

    lowercase: function (s) {
        return s.toLowerCase () },

    uppercase: function (s) {
        return s.toUpperCase () },

    trimmed: function (s) {
        return s.trim () },

    looksEmpty: function (s) {
        const visibleLetters = s.replace (nonPrintableCharacters, '')
        return visibleLetters.length === 0 },

    limitedTo: function (s, n) {
        return s && ((s.length <= n) ? s : (s.substr (0, n - 1) + '…')) },

    escaped: function (s) {
        return _.escape (s) },

    repeats: function (s, n) {                              // TODO: this should come in two versions: _.repeat (s, n) and _.repeats (n, s)
        return _.times (n, _.constant (s)).join ('') },

    prepend: function (s, other) {
        return other + s },

    append: function (s, other) {
        return s + other },

    first: function (s, n) {
        return s.slice (0, n) },

    last: function (s, n) {
        return s.slice (-2) },

    reversed: function (s) {
        return s.split ('').reverse ().join ('') },

    capitalized: function (s) {
        return s.charAt (0).toUpperCase () + s.slice (1) },

    decapitalized: function (s) {
        return s.charAt (0).toLowerCase () + s.slice (1) },

    latinAlphanumericValue: function (s) {
        return s.replace (/[^a-z0-9]/gi, '') },

    alphanumericValue: function (s) {
        return s.replace (/[^a-zа-я0-9]/gi, '') },

    numericValue: function (s) {
        return s.replace (/[^0-9]/g, '') },

    integerValue: function (s) {
        return s.numericValue.parsedInt },

    parsedInt: function (s) {
        var result = parseInt (s, 10)
        return _.isFinite (result) ? result : undefined },

    bytes: function (s) {                var bytes = new Uint8Array (s.length)
        for (var i = 0; i < s.length; ++i) { bytes[i] = s.charCodeAt (i) }
                                      return bytes },

    hash: function (s) { // unsecure, but fast, taken from Java's object hasher
        var hash = 0, i, chr, len
        if (s.length === 0) {
            return hash; }

        for (i = 0, len = s.length; i < len; i++) {
            chr   = s.charCodeAt (i)
            hash  = ((hash << 5) - hash) + chr
            hash |= 0 } // Convert to 32bit integer

        return hash },

    transliterate: (function () {
        var table = _.extend ({

            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
            'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
            'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'ph', 'х': 'h', 'ц': 'ts',
            'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '',
            'ъ': '', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya' },

            _.fromPairs (_.map ('_-1234567890qwertyuiopasdfghjklzxcvbnm', function (x) { return [x,x] })))
        
        return function (s) {
            var result = ''
            var source = (s || '').toLowerCase ()

            for (var i = 0, n = source.length; i < n; i++) {
                var c = source[i]
                var x = table[c] || ''
                result += x }

            return result }}) () }) })

_.extend (String, {

    randomHex: function (length) {
                            if (length === undefined) {
                                length = _.random (1, 32) }
                            var string = '';
                            for (var i = 0; i < length; i++) { string += Math.floor (Math.random () * 16).toString (16) }
                            return string },

    leadingZero: function (n) {
                    return (n < 10) ? '0' + n : n.toString () } })

_.deferTest (['identifier naming style interpolation'], function () {

    $assert (_.camelCaseToLoDashes        ('flyingBurritoOption'), 'flying_burrito_option')
    $assert (_.camelCaseToDashes          ('flyingBurritoOption'), 'flying-burrito-option')
    $assert (_.dashesToCamelCase          ('flying-burrito-option'), 'flyingBurritoOption')
    $assert (_.loDashesToCamelCase        ('flying_burrito_option'), 'flyingBurritoOption')

}, function () {

    _.camelCaseToDashes   =   function (x) { return x.replace (/[a-z][A-Z]/g, function (x) { return x[0] + '-' + x[1].lowercase }) }
    _.camelCaseToLoDashes =   function (x) { return x.replace (/[a-z][A-Z]/g, function (x) { return x[0] + '_' + x[1].lowercase }) }
    _.dashesToCamelCase   =   function (x) { return x.replace (/(-.)/g,       function (x) { return x[1].uppercase }) } })
    _.loDashesToCamelCase =   function (x) { return x.replace (/(_.)/g,       function (x) { return x[1].uppercase }) }




