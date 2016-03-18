/*  Front-end API for the WYSIWYG component
    ======================================================================== */

Wyg_ContentAPI = $trait ({

    $defaults: {
        value: {
            blocks: [{  type:  'p',
                        html: '<br>' }] } },

    /*  Bind to this to get notified on content modifications
     */
    
    contentReseted: $trigger (),
    contentChanged: $trigger ($on ('input', function () { this.updateEmptyStatus () })),

    isEmpty: $observableProperty (false, function (value) { this.domReady (function (dom) {
                                                                                     dom.toggleAttribute ('data-empty', value) }) }),


    /*  This is used for testing/debugging purposes, to set/extract legit content use 'value' property (not fully implemented yet)
     */
    html: $property ({
        
        set: function (v) { this.historyReady (function () {
                                this.resetContent (function () { this.el.html (v) }) }) },

        get: function () {  var copy = this.el.clone ().remove ('.dd-placeholder')
                                copy.find ('*[style]').removeAttr ('style')
                         return copy.html () } }),


    /*  Use this API for set/extract proper content value
     */
    value: $property ({

        get: _.notImplemented, // TODO: implement

        set: function (value) {
                this.historyReady (function () {
                    this.resetContent (function () { var $ = jQuery
                        this.el.addClass ('noanimate').append (
                            _.map (value.blocks, function (block) { switch (block.type) {
                                                    case 'p':
                                                        this.el.append ($('<p>').html (block.html)); break
                                                    case 'images':
                                                        this.el.append ($('<p id="dd-demo" class="dd-row" contenteditable="false">').append (
                                                            _.map (block.images, function (img) {
                                                                return this.initDragForItem ($('<img>').attr (img).ddData ({
                                                                    originalSize: Vec2.xy (img.width, img.height) })) }, this))); break } }, this))
            
                        this.el.removeClass.delayed ().call (this.el, 'noanimate') }) }) } }),


    /*  Use this for resetting content with custom fill actions
     */
    resetContent: function (fillActions) {
                                this.el.empty ()
                                this.resetHistory ()
                                this.$ (fillActions) ()
                                this.contentReseted ()
                                this.contentChanged () },

    /*  ...like this (degenerate case)
     */
    clear: function () {
        this.resetContent (_.noop) },


/*  Bindings/impl
    ======================================================================= */

    undoHappened: function () { this.contentChanged () },
    redoHappened: function () { this.contentChanged () },

    paragraphs: $property (function () {
                                return _.filter (this.dom.childNodes, function (n) {
                                    return n.isParagraph &&
                                          !n.isDDPlaceholder }) }),

    updateEmptyStatus: function () {
                            this.isEmpty = _.reduce2 (true, this.paragraphs, function (allEmpty, p) {
                                                                                    var isEmpty = !p.isDDRow && p.isEmptyParagraph
                                                                                        p.toggleAttribute ('data-empty', isEmpty)
                                                                                        return allEmpty && isEmpty }) },


/*  Firefox has this nasty resizing handles for absolute-positioned elements
    contained within a contenteditable.

    FIXME: doesn't work. Should make a work-around that switches between
    absolute and static positioning on demand (when dragging turns on).
    ======================================================================= */

    //turnOffResizingHandlesInFirefox: $on ('selectionchange', function () { this.execCommand ('enableObjectResizing', 'false') })

})