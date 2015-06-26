#Tier0

Most deep layer of Useless.js code base.

##stdlib.js

A collection of most basic data processing algorithms missing / misimplemented in Underscore.js

###_.map2 (x, op)

``x  : any type``
``op : fn (value, key)``

Abstract map that can operate over any type of `x`. This is semantically correct, in contrary to standard `_.map` behavior. When implemented like this, it can be used as a basic composable building block for larger structure-independent algorithms.

Scalar value:
```
  > _.map2 ('foo', _.appends ('bar'))
  > 'foobar'
```

Arrays:
```
  > _.map2 (['foo'], _.appends ('bar'))
  > ['foobar']
```

Objects:
```    
  > _.map2 ({ foo: 'foo' }, _.appends ('bar'))
  > { foo: 'foobar' }
```

###_.mapMap (x, op)

Fractalized version of previous utility. Hence the name (map over map). Can operate over arbitrary structure, 'seeing through' it:

```
  > _.mapMap ({ foo: 7,
                bar: ['foo', {
                  bar: undefined }] }, _.typeOf))
                            
  >  { foo: 'number', 
       bar: ['string', {
          bar: 'undefined' }] }) },
```

Defined via `_.hyperOperator` - a highly abstract transformation that fractalizes ordinary algorithms, looping them through themselves, making any complex structure completely transparent for their operation. See how `_.mapMap` is defined:

```
  _.mapMap = _.hyperOperator (_.unary, _.map2)  // 'unary' says that both _.map2 and its functor take 1 argument.
```

