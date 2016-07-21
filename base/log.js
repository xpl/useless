_.hasLog = true

_.tests.log = {

    basic: function () {

        log         ('log (x)')         //  Basic API

        log.green      ('log.green')       //  Use for plain colored output.
        log.boldGreen  ('log.boldGreen')
        log.darkGreen  ('log.darkGreen')
        log.blue       ('log.blue')
        log.boldBlue   ('log.boldBlue')
        log.darkBlue   ('log.darkBlue')
        log.orange     ('log.orange')
        log.boldOrange ('log.boldOrange')
        log.darkOrange ('log.darkOrange')
        log.red        ('log.red')         //  ..for more colors, see the implementation below
        log.boldRed    ('log.boldRed')
        log.darkRed    ('log.darkRed')
        log.pink       ('log.pink')
        log.boldPink   ('log.boldPink')
        log.darkPink   ('log.darkPink')

        log.margin ()
        log.margin ()  // collapses

        log.bright ('log.bright')
        log.dark   ('log.dark')

        log.margin ()

        log.success ('log.success')     //  Use for quality production logging (logging that lasts).
        log.ok      ('log.ok')
        log.g       ('log.g')
        log.gg      ('log.gg')
        log.info    ('log.info')        //  Printed location greatly helps to find log cause in code.
        log.i       ('log.i')
        log.ii      ('log.ii')
        log.warning ('log.warning')     //  For those who cant remember which one, there's plenty of aliases
        log.warn    ('log.warn')
        log.w       ('log.w')
        log.ww      ('log.ww')        
        log.error   ('log.error')
        log.e       ('log.e')
        log.ee      ('log.ee')

        $assert (log ('log (x) === x'), 'log (x) === x')    // Can be used for debugging of functional expressions
                                                            // (as it returns it first argument, like in _.identity)

        log.info    (log.stackOffset (2), 'log.info (log.config ({ stackOffset: 2 }), ...)')

        log.write   ('Consequent', 'arguments', log.color.red, ' joins', 'with', 'whitespace')

        log.write (                     'Multi',
                    log.color.red,      'Colored',
                    log.color.green,    'Output',
                    log.color.blue,     'For',
                    log.color.orange,   'The',
                    log.color.pink,     'Fucking',
                    log.color.none,     'Win')

        log.write   (log.boldLine)  //  ASCII art <hr>
        log.write   (log.thinLine)
        log.write   (log.line)

        log.write   (log.indent (1),
                     ['You can set indentation',
                      'that is nicely handled',
                      'in case of multiline text'].join ('\n'))

        log.orange  (log.indent (2), '\nCan print nice table layout view for arrays of objects:\n')
        log.orange  (log.config ({ indent: 2, table: true }), [
            { field: 'line',    matches: false, valueType: 'string', contractType: 'number' },
            { field: 'column',  matches: true,  valueType: 'string', contractType: 'number' }])

        log.write ('\nObject:', { foo: 1, bar: 2, qux: 3 })         //  Object printing is supported
        log.write ('Array:', [1, 2, 3])                             //  Arrays too
        log.write ('Function:', _.identity)                         //  Prints code of a function

        log.write ('Complex object:', { foo: 1, bar: { qux: [1,2,3], garply: _.identity }}, '\n\n');

        log.withConfig (log.indent (1), function () {
            log.pink ('Config stack + scopes + higher order API test:')
            _.each ([5,6,7], logs.pink (log.indent (1), 'item = ', log.color.blue)) })

        $assert (log (42), 42) } }

_.extend (

    /*  Basic API
     */
    log = function () {
        return log.write.apply (this, [log.config ({ location: true, stackOffset: 1 })].concat (_.asArray (arguments))) }, {

    Config: $prototype (),

    /*  Could be passed as any argument to any write function.
     */
    config: function (cfg) {
        return new log.Config (cfg) } })


