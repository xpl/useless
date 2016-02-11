# Use Less. Do More.

A cross-platform JavaScript toolbox for writing complex web applications. Currently in pre-release stage, missing some basic documentation and being under heavy development.

[Installing](#installing) | [Building](#building) | [Wiki](https://github.com/xpl/useless/wiki)

```bash
> npm install useless
```

### Recent updates / changelog

- Added wiki entry on how to do [pluggable methods with component traits](https://github.com/xpl/useless/wiki/$trait#pluggable-methods-with-component-traits).

- `$raw` methods for disabling thiscall semantics for performance-critical methods in components. In other words, it disables auto binding of methods to `this`, which comes with performance penalty of one extra call.

- `LogOverlay` now automatically clips its output (removing invisible lines) to reduce page freezes on a huge amount of log output. It is also gradients itself with `-webkit-mask-image`. Screenshot shows log output built automatically with **$log** and `Testosterone.LogsMethodCalls`:  ![showcase](http://img.leprosorium.com/2492460)

- `_.scatter` for general-purpose many-to-many mapping. Can output arrays and objects. There also exists `_.arr` and `_.obj` as it's specialized derivatives. See [`stdlib.js`](https://github.com/xpl/useless/blob/master/base/tier0/stdlib.js) for details.

- `String.limitedTo` for limiting long strings with ellipsis. Now `_.stringify` output is way more compact and readable.

- `$macroTags` member for defining prototype/trait-specific macros. See `Testosterone.LogsMethodCalls` trait for the demo/how-to. It's super convenient when you want to bring some custom semantics to your prototype definitions, but don't want to make it a global macro - which can cause all kinds of performance/compatibility issuses. Imagine something like `DOMEvents` trait that defines `eventName: $on (function () { .. })` syntax that automatically binds component methods to DOM events, or `UndoRedoHistory` trait that proposes a `$silent` tag, which disables arbitrary methods from recording to history. It's a really powerful tool that brings DSL flavor to JavaScript.

- `Prototype.$membersByTag` for fast/convenient enumeration of tagged members.

- Improved **$alias** semantics (still somewhat buggy when used with $component/$traits).

- **$constructor** for static constructor. Gets called by the prototype compiler. When defined by [**$trait**](https://github.com/xpl/useless/wiki/$trait), gets called at the host prototype assembling. This way [**$trait**](https://github.com/xpl/useless/wiki/$trait) can add something to the host [**$prototype**](https://github.com/xpl/useless/wiki/$prototype) at the compilation stage.

- Added **$mixin** for extending existing types with [**$prototype**](https://github.com/xpl/useless/wiki/$prototype)-style definitions. Example: `$mixin (Node, { ... })`

- New member comprehension: `isLinebreak: $callableAsFreeFunction ($property (function () { ... }))` renders to `node.isLinebreak` (instance property accessor) and `Node.isLinebreak (node)` (static function). Latter is useful in functional expressions.

- Added `_.longestCommonSubstring` which is used to highlight differences in `$assert` argument mismatches:
 
 ![example](https://raw.githubusercontent.com/xpl/useless/master/example/img/assert3.png)

- Forget `nodemon`, it is now built-in. Just add `server/supervisor` trait to your app component, and get auto-restart on code changes. You can also track arbitrary files and folders with simple API.

- **$depends** syntax for dependency resolving in component [**$traits**](https://github.com/xpl/useless/wiki/$trait). See `build.js` and `/server` traits for example use.

- Smart merging of **$trait** methods for **$component**-based prototypes: methods are bound to streams (having same name), `afterXXX`/`beforeXXX`/`interceptXXX` are bound to bindables automagically™ (at prototype construction). Now component logic can be distributed across traits with unprecedented level of legibility.

- **$defaults** and **$requires** defined in traits now deeply merged at [**$component**](https://github.com/xpl/useless/wiki/$component)-based prototypes. You can utilize this mechanics for custom members by tagging them with **$extendable** syntax.

- [**$prototype**](https://github.com/xpl/useless/wiki/$prototype) now understands nested tag groups, e.g. `$static: { $property: { ... }`

- `Panic (...)` UI now understands `Test` instances as input. Useful for printing out failed client-side tests. It also understands exception messages in log, printing them with its specialized UI (respecting indentation and stuff).

- **Testosterone.ValidatesRecursion** trait, which prohibits recursion on all methods until explicitly marked with **$allowsRecursion**. Allows setting max recursion depth with `max` parameter. Useful for debugging heavy DOM-modifying code that hangs browser and its built-in debugging tools.

- **Testosterone.LogsMethodCalls** trait, which adds **$log** syntax. Tag methods with it to enable printing of method calls, with its arguments and return value. It arranges nested calls to nice hierarchy, to give overview of whats going on. You can parametrize log calls with colors (e.g. `$log ($red (...))`) and with template which prints `this` contents, e.g. `$log ('Called with this.foo value: {{foo}}', ...)` 

- More ANSI colors for log messages, e.g. `boldPink`. Supported with console renderer on WebKit, `LogOverlay` and `Panic`.

- Multi colored log messages, ex. `log (log.color.red, 'multi', log.color.blue, 'color')`

- New object formatter for `_.stringify`. It automatically decides between one-line and pretty-printed variants (based on output length). Added reading of prototype names (via `$meta`) and comprehensions of some built-in types (e.g. Node). Example output:

```javascript
args: {
             someParam:    true,
        someOtherParam:    true,
                   arr: [ "pretty printed" ],
              DOMNodes: [ <div>,
                          <p>,
                          @I am text node ]    },
```


### Browser builds

* Compiled/minified (for production setup): [useless.min.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.min.js)
* Readable source (for development use): [useless.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.js)

### Running example app

```bash
> node example.js
```

If everything's ok, example app will be running at <a href="http://localhost:1333">http://localhost:1333</a>. Currently there's not much example code, but it's on the way.

### Directory structure

* `./base` platform-independent part
* `./client` browser-related utility
* `./server` app framework for Node.js
* `./build` built source (full/stripped/minified)
* `./useless.js` header file for the build tool (contains include directives)
* `./useless.micro.js` header file (an example of reduced build config)
* `./example.js` example application
* `./example` static content for `example.js` app

### A notice to brave hackers

It started a year ago as a pet library for my freelance projects, but recently it has kinda grown out of control, so I decided to make it public domain. Currently I'm focused to make the basic bootstrap code work well, as this thing is now used as a front-end library in a couple of large scale projects run by a company I'm employed. So at least the base part should be production quality soon.

Stay tuned and thanks for your attention! Feel free to leave feedback / submit pull requests if you find any of these things helpful. Documentation is pending, check [Wiki](https://github.com/xpl/useless/wiki) for updates.

# `./base` features

## Macro processor for prototype definitions

[How-to & Examples](https://github.com/xpl/useless/wiki/$prototype)

- **$prototype** / **$extends**
- Smart property declarations
- **$static** methods / properties
- **$memoized** properties
- Tag groups on members (`$static: { ... }`)
- RTTI
- Pluggable macros for custom syntax
- Member aliases
- **$final**
- [**$traits**](https://github.com/xpl/useless/wiki/$trait) / a.k.a. mixins / combinatoric-style alternative to inheritance
- [**$aspect**](https://github.com/xpl/useless/wiki/$aspect) / Aspect Oriented Programming / declarative method binding
- **$singleton**
- [Reflection](https://github.com/xpl/useless/wiki/$prototype#reflection) (can read prototype name and file, via Prototype.**$meta**)

```javascript
Vec2 = $prototype ({

    /*  Static property: Vec2.zero
     */
    zero: $static ($property (function () { return new Vec2 (0, 0) })),

    /*  Static method: Vec2.dot (a, b)
     */
    dot: $static (function (a, b) { return a.x * b.x + a.y * b.y }),

    /*  Tag groups for convenience
     */
    $static: {
        unit: $property (function () { return new Vec2 (1, 1) }),
        one:  $alias ('unit') }, // member aliases

    /*  Constructor
     */
    constructor: function (x, y) { this.x = x; this.y = y },

    /*  Instance property (.length)
     */
    length: $property (function () { return Math.sqrt (this.x * this.x + this.y * this.y) }),

    /*  Instance method
     */
    add: function (other) { return new Vec2 (this.x + other.x, this.y + other.y) } })

/*  Inheritance (relies on native JavaScript prototype semantics)
 */
BetterVec2 = $extends (Vec2, { /* ... */ })
```

## Component model

[How-to & Examples](https://github.com/xpl/useless/wiki/$component)

- Binds own methods to **this** automatically
- Manages bindable **$trigger** / **$barrier** / **$observableProperty** members
- Tracks bound components / auto-unbinds upon deinitialization
- Holds parent-child relationship / handles automatic deinitialization
- Enables **$traits** to chain into method calls by overlapping method definitions
- Enforces configuration contracts (**$requires**, **$defaults**)

## Functional primitives

[Reference](https://github.com/xpl/useless/blob/master/base/tier0/README.md)

* Extends underscore.js `_` namespace
* Functional primitives busybox (predicates, operators / higher order stuff)
* Binding to tail of argument list / flipping argument list
* Limiting number of arguments (arity)
* Infix interface (as Array/String/Function extensions)
* Handy string-processing operators

```javascript
  > [[1,2], [3,4]].zip (_.seq (_.sum, _.appends ('_foo'), _.quotesWith ('()')))
  < ["(4_foo)", "(6_foo)"]
```

## Abstract `map/zip/filter/reduce/find`

[Reference](https://github.com/xpl/useless/blob/master/base/tier0/README.md#stdlibjs)

Datatype-abstract (works over arrays/objects/scalars):

```javascript
  > _.map2 ({ one: '1', two: '2' }, _.prepends ('foo_').then (_.appends ('_bar')))
  < { one: "foo_1_bar", two: "foo_2_bar" }
```

Structure-abstract ('sees through' structure of arbitrary complexity):

```javascript
   > _.mapMap ({ foo: { bar: 1, baz: [2, 3] } }, _.plus (10))
   < { foo: { bar: 10, baz: [12, 13] } }
```

## Asynchronous primitives

[Reference](https://github.com/xpl/useless/blob/master/base/CPS.js)

Continuation-passing style (`_.cps.xxx`) versions of **underscore.js** primitives:

```javascript
   function searchRemoteFilesForText (text, then) {
      _.cps.find (['file1.txt', 'file2.txt', 'file3.txt'], function (name, return_) {
          $.get (name, function (fileText) {
              return_ (fileText.indexOf (text) >= 0) }) }, then) }
```
```javascript
   log (_.map ([1,2,3],     _.constant ('stub'))      // prints ['stub','stub','stub']
    _.cps.map ([1,2,3], _.cps.constant ('stub'), log) // prints ['stub','stub','stub']
```
```javascript
   cachedReadFile = _.cps.memoize (_.tails ($.get, 'text'))
   cachedReadFile ('/useless.js', log) // prints contents of /useless.js
```

Sequential composition of asynchronous operations:

```
  _.cps.sequence (doRoutine, waitUntilAssertionsComplete, done) ()
```

Task pooling (parallel map/reduce with limit on maximum concurrently running tasks):

```javascript
  _.mapReduce (array, {
                  maxConcurrency: 10,
                  next: function (item, index, next, skip, memo) { ... },
                  complete: function (memo) { ... })
```

**_.interlocked** (puts a function under concurrency lock)

```javascript
  readFilesSequentially = _.interlocked (function (releaseLock, file, done) {
                                         $.get (file, done.then (releaseLock), 'text') })

  readFilesSequentially ('file1.txt', log)
  readFilesSequentially ('file2.txt', log) // waits until file1.txt is read
```

## Multicast model for method calls with simple functional I/O

[Reference](https://github.com/xpl/useless/blob/master/base/dynamic/stream.js)

* `_.trigger`, `_.triggerOnce` / one-to-many broadcast
* `_.barrier` / synchronization primitive
* `_.observable` / state change notifications

Raw API (same for every mentioned primitive):
```javascript
var mouseMoved = _.trigger ()

/*  Binding
 */
mouseMoved (function (x, y) { }) // bind
mouseMoved (someCallback)        // bind another
mouseMoved.once (someCallback)   // bind with 'once' semantics (auto-unbinds itself upon calling)

/*  Calling
 */
mouseMove (12, 33)               // call

/*  Unbinding
 */
mouseMove.off (someCallback)     // unbinds specific listener
mouseMove.off ()                 // unbinds everything
_.off (someCallback)             // unbinds callback from everything it's bound to
```

Using [$component](https://github.com/xpl/useless/wiki/$component):
```javascript
Compo = $component ({

    didLayout:     $trigger (),
    layoutReady:   $barrier (),             // it's like document.ready
    value:         $observableProperty (),  // for property change notifications
    
    init: function () {
        doSomeUselessAsyncJob (function () {
           this.layoutReady () }) }, // signals that layout is ready

    doLayout: function () {
        this.didLayout () } })       // simply call to perform multicast
```
```javascript
compo = new Compo ()

compo.didLayout (function () {
    /*  Gets called whenether layout has rebuilt */ })

compo.layoutReady (function () {
    /*  Postpones until DOM is ready.
        If already, calls immediately (like document.ready) */ })

compo.valueChange (function (value, oldValue) {
    /*  Gets called whenether property has assigned distinct value */ })

compo.value = 10 // simply assign a value to notify listeners
compo.value = 10 // won't trigger, as not changed
```

## Bindable methods for ad-hoc code injection

Raw API:
```javascript
_.onAfter   (Player.prototype, 'move', function (x, y) { /* this will execute after move calls */ })
_.onBefore  (Player.prototype, 'move', function (x, y) { /* this will execute before */ })
_.intercept (Player.prototype, 'move', function (x, y, originalMethod) {
    originalMethod.call (this, x, y) })
```

Using [$component](https://github.com/xpl/useless/wiki/$component) + 'once' semantics:
```javascript
Button = $component ({
    layout: $bindable (function () { /* ... */ }) })
    
button = new Button ()
button.layout.onceBefore (function () { log ("I'm called before next layout()") })
button.layout ()
button.layout () // won't print anything
```

Using [$aspect](https://github.com/xpl/useless/wiki/$aspect):
```javascript
AddsLoggingToButton = $aspect (Button, {

    beforeCreate: function () { log.green ('Button is about to be created') },
    afterDestroy: function () { log.red   ('Button is now destroyed') } })
```

Adds CORS proxy to existing XMLHttpRequest prototype:

```javascript
XMLHttpRequestWithCORS = $aspect (XMLHttpRequest, {
    open: function (method, path, async, impl) {
                return impl.call (this, method, (!path.contains ('cors.io') &&
                                                 !path.contains (window.location.host))
                                                    ? ('http://cors.io/?u=' + path) : path, async) } })
```

## Math utility for front-end works

[Reference](https://github.com/xpl/useless/blob/master/base/math.js)

Working with ranges:

```javascript
    _.lerp  (t, min, max)  // linear interpolation between min and max
    _.clamp (n, min, max)  // clips if out of range
    
    /*  Projects from one range to another (super useful in widgets implementation)
     */
    _.rescale (t, [fromMin, fromMax], [toMin, toMax], { clamp: true })
```

Vector math (**Vec2**, **Transform**, **BBox**, **Bezier**, intersections):

```javascript
   var offsetVec = this.anchor.sub (this.center).normal.perp.scale (
                       Bezier.cubic1D (
                           Vec2.dot (direction.normal, upVector), 0, 1.22, 0, 1.9))
```
```javascript
   var where = this.bodyBBox.nearestPointTo (this.anchor, this.borderRadius)
```
```javascript
   domElement.css (BBox.fromPoints (pts).grow (20).offset (position.inverse).css)
```

## Error handling

[![node.js stacktrace](https://raw.githubusercontent.com/xpl/useless/master/example/img/callstack2.png)](https://github.com/xpl/useless/blob/master/base/reflection.js)

- Cross-platform handling of uncaught exceptions
- Uncaught exceptions pass through network API calls
- Client displays server's exceptions as if it was single environment
- Callstack API for access at arbitrary location (for reflection purposes)
- Strips third party calls (clean mode)
- Fetches source code (local/remote)
- Nice output
    - Console mode (replaces default Node.js exception printer)
    - GUI mode (a pop-up dialog with expandable source lines, `./client/Panic.js` feature)

## Test framework

[**How-to & Examples**](https://github.com/xpl/useless/wiki/Test-framework)

[![assertion demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/assert.jpg)](https://github.com/xpl/useless/wiki/Test-framework)

* Tests before code
* Tests as documentantion
* Rich library of assertions
* Asynchronous / nested assertions
* Intercepts global log, displaying it in running assertion context
* Custom assertions
* Humane error reporting

## Logging

[Reference / examples](https://github.com/xpl/useless/blob/master/base/log.js)

[![log demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/log.png)](https://github.com/xpl/useless/blob/master/base/log.js)

+ Platform-independent
+ Color output
+ Shows code location
+ [Configurable object printer](https://github.com/xpl/useless/blob/master/base/tier0/stringify.js)
+ Table layout formatting
+ Hookable/interceptable
+ [Displays server's log in browser console](https://github.com/xpl/useless/wiki/Cross-machine-logging)

## Platform Abstraction Layer

```javascript
/*  A cross-platform alias for the object representing global namespace.
    Use instead of `window` for cross-platform code.
 */
$global.foo = 5 

/*  Implements `alert` for NodeJS platform.
 */
alert ('foo')

/*  Working with uncaught exceptions
 */
_.withUncaughtExceptionHandler (function (e) { throw e /* re-throw */ }, // adds handler to chain
                                function (done) {
                                    ...
                                    done () })                           // removes handler from chain
```

### Platform detection

```javascript
Platform = $singleton ({ $property: {
    
    engine: ... // 'browser' / 'node'
    system: ... // 'iOS' / 'Android' / undefined for everything else
    device: ... // 'iPad' / 'iPhone' / undefined for everything else
    touch:  ... // true for touch-enabled devices

    Browser: ... // true in browser
    NodeJS:  ... // true in Node
    iPad:    ... // true on iPad,
    iPhone:  ... // true on iPhone,
    iOS:     ... // true on any iOS device } })
```

## And more..

- Performance measurement
- [DSL for writing regexps in JS + named subexpressions](https://github.com/xpl/useless/blob/master/base/Rx.js)
- Unicode regexp hack (3rd party)
- Base64 encoding/decoding (3rd party)

# `./client` features

## jQueryPlus.js

A pack of handy jQuery extensions. Biggest thing here is drag & drop utility (`$.fn.drag`), which is utilized by countless number of widgets I made. It also compatible with mobile devices (iOS / Android).

```javascript
$(handle).drag ({
	start: function ()             { return this.leftTop () },
	move:  function (memo, offset) { this.css (memo.add (offset).asLeftTop) } })
```

## Panic.js

> Included in **[useless.devtools.js](https://github.com/xpl/useless/blob/master/build/useless.devtools.js)** distribution

Ever struggled with bugs in JavaScript? Then <strong>Panic.js</strong> is your instant best friend. Delivers better error diagnostics to Chrome, Safari and Firefox.

Live demo _(clickable)_:

[![Panic.js demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/nowpanic.png)](https://xpl.github.io/useless)

* Cross-platform uncaught exception handling (works around incomplete 'onerror' impl. in Safari).
* Maintains callstack persistence across async call boundaries (addEventListener, setTimeout).
* Loads and displays expandable source lines for fast identification.
* Hides third party code by default (can be displayed by pressing 'more').
* Grouping of message duplicates.
* Grouping of same source line repeated consequently.
* Complete [API](https://github.com/xpl/useless/blob/master/base/reflection.js) for it's internals (exception handling / callstack access) — _TBD_

### Err... isn't this what debug tools are for?

Yes, and this is "debug tools" too, but more specific. It is not a replacement to **WebInspector**, but a power-up. WebInspector is just not good enough for the quick identification of typical errors that occur often during development process. In most cases, they require no detailed inspection of the full source code — you can identify problem cause just by briefly looking at the source line. Displaying full info, as WebInspector does, would slow down things: you need to scroll through tons of text, expand cryptic traces by clicking, and then clicking and waiting again to load sources in separate window.

And because WebInspector is a separate tool, you might not even know that something's broken, until its opened. You can imagine **Panic.js** as a small and fast subset of WebInspector, inlined into your page until it goes to the production, like a scaffolding.

### Configuring (stand-alone distribution)

Simply link the script to a page, and it will configure itself automagically™. Requires <a href="http://underscorejs.org">underscore</a> and <a href="http://jquery.com">jQuery</a>.

* <a href="build/panic.min.js">Panic.min.js</a> (minified)
* <a href="build/panic.js">Panic.js</a> (readable source)

<b>Before use,</b> consider that the distribution contains full **Useless** toolkit, where the diagnostics-related utility _[responsible for all the magic behind Panic.js]_ appear a small fraction of entire codebase. In other words, it brings a holy shitload of code, which can possibly cause all sort of compatibility-related issues.

__But in most cases, it should work out of the box.__ And supposing that you don't ever plan using **Panic.js** on production server (why would you), size of the script doesn't matter that much.

**P.S.:** it does not display source lines if executed from local HTML file (as sources are read by XHR requests).

## LogOverlay.js

> Included in **[useless.devtools.js](https://github.com/xpl/useless/blob/master/build/useless.devtools.js)** distribution

A nice `console.log` alternative for those who like log-driven debugging. Based on [log.js](https://github.com/xpl/useless/blob/master/base/log.js) (acts as a write backend for it) — which is ultimately based on [stringify.js](https://github.com/xpl/useless/blob/master/base/tier0/stringify.js) and [reflection.js](https://github.com/xpl/useless/blob/master/base/reflection.js) superpowers (check it out).

Renders incoming `log` calls into semi-transparent overlay at the bottom of the viewport. It is transparent for mouse input (so it doesnt mess with page interaction) and can be toggled by `~` key (hello Quake). Much nicier than default `console.log` in many cases.

```javascript
LogOverlay.init ()

log.i ('Hello world...')
log.e ('...and hasta la vista, baby')
```

[![Reference](http://img.leprosorium.com/2460404)](https://github.com/xpl/useless/blob/master/client/LogOverlay.js)

## API.js

XHR requests to communicate with `./server` part.

## RemoteCollection

- `DataManager.js`
- `Collection/Collection.js`
- `Collection/RemoteCollection.js`
- `Collection/FilterChain.js`

Bits and pieces of real-time database synchronization engine, taken from some previous project. Needs documentation and examples. Rather unusable for now.

# `./server` features

Example:

```javascript
require ('useless')

UselessApp = $component ({

	api: function () { return {
		'/':           this.file ('./static/index.html'),
		'hello-world': this.helloWorld } },

	helloWorld: function (context) { context.success ('Hello world!') },

	$traits: [

		require ('useless/server/exceptions'),
		require ('useless/server/tests'),
		require ('useless/server/deploy'),
		require ('useless/server/api'),
		require ('useless/server/io'),
		require ('useless/server/http') ],

	init: function (then) {
	    then ()
		log.ok ('App started') } })

module.exports = { init: function () { return new UselessApp () } }
```

Following are [**$traits**](https://github.com/xpl/useless/wiki/$trait) defined at `useless/server`:

- `api.js` URL mapping
- `appcache.js` AppCache back-end
- `auth.js` authorization management (boilerplate, for demo purposes)
- `deploy.js` self-deployment protocol (automatic builds)
- `devtools.js` APIs for Git / source code access (developer mode)
- `entity.js` journaled CRUD for collections (high level DB access)
- `exceptions.js` error handling for requests
- `history.js` journal for DB operation
- `http.js` request serving basics
- `io.js` basic I/O for requests
- `templating.js` basic templating (via underscore)
- `tests.js` self-test on startup, adds **$test/$tests** syntax for server **$traits** + new asserts
- `uploads.js` file uploads
- `uptime.js` uptime tracking / restart()
- `websocket.js` WebSocket utility (peer tracking / auth / multicast)

# Installing

### From NPM

Type `npm install useless` in root directory of your project.

### From Git

1. Go to `node_modules` subfolder of your project
2. Run `git clone https://github.com/xpl/useless.git`, go to `useless` folder
3. Run `npm install` to install dependencies
4. Optionally, run `node build.js` to test if everything's ok

### As monolithic pre-built script

Go to `build` folder and pick `useless.js`. For minified version (with unit tests stripped) pick `useless.min.js`. This one is ready to be used in production setup.

This version includes only the platform-independent part of the library, not including any of the `./client` features. If you need any of these, you can either link them them in browser code separately, or make custom build file with the additional files included (see instructions below).

# Building

Build command:

```bash
node build.js <header-file-1> <header-file-2> ... <header-file-N> <output-folder> [no-compress]
```

For generic build, run `node build.js ./useless.js ./build`, or simply

```bash
> node build.js
```

It will generate `./build/useless.js` by substituting `$include` directives found in header file. Produced result will undergo stripping of tests and comments, and then finally compiled using Google Closure Compiler, outputting minified result to `./build/useless.min.js`

## Custom build

To make reduced/extended distribution (with some submodules disabled or enabled), you can create your own version of default header file, commenting out unneeded `$include` directives or including additional ones.

There exists `./useless.micro.js` as an example of reduced build. Running `node build.js ./useless.micro.js ./build` will produce `./build/useless.micro.min.js` as output.

## Integrated build

Applications that are based on top of `useless/server` can easily enable automatic rebuilds feature by adding following [**$traits**](https://github.com/xpl/useless/wiki/$trait) to main application component:

```javascript
$traits: [        
        require ('useless/server/tests'),
        require ('useless/server/deploy'),
        require ('useless/server/supervisor')
```

This will add test & build phase to app startup sequence, aborting if something went wrong and re-starting if source code has changed.

Default settings:

```javascript
buildScriptPaths: [process.cwd (), $uselessPath],
buildScripts: ['useless.js', 'useless.micro.js', 'useless.devtools.js'],
buildPath: $uselessPath + 'build/',
```
