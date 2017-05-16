/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 389);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_export.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , core      = __webpack_require__(/*! ./_core */ 25)
  , hide      = __webpack_require__(/*! ./_hide */ 13)
  , redefine  = __webpack_require__(/*! ./_redefine */ 14)
  , ctx       = __webpack_require__(/*! ./_ctx */ 26)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_an-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_global.js ***!
  \**************************************/
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_fails.js ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-object.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/underscore/underscore.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_wks.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(/*! ./_shared */ 63)('wks')
  , uid        = __webpack_require__(/*! ./_uid */ 41)
  , Symbol     = __webpack_require__(/*! ./_global */ 2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_descriptors.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_object-dp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 106)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 24)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-length.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 32)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 10 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 20);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 11 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_has.js ***!
  \***********************************/
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 12 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_a-function.js ***!
  \******************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 13 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_hide.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(/*! ./_object-dp */ 8)
  , createDesc = __webpack_require__(/*! ./_property-desc */ 31);
module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 14 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_redefine.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , hide      = __webpack_require__(/*! ./_hide */ 13)
  , has       = __webpack_require__(/*! ./_has */ 11)
  , SRC       = __webpack_require__(/*! ./_uid */ 41)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 25).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 15 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-html.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , defined = __webpack_require__(/*! ./_defined */ 20)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 16 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-iobject.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 51)
  , defined = __webpack_require__(/*! ./_defined */ 20);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 17 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopd.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(/*! ./_object-pie */ 52)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 31)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 16)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 24)
  , has            = __webpack_require__(/*! ./_has */ 11)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 106)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 18 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-gpo.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(/*! ./_has */ 11)
  , toObject    = __webpack_require__(/*! ./_to-object */ 10)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 82)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_cof.js ***!
  \***********************************/
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_defined.js ***!
  \***************************************/
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_strict-method.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_array-methods.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(/*! ./_ctx */ 26)
  , IObject  = __webpack_require__(/*! ./_iobject */ 51)
  , toObject = __webpack_require__(/*! ./_to-object */ 10)
  , toLength = __webpack_require__(/*! ./_to-length */ 9)
  , asc      = __webpack_require__(/*! ./_array-species-create */ 194);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-sap.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0)
  , core    = __webpack_require__(/*! ./_core */ 25)
  , fails   = __webpack_require__(/*! ./_fails */ 3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 24 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_to-primitive.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_core.js ***!
  \************************************/
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_ctx.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 12);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 27 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_metadata.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(/*! ./es6.map */ 122)
  , $export = __webpack_require__(/*! ./_export */ 0)
  , shared  = __webpack_require__(/*! ./_shared */ 63)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 125)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 28 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_typed-array.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(/*! ./_descriptors */ 7)){
  var LIBRARY             = __webpack_require__(/*! ./_library */ 34)
    , global              = __webpack_require__(/*! ./_global */ 2)
    , fails               = __webpack_require__(/*! ./_fails */ 3)
    , $export             = __webpack_require__(/*! ./_export */ 0)
    , $typed              = __webpack_require__(/*! ./_typed */ 64)
    , $buffer             = __webpack_require__(/*! ./_typed-buffer */ 89)
    , ctx                 = __webpack_require__(/*! ./_ctx */ 26)
    , anInstance          = __webpack_require__(/*! ./_an-instance */ 33)
    , propertyDesc        = __webpack_require__(/*! ./_property-desc */ 31)
    , hide                = __webpack_require__(/*! ./_hide */ 13)
    , redefineAll         = __webpack_require__(/*! ./_redefine-all */ 38)
    , toInteger           = __webpack_require__(/*! ./_to-integer */ 32)
    , toLength            = __webpack_require__(/*! ./_to-length */ 9)
    , toIndex             = __webpack_require__(/*! ./_to-index */ 40)
    , toPrimitive         = __webpack_require__(/*! ./_to-primitive */ 24)
    , has                 = __webpack_require__(/*! ./_has */ 11)
    , same                = __webpack_require__(/*! ./_same-value */ 119)
    , classof             = __webpack_require__(/*! ./_classof */ 50)
    , isObject            = __webpack_require__(/*! ./_is-object */ 4)
    , toObject            = __webpack_require__(/*! ./_to-object */ 10)
    , isArrayIter         = __webpack_require__(/*! ./_is-array-iter */ 74)
    , create              = __webpack_require__(/*! ./_object-create */ 35)
    , getPrototypeOf      = __webpack_require__(/*! ./_object-gpo */ 18)
    , gOPN                = __webpack_require__(/*! ./_object-gopn */ 36).f
    , getIterFn           = __webpack_require__(/*! ./core.get-iterator-method */ 91)
    , uid                 = __webpack_require__(/*! ./_uid */ 41)
    , wks                 = __webpack_require__(/*! ./_wks */ 6)
    , createArrayMethod   = __webpack_require__(/*! ./_array-methods */ 22)
    , createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 54)
    , speciesConstructor  = __webpack_require__(/*! ./_species-constructor */ 83)
    , ArrayIterators      = __webpack_require__(/*! ./es6.array.iterator */ 92)
    , Iterators           = __webpack_require__(/*! ./_iterators */ 45)
    , $iterDetect         = __webpack_require__(/*! ./_iter-detect */ 60)
    , setSpecies          = __webpack_require__(/*! ./_set-species */ 39)
    , arrayFill           = __webpack_require__(/*! ./_array-fill */ 67)
    , arrayCopyWithin     = __webpack_require__(/*! ./_array-copy-within */ 99)
    , $DP                 = __webpack_require__(/*! ./_object-dp */ 8)
    , $GOPD               = __webpack_require__(/*! ./_object-gopd */ 17)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 29 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 30 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_meta.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(/*! ./_uid */ 41)('meta')
  , isObject = __webpack_require__(/*! ./_is-object */ 4)
  , has      = __webpack_require__(/*! ./_has */ 11)
  , setDesc  = __webpack_require__(/*! ./_object-dp */ 8).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 31 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_property-desc.js ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 32 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-integer.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 33 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_an-instance.js ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 34 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_library.js ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 35 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-create.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , dPs         = __webpack_require__(/*! ./_object-dps */ 112)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 82)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 69)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 36 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopn.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 114)
  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 37 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-keys.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 114)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 38 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_redefine-all.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 14);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 39 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_set-species.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(/*! ./_global */ 2)
  , dP          = __webpack_require__(/*! ./_object-dp */ 8)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7)
  , SPECIES     = __webpack_require__(/*! ./_wks */ 6)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 40 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_to-index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 41 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_uid.js ***!
  \***********************************/
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 42 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/es7-object-polyfill/es7-object-polyfill.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	"use strict";

	var ownKeys = __webpack_require__(/*! reflect.ownkeys */ 94);
	var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
	var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
	var concat = Function.bind.call(Function.call, Array.prototype.concat);

	if (!Object.values) {
		Object.values = function values(O) {
			return reduce(ownKeys(O), function (v, k) {
				return concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []);
			}, []);
		};
	}

	if (!Object.entries) {
		Object.entries = function entries(O) {
			return reduce(ownKeys(O), function (e, k) {
				return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []);
			}, []);
		};
	}

	return Object;
}();

/***/ }),
/* 43 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_add-to-unscopables.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 6)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(/*! ./_hide */ 13)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 44 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_for-of.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(/*! ./_ctx */ 26)
  , call        = __webpack_require__(/*! ./_iter-call */ 108)
  , isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 74)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toLength    = __webpack_require__(/*! ./_to-length */ 9)
  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 91)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 45 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iterators.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 46 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_set-to-string-tag.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 8).f
  , has = __webpack_require__(/*! ./_has */ 11)
  , TAG = __webpack_require__(/*! ./_wks */ 6)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 47 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-trim.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , defined = __webpack_require__(/*! ./_defined */ 20)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , spaces  = __webpack_require__(/*! ./_string-ws */ 87)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 48 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 49 */,
/* 50 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_classof.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 19)
  , TAG = __webpack_require__(/*! ./_wks */ 6)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 51 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_iobject.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 52 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-pie.js ***!
  \******************************************/
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 53 */,
/* 54 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_array-includes.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 16)
  , toLength  = __webpack_require__(/*! ./_to-length */ 9)
  , toIndex   = __webpack_require__(/*! ./_to-index */ 40);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 55 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_collection.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(/*! ./_global */ 2)
  , $export           = __webpack_require__(/*! ./_export */ 0)
  , redefine          = __webpack_require__(/*! ./_redefine */ 14)
  , redefineAll       = __webpack_require__(/*! ./_redefine-all */ 38)
  , meta              = __webpack_require__(/*! ./_meta */ 30)
  , forOf             = __webpack_require__(/*! ./_for-of */ 44)
  , anInstance        = __webpack_require__(/*! ./_an-instance */ 33)
  , isObject          = __webpack_require__(/*! ./_is-object */ 4)
  , fails             = __webpack_require__(/*! ./_fails */ 3)
  , $iterDetect       = __webpack_require__(/*! ./_iter-detect */ 60)
  , setToStringTag    = __webpack_require__(/*! ./_set-to-string-tag */ 46)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 73);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 56 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_fix-re-wks.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(/*! ./_hide */ 13)
  , redefine = __webpack_require__(/*! ./_redefine */ 14)
  , fails    = __webpack_require__(/*! ./_fails */ 3)
  , defined  = __webpack_require__(/*! ./_defined */ 20)
  , wks      = __webpack_require__(/*! ./_wks */ 6);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 57 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_flags.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 58 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_invoke.js ***!
  \**************************************/
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 59 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-regexp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , cof      = __webpack_require__(/*! ./_cof */ 19)
  , MATCH    = __webpack_require__(/*! ./_wks */ 6)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 60 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-detect.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(/*! ./_wks */ 6)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 61 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_object-forced-pam.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 34)|| !__webpack_require__(/*! ./_fails */ 3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(/*! ./_global */ 2)[K];
});

/***/ }),
/* 62 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gops.js ***!
  \*******************************************/
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 63 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_shared.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 64 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_typed.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2)
  , hide   = __webpack_require__(/*! ./_hide */ 13)
  , uid    = __webpack_require__(/*! ./_uid */ 41)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_array-fill.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 10)
  , toIndex  = __webpack_require__(/*! ./_to-index */ 40)
  , toLength = __webpack_require__(/*! ./_to-length */ 9);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 68 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_create-property.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8)
  , createDesc      = __webpack_require__(/*! ./_property-desc */ 31);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 69 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_dom-create.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , document = __webpack_require__(/*! ./_global */ 2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 70 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_enum-bug-keys.js ***!
  \*********************************************/
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 71 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_fails-is-regexp.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 6)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 72 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_html.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_global */ 2).document && document.documentElement;

/***/ }),
/* 73 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_inherit-if-required.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 81).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 74 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_is-array-iter.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(/*! ./_iterators */ 45)
  , ITERATOR   = __webpack_require__(/*! ./_wks */ 6)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 75 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_is-array.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 76 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-create.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(/*! ./_object-create */ 35)
  , descriptor     = __webpack_require__(/*! ./_property-desc */ 31)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 46)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 13)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 6)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 77 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-define.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(/*! ./_library */ 34)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , redefine       = __webpack_require__(/*! ./_redefine */ 14)
  , hide           = __webpack_require__(/*! ./_hide */ 13)
  , has            = __webpack_require__(/*! ./_has */ 11)
  , Iterators      = __webpack_require__(/*! ./_iterators */ 45)
  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 76)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 46)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 18)
  , ITERATOR       = __webpack_require__(/*! ./_wks */ 6)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 78 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-expm1.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 79 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_math-sign.js ***!
  \*****************************************/
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 80 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_microtask.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 2)
  , macrotask = __webpack_require__(/*! ./_task */ 88).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 81 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_set-proto.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(/*! ./_ctx */ 26)(Function.call, __webpack_require__(/*! ./_object-gopd */ 17).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 82 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_shared-key.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 63)('keys')
  , uid    = __webpack_require__(/*! ./_uid */ 41);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 83 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_species-constructor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(/*! ./_an-object */ 1)
  , aFunction = __webpack_require__(/*! ./_a-function */ 12)
  , SPECIES   = __webpack_require__(/*! ./_wks */ 6)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 84 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-at.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 32)
  , defined   = __webpack_require__(/*! ./_defined */ 20);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 85 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_string-context.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 59)
  , defined  = __webpack_require__(/*! ./_defined */ 20);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 86 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_string-repeat.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 32)
  , defined   = __webpack_require__(/*! ./_defined */ 20);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 87 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-ws.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 88 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_task.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(/*! ./_ctx */ 26)
  , invoke             = __webpack_require__(/*! ./_invoke */ 58)
  , html               = __webpack_require__(/*! ./_html */ 72)
  , cel                = __webpack_require__(/*! ./_dom-create */ 69)
  , global             = __webpack_require__(/*! ./_global */ 2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(/*! ./_cof */ 19)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 89 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_typed-buffer.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(/*! ./_global */ 2)
  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 7)
  , LIBRARY        = __webpack_require__(/*! ./_library */ 34)
  , $typed         = __webpack_require__(/*! ./_typed */ 64)
  , hide           = __webpack_require__(/*! ./_hide */ 13)
  , redefineAll    = __webpack_require__(/*! ./_redefine-all */ 38)
  , fails          = __webpack_require__(/*! ./_fails */ 3)
  , anInstance     = __webpack_require__(/*! ./_an-instance */ 33)
  , toInteger      = __webpack_require__(/*! ./_to-integer */ 32)
  , toLength       = __webpack_require__(/*! ./_to-length */ 9)
  , gOPN           = __webpack_require__(/*! ./_object-gopn */ 36).f
  , dP             = __webpack_require__(/*! ./_object-dp */ 8).f
  , arrayFill      = __webpack_require__(/*! ./_array-fill */ 67)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 46)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 90 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_wks-define.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(/*! ./_global */ 2)
  , core           = __webpack_require__(/*! ./_core */ 25)
  , LIBRARY        = __webpack_require__(/*! ./_library */ 34)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 121)
  , defineProperty = __webpack_require__(/*! ./_object-dp */ 8).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 91 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/core.get-iterator-method.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(/*! ./_classof */ 50)
  , ITERATOR  = __webpack_require__(/*! ./_wks */ 6)('iterator')
  , Iterators = __webpack_require__(/*! ./_iterators */ 45);
module.exports = __webpack_require__(/*! ./_core */ 25).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 92 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.iterator.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 43)
  , step             = __webpack_require__(/*! ./_iter-step */ 109)
  , Iterators        = __webpack_require__(/*! ./_iterators */ 45)
  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 77)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 93 */,
/* 94 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/reflect.ownkeys/index.js ***!
  \************************************/
/***/ (function(module, exports) {

if (typeof Reflect === 'object' && typeof Reflect.ownKeys === 'function') {
  module.exports = Reflect.ownKeys;
} else if (typeof Object.getOwnPropertySymbols === 'function') {
  module.exports = function Reflect_ownKeys(o) {
    return (
      Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o))
    );
  }
} else {
  module.exports = Object.getOwnPropertyNames;
}


/***/ }),
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_a-number-value.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 99 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_array-copy-within.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 10)
  , toIndex  = __webpack_require__(/*! ./_to-index */ 40)
  , toLength = __webpack_require__(/*! ./_to-length */ 9);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 100 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_array-from-iterable.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 44);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 101 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_array-reduce.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 12)
  , toObject  = __webpack_require__(/*! ./_to-object */ 10)
  , IObject   = __webpack_require__(/*! ./_iobject */ 51)
  , toLength  = __webpack_require__(/*! ./_to-length */ 9);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 102 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_bind.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(/*! ./_a-function */ 12)
  , isObject   = __webpack_require__(/*! ./_is-object */ 4)
  , invoke     = __webpack_require__(/*! ./_invoke */ 58)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 103 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_collection-strong.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(/*! ./_object-dp */ 8).f
  , create      = __webpack_require__(/*! ./_object-create */ 35)
  , redefineAll = __webpack_require__(/*! ./_redefine-all */ 38)
  , ctx         = __webpack_require__(/*! ./_ctx */ 26)
  , anInstance  = __webpack_require__(/*! ./_an-instance */ 33)
  , defined     = __webpack_require__(/*! ./_defined */ 20)
  , forOf       = __webpack_require__(/*! ./_for-of */ 44)
  , $iterDefine = __webpack_require__(/*! ./_iter-define */ 77)
  , step        = __webpack_require__(/*! ./_iter-step */ 109)
  , setSpecies  = __webpack_require__(/*! ./_set-species */ 39)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7)
  , fastKey     = __webpack_require__(/*! ./_meta */ 30).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 104 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_collection-to-json.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 50)
  , from    = __webpack_require__(/*! ./_array-from-iterable */ 100);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 105 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_collection-weak.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(/*! ./_redefine-all */ 38)
  , getWeak           = __webpack_require__(/*! ./_meta */ 30).getWeak
  , anObject          = __webpack_require__(/*! ./_an-object */ 1)
  , isObject          = __webpack_require__(/*! ./_is-object */ 4)
  , anInstance        = __webpack_require__(/*! ./_an-instance */ 33)
  , forOf             = __webpack_require__(/*! ./_for-of */ 44)
  , createArrayMethod = __webpack_require__(/*! ./_array-methods */ 22)
  , $has              = __webpack_require__(/*! ./_has */ 11)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 106 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_ie8-dom-define.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 7) && !__webpack_require__(/*! ./_fails */ 3)(function(){
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 69)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 107 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_is-integer.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 108 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-call.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 109 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-step.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 110 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-log1p.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 111 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-assign.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(/*! ./_object-keys */ 37)
  , gOPS     = __webpack_require__(/*! ./_object-gops */ 62)
  , pIE      = __webpack_require__(/*! ./_object-pie */ 52)
  , toObject = __webpack_require__(/*! ./_to-object */ 10)
  , IObject  = __webpack_require__(/*! ./_iobject */ 51)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 112 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-dps.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(/*! ./_object-dp */ 8)
  , anObject = __webpack_require__(/*! ./_an-object */ 1)
  , getKeys  = __webpack_require__(/*! ./_object-keys */ 37);

module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 113 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-gopn-ext.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 16)
  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 36).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 114 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_object-keys-internal.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(/*! ./_has */ 11)
  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 16)
  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 54)(false)
  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 82)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 115 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-to-array.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(/*! ./_object-keys */ 37)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 16)
  , isEnum    = __webpack_require__(/*! ./_object-pie */ 52).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 116 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_own-keys.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(/*! ./_object-gopn */ 36)
  , gOPS     = __webpack_require__(/*! ./_object-gops */ 62)
  , anObject = __webpack_require__(/*! ./_an-object */ 1)
  , Reflect  = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 117 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_parse-float.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat
  , $trim       = __webpack_require__(/*! ./_string-trim */ 47).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 87) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 118 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_parse-int.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt
  , $trim     = __webpack_require__(/*! ./_string-trim */ 47).trim
  , ws        = __webpack_require__(/*! ./_string-ws */ 87)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 119 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_same-value.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 120 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_string-pad.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 9)
  , repeat   = __webpack_require__(/*! ./_string-repeat */ 86)
  , defined  = __webpack_require__(/*! ./_defined */ 20);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 121 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_wks-ext.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 6);

/***/ }),
/* 122 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.map.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 103);

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 55)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 123 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.flags.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(/*! ./_descriptors */ 7) && /./g.flags != 'g')__webpack_require__(/*! ./_object-dp */ 8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 57)
});

/***/ }),
/* 124 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.set.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 103);

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 55)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 125 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-map.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(/*! ./_array-methods */ 22)(0)
  , redefine     = __webpack_require__(/*! ./_redefine */ 14)
  , meta         = __webpack_require__(/*! ./_meta */ 30)
  , assign       = __webpack_require__(/*! ./_object-assign */ 111)
  , weak         = __webpack_require__(/*! ./_collection-weak */ 105)
  , isObject     = __webpack_require__(/*! ./_is-object */ 4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 55)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./useless.client.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var $global = typeof window === 'undefined' ? global : window;

$global.$uselessFile = 'useless.client.js';

$global._ = module.exports = __webpack_require__(/*! ./base/3rd/underscore-fix */ 149); // latest underscore from GitHub, fixes strict-mode issue

/*  Tests stub
 */
_.tests = {};
_.deferTest = _.withTest = function (name, test, subj) {
    subj();
};

/*  Polyfills   */

__webpack_require__(/*! babel-polyfill */ 191);

__webpack_require__(/*! es6-object-assign */ 375).polyfill();

/*  Internal dependencies
    ======================================================================== */

__webpack_require__(/*! ./base/tier0/platform */ 175); // platform abstraction layer
__webpack_require__(/*! ./base/tier0/meta-tags */ 174); // metaprogramming utility
__webpack_require__(/*! ./base/tier0/arguments */ 170); // argument count tracking utility (to streamline metaprogramming utilities)
__webpack_require__(/*! ./base/tier0/function */ 173); // function-centric utilities
__webpack_require__(/*! ./base/tier0/busybox */ 172); // a vocabulary for functional expressions that process real stuff
__webpack_require__(/*! ./base/tier0/type */ 178); // type system extensions
__webpack_require__(/*! ./base/tier0/stdlib */ 177); // consider it as underscore 2.0
__webpack_require__(/*! ./base/tier0/properties */ 176); // properties 2.0
__webpack_require__(/*! ./base/tier0/typeMatch */ 179); // advanced type system extensions

__webpack_require__(/*! ./base/CPS */ 150);

__webpack_require__(/*! ./base/infix/extensionMethods */ 165); // bootstrap
__webpack_require__(/*! ./base/infix/Function */ 163); // extends Function
__webpack_require__(/*! ./base/infix/Array */ 162); // extends Array
__webpack_require__(/*! ./base/infix/String */ 164); // extends String

__webpack_require__(/*! ./base/dynamic/bindable */ 159); // for ad-hoc dependency injection in any object's method
__webpack_require__(/*! ./base/dynamic/stream */ 160); // a generalization of Event (multicast model for function calls)

__webpack_require__(/*! ./base/OOP */ 152);

__webpack_require__(/*! ./base/math */ 167); // clumsy math utils
__webpack_require__(/*! ./base/Parse */ 153); // clumsy parsing utils
__webpack_require__(/*! ./base/Sort */ 155); // (this one is normal)


/*  Otherwise basic utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./base/concurrency */ 158); // concurrency utility
__webpack_require__(/*! ./base/component */ 157); // component model
//require ('./base/Rx')              // regular expressions helper


/*  Experimental stuff
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./base/Promise+ */ 154);
__webpack_require__(/*! ./base/Channel */ 151);

/*  Networking
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./base/http */ 161);

/*  Browser-related code
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./client/node+ */ 187);
__webpack_require__(/*! ./client/DOMReference */ 182);
__webpack_require__(/*! ./client/anim */ 185);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/webpack/buildin/global.js */ 29)))

/***/ }),
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ../meta-fields/meta-fields.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*  ------------------------------------------------------------------------ */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var O = Object;

/*  ------------------------------------------------------------------------ */

var pickFields = function pickFields(obj, predicate) {

    var result = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.getOwnPropertyNames(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            var v = obj[k];
            if (predicate(k, v)) {
                result[k] = v;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return result;
};

/*  ------------------------------------------------------------------------ */

var Meta = function () {
    function Meta(x) {
        _classCallCheck(this, Meta);

        this.assign(x);
    }

    _createClass(Meta, [{
        key: 'assign',
        value: function assign(x) {

            if ('wrapped' in x) {
                this.wrapped = x.wrapped;
            }

            this.__meta__ = x.__meta__ || {};

            return this;
        }
    }, {
        key: Symbol.for('String.ify'),
        value: function value(stringify) {

            if (stringify.json) {

                return stringify(this.wrapped);
            }

            var left = '';
            var numMeta = 0;

            for (var tag in this.__meta__) {

                var name = '$' + tag;
                var value = this.__meta__[tag];

                left = typeof value === 'boolean' ? name + ' (' + left : name + ' (' + stringify.configure({ pretty: false })(value) + ', ' + left;

                numMeta++;
            }

            var bullet = __webpack_require__(/*! string.bullet */ 145);

            return bullet(left, stringify(this.wrapped)) + ')'.repeat(numMeta);
        }
    }]);

    return Meta;
}();

/*  ------------------------------------------------------------------------ */

module.exports = O.assign(Meta, {

    new: function _new(x) {
        return new Meta(x);
    },

    coerce: function coerce(x) {
        return Meta.is(x) ? x : Meta.new(arguments.length > 0 ? { wrapped: x } : {});
    },

    assign: function assign(x, fields) {
        return Meta.new(Meta.is(x) ? x : { wrapped: x }).assign(fields);
    },

    is: function is(x) {
        return x && x['__meta__'] !== undefined || false;
    },

    hasValue: function hasValue(x) {
        return 'wrapped' in Meta.coerce(x);
    },

    unwrap: function unwrap(x) {
        return Meta.coerce(x).wrapped;
    },

    hasTag: function hasTag(obj, tag) {
        return Meta.is(obj) && tag in obj.__meta__;
    },

    readTag: function readTag(obj, tag) {
        return Meta.is(obj) ? obj.__meta__[tag] : undefined;
    },

    tags: function tags(x) {
        return Meta.coerce(x).__meta__;
    },

    eachTag: function eachTag(x, fn) {
        var tags = Meta.tags(x);
        for (var i in tags) {
            fn(i, tags[i]);
        }
    },

    replaceTags: function replaceTags(x, tags) {
        return Meta.assign(x, { __meta__: tags });
    },

    setTags: function setTags(x, tags) {
        return Meta.replaceTags(x, O.assign({}, Meta.tags(x), tags));
    },

    setTag: function setTag(name, data) {
        for (var _len = arguments.length, toWhat = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            toWhat[_key - 2] = arguments[_key];
        }

        return Meta.setTags(Meta.coerce.apply(Meta, toWhat), _defineProperty({}, name, data));
    },

    merge: function merge(a, b) {
        return Meta.is(a) || Meta.is(b) ? Meta.replaceTags(b, O.assign({}, Meta.tags(a), Meta.tags(b))) : b;
    },

    omitTags: function omitTags(x) {

        if (!Meta.is(x)) {
            return x;
        }

        for (var _len2 = arguments.length, names = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            names[_key2 - 1] = arguments[_key2];
        }

        var $names = new Set(names);

        return Meta.replaceTags(x, pickFields(x.__meta__, function (k) {
            return !$names.has(k);
        }));
    },


    modify: function modify(x, fn) {
        return Meta.merge(x, fn(Meta.unwrap(x)));
    },

    tag: function tag(k, impl) {

        var defaultImpl = function defaultImpl() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return args.length < 2 ? Meta.setTag.apply(Meta, [k, true].concat(args)) // $tag (value)
            : Meta.setTag.apply(Meta, [k].concat(args));
        }; // $tag (data, value)

        return O.assign(typeof impl === 'function' ? impl.bind(null, k) : defaultImpl, {

            tagName: k,
            read: function read(x) {
                return Meta.readTag(x, k);
            },
            is: function is(x) {
                return Meta.hasTag(x, k);
            },
            isNot: function isNot(x) {
                return !Meta.hasTag(x, k);
            }
        });
    },

    globalTag: function globalTag(name) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
        }

        var isBrowser = typeof window !== 'undefined' && window.window === window && window.navigator,
            globalNamespace = isBrowser ? window : global;

        return globalNamespace['$' + name] || (globalNamespace['$' + name] = Meta.tag.apply(Meta, [name].concat(args)));
    }
});

/*  ------------------------------------------------------------------------ */
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../useless/~/webpack/buildin/global.js */ 29)))

/***/ }),
/* 145 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ../meta-fields/~/string.bullet/string.bullet.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bullet, arg) {

    var isArray = Array.isArray(arg);

    var lines = isArray ? arg : arg.split('\n');

    var indent = bullet.replace(/[^\s]/g, ' '); // replace non-whitespace with whitespace
    lines = lines.map(function (line, i) {
        return i === 0 ? bullet + line : indent + line;
    });

    return isArray ? lines : lines.join('\n');
};

/***/ }),
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./base/3rd/underscore-fix.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = module.exports = __webpack_require__(/*! underscore */ 5);

_.fromPairs = _.object; // was trying to migrate to lodash, but had no luck, these ones had left as an migration artifact...
_.mapValues = _.mapObject;

_.zipWith = function (rows, zippo) {
    return _.reduce(rows.slice(1), function (memo, row) {
        return _.times(Math.max(memo && memo.length || 0, row && row.length || 0), function (i) {
            return zippo(memo && memo[i], row && row[i]);
        });
    }, rows[0]);
};

if ('a1 b2 c3' !== _.zipWith([['a', 'b', 'c'], [1, 2, 3]], function (a, b) {
    return a + b;
}).join(' ')) {
    throw new Error('_.zipWith broken');
}

/***/ }),
/* 150 */
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** ./base/CPS.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  CPS primitives module
    ======================================================================== */

_.cps = function () {
    return _.cps.sequence.apply(null, arguments);
};

/*  apply
    ======================================================================== */

_.withTest(['cps', 'apply'], function () {

    // TODO

}, function () {

    _.cps.apply = function (fn, this_, args_, then) {
        var args = _.asArray(args_);

        var lastArgN = _.numArgs(fn) - 1;
        var thenArg = args[lastArgN];

        args[lastArgN] = function () {
            then.call(this, arguments, thenArg);
        };

        return fn.apply(this_, args);
    };
});

/*  each
    ======================================================================== */

_.withTest(['cps', 'each'], function () {

    /*  Example array
     */
    var data = ['foo', 'bar', 'baz'];
    var currentIndex = 0;

    _.cps.each(data,

    /*  called for each item, in linear order
     */
    function (item, itemIndex, then, complete, arrayWeTraverse) {
        $assert(item === data[itemIndex]);
        $assert(itemIndex === currentIndex++);
        $assert(arrayWeTraverse === data);

        $assert(_.isFunction(then));
        $assert(_.isFunction(complete));

        then();
    },

    /*  called when all items enumerated
     */
    function () {
        $assert(currentIndex === data.length);
    });

    /*  You can omit 'index' argument for iterator function
     */
    var data2 = [];
    _.cps.each(data, function (item, then) {
        data2.push(item);then();
    }, function () {
        $assert(data, data2);
    });

    /*  You can stop iteration by calling fourth argument
     */
    var data3 = [];
    _.cps.each(data, function (item, i, then, break_) {
        data3.push(item);break_();
    }, function () {
        $assert(data3, ['foo']);
    });

    /*  Iterating over dictionary is legal
     */
    $assertEveryCalled(function (items__3, final__1) {
        var data2 = { 'foo': 1, 'bar': 2, 'baz': 3 };
        _.cps.each(data2, function (item, name, then) {
            $assert(item === data2[name]);items__3();then();
        }, function () {
            final__1();
        });
    });

    /*  Iterating over scalar is legal
     */
    $assertEveryCalled(function (items__1, final__1) {
        _.cps.each('foo', function (item, name, then) {
            $assert([item, name], ['foo', undefined]);items__1();then();
        }, function () {
            final__1();
        });
    });

    /*  Undefined/null are treated as empty (not scalars)
     */
    $assertEveryCalled(function (final__1) {
        _.cps.each(undefined, function () {
            $fail;
        }, function () {
            final__1();
        });
    });
}, function () {
    _.extend(_.cps, {

        each: function each(obj, elem_, complete_, index_, length_, keys_) {

            var complete = complete_ || _.noop;
            var elem = function elem(x, k, next) {
                if (_.numArgs(elem_) === 2) {
                    elem_(x, next, complete, obj);
                } else {
                    elem_(x, k, next, complete, obj);
                }
            };

            if (_.isEmpty(obj)) {
                complete();
            } else if (_.isScalar(obj)) {
                elem(obj, undefined, complete);
            } else {

                var index = index_ || 0;
                var keys = index === 0 ? obj.length === undefined ? _.keys(obj) : undefined : keys_;
                var length = index === 0 ? keys ? keys.length : obj.length : length_;

                if (index >= (length || 0)) {
                    complete();
                } else {
                    var key = keys ? keys[index] : index;

                    elem(obj[key], key, each.bind(this, obj, elem_, complete_, index + 1, length, keys));
                }
            }
        } });
});

/*  map
    ======================================================================== */

_.withTest(['cps', 'map'], function () {

    /*  2-argument iterator semantics
     */
    _.cps.map([7, 6, 5], function (x, then) {
        then(x + 1);
    }, function (result) {
        $assert(result, [8, 7, 6]);
    });

    /*  3-argument iterator semantics
     */
    _.cps.map([7, 6, 5], function (x, i, then) {
        then(x + 1);
    }, function (result) {
        $assert(result, [8, 7, 6]);
    });
}, function () {
    _.extend(_.cps, {

        map: function map(obj, iter, complete) {
            var result = _.isArray(obj) ? [] : {};
            _.cps.each(obj, _.numArgs(iter) == 2 ? function (x, i, next) {
                iter(x, function (y) {
                    result[i] = y;next();
                });
            } : function (x, i, next) {
                iter(x, i, function (y) {
                    result[i] = y;next();
                });
            }, function () {
                complete(result);
            });
        } });
});

/*  find
    ======================================================================== */

_.withTest(['cps', 'find'], function () {

    /*  Basic use
     */
    _.cps.find([7, 6, 5], function (x, then) {
        then(x % 3 === 0);
    }, function (x, key) {
        $assert([x, key], [6, 1]);
    });

    /*  Over dictionary
     */
    _.cps.find({ foo: 7, bar: 6, baz: 5 }, function (x, key, then) {
        then(key === 'baz');
    }, function (x, key) {
        $assert([x, key], [5, 'baz']);
    });

    /*  Returning non-boolean
     */
    _.cps.find([7, 6, 5], function (x, then) {
        then(x % 3 === 0 ? 'yeah' : false);
    }, function (x, key) {
        $assert([x, key], ['yeah', 1]);
    });

    /*  Not found
     */
    _.cps.find([7, 6, 5], function (x, key, then) {
        then(false);
    }, function (x) {
        $assert(x, undefined);
    });
}, function () {
    _.extend(_.cps, {

        find: function find(obj, pred, complete) {
            var passKey = _.numArgs(pred) !== 2;

            _.cps.each(obj, function (x, key, next, complete) {
                var take = function take(match) {
                    if (match === false) {
                        next();
                    } else {
                        complete(match === true ? x : match, key);
                    }
                };
                if (passKey) {
                    pred(x, key, take);
                } else {
                    pred(x, take);
                }
            }, complete);
        } });
});

/*  memoize
    ======================================================================== */

_.withTest(['cps', 'memoize'], function () {

    $assertEveryCalledOnce(function (noMoreThanOne) {
        var plusOne = _.cps.memoize(function (x, then) {
            noMoreThanOne();then(x + 1);
        });

        plusOne(2, function (x) {
            $assert(x === 3);
        });
        plusOne(2, function (x) {
            $assert(x === 3);
        });
    });
}, function () {
    _.extend(_.cps, {

        memoize: function memoize(fn) {
            return _.barrier ? _.cps._betterMemoize(fn) : _.cps._poorMemoize(fn);
        },

        /*  This simplified version is used to bootstrap Useless.js code base (where _.barrier not available)
         */
        _poorMemoize: function _poorMemoize(fn) {
            var cache = {};
            return function (value, then) {
                if (value in cache) {
                    //  there's a flaw: cache updates after fetch completes, so while fetch is running,
                    then(cache[value]);
                } //  any subsequent call (until cache is ready) will trigger fetch (as it doesnt know that result is already fetching)
                else {
                        fn.call(this, value, function (result) {
                            then(cache[value] = result);
                        });
                    }
            };
        },

        /*  UPD: added support for 0-arity semantics
         */
        _betterMemoize: function _betterMemoize(fn) {
            var cache = {}; // barrier-enabled impl, eliminates redundant fetches
            // in this version, any subsequent calls join at barrier (which opens when result is fetched)
            switch (_.numArgs(fn)) {
                case 1:
                    return function (then) {
                        if (!cache.already) {
                            fn.call(this, cache = _.barrier());
                        }
                        cache(then);
                    };
                case 2:
                    cache = {};
                    return function (value, then) {
                        if (!(value in cache)) {
                            fn.call(this, value, cache[value] = _.barrier());
                        }
                        cache[value](then);
                    };
                default:
                    throw new Error('_.cps.memoize: unsupported number of arguments');}
        } });
});

/*  reduce
    ======================================================================== */

_.withTest(['cps', 'reduce'], function () {
    $assertEveryCalled(function (mkay__2) {

        var input = [1, 2, 3];
        var sums = function sums(a, b, then) {
            then(a + b);
        };
        var check = function check(result) {
            $assert(result === 6);mkay__2();
        };

        _.cps.reduce(input, sums, check);
        _.cps.reduce([], sums, check, 6);
    });
}, function () {

    var reduce = function reduce(array, op, then, memo, index) {
        // internal impl
        if (!array || index >= (array.length || 0)) {
            then(memo);
        } else {
            op(memo, array[index], function (result) {
                reduce(array, op, then, result, index + 1);
            });
        }
    };

    _.cps.reduce = function (array, op, then, memo) {
        // public API
        if (arguments.length < 4) {
            reduce(array, op, then, array[0], 1);
        } else {
            reduce(array, op, then, memo, 0);
        }
    };
});

/*  noop / identity / constant
    ======================================================================== */

_.withTest(['cps', 'noop, identity, constant'], function () {
    $assertEveryCalled(function (noop, identity, const1, const2) {

        /*  Port of underscore's _.noop to CPS terms
         */
        _.cps.noop(1, 2, 3, function () {
            $assert(arguments.length === 0);noop();
        });

        /*  Port of underscore's _.identity to CPS terms
         */
        _.cps.identity(1, 2, 3, function () {
            $assert([1, 2, 3], _.asArray(arguments));identity();
        });

        /*  Port of underscore's _.constant to CPS terms
         */
        _.cps.constant(3)(function (_3) {
            $assert(_3 === 3);const1();
        });
        _.cps.constant(1, 2)(function (_1, _2) {
            $assert(_1 === 1);$assert(_2 === 2);const2();
        });
    });
}, function () {
    _.extend(_.cps, {

        noop: $restArg(function () {
            return _.last(arguments).call(this);
        }),

        identity: $restArg(function () {
            var args = _.initial(arguments),
                then = _.last(arguments);
            if (then) {
                return then.apply(this, args);
            }
        }),

        constant: $restArg(function () {
            var args = arguments;
            return function () {
                return _.last(arguments).apply(this, args);
            };
        }) });
});

/*  arity
    ======================================================================== */

_.deferTest(['cps', 'arity / resultArity'], function () {

    var returnMyArgs = _.cps.identity;

    var put123 = function put123(fn) {
        return _.partial(fn, 1, 2, 3);
    };

    $assertCPS(put123(returnMyArgs), [1, 2, 3]);
    $assertCPS(put123(_.cps.arity2(returnMyArgs)), [1, 2]);
    $assertCPS(put123(_.cps.arity1(returnMyArgs)), [1]);
    $assertCPS(put123(_.cps.arity0(returnMyArgs)));

    var return123 = function return123(then) {
        then(1, 2, 3);
    };

    $assertCPS(return123, [1, 2, 3]);
    $assertCPS(_.cps.resultArity2(return123), [1, 2]);
    $assertCPS(_.cps.resultArity1(return123), [1]);
    $assertCPS(_.cps.resultArity0(return123));
}, function () {

    _.cps.arity0 = function (fn) {
        return function () {
            fn.call(this, _.last(arguments));
        };
    };

    _.cps.arity1 = function (fn) {
        return function () {
            fn.call(this, arguments[0], _.last(arguments));
        };
    };

    _.cps.arity2 = function (fn) {
        return function () {
            fn.call(this, arguments[0], arguments[1], _.last(arguments));
        };
    };

    _.cps.transformResult = function (operator, fn) {
        return function (args) {
            fn.apply(this, _.initial(arguments).concat(operator(_.last(arguments))));
        };
    };

    _.cps.resultArity2 = _.partial(_.cps.transformResult, _.arity2);
    _.cps.resultArity1 = _.partial(_.cps.transformResult, _.arity1);
    _.cps.resultArity0 = _.partial(_.cps.transformResult, _.arity0);
});

/*  sequence / compose
    ======================================================================== */

_.withTest(['cps', 'sequence / compose'], function () {
    $assertEveryCalled(function (mkay__4) {

        /*  Basic example of asynchronous functions sequencing
         */
        var makeCookies = function makeCookies(whatCookies, then) {
            then('cookies ' + whatCookies);
        };
        var eatCookies = function eatCookies(cookies, then) {
            then('nice ' + cookies);
        };
        var check = function check(result) {
            $assert(result, 'nice cookies from shit');mkay__4();
        };

        _.cps.sequence(makeCookies, eatCookies, check)('from shit'); // supports both ways (either argument list...
        _.cps.sequence([makeCookies, eatCookies, check])('from shit'); // ..or array

        _.cps(makeCookies, eatCookies, check)('from shit'); // shorthand macro

        /*  A port of underscore's _.compose (simply flipped _.sequence)
         */
        _.cps.compose(check, eatCookies, makeCookies)('from shit');
    });
}, function () {

    _.cps.sequence = $restArg(function (arr) {
        var functions = _.isArray(arr) && arr || _.asArray(arguments);
        return _.reduceRight(functions, function (a, b) {
            return function () {
                return b.apply(this, _.asArray(arguments).concat(a));
            };
        }, _.cps.identity);
    });

    _.cps.compose = $restArg(function (arr) {
        var functions = _.isArray(arr) && arr || _.asArray(arguments);
        return _.cps.sequence(functions.slice().reverse());
    });
});

/*  _.cps.sequence with error handling (kind of a simplified Promise)
    ======================================================================== */

_.deferTest(['cps', 'trySequence'], function () {

    var testErr = new Error();

    /*  No error
     */
    $assertEveryCalledOnce(function (mkay) {
        _.cps.trySequence([_.cps.constant('foo'), _.appends('bar').asContinuation], function (result) {
            $assert(result, 'foobar');mkay();
        });
    });

    /*  Throwing error
     */
    $assertEveryCalledOnce(function (mkay) {
        _.cps.trySequence([function () {
            throw testErr;
        }, function () {
            $fail;
        }], function (result) {
            $assert(result === testErr);mkay();
        });
    });

    /*  Returning error to continuation
     */
    $assertEveryCalledOnce(function (mkay) {
        _.cps.trySequence([function (then) {
            then(testErr);
        }, function () {
            $fail;
        }], function (result) {
            $assert(result === testErr);mkay();
        });
    });

    /*  Reading error in separate callback
     */
    $assertEveryCalledOnce(function (mkay) {
        _.cps.trySequence([function (then) {
            then(testErr);
        }, function () {
            $fail;
        }], function (result) {
            $fail;
        }, function (err) {
            $assert(err === testErr);mkay();
        });
    });
}, function () {

    _.cps.trySequence = function (functions, then, err) {
        _.reduceRight(functions, function (a, b) {
            return function (e) {
                if (_.isTypeOf(Error, e)) {
                    return (err || then)(e);
                } else {
                    try {
                        return b.apply(this, _.asArray(arguments).concat(a));
                    } catch (e) {
                        return (err || then)(e);
                    }
                }
            };
        }, then)();
    };
});

/***/ }),
/* 151 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./base/Channel.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  ------------------------------------------------------------------------ */

_.tests['Channel'] = {

    'is promise': function isPromise() {

        $assert(new Channel() instanceof Promise);
    },

    'resolve from constructor + then + chanining': function resolveFromConstructorThenChanining(done) {

        new Channel(function (resolve) {
            resolve(123);
        }).then(function (x) {
            $assert(x, 123);return 456;
        }, function () {
            $fail;
        }).then(function (y) {
            $assert(y, 456);done();
        });
    },

    'reject from constructor': function rejectFromConstructor(done) {

        new Channel(function (resolve, reject) {
            reject(123);
        }).then(function () {
            $fail;
        }, function (x) {
            $assert(x, 123);done();
        });
    },

    'throw from constructor + .catch + chanining': function throwFromConstructorCatchChanining(done) {

        new Channel(function (resolve, reject) {
            throw 'foo';
        }).then(function () {
            $fail;
        }).catch(function (x) {
            $assert(x, 'foo');return 'bar';
        }).then(function (y) {
            $assert(y, 'bar');done();
        }, function () {
            $fail;
        });
    },

    'throw from .then': function throwFromThen(done) {

        new Channel(123).then(function (x) {
            throw x + 1;
        }).catch(function (x) {
            $assert(x, 124);done();
        });
    },

    'pending state': function pendingState() {
        $assert('pending', new Channel().then(function () {
            return $fail;
        }).state);
    },

    'new Channel (const)': function newChannelConst() {
        return new Channel(123).assert(123);
    },

    'recognized by tests as Promise': function recognizedByTestsAsPromise() {
        return Channel.resolve(123).assert(123);
    },

    'accepted by Promise.all': function acceptedByPromiseAll() {
        return Promise.all([Channel.resolve(123).assert(123), Channel.reject(456).assertRejected(456)]).assert([123, 456]);
    },

    'returning channel from then + .resolve': function returningChannelFromThenResolve() {

        var x = Channel.resolve(123),
            y = undefined,
            calls = [];

        x.then(function () {
            return y = new Channel(456);
        }).then(function (x) {
            return calls.push(x);
        }); // should call twice, with 456 and 789 (later)

        y.resolve(789);

        $assert(calls, [456, 789]);
    },

    '$channel for $prototype': function $channelFor$prototype() {

        var Model = $prototype({

            numPersons: $channel()
        });

        var View = $prototype({

            label: $channel()
        });

        /*  $channel tag creates a readwrite property with same name,
            but it should keep $channel tag in meta-information (for reflection purposes)   */

        $assert($channel.is(Model.$definition.numPersons));

        /*  Should be configurable from constructor params  */

        var model = new Model({ numPersons: 10 }),
            view = new View();

        $assert(model.numPersons.value, 10);
        $assert(view.label.state, 'pending');

        /*  This is not a simple by-reference assignment, but a channel binding   */

        view.label = model.numPersons.then(function (x) {
            return x + ' persons';
        });

        $assert(view.label !== model.numPersons);
        $assert(view.label.value, '10 persons');

        /*  Assignment to a non-promise should update value    */

        model.numPersons = 11;

        $assert(view.label.value, '11 persons');
    },

    '$channel(const)': function $channelConst() {

        $assert($singleton({ count: $channel(7) }).count.value, 7);
    },

    'resolve/reject returns this': function resolveRejectReturnsThis() {

        $assert(Channel.resolve(123).resolve(555).resolve(666).value, 666);
    }

};

/*  ------------------------------------------------------------------------ */

$global.Channel = $extends(Promise, {

    constructor: function constructor(fn, transducers, before) {

        this.after = [];
        this.state = 'pending';
        this.value = undefined;
        this.transducers = {
            resolve: transducers && transducers.resolve || function (x) {
                return x;
            },
            reject: transducers && transducers.reject || function (e) {
                throw e;
            } };

        if (fn instanceof Function) {
            try {
                fn.call(this, this.$(this.resolve), this.$(this.reject));
            } catch (e) {
                this.reject(e);
            }
        } else if (fn !== undefined) {
            this.resolve(fn);
        }
    },

    _resolve: function _resolve(x) {
        this.state = 'resolved';
        this.value = x;
        this.after.forEach(function (c) {
            return c.resolve(x);
        });
    },

    _reject: function _reject(e) {
        this.state = 'rejected';
        this.value = e;
        this.after.forEach(function (c) {
            return c.reject(e);
        });
    },

    resolve: function resolve(x, transducer) {
        var _this = this;

        try {
            x = (transducer || this.transducers.resolve)(x);

            if (x instanceof Promise) {
                x.then(function (x) {
                    return _this._resolve(x);
                }, function (e) {
                    return _this._reject(e);
                });
            } else {
                this._resolve(x);
            }
        } catch (e) {
            this._reject(e);
        }

        return this;
    },

    reject: function reject(e) {
        return this.resolve(e, this.transducers.reject);
    },

    then: function then(resolve, reject) {

        var c = new Channel(undefined, { resolve: resolve, reject: reject }, this);

        this.after.push(c);

        if (this.state === 'resolved') {
            c.resolve(this.value);
        } else if (this.state === 'rejected') {
            c.reject(this.value);
        }

        return c;
    },

    catch: function _catch(fn) {

        return this.then(undefined, fn);
    }
});

/*  ------------------------------------------------------------------------ */

Channel.all = function (arr) {
    return new Channel(function (resolve) {

        var complete = new Set(),
            value = new Array(arr.length);

        arr.forEach(function (c, i) {

            c.then(function (x) {
                value[i] = x;

                if (complete.length === value.length) {
                    resolve(value);
                } else {
                    complete.add(i);
                }
            });
        });
    });
};

/*  ------------------------------------------------------------------------ */

Channel.resolve = function (x) {
    return new Channel(function (resolve) {
        return resolve(x);
    });
};
Channel.reject = function (e) {
    return new Channel(function (resolve, reject) {
        return reject(e);
    });
};

/*  ------------------------------------------------------------------------ */

$prototype.macroTag('channel', function (def, value, name) {

    var memberName = '_' + name;
    var initialValue = $untag(value);

    def[name] = Meta.modify(value, function () {
        return $property({

            get: function get() {
                return this[memberName] || (this[memberName] = new Channel(initialValue));
            },

            set: function set(x) {
                this[name].resolve(x);
            }
        });
    });
});

/*  ------------------------------------------------------------------------ */

/***/ }),
/* 152 */
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** ./base/OOP.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(/*! underscore */ 5);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Hot-wires some common C++/Java/C# ways to OOP with JavaScript's ones.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

_.hasOOP = true;

_.withTest('OOP', {

    '$prototype / $extends': function $prototype$extends() {

        /*  Prototypes are defined via $prototype
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Foo = $prototype({

            /*  If constructor is not defined (like here), it's default impl. will equal
                to the following:                                                               */

            //          constructor: function (cfg) { _.extend (this, cfg) },

            /*  $static is used to designate type-level members (context-free ones),
                effectively porting that shit from C++/C#/Java world.                           */

            method: function method() {
                return 'foo.method';
            },
            staticMethod: $static(function () {
                return 'Foo.staticMethod';
            }),

            /*  $property is used to tag a value as an property definition.
                Property definitions expand itself within properties.js module, which
                is separate from OOP.js                                                         */

            property: $property(function () {
                return 'foo.property';
            }),
            staticProperty: $static($property(function () {
                return 'Foo.staticProperty';
            })),

            /*  Tags on members can be grouped like this, to reduce clutter if you have lots
                of members tagged with same tag.                                                */

            $static: {
                $property: {
                    one: 1,
                    two: 2,
                    three: 3 } },

            /*  Demonstrates some semantics of property definitions, provided by properties.js
                See that module for further investigation.                                      */

            $property: {
                static42: $static(42),
                just42: 42,
                just42_too: function just42_too() {
                    return 42;
                },
                fullBlown: {
                    enumerable: false, // will be visible as object's own property (defaults to true)
                    configurable: true, // can be deleted by delete operator (defaults to false)
                    get: function get() {
                        return 42;
                    },
                    set: function set(x) {
                        $stub;
                    } } } });

        /*  Inherited prototypes are defined via $extends
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Bar = $extends(Foo, $final({

            /*  If constructor is not defined (like here), it's default impl.
                will be equal to the following one (calls base constructor):     */

            //          constructor: function () { Foo.prototype.constructor.apply (this, arguments)) } 

            staticMethod: $static(function () {
                return 'Bar.staticMethod';
            }),

            method: function method() {
                return 'bar.method';
            } }));

        /*  Instances of $prototype/$extends are created by the 'new' operator, as
            this pair of utility is just a thin wrapper over native JS prototypes.
             The 'new' operator calls 'constructor' member from a prototype
            definition. If no constructor is specified, default one takes first
            argument and extends constructed instance with it, overriding any member
            value that is specified at prototype definition (and this is a
            really common way to define prototype constructors in JavaScript)
             Such semantics could be treated as somewhat similar to the 'anonymous
            classes' feature in Java, which is a useful mechanism for ad-hoc
            specialization of constructed prototypes.   
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var foo = new Foo();
        var fuu = new Foo({ method: function method() {
                return 'fuu.method';
            } });
        var bar = new Bar({ hi: 'there' });

        $assert(bar.hi === 'there');
        $assert(fuu.method() === 'fuu.method');

        $assert([foo.just42, bar.just42], [42, 42]); //  inheritance should work
        $assert([Foo.static42, Bar.static42], [42, undefined]); //  (static members do not inherit)

        /*  Overriding should work
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert([foo.method(), bar.method()], ['foo.method', 'bar.method']);
        $assert([Foo.staticMethod(), Bar.staticMethod()], ['Foo.staticMethod', 'Bar.staticMethod']);

        /*  Regular members shouln't be visible at type level
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert([foo.property, foo.staticProperty], ['foo.property', undefined]);
        $assert([Foo.staticProperty, Foo.property], ['Foo.staticProperty', undefined]);

        /*  Until explicitly stated otherwise, properties are constant.
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows(function () {
            foo.just42 = 43;
        }, _.matches({ message: 'cannot change just42 (as it\'s sealed to 42)' }));
    },

    /*  Use $final to tag a thing as non-overrideable (comes from Java)
        ======================================================================== */

    '$final': function (_$final) {
        function $final() {
            return _$final.apply(this, arguments);
        }

        $final.toString = function () {
            return _$final.toString();
        };

        return $final;
    }(function () {

        /*  Tagging arbitrary member as $final
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows(function () {

            var A = $prototype({
                constructor: $final(function () {}) });

            var B = $extends(A, {
                constructor: function constructor() {} });
        }, // will throw Error

        _.matches({ message: 'Cannot override $final constructor' }));

        /*  Tagging whole prototype as $final
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assertThrows(function () {

            var A = $prototype($final({}));
            var B = $extends(A);
        }, // will throw Error

        _.matches({ message: 'Cannot derive from $final-marked prototype' }));
    }),

    /*  Use $alias to make member aliases with correct semantics
        ======================================================================== */

    'ES6 properties comprehension': function ES6PropertiesComprehension() {

        var Foo = $prototype({

            get foo() {

                $assert(Meta.unwrap(this.constructor.$definition.foo).get instanceof Function);
                $assert(Meta.tags(this.constructor.$definition.foo), { 'property': true });

                return 42;
            },

            $static: {
                get bar() {
                    return 42;
                }
            }
        });

        $assert(Meta.unwrap(Foo.$definition.bar).get instanceof Function);
        $assert(Meta.tags(Foo.$definition.bar), { 'static': true, 'property': true });
        $assert(Foo.bar, 42);

        var foo = new Foo();
        $assert(foo.foo, 42);
    },

    /*  Use $alias to make member aliases with correct semantics
        ======================================================================== */

    '$alias': function (_$alias) {
        function $alias() {
            return _$alias.apply(this, arguments);
        }

        $alias.toString = function () {
            return _$alias.toString();
        };

        return $alias;
    }(function () {

        var foo = new ($prototype({

            error: function error() {
                return 'foo.error';
            },

            failure: $alias('error'),
            crash: $alias('error'),
            finalCrash: $final($alias('crash')) /* chaining works */ }))();

        var def = foo.constructor.$definition;

        $assert(foo.finalCrash, foo.crash, foo.failure, foo.error); // all point to same function

        $assert($final.is(def.finalCrash)); // you can add new tags to alias members
        $assertNot($final.is(def.crash)); // adding tags to alias members does not affect original members 
        $assertNot($final.is(def.error));

        /*  Ad-hoc property aliases (applicable even when there's no explicitly declared member at what alias points to)
         */
        var size = new ($prototype({
            w: $alias($property('x')),
            h: $alias($property('y')) }))();

        $assert([size.x = 42, size.y = 24], [size.w, size.h], [42, 24]);
    }),

    /*  Static (compile-time) constructor gets called at prototype generation
        ======================================================================== */

    '$constructor': function $constructor() {
        $assertEveryCalledOnce(function (mkay) {
            var foo = new ($prototype({
                $constructor: function $constructor() {
                    mkay();
                } }))();
        });
    },

    /*  Run-time type information APIs
        ======================================================================== */

    'RTTI': function RTTI() {

        var Foo = $prototype({ $static: { noop: _.noop } }),
            Bar = $extends(Foo); // empty definition argument read as {}

        var foo = new Foo(),
            bar = new Bar();

        /*  Basically, the simplest way to check a type, relying on some native JavaScript prototype semantics.
            But it does not account inheritance.
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert(foo.constructor === Foo);
        $assert(bar.constructor === Bar);

        /*  A functional crossbrowser version of 'instanceof' (accounts inheritance):
         
                1.  Boils down to native 'instanceof' where available
                2.  In elder browsers, emulates with correct semantics
         
            Why use (instead of native syntax):
            
                -   cross-browser
                -   functional (can be partial'ed to yield a predicate)
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert(_.isTypeOf(Function, foo.constructor.noop));
        $assert(_.isTypeOf(Meta, foo.constructor.$definition.noop)); // note how $static group is collapsed to normal form

        /*  Infix version (a static member of every $prototype)
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert(Foo.isTypeOf(foo));
        $assert(!Bar.isTypeOf(foo));
        $assert(Bar.isTypeOf(bar));
        $assert(Foo.isTypeOf(bar));

        /*  Another infix version (a member of every $prototype)
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        $assert(foo.isInstanceOf(Foo));
        $assert(!foo.isInstanceOf(Bar));
        $assert(bar.isInstanceOf(Bar));
        $assert(bar.isInstanceOf(Foo));
    },

    /*  This is how to decide whether a function is $prototype constructor
        ======================================================================== */

    'isConstructor': function isConstructor() {

        var Proto = $prototype(),
            // empty argument read as {}
        dummy = function dummy() {};

        $assert($prototype.isConstructor(Proto), true);
        $assert($prototype.isConstructor(dummy), false);
        $assert($prototype.isConstructor(null), false); // regression

        $assert([Proto, dummy].map($prototype.isConstructor), [true, false]);
    },

    /*  $prototype.inheritanceChain for traversing inheritance chain
        ======================================================================== */

    'inheritanceChain': function inheritanceChain() {

        var A = $prototype();
        var B = $extends(A);
        var C = $extends(B);

        $assert($prototype.inheritanceChain(C), [C, B, A]);
    },

    /*  $prototype.defines for searching for members on definition chain
        ======================================================================== */

    'defines': function defines() {

        var A = $prototype({ toString: function toString() {} });
        var B = $extends(A);
        var C = $prototype();

        $assert([$prototype.defines(B, 'toString'), $prototype.defines(C, 'toString')], [true, false]);
    },

    /*  $prototype is really same as $extends, if passed two arguments
        ======================================================================== */

    'two-argument syntax of $prototype': function twoArgumentSyntaxOf$prototype() {

        var A = $prototype();
        var B = $prototype(A, {}); // same as $extends (Base, def)

        $assert(B.$base === A.prototype);
    },

    /*  You can enumerate members grouped by tag name via $membersByTag
        ======================================================================== */

    '$membersByTag': function $membersByTag() {

        var foo = $static($property(1)),
            bar = $property(2);

        $assertMatches($prototype({ foo: foo, bar: bar }).$membersByTag, { 'static': { 'foo': foo },
            'property': { 'foo': foo, 'bar': bar } });
    },

    /*  Tags on definition render to static properties
        ======================================================================== */

    'tags on definition': function tagsOnDefinition() {

        $assertMatches($prototype($static($final({}))), { $static: true, $final: true });
    },

    /*  $mixin to extend existing types with $prototype-style definitions
        ======================================================================== */

    '$mixin': function (_$mixin) {
        function $mixin() {
            return _$mixin.apply(this, arguments);
        }

        $mixin.toString = function () {
            return _$mixin.toString();
        };

        return $mixin;
    }(function () {
        var Type = $prototype();

        $mixin(Type, {
            twentyFour: $static($property(24)),
            fourtyTwo: $property(42) });

        $assert([Type.twentyFour, new Type().fourtyTwo], [24, 42]);
    }) }, function () {

    /*  PUBLIC API
        ======================================================================== */

    _(['property', 'static', 'final', 'alias', 'memoized', 'private', 'builtin', 'hidden', 'testArguments']).each(Meta.globalTag);

    _.extend($global, {

        $prototype: function (_$prototype) {
            function $prototype(_x, _x2) {
                return _$prototype.apply(this, arguments);
            }

            $prototype.toString = function () {
                return _$prototype.toString();
            };

            return $prototype;
        }(function (arg1, arg2) {
            return $prototype.impl.compile.apply($prototype.impl, arguments.length > 1 ? _.asArray(arguments).reverse() : arguments);
        }),

        $extends: function $extends(base, def) {
            return $prototype(base, def || {});
        },

        $mixin: function $mixin(constructor, def) {
            return constructor === Array ? $prototype.impl.compileMixin({ constructor: constructor, $hidden: def }) : $prototype.impl.compileMixin(_.extend(def, { constructor: constructor }));
        }
    });

    _.extend($prototype, {

        isConstructor: function isConstructor(what) {
            return _.isPrototypeConstructor(what);
        },

        macro: function macro(arg, fn) {
            if (arguments.length === 1) {
                $prototype.impl.alwaysTriggeredMacros.push(arg);
            } else {
                $prototype.impl.memberNameTriggeredMacros[arg] = fn;
            }
        },

        macroTag: function macroTag(name, fn) {

            Meta.globalTag(name);
            $prototype.impl.tagTriggeredMacros[name] = fn;
        },

        each: function each(visitor) {
            var namespace = $global;
            for (var k in namespace) {
                if (!(k[0] === '$')) {
                    var value = namespace[k];
                    if ($prototype.isConstructor(value)) {
                        visitor(value, k);
                    }
                }
            }
        },

        defines: function defines(constructor, member) {
            return _.find($prototype.inheritanceChain(constructor), function (supa) {
                return supa.$definition && supa.$definition.hasOwnProperty(member) || false;
            }) ? true : false;
        },

        inheritanceChain: function inheritanceChain(def) {
            var chain = [];
            while (def) {
                chain.push(def);
                def = def.$base && def.$base.constructor;
            }
            return chain;
        },

        /*  INTERNALS
            ==================================================================== */

        impl: {

            alwaysTriggeredMacros: [],
            memberNameTriggeredMacros: {},
            tagTriggeredMacros: {},

            compile: function compile(def, base) {
                var impl = base && base.$impl || this;
                return $untag(impl.sequence(def, base).call(impl, def || {}).constructor);
            },

            sequence: function sequence(def, base) {
                return _.sequence(

                /*  TODO: optimize performance (there's PLENTY of room to do that)
                 */
                this.convertPropertyAccessors, this.extendWithTags, this.flatten, this.generateCustomCompilerImpl(base), this.ensureFinalContracts(base), this.generateConstructor(base), this.evalAlwaysTriggeredMacros(base), this.evalMemberTriggeredMacros(base), this.contributeTraits(base), this.evalPrototypeSpecificMacros(base), this.generateBuiltInMembers(base), this.callStaticConstructor, this.expandAliases, this.groupMembersByTagForFastEnumeration, this.defineStaticMembers, this.defineInstanceMembers);
            },

            compileMixin: function compileMixin(def) {
                return _.sequence(this.convertPropertyAccessors, this.flatten, this.contributeTraits(), this.expandAliases, this.evalMemberTriggeredMacros(), this.defineStaticMembers, this.defineInstanceMembers).call(this, def || {}).constructor;
            },

            convertPropertyAccessors: function convertPropertyAccessors(def) {
                // converts { get foo () {} } to { get: $property (...) }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.getOwnPropertyNames(def)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var name = _step.value;

                        var desc = Object.getOwnPropertyDescriptor(def, name);

                        if (desc.get instanceof Function || desc.set instanceof Function) {

                            Object.defineProperty(def, name, { value: $property(desc) });
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return def;
            },

            flatten: function flatten(def) {

                /*  merge groups    */

                var tagGroups = _.pick(def, this.isTagGroup);
                var mergedTagGroups = _.object(_.flatten(_.map(tagGroups, function (membersDef, tag) {
                    return _.map(this.flatten(this.convertPropertyAccessors(membersDef)), function (member, memberName) {
                        return [memberName, $global[tag](member)];
                    });
                }, this), true));

                var memberDefinitions = _.omit(def, this.isTagGroup);

                return _.extend(memberDefinitions, mergedTagGroups);
            },

            evalAlwaysTriggeredMacros: function evalAlwaysTriggeredMacros(base) {
                return function (def) {
                    var macros = $prototype.impl.alwaysTriggeredMacros;
                    for (var i = 0, n = macros.length; i < n; i++) {
                        def = macros[i](def, base) || def;
                    }
                    return def;
                };
            },

            evalMemberTriggeredMacros: function evalMemberTriggeredMacros(base) {
                return function (def) {
                    var names = $prototype.impl.memberNameTriggeredMacros,
                        tags = $prototype.impl.tagTriggeredMacros;

                    _.each(def, function (value, name) {
                        if (names.hasOwnProperty(name)) {
                            def = names[name](def, value, name, base) || def;
                        }

                        Meta.eachTag(value, function (tag) {
                            if (tags.hasOwnProperty(tag)) {
                                def = tags[tag](def, value, name, base) || def;
                            }
                        });
                    });

                    return def;
                };
            },

            evalPrototypeSpecificMacros: function evalPrototypeSpecificMacros(base) {
                return function (def) {
                    if (!def.isTraitOf) {
                        var macroTags = $untag(def.$macroTags || base && base.$definition && base.$definition.$macroTags);
                        if (macroTags) {
                            this.applyMacroTags(macroTags, def);
                        }
                    }return def;
                };
            },

            applyMacroTags: function applyMacroTags(macroTags, def) {
                _.each(def, function (memberDef, memberName) {
                    _.each(macroTags, function (macroFn, tagName) {
                        memberDef = def[memberName];
                        if (Meta.hasTag(memberDef, tagName)) {
                            def[memberName] = macroFn.call(def, def, memberDef, memberName) || memberDef;
                        }
                    }, this);
                }, this);
                return def;
            },

            generateCustomCompilerImpl: function generateCustomCompilerImpl(base) {
                return function (def) {
                    if (def.$impl) {
                        def.$impl = _.extend(Object.create(base && base.$impl || this), def.$impl); // sets prototype to base.$impl || this
                        def.$impl = $static($builtin($property(def.$impl)));
                    } else if (base && base.$impl) {
                        def.$impl = $static($builtin($property(base.$impl)));
                    }
                    return def;
                };
            },

            contributeTraits: function contributeTraits(base) {
                return function (def) {

                    if (def.$traits) {
                        var traits = def.$traits;

                        this.mergeTraitsMembers(def, traits, base);

                        def.$traits = $static($builtin($property(traits)));
                        def.hasTrait = $static($builtin(function (Constructor) {
                            return traits.indexOf(Constructor) >= 0;
                        }));
                    }

                    return def;
                };
            },

            mergeTraitsMembers: function mergeTraitsMembers(def, traits, base) {
                _.each(traits, function (trait) {
                    _.defaults(def, _.omit(trait.$definition, function (v, k) {
                        return $builtin.is(v) || k === 'constructor';
                    }));
                });
            },

            extendWithTags: function extendWithTags(def) {
                return _.extendWith($untag(def), _.object(_.map(Meta.tags(def), function (v, k) {
                    return ['$' + k, $static(v)];
                })));
            },

            callStaticConstructor: function callStaticConstructor(def) {
                if (!def.isTraitOf) {
                    _.each($untag(def.$traits), function (T) {
                        if (T.$definition.$constructor) {
                            $untag(T.$definition.$constructor).call(def);
                        }
                    });
                    if (def.$constructor) {
                        $untag(def.$constructor).call(def);
                    }
                }return def;
            },

            generateConstructor: function generateConstructor(base) {
                return function (def) {
                    return _.extend(def, { constructor: Meta.modify(def.hasOwnProperty('constructor') ? def.constructor : this.defaultConstructor(base), function (fn) {
                            if (base) {
                                fn.prototype = Object.create(base.prototype);
                                fn.prototype.constructor = fn;
                            }
                            return fn;
                        }) });
                };
            },

            generateBuiltInMembers: function generateBuiltInMembers(base) {
                return function (def) {

                    if (def.$constructor) {
                        def.$constructor = $builtin($static(def.$constructor));
                    }

                    return _.defaults(def, {
                        $base: $builtin($static($property(_.constant(base && base.prototype)))),
                        $definition: $builtin($static($property(_.constant(_.extend({}, base && base.$definition, def))))),
                        isTypeOf: $builtin($static(_.partial(_.isTypeOf, $untag(def.constructor)))),
                        isInstanceOf: $builtin(function (constructor) {
                            return _.isTypeOf(constructor, this);
                        }),
                        $: $builtin($prototype.impl.$) });
                };
            },

            $: function $(fn) {
                return _.$.apply(null, [this].concat(_.asArray(arguments)));
            },

            defaultConstructor: function defaultConstructor(base) {
                return base ? function () {
                    base.prototype.constructor.apply(this, arguments);
                } : function (cfg) {
                    _.extend(this, cfg || {});
                };
            },

            defineStaticMembers: function defineStaticMembers(def) {
                this.defineMembers($untag(def.constructor), _.pick(def, $static.is));
                return def;
            },

            defineInstanceMembers: function defineInstanceMembers(def) {
                this.defineMembers($untag(def.constructor).prototype, _.omit(def, $static.is));
                return def;
            },

            defineMembers: function defineMembers(targetObject, def) {
                _.each(def, function (value, key) {
                    if (key !== 'constructor' && def.hasOwnProperty(key)) {
                        this.defineMember(targetObject, value, key);
                    }
                }, this);
            },

            defineMember: function defineMember(targetObject, def, key) {

                var tags = Meta.tags(def);

                if (tags.property) {
                    (tags.memoized ? _.defineMemoizedProperty : _.defineProperty)(targetObject, key, def, tags.hidden ? { enumerable: false } : {});
                } else {
                    Object.defineProperty(targetObject, key, {
                        value: $untag(def),
                        configurable: true, writable: true,
                        enumerable: !tags.hidden });
                }
            },

            ensureFinalContracts: function ensureFinalContracts(base) {
                return function (def) {
                    if (base) {
                        if (base.$final) {
                            throw new Error('Cannot derive from $final-marked prototype');
                        }

                        if (base.$definition) {
                            var invalidMembers = _.intersection(_.keys(_.pick(base.$definition, $final.is)), _.keys(def));
                            if (invalidMembers.length) {
                                throw new Error('Cannot override $final ' + invalidMembers.join(', '));
                            }
                        }
                    }

                    return def;
                };
            },

            expandAliases: function expandAliases(def) {
                _.each(def, function (v, k) {
                    def[k] = this.resolveMember(def, k, v)[1];
                }, this);return def;
            },

            resolveMember: function resolveMember(def, name, member) {
                member = member || def[name];

                if ($alias.is(member)) {
                    var ref = this.resolveMember(def, $untag(member));
                    var refName = ref[0];
                    var refValue = ref[1];

                    return [refName, $property.is(member) ? $property({
                        get: function get() {
                            return this[refName];
                        },
                        set: function set(x) {
                            this[refName] = x;
                        }
                    }) : Meta.replaceTags(refValue, _.omit(Meta.tags(member), 'alias'))];
                } else {
                    return [name, member];
                }
            },

            groupMembersByTagForFastEnumeration: function groupMembersByTagForFastEnumeration(def) {
                var membersByTag = {};

                _.each(def, function (m, name) {
                    Meta.eachTag(m, function (tag) {
                        return (membersByTag[tag] = membersByTag[tag] || {})[name] = m;
                    });
                });

                def.$membersByTag = $static($builtin($property(membersByTag)));return def;
            },

            isTagGroup: function isTagGroup(value_, key) {
                var value = $untag(value_);
                return key[0] === '$' && _.isFunction($global[key]) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !_.isArray(value);
            },

            modifyMember: function modifyMember(member, newValue) {
                return $property.is(member) && Meta.modify(member, function (value) {
                    return _.extend(value, _.map2(_.pick(value, 'get', 'set'), newValue));
                }) || _.isFunction($untag(member)) && Meta.modify(member, newValue) || member;
            } } });
});

/*  $trait  A combinatoric-style alternative to inheritance.
            (also known as "mixin" in some languages)
    ======================================================================== */

_.withTest(['OOP', '$traits'], function () {

    var Closeable = $trait({
        close: function close() {} });

    var Movable = $trait({
        move: function move() {} });

    var Enumerable = $trait({
        each: function each(iter) {},
        length: $property(function () {
            return 0;
        }) });

    var JustCloseable = $prototype({ $traits: [Closeable] });
    var MovableEnumerable = $prototype({ $traits: [Movable, Enumerable], move: function move() {} });

    var movableEnumerable = new MovableEnumerable();

    $assert(movableEnumerable.move === MovableEnumerable.prototype.move);

    $assertThrows(function () {
        new Closeable();
    }, _.matches({ message: 'Traits are not instantiable (what for?)' }));

    $assertTypeMatches(movableEnumerable, {
        move: 'function',
        each: 'function',
        length: 'number' });

    $assert([movableEnumerable.isInstanceOf(Movable), movableEnumerable.isInstanceOf(Enumerable), movableEnumerable.isInstanceOf(Closeable)], [true, true, false]);

    $assert(Movable.isTypeOf(movableEnumerable));
    $assert(Movable.isTraitOf(movableEnumerable));

    $assert(MovableEnumerable.hasTrait(Enumerable));

    $assertMatches(MovableEnumerable, { $traits: [Movable, Enumerable] });
    $assertMatches(JustCloseable, { $traits: [Closeable] });

    $assertCallOrder(function (t1_constructed, t2_constructed, proto_constructed) {

        var T1, T2;

        $assertNotCalled(function (not_now) {
            T1 = $trait({ $constructor: function $constructor() {
                    not_now();t1_constructed();
                } });
            T2 = $trait({ $constructor: function $constructor() {
                    not_now();t2_constructed();
                } });
        });

        var Proto = $prototype({
            $traits: [T1, T2],
            $constructor: function $constructor() {
                proto_constructed();
            } });
    });
}, function () {

    _.isTraitOf = function (Trait, instance) {
        var constructor = instance && instance.constructor;
        return constructor && constructor.hasTrait && constructor.hasTrait(Trait) || false;
    }; //  indexOf is fast if has 1-2 traits,
    //  no need to pre-index
    _.isTypeOf = _.or(_.isTypeOf, _.isTraitOf);

    $global.$trait = function (arg1, arg2) {
        var constructor = undefined;
        var def = _.extend(arguments.length > 1 ? arg2 : arg1, {
            constructor: _.throwsError('Traits are not instantiable (what for?)'),
            isTraitOf: $static($builtin(function (instance) {
                return _.isTraitOf(constructor, instance);
            })) });

        return constructor = $prototype.impl.compile(def, arguments.length > 1 ? arg1 : arg2);
    };
});

/*  $macroTags
    ======================================================================== */

$prototype.macro('$macroTags', function (def, value, name) {
    _.each($untag(value), function (v, k) {
        Meta.globalTag(k);
    });
});

/*  Context-free implementation of this.$
    ======================================================================== */

_.$ = function (this_, fn) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return args.length ? _.bind.apply(undefined, [fn, this_].concat(args)) : _.withSameArgs(fn, function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return fn.apply(this_, args);
    });
}; // @hide


/*  $const (xxx) as convenient alias for $static ($property (xxx))
    ======================================================================== */

_.withTest(['OOP', '$const'], function () {

    var A = $prototype({
        $const: {
            foo: 'foo',
            bar: 'bar' },
        qux: $const('qux'),
        zap: $const('zap') });

    $assert([A.foo, A.bar, A.qux, A.zap], ['foo', 'bar', 'qux', 'zap']);
    $assertThrows(function () {
        A.foo = 'bar ';
    });
}, function () {

    $global.$const = function (x) {
        return $static($property(x));
    };
});

/*  Dual call interface
    ======================================================================== */

/*  method → free function
 */
_.withTest(['OOP', '$callableAsFreeFunction'], function () {

    var X = $prototype({
        foo: $callableAsFreeFunction($property(function () {
            $assert(this._42, 42);return 42;
        })) }),
        x = new X({ _42: 42 });

    $assert(x.foo, X.foo(x), 42);
}, function () {

    /*  Impl
     */
    Meta.globalTag('callableAsFreeFunction');
    $prototype.macroTag('callableAsFreeFunction', function (def, value, name) {
        def.constructor[name] = $untag(value).asFreeFunction;
        return def;
    });
});

/*  free function → method
 */
_.withTest(['OOP', '$callableAsMethod'], function () {

    var X = $prototype({
        foo: $callableAsMethod(function (this_, _42) {
            $assert(this_._42, _42, 42);return 42;
        }) }),
        x = new X({ _42: 42 });

    $assert(x.foo(42), X.foo(x, 42), 42);
}, function () {

    /*  Impl 
     */
    Meta.globalTag('callableAsMethod');
    $prototype.macroTag('callableAsMethod', function (def, value, name) {
        def[name] = Meta.modify(value, _.asMethod);
        def.constructor[name] = $untag(value);
        return def;
    });
});

/*  $singleton (a humanized macro to new ($prototype (definition)))
    ======================================================================== */

_.withTest(['OOP', '$singleton'], function () {
    $assertEveryCalledOnce(function (baseConstructor, derivedConstructor) {

        var Base = $prototype({
            method: _.constant(42) });

        /*  returns constructed instance of a definition passed as argument
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Simple = $singleton({
            constructor: function constructor() {
                baseConstructor();
            },
            method: function method() {
                return 42;
            } });

        /*  can inherit from a prototype
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        var Derived = $singleton(Base, {
            constructor: function constructor() {
                derivedConstructor();Base.prototype.constructor.apply(this, arguments);
            } });

        $assert(Simple.method(), Derived.method(), 42);
    });

    /*  inner prototypes
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    var Outside = $singleton({
        Inside: $prototype({ foo: function foo() {} }) });

    $assertTypeMatches(new Outside.Inside().foo, 'function');
}, function () {

    /*  IMPLEMENTATION
        ==================================================================== */

    $global.$singleton = function (arg1, arg2) {
        return new ($prototype.apply(null, arguments))();
    };
});

/***/ }),
/* 153 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./base/Parse.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  Parsers (TODO: REFACTOR)
    ======================================================================== */

_.tests.parse = {
    fileName: function fileName() {
        $assert(Parse.fileName('блабла'), 'блабла');
        $assert(Parse.fileName('блабла.jpg'), 'блабла');
        $assert(Parse.fileName('c:\\блабла/path/path2/блабла.jpg'), 'блабла');
    }
};

$global.Parse = {

    keyCodeAsString: function keyCodeAsString(key) {
        return String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
    },

    fileName: function fileName(path) {
        return _.last(path.split(/\\|\//)).split('.')[0];
    }
};

/***/ }),
/* 154 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./base/Promise+.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = __webpack_require__(/*! underscore */ 5);

/*  Promise-centric extensions (WIP) /// TODO: REFACTOR
    ======================================================================== */

_.tests['Promise+'] = {

    /*  ------------------------------------------------------------------------ */

    promisify: function promisify() {

        /*  Example object  */

        var fs = {

            /*  Shouldn't be converted  */

            42: 42,
            dontTouchMe: function dontTouchMe() {
                $assert(arguments.length === 0);return 42;
            },
            dontTouchMe2: function dontTouchMe2() {
                $assert(arguments.length === 0);return 42;
            },
            readFileSync: function readFileSync() {
                $assert(arguments.length === 0);return 42;
            },

            /*  Will be promisified */

            readFile: function readFile(path, callback) {
                $assert(this === fs);
                if (path) {
                    callback(null, 'contents of ' + path);
                } else {
                    callback('path empty');
                }
            } };

        /*  Run     */

        var fsAsync = Function.promisifyAll(fs, { except: _.endsWith.$$('Sync').or(['dontTouchMe', 'dontTouchMe2'].asSet.matches) });

        /*  Check if 'except' worked successfully */

        $assert(fsAsync.dontTouchMe(), fsAsync.dontTouchMe2(), fsAsync.readFileSync(), fsAsync['42'], 42);

        /*  Check if 'readFile' converted successfully */

        return __.all([fsAsync.readFile(null).assertRejected('path empty'), fsAsync.readFile('foo').assert('contents of foo')]);
    },

    /*  ------------------------------------------------------------------------ */

    __: function (_2) {
        function __() {
            return _2.apply(this, arguments);
        }

        __.toString = function () {
            return _2.toString();
        };

        return __;
    }(function () {
        var adds = function adds(a, b) {
            return function (x, y) {
                return [x + a, y + b];
            };
        };
        return [__(123).assert(123), __(Promise.resolve(123)).assert(123), __(function () {
            return 123;
        }).assert(123), __(function () {
            throw 123;
        }).assertRejected(123), __(adds('foo', 'bar'), 123, 456).assert(['123foo', '456bar'])];
    }),

    first: function first() {
        return [Promise.firstResolved([Promise.reject(123), Promise.resolve(456)]).assert(456), Promise.firstResolved([Promise.reject(123), Promise.reject(456)]).assertRejected(null), Promise.firstResolved([]).assertRejected(null)];
    },

    /*  ------------------------------------------------------------------------ */

    all: function all() {
        return [__.all([123, 456]).assert([123, 456]), __.all([_.constant(123), _.constant(456)]).assert([123, 456]), __.all([Promise.resolve(123), Promise.resolve(456)]).assert([123, 456])];
    },

    /*  ------------------------------------------------------------------------ */

    seq: function seq() {
        $assert(__.seq(123), 123);
        $assert(__.seq([123, 333]), 333);
        $assert(__.seq([123, _.constant(333)]), 333);

        return [__.seq([Promise.resolve(123), Promise.resolve(333)]).assert(333), __.seq([123, __.constant(333)]).assert(333), __.seq([123, __.rejects('foo')]).assertRejected('foo'), __.seq([123, __.delays(0), _.appends('bar')]).assert('123bar')];
    },

    /*  ------------------------------------------------------------------------ */

    map: function map() {
        return [__.map(111, _.appends('bar')).assert('111bar'), __.map([222], _.appends('bar')).assert(['222bar']), __.map(__(333), _.appends('bar')).assert('333bar'), __.map({ foo: 444 }, _.appends('bar')).assert({ foo: '444bar' }), __.map({ foo: 555 }, __.constant('bar')).assert({ foo: 'bar' }), __.map({ foo: Promise.resolve(111), bar: Promise.resolve(222) }).assert({ foo: 111, bar: 222 }), __.map(['a', 'b', 'c', 'd', 'e'], function (x, i) {
            return Promise.resolve([i, x]).delay(10 - i);
        }).assert([[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e']])];
    },

    /*  ------------------------------------------------------------------------ */

    filter: function filter() {
        return [__.filter(123, _.constant(456)).assert(456), __.filter(['foo', 456], _.isString).assert(['foo']), __.filter(['foo', 456], __.constant('baz')).assert(['baz', 'baz']), __.filter({ foo: 123, bar: '456' }, _.isNumber).assert({ foo: 123 })];
    },

    /*  ------------------------------------------------------------------------ */

    each: function each() {

        var pairs = function pairs(input) {
            var pairs = [];
            return __.each(input, function (x, i) {
                pairs.push([x, i]);
            }).then(_.constant(pairs));
        };

        return [pairs().assert([]), pairs(undefined).assert([]), pairs(42).assert([[42, undefined]]), pairs([42, 48]).assert([[42, 0], [48, 1]]), pairs({ 0: 42, 1: 48 }).assert([[42, '0'], [48, '1']]), __.each([1, 2], function (x, i) {
            if (i > 0) $fail; // should stop at 0, due to rejection
            return Promise.reject('foo');
        }).assertRejected('foo')];
    }

    /*  END OF TESTS ----------------------------------------------------------- */

};

/*  IMPLEMENTATION
    ======================================================================== */

$global.TimeoutError = function (_Error) {
    _inherits(_class, _Error);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'timeout expired'));
    }

    return _class;
}(Error);

/*  ------------------------------------------------------------------------ */

$global.__ = Promise.eval = function (x) {
    var _this2 = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return x instanceof Promise ? x : x instanceof Function ? new Promise(function (resolve) {
        resolve(x.apply(_this2, args));
    }) : // @hide
    Promise.resolve(x);
};

Promise.coerce = function (x) {
    return x instanceof Promise ? x : Promise.resolve(x);
};

/*  ------------------------------------------------------------------------ */

__.noop = function () {
    return Promise.resolve();
};

__.eternity = new Promise(function () {});

__.identity = function (x) {
    return Promise.resolve(x);
};

__.constant = function (x) {
    return function () {
        return Promise.resolve(x);
    };
};

__.reject = function (e) {
    return Promise.reject(e);
};
__.rejects = function (e) {
    return function () {
        return Promise.reject(e);
    };
};

/*  ------------------------------------------------------------------------ */

__.then = function (a, b) {
    b = _.coerceToFunction(b);
    try {
        var x = a instanceof Function ? a() : a;
        return x instanceof Promise ? x.then(b) : b(x);
    } // @hide
    catch (e) {
        return Promise.reject(e);
    }
};

/*  ------------------------------------------------------------------------ */

__.delay = function (ms) {
    return __.delays(ms)();
};

__.delays = function (ms) {
    return function (x) {
        return new Promise(function (return_) {
            setTimeout(function () {
                return_(x);
            }, ms || 0);
        });
    };
};

$mixin(Promise, {
    delay: function delay(ms) {
        return this.then(__.delays(ms));
    },
    timeout: function timeout(ms) {
        return ms === undefined ? this : this.race(__.delay(ms).reject(new TimeoutError()));
    },
    now: $property(function () {
        return this.timeout(0);
    }) });

/*  ------------------------------------------------------------------------ */

$mixin(Array, {

    race: $property(function () {
        return Promise.race(this);
    }) });

/*  ------------------------------------------------------------------------ */

$mixin(Promise, {

    race: function race(other) {
        return [this, other].race;
    },

    firstResolved: $static(function (arr) {
        return new Promise(function (resolve, reject) {
            var todo = arr && arr.length;
            if (!todo) {
                reject(null);
            } else {
                _.each(arr, function (x) {
                    Promise.coerce(x).then(function (x) {
                        todo--;
                        if (resolve) {
                            resolve(x);
                            resolve = undefined;
                        }
                    }).catch(function () {
                        todo--;
                        if (!todo) {
                            reject(null);
                        }
                    });
                });
            }
        });
    }),

    reject: function reject(e) {
        return this.then(_.throwsError(e));
    },

    chain: function chain(fn) {
        return this.then(function (x) {
            fn(x);return x;
        });
    },

    done: function done(fn) {
        return this.then(function (x) {
            fn(null, x);return x;
        }, function (e) {
            fn(e, null);throw e;
        });
    },

    finally: function _finally(fn) {
        return this.then(function (x) {
            return fn(null, x);
        }, function (e) {
            return fn(e, null);
        });
    },

    $callableAsFreeFunction: {
        $property: {
            reflect: function reflect() {
                return this.then(function (v) {
                    return v;
                }, function (e) {
                    return e;
                });
            }
        }
    },

    /*state: $property (function () {
                        return this.then (
                            function (x) { return { state: 'fulfilled', fulfilled: true, value: x } },
                            function (e) { return { state: 'rejected', rejected: true, value: x } }).now.catch (function () {
                                           return { state: 'pending', pending: true } }) }),*/

    log: $property(function () {
        return this.then(log, log.then(_.throwsError));
    }),

    panic: $property(function () {
        return this.catch(function (e) {

            if (_.globalUncaughtExceptionHandler) {
                _.globalUncaughtExceptionHandler(e);
            }

            throw e;
        });
    }),

    assert: function assert(desired) {
        return this.then(function (x) {
            $assert(x, desired);return x;
        });
    },

    assertTypeMatches: function assertTypeMatches(desired) {
        return this.then(function (x) {
            $assertTypeMatches(x, desired);return x;
        });
    },

    assertRejected: function assertRejected(desired) {
        var check = arguments.length > 0;
        return this.catch(function (x) {
            if (check) {
                $assert(x, desired);
            }return x;
        });
    }

});

/*  ------------------------------------------------------------------------ */

_.deferTest(['Promise+', '_.scatter with pooling'], function () {

    var data = _.times(21, function (i) {
        return 'item_' + i;
    });
    var numItems = 0;
    var processedItems = [];

    var op = function op(item, i) {
        numItems++;
        $assert(!processedItems.contains(item));
        return __.delay(_.random(2)).then(function () {
            processedItems.push(item);
            return item;
        });
    };

    return __.scatter(data, op, { maxConcurrency: 5 }).then(function () {
        $assert(_.difference(data, processedItems).isEmpty);
    });
},

/*  ------------------------------------------------------------------------ */

function () {

    $global.TaskPool = $prototype({

        constructor: function constructor(cfg) {

            this.maxTime = cfg && cfg.maxTime;
            this.pending = [];

            if (this.maxConcurrency = cfg && cfg.maxConcurrency) {
                this.numActive = 0;
                this.queue = [];
            }
        },

        run: function run(task) {
            var self = this;

            if (this.numActive >= this.maxConcurrency) {
                // queue task

                return new Promise(function (resolve) {
                    self.queue.push(function () {
                        return self.run(task).then(resolve);
                    });
                });
            } else {
                // execute task

                var p = __(task);

                if (this.maxTime !== undefined) {
                    p = p.timeout(this.maxTime);
                }

                if (this.maxConcurrency !== undefined) {
                    // if queueing, wait until complete and pop next task

                    self.numActive++;
                    p = p.then(function (x) {
                        self.numActive--;

                        return self.queue.length && self.numActive < self.maxConcurrency ? self.queue.shift()().then(_.constant(x)) : x;
                    });
                }
                this.pending.push(p);

                return p;
            }
        },

        all: $property(function () {
            return Promise.all(this.pending);
        }) });

    /*  ------------------------------------------------------------------------ */

    __.scatter = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {

        return __.then(x, function (x) {

            if (_.isStrictlyObject(x)) {

                var result = _.coerceToEmpty(x),
                    tasks = new TaskPool(cfg);

                _.each2(x, function (v, k) {
                    tasks.run(fn.$(v, k, x)).then(function (vk) {
                        if (vk) {
                            result[vk[1]] = vk[0];
                        }
                    });
                });
                return tasks.all.then(_.constant(result));
            } else {
                return __(fn, x, undefined, x).then(function (vk) {
                    return vk[0];
                });
            }
        });
    };
});

/*  ------------------------------------------------------------------------ */

__.map = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {
    fn = fn || _.identity;
    return __.scatter(x, function (v, k, x) {
        return __.then(fn.$(v, k, x), function (x) {
            return [x, k];
        });
    }, cfg);
};

__.map.configure = function (Cfg) {
    return function (x, fn, cfg) {
        return __.map(x, fn, Object.assign({}, Cfg, cfg));
    };
};

__.filter = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {
    return __.scatter(x, function (v, k, x) {
        return __.then(fn.$(v, k, x), function (decision) {
            return decision === false ? undefined : decision === true ? [v, k] : [decision, k];
        });
    }, cfg);
};
__.each = function (obj, fn) {
    return __.then(obj, function (obj) {
        return new Promise(function (complete, whoops) {
            _.cps.each(obj, function (x, i, then) {
                Promise.coerce(fn(x, i)).then(then).catch(whoops);
            }, complete);
        });
    });
};

__.parallelEach = __.map;

__.seq = function (arr) {
    return _.reduce2(arr, __.then);
};

__.all = function (arr) {
    return Promise.all(_.map(arr, __));
};

__.race = function (arr) {
    return Promise.race(_.map(arr, __));
};

/*  ------------------------------------------------------------------------ */

$mixin(Function, {

    promisifyAll: $static(function (obj, cfg) {
        var cfg = cfg || {},
            except = cfg.except || _.noop;

        if (except instanceof Array) {
            except = except.asSet.matches;
        }

        var result = {};

        for (var k in obj) {
            var x = obj[k];
            if (x instanceof Function) {
                var fn = x.bind(obj);
                result[k] = except(k) ? fn : fn.promisify;
            } else {
                result[k] = x;
            }
        }

        return result;
    }),

    promisify: $hidden($property(function () {
        var f = this;
        return function () {
            var self = this,
                args = arguments;
            return new Promise(function (resolve, reject) {
                f.apply(self, _.asArray(args).concat(function (err, what) {
                    if (err) {
                        reject(err);
                    }
                    resolve(what);
                }));
            });
        };
    })) });

/***/ }),
/* 155 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./base/Sort.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

$global.Sort = {
    Ascending: 1,
    Descending: -1,
    strings: function strings(a, b) {
        a = $.trim(a).toLowerCase();
        b = $.trim(b).toLowerCase();
        if (a.length == 0 && b.length > 0) {
            return 1;
        } else if (a.length > 0 && b.length == 0) {
            return -1;
        } else {
            return a == b ? 0 : a < b ? -1 : 1;
        }
    },
    numbers: function numbers(a, b) {
        if (isNaN(a) && isNaN(b)) {
            return 0;
        } else if (isNaN(a)) {
            return -1;
        } else if (isNaN(b)) {
            return 1;
        } else {
            return a < b ? -1 : a > b ? 1 : 0;
        }
    },
    generic: function generic(a, b) {
        if (!a && !b) {
            return 0;
        } else if (!a) {
            return -1;
        } else if (!b) {
            return 1;
        } else {
            return a < b ? -1 : a > b ? 1 : 0;
        }
    },
    inverse: function inverse(sort) {
        return function (a, b) {
            return -sort(a, b);
        };
    },
    field: function field(name, sort, order) {
        return function (a, b) {
            return sort(a[name], b[name]) * order;
        };
    }
};

/***/ }),
/* 156 */,
/* 157 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./base/component.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(/*! underscore */ 5);

/*  What for:

    -   Hierarchy management (parent-child relationship)
    -   Destructors ('destroy' method), propagating through hierarchy
    -   bindable on $prototypes, auto-disconnecting if involved component gets destroyed
    -   trigger/barrier on $prototypes, auto-disconnecting if involved component gets destroyed

    Component facility provides unified mechanics for deinitialization, thus allowing
    to freely combine distinct components into more complex structure with no need to
    know how to specifically deinitialize each of them.

    Use to define highly configurable/reusable objects having limited lifetime, holding
    system resources and organizing into hierarchies, e.g. UI components, like dialogs,
    menus, embeddable data views. They hold DOM references and bound events, so one needs
    to properly free those resources during deinitialization. Case studies:

    -   For example, a pop-up menu could render itself into top-level 'document' element, 
        so just by destroying its parent component's DOM, things created by this pop-up
        wont be destroyed, and that's why explicit 'destroy' method is needed. With
        Component, you call 'destroy' on parent component, and it propagates to child
        components automatically, triggering their 'destroy' methods.

    -   A component could dynamically bind to other components with help of $bindable and
        $trigger facilities. If such component gets destroyed, those links became invalid
        and should be removed, otherwise it's considered as 'memory leak'. Component handles
        such situation, removing those links if any involved component gets destroyed.

    Component could be considered as basic tool for dynamic code binding at macro level,
    promoting functional code binding tools (defined in dynamic/stream.js) to $prototypes.
 */

_.tests.component = {

    /*  - Passing config to constructor will extend constructed instance with that object
        - Component constructors exhibit CPS interface (last function argument interprets as continuation)
     */
    'constructor([cfg, ][then])': function constructorCfgThen() {
        $assertNotCalled(function (mkay) {

            var Compo = $component({});

            /*  1. constructor (cfg)
             */
            $assertMatches(new Compo({ foo: 42 }), { foo: 42 });

            /*  2. constructor (then)
             */
            //new Compo (mkay)

            /*  3. constructor (cfg, then)
             */
            /*$assertMatches (new Compo ({ foo: 42 }, mkay), { foo: 42 })*/
        });
    },

    /*  init() should be entry point to a component, calling at constructor by default
     */
    'init': function init() {
        $assertEveryCalledOnce(function (mkay) {
            $singleton(Component, {
                init: function init() {
                    mkay();
                } });
        });
    },

    /*  init(then) means your initialization is defined in CPS style
     */
    /*'CPS init': function () { $assertEveryCalled (function (compo1, compo2) {
                             var Compo = $prototype ({
                                init: function (then) { // you're required to call then, to complete init
                                    then () } })
                             var compo = new Compo (function () {
                                compo1 () })
                             var compo2 = new Compo ({ _42: 42 }, function () {
                                $assert (this._42, 42)
                                compo2 () }) }) },*/

    /*  constructor overriding is prohibited (by $final), use init() API for configuration means
     */
    'no constructor overriding': function noConstructorOverriding() {
        $assertThrows(function () {
            $singleton(Component, {
                constructor: function constructor() {} });
        });
    },

    /*  If you don't want init() to be called at constructor (to call it manually later),
        pass init:false to constructor's config
     */
    'manual init()': function manualInit() {
        $assertNotCalled(function (fail) {
            var Compo = $component({ init: function init() {
                    fail();
                } });
            var compo = new Compo({ init: false });
            $assert(_typeof(compo.init), 'function');
        });
    }, // shouldn't be replaced by false

    /*  initialized is a _.barrier that opens after initialization
     */
    'initialized (barrier)': function initializedBarrier() {
        var Compo = $component({ init: function init() {} });
        var compo = new Compo({ init: false });

        $assert(!compo.initialized.already);
        $assertEveryCalledOnce(function (mkay) {
            compo.initialized(function () {
                mkay();
            });
            compo.init();
        });
    },

    /*  'thiscall' semantics for methods (which can be defined by a variety of ways)
     */
    'thiscall for methods': function thiscallForMethods() {
        $assertEveryCalledOnce(function (_prototypeMethod, _instanceMethod) {
            var instance = null;
            var Compo = new $component({
                prototypeMethod: function prototypeMethod() {
                    $assert(this === instance);_prototypeMethod();
                } });
            instance = new Compo({
                instanceMethod: function instanceMethod() {
                    $assert(this === instance);_instanceMethod();
                } });

            instance.prototypeMethod.call(null);
            instance.instanceMethod.call(null);
        });
    },

    /*  Pluggable init/destroy with $traits (tests all combinations of CPS / sequential style method calling)
     */
    'pluggable init with $traits': function pluggableInitWith$traits() {
        var A, B, C, D;

        var A = $trait({
            beforeInit: function beforeInit() {
                A = true;return Promise.resolve();
            },
            afterInit: function afterInit() {
                B = true;return Promise.resolve();
            } });

        var B = $trait({
            beforeInit: function beforeInit() {
                C = true;
            },
            afterInit: function afterInit() {
                D = true;
            }
        });

        var C = $component({
            $traits: [B, A] });

        return new C().initialized.promise.then(function () {
            $assert(A, B, C, D, true);
        });
    },

    /*  $defaults is convenient macro to extract _.defaults thing from init() to definition level
     */
    '$defaults basic': function $defaultsBasic() {
        var Compo = $component({ $defaults: { foo: 42 } });
        $assert($untag(Compo.$definition.$defaults), { foo: 42 });
        $assert(Compo.$defaults, { foo: 42 });

        var Compo2 = $component({ $traits: [$trait({ $defaults: { foo: 11 } })], $defaults: {} });
        $assert($untag(Compo2.$definition.$defaults), { foo: 11 });
        $assert(Compo2.$defaults, { foo: 11 });
    },

    '$defaults': function $defaults() {
        var Trait = $trait({ $defaults: { pff: 'pff', inner: { fromTrait: 1 } } });
        var Base = $component({ $defaults: { foo: 12, qux: 'override me', inner: { fromBase: 1 } } });
        var Derived = $extends(Base, {
            $traits: [Trait],
            $defaults: { bar: 34, qux: 'overriden', inner: { fromDerived: 1 } } });

        //$assert (Derived.$ownDefaults,
        //               { bar: 34, qux: 'overriden', inner: { fromDerived: 1 } } )

        /* TODO: fix bug not allowing derived to not have $defaults
           var Derived2 = $extends (Derived, {}) */

        $assert(new Derived().inner !== new Derived().inner); // should clone $defaults at instance construction

        $assertMatches(new Derived({ pff: 'overriden from cfg' }), { pff: 'overriden from cfg', foo: 12, bar: 34, qux: 'overriden', inner: { fromTrait: 1, fromBase: 1, fromDerived: 1 } });
    },

    '$defaults cloning semantics': function $defaultsCloningSemantics() {
        var set = new Set([1, 2, 3]);

        var S = $component({ $defaults: { foo: set,
                bar: new Set() } });

        var s = new S();

        $assert(s.foo instanceof Set, s.bar instanceof Set, true);

        $assert(s.foo !== set);
    },

    /*  Use $requires to specify required config params along with their type signatures
     */
    '$requires': function $requires() {
        var SomeType = $prototype();
        var CompoThatRequires = $component({
            $requires: {
                foo: SomeType, // requires foo to be instance of SomeType
                ffu: { a: 'number', b: 'string' }, // breakdown test
                bar: 'number',
                qux: ['number'],
                baz: _.not(_.isEmpty) } }); // custom requirement predicate


        var DerivedCompoThatRequiresMore = $extends(CompoThatRequires, {
            $requires: { more: 'string' } });

        $assertFails(function () {
            new CompoThatRequires({ baz: {} });
        }); // $requires behaves like assertion in case of failure

        $assertFails(function () {
            new DerivedCompoThatRequiresMore({ more: 'hey how about other requirements' });
        });

        new DerivedCompoThatRequiresMore({
            foo: new SomeType(),
            bar: 42,
            qux: [1, 2, 3],
            more: 'blah blah',
            ffu: { a: 1, b: '2' },
            baz: 'blahblah' });
    },

    /*  $overrideThis is a macro that requires a method to be overriden
     */
    /*'overrideThis': function () {
        $assertThrows (function () { $singleton (Component, { foo: $overrideThis (function () {}) }) },
            _.matches ({ message: 'foo should be overriden' })) },*/

    /*  $bindable lifts _.bindable to Component level, opening new venues to hooking onto existing impl,
        in ad-hoc way, with no need to specify hard-coded callback structure beforehand.
         Use to implement common beforeXXX and afterXXX semantics.
     */
    '$bindable': function (_$bindable) {
        function $bindable() {
            return _$bindable.apply(this, arguments);
        }

        $bindable.toString = function () {
            return _$bindable.toString();
        };

        return $bindable;
    }(function () {
        $assertEveryCalledOnce(function (method, before, after) {

            var compo = $singleton(Component, {
                method: $bindable(function (x) {
                    method();
                    return 42;
                }) });

            compo.method.onBefore(function (_5) {
                before();
                $assert(this === compo);
                $assert(_5, 5);
            });

            compo.method.onAfter(function (_5, _result) {
                after();
                $assert(this === compo);
                $assert(_5, 5);
                $assert(_result, 42);
            });

            $assert(compo.method(5), 42);
        });
    }),

    /*  Trigger has many names in outer world, like Event, Signal (and legion of
        many other misleading buzzwords).
         In our implementation, Trigger is a partial case of 'stream' concept, which
        is a highly abstract functional I/O primitive for multicasting of data/events).
        See dynamic/stream.js for its amazingly simple implementation.
             1.  If called with some value arguments (or no argument), it performs
                multicast of these arguments to all bound listeners (readers).
                In terms of 'streams' that operation is called 'write'.
             2.  If called with function argument, it adds that function to the wait
                queue mentioned before. In terms of 'streams' it is called 'read'.
         Component manages those streams (defined by $-syntax at its prototype definition),
        auto-disconnecting bound methods, so that no method of Component bound
        to such streams will ever be called after destroy().
     */
    '$trigger': function (_$trigger) {
        function $trigger() {
            return _$trigger.apply(this, arguments);
        }

        $trigger.toString = function () {
            return _$trigger.toString();
        };

        return $trigger;
    }(function () {
        $assertEveryCalled(function (mkay__2) {

            var compo = $singleton(Component, {
                mouseMoved: $trigger() });

            compo.mouseMoved(function (x, y) {
                $assert([x, y], [7, 12]);mkay__2();
            });
            compo.mouseMoved(7, 12);
            compo.mouseMoved(7, 12);
        });
    }),

    'init streams from config': function initStreamsFromConfig() {
        $assertEveryCalled(function (atDefinition, atInit) {

            var Compo = $component({
                mouseMoved: $trigger(atDefinition),
                init: function init() {
                    this.mouseMoved();
                } });

            new Compo({ mouseMoved: atInit });
        });
    },

    /*  A variation of trigger. On 'write' operation, it flushes wait queue, so
        no callback bound previously gets called in future (until explicitly
        queued again by 'read' operation).
     */
    '$triggerOnce': function (_$triggerOnce) {
        function $triggerOnce() {
            return _$triggerOnce.apply(this, arguments);
        }

        $triggerOnce.toString = function () {
            return _$triggerOnce.toString();
        };

        return $triggerOnce;
    }(function () {
        var compo = $singleton(Component, {
            somthingHappened: $triggerOnce() });

        $assertEveryCalled(function (first, second) {
            compo.somthingHappened(function (what) {
                $assert(what, 'somthin');first();
            });
            compo.somthingHappened(function (what) {
                $assert(what, 'somthin');second();
            });
            compo.somthingHappened('somthin');
        });
    }),

    /*  Another variation of stream, having 'memory fence / memory barrier' semantics,
        widely known as synchronization primitive in concurrent programming.
             1.  At first, barrier is in closed state, putting any callback passed to it
                to a queue.
             2.  When barrier is called with value argument, it state changes to 'opened',
                triggering all queued callbacks with that value argument passed in.
             3.  After barrier had opened, any futher callback gets called immediately
                with that value argument passed before, i.e. short-circuits.
     */
    '$barrier': function (_$barrier) {
        function $barrier() {
            return _$barrier.apply(this, arguments);
        }

        $barrier.toString = function () {
            return _$barrier.toString();
        };

        return $barrier;
    }(function () {
        $assertEveryCalled(function (early, lately) {

            var compo = $singleton(Component, {
                hasMessage: $barrier() });

            compo.hasMessage(function (_msg) {
                $assert(_msg, 'mkay');early();
            });
            compo.hasMessage('mkay');
            compo.hasMessage(function (_msg) {
                $assert(_msg, 'mkay');lately();
            });
        });
    }),

    /*  $observableProperty is a powerful compound mechanism for data-driven dynamic
        code binding, built around streams described previously.
     */
    '$observableProperty': function (_$observableProperty) {
        function $observableProperty() {
            return _$observableProperty.apply(this, arguments);
        }

        $observableProperty.toString = function () {
            return _$observableProperty.toString();
        };

        return $observableProperty;
    }(function () {
        $assertEveryCalled(function (fromConstructor, fromConfig, fromLateBoundListener, fromDefinition, fromListenerOnlyVariant) {

            var Compo = $component({
                color: $observableProperty(),
                smell: $observableProperty(),
                shape: $observableProperty('round', function (now) {
                    $assert(now, 'round');fromDefinition();
                }),
                size: $observableProperty(function (x) {
                    $assert(x, 42);fromListenerOnlyVariant();
                }),
                init: function init() {
                    this.colorChange(function (now, was) {
                        if (was) {
                            fromConstructor();
                            $assert([now, was], ['green', 'blue']);
                        }
                    });
                } });

            var compo = new Compo({
                color: 'blue',
                size: 42,
                colorChange: function colorChange(now, was) {
                    if (was) {
                        fromConfig();
                        $assert([now, was], ['green', 'blue']);
                    }
                } });

            //console.log (compo.constructor.$definition)

            compo.smellChange(function (now, was) {
                fromLateBoundListener();
                $assert(compo.smell, now, 'bad');
                $assert(undefined, was);
            });

            compo.color = 'green';
            compo.smell = 'bad';
        });
    }),

    /*  $observableProperty automatically calls prototype constructor if supplied with non-prototype instance data
     */
    '$observableProperty (Prototype)': function $observablePropertyPrototype() {
        var Compo = $component({
            position: $observableProperty(Vec2.zero),
            init: function init() {
                this.positionChange(function (v) {
                    $assertTypeMatches(v, Vec2);
                    $assert(v.y, 42);
                });
            } });

        var compo = new Compo({ position: { x: 10, y: 42 } }); // supply POD value from constructor
        compo.position = { x: 20, y: 42 };
    }, // supply POD value from property accessor

    'binding to streams with traits': function bindingToStreamsWithTraits() {

        Meta.globalTag('dummy');

        $assertEveryCalled(function (mkay1, mkay2) {
            var this_ = undefined;

            var Trait = $trait({
                somethingHappened: $trigger() });

            var Other = $trait({
                somethingHappened: $dummy(function (_42) {
                    $assert(this, this_);$assert(_42, 42);mkay1();
                }) });

            var Compo = $component({
                $traits: [Trait, Other],
                somethingHappened: function somethingHappened(_42) {
                    $assert(this, this_);$assert(_42, 42);mkay2();
                } });

            this_ = new Compo();
            this_.somethingHappened(42);
        });
    },

    'binding to bindables with traits': function bindingToBindablesWithTraits() {

        $assertCallOrder(function (beforeCalled, interceptCalled, bindableCalled, afterCalled) {
            var this_ = undefined;

            var Trait = $trait({
                doSomething: $bindable(function (x) {
                    $assert(this, this_);bindableCalled();
                }) });

            var Other = $trait({
                beforeDoSomething: function beforeDoSomething(_42) {
                    $assert(this, this_);$assert(_42, 42);beforeCalled();
                },
                interceptDoSomething: function interceptDoSomething(_42, impl) {
                    interceptCalled();$assert(this, this_);return impl(_42);
                } });

            var Compo = $component({
                $traits: [Trait, Other],
                afterDoSomething: function afterDoSomething(_42) {
                    $assert(this, this_);$assert(_42, 42);afterCalled();
                } });

            this_ = new Compo();
            this_.doSomething(42);
        });
    },

    'binding to observable properties with traits': function bindingToObservablePropertiesWithTraits() {

        $assertEveryCalled(function (one, two) {
            var this_ = undefined;

            var Trait = $trait({
                someValue: $observableProperty(42) });

            var Other = $trait({
                someValue: function someValue(_42) {
                    one();
                } });

            var Compo = $component({
                $traits: [Trait, Other],
                someValue: function someValue(_42) {
                    two();
                } });

            this_ = new Compo();

            $assert(_.isFunction(this_.someValueChange));

            this_.someValue = 33;
        });
    },

    'hierarchy management': function hierarchyManagement() {
        $assertEveryCalled(function (mkay__9) {

            var Compo = $extends(Component, {
                init: function init() {
                    mkay__9();
                },
                destroy: function destroy() {
                    mkay__9();
                } });

            var parent = new Compo().attach(new Compo().attach(new Compo()));

            var parrot = new Compo().attachTo(parent).attachTo(parent);

            $assert(parrot.attachedTo === parent);
            $assert(parrot.detach().attachedTo === undefined);

            var carrot = new Compo();
            parent.attach(carrot);
            parent.attach(carrot);

            parent.destroy();
        });
    },

    'thiscall for streams': function thiscallForStreams() {

        var compo = $singleton(Component, {
            trig: $trigger() });

        compo.trig(function () {
            $assert(this === compo);
        });

        compo.trig.call({});
    },

    '$defaults can set $observableProperty': function $defaultsCanSet$observableProperty() {

        var compo = $singleton(Component, {
            twentyFour: $observableProperty(42),
            $defaults: { twentyFour: 24 } });

        $assertEveryCalledOnce(function (mkay) {
            compo.twentyFourChange(function (val) {
                $assert(val, 24);mkay();
            });
        });
    },

    'defer init with $defaults': function deferInitWith$defaults() {
        var compo = $singleton(Component, {
            $defaults: { init: false },
            init: function init() {} });

        compo.init();
    },

    'stream members should be available at property setters when inited from config': function streamMembersShouldBeAvailableAtPropertySettersWhenInitedFromConfig() {
        var compo = new ($component({
            ready: $barrier(),
            value: $property({
                set: function set(_42) {
                    $assertTypeMatches(this.ready, 'function');
                } }) }))({ value: 42 });
    },

    'observableProperty.force (regression)': function observablePropertyForceRegression() {
        $assertEveryCalled(function (mkay__2) {

            var compo = $singleton(Component, {
                prop: $observableProperty() });

            compo.prop = 42;
            compo.propChange(function (value) {
                $assert(value, 42);
                $assert(this === compo);
                mkay__2();
            });

            compo.propChange.force();
        });
    },

    'two-argument $observableProperty syntax': function twoArgument$observablePropertySyntax() {

        $assertEveryCalled(function (mkay) {
            var compo = $singleton(Component, {
                prop: $observableProperty(42, function (value) {
                    mkay();
                    if (compo) {
                        $assert(this === compo);
                        $assert(value === compo.prop);
                    }
                }) });
            compo.prop = 43;
        });
    },

    'two-argument $observable': function twoArgument$observable() {

        $assertEveryCalled(function (mkay) {
            $assert('foo', $singleton(Component, {
                foo: $observable('foo', function (x) {
                    $assert(x, 'foo');mkay();
                }) }).foo.value);
        });
    },

    'destroyAll()': function destroyAll() {
        $assertEveryCalled(function (destroyed__2) {

            var Compo = $extends(Component, {
                destroy: function destroy() {
                    destroyed__2();
                } });

            var parent = new Compo().attach(new Compo()).attach(new Compo());

            $assert(parent.attached.length === 2);

            parent.destroyAll();
            parent.destroyAll();

            $assert(parent.attached.length === 0);
        });
    },

    '$macroTags for component-specific macros': function $macroTagsForComponentSpecificMacros() {

        var Trait = $trait({ $macroTags: {
                add_2: function add_2(def, fn, name) {
                    return Meta.modify(fn, function (fn) {
                        return fn.then(_.sum.$(2));
                    });
                } } });

        var Base = $component({ $macroTags: {
                add_20: function add_20(def, fn, name) {
                    return Meta.modify(fn, function (fn) {
                        return fn.then(_.sum.$(20));
                    });
                } } });

        var Compo = $extends(Base, {
            $traits: [Trait],
            $macroTags: { dummy: function dummy() {} },

            testValue: $static($add_2($add_20(_.constant(20)))) });

        $assert(42, Compo.testValue());
        $assertMatches(_.keys(Compo.$macroTags), ['dummy', 'add_2', 'add_20']);

        _.each(_.keys(Compo.$macroTags), function (name) {
            delete $global['$' + name];
        });
    },

    '$raw for performance-critical methods (disables thiscall proxy)': function $rawForPerformanceCriticalMethodsDisablesThiscallProxy() {

        var compo = new ($component({
            method: function method(this_) {
                $assert(this_ === this);
            },
            rawMethod: $raw(function (this_) {
                $assert(this_ !== this);
            }) }))();

        var method = compo.method;method(compo);
        var rawMethod = compo.rawMethod;rawMethod(compo);
    },

    'two-way $observable binding': function twoWay$observableBinding() {

        var Compo = $component({ x: $observable('foo') });
        var x = _.observable('bar');

        var compo = new Compo({ x: x });

        $assert(compo.x !== x);
        $assert(compo.x.value, x.value, 'bar');

        compo.x(42);$assert(x.value, 42);
        x('lol');$assert(compo.x.value, 'lol');

        /*  Test unbinding    */

        compo.destroy();

        $assert(compo.x.queue, []);

        compo.x('yo');$assert(x.value, 'lol'); // shouldnt change
        x('oy');$assert(compo.x.value, 'yo'); // shouldnt change
    },

    /*  $alias (TODO: fix bugs)
     */
    /*'$alias': function () { var value = 41
         var compo = $singleton (Component, {
             foo: function () { return ++value },
            bar: $bindable ($alias ('foo')),
            baz: $memoize  ($alias ('bar')) })
         $assertEveryCalled (function (mkay) { compo.bar.onBefore (mkay)
            $assert (compo.baz (),
                     compo.baz (), 42) }) },*/

    /*  Auto-unbinding
     */
    'unbinding (simple)': function unbindingSimple() {
        var somethingHappened = _.trigger();
        var compo = $singleton(Component, { fail: function fail() {
                $fail;
            } });

        somethingHappened(compo.fail);
        compo.destroy();
        somethingHappened();
    }, // should not invoke compo.fail


    '(regression) undefined was allowed as trait': function regressionUndefinedWasAllowedAsTrait() {
        $assertThrows(function () {
            var Compo = $component({ $traits: [undefined] });
        }, { message: 'invalid $traits value' });
    },

    '(regression) undefined members fail': function regressionUndefinedMembersFail() {
        var Compo = $component({ yoba: undefined });
        $assert('yoba' in Compo.prototype);
    },

    '(regression) $defaults with $traits fail': function regression$defaultsWith$traitsFail() {
        var Compo = $component({ $traits: [$trait({ $defaults: { x: 1 } })], $defaults: { a: {}, b: [], c: 0 } });
        $assert(Compo.$defaults, { x: 1, a: {}, b: [], c: 0 });
    },

    '(regression) $defaults with $traits fail #2': function regression$defaultsWith$traitsFail2() {
        var Compo = $component({ $traits: [$trait({ $defaults: { x: 1 } })] });
        $assert(Compo.$defaults, { x: 1 });
    },

    '(regression) method overriding broken': function regressionMethodOverridingBroken() {
        var Compo = $component({ method: function method() {
                $fail;
            } });
        var compo = new Compo({ value: 42, method: function method() {
                return this.value;
            } });
        $assert(compo.method(), 42);
    },

    '(regression) $observableProperty (false)': function regression$observablePropertyFalse() {
        $assertEveryCalledOnce(function (mkay) {
            $singleton(Component, {
                foo: $observableProperty(false),
                init: function init() {
                    this.fooChange(mkay);
                } });
        });
    },

    '(regression) was not able to define inner compos at singleton compos': function regressionWasNotAbleToDefineInnerComposAtSingletonCompos() {
        var Foo = $singleton(Component, {
            InnerCompo: $component({
                foo: $observableProperty() }) });

        var Bar = $extends(Foo.InnerCompo, { bar: $observableProperty() });
        var bar = new Bar();

        $assertTypeMatches(bar, { fooChange: 'function', barChange: 'function' });
    },

    /*'(regression) postpone': function (testDone) { $assertEveryCalledOnce ($async (function (foo) {
        $singleton (Component, {
            foo: function () { foo (); },
            init: function () { this.foo.postpone () } }) }), testDone) },*/

    '(regression) undefined at definition': function regressionUndefinedAtDefinition() {
        $singleton(Component, { fail: undefined });
    },

    '(regression) properties were evaluated before init': function regressionPropertiesWereEvaluatedBeforeInit() {
        $singleton(Component, {
            fail: $property(function () {
                $fail;
            }) });
    },

    '(regression) misinterpretation of definition': function regressionMisinterpretationOfDefinition() {
        $singleton(Component, { get: function get() {
                $fail;
            } });
    },

    '(regression) alias incorrectly worked with destroy': function regressionAliasIncorrectlyWorkedWithDestroy() {
        var test = $singleton(Component, {
            destroy: function destroy() {
                mkay();
            },
            close: $alias('destroy') });

        $assert(test.close, test.destroy);
    },

    '(regression) pollution of stream listeners': function regressionPollutionOfStreamListeners() {

        var A = $trait({ something: $bindable(function (x) {}) });
        var B = $trait({
            afterSomething: function afterSomething(x) {
                $assert(false);
            }
        });

        var Y = $singleton(Component, { $depends: [A, B] });

        var Z = $singleton(Component, { $depends: [A] });

        Z.something();
    }
};

/*  General syntax
 */
$global.$component = function (definition) {
    return $extends(Component, definition);
};

_(['extendable', 'trigger', 'triggerOnce', 'barrier', 'bindable', 'memoize', 'interlocked', 'memoizeCPS', 'debounce', 'throttle', 'overrideThis', 'listener', 'postpones', 'reference', 'raw', 'binds', 'observes']).each(Meta.globalTag);(function () {

    var impl = function impl(tag, a, b) {

        if (arguments.length < 3) {

            var listener = $untag(a);

            return _.isFunction(listener) ? Meta.setTag(tag, listener) // $observableProperty (listener)
            : Meta.setTag(tag, true, a); // $observableProperty (value)
        } else {

            var _listener = $untag(b);

            return Meta.setTag(tag, _.isFunction(_listener) ? _listener : true, a); // $observableProperty (value, listener)
        }
    };

    Meta.globalTag('observableProperty', impl);
    Meta.globalTag('observable', impl);
})();

$global.$observableRef = function (x) {
    return $observableProperty($reference(x));
};

$prototype.macro('$depends', function (def, value, name) {
    def.$depends = $builtin($const(_.coerceToArray(value)));
    return def;
});

$prototype.macroTag('extendable', function (def, value, name) {
    def[name] = $builtin($const(value));
    return def;
});

$global.Component = $prototype({

    $defaults: $extendable({}),
    $requires: $extendable({}),
    $macroTags: $extendable({}),

    /*  Overrides default OOP.js implementation
     */
    $impl: {

        sequence: function sequence(def, base) {
            return _.sequence(this.convertPropertyAccessors, this.extendWithTags, this.flatten, this.generateCustomCompilerImpl(base), this.ensureFinalContracts(base), this.generateConstructor(base), this.evalAlwaysTriggeredMacros(base), this.evalMemberTriggeredMacros(base), this.expandTraitsDependencies, this.mergeExtendables(base), this.contributeTraits(base), this.mergeStreams, this.mergeBindables, this.generateBuiltInMembers(base), this.callStaticConstructor, this.expandAliases, this.groupMembersByTagForFastEnumeration, this.defineStaticMembers, this.defineInstanceMembers);
        },

        expandTraitsDependencies: function expandTraitsDependencies(def) {

            if (_.isNonempty($untag(def.$depends)) && _.isEmpty($untag(def.$traits))) {
                def.$traits = DAG.sortedSubgraphOf(def, {
                    nodes: function nodes(def) {
                        return $untag(def.$depends);
                    } });
            };return def;
        },

        mergeExtendables: function mergeExtendables(base) {
            return function (def) {

                _.each(base.$definition, function (value, name) {
                    if ($extendable.is(value)) {
                        def[name] = Meta.modify(value, function (value) {
                            value = _.extendedDeep(value, $untag(def[name] || {}));
                            _.each($untag(def.$traits), function (trait) {
                                if (!trait) {
                                    log.e(def.$traits);
                                    throw new Error('invalid $traits value');
                                }
                                var traitVal = trait.$definition[name];
                                if (traitVal) {
                                    value = _.extendedDeep($untag(traitVal), value);
                                }
                            });
                            return value;
                        });
                    }
                });
                return def;
            };
        },

        mergeTraitsMembers: function mergeTraitsMembers(def, traits) {
            var pool = {},
                bindables = {},
                streams = {};

            var macroTags = $untag(def.$macroTags);
            var definitions = _.pluck(traits, '$definition').concat(_.clone(def));

            _.each(definitions, function (traitDef) {
                _.each(macroTags && this.applyMacroTags(macroTags, _.extend(_.clone(traitDef), {
                    constructor: def.constructor })) || traitDef, function (member, name) {
                    if ($builtin.isNot(member) && $builtin.isNot(def[name]) && name !== 'constructor') {

                        if ($bindable.is(member)) {
                            bindables[name] = member;
                        }
                        if (Component.isStreamDefinition(member)) {
                            streams[name] = member;
                        }
                        (pool[name] || (pool[name] = [])).push(member);def[name] = member;
                    }
                });
            }, this);

            def.__bindables = bindables;
            def.__streams = streams;
            def.__membersByName = pool;
        },

        mergeStreams: function mergeStreams(def) {
            var pool = def.__membersByName;

            _.each(def.__streams, function (stream, name) {

                var clonedStream = def[name] = Meta.new(stream);
                clonedStream.listeners = [];

                _.each(pool[name], function (member) {
                    if (member !== stream) {
                        clonedStream.listeners.push($untag(member));
                    }
                });
            });return def;
        },

        mergeBindables: function mergeBindables(def) {
            var pool = def.__membersByName;

            _.each(def.__bindables, function (member, name) {

                var bound = _.filter2(_.bindable.hooks, function (hook, i) {
                    var bound = pool[_.bindable.hooksShort[i] + name.capitalized];
                    return bound ? [hook, bound] : false;
                });

                if (bound.length) {
                    var hooks = {};

                    _.each(bound, function (kv) {
                        _.each(kv[1], function (fn) {
                            fn = $untag(fn);
                            if (_.isFunction(fn)) {
                                var k = '_' + kv[0];(hooks[k] || (hooks[k] = [])).push(fn);
                            }
                        });
                    });

                    def[name] = $bindable({ hooks: hooks }, member);
                }
            });

            return def;
        }
    },

    /*  Syntax helper
     */
    isStreamDefinition: $static(function (def) {

        var tags = Meta.tags(def);

        return tags.trigger || tags.triggerOnce || tags.barrier || tags.observable || tags.observableProperty;
    }),

    /*  Another helper (it was needed because _.methods actually evaluate $property values while enumerating keys,
        and it ruins most of application code, because it happens before Component is actually created).
     */
    mapMethods: function mapMethods() /* [predicate, ] iterator */{
        var iterator = _.last(arguments),
            predicate = arguments.length === 1 ? _.constant(true) : arguments[0];
        var methods = [];
        for (var k in this) {
            var def = this.constructor.$definition[k];
            if ($property.isNot(def)) {
                var fn = this[k];
                if (_.isFunction(fn) && !_.isPrototypeConstructor(fn) && predicate(def)) {
                    this[k] = iterator.call(this, fn, k, def) || fn;
                }
            }
        }
    },

    enumMethods: function enumMethods(_1, _2) {
        if (arguments.length === 2) {
            this.mapMethods(_1, _2.returns(undefined));
        } else {
            this.mapMethods(_1.returns(undefined));
        }
    },

    /*  Thou shall not override this
     */
    constructor: $final(function (arg1, arg2) {

        this.parent_ = undefined;
        this.children_ = [];

        var cfg = this.cfg = (typeof arg1 === 'undefined' ? 'undefined' : _typeof(arg1)) === 'object' ? arg1 : {},
            componentDefinition = this.constructor.$definition;

        /*  Apply $defaults
         */
        if (this.constructor.$defaults) {
            cfg = this.cfg = _.extend(_.cloneDeep(this.constructor.$defaults), cfg);
        }

        /*  Add thiscall semantics to methods
         */
        this.mapMethods(function (fn, name, def) {
            if (name !== '$' && name !== 'init' && $raw.isNot(def)) {
                return this.$(fn);
            }
        });

        /*  Listen self destroy method
         */
        _.onBefore(this, 'destroy', this._beforeDestroy);
        _.onAfter(this, 'destroy', this._afterDestroy);

        var initialStreamListeners = [];
        var excludeFromCfg = { init: true };

        /*  Expand macros
            TODO: execute this substitution at $prototype code-gen level, not at instance level
         */
        _.each(componentDefinition, function (def, name) {
            var _this = this;

            if (def !== undefined) {

                var member = Meta.unwrap(def);
                var tags = Meta.tags(def);

                /*  Expand $observableProperty
                    TODO: rewrite with $prototype.macro
                 */
                if (tags.observableProperty) {
                    var definitionValue = member;
                    var defaultValue = name in cfg ? cfg[name] : definitionValue;
                    var streamName = name + 'Change';

                    /*  xxxChange stream
                     */
                    var observable = excludeFromCfg[streamName] = this[streamName] = _.observable();
                    observable.context = this;
                    observable.postpones = tags.postpones;

                    /*  auto-coercion of incoming values to prototype instance
                     */
                    if (_.isPrototypeInstance(definitionValue)) {
                        var constructor = definitionValue.constructor;
                        observable.beforeWrite = function (value) {
                            return constructor.isTypeOf(value) ? value : new constructor(value);
                        };
                    }

                    /*  tracking by reference
                     */
                    if (tags.reference) {
                        observable.trackReference = true;
                    }

                    /*  property
                     */
                    _.defineProperty(this, name, {
                        get: function get() {
                            return observable.value;
                        },
                        set: function set(x) {
                            observable.write.call(this, x);
                        } });

                    /*  Default listeners (come from traits)
                     */
                    if (def.listeners) {
                        _.each(def.listeners, function (value) {
                            initialStreamListeners.push([observable, value]);
                        });
                    }

                    /*  Default listener which comes from $observableProperty (defValue, defListener) syntax
                     */
                    if (_.isFunction(tags.observableProperty)) {
                        initialStreamListeners.push([observable, tags.observableProperty]);
                    }

                    /*  write default value
                     */
                    if (defaultValue !== undefined) {
                        observable(defaultValue);
                    }
                }

                /*  Expand streams
                 */
                else if (Component.isStreamDefinition(def)) {
                        var stream = excludeFromCfg[name] = this[name] = _.extend((tags.trigger ? _.trigger : tags.triggerOnce ? _.triggerOnce : tags.observable ? _.observable : tags.barrier ? _.barrier : undefined)(member), { context: this, postpones: tags.postpones });

                        /*  tracking by reference
                         */
                        if (tags.reference) {
                            observable.trackReference = true;
                        }

                        if (def.listeners) {
                            _.each(def.listeners, function (value) {
                                initialStreamListeners.push([stream, value]);
                            });
                        }

                        /*  Default listener which comes from $observable (defValue, defListener) syntax
                         */
                        if (_.isFunction(tags.observable)) {
                            initialStreamListeners.push([stream, tags.observable]);
                        }

                        var defaultListener = cfg[name];
                        if (defaultListener) {
                            if (tags.observable && defaultListener.isObservable) {
                                // two-way observable binding
                                defaultListener.tie(stream);
                            } else {
                                initialStreamListeners.push([stream, defaultListener]);
                            }
                        }
                    }

                /*  Expand $listener (TODO: REMOVE)
                 */
                if (tags.listener) {
                    this[name].queuedBy = [];
                }

                /*  Expand $interlocked
                 */
                if (tags.interlocked) {
                    this[name] = _.interlocked(this[name]);
                }

                /*  Expand $bindable
                 */
                if (tags.bindable) {
                    this[name] = _.extend(_.bindable(this[name], this), _.map2(tags.bindable.hooks || {}, function (hooks) {
                        return _.map(hooks, function (f) {
                            return _this.$(f);
                        });
                    }));
                }
                /*  Expand $debounce
                 */
                if (tags.debounce) {
                    var fn = this[name],
                        opts = _.coerceToObject(tags.debounce);
                    this[name] = fn.debounced(opts.wait || 500, opts.immediate);
                }

                /*  Expand $throttle
                 */
                if (tags.throttle) {
                    var fn = this[name],
                        opts = _.coerceToObject(tags.throttle);
                    this[name] = _.throttle(fn, opts.wait || 500, opts);
                }

                /*  Expand $memoize
                 */
                if (tags.memoize) {
                    this[name] = _.memoize(this[name]);
                } else if (tags.memoizeCPS) {
                    this[name] = _.cps.memoize(this[name]);
                }
            }
        }, this);

        /*  Add before/after stage to init
         */
        var init = this.init;
        this.init = this._beforeInit.then(init.then(this._afterInit)).bind(this);

        /*  Apply cfg thing
         */
        _.each(cfg, function (value, name) {
            if (!(name in excludeFromCfg)) {
                this[name] = _.isFunction(value) ? this.$(value) : value;
            }
        }, this);

        /*  Fixup aliases (they're now pointing to nothing probably, considering what we've done at this point)
         */
        _.each(componentDefinition, function (def, name) {
            if ($alias.is(def) && $raw.isNot(def)) {
                this[name] = this[$untag(def)];
            }
        }, this);

        /*  Check $overrideThis
         */
        /*_.each (componentDefinition, function (def, name) {
            if (def.$overrideThis && this[name] === undefined) {
                throw new Error (name + ' should be overriden') } })*/

        /*  Check $requires (TODO: make human-readable error reporting)
         */
        if (_.hasAsserts) {
            _.each(this.constructor.$requires, function (contract, name) {
                $assertTypeMatches(_.fromPairs([[name, this[name]]]), _.fromPairs([[name, contract]]));
            }, this);
        }

        /*  Subscribe default listeners
         */
        _.each(initialStreamListeners, function (v) {
            v[0].call(this, v[1]);
        }, this);

        /*  Call init (if not marked as deferred)
         */
        if (!(cfg.init === false || this.constructor.$defaults && this.constructor.$defaults.init === false)) {
            var result = this.init();
            if (result instanceof Promise) {
                result.panic;
            }
        }
    }),

    /*  Arranges methods defined in $traits in chains and evals them
     */
    callChainMethod: function callChainMethod(name) {
        var self = this;
        return __.seq(_.filter2(this.constructor.$traits || [], function (Trait) {
            var method = Trait.prototype[name];
            return method && method.bind(self) || false;
        }));
    },

    /*  Lifecycle
     */
    _beforeInit: function _beforeInit() {
        if (this.initialized.already) {
            throw new Error('Component: I am already initialized. Probably you\'re doing it wrong.');
        }

        return this.callChainMethod('beforeInit');
    },

    init: function init() {/* return Promise for asynchronous init */},

    _afterInit: function _afterInit() {
        var cfg = this.cfg,
            self = this;

        return __.then(this.callChainMethod.$('afterInit'), function () {

            self.initialized(true);
            self.alive(true);

            /*  Bind default property listeners. Doing this after init, because property listeners
                get called immediately after bind (observable semantics), and we're want to make
                sure that component is initialized at the moment of call.
                 We do not do this for other streams, as their execution is up to component logic,
                and they're might get called at init, so their default values get bound before init.
             */
            _.each(self.constructor.$definition, function (def, name) {
                if ($observableProperty.is(def)) {
                    name += 'Change';
                    var defaultListener = cfg[name];
                    if (defaultListener) {
                        self[name](defaultListener);
                    }
                }
            });

            return true;
        });
    },

    initialized: $barrier(),
    alive: $observable(false),

    _beforeDestroy: function _beforeDestroy() {
        if (this.destroyed_) {
            throw new Error('Component: I am already destroyed. Probably you\'re doing it wrong.');
        }
        if (this.destroying_) {
            throw new Error('Component: Recursive destroy() call detected. Probably you\'re doing it wrong.');
        }
        this.destroying_ = true;

        _.each(this.constructor.$traits, function (Trait) {
            if (Trait.prototype.beforeDestroy) {
                Trait.prototype.beforeDestroy.call(this);
            }
        }, this);

        this.alive(false);

        /*  Unbind streams
         */
        this.enumMethods(_.off.arity1);

        /*  Destroy children
         */
        _.each(this.children_, _.method('destroy'));
        this.children_ = [];
    },

    destroy: function destroy() {},

    _afterDestroy: function _afterDestroy() {

        _.each(this.constructor.$traits, function (Trait) {
            if (Trait.prototype.destroy) {
                Trait.prototype.destroy.call(this);
            }
            if (Trait.prototype.afterDestroy) {
                Trait.prototype.afterDestroy.call(this);
            }
        }, this);

        delete this.destroying_;
        this.parent_ = undefined;
        this.destroyed_ = true;
    },

    /*  Parent manip.
     */
    attachedTo: $property(function () {
        return this.parent_;
    }),

    attachTo: function attachTo(p) {
        if (p === this) {
            throw new Error('smells like time-travel paradox.. how else can I be parent of myself?');
        }

        if (this.parent_ !== p) {
            if (this.parent_ !== undefined) {
                this.parent_.children_.remove(this);
            }

            if ((this.parent_ = p) !== undefined) {
                this.parent_.children_.push(this);
            }
        }return this;
    },

    detach: function detach() {
        return this.attachTo(undefined);
    },

    /*  Child manip.
     */
    attached: $property(function () {
        return this.children_;
    }),

    attach: function attach(c) {
        _.invoke(_.coerceToArray(c), 'attachTo', this);return this;
    },

    detachAll: function detachAll() {
        _.each(this.children_, function (c) {
            c.parent_ = undefined;
        });
        this.children_ = [];
        return this;
    },

    destroyAll: function destroyAll() {
        _.each(this.children_, function (c) {
            c.parent_ = undefined;c.destroy();
        });
        this.children_ = [];
        return this;
    } });

/***/ }),
/* 158 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./base/concurrency.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = __webpack_require__(/*! underscore */ 5);

/*  Unit test / documentation / specification / how-to.
    ======================================================================== */

_.tests.concurrency = {

    'scope': function scope(testDone) {
        var releases = [],
            acquires = [],
            count = 10;

        var method = $scope(function (release, id, then) {
            acquires.push(id);
            _.delay(function () {
                release(function () {
                    releases.push(id);
                    if (then) then();
                });
            }, 10);
        });

        method(42, function () /* released */{
            $assert(count + 1, acquires.length, releases.length);
            $assert(acquires, releases.reversed);
            testDone();
        });

        _.times(count, function () {
            method(_.random(1000));
        });
    },

    'interlocked': function interlocked() {
        var isNowRunning = false;

        var op = _.interlocked(function (item, i) {
            $assert(!isNowRunning);
            isNowRunning = true;
            return __.delay(_.random(2)).then(function () {
                isNowRunning = false;
            });
        });

        return __.scatter(_.times(15, String.randomHex), op, { maxConcurrency: 10 });
    } };

/*  Mutex/lock (now supports stand-alone operation, and it's re-usable).
 */
$global.Lock = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'acquire',
        value: function acquire(then) {
            var _this = this;

            this.wait(function () {
                if (!_this.waitQueue) {
                    _this.waitQueue = [];
                }
                then();
            });
        }
    }, {
        key: 'acquired',
        value: function acquired() {
            return this.waitQueue !== undefined;
        }
    }, {
        key: 'wait',
        value: function wait(then) {
            if (this.acquired()) {
                this.waitQueue.push(then);
            } else {
                then();
            }
        }
    }, {
        key: 'release',
        value: function release() {
            if (this.waitQueue.length) {
                var queueFirst = this.waitQueue[0];
                this.waitQueue = this.waitQueue.slice(1);
                queueFirst();
            } else delete this.waitQueue;
        }
    }]);

    return _class;
}();

_.interlocked = function (fn) {
    var lock = new Lock(),
        fn = $untag(fn);
    return _.extendWith({
        lock: lock,
        wait: lock.wait.bind(lock) }, function () {
        var _this2 = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new Promise(function (resolve) {
            lock.acquire(function () {
                __.then(fn.apply(_this2, args), function (x) {
                    lock.release();resolve(x);
                });
            });
        });
    });
};
/*  EXPERIMENTAL (TBD)
 */
$global.$scope = function (fn) {
    var releaseStack = undefined;

    return _.argumentPrependingWrapper(Meta.unwrap(fn), function ( /* acquire */fn) {

        var released = { when: undefined };
        (releaseStack = releaseStack || []).push(released);

        fn(function ( /* release */then) {
            if (released.when) throw new Error('$scope: release called twice');
            released.when = then;
            while (releaseStack && releaseStack.last && releaseStack.last.when) {
                var trigger = releaseStack.last.when;
                if ((releaseStack = _.initial(releaseStack)).isEmpty) {
                    releaseStack = undefined;
                }
                trigger();
            }
        });
    });
};

/***/ }),
/* 159 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./base/dynamic/bindable.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  Interceptable/observable methods
    ======================================================================== */

/*  TODO: rewrite test
 */
_.deferTest('bindable', function () {

    /*  Test subject
     */
    var obj = {
        plusOne: function plusOne(x) {
            return x + 1;
        },

        innocentMethod: function innocentMethod(x) {
            return x;
        } };

    $assertEveryCalled(function (before__1, after__1, intercept__2, secondIntercept__1, bindable__1, infixBefore__1) {

        /*  That's how you observe method calls
         */
        _.onBefore(obj, 'plusOne', function (x) {
            before__1();$assert(x === 7);
        });
        _.onAfter(obj, 'plusOne', function (x, result) {
            after__1();$assert([x, result], [7, 8]);
        });

        $assert(obj.plusOne(7), 8);

        /*  That's how you intercept method calls
         */
        _.intercept(obj, 'innocentMethod', function (x, method) {
            intercept__2();
            return method(x + 1) * 2;
        });

        $assert(obj.innocentMethod(42), (42 + 1) * 2);

        /*  Consequent interceptors wrap-up previous ones
         */
        _.intercept(obj, 'innocentMethod', function (x, method) {
            secondIntercept__1();
            $assert(method(x), (42 + 1) * 2);
            return 'hard boiled shit';
        });

        $assert(obj.innocentMethod(42), 'hard boiled shit');

        /*  Test infix calls
         */
        var method = _.bindable(function (x) {
            bindable__1();$assert(x === 42);
        });
        method.onBefore(function (x) {
            infixBefore__1();$assert(x === 42);
        });
        method(42);
    });

    /*  Test 'once' semantics
     */
    var obj2 = { plusOne: function plusOne(x) {
            return x + 1;
        } };

    $assertEveryCalledOnce(function (beforeCalled, afterCalled) {

        var before = function before(x) {
            beforeCalled();$assert(x === 7);
        };
        var after = function after(x, result) {
            afterCalled();$assert([x, result], [7, 8]);
        };

        _.times(2, function () {
            _.onceBefore(obj, 'plusOne', before);
            _.onceAfter(obj, 'plusOne', after);
        });

        $assert(obj.plusOne(7), 8);
        $assert(obj.plusOne(7), 8);
    });

    /*  Test unbinding
     */
    $assertEveryCalled(function (afterCalled__1, shouldNotCall__0) {
        var method = _.bindable(function () {});

        /*  Unbind specific delegate
         */
        method.onBefore(shouldNotCall__0);
        method.onAfter(afterCalled__1);
        method.off(shouldNotCall__0);
        method();

        /*  Unbind everything
         */
        method.onBefore(shouldNotCall__0);
        method.onAfter(shouldNotCall__0);
        method.off();
        method();
    });
}, function () {

    /*  Internal impl
     */
    var hooks = ['onceBefore', 'onceAfter', 'onBefore', 'onAfter', 'intercept'];
    var hooksShort = ['onceBefore', 'onceAfter', 'before', 'after', 'intercept'];

    var copyHooks = function copyHooks(from, to) {
        _.extend(to, _.map2(_.pick(from, hooks), _.clone));
    };

    var makeBindable = function makeBindable(obj, targetMethod) {
        var method = obj[targetMethod];
        return _.isBindable(method) ? method : obj[targetMethod] = _.bindable(method);
    };

    var hookProc = function hookProc(name) {
        return function (obj, targetMethod, delegate) {
            var bindable = makeBindable(obj, targetMethod);
            return bindable[name].call(bindable, delegate);
        };
    };

    var mixin = function mixin(method, context) {
        if (typeof method !== 'function') {
            throw new Error('method should be a function');
        }

        return _.extend({}, method, {

            _bindable: true,
            impl: method,
            _wrapped: method,
            context: context,
            off: function off(delegate) {
                _.each(hooks, function (hook) {
                    if (delegate) {
                        this['_' + hook].remove(delegate);
                    } else {
                        this['_' + hook].removeAll();
                    }
                }, this);return this;
            } },

        /*  .onBefore, .onAfter, .intercept (API methods)
         */
        _.fromPairs(_.map(hooks, function (name) {
            var queueName = '_' + name;
            var once = name.indexOf('once') >= 0;

            return [name, function (fn) {
                if (!_.isBindable(this)) {
                    throw new Error('wrong this');
                }

                var queue = this[queueName];
                if (!once || queue.indexOf(fn) < 0) {
                    this[queueName].push(fn);
                }

                return this;
            }];
        })),

        /*  ._onBefore, ._onAfter, ._intercept (queues)
         */
        _.fromPairs(_.map(hooks, function (name) {
            return ['_' + name, []];
        })));
    };

    /*  Public API
     */
    _.extend(_, _.mapValues(_.invert(hooks), hookProc.flip2), {

        unbind: function unbind(obj, targetMethod, delegate) {
            var method = obj[targetMethod];
            if (method && method.off) {
                method.off(delegate);
            }
        },

        isBindable: function isBindable(fn) {
            return fn && fn._bindable ? true : false;
        },

        bindable: _.extendWith({ hooks: hooks, hooksShort: hooksShort }, function (method, context) {

            return _.withSameArgs(method, _.extendWith(mixin(method, context), function wrapper() {

                var onceBefore = wrapper._onceBefore;
                var onceAfter = wrapper._onceAfter;
                var before = wrapper._onBefore;
                var after = wrapper._onAfter;
                var intercept = wrapper._intercept;
                var this_ = context || this;
                var i,
                    ni = undefined;

                /*  Call onceBefore
                 */

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                if (onceBefore.length) {
                    for (i = 0, ni = onceBefore.length; i < ni; i++) {
                        onceBefore[i].apply(this_, args);
                    }
                    onceBefore.removeAll();
                }

                /*  Call before
                 */
                for (i = 0, ni = before.length; i < ni; i++) {
                    before[i].apply(this_, args);
                }

                /*  Call intercept
                 */
                var result = (intercept.length ? _.cps.compose([method].concat(intercept)) : method).apply(this_, args); // @hide

                if (after.length || onceAfter.length) {
                    var newArgs = args.concat(result);

                    /*  Call after
                     */
                    for (i = 0, ni = after.length; i < ni; i++) {
                        after[i].apply(this_, newArgs);
                    }

                    /*  Call onceAfter
                     */
                    if (onceAfter.length) {
                        var arr = onceAfter.copy;
                        onceAfter.removeAll();
                        for (i = 0, ni = arr.length; i < ni; i++) {
                            arr[i].apply(this_, newArgs);
                        }
                    }
                }

                return result;
            }));
        }) });
});

/***/ }),
/* 160 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/dynamic/stream.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  Generic functional primitives for dynamic code binding
    ======================================================================== */

_.tests.stream = {

    'triggerOnce': function triggerOnce() {
        $assertEveryCalledOnce(function (mkay) {
            var t = _.triggerOnce();
            var f = function f(_321) {
                $assert(_321 === 321);mkay();
            };
            t(f);
            t(f);
            t(321);
            t(123);
        });
    },

    'observable': function observable() {

        /*  Should accept value as constructor, it should be accessible by .value property
         */
        var initedWithValue = _.observable(555);
        $assert(initedWithValue.value, 555);

        /*  Should call with current value when upon binding
         */
        $assertEveryCalledOnce(function (mkay) {
            var valueChanged = _.observable();
            valueChanged(999);
            valueChanged(function (_999) {
                $assert(_999, 999);mkay();
            });
        });

        /*  Should call previously bound callback if changed
         */
        $assertEveryCalled(function (mkay__3) {
            var valueChanged = _.observable();
            valueChanged(mkay__3);
            valueChanged(123);
            valueChanged(345);
            valueChanged(567);
        });

        /*  Should pass last distinct value as argument to callbacks, not calling if its not changed
         */
        $assertEveryCalledOnce(function (mkay) {
            var valueChanged = _.observable();
            valueChanged(function (_111) {
                $assert(111, _111);
                mkay();
            });
            valueChanged(111);
            valueChanged(111);
        });

        /*  Should pass previous value as second argument
         */
        $assertEveryCalledOnce(function (mkay) {
            var valueChanged = _.observable(444);
            valueChanged(function (_666, _444) {
                if (_444) {
                    $assert([_666, _444], [666, 444]);mkay();
                }
            });
            valueChanged(666);
        });
    },

    'observable.when': function observableWhen() {

        $assertEveryCalledOnce(function (mkay) {
            var value = _.observable(234);
            value.when(234, function () {
                mkay();
            });
        }); // passing constant should work

        $assertEveryCalledOnce(function (mkay) {
            var value = _.observable();
            value.when(_.equals(432), function () {
                mkay();
            });
            value(432);
            value(234);
        });

        $assertNotCalled(function (mkay) {
            var value = _.observable();
            value.when(_.equals(432), function () {
                mkay();
            });
            value(7);
        });
    },

    'once': function once() {
        $assertEveryCalledOnce(function (mkay) {

            var whenSomething = _.trigger();
            whenSomething.once(mkay);
            whenSomething.once(mkay);
            whenSomething();
            whenSomething();
        });
    },

    '_.gatherChanges': function _GatherChanges() {

        var valueA = _.observable(),
            valueB = _.observable(),
            changes = [];

        _.gatherChanges(valueA, valueB, function (a, b) {
            changes.push([a, b]);
        });

        valueA(123);
        valueB(777);

        $assert(changes, [[123, undefined], [123, 777]]);
    },

    'context': function context() {
        var trigger = _.extend(_.trigger(), { context: 42 });

        trigger(function () {
            $assert(this, 42);
        });
        trigger();
    },

    '_.off (bound)': function _OffBound() {
        var react = function react() {
            $fail;
        };
        var act = _.trigger(react);
        _.off(react);
        act();
    },

    '_.off (stream)': function _OffStream() {
        var fail = function fail() {
            $fail;
        };
        var act = _.trigger(fail);
        _.off(act);
        act();
    },

    '_.barrier (defaultListener)': function _BarrierDefaultListener() {
        $assertEveryCalled(function (mkay) {
            _.barrier(function () {
                mkay();
            })();
        });
    },

    /*  Need to rewrite it for clariy
     */
    'all shit': function allShit() {

        var obj = {
            somethingReady: _.barrier(),
            whenSomething: _.trigger() };

        /*  Test conventional semantics (1:1 multicast)
         */
        $assertEveryCalled(function (mkay1__2, mkay2__2) {

            obj.whenSomething(mkay1__2); // that's how you bind
            obj.whenSomething(mkay2__2);

            obj.whenSomething(); // that's how you trigger it
            obj.whenSomething();
        });

        /*  Test unbinding
         */
        $assertEveryCalledOnce(function (shouldCall) {

            var whenSomething = _.trigger();

            var shouldBeCalled = function shouldBeCalled() {
                shouldCall();
            },
                shouldNotBeCalled = function shouldNotBeCalled() {
                $fail;
            };

            whenSomething(shouldBeCalled);
            whenSomething(shouldNotBeCalled);
            whenSomething.off(shouldNotBeCalled); // that's how you unbind specific listeners
            whenSomething();
        });

        /*  Test 'barrier' semantics + test argument passing
         */
        $assertEveryCalledOnce(function (mkay1, mkay2) {

            obj.somethingReady(function (x) {
                $assert(x === 'foo'); // you may pass arguments to callbacks
                obj.somethingReady(x); // should not call anything
                mkay1();
            });

            obj.somethingReady(function (x) {
                $assert(x === 'foo');
                mkay2();
            });

            obj.somethingReady('foo');
        }); // that's how you trigger it (may pass arguments)
        obj.somethingReady('bar'); // should not call anything
    },

    'call order consistency': function callOrderConsistency(done) {

        var abc = '';
        var put = function put(x) {
            return _.barrier(function () {
                abc += x;
            });
        };
        var a = put('a'),
            b = put('b'),
            c = put('c');

        var barr = _.barrier();
        barr(a)(function () {
            barr.postpones = true;barr(c);barr.postpones = false;
        })(b); // C is bound after B, so it should be executed after B
        barr(true);

        _.allTriggered([a, b, c], function () {
            $assert(abc, 'abc');done();
        });
    },

    '_.barrier reset': function _BarrierReset() {
        var b = _.barrier();

        b('not_42');
        b.reset();

        $assertEveryCalledOnce(function (mkay) {
            b(function (value) {
                mkay();$assert(value, 42);
            });
            b(42);
        });
    },

    '_.barrier (value)': function _BarrierValue() {
        $assertEveryCalledOnce(function (mkay) {
            var willBe42 = _.barrier(42);
            $assert(willBe42.already);
            willBe42(function (_42) {
                $assert(_42, 42);mkay();
            });
        });
    },

    'observable.item': function observableItem() {

        var items = _.observable({ foo: 7, bar: 8 });
        var foo = items.item('foo');
        var bar = items.item('bar');

        $assert(foo, items.item('foo')); // should be same cached observable
        $assert(foo.value, 7);
        $assert(bar.value, 8);

        foo(77);

        $assert(foo.value, 77);
        $assert(items.value, { foo: 77, bar: 8 });

        items({ bar: 88 });

        $assert(foo.value, undefined);
        $assert(bar.value, 88);
        $assert(items.value, { bar: 88 });
    },

    'postpone works with _.trigger (regression)': function postponeWorksWith_TriggerRegression(done) {

        _.trigger(done).postpone();
    }
};

_.extend(_, {

    gatherChanges: function gatherChanges() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var observables = _.isArray(args[0]) ? args[0] : _.initial(args);
        var accept = _.last(args);
        var gather = function gather(value) {
            accept.apply(this, _.pluck(observables, 'value'));
        };

        _.each(observables, function (read) {
            read(gather);
        });
    },

    allTriggered: function allTriggered(triggers, then /* deprecated */) {

        return Promise.all(triggers.map(function (t) {
            return t.promise;
        })).then(then);
    },


    observableRef: function observableRef() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _.extend(_.observable.apply(this, args), { trackReference: true });
    },

    observable: function observable() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        var value = args[0];
        var stream = _.stream({

            isObservable: true,
            hasValue: args.length > 0,
            value: _.isFunction(value) ? undefined : value,

            read: function read(schedule) {
                return function (returnResult) {
                    if (stream.hasValue) {
                        returnResult.call(this, stream.value);
                    }
                    schedule.call(this, returnResult);
                };
            },

            write: function write(returnResult) {
                return function (value) {

                    if (stream.beforeWrite) {
                        value = stream.beforeWrite(value);
                    }

                    if (!stream.hasValue || !(stream.trackReference ? stream.value === value : _.isEqual(stream.value, value))) {

                        var prevValue = stream.value;
                        var hadValue = stream.hasValue;

                        stream.hasValue = true;
                        stream.value = value;

                        if (hadValue) {
                            returnResult.call(this, false /* flush */, stream.value, prevValue);
                        } else {
                            returnResult.call(this, false /* flush */, stream.value);
                        }
                    }
                };
            } });

        if (args.length) {
            stream.apply(this, args);
        }

        return _.extend(stream, {

            force: function force(value) {
                stream.hasValue = false;
                stream(arguments.length ? value : stream.value);
            },

            then: function then(fn) {
                var next = _.observable();
                next.beforeWrite = fn;
                stream(function (x) {
                    next.write(x);
                });
                return next;
            },

            toggle: function toggle() {
                return stream(!stream.value);
            },

            tie: function tie(other) {

                stream(other);
                other(stream);

                return stream;
            },

            item: function item(id) {

                var all = stream.itemObservables || (stream.itemObservables = {});
                var item = all[id];
                if (!item) {
                    item = all[id] = _.observable((stream.value && stream.value)[id]);

                    item(function (x) {
                        var oldValue = stream.value && stream.value[x];
                        if (oldValue !== x) {
                            (stream.value || (stream.value = {}))[id] = x;
                            stream.force();
                        }
                    });

                    stream(function (items) {
                        item.write(items[id]);
                    });
                }

                return item;
            },

            when: function when(match, then) {
                var matchFn = _.isFunction(match) ? match : _.equals(match),
                    alreadyCalled = false;
                stream(function callee() {
                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                        args[_key4] = arguments[_key4];
                    }

                    if (matchFn(args[0])) {
                        if (!alreadyCalled) {
                            alreadyCalled = true;
                            stream.off(callee);
                            then.apply(this, args);
                        } else {
                            /* log.w ('WTF') */}
                    }
                });
            } });
    },

    barrier: function barrier(defaultValue) {
        var defaultListener = undefined;

        if (_.isFunction(defaultValue)) {
            defaultListener = defaultValue;
            defaultValue = undefined;
        }

        var barrier = _.stream({
            already: defaultValue !== undefined,
            value: defaultValue,

            reset: function reset() {
                barrier.already = false;
                delete barrier.value;
            },

            write: function write(returnResult) {
                return function (value) {
                    if (!barrier.already) {
                        barrier.already = true;
                        barrier.value = value;
                    }

                    returnResult.call(this, true /* flush schedule */, barrier.value);
                };
            },

            read: function read(schedule) {
                return function (returnResult) {
                    if (barrier.already) {
                        (barrier.postpones || barrier.commitingReads ? // solves problem outlined in 'call order consistency' test
                        returnResult.postponed : returnResult).call(this, barrier.value);
                    } else {
                        schedule.call(this, returnResult);
                    }
                };
            } });

        if (defaultListener) {
            barrier(defaultListener);
        }

        return barrier;
    },

    triggerOnce: $restArg(function () {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        var stream = _.stream({
            read: function read(schedule) {
                return function (listener) {
                    if (stream.queue.indexOf(listener) < 0) {
                        schedule.call(this, listener);
                    }
                };
            },
            write: function write(writes) {
                return writes.partial(true);
            } }).apply(this, args);return stream;
    }),

    trigger: $restArg(function () {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        return _.stream({
            read: _.identity,
            write: function write(writes) {
                return writes.partial(false);
            } }).apply(this, args);
    }),

    off: function off() {
        var fn = arguments.length <= 0 ? undefined : arguments[0],
            what = arguments.length <= 1 ? undefined : arguments[1];

        if (fn.queue) {
            if (arguments.length === 1) {
                fn.queue.off();
            } else {
                fn.queue.off(what);
            }
        }
        if (fn.queuedBy) {
            _.each(fn.queuedBy, function (queue) {
                queue.remove(fn);
            });
            delete fn.queuedBy;
        }
    },

    stream: function stream(cfg_) {

        var cfg = cfg_ || {};
        var queue = _.extend([], { off: function off() {
                var fn = arguments.length <= 0 ? undefined : arguments[0];

                if (this.length) {
                    if (arguments.length === 0) {
                        _.each(this, function (fn) {
                            fn.queuedBy.remove(this);
                        }, this);
                        this.removeAll();
                    } else {
                        if (fn.queuedBy) {
                            fn.queuedBy.remove(this);
                            this.remove(fn);
                        }
                    }
                }
            } });

        var self = undefined;

        var scheduleRead = function scheduleRead(fn) {
            if (queue.indexOf(fn) < 0) {
                if (fn.queuedBy) {
                    fn.queuedBy.push(queue);
                } else {
                    fn.queuedBy = [queue];
                }
                queue.push(fn);
            }
        };

        var commitPendingReads = function commitPendingReads(flush) {
            var context = self.context || this,
                schedule = queue.copy;

            if (flush) {
                queue.off();
            }

            self.commitingReads = true;

            for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                args[_key7 - 1] = arguments[_key7];
            }

            for (var i = 0, n = schedule.length; i < n; i++) {
                (self.postpones ? schedule[i].postponed : schedule[i]).apply(context, args);
            }

            delete self.commitingReads;
        };

        var write = cfg.write(commitPendingReads);
        var read = cfg.read(scheduleRead);

        /*  I/O API (two-way)
         */
        var frontEnd = function frontEnd() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            var fn = args[0];

            if (_.isFunction(fn)) {
                read.call(this, fn);
            } else {
                write.apply(this, args);
            }

            return frontEnd;
        };

        /*  Once semantics
         */
        var once = function once(then) {
            if (!_.find(queue, function (f) {
                return f.onceWrapped_ === then;
            })) {
                read(_.extend(function callee(v) {
                    _.off(self, callee);then(v);
                }, { onceWrapped_: then }));
            }
        };

        /*  Constructor
         */
        self = _.extend($restArg(frontEnd), cfg, {
            queue: queue,
            once: once,
            off: _.off.asMethod,
            read: read,
            write: write,
            postpone: function postpone() {
                for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                    args[_key9] = arguments[_key9];
                }

                self.postponed.apply(self.context, args);
            }
        });

        _.defineProperty(self, 'promise', function () {
            return new Promise(function (resolve) {
                return self(resolve);
            });
        });

        return self;
    }
});

/*  Observable.map (experimental)
    ======================================================================== */

_.deferTest(['stream', 'observable.map'], function () {

    /*  General semantics   */

    var foo = _.observable('foo'),
        bar = _.observable('bar');

    var fooBar = _.observable.map([foo, bar], _.appends('42'));

    var results = [];

    fooBar(function (value) {
        results.push(value.copy);
    });

    $assert(results, [['foo42', 'bar42']]);

    foo('qux');
    bar('zap');

    $assert(results, [['foo42', 'bar42'], ['qux42', 'bar42'], ['qux42', 'zap42']]);

    /*  Works over objects  */

    _.observable.map({ 'foo': _.observable('bar') })(function (obj) {
        $assert({ 'foo': 'bar' }, obj);
    });
}, function () {

    _.observable.map = function (obj, fn) {
        fn = fn || _.identity;

        var value = _.isArray(obj) ? new Array(obj.length) : {};
        var result = _.observable(value);

        _.each(obj, function (read, i) {
            read(function (x) {
                value[i] = fn(x, i);result.force(value);
            });
        });

        return result;
    };

    _.observable.all = _.observable.map;
});

/***/ }),
/* 161 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./base/http.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*  ------------------------------------------------------------------------ */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = __webpack_require__(/*! underscore */ 5);
var O = Object;

/*  ------------------------------------------------------------------------ */

if (!$global.XMLHttpRequest) {
    $global.XMLHttpRequest = __webpack_require__(/*! xhr2 */ 388);
}

/*  ------------------------------------------------------------------------ */

$global.Http = $singleton(Component, {

    /*  You can re-use the HttpMethods trait to build API-specific layers over Http */

    $traits: [$global.HttpMethods = $trait({
        get: function get(path, cfg) {
            return this.request('GET', path, cfg);
        },
        post: function post(path, cfg) {
            return this.request('POST', path, cfg);
        },
        loadFile: function loadFile(path, cfg) {
            return this.request('GET', path, { responseType: 'arraybuffer' });
        },
        uploadFile: function uploadFile(path, file, cfg) {
            return this.post(path, _.extend2({
                data: file,
                headers: {
                    'Content-Type': 'binary/octet-stream',
                    'X-File-Name': Parse.fileName(file.name || 'file').transliterate || 'file',
                    'X-File-Size': file.size,
                    'X-File-Type': file.type } }, cfg));
        }
    })],

    request: function request(type, path, cfg_) {
        var cfg = cfg_ || {};

        /*  Local state (will be initialized at Promise construction) */

        var xhr = void 0,
            abort = void 0;
        var _progress = _.observable(0);

        if (cfg.progress) {
            _progress(cfg.progress);
        }

        /*  returned Promise     */

        var p = new Promise(function (resolve, reject) {

            var prePath = $platform.Browser && (cfg.protocol || cfg.hostname || cfg.port) ? (cfg.protocol || window.location.protocol) + '//' + (cfg.hostname || window.location.hostname) + ':' + (cfg.port || window.location.port) : '';

            /*  Init XMLHttpRequest
             */
            xhr = new XMLHttpRequest();
            xhr.open(type, prePath + path, true);

            /*  Set to 'arraybuffer' to receive binary data
             */
            if (cfg.responseType) xhr.responseType = cfg.responseType;

            /*  Set headers
             */
            _.each(cfg.headers, function (value, key) {
                xhr.setRequestHeader(key, value);
            });

            /*  Bind events
             */
            xhr.onprogress = Http.progressCallbackWithSimulation(_progress);
            xhr.onload = xhr.onerror = function () {

                if (cfg.progress) {
                    cfg.progress(1);
                }

                var response = xhr.responseType === 'arraybuffer' ? xhr.response : xhr.responseText;

                if (xhr.status === 200) {
                    resolve(response);
                } else {
                    reject(_.extend(new Error(xhr.statusText), {
                        httpResponse: response,
                        httpStatus: xhr.status }));
                }
            };

            /*  Set up the abort method
             */
            abort = function abort() {
                xhr.abort();
                reject('aborted');
            };

            /*  Send
             */
            if (cfg.data) {
                xhr.send(cfg.data);
            } else {
                xhr.send();
            }
        });

        /*  Publish some additional methods as properties of the returned Promise */

        return _.extend(p, {

            abort: abort,
            progress: function progress(accept) {
                _progress(accept);return this;
            }
        });
    },
    progressCallbackWithSimulation: function progressCallbackWithSimulation(accept) {
        var simulated = 0;

        accept(0);
        return function (e) {
            if (e.lengthComputable) {
                accept(e.loaded / e.total);
            } else {
                accept(simulated = (simulated += 0.1) > 1 ? 0 : simulated);
            }
        };
    }
});

/*  An example of custom API layer over Http:

    1.  Converts request I/O to JSON
    2.  Interprets { success: true/false, value: ... } semantics
    3.  Adds cross-machine exception throwing
    
    ------------------------------------------------------------------------ */

$global.JSONAPI = $singleton(Component, {

    $traits: [HttpMethods],

    request: function request(type, path, cfg_) {

        var isAbsolutePath = /^[^\/]*:/.test(path);

        var cfg = _.extend2({ headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json; charset=utf-8' } }, cfg_);

        if (cfg.what) {
            cfg.data = JSON.stringify(cfg.what);
        }

        var stackBeforeCall = _.hasReflection && new StackTracey(); // @hide 

        return Http.request(type, isAbsolutePath ? path : '/api/' + path, cfg).finally(function (e, response) {

            if (response) {
                return JSON.parse(response);
            } else if (e) {
                if (e.httpResponse) {
                    return JSON.parse(e.httpResponse);
                } else {
                    throw e;
                }
            } else {
                throw new Error('empty response');
            }
        }).then(function (response) {

            if (response.success) {
                return response.value;
            } else {

                if (response.parsedStack) {

                    var fieldName = typeof Symbol !== 'undefined' ? Symbol.for('StackTracey') : '__StackTracey';
                    var joinedStack = response.parsedStack.map(function (e) {
                        return O.assign(e, { file: '/api/source/' + e.file });
                    }).concat(stackBeforeCall || []);

                    throw O.assign(new Error('SERVER: ' + response.error), _defineProperty({
                        remote: true
                    }, fieldName, joinedStack));
                } else {
                    throw new Error(response.error);
                }
            }
        });
    }
});

/***/ }),
/* 162 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./base/infix/Array.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  Array extensions
    ======================================================================== */

_.withTest('Array extensions', function () {

    var arr = [1, 3, 2, 3, 3, 4, 3];

    $assert([arr.first, arr.second, arr.top, arr.last], [1, 3, 3, 3]);
    $assert(arr.rest, [3, 2, 3, 3, 4, 3]);

    $assert(arr.take(4), [1, 3, 2, 3]);

    $assert([arr.contains(4), arr.contains(9)], [true, false]);

    $assert(arr.lastIndex, 6);

    $assert(arr.copy, arr);
    $assert(arr.copy !== arr);

    $assert(arr.remove(3), [1, 2, 4]); // it is fast
    $assert(arr, [1, 2, 4]); // and mutates original (thats why fast)
    // for immutable version, use underscore's _.without

    $assert(arr.removeAll(), []);
    $assert(arr, []);

    $assert(['a', 'b', 'c'].removeAt(1), ['a', 'c']); // NOTE: mutates original
    $assert(['a', 'c'].insertAt('b', 1), ['a', 'b', 'c']); // NOTE: mutates original

    $assert([0, 1, 2].itemAtWrappedIndex(4) === 1);
    $assert([0, 1, 2].itemAtWrappedIndex(-1) === 2);
    $assert([0, 1, 2].itemAtWrappedIndex(-5) === 1);

    arr = [1, 2, 3];
    $assert(arr.reversed, [3, 2, 1]);
    $assert(arr, [1, 2, 3]); // does not mutate original (in contrary to .reverse)

    $assert([[1], [[2], 3], 4].flat, [1, [2], 3, 4]);
    $assert([[1, 2, 3], [4, 5, 6]].zip(_.sum), [5, 7, 9]);

    $assert(['a', 'b', 'c'].swap(1, 2), ['a', 'c', 'b']); // NOTE: mutates original

    $assert([1].random === 1); // returns random item from array
    $assert([].random === undefined);

    $assert([{ foo: 'bar' }, { foo: 'qux' }].pluck('foo'), ['bar', 'qux']);
}, function () {

    /*  TODO: rewrite using new $mixin facility
     */
    $extensionMethods(Array, {

        each: _.each,
        map: _.map,
        fold: _.reduce2,
        reduce: _.reduce,
        reduceRight: _.reduceRight,
        zip: _.zipWith,
        groupBy: _.groupBy,
        indexBy: _.indexBy,
        find: _.find,
        findWhere: $method(_.findWhere),
        filter: _.filter,
        reject: $method(_.reject),
        flat: _.flatten.tails2(true),
        object: _.fromPairs,
        shuffle: _.shuffle,
        unique: _.unique.arity1,
        nonempty: _.nonempty,
        pluck: $method(_.pluck),
        without: $method(_.without),

        contains: function contains(arr, item) {
            return arr.indexOf(item) >= 0;
        },

        top: function top(arr) {
            return arr[arr.length - 1];
        },
        first: function first(arr) {
            return arr[0];
        },
        second: function second(arr) {
            return arr[1];
        },
        rest: function rest(arr) {
            return arr.slice(1);
        },
        last: function last(arr) {
            return arr[arr.length - 1];
        },

        /*  TODO: refactor
         */
        take: function take(arr, n) {
            return arr.slice(0, n);
        },
        takeAt: $method(function (arr, n) {
            var i = typeof n == 'number' ? n : arr.findIndex(n);
            return i !== -1 ? arr.splice(i, 1).first : undefined;
        }),
        lastN: $method(_.last),

        before: function before(arr, x) {
            var i = arr.indexOf(x);return i < 0 ? arr : arr.slice(0, i - 1);
        },
        after: function after(arr, x) {
            var i = arr.indexOf(x);return i < 0 ? arr : arr.slice(i + 1);
        },

        isEmpty: function isEmpty(arr) {
            return arr.length === 0;
        },
        notEmpty: function notEmpty(arr) {
            return arr.length > 0;
        },

        lastIndex: function lastIndex(arr) {
            return arr.length - 1;
        },

        random: function random(arr) {
            return arr[_.random(0, arr.lastIndex)];
        },

        copy: function copy(arr) {
            return arr.slice(0);
        },

        removeAll: $method(function (arr) {
            return arr.splice(0, arr.length), arr;
        }),

        remove: function remove(arr, item) {
            var i;while ((i = arr.indexOf(item)) !== -1) {
                arr.splice(i, 1);
            }return arr;
        },

        removeAt: function removeAt(arr, index) {
            arr.splice(index, 1);return arr;
        },

        insertAt: function insertAt(arr, item, index) {
            arr.splice(index, 0, item);return arr;
        },

        itemAtWrappedIndex: function itemAtWrappedIndex(arr, i) {
            return arr[i < 0 ? arr.length - -i % arr.length : i % arr.length];
        },

        reversed: function reversed(arr) {
            return arr.slice().reverse();
        },

        swap: $method(function (arr, indexA, indexB) {
            var a = arr[indexA],
                b = arr[indexB];
            arr[indexA] = b;
            arr[indexB] = a;
            return arr;
        }) });
});

/***/ }),
/* 163 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/infix/Function.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  Function extensions
    ======================================================================== */

_.tests.Function = {

    '$ for partial application': function $ForPartialApplication() {

        var sum = function sum(a, b) {
            return a + b;
        };

        $assert(sum.$('foo')('bar'), 'foobar'); // bind to head of argument list
        $assert(sum.$$('foo')('bar'), 'barfoo');
    }, // bind to tail of argument list

    'Fn.callsWith': function FnCallsWith() {
        $assert(42, function (a, b, c) {
            $assert([a, b, c], [1, 2, 3]);return 42;
        }.callsWith(1, 2)(3));
    },

    /*  Converts regular function (which returns result) to CPS function (which passes result to 'then')
     */
    'asContinuation': function asContinuation() {
        $assertEveryCalled(function (mkay__2) {

            var twoPlusTwo = function twoPlusTwo() {
                return 2 + 2;
            };
            var shouldBeFour = function shouldBeFour(result) {
                $assert(result == 4);
                mkay__2();
            };

            twoPlusTwo.asContinuation(shouldBeFour);
            _.asContinuation(twoPlusTwo)(shouldBeFour);
        });
    },

    /*  Postpones execution
     */
    'postpone': function postpone(testDone) {
        $assertEveryCalledOnce($async(function (mkay1, mkay2) {
            var testSecondCall = false;
            var callMeLater = function callMeLater() {
                if (testSecondCall) {
                    mkay2();
                    testDone();
                } else {
                    mkay1();
                    testSecondCall = true;
                    callMeLater.postpone();
                }
            }; // should be postponed again
            callMeLater.postpone();
            callMeLater.postpone();
        }));
    }, // should not trigger double call

    'postponed': function postponed(testDone) {
        $assertEveryCalledOnce($async(function (mkay) {
            (function (_42) {
                $assert(this, 'foo');
                $assert(42, _42);mkay();
            }).postponed.call('foo', 42);
        }), testDone);
    },

    'postponed args': function postponedArgs(done) {

        var xs = [];
        var f = function f(x) {
            xs.push(x);
        };

        f.postponed(42);
        f.postponed(43);

        _.delay(function () {
            $assert(xs, [43]);done();
        }, 1);
    },

    /*  Returns function that executed after _.delay
     */
    'delayed': function delayed(testDone) {
        var eat42 = function eat42(_42, then) {
            $assert(_42, 42);then();
        };
        var eat42_after5ms = eat42.delayed(5);

        $assertEveryCalledOnce($async(function (mkay) {
            eat42_after5ms(42, function () {
                mkay();
            });
        }), testDone);
    } };

/*  Impl.
 */
$extensionMethods(Function, {

    $: $method(_.partial), // binding to head of argument list
    $$: $method(_.tails), // binding to tail of argument list

    bind: _.bind,
    partial: _.partial,
    calls: _.bind,
    tails: _.tails,
    tails2: _.tails2,
    tails3: _.tails3,
    applies: _.applies,
    compose: _.compose,
    then: _.then,
    with: _.flipN,
    flip2: _.flip2,
    flip3: _.flip3,
    asFreeFunction: _.asFreeFunction,
    asMethod: _.asMethod,

    callsWith: _.callsTo,
    tailsWith: _.tailsTo,

    higherOrder: _.higherOrder,

    returns: function returns(fn, _returns) {
        return function () {
            fn.apply(this, arguments);return _returns;
        };
    },

    asContinuation: function asContinuation(f) {
        return $restArg(function () {
            _.last(arguments)(f.apply(this, _.initial(arguments)));
        });
    },

    wraps: function wraps(f, w) {
        f._wrapped = _.withSameArgs(f, w);return f;
    },
    wrapped: function wrapped(f) {
        return f._wrapped || f;
    },

    arity0: _.arity0,
    arity1: _.arity1,
    arity2: _.arity2,
    arity3: _.arity3,

    or: _.or,
    and: _.and,
    not: _.not,

    new: _.higherOrder(_.new),

    each: function each(fn, obj) {
        return _.each2(obj, fn);
    },
    map: function map(fn, obj) {
        return _.map2(obj, fn);
    },

    oneShot: function oneShot(fn) {
        var called = false;
        return function () {
            if (!called) {
                called = true;return fn.apply(this, arguments);
            }
        };
    },

    memoized: _.memoize,
    throttled: _.throttle,

    debounced: function debounced(func, wait, immediate) {

        var timestamp, timeout, result, args, context;
        var later = function later() {
            var last = Date.now() - timestamp;
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) {
                        context = args = null;
                    }
                }
            }
        };

        var debouncedFn = function debouncedFn() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };

        debouncedFn.cancel = function () {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };

        debouncedFn.callImmediately = function () {
            // cancels timeout (set by fn.debounced/fn.throttled) and calls immediately
            debouncedFn.cancel();
            func.apply(context, args);
        };

        return debouncedFn;
    },

    postpone: $method(function (fn) {
        fn.postponed.apply(null, arguments);
    }),

    postponed: function postponed(fn) {
        return function () {

            var shouldPostpone = !fn._postponed;

            fn._postponed = _.asArray(arguments);
            fn._postponedThis = this;

            if (shouldPostpone) {

                _.delay(function () {

                    var args_ = fn._postponed;
                    var this_ = fn._postponedThis;

                    fn._postponed = undefined;
                    fn._postponedThis = undefined;

                    fn.apply(this_, args_);
                });
            }
        };
    },

    delay: _.delay,
    delayed: function delayed(fn, time) {
        return function () {
            var args = arguments,
                context = this;
            _.delay(function () {
                fn.apply(context, args);
            }, time);
        };
    } });

/*  A functional try/catch
    ======================================================================== */

_.tests.Function.catches = function () {

    $assert('yo', _.constant('yo').catches($fails)(), _.identity.catches($fails)('yo'), _.throwsError('xx').catches('yo')());

    $assertThrows(function () {
        _.constant('yo').catches(function () {
            $assert('catch handler shoudnt work on passed continuations');
        }, _.throwsError('xx'))();
    });

    $assert(function (x) {
        throw x;
    }.catches(_.appends('+error_case'), _.appends('+no_error_case'), _.appends('+finally'))('foo'), 'foo+error_case+finally');

    $assertMatches(_.throwError.catches()('yo'), {
        message: 'yo' });

    $assert(_.catches(_.throwsError(42), $assertMatches.$({ message: 42 }).returns('yo'))(), 'yo');

    $assertCPS(_.constant('yo').catches($fails), 'yo');
};

$extensionMethods(Function, { catch_: function catch_(fn, _catch_, then, finally_) {
        return fn.catches(_catch_, then)();
    },
    catches: function catches(fn, catch_, then, finally_) {
        var args = arguments.length;
        catch_ = args > 1 ? _.coerceToFunction(catch_) : _.identity;
        then = args > 2 ? _.coerceToFunction(then) : _.identity;
        finally_ = args > 3 ? _.coerceToFunction(finally_) : _.identity;
        return function () {
            var result = undefined,
                catched = false;
            try {
                result = fn.apply(this, arguments);
            } catch (e) {
                result = catch_(e);catched = true;
            }
            if (!catched) {
                result = then(result);
            }
            return finally_(result);
        };
    } });

/***/ }),
/* 164 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./base/infix/String.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  String extensions
    ======================================================================== */

_.deferTest('String extensions', function () {

    /*  Convenient infix versions of string-crunching basics. The
        naming scheme of reversed/capitalized/trimmed is chosen to
        not cause conflicts with built-in methods/properties doing
        the same (which are implementation-dependent, e.g. str.trim
        method).
     */
    $assert('ж'.repeats(0) === '');
    $assert('ж'.repeats(4) === 'жжжж');
    $assert('жопа'.first(2) === 'жо');
    $assert('жопа'.reversed === 'апож');
    $assert('жопа'.capitalized === 'Жопа'); // capital Zhopa
    $assert('  жопа  '.trimmed === 'жопа');
    $assert('<жопа>'.escaped === '&lt;жопа&gt;');
    $assert('па'.prepend('жо'), 'жо'.append('па'), 'жопа');

    $assert(['жопа'.contains('опа'), 'жопа'.contains('апож')], [true, false]);

    $assert(['жопа'.startsWith('ж'), 'жопа'.startsWith('жо'), 'жопа'.startsWith('о')], [true, true, false]);
    $assert(['жопа'.endsWith('а'), 'жопа'.endsWith('па'), 'жопа'.endsWith('ж')], [true, true, false]);

    /*  Higher order version of former utility
     */
    $assert([_.map([1, 2, 3], _.prepends('foo')), // higher order version
    _.map([1, 2, 3], _.appends('bar'))].zip(_.append), ['foo11bar', 'foo22bar', 'foo33bar']);

    /*  This one is defined via unicode_regexp_hack and is super slow
     */
    $assert('}|{О/7A с Py4K()Й ololo 321321'.latinAlphanumericValue, '7APy4Kololo321321');
    $assert('}|{О/7A с Py4K()Й ololo 321321'.alphanumericValue, 'О7AсPy4KЙololo321321');

    /*  This one is defined though regexps, and is kinda slow. Don't use
        in performance-critical code (like mass object rendering in UI)
     */
    $assert('+7(965)412-63-21'.numericValue, '79654126321');
    $assert('+7(965)412-63-21'.integerValue, 79654126321);
    $assert('foo'.integerValue, undefined); // NOTE: returns undefined instead of NaN (for consistency reasons)
    $assert('0'.integerValue, 0); // regression test (was resulting to undefined due to bug)

    /*  Use str.parsedInt instead of raw parseInt(), because latter requires
        base-10 argument, often mistakengly omited, thus resulting something
        like '010' to be parsed as octal number. I once spend hours of debugging
        to catch this kind of mistake, and now not want for someone's got
        trapped into the same shitty situation.
     */
    $assert('123'.parsedInt, 123);
    $assert('foo'.parsedInt, undefined); // NOTE: returns undefined instead of NaN (for consistency reasons)
    $assert('0'.parsedInt, 0); // regression test (was resulting to undefined due to bug)

    /*  This one is taken from Java's object hasher. Not to ever be used in
        some security-critical calculations, as it's not secure. It's fast.
     */
    $assert('foo'.hash, 101574);

    /*  Use for filename/URL-part generation
     */
    $assert('Пися Камушкинъ'.transliterate, 'pisyakamushkin');

    /*  This one is really convetient!
     */
    $assert('qux'.quote(''), 'qux');
    $assert('qux'.quote('"'), '"qux"');
    $assert('qux'.quote('[]'), '[qux]');
    $assert('qux'.quote('/'), '/qux/');
    $assert('qux'.quote('{  }'), '{ qux }');
    $assert('qux'.quote('</>'), '</qux>');

    $assert(_.isTypeOf(Uint8Array, 'foo'.bytes));
    $assert(_.asArray('foo'.bytes), [102, 111, 111]);

    $assert(['foobar'.limitedTo(6), 'tooloong'.limitedTo(6), ''.limitedTo(0)], ['foobar', 'toolo…', '']);

    $assert('жоп'.pad(5), 'жоп  ');
    $assert('жоп'.pad(5, '→'), 'жоп→→');

    $assert('foo'.pluck([{ foo: 10 }, { foo: 11 }]), [10, 11]);
    $assert('foo'.pluck({ a: { foo: 10 }, b: { foo: 11 } }), { a: 10, b: 11 });

    $assert('foo/'.concatPath('/bar'), 'foo'.concatPath('/bar'), 'foo/'.concatPath('bar'), 'foo'.concatPath('bar'), 'foo/bar');

    $assert('123456'.first(2), '12');
    $assert('123456'.last(2), '56');
}, function () {
    $extensionMethods(String, {

        quote: _.quote,

        concatPath: function concatPath(a, b) {

            var a_endsWithSlash = a[a.length - 1] === '/';
            var b_startsWithSlash = b[0] === '/';

            return a + (a_endsWithSlash || b_startsWithSlash ? '' : '/') + (a_endsWithSlash && b_startsWithSlash ? b.substring(1) : b);
        },

        pluck: function pluck(s, arr) {
            return _.pluck2(arr, s);
        },

        contains: function contains(s, other) {
            return s.indexOf(other) >= 0;
        },

        startsWith: function startsWith(s, x) {
            return x.length === 1 ? s[0] === x : s.substring(0, x.length) === x;
        },

        endsWith: function endsWith(s, x) {
            return x.length === 1 ? s[s.length - 1] === x : s.substring(s.length - x.length) === x;
        },

        pad: function pad(s, len, filler) {
            return s += (filler || ' ').repeats(Math.max(0, len - s.length));
        },

        cut: function cut(s, from) {
            return s.substring(0, from - 1) + s.substring(from, s.length);
        },

        insert: function insert(s, position, what) {
            return s.substring(0, position) + what + s.substring(position, s.length);
        },

        lowercase: function lowercase(s) {
            return s.toLowerCase();
        },

        uppercase: function uppercase(s) {
            return s.toUpperCase();
        },

        trimmed: function trimmed(s) {
            return s.trim();
        },

        limitedTo: function limitedTo(s, n) {
            return s && (s.length <= n ? s : s.substr(0, n - 1) + '…');
        },

        escaped: function escaped(s) {
            return _.escape(s);
        },

        repeats: function repeats(s, n) {
            // TODO: this should come in two versions: _.repeat (s, n) and _.repeats (n, s)
            return _.times(n, _.constant(s)).join('');
        },

        prepend: function prepend(s, other) {
            return other + s;
        },

        append: function append(s, other) {
            return s + other;
        },

        first: function first(s, n) {
            return s.slice(0, n);
        },

        last: function last(s, n) {
            return s.slice(-2);
        },

        reversed: function reversed(s) {
            return s.split('').reverse().join('');
        },

        capitalized: function capitalized(s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        },

        decapitalized: function decapitalized(s) {
            return s.charAt(0).toLowerCase() + s.slice(1);
        },

        latinAlphanumericValue: function latinAlphanumericValue(s) {
            return s.replace(/[^a-z0-9]/gi, '');
        },

        alphanumericValue: function alphanumericValue(s) {
            return s.replace(/[^a-zа-я0-9]/gi, '');
        },

        numericValue: function numericValue(s) {
            return s.replace(/[^0-9]/g, '');
        },

        integerValue: function integerValue(s) {
            return s.numericValue.parsedInt;
        },

        parsedInt: function parsedInt(s) {
            var result = parseInt(s, 10);
            return _.isFinite(result) ? result : undefined;
        },

        bytes: function bytes(s) {
            var bytes = new Uint8Array(s.length);
            for (var i = 0; i < s.length; ++i) {
                bytes[i] = s.charCodeAt(i);
            }
            return bytes;
        },

        hash: function hash(s) {
            // unsecure, but fast, taken from Java's object hasher
            var hash = 0,
                i,
                chr,
                len;
            if (s.length === 0) {
                return hash;
            }

            for (i = 0, len = s.length; i < len; i++) {
                chr = s.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0;
            } // Convert to 32bit integer

            return hash;
        },

        transliterate: function () {
            var table = _.extend({

                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
                'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
                'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
                'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
                'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
                'у': 'u', 'ф': 'ph', 'х': 'h', 'ц': 'ts',
                'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '',
                'ъ': '', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya' }, _.fromPairs(_.map('_-1234567890qwertyuiopasdfghjklzxcvbnm', function (x) {
                return [x, x];
            })));

            return function (s) {
                var result = '';
                var source = (s || '').toLowerCase();

                for (var i = 0, n = source.length; i < n; i++) {
                    var c = source[i];
                    var x = table[c] || '';
                    result += x;
                }

                return result;
            };
        }() });
});

_.extend(String, {

    randomHex: function randomHex(length) {
        if (length === undefined) {
            length = _.random(1, 32);
        }
        var string = '';
        for (var i = 0; i < length; i++) {
            string += Math.floor(Math.random() * 16).toString(16);
        }
        return string;
    },

    leadingZero: function leadingZero(n) {
        return n < 10 ? '0' + n : n.toString();
    } });

_.deferTest(['identifier naming style interpolation'], function () {

    $assert(_.camelCaseToLoDashes('flyingBurritoOption'), 'flying_burrito_option');
    $assert(_.camelCaseToDashes('flyingBurritoOption'), 'flying-burrito-option');
    $assert(_.dashesToCamelCase('flying-burrito-option'), 'flyingBurritoOption');
    $assert(_.loDashesToCamelCase('flying_burrito_option'), 'flyingBurritoOption');
}, function () {

    _.camelCaseToDashes = function (x) {
        return x.replace(/[a-z][A-Z]/g, function (x) {
            return x[0] + '-' + x[1].lowercase;
        });
    };
    _.camelCaseToLoDashes = function (x) {
        return x.replace(/[a-z][A-Z]/g, function (x) {
            return x[0] + '_' + x[1].lowercase;
        });
    };
    _.dashesToCamelCase = function (x) {
        return x.replace(/(-.)/g, function (x) {
            return x[1].uppercase;
        });
    };
});
_.loDashesToCamelCase = function (x) {
    return x.replace(/(_.)/g, function (x) {
        return x[1].uppercase;
    });
};

/***/ }),
/* 165 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./base/infix/extensionMethods.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5)

/*  Extensions methods
    ======================================================================== */

;['method', 'property', 'flipped', 'forceOverride'].forEach(Meta.globalTag);

$global.$extensionMethods = function (Type, methods) {

    _.each(methods, function (x, name) {

        var fn = Meta.unwrap(x);
        var tags = Meta.tags(x);

        /*  define as _.method (this, ...)
         */
        if (!(name in _)) {
            _[name] = _[name] || fn;
        }

        /*  define as property of Type
         */
        if (!tags.method && (tags.property || _.oneArg(fn))) {
            if (!(name in Type.prototype) || tags.forceOverride) {
                _.defineHiddenProperty(Type.prototype, name, function () {
                    return fn(this);
                });
            }
        }

        /*  define as method
         */
        else if (!tags.property) {
                if (!(name in Type.prototype) || tags.forceOverride) {
                    Object.defineProperty(Type.prototype, name, { writable: true, value: _.asMethod(tags.flipped ? _.flip(fn) : fn) });
                }
            } else {
                throw new Error('$extensionMethods: crazy input, unable to match');
            }
    });
};

/***/ }),
/* 166 */,
/* 167 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./base/math.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _$prototype;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = __webpack_require__(/*! underscore */ 5);

/*  TODO:   UNIT TEST DAT MUTHAFUCKA
 */

/*  TODO:   get rid of _ namespace (now legacy)
 */

Math.clamp = _.clamp = function (n, min, max) {
    return Math.max(min, Math.min(max, n));
};

Math.lerp = _.lerp = function (t, min, max) {
    return min + (max - min) * t;
};

Math.rescale = _.rescale = function (v, from, to, opts) {
    var unit = (v - from[0]) / (from[1] - from[0]);
    return _.lerp(opts && opts.clamp ? _.clamp(unit, 0, 1) : unit, to[0], to[1]);
};

Math.rescaleClamped = _.rescaleClamped = function (v, from, to) {
    return _.rescale(v, from, to, { clamp: true });
};

Math.sqr = _.sqr = function (x) {
    return x * x;
};

/*  Math.sign (missing from Safari)
    ======================================================================== */

if (!Math.sign) {
    Math.sign = function (x) {
        return x < 0 ? -1 : x > 0 ? 1 : 0;
    };
}

/*  Intersections (draft)
    ======================================================================== */

$global.Intersect = {

    rayCircle: function rayCircle(origin, d, center, r) {

        var f = origin.sub(center);
        var a = d.dot(d);

        var b = 2.0 * f.dot(d);
        var c = f.dot(f) - r * r;

        var discriminant = b * b - 4.0 * a * c;
        if (discriminant < 0) {
            return undefined;
        } else {
            discriminant = Math.sqrt(discriminant);

            var t1 = (-b - discriminant) / (2.0 * a);
            var t2 = (-b + discriminant) / (2.0 * a);

            if (t1 >= 0 && t1 <= 1) {
                return { time: t1, where: origin.add(d.scale(t1)) };
            }

            if (t2 >= 0 && t2 <= 1) {
                return { time: t2, where: origin.add(d.scale(t2)), insideOut: true };
            }

            return undefined;
        }
    }
};

/*  TODO: Vec1, for consistency with arity-abstract vector algorithms
    ======================================================================== */

/*  2-dimensional vector
    ======================================================================== */

$global.Vec2 = $prototype((_$prototype = {

    $static: {
        xx: function xx(x) {
            return new Vec2(x, x);
        },
        xy: function xy(x, y) {
            return new Vec2(x, y);
        },
        x: function x(_x) {
            return new Vec2(_x, 0);
        },
        y: function y(_y) {
            return new Vec2(0, _y);
        },
        zero: $property(function () {
            return new Vec2(0, 0);
        }),
        unit: $property(function () {
            return new Vec2(1, 1);
        }),
        one: $alias('unit'),
        lt: $alias('fromLT'),
        wh: $alias('fromWH'),
        fromLT: function fromLT(lt) {
            return lt && new Vec2(lt.left, lt.top);
        },
        fromWH: function fromWH(wh) {
            return wh && new Vec2(wh.width, wh.height);
        },
        fromLeftTop: $alias('fromLT'),
        fromWidthHeight: $alias('fromWH'),
        lerp: function lerp(t, a, b) {
            return new Vec2(_.lerp(t, a.x, b.x), _.lerp(t, a.y, b.y));
        },
        clamp: function clamp(n, a, b) {
            return new Vec2(_.clamp(n.x, a.x, b.x), _.clamp(n.y, a.y, b.y));
        },

        random: $property(function () {
            return new Vec2(Math.random(), Math.random());
        })
    },

    constructor: function constructor(x, y) {
        if (arguments.length === 1) {
            if (_.isNumber(x)) {
                this.x = this.y = x;
            } else {
                this.x = x.x;
                this.y = x.y;
            }
        } else {
            this.x = x;
            this.y = y;
        }
    },

    w: $alias($property('x')),
    h: $alias($property('y')),

    width: $alias($property('x')),
    height: $alias($property('y')),

    left: $alias($property('x')),
    top: $alias($property('y')),

    right: $alias($property('x')),
    bottom: $alias($property('y')),

    length: $property(function () {
        return Math.sqrt(this.lengthSquared);
    }),
    lengthSquared: $property(function () {
        return this.x * this.x + this.y * this.y;
    }),

    distance: function distance(pt) {
        return this.sub(pt).length;
    },

    aspect: $property(function () {
        return this.x / this.y;
    }),

    add: function add(a, b) {
        if (b === undefined) {
            return typeof a === 'number' ? new Vec2(this.x + a, this.y + a) : new Vec2(this.x + a.x, this.y + a.y);
        } else {
            return new Vec2(this.x + a, this.y + b);
        }
    }

}, _defineProperty(_$prototype, 'aspect', $property(function () {
    return this.w / this.h;
})), _defineProperty(_$prototype, 'jitter', function jitter(amount) {
    return this.add(Vec2.random.scale(amount));
}), _defineProperty(_$prototype, 'dot', function dot(other) {
    return this.x * other.x + this.y * other.y;
}), _defineProperty(_$prototype, 'sub', function sub(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
}), _defineProperty(_$prototype, 'scale', function scale(tx, ty) {
    return new Vec2(this.x * tx, this.y * (ty === undefined ? tx : ty));
}), _defineProperty(_$prototype, 'mul', function mul(other) {
    return new Vec2(this.x * other.x, this.y * other.y);
}), _defineProperty(_$prototype, 'divide', function divide(other) {
    return new Vec2(this.x / other.x, this.y / other.y);
}), _defineProperty(_$prototype, 'normal', $property(function () {
    return this.scale(1.0 / this.length);
})), _defineProperty(_$prototype, 'perp', $property(function () {
    return new Vec2(this.y, -this.x);
})), _defineProperty(_$prototype, 'half', $property(function () {
    return new Vec2(this.x * 0.5, this.y * 0.5);
})), _defineProperty(_$prototype, 'inverse', $property(function () {
    return new Vec2(-this.x, -this.y);
})), _defineProperty(_$prototype, 'asArray', $property(function () {
    return [this.x, this.y];
})), _defineProperty(_$prototype, 'asLeftTop', $property(function () {
    return { left: this.x, top: this.y };
})), _defineProperty(_$prototype, 'asLeftTopMargin', $property(function () {
    return { marginLeft: this.x, marginTop: this.y };
})), _defineProperty(_$prototype, 'asWidthHeight', $property(function () {
    return { width: this.x, height: this.y };
})), _defineProperty(_$prototype, 'asTranslate', $property(function () {
    return 'translate(' + this.x + ' ' + this.y + ')';
})), _defineProperty(_$prototype, 'separatedWith', function separatedWith(sep) {
    return this.x + sep + this.y;
}), _defineProperty(_$prototype, 'floor', $property(function () {
    return new Vec2(Math.floor(this.x), Math.floor(this.y));
})), _defineProperty(_$prototype, 'sum', $static(function (arr) {
    return _.reduce(_.isArray(arr) && arr || _.asArray(arguments), function (memo, v) {
        return memo.add(v || Vec2.zero);
    }, Vec2.zero);
})), _defineProperty(_$prototype, 'projectOnCircle', function projectOnCircle(center, r) {
    return center.add(this.sub(center).normal.scale(r));
}), _defineProperty(_$prototype, 'projectOnLineSegment', function projectOnLineSegment(v, w) {
    var wv = w.sub(v);
    var l2 = wv.lengthSquared;
    if (l2 == 0) return v;
    var t = this.sub(v).dot(wv) / l2;
    if (t < 0) return v;
    if (t > 1) return w;
    return v.add(wv.scale(t));
}), _defineProperty(_$prototype, 'projectOnRay', function projectOnRay(origin, dir) {
    var l2 = dir.lengthSquared;
    if (l2 == 0) return 0;
    return this.sub(origin).dot(dir) / l2;
}), _$prototype));

/*  ------------------------------------------------------------------------ */

if (typeof Symbol !== 'undefined') {
    Vec2.prototype[Symbol.for('String.ify')] = function () {
        return '{' + this.x + ',' + this.y + '}';
    };
}

/*  Cubic bezier
    ======================================================================== */

$global.Bezier = {

    cubic: function cubic(t, p0, p1, p2, p3) {
        var cube = t * t * t;
        var square = t * t;
        var ax = 3.0 * (p1.x - p0.x);
        var ay = 3.0 * (p1.y - p0.y);
        var bx = 3.0 * (p2.x - p1.x) - ax;
        var by = 3.0 * (p2.y - p1.y) - ay;
        var cx = p3.x - p0.x - ax - bx;
        var cy = p3.y - p0.y - ay - by;
        var x = cx * cube + bx * square + ax * t + p0.x;
        var y = cy * cube + by * square + ay * t + p0.y;
        return new Vec2(x, y);
    },

    cubic1D: function cubic1D(t, a, b, c, d) {
        return Bezier.cubic(t, Vec2.zero, new Vec2(a, b), new Vec2(c, d), Vec2.one).y;
    },

    make: {

        cubic: function cubic(a, b, c, d) {
            return function (t) {
                return Bezier.cubic(t, a, b, c, d);
            };
        },
        cubic1D: function cubic1D(a, b, c, d) {
            return function (t) {
                return Bezier.cubic1D(t, a, b, c, d);
            };
        } } };

/*  Bounding box (2D)
    ======================================================================== */

$global.BBox = $prototype({

    $static: {

        zero: $property(function () {
            return new BBox(0, 0, 0, 0);
        }),

        unit: $property(function () {
            return new BBox(0, 0, 1, 1);
        }),

        rect: $property(function (sideSize) {
            return new BBox(0, 0, sideSize, sideSize);
        }),

        fromLeftTopAndSize: function fromLeftTopAndSize(pt, size) {
            return BBox.fromLTWH({ left: pt.x, top: pt.y, width: size.x, height: size.y });
        },

        fromLTWH: function fromLTWH(l, t, w, h) {
            if (arguments.length === 1) {
                return l && BBox.fromLTWH(l.left, l.top, l.width, l.height);
            } else {
                return new BBox(l + w / 2.0, t + h / 2.0, w, h);
            }
        },

        fromLTRB: function fromLTRB(l, t, r, b) {
            if (arguments.length === 1) {
                return l && BBox.fromLTRB(l.left, l.top, l.right, l.bottom);
            } else if (arguments.length === 2) {
                return BBox.fromLTRB(l.x, l.y, t.x, l.y);
            } else {
                return new BBox(_.lerp(0.5, l, r), _.lerp(0.5, t, b), r - l, b - t);
            }
        },

        fromSizeAndCenter: function fromSizeAndCenter(size, center) {
            return new BBox(center.x - size.x / 2.0, center.y - size.y / 2.0, size.x, size.y);
        },

        fromSize: function fromSize(a, b) {
            if (b) {
                return new BBox(-a / 2.0, -b / 2.0, a, b);
            } else {
                return new BBox(-a.x / 2.0, -a.y / 2.0, a.x, a.y);
            }
        },

        fromPoints: function fromPoints(pts) {
            var l = Number.MAX_VALUE,
                t = Number.MAX_VALUE,
                r = Number.MIN_VALUE,
                b = Number.MIN_VALUE;
            _.each(pts, function (pt) {
                l = Math.min(pt.x, l);
                t = Math.min(pt.y, t);
                r = Math.max(pt.x, r);
                b = Math.max(pt.y, b);
            });
            return BBox.fromLTRB(l, t, r, b);
        }
    },

    constructor: function constructor(x, y, w, h) {
        if (arguments.length == 4) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        } else {
            _.extend(this, x);
        }
    },

    classifyPoint: function classifyPoint(pt) {

        var sides = _.extend(pt.x > this.right ? { right: true } : {}, pt.x < this.left ? { left: true } : {}, pt.y > this.bottom ? { bottom: true } : {}, pt.y < this.top ? { top: true } : {});

        return _.extend(sides, !sides.left && !sides.right && !sides.bottom && !sides.top ? { inside: true } : {});
    },

    classifyRay: function classifyRay(origin, delta, cornerRadius) {

        var half = this.size.half;
        var farTime, farTimeX, farTimeY, nearTime, nearTimeX, nearTimeY, scaleX, scaleY, signX, signY;

        scaleX = 1.0 / delta.x;
        scaleY = 1.0 / delta.y;
        signX = Math.sign(scaleX);
        signY = Math.sign(scaleY);

        nearTimeX = (this.x - signX * half.x - origin.x) * scaleX;
        nearTimeY = (this.y - signY * half.y - origin.y) * scaleY;
        farTimeX = (this.x + signX * half.x - origin.x) * scaleX;
        farTimeY = (this.y + signY * half.y - origin.y) * scaleY;

        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return undefined;
        }

        nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        farTime = farTimeX < farTimeY ? farTimeX : farTimeY;

        if (nearTime >= 1 || farTime <= 0) {
            return undefined;
        }

        var hit = { time: _.clamp(nearTime, 0, 1) };

        if (nearTimeX > nearTimeY) {
            hit.normal = new Vec2(-signX, 0);
        } else {
            hit.normal = new Vec2(0, -signY);
        }

        hit.delta = delta.scale(hit.time);
        hit.where = origin.add(hit.delta);

        if (cornerRadius) {
            var inner = this.grow(-cornerRadius);

            if (hit.where.x > inner.right) {
                if (hit.where.y < inner.top) {
                    hit = Intersect.rayCircle(origin, delta, inner.rightTop, cornerRadius);
                } else if (hit.where.y > inner.bottom) {
                    hit = Intersect.rayCircle(origin, delta, inner.rightBottom, cornerRadius);
                }
            } else if (hit.where.x < inner.left) {
                if (hit.where.y < inner.top) {
                    hit = Intersect.rayCircle(origin, delta, inner.leftTop, cornerRadius);
                } else if (hit.where.y > inner.bottom) {
                    hit = Intersect.rayCircle(origin, delta, inner.leftBottom, cornerRadius);
                }
            }

            if (hit && hit.insideOut) {
                hit.where = origin;
            }
        }

        return hit;
    },

    nearestPointTo: function nearestPointTo(pt, cornerRadius) {
        var r = cornerRadius || 0;

        var a = new Vec2(this.left, this.top),
            b = new Vec2(this.right, this.top),
            c = new Vec2(this.right, this.bottom),
            d = new Vec2(this.left, this.bottom);

        var pts = [pt.projectOnLineSegment(a.add(r, 0), b.add(-r, 0)), // top
        pt.projectOnLineSegment(b.add(0, r), c.add(0, -r)), // right
        pt.projectOnLineSegment(c.add(-r, 0), d.add(r, 0)), // bottom
        pt.projectOnLineSegment(d.add(0, -r), a.add(0, r)), // left

        pt.projectOnCircle(a.add(r, r), r), pt.projectOnCircle(b.add(-r, r), r), pt.projectOnCircle(c.add(-r, -r), r), pt.projectOnCircle(d.add(r, -r), r)];

        return _.min(pts, function (test) {
            return pt.sub(test).length;
        });
    },

    xywh: $property(function () {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }),

    ltwh: $property(function () {
        return { left: this.left, top: this.top, width: this.width, height: this.height };
    }),

    union: function union(other) {
        return BBox.fromLTRB(Math.min(this.left, other.left), Math.min(this.top, other.top), Math.max(this.right, other.right), Math.max(this.bottom, other.bottom));
    },

    centerIn: function centerIn(other) {
        return new BBox(other.x, other.y, this.width, this.height);
    },

    clone: $property(function () {
        return new BBox(this.x, this.y, this.width, this.height);
    }),

    floor: $property(function () {
        return new BBox.fromLTRB(Math.floor(this.left), Math.floor(this.top), Math.floor(this.right), Math.floor(this.bottom));
    }),

    css: $property(function () {
        return { left: this.left + 'px',
            top: this.top + 'px',
            width: this.width + 'px',
            height: this.height + 'px' };
    }),

    leftTop: $property(function () {
        return new Vec2(this.left, this.top);
    }),

    leftBottom: $property(function () {
        return new Vec2(this.left, this.bottom);
    }),

    rightBottom: $property(function () {
        return new Vec2(this.right, this.bottom);
    }),

    rightCenter: $property(function () {
        return new Vec2(this.right, this.center.y);
    }),

    rightTop: $property(function () {
        return new Vec2(this.right, this.top);
    }),

    setLeftTop: function setLeftTop(pt) {
        return BBox.fromLTRB(pt.x, pt.y, this.right, this.bottom);
    },
    setRightTop: function setRightTop(pt) {
        return BBox.fromLTRB(this.left, pt.y, pt.x, this.bottom);
    },
    setRightBottom: function setRightBottom(pt) {
        return BBox.fromLTRB(this.left, this.top, pt.x, pt.y);
    },
    setLeftBottom: function setLeftBottom(pt) {
        return BBox.fromLTRB(pt.x, this.top, this.right, pt.y);
    },


    left: $property(function () {
        return this.x - this.width / 2.0;
    }),

    right: $property(function () {
        return this.x + this.width / 2.0;
    }),

    top: $property(function () {
        return this.y - this.height / 2.0;
    }),

    bottom: $property(function () {
        return this.y + this.height / 2.0;
    }),

    center: $property(function () {
        return new Vec2(this.x, this.y);
    }),

    extent: $alias('size'),

    size: $property(function () {
        return new Vec2(this.width, this.height);
    }),

    offset: function offset(amount) {
        return new BBox(this.x + amount.x, this.y + amount.y, this.width, this.height);
    },

    newWidth: function newWidth(width) {
        return new BBox(this.x - (width - this.width) / 2.0, this.y, width, this.height);
    },

    grow: function grow(amount) {
        return new BBox(this.x, this.y, this.width + amount * 2, this.height + amount * 2);
    },

    shrink: function shrink(amount) {
        return this.grow(-amount);
    },

    mul: function mul(z) {
        return new BBox(this.x * z, this.y * z, this.width * z, this.height * z);
    },

    scale: function scale(v) {
        return new BBox(this.x * v.x, this.y * v.y, this.width * v.x, this.height * v.y);
    },


    area: $property(function () {
        return Math.abs(this.width * this.height);
    }),

    intersects: function intersects(other) {
        return !(this.right < other.left || this.left > other.right || this.bottom < other.top || this.top > other.bottom);
    },

    equals: function equals(other) {
        return this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height;
    },
    project: function project(other) {

        if (other instanceof BBox) {

            return BBox.fromSizeAndCenter(other.size.divide(this.size), this.project(other.center));
        } else {

            return new Vec2((other.x - this.left) / this.width, (other.y - this.top) / this.height);
        }
    }
});

BBox.union = function (a, b) {
    return a ? a.union(b) : new BBox(b.x, b.y, 0, 0);
};

/*  ------------------------------------------------------------------------ */

if (typeof Symbol !== 'undefined') {
    BBox.prototype[Symbol.for('String.ify')] = function () {
        return '{ ' + this.left + ',' + this.top + ' ←→ ' + this.right + ',' + this.bottom + ' }';
    };
}

/*  3x3 affine transform matrix, encoding scale/offset/rotate/skew in 2D
    ======================================================================== */

$global.Transform = $prototype({

    $static: {

        identity: $property(function () {
            return new Transform();
        }),

        svgMatrix: function svgMatrix(m) {
            return new Transform([[m.a, m.c, m.e], [m.b, m.d, m.f], [0.0, 0.0, 1.0]]);
        },

        translation: function translation(v) {
            return new Transform([[1.0, 0.0, v.x], [0.0, 1.0, v.y], [0.0, 0.0, 1.0]]);
        } },

    constructor: function constructor(components) {
        this.components = components || [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]];
    },

    multiply: function multiply(m) {
        var result = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]];
        var i,
            j,
            k,
            a = this.components,
            b = m.components;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                for (k = 0; k < 3; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        return new Transform(result);
    },

    translate: function translate(v) {
        return this.multiply(Transform.translation(v));
    },

    scale: function scale(s) {
        return this.multiply(new Transform([[s, 0.0, 0.0], [0.0, s, 0.0], [0.0, 0.0, 1.0]]));
    },

    inverse: $property($memoized(function () {
        var m = this.components;
        var id = 1.0 / (m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]));

        return new Transform([[(m[1][1] * m[2][2] - m[2][1] * m[1][2]) * id, // 0 0
        -(m[0][1] * m[2][2] - m[0][2] * m[2][1]) * id, // 0 1
        (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * id], // 0 2

        [(m[1][0] * m[2][2] - m[1][2] * m[2][0]) * id, // 1 0
        (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * id, // 1 1
        -(m[0][0] * m[1][2] - m[1][0] * m[0][2]) * id], // 1 2

        [(m[1][0] * m[2][1] - m[2][0] * m[1][1]) * id, // 2 0
        -(m[0][0] * m[2][1] - m[2][0] * m[0][1]) * id, // 2 1
        (m[0][0] * m[1][1] - m[1][0] * m[0][1]) * id]]);
    })), // 2 2

    unproject: function unproject(v) {
        var m = this.components;
        return new Vec2(v.x * m[0][0] + v.y * m[0][1] + m[0][2], v.x * m[1][0] + v.y * m[1][1] + m[1][2]);
    },

    project: function project(v) {
        return this.inverse.unproject(v);
    } });

/*  Generates random number generator
    ======================================================================== */

_.rng = function (seed, from, to) {
    var m_w = seed;
    var m_z = 987654321;
    var mask = 0xffffffff;
    return function () {
        m_z = 36969 * (m_z & 65535) + (m_z >> 16) & mask;
        m_w = 18000 * (m_w & 65535) + (m_w >> 16) & mask;
        var result = (m_z << 16) + m_w & mask;
        result /= 4294967296;
        result += 0.5;
        if (from === undefined && to === undefined) {
            return result;
        } else {
            return Math.round(from + result * (to - from));
        }
    };
};

/*  Kind of Brezenham algorithm for 1D
    ======================================================================== */

_.equalDistribution = function (value, n) {
    var average = value / n;
    var realLeft = 0.0;
    return _.times(n, function () {
        var left = Math.round(realLeft);
        var right = Math.round(realLeft += average);
        var rough = Math.floor(right - left);
        return rough;
    });
};

/*  DEPRECATED: use BBox utility
    ======================================================================== */

_.ptInRect = function (pt, rect) {
    return pt.x >= rect.left && pt.y >= rect.top && pt.x < rect.right && pt.y < rect.bottom;
};

/*  Color utility
    ======================================================================== */

_.hue2CSS = function (H, a) {
    return _.RGB2CSS(_.hue2RGB(H), a);
};
_.HSL2CSS = function (hsl, a) {
    return _.RGB2CSS(_.HSL2RGB(hsl), a);
};

_.HSL2RGB = function (hsl) {
    var h = hsl[0],
        s = hsl[1],
        l = hsl[2];
    var rgb = _.hue2RGB(h);
    var c = (1.0 - Math.abs(2.0 * l - 1.0)) * s;
    return [(rgb[0] - 0.5) * c + l, (rgb[1] - 0.5) * c + l, (rgb[2] - 0.5) * c + l];
};

_.hue2RGB = function (hue) {
    return [Math.max(0.0, Math.min(1.0, Math.abs(hue * 6.0 - 3.0) - 1.0)), Math.max(0.0, Math.min(1.0, 2.0 - Math.abs(hue * 6.0 - 2.0))), Math.max(0.0, Math.min(1.0, 2.0 - Math.abs(hue * 6.0 - 4.0)))];
};

_.RGB2CSS = function (rgb, a) {
    return 'rgba(' + Math.round(rgb[0] * 255) + ',' + Math.round(rgb[1] * 255) + ',' + Math.round(rgb[2] * 255) + ',' + (a === undefined ? rgb[3] === undefined ? 1.0 : rgb[3] : a) + ')';
};

_.RGB2HSL = function (rgb, a_) {
    var r = rgb[0],
        g = rgb[1],
        b = rgb[2],
        a = a_ === undefined ? rgb[3] : a_;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);break;
            case g:
                h = (b - r) / d + 2;break;
            case b:
                h = (r - g) / d + 4;break;}
        h /= 6;
    }
    return a === undefined ? [h, s, l] : [h, s, l, a];
};

/*  Advanced rounding utility
    ======================================================================== */

_.extend(Math, function (decimalAdjust) {
    return {
        roundTo: function roundTo(value, precision) {
            return value - value % precision;
        },
        round10: function round10(value, exp) {
            return decimalAdjust('round', value, exp);
        },
        floor10: function floor10(value, exp) {
            return decimalAdjust('floor', value, exp);
        },
        ceil10: function ceil10(value, exp) {
            return decimalAdjust('ceil', value, exp);
        }
    };
}(function ( /* decimalAdjust */type, value, exp) {

    /**
     * Decimal adjustment of a number.
     *
     * @param   {String}    type    The type of adjustment.
     * @param   {Number}    value   The number.
     * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}            The adjusted value.
     */

    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}))

/*  ------------------------------------------------------------------------ */

;(function () {

    var toposort = __webpack_require__(/*! toposort */ 387);

    $mixin(Array, {
        topoSort: function topoSort() {
            return toposort(this);
        }
    });
})();

/*  ------------------------------------------------------------------------ */

_.withTest(['Array', 'topomerge'], function () {

    $assert([['all', 'your', 'to', 'us'], ['your', 'belong', 'us'], ['base', 'belong', 'to'], ['your', 'base']].topoMerge(),
    /* -------------------------------------- */
    ['all', 'your', 'base', 'belong', 'to', 'us']);

    /*  ------------------------------------------------------------------------ */
}, function () {

    $mixin(Array, {
        topoMerge: function topoMerge() {
            var edges = [];
            for (var i = 0, ni = this.length; i < ni; i++) {
                var sequence = this[i];
                for (var j = 0, nj = sequence.length - 1; j < nj; j++) {
                    edges.push([sequence[j], sequence[j + 1]]);
                }
            }

            return edges.topoSort();
        }
    });
});

/*  ------------------------------------------------------------------------ */

_.withTest(['DAG', 'sortedSubgraphOf'], function () {

    var modules = {

        '1': { requires: [] },
        '11': { requires: ['1'] },
        '2': { requires: ['0'] },
        '111': { requires: ['12', '100'] },
        '12': { requires: ['0', '11', '2'] },
        '100': { requires: ['10'] },
        '0': { requires: [] },
        '10': { requires: ['0', '2'] },
        'root': { requires: ['2', '111'] } };

    $assert(DAG.sortedSubgraphOf('root', { nodes: function nodes(x) {
            return modules[x].requires;
        } }), ["0", "1", "11", "2", "12", "10", "100", "111"]);

    /*  ------------------------------------------------------------------------ */
}, function () {

    $global.DAG = function (cfg) {
        this.cfg = cfg || {}, this.nodes = cfg.nodes || _.noop;
    }, DAG.prototype.each = function (N, fn, prev, visited) {
        visited = visited || new Set();

        if (!visited.has(N)) {
            visited.add(N);var self = this,
                nodes = this.nodes(N) || [],
                stop = fn.call(this, N, { nodes: nodes,
                prev: prev,
                visited: visited });
            if (stop !== true) {
                nodes.forEach(function (NN) {
                    self.each(NN, fn, N, visited);
                });
            }
        };return visited;
    }, DAG.prototype.edges = function (N) {
        var edges = [];
        this.each(N, function (N, context) {
            context.nodes.concat(N).reduce(function (A, B) {
                edges.push([A, B]);return B;
            });
        });return edges;
    }, DAG.prototype.sortedSubgraphOf = function (node0) {
        return this.edges(node0).topoSort().remove(node0);
    };

    DAG.sortedSubgraphOf = function (node0, cfg) {
        return new DAG(cfg).sortedSubgraphOf(node0);
    };
});

/*  ------------------------------------------------------------------------ */

/***/ }),
/* 168 */,
/* 169 */,
/* 170 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./base/tier0/arguments.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  converts 'arguments' (and any other array mimick) to real Array
    ======================================================================== */

_.withTest(['stdlib', 'asArray'], function () {

    (function (a, b) {
        var args = _.asArray(arguments);

        $assert(_.isArray(args));
        $assert(args.length === 2);
        $assert(args[0] === a);
        $assert(args[1] === b);
    })(42, 43);

    $assert(_.asArray(42), [42]);

    /*  Should not mutate its argument (regression)
     */
    var foo = { 0: 'foo', length: 1 };
    $assert(_.asArray(foo), ['foo']);
    $assert(foo, { 0: 'foo', length: 1 });
}, function () {
    _.extend(_, {

        asArray: function asArray(x) {
            return x.length !== undefined ? [].slice.call(x, 0) : [x];
        } });
});

/*  Argument count tracking module (provides hinting to several metaprogramming
    utilities, like property definitions)
    ======================================================================== */

_.withTest('argcount tracking', function () {

    var none = function none() {};
    var one = function one(a) {};
    var three = function three(a, b, c) {};
    var many = $restArg(function () {});

    $assert(_.noArgs(none) === true);
    $assert(_.hasArgs(none) === false);
    $assert(_.numArgs(three) === 3);
    $assert(_.hasArgs(three) === true);
    $assert(_.restArg(many) === true);
    $assert(_.noArgs(many) === false);
    $assert(_.oneArg(one) === true);

    var sameAsThree = _.withSameArgs(three, function () {});
    var oneArgLess = _.withArgs(_.numArgs(three) - 1, _.restArg(three), function () {});

    $assert([_.numArgs(sameAsThree), _.restArg(sameAsThree)], [3, false]);
    $assert([_.numArgs(oneArgLess), _.restArg(oneArgLess)], [2, false]);
}, function () {
    _.extend(_, {

        /*  Querying
         */
        numArgs: function numArgs(fn) {
            return fn._ac === undefined ? fn.length : fn._ac;
        }, // short name for speed

        restArg: function restArg(fn) {
            return fn._ra || false;
        }, // short name for speed

        noArgs: function noArgs(fn) {
            return _.numArgs(fn) === 0 && !fn._ra;
        },

        hasArgs: function hasArgs(fn) {
            return _.numArgs(fn) > 0 && !fn._ra;
        },

        oneArg: function oneArg(fn) {
            return _.numArgs(fn) === 1 && !fn._ra;
        },

        /*  Setting
         */
        withRestArg: $global.$restArg = function (fn) {
            Object.defineProperty(fn, '_ra', { enumerable: false, writable: true, value: true });
            return fn;
        },

        withArgs: function withArgs(numArgs, restArg, fn) {
            if (numArgs !== undefined) {
                Object.defineProperty(fn, '_ac', { enumerable: false, writable: true, value: numArgs });
            }
            if (restArg !== undefined) {
                Object.defineProperty(fn, '_ra', { enumerable: false, writable: true, value: restArg });
            }
            return fn;
        },

        withSameArgs: function withSameArgs(other, fn) {
            return _.withArgs(_.numArgs(other), _.restArg(other), fn);
        } });
})

/*  Adds argcount tracking to some underscore functions.
    Will test it for speed in future, and if slow in app code,
    will be de-mounted, thus sacrificing clarity in some places.
    ======================================================================== */

;(function () {

    var override = function override(name, genImpl) {
        return _[name] = genImpl(_[name]);
    };

    override('memoize', function (memoize) {
        return function (fn) {
            return _.withSameArgs(fn, memoize(fn));
        };
    });

    override('partial', function (partial) {
        return $restArg(function (fn) {
            return _.withArgs(Math.max(0, _.numArgs(fn) - (arguments.length - 1)), fn._ra, partial.apply(this, arguments));
        });
    });

    override('bind', function (bind) {
        return $restArg(function (fn, this_) {
            return _.withArgs(Math.max(0, _.numArgs(fn) - (arguments.length - 2)), fn._ra, bind.apply(this, arguments));
        });
    });
})();

/***/ }),
/* 171 */,
/* 172 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./base/tier0/busybox.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(/*! underscore */ 5);

/*  Basic utility for writing data-crunching functional expressions.
    ======================================================================== */

_.typeOf = function (what) {
                return typeof what === "undefined" ? "undefined" : _typeof(what);
};

_.instanceOf = function (what) {
                return function (x) {
                                return x instanceof what;
                };
};

_.count = function (what) {
                // cannot override _.length
                return what.length;
};

_.array = _.tuple = function () {
                return _.asArray(arguments);
};

_.cons = function (head, tail) {
                return [head].concat(tail || []);
};

_.atIndex = function (n) {
                return function (arr) {
                                return arr[n];
                };
};

_.takesFirst = _.higherOrder(_.first);
_.takesLast = _.higherOrder(_.last);

_.applies = function (fn, this_, args) {
                return function () {
                                return fn.apply(this_, args);
                };
};

_.prepends = function (what) {
                return function (to) {
                                return what + to;
                };
};

_.appends = function (what) {
                return function (to) {
                                return to + what;
                };
};

_.join = function (arr, s) {
                return arr.join(s);
};
_.joinWith = _.flip2(_.join);
_.joinsWith = _.higherOrder(_.joinWith);

_.split = function (s, del) {
                return s.split(del);
};
_.splitWith = _.flip2(_.split);
_.splitsWith = _.higherOrder(_.splitWith);

_.sum = function (a, b) {
                return (a || 0) + (b || 0);
};

_.subtract = function (a, b) {
                return (a || 0) - (b || 0);
};

_.mul = function (a, b) {
                return (a || 0) * (b || 0);
};

_.equal = function (a, b) {
                return a === b;
};

_.sums = _.plus = _.higherOrder(_.sum);
_.subtracts = _.minus = _.higherOrder(_.subtract);
_.muls = _.higherOrder(_.mul);
_.equals = _.higherOrder(_.equal);

_.less = function (a, b) {
                return a < b;
};
_.lessOrEqual = function (a, b) {
                return a <= b;
};
_.greater = function (a, b) {
                return a > b;
};
_.greaterOrEqual = function (a, b) {
                return a >= b;
};

_.isNegative = function (a) {
                return a < 0;
};

_.largest = function (a, b) {
                // FFFFUUUU: underscore already taken _.max for its dirty needs.
                if (isNaN(a) && isNaN(b)) {
                                return NaN;
                } else if (isNaN(a)) {
                                return b;
                } else if (isNaN(b)) {
                                return a;
                } else {
                                return Math.max(a, b);
                }
};

_.notZero = function (x) {
                return x !== 0;
};

_.propertyOf = function (obj) {
                return function (prop) {
                                // inverted version of _.property
                                return obj[prop];
                };
};

_.oneOf = $restArg(function () {
                return _.propertyOf(_.index(_.asArray(arguments)));
});

/***/ }),
/* 173 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/tier0/function.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  Useful for debugging and tests
    ======================================================================== */

_.debugEcho = function () {
    return [this].concat(_.asArray(arguments));
};

/*  Context-free version of fn.call (for consistency)
    ======================================================================== */

_.call = function (fn, this_) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return fn.apply(this_, args);
};

/*  Limits function to given number of arguments
    ======================================================================== */

_.arity = function (N, fn) {
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return fn.apply(this, args.slice(0, N));
    };
};

_.arity0 = function (fn) {
    return function () {
        return fn.call(this);
    };
};

_.arity1 = function (fn) {
    return function (a) {
        return fn.call(this, a);
    };
};

_.arity2 = function (fn) {
    return function (a, b) {
        return fn.call(this, a, b);
    };
};

_.arity3 = function (fn) {
    return function (a, b, c) {
        return fn.call(this, a, b, c);
    };
};

_.arityFn = function (N) {
    return _['arity' + N];
};

/*  A version of _.partial that binds to tail of argument list
    ======================================================================== */

_.tails = $restArg(function (fn) {
    for (var _len3 = arguments.length, tailArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        tailArgs[_key3 - 1] = arguments[_key3];
    }

    return function () {
        return fn.apply(this, _.asArray(arguments).concat(tailArgs));
    };
});

_.tails2 = $restArg(function (fn) {
    for (var _len4 = arguments.length, tailArgs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        tailArgs[_key4 - 1] = arguments[_key4];
    }

    return function (a) {
        return fn.apply(this, [a].concat(tailArgs));
    };
});

_.tails3 = $restArg(function (fn) {
    for (var _len5 = arguments.length, tailArgs = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        tailArgs[_key5 - 1] = arguments[_key5];
    }

    return function (a, b) {
        return fn.apply(this, [a, b].concat(tailArgs));
    };
});

/*  Userful for higher order operations
    ======================================================================== */

_.withTest(['function', 'calls / tails'], function () {

    var fn = _.debugEcho;
    var foo42_ = _.callsWith('foo', 42);
    var _foo42 = _.tailsWith('foo', 42);

    var foo42_fn = foo42_(fn);
    var fn_foo42 = _foo42(fn);

    var _fn = _.callsTo(fn);
    var fn_ = _.tailsTo(fn);
    var fn_bar24 = fn_('bar', 24);
    var bar24_fn = _fn('bar', 24);

    $assert(foo42_fn.call('lol', 777), ['lol', 'foo', 42, 777]);
    $assert(bar24_fn.call('lol', 777), ['lol', 'bar', 24, 777]);

    $assert(fn_foo42.call('lol', 777), ['lol', 777, 'foo', 42]);
    $assert(fn_bar24.call('lol', 777), ['lol', 777, 'bar', 24]);

    $assertEveryCalledOnce(function (mkay) {
        _.argumentPrependingWrapper(fn, function (fn) {
            $assert(fn(777), ['lol', 777, 'foo', 42]);mkay();
        }).call('lol', 'foo', 42);
    });
}, function () {

    _.callsTo = function (fn) {
        return $restArg(function () {
            return _.callsWith.apply(null, arguments)(fn);
        });
    };

    _.tailsTo = function (fn, then) {
        return $restArg(function () {
            return _.tailsWith.apply(null, arguments)(fn);
        });
    };

    _.callsWith = $restArg(function () /* args */{
        var args = _.asArray(arguments);
        return function (fn) {
            return _.withSameArgs(fn, function () {
                return fn.apply(this, args.concat(_.asArray(arguments)));
            });
        };
    }); // @hide


    _.tailsWith = $restArg(function () /* args */{
        var args = _.asArray(arguments);
        return function (fn) {
            return _.withSameArgs(fn, function () {
                return fn.apply(this, _.asArray(arguments).concat(args));
            });
        };
    }); // @hide

    _.argumentAppendingWrapper = function (fn, then) {
        return _.withSameArgs(fn, function () {
            var this_ = this,
                args = _.asArray(arguments);
            return then(function () {
                return fn.apply(this_, args.concat(_.asArray(arguments)));
            });
        });
    }; // @hide

    _.argumentPrependingWrapper = function (fn, then) {
        return _.withSameArgs(fn, function () {
            var this_ = this,
                args = _.asArray(arguments);
            return then(function () {
                return fn.apply(this_, _.asArray(arguments).concat(args));
            });
        });
    };
}); // @hide


/*  binding to constructor arguments (cannot do this with bind/partial)
    ======================================================================== */

_.new = $restArg(function (Constructor, a, b, c, d) {
    switch (arguments.length) {
        case 1:
            return new Constructor();
        case 2:
            return new Constructor(a);
        case 3:
            return new Constructor(a, b);
        case 4:
            return new Constructor(a, b, c);
        case 5:
            return new Constructor(a, b, c, d);
        default:
            _.notImplemented();}
});

/*  Flips function signature (argument order)
    ======================================================================== */

_.flipN = function (fn) {
    return $restArg(function () {
        return fn.apply(this, _.asArray(arguments).reverse());
    });
};

_.flip = function (fn) {
    if (_.restArg(fn)) {
        return _.flipN(fn);
    } else {
        switch (_.numArgs(fn)) {
            case 0:
            case 1:
                return fn;
            case 2:
                return _.flip2(fn);
            case 3:
                return _.flip3(fn);
            default:
                throw new Error('flip: unsupported arity');}
    }
};

_.flip2 = function (fn) {
    return function (a, b) {
        return fn.call(this, b, a);
    };
};

_.flip3 = function (fn) {
    return function (a, b, c) {
        return fn.call(this, c, b, a);
    };
};

/*  Logical composition operators
    ======================================================================== */

_.or = function (a, b) {
    return function () {
        return a.apply(this, arguments) || b.apply(this, arguments);
    };
}, _.and = function (a, b) {
    return function () {
        return a.apply(this, arguments) && b.apply(this, arguments);
    };
}, _.not = function (x) {
    return function () {
        return !x.apply(this, arguments);
    };
};

/*  Y combinator (for anonymous recursive functions)
    ======================================================================== */

_.withTest(['function', 'Y combinator'], function () {

    var countTo5 = _.Y(function (self) {
        return function (n) {
            return n >= 5 ? n : self(n + 1);
        };
    });

    $assert(countTo5(0), 5);
}, function () {
    _.extend(_, {

        Y: function Y(eatSelf) {
            var self = eatSelf(function () {
                return self.apply(this, arguments);
            });return self;
        } });
});

/*  converts regular things like map/zip to hyper versions, that traverse
    deep structures (tested later, via its derivatives: zipZip/mapMap etc)
    ======================================================================== */

/*  Operator argument is the thing that walks down the tree and transforms it.
    But its predicate gets called only on the leaves of a tree (end values).

    Essentially, it abstracts you from structure, making it 'transparent'
    for any kind of previously defined one-dimensional operators like
    map/filter/zip/reduce/etc.

    Example:    hyperMap = _.hyperOperator (_.unary,  _.map2)
                hyperZip = _.hyperOperator (_.binary, _.zip2)
 */

(function () {

    /*  N number denotes how many arguments underlying operation accepts
     */
    _.hyperOperator = function (N, operator, diCaprioPredicate, nonTrivial) {
        var arity = _.arityFn(N) || _.identity;
        var weNeedToGoDeeper = (diCaprioPredicate || _.goDeeperWhenFirstArgumentIsGood)(N, nonTrivial || _.isNonTrivial);
        return function () {
            var subOperator = _.last(arguments);
            return _.Y(function (hyperOperator_) {
                var hyperOperator = _.tails(operator, arity(hyperOperator_));
                return function () {
                    return (weNeedToGoDeeper(arguments) ? hyperOperator : subOperator).apply(this, arguments);
                };
            }).apply(this, _.initial(arguments));
        };
    };

    /*  Combinatoric complexity classifiers for exact configuration of hyperOperator behavior
     */
    _.goDeeperWhenFirstArgumentIsGood = function (N, canGoDeeper) {
        return function (args) {
            return args.length > 0 ? canGoDeeper(args[0]) : false;
        };
    };

    _.goDeeperAlwaysIfPossible = function (N, canGoDeeper) {
        if (N === 0) {
            return _.constant(false);
        } else if (N === 1) {
            return function (args) {
                return canGoDeeper(args[0]);
            };
        } else if (N === 2) {
            return function (args) {
                return canGoDeeper(args[0]) || canGoDeeper(args[1]);
            };
        } else {
            return function (args) {
                return _.some(_.asArray(args), canGoDeeper);
            };
        }
    };

    _.goDeeperOnlyWhenNessesary = function (N, canGoDeeper) {
        if (N === 0) {
            return _.constant(false);
        } else if (N === 1) {
            return function (args) {
                return canGoDeeper(args[0]);
            };
        } else if (N === 2) {
            return function (args) {
                return canGoDeeper(args[0]) && canGoDeeper(args[1]);
            };
        } else {
            return function (args) {
                return _.every(_.asArray(args), canGoDeeper);
            };
        }
    };

    _.isTrivial = function (x) {
        return _.isEmpty(x) || _.isString(x) || _.isNumber(x) || x instanceof RegExp || x instanceof Date || !(_.isStrictlyObject(x) || _.isArray(x)) || _.isPrototypeInstance(x) || _.isMeta(x);
    };

    _.isMeta = _.constant(false);

    _.isNonTrivial = _.not(_.isTrivial);

    /*  Self-descriptive constants (for clarity)
     */
    _.binary = 2;
    _.unary = 1;
})();

/*  Generates higher order stuff from regular routine
    ======================================================================== */

_.withTest(['function', 'higherOrder'], function () {

    var file = [];
    var write = function write(x) {
        file.push(x);
    };
    var writes = _.higherOrder(write);

    _.times(3, writes('foo'));

    $assert(file, ['foo', 'foo', 'foo']);
}, function () {

    _.higherOrder = _.callsTo;
});

/*  coerces x|fn()→x to x (useful for configuration parameters)
    ======================================================================== */

_.deferTest(['function', 'eval/evals'], function () {

    var cfg = {
        value1: 42,
        value2: function value2() {
            return 42;
        },
        value3: _.property('number')
    };

    var evl = _.evals({ number: 42 }); // higher order

    $assert(_.eval(cfg.value1), _.eval(cfg.value2), evl(cfg.value3), 42);
}, function () {

    _.eval = function (x) {
        return _.isFunction(x) ? x.call(this) : x;
    };

    _.evals = function (__args__) {
        var arguments_ = arguments;
        return function (x) {
            return _.isFunction(x) ? x.apply(this, arguments_) : x;
        };
    };
});

/*  in rhyme with _.property, this one calls a method
    ======================================================================== */

_.method = function (name) {
    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
    }

    return function (obj) {
        return obj[name].apply(obj, args);
    };
};

/*  Converts between calling conventions
    ======================================================================== */

_.asFreeFunction = function (fn) {
    return function (this_) {
        for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
            args[_key7 - 1] = arguments[_key7];
        }

        return fn.apply(this_, args);
    };
};

_.asMethod = function (fn) {
    return function () {
        return fn.apply(undefined, [this].concat(_.asArray(arguments)));
    };
}; // @hide


/*  _.once
    ======================================================================== */

_.withTest(['function', 'once'], function () {

    $assertEveryCalledOnce(function (mkay) {
        var f = _.once(function () {
            mkay();
        });
        f();
        f();
    });
}, function () {

    _.once = function (fn) {
        var called = false;
        return function () {
            if (!called) {
                called = true;
                return fn.apply(this, arguments);
            }
        };
    };
});

/*  _.withTimeout
    ======================================================================== */

_.deferTest(['function', 'withTimeout'], function (testDone) {

    _.withTimeout({
        maxTime: 10,
        expired: function expired() {
            $fail;
        } }, function (done) {
        done();
    });

    _.withTimeout({
        maxTime: 10,
        expired: function expired(then) {
            testDone();
        } }, function (done) {
        _.delay(done, 20);
    }, function () {
        // 'then' should not be called if expired (though you may call it explicitly at expired() callback)
        $fail;
    });
}, function () {

    _.withTimeout = function (cfg, what, then) {
        var expired = false;
        var timeout = setTimeout(function () {
            expired = true;
            if (cfg.expired) {
                cfg.expired(then);
            }
        }, cfg.maxTime);

        what(function () {
            if (!expired) {
                clearTimeout(timeout);
                if (then) {
                    then.apply(this, arguments);
                }
            }
        });
    };
});

/*  Sequential composition operator (inverted _.compose, basically)
    ======================================================================== */

_.withTest(['function', 'sequence / then'], function () {

    var context = { foo: 'bar' };

    var makeCookies = function makeCookies(from) {
        $assert(this === context);
        return 'cookies from ' + from;
    };

    var eatCookies = function eatCookies(cookies) {
        $assert(this === context);
        return 'nice ' + cookies;
    };

    var lifeProcess = makeCookies.then ? // available in both notations
    makeCookies.then(eatCookies) : _.then(makeCookies, eatCookies);

    var anotherWay = _.sequence(makeCookies, eatCookies);
    var wayAnother = _.sequence([makeCookies, eatCookies]);

    $assert(lifeProcess.call(context, 'shit'), 'nice cookies from shit');
    $assert(anotherWay.call(context, 'shit'), 'nice cookies from shit');
    $assert(wayAnother.call(context, 'shit'), 'nice cookies from shit');

    $assert(_.sequence([]).call(context, 'foo'), 'foo');

    var plusBar = _.then(function (x) {
        return Promise.resolve(x);
    }, function (x) {
        return x + 'bar';
    });

    return plusBar('foo').then(function (x) {
        $assert(x, 'foobar');
    });
}, function () {

    _.sequence = function (arg) {
        // was _.flip (_.compose) before... but it needs performance
        var chain = _.isArray(arg) ? arg : _.asArray(arguments);
        var length = chain.length;
        return length === 0 ? _.identity : function (x) {
            for (var i = 0; i < length; i++) {
                x = chain[i].call(this, x);
            }
            return x;
        };
    };

    _.seq = _.sequence;

    _.then = function (fn1, fn2) {
        return function (args) {
            var r = fn1.apply(this, arguments);
            return r instanceof Promise ? r.then(fn2.bind(this)) : fn2.call(this, r);
        };
    };
});

/***/ }),
/* 174 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./base/tier0/meta-tags.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This is temporary (until refactoring done)

$global.Meta = __webpack_require__(/*! meta-fields */ 144);

Meta.$definition = {}; // to make it recognizeable by OOP.js

$global.$untag = Meta.unwrap;

Meta.unwrapAll = function (x) {
	return _.map2(Meta.unwrap(x), Meta.unwrap);
};['constant', 'get', 'once', 'async', 'atom'].forEach(Meta.globalTag); // TODO: get rid of this

$atom.unwrap = function (x) {
	// WTF? get rid of this

	return $atom.read(x) === true ? Meta.unwrap(x) : x;
};

/***/ }),
/* 175 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/tier0/platform.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _ = __webpack_require__(/*! underscore */ 5)

/*  $platform / $global
    ======================================================================== */

;(function () {

    var p = function () {

        if (typeof window !== 'undefined' && window.window === window && window.navigator !== undefined) {

            var platform = navigator.platform,
                userAgent = navigator.userAgent,
                platformOrUserAgent = platform + '\n' + userAgent;

            return _.extend({
                engine: 'browser',
                browserEngine: userAgent.indexOf('AppleWebKit') >= 0 ? 'WebKit' : undefined,
                browser: userAgent.indexOf('Firefox') >= 0 ? 'Firefox' : userAgent.indexOf('Chrome') >= 0 ? 'Chrome' : userAgent.indexOf('Safari') >= 0 ? 'Safari' : userAgent.indexOf('Trident') >= 0 ? 'IE' : undefined }, platform.indexOf("Linux arm") >= 0 || platformOrUserAgent.indexOf("Android") >= 0 ? { touch: true, system: 'Android' } : platformOrUserAgent.indexOf("iPad") >= 0 ? { touch: true, system: 'iOS', device: 'iPad' } : platformOrUserAgent.indexOf("iPhone") >= 0 || platformOrUserAgent.indexOf("iPod") >= 0 ? { touch: true, system: 'iOS', device: 'iPhone' } : {});
        } else if (typeof global !== 'undefined' && global.global === global) {
            return { engine: 'node' };
        } else {
            return {};
        }
    }();

    if (p.system === 'iOS') {
        var match = navigator.userAgent.match(/OS (\d+)_(\d+)/);
        if (match) {
            p.systemVersion = { major: Number(match[1]), minor: Number(match[2]) };
        }
    }

    var $global = p.engine === 'browser' ? window : p.engine === 'node' ? global : undefined;

    $global.property = function (name, v, cfg) {

        if (name in $global) {
            throw new Error('cannot redefine global ' + name);
        } else {
            var def = v instanceof Function ? { get: v, set: function set() {
                    throw new Error('cannot set global ' + name);
                } } : v;

            return Object.defineProperty($global, name, Object.assign({}, def, { enumerable: true }, cfg));
        }
    };

    $global.const = function (name, v, cfg) {
        return $global.property(name, { value: v, writable: false }, cfg);
    };

    $global.const('$global', $global);
    $global.const('$platform', { engine: p.engine,
        system: p.system,
        device: p.device,
        touch: p.touch || false,

        IE: p.browser === 'IE',
        Firefox: p.browser === 'Firefox',
        Safari: p.browser === 'Safari',
        Chrome: p.browser === 'Chrome',
        WebKit: p.browserEngine === 'WebKit',

        Browser: p.engine === 'browser',
        NodeJS: p.engine === 'node',
        iPad: p.device === 'iPad',
        iPhone: p.device === 'iPhone',
        iOS: p.system === 'iOS',

        iPhone4: p.device === 'iPhone' && window.screen.height === 480,

        systemVersion: p.systemVersion
    });
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../~/webpack/buildin/global.js */ 29)))

/***/ }),
/* 176 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./base/tier0/properties.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! underscore */ 5);

/*  Properties
    ======================================================================== */

_.withTest('properties', function () {
    var obj = {};

    _.defineProperty(obj, 'fourtyTwo', 42);
    _.defineProperty(obj, 'fourtyTwo_too', function () {
        return 42;
    });
    _.defineProperty(obj, 'fourtyTwo_orDie', function (x) {
        $assert(x == 42);return 42;
    });
    _.defineProperty(obj, 'fourtyTwo_eitherWay', {
        configurable: true,
        get: function get() {
            return 42;
        },
        set: function set(x) {
            $assert(x == 42);
        } });

    $assert(42, obj.fourtyTwo, obj.fourtyTwo_too, obj.fourtyTwo_orDie(42), obj.fourtyTwo_eitherWay = 42);

    delete obj.fourtyTwo_eitherWay; // can be deleted if configurable:true
    $assert(obj.fourtyTwo_eitherWay === undefined);

    $assertThrows(function () {
        return delete obj.fourtyTwo;
    }); // cannot be deleted (as default behavior)

    _.defineHiddenProperty(obj, 'hiddenAndDangerous', 42); // shortut for enumerable:false
    $assert(_.keys(obj).indexOf('hiddenAndDangerous') < 0);

    $assertEveryCalledOnce(function (mkay) {
        // memoized property
        _.defineMemoizedProperty(obj, '_42', function () {
            mkay();return 42;
        });
        $assert(obj._42, obj._42, obj._42, 42);
    });
}, function () {
    _.extend(_, {

        defineProperty: function defineProperty(targetObject, name, def, defaultCfg) {
            if (_.isObject(targetObject) && targetObject.hasOwnProperty(name)) {
                throw new Error('_.defineProperty: targetObject already has property ' + name);
            } else {
                Object.defineProperty(targetObject, name, _.extend({ enumerable: true }, defaultCfg, _.coerceToPropertyDefinition(def, name)));
            }
        },

        defineHiddenProperty: function defineHiddenProperty(targetObject, name, def, defaultCfg) {
            return _.defineProperty(targetObject, name, def, _.extend({ enumerable: false }, defaultCfg));
        },

        defineMemoizedProperty: function defineMemoizedProperty(targetObject, name, def_, defaultCfg) {
            var def = _.coerceToPropertyDefinition(def_, name);
            return _.defineProperty(targetObject, name, _.extend({}, def, {
                get: _.memoizeToThis('_' + name, def.get) }), defaultCfg);
        },

        defineProperties: function defineProperties(targetObject, properties) {
            _.each(properties, _.defineProperty.partial(targetObject).flip2);
        },

        memoizedState: function memoizedState(obj) {
            return _.filter2(obj, function (v, k) {
                return k[0] === '_' && !_.isFunction(v);
            });
        },

        memoizeToThis: function memoizeToThis(name, fn) {
            return function () {
                var memo = this[name];
                return memo !== undefined ? memo : this[name] = fn.call(this);
            };
        },

        coerceToPropertyDefinition: function coerceToPropertyDefinition(value_, /* optional */name) {
            var value = value_ || {};
            var actualValue = Meta.unwrap(value_);
            var tags = Meta.tags(value_);

            // property definition case (short circuit then)
            return !tags.constant && !tags.get && _.isPropertyDefinition(actualValue) && actualValue ||

            // get-accessor-alone case
            (tags.get || !tags.constant && _.isFunction(actualValue) && _.noArgs(actualValue)) && { get: actualValue,
                set: _.throwsError('cannot change ' + (name || 'property') + ' (as it\'s an accessor function)') } ||

            // constant value case
            !tags.get && { get: _.constant(actualValue),
                set: _.throwsError('cannot change ' + (name || 'property') + ' (as it\'s sealed to ' + actualValue + ')') } ||

            // any other case (erroneous)
            _.throwsError('coerceToPropertyDefinition: crazy input, unable to match')();
        },

        isPropertyDefinition: function isPropertyDefinition(obj) {
            return _.isObject(obj) && (_.isFunction(obj.get) || _.isFunction(obj.set));
        },

        ownProperties: function ownProperties(obj) {
            return obj && _.pickKeys(obj, obj.hasOwnProperty.bind(obj)) || {};
        } });
});

/***/ }),
/* 177 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./base/tier0/stdlib.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(/*! underscore */ 5);

var O = __webpack_require__(/*! es7-object-polyfill */ 42);

_.hasStdlib = true;

/*  _.throwsError
    ======================================================================== */

_.withTest(['stdlib', 'throwsError'], function () {

    $assertThrows(_.throws('foo'), 'foo');

    $assertThrows(_.throwsError('неуловимый Джо'), _.matches({ message: 'неуловимый Джо' }));
    $assertThrows(_.throwsError(new Error('неуловимый Джо')), _.matches({ message: 'неуловимый Джо' }));
}, function () {

    _.throwsError = _.higherOrder(_.throwError = function (msg) {
        throw msg instanceof Error ? msg : new Error(msg);
    });

    _.throws = _.higherOrder(_.throw = function (msg) {
        throw msg;
    });

    _.overrideThis = _.throwsError('override this');
    _.notImplemented = _.throwsError('not implemented');
});

/*  Abstract _.values
    ======================================================================== */

_.withTest(['stdlib', 'values2'], function () {

    $assert(_.values2(undefined), []);
    $assert(_.values2(_.identity), [_.identity]);
    $assert(_.values2('foo'), ['foo']);
    $assert(_.values2(['foo', 'bar']), ['foo', 'bar']);
    $assert(_.values2({ f: 'foo', b: 'bar' }), ['foo', 'bar']);
}, function () {
    _.mixin({
        values2: function values2(x) {
            if (_.isArrayLike(x)) {
                return x;
            } else if (_.isStrictlyObject(x)) {
                return _.values(x);
            } else if (_.isEmpty(x)) {
                return [];
            } else {
                return [x];
            }
        } });
});

/*  Map 2.0
    ======================================================================== */

/*  Semantically-correct abstract map (maps any type of value)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest(['stdlib', 'map2'], function () {

    var plusBar = _.appends('bar');

    $assert(_.map2('foo', plusBar), 'foobar');
    $assert(_.map2(['foo'], plusBar), ['foobar']);
    $assert(_.map2({ foo: 'foo' }, plusBar), { foo: 'foobar' });

    $assert(Array.from(_.map2(new Set(['foo', 'bar']), plusBar).values()), ['foobar', 'barbar']);

    /*  With flipped order of arguments (callback first)
     */
    $assert(_.mapWith(plusBar, { foo: 'foo' }), { foo: 'foobar' });
}, function () {
    _.mixin({ map2: function map2(value, fn, context) {
            return _.isArrayLike(value) ? _.map(value, fn, context) : value instanceof Set ? _.mapSet(value, fn, context) : _.isStrictlyObject(value) ? _.mapValues(value, fn, context) : fn.call(context, value);
        } });

    _.mapSet = function (set, fn, ctx) {
        var out = new Set();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var x = _step.value;
                out.add(fn.call(ctx, x));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return out;
    };
    _.mapsWith = _.higherOrder(_.mapWith = _.flip2(_.map2));
});

/*  Pluck 2.0
    ======================================================================== */

_.pluck2 = function (x, prop) {
    return _.map2(x, _.property(prop));
};

/*  Maps one-to-many
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest(['stdlib', 'scatter/obj/arr'], function () {

    $assert(undefined, _.scatter([], _.noop));

    $assert([1, 10, 2, 20, 3, 30], _.scatter([1, 2, 3], function (x, i, return_) {
        return_(x);return_(x * 10);
    }));
    $assert({ 'b': 0, 'a': 1, 'r': 2 }, _.scatter('bar', function (x, i, return_) {
        _.each(x.split(''), _.flip(return_));
    }));

    $assert(_.obj(_.noop), _.arr(_.noop), undefined);

    $assert(_.obj(function (emit) {
        emit(42, 'foo');
        emit(43, 'bar');
    }), { foo: 42, bar: 43 });

    $assert(_.arr(function (emit) {
        emit(42);
        emit(43, 44);
    }), [42, [43, 44]]);
}, function () {
    _.mixin({
        scatter: function scatter(obj, elem) {
            var result = undefined;
            _.map2(obj, function (x, i) {
                elem(x, i, function (v, k) {
                    if (arguments.length < 2) {
                        (result = result || []).push(v);
                    } else {
                        (result = result || {})[k] = v;
                    }
                });
            });return result;
        } });
    _.obj = function (emitItems) {
        var x = undefined;emitItems(function (v, k) {
            (x = x || {})[k] = v;
        });
        return x;
    };

    _.arr = function (emitItems) {
        var x = undefined;emitItems(function (v) {
            (x = x || []).push(arguments.length < 2 ? v : _.asArray(arguments));
        });
        return x;
    };
});

/*  Maps keys (instead of values)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest(['stdlib', 'mapKeys'], function () {

    $assert(_.mapKeys({ 'foo': [1, 2, { 'gay': 3 }] }, _.appends('bar')), { 'foobar': [1, 2, { 'gaybar': 3 }] });
}, function () {
    _.mapKeys = function (x, fn) {
        if (_.isArrayLike(x)) {
            return _.map(x, _.tails2(_.mapKeys, fn));
        } else if (_.isStrictlyObject(x)) {
            return _.fromPairs(_.map(O.entries(x), function (kv) {
                return [fn(kv[0]), _.mapKeys(kv[1], fn)];
            }));
        } else {
            return x;
        }
    };
});

/*  Hyper map (deep) #1 — maps leafs
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest(['stdlib', 'mapMap'], function () {

    $assert(_.mapMap(7, _.typeOf), 'number'); // degenerate cases
    $assert(_.mapMap([7], _.typeOf), ['number']);

    $assert(_.mapMap({ foo: 7,
        bar: ['foo', {
            bar: undefined }] }, _.typeOf), { foo: 'number',
        bar: ['string', {
            bar: 'undefined' }] });
}, function () {

    _.mapMap = _.hyperOperator(_.unary, _.map2);
});

/*  Hyper map (deep) #2 — maps branches & leafs 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest(['stdlib', 'hyperMap'], function () {

    var complexObject = { garply: { bar: { baz: 5 } },
        frobni: { foo: [{ bar: { baz: 5 } }] } };
    /*                                         -----------------             */

    var barBazSubstructure = _.matches({ bar: { baz: 5 } });

    var transformedObject = _.hyperMap(complexObject, function (x) {
        if (barBazSubstructure(x)) {
            return 'pwned!';
        }
    });

    $assert(transformedObject, { garply: 'pwned!',
        frobni: { foo: ['pwned!'] } });
}, function () {

    _.hyperMap = function (data, op) {
        return _.hyperOperator(_.unary, function (expr, f) {
            return op(expr) || _.map2(expr, f);
        })(data, _.identity);
    };
});

/*  Abstract _.pairs
    ======================================================================== */

_.withTest(['stdlib', 'pairs2'], function () {

    $assert(_.pairs2(undefined), [[undefined, undefined]]); // TODO: unify semantics with _.values2
    $assert(_.pairs2(_.identity), [[undefined, _.identity]]);
    $assert(_.pairs2('foo'), [[undefined, 'foo']]);
    $assert(_.pairs2(['foo', 'bar']), [[0, 'foo'], [1, 'bar']]);
    $assert(_.pairs2({ 0: 'foo', 1: 'bar' }), [['0', 'foo'], ['1', 'bar']]);
}, function () {

    _.pairs2 = function (x) {
        return _.scatter(x, function (x, i, return_) {
            return_([i, x]);
        });
    };
});

/*  Filter 2.0
    ======================================================================== */

_.withTest(['stdlib', 'filter 2.0'], function () {
    var foo = _.equals('foo');

    // generic filter behavior for any container type

    $assert(_.filter2('foo', foo), 'foo');
    $assert(_.filter2(['foo'], foo), ['foo']);
    $assert(_.filter2({ f: 'foo' }, foo), { f: 'foo' });

    $assert(_.filter2('foo', _.not(foo)), undefined);
    $assert(_.filter2(['foo'], _.not(foo)), []);
    $assert(_.filter2({ f: 'foo' }, _.not(foo)), {});

    // map behavior, if predicate returns not boolean (mixed-behavior test not needed - although its the expected case of use)

    $assert(_.filter2('foo', _.constant('bar')), 'bar');
    $assert(_.filter2(['foo'], _.constant('bar')), ['bar']);
    $assert(_.filter2({ f: 'foo' }, _.constant('bar')), { f: 'bar' });

    // hyper-filter #1 (works on leafs)

    $assert(_.filterFilter({ foo: 'foo', bar: [7, 'foo', { bar: 'foo' }] }, _.not(_.equals('foo'))), { bar: [7, {}] });

    // there was a bug

    $assert(_.hyperFilter({ foo: /regexp/ }, _.constant(true)).foo instanceof RegExp);
}, function () {

    _.reject2 = function (value, op) {
        return _.filter2(value, _.not(op));
    };

    _.filter2 = function (value, op) {
        if (_.isArrayLike(value)) {
            var result = [];
            for (var i = 0, n = value.length; i < n; i++) {
                var v = value[i],
                    opSays = op(v, i);
                if (opSays === true) {
                    result.push(v);
                } else if (opSays !== false) {
                    result.push(opSays);
                }
            }return result;
        } else if (_.isStrictlyObject(value)) {
            var result = {};
            _.each(Object.keys(value), function (key) {
                var v = value[key],
                    opSays = op(v, key);
                if (opSays === true) {
                    result[key] = v;
                } else if (opSays !== false) {
                    result[key] = opSays;
                }
            });return result;
        } else {
            var opSays = op(value);
            if (opSays === true) {
                return value;
            } else if (opSays !== false) {
                return opSays;
            } else {
                return undefined;
            }
        }
    };

    _.filterFilter = _.hyperOperator(_.unary, _.filter2);

    _.hyperFilter = function (data, op) {
        return _.hyperOperator(_.unary, function (expr, f) {
            var x = op(expr);
            return x === true && _.filter2(expr, f) || x;
        })(data, _.identity);
    };

    _.hyperReject = function (data, op) {
        return _.hyperFilter(data, function (x) {
            var opa = op(x);
            return _.isBoolean(opa) ? !opa : opa;
        });
    };
});

/*  ------------------------------------------------------------------------ */

_.withTest(['stdlib', 'each 2.0'], function () {

    var test = function test(input) {
        var output = [];
        _.each2(input, function (x, i, n) {
            output.push([x, i, n]);
        });return output;
    };

    $assert(test('foo'), [['foo', undefined, 1]]);
    $assert(test(['foo', 'bar']), [['foo', 0, 2], ['bar', 1, 2]]);
    $assert(test({ 'f': 'oo',
        'b': 'ar' }), [['oo', 'f', 2], ['ar', 'b', 2]]);
}, function () {

    _.each2 = function (x, f) {
        if (_.isArrayLike(x)) {
            for (var i = 0, n = x.length; i < n; i++) {
                f(x[i], i, n);
            }
        } // @hide
        else if (_.isStrictlyObject(x)) {
                var k = Object.keys(x);for (var ki, i = 0, n = k.length; i < n; i++) {
                    f(x[ki = k[i]], ki, n);
                }
            } else {
                f(x, undefined, 1);
            }
    };
});

/*  Reduce on steroids
    ======================================================================== */

_.withTest(['stdlib', 'reduce 2.0'], function () {

    $assert(_.reduce2(3, [7, 9], _.sum), 19);
    $assert(_.reduce2([3, 7, 9], _.sum), 19);
    $assert(_.reduce2({ a: 3, b: 7, c: 9 }, _.sum), 19);
    $assert(_.reduce2(3 + 7 + 9, _.sum), 19);

    $assert(_.reduce2([1], _.sum), 1);
    $assert(_.reduce2([], _.sum), undefined);

    $assert(1 + 20 + 3 + 4 + 5, _.reduceReduce([[[1], 20], [3, [4, 5]]], function (a, b) {
        return _.isNumber(a) && _.isNumber(b) ? a + b : b;
    }));
}, function () {

    /*  Because hyperOperator is fractal thing, it is nessesary to define a compatible argument
        order for _.reduce and its functor operand, as they get melted together to form a generic
        self-similar routine of a higher order.
         And that becames kinda "Yodish" when applied to familiar 'reduce'. See how they dont match:
             1. _.reduce (value, op, memo)
            2.       op (memo, value)
    */

    _.reduce2 = function (_1, _2, _3) {
        var no_left = arguments.length < 3;
        var left = _1,
            rights = _2,
            op = _3;
        if (no_left) {
            left = undefined;rights = _1;op = _2;
        }

        _.each2(rights, function (right, i) {
            left = no_left ? right : op(left, right);no_left = false;
        });return left;
    }; // @hide

    _.reduceReduce = function (_1, _2, _3) {
        var initial = _1,
            value = _2,
            op = _3;
        if (arguments.length < 3) {
            initial = {};value = _1;op = _2;
        }
        return _.hyperOperator(_.binary, _.reduce2, _.goDeeperAlwaysIfPossible)(initial, value, op);
    };
});

/*  Abstract concat
    ======================================================================== */

_.withTest(['stdlib', 'concat2'], function () {

    $assert(_.concat([1, 2], [3], [4, 5]), [1, 2, 3, 4, 5]);
    $assert(_.concat({ foo: 1 }, { bar: 2 }), { foo: 1, bar: 2 });
    $assert(_.concat([{ foo: 1 }, { bar: 2 }]), { foo: 1, bar: 2 });
    $assert(_.concat(1, 2, 3), 6);
}, function () {

    _.concat = function (a, b) {
        var first, rest;
        if (arguments.length === 1) {
            first = a[0];rest = a.slice(1);
        } else {
            first = a;rest = [].slice.call(arguments, 1);
        }

        return _.isArrayLike(first) ? first.concat.apply(first, rest) : _.reduce2(first, rest, function (a, b) {
            if (_.isObject(a) && _.isObject(b)) {
                return _.extend({}, a, b);
            } else {
                return a + b;
            }
        });
    };
});

/*  Zip 2.0
    ======================================================================== */

/*  Abstract zip that reduces any types of matrices.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.deferTest(['stdlib', 'zip2'], function () {

    $assert(_.zip2(['f', 'o', 'o'], _.concat), 'foo');

    $assert(_.zip2([['f', 'b'], ['o', 'a'], ['o', 'r']], _.concat), ['foo', 'bar']);

    $assert(_.zip2([{ foo: 'f', bar: 'b' }, { foo: 'o', bar: 'a' }, { foo: 'o', bar: 'r' }], _.concat), { foo: 'foo', bar: 'bar' });

    $assert(_.zip2({ foo: 'f', bar: 'b' }, // passing rows as arguments
    { foo: 'o', bar: 'a' }, { foo: 'o', bar: 'r' }, _.concat), { foo: 'foo', bar: 'bar' });

    $assert(_.zip2(undefined, _.concat), undefined); // degenerate cases
    $assert(_.zip2(5, _.concat), 5);
    $assert(_.zip2([], _.concat), []);
    $assert(_.zip2(['foo'], _.concat), 'foo');

    $assert(_.zipObjectsWith([{ name: 'string' }, { born: 123 }], _.array), { name: ['string', undefined],
        born: [undefined, 123] });

    $assert([3], _.zipSetsWith([new Set([2, 3]), new Set([3, 4])], function (a, b) {
        return a && b;
    }).asArray);
}, function () {
    _.mixin({

        zipSetsWith: function zipSetsWith(sets, fn) {
            return _.reduce(sets.slice(1), function (memo, obj) {
                _.each(_.union(obj && Array.from(obj.values()) || [], memo && Array.from(memo.values()) || []), function (k) {

                    var zipped = fn(memo && memo.has(k) ? k : undefined, obj && obj.has(k) ? k : undefined);
                    if (zipped === undefined) {
                        memo.delete(k);
                    } else {
                        memo.add(zipped);
                    }
                });return memo;
            }, new Set(sets[0]));
        },

        zipObjectsWith: function zipObjectsWith(objects, fn) {
            return _.reduce(objects.slice(1), function (memo, obj) {
                _.each(_.union(_.keys(obj), _.keys(memo)), function (k) {
                    var zipped = fn(memo && memo[k], obj && obj[k]);
                    if (zipped === undefined) {
                        delete memo[k];
                    } else {
                        memo[k] = zipped;
                    }
                });return memo;
            }, _.clone(objects[0]));
        },

        zip2: function zip2(rows_, fn_) {
            var rows = arguments.length === 2 ? rows_ : _.initial(arguments);
            var fn = arguments.length === 2 ? fn_ : _.last(arguments);
            if (!_.isArrayLike(rows) || rows.length === 0) {
                return rows;
            } else {
                if (_.isArrayLike(rows[0])) {
                    return _.zipWith(rows, fn);
                } else if (rows[0] instanceof Set) {
                    return _.zipSetsWith(rows, fn);
                } else if (_.isStrictlyObject(rows[0])) {
                    return _.zipObjectsWith(rows, fn);
                } else {
                    return _.reduce2(rows, fn);
                }
            }
        } });
});

/*  Hyperzip (deep one).
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest(['stdlib', 'zipZip'], function () {

    $assert(_.zipZip({ phones: [{ number: 'number' }] }, { phones: [{ number: 333 }] }, _.array), { phones: [{ number: ['number', 333] }] });

    $assert(_.zipZip([{ foo: 7,
        bar: ['foo', {
            bar: undefined }] }, { foo: 'number',
        bar: ['string', {
            bar: 'undefined' }] }], _.array), { foo: [7, 'number'],
        bar: [['foo', 'string'], {
            bar: [undefined, 'undefined'] }] });
}, function () {

    _.mixin({ zipZip: _.hyperOperator(_.binary, _.zip2) });
});

/*  Most useful _.extend derivatives
    ======================================================================== */

_.withTest(['stdlib', 'extend 2.0'], function () {

    /*  Inverted version of _.extend, for humanized narration where it makes sense (not here,
        but see AOP impl for example of such one)
     */
    [function () {

        var input = { foo: 1, bar: 1 };
        var plus = { foo: 42, qux: 1 };
        var gives = { foo: 42, qux: 1, bar: 1 };

        $assert(_.extendWith(plus, input), gives);
    }(),

    /*  Higher-order version of _.extend, allows to use it as _.map operator, which cuts
        shit in typical arrays-of-objects crunching routines
     */
    function () {
        var input = [{ bar: 1 }, {}];
        var plus = _.extendsWith({ foo: 42 });
        var gives = [{ bar: 1, foo: 42 }, { foo: 42 }];

        $assert(_.map(input, _.arity1(plus)), gives);
    }(),

    /*  NOW DEPRECATED, USE _.extendedDeep
     */
    function () {
        var input = { foo: 1, bar: { qux: 1 } };
        var plus = { foo: 42, bar: { baz: 1 } };
        var gives = { foo: 42, bar: { baz: 1, qux: 1 } };

        $assert(_.extend2(input, plus), gives);
    }(),

    /*  Deep version of _.extend, allowing to extend arbitrary levels deep (referentially transparent, so _.extendedDeep instead of _.extendDeep)
     */
    function () {

        var input = { foo: 1, bar: { qux: 1 } };
        var plus = { foo: 42, bar: { baz: 1 } };
        var gives = { foo: 42, bar: { baz: 1, qux: 1 } };

        $assert(_.extendedDeep(input, plus), gives);

        $assert(_.extendedDeep({ foo: new Set([7]) }, {}).foo instanceof Set);

        $assert(Array.from(_.extendedDeep({ foo: new Set([1, 2]) }, { foo: new Set([2, 3]) }).foo.values()), [1, 2, 3]);
    }(),

    /*  Referentially-transparent version (to be used in functional expressions)
     */
    function () {
        var x = { foo: 1 };

        $assert(_.extended(x, { bar: 1 }), { foo: 1, bar: 1 });
        $assert(x, { foo: 1 });
    }()];
}, function () {

    _.extend = $restArg(_.extend); // Mark as having rest argument (to make _.flip work on that shit)

    _.extended = $restArg(function () {
        return _.extend.apply(this, [{}].concat(_.asArray(arguments)));
    }); // referentially-transparent version

    _.extendWith = _.flip(_.extend);
    _.extendsWith = _.flip(_.partial(_.partial, _.flip(_.extend))); // higher order shit

    _.extendedDeep = _.tails3(_.zipZip, function (a, b) {
        return b === undefined ? a : b;
    });

    _.extend2 = $restArg(function (what) {
        return _.extend(what, _.reduceRight(arguments, function (right, left) {
            return _.fromPairs(_.map(_.union(_.keys(left), _.keys(right)), function (key) {
                var lvalue = left[key];
                return [key, key in right ? (typeof lvalue === 'undefined' ? 'undefined' : _typeof(lvalue)) === 'object' ? _.extend(lvalue, right[key]) : right[key] : lvalue];
            }));
        }, {}));
    });
});

/*  Find 2.0 + Hyperfind
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

_.withTest(['stdlib', 'findFind'], function () {

    var obj = { x: 1, y: { z: 2 } };

    $assert(_.findFind({ foo: 1, bar: [1, 2, 3] }, _.constant(false)), false);
    $assert(_.findFind({ foo: 1, bar: [1, 2, 3] }, _.equals(2)), 2);
    $assert(_.findFind({ foo: { bar: obj } }, _.equals(obj)), obj);
}, function () {

    _.find2 = function (value, pred) {
        if (_.isArrayLike(value)) {
            for (var i = 0, n = value.length; i < n; i++) {
                var x = pred(value[i], i, value);
                if (typeof x !== 'boolean') {
                    return x;
                } else if (x === true) {
                    return value[i];
                }
            }
        } else if (_.isStrictlyObject(value)) {
            for (var i = 0, ks = Object.keys(value), n = ks.length; i < n; i++) {
                var k = ks[i];var x = pred(value[k], k, value);
                if (typeof x !== 'boolean') {
                    return x;
                } else if (x === true) {
                    return value[k];
                }
            }
        }
    };

    _.findFind = function (obj, pred_) {
        return _.hyperOperator(_.unary, function (value, pred) {
            if (_.isArrayLike(value)) {
                for (var i = 0, n = value.length; i < n; i++) {
                    var x = pred(value[i]);
                    if (typeof x !== 'boolean') {
                        return x;
                    } else if (x === true) {
                        return value[i];
                    }
                }
            } else if (_.isStrictlyObject(value)) {
                for (var i = 0, ks = Object.keys(value), n = ks.length; i < n; i++) {
                    var k = ks[i];var x = pred(value[k]);
                    if (typeof x !== 'boolean') {
                        return x;
                    } else if (x === true) {
                        return value[k];
                    }
                }
            }

            var x = pred_(value);
            if (typeof x !== 'boolean') {
                return x;
            } else if (x === true) {
                return value;
            }
            return false;
        })(obj, pred_);
    };
});

/*  removes empty contents from any kinds of objects
    ======================================================================== */

_.withTest(['stdlib', 'nonempty'], function () {

    var obj = { blank: {}, empty: [], one: 1, none: undefined, nil: null, clear: '', zero: 0, no: false };
    var arr = [{}, [], 1, undefined, null, '', 0, false];

    $assert(_.nonempty(obj), { one: 1, zero: 0, no: false });
    $assert(_.nonempty(arr), [1, 0, false]);

    $assert(_.nonempty(null), undefined);
    $assert(_.nonempty(''), undefined);
}, function () {

    _.nonempty = function (obj) {
        return _.filter2(obj, _.isNonempty);
    };
});

/*  deep cloning of objects (as _.clone is shallow)
    ======================================================================== */

_.deferTest(['stdlib', 'cloneDeep'], function () {

    var Proto = $prototype({});

    var obj = { a: [{ b: { c: 'd' } }], b: {}, c: new Proto(), e: new Date() };
    var copy = _.cloneDeep(obj);

    $assert(obj !== copy); // should be distinct references
    $assert(obj.a !== copy.a); //
    $assert(obj.b !== copy.b); //
    $assert(obj.c === copy.c); // should be same instance (should consider prototype instances as atomic value)
    $assert(obj.e === copy.e); // Date should not be cloned

    $assert(obj, copy); // structure should not change

    $assert(_.cloneDeep({ foo: new Set() }).foo instanceof Set);
    $assert(Array.from(_.cloneDeep({ foo: new Set([1, 2, 3]) }).foo.values()), [1, 2, 3]);
}, function () {
    _.extend(_, {

        clone: function clone(x) {
            return x instanceof Set ? new Set(x) : x instanceof Date ? x : !_.isObject(x) ? x : _.isArray(x) ? x.slice() : _.extend({}, x);
        },

        cloneDeep: _.tails2(_.mapMap, function (value) {
            return _.isStrictlyObject(value) && !_.isPrototypeInstance(value) ? _.clone(value) : value;
        }) });
});

/*  given objects A and B, _.diff subtracts A's structure from B,
    and returns difference in terms of B
    ======================================================================== */

_.deferTest(['stdlib', 'diff'], function () {

    $assert(_.diff('foo', 'foo'), undefined);
    $assert(_.diff('foo', 'bar'), 'bar');

    $assert(_.diff({ a: 1, b: 2, c: 3 }, { a: 1, b: 3, d: 4 }), { b: 3, d: 4 });

    $assert(_.diff([1, 2, 3], [1, 2, 3]), undefined);

    $assert(_.diff([1, 'foo', 2], [1, 2, 3]), [2, 3]);
}, function () {

    _.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
        return _.coerceToUndefined(_.nonempty(_.zip2(a, b, pred)));
    });

    _.diff = _.tails3(_.hyperMatch, function (a, b) {
        return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? undefined : b;
    });
});

/*  inverse of _.diff (returns similarities)
    ======================================================================== */

_.deferTest(['stdlib', 'undiff'], function () {

    $assert(_.undiff('foo', 'foo'), 'foo');
    $assert(_.undiff('foo', 'bar'), undefined);

    $assert(_.undiff({ a: 1, b: 2, c: 3 }, { a: 1, b: 3, d: 4 }), { a: 1 });

    $assert(_.undiff([1, 2, 3], [1, 2, 3]), [1, 2, 3]);

    $assert(_.undiff([1, 2], [1, 3]), [1, undefined]);
    $assert(_.undiff([1, 2], [0, 2]), [undefined, 2]);
}, function () {

    _.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
        return _.coerceToUndefined(_.zip2(a, b, pred));
    });

    _.undiff = _.tails3(_.hyperMatch, function (a, b) {
        return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? b : undefined;
    });
});

/*  Makes { foo: true, bar: true } from ['foo', 'bar']
    ======================================================================== */

_.withTest(['stdlib', 'index'], function () {

    $assert(_.index(['foo', 'bar']), { foo: true, bar: true });
}, function () {
    _.extend(_, {

        index: function index(list) {
            var result = {};
            for (var i = 0, n = list.length; i < n; i++) {
                result[list[i]] = true;
            }
            return result;
        } });
});

/*  For string wrapping
    ======================================================================== */

_.withTest(['stdlib', 'quote'], function () {

    $assert(_.quote('qux'), 'qux');
    $assert(_.quote('qux', '[]'), '[qux]');
    $assert(_.quote('qux', '/'), '/qux/');
    $assert(_.quote('qux', '{  }'), '{ qux }');
    $assert(_.quote('qux', '</>'), '</qux>');
    $assert(_.quoteWith('[]', 'qux'), '[qux]');
}, function () {

    _.quote = function (s, pattern_) {
        var pattern = pattern_ || '';
        var splitAt = Math.floor(pattern.length / 2 + pattern.length % 2);
        var before = pattern.slice(0, splitAt);
        var after = pattern.slice(splitAt) || before;

        return before + s + after;
    };

    _.quoteWith = _.flip2(_.quote);
    _.quotesWith = _.higherOrder(_.quoteWith);
});

/*  _.partition 2.0
    ======================================================================== */

_.withTest(['stdlib', 'partition2'], function () {

    $assert(_.partition2(['a', 'b', 'c', undefined, undefined, 42], _.isNonempty), [['a', 'b', 'c'], [undefined, undefined], [42]]);

    $assert(_.partition3(['a', 'b', 'c', undefined, undefined, 42], _.typeOf), [{ label: 'string', items: ['a', 'b', 'c'] }, { label: 'undefined', items: [undefined, undefined] }, { label: 'number', items: [42] }]);
}, function () {

    _.partition2 = function (arr, pred) {
        return _.pluck(_.partition3(arr, pred), 'items');
    };

    _.partition3 = function (arr_, pred) {
        var arr = arr_ || [];
        var spans = [],
            span = { label: undefined, items: [arr.first] };

        _.each(arr, function (x) {
            var label = pred(x);
            if (span.label != label && span.items.length) {
                spans.push(span = { label: label, items: [x] });
            } else {
                span.items.push(x);
            }
        });

        return span.length && spans.push(span), spans;
    };
});

/*  Taken from  npmjs.com/package/longest-common-substring
    Props to    npmjs.com/~mirkok
    ======================================================================== */

_.withTest(['stdlib', 'longestCommonSubstring'], function () {

    $assert('foo', _.longestCommonSubstring('foo', 'ffooa'));
}, function () {

    var indexMap = function indexMap(list) {
        var map = {};
        _.each(list, function (each, i) {
            map[each] = map[each] || [];
            map[each].push(i);
        });
        return map;
    };

    _.longestCommonSubstring = function (a, b) {
        var where = _.indexOfLongestCommonSubstring(a, b);
        return where.length ? a.substr(where.a, where.length) : undefined;
    };

    _.indexOfLongestCommonSubstring = function (a, b) {
        var result = { a: 0, b: 0, length: 0 };
        var indexMapBefore = indexMap(a);
        var previousOverlap = [];
        _.each(b, function (eachAfter, indexAfter) {
            var overlapLength;
            var overlap = [];
            var indexesBefore = indexMapBefore[eachAfter] || [];
            _.each(indexesBefore, function (indexBefore) {
                overlapLength = (indexBefore && previousOverlap[indexBefore - 1] || 0) + 1;
                if (overlapLength > result.length) {
                    result.length = overlapLength;
                    result.a = indexBefore - overlapLength + 1;
                    result.b = indexAfter - overlapLength + 1;
                }
                overlap[indexBefore] = overlapLength;
            });
            previousOverlap = overlap;
        });
        return result;
    };
});

/*  experimental shit (subject to removal)
    ======================================================================== */

_.key = function (fn) {
    return function (value, key) {
        return fn(key);
    };
};

_.pickKeys = function (obj, predicate) {
    return _.pick(obj, function (v, k) {
        return predicate(k);
    });
};

/***/ }),
/* 178 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./base/tier0/type.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(/*! underscore */ 5);
var O = __webpack_require__(/*! es7-object-polyfill */ 42);

/*  isTypeOf
    ======================================================================== */

_.isTypeOf = function (constructor, what) {
    return what instanceof constructor;
};

_.isPrototypeInstance = function (x) {
    return x && x.constructor && _.isPrototypeConstructor(x.constructor);
};

_.isPrototypeConstructor = function (x) {
    return x && x.$definition !== undefined || false;
};

/*  NaN has interesting property: Number.NaN !== Number.NaN, this makes it
    more preferable than undefined/null in some cases. This function converts
    anything that is not a number to NaN.
    ======================================================================== */

_.coerceToNaN = function (x) {
    return _.isFinite(x) ? x : Number.NaN;
};

/*  Useful for defining functions that accept either [x] or x as argument
    ======================================================================== */

_.coerceToArray = function (x) {
    return x === undefined ? [] : _.isArray(x) ? x : [x];
};

/*  Useful for defining flow control parameterization
    ======================================================================== */

_.coerceToFunction = function (x) {
    return _.isFunction(x) ? x : _.constant(x);
};

/*  Use to determine whether an object could be enumerated like an Array
    TODO: it may be more reasonable to check for 'length' property presence
    ======================================================================== */

_.isArrayLike = function (x) {
    return x instanceof Array || $platform.Browser && x instanceof NodeList;
};

/*  Fixes _.isArray to account objects that derive from Array prototype
    ======================================================================== */

_.deferTest(['type', 'isArray'], function () {

    var CustomArray = $extends(Array, {
        method: function method() {
            return 42;
        } });

    $assert(_.isArray(new CustomArray()));
}, function () {

    _.isArray = function (x) {
        return x instanceof Array;
    };
});

/*  Better _.matches / $assertMatches: +regexp feature, +deep matching
    ======================================================================== */

_.deferTest(['type', 'matches(regex)'], function () {

    var test = function test(a, pattern) {
        $assert(_.match(a, pattern));
        $assert(_.matches(pattern)(a));
        $assertMatches(a, pattern);
    };

    $assertFails(function () {
        test({ foo: [1, 2], bar: 2 }, { foo: [3], bar: 2 });
        test({ bar: { foo: 'foo' } }, { bar: { foo: /[0-9]+/ } });
        test({}, { foo: 1 });
    });

    $assertFails(function () {
        test({ foo: 1 }, undefined); // differs from original impl in that
        test('.DS_Store', /.+\.js/);
    }); // regression

    test({ foo: [1, 2], bar: 2 }, { foo: [2] });
    test({ bar: { foo: '123', qux: 1 } }, { bar: { foo: /[0-9]+/ } });
    test({ foo: 1 }, {});
}, function () {
    _.mixin({

        matches: function matches(pattern) {
            return arguments.length === 0 && _.constant(true) || _.tails2(_.match, pattern);
        },

        match: function match(a, ptrn) {
            return a === ptrn || _.isArray(a) && _.isArray(ptrn) && _.arrayMatch(a, ptrn) || _.isObject(a) && _.isObject(ptrn) && _.objectMatch(a, ptrn) || _.isTypeOf(RegExp, ptrn) && _.isString(a) && a.match(ptrn) !== null;
        },

        arrayMatch: function arrayMatch(a, pattern) {
            return _.every(pattern, _.propertyOf(_.index(a)));
        },

        objectMatch: function objectMatch(a, pattern) {
            return _.reduce(O.entries(pattern), function (result, kv) {
                return result && _.match(a[kv[0]], kv[1]);
            }, true);
        } });
});

/*  Scalar values
    ======================================================================== */

_.withTest(['type', 'isScalar'], function () {

    $assert(_.every([0, 42, 'foo', null, undefined, true, false], _.isScalar));
    $assert(_.every([/foo/, new Date(), {}, []], _.not(_.isScalar)));
}, function () {

    _.isScalar = function (v) {
        return v === undefined || v === null || v.constructor === String || v.constructor === Number || v.constructor === Boolean;
    };
});

/*  POD data types
    ======================================================================== */

_.withTest(['type', 'POD'], function () {

    $assert(_.every([[], {}, 42, 0, 'foo', null, undefined, true].map(_.isPOD)));
    $assert(_.every([/foo/, new Date()].map(_.isNonPOD)));
}, function () {

    _.isNonPOD = function (v) {
        return !_.isPOD(v);
    };

    _.isPOD = function (v) {
        return _.isScalar(v) || v && (v.constructor === Object || v.constructor === Array);
    };
});

/*  'empty' classifiers (fixes underscore shit)
    ======================================================================== */

_.withTest(['type', 'empty-centric routines'], function () {

    $assert(_.coerceToObject({ foo: 42 }), { foo: 42 });
    $assert(_.coerceToObject([1, 2, 3]), [1, 2, 3]);
    $assert(_.coerceToObject(42), {});
    $assert(_.coerceToObject(undefined), {});

    $assert(_.coerceToEmpty(42), undefined);
    $assert(_.coerceToEmpty([42]), []);
    $assert(_.coerceToEmpty({ foo: 42 }), {});

    $assert([_.isNonemptyString('foo'), _.isNonemptyString(''), _.isNonemptyString([])], [true, false, false]);

    $assert(_.isEmptyArray([]), true);
    $assert(_.isEmptyArray([1, 2, 3]), false);
    $assert(_.isEmptyArray(undefined), false);
    $assert(_.isEmptyArray(null), false);
    $assert(_.isEmptyArray(''), false);

    $assert(_.isEmptyObject({}), true);
    $assert(_.isEmptyObject([]), false);
    $assert(_.isEmptyObject({ foo: 1 }), false);
    $assert(_.isEmptyObject(undefined), false);
    $assert(_.isEmptyObject(null), false);
    $assert(_.isEmptyObject(''), false);
    $assert(_.isEmptyObject(0), false);
    $assert(_.isEmptyObject(false), false);

    $assert(_.isEmpty(0), false);
    $assert(_.isEmpty(false), false);
    $assert(_.isEmpty(/.+\.js/), false); // regression
    $assert(_.isEmpty(null), true);
    $assert(_.isEmpty({}), true);
    $assert(_.isEmpty([]), true);

    $assert(_.isNonempty('foo'), true); // negated _.isEmpty

    $assert(_.coerceToUndefined(undefined), undefined);
    $assert(_.coerceToUndefined({}), undefined);
    $assert(_.coerceToUndefined([]), undefined);
    $assert(_.coerceToUndefined(''), undefined);
    $assert(_.coerceToUndefined(null), undefined);
    $assert(_.coerceToUndefined(0), 0);
    $assert(_.coerceToUndefined(Math.NaN), undefined);
    $assert(_.coerceToUndefined(false), false);
    $assert(_.coerceToUndefined({ foo: 1 }), { foo: 1 });
    $assert(_.coerceToUndefined([1, 2]), [1, 2]);
}, function () {
    _.extend(_, {

        /*  These two override underscore's one, because the original stuff is semantically incorrect.
            A word needs to be spoken here, because it's not the first routine we override, and not
            the last. So what about semantics?
             For instance, 0 and false should NOT be treated as empty. But they are (in underscore).
            This is ridiculous. Can think of hundreds of applications of the correct impl., and
            just none of that for the creeped original version. Why would one ever need to treat 0
            as 'empty'? Shit, its just a regular number, no worse or better than 1 or 42. And 'false'?
            Keep hands off boolean logic. If someone states that something's false - it's false, not
            a 'void non-existing piece of nothing'. It's a value. It has value. And it's false. Oh,
            fock, just don't get me started...
         */
        isEmpty: function isEmpty(obj) {
            return _.coerceToUndefined(obj) === undefined;
        },

        isNonempty: function isNonempty(obj) {
            return _.coerceToUndefined(obj) !== undefined;
        },

        isEmptyObject: function isEmptyObject(v) {
            return !_.isArray(v) && !_.isFunction(v) && _.isObject(v) && _.keys(v).length === 0;
        },

        isStrictlyObject: function isStrictlyObject(v) {
            return v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? true : false;
        },

        isEmptyArray: function isEmptyArray(v) {
            return _.isArray(v) && v.length === 0;
        },

        isNonemptyString: function isNonemptyString(v) {
            return typeof v === 'string' && v.length > 0;
        },

        coerceToObject: function coerceToObject(x) {
            return _.isStrictlyObject(x) ? x : {};
        },

        coerceToEmpty: function coerceToEmpty(x) {
            if (_.isArray(x)) {
                return [];
            } else if (_.isStrictlyObject(x)) {
                return {};
            } else {
                return undefined;
            }
        },

        /*  Projects a variety of input values through 'undefined/non-undefined' dichotomy.
         */
        coerceToUndefined: function coerceToUndefined(v) {
            return v === undefined || v === null || v === Math.NaN || v === '' || _.isPOD(v) && (_.isEmptyObject(v) || v.length === 0) ? undefined : v;
        } });
});

/***/ }),
/* 179 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./base/tier0/typeMatch.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = __webpack_require__(/*! underscore */ 5);

_.hasTypeMatch = true;

/*  Type matching for arbitrary complex structures (TODO: test)
    ======================================================================== */

Meta.globalTag('required');
Meta.globalTag('atom');

$global.const('$any', _.identity);

_.deferTest(['type', 'type matching'], function () {

    $assert(_.omitTypeMismatches({ '*': $any, foo: $required('number'), bar: $required('number') }, { baz: 'x', foo: 42, bar: 'foo' }), {});

    $assert(_.omitTypeMismatches({ foo: { '*': $any } }, { foo: { bar: 42, baz: 'qux' } }), { foo: { bar: 42, baz: 'qux' } });

    $assert(_.omitTypeMismatches({ foo: { bar: $required(42), '*': $any } }, { foo: { bar: 'foo', baz: 'qux' } }), {});

    $assert(_.omitTypeMismatches([{ foo: $required('number'), bar: 'number' }], [{ foo: 42, bar: 42 }, { foo: 24 }, { bar: 42 }]), [{ foo: 42, bar: 42 }, { foo: 24 }]);

    $assert(_.omitTypeMismatches({ '*': 'number' }, { foo: 42, bar: 42 }), { foo: 42, bar: 42 });

    $assert(_.omitTypeMismatches({ foo: $any }, { foo: 0 }), { foo: 0 }); // there was a bug (any zero value was omitted)

    $assert(_.decideType([]), []);
    $assert(_.decideType(42), 'number');
    $assert(_.decideType(_.identity), 'function');
    $assert(_.decideType([{ foo: 1 }, { foo: 2 }]), [{ foo: 'number' }]);
    $assert(_.decideType([{ foo: 1 }, { bar: 2 }]), []);

    $assert(_.decideType(_defineProperty({ foo: { bar: 1 } }, 'foo', { baz: [] })), _defineProperty({ foo: { bar: 'number' } }, 'foo', { baz: [] }));

    $assert(_.decideType(_defineProperty({ foo: { bar: 1 } }, 'foo', { bar: 2 })), { foo: { bar: 'number' } });

    $assert(_.decideType({ foo: { bar: 1 },
        bar: { bar: 2 } }), { '*': { bar: 'number' } });

    if (_.hasOOP) {
        var Type = $prototype();
        $assert(_.decideType({ x: new Type() }), { x: Type });
    }
}, function () {

    _.isMeta = function (x) {
        return x === $any || $atom.is(x) || $required.is(x);
    };

    var zip = function zip(type, value, pred) {
        var required = Meta.unwrapAll(_.filter2(type, $required.is));
        var match = _.nonempty(_.zip2(Meta.unwrapAll(type), value, pred));

        if (_.isEmpty(required)) {
            return match;
        } else {
            var requiredMatch = _.nonempty(_.zip2(required, value, pred));
            var allSatisfied = _.values2(required).length === _.values2(requiredMatch).length;
            return allSatisfied ? match : _.coerceToEmpty(value);
        }
    };

    var hyperMatch = _.hyperOperator(_.binary, function (type_, value, pred) {
        var type = Meta.unwrap(type_);

        if (_.isArray(type)) {
            // matches [ItemType] → [item, item, ..., N]
            if (_.isArray(value)) {
                return zip(_.times(value.length, _.constant(type[0])), value, pred);
            } else {
                return undefined;
            }
        } else if (_.isStrictlyObject(type) && type['*']) {
            // matches { *: .. } → { a: .., b: .., c: .. }
            if (_.isStrictlyObject(value)) {
                return zip(_.extend(_.map2(value, _.constant(type['*'])), _.omit(type, '*')), value, pred);
            } else {
                return undefined;
            }
        } else {
            return zip(type_, value, pred);
        }
    });

    var typeMatchesValue = function typeMatchesValue(c, v) {
        var contract = Meta.unwrap(c);
        return contract === $any || contract === undefined && v === undefined || _.isFunction(contract) && (_.isPrototypeConstructor(contract) ? _.isTypeOf(contract, v) : // constructor type
        contract(v) === true) || // test predicate
        (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === contract || // plain JS type
        v === contract;
    }; // constant match

    _.mismatches = function (op, contract, value) {
        return hyperMatch(contract, value, function (contract, v) {
            return op(contract, v) ? undefined : contract;
        });
    };

    _.omitMismatches = function (op, contract, value) {
        return hyperMatch(contract, value, function (contract, v) {
            return op(contract, v) ? v : undefined;
        });
    };

    _.typeMismatches = _.partial(_.mismatches, typeMatchesValue);
    _.omitTypeMismatches = _.partial(_.omitMismatches, typeMatchesValue);

    _.valueMismatches = _.partial(_.mismatches, function (a, b) {
        return a === $any || b === $any || a === b;
    });

    var unifyType = function unifyType(value) {
        if (_.isArray(value)) {
            return _.nonempty([_.reduce(value.slice(1), function (a, b) {
                return _.undiff(a, b);
            }, _.first(value) || undefined)]);
        } else if (_.isStrictlyObject(value)) {
            var pairs = _.pairs(value);
            var unite = _.map(_.reduce(pairs.slice(1), function (a, b) {
                return _.undiff(a, b);
            }, _.first(pairs) || [undefined, undefined]), _.nonempty);

            return _.isEmpty(unite) || _.isEmpty(unite[1]) ? value : _.fromPairs([[unite[0] || '*', unite[1]]]);
        } else {
            return value;
        }
    };

    _.decideType = function (value) {
        var operator = _.hyperOperator(_.unary, function (value, pred) {
            if (value && value.constructor && value.constructor.$definition) {
                return value.constructor;
            }
            return unifyType(_.map2(value, pred));
        });

        return operator(value, function (value) {
            if (_.isPrototypeInstance(value)) {
                return value.constructor;
            } else {
                return _.isEmptyArray(value) ? value : typeof value === 'undefined' ? 'undefined' : _typeof(value);
            }
        });
    };
}); // TODO: fix hyperOperator to remove additional check for []

/***/ }),
/* 180 */,
/* 181 */,
/* 182 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./client/DOMReference.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*  How-to / spec / test
    ============================================================================ */

_.tests['DOMReference + DOMEvents'] = {

    'DOMReference + DOMEvents basics': function DOMReferenceDOMEventsBasics() {

        $assertEveryCalled(function (changeCalled, reactToFocusEventsCalled, reactToWindowResizeCalled, domReadyCalled) {

            /*  Example component that owns a DOM reference and listens to events
                ---------------------------------------------------------------- */

            var textarea = new ($component({

                $traits: [DOMReference, DOMEvents],

                /*  That's how you initialize DOMReference using $barrier (see the big
                    comment below for the example on how to access the stored reference,
                    and why/when you will need that domReady thing).
                    ---------------------------------------------------------------- */

                init: function init() {
                    this.domReady(N.textarea.insertMeAfter(document.body.lastChild));
                },

                /*  That's how you bind to events (simplest way)
                    ---------------------------------------------------------------- */

                change: $on(function (e) {
                    changeCalled();
                }),

                /*  Binding with custom method name
                    ---------------------------------------------------------------- */

                shouldNotCall: $on('input', function () {
                    $fail;
                }),

                /*  Multiple events
                    ---------------------------------------------------------------- */

                reactToFocusEvents: $on('focus blur', function (e) {
                    reactToFocusEventsCalled();
                }),

                /*  Binding to 'window' or 'document' events
                    ---------------------------------------------------------------- */

                reactToWindowResize: $on({ what: 'resize', target: window }, function () {
                    reactToWindowResizeCalled();
                }) }))();

            /*  That's how you access DOM if you're 100% sure it's initialized
                -------------------------------------------------------------------- */

            var dom = textarea.dom;
            $assert(textarea.dom instanceof Node);

            /*  Often you stumble upon a situation when your code tries to access
                something that is not initialized yet (e.g. a DOM tree).
                 Even if you 'fix' that by rearranging the call order, you cannot
                always rely on predictable outcome of that method: as components get
                more complex, you need to look forward for more reliable control
                mechanisms... at least, more reliable than shuffling init calls
                randomly to see if it 'solves' the problem.
                 Normally, it solved by introducing some well-known concurrent
                programming techniques - like a barrier, in this case. By simply
                encapsulating all unsafe DOM accesses to the barrier context,
                you enforce the expected call order automagically™, paying a
                minuscule runtime overhead for that.
                -------------------------------------------------------------------- */

            textarea.domReady(function (dom) {
                $assert(dom instanceof Node);domReadyCalled();
            });

            /*  That's how you dispatch events programmatically
                TODO: configuration
                -------------------------------------------------------------------- */

            textarea.dispatchEvent('change');
            textarea.dispatchEvent('blur');

            /*  Dispatch window.resize
             */
            var e = document.createEvent('Event');
            e.initEvent('resize', true, true);
            window.dispatchEvent(e);

            /*  That's how you enumerate listeners bound with $on 
                -------------------------------------------------------------------- */

            $assert(textarea.constructor.DOMEventListeners, [{ e: 'change', fn: 'change' }, { e: 'input', fn: 'shouldNotCall' }, { e: 'focus', fn: 'reactToFocusEvents' }, { e: 'blur', fn: 'reactToFocusEvents' }, { e: 'resize', fn: 'reactToWindowResize', target: window }]);

            /*  Deinitialization semantics
                -------------------------------------------------------------------- */

            textarea.destroy();

            textarea.dispatchEvent('input'); /*  destroy () removes event listeners, so our .shouldNotCall listener shouldn't get called */
            $assert(!dom.isAttachedToDocument); /*  destroy () removes node from document */
            $assert(textarea.dom, undefined); /*  destroy () sets .dom to undefined     */
        });
    },

    /*  Listeners defined in traits are bound in order of appearance, so you can
        utilize built-in e.stopImmediatePropagation () semantics for the flow control.
        -------------------------------------------------------------------- */

    'Blocking event propagation in $traits with e.stopImmediatePropagation': function BlockingEventPropagationIn$traitsWithEStopImmediatePropagation() {

        $assertEveryCalled(function (blockChangeEventCalled) {

            var textarea = new ($component({

                $traits: [DOMReference, DOMEvents, $trait({ blockChangeEvent: $on('change', function (e) {
                        blockChangeEventCalled();e.stopImmediatePropagation();
                    }) }), $trait({ shouldNotCall: $on('change', function (e) {
                        $fail;
                    }) })],

                init: function init() {
                    this.domReady(N.textarea.insertMeAfter(document.body.lastChild));
                } }))();

            textarea.dispatchEvent('change');
            textarea.destroy();
        });
    } };

/*  Impl.
    ======================================================================== */

$global.DOMReference = $trait({

    domReady: $barrier(function (dom) {
        this.dom = dom;

        if (typeof jQuery !== 'undefined') {
            this.el = jQuery(this.dom);
        }
    }), // legacy

    afterDestroy: function afterDestroy() {

        if (this.dom) {
            this.dom.removeFromParent();
            this.dom = undefined;
            this.el = undefined;
        }

        this.domReady.reset();
    } });

/*  ------------------------------------------------------------------------ */

$global.DOMReferenceWeak = $trait({

    domReady: $barrier(function (dom) {
        this.dom = dom;
    }),
    afterDestroy: function afterDestroy() {
        this.dom = undefined;
    } });

/*  ------------------------------------------------------------------------ */

$global.DOMEvents = $trait({

    /*  TODO: configuration
     */
    dispatchEvent: function dispatchEvent(type) {
        this.domReady(function (dom) {
            var e = document.createEvent('Event');
            e.initEvent(type, true /* bubbles */, true /* cancellable */);
            dom.dispatchEvent(e);
        });
    },
    /*  $on syntax
     */
    $macroTags: {

        on: function on(def, method, methodName) {
            var DOMEventListeners = def.constructor.DOMEventListeners || (def.constructor.DOMEventListeners = []);
            var on_def = $on.read(method);
            on_def = _.isString(on_def) ? { fn: methodName, e: on_def } : _.isObject(on_def) ? { fn: methodName, e: on_def.what, target: on_def.target } : { fn: methodName, e: methodName };

            _.each(on_def.e.split(' '), function (e) {
                DOMEventListeners.push(_.defaults({ e: e }, on_def));
            });
        } },

    /*  Bindings
     */
    domReady: function domReady(dom) {
        _.each(this.constructor.DOMEventListeners, function (on_def) {
            // @hide
            (on_def.target || dom).addEventListener(on_def.e, this[on_def.fn]);
        }, this);
    },

    beforeDestroy: function beforeDestroy() {
        this.domReady(function (dom) {
            _.each(this.constructor.DOMEventListeners, function (on_def) {
                // @hide
                (on_def.target || dom).removeEventListener(on_def.e, this[on_def.fn]);
            }, this);
        });
    } });

/*  ------------------------------------------------------------------------ */

$global.HideOnEscape = $trait({

    hideOnEscape: $on({ what: 'keydown', target: document }, function (e) {
        if (e.keyCode === 27) {
            this.destroy();
            e.preventDefault();
        }
    })
});

/***/ }),
/* 183 */,
/* 184 */,
/* 185 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** ./client/anim.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (frame) {
    return window.setTimeout(frame, 0);
};

var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
    return window.clearTimeout(id);
};

$global.InertialValue = $component({

    $defaults: { duration: 0.2,
        easing: 'linear' },

    animating: $observableProperty(false),
    target: $observableProperty(),
    value: $observableProperty(),

    init: function init(cfg) {
        var _this = this;

        this.easing = (this.value instanceof Vec2 ? Easing.vector : Easing.scalar)[this.easing];

        this.targetChange(function (target) {

            if (target !== undefined) {

                if (_this.animating === false) {
                    _this.start = _this.value;
                    _this.target = target;
                    _this.startTime = Date.now();
                    _this.step();
                } else {
                    _this.start = _this.value;
                    /*this.startTime  = this.lastTime*/
                }
            }
        });
    },
    abort: function abort() {
        if (this.animFrame !== undefined) {
            cancelAnimationFrame(this.animFrame);
            this.animFrame = undefined;
        }
        this.animating = false;
    },
    step: function step() {

        var now = Date.now();
        var travel = Math.min(1.0, ((this.lastTime = now) - this.startTime) / (this.duration * 1000.0));
        if (travel < 1.0) {

            this.animating = true;
            this.value = this.easing(this.start, this.target, travel);
            this.animFrame = requestAnimationFrame(this.step);
        } else {
            this.value = this.target;
            this.animating = false;
        }
    }
});

/*  TODO: write 1-vector and get rid of this doubling...   */

$global.Easing = {

    scalar: {

        linear: function linear(a, b, t) {
            return a + (b - a) * t;
        },
        in: function _in(a, b, t) {
            return a + (b - a) * Math.pow(t, 2);
        },
        out: function out(a, b, t) {
            return b - (b - a) * Math.pow(1.0 - t, 2);
        },
        inOut: function inOut(a, b, t) {
            var c = b - a;
            if (t < 0.5) {
                return a + c * (Math.pow(t * 2.0, 2) * 0.5);
            } else {
                return b - c * (Math.pow(2.0 - t * 2.0, 2) * 0.5);
            }
        }
    },

    vector: {

        linear: function linear(a, b, t) {
            return a.add(b.sub(a).scale(t));
        },
        in: function _in(a, b, t) {
            return a.add(b.sub(a).scale(Math.pow(t, 2)));
        },
        out: function out(a, b, t) {
            return b.sub(b.sub(a).scale(Math.pow(1.0 - t, 2)));
        },
        inOut: function inOut(a, b, t) {
            var c = b.sub(a);
            if (t < 0.5) {
                return a.add(c.scale(Math.pow(t * 2.0, 2) * 0.5));
            } else {
                return b.sub(c.scale(Math.pow(2.0 - t * 2.0, 2) * 0.5));
            }
        }
    }
};

/***/ }),
/* 186 */,
/* 187 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./client/node+.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var is = function is(tag) {
    return function () {
        return this.tagName === tag;
    };
};

/*  Constructors
    ======================================================================== */

/*  N (tag)                                                                  */

$global.N = function (tag, children) {
    var n = document.createElement(tag.uppercase);
    return children ? n.append(children) : n;
};

/*  N.text                                                                   */

N.text = function (text) {
    return document.createTextNode(text);
};

/*  N.span / N.div ...                                                       */

_.each(['br', 'p', 'div', 'em', 'a', 'b', 'i', 'u', 's', 'strong', 'span', 'sup', 'sub', 'button', 'iframe', 'pre', 'img', 'video', 'source', 'h1', 'h2', 'h3', 'h4', 'h5', 'textarea', 'input', 'style'], function (tag) {

    var TAG = tag.uppercase;

    _.defineProperty(N, tag, function () {
        return document.createElement(TAG);
    });
});

/*  Querying                                                                 */

N.all = document.querySelectorAll.bind(document);
N.one = document.querySelector.bind(document);

/*  Node+
    ======================================================================== */

$mixin(Node, {

    $: $prototype.impl.$, // brings this.$ semantics from $prototype


    /*  Various predicates
        ------------------
         New $callableAsFreeFunction tag means that its subject will be available
        as context-free (static) version along with instance method. For example,
        following two calls are equivalent:
             console.log (document.body.isLinebreak)
            console.log (Node.isLinebreak (document.body))
         Having dual calling convention for common predicates is super useful, as
        you can use them in functional data-crunching expressions, where free
        functions are far more suitable than instance methods.
         It was inspired by $extensionMethods from Useless, where it carries the
        exact same semantics for member definitions. Those definitions served
        a very limited purpose of merging Underscore functions to built-in types,
        so a more generic tool needed.
        
        ======================================================================== */

    $callableAsFreeFunction: {

        $property: {

            isElement: function isElement() {
                return this.nodeType === Node.ELEMENT_NODE;
            },
            isText: function isText() {
                return this.nodeType === Node.TEXT_NODE;
            },

            isLinebreak: is('BR'),
            isDiv: is('DIV'),
            isParagraph: is('P'),
            isHyperlink: is('A'),

            isAttachedToDocument: function isAttachedToDocument() {
                return this.matchUpwards(_.equals(document.body)) ? true : false;
            },

            /*  TODO: make use of native .isContentEditable
             */
            forbidsEditing: function forbidsEditing() {
                return this.nodeType === Node.ELEMENT_NODE && this.getAttribute('contenteditable') === 'false';
            } } },

    /*  Up/outside means
        ======================================================================== */

    grandParentNode: $property(function () {
        return this.parentNode && this.parentNode.parentNode;
    }),

    isFirstInParent: $property(function () {
        return this.parentNode && this.parentNode.firstChild === this;
    }),
    isLastInParent: $property(function () {
        return this.parentNode && this.parentNode.lastChild === this;
    }),

    removeFromParent: $callableAsFreeFunction(function () {
        this.parentNode.removeChild(this);return this;
    }),

    outerLeftBoundaryIn: function outerLeftBoundaryIn(container) {
        var n = this;
        while (n.grandParentNode && n.parentNode !== container && n.isFirstInParent) {
            n = n.parentNode;
        }
        return n;
    },

    outerRightBoundaryIn: function outerRightBoundaryIn(container) {
        var n = this;
        while (n.grandParentNode && n.parentNode !== container && n.isLastInParent) {
            n = n.parentNode;
        }
        return n;
    },

    matchUpwards: function matchUpwards(x) {
        var pred = typeof x === 'function' ? x : function (n) {
            return n.matches && n.matches(x);
        };

        var n = this;
        while (n && !pred(n)) {
            n = n.parentNode;
        }
        return n;
    },

    isLeftmostNodeIn: function isLeftmostNodeIn(parent) {
        return parent && this.matchUpwards(function (n) {
            return n === parent || !n.isFirstInParent;
        }) === parent;
    },

    isRightmostNodeIn: function isRightmostNodeIn(parent) {
        return parent && this.matchUpwards(function (n) {
            return n === parent || !n.isLastInParent;
        }) === parent;
    },

    /*  Down/inside means
        ======================================================================== */

    hasChildren: $property(function () {
        return this.hasChildNodes();
    }),
    noChildren: $property(function () {
        return !this.hasChildNodes();
    }),
    numChildren: $property(function () {
        return this.childNodes.length;
    }),

    length: $property(function () {
        return this.childNodes ? this.childNodes.length : this.nodeValue ? this.nodeValue.length : 0;
    }),

    /*  If you modify childNodes while iterating it, you'll get into problem.
        Use following method to safely do so.
     */
    safeEnumChildren: function safeEnumChildren(fn, context) {
        _.each(this.childNodesArray, fn, context || this);return this;
    },

    /*  childNodes is not really an array, so to get Array instance, use this helper
     */
    childNodesArray: $property(function () {
        return _.asArray(this.childNodes);
    }),

    add: $alias('appendChildren'),
    append: $alias('appendChildren'),

    addClass: function addClass(cls) {
        this.classList.add(cls);
        return this;
    },
    appendHTML: function appendHTML(html) {
        return this.appendChildren(N.div.html(html).childNodesArray);
    },


    appendChildren: function appendChildren(arg1, arg2) {
        for (var arr = arg2 === undefined ? _.coerceToArray(arg1) : arguments, i = 0, len = arr.length; i < len; i++) {
            var n = arr[i];
            this.appendChild(_.isString(n) ? document.createTextNode(n) : n);
        }
        return this;
    },

    removeChildren: function removeChildren(nodes) {
        for (var arr = _.coerceToArray(nodes), i = 0, len = arr.length; i < len; i++) {
            this.removeChild(arr[i]);
        }
        return this;
    },

    removeAllChildren: function removeAllChildren() {
        return this.removeChildren(this.childNodesArray);
    },

    walkTree: function walkTree(cfg, accept) {
        accept = arguments.length === 1 ? cfg : accept;

        var node = void 0;
        var walker = document.createTreeWalker(this, cfg && cfg.what || NodeFilter.SHOW_ALL, cfg && cfg.filter || null, cfg && cfg.entityReferenceExpansion || null);

        while (node = walker.nextNode()) {
            accept(node);
        }
    },

    firstInnermostChild: $callableAsMethod($property(function (n) {
        while (n && n.firstChild) {
            n = n.firstChild;
        }return n;
    })),

    /*  foo<b>123</b>bar    →   <b>.unwrapChildren  →   foo123bar
     */
    unwrapChildren: $callableAsFreeFunction(function () {
        this.insertAfterMe(this.childNodesArray);
        var parent = this.parentNode;
        parent.removeChild(this);
        return parent;
    }),

    /*  Sideways means
        ======================================================================== */

    prevSiblings: $property(function () {
        var r = [],
            n = this.previousSibling;
        while (n) {
            r.push(n);n = n.previousSibling;
        }return r.reversed;
    }),

    nextNextSibling: $property(function () {
        return this.nextSibling && this.nextSibling.nextSibling;
    }),

    nextOutermostSibling: $callableAsMethod($property(function (n) {
        while (n && !n.nextSibling) {
            n = n.parentNode;
        } // walk upwards until has next sibling
        if (n) {
            n = n.nextSibling;
        } // take next sibling
        return n;
    })),

    nextInnermostSibling: $callableAsMethod($property(function (n) {
        return Node.firstInnermostChild(Node.nextOutermostSibling(this));
    })),

    appendTo: function appendTo(ref) {
        ref.appendChild(this);return this;
    },

    prependTo: function prependTo(ref) {
        ref.insertBefore(this, ref.firstChild);return this;
    },

    replaceWith: function replaceWith(what) {
        this.insertBeforeMe(what).removeFromParent();
    },

    insertMeBefore: function insertMeBefore(ref) {
        ref.parentNode.insertBefore(this, ref);return this;
    },

    insertMeAfter: function insertMeAfter(ref) {
        ref.parentNode.insertBefore(this, ref.nextSibling);return this;
    },

    insertBeforeMe: function insertBeforeMe(nodes) {
        var parent = this.parentNode;
        var me = this;

        _.each(_.coerceToArray(nodes).reversed, function (n) {
            parent.insertBefore(n, me);
        });return this;
    },

    insertAfterMe: function insertAfterMe(nodes) {
        var parent = this.parentNode;
        var next = this.nextSibling;

        _.each(_.coerceToArray(nodes).reversed, function (n) {
            parent.insertBefore(n, next);
        });return this;
    },

    /*  Events
        ======================================================================== */

    on: function on(e, fn) {
        this.addEventListener(e, fn);return this;
    },
    once: function once(e) {
        var _this = this;

        var _finalize = void 0,
            finalized = false;

        var p = new Channel(function (resolve) {
            // use Channel instead of Promise because Channel is synchronous, while Promise's "then" is called on next event loop iteration
            _this.addEventListener(e, _finalize = function finalize(e) {
                if (!finalized) {
                    finalized = true;
                    _this.removeEventListener(e, _finalize);
                    resolve(e);
                }
            });
        });
        p.finalize = _finalize;

        return p;
    },
    touched: function touched(fn) {
        return this.on($platform.touch ? 'touchstart' : 'click', fn);
    },


    /*  Properties
        ======================================================================== */

    extend: function extend(props) {
        return _.extend(this, props);
    },

    /*  Attributes
        ======================================================================== */

    cls: function cls(x) {
        this.className = x;return this;
    },
    css: function css(x) {
        _.extend(this.style, x);return this;
    },

    hasClass: function hasClass(x) {
        return this.classList ? this.classList.contains(x) : false;
    },

    toggleAttribute: function toggleAttribute(name, value) {
        var arg1 = arguments.length < 2;

        if (arg1) {
            value = !this.hasAttribute(name);
        }

        if (value) {
            this.setAttribute(name, value);
        } else {
            this.removeAttribute(name);
        }

        return arg1 ? value : this;
    },

    toggleAttributes: function toggleAttributes(cfg) {
        _.map(cfg, _.flip2(this.toggleAttribute), this);return this;
    },
    setAttributes: function setAttributes(cfg) {
        _.map(cfg, _.flip2(this.setAttribute), this);return this;
    },

    intAttribute: function intAttribute(name) {
        return (this.getAttribute(name) || '').parsedInt;
    },

    attr: function attr(a, b) {
        if (typeof a === 'string') {
            this.setAttribute(a, b);
            return this;
        } else {
            return this.setAttributes(a);
        }
    },


    removeAttr: function removeAttr(name) {
        this.removeAttribute(name);return this;
    },

    copyAttributes: function copyAttributes(node) {
        for (var i = 0, attrs = node.attributes, n = attrs.length; i < n; i++) {
            var a = attrs[i];
            this.setAttribute(a.name, a.value);
        }
        return this;
    },


    /*  Splitting
        ======================================================================== */

    splitSubtreeBefore: function splitSubtreeBefore(node) {
        // returns right (remaining) subtree
        if (!node || node.parentNode === this) {
            return node;
        } else {
            return this.splitSubtreeBefore(!node.previousSibling // if first node in parent, nothing to split – simply proceed to parent
            ? node.parentNode : document.createElement(node.parentNode.tagName).copyAttributes(node.parentNode).insertMeBefore(node.parentNode).appendChildren(node.prevSiblings).nextSibling);
        }
    },

    splitSubtreeAt: function splitSubtreeAt(location) {
        var n = location.node,
            i = location.offset;
        return i > 0 ? location.node.isText ? this.splitSubtreeBefore(N.text(n.nodeValue.substr(i)).insertMeAfter(_.extend(n, { nodeValue: n.nodeValue.substr(0, i) }))) : this.splitSubtreeBefore(n.childNodes[i]) : this.splitSubtreeBefore(n);
    },

    /*  innerHTML/innerText
        ======================================================================== */

    html: function html(x) {
        this.innerHTML = x;return this;
    },
    text: function text(x) {
        this.innerText = x;return this;
    },

    /*  Animation
        ======================================================================== */

    attributeUntil: function attributeUntil(attr, promise) {
        this.setAttribute(attr, true);
        return promise.done(this.$(function (e, x) {
            this.removeAttribute(attr);
        }));
    },

    busyUntil: function busyUntil(promise) {
        return this.attributeUntil('busy', promise);
    },

    onceAnimationEnd: $property(function () {
        return this.once($platform.WebKit ? 'webkitAnimationEnd' : 'animationend');
    }),

    onceTransitionEnd: $property(function () {
        return this.once($platform.WebKit ? 'webkitTransitionEnd' : 'transitionend');
    }),

    animateWithAttribute: function animateWithAttribute(attr) {

        /*  If already animating with this attribute — return previously allocated promise    */

        if (this.hasAttribute(attr) && this._onceAnimationEnd) {
            return this._onceAnimationEnd;
        }

        /*  If already animating — finalize the existing promise */

        if (this._onceAnimationEnd) {
            this._onceAnimationEnd.finalize();
        }

        /*  Allocate new promise    */

        this.setAttribute(attr, true);

        this._onceAnimationEnd = this.onceAnimationEnd;

        return this._onceAnimationEnd.then(this.$(function () {
            this.removeAttribute(attr);
            this.getBoundingClientRect(); // forces layout recalc, otherwise new animation (if set in callback) may not start
            this._onceAnimationEnd = undefined;
        }));
    },

    animatedWithAttribute: function animatedWithAttribute(attr) {
        this.animateWithAttribute(attr);return this;
    }

});

/*  ========================================================================= */

$mixin(Element, {

    /*  Selectors   */

    all: Element.prototype.querySelectorAll,
    one: Element.prototype.querySelector,

    /*  New Safari (as seen in technology preview) defines its own Element.append
        method, which gets into conflict with our previously-defined Node.append
        So will explicitly overrride it.    */

    append: Node.prototype.append,

    /*  Chrome Canary defines .replaceWith on Element...   */

    replaceWith: Node.prototype.replaceWith,

    /*  Metrics
        ======================================================================== */

    clientBBox: $property(function () {
        return BBox.fromLTWH(this.getBoundingClientRect());
    }),
    bbox: $property(function () {
        return this.clientBBox.offset(document.bbox.leftTop);
    }),

    setWidthHeight: function setWidthHeight(v) {
        this.style.width = v.x + 'px';
        this.style.height = v.y + 'px';
        return this;
    },

    setTransform: function setTransform(x) {
        this.transform = x;return this;
    },

    transform: $property({

        get: function get() {
            var components = (this.css('transform') || '').match(/^matrix\((.+\))$/);
            if (components) {
                var m = components[1].split(',').map(parseFloat);
                return new Transform({ a: m[0], b: m[1], c: m[2], d: m[3], e: m[4], f: m[5] });
            } else {
                return Transform.identity;
            }
        },

        /*  Example value: { translate: new Vec2 (a, b),  scale: new Vec2 (x, y), rotate: 180 }
         */
        set: function set(cfg) {
            this.style.transform = _.isStrictlyObject(cfg) && (cfg.translate ? 'translate(' + cfg.translate.x.toFixed(0) + 'px,' + cfg.translate.y.toFixed(0) + 'px) ' : '') + (cfg.rotate ? 'rotate(' + cfg.rotate + 'rad) ' : '') + (cfg.scale ? 'scale(' + new Vec2(cfg.scale).separatedWith(',') + ')' : '') || '';
        } }),

    /*  Experimental FRP stuff
        ======================================================================== */

    reads: function reads(stream, fn) {
        // DEPRECATED
        stream(this.$(function (x) {
            x = (fn || _.identity).call(this, x);
            this.removeAllChildren();
            this.add(x instanceof Node ? x : x + '');
        }));
        return this;
    },

    $toggleAttribute: function $toggleAttribute(name, value) {
        value(this.$(function (value) {
            this.toggleAttribute(name, value);
        }));return this;
    },

    $add: function $add(nodes) {
        // TODO: make it default .add impl (but keep .appendChildren intact)

        if (nodes instanceof Promise) {
            var placeholder = document.createElement('PROMISE');
            this.appendChild(placeholder);
            nodes.then(function (nodes) {
                placeholder.replaceWith(nodes);
            }).panic;
        } else {
            this.add(nodes);
        }

        return this;
    },

    $mouseEntered: $property(function () {
        var _this2 = this;

        if (!this._mouseEntered) {

            this._mouseEntered = _.observable(false);
            this._mouseEntered.context = this;

            this.on('mouseenter', function () {
                _this2._mouseEntered(true);
            });
            this.on('mouseleave', function () {
                _this2._mouseEntered(false);
            });
        }

        return this._mouseEntered;
    })
});

/*  ========================================================================= */

$mixin(HTMLInputElement, {

    $value: $property(function () {

        if (!this._observableValue) {
            this._observableValue = _.observable(this.value);
            this._observableValue.context = this;
            this.on('input', this.$(function () {
                this._observableValue(this.value);
            }));
        }

        return this._observableValue;
    })

});

/*  ========================================================================= */

$mixin(Image, {

    fetch: $static(function (url) {
        return new Promise(function (resolve, reject) {
            _.extend(new Image(), {
                src: url,
                onload: function onload() {
                    resolve(this);
                },
                onerror: function onerror(e) {
                    reject(e);
                } });
        });
    }) });

/*  document.clientBBox
    ======================================================================== */

_.defineProperties(document, {

    bbox: function bbox() {
        return this.clientBBox.offset(Vec2.xy(window.pageXOffset, window.pageYOffset));
    },

    clientBBox: function clientBBox() {
        return BBox.fromLTWH(0, 0, window.innerWidth || document.documentElement.clientWidth, window.innerHeight || document.documentElement.clientHeight);
    } });

/*  document.ready
    ======================================================================== */

document.ready = _.barrier();
document.on('DOMContentLoaded', function () {

    try {
        document.ready();
    } catch (e) {
        _.delay(function () {
            throw e;
        });
    } // rethrow after some delay, to let devtools load itself beforehand
});

/*  ------------------------------------------------------------------------ */

_.tests.NodePlus = {

    'tree splitting': function treeSplitting() {

        Testosterone.defineAssertions({
            assertSplitAtBr: function assertSplitAtBr(html, desiredResult) {
                var node = N.div.html(html);
                node.splitSubtreeBefore(node.one('br'));
                return _.assert(node.innerHTML, desiredResult);
            } });

        $assertSplitAtBr('<b><br>foo</b>', '<b><br>foo</b>');
        $assertSplitAtBr('<b color="red">foo<br></b>', '<b color="red">foo</b><b color="red"><br></b>');
        $assertSplitAtBr('<b>foo<i>bar<br>baz</i>qux</b>', '<b>foo<i>bar</i></b>' + '<b><i><br>baz</i>qux</b>');
    }

};

/***/ }),
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/babel-polyfill/lib/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 372);

__webpack_require__(/*! regenerator-runtime/runtime */ 377);

__webpack_require__(/*! core-js/fn/regexp/escape */ 192);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 29)))

/***/ }),
/* 192 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/fn/regexp/escape.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 201);
module.exports = __webpack_require__(/*! ../../modules/_core */ 25).RegExp.escape;

/***/ }),
/* 193 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/_array-species-constructor.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , isArray  = __webpack_require__(/*! ./_is-array */ 75)
  , SPECIES  = __webpack_require__(/*! ./_wks */ 6)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 194 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_array-species-create.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 193);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 195 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_date-to-primitive.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 196 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_enum-keys.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 37)
  , gOPS    = __webpack_require__(/*! ./_object-gops */ 62)
  , pIE     = __webpack_require__(/*! ./_object-pie */ 52);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 197 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_keyof.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(/*! ./_object-keys */ 37)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 16);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 198 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_partial.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(/*! ./_path */ 199)
  , invoke    = __webpack_require__(/*! ./_invoke */ 58)
  , aFunction = __webpack_require__(/*! ./_a-function */ 12);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 199 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_path.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_global */ 2);

/***/ }),
/* 200 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_replacer.js ***!
  \****************************************/
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 201 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/core.regexp.escape.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0)
  , $re     = __webpack_require__(/*! ./_replacer */ 200)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 202 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.array.copy-within.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(/*! ./_array-copy-within */ 99)});

__webpack_require__(/*! ./_add-to-unscopables */ 43)('copyWithin');

/***/ }),
/* 203 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.every.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $every  = __webpack_require__(/*! ./_array-methods */ 22)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 204 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.fill.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', {fill: __webpack_require__(/*! ./_array-fill */ 67)});

__webpack_require__(/*! ./_add-to-unscopables */ 43)('fill');

/***/ }),
/* 205 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.filter.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $filter = __webpack_require__(/*! ./_array-methods */ 22)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 206 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.array.find-index.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $find   = __webpack_require__(/*! ./_array-methods */ 22)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 43)(KEY);

/***/ }),
/* 207 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.find.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $find   = __webpack_require__(/*! ./_array-methods */ 22)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 43)(KEY);

/***/ }),
/* 208 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.for-each.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(/*! ./_export */ 0)
  , $forEach = __webpack_require__(/*! ./_array-methods */ 22)(0)
  , STRICT   = __webpack_require__(/*! ./_strict-method */ 21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 209 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.from.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(/*! ./_ctx */ 26)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , toObject       = __webpack_require__(/*! ./_to-object */ 10)
  , call           = __webpack_require__(/*! ./_iter-call */ 108)
  , isArrayIter    = __webpack_require__(/*! ./_is-array-iter */ 74)
  , toLength       = __webpack_require__(/*! ./_to-length */ 9)
  , createProperty = __webpack_require__(/*! ./_create-property */ 68)
  , getIterFn      = __webpack_require__(/*! ./core.get-iterator-method */ 91);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 60)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 210 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.index-of.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(/*! ./_export */ 0)
  , $indexOf      = __webpack_require__(/*! ./_array-includes */ 54)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 211 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.is-array.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', {isArray: __webpack_require__(/*! ./_is-array */ 75)});

/***/ }),
/* 212 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.join.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 16)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 51) != Object || !__webpack_require__(/*! ./_strict-method */ 21)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 213 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.array.last-index-of.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(/*! ./_export */ 0)
  , toIObject     = __webpack_require__(/*! ./_to-iobject */ 16)
  , toInteger     = __webpack_require__(/*! ./_to-integer */ 32)
  , toLength      = __webpack_require__(/*! ./_to-length */ 9)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 21)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 214 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.array.map.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $map    = __webpack_require__(/*! ./_array-methods */ 22)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 215 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.array.of.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(/*! ./_export */ 0)
  , createProperty = __webpack_require__(/*! ./_create-property */ 68);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 216 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce-right.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $reduce = __webpack_require__(/*! ./_array-reduce */ 101);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 217 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $reduce = __webpack_require__(/*! ./_array-reduce */ 101);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 218 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.slice.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(/*! ./_export */ 0)
  , html       = __webpack_require__(/*! ./_html */ 72)
  , cof        = __webpack_require__(/*! ./_cof */ 19)
  , toIndex    = __webpack_require__(/*! ./_to-index */ 40)
  , toLength   = __webpack_require__(/*! ./_to-length */ 9)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 219 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.some.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $some   = __webpack_require__(/*! ./_array-methods */ 22)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 220 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.sort.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(/*! ./_export */ 0)
  , aFunction = __webpack_require__(/*! ./_a-function */ 12)
  , toObject  = __webpack_require__(/*! ./_to-object */ 10)
  , fails     = __webpack_require__(/*! ./_fails */ 3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 221 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.array.species.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 39)('Array');

/***/ }),
/* 222 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.date.now.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 223 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-iso-string.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0)
  , fails   = __webpack_require__(/*! ./_fails */ 3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 224 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.date.to-json.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(/*! ./_export */ 0)
  , toObject    = __webpack_require__(/*! ./_to-object */ 10)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 225 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-primitive.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 6)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(/*! ./_hide */ 13)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 195));

/***/ }),
/* 226 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-string.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(/*! ./_redefine */ 14)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 227 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.bind.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', {bind: __webpack_require__(/*! ./_bind */ 102)});

/***/ }),
/* 228 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.function.has-instance.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 18)
  , HAS_INSTANCE   = __webpack_require__(/*! ./_wks */ 6)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(/*! ./_object-dp */ 8).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 229 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.name.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(/*! ./_object-dp */ 8).f
  , createDesc = __webpack_require__(/*! ./_property-desc */ 31)
  , has        = __webpack_require__(/*! ./_has */ 11)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 7) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 230 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.acosh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , log1p   = __webpack_require__(/*! ./_math-log1p */ 110)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 231 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.asinh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 232 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.atanh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 233 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cbrt.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , sign    = __webpack_require__(/*! ./_math-sign */ 79);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 234 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.clz32.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 235 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cosh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 236 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.expm1.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $expm1  = __webpack_require__(/*! ./_math-expm1 */ 78);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 237 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.math.fround.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , sign      = __webpack_require__(/*! ./_math-sign */ 79)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 238 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.hypot.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 239 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.imul.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 240 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log10.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 241 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log1p.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {log1p: __webpack_require__(/*! ./_math-log1p */ 110)});

/***/ }),
/* 242 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.log2.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 243 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sign.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {sign: __webpack_require__(/*! ./_math-sign */ 79)});

/***/ }),
/* 244 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sinh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 78)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 245 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.tanh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0)
  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 78)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 246 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.trunc.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 247 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(/*! ./_global */ 2)
  , has               = __webpack_require__(/*! ./_has */ 11)
  , cof               = __webpack_require__(/*! ./_cof */ 19)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 73)
  , toPrimitive       = __webpack_require__(/*! ./_to-primitive */ 24)
  , fails             = __webpack_require__(/*! ./_fails */ 3)
  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 36).f
  , gOPD              = __webpack_require__(/*! ./_object-gopd */ 17).f
  , dP                = __webpack_require__(/*! ./_object-dp */ 8).f
  , $trim             = __webpack_require__(/*! ./_string-trim */ 47).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(/*! ./_object-create */ 35)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(/*! ./_descriptors */ 7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 14)(global, NUMBER, $Number);
}

/***/ }),
/* 248 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.number.epsilon.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 249 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-finite.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 250 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-integer.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {isInteger: __webpack_require__(/*! ./_is-integer */ 107)});

/***/ }),
/* 251 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-nan.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 252 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-safe-integer.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , isInteger = __webpack_require__(/*! ./_is-integer */ 107)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 253 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.max-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 254 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.min-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 255 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-float.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(/*! ./_export */ 0)
  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 117);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 256 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-int.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , $parseInt = __webpack_require__(/*! ./_parse-int */ 118);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 257 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-fixed.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , toInteger    = __webpack_require__(/*! ./_to-integer */ 32)
  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 98)
  , repeat       = __webpack_require__(/*! ./_string-repeat */ 86)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 258 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-precision.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , $fails       = __webpack_require__(/*! ./_fails */ 3)
  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 98)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 259 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.assign.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./_object-assign */ 111)});

/***/ }),
/* 260 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.create.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 35)});

/***/ }),
/* 261 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-properties.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', {defineProperties: __webpack_require__(/*! ./_object-dps */ 112)});

/***/ }),
/* 262 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-property.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', {defineProperty: __webpack_require__(/*! ./_object-dp */ 8).f});

/***/ }),
/* 263 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.freeze.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 23)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 264 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(/*! ./_to-iobject */ 16)
  , $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 17).f;

__webpack_require__(/*! ./_object-sap */ 23)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 265 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-names.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 23)('getOwnPropertyNames', function(){
  return __webpack_require__(/*! ./_object-gopn-ext */ 113).f;
});

/***/ }),
/* 266 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(/*! ./_to-object */ 10)
  , $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 18);

__webpack_require__(/*! ./_object-sap */ 23)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 267 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-extensible.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 23)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 268 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-frozen.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 23)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 269 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-sealed.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 23)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 270 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.object.is.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', {is: __webpack_require__(/*! ./_same-value */ 119)});

/***/ }),
/* 271 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.keys.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 10)
  , $keys    = __webpack_require__(/*! ./_object-keys */ 37);

__webpack_require__(/*! ./_object-sap */ 23)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 272 */
/* unknown exports provided */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.object.prevent-extensions.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 23)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 273 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.seal.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4)
  , meta     = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 23)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 274 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.set-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 81).set});

/***/ }),
/* 275 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 50)
  , test    = {};
test[__webpack_require__(/*! ./_wks */ 6)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(/*! ./_redefine */ 14)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 276 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.parse-float.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(/*! ./_export */ 0)
  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 117);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 277 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.parse-int.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , $parseInt = __webpack_require__(/*! ./_parse-int */ 118);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 278 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/es6.promise.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(/*! ./_library */ 34)
  , global             = __webpack_require__(/*! ./_global */ 2)
  , ctx                = __webpack_require__(/*! ./_ctx */ 26)
  , classof            = __webpack_require__(/*! ./_classof */ 50)
  , $export            = __webpack_require__(/*! ./_export */ 0)
  , isObject           = __webpack_require__(/*! ./_is-object */ 4)
  , aFunction          = __webpack_require__(/*! ./_a-function */ 12)
  , anInstance         = __webpack_require__(/*! ./_an-instance */ 33)
  , forOf              = __webpack_require__(/*! ./_for-of */ 44)
  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 83)
  , task               = __webpack_require__(/*! ./_task */ 88).set
  , microtask          = __webpack_require__(/*! ./_microtask */ 80)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 6)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 38)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(/*! ./_set-to-string-tag */ 46)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 39)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 25)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 60)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 279 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.apply.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(/*! ./_export */ 0)
  , aFunction = __webpack_require__(/*! ./_a-function */ 12)
  , anObject  = __webpack_require__(/*! ./_an-object */ 1)
  , rApply    = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 280 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.construct.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(/*! ./_export */ 0)
  , create     = __webpack_require__(/*! ./_object-create */ 35)
  , aFunction  = __webpack_require__(/*! ./_a-function */ 12)
  , anObject   = __webpack_require__(/*! ./_an-object */ 1)
  , isObject   = __webpack_require__(/*! ./_is-object */ 4)
  , fails      = __webpack_require__(/*! ./_fails */ 3)
  , bind       = __webpack_require__(/*! ./_bind */ 102)
  , rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 281 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.define-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(/*! ./_object-dp */ 8)
  , $export     = __webpack_require__(/*! ./_export */ 0)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 24);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 282 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.delete-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , gOPD     = __webpack_require__(/*! ./_object-gopd */ 17).f
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 283 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.enumerate.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 76)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 284 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(/*! ./_object-gopd */ 17)
  , $export  = __webpack_require__(/*! ./_export */ 0)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 285 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , getProto = __webpack_require__(/*! ./_object-gpo */ 18)
  , anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 286 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(/*! ./_object-gopd */ 17)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 18)
  , has            = __webpack_require__(/*! ./_has */ 11)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , isObject       = __webpack_require__(/*! ./_is-object */ 4)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 287 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.has.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 288 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.is-extensible.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(/*! ./_export */ 0)
  , anObject      = __webpack_require__(/*! ./_an-object */ 1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 289 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.own-keys.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(/*! ./_own-keys */ 116)});

/***/ }),
/* 290 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(/*! ./_export */ 0)
  , anObject           = __webpack_require__(/*! ./_an-object */ 1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 291 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(/*! ./_export */ 0)
  , setProto = __webpack_require__(/*! ./_set-proto */ 81);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 292 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(/*! ./_object-dp */ 8)
  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 17)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 18)
  , has            = __webpack_require__(/*! ./_has */ 11)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 31)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , isObject       = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 293 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(/*! ./_global */ 2)
  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 73)
  , dP                = __webpack_require__(/*! ./_object-dp */ 8).f
  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 36).f
  , isRegExp          = __webpack_require__(/*! ./_is-regexp */ 59)
  , $flags            = __webpack_require__(/*! ./_flags */ 57)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(/*! ./_descriptors */ 7) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function(){
  re2[__webpack_require__(/*! ./_wks */ 6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 14)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 39)('RegExp');

/***/ }),
/* 294 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.match.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 295 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.replace.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 296 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.search.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 297 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.split.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 56)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(/*! ./_is-regexp */ 59)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 298 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 123);
var anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , $flags      = __webpack_require__(/*! ./_flags */ 57)
  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(/*! ./_redefine */ 14)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(/*! ./_fails */ 3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 299 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.anchor.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 15)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 300 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.big.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 15)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 301 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.blink.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 15)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 302 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.bold.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 15)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 303 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.string.code-point-at.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0)
  , $at     = __webpack_require__(/*! ./_string-at */ 84)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 304 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.ends-with.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(/*! ./_export */ 0)
  , toLength  = __webpack_require__(/*! ./_to-length */ 9)
  , context   = __webpack_require__(/*! ./_string-context */ 85)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 71)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 305 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.fixed.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 15)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 306 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontcolor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 15)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 307 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontsize.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 15)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 308 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.string.from-code-point.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(/*! ./_export */ 0)
  , toIndex        = __webpack_require__(/*! ./_to-index */ 40)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 309 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.includes.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(/*! ./_export */ 0)
  , context  = __webpack_require__(/*! ./_string-context */ 85)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 71)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 310 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.string.italics.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 15)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 311 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.iterator.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(/*! ./_string-at */ 84)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 77)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 312 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.link.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 15)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 313 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.raw.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(/*! ./_export */ 0)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 16)
  , toLength  = __webpack_require__(/*! ./_to-length */ 9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 314 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.repeat.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 86)
});

/***/ }),
/* 315 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.small.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 15)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 316 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.string.starts-with.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(/*! ./_export */ 0)
  , toLength    = __webpack_require__(/*! ./_to-length */ 9)
  , context     = __webpack_require__(/*! ./_string-context */ 85)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 71)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 317 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.strike.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 15)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 318 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sub.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 15)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 319 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sup.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 15)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 320 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.trim.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 47)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 321 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/es6.symbol.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(/*! ./_global */ 2)
  , has            = __webpack_require__(/*! ./_has */ 11)
  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 7)
  , $export        = __webpack_require__(/*! ./_export */ 0)
  , redefine       = __webpack_require__(/*! ./_redefine */ 14)
  , META           = __webpack_require__(/*! ./_meta */ 30).KEY
  , $fails         = __webpack_require__(/*! ./_fails */ 3)
  , shared         = __webpack_require__(/*! ./_shared */ 63)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 46)
  , uid            = __webpack_require__(/*! ./_uid */ 41)
  , wks            = __webpack_require__(/*! ./_wks */ 6)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 121)
  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 90)
  , keyOf          = __webpack_require__(/*! ./_keyof */ 197)
  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 196)
  , isArray        = __webpack_require__(/*! ./_is-array */ 75)
  , anObject       = __webpack_require__(/*! ./_an-object */ 1)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 16)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 24)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 31)
  , _create        = __webpack_require__(/*! ./_object-create */ 35)
  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 113)
  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 17)
  , $DP            = __webpack_require__(/*! ./_object-dp */ 8)
  , $keys          = __webpack_require__(/*! ./_object-keys */ 37)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 36).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 52).f  = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 62).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 34)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 322 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.array-buffer.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(/*! ./_export */ 0)
  , $typed       = __webpack_require__(/*! ./_typed */ 64)
  , buffer       = __webpack_require__(/*! ./_typed-buffer */ 89)
  , anObject     = __webpack_require__(/*! ./_an-object */ 1)
  , toIndex      = __webpack_require__(/*! ./_to-index */ 40)
  , toLength     = __webpack_require__(/*! ./_to-length */ 9)
  , isObject     = __webpack_require__(/*! ./_is-object */ 4)
  , ArrayBuffer  = __webpack_require__(/*! ./_global */ 2).ArrayBuffer
  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 83)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 39)(ARRAY_BUFFER);

/***/ }),
/* 323 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.typed.data-view.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 64).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 89).DataView
});

/***/ }),
/* 324 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float32-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 325 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float64-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 326 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int16-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 327 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int32-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 328 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int8-array.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 329 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint16-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 330 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint32-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 331 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 332 */
/* unknown exports provided */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 28)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 333 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-set.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 105);

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 55)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 334 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.array.includes.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(/*! ./_export */ 0)
  , $includes = __webpack_require__(/*! ./_array-includes */ 54)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 43)('includes');

/***/ }),
/* 335 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/es7.asap.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(/*! ./_export */ 0)
  , microtask = __webpack_require__(/*! ./_microtask */ 80)()
  , process   = __webpack_require__(/*! ./_global */ 2).process
  , isNode    = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 336 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.error.is-error.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0)
  , cof     = __webpack_require__(/*! ./_cof */ 19);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 337 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.map.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 104)('Map')});

/***/ }),
/* 338 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.iaddh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 339 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.imulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 340 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.isubh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 341 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.umulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 342 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(/*! ./_export */ 0)
  , toObject        = __webpack_require__(/*! ./_to-object */ 10)
  , aFunction       = __webpack_require__(/*! ./_a-function */ 12)
  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 343 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(/*! ./_export */ 0)
  , toObject        = __webpack_require__(/*! ./_to-object */ 10)
  , aFunction       = __webpack_require__(/*! ./_a-function */ 12)
  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 344 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.object.entries.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(/*! ./_export */ 0)
  , $entries = __webpack_require__(/*! ./_object-to-array */ 115)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 345 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(/*! ./_export */ 0)
  , ownKeys        = __webpack_require__(/*! ./_own-keys */ 116)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 16)
  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 17)
  , createProperty = __webpack_require__(/*! ./_create-property */ 68);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 346 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(/*! ./_export */ 0)
  , toObject                 = __webpack_require__(/*! ./_to-object */ 10)
  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 24)
  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 18)
  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 17).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 347 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(/*! ./_export */ 0)
  , toObject                 = __webpack_require__(/*! ./_to-object */ 10)
  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 24)
  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 18)
  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 17).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 61), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 348 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.object.values.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0)
  , $values = __webpack_require__(/*! ./_object-to-array */ 115)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 349 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.observable.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(/*! ./_export */ 0)
  , global      = __webpack_require__(/*! ./_global */ 2)
  , core        = __webpack_require__(/*! ./_core */ 25)
  , microtask   = __webpack_require__(/*! ./_microtask */ 80)()
  , OBSERVABLE  = __webpack_require__(/*! ./_wks */ 6)('observable')
  , aFunction   = __webpack_require__(/*! ./_a-function */ 12)
  , anObject    = __webpack_require__(/*! ./_an-object */ 1)
  , anInstance  = __webpack_require__(/*! ./_an-instance */ 33)
  , redefineAll = __webpack_require__(/*! ./_redefine-all */ 38)
  , hide        = __webpack_require__(/*! ./_hide */ 13)
  , forOf       = __webpack_require__(/*! ./_for-of */ 44)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(/*! ./_set-species */ 39)('Observable');

/***/ }),
/* 350 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.define-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(/*! ./_metadata */ 27)
  , anObject                  = __webpack_require__(/*! ./_an-object */ 1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 351 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.delete-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 27)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 352 */
/* unknown exports provided */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(/*! ./es6.set */ 124)
  , from                    = __webpack_require__(/*! ./_array-from-iterable */ 100)
  , metadata                = __webpack_require__(/*! ./_metadata */ 27)
  , anObject                = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf          = __webpack_require__(/*! ./_object-gpo */ 18)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 353 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 27)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 18)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 354 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(/*! ./_metadata */ 27)
  , anObject                = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 355 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 27)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 356 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 27)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 18)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 357 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(/*! ./_metadata */ 27)
  , anObject               = __webpack_require__(/*! ./_an-object */ 1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 358 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.metadata.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(/*! ./_metadata */ 27)
  , anObject                  = __webpack_require__(/*! ./_an-object */ 1)
  , aFunction                 = __webpack_require__(/*! ./_a-function */ 12)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 359 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.set.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 104)('Set')});

/***/ }),
/* 360 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es7.string.at.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0)
  , $at     = __webpack_require__(/*! ./_string-at */ 84)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 361 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.match-all.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(/*! ./_export */ 0)
  , defined     = __webpack_require__(/*! ./_defined */ 20)
  , toLength    = __webpack_require__(/*! ./_to-length */ 9)
  , isRegExp    = __webpack_require__(/*! ./_is-regexp */ 59)
  , getFlags    = __webpack_require__(/*! ./_flags */ 57)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 76)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 362 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-end.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0)
  , $pad    = __webpack_require__(/*! ./_string-pad */ 120);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 363 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-start.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0)
  , $pad    = __webpack_require__(/*! ./_string-pad */ 120);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 364 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-left.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 47)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 365 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-right.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 47)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 366 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.async-iterator.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 90)('asyncIterator');

/***/ }),
/* 367 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.observable.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 90)('observable');

/***/ }),
/* 368 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.system.global.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', {global: __webpack_require__(/*! ./_global */ 2)});

/***/ }),
/* 369 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/web.dom.iterable.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(/*! ./es6.array.iterator */ 92)
  , redefine      = __webpack_require__(/*! ./_redefine */ 14)
  , global        = __webpack_require__(/*! ./_global */ 2)
  , hide          = __webpack_require__(/*! ./_hide */ 13)
  , Iterators     = __webpack_require__(/*! ./_iterators */ 45)
  , wks           = __webpack_require__(/*! ./_wks */ 6)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 370 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/web.immediate.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0)
  , $task   = __webpack_require__(/*! ./_task */ 88);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 371 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/web.timers.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(/*! ./_global */ 2)
  , $export    = __webpack_require__(/*! ./_export */ 0)
  , invoke     = __webpack_require__(/*! ./_invoke */ 58)
  , partial    = __webpack_require__(/*! ./_partial */ 198)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 372 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./~/core-js/shim.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 321);
__webpack_require__(/*! ./modules/es6.object.create */ 260);
__webpack_require__(/*! ./modules/es6.object.define-property */ 262);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 261);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 264);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 266);
__webpack_require__(/*! ./modules/es6.object.keys */ 271);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 265);
__webpack_require__(/*! ./modules/es6.object.freeze */ 263);
__webpack_require__(/*! ./modules/es6.object.seal */ 273);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 272);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 268);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 269);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 267);
__webpack_require__(/*! ./modules/es6.object.assign */ 259);
__webpack_require__(/*! ./modules/es6.object.is */ 270);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 274);
__webpack_require__(/*! ./modules/es6.object.to-string */ 275);
__webpack_require__(/*! ./modules/es6.function.bind */ 227);
__webpack_require__(/*! ./modules/es6.function.name */ 229);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 228);
__webpack_require__(/*! ./modules/es6.parse-int */ 277);
__webpack_require__(/*! ./modules/es6.parse-float */ 276);
__webpack_require__(/*! ./modules/es6.number.constructor */ 247);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 257);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 258);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 248);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 249);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 250);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 251);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 252);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 253);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 254);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 255);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 256);
__webpack_require__(/*! ./modules/es6.math.acosh */ 230);
__webpack_require__(/*! ./modules/es6.math.asinh */ 231);
__webpack_require__(/*! ./modules/es6.math.atanh */ 232);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 233);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 234);
__webpack_require__(/*! ./modules/es6.math.cosh */ 235);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 236);
__webpack_require__(/*! ./modules/es6.math.fround */ 237);
__webpack_require__(/*! ./modules/es6.math.hypot */ 238);
__webpack_require__(/*! ./modules/es6.math.imul */ 239);
__webpack_require__(/*! ./modules/es6.math.log10 */ 240);
__webpack_require__(/*! ./modules/es6.math.log1p */ 241);
__webpack_require__(/*! ./modules/es6.math.log2 */ 242);
__webpack_require__(/*! ./modules/es6.math.sign */ 243);
__webpack_require__(/*! ./modules/es6.math.sinh */ 244);
__webpack_require__(/*! ./modules/es6.math.tanh */ 245);
__webpack_require__(/*! ./modules/es6.math.trunc */ 246);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 308);
__webpack_require__(/*! ./modules/es6.string.raw */ 313);
__webpack_require__(/*! ./modules/es6.string.trim */ 320);
__webpack_require__(/*! ./modules/es6.string.iterator */ 311);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 303);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 304);
__webpack_require__(/*! ./modules/es6.string.includes */ 309);
__webpack_require__(/*! ./modules/es6.string.repeat */ 314);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 316);
__webpack_require__(/*! ./modules/es6.string.anchor */ 299);
__webpack_require__(/*! ./modules/es6.string.big */ 300);
__webpack_require__(/*! ./modules/es6.string.blink */ 301);
__webpack_require__(/*! ./modules/es6.string.bold */ 302);
__webpack_require__(/*! ./modules/es6.string.fixed */ 305);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 306);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 307);
__webpack_require__(/*! ./modules/es6.string.italics */ 310);
__webpack_require__(/*! ./modules/es6.string.link */ 312);
__webpack_require__(/*! ./modules/es6.string.small */ 315);
__webpack_require__(/*! ./modules/es6.string.strike */ 317);
__webpack_require__(/*! ./modules/es6.string.sub */ 318);
__webpack_require__(/*! ./modules/es6.string.sup */ 319);
__webpack_require__(/*! ./modules/es6.date.now */ 222);
__webpack_require__(/*! ./modules/es6.date.to-json */ 224);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 223);
__webpack_require__(/*! ./modules/es6.date.to-string */ 226);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 225);
__webpack_require__(/*! ./modules/es6.array.is-array */ 211);
__webpack_require__(/*! ./modules/es6.array.from */ 209);
__webpack_require__(/*! ./modules/es6.array.of */ 215);
__webpack_require__(/*! ./modules/es6.array.join */ 212);
__webpack_require__(/*! ./modules/es6.array.slice */ 218);
__webpack_require__(/*! ./modules/es6.array.sort */ 220);
__webpack_require__(/*! ./modules/es6.array.for-each */ 208);
__webpack_require__(/*! ./modules/es6.array.map */ 214);
__webpack_require__(/*! ./modules/es6.array.filter */ 205);
__webpack_require__(/*! ./modules/es6.array.some */ 219);
__webpack_require__(/*! ./modules/es6.array.every */ 203);
__webpack_require__(/*! ./modules/es6.array.reduce */ 217);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 216);
__webpack_require__(/*! ./modules/es6.array.index-of */ 210);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 213);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 202);
__webpack_require__(/*! ./modules/es6.array.fill */ 204);
__webpack_require__(/*! ./modules/es6.array.find */ 207);
__webpack_require__(/*! ./modules/es6.array.find-index */ 206);
__webpack_require__(/*! ./modules/es6.array.species */ 221);
__webpack_require__(/*! ./modules/es6.array.iterator */ 92);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 293);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 298);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 123);
__webpack_require__(/*! ./modules/es6.regexp.match */ 294);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 295);
__webpack_require__(/*! ./modules/es6.regexp.search */ 296);
__webpack_require__(/*! ./modules/es6.regexp.split */ 297);
__webpack_require__(/*! ./modules/es6.promise */ 278);
__webpack_require__(/*! ./modules/es6.map */ 122);
__webpack_require__(/*! ./modules/es6.set */ 124);
__webpack_require__(/*! ./modules/es6.weak-map */ 125);
__webpack_require__(/*! ./modules/es6.weak-set */ 333);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 322);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 323);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 328);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 331);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 332);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 326);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 329);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 327);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 330);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 324);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 325);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 279);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 280);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 281);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 282);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 283);
__webpack_require__(/*! ./modules/es6.reflect.get */ 286);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 284);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 285);
__webpack_require__(/*! ./modules/es6.reflect.has */ 287);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 288);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 289);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 290);
__webpack_require__(/*! ./modules/es6.reflect.set */ 292);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 291);
__webpack_require__(/*! ./modules/es7.array.includes */ 334);
__webpack_require__(/*! ./modules/es7.string.at */ 360);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 363);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 362);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 364);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 365);
__webpack_require__(/*! ./modules/es7.string.match-all */ 361);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 366);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 367);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 345);
__webpack_require__(/*! ./modules/es7.object.values */ 348);
__webpack_require__(/*! ./modules/es7.object.entries */ 344);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 342);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 343);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 346);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 347);
__webpack_require__(/*! ./modules/es7.map.to-json */ 337);
__webpack_require__(/*! ./modules/es7.set.to-json */ 359);
__webpack_require__(/*! ./modules/es7.system.global */ 368);
__webpack_require__(/*! ./modules/es7.error.is-error */ 336);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 338);
__webpack_require__(/*! ./modules/es7.math.isubh */ 340);
__webpack_require__(/*! ./modules/es7.math.imulh */ 339);
__webpack_require__(/*! ./modules/es7.math.umulh */ 341);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 350);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 351);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 353);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 352);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 355);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 354);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 356);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 357);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 358);
__webpack_require__(/*! ./modules/es7.asap */ 335);
__webpack_require__(/*! ./modules/es7.observable */ 349);
__webpack_require__(/*! ./modules/web.timers */ 371);
__webpack_require__(/*! ./modules/web.immediate */ 370);
__webpack_require__(/*! ./modules/web.dom.iterable */ 369);
module.exports = __webpack_require__(/*! ./modules/_core */ 25);

/***/ }),
/* 373 */,
/* 374 */,
/* 375 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/es6-object-assign/src/index.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),
/* 376 */,
/* 377 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/regenerator-runtime/runtime.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 29), __webpack_require__(/*! ./../process/browser.js */ 48)))

/***/ }),
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./~/toposort/index.js ***!
  \*****************************/
/***/ (function(module, exports) {


/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

module.exports = exports = function(edges){
  return toposort(uniqueNodes(edges), edges)
}

exports.array = toposort

function toposort(nodes, edges) {
  var cursor = nodes.length
    , sorted = new Array(cursor)
    , visited = {}
    , i = cursor

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, [])
  }

  return sorted

  function visit(node, i, predecessors) {
    if(predecessors.indexOf(node) >= 0) {
      throw new Error('Cyclic dependency: '+JSON.stringify(node))
    }

    if (!~nodes.indexOf(node)) {
      throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: '+JSON.stringify(node))
    }

    if (visited[i]) return;
    visited[i] = true

    // outgoing edges
    var outgoing = edges.filter(function(edge){
      return edge[0] === node
    })
    if (i = outgoing.length) {
      var preds = predecessors.concat(node)
      do {
        var child = outgoing[--i][1]
        visit(child, nodes.indexOf(child), preds)
      } while (i)
    }

    sorted[--cursor] = node
  }
}

function uniqueNodes(arr){
  var res = []
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i]
    if (res.indexOf(edge[0]) < 0) res.push(edge[0])
    if (res.indexOf(edge[1]) < 0) res.push(edge[1])
  }
  return res
}


/***/ }),
/* 388 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** external "xhr2" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = xhr2;

/***/ }),
/* 389 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** multi ./useless.client.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mac/useless/useless.client.js */132);


/***/ })
/******/ ]);
//# sourceMappingURL=useless.client.js.map