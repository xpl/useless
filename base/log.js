var _ = require ('underscore')

_.tests.log = function () {     //  Writes to test's log (as it's off-screen until needed)

    log.write   ('Hello')       //  Use for plain output.

    log.green   ('Green')       //  Use for plain colored output.
    log.blue    ('Blue')
    log.orange  ('Orange')
    log.red     ('Red')

    log.success ('Success')     //  Use for quality production logging (logging that lasts).
    log.ok      ('Success')
    log.info    ('Info')        //  Printed location greatly helps to find log cause in code.
    log.warn    ('Warning')                 
    log.warning ('Warning')     //  For those who cant remember which one, both are valid.
    log.error   ('Error')
    log.failure ('Error')       //  Allows 'log' to be transparently passed as stub handler,
                                //  to where {success:fn,failure:fn} config expected.

    $assert (log.write ('Identity'), 'Identity')    // Can be used for debugging of functional expressions
                                                    // (as it returns it first argument, like in _.identity)

    log.write   ('Default', log.config ({ location: true }))    //  Config is good as any argument.
    log.write   (log.config ({ location: true }), 'Default')    //  First, second or last, doesn't matter.

    log.info    ('You can tune callstack location if its wrong', log.config ({ stackOffset: 2 }))

    log.write   ('Consequent', 'arguments', 'joins', 'with', 'whitespace')

    log.write   (log.boldLine)  //  ASCII art <hr>
    log.write   (log.thinLine)
    log.write   (log.line)

    log.write   (log.color.green,
                    ['You can set indentation',
                     'that is nicely handled',
                     'in case of multiline text'].join ('\n'), log.config ({ indent: 1 }))

    log.orange  (log.indent (2), '\nCan print nice table layout view for arrays of objects:\n')
    log.orange  (log.indent (2), [
        { field: 'line',    matches: false, valueType: 'string', contractType: 'number' },
        { field: 'column',  matches: true,  valueType: 'string', contractType: 'number' }])

    log.write ('\nObject:', { foo: 1, bar: 2, qux: 3 })         //  Object printing is supported
    log.write ('Array:', [1, 2, 3])                             //  Arrays too
    log.write ('Function:', _.identity)                         //  Prints code of a function

    log.write ('Complex object:', { foo: 1, bar: { qux: [1,2,3], garply: _.identity }}, '\n\n') }




_.extend (
    log = function () {                         // For those who constantly mistypes, writing "log (output)" and oops no such API:
        log.write.apply (this, arguments) }, {  // now there's one. At last.


    Color: $prototype (),
    Config: $prototype (),

    /*  Returns arguments clean of config (non-value) parameters
     */
    cleanArgs: function (args) {
        return _.reject (args, _.or (log.Color.isTypeOf, log.Config.isTypeOf)) },

    /*  Monadic operators to help read and modify those control structures 
        in argument lists (internal impl.)
     */
    read: function (type, args) {
        return _.find (args, type.isTypeOf) || new type ({}) },

    modify: function (type, args, operator) {
                return _.reject (args, type.isTypeOf)
                            .concat (
                                operator (log.read (type, args))) } })


_.extend (log, {

    /*  Could be passed as any argument to any write function.
     */
    config: function (cfg) {
        return new log.Config (cfg) },


    /*  Shortcut for common case
     */
    indent: function (n) {
        return log.config ({ indent: n }) },


    /*  There could be many colors in log message (NOT YET), therefore it's a separate from config entity.
     */
    color: {
        red:    new log.Color ({ shell: '\u001b[31m', css: 'crimson' }),
        blue:   new log.Color ({ shell: '\u001b[36m', css: 'royalblue' }),
        orange: new log.Color ({ shell: '\u001b[33m', css: 'saddlebrown' }),
        green:  new log.Color ({ shell: '\u001b[32m', css: 'forestgreen' }) },


    /*  Actual arguments API
     */
    readColor:      log.read.partial (log.Color),
    readConfig:     log.read.partial (log.Config),
    modifyColor:    log.modify.partial (log.Color),
    modifyConfig:   log.modify.partial (log.Config),


    /*  Need one? Take! I have plenty of them!
     */
    boldLine:   '======================================',
    line:       '--------------------------------------',
    thinLine:   '......................................',


    /*  For hacking log output (contextFn should be conformant to CPS interface, e.g. have 'then' as last argument)
     */
    withCustomWriteBackend: function (backend, contextFn, then) {
        var previousBackend = log.impl.writeBackend
        log.impl.writeBackend = backend
        contextFn (function () {
            log.impl.writeBackend = previousBackend
            if (then) {
                then () } }) },

    /*  For writing with forced default backend
     */
    writeUsingDefaultBackend: function () { var args = arguments
        log.withCustomWriteBackend (
            log.impl.defaultWriteBackend,
            function (done) {
                log.write.apply (null, args); done () }) },
    
    /*  Internals
     */
    impl: {

        /*  Nuts & guts
         */
        write: function (defaultCfg) { return $restArg (function () {

            var args            = _.asArray (arguments)
            var cleanArgs       = log.cleanArgs (args)

            var config          = _.extend ({ indent: 0 }, defaultCfg, log.readConfig (args))
            var stackOffset     = Platform.NodeJS ? 3 : 2

            var indent          = (log.impl.writeBackend.indent || 0) + config.indent

            var text            = log.impl.stringifyArguments (cleanArgs)
            var indentation     = _.times (indent, _.constant ('\t')).join ('')
            var match           = text.reversed.match (/(\n*)([^]*)/) // dumb way to select trailing newlines (i'm no good at regex)

            var location = (
                config.location &&
                log.impl.location (config.where || $callStack[stackOffset + (config.stackOffset || 0)])) || ''

            var backendParams = {
                color: log.readColor (args),
                indentedText:  match[2].reversed.split ('\n').map (_.prepends (indentation)).join ('\n'),
                trailNewlines: match[1],
                codeLocation: location }

            log.impl.writeBackend (backendParams)

            return cleanArgs[0] }) },
        
        defaultWriteBackend: function (params) {
            var color           = params.color,
                indentedText    = params.indentedText,
                codeLocation    = params.codeLocation,
                trailNewlines   = params.trailNewlines

            var colorValue = color && (Platform.NodeJS ? color.shell : color.css)
                
            if (colorValue) {
                if (Platform.NodeJS) {
                    console.log (colorValue + indentedText + '\u001b[0m', codeLocation, trailNewlines) }
                else {
                    var lines = indentedText.split ('\n')
                    var allButFirstLinePaddedWithSpace = // god please, make them burn.. why???
                            [_.first (lines) || ''].concat (_.rest (lines).map (_.prepends (' ')))

                    console.log ('%c'      + allButFirstLinePaddedWithSpace.join ('\n'),
                                 'color: ' + colorValue, codeLocation, trailNewlines) }}
            else {
                console.log (indentedText, codeLocation, trailNewlines) } },


        /*  Formats that "function @ source.js:321" thing
         */
        location: function (where) {
            return _.quoteWith ('()', _.nonempty ([where.calleeShort, where.fileName + ':' + where.line]).join (' @ ')) },


        /*  This could be re-used by outer code for turning arbitrary argument lists into string
         */
        stringifyArguments: function (args) {
            return _.map (args, log.impl.stringify).join (' ') },

        /*  Smart object stringifier
         */
        stringify: function (what) {
            if (_.isTypeOf (Error, what)) {
                var str = log.impl.stringifyError (what)
                if (what.originalError) {
                    return str + '\n\n' + log.impl.stringify (what.originalError) }
                else {
                    return str } }

            else if (_.isTypeOf (CallStack, what)) {
                return log.impl.stringifyCallStack (what) }

            else if (typeof what === 'object') {
                /*if (_.isArray (what) && what.length > 1 && _.isObject (what[0])) {
                    return log.asTable (what) }
                else {*/
                    return _.stringify (what) /*}*/ }
                    
            else if (typeof what === 'string') {
                return what }

            else {
                return _.stringify (what) } },
        
        stringifyError: function (e) {
            try {       
                var stack   = CallStack.fromError (e).clean.offset (e.stackOffset || 0)
                var why     = (e.message || '').replace (/\r|\n/g, '').trimmed.first (120)

                return ('[EXCEPTION] ' + why + '\n\n') + log.impl.stringifyCallStack (stack) + '\n' }
            catch (sub) {
                return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack +
                    '\n\nORIGINAL EXCEPTION:\n\n' + e.stack + '\n\n' } },

        stringifyCallStack: function (stack) {
            return log.columns (stack.map (
                function (entry) { return [
                    '\t' + 'at ' + entry.calleeShort.first (30),
                    _.nonempty ([entry.fileShort, ':', entry.line]).join (''),
                    (entry.source || '').first (80)] })).join ('\n') }
} })


/*  Printing API
 */
_.extend (log, log.printAPI = {

    newline:    log.impl.write ().partial (''),
    write:      log.impl.write (),
    red:        log.impl.write ().partial (log.color.red),
    blue:       log.impl.write ().partial (log.color.blue),
    orange:     log.impl.write ().partial (log.color.orange),
    green:      log.impl.write ().partial (log.color.green),

    failure:    log.impl.write ({ location: true }).partial (log.color.red),
    error:      log.impl.write ({ location: true }).partial (log.color.red),
    e:          log.impl.write ({ location: true }).partial (log.color.red),
    info:       log.impl.write ({ location: true }).partial (log.color.blue),
    i:          log.impl.write ({ location: true }).partial (log.color.blue),
    w:          log.impl.write ({ location: true }).partial (log.color.orange),
    warn:       log.impl.write ({ location: true }).partial (log.color.orange),
    warning:    log.impl.write ({ location: true }).partial (log.color.orange),
    success:    log.impl.write ({ location: true }).partial (log.color.green),
    ok:         log.impl.write ({ location: true }).partial (log.color.green) }) 

log.writes = log.printAPI.writes = _.higherOrder (log.write) // generates write functions

log.impl.writeBackend = log.impl.defaultWriteBackend

/*  Experimental formatting shit.
 */
_.extend (log, {

    asTable: function (arrayOfObjects) {
        var columnsDef  = arrayOfObjects.map (_.keys.arity1).reduce (_.union.arity2, []) // makes ['col1', 'col2', 'col3'] by unifying objects keys
        var lines       = log.columns ( [columnsDef].concat (
                                            _.map (arrayOfObjects, function (object) {
                                                                        return columnsDef.map (_.propertyOf (object)) })), {
                                        maxTotalWidth: 120,
                                        minColumnWidths: columnsDef.map (_.property ('length')) })

        return [lines[0], log.thinLine[0].repeats (lines[0].length), _.rest (lines)].flat.join ('\n') },

    /*  Layout algorithm for ASCII sheets (v 2.0)
     */
    columns: function (rows, cfg_) {
        if (rows.length === 0) {
            return [] }
        else {
            
            /*  convert column data to string, taking first line
             */
            var rowsToStr       = rows.map (_.map.tails2 (function (col) { return (col + '').split ('\n')[0] }))

            /*  compute column widths (per row) and max widths (per column)
             */
            var columnWidths    = rowsToStr.map (_.map.tails2 (_.property ('length')))
            var maxWidths       = columnWidths.zip (_.largest)

            /*  default config
             */
            var cfg             = cfg_ || { minColumnWidths: maxWidths, maxTotalWidth: 0 }

            /*  project desired column widths, taking maxTotalWidth and minColumnWidths in account
             */
            var totalWidth      = _.reduce (maxWidths, _.sum, 0)
            var relativeWidths  = _.map (maxWidths, _.muls (1.0 / totalWidth))
            var excessWidth     = Math.max (0, totalWidth - cfg.maxTotalWidth)
            var computedWidths  = _.map (maxWidths, function (w, i) {
                                                        return Math.max (cfg.minColumnWidths[i], Math.floor (w - excessWidth * relativeWidths[i])) })

            /*  this is how many symbols we should pad or cut (per column)
             */
            var restWidths      = columnWidths.map (function (widths) { return [computedWidths, widths].zip (_.subtract) })

            /*  perform final composition
             */
            return [rowsToStr, restWidths].zip (
                 _.zap.tails (function (str, w) { return w >= 0 ? (str + ' '.repeats (w)) : (_.initial (str, -w).join ('')) })
                 .then (_.joinsWith ('  ')) ) } }
})


if (Platform.NodeJS) {
    module.exports = log }


