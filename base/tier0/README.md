#Tier0

Most deep layer of Useless.js code base.

##stdlib.js

A collection of most basic data processing algorithms missing / misimplemented in Underscore.js

###_.map2 (x, op)

``x  : any type``
``op : fn (value, key)``

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

##function.js

Various function-centric utility.

###arity

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
  _.Y (function (self) {                          // returns a function that counts to 5
      return function (n) {
          return n >= 5 ? n : self (n + 1) } })
```