_.extend (log, {

    /*  Shortcut for common cases
     */
    indent: function (n) {
        return log.config ({ indent: n }) },

    stackOffset: function (n) {
        return log.config ({ stackOffset: n }) },

    where: function (wat) {
        return log.config ({ location: true, where: wat || undefined }) },

    color: _.extend (function (x) { return (log.color[x] || {}).color },

        _.object (
        _.map  ([['none',        '0m',           ''],
                 ['red',         '31m',          'color:crimson'],
                 ['boldRed',    ['31m', '1m'],   'color:crimson;font-weight:bold'],
                 ['darkRed',    ['31m', '2m'],   'color:crimson'],
                 ['blue',        '36m',          'color:royalblue'],
                 ['boldBlue',   ['36m', '1m'],   'color:royalblue;font-weight:bold;'],
                 ['darkBlue',   ['36m', '2m'],   'color:rgba(65,105,225,0.5)'],
                 ['boldOrange', ['33m', '1m'],   'color:saddlebrown;font-weight:bold;'],
                 ['darkOrange', ['33m', '2m'],   'color:saddlebrown'],
                 ['orange',      '33m',          'color:saddlebrown'],
                 ['brown',      ['33m', '2m'],   'color:saddlebrown'],
                 ['green',       '32m',          'color:forestgreen'],
                 ['boldGreen',  ['32m', '1m'],   'color:forestgreen;font-weight:bold'],
                 ['darkGreen',  ['32m', '2m'],   'color:forestgreen;opacity:0.5'],
                 ['pink',        '35m',          'color:magenta'],
                 ['boldPink',   ['35m', '1m'],   'color:magenta;font-weight:bold;'],
                 ['darkPink',   ['35m', '2m'],   'color:magenta'],
                 ['black',       '0m',           'color:black'],
                 ['bright',     ['0m', '1m'],    'color:rgba(0,0,0);font-weight:bold'],
                 ['dark',       ['0m', '2m'],    'color:rgba(0,0,0,0.25)']],

             function (def) {
                return [def[0], log.config ({ color: { shell: _.coerceToArray (_.map2 (def[1], _.prepends ('\u001B['))).join (), css: def[2] }})] }))),

    /*  Need one? Take! I have plenty of them!
     */
    boldLine:   '======================================',
    line:       '--------------------------------------',
    thinLine:   '......................................',

    /*  Set to true to precede each log message with date and time (useful for server side logs).
     */
    timestampEnabled: false,

    /*  For hacking log output (contextFn should be conformant to CPS interface, e.g. have 'then' as last argument)
     */
    withWriteBackend: $scope (function (release, backend, contextFn, done) { var prev = log.writeBackend.value
                                                                                        log.writeBackend.value = backend
        contextFn (function /* release */ (then) { // @hide
                     release (function () {                                             log.writeBackend.value = prev
                        if (then) then ()
                        if (done) done () }) }) }),  

    /*  For writing with forced default backend
     */
    writeUsingDefaultBackend: function (/* arguments */) { var args = arguments
        log.withWriteBackend (
            log.impl.defaultWriteBackend,
            function (done) {
                log.write.apply (null, args); done () }) },

    writeBackend: function () {
        return arguments.callee.value || log.impl.defaultWriteBackend },

    withConfig: function (config, what) {  log.impl.configStack.push (log.impl.configure ([{ stackOffset: -1 }, config]))
                     var result = what (); log.impl.configStack.pop ();
                  return result },

    currentConfig: function () { return log.impl.configure (log.impl.configStack) },

    /*  Use instead of 'log.newline ()' for collapsing newlines
     */
    margin: (function () {
                var lastWrite = undefined
                return function () {
                    if (lastWrite !== log.impl.numWrites)
                        log.newline ()
                        lastWrite   = log.impl.numWrites } }) (),

    /*  Internals
     */
    impl: {

        configStack: [],
        numWrites: 0,

        configure: function (configs) {
            return _.reduce2 (
                { stackOffset: 0, indent: 0 },
                _.nonempty (configs), function (memo, cfg) {
                                        return _.extend (memo, _.nonempty (cfg), {
                                            indent:      memo.indent      + (cfg.indent || 0),
                                            stackOffset: memo.stackOffset + (cfg.stackOffset || 0) }) }) },

        /*  Nuts & guts
         */
        write: $restArg (_.bindable (function () { var writeBackend = log.writeBackend ()

            log.impl.numWrites++

            var args   = _.asArray (arguments)
            var config = log.impl.configure ([{ stackOffset: $platform.NodeJS ? 1 : 3,
                                                indent: writeBackend.indent || 0 }].concat (log.impl.configStack))

            var runs = _.reduce2 (

                /*  Initial memo
                 */
                [],
                
                /*  Arguments split by configs
                 */
                _.partition3 (args, _.isTypeOf.$ (log.Config)),
                
                /*  Gather function
                 */
                function (runs, span) {
                    if (span.label === true) { config = log.impl.configure ([config].concat (span.items))
                                               return runs }
                                        else { return runs.concat ({ config: config,
                                                                     text: log.impl.stringifyArguments (span.items, config) }) } })

            var trailNewlinesMatch = runs.last && runs.last.text.reversed.match (/(\n*)([^]*)/)
            var trailNewlines = (trailNewlinesMatch && trailNewlinesMatch[1]) // dumb way to select trailing newlines (i'm no good at regex)
            if (trailNewlinesMatch) {
                runs.last.text = trailNewlinesMatch[2].reversed }


            /*  Split by linebreaks
             */
            var newline = {}
            var lines = _.pluck.with ('items',
                            _.reject.with (_.property ('label'),
                                _.partition3.with (_.equals (newline),
                                    _.scatter (runs, function (run, i, emit) {
                                                        _.each (run.text.split ('\n'), function (line, i, arr) {
                                                                                            emit (_.extended (run, { text: line })); if (i !== arr.lastIndex) {
                                                                                            emit (newline) } }) }))))

            var totalText       = _.pluck (runs, 'text').join ('')
            var where           = config.where || log.impl.walkStack ($callStack) || {}
            var indentation     = (config.indentPattern || '\t').repeats (config.indent)

            writeBackend ({
                lines:         lines,
                config:        config,
                color:         config.color,
                when:          Date.now (),
                args:          _.reject (args, _.isTypeOf.$ (log.Config)),
                indentation:   indentation,
                indentedText:  lines.map (_.seq (_.pluck.tails2 ('text'),
                                                 _.joinsWith (''),
                                                 _.prepends (indentation))).join ('\n'),
                text:          totalText,
                codeLocation:  (config.location && log.impl.location (where)) || '',
                trailNewlines: trailNewlines || '',
                where:         (config.location && where) || undefined })

            return _.find (args, _.not (_.isTypeOf.$ (log.Config))) })),

        walkStack: function (stack) {
            return _.find (stack.clean.offset ($platform.Browser ? 1 : 2),
                        function (entry) { return (entry.fileShort.indexOf ('base/log.js') < 0) }) || stack[0] },

        defaultWriteBackend: function (params) {

            var codeLocation = params.codeLocation

            if ($platform.NodeJS) {

                var lines = _.map (params.lines, function (line) {
                                                    return params.indentation + _.map (line, function (run) {
                                                        return (run.config.color
                                                                    ? (run.config.color.shell + run.text + '\u001b[0m')
                                                                    : (                         run.text)) }).join ('') }).join ('\n')

                if (log.timestampEnabled) {
                    lines = log.color ('dark').shell + _.bullet (log.impl.timestamp (params.when) + ' ', log.color ('none').shell + lines) }

                console.log (lines,
                             log.color ('dark').shell + codeLocation + '\u001b[0m',
                             params.trailNewlines) }

            else {
                console.log.apply (console, _.reject.with (_.equals (undefined), [].concat (

                	log.timestampEnabled ? log.impl.timestamp () : '',

                    _.map (params.lines, function (line, i) {
                                            return params.indentation + _.reduce2 ('', line, function (s, run) {
                                                return s + (run.text && ((run.config.color ? '%c' : '') +
                                                    run.text) || '') }) }).join ('\n') + (codeLocation && ('%c ' + codeLocation) || ''),

                    (_.scatter (params.lines, function (line, i, emit) {
                        _.each (line, function (run) {
                            if (run.text && run.config.color) { emit (run.config.color.css) } }) }) || []).concat (codeLocation ? 'color:rgba(0,0,0,0.25)' : []),

                    params.trailNewlines))) } },

        /*  Formats timestamp preceding log messages
         */
        timestamp: function (x) {
        	return (new Date (x)).toISOString () },

        /*  Formats that "function @ source.js:321" thing
         */
        location: function (where) {
            return _.quoteWith ('()', _.nonempty ([where.calleeShort,
                                      _.nonempty ([where.fileName,
                                                   where.line]).join (':')]).join (' @ ')) },


        /*  This could be re-used by outer code for turning arbitrary argument lists into string
         */
        stringifyArguments: function (args, cfg) {
            return _.map (args, function (arg) {
                var x = log.impl.stringify (arg, cfg)
                return (cfg.maxArgLength ? x.limitedTo (cfg.maxArgLength) : x) }).join (' ') },

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
                var stack   = CallStack.fromErrorWithAsync (e).offset (e.stackOffset || 0).clean
                var why     = (e.message || '').replace (/\r|\n/g, '').trimmed.limitedTo (120)

                return ('[EXCEPTION] ' + why + '\n\n') +
                    (e.notMatching && (_.map (_.coerceToArray (e.notMatching || []),
                                        log.impl.stringify.then (_.prepends ('\t'))).join ('\n') + '\n\n') || '') +
                    log.impl.stringifyCallStack (stack) + '\n' }
            catch (sub) {
                return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack +
                    '\n\nORIGINAL EXCEPTION:\n\n' + e.stack + '\n\n' } },

        stringifyCallStack: function (stack) {
            return log.columns (stack.map (
                function (entry) { return [
                    '\t' + 'at ' + entry.calleeShort.first (30),
                    _.nonempty ([entry.fileShort, ':', entry.line]).join (''),
                    (entry.source || '').first (80)] })).join ('\n') } } })


