#[←](../../README.md)

Most deep layer of Useless.js code base.

```
!!! DOCUMENTATION UNDER CONSTRUCTION !!!
```

# function.js

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
``Function.flip``

Flips argument order of a function. There also exist `flip2` and `flip3` which is a shortcut to _"arity2 + flip"_ and _"arity3 + flip"_, respectively.

```javascript
var printAB = function (a, b) { console.log (a, b) }
var printBA = printAB.flip

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

Operator argument is the thing that walks down the tree and transforms it. But its predicate gets called only on the leaves of a tree (end values). Essentially, it abstracts you from structure, making it 'transparent' for any kind of previously defined one-dimensional datatype-abstract operators like `map2`/`filter2`/`zip2`/`reduce2`/`find2` etc.

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

## _.tryEval (try, catch, then)

A functional try-catch.

```javascript
/*  Safely evaluates a function
 */
var result = _.tryEval (function ()  { throw 'oh fock'; return 2 + 2 },
                        function ()  { return 'catched' },
                        function (x) { return x /* should be 'catched' */ })

/*  'Then' callback could be omited
 */
var result = _.tryEval (function ()  { throw 'oh fock'; return 2 + 2 },
                        function ()  { return 'catched' })
```
