# Use Less. Do More.

* `./base` platform-independent part
* `./client` browser-related utility
* `./server` app framework for Node.js
* `./build` built source (full/stripped/minified)
* `./useless.js` header file for build tool (contains include directives)
* `./useless.micro.js` header file for reduced build (example)

###Standard library of algorithms

* Extends underscore.js `_` namespace
* Infix calls for library methods (as Function/Array/String extensions)
* Abstract `map/zip/filter/reduce` over arrays/objects/scalars
* Deep `map/zip/filter/reduce` over any type of structure
* Advanced type detection / pattern matching
* Continuation-passing style (CPS) versions of standard algorithms
* Concurrency primitives (task pooling, interlocked methods)
* Vector math (`Vec2`, `Transform`, `BBox`, intersections)
- Multicast model for method calls with simple functional I/O
    - `_.trigger`, `_.triggerOnce` / one-to-many broadcast
    - `_.barrier` / synchronization primitive
    - `_.observable` / state change notifications

###Macro processor for prototype definitions

+ `$prototype` / `$extends`
+ smart property declarations
+ static methods / properties
+ tag groups on members (`$static: { ... }`)
+ `$final`
+ member aliases
+ RTTI
+ pluggable macros for custom syntax
+ `$singleton`
* `$traits` (mixins) as combinatoric-style alternative to inheritance
* `$aspect` (Aspect Oriented Programming) / declarative method binding

###Component model

* binds own methods to `this` automatically
* enables chaining into methods (also enables that for $traits)
+ manages bindable `$trigger` / `$barrier` / `$observableProperty` members
+ tracks bound components / auto-unbinds upon deinitialization
+ holds parent-child relationship / handles automatic deinitialization
+ validates configuration contracts (`$requires`, `$defaults`)

###Exception handling

- Cross-platform handling of uncaught exceptions
- Uncaught exceptions pass through network API calls
- Client displays server's exceptions as if it was single environment

###Callstack access

* Access at arbitrary location (for reflection purposes)
* Strips third party calls (clean mode)
* Fetches source code (local/remote)
* Nice output
    * Console mode (replaces default Node.js exception printer)
    * GUI mode (shows pop-up dialog with expandable source lines)

###Logging

+ platform-independent
+ color output
+ shows code location
+ configurable object printer
+ table layout formatting
+ hookable/interceptable
+ cross-machine

###Tests

* Tests before code
* Tests as documentantion
* Rich library of assertions
* Asynchronous / nested assertions
* Custom assertions
* Humane error reporting

###And more..

- Platform detection/abstraction layer
- DSL for writing regexps in JS + named subexpressions
- Unicode regexp hack
- Performance measurement
- Base64 encoding/decoding

##`./client`

###jQueryPlus.js

A pack of handy jQuery extensions. Biggest thing here is drag & drop utility (`$.fn.drag`), which is utilized by countless number of widgets I made.

###BroTools™

An interactive code macroprocessor. Makes certain constants in source code editable. One tags a constant of interest with special keyword, e.g. `$tune (12.224)`. Calling $tune translates to a certain widget in the BroTools™ UI, associated with source code location of the call (read via Callstack API). Interacting with the widget leads to source code update, writing new value inside call expression. Currently under development.

###API.js

XHR requests to communicate with `./server` part.

###UI.error.js

A pop-up alert that shows errors / stack traces.

###Virtualized Views

- `TileView.js`
- `TableView.js`
- `VirtualListViewRenderer.js`
- `InfiniScrollContainer.js`

For displaying vast amounts of data.

###Generic widgets

- `RangeControl.js`
- `ContextMenu.js`
- `Popover.js`
- `FormDialog.js`

Various common building blocks for web applications.

###Nav.js

Tabbed navigation host / URL persistence.

###RemoteCollection

- `DataManager.js`
- `Collection/Collection.js`
- `Collection/RemoteCollection.js`
- `Collection/FilterChain.js`

Bits and pieces of real-time database synchronization engine, taken from some previous project. Incomplete and abandoned.

##Installing as NPM module

Copy `useless` folder to `node_modules` subfolder of your project. In this case the whole library will load as source which you can browse and/or edit. Edits are welcome!

##Installing as pre-built monolithic script

If you want to use only platform-independent part of the library, go to `build` folder and pick `useless.js`. This one is ready to be included to either server or client side.

For minified version (with unit tests stripped) pick `useless.min.js`. This one is ready to be used in production setup.

##Building

Build command:

`node build.js <header-file> <output-folder>`

For building useless.js, run `node build.js useless ./build`. It will compile `useless.js` in root directory to `./build/useless.js`, and also will generate minified version `./build/useless.min.js` via Google Closure Compiler. There will be also intermediate file `./build/useless.stripped.js` with unit tests and comments stripped.

##Custom build

To make reduced version (with some submodules disabled), you can make your own version of `useless.js` file, commenting out unneeded `$include` directives. And then running build command to compile it.

There exists `useless.micro.js` as example of such reduced build. Running `node build.js useless.micro ./build` will produce `./build/useless.micro.min.js` as output.

##Automatic builds on source change

###Using external tools

You can run `build.js` under `nodemon` (which can be installed from npm). This will trigger automatic re-builds on source change.

`nodemon build.js <header-file> <output-folder>`

This will work for applications that dont rely on `useless/server` to implement app lifecycle.

###Using `useless/server/deploy`

Applications that are based on top of `useless/server` can easily enable automatic builds feature by adding following **$traits** to main application component:

```
$traits: [        
        require ('useless/server/exceptions'),
        require ('useless/server/tests'),
        require ('useless/server/deploy'),
```

This will add test & build phase to app startup sequence, aborting if something went wrong.

For re-scheduling startup on source change, run your application under `nodemon` or `supervisor`. There also exists `.nodemonignore` which you can edit to exclude some files from monitoring.