/*  Printing API
 */
;(function () {                                                var write = log.impl.write
   _.extend (log,
             log.printAPI =
                    _.object (
                    _.concat (            [[            'newline', write.$ (log.config ({ location: false }), '') ],
                                           [              'write', write                                                          ]],
                            _.flat (_.map (['red failure error e',
                                                    'blue info i',
                                               'darkBlue minor m',
                                          'orange warning warn w',
                                             'green success ok g',
                                                   'darkGreen dg',
                                            'pink notice alert p',
                                                    'boldPink pp',
                                                    'dark hint d',
                                                   'boldGreen gg',
                                                       'bright b',
                                          'boldRed bloody bad ee',
                                                    'darkPink dp',
                                                       'brown br',
                                                 'darkOrange wtf',
                                                  'boldOrange ww',
                                                     'darkRed er',
                                                    'boldBlue ii' ],
                                                    _.splitsWith  (' ').then (
                                                      _.mapsWith  (
                                                  function (name,                                   i,                         names      )  {
                                                   return  [name,  write.$ (log.config ({ location: i !== 0, color: log.color (names.first), stackOffset: 2 })) ] })))))))

}) ()


/*  Higher order API
 */
logs = _.mapWith (_.callsTo.compose (_.callsWith (log.stackOffset (1))), log.printAPI)


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

if ($platform.NodeJS) {
    module.exports = log }


