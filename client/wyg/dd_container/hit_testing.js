;(function ($ /* JQUERY */) {

/*  ======================================================================== */

DDContainer_HitTesting = $trait ({

    $defaults: {
        margin: 10 },

    Hit: $const ($prototype ({

        toString: function () {
            return _.nonempty ([this.row  && ('row #'  + $(this.row).ddData ().index),
                                this.item && ('item #' + $(this.item).ddData ().index),
                                this.side_v,
                                this.side_h,
                               (this.outside_v && 'outside_v') || undefined,
                               (this.outside_h && 'outside_h') || undefined]).join (' ') },

        equals: function (other) { return other &&
                   (this.item                === other.item) &&
                  ((this.row && this.row[0]) === (other.row && other.row[0])) &&
                   (this.side_v              === other.side_v) &&
                   (this.side_h              === other.side_h) &&
                   (this.outside_v           === other.outside_v) &&
                   (this.outside_h           === other.outside_h) } })),

    hitTest: function (pt) { var row = this.rowAt (pt)
                             var result = new DDContainer_HitTesting.Hit ({
                                    row:        row && $(row),
                                    side_v:     undefined,
                                    side_h:     undefined,
                                    outside_v: (pt.y < 0) || (pt.y >= this.contentHeight),
                                    outside_h: (pt.x < 0) || (pt.x >= this.width) })

                if (result.row) { var rowItems = result.row.children ('.dd-item:not(.placeholder):not([no-layout])')

                    rowItems = _.sortBy (rowItems, function (item) { return item.ddData.index })

                    var rowData = result.row.ddData ()

                    var t = rowData.pos.y,
                        h = rowData.size.h + rowData.computedBottomMargin
                    var b = t + h

                    var noInbetween        = rowItems.length ? false : true
                    var inbetweenTolerance = h / (noInbetween ? 2.0 : 3.0)

                    if (pt.y < Math.floor (t + inbetweenTolerance)) {
                        result.side_v = 'top' }

                    else if (noInbetween || (pt.y > Math.floor (b - inbetweenTolerance))) {
                        result.side_v = 'bottom' }

                    result.item = _.find (rowItems, this.$ (function (item, n, arr) {
                                    
                                        var l = item.ddData.pos.x
                                        var w = item.ddData.size.w
                                        var r = l + w + this.margin

                                        var inbetweenTolerance = w / 2.0
                                        var first = (n === 0)
                                        var last  = (n === (arr.length - 1))

                                        if ((first || (pt.x >= l)) && ((pt.x < r) || last)) {

                                            if (pt.x <= Math.floor (l + inbetweenTolerance)) {
                                                result.side_h = 'left' }

                                            if (pt.x >= Math.floor (r - inbetweenTolerance)) {
                                                result.side_h = 'right' }

                                            return true } })) }

                return result },

    rowAt: function (pt) {

                var found = _.find (this.el.children (':not(.placeholder):not([no-layout])'),
                                    this.$ (function (row, i, all) {

                                        var first = (i === 0)
                                        var last  = (i === (all.length - 1))

                                        var data = row.ddData

                                        var t = data.pos.y
                                        var b = data.pos.y + data.size.h + data.computedBottomMargin

                                        return (first || (pt.y >= t)) && ((pt.y < b) || last) }))

                return found && $(found) } })

/*  ======================================================================== */

}) (jQuery);