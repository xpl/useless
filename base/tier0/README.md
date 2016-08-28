#[←](../../README.md)

Most deep layer of Useless.js code base.

```
!!! DOCUMENTATION UNDER CONSTRUCTION !!!
```

# busybox.js

Basic utility for writing data-crunching functional expressions.

```javascript
_.typeOf   = function (what) { return typeof what }

_.count = function (what)       { return what.length } // underscore reserved _.length for its own purposes..
_.array = _.tuple = function () { return _.asArray (arguments) }

_.concat = function (a, b) { ... } // a.concat (b) or a + b (if strings)

_.atIndex = function (n) { return function (arr) { return arr[n] } }

```

## \_.applies (fn, this\_, args)

This utility *"wraps around a function"* and generates a higher-order version of it, which, when called later, applies (passes) a set of arguments to the wrapped *"internal"* function. Passing the arguments to a function is the same as applying an array of arguments to a function in terms of Javascript syntax. This comes very handy with modern combinatoric JavaScript code.

Note the letter **'s'** at the end the function name (_.applie**\[s\]**). This is conventional naming for all such *"wrapping"* functions. The present continuous tense indicates that internal function is not called immediately, but another wrapper-function is created instead, which "doe**[s]** something" by design later upon its turn.

```javascript

// Definition

_.applies = function (fn, this_, args) { return function () { return fn.apply (this_, args) } }

```

```javascript
// Examples

// Basic standalone syntax
var logs123 = _.applies (console.log, console, [ 1, 2, 3 ])
logs123 () // prints 1 2 3

// Infix form is defined in Function.prototype
// .applies () can be called on any function
var logs321 = console.log.applies (console, [ 3, 2, 1 ])
logs321 () // prints 3 2 1

```

## \_.prepends (what) & \_.appends (what)

 The _.prepends () function *"wraps around a function"* and makes a higher-order version of it, which, when called, prepends its argument with an arbitrary user value. The _.appends works the same way, but appends a user value to the end of the argument.

```javascript

// Definition

_.prepends = function (what) { return function (to) { return what + to } }
_.appends = function (what)  { return function (to) { return to + what } }
```

```javascript
// Examples

let [ mike, tom, world ] = [ 'Mike', 'Tom', 'World' ]

var prependsGreeting = _.prepends ('Hello, ')
var appendsQuestion  = _.appends  ('! How are you?')

console.log (prependsGreeting (world)) // prints Hello, World
console.log (prependsGreeting (mike)) // prints Hello, Mike

// _.prepends and _.appends can be mixed together in any order
var f = function (username) { return appendsQuestion (prependsGreeting (username)) }
var g = function (username) { return prependsGreeting (appendsQuestion (username)) }

f (tom)  // yields Hello, Tom! How are you?
g (mike) // yields Hello, Mike! How are you?

[ 10, 20, 30 ].map (_.appends (' units')) // returns [ '10 units', '20 units', '30 units' ]

```

---

```javascript
_.join      = function (arr, s) { return arr.join (s) }
_.joinWith  = _.flip2 (_.join)
_.joinsWith = _.higherOrder (_.joinWith)
```
```javascript
_.sum      = function (a, b) { return (a || 0) + (b || 0) }
_.subtract = function (a, b) { return (a || 0) - (b || 0) }
_.mul      = function (a, b) { return (a || 0) * (b || 0) }
_.equal    = function (a, b) { return a === b }

_.sums      = _.plus  = _.higherOrder (_.sum)
_.subtracts = _.minus = _.higherOrder (_.subtract)
_.muls                = _.higherOrder (_.mul)
_.equals              = _.higherOrder (_.equal)
```
```javascript
_.largest = function (a, b) { .. } // underscore already taken _.max for its dirty needs

_.notZero = function (x)      { return x !== 0 }
_.propertyOf = function (obj) { return function (prop) { return obj[prop] } } // inverted version of _.property
```

# type.js

