/*  Working with spanning selections

    TODO: fix formatting issue causing Sublime to think that tab width is 2
    ======================================================================== */

$mixin (Range, {

    data: $property (function () { return _.pick (this, 'startContainer', 'endContainer', 'startOffset', 'endOffset') }),

    make: $static (function (cfg) {
            var range = document.createRange ()
                range.setStart (cfg.startContainer, cfg.startOffset)
                range.setEnd   (cfg.endContainer,   cfg.endOffset)
        return (range) }),

    collapseToEnd: $callableAsFreeFunction (function () {
                                                if (this) { this.collapse (false) } }),

    equals: $callableAsFreeFunction (function (other) {
                return (other && (this.startContainer === other.startContainer) &&
                                 (this.endContainer   === other.endContainer) &&
                                 (this.startOffset    === other.startOffset) &&
                                 (this.endOffset      === other.endOffset)) || false }),

    isWithinNode: $callableAsFreeFunction (function (node) {
                return (this &&
                        this.commonAncestorContainer &&
                        this.commonAncestorContainer.matchUpwards (_.equals (node))) ? true : false }),

    /*  Omit 'position' to select entire node, or pass it to make a 'collapsed' range (i.e. caret position)
     */
    withinNode: $static (function (node, position, endPosition) {
                            return Range.make ({ startContainer: node, startOffset: (position || 0),
                                                   endContainer: node,   endOffset: (position !== undefined)
                                                                                        ? ((endPosition !== undefined) ?
                                                                                            endPosition : position)
                                                                                        : node.length }) }),
    selectNode: $static (function (node, position, endPosition) {
                            Range.current = Range.withinNode (node, position, endPosition) }),

    /*  NB: use CaretPosition.survives for collapsed-range cases, as it's far more smart, accounting
            node removal and normalization. Anyway, if it's not needed, following method will fit well.
     */
    survives: $static (function (apocalypse) {                  var range = Range.current
                                 apocalypse ();     Range.current = range }),
    
    wrapIn: function (node) {
        this.insertNode (node.appendChildren (this.extractContents ()))
        Range.current = Range.withinNode (node)
        return node },

    normalized: $property (function () {

                              /*  If you select whole <p> by triple-clicking, it will set endContainer to next <p> with startOffset=0.
                                  That kind of behavior breaks some algorithms checking whether a selection spans across several
                                  elements. So need a normalization procedure.
                               */
                              if (this.collapsed && (this.endOffset === 0) &&
                                  this.endContainer.previousSibling) {
                                
                                      return Range.make ({
                                                startContainer: this.startContainer,                startOffset: this.startOffset,
                                                  endContainer: this.endContainer.previousSibling,    endOffset: this.endContainer.length }) }
                              else {
                                  return this } }),

    current: $static ($property ({

        get: function () {      var sel = window.getSelection ()
                            return (sel.rangeCount === 1) ?
                                    sel.getRangeAt (0) : undefined },

        set: function (r) { var sel = window.getSelection ();
                                sel.removeAllRanges ()
                   if (r)     { sel.addRange (r) } } })) })


/*  Working with collapsed-case selection range
    ======================================================================== */

CaretPosition = $prototype ({

    //$traits: [Testosterone.LogsMethodCalls],

    constructor: function (node, offset) {
                      this.node   = node
                      this.offset = offset || 0 },

    $log: { $verbose: {

          move: $static (function (node, pos) { CaretPosition.current = new CaretPosition (node, pos) }),
         reset: $static (function ()          { CaretPosition.current = null
                                               _.invoke (document.querySelectorAll ('textarea, input, [contenteditable=true]'), 'blur') }),

       restore: function () { CaretPosition.current = this } } },

          copy: $property (function () { return new           CaretPosition (this.node, this.offset) }),
    normalized: $property (function () { return new NormalizedCaretPosition (this.node, this.offset) }),
       asRange: $property (function () { return            Range.withinNode (this.node, this.offset) }),

    isWithinNode: $callableAsFreeFunction (function (node) {
        return (this &&
                this.node.matchUpwards (_.equals (node))) || false }),

    equals: function (other) {
              return (other && (this.node   === other.node) &&
                               (this.offset === other.offset)) || false },

    denormalized: $property (function () { // Firefox doesn't like caret position set to <br>, so need to denormalize that
                                if (this.node.isLinebreak && this.node.parentNode) {
                                    return new CaretPosition (
                                                    this.node.parentNode,
                                                    this.node.parentNode.childNodesArray.indexOf (this.node)) }
                                return this }),

    current: $static ($property ({
                        set: function (cursor) {       Range.current = cursor && cursor.denormalized.asRange },
                        get: function () { var range = Range.current
                                       return (range &&
                                               range.collapsed && new CaretPosition (range.startContainer,
                                                                                     range.startOffset)) || undefined } })),

    survives: $static ($log ('{{$proto}} {{_.stringify (this.current && this.current.normalized || "{ null }")}}',

                                         function ( domContext,
                                                    apocalypse) { var caret = NormalizedCaretPosition.current,
                                                                      stack = [caret]
                                     if (!caret) {  apocalypse () }
                                            else {  DOMObserver.doWith ({    desc: 'CaretPosition',
                                                                           target:  domContext,
                                                                          removed:  function (n, prev, e) {
                                                                                      if (!e.relocating) {
                                                                                          if (stack.top.node === n) { //log.alert ('CaretPosition — handling sudden node removal:', n)
                                                                                              stack.push (new CaretPosition (
                                                                                                              stack.top.node.nextInnermostSibling ||
                                                                                                              stack.top.node)) } } },

                                                                          inserted: function (n) { //if (stack.contains (n)) { log.alert ('CaretPosition — restoring caret back to:', n) }
                                                                                              stack =
                                                                                              stack.before (n) } }, apocalypse.$ (caret))

                                                    if (!stack.top.equals (CaretPosition.current) &&
                                                         stack.top.node.isAttachedToDocument) {
                                                         stack.top.restore () } } })) })


