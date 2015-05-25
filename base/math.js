_ = require ('underscore')


/*  Context-free math functions
    ======================================================================== */

_.clamp = function (n, min, max) {
    return Math.max (min, Math.min (max, n)) }

_.lerp = function (t, min, max) {
    return min + (max - min) * t }

_.rescale = function (v, from, to, opts) { var unit = (v - from[0]) / (from[1] - from[0])
    return _.lerp (opts && opts.clamp ? _.clamp (unit, 0, 1) : unit, to[0], to[1]) }


/*  2-dimensional vector
    ======================================================================== */

Vec2 = $prototype ({

    $static: {
        zero: $property (function () { return new Vec2 (0, 0) }),
        unit: $property (function () { return new Vec2 (1, 1) }),
        one:  $alias ('unit'),
        lerp:  function (t, a, b) { return new Vec2 (_.lerp (t, a.x, b.x), _.lerp (t, a.y, b.y)) },
        clamp: function (n, a, b) { return new Vec2 (_.clamp (n.x, a.x, b.x), _.clamp (n.y, a.y, b.y)) } },

    constructor: function (x, y) {
        this.x = x
        this.y = y },

    length: $property (function () { return Math.sqrt (this.x * this.x + this.y * this.y) }),

    add: function (other) {
        return new Vec2 (this.x + other.x, this.y + other.y) },

    sub: function (other) {
        return new Vec2 (this.x - other.x, this.y - other.y) },

    scale: function (t) {
        return new Vec2 (this.x * t, this.y * t) },

    inversed: $property (function () {
        return new Vec2 (-this.x, -this.y) }),

    toString: function () {
        return '{' + this.x + ',' + this.y + '}' } })


/*  Cubic bezier
    ======================================================================== */

Bezier = {

    cubic: function (p0, p1, p2, p3, t) {
        var cube = t * t * t
        var square = t * t
        var ax = 3.0 * (p1.x - p0.x);
        var ay = 3.0 * (p1.y - p0.y);
        var bx = 3.0 * (p2.x - p1.x) - ax;
        var by = 3.0 * (p2.y - p1.y) - ay;
        var cx = p3.x - p0.x - ax - bx;
        var cy = p3.y - p0.y - ay - by;
        var x = (cx * cube) + (bx * square) + (ax * t) + p0.x;
        var y = (cy * cube) + (by * square) + (ay * t) + p0.y;
        return new Vec2 (x, y) },
        
    cubic1D: function (a, b, c, d, t) {
        return Bezier.cubic (Vec2.zero, new Vec2 (a, b), new Vec2 (c, d), Vec2.one, t).y } }


/*  Bounding box (2D)
    ======================================================================== */

BBox = $prototype ({

    $static: {
        zero: $property (function () {
            return new BBox (0, 0, 0, 0) }),
        unit: $property (function () {
            return new BBox (0, 0, 1, 1) }),
        fromLTWH: function (r) {
            return new BBox (r.left + r.width / 2.0, r.top + r.height / 2.0, r.width, r.height) },
        fromLTRB: function (r) {
            return new BBox (_.lerp (0.5, r.left, r.right), _.lerp (0.5, r.top. r.bottom), r.right - r.left, r.bottom - r.top) },
        fromSizeAndCenter: function (size, center) {
            return new BBox (center.x - size.x / 2.0, center.y - size.y / 2.0, size.x, size.y) },
        fromSize: function (a, b) {
            if (b) {
                return new BBox (-a / 2.0, -b / 2.0, a, b) }
            else {
                return new BBox (-a.x / 2.0, -a.y / 2.0, a.x, a.y) } } },

    constructor: function (x, y, w, h) {
        if (arguments.length == 4) {
            this.x = x
            this.y = y
            this.width = w
            this.height = h }
        else {
            _.extend (this, x) } },

    left: $property (function () {
        return this.x - this.width / 2.0 }),

    right: $property (function () {
        return this.x + this.width / 2.0 }),

    top: $property (function () {
        return this.y - this.height / 2.0 }),

    bottom: $property (function () {
        return this.y + this.height / 2.0 }),

    center: $property (function () {
        return new Vec2 (this.x, this.y) }),

    size: $property (function () {
        return new Vec2 (this.width, this.height) }),

    newWidth: function (width) {
        return new BBox (this.x - (width - this.width) / 2.0, this.y, width, this.height) },

    toString: function () {
        return '{' + this.x + ',' + this.y + ':' + this.width + '×' + this.height + '}' } })


/*  3x3 affine transform matrix, encoding scale/offset/rotate/skew in 2D
    ======================================================================== */

Transform = $prototype ({

    svgMatrix: $static (function (m) {
                            return new Transform ([
                                [m.a, m.c, m.e],
                                [m.b, m.d, m.f],
                                [0.0, 0.0, 1.0] ]) }),

    constructor: function (components) {
                    this.components = components || [
                        [1.0, 0.0, 0.0],
                        [0.0, 1.0, 0.0],
                        [0.0, 0.0, 1.0]] },

    multiply: function (m) {
                    var result = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
                    var i, j, k, a = this.components, b = m.components;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 3; j++) {
                            for (k = 0; k < 3; k++) {
                                   result[i][j] += a[i][k] * b[k][j] } } }

                    return new Transform (result) },

    translate: function (v) {
                    return this.multiply (new Transform ([
                        [1.0, 0.0, v.x],
                        [0.0, 1.0, v.y],
                        [0.0, 0.0, 1.0] ])) },

    scale: function (s) {
                return this.multiply (new Transform ([
                    [s,   0.0, 0.0],
                    [0.0, s,   0.0],
                    [0.0, 0.0, 1.0] ])) },

    inversed: $property ($memoized (function () { var m = this.components
                                        var id = (1.0 / 
                                                    (m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
                                                     m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
                                                     m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])))

                                        return new Transform ([[

                                                 (m[1][1]*m[2][2]-m[2][1]*m[1][2])*id,          // 0 0
                                                -(m[0][1]*m[2][2]-m[0][2]*m[2][1])*id,          // 0 1
                                                 (m[0][1]*m[1][2]-m[0][2]*m[1][1])*id],         // 0 2

                                                [(m[1][0]*m[2][2]-m[1][2]*m[2][0])*id,          // 1 0
                                                 (m[0][0]*m[2][2]-m[0][2]*m[2][0])*id,          // 1 1
                                                -(m[0][0]*m[1][2]-m[1][0]*m[0][2])*id],         // 1 2

                                                [(m[1][0]*m[2][1]-m[2][0]*m[1][1])*id,          // 2 0
                                                -(m[0][0]*m[2][1]-m[2][0]*m[0][1])*id,          // 2 1
                                                 (m[0][0]*m[1][1]-m[1][0]*m[0][1])*id] ]) })),  // 2 2
        
    unproject: function (v) {
                    var m = this.components
                    return new Vec2 (
                        v.x * m[0][0] + v.y * m[0][1] + m[0][2],
                        v.x * m[1][0] + v.y * m[1][1] + m[1][2]) },

    project: function (v) {
                return this.inversed.unproject (v) } })


/*  Generates random number generator
    ======================================================================== */

_.rng = function (seed, from, to) {
    var m_w = seed;
    var m_z = 987654321;
    var mask = 0xffffffff;
    return function () {
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        var result = ((m_z << 16) + m_w) & mask;
        result /= 4294967296;
        result += 0.5
        if (from === undefined && to === undefined) {
            return result }
        else {
            return Math.round (from + result * (to - from)) } } }


/*  Kind of Brezenham algorithm for 1D
    ======================================================================== */

_.equalDistribution = function (value, n) {
    var average = value / n
    var realLeft = 0.0
    return _.times (n, function () {
        var left = Math.round (realLeft)
        var right = Math.round (realLeft += average)
        var rough = Math.floor (right - left)
        return rough }) }


/*  DEPRECATED: use BBox utility
    ======================================================================== */

_.ptInRect = function (pt, rect) {
    return ((pt.x >= rect.left) && (pt.y >= rect.top) && (pt.x < rect.right) && (pt.y < rect.bottom)) }


/*  Color utility
    ======================================================================== */

_.hue2CSS = function (H, a)   { return _.RGB2CSS (_.hue2RGB (H), a)       }
_.HSL2CSS = function (hsl, a) { return _.RGB2CSS (_.HSL2RGB (hsl), a) }

_.HSL2RGB = function (hsl) { var h = hsl[0], s = hsl[1], l = hsl[2]
    var rgb = _.hue2RGB (h)
    var c = (1.0 - Math.abs (2.0 * l - 1.0)) * s
    return [(rgb[0] - 0.5) * c + l,
            (rgb[1] - 0.5) * c + l,
            (rgb[2] - 0.5) * c + l] }

_.hue2RGB = function (hue) {
    return [Math.max (0.0, Math.min (1.0, Math.abs (hue * 6.0 - 3.0) - 1.0)),
            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 2.0))),
            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 4.0)))] }

_.RGB2CSS = function (rgb, a) {
    return 'rgba(' +
        Math.round (rgb[0] * 255) + ',' +
        Math.round (rgb[1] * 255) + ',' +
        Math.round (rgb[2] * 255) + ',' + (a === undefined ? (rgb[3] === undefined ? 1.0 : rgb[3]) : a) + ')' }

_.RGB2HSL = function (rgb) {
    var r = rgb[0], g = rgb[1], b = rgb[2]
    var max = Math.max (r, g, b), min = Math.min (r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0 }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break; }
        h /= 6 }
    return [h, s, l] }
    

/*  Advanced rounding utility
    ======================================================================== */

_.extend (Math, (function (decimalAdjust) {
    return {
        roundTo: function (value, precision) {
            return value - (value % precision)
        },
        round10: function(value, exp) {
            return decimalAdjust ('round', value, exp);
        },
        floor10: function(value, exp) {
            return decimalAdjust ('floor', value, exp);
        },
        ceil10: function(value, exp) {
            return decimalAdjust ('ceil', value, exp);
        }
    }
}) (function /* decimalAdjust */ (type, value, exp) {

    /**
     * Decimal adjustment of a number.
     *
     * @param   {String}    type    The type of adjustment.
     * @param   {Number}    value   The number.
     * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}            The adjusted value.
     */

    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}))