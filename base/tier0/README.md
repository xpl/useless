#[←](../../README.md)

#Tier0

Most deep layer of Useless.js code base.

```
!!! DOCUMENTATION UNDER CONSTRUCTION !!!
```

##stdlib.js

A collection of most basic data processing algorithms missing / misimplemented in Underscore.js (and some less important but handy things).

###_.map2 (x, op)

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

###_.mapMap (x, op)

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

###_.reduceReduce (memo, value, op)

``memo : required``
``value : any``
``op : f (memo, value)``

Initial memo **should** be provided. A note on nonstandard argument order. Because `hyperOperator` is fractal thing, it is nessesary to define a compatible argument order for `_.reduce2` and its functor operand, as they get melted together to form a generic self-similar routine of a higher order. And that becames kinda "Yodish" when applied to familiar `_.reduce`. See how they dont match:

```
  1. _.reduce (value, op, memo)
  2.       op (memo, value)
```
So from that perspective, argument order of the default implementation is not chosen correct, as it brings unnessesary interface distinction that leads to unforeseen problems (and bothers that old guy Occam).

###_.filter2 / _.reject2

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

###_.filterFilter

Filters structures of arbitrary complexity:

```javascript
/*  Returns { bar: [7, { }] }
 */
_.filterFilter ({ foo: 'foo', bar: [7, 'foo', { bar: 'foo' }] }, _.not (_.equals ('foo')))
```

###_.zip2
###_.zipZip
###_.findFind

###_.values2 (x)

Datatype-abstract version of `_.values`

```javascript
_.values2 (undefined)              // []
_.values2 ('foo')                  // ['foo']
_.values2 (['foo', 'bar'])         // ['foo', 'bar']
_.values2 ({ f: 'foo', b: 'bar' }) // ['foo', 'bar']
```

###_.tryEval (try, catch, then)

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

##function.js

Various function-centric utility.

###Arity

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

###Y combinator (for anonymous recursive functions)

For rare cases when one needs to bring self-reference to a pure functional expression, avoiding extra variable use.

```javascript
  _.Y (function (self) {             // returns a function that counts to 5
      return function (n) {
          return n >= 5 ? n : self (n + 1) } })
```

###Hyper operator

Converts regular things like map/zip to hyper versions, that traverse deep structures.

Operator argument is the thing that walks down the tree and transforms it. But its predicate gets called only on the leaves of a tree (end values). Essentially, it abstracts you from structure, making it 'transparent' for any kind of previously defined one-dimensional datatype-abstract operators like map2/filter2/zip2/reduce2/etc.

```javascript
  _.mapMap = _.hyperOperator (_.unary,  _.map2)
  _.zipZip = _.hyperOperator (_.binary, _.zip2)
```
