# Use Less. Do More.

A cross-platform JavaScript toolbox for writing complex web applications. Currently in pre-release stage, missing some basic documentation and being under heavy development. **In near future, it will be split into several loosely coupled NPM modules, for everyone's convenience. Stay tuned.**

[Installing](#installing) | [Building](#building) | [Wiki](https://github.com/xpl/useless/wiki)

```bash
> npm install useless
```

### Upcoming features

- Promises support (basic algorithms, request processing primitives, support in tests).
- Splitting of distinct framework parts to separate projects.

### Recent updates / changelog

- Got rid of `__proto__` mutation, derived prototypes now utilize `Object.create` for faster code.
- Added wiki entry on how to do [pluggable methods with component traits](https://github.com/xpl/useless/wiki/$trait#pluggable-methods-with-component-traits).
- [Read more...](https://github.com/xpl/useless/wiki/Changelog)

### Browser builds

* Compiled/minified (for production setup): [useless.min.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.min.js)
* Readable source (for development use): [useless.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.js)

### Running example app

```bash
> node example.js
```

If everything's ok, example app will be running at <a href="http://localhost:1333">http://localhost:1333</a>. Currently there's not much example code, but it's on the way.

You may want to look into these projects (built upon Useless.js):

* [Skychat](https://github.com/xpl/skychat) — a simple WebRTC paint/chat app.
* [Wyg](https://github.com/xpl/wyg) — a revolutionary WYSIWYG editor ([demo](https://www.youtube.com/watch?v=u1wNfSHwSQA)).

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
    layoutReady:   $barrier (),             // it's like jQueryish $(document).ready
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
        If already, calls immediately (like $(document).ready) */ })

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

## Platform detection

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

## Panic.js

An user interface component for displaying code failures (unhandled exceptions, failed tests). Click to see it in action:

[![Panic.js demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/nowpanic.png)](https://xpl.github.io/useless)

* Cross-platform uncaught exception handling (works around incomplete 'onerror' impl. in Safari).
* Maintains callstack persistence across async call boundaries (addEventListener, setTimeout).
* Loads and displays expandable source lines for fast identification.
* Hides third party code by default (can be displayed by pressing 'more').
* Grouping of message duplicates.
* Grouping of same source line repeated consequently.
* Complete [API](https://github.com/xpl/useless/blob/master/base/reflection.js) for it's internals (exception handling / callstack access) — _TBD_

## LogOverlay.js

A nice `console.log` alternative for those who like log-driven debugging. Based on [log.js](https://github.com/xpl/useless/blob/master/base/log.js) (acts as a write backend for it) — which is ultimately based on [stringify.js](https://github.com/xpl/useless/blob/master/base/tier0/stringify.js) and [reflection.js](https://github.com/xpl/useless/blob/master/base/reflection.js) superpowers (check it out).

Renders incoming `log` calls into semi-transparent overlay at the bottom of the viewport. It is transparent for mouse input (so it doesnt mess with page interaction) and can be toggled by `~` key (hello Quake). Much nicier than default `console.log` in many cases.

```javascript
LogOverlay.init ()

log.i ('Hello world...')
log.e ('...and hasta la vista, baby')
```

[![Reference](http://img.leprosorium.com/2460404)](https://github.com/xpl/useless/blob/master/client/LogOverlay.js)

## Server app framework

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

- `api.js` URL routing
- `args.js` command line arguments parsing
- `config.js` handles `config.json` and default parameters
- `deploy.js` self-deployment protocol (automatic builds)
- `devtools.js` APIs for Git / source code access (developer mode)
- `exceptions.js` custom exception printer + error handling for requests
- `history.js` journal for DB operation
- `http.js` request serving basics
- `io.js` basic I/O for requests
- `supervisor.js` auto-restart on source code change
- `templating.js` basic templating (via underscore)
- `tests.js` self-tests on startup
- `uploads.js` file uploads
- `uptime.js` uptime tracking / restart()
- `websocket.js` WebSocket utility (peer tracking / auth / multicast)

## And more..

- [jQuery+](https://github.com/xpl/useless/blob/master/client/jQueryPlus.js) — a pack of handy jQuery plugins
- [Node+](https://github.com/xpl/useless/blob/master/client/node%2B.js) — a custom lightweight alternative to jQuery
- [DOMReference](https://github.com/xpl/useless/blob/master/client/DOMReference.js) — traits for writing DOM-rendered components
- [DSL for writing regexps in JS + named subexpressions](https://github.com/xpl/useless/blob/master/base/Rx.js)

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
node build.js <header-file-1> <header-file-2> ... <header-file-N> <output-folder> [no-compress] [no-stripped]
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
