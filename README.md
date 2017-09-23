# Use Less. Do More.

A research project, from which I learned a lot. Especially how one shouldn't write code and web frameworks in particular :) 

**In near future, it will be split into several loosely coupled, clean and maintainable NPM modules, for everyone's convenience.** Stay tuned.

[Installing](#installing) | [Wiki](https://github.com/xpl/useless/wiki)

```bash
> npm install useless
```

### Browser builds

- [useless.client.js](https://github.com/xpl/useless/blob/master/build/useless.client.js) — everything, except devtools
- [useless.devtools.js](https://github.com/xpl/useless/blob/master/build/useless.client.js) — logging / stacktraces / assertions / Panic.js

### Upcoming features

- Splitting of distinct framework parts to separate projects (finally, _useful_ ones).

### Recent updates / changelog

- You can override config with command line args, e.g. `node example webpack.offline=false`, using [`server/config.js`](https://github.com/xpl/useless/blob/master/server/config.js) trait.

- You can now handle interactive terminal input with [`server/stdin.js`](https://github.com/xpl/useless/blob/master/server/stdin.js) trait.

- [ololog](https://github.com/xpl/ololog) logging facility is now separate project (redesigned from a scratch)

- [meta-fields](https://github.com/xpl/meta-fields) facility now available as a separate NPM module.

- [webpack](https://github.com/xpl/useless/blob/master/server/webpack.js) server trait now supports `compress` option for crunching scripts with Google Closure Compiler.

- Webpack Hot Module Replacement now works (run the example app and try change `example/index.css`). It was previously broken due to `webpack-dev-server` incompatilibity with Webpack 2. This is solved by introducing [`webpack-hot-fix.js`](https://github.com/xpl/useless/blob/master/client/webpack-hot-fix.js).

- You can now use ES6 getter syntax for defining properties in components/traits: `get something () { ... }`

- Working on **webpack** and **babel** integration for building front-end code (see the [webpack](https://github.com/xpl/useless/blob/master/server/webpack.js) server trait and the [example](https://github.com/xpl/useless/blob/master/example.js) app). Will feature continuous builds, hot module replacement, CSS imports and shared code extraction — all configurable from server's config.

- More NPM modules to come: [StackTracey](https://github.com/xpl/stacktracey) and [get-source](https://github.com/xpl/get-source).

- ANSI color management now available as separate NPM module: [ansicolor](https://github.com/xpl/ansicolor).

- `asTable` function now available as a separate NPM module: [as-table](https://github.com/xpl/as-table).

- `String.ify` function now available as a separate NPM module: [string.ify](https://github.com/xpl/string.ify).

- A wiki entry explaining the [Stream concept](https://github.com/xpl/useless/wiki/Stream). Thanks to @kroitor for the translation/adaptation from Russian!

- Build system now utilizes **webpack** for squashing `require` imports. All external dependencies (e.g. underscore) now embedded in `useless.client.js` — no need to link them separately.

- Component methods `init / beforeInit / afterInit` now support Promise interface for asynchronous initialization. Old callback-passing style is gone.

- A [wiki entry explaining the new __ namespace](https://github.com/xpl/useless/wiki/Promise) (brought by [Promise+](https://github.com/xpl/useless/blob/master/base/Promise%2B.js)). It contains a pack of highly abstract data-processing algorithms that can handle any type of data (arrays, objects, scalars) and any kind of operator function (either sync or async).

- An early alpha of the new [HTTP server framework](https://github.com/xpl/useless/tree/master/server) built around the recent `Androgene` subsystem. See a brief [example](https://github.com/xpl/useless#server-app-framework) here. It allows to write and debug complex asynchronous chains in no time, with unprecedented level of the error reporting legibility.

- A working prototype of [Androgene](https://github.com/xpl/useless/blob/master/base/Androgene.js) subsystem, delivering the "supervised Promises" concept for [asynchronous/nonlinear logging and stack traces](http://cdn.jpg.wtf/futurico/43/b7/1465795630-43b7b55e9beabe1e72738c50b50cb2ef.png). It is also a core mechanism behind the upcoming unit test system (will replace the old `Testosterone` thing).

- [Read more...](https://github.com/xpl/useless/wiki/Changelog)

### Running example app

```bash
node example
```

If everything's ok, example app will be running at <a href="http://localhost:1333">http://localhost:1333</a>. Currently there's not much example code, but it's on the way.

You may want to look into these projects (built upon Useless.js):

* [Skychat](https://github.com/xpl/skychat) — a simple WebRTC paint/chat app.
* [Wyg](https://github.com/xpl/wyg) — a revolutionary WYSIWYG editor ([demo](https://www.youtube.com/watch?v=u1wNfSHwSQA)).

## Server app framework

```javascript
require ('./useless')

UselessApp = $singleton (Component, {

    $defaults: {
        webpackEntries: {
            entry: {
                'shared': { // duplicate code will be extracted to shared.js
                    'useless.client':   "./node_modules/useless/build/useless.client.js",
                    'useless.devtools': "./node_modules/useless/build/useless.devtools.js",
                    'index':            "./example/index.js",
                }
            }
        },
        config: {
            webpack: {
                hotReload: true
            }
        }
    },

    $depends: [
        require ('./server/supervisor'), // for auto-reload on code change
        require ('./server/webpack'),
        require ('./server/http')
    ],

/*  Members starting with "/" are HTTP request handlers         */

    '/hello-world':       () => "Hello world!",          // text/plain; charset=utf-8
    '/hello-world/json':  () => ({ foo: 42, bar: 777 }), // application/json; charset=utf-8

/*  File serving  */

    '/':             () => $this.file ('./static/index.html'), // $this is a smart alias for `this`, accessible from anywhere in the request execution context
    '/static/:file': () => $this.file ('./static'),            // any file from ./static folder

/*  Query params matching  */

    '/sqr?x={\\d+}':          ({ x    }) => Math.pow (Number (x),         2),  // x²
    '/pow?x={\\d+}&n={\\d+}': ({ x, n }) => Math.pow (Number (x), Number (n)), // x^n
                 
/*  Put your JSONAPI stuff in /api    */

    '/api': { // tree-style definitions are supported
        
        'login':  { post: async () => $this.doLogin (await $this.receiveJSON) },
        'logout': { post:       () => $http.removeCookies (['email', 'password']) },
    },

/*  A complex request handler example, demonstrating some core features.

    All execution is wrapped into so-called "supervised Promise chain",
    so you don't need to pass the request context explicitly, it is always
    available as $http object in any promise callback related to request
    represented by that object.
    
    All thrown errors and all log messages are handled by the engine
    automagically. It builds a process/event hierarchy that reflects the
    actual execution flow, so you don't need to run a debugger to see what's
    going on, it's all in the log. Request is automatically ended when an
    unhandled exception occurs, no need to trigger it explicitly.               */

    async doLogin ({ email, password }) {

        if (await this.findUser ({ email, password })) {

            $http.setCookies ({ email, password })

        } else {

            throw new Error ('Wrong credentials')
        }
    },

    async findUser (criteria) { /* ... */ },

    init () {

        log.ok ('App started')
    }
})
```

Example report generated from a Promise chain:

![Promise stack demo](http://cdn.jpg.wtf/futurico/43/b7/1465795630-43b7b55e9beabe1e72738c50b50cb2ef.png)

Following are [**$traits**](https://github.com/xpl/useless/wiki/$trait) defined at `useless/server`:

- [`api.js`](https://github.com/xpl/useless/blob/master/server/api.js) URL routing
- [`args.js`](https://github.com/xpl/useless/blob/master/server/args.js) command line arguments parsing
- [`config.js`](https://github.com/xpl/useless/blob/master/server/config.js) handles `this.config` management via `config.json` / command line arguments 
- [`exceptions.js`](https://github.com/xpl/useless/blob/master/server/exceptions.js) a humane exception printer (replaces Node's default)
- [`http.js`](https://github.com/xpl/useless/blob/master/server/http.js) powerful HTTP server abstraction
- [`ipc.js`](https://github.com/xpl/useless/blob/master/server/ipc.js) for app logic splitting between supervisor and supervised processes (RPC for app methods)
- [`pidfile.js`](https://github.com/xpl/useless/blob/master/server/pidfile.js) generates PID file upon startup / removes it on exit
- [`REPL.js`](https://github.com/xpl/useless/blob/master/server/REPL.js) REPL-style debugger (experimental)
- [`source.js`](https://github.com/xpl/useless/blob/master/server/source.js) remote access to app's own sources
- [`stdin.js`](https://github.com/xpl/useless/blob/master/server/stdin.js) handling interactive terminal input
- [`supervisor.js`](https://github.com/xpl/useless/blob/master/server/supervisor.js) auto-restart on source code change
- [`templating.js`](https://github.com/xpl/useless/blob/master/server/templating.js) Underscore's templates + caching
- [`tests.js`](https://github.com/xpl/useless/blob/master/server/tests.js) startup smoke tests for app traits
- [`thumbnailer.js`](https://github.com/xpl/useless/blob/master/server/thumbnailer.js) inline thumbnailer for images
- [`uploads.js`](https://github.com/xpl/useless/blob/master/server/uploads.js) image uploads basics
- [`uptime.js`](https://github.com/xpl/useless/blob/master/server/uploads.js) uptime tracking
- [`webpack.js`](https://github.com/xpl/useless/blob/master/server/webpack.js) full-featured WebPack integration
- [`websocket.js`](https://github.com/xpl/useless/blob/master/server/webpack.js) WebSocket basics

## Macro processor for prototype definitions

[How-to & Examples](https://github.com/xpl/useless/wiki/$prototype)

```javascript
Vec2 = $prototype ({

    /*  Constructor
     */
    constructor: function (x, y) { this.x = x; this.y = y },

    /*  Instance method
     */
    add (other) { return new Vec2 (this.x + other.x, this.y + other.y) }

    /*  Instance property (.length)
     */
    get length () { return Math.sqrt (this.x * this.x + this.y * this.y) }),

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
})

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
- Complete [API](https://github.com/xpl/stacktracey) for it's internals
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

## And more..

- [jQuery+](https://github.com/xpl/useless/blob/master/client/jQueryPlus.js) — a pack of handy jQuery plugins
- [Node+](https://github.com/xpl/useless/blob/master/client/node%2B.js) — a custom lightweight alternative to jQuery
- [DOMReference](https://github.com/xpl/useless/blob/master/client/DOMReference.js) — traits for writing DOM-rendered components
- [DSL for writing regexps in JS + named subexpressions](https://github.com/xpl/useless/blob/master/base/Rx.js)
