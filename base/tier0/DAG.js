/*  ======================================================================== */

$global.define ('DAG', {})

/*  ======================================================================== */

_.withTest (['DAG', 'sparseZip'], function () {

/*  
    Zips 'sparse' arrays, trying to reconstruct the consistent element order
    from separate weakly-ordered fragments of incomplete data. It has many applications:

    1.  Run-time module dependencies in ES3000 and Marv build system are
        resolved via this algorithm, achieving the predictable and controllable
        initialization order.

    2.  SkyChat app implements serverless P2P chat history that is dynamically
        merged across connected users, requiring no central authority to operate.
        This new technology imposes new challenges: for example, you cannot
        rely on client-generated timestamps when merging chat history fragments
        from different sources. Following algorithm greatly improves merge
        consistency, not distrupting given message order.

        -------------------------------------------------------------------  */

        $assert (DAG.sparseZip ([]), []) // degenerate case

                              /* ----------------------------------------- input  */
        $assert (DAG.sparseZip ([['all','your',                'to','us'],
                                 [      'your',       'belong',     'us'],
                                 [             'base','belong','to'     ],
                                 [      'your','base'                   ]]),
                              /* ----------------------------------------- result */
                                 ['all','your','base','belong','to','us'])

}, function () {

    /*  TODO:   Seems like the algoritm is O(N²) in the worst case, but it can be
                optimized to O(N log N).
                ------------------------------------------------------------ */

    DAG.sparseZip = function (arrays, cfg) {
                                      cfg = cfg || {}

        var key  = cfg.key  || _.identity,  //  for element key extraction
            sort = cfg.sort || undefined    //  should be fn(a,b) -> {-1,0,1}

        var head = { key: null, next: {} }
        var nodes = {}

        _.each (arrays, function (arr) {
            for (var i = 0, n = arr.length, prev = head, node = undefined; i < n; i++, prev = node) {
                var item = arr[i]
                var k    = key (item)
                node = nodes[k] || (nodes[k] = { key: k, item: item, next: {} })
                if (prev) {
                    prev.next[k] = node } } })

        var decyclize = function (visited, node) { visited[node.key] = true

            node.next = _.chain (_.values (node.next))
                            .filter (function (node) { return !(node.key in visited) })
                            .map (_.partial (decyclize, visited)).value ()
            
            delete visited[node.key]; return node }

        var ordered = function (a, b) {
            return (a === b) || _.some (a.next, function (aa) { return ordered (aa, b) }) }

        var flatten = function (node) { if (!node) return []

            var next = sort ? _.sortBy (node.next || [], sort) : (node.next || [])

            return [node].concat (flatten (_.reduce (next, function (a, b) {

                if (a === b)             { return a }
                else if (ordered (b, a)) { b.next.push (a); return b }
                else                     { a.next.push (b); return a } }))) }

        return _.rest (_.pluck (flatten (decyclize ({}, head)), 'item')) }

})

/*  ======================================================================== */

_.withTest (['DAG', 'linearize'], function () {

/*
    A more specific task for the `sparseZip`: linearizing a dependency tree.

        This is rather a common task when you are into building extensible modular
        architectures. Everyone's got modules. And if you got modules, you've got
        dependencies. And while dependencies are typically seen as the flat
        list by a programmer, they're really a deeply nested tree. And deriving
        that flat list from the tree is not a trivial task, considering that the
        order matters: you probably want to initialize/include the most urgent
        stuff first. The following algorithm solves that for you.

        -------------------------------------------------------------------- */


        var modules = {
            
            'tier1':   { requires: [] },
            'tier11':  { requires: ['tier1'] },
            'tier2':   { requires: ['tier0'] },
            'tier111': { requires: ['tier12', 'tier100'] },
            'tier12':  { requires: ['tier0', 'tier11', 'tier2'] },
            'tier100': { requires: ['tier10'] },
            'tier0':   { requires: [] },
            'tier10':  { requires: ['tier0', 'tier2'] },
            'root':    { requires: ['tier2', 'tier111'] } }

        $assert (['tier1',
                  'tier0',
                  'tier11',
                  'tier2',
                  'tier10',
                  'tier12',
                  'tier100',
                  'tier111'], DAG.linearize ('root', { items: _.propertyOf ( modules ).then (
                                                              _.property   ('requires')) }))

/*  ======================================================================== */

}, function () {

    DAG.linearize = function (root, cfg) {

            var cfg        = cfg || { /* key: fn, items: fn */ },

                items      = cfg.items || _.noop,

                asGraph    = function (X, edges) {
                                          edges = edges || []

                                if ((upper = items (X)) &&
                                     upper.length) {

                                     upper.fold (function (B, A) {                          // horizontal edges (order constraints)
                                                   return (edges.push ([A, B]), A) })       // first mentioned should go first

                                     upper.forEach (function (U) {                          // vertical edges
                                                           edges.push ([X, U])              // upper items should go first
                                                              asGraph (    U, edges) }) }
                                return edges }

                return DAG.sparseZip (asGraph (root), cfg)
                          .reverse ()
                          .remove (root) }

/*  ======================================================================== */

})

/*  ======================================================================== */
