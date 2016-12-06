"use strict";

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame || function (frame) { return window.setTimeout (frame, 0) }

const cancelAnimationFrame =
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.msCancelAnimationFrame || function (id) { return window.clearTimeout (id) }

$global.InertialValue = $component ({

    $defaults: { duration:  0.2,
                 easing:   'linear' },

    animating: $observableProperty (false),
    target:    $observableProperty (/* scalar or vector */),
    value:     $observableProperty (),

    init (cfg) {

        this.easing  = ((this.value instanceof Vec2) ? Easing.vector : Easing.scalar)[this.easing]

        this.targetChange (target => {

            if (target !== undefined) {

                if (this.animating === false) {
                    this.start     = this.value
                    this.target    = target
                    this.startTime = Date.now ()
                    this.step () }

                else {
                    this.start      = this.value
                    /*this.startTime  = this.lastTime*/     } } })  },

    abort () {
        if (this.animFrame !== undefined) {
            cancelAnimationFrame (this.animFrame)
            this.animFrame = undefined
        }
        this.animating = false
    },

    step () {

        var now    = Date.now ()
        var travel = Math.min (1.0, ((this.lastTime = now) - this.startTime) / (this.duration * 1000.0))
        if (travel < 1.0) {

            this.animating = true
            this.value     = this.easing (this.start, this.target, travel)
            this.animFrame = requestAnimationFrame (this.step) }

        else {
            this.value     = this.target
            this.animating = false          } } })


/*  TODO: write 1-vector and get rid of this doubling...   */

$global.Easing = {

    scalar: {

        linear: (a, b, t) => a + (b - a) * t,
        in:     (a, b, t) => a + (b - a) * Math.pow (t, 2),
        out:    (a, b, t) => b - (b - a) * Math.pow (1.0 - t, 2),
        inOut   (a, b, t) {
                    const c = b - a
                    if (t < 0.5) {
                        return a + (c * (Math.pow (t * 2.0, 2) * 0.5)) }
                    else {
                        return b - (c * (Math.pow (2.0 - (t * 2.0), 2) * 0.5)) } } },

    vector: {

        linear: (a, b, t) => a.add (b.sub (a).scale (t)),
        in:     (a, b, t) => a.add (b.sub (a).scale (Math.pow (t, 2))),
        out:    (a, b, t) => b.sub (b.sub (a).scale (Math.pow (1.0 - t, 2))),
        inOut   (a, b, t) { const c = b.sub (a)
            if (t < 0.5) {
                return a.add (c.scale (Math.pow (t * 2.0, 2) * 0.5)) }
            else {
                return b.sub (c.scale (Math.pow (2.0 - (t * 2.0), 2) * 0.5)) } },

    }
}