# Use Less. Do More.

A cross-platform JavaScript toolbox for writing complex web applications. Currently in pre-release stage, missing some basic documentation and being under heavy development. **In near future, it will be split into several loosely coupled NPM modules, for everyone's convenience. Stay tuned.**

[Installing](#installing) | [Building](#building) | [Wiki](https://github.com/xpl/useless/wiki)

```bash
> npm install useless
```

### Upcoming features

- Lightweight HTTP server framework with Promise-based flow control
- Brand new test system based on [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Nonlinear/asynchronous logging and stack traces](http://img.leprosorium.com/2523074) (for Promise-based code)
- Splitting of distinct framework parts to separate projects (finally, _useful_ ones).

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

[![Panic.js demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/nowpanic.png)](https://www.youtube.com/watch?v=IWLE8omFnQw)

- Cross-platform uncaught exception handling (works around incomplete 'onerror' impl. in Safari).
- Uncaught exceptions pass through network API calls
- Client displays server's exceptions as if it was single environment
- Complete [API](https://github.com/xpl/useless/blob/master/base/reflection.js) for it's internals
- Strips third party calls (clean mode)
- Fetches source code (local/remote)
- Nice output
    - Console mode (replaces default Node.js exception printer)
    - GUI mode (a pop-up dialog with expandable source lines)

## Test framework

[**How-to & Examples**](https://github.com/xpl/useless/wiki/Test-framework)

![assertion demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/assert.jpg)

![assertion demo](http://img.leprosorium.com/2512877)

* Tests before code
* Tests as documentantion
* Rich library of assertions
* Asynchronous / nested assertions
* Intercepts global log, displaying it in running assertion context
* Custom assertions
* Humane error reporting
* Browser-side support (see demo: [youtube.com/watch?v=IWLE8omFnQw](https://www.youtube.com/watch?v=IWLE8omFnQw))

## Logging

[Reference / examples](https://github.com/xpl/useless/blob/master/base/log.js)

![log demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/log.png)
![log demo](http://img.leprosorium.com/2512874)

+ Platform-independent
+ Color output (even in WebInspector)
+ Shows code location
+ [Configurable object printer](https://github.com/xpl/useless/blob/master/base/tier0/stringify.js)
+ Table layout formatting
+ Hookable/interceptable

## Server app framework

Example:

```javascript
require ('useless')

UselessApp = $component ({

	$depends: [
		require ('useless/server/tests'),
		require ('useless/server/deploy'),
		require ('useless/server/http') ],

	/*    URL router schema
	 */
	api: function () { return {
		
		'/':             this.file ('./static/index.html'),
		'/static/:file': this.file ('./static'),            // directory
	
		'hello-world':       () => "Hello world!",          // plain text
		'hello-world/json':  () => { foo: 42, bar: 777 },   // JSON
		
		/*    Tree-style defintions, Promise-backed method chains
		 */
		'api': {
			'login':  { post: [this.receiveJSON, this.doLogin] },
			'logout': { post: () => $http.removeCookies (['email', 'password']) } } } },

	/*	A complex request handler example, demonstrating some core features.
	
		All execution is wrapped into so-called "supervised Promise chain",
		so you don't need to pass the request context explicitly, it is always
		available as $http object in any promise callback related to request
		represented by that object.
		
		All thrown errors and all log messages are handled by the engine
		automagically. It builds a process/event hierarchy that reflects the
		actual execution flow, so you don't need to run a debugger to see what's
		going on, it's all in the log. Request is automatically ended when an
		unhandled exception occurs, no need to trigger it explicitly.
	 */
	doLogin: function () {
		var login = _.pick ($http.env, 'email', 'password') // 'receiveJSON' writes to $http.env
		if (login.email && login.password) {
			return this.db.users
					.find (login)
					.count ()
					.then (count => {
                        			if (count > 0) {
                        				$http.setCookies (login) }
                        			else {
                        				throw new Error ('Wrong credentials') } }) }
		else {
	    		throw new Error ('Empty email or password') } },

	init: function (then) {
	    then ()
		log.ok ('App started') } })

module.exports = { init: function () { return new UselessApp () } }
```

Example report generated from failed Promise chain:

![Promise stack demo](http://img.leprosorium.com/2523961)

Following are [**$traits**](https://github.com/xpl/useless/wiki/$trait) defined at `useless/server`:

- `api.js` URL routing
- `args.js` command line arguments parsing
- `config.js` handles `config.json` and default parameters
- `deploy.js` self-deployment protocol (automatic builds)
- `devtools.js` developer-mode APIs for Git / source code access
- `exceptions.js` custom unhandled exception printer
- `history.js` journal for DB operation
- `http.js` request serving basics
- `supervisor.js` auto-restart on source code change
- `templating.js` basic templating (via underscore)
- `tests.js` self-tests on startup for TDD
- `uploads.js` file/image uploads
- `uptime.js` uptime tracking
- `websocket.js` WebSocket utility

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
