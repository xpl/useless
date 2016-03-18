;(function ($ /* JQUERY */) {

/*  ======================================================================== */

DOMMutationDebugger = $component ({

    $traits: [DOMReference, DOMEvents],

    $defaults: {
        vis: {},
        frames: [],
        currentFrame: 0,
        startFrame: 0,
        loop: false },

    $requires: {
        source: _.isTypeOf.$ (Node) },

    playbackComplete: $barrier (true),

    restart: function () {
        this.el.empty ()
        this.currentFrame = this.startFrame },

/*  ======================================================================== */

    $private: {

        init: function () {

            this.currentFrame = this.startFrame

            this.domReady (
                (this.el = $(this.dom || '<div>')
                    .addClass ('dom-mutation-debugger')
                    .css ({ position: 'relative' })).get (0))

            this.captureFrame () },

        nodeVis: function (id) { var el = $('#' + id)
            return (el.length && el) || $('<span>')
                .attr ('id', id)
                .css ({ display: 'block', background: 'rgba(255,0,0,0.25)' })
                .appendTo (this.el)
                .animateWith ('dom-mutation-debugger-appear') },

        evalHeight: $allowsRecursion (function (node) {
            return (node._visHeight = _.reduce ((!node.forbidsEditing && node.childNodes) || [],
                        this.$ (function (sum, node) { return sum + this.evalHeight (node) + 10 }), 25)) }),

        captureLayout: $allowsRecursion (function (node, xPos, yPos, z, data, cursor, next) {

            data.push ({
                id: node._debugVisId || (node._debugVisId = ('vis' + Format.randomHexString (6))),
                css: { left: xPos + 'px', top: yPos + 'px', width: '200px', height: node._visHeight + 'px', zIndex: z,
                       position: (z === 0) ? 'relative' : 'absolute',
                       background:
                            node.forbidsEditing                   ? 'rgba(0,0,0,0.25)'   :
                                ((cursor && cursor.node) === node ? 'rgba(0,0,255,0.25)' :
                                    ((next === node)              ? 'rgba(0,255,0,0.25)' :
                                                                    'rgba(255,0,0,0.25)')) },
                text: node.nodeType === Node.TEXT_NODE ? node.nodeValue : node.tagName.quote ('<>') })

            _.reduce ((!node.forbidsEditing && node.childNodes) || [], this.$ (function (yPos, node) {
                this.captureLayout (node, xPos + 10, yPos, z + 1, data, cursor, next)
                return yPos + node._visHeight + 10 }), yPos + 25) }),

        captureFrame: function () { var frame = []

            var cursor = NormalizedCaretPosition.current

            this.evalHeight    (this.source)
            this.captureLayout (this.source, 0, 0, 0, frame, cursor, null)

            if (frame.length) {
                this.frames.push (frame)
                this.playbackComplete (this.playFurther) } },

        playFurther: function () {

            if (this.currentFrame < this.frames.length) { var animated = false

                this.playbackComplete.reset ()

                this.el.find ('span').addClass ('dirty')

                _.each (this.frames[this.currentFrame++], function (state) { var vis = this.nodeVis (state.id)

                    animated = animated || !(_.isEqual (foo = _.map (_.values (_.omit (state.css, 'background')), _.asString),
                                                        bar = _.map (_.keys (_.omit (state.css, 'background')), vis.css.arity1, vis)))

                    vis.css (state.css).text (state.text).removeClass ('dirty') }, this)

                this.el.find ('span.dirty').each (function (i, span) { animated = true
                    $(span).transitionWith ('dom-mutation-debugger-disappear', function () {
                        this.remove () }) })

                this.playbackComplete (this.playFurther)
                this.playbackComplete.delayed (animated ? 1100 : 0) (true) }

            else if ((this.frames.length > 0) && this.loop) {
                _.delay (this.$ (function () {
                    this.currentFrame = this.startFrame
                    this.el.empty ()
                    this.playbackComplete (this.playFurther) }), 1000) } } }
})

/*  ======================================================================== */

}) (jQuery);