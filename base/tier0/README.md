#Tier0

Most deep layer of Useless.js code base.

##stdlib.js

A collection of most basic data processing algorithms missing / misimplemented in Underscore.js

###map2 (x, op)

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

