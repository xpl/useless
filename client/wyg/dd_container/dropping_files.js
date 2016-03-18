;(function ($ /* JQUERY */) {

/*  ======================================================================== */

DDContainer_DroppingFiles = $trait ({

    $requires: {
        makeWaitIcon:     'function',        // fn () -> Node
        uploadFile:       'function' },      // fn (file, then) -> Element

    domReady: function () {
        this.el.addClass ('allow-file-drop') },

    domDragOver: $on ('dragenter dragover', function (e) { if (this.isValidDragEvent (e)) {

        this.el.addClass ('dragging-file')

        var offset = this.el.offset ()

        var hit = this.hitTest ({
            x: e.pageX - offset.left,
            y: e.pageY - offset.top })

        if (!hit.equals (this.prevHit)) {
            this.dragItemTo (undefined, this.prevHit = hit) } }

        e.preventDefault ()
        e.stopPropagation () }),

    domDragLeave: $on ('dragleave', function (e) {

        if (e.target === this.el[0]) {
            this.prevHit = undefined
            this.el.removeClass ('dragging-file')
            this.releasePlaceholder.postpone () }

        e.preventDefault ()
        e.stopPropagation () }),

    domDrop: $on ('drop', function (e) { if (this.isValidDragEvent (e)) {

            this.prevHit = undefined

            var addingToSameRow = this.itemPlaceholder[0].nextSibling ? true : false

            _.each (e.dataTransfer.files, function (file) {
                                                            this.itemPlaceholder.addClass ('drag-accept')
                                                            this.putFileToPlaceholder (file)
                                                            if (!addingToSameRow) {
                                                                this.releasePlaceholder () } }, this)

            this.el.removeClass ('dragging-file') }

        e.preventDefault ()
        e.stopPropagation () }),

    isValidDragEvent: function (e) {
                        return ((e.dataTransfer.files && (e.dataTransfer.files.length > 0)) ||
                                (e.dataTransfer.types &&  e.dataTransfer.types.contains ('Files')) ) },

    putFileToPlaceholder: function (file) {

        var withFileUpload = this.$ (function (file, target) { return this.$ (function () {

            this.uploadFile (file, this.$ (function (el) {

                if (el) {
                    this.initDragForItem (el)
                            .animateWith ('appear')
                            .removeAttr ('no-history')
                            .insertBefore (target) }

                target.remove ()

                this.layout.postpone ()
                this.contentChanged () }))

            return target }) })

        this.replacePlaceholderWith (withFileUpload (file,
            this.initDragForItem ($('<div class="upload-stub icon-holder" no-history>')
                .ddData ({ originalSize: this.activePlaceholderSize })
                .animateWith ('appear')
                .append (this.makeWaitIcon ()))))

        this.layout.postpone () } })


/*  ======================================================================== */

}) (jQuery);