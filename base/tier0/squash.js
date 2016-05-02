/*  ======================================================================== */

_.deferTest (['Array', 'squash'], function () {

      $assert ( [['all','your',                'to','us'],
                 [      'your',       'belong',     'us'],
                 [             'base','belong','to'     ],
                 [      'your','base'                   ]].squash (),
               /* -------------------------------------- */
                 ['all','your','base','belong','to','us'])


/*  ======================================================================== */

}, function () { /* Mergesort algorithm is essential to `squash` impl.
                    Doesn't work with the built-in Array.sort function.      */


    var merge = function (a, b, compare) {  for (var out   = []           ; a.length  && b.length ; )   {
                                                     out.  push ( compare ( a      [0] , b      [0] ) < 0
                                                                          ? a.shift( ) : b.shift( ) )   }
                                              return out.concat (a.length ? a          : b        ) }


    Array.prototype.mergeSort = function (compare) {    var  mid   = Math.floor (this .length / 2)
                                                     return (mid   <          1 ) ?  this : 
                                                            (merge ( this.slice ( 0, mid ).mergeSort (compare)    ,
                                                                   ( this.slice (    mid ).mergeSort (compare))   ,
                                                                                                      compare)) }  
    Array.prototype.squash = function (cfg) {

            var cfg  = cfg      || {},
                key  = cfg.key  || _.identity  // for element key extraction

            var itemsSuccessInArrays = [],
                itemsByKey           = {}

            for (var i = 0,     n = this.length; i < n; i++) {
                 var array        = this[i],
                     successByKey = {}

                for (var ii = 0, nn = array.length; ii < nn; ii++) { var item = array [ii],
                                                                         k    = key (item)
                    itemsByKey  [k] = item
                    successByKey[k] = ii }

                itemsSuccessInArrays.push (successByKey) }

            var compare = function (ka,    kb) {                     
                                if (ka === kb) { return          0 }
                                         else  { var upvotes   = 0, // democracy model works surprisingly well here
                                                     downvotes = 0,
                                                       unknown = 0
                                                    for (var i = 0,     n = itemsSuccessInArrays.length, ia, ib; i < n; i++) {
                                                         var successByKey = itemsSuccessInArrays[i]                                    

                                                        if (((ia = successByKey[ka]) !== undefined) &&
                                                            ((ib = successByKey[kb]) !== undefined)) {

                                                            ((ia < ib) ? upvotes  ++ :
                                                             (ia > ib) ? downvotes++ :
                                                                         unknown  ++) }

                                                        else {
                                                            unknown++ } }
                                                    return ((upvotes > downvotes) ?  1 :
                                                            (upvotes < downvotes) ? -1 : 0) } }

                                      var orderedKeys = _.keys (itemsByKey)
            for (var i = 0; i < 4; i++) { orderedKeys = orderedKeys.mergeSort (compare) }

            for (var i = 0,
                     n = orderedKeys.length; i < n; i++) { var key = orderedKeys[i]
                                                                     orderedKeys[i] = itemsByKey[key] }

            return orderedKeys.reverse () }
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

    $assert (['tier0',
              'tier2',
              'tier10',
              'tier1',
              'tier11',
              'tier12',
              'tier100',
              'tier111'], DAG.squash ('root', { items: function (x) { return modules[x].requires } }) )

/*  ======================================================================== */

}, function () {

/*  ======================================================================== */

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

