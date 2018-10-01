"use strict";

const _ = require ('underscore')

/*  TODO:   UNIT TEST DAT MUTHAFUCKA
 */

/*  TODO:   get rid of _ namespace (now legacy)
 */

Math.clamp = _.clamp = function (n, min, max) {
                            return Math.max (min, Math.min (max, n)) }

Math.lerp = _.lerp = function (t, min, max) {
                        return min + (max - min) * t }

Math.rescale = _.rescale = function (v, from, to, opts) { var unit = (v - from[0]) / (from[1] - from[0])
                                return _.lerp (opts && opts.clamp ? _.clamp (unit, 0, 1) : unit, to[0], to[1]) }

Math.rescaleClamped = _.rescaleClamped = function (v, from, to) {
                                            return _.rescale (v, from, to, { clamp: true }) }

Math.sqr = _.sqr = function (x) { return x * x }


/*  Math.sign (missing from Safari)
    ======================================================================== */

if (!Math.sign) {
    Math.sign = function (x) {
        return (x < 0) ? -1 : ((x > 0) ? 1 : 0) } }

/*  Intersections (draft)
    ======================================================================== */

$global.Intersect = {

    rayCircle: function (origin, d, center, r) {

        var f = origin.sub (center)
        var a = d.dot (d)

        var b = 2.0 * f.dot (d)
        var c = f.dot (f) - r*r

        var discriminant = b*b - 4.0*a*c
        if (discriminant < 0) {
            return undefined }

        else {
            discriminant = Math.sqrt (discriminant)

            var t1 = (-b - discriminant) / (2.0 * a)
            var t2 = (-b + discriminant) / (2.0 * a)

            if ((t1 >= 0) && (t1 <= 1)) {
                return { time: t1, where: origin.add (d.scale (t1)) } }

            if ((t2 >= 0) && (t2 <= 1)) {
                return { time: t2, where: origin.add (d.scale (t2)), insideOut: true } }

            return undefined } }
}

/*  TODO: Vec1, for consistency with arity-abstract vector algorithms
    ======================================================================== */

/*  2-dimensional vector
    ======================================================================== */

