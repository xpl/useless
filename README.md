# Use Less. Do More.

A cross-platform JavaScript toolbox for writing complex web applications. Currently in pre-release stage, missing some basic documentation and being under heavy development. **In near future, it will be split into several loosely coupled NPM modules, for everyone's convenience. Stay tuned.**

[Installing](#installing) | [Building](#building) | [Wiki](https://github.com/xpl/useless/wiki)

```bash
> npm install useless
```

### Browser builds

- [useless.client.js](https://github.com/xpl/useless/blob/master/build/useless.client.js) — everything, except devtools
- [useless.devtools.js](https://github.com/xpl/useless/blob/master/build/useless.client.js) — logging / stacktraces / assertions / Panic.js

### Upcoming features

- New unit test system based on Promises (will replace the old buggy `Testosterone` thing).

- Splitting of distinct framework parts to separate projects (finally, _useful_ ones).

### Recent updates / changelog

- A wiki entry explaining the [Stream concept](https://github.com/xpl/useless/wiki/Stream). Thanks to @kroitor for translation from Russian!

- Build system now utilizes **webpack** for squashing `require` imports. All external dependencies (e.g. underscore) now embedded in `useless.client.js` — no need to link them separately.

- Component methods `init / beforeInit / afterInit` now support Promise interface for asynchronous initialization. Old callback-passing style is gone.

- A [wiki entry explaining the new __ namespace](https://github.com/xpl/useless/wiki/Promise) (brought by [Promise+](https://github.com/xpl/useless/blob/master/base/Promise%2B.js)). It contains a pack of highly abstract data-processing algorithms that can handle any type of data (arrays, objects, scalars) and any kind of operator function (either sync or async).

- An early alpha of the new [HTTP server framework](https://github.com/xpl/useless/tree/master/server) built around the recent `Androgene` subsystem. See a brief [example](https://github.com/xpl/useless#server-app-framework) here. It allows to write and debug complex asynchronous chains in no time, with unprecedented level of the error reporting legibility.

- A working prototype of [Androgene](https://github.com/xpl/useless/blob/master/base/Androgene.js) subsystem, delivering the "supervised Promises" concept for [asynchronous/nonlinear logging and stack traces](http://wtf.jpg.wtf/43/b7/1465795630-43b7b55e9beabe1e72738c50b50cb2ef.png). It is also a core mechanism behind the upcoming unit test system (will replace the old `Testosterone` thing).

- [Read more...](https://github.com/xpl/useless/wiki/Changelog)

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

## Multicast model for method calls with simple functional I/O
[How-to & Examples](https://github.com/xpl/useless/wiki/Stream) | [Reference](https://github.com/xpl/useless/blob/master/base/dynamic/stream.js)

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

Example (pseudo-code):

```javascript
require ('useless')

UselessApp = $singleton (Component, {

    $depends: [
        require ('useless/server/tests'),
        require ('useless/server/deploy'),
        require ('useless/server/http') ],

    /*    URL router schema
     */
    api: function () { return {
        
        '/':             this.file ('./static/index.html'),
        '/static/:file': this.file ('./static'),            // directory
    
        'hello-world':       () => { return "Hello world!"        }, // plain text
        'hello-world/json':  () => { return { foo: 42, bar: 777 } }, // JSON
        
        /*    Tree-style defintions, Promise-backed method chains
         */
        'api': {
            'login':  { post: [this.receiveJSON, this.doLogin] },
            'logout': { post: () => $http.removeCookies (['email', 'password']) } } } },

    /*  A complex request handler example, demonstrating some core features.
    
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
            log.ok ('App started')
            then () } })
```

Example report generated from a Promise chain:

![Promise stack demo](http://wtf.jpg.wtf/43/b7/1465795630-43b7b55e9beabe1e72738c50b50cb2ef.png)

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
4. Optionally, run `node build` to test if everything's ok

### As monolithic pre-built script

Go to [`/build`](https://github.com/xpl/useless/tree/master/build) folder and pick files needed.

- [useless.js](https://github.com/xpl/useless/blob/master/build/useless.js) for only the platform-independent part
- [useless.client.js](https://github.com/xpl/useless/blob/master/build/useless.client.js) for everything, except devtools
- [useless.devtools.js](https://github.com/xpl/useless/blob/master/build/useless.client.js) for logging / stacktraces / assertions / Panic.js

There also exist a compressed (minified) version of each file.

# Building

Build command:

```bash
node build <header-file-1> <header-file-2> ... <header-file-N> <output-folder> [no-compress] [no-stripped] [no-supervisor]
```

For building everything, run:

```bash
node build
```

It will generate `./build/***.js` by substituting `$include` directives found in header files. Produced result will undergo stripping of tests and comments, and then finally compiled using Google Closure Compiler, outputting minified result to `./build/***.min.js`

### no-compress option

Disables minification. Greatly speeds up build.

### no-stripped option

Disables generation of `***.stripped.js` files.

### no-supervisor option

Disables file monitor (for termination after run).

## Custom build

To make reduced/extended distribution (with some submodules disabled or enabled), you can create your own version of default header file, commenting out unneeded `$include` directives or including additional ones. There exists `./useless.client.js` as an example of custom distribution.

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
