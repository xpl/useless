/*  Provides WYSIWYG experience for media links
    ======================================================================== */

ContentEditable_PastingMedia = $trait ({

/*  API
    ======================================================================== */

    $requires: {
        mediaPlayer: 'function' },

    $defaults: {
        allowedTags: {
            a: { href: true,
                 busy: true } } },

    scheduleForMediafying: function (a) {
         var mp  = this.mediaPlayer (a.href)
         if (mp) { this.mediafy     (a, mp, { singleInRow: true }) }
            else { this.turnBusy    (a, true)
                        Image.fetch (a.href)
                             .done (
                                 this.$ (function (img) { this.mediafy  (a, img, { originalSize: Vec2.xy (img.width, img.height) }) }),
                                 this.$ (function ()    { this.turnBusy (a, false) })) } },

    nodeChanged: function (node) {
        if (node.isHyperlink && node.href) {
            if (!node.scheduledForMediafying) {
                 node.scheduledForMediafying = true
                 this.scheduleForMediafying (node) } } },

    mediafy: $customCommand (function (a, contentChild, ddData) { var $ = jQuery 

                                var p = Node.paragraph

                                p.className   = 'dd-row'
                                p.setAttribute ('contenteditable', 'false')
                                p.appendChild  (this.initDragForItem ($(contentChild).ddData (ddData)
                                                                                     .appearWithAnimation ())[0])
                                p.insertMeBefore (this.dom.splitSubtreeBefore (a))
                                a.removeFromParent () }),

    turnBusy: function (node, yes) {
                        node.toggleAttribute ('busy', yes) },

/*  Bindings
    ======================================================================== */

    processPaste: $on ('paste', function (e) {
                                    var types = e.clipboardData.types
                                    if (types[0] && types[0] === 'text/plain') {
                                        e.preventDefault () 
                                        e.clipboardData.items[0].getAsString (this.$ (function (txt) {
                                            var parsedURL  = this.parseURL (txt)
                                            if (parsedURL) { this.embedURL (parsedURL) }
                                                      else { this.insertText (txt) } })) } }),

/*  Impl.
    ======================================================================== */

    parseURL: function (txt) {
        if ((txt.indexOf ('http://') === 0) ||
            (txt.indexOf ('https://') === 0)) {
                var parser = document.createElement ('a');
                    parser.href = txt
                if (parser.hostname) { return parser } } },


    embedURL: function (url) { var escaped = _.escape (url)
        this.insertHTML ('<a href="' + escaped + '">' + escaped + '</a>')
        this.cleanupEmptyParagraphLeftAfterVideoIsInserted () },

    cleanupEmptyParagraphLeftAfterVideoIsInserted: $customCommand (function () { // fixes nasty glitch, happens for unknown reason... this is simple workaround
        var p = this.currentParagraph
        if (p &&
            p.isEmptyParagraph) { p.removeFromParent () } }) })