$global.Vec2 = $prototype ({

    $static: {
        xx:          function (x)   { return new Vec2 (x,x) },
        xy:          function (x,y) { return new Vec2 (x,y) },
        x:           function (x)   { return new Vec2 (x,0) },
        y:           function (y)   { return new Vec2 (0,y) },
        zero:        $property (function () { return new Vec2 (0, 0) }),
        unit:        $property (function () { return new Vec2 (1, 1) }),
        one:         $alias ('unit'),
        lt:          $alias ('fromLT'),
        wh:          $alias ('fromWH'),
        fromLT:      function (lt) { return lt && (new Vec2 (lt.left, lt.top)) },
        fromWH:      function (wh) { return wh && (new Vec2 (wh.width, wh.height)) },
        fromLeftTop:     $alias ('fromLT'),
        fromWidthHeight: $alias ('fromWH'),
        lerp:        function (t, a, b) { return new Vec2 (_.lerp (t, a.x, b.x), _.lerp (t, a.y, b.y)) },
        clamp:       function (n, a, b) { return new Vec2 (_.clamp (n.x, a.x, b.x), _.clamp (n.y, a.y, b.y)) },

        random: $property (function () { return new Vec2 (Math.random (), Math.random ()) })
    },

    constructor: function (x, y) {
        if (arguments.length === 1) {
            if (_.isNumber (x)) {
                this.x = this.y = x }
            else {
                this.x = x.x
                this.y = x.y } }
        else {
            this.x = x
            this.y = y } },

    w: $alias ($property ('x')),
    h: $alias ($property ('y')),

    width:  $alias ($property ('x')),
    height: $alias ($property ('y')),

    left: $alias ($property ('x')),
    top: $alias ($property ('y')),

    right: $alias ($property ('x')),
    bottom: $alias ($property ('y')),

    length:        $property (function () { return Math.sqrt (this.lengthSquared) }),
    lengthSquared: $property (function () { return this.x * this.x + this.y * this.y }),

    distance: function (pt) { return this.sub (pt).length },

    aspect: $property (function () { return this.x / this.y }),

    add: function (a, b) {
        if (b === undefined) {
            return (typeof a === 'number') ?
                new Vec2 (this.x + a,   this.y + a) :
                new Vec2 (this.x + a.x, this.y + a.y) }
        else {
            return new Vec2 (this.x + a, this.y + b) } },

    jitter: function (amount) {
        return this.add (Vec2.random.scale (amount))
    },

    dot: function (other) {
        return this.x * other.x + this.y * other.y },

    sub: function (other) {
        return new Vec2 (this.x - other.x, this.y - other.y) },

    scale: function (tx, ty) {
        return new Vec2 (this.x * tx, this.y * (ty === undefined ? tx : ty)) },

    mul: function (other) {
        return new Vec2 (this.x * other.x, this.y * other.y) },

    divide: function (other) {
        return new Vec2 (this.x / other.x, this.y / other.y) },

    normal: $property (function () {
        return this.scale (1.0 / this.length) }),

    perp: $property (function () {
        return new Vec2 (this.y, -this.x) }),

    half: $property (function () {
        return new Vec2 (this.x * 0.5, this.y * 0.5) }),

    inverse: $property (function () {
        return new Vec2 (-this.x, -this.y) }),

    asArray: $property (function () {
        return [this.x, this.y] }),

    asLeftTop: $property (function () {
        return { left: this.x, top: this.y } }),

    asLeftTopMargin: $property (function () {
        return { marginLeft: this.x, marginTop: this.y } }),

    asWidthHeight: $property (function () {
        return { width: this.x, height: this.y } }),

    asTranslate: $property (function () {
        return 'translate(' + this.x + ' ' + this.y + ')' }),

    separatedWith: function (sep) {
        return this.x + sep + this.y },

    floor: $property (function () {
                        return new Vec2 (Math.floor (this.x), Math.floor (this.y)) }),

    sum: $static (function (arr) {
                    return _.reduce ((_.isArray (arr) && arr) || _.asArray (arguments),
                        function (memo, v) { return memo.add (v || Vec2.zero) }, Vec2.zero) }),

    projectOnCircle: function (center, r) {
        return center.add (this.sub (center).normal.scale (r)) },

    projectOnLineSegment: function (v, w) {
        var wv = w.sub (v)
        var l2 = wv.lengthSquared
        if (l2 == 0) return v
        var t = this.sub (v).dot (wv) / l2
        if (t < 0) return v
        if (t > 1) return w
        return v.add (wv.scale (t)) },

    projectOnRay: function (origin, dir) { 
        var l2 = dir.lengthSquared
        if (l2 == 0) return 0
        return this.sub (origin).dot (dir) / l2 } })

/*  ------------------------------------------------------------------------ */

if (typeof Symbol !== 'undefined') {
    Vec2.prototype[Symbol.for ('String.ify')] = function () {
                                                    return '{' + this.x + ',' + this.y + '}'  } }

/*  Cubic bezier
    ======================================================================== */

