;(function ($ /* JQUERY */) {

/*  ======================================================================== */

Wyg_DDContainerAdapter = $trait ({

/*  Source of a width and height metrics
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    height: $observableProperty (),


/*  Overrides some DDContainer internals to achieve consistency with
    text editing experience. Need to provide special care about
    autosizing things which are paragraphs.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    interceptLayout: function (cfg, layout) { cfg = cfg || {}
                                    if (cfg.updateParagraphMetrics) {
                                       this.updateParagraphMetrics () }
                                    layout (cfg) },

    updateParagraphMetrics: function () {
                                this.domReady (function () {
                                    this.dom.safeEnumChildren (this.$ (function (n, i) {
                                        if (n.isParagraph && !n.isDDRow) {
                                            n.ddData = { originalSize: Vec2.xy (this.width, $(n).extent ().y), margin: 18 } } })) }) },

    uploadFile: function (file, then) {
        this.uploadImage (file, function (img) {
            then (img && $('<img>')
                                .css ({ width: 0, height: 0 })
                                .attr ({ 'src': img.src })
                                .ddData ({ src: img.src, originalSize: Vec2.xy (img.width, img.height) })) }) },

    makeRowPlaceholder: function () {
        return $('<p contenteditable="false" class="dd-row placeholder" no-history>') },


/*  Binds to isDragging, creating $customCommand context for the entire
    drag operation.

    TODO:   Fix issue when user presses 'undo' too quickly (< 300ms), i.e.
            immediately after drag completes.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    isDragging: function (yes) {
        
        if (Platform.Firefox ||
            Platform.Safari) {
            this.dom.addClass ('static-layout', !yes) }

        if (yes) {
            this.execCustomCommand ('drag', function (done) {
                this.isDraggingChange.when (false, function () {                //  close transaction when isDragging comes to false next time...
                    this.layout.onceAfter (done.delayed (300)) }) }) } },       //  ..and after layout() is called


/*  Adds $silent (see total_recall.js) to initPlaceholder
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    initPlaceholder: function () {
        this.silent ('initPlaceholder', this.$ (DDContainer_ItemPlaceholder.prototype.initPlaceholder)) },


/*  Binds to content events to enforce layout consistency
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    interceptDoCaretReturn: function (impl) {               // fixes Safari-specific layout animation issue
        this.dom.addClass    ('noanimate'); impl.call (this)
        this.dom.removeClass ('noanimate') },

    afterInit: function () {
        _.delay (this.$ (this.layout, { updateParagraphMetrics: true })) },

    layoutOnWindowResize: $on ({ target: window, what: 'resize' }, function (e) {
                         this.layout ({ updateParagraphMetrics: true })
        _.delay (this.$ (this.layout, { updateParagraphMetrics: true }), 100) }),

    contentChanged: function () {
        this.layout ({ updateParagraphMetrics: true }) },

    contentReseted: function () {
        this.initPlaceholder ()
        this.layout ({ updateParagraphMetrics: true }) },


/*  Turns off absolute layout when dragging is not active. This disables
    fancy paragraph sliding animations at typing text, and should be
    considered as a temporary work-around. Should fix it at least for Safari,
    and wait until Firefox implements grabber styling/disabling.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    domReady: function () {
        if (Platform.Firefox || // Firefox has non-disableable grabber handles for absolute-positioned elements.
            Platform.Safari) {  // Safari has keyboard input problems if absolute layout turned on (see "backspace leading to empty paragraph" test in keyboard_input.js)

            this.dom.addClass ('static-layout') } }
})

/*  ======================================================================== */

}) (jQuery);