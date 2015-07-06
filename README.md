# Use Less. Do More.

A cross-platform JavaScript toolbox for writing complex web applications. Currently in pre-release stage, missing some basic documentation and being under heavy development.

[Installing](#installing) | [Building](#building) | [Wiki](https://github.com/xpl/useless/wiki)

```bash
> npm install useless
```

### Browser builds

* Compiled/minified (for production setup): [useless.min.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.min.js) (111 Kb)
* Readable source (for development use): [useless.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.js)

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

Currently `./server` part is not working well, some code may not even compile (especially DB-related things), only the basic function work (request I/O). My current focus is to make the `./base` part work, as it is used in production of several projects I'm working on.

Most of widgets defined in `./client` part are not work well too, as their code is hard out of sync with recent code base changes. `UI.error` (a thing that displays cool stack traces) works well, though (run example app for demo); as well as `jQueryPlus.js` utility (it is production-ready).

Someday I will publish a complete demo app that utilizes all these features (like a To-Do list or something).

Feel free to leave feedback / submit pull requests if you find any of these things helpful. Documentation is pending, check [Wiki](https://github.com/xpl/useless/wiki) for updates.

### Running example app

```bash
> node example.js
```

If everything's ok, example app will be running at <a href="http://localhost:1333">http://localhost:1333</a>. Currently there's not much example code, but it's on the way.

# `./base` features

## Generic algorithms

[Reference (incomplete)](./base/tier0/README.md)

* Extends underscore.js `_` namespace
* Functional primitives busybox (predicates, operators and stuff)
* Higher order toolbox (functions that warp functions)
* Infix interface for underscore's stuff (as Array/String/Function extensions)
* Abstract `map/zip/filter/reduce` over arrays/objects/scalars
* Deep `map/zip/filter/reduce` over arbitrary structures
* Deep version of underscore's stuff (`_.clone`, `_.extend`, etc)
* Advanced type detection / pattern matching
* Continuation-passing style (CPS) versions of standard algorithms
* Concurrency primitives (task pooling, interlocked methods)
* Basic math (`lerp` / `clamp`, color space conversion, etc)
* Vector math (**Vec2**, **Transform**, **BBox**, **Bezier**, intersections)
* Multicast model for method calls with simple functional I/O
    - `_.trigger`, `_.triggerOnce` / one-to-many broadcast
    - `_.barrier` / synchronization primitive
    - `_.observable` / state change notifications

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

## Component model

[How-to & Examples](https://github.com/xpl/useless/wiki/$component)

- Binds own methods to **this** automatically
- Manages bindable **$trigger** / **$barrier** / **$observableProperty** members
- Tracks bound components / auto-unbinds upon deinitialization
- Holds parent-child relationship / handles automatic deinitialization
- Enables **$traits** to chain into method calls by overlapping method definitions
- Enforces configuration contracts (**$requires**, **$defaults**)

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
    - GUI mode (a pop-up dialog with expandable source lines, `./client/UI.error.js` feature)

## Test framework

[**How-to & Examples**](https://github.com/xpl/useless/wiki/Test-framework)

[![assertion demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/assert.jpg)](https://github.com/xpl/useless/wiki/Test-framework)

* Tests before code
* Tests as documentantion
* Rich library of assertions
* Asynchronous / nested assertions
* Custom assertions
* Humane error reporting

## Logging

[Reference / examples](https://github.com/xpl/useless/blob/master/base/log.js)

[![log demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/log.png)](https://github.com/xpl/useless/blob/master/base/log.js)

+ Platform-independent
+ Color output
+ Shows code location
+ Configurable object printer
+ Table layout formatting
+ Hookable/interceptable
+ [Displays server's log in browser console](https://github.com/xpl/useless/wiki/Cross-machine-logging)

## And more..

- Platform detection/abstraction layer
- Performance measurement
- DSL for writing regexps in JS + named subexpressions
- Unicode regexp hack (3rd party)
- Base64 encoding/decoding (3rd party)

# `./client` features

### jQueryPlus.js

A pack of handy jQuery extensions. Biggest thing here is drag & drop utility (`$.fn.drag`), which is utilized by countless number of widgets I made.

```javascript
$(handle).drag ({
	start: function ()             { return this.leftTop () },
	move:  function (memo, offset) { this.css (memo.add (offset).asLeftTop) } })
```

### BroTools™

![BroTools™ demo](https://pp.vk.me/c625526/v625526383/3557e/vRWBw0o4Nxw.jpg)

An interactive code macroprocessor. Makes certain constants in source code editable. One tags a constant of interest with special keyword, e.g. `$tune (12.224)`. Calling **$tune** translates to a certain widget in the BroTools™ UI, associated with source code location of the call (read via Callstack API). Interacting with the widget leads to source code update, writing new value inside call expression. Currently under development.

### API.js

XHR requests to communicate with `./server` part.

### UI.error.js

A pop-up alert that shows errors / stack traces. See example app for demo & how-to. **Notice**: not works if running from local HTML file (because it reads back JavaScript sources via XHR requests).

[![UI.error.js demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/nowpanic.png)](https://github.com/xpl/useless/blob/master/example/index.html)

### Virtualized Views

- `TileView.js`
- `TableView.js`
- `VirtualListViewRenderer.js`
- `InfiniScrollContainer.js`

For displaying vast amounts of data.

### Generic widgets

- `RangeControl.js`
- `ContextMenu.js`
- `Popover.js`
- `FormDialog.js`

Various common building blocks for web applications.

### Nav.js

Tabbed navigation host / URL persistence.

### RemoteCollection

- `DataManager.js`
- `Collection/Collection.js`
- `Collection/RemoteCollection.js`
- `Collection/FilterChain.js`

Bits and pieces of real-time database synchronization engine, taken from some previous project.

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
- `auth.js` authorization management
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
node build.js <header-file> <output-folder>
```

For generic build, run `node build.js ./useless.js ./build`, or simply

```bash
> node build.js
```

It will generate `./build/useless.js` by substituting `$include` directives found in header file. Produced result will undergo stripping of tests and comments, and then finally compiled using Google Closure Compiler, outputting minified result to `./build/useless.min.js`

## Custom build

To make reduced/extended distribution (with some submodules disabled or enabled), you can create your own version of default header file, commenting out unneeded `$include` directives.

There exists `./useless.micro.js` as an example of reduced build. Running `node build.js ./useless.micro.js ./build` will produce `./build/useless.micro.min.js` as output.

## Automatic builds on source change

### Using external tools

You can run `build.js` under `nodemon` (which can be installed from npm). This will trigger automatic re-builds on source change.

```bash
nodemon build.js <header-file> <output-folder>
```

This will work for applications that dont rely on `useless/server` to implement app lifecycle. For frequent re-builds, you may turn off compression, re-building only `useless.js` (Google Closure Compiler has limited call quota per IP):

```bash
> nodemon build.js no-compress
```

### Using `useless/server/deploy`

Applications that are based on top of `useless/server` can easily enable automatic builds feature by adding following [**$traits**](https://github.com/xpl/useless/wiki/$trait) to main application component:

```javascript
$traits: [        
        require ('useless/server/exceptions'),
        require ('useless/server/tests'),
        require ('useless/server/deploy'),
```

This will add test & build phase to app startup sequence, aborting if something went wrong.

For re-scheduling startup on source change, run your application under `nodemon` or `supervisor`. **Important notice:** you should add `./node_modules/useless/build/` folder to `.nodemonignore` file in root directory of your project, to prevent restart loop.

Currenly it re-builds only `useless.js`, with no compression applied.
