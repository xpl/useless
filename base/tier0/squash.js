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

        var head  = { key: null, next: {}, depth: {} }
        var nodes = {}

        _.each (this, function (arr) {
                        for (
                            var i = 0, n = arr.length, prev = head, node = undefined; i < n; i++, prev = node) {
                            var item = arr[i]
                            var k    = key (item)
                            node = nodes[k] || (nodes[k] = { key: k, item: item, next: {}, depth: {} })
                            if (prev) {
                                prev.next [k] = node
                                prev.depth[k] = 0 } } })

        var decyclize =
            function (  visited, node, prev, depth) { depth = depth || 0
                        visited [node.key] = true                    
                                 node.next = _.filter2 (
                                             _.values (node.next),
                                                 function (next) {
                                                       if (next.key in visited) { return false }
                                                       else {
                                                            next  = decyclize (visited, next, node)
                                                            depth = Math.max (depth, node.depth[next.key])
                                                            return next } })
                if (prev) {
                    prev.depth[node.key] = Math.max (prev.depth[node.key] || 0, depth + 1) }

                delete visited[node.key]
                return         node }

        var ordered = function (    a,    b) {
                            return (a === b) || _.some (a.next, function (aa) {
                                                          return ordered (aa, b) }) }

        var flatten = function (node) { if (!node) return []

                            var next = (node.next || []).sort (
                                          function (a, b) { return (node.depth[a.key] || 0) <
                                                                   (node.depth[b.key] || 0) })
              /* DEBUG */   if (false) {
                                log.gg (node.key)
                                log.pp (next.map (function (next) {
                                                        return next.key + ' ' +
                                                               node.depth[next.key] })) }

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
        DAG.squash ('root', { nodes: function (x) { return modules[x].requires } }),
        ["tier1", "tier0", "tier11", "tier2", "tier10", "tier12", "tier100", "tier111"])

/*  ======================================================================== */

}, function () {

    DAG = function (cfg) {
                    this.cfg   = cfg       || {},
                    this.nodes = cfg.nodes || _.noop },

    DAG.prototype.each = function (N, fn, prev,  visited) {
                                                 visited = visited || new Set ()

                                            if (!visited.has (N)) { 
                                                 visited.add (N);   var self  = this,
                                                                        nodes = this.nodes (N) || [],
                                                                        stop  = fn.call (this, N, {     nodes: nodes,
                                                                                                         prev: prev,
                                                                                                      visited: visited })
                                                if (stop !== true) {
                                                    nodes.forEach (function ( NN) {
                                                                   self.each (NN, fn, N, visited) }) } }; return visited },
    DAG.prototype.edges = function (N) {
                                var edges = []
                                    this.each (N, function (N, context) {   context .nodes
                                                                                    .concat (N)
                                                                                    .reduce (function (A, B) {
                                                                                          edges.push ([A, B]); return B }) }); return edges },
    DAG.prototype.squash = function  (node0) {
                  return this.edges  (node0)
                             .squash (this.cfg)
                             .remove (node0) }

    DAG.squash = function (node0, cfg) { return new DAG (cfg).squash (node0) }

})

/*  ======================================================================== */

