;(function ($ /* JQUERY */) {

/*  ======================================================================== */

DDContainer_DraggingItems = $trait ({


/*  Public API
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    isDragging: $observableProperty (false, function (yes) {
                                                  if (yes) { CaretPosition.reset () }
                                                  this.domReady (function () {
                                                        this.el.toggleClass ('dragging', yes) }) }),


/*  Private impl.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    toggleRemoving: function (item, yes) {
                        if (item.hasClass ('removing') !== yes) {
                            item.toggleClass ('removing', yes)
                            if (item.siblings ().length === 0) {
                                item.parent ().toggleClass ('removing', yes) } } },

    dragItemTo: function (item, hit) {  var sourceRow = item && item.parent ()

                                        var hitIndex =  hit.row ? hit.row.ddData ().index : -100
                                        var srcIndex = (sourceRow === undefined ? -1000 : sourceRow.ddData ().index)

                                        if (hit.outside_v && hit.row) {
                                            hitIndex = (hit.side_v === 'top') ? -1 : (hitIndex + 1) }


                    if (hit.outside_h) {             this.releasePlaceholder.postpone ()
                                         if (item) { this.toggleRemoving (item, true) } }
                    else {
                                         if (item) { this.toggleRemoving (item, false) }

                        var targetRowCannotAccept = hit.row && (hit.row.children ('.dd-item:not(.placeholder)').length === 0)
                        var delta                 = hitIndex - srcIndex

                        var movingToNewRow =

                                /*  Hit between rows
                                 */
                                (!hit.item || hit.side_v) &&

                                /*  Exclude redundant UX cases when cursor is inside grid
                                 */
                                (hit.outside_v ||
                                    !((hit.side_v === 'top'    && (hitIndex <= srcIndex)) ||                   // if moving upwards, exclude top sides
                                      (hit.side_v === 'bottom' && (hitIndex >= srcIndex))) ||                  // if moving downwards, exclude bottom sides
                                      targetRowCannotAccept) &&

                                /*  Exclude meaningless 'move-next-to-itself' case
                                 */
                                !((((delta === -1) && (hit.outside_v || (hit.side_v === 'bottom'))) ||
                                   ((delta ===  1) && (hit.outside_v || (hit.side_v === 'top')))) &&              // moving to next row
                                  (!sourceRow || (sourceRow.children ('.dd-item:not(.placeholder)').length < 2))) // moving from single-item row

                        if (movingToNewRow) {

                            this.moveItemPlaceholder (item, {
                                row: hit.row
                                        ? ((hit.side_v === 'top' ?
                                            this.rowPlaceholder.insertBefore (hit.row) :
                                            this.rowPlaceholder.insertAfter  (hit.row)).addClass ('active'))
                                        : this.rowPlaceholder }, { layout: false })

                            this.layout ({ except: item, write: false }) }

                        else if (hitIndex === srcIndex) { //log.w ('moving to same row', hit)
                            
                            this.releasePlaceholder.postpone ()
                            this.moveItem (item.css ('transform', 'scale(1)'), hit, { except: item, write: false }) }

                        else if (!hit.outside_v && !targetRowCannotAccept) { //log.e ('moving to other row', hit)

                            this.releaseRowPlaceholder ()
                            this.moveItemPlaceholder (item, hit) } } },

    moveItem: function (item, target, cfg) { target = target || {}; cfg = cfg || {}

                    var sourceRow = item.parent ()

                    if (target.item) {
                        if (target.item !== item[0]) {
                            if (target.side_h === 'left') {
                                if (target.item.previousSibling !== item[0]) {
                                    item.insertBefore (target.item) } }
                            else {
                                if (target.item.nextSibling !== item[0]) {
                                    item.insertAfter (target.item) } } } }

                    else if (!target.side) {
                        target.row.append (item) }

                    if (cfg.layout !== false) {
                        this.rowLayout (target.row, cfg)

                        if (sourceRow[0] !== target.row[0]) {
                            this.rowLayout (sourceRow, cfg) } } },

    initDragForItem: function (item) { var prevHit     = undefined,
                                           isLeftmost  = false,
                                           isRightmost = false

                        return item.addClass ('dd-item').drag ({

                            relativeTo: this.el,

                            start: this.$ (function (where, e) { item.addClass ('drag'); this.isDragging = true;

                                                prevHit = this.hitTest (where)

                                                isLeftmost  = item.is (':first-child')
                                                isRightmost = item.is (':last-child')

                                                /*  Set transform origin to where we picked it (to scale around cursor)
                                                 */
                                                item.css ('transform-origin',
                                                    ((e.offsetX / item.width ())  * 100.0) + '% ' +
                                                    ((e.offsetY / item.height ()) * 100.0) + '%') }),

                            move: this.$ (function (memo, offset, where, e) { var hit = this.hitTest (where)

                                                if (!hit.equals (prevHit)) {
                                                    this.dragItemTo (item, hit)
                                                    prevHit = hit }

                                                /*  Stick item to cursor
                                                 */
                                                item.css (item.ddData ().pos.add (offset).asLeftTop) }),

                            end: this.$ (function () { this.isDragging = false

                                                _.delay (function () { item.removeClass ('drag') });

                                                if (item.hasClass ('removing')) {
                                                    item.animateWith ('disappear', function () {
                                                        item.removeClass ('removing')
                                                        if (item.parent ().hasClass ('removing')) {
                                                            item.parent ().removeClass ('removing').detach () }
                                                        else {
                                                            item.detach () } }) }
                                                else {
                                                    this.replacePlaceholderWith (item) }

                                                this.rowPlaceholder.ddData ({ originalSize: this.restPlaceholderSize })

                                                this.layout.postpone ()
                                                this.contentChanged.postpone () }) }) }

})

/*  ======================================================================== */

}) (jQuery);