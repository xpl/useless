;(function ($ /* JQUERY */) {

/*  ======================================================================== */

$mixin (Node, {

    $property: {
        
        isDDRow:         function () { return this.className.contains ('dd-row') },
        isDDItem:        function () { return this.className.contains ('dd-item') },
        isDDPlaceholder: function () { return this.className.contains ('placeholder') },

        ddData: {
            get: function ()      { return (this.ddData_ || {}) },
            set: function (value) { return (this.ddData_ = _.extend (this.ddData, value)) } } } })

/*  ======================================================================== */

$.fn.extend ({
    ddData: function (value) {    var dom = this[0];
                  if (value) {        dom.ddData = value; return this }
                        else { return dom.ddData } } })

/*  ======================================================================== */

DDContainer_ItemPositioning = $trait ({

    $defaults: {
        margin: 10 },

    rows: $property (function () {
                        return this.el.children (':not(.placeholder):not(.removing):not([no-layout])') }),

    contentHeight: $observableProperty (0),

    itemBBox: function (item) {
        return item.clientBBox ().offset (
                    this.el.leftTop ().inverse.add (             // relative to this.el
                        Vec2.xy (document.body.scrollLeft,
                                 document.body.scrollTop))) },   // account scroll

    contentBBox: $property (function () {
                                var lastRow = this.rows.last ()
                                return BBox.fromLeftTopAndSize (
                                    Vec2.fromLT (this.el.offset ()), new Vec2 (this.el.width (),
                                        lastRow.length ? (lastRow.ddData ().pos.y +
                                                          lastRow.ddData ().size.h) : 0)) }),
    domReady: function () {
                this.el.addClass ('dd-container') },

    layout: $bindable ($log (function (cfg) { this.domReady (function () {

                var offsetY = this.padding || 0; cfg = cfg || {}

                this.width = this.el.width ()

                /*  Remove empty children
                 */
                this.el.children (':not(.placeholder):not([no-layout]):empty').detach ()

                /*  Compute rows layout
                 */
                _.each (this.el.children (':not(.removing):not([no-layout])'),
                        this.$ (function (row, i, arr) { row  = $(row)
                                                         next = $(arr[i + 1])

                                                    /*  Compute metrics
                                                     */
                                                    var margin = (i === (arr.length - 1)) ? 0 :
                                                                            Math.max (this.margin,
                                                                                Math.max (row .ddData ().margin || 0,
                                                                                          next.ddData ().margin || 0))

                                                    var height = (this.rowLayout (row, cfg, offsetY, i) + margin)

                                                    /*  Write on-screen metrics (CSS styles), this gets displayed immediately
                                                     */
                                                    if ((cfg.css !== false) && row[0].isDDRow) {
                                                        row.css ({
                                                            height: height }) }

                                                    /*  Write off-screen metrics, this is used for hit testing
                                                     */
                                                    if (cfg.write !== false) {
                                                        row.ddData ({ computedBottomMargin: margin }) }

                                                    /*  Update Y
                                                     */
                                                    offsetY += height }))

                /*  Compute height
                 */
                if (cfg.height !== false) {

                    var height = offsetY + (this.padding || 0)

                    if (cfg.css !== false) {
                        this.el.css ('height', height) }
                    
                    if (cfg.write !== false) { var lastRow = this.rows.last ()
                        this.height = height
                        this.contentHeight = lastRow.length ? (lastRow.ddData ().pos.y +
                                                               lastRow.ddData ().size.h) : 0 } } }) })),

    rowLayout: function (row, cfg, offsetY_, index) { cfg = cfg || {}

                    var gridWidth = this.width,
                        margin    = this.margin,
                        offsetY   = (offsetY_ === undefined) ? (row.ddData ().pos && row.ddData ().pos.y) : offsetY_,
                        items     = row[0].isDDRow ? row.children ('.dd-item:not(.removing)') : [row[0]]

                    if (offsetY === undefined) {
                        return 0 }

                    var childMetrics = _.map (items, function (item, i) { item = $(item)

                         var ddData = item.ddData ()
                        if (!ddData.originalSize) {
                            item.ddData (
                                 ddData = { originalSize: item.extent () }) } // compute size, if not specified

                        var w = ddData.originalSize.w,
                            h = ddData.originalSize.h

                        return {
                            originalWidth:  w,
                            originalHeight: h,
                            relativeWidth: (w && h) ? (w / h) : 1  } })

                    var totalRelativeWidth = _.reduce (childMetrics, function (sum, m) { return sum + m.relativeWidth }, 0)
                    var rowWidth           = gridWidth - ((items.length - 1) * margin)

                    _.each (childMetrics, function (m) {
                        m.innerHeight = Math.floor ((1.0 / m.relativeWidth) * (
                            m.innerWidth = Math.min (m.originalWidth,
                                m.outerWidth = Math.floor (rowWidth * (m.relativeWidth / totalRelativeWidth))))) })

                    var rowHeight     = Math.floor (_.min (childMetrics, _.property ('innerHeight')).innerHeight)
                    var rowInnerWidth = ((items.length - 1) * margin) +
                                            _.reduce (childMetrics, function (sum, m) {
                                                return sum + (m.width = Math.floor (rowHeight * m.relativeWidth)) }, 0)

                    var offsetX = this.padding || 0

                    _.each (items, this.$ (function (item, i) { item = $(item)

                        var metrics = childMetrics[i]

                        var size = {
                            width:  metrics.width,
                            height: rowHeight }

                        if (!(cfg.except && (cfg.except[0] === item[0]))) {

                            /*  Write on-screen metrics (CSS styles), this gets displayed immediately
                             */
                            if (cfg.css !== false) {
                                item.css (_.extend (item.hasClass ('drag') ? {} : { // dont touch dragged item position
                                    left: offsetX,
                                    top:  offsetY }, size)) }

                            /*  Write off-screen metrics, this is used for hit testing
                             */
                            if ((cfg.write !== false) && (!cfg.allowWrite || cfg.allowWrite (item[0]))) {
                                item.ddData ({
                                    pos:   Vec2.xy (offsetX, offsetY),
                                    size:  Vec2.xy (size.width, rowHeight),
                                    index: i }) } }

                        offsetX += (size.width + margin) }))

                    /*  Write off-screen metrics for row
                     */
                    if ((cfg.write !== false) && (!cfg.allowWrite || cfg.allowWrite (row[0]))) {
                        row.ddData ({
                            pos:       Vec2. y (offsetY),
                            size:      Vec2.xy (gridWidth,     rowHeight),
                            innerSize: Vec2.xy (rowInnerWidth, rowHeight) })

                        if (index !== undefined) {
                            row.ddData ().index = index }}

                    return rowHeight } })

/*  ======================================================================== */

}) (jQuery);