/*  ======================================================================== */

_.deferTest (['Array', 'squash'], function () {

      $assert ( [['all','your',                'to','us'],
                 [      'your',       'belong',     'us'],
                 [             'base','belong','to'     ],
                 [      'your','base'                   ]].squash (),
               /* -------------------------------------- */
                 ['all','your','base','belong','to','us'])


/*  ======================================================================== */

}, function () {    /*  Seems like the algoritm is O(N²) in the worst case,
                        but it can be optimized to O(N log N).
                        ---------------------------------------------------- */

    Array.prototype.squash = function (cfg) {
                                       cfg = cfg || {}

        var key  = cfg.key  || _.identity,  //  for element key extraction
            sort = cfg.sort || undefined    //  should be fn(a,b) -> {-1,0,1}

        var head  = { key: null, next: {} }
        var nodes = {}

        _.each (this, function (arr) {
                        for (var i = 0, n = arr.length, prev = head, node = undefined; i < n; i++, prev = node) {
                            var item = arr[i]
                            var k    = key (item)
                            node = nodes[k] || (nodes[k] = { key: k, item: item, next: {} })
                            if (prev) {
                                prev.next[k] = node } } })

        var decyclize = function (  visited, node) {
                                    visited[ node.key] = true

                                    node.next = _.chain (_.values (node.next))
                                                    .filter (function (node) { return !(node.key in visited) })
                                                    .map (_.partial (decyclize, visited)).value ()
                                    
                                    delete visited[node.key]; return node }

        var ordered = function (    a,    b) {
                            return (a === b) || _.some (a.next, function (aa) {
                                                          return ordered (aa, b) }) }

        var flatten = function (node) { if (!node) return []

                            var next = sort ? _.sortBy (node.next || [], sort) : (node.next || [])

                            return [node].concat (flatten (_.reduce (next, function (a, b) {

                                if (a === b)             { return a }
                                else if (ordered (b, a)) { b.next.push (a); return b }
                                else                     { a.next.push (b); return a } }))) }

        return _.rest (
               _.pluck (flatten (decyclize ({}, head)),
                       'item'))
    }

})

/*  ======================================================================== */

_.deferTest (['DAG', 'squash'], function () {

    var modules = {
        
        'tier1':   { requires: [] },
        'tier11':  { requires: ['tier1'] },
        'tier2':   { requires: ['tier0'] },
        'tier111': { requires: ['tier12', 'tier100'] },
        'tier12':  { requires: ['tier0',  'tier11', 'tier2'] },
        'tier100': { requires: ['tier10'] },
        'tier0':   { requires: [] },
        'tier10':  { requires: ['tier0', 'tier2'] },
        'root':    { requires: ['tier2', 'tier111'] } }

    $assert (
        DAG.squash ('root', { items: function (x) { return modules[x].requires } }),
        ["tier0", "tier1", "tier11", "tier2", "tier10", "tier12", "tier100", "tier111"])

/*  ======================================================================== */

}, function () {

    $global.define ('DAG', {

            squash: function (node0,    cfg) {
                                    var cfg = cfg       || {},
                                      items = cfg.items || _.noop,
                                        run = function (X, edges) {
                                                           edges = edges || []
                                                    
                                                    if ((ix = items (X)) &&
                                                         ix.length) {
                                                         ix.reduce  (function (B, A) { edges.push ([A, B]); return A       })
                                                         ix.forEach (function (   U) { edges.push ([X, U]); run (U, edges) }) }

                                                    return edges  }
                            return  run  (node0)
                                .squash  (cfg)
                                .remove  (node0)
                                .reverse () } })
})

/*  ======================================================================== */

