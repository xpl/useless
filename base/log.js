_.hasLog = true

_.tests.log = {

    basic: function () {

        log         ('log (x)')         //  Basic API

        log.green   ('log.green')       //  Use for plain colored output.
        log.blue    ('log.blue')
        log.orange  ('log.orange')
        log.red     ('log.red')

        log.success ('log.success')     //  Use for quality production logging (logging that lasts).
        log.ok      ('log.ok')
        log.g       ('log.g')
        log.info    ('log.info')        //  Printed location greatly helps to find log cause in code.
        log.i       ('log.i')
        log.warning ('log.warning')     //  For those who cant remember which one, there's plenty of aliases
        log.warn    ('log.warn')
        log.w       ('log.w')
        log.failure ('log.failure')     //  Allows 'log' to be transparently passed as stub handler,
                                        //  to where {success:fn,failure:fn} config expected.
        log.error   ('log.error')
        log.e       ('log.e')

        $assert (log ('log (x) === x'), 'log (x) === x')    // Can be used for debugging of functional expressions
                                                            // (as it returns it first argument, like in _.identity)

        log.info    ('log.info (..., log.config ({ stackOffset: 2 }))', log.config ({ stackOffset: 2 }))

        log.write   ('Consequent', 'arguments', 'joins', 'with', 'whitespace')

        log.write   (log.boldLine)  //  ASCII art <hr>
        log.write   (log.thinLine)
        log.write   (log.line)

        log.write   (log.color.green,
                        ['You can set indentation',
                         'that is nicely handled',
                         'in case of multiline text'].join ('\n'), log.config ({ indent: 1 }))

        log.orange  (log.indent (2), '\nCan print nice table layout view for arrays of objects:\n')
        log.orange  (log.config ({ indent: 2, table: true }), [
            { field: 'line',    matches: false, valueType: 'string', contractType: 'number' },
            { field: 'column',  matches: true,  valueType: 'string', contractType: 'number' }])

        log.write ('\nObject:', { foo: 1, bar: 2, qux: 3 })         //  Object printing is supported
        log.write ('Array:', [1, 2, 3])                             //  Arrays too
        log.write ('Function:', _.identity)                         //  Prints code of a function

        log.write ('Complex object:', { foo: 1, bar: { qux: [1,2,3], garply: _.identity }}, '\n\n') },

/*
    'write backend control': function (testDone) { var calls = []

        var backend1 = function (cfg) { calls.push ('1: ' + cfg.indentedText) }
        var backend2 = function (cfg) { calls.push ('2: ' + cfg.indentedText)}

        log.withWriteBackend (backend1, function (done) {     log ('backend1 ready')
            log.withWriteBackend (backend2, function (done) { log ('backend2 ready')
                done () }, function () {                      log ('backend2 released') })
                                                              log ('backend1 on hold')
            done () }, function () {                          log ('backend1 released')
                $assert (calls, ['1: backend1 ready', 
                                 '1: backend1 on hold',
                                 '2: backend2 ready']); testDone () }) }*/ }

_.extend (

    /*  Basic API
     */
    log = function () {                         
        return log.write.apply (this, arguments) }, {


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
    withWriteBackend: $scope (function (release, backend, contextFn, done) { var prev = log.writeBackend.value
                                                                                        log.writeBackend.value = backend
        contextFn (function /* release */ (then) {
                     release (function () {                                             log.writeBackend.value = prev
                        if (then) then ()
                        if (done) done () }) }) }),  

    /*  For writing with forced default backend
     */
    writeUsingDefaultBackend: function () { var args = arguments
        log.withWriteBackend (
            log.impl.defaultWriteBackend,
            function (done) {
                log.write.apply (null, args); done () }) },

    writeBackend: function () {
        return arguments.callee.value || log.impl.defaultWriteBackend },
    
    /*  Internals
     */
    impl: {

        /*  Nuts & guts
         */
        write: function (defaultCfg) { return $restArg (function () { var writeBackend = log.writeBackend ()

            var args            = _.asArray (arguments)
            var cleanArgs       = log.cleanArgs (args)

            var config          = _.extend ({ indent: 0 }, defaultCfg, log.readConfig (args))
            var stackOffset     = Platform.NodeJS ? 3 : 3

            var indent          = (writeBackend.indent || 0) + config.indent

            var text            = log.impl.stringifyArguments (cleanArgs, config)
            var indentation     = _.times (indent, _.constant ('\t')).join ('')
            var match           = text.reversed.match (/(\n*)([^]*)/) // dumb way to select trailing newlines (i'm no good at regex)

            var location = (
                config.location &&
                log.impl.location (config.where || $callStack[stackOffset + (config.stackOffset || 0)])) || ''

            var backendParams = {
                color: config.color || log.readColor (args),
                indentedText:  match[2].reversed.split ('\n').map (_.prepends (indentation)).join ('\n'),
                trailNewlines: match[1],
                codeLocation: location,
                config:       config }

            writeBackend (backendParams)

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
        stringifyArguments: function (args, cfg) {
            return _.map (args, log.impl.stringify.tails2 (cfg)).join (' ') },

        /*  Smart object stringifier
         */
        stringify: function (what, cfg) { cfg = cfg || {}
            if (_.isTypeOf (Error, what)) {
                var str = log.impl.stringifyError (what)
                if (what.originalError) {
                    return str + '\n\n' + log.impl.stringify (what.originalError) }
                else {
                    return str } }

            else if (_.isTypeOf (CallStack, what)) {
                return log.impl.stringifyCallStack (what) }

            else if (typeof what === 'object') {
                if (_.isArray (what) && what.length > 1 && _.isObject (what[0]) && cfg.table) {
                    return log.asTable (what) }
                else {
                    return _.stringify (what, cfg) } }
                    
            else if (typeof what === 'string') {
                return what }

            else {
                return _.stringify (what) } },
        
        stringifyError: function (e) {
            try {       
                var stack   = CallStack.fromErrorWithAsync (e).clean.offset (e.stackOffset || 0)
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
;(function () {                                                var write = log.impl.write
   _.extend (log,
             log.printAPI =
                    _.object (
                    _.concat (            [[            'newline', write ().$ ('') ],
                                           [              'write', write ()        ]],
                            _.flat (_.map (['red failure error e',
                                                    'blue info i',
                                          'orange warning warn w',
                                             'green success ok g' ],
                                                    _.splitsWith  (' ').then (
                                                      _.mapsWith  (
                                                  function (name,                     i,                        names      )  {
                                                   return  [name,  write ({ location: i === 0, color: log.color[names.first]  }) ] })))))))

}) ()

/*  Higher order API
 */
log.writes =            _.higherOrder (log.write)       // generates write functions
logs       = _.mapWith (_.higherOrder, log.printAPI)    // higher order API

/*  Pretty printing API
 */
log.pretty = _.map2 (log.printAPI, _.partial.tails2 (log.config ({ pretty: true })))

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
            var rowsToStr       = rows.map (_.map.tails2 (function (col) { return _.asString (col).split ('\n')[0] }))

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


