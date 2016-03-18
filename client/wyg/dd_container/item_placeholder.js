;(function ($ /* JQUERY */) {

/*  ======================================================================== */

DDContainer_ItemPlaceholder = $trait ({

    $requires: {
        makeAddIcon: 'function' }, // fn () → Node

    $defaults: {
        activePlaceholderSize: Vec2.xy (1920, 1080), // numbers here encode proportions, not actual onscreen size
        restPlaceholderHeight: 40 },

    /*makeRowPlaceholder: function () {
        return $('<div class="dd-row placeholder">') },*/

    beforeLayout: function () {
                    if (this.itemPlaceholder && !this.itemPlaceholder.hasClass ('drag-accept')) {
                        this.itemPlaceholder.ddData ({ originalSize: Vec2.xy (this.width, this.restPlaceholderHeight) }) } },

    initPlaceholder: function () {
                        $(this.dom).append (
                            this.rowPlaceholder = this.makeRowPlaceholder ().append (
                                this.itemPlaceholder = $('<div class="dd-item placeholder icon-holder" no-history>').append (
                                    this.makeAddIcon ()))) },

    releaseRowPlaceholder: function () {

                                if (this.rowPlaceholder.children ('.dd-item:not(.placeholder)').length) {

                                    /*  Re-attach to appear in DOM mutation history
                                        TODO: get rid of that ugly workaround...
                                        TODO: get rid of jQuery
                                     */
                                    var next =  this.rowPlaceholder[0].nextSibling
                                                this.rowPlaceholder.detach ()
                                                this.rowPlaceholder.removeClass ('placeholder active')[0].noHistory = false
                                                this.el[0].insertBefore (this.rowPlaceholder[0], next)

                                    this.rowPlaceholder = this.makeRowPlaceholder ().appendTo (this.el)
                                    this.layout ({ allowWrite: _.equals (this.rowPlaceholder[0]) }) }

                                else if (this.rowPlaceholder.hasClass ('active')) {

                                    this.rowPlaceholder.removeClass ('active').appendTo (this.el)
                                    this.layout ({ allowWrite: _.equals (this.rowPlaceholder[0]) }) }

                                return this.rowPlaceholder },

    releasePlaceholder: function () {
                            this.moveItem (this.itemPlaceholder.removeClass ('drag-accept'),
                                { row: this.releaseRowPlaceholder () },
                                { write: false }) },

    replacePlaceholderWith: function (item) { item = _.eval (item)

                                if (item && this.itemPlaceholder.hasClass ('drag-accept')) {

                                    /*  This is needed to get rid of placeholder references in DOM mutations history
                                     */
                                    var parentNode = this.itemPlaceholder[0].parentNode
                                        parentNode.insertBefore (item[0], this.itemPlaceholder[0].nextSibling)

                                    if (item.ddData ().size) {

                                        var itemBBox = this.itemBBox (item)
                                        var sourceW  = item.ddData ().size.w 
                                        var targetW  = this.itemPlaceholder.width ()

                                        item.transform ({ scale: 1 })
                                            .css ('transform-origin', '50% 50%')
                                            .css (itemBBox.ltwh)
                                            .animateWith ((sourceW > targetW) ?
                                                        'dd-container-item-placement-mooz' :
                                                            (sourceW < targetW) ?
                                                                'dd-container-item-placement-zoom' : undefined) } }

                                this.releasePlaceholder.postpone () },

    moveItemPlaceholder: function (item, target, cfg) {

                                this.moveItem (this.itemPlaceholder
                                                    .addClass ('drag-accept')
                                                    .ddData ({ originalSize: item ?
                                                                    item.ddData ().originalSize :
                                                                    this.activePlaceholderSize }),
                                               target,
                                               _.extend ({ write: false }, cfg))

                                if (item) {
                                    item.css ({
                                        transform: 'scale(' + (this.itemPlaceholder.width () / item.ddData ().size.w) + ')' }) } } })


/*  ======================================================================== */

}) (jQuery);