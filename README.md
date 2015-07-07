# Use Less. Do More.

A cross-platform JavaScript toolbox for writing complex web applications. Currently in pre-release stage, missing some basic documentation and being under heavy development.

[Installing](#installing) | [Building](#building) | [Wiki](https://github.com/xpl/useless/wiki)

```bash
> npm install useless
```

### Browser builds

* Compiled/minified (for production setup): [useless.min.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.min.js) (111 Kb)
* Readable source (for development use): [useless.js](https://raw.githubusercontent.com/xpl/useless/master/build/useless.js)

### Dependencies and limitations

Client side tools that depend on reflection utility (e.g. test framework / stack traces UI) work only in WebKit-based browsers at the moment. Server side tools are built on top of **Node.js** technology. The rest of the code base should be cross-browser (at least it attemps to).

Database-related utility depends on MongoDB (not included in `npm` dependency list, should install manually). Anyway, it does not work well at the moment...

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

It started a year ago as a pet library for my freelance projects, but recently it has kinda grown out of control, so I decided to make it public domain.

Its main (unreleased for now) feature will be a flexible schema layer over MongoDB which allows to configure various data access widgets (table views, popover selections, form dialogs) directly from that schema, providing real-time synchronization with remote database. It also will act as declarative contract for API validation / security layer. Thats why there's so many code related to abstract data processing / type matching.

It also features various widgets with rendering virtualization, allowing to render vast amounts of data with smooth scrolling and no pagination (TableView, TileView, ListView). They're already there, but not yet working as they depend on that schema mentioned before. Need to separate this thing from my elder private projects properly...
Currently I'm focused to make the basic bootstrap code work well, as this thing is now used as a front-end library in a couple of large scale projects run by a company I'm employed. So at least the base part should be production quality soon.

Stay tuned and thanks for your attention!

Feel free to leave feedback / submit pull requests if you find any of these things helpful. Documentation is pending, check [Wiki](https://github.com/xpl/useless/wiki) for updates.

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
* Functional primitives busybox (predicates, operators and stuff)
* Higher order toolbox (functions that warp functions)
* Infix interface (as Array/String/Function extensions)

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
              return_ (fileText.indexOf (then) >= 0) }) }) }
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

**$interlocked** (puts a function under concurrency lock)

```javascript
  readFilesSequentially = $interlocked (function (file, done, releaseLock) {
                                         $.get (file, done.then (releaseLock), 'text') })

  readFilesSequentially ('file1.txt', log)
  readFilesSequentially ('file2.txt', log) // waits until file1.txt read
```

## Advanced type detection / pattern matching

[Reference](https://github.com/xpl/useless/blob/master/base/tier0/typeMatch.js)

```javascript
  > _.decideType ( { foo: 1, bar: { baz: [2,3] } })
  < { foo: 'number', bar: { baz: ['number'] } }
```

```javascript
  > _.omitTypeMismatches ({ foo: 'number', bar: { baz: ['number'] } },
                          { foo: '1',      bar: { baz: [2,3] } })
  < { bar: { baz: [2,3 } }
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
   var offsetVec   = this.anchor.sub (this.center).normal.perp.scale (
                       Bezier.cubic1D (Vec2.dot (direction.normal, upVector), 0, 1.22, 0, 1.9))
```
```javascript
   var where = this.bodyBBox.nearestPointTo (this.anchor, this.borderRadius)
```
```javascript
   domElement.css (BBox.fromPoints (pts).grow (20).offset (position.inverse).css)
```

## Multicast model for method calls with simple functional I/O

[Reference](https://github.com/xpl/useless/blob/master/base/dynamic/stream.js)

```javascript
var mouseMove = _.trigger ()

mouseMove (function (x, y) { }) // bind
mouseMove (12, 33)              // call
```

* `_.trigger`, `_.triggerOnce` / one-to-many broadcast
* `_.barrier` / synchronization primitive
* `_.observable` / state change notifications

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
+ [Configurable object printer](https://github.com/xpl/useless/blob/master/base/tier0/stringify.js)
+ Table layout formatting
+ Hookable/interceptable
+ [Displays server's log in browser console](https://github.com/xpl/useless/wiki/Cross-machine-logging)

## And more..

- Platform detection/abstraction layer
- Performance measurement
- [DSL for writing regexps in JS + named subexpressions](https://github.com/xpl/useless/blob/master/base/Rx.js)
- Unicode regexp hack (3rd party)
- Base64 encoding/decoding (3rd party)

# `./client` features

### jQueryPlus.js

A pack of handy jQuery extensions. Biggest thing here is drag & drop utility (`$.fn.drag`), which is utilized by countless number of widgets I made. It also compatible with mobile devices (iOS / Android).

```javascript
$(handle).drag ({
	start: function ()             { return this.leftTop () },
	move:  function (memo, offset) { this.css (memo.add (offset).asLeftTop) } })
```

### UI.error.js

A pop-up alert that shows errors / stack traces. See example app for demo & how-to. **Notice**: not works if running from local HTML file (because it reads back JavaScript sources via XHR requests).

[![UI.error.js demo](https://raw.githubusercontent.com/xpl/useless/master/example/img/nowpanic.png)](https://github.com/xpl/useless/blob/master/example/index.html)

### API.js

XHR requests to communicate with `./server` part.

### RemoteCollection

- `DataManager.js`
- `Collection/Collection.js`
- `Collection/RemoteCollection.js`
- `Collection/FilterChain.js`

Bits and pieces of real-time database synchronization engine, taken from some previous project. Needs documentation and examples. Rather unusable for now.

### BroTools™

![BroTools™ demo](https://pp.vk.me/c625526/v625526383/3557e/vRWBw0o4Nxw.jpg)

An interactive code macroprocessor. Makes certain constants in source code editable. One tags a constant of interest with special keyword, e.g. `$tune (12.224)`. Calling **$tune** translates to a certain widget in the BroTools™ UI, associated with source code location of the call (read via Callstack API). Interacting with the widget leads to source code update, writing new value inside call expression. Currently under development, being in a bare proof-of-concept state.

Depends on APIs provided by `useless/server/devtools` trait and browser versions of `escodegen` and `esprima` modules (can be found on github / NPM).

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