$global.Bezier = {

    cubic: function (t, p0, p1, p2, p3) {
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
        
    cubic1D: function (t, a, b, c, d) {
        return Bezier.cubic (t, Vec2.zero, new Vec2 (a, b), new Vec2 (c, d), Vec2.one).y },

    make: {
        
        cubic:   function (a,b,c,d) { return function (t) { return Bezier.cubic   (t,a,b,c,d) } },
        cubic1D: function (a,b,c,d) { return function (t) { return Bezier.cubic1D (t,a,b,c,d) } } } }


/*  Bounding box (2D)
    ======================================================================== */

$global.BBox = $prototype ({

    $static: {

        zero: $property (function () {
            return new BBox (0, 0, 0, 0) }),

        unit: $property (function () {
            return new BBox (0, 0, 1, 1) }),

        rect: $property (function (sideSize) {
            return new BBox (0, 0, sideSize, sideSize) }),

        fromLeftTopAndSize: function (pt, size) {
            return BBox.fromLTWH ({ left: pt.x, top: pt.y, width: size.x, height: size.y }) },

        fromLTWH: function (l,t,w,h) {
            if (arguments.length === 1) { return l && (BBox.fromLTWH (l.left, l.top, l.width, l.height)) }
                                   else { return new BBox (l + w / 2.0, t + h / 2.0, w, h) } },

        fromLTRB: function (l,t,r,b) {
                 if (arguments.length === 1) { return l && (BBox.fromLTRB (l.left, l.top, l.right, l.bottom)) }
            else if (arguments.length === 2) { return BBox.fromLTRB (l.x, l.y, t.x, l.y) }
                                        else { return new BBox (_.lerp (0.5, l, r), _.lerp (0.5, t, b), r - l, b - t) } },

        fromSizeAndCenter: function (size, center) {
            return new BBox (center.x - size.x / 2.0, center.y - size.y / 2.0, size.x, size.y) },

        fromSize: function (a, b) {
            if (b) { return new BBox (-a / 2.0, -b / 2.0, a, b) }
              else { return new BBox (-a.x / 2.0, -a.y / 2.0, a.x, a.y) } },

        fromPoints: function (pts) { var l = Number.MAX_VALUE, t = Number.MAX_VALUE, r = Number.MIN_VALUE, b = Number.MIN_VALUE
            _.each (pts, function (pt) {
                l = Math.min (pt.x, l)
                t = Math.min (pt.y, t)
                r = Math.max (pt.x, r)
                b = Math.max (pt.y, b) })
            return BBox.fromLTRB (l, t, r, b)
        }
    },

    constructor: function (x, y, w, h) {
        if (arguments.length == 4) {
            this.x = x
            this.y = y
            this.width = w
            this.height = h }
        else {
            _.extend (this, x) } },

    isPointInside (pt) { return this.classifyPoint (pt).inside },

    classifyPoint: function (pt) {
        
        var sides = _.extend (

            (pt.x > this.right)   ? { right   : true } : {},
            (pt.x < this.left)    ? { left    : true } : {},
            (pt.y > this.bottom)  ? { bottom  : true } : {},
            (pt.y < this.top)     ? { top     : true } : {})
        
        return _.extend (sides,

            (!sides.left &&
             !sides.right &&
             !sides.bottom && !sides.top) ? { inside: true } : {}) },

    classifyRay: function (origin, delta, cornerRadius) {

        var half = this.size.half
        var farTime, farTimeX, farTimeY, nearTime, nearTimeX, nearTimeY, scaleX, scaleY, signX, signY

        scaleX = 1.0 / delta.x
        scaleY = 1.0 / delta.y
        signX  = Math.sign (scaleX)
        signY  = Math.sign (scaleY)

        nearTimeX = (this.x - signX * half.x - origin.x) * scaleX
        nearTimeY = (this.y - signY * half.y - origin.y) * scaleY
        farTimeX =  (this.x + signX * half.x - origin.x) * scaleX
        farTimeY =  (this.y + signY * half.y - origin.y) * scaleY

        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return undefined }

        nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY
        farTime  = farTimeX  < farTimeY  ? farTimeX  : farTimeY

        if (nearTime >= 1 || farTime <= 0) {
            return undefined }

        var hit = { time: _.clamp (nearTime, 0, 1) }
        
        if (nearTimeX > nearTimeY) {
            hit.normal = new Vec2 (-signX, 0) }
        else {
            hit.normal = new Vec2 (0, -signY) }

        hit.delta = delta.scale (hit.time)
        hit.where = origin.add (hit.delta)

        if (cornerRadius) { var inner = this.grow (-cornerRadius)

            if (hit.where.x > inner.right) {
                if (hit.where.y < inner.top) {
                    hit = Intersect.rayCircle (origin, delta, inner.rightTop, cornerRadius) }
                else if (hit.where.y > inner.bottom) {
                    hit = Intersect.rayCircle (origin, delta, inner.rightBottom, cornerRadius) } }

            else if (hit.where.x < inner.left) {
                if (hit.where.y < inner.top) {
                    hit = Intersect.rayCircle (origin, delta, inner.leftTop, cornerRadius) }
                else if (hit.where.y > inner.bottom) {
                    hit = Intersect.rayCircle (origin, delta, inner.leftBottom, cornerRadius) } }

            if (hit && hit.insideOut) {
                hit.where = origin } }

        return hit
    },

    nearestPointTo: function (pt, cornerRadius) { var r = cornerRadius || 0

        var a = new Vec2 (this.left,  this.top),
            b = new Vec2 (this.right, this.top),
            c = new Vec2 (this.right, this.bottom),
            d = new Vec2 (this.left,  this.bottom)

        var pts = [ pt.projectOnLineSegment (a.add (r, 0),  b.add (-r, 0)),  // top
                    pt.projectOnLineSegment (b.add (0, r),  c.add (0, -r)),  // right
                    pt.projectOnLineSegment (c.add (-r, 0), d.add (r, 0)),   // bottom
                    pt.projectOnLineSegment (d.add (0, -r), a.add (0, r)),   // left

                    pt.projectOnCircle (a.add ( r,  r), r),
                    pt.projectOnCircle (b.add (-r,  r), r),
                    pt.projectOnCircle (c.add (-r, -r), r),
                    pt.projectOnCircle (d.add ( r, -r), r) ]

        return _.min (pts, function (test) { return pt.sub (test).length }) },

    xywh: $property (function () {
        return { x: this.x, y: this.y, width: this.width, height: this.height } }),

    ltwh: $property (function () {
        return { left: this.left, top: this.top, width: this.width, height: this.height } }),

    union: function (other) { return BBox.fromLTRB (
                                        Math.min (this.left,   other.left),
                                        Math.min (this.top,    other.top),
                                        Math.max (this.right,  other.right),
                                        Math.max (this.bottom, other.bottom)) },

    centerIn: function (other) {
        return new BBox (other.x, other.y, this.width, this.height) },

    clone: $property (function () {
        return new BBox (this.x, this.y, this.width, this.height) }),
    
    floor: $property (function () {
        return new BBox.fromLTRB (Math.floor (this.left),
                                  Math.floor (this.top),
                                  Math.floor (this.right),
                                  Math.floor (this.bottom)) }),

    css: $property (function () {
                        return { left: this.left   + 'px',
                                  top: this.top    + 'px',
                                width: this.width  + 'px',
                               height: this.height + 'px' } }),

    leftTop: $property (function () {
        return new Vec2 (this.left, this.top) }),

    leftBottom: $property (function () {
        return new Vec2 (this.left, this.bottom) }),

    rightBottom: $property (function () {
        return new Vec2 (this.right, this.bottom) }),

    rightCenter: $property (function () {
        return new Vec2 (this.right, this.center.y) }),
    
    rightTop: $property (function () {
        return new Vec2 (this.right, this.top) }),

    setLeftTop (pt) {
        return BBox.fromLTRB (pt.x, pt.y, this.right, this.bottom) },

    setRightTop (pt) {
        return BBox.fromLTRB (this.left, pt.y, pt.x, this.bottom) },

    setRightBottom (pt) {
        return BBox.fromLTRB (this.left, this.top, pt.x, pt.y) },

    setLeftBottom (pt) {
        return BBox.fromLTRB (pt.x, this.top, this.right, pt.y) },

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

    extent: $alias ('size'),

    size: $property (function () {
        return new Vec2 (this.width, this.height) }),

    offset: function (amount) {
        return new BBox (this.x + amount.x, this.y + amount.y, this.width, this.height) },

    newWidth: function (width) {
        return new BBox (this.x - (width - this.width) / 2.0, this.y, width, this.height) },

    grow: function (amount) {
        return new BBox (this.x, this.y, this.width + amount * 2, this.height + amount * 2) },

    shrink: function (amount) {
        return this.grow (-amount) },

    mul: function (z) {
            return new BBox (this.x * z, this.y * z, this.width * z, this.height * z) },

    scale (v) {
        return new BBox (this.x * v.x, this.y * v.y, this.width * v.x, this.height * v.y) },

    area: $property (function () {
        return Math.abs (this.width * this.height) }),

    intersects (other) {
        return !((this.right < other.left) ||
                 (this.left > other.right) ||
                 (this.bottom < other.top) ||
                 (this.top > other.bottom)) },

    intersect (other) {
        return this.intersects (other) ? BBox.fromLTRB (
                                            Math.max (this.left, other.left),
                                            Math.max (this.top, other.top),
                                            Math.min (this.right, other.right),
                                            Math.min (this.bottom, other.bottom)) : undefined
    },

    intersectionArea (other) {
        const intersection = this.intersect (other)
        return (intersection && intersection.area) || 0
    },

    equals (other) {
        return (this.x === other.x) &&
               (this.y === other.y) &&
               (this.width === other.width) &&
               (this.height === other.height)
    },

    project (other) {

        if (other instanceof BBox) {

            return BBox.fromSizeAndCenter (other.size.divide (this.size), this.project (other.center))

        } else {

            return new Vec2 ((other.x - this.left) / this.width,
                             (other.y - this.top) / this.height)
        }
    }
})