[Read its source for the reference](https://github.com/xpl/useless/blob/master/base/tier0/type.js), as it's rather readable on its own. It provides basic type checking extensions / urgent fixes to `underscore.js`.

# function.js

[Source Reference](https://github.com/xpl/useless/blob/master/base/tier0/function.js)

Various function-centric utility.

## arity

``_.arity``
``Function.arity``

Limits function to given number of arguments.

```javascript
  _.arity   = function (N, fn) { ... }
  _.arity0  = ...
  _.arity1  = ...
  _.arity2  = function (fn) { return function (a, b) { return fn.call (this, a, b) }}
  _.arity3  = ...
  _.arityFn = function (N) { return _['arity' + N] }
```

Super useful in cases when a callback does not expect some extra arguments passed to it. In the following example, `_.map` supplies 3 arguments to it's callback, but they're totally not expected:

```javascript
  var operation = function (x, destroyWorldIfSupplied) { .. }
  
  _.map (arr, operation.arity1) // arguments beyound `x` never pass through
```

## tails

``_.tails``
``Function.tails``

A version of `_.partial` that binds to **tail** of argument list. There also exists `tails2` and `tails3` that bind starting from second and from third arguments, respectively. Example:

```javascript
/*   It called tails2, because it binds to second argument and beyond
 */
printABC = function (a, b, c) { console.log (a, b, c) }
printABC.tails2 (3, 4) (1) // prints 1, 3, 4
```

## flip

``_.flip``

Flips argument order of a function. There also exist `flip2` and `flip3` which is a shortcut to _"arity2 + flip"_ and _"arity3 + flip"_, respectively.

```javascript
var printAB = function (a, b) { console.log (a, b) }
var printBA = _.flip (printAB)

printBA (3,4) // prints 4,3
```

## Higher-order boolean logic

```javascript
_.or  (fnA, fnB) // returns function that computes fnA (args) || fnB (args)
_.and (fnA, fnB) // returns function that computes fnA (args) && fnB (args)
_.not (fn)       // returns function that computes !fn(args)
```

## _.higherOrder (fn)

Generates higher order stuff from regular routine:

```javascript
var print  = function (x) { console.log (x) }
var prints = _.higherOrder (print)

_.times (3, prints ('foo')) // prints 'foo foo foo'
```

## _.eval (x)

Coerces ``value | (fn → value)`` to ``value`` (useful for configuration parameters):

```javascript
_.eval (function () { return 42 }) // 42
_.eval (42)                        // 42
```

## _.method (name)

It's like a `_.property`, but calls a method.

```javascript
var obj1 = { foo: function () { return 42 } }
var obj2 = { foo: function () { return 77 } }

   _.map ([obj1, obj2], _.method ('foo'))
// gives  [42,   77]
```

## asFreeFunction / asMethod

``_.asFreeFunction`` ``Function.asFreeFunction``
``_.asMethod`` ``Function.asMethod``

Converts between calling conventions.

```javascript
var foo = {
    name:         'foo',
    method:        function ()    { log (this.name) } }
    
var freeFunction = function (obj) { log (obj.name)  }

freeFunction.asMethod.call (foo)  // translates this → first argument
foo.method.asFreeFunction  (foo)  // translates first argument → this
```

## _.once (fn)

```javascript
 var f = _.once (function () { log ('foo') })
 
 f () // prints 'foo'
 f () // supresses subsequent calls
```

## _.withTimeout (cfg, what, then)

Runs a function under time limit. `then` is last argument (not in config) to conform to CPS interface (last argument is continuation). It is called if timeout is not expired. Otherwise, `cfg.expired` gets called. You may explicitly call `then` from `expired` callback if needed.

```javascript
    _.withTimeout ({
        maxTime: 10,
        expired: function (then) { /* calls if done () wont be called in 10 msec */ } },
        function (done) { done () },
        function () { /* this is called if timeout is not expired (OPTIONAL) */)
```

## _.sequence / _.then / Function.then

Sequential composition operator. Basically, a reversed version of `_.compose`. Complex example (taken from unit test):

```javascript
var context = { foo: 'bar' }

var makeCookies = function (from) { $assert (this === context)
    return 'cookies from ' + from }

var eatCookies = function (cookies) { $assert (this === context)
    return 'nice ' + cookies }

var lifeProcess = makeCookies.then ?                            // available in both notations
                        makeCookies.then (eatCookies) :
                        _.then (makeCookies, eatCookies)

var anotherWay = _.sequence (makeCookies, eatCookies)
var wayAnother = _.sequence ([makeCookies, eatCookies])

$assert (lifeProcess.call (context, 'shit'), 'nice cookies from shit')
$assert (anotherWay.call  (context, 'shit'), 'nice cookies from shit')
$assert (wayAnother.call  (context, 'shit'), 'nice cookies from shit')

$assert (_.sequence ([]).call (context, 'foo'), 'foo')
```

## Y combinator (for anonymous recursive functions)

For rare cases when one needs to bring self-reference to a pure functional expression, avoiding extra variable use.

```javascript
  _.Y (function (self) {             // returns a function that counts to 5
      return function (n) {
          return n >= 5 ? n : self (n + 1) } })
```

## Hyper operator

Converts regular things like map/zip to hyper versions, that traverse deep structures.

First argument of a resulting function is the thing that walks down the tree and transforms it. But its functor operand gets called only on the leaves of a tree (end values). Essentially, it abstracts you from structure, making it 'transparent' for any kind of previously defined one-dimensional datatype-abstract operators like `map2`/`filter2`/`zip2`/`reduce2`/`find2` etc.

```javascript
  _.mapMap = _.hyperOperator (_.unary,  _.map2)
  _.zipZip = _.hyperOperator (_.binary, _.zip2)
```

# stdlib.js

A collection of most basic data processing algorithms missing / misimplemented in Underscore.js (and some less important but handy things).

## _.map2 (x, op)

``x  : any type``
``op : f (value, key)``

Abstract map that can operate over any type of `x`. This is semantically correct, in contrary to standard `_.map` behavior. When implemented like this, it can be used as a basic composable building block for larger structure-independent algorithms.

Scalar value:
```javascript
  > _.map2 ('foo', _.appends ('bar'))
  > 'foobar'
```

Arrays:
```javascript
  > _.map2 (['foo'], _.appends ('bar'))
  > ['foobar']
```

Objects:
```javascript    
  > _.map2 ({ foo: 'foo' }, _.appends ('bar'))
  > { foo: 'foobar' }
```

## _.mapMap (x, op)

Fractalized version of previous utility. Hence the name (map over map). Can operate over arbitrary structure, 'seeing through' it:

```javascript
  > _.mapMap ({ foo: 7,
                bar: ['foo', {
                  bar: undefined }] }, _.typeOf))
                            
  >  { foo: 'number', 
       bar: ['string', {
          bar: 'undefined' }] }) },
```

Defined via `_.hyperOperator` - a highly abstract transformation that fractalizes ordinary algorithms, looping them through themselves, making any complex structure completely transparent for their operation.

See how `_.mapMap` is defined:

```javascript
  _.mapMap = _.hyperOperator (_.unary, _.map2)  // 'unary' says that both _.map2 and its functor take 1 argument.
```

## _.reduceReduce (memo, value, op)

``memo : required``
``value : any``
``op : f (memo, value)``

Initial memo **should** be provided. A note on nonstandard argument order. Because `hyperOperator` is fractal thing, it is nessesary to define a compatible argument order for `_.reduce2` and its functor operand, as they get melted together to form a generic self-similar routine of a higher order. And that becames kinda "Yodish" when applied to familiar `_.reduce`. See how they dont match:

```
  1. _.reduce (value, op, memo)
  2.       op (memo, value)
```
So from that perspective, argument order of the default implementation is not chosen correct, as it brings unnessesary interface distinction that leads to unforeseen problems (and bothers that old guy Occam).

## _.filter2 / _.reject2

Datatype-abstract version of filter with optional `_.map` semantics (by returning values other than `true` or `false` from predicate). So if you're looked for something like `_.filterMap` — it is here.

Generic filter behavior over any container type:

```javascript
var isFoo = _.equals ('foo')

_.filter2 (     'foo',             isFoo) //      'foo'
_.filter2 ([    'foo',    'bar' ], isFoo) //     ['foo']
_.filter2 ({ f: 'foo', b: 'bar' }, isFoo) // { f: 'foo }
```

Map behavior, if predicate returns not boolean:

```javascript
_.filter2 (['foo', 2, 3],
    function (x) { return _.isString (x) ? (x + 'bar') : false }) // ['foobar']
```

There also exists `_.reject2` which improves `_.reject` the same way.

## _.filterFilter

Filters structures of arbitrary complexity:

```javascript
_.filterFilter ({ foo: 'foo', bar: [7, 'foo', { bar: 'foo' }] }, _.not (_.equals ('foo')))
//       gives  {             bar: [7,        {            }] }
```

## _.zip2
## _.zipZip
## _.findFind

## _.values2 (x)

Datatype-abstract version of `_.values`

```javascript
_.values2 (undefined)              // []
_.values2 ('foo')                  // ['foo']
_.values2 (['foo', 'bar'])         // ['foo', 'bar']
_.values2 ({ f: 'foo', b: 'bar' }) // ['foo', 'bar']
```

## _.extend derivatives

Deep one, allowing to extend two levels deep (I'm sorry, but `_.extendExtend` which extends arbitrary deep structures is not there yet..):

```javascript
_.extend2 ({ foo:1,  bar: { qux:1 } },
           { foo:42, bar: { baz:1 } })
// gives   { foo:42, bar: { baz:1, qux:1 }
```

One with reversed argument order, for humanized narration where it makes sense (not here, but see `bindable.js` impl for example of such one):

```javascript
_.extendWith ({ foo:42, qux:1 },
              { foo:1,         bar:1 })
// gives      { foo:42, qux:1, bar: 1 }
```

Higher-order one, allows to use it as `_.map` operator, which cuts shit in typical arrays-of-objects crunching routines:

```javascript
  _.map ([{ bar:1         }, {        }], _.extendsWith ({ foo:42 }).arity1)
// gives [{ bar:1, foo:42 }, { foo:42 }]
```

## _.nonempty (obj)

Removes empty contents from any kinds of objects. If passed value is scalar and it is empty, `undefined` is returned. Should be said, **useless.js** redefines underscore's `_.isEmpty` to bring correct semantics to it (e.g. `false` and `0` should NOT be treated as empty values). In future, there should be an doc entry on that (for now, you may read `type.js` for complete info on subject).

```javascript
var obj = { blank: {}, empty: [], one: 1, none: undefined, nil: null, clear: '', zero: 0, no: false }
var arr = [{}, [], 1, undefined, null, '', 0, false]

_.nonempty (obj) // { one: 1, zero: 0, no: false })
_.nonempty (arr) // [1, 0, false])

_.nonempty (null) // undefined
_.nonempty ('')   // undefined
```

## _.cloneDeep (obj)

Performs deep copying of an object (as underscore's `_.clone` is shallow, copying no more than 1 level deep).

```javascript
var obj  = { a: [{ b: { c: 'd' } }], b: {} }
var copy = _.cloneDeep (obj) // returns unique copy all levels deep
```
## _.index (arr)

Indexes an array, returning dictionary with keys mapped to array's values.

```javascript
_.index (['foo', 'bar']) // { foo: true, bar: true }
```

## _.diff (a, b)

Given objects A and B, _.diff subtracts A's structure from B, and returns difference in terms of B. Works on structures of arbitrary complexity.

```javascript
_.diff ({ a: 1, b: 2, c: 3 },
        { a: 1, b: 3,      d: 4 })
//      {       b: 3,      d: 4 })
```

## _.undiff (A, B)

Inverse of `_.diff` (returns similarities).

```javascript
_.undiff ({ a: 1, b: 2, c: 3 },
          { a: 1, b: 3,      d: 4 })
//        { a: 1 })
```

## _.quote / _.quoteWith

Convenient utility for string wrapping.

```javascript
_.quote      ('qux')            // '"qux"'
_.quote      ('qux', '[]'),     // '[qux]'
_.quote      ('qux', '/'),      //  '/qux/'
_.quote      ('qux', '{  }'),   // '{ qux }'

_.quoteWith  ('[]', 'qux'),     // '[qux]'
```

## _.partition2

`_.partition` done right:

```javascript
_.partition2 ([ 'a', 'b', 'c',   undefined, undefined,   'd'], _.isNonempty)
//      gives [['a', 'b', 'c'], [undefined, undefined], ['d']]
```

# typeMatch.js

[Read its source for the reference](https://github.com/xpl/useless/blob/master/base/tier0/typeMatch.js), as docs are pending. Provides advanced type / pattern matching utility, allowing to match against deep structures.

# properties.js

[Source](https://github.com/xpl/useless/blob/master/base/tier0/properties.js). Implements property definition basics, which is utilized by high-level facilities like [$prototype](https://github.com/xpl/useless/wiki/$prototype) and [$component](https://github.com/xpl/useless/wiki/$component).

# stringify.js

[Source](https://github.com/xpl/useless/blob/master/base/tier0/stringify.js). Configurable object printer.

# meta-tags.js

[Source](https://github.com/xpl/useless/blob/master/base/tier0/meta-tags.js). Metaprogramming/DSL utility, allows to tag JavaScript values with meta-information, readable by definition processing tools. All custom syntax in **Useless** is built on top of that facility.

# platform.js

[Source](https://github.com/xpl/useless/blob/master/base/tier0/platform.js). Platform Abstraction Layer (bootstrap, global `Platform` object is defined later, in `OOP.js` file).

# uncaught.js

[Source](https://github.com/xpl/useless/blob/master/base/tier0/platform.js). Uncaught exception handling (abstraction layer).

# arguments.js

[Source](https://github.com/xpl/useless/blob/master/base/tier0/arguments.js). Argument count tracking module (provides hinting to several metaprogramming utilities, like property definitions utility).

# assert.js

[Source](https://github.com/xpl/useless/blob/master/base/tier0/assert.js). Unit tests bootstrap.