/*  'Normal form' for cursor location (drilled down to innermost node)
    ======================================================================== */

NormalizedCaretPosition = $extends (CaretPosition, {

    //$traits: [Testosterone.LogsMethodCalls],

    constructor: function (node, offset) { this.node   = node
                                           this.offset = offset || 0
                          this.drillDown  ()                            
                          this.drillRight () },

    drillDown: function () {
                  while (         this.node.hasChildren) {
                      var inner = this.node.childNodes[this.offset]
                      if (inner &&
                         (inner.isElement ||
                          inner.isText)) { this.node   = inner
                                           this.offset = 0 } else { break } } },

    drillRight: function () {
                   while (this.node.nextSibling &&
                         (this.offset >=   this.node.length)) {
                          this.offset  = -(this.node.length - this.offset)
                          this.node    =   this.node.nextSibling } },

    normalized: $property (function () {
                             return this }),

    move: $static (function (node, pos) { NormalizedCaretPosition.current =
          new CaretPosition (node, pos) }),

    current: $static ($property ({
                         set: function (cursor) {        CaretPosition.current =       cursor && cursor.normalized },
                         get: function () { var cursor = CaretPosition.current; return cursor && cursor.normalized } })),

})

/*  This is for tests convenience.
    ======================================================================== */

TextSelectionCodecForTestingPurposes = $trait ({

    decodeTextSelection: function (html) {  if (html) { this.dom.innerHTML = html }
                                            var rangeData = {}

        this.dom.walkTree ({ what: NodeFilter.SHOW_ALL }, function (node) {

            if (node.isText) {
                var pos = -1

                if ((pos = node.nodeValue.indexOf ('|')) >= 0) { node.nodeValue = node.nodeValue.replace ('|', '')
                                                                 NormalizedCaretPosition.move (node, pos) }

                if ((pos = node.nodeValue.indexOf ('[')) >= 0) { node.nodeValue = node.nodeValue.replace ('[', '')
                                                                 _.extend (rangeData, { startContainer: node, startOffset: pos }) }

                if ((pos = node.nodeValue.indexOf (']')) >= 0) { node.nodeValue = node.nodeValue.replace (']', '')
                                                                 _.extend (rangeData, {   endContainer: node,   endOffset: pos }) } }

            else if (node.isElement) {
                 if (node.getAttribute ('i') !== null) {
                    NormalizedCaretPosition.move (node) } } })

        if (rangeData.startContainer && rangeData.endContainer) {
            Range.current = Range.make (rangeData) } },

    encodeTextSelection: function () { var caret = NormalizedCaretPosition.current

        if (caret) { this.encodeCaretPosition (caret) }
              else { this.encodeRange (Range.current) }

        return this.dom.innerHTML },

    encodeCaretPosition: function (where) {

        this.dom.walkTree ({ what: NodeFilter.SHOW_ALL }, function (node) {

                                if (node.isText)              {     node.nodeValue = node.nodeValue.replace              ('|', '')
                                     if (node === where.node) {     node.nodeValue = node.nodeValue.insert (where.offset, '|') } }
                            
                                else if (node.isElement)      {     node.removeAttribute ('i')
                                     if (node === where.node) {     node.setAttribute    ('i', '') } } }) },

    encodeRange: _.notImplemented })