BBox.union = function (a, b) {
    return a ? a.union (b) : new BBox (b.x, b.y, 0, 0)
}

/*  ------------------------------------------------------------------------ */

if (typeof Symbol !== 'undefined') {
    BBox.prototype[Symbol.for ('String.ify')] = function () {
                                                    return '{ ' + this.left + ',' + this.top + ' ←→ ' + this.right + ',' + this.bottom + ' }'  } }


/*  3x3 affine transform matrix, encoding scale/offset/rotate/skew in 2D
    ======================================================================== */

$global.Transform = $prototype ({

    $static: {

        identity: $property (function () { return new Transform () }),

        svgMatrix: function (m) {
                        return new Transform ([
                            [m.a, m.c, m.e],
                            [m.b, m.d, m.f],
                            [0.0, 0.0, 1.0] ]) },

        translation: function (v) {
                        return new Transform ([
                                    [1.0, 0.0, v.x],
                                    [0.0, 1.0, v.y],
                                    [0.0, 0.0, 1.0] ]) } },

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
                    return this.multiply (Transform.translation (v)) },

    scale: function (s) {
                return this.multiply (new Transform ([
                    [s,   0.0, 0.0],
                    [0.0, s,   0.0],
                    [0.0, 0.0, 1.0] ])) },

    inverse: $property ($memoized (function () { var m = this.components
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
                return this.inverse.unproject (v) } })


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

_.RGB2HSL = function (rgb, a_) {
    var r = rgb[0], g = rgb[1], b = rgb[2], a = (a_ === undefined ? rgb[3] : a_)
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
    return a === undefined ? [h, s, l] : [h, s, l, a] }
    

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

/*  ------------------------------------------------------------------------ */

;(function () {

    var toposort = require ('toposort')

    $mixin (Array, {
        topoSort () { return toposort (this) }
    })

}) ();

/*  ------------------------------------------------------------------------ */

_.withTest (['Array', 'topomerge'], function () {

      $assert ( [['all','your',                'to','us'],
                 [      'your',       'belong',     'us'],
                 [             'base','belong','to'     ],
                 [      'your','base'                   ]].topoMerge (),
               /* -------------------------------------- */
                 ['all','your','base','belong','to','us'])

/*  ------------------------------------------------------------------------ */

}, function () {

    $mixin (Array, {

        topoMerge () {                                               var edges    = []
            for (var i = 0, ni = this.length;         i < ni; i++) { var sequence = this[i]
            for (var j = 0, nj = sequence.length - 1; j < nj; j++) {
                edges.push ([
                    sequence[j    ],
                    sequence[j + 1]]) } }

            return edges.topoSort ()
        }
    })
})

/*  ------------------------------------------------------------------------ */

_.withTest (['DAG', 'sortedSubgraphOf'], function () {

    var modules = {
        
        '1':    { requires: [] },
        '11':   { requires: ['1'] },
        '2':    { requires: ['0'] },
        '111':  { requires: ['12', '100'] },
        '12':   { requires: ['0',  '11', '2'] },
        '100':  { requires: ['10'] },
        '0':    { requires: [] },
        '10':   { requires: ['0', '2'] },
        'root': { requires: ['2', '111'] } }

    $assert (
        DAG.sortedSubgraphOf ('root', { nodes: function (x) { return modules[x].requires } }),
        ["0", "1", "11", "2", "12", "10", "100", "111"]  )

/*  ------------------------------------------------------------------------ */

}, function () {

    $global.DAG = function (cfg) {
                    this.cfg   = cfg       || {},
                    this.nodes = cfg.nodes || _.noop },

    DAG.prototype.each = function (N, fn, prev,  visited) {
                                                 visited = visited || new Set ()

                                            if (!visited.has (N)) { 
                                                 visited.add (N);   var self  = this,
                                                                        nodes = this.nodes (N) || [],
                                                                        stop  = fn.call (this, N, {     nodes: nodes,
                                                                                                         prev: prev,
                                                                                                      visited: visited })
                                                if (stop !== true) {
                                                    nodes.forEach (function ( NN) {
                                                                   self.each (NN, fn, N, visited) }) } }; return visited },
    DAG.prototype.edges = function (N) {
                                var edges = []
                                    this.each (N, function (N, context) {   context .nodes
                                                                                    .concat (N)
                                                                                    .reduce (function (A, B) {
                                                                                          edges.push ([A, B]); return B }) }); return edges },
    DAG.prototype.sortedSubgraphOf = function (node0) {
                                          return this.edges  (node0)
                                                     .topoSort ()
                                                     .remove (node0) }

    DAG.sortedSubgraphOf = function (node0, cfg) {
                                return new DAG (cfg).sortedSubgraphOf (node0) }

})

/*  ------------------------------------------------------------------------ */

