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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__ (1)
	
	$uselessFile = 'panic.js'
	
	__webpack_require__ (37)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	   ------------------------------------------------------------------- */
	
	$uselessFile = 'useless.client.js'
	
	/* -------------------------------------------------------------------
	   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	
	_ = __webpack_require__ (2)
	
	/*  Bootstrap code (couple of absolutely urgent fixes to underscore.js)
	    ======================================================================== */
	
	_ = (function () {
	
	    _.mixin ({
	        zipWith: function (rows, zippo) {
	                    return _.reduce (_.rest (rows), function (memo, row) {
	                        return _.times (Math.max ((memo && memo.length) || 0, (row && row.length) || 0), function (i) {
	                            return zippo (memo && memo[i], row && row[i]) }) }, _.first (rows)) } })
	
	    if ('a1 b2 c3' !== _.zipWith ([['a','b','c'], [1,2,3]], function (a, b) { return a + b }).join (' ')) {
	        throw new Error ('_.zipWith broken') }
	
	    return _ }) ()
	
	
	/*  Tests stub
	 */
	_.tests = {}
	_.deferTest = _.withTest = function (name, test, subj) { subj () }
	
	/*  Internal dependencies
	    ======================================================================== */
	
	    __webpack_require__ (3)  // provides missing unicode regexp syntax
	    __webpack_require__ (4)        // Base64 encoder/decoder
	
	    __webpack_require__ (5)    // platform abstraction layer
	    __webpack_require__ (6)   // argument count tracking utility (to streamline metaprogramming utilities)
	    __webpack_require__ (7)    // function-centric utilities
	    __webpack_require__ (8)     // a vocabulary for functional expressions that process real stuff
	    __webpack_require__ (9)        // type system extensions
	    __webpack_require__ (10)      // consider it as underscore 2.0
	    __webpack_require__ (11)  // properties 2.0
	    __webpack_require__ (12)   // metaprogramming utility
	    __webpack_require__ (14)   // advanced type system extensions
	
	    __webpack_require__ (15)
	
	    __webpack_require__ (16)    // bootstrap
	    __webpack_require__ (17)            // extends Function
	    __webpack_require__ (18)               // extends Array
	    __webpack_require__ (19)              // extends String
	
	    __webpack_require__ (20)          // for ad-hoc dependency injection in any object's method
	    __webpack_require__ (21)            // a generalization of Event (multicast model for function calls)
	
	    __webpack_require__ (22)
	
	    __webpack_require__ (23)      // clumsy math utils
	    __webpack_require__ (25)     // clumsy parsing utils
	    __webpack_require__ (26)      // (this one is normal)
	
	
	/*  Otherwise basic utility
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    __webpack_require__ (27)     // concurrency utility
	    __webpack_require__ (28)       // component model
	    __webpack_require__ (29)              // regular expressions helper
	
	
	/*  Experimental stuff
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    __webpack_require__ (30)
	    __webpack_require__ (31)
	    __webpack_require__ (32)
	
	
	/*  Networking
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    __webpack_require__ (33)
	
	
	/*  Browser-related code
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    __webpack_require__ (34)
	    __webpack_require__ (35)
	    __webpack_require__ (36)
	


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*	Unicode hack (third party)
		======================================================================== */
	
	/*! unicode_hack.js
	    Copyright (C) 2010-2012,2014  Marcelo Gibson de Castro Gonçalves. All rights reserved.
	    
	    Copying and distribution of this file, with or without modification,
	    are permitted in any medium without royalty provided the copyright
	    notice and this notice are preserved.  This file is offered as-is,
	    without any warranty.
	*/
	unicode_hack = (function() {
	    /* Regexps to match characters in the BMP according to their Unicode category.
	       Extracted from running all characters (code units) against Java's
	       Character.getType. Source:
	       https://ideone.com/04llh4
	    */
	    var unicodeCategories = {
	        Cn:'[\u0378\u0379\u037f-\u0383\u038b\u038d\u03a2\u0528-\u0530\u0557\u0558\u0560\u0588\u058b-\u0590\u05c8-\u05cf\u05eb-\u05ef\u05f5-\u05ff\u0604\u0605\u061c\u061d\u070e\u074b\u074c\u07b2-\u07bf\u07fb-\u07ff\u082e\u082f\u083f\u085c\u085d\u085f-\u08ff\u0978\u0980\u0984\u098d\u098e\u0991\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba\u09bb\u09c5\u09c6\u09c9\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4\u09e5\u09fc-\u0a00\u0a04\u0a0b-\u0a0e\u0a11\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a\u0a3b\u0a3d\u0a43-\u0a46\u0a49\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba\u0abb\u0ac6\u0aca\u0ace\u0acf\u0ad1-\u0adf\u0ae4\u0ae5\u0af0\u0af2-\u0b00\u0b04\u0b0d\u0b0e\u0b11\u0b12\u0b29\u0b31\u0b34\u0b3a\u0b3b\u0b45\u0b46\u0b49\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64\u0b65\u0b78-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bfb-\u0c00\u0c04\u0c0d\u0c11\u0c29\u0c34\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5a-\u0c5f\u0c64\u0c65\u0c70-\u0c77\u0c80\u0c81\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4\u0ce5\u0cf0\u0cf3-\u0d01\u0d04\u0d0d\u0d11\u0d3b\u0d3c\u0d45\u0d49\u0d4f-\u0d56\u0d58-\u0d5f\u0d64\u0d65\u0d76-\u0d78\u0d80\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0df1\u0df5-\u0e00\u0e3b-\u0e3e\u0e5c-\u0e80\u0e83\u0e85\u0e86\u0e89\u0e8b\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8\u0ea9\u0eac\u0eba\u0ebe\u0ebf\u0ec5\u0ec7\u0ece\u0ecf\u0eda\u0edb\u0ede-\u0eff\u0f48\u0f6d-\u0f70\u0f98\u0fbd\u0fcd\u0fdb-\u0fff\u10c6-\u10cf\u10fd-\u10ff\u1249\u124e\u124f\u1257\u1259\u125e\u125f\u1289\u128e\u128f\u12b1\u12b6\u12b7\u12bf\u12c1\u12c6\u12c7\u12d7\u1311\u1316\u1317\u135b\u135c\u137d-\u137f\u139a-\u139f\u13f5-\u13ff\u169d-\u169f\u16f1-\u16ff\u170d\u1715-\u171f\u1737-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17de\u17df\u17ea-\u17ef\u17fa-\u17ff\u180f\u181a-\u181f\u1878-\u187f\u18ab-\u18af\u18f6-\u18ff\u191d-\u191f\u192c-\u192f\u193c-\u193f\u1941-\u1943\u196e\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19cf\u19db-\u19dd\u1a1c\u1a1d\u1a5f\u1a7d\u1a7e\u1a8a-\u1a8f\u1a9a-\u1a9f\u1aae-\u1aff\u1b4c-\u1b4f\u1b7d-\u1b7f\u1bab-\u1bad\u1bba-\u1bbf\u1bf4-\u1bfb\u1c38-\u1c3a\u1c4a-\u1c4c\u1c80-\u1ccf\u1cf3-\u1cff\u1de7-\u1dfb\u1f16\u1f17\u1f1e\u1f1f\u1f46\u1f47\u1f4e\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e\u1f7f\u1fb5\u1fc5\u1fd4\u1fd5\u1fdc\u1ff0\u1ff1\u1ff5\u1fff\u2065-\u2069\u2072\u2073\u208f\u209d-\u209f\u20ba-\u20cf\u20f1-\u20ff\u218a-\u218f\u23f4-\u23ff\u2427-\u243f\u244b-\u245f\u2700\u27cb\u27cd\u2b4d-\u2b4f\u2b5a-\u2bff\u2c2f\u2c5f\u2cf2-\u2cf8\u2d26-\u2d2f\u2d66-\u2d6e\u2d71-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e32-\u2e7f\u2e9a\u2ef4-\u2eff\u2fd6-\u2fef\u2ffc-\u2fff\u3040\u3097\u3098\u3100-\u3104\u312e-\u3130\u318f\u31bb-\u31bf\u31e4-\u31ef\u321f\u32ff\u4db6-\u4dbf\u9fcc-\u9fff\ua48d-\ua48f\ua4c7-\ua4cf\ua62c-\ua63f\ua674-\ua67b\ua698-\ua69f\ua6f8-\ua6ff\ua78f\ua792-\ua79f\ua7aa-\ua7f9\ua82c-\ua82f\ua83a-\ua83f\ua878-\ua87f\ua8c5-\ua8cd\ua8da-\ua8df\ua8fc-\ua8ff\ua954-\ua95e\ua97d-\ua97f\ua9ce\ua9da-\ua9dd\ua9e0-\ua9ff\uaa37-\uaa3f\uaa4e\uaa4f\uaa5a\uaa5b\uaa7c-\uaa7f\uaac3-\uaada\uaae0-\uab00\uab07\uab08\uab0f\uab10\uab17-\uab1f\uab27\uab2f-\uabbf\uabee\uabef\uabfa-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\ud7ff\ufa2e\ufa2f\ufa6e\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbc2-\ufbd2\ufd40-\ufd4f\ufd90\ufd91\ufdc8-\ufdef\ufdfe\ufdff\ufe1a-\ufe1f\ufe27-\ufe2f\ufe53\ufe67\ufe6c-\ufe6f\ufe75\ufefd\ufefe\uff00\uffbf-\uffc1\uffc8\uffc9\uffd0\uffd1\uffd8\uffd9\uffdd-\uffdf\uffe7\uffef-\ufff8\ufffe\uffff]',
	        Lu:'[\u0041-\u005a\u00c0-\u00d6\u00d8-\u00de\u0100\u0102\u0104\u0106\u0108\u010a\u010c\u010e\u0110\u0112\u0114\u0116\u0118\u011a\u011c\u011e\u0120\u0122\u0124\u0126\u0128\u012a\u012c\u012e\u0130\u0132\u0134\u0136\u0139\u013b\u013d\u013f\u0141\u0143\u0145\u0147\u014a\u014c\u014e\u0150\u0152\u0154\u0156\u0158\u015a\u015c\u015e\u0160\u0162\u0164\u0166\u0168\u016a\u016c\u016e\u0170\u0172\u0174\u0176\u0178\u0179\u017b\u017d\u0181\u0182\u0184\u0186\u0187\u0189-\u018b\u018e-\u0191\u0193\u0194\u0196-\u0198\u019c\u019d\u019f\u01a0\u01a2\u01a4\u01a6\u01a7\u01a9\u01ac\u01ae\u01af\u01b1-\u01b3\u01b5\u01b7\u01b8\u01bc\u01c4\u01c7\u01ca\u01cd\u01cf\u01d1\u01d3\u01d5\u01d7\u01d9\u01db\u01de\u01e0\u01e2\u01e4\u01e6\u01e8\u01ea\u01ec\u01ee\u01f1\u01f4\u01f6-\u01f8\u01fa\u01fc\u01fe\u0200\u0202\u0204\u0206\u0208\u020a\u020c\u020e\u0210\u0212\u0214\u0216\u0218\u021a\u021c\u021e\u0220\u0222\u0224\u0226\u0228\u022a\u022c\u022e\u0230\u0232\u023a\u023b\u023d\u023e\u0241\u0243-\u0246\u0248\u024a\u024c\u024e\u0370\u0372\u0376\u0386\u0388-\u038a\u038c\u038e\u038f\u0391-\u03a1\u03a3-\u03ab\u03cf\u03d2-\u03d4\u03d8\u03da\u03dc\u03de\u03e0\u03e2\u03e4\u03e6\u03e8\u03ea\u03ec\u03ee\u03f4\u03f7\u03f9\u03fa\u03fd-\u042f\u0460\u0462\u0464\u0466\u0468\u046a\u046c\u046e\u0470\u0472\u0474\u0476\u0478\u047a\u047c\u047e\u0480\u048a\u048c\u048e\u0490\u0492\u0494\u0496\u0498\u049a\u049c\u049e\u04a0\u04a2\u04a4\u04a6\u04a8\u04aa\u04ac\u04ae\u04b0\u04b2\u04b4\u04b6\u04b8\u04ba\u04bc\u04be\u04c0\u04c1\u04c3\u04c5\u04c7\u04c9\u04cb\u04cd\u04d0\u04d2\u04d4\u04d6\u04d8\u04da\u04dc\u04de\u04e0\u04e2\u04e4\u04e6\u04e8\u04ea\u04ec\u04ee\u04f0\u04f2\u04f4\u04f6\u04f8\u04fa\u04fc\u04fe\u0500\u0502\u0504\u0506\u0508\u050a\u050c\u050e\u0510\u0512\u0514\u0516\u0518\u051a\u051c\u051e\u0520\u0522\u0524\u0526\u0531-\u0556\u10a0-\u10c5\u1e00\u1e02\u1e04\u1e06\u1e08\u1e0a\u1e0c\u1e0e\u1e10\u1e12\u1e14\u1e16\u1e18\u1e1a\u1e1c\u1e1e\u1e20\u1e22\u1e24\u1e26\u1e28\u1e2a\u1e2c\u1e2e\u1e30\u1e32\u1e34\u1e36\u1e38\u1e3a\u1e3c\u1e3e\u1e40\u1e42\u1e44\u1e46\u1e48\u1e4a\u1e4c\u1e4e\u1e50\u1e52\u1e54\u1e56\u1e58\u1e5a\u1e5c\u1e5e\u1e60\u1e62\u1e64\u1e66\u1e68\u1e6a\u1e6c\u1e6e\u1e70\u1e72\u1e74\u1e76\u1e78\u1e7a\u1e7c\u1e7e\u1e80\u1e82\u1e84\u1e86\u1e88\u1e8a\u1e8c\u1e8e\u1e90\u1e92\u1e94\u1e9e\u1ea0\u1ea2\u1ea4\u1ea6\u1ea8\u1eaa\u1eac\u1eae\u1eb0\u1eb2\u1eb4\u1eb6\u1eb8\u1eba\u1ebc\u1ebe\u1ec0\u1ec2\u1ec4\u1ec6\u1ec8\u1eca\u1ecc\u1ece\u1ed0\u1ed2\u1ed4\u1ed6\u1ed8\u1eda\u1edc\u1ede\u1ee0\u1ee2\u1ee4\u1ee6\u1ee8\u1eea\u1eec\u1eee\u1ef0\u1ef2\u1ef4\u1ef6\u1ef8\u1efa\u1efc\u1efe\u1f08-\u1f0f\u1f18-\u1f1d\u1f28-\u1f2f\u1f38-\u1f3f\u1f48-\u1f4d\u1f59\u1f5b\u1f5d\u1f5f\u1f68-\u1f6f\u1fb8-\u1fbb\u1fc8-\u1fcb\u1fd8-\u1fdb\u1fe8-\u1fec\u1ff8-\u1ffb\u2102\u2107\u210b-\u210d\u2110-\u2112\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u2130-\u2133\u213e\u213f\u2145\u2183\u2c00-\u2c2e\u2c60\u2c62-\u2c64\u2c67\u2c69\u2c6b\u2c6d-\u2c70\u2c72\u2c75\u2c7e-\u2c80\u2c82\u2c84\u2c86\u2c88\u2c8a\u2c8c\u2c8e\u2c90\u2c92\u2c94\u2c96\u2c98\u2c9a\u2c9c\u2c9e\u2ca0\u2ca2\u2ca4\u2ca6\u2ca8\u2caa\u2cac\u2cae\u2cb0\u2cb2\u2cb4\u2cb6\u2cb8\u2cba\u2cbc\u2cbe\u2cc0\u2cc2\u2cc4\u2cc6\u2cc8\u2cca\u2ccc\u2cce\u2cd0\u2cd2\u2cd4\u2cd6\u2cd8\u2cda\u2cdc\u2cde\u2ce0\u2ce2\u2ceb\u2ced\ua640\ua642\ua644\ua646\ua648\ua64a\ua64c\ua64e\ua650\ua652\ua654\ua656\ua658\ua65a\ua65c\ua65e\ua660\ua662\ua664\ua666\ua668\ua66a\ua66c\ua680\ua682\ua684\ua686\ua688\ua68a\ua68c\ua68e\ua690\ua692\ua694\ua696\ua722\ua724\ua726\ua728\ua72a\ua72c\ua72e\ua732\ua734\ua736\ua738\ua73a\ua73c\ua73e\ua740\ua742\ua744\ua746\ua748\ua74a\ua74c\ua74e\ua750\ua752\ua754\ua756\ua758\ua75a\ua75c\ua75e\ua760\ua762\ua764\ua766\ua768\ua76a\ua76c\ua76e\ua779\ua77b\ua77d\ua77e\ua780\ua782\ua784\ua786\ua78b\ua78d\ua790\ua7a0\ua7a2\ua7a4\ua7a6\ua7a8\uff21-\uff3a]',
	        Ll:'[\u0061-\u007a\u00aa\u00b5\u00ba\u00df-\u00f6\u00f8-\u00ff\u0101\u0103\u0105\u0107\u0109\u010b\u010d\u010f\u0111\u0113\u0115\u0117\u0119\u011b\u011d\u011f\u0121\u0123\u0125\u0127\u0129\u012b\u012d\u012f\u0131\u0133\u0135\u0137\u0138\u013a\u013c\u013e\u0140\u0142\u0144\u0146\u0148\u0149\u014b\u014d\u014f\u0151\u0153\u0155\u0157\u0159\u015b\u015d\u015f\u0161\u0163\u0165\u0167\u0169\u016b\u016d\u016f\u0171\u0173\u0175\u0177\u017a\u017c\u017e-\u0180\u0183\u0185\u0188\u018c\u018d\u0192\u0195\u0199-\u019b\u019e\u01a1\u01a3\u01a5\u01a8\u01aa\u01ab\u01ad\u01b0\u01b4\u01b6\u01b9\u01ba\u01bd-\u01bf\u01c6\u01c9\u01cc\u01ce\u01d0\u01d2\u01d4\u01d6\u01d8\u01da\u01dc\u01dd\u01df\u01e1\u01e3\u01e5\u01e7\u01e9\u01eb\u01ed\u01ef\u01f0\u01f3\u01f5\u01f9\u01fb\u01fd\u01ff\u0201\u0203\u0205\u0207\u0209\u020b\u020d\u020f\u0211\u0213\u0215\u0217\u0219\u021b\u021d\u021f\u0221\u0223\u0225\u0227\u0229\u022b\u022d\u022f\u0231\u0233-\u0239\u023c\u023f\u0240\u0242\u0247\u0249\u024b\u024d\u024f-\u0293\u0295-\u02af\u0371\u0373\u0377\u037b-\u037d\u0390\u03ac-\u03ce\u03d0\u03d1\u03d5-\u03d7\u03d9\u03db\u03dd\u03df\u03e1\u03e3\u03e5\u03e7\u03e9\u03eb\u03ed\u03ef-\u03f3\u03f5\u03f8\u03fb\u03fc\u0430-\u045f\u0461\u0463\u0465\u0467\u0469\u046b\u046d\u046f\u0471\u0473\u0475\u0477\u0479\u047b\u047d\u047f\u0481\u048b\u048d\u048f\u0491\u0493\u0495\u0497\u0499\u049b\u049d\u049f\u04a1\u04a3\u04a5\u04a7\u04a9\u04ab\u04ad\u04af\u04b1\u04b3\u04b5\u04b7\u04b9\u04bb\u04bd\u04bf\u04c2\u04c4\u04c6\u04c8\u04ca\u04cc\u04ce\u04cf\u04d1\u04d3\u04d5\u04d7\u04d9\u04db\u04dd\u04df\u04e1\u04e3\u04e5\u04e7\u04e9\u04eb\u04ed\u04ef\u04f1\u04f3\u04f5\u04f7\u04f9\u04fb\u04fd\u04ff\u0501\u0503\u0505\u0507\u0509\u050b\u050d\u050f\u0511\u0513\u0515\u0517\u0519\u051b\u051d\u051f\u0521\u0523\u0525\u0527\u0561-\u0587\u1d00-\u1d2b\u1d62-\u1d77\u1d79-\u1d9a\u1e01\u1e03\u1e05\u1e07\u1e09\u1e0b\u1e0d\u1e0f\u1e11\u1e13\u1e15\u1e17\u1e19\u1e1b\u1e1d\u1e1f\u1e21\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e2d\u1e2f\u1e31\u1e33\u1e35\u1e37\u1e39\u1e3b\u1e3d\u1e3f\u1e41\u1e43\u1e45\u1e47\u1e49\u1e4b\u1e4d\u1e4f\u1e51\u1e53\u1e55\u1e57\u1e59\u1e5b\u1e5d\u1e5f\u1e61\u1e63\u1e65\u1e67\u1e69\u1e6b\u1e6d\u1e6f\u1e71\u1e73\u1e75\u1e77\u1e79\u1e7b\u1e7d\u1e7f\u1e81\u1e83\u1e85\u1e87\u1e89\u1e8b\u1e8d\u1e8f\u1e91\u1e93\u1e95-\u1e9d\u1e9f\u1ea1\u1ea3\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u1ec9\u1ecb\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u1ef3\u1ef5\u1ef7\u1ef9\u1efb\u1efd\u1eff-\u1f07\u1f10-\u1f15\u1f20-\u1f27\u1f30-\u1f37\u1f40-\u1f45\u1f50-\u1f57\u1f60-\u1f67\u1f70-\u1f7d\u1f80-\u1f87\u1f90-\u1f97\u1fa0-\u1fa7\u1fb0-\u1fb4\u1fb6\u1fb7\u1fbe\u1fc2-\u1fc4\u1fc6\u1fc7\u1fd0-\u1fd3\u1fd6\u1fd7\u1fe0-\u1fe7\u1ff2-\u1ff4\u1ff6\u1ff7\u210a\u210e\u210f\u2113\u212f\u2134\u2139\u213c\u213d\u2146-\u2149\u214e\u2184\u2c30-\u2c5e\u2c61\u2c65\u2c66\u2c68\u2c6a\u2c6c\u2c71\u2c73\u2c74\u2c76-\u2c7c\u2c81\u2c83\u2c85\u2c87\u2c89\u2c8b\u2c8d\u2c8f\u2c91\u2c93\u2c95\u2c97\u2c99\u2c9b\u2c9d\u2c9f\u2ca1\u2ca3\u2ca5\u2ca7\u2ca9\u2cab\u2cad\u2caf\u2cb1\u2cb3\u2cb5\u2cb7\u2cb9\u2cbb\u2cbd\u2cbf\u2cc1\u2cc3\u2cc5\u2cc7\u2cc9\u2ccb\u2ccd\u2ccf\u2cd1\u2cd3\u2cd5\u2cd7\u2cd9\u2cdb\u2cdd\u2cdf\u2ce1\u2ce3\u2ce4\u2cec\u2cee\u2d00-\u2d25\ua641\ua643\ua645\ua647\ua649\ua64b\ua64d\ua64f\ua651\ua653\ua655\ua657\ua659\ua65b\ua65d\ua65f\ua661\ua663\ua665\ua667\ua669\ua66b\ua66d\ua681\ua683\ua685\ua687\ua689\ua68b\ua68d\ua68f\ua691\ua693\ua695\ua697\ua723\ua725\ua727\ua729\ua72b\ua72d\ua72f-\ua731\ua733\ua735\ua737\ua739\ua73b\ua73d\ua73f\ua741\ua743\ua745\ua747\ua749\ua74b\ua74d\ua74f\ua751\ua753\ua755\ua757\ua759\ua75b\ua75d\ua75f\ua761\ua763\ua765\ua767\ua769\ua76b\ua76d\ua76f\ua771-\ua778\ua77a\ua77c\ua77f\ua781\ua783\ua785\ua787\ua78c\ua78e\ua791\ua7a1\ua7a3\ua7a5\ua7a7\ua7a9\ua7fa\ufb00-\ufb06\ufb13-\ufb17\uff41-\uff5a]',
	        Lt:'[\u01c5\u01c8\u01cb\u01f2\u1f88-\u1f8f\u1f98-\u1f9f\u1fa8-\u1faf\u1fbc\u1fcc\u1ffc]',
	        Lm:'[\u02b0-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0374\u037a\u0559\u0640\u06e5\u06e6\u07f4\u07f5\u07fa\u081a\u0824\u0828\u0971\u0e46\u0ec6\u10fc\u17d7\u1843\u1aa7\u1c78-\u1c7d\u1d2c-\u1d61\u1d78\u1d9b-\u1dbf\u2071\u207f\u2090-\u209c\u2c7d\u2d6f\u2e2f\u3005\u3031-\u3035\u303b\u309d\u309e\u30fc-\u30fe\ua015\ua4f8-\ua4fd\ua60c\ua67f\ua717-\ua71f\ua770\ua788\ua9cf\uaa70\uaadd\uff70\uff9e\uff9f]',
	        Lo:'[\u01bb\u01c0-\u01c3\u0294\u05d0-\u05ea\u05f0-\u05f2\u0620-\u063f\u0641-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u0800-\u0815\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0972-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e45\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0edc\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10d0-\u10fa\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17dc\u1820-\u1842\u1844-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c77\u1ce9-\u1cec\u1cee-\u1cf1\u2135-\u2138\u2d30-\u2d65\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3006\u303c\u3041-\u3096\u309f\u30a1-\u30fa\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcb\ua000-\ua014\ua016-\ua48c\ua4d0-\ua4f7\ua500-\ua60b\ua610-\ua61f\ua62a\ua62b\ua66e\ua6a0-\ua6e5\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa6f\uaa71-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb\uaadc\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff66-\uff6f\uff71-\uff9d\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]',
	        Mn:'[\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962\u0963\u0981\u09bc\u09c1-\u09c4\u09cd\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b62\u0b63\u0b82\u0bc0\u0bcd\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc6\u0ccc\u0ccd\u0ce2\u0ce3\u0d41-\u0d44\u0d4d\u0d62\u0d63\u0dca\u0dd2-\u0dd4\u0dd6\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1be6\u1be8\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfc-\u1dff\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26]',
	        Me:'[\u0488\u0489\u20dd-\u20e0\u20e2-\u20e4\ua670-\ua672]',
	        Mc:'[\u0903\u093b\u093e-\u0940\u0949-\u094c\u094e\u094f\u0982\u0983\u09be-\u09c0\u09c7\u09c8\u09cb\u09cc\u09d7\u0a03\u0a3e-\u0a40\u0a83\u0abe-\u0ac0\u0ac9\u0acb\u0acc\u0b02\u0b03\u0b3e\u0b40\u0b47\u0b48\u0b4b\u0b4c\u0b57\u0bbe\u0bbf\u0bc1\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcc\u0bd7\u0c01-\u0c03\u0c41-\u0c44\u0c82\u0c83\u0cbe\u0cc0-\u0cc4\u0cc7\u0cc8\u0cca\u0ccb\u0cd5\u0cd6\u0d02\u0d03\u0d3e-\u0d40\u0d46-\u0d48\u0d4a-\u0d4c\u0d57\u0d82\u0d83\u0dcf-\u0dd1\u0dd8-\u0ddf\u0df2\u0df3\u0f3e\u0f3f\u0f7f\u102b\u102c\u1031\u1038\u103b\u103c\u1056\u1057\u1062-\u1064\u1067-\u106d\u1083\u1084\u1087-\u108c\u108f\u109a-\u109c\u17b6\u17be-\u17c5\u17c7\u17c8\u1923-\u1926\u1929-\u192b\u1930\u1931\u1933-\u1938\u19b0-\u19c0\u19c8\u19c9\u1a19-\u1a1b\u1a55\u1a57\u1a61\u1a63\u1a64\u1a6d-\u1a72\u1b04\u1b35\u1b3b\u1b3d-\u1b41\u1b43\u1b44\u1b82\u1ba1\u1ba6\u1ba7\u1baa\u1be7\u1bea-\u1bec\u1bee\u1bf2\u1bf3\u1c24-\u1c2b\u1c34\u1c35\u1ce1\u1cf2\ua823\ua824\ua827\ua880\ua881\ua8b4-\ua8c3\ua952\ua953\ua983\ua9b4\ua9b5\ua9ba\ua9bb\ua9bd-\ua9c0\uaa2f\uaa30\uaa33\uaa34\uaa4d\uaa7b\uabe3\uabe4\uabe6\uabe7\uabe9\uabea\uabec]',
	        Nd:'[\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19]',
	        Nl:'[\u16ee-\u16f0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303a\ua6e6-\ua6ef]',
	        No:'[\u00b2\u00b3\u00b9\u00bc-\u00be\u09f4-\u09f9\u0b72-\u0b77\u0bf0-\u0bf2\u0c78-\u0c7e\u0d70-\u0d75\u0f2a-\u0f33\u1369-\u137c\u17f0-\u17f9\u19da\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215f\u2189\u2460-\u249b\u24ea-\u24ff\u2776-\u2793\u2cfd\u3192-\u3195\u3220-\u3229\u3251-\u325f\u3280-\u3289\u32b1-\u32bf\ua830-\ua835]',
	        Zs:'[\u0020\u00a0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]',
	        Zl:'[\u2028]',
	        Zp:'[\u2029]',
	        Cc:'[\u0000-\u001f\u007f-\u009f]',
	        Cf:'[\u00ad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]',
	        Cs:'[\ud800-\udfff]',
	        Co:'[\ue000-\uf8ff]',
	        Ps:'[\u0028\u005b\u007b\u0f3a\u0f3c\u169b\u201a\u201e\u2045\u207d\u208d\u2329\u2768\u276a\u276c\u276e\u2770\u2772\u2774\u27c5\u27e6\u27e8\u27ea\u27ec\u27ee\u2983\u2985\u2987\u2989\u298b\u298d\u298f\u2991\u2993\u2995\u2997\u29d8\u29da\u29fc\u2e22\u2e24\u2e26\u2e28\u3008\u300a\u300c\u300e\u3010\u3014\u3016\u3018\u301a\u301d\ufd3e\ufe17\ufe35\ufe37\ufe39\ufe3b\ufe3d\ufe3f\ufe41\ufe43\ufe47\ufe59\ufe5b\ufe5d\uff08\uff3b\uff5b\uff5f\uff62]',
	        Pd:'[\u002d\u058a\u05be\u1400\u1806\u2010-\u2015\u2e17\u2e1a\u301c\u3030\u30a0\ufe31\ufe32\ufe58\ufe63\uff0d]',
	        Pc:'[\u005f\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f]',
	        Pe:'[\u0029\u005d\u007d\u0f3b\u0f3d\u169c\u2046\u207e\u208e\u232a\u2769\u276b\u276d\u276f\u2771\u2773\u2775\u27c6\u27e7\u27e9\u27eb\u27ed\u27ef\u2984\u2986\u2988\u298a\u298c\u298e\u2990\u2992\u2994\u2996\u2998\u29d9\u29db\u29fd\u2e23\u2e25\u2e27\u2e29\u3009\u300b\u300d\u300f\u3011\u3015\u3017\u3019\u301b\u301e\u301f\ufd3f\ufe18\ufe36\ufe38\ufe3a\ufe3c\ufe3e\ufe40\ufe42\ufe44\ufe48\ufe5a\ufe5c\ufe5e\uff09\uff3d\uff5d\uff60\uff63]',
	        Sm:'[\u002b\u003c-\u003e\u007c\u007e\u00ac\u00b1\u00d7\u00f7\u03f6\u0606-\u0608\u2044\u2052\u207a-\u207c\u208a-\u208c\u2118\u2140-\u2144\u214b\u2190-\u2194\u219a\u219b\u21a0\u21a3\u21a6\u21ae\u21ce\u21cf\u21d2\u21d4\u21f4-\u22ff\u2308-\u230b\u2320\u2321\u237c\u239b-\u23b3\u23dc-\u23e1\u25b7\u25c1\u25f8-\u25ff\u266f\u27c0-\u27c4\u27c7-\u27ca\u27cc\u27ce-\u27e5\u27f0-\u27ff\u2900-\u2982\u2999-\u29d7\u29dc-\u29fb\u29fe-\u2aff\u2b30-\u2b44\u2b47-\u2b4c\ufb29\ufe62\ufe64-\ufe66\uff0b\uff1c-\uff1e\uff5c\uff5e\uffe2\uffe9-\uffec]',
	        Po:'[\u0021-\u0023\u0025-\u0027\u002a\u002c\u002e\u002f\u003a\u003b\u003f\u0040\u005c\u00a1\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1361-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30\u2e31\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]',
	        Sk:'[\u005e\u0060\u00a8\u00af\u00b4\u00b8\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0384\u0385\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u309b\u309c\ua700-\ua716\ua720\ua721\ua789\ua78a\ufbb2-\ufbc1\uff3e\uff40\uffe3]',
	        Sc:'[\u0024\u00a2-\u00a5\u060b\u09f2\u09f3\u09fb\u0af1\u0bf9\u0e3f\u17db\u20a0-\u20b9\ua838\ufdfc\ufe69\uff04\uffe0\uffe1\uffe5\uffe6]',
	        Pi:'[\u00ab\u2018\u201b\u201c\u201f\u2039\u2e02\u2e04\u2e09\u2e0c\u2e1c\u2e20]',
	        So:'[\u00a6\u00a7\u00a9\u00ae\u00b0\u00b6\u0482\u060e\u060f\u06de\u06e9\u06fd\u06fe\u07f6\u09fa\u0b70\u0bf3-\u0bf8\u0bfa\u0c7f\u0d79\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce\u0fcf\u0fd5-\u0fd8\u109e\u109f\u1360\u1390-\u1399\u1940\u19de-\u19ff\u1b61-\u1b6a\u1b74-\u1b7c\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211e-\u2123\u2125\u2127\u2129\u212e\u213a\u213b\u214a\u214c\u214d\u214f\u2195-\u2199\u219c-\u219f\u21a1\u21a2\u21a4\u21a5\u21a7-\u21ad\u21af-\u21cd\u21d0\u21d1\u21d3\u21d5-\u21f3\u2300-\u2307\u230c-\u231f\u2322-\u2328\u232b-\u237b\u237d-\u239a\u23b4-\u23db\u23e2-\u23f3\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u25b6\u25b8-\u25c0\u25c2-\u25f7\u2600-\u266e\u2670-\u26ff\u2701-\u2767\u2794-\u27bf\u2800-\u28ff\u2b00-\u2b2f\u2b45\u2b46\u2b50-\u2b59\u2ce5-\u2cea\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u3190\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u32fe\u3300-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua828-\ua82b\ua836\ua837\ua839\uaa77-\uaa79\ufdfd\uffe4\uffe8\uffed\uffee\ufffc\ufffd]',
	        Pf:'[\u00bb\u2019\u201d\u203a\u2e03\u2e05\u2e0a\u2e0d\u2e1d\u2e21]'
	    };
	    /* Also supports the general category (only the first letter) */
	    var firstLetters = {};
	    for ( var p in unicodeCategories ) {
	        if ( firstLetters[p[0]] )
	            firstLetters[p[0]] = unicodeCategories[p].substring(0,unicodeCategories[p].length-1) + firstLetters[p[0]].substring(1);
	        else
	            firstLetters[p[0]] = unicodeCategories[p];
	    }
	    for ( var p in firstLetters )
	        unicodeCategories[p] = firstLetters[p];
	    
	    /* Gets a regex written in a dialect that supports unicode categories and
	       translates it to a dialect supported by JavaScript. */
	    return function(regexpString) {
	        var modifiers = "";
	        if ( regexpString instanceof RegExp ) {
	            modifiers = (regexpString.global ? "g" : "") +
	                        (regexpString.ignoreCase ? "i" : "") +
	                        (regexpString.multiline ? "m" : "");
	            regexpString = regexpString.source;
	        }
	        regexpString = regexpString.replace(/\\p\{(..?)\}/g, function(match,group) {
	            return unicodeCategories[group] || match;
	        });
	        return new RegExp(regexpString,modifiers);
	    };
	})();


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*	Base64 utility
		======================================================================== */
	
	Base64 = {
		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
		// public method for encoding
		encode : function (input) {
		    var output = "";
		    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		    var i = 0;
	
		    input = Base64._utf8_encode(input);
	
		    while (i < input.length) {
	
		        chr1 = input.charCodeAt(i++);
		        chr2 = input.charCodeAt(i++);
		        chr3 = input.charCodeAt(i++);
	
		        enc1 = chr1 >> 2;
		        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		        enc4 = chr3 & 63;
	
		        if (isNaN(chr2)) {
		            enc3 = enc4 = 64;
		        } else if (isNaN(chr3)) {
		            enc4 = 64;
		        }
	
		        output = output +
		        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
		        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
	
		    }
	
		    return output;
		},
	
		// public method for decoding
		decode : function (input) {
		    var output = "";
		    var chr1, chr2, chr3;
		    var enc1, enc2, enc3, enc4;
		    var i = 0;
	
		    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
		    while (i < input.length) {
	
		        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
		        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
		        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
		        enc4 = Base64._keyStr.indexOf(input.charAt(i++));
	
		        chr1 = (enc1 << 2) | (enc2 >> 4);
		        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		        chr3 = ((enc3 & 3) << 6) | enc4;
	
		        output = output + String.fromCharCode(chr1);
	
		        if (enc3 != 64) {
		            output = output + String.fromCharCode(chr2);
		        }
		        if (enc4 != 64) {
		            output = output + String.fromCharCode(chr3);
		        }
	
		    }
	
		    output = Base64._utf8_decode(output);
	
		    return output;
	
		},
	
		// private method for UTF-8 encoding
		_utf8_encode : function (string) {
		    string = string.replace(/\r\n/g,"\n");
		    var utftext = "";
	
		    for (var n = 0; n < string.length; n++) {
	
		        var c = string.charCodeAt(n);
	
		        if (c < 128) {
		            utftext += String.fromCharCode(c);
		        }
		        else if((c > 127) && (c < 2048)) {
		            utftext += String.fromCharCode((c >> 6) | 192);
		            utftext += String.fromCharCode((c & 63) | 128);
		        }
		        else {
		            utftext += String.fromCharCode((c >> 12) | 224);
		            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
		            utftext += String.fromCharCode((c & 63) | 128);
		        }
	
		    }
	
		    return utftext;
		},
	
		// private method for UTF-8 decoding
		_utf8_decode : function (utftext) {
		    var string = "";
		    var i = 0;
		    var c = c1 = c2 = 0;
	
		    while ( i < utftext.length ) {
	
		        c = utftext.charCodeAt(i);
	
		        if (c < 128) {
		            string += String.fromCharCode(c);
		            i++;
		        }
		        else if((c > 191) && (c < 224)) {
		            c2 = utftext.charCodeAt(i+1);
		            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
		            i += 2;
		        }
		        else {
		            c2 = utftext.charCodeAt(i+1);
		            c3 = utftext.charCodeAt(i+2);
		            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		            i += 3;
		        }
	
		    }
		    return string;
		}
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*  $platform / $global
	    ======================================================================== */
	
	;(function () {
	
	    var p = (function () {
	
	                if ((typeof window !== 'undefined') && (window.window === window) && (window.navigator !== undefined)) {
	                        
	                    var platform            = navigator.platform,
	                        userAgent           = navigator.userAgent,
	                        platformOrUserAgent = platform + '\n' + userAgent
	
	                        return _.extend ({
	                                engine: 'browser',
	                                browserEngine: ((userAgent.indexOf ('AppleWebKit') >= 0) ? 'WebKit' : undefined),
	                                browser: 
	                                    ((userAgent.indexOf ('Firefox') >= 0) ? 'Firefox' :
	                                    ((userAgent.indexOf ('Chrome')  >= 0) ? 'Chrome' :
	                                    ((userAgent.indexOf ('Safari')  >= 0) ? 'Safari' :
	                                    ((userAgent.indexOf ('Trident') >= 0) ? 'IE' : undefined)))) },
	
	                                ((platform           .indexOf ("Linux arm") >= 0)
	                            ||   (platformOrUserAgent.indexOf ("Android")   >= 0) ? { touch: true, system: 'Android' } :
	
	                                    ((platformOrUserAgent.indexOf ("iPad")   >= 0) ? { touch: true, system: 'iOS', device: 'iPad' }  :
	                                    ((platformOrUserAgent.indexOf ("iPhone") >= 0)
	                                ||   (platformOrUserAgent.indexOf ("iPod")   >= 0) ? { touch: true, system: 'iOS', device: 'iPhone' } : {} )))) }
	
	                else if ((typeof global !== 'undefined') && (global.global === global)) {
	                    return { engine: 'node' } }
	
	                else {
	                    return {} } }) ()
	
	    var $global = (p.engine === 'browser') ? window :
	                  (p.engine === 'node')    ? global : undefined
	
	    $global.property = function (name, v, cfg) { 
	
	                            if (name in $global) {
	                                throw new Error ('cannot redefine global ' + name) }
	
	                            else {
	                                var def = (v instanceof Function)
	                                            ? { get: v, set: function () { throw new Error ('cannot set global ' + name) } }
	                                            : v
	
	                                return Object.defineProperty ($global, name, Object.assign ({}, def, { enumerable: true }, cfg)) } }
	
	    $global.const = function (name, v, cfg) {
	                        return $global.property (name, { value: v, writable: false }, cfg) }
	
	    $global.const ('$global', $global)
	    $global.const ('$platform', {   engine:  p.engine,
	                                    system:  p.system,
	                                    device:  p.device,
	                                    touch:   p.touch || false,
	
	                                    IE:      p.browser       === 'IE',
	                                    Firefox: p.browser       === 'Firefox',
	                                    Safari:  p.browser       === 'Safari',
	                                    Chrome:  p.browser       === 'Chrome',
	                                    WebKit:  p.browserEngine === 'WebKit',
	
	                                    Browser: p.engine === 'browser',
	                                    NodeJS:  p.engine === 'node',
	                                    iPad:    p.device === 'iPad',
	                                    iPhone:  p.device === 'iPhone',
	                                    iOS:     p.system === 'iOS'              })
	
	}) ();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*  converts 'arguments' (and any other array mimick) to real Array
	    ======================================================================== */
	
	_.withTest (['stdlib', 'asArray'], function () {
	
	    (function (a, b) {
	        var args = _.asArray (arguments)
	
	        $assert (_.isArray (args))
	        $assert (args.length === 2)
	        $assert (args[0] === a)
	        $assert (args[1] === b) }) (42, 43)
	
	        $assert (_.asArray (42), [42])
	
	        /*  Should not mutate its argument (regression)
	         */
	        var foo =     { 0: 'foo', length: 1 }
	        $assert (_.asArray (foo), ['foo'])
	        $assert (foo, { 0: 'foo', length: 1 }) }, function () { _.extend (_, {
	
	    asArray: function (x) {
	                return (x.length !== undefined) ? [].slice.call (x, 0) : [x] } }) })
	
	/*  Argument count tracking module (provides hinting to several metaprogramming
	    utilities, like property definitions)
	    ======================================================================== */
	
	_.withTest ('argcount tracking', function () {
	
	    var none        = function () {}
	    var one         = function (a) {}
	    var three       = function (a, b, c) {}
	    var many        = $restArg (function () {})
	
	    $assert (_.noArgs (none)    === true)
	    $assert (_.hasArgs (none)   === false)
	    $assert (_.numArgs (three)  === 3)
	    $assert (_.hasArgs (three)  === true)
	    $assert (_.restArg (many)   === true)
	    $assert (_.noArgs (many)    === false)
	    $assert (_.oneArg (one)     === true)
	
	    var sameAsThree = _.withSameArgs (three, function () {})
	    var oneArgLess  = _.withArgs (_.numArgs (three) - 1, _.restArg (three), function () {})
	
	    $assert ([_.numArgs (sameAsThree), _.restArg (sameAsThree)], [3, false])
	    $assert ([_.numArgs (oneArgLess ), _.restArg (oneArgLess )], [2, false])
	
	
	}, function () { _.extend (_, {
	
	    /*  Querying
	     */
	    numArgs: function (fn) {
	                return fn._ac === undefined ? fn.length : fn._ac },     // short name for speed
	
	    restArg: function (fn) {
	                return fn._ra || false },                               // short name for speed
	
	    noArgs: function (fn) {
	                return (_.numArgs (fn) === 0) && !fn._ra },
	
	    hasArgs: function (fn) {
	                return (_.numArgs (fn) > 0) && !fn._ra },
	
	    oneArg: function (fn) {
	                return (_.numArgs (fn) === 1) && !fn._ra },
	
	    /*  Setting
	     */
	    withRestArg: $restArg = function (fn) {
	                                Object.defineProperty (fn, '_ra', { enumerable: false, writable: true, value: true })
	                                return fn },
	
	    withArgs: function (numArgs, restArg, fn) {
	                        if (numArgs !== undefined) {
	                            Object.defineProperty (fn, '_ac', { enumerable: false, writable: true, value: numArgs }) }
	                        if (restArg !== undefined) {
	                            Object.defineProperty (fn, '_ra', { enumerable: false, writable: true, value: restArg }) }
	                        return fn },
	
	    withSameArgs: function (other, fn) {
	                        return _.withArgs (_.numArgs (other), _.restArg (other), fn) } }) })
	
	/*  Adds argcount tracking to some underscore functions.
	    Will test it for speed in future, and if slow in app code,
	    will be de-mounted, thus sacrificing clarity in some places.
	    ======================================================================== */
	
	;(function () {
	
	    var override = function (name, genImpl) {
	                        return _[name] = genImpl (_[name]) }
	
	    override ('memoize',
	        function (memoize) {
	            return function (fn) {
	                        return _.withSameArgs (fn, memoize (fn)) } })
	
	    override ('partial',
	        function (partial) {
	            return $restArg (function (fn) {
	                                    return _.withArgs (
	                                        Math.max (0, _.numArgs (fn) - (arguments.length - 1)), fn._ra,
	                                            partial.apply (this, arguments)) }) })
	
	    override ('bind',
	        function (bind) {
	            return $restArg (function (fn, this_) {
	                                return _.withArgs (
	                                    Math.max (0, _.numArgs (fn) - (arguments.length - 2)), fn._ra,
	                                        bind.apply (this, arguments)) }) })
	
	}) ();


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*  Useful for debugging and tests
	    ======================================================================== */
	
	_.debugEcho = function () { return [this].concat (_.asArray (arguments)) }
	
	
	/*  Context-free version of fn.call (for consistency)
	    ======================================================================== */
	
	_.call = function (fn, this_, args) { return fn.apply (this_, _.rest (arguments, 2)) }
	
	/*  Limits function to given number of arguments
	    ======================================================================== */
	
	_.arity = function (N, fn) { return function () {
	                                        return fn.apply (this, _.first (arguments, N)) }}
	
	_.arity0 = function (fn) { return function () {
	                                    return fn.call (this) }}
	
	_.arity1 = function (fn) { return function (a) {
	                                    return fn.call (this, a) }}
	
	_.arity2 = function (fn) { return function (a, b) {
	                                    return fn.call (this, a, b) }}
	
	_.arity3 = function (fn) { return function (a, b, c) {
	                                    return fn.call (this, a, b, c) }}
	
	_.arityFn = function (N) { return _['arity' + N] }
	
	
	/*  A version of _.partial that binds to tail of argument list
	    ======================================================================== */
	
	_.tails = $restArg (function (fn) { var tailArgs = _.rest (arguments)
	                                        return function () {
	                                            return fn.apply (this, _.asArray (arguments).concat (tailArgs)) }})
	
	_.tails2 = $restArg (function (fn) { var tailArgs = _.rest (arguments)
	                                        return function (a) {
	                                            return fn.apply (this, [a].concat (tailArgs)) }})
	
	_.tails3 = $restArg (function (fn) { var tailArgs = _.rest (arguments)
	                                        return function (a, b) {
	                                            return fn.apply (this, [a, b].concat (tailArgs)) }})
	
	
	/*  Userful for higher order operations
	    ======================================================================== */
	
	_.withTest (['function', 'calls / tails'], function () {
	
	    var fn       = _.debugEcho
	    var  foo42_  = _.callsWith ('foo', 42)
	    var _foo42   = _.tailsWith ('foo', 42)
	
	    var foo42_fn =   foo42_ (fn)
	    var fn_foo42 =  _foo42  (fn)
	
	    var _fn       = _.callsTo (fn)
	    var  fn_      = _.tailsTo (fn)
	    var fn_bar24  =  fn_ ('bar', 24)
	    var bar24_fn  = _fn  ('bar', 24)
	
	    $assert (foo42_fn.call ('lol', 777), ['lol', 'foo', 42, 777])
	    $assert (bar24_fn.call ('lol', 777), ['lol', 'bar', 24, 777])
	
	    $assert (fn_foo42.call ('lol', 777), ['lol', 777, 'foo', 42])
	    $assert (fn_bar24.call ('lol', 777), ['lol', 777, 'bar', 24])
	
	    $assertEveryCalledOnce (function (mkay) {
	        _.argumentPrependingWrapper (fn, function (fn) {
	            $assert (fn (777), ['lol', 777, 'foo', 42]); mkay () }).call ('lol', 'foo', 42) })
	
	}, function () {
	
	    _.callsTo = function (fn) {
	                    return $restArg (function () {
	                        return _.callsWith.apply (null, arguments) (fn) }) }
	
	    _.tailsTo = function (fn, then) {
	                    return $restArg (function () {
	                        return _.tailsWith.apply (null, arguments) (fn) }) }
	
	    _.callsWith = $restArg (function (/* args */) { var args = _.asArray (arguments)
	                                        return function (fn) {
	                                            return _.withSameArgs (fn, function () {
	                                                return fn.apply (this, args.concat (_.asArray (arguments))) }) } })
	
	
	    _.tailsWith = $restArg (function (/* args */) { var args = _.asArray (arguments)
	                                        return function (fn) {
	                                            return _.withSameArgs (fn, function () {
	                                                return fn.apply (this, _.asArray (arguments).concat (args)) }) } })
	
	    _.argumentAppendingWrapper = function (fn, then) {
	        return _.withSameArgs (fn, function () { var this_ = this, args = _.asArray (arguments)
	                                        return then (function () {
	                                            return fn.apply (this_, args.concat (_.asArray (arguments))) }) }) }
	
	    _.argumentPrependingWrapper = function (fn, then) {
	        return _.withSameArgs (fn, function () { var this_ = this, args = _.asArray (arguments)
	                                        return then (function () {
	                                            return fn.apply (this_, _.asArray (arguments).concat (args)) }) }) } }) // @hide
	
	
	/*  binding to constructor arguments (cannot do this with bind/partial)
	    ======================================================================== */
	
	_.new = $restArg (function (Constructor, a, b, c, d) {
	            switch (arguments.length) {
	                case 1: return new Constructor ()
	                case 2: return new Constructor (a)
	                case 3: return new Constructor (a, b)
	                case 4: return new Constructor (a, b, c)
	                case 5: return new Constructor (a, b, c, d)
	                default: _.notImplemented () } })
	
	/*  Flips function signature (argument order)
	    ======================================================================== */
	
	_.flipN = function (fn) { return $restArg (function () {
	             return fn.apply (this, _.asArray (arguments).reverse ()) })}
	
	_.flip = function (fn) {
	            if (_.restArg (fn)) { return _.flipN (fn) }
	            else { switch (_.numArgs (fn)) {
	                                    case 0:
	                                    case 1: return fn
	                                    case 2: return _.flip2 (fn)
	                                    case 3: return _.flip3 (fn)
	                                    default: throw new Error ('flip: unsupported arity') } } }
	
	_.flip2 = function (fn) { return function (a, b) {
	                                    return fn.call (this, b, a) }}
	
	_.flip3 = function (fn) { return function (a, b, c) {
	                                    return fn.call (this, c, b, a) }}
	
	/*  Logical composition operators
	    ======================================================================== */
	
	_.or = function (a, b) { return function () {
	        return a.apply (this, arguments) || b.apply (this, arguments) }},
	
	_.and = function (a, b) { return function () {
	        return a.apply (this, arguments) && b.apply (this, arguments) }},
	
	_.not = function (x) { return function () {
	        return !x.apply (this, arguments) } }
	
	/*  Y combinator (for anonymous recursive functions)
	    ======================================================================== */
	
	_.withTest (['function', 'Y combinator'], function () {
	
	    var countTo5 = _.Y (function (self) {
	        return function (n) {
	            return n >= 5 ? n : self (n + 1) } })
	
	    $assert (countTo5 (0), 5) }, function () { _.extend (_, {
	
	    Y: function (eatSelf) {
	        var self = eatSelf (function () {
	            return self.apply (this, arguments) }); return self } }) });
	
	
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
	                                                                          var arity            = _.arityFn (N)       || _.identity
	                                                                          var weNeedToGoDeeper =  (diCaprioPredicate || _.goDeeperWhenFirstArgumentIsGood) (N, nonTrivial || _.isNonTrivial)
	                            return function () {                          var subOperator      = _.last (arguments)
	                                return _.Y (function (hyperOperator_) {   var hyperOperator    = _.tails (operator, arity (hyperOperator_))
	                                    return function () {
	                                        return (weNeedToGoDeeper (arguments) ?
	                                                    hyperOperator :
	                                                    subOperator)
	                                                        .apply (this, arguments) } }).apply (this, _.initial (arguments)) } }
	
	    /*  Combinatoric complexity classifiers for exact configuration of hyperOperator behavior
	     */
	    _.goDeeperWhenFirstArgumentIsGood= function (N, canGoDeeper) { 
	        return function (args) { return   (args.length > 0) ? canGoDeeper (args[0]) : false } }
	
	    _.goDeeperAlwaysIfPossible= function (N, canGoDeeper) {
	             if (N === 0) {                          return _.constant (false)                                }
	        else if (N === 1) { return function (args) { return   canGoDeeper (args[0])                           } }
	        else if (N === 2) { return function (args) { return   canGoDeeper (args[0]) || canGoDeeper (args[1])  } }
	        else              { return function (args) { return _.some (_.asArray (args),  canGoDeeper)           } } }
	
	    _.goDeeperOnlyWhenNessesary = function (N, canGoDeeper) {
	             if (N === 0) {                          return _.constant (false)                                }
	        else if (N === 1) { return function (args) { return   canGoDeeper (args[0])                           } }
	        else if (N === 2) { return function (args) { return   canGoDeeper (args[0]) && canGoDeeper (args[1])  } }
	        else              { return function (args) { return _.every (_.asArray (args), canGoDeeper)           } } }
	
	    _.isTrivial = function (x) { return            _.isEmpty (x) || _.isString (x) || _.isNumber (x) ||
	                                        !(_.isStrictlyObject (x) || _.isArray (x)) || _.isPrototypeInstance (x) || _.isMeta (x) }
	
	    _.isMeta = _.constant (false)
	
	    _.isNonTrivial = _.not (_.isTrivial)
	
	    /*  Self-descriptive constants (for clarity)
	     */
	    _.binary = 2
	    _.unary  = 1 }) ()
	
	/*  Generates higher order stuff from regular routine
	    ======================================================================== */
	
	_.withTest (['function', 'higherOrder'], function () {
	
	        var file = []
	        var write = function (x) { file.push (x) }
	        var writes = _.higherOrder (write)
	
	        _.times (3, writes ('foo'))
	
	        $assert (file, ['foo', 'foo', 'foo']) }, function () {
	
	    _.higherOrder = _.callsTo })
	
	/*  coerces x|fn()→x to x (useful for configuration parameters)
	    ======================================================================== */
	
	_.deferTest (['function', 'eval/evals'], function () {
	
	        var cfg = {
	            value1: 42,
	            value2: function () { return 42 },
	            value3: _.property ('number')
	        }
	
	        var eval = _.evals ({ number: 42 }) // higher order
	
	        $assert (_.eval (cfg.value1), _.eval (cfg.value2), eval (cfg.value3), 42) }, function () {
	
	    _.eval = function (x) {
	                return _.isFunction (x) ? x.call (this) : x  }
	
	    _.evals = function (__args__) {
	                var arguments_ = arguments
	                return function (x) {
	                    return _.isFunction (x) ? x.apply (this, arguments_) : x } } })
	
	/*  in rhyme with _.property, this one calls a method
	    ======================================================================== */
	
	_.method = function (name) {
	                var args = _.rest (arguments)
	                    return function (obj) {
	                        return obj[name].apply (obj, args) } }
	
	/*  Converts between calling conventions
	    ======================================================================== */
	
	_.asFreeFunction = function (fn) { return function (this_, restArg) {
	                                            return fn.apply (this_, _.rest (arguments)) } }
	
	_.asMethod = function (fn) { return function () {
	                                        return fn.apply (undefined, [this].concat (_.asArray (arguments))) } }
	
	
	/*  _.once
	    ======================================================================== */
	
	_.withTest (['function', 'once'], function () {
	
	    $assertEveryCalledOnce (function (mkay) {
	        var f = _.once (function () { mkay () })
	        f ()
	        f () }) },                                          function () {
	
	    _.once = function (fn) {
	                var called = false
	                return function () {
	                    if (!called) { called = true
	                        return fn.apply (this, arguments) } } } })
	
	/*  _.withTimeout
	    ======================================================================== */
	
	_.deferTest (['function', 'withTimeout'], function (testDone) {
	
	    _.withTimeout ({
	        maxTime: 10,
	        expired: function () { $fail } },
	        function (done) { done () })
	
	    _.withTimeout ({
	        maxTime: 10,
	        expired: function (then) { testDone () } },
	        function (done) { _.delay (done, 20) },
	        function () { // 'then' should not be called if expired (though you may call it explicitly at expired() callback)
	            $fail })
	
	}, function () {
	
	    _.withTimeout = function (cfg, what, then) {
	        var expired = false
	        var timeout = setTimeout (function () {
	            expired = true
	            if (cfg.expired) {
	                cfg.expired (then) } }, cfg.maxTime)
	
	        what (function () {
	            if (!expired) {
	                clearTimeout (timeout)
	                if (then) {
	                    then.apply (this, arguments) } } }) } })
	
	/*  Sequential composition operator (inverted _.compose, basically)
	    ======================================================================== */
	
	_.withTest (['function', 'sequence / then'], function () {
	
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
	
	        var plusBar = _.then (function (x) { return Promise.resolve (x) },
	                              function (x) { return x + 'bar' })
	
	        return plusBar ('foo').then (function (x) { $assert (x, 'foobar') })
	
	    }, function () {
	
	        _.sequence = function (arg) { // was _.flip (_.compose) before... but it needs performance
	            var chain = _.isArray (arg) ? arg : _.asArray (arguments)
	            var length = chain.length
	            return (length === 0) ? _.identity : function (x) {
	                for (var i = 0; i < length; i++) { x = chain[i].call (this, x) }
	                return x } }
	
	        _.seq = _.sequence
	
	        _.then = function (fn1, fn2) { return function (args) {
	                                                var r = fn1.apply (this, arguments)
	                                                return (r instanceof Promise)
	                                                            ? r.then (fn2.bind (this))
	                                                            : fn2.call (this, r) }} })
	
	


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*  Basic utility for writing data-crunching functional expressions.
	    ======================================================================== */
	
	_.typeOf = function (what) {
	                return typeof what }
	
	_.instanceOf = function (what) {
	                    return function (x) { return (x instanceof what) } }
	
	_.count = function (what) { // cannot override _.length
	                return what.length }
	
	_.array = _.tuple = function () {
	                        return _.asArray (arguments) }
	
	_.cons = function (head, tail) { return [head].concat (tail || []) }
	
	_.atIndex = function (n) {
	                return function (arr) { return arr[n] } }
	
	_.takesFirst = _.higherOrder (_.first)
	_.takesLast  = _.higherOrder (_.last)
	
	_.applies = function (fn, this_, args) {
	                return function () { return fn.apply (this_, args) } }
	
	_.prepends = function (what) {
	                return function (to) {
	                    return what + to } }
	
	_.appends = function (what) {
	                return function (to) {
	                    return to + what } }
	
	_.join = function (arr, s) { return arr.join (s) }
	_.joinWith = _.flip2 (_.join)
	_.joinsWith = _.higherOrder (_.joinWith)
	
	_.split      = function (s, del) { return s.split (del) }
	_.splitWith  =                   _.flip2 (_.split)
	_.splitsWith =             _.higherOrder (_.splitWith)
	
	_.sum = function (a, b) {
	            return (a || 0) + (b || 0) }
	
	
	_.subtract = function (a, b) {
	                return (a || 0) - (b || 0) }
	
	_.mul = function (a, b) {
	            return (a || 0) * (b || 0) }
	
	_.equal = function (a, b) {
	            return a === b }
	
	_.sums      = _.plus  = _.higherOrder (_.sum)
	_.subtracts = _.minus = _.higherOrder (_.subtract)
	_.muls                = _.higherOrder (_.mul)
	_.equals              = _.higherOrder (_.equal)
	
	_.less           = function (a, b) { return a <  b }
	_.lessOrEqual    = function (a, b) { return a <= b }
	_.greater        = function (a, b) { return a >  b }
	_.greaterOrEqual = function (a, b) { return a >= b }
	
	_.isNegative = function (a) { return a < 0 }
	
	_.largest = function (a, b) {                   // FFFFUUUU: underscore already taken _.max for its dirty needs.
	                if (isNaN (a) && isNaN (b)) {
	                    return NaN }
	                else if (isNaN (a)) {
	                    return b }
	                else if (isNaN (b)) {
	                    return a }
	                else {
	                    return Math.max (a, b) } }
	
	_.notZero = function (x) { return x !== 0 }
	
	_.propertyOf = function (obj) { return function (prop) {            // inverted version of _.property
	                                            return obj[prop] }}
	
	_.oneOf = $restArg (function () {
	    return _.propertyOf (_.index (_.asArray (arguments))) })


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*  isTypeOf
	    ======================================================================== */
	
	_.isTypeOf = function (constructor, what) {
	    return what instanceof constructor }
	
	_.isPrototypeInstance = function (x) {
	    return x && x.constructor && _.isPrototypeConstructor (x.constructor) }
	
	_.isPrototypeConstructor = function (x) {
	    return (x && (x.$definition !== undefined)) || false }
	
	
	/*  NaN has interesting property: Number.NaN !== Number.NaN, this makes it
	    more preferable than undefined/null in some cases. This function converts
	    anything that is not a number to NaN.
	    ======================================================================== */
	
	_.coerceToNaN = function (x) { return _.isFinite (x) ? x : Number.NaN }
	
	
	/*  Useful for defining functions that accept either [x] or x as argument
	    ======================================================================== */
	
	_.coerceToArray = function (x) {
	                    return (x === undefined) ? []
	                                             : (_.isArray (x) ? x :
	                                                               [x]) }
	
	/*  Useful for defining flow control parameterization
	    ======================================================================== */
	
	_.coerceToFunction = function (x) {
	          return _.isFunction (x) ?             x
	                                  : _.constant (x) }
	
	
	/*  Use to determine whether an object could be enumerated like an Array
	    TODO: it may be more reasonable to check for 'length' property presence
	    ======================================================================== */
	
	_.isArrayLike = function (x) {
	    return (x instanceof Array) || ($platform.Browser && (x instanceof NodeList)) }
	
	
	/*  Fixes _.isArray to account objects that derive from Array prototype
	    ======================================================================== */
	
	_.deferTest (['type', 'isArray'], function () {
	
	        var CustomArray = $extends (Array, {
	            method: function () { return 42 } })
	
	        $assert (_.isArray (new CustomArray ())) },
	
	    function () {
	
	        _.isArray = function (x) {
	            return x instanceof Array } })
	
	
	/*  Better _.matches / $assertMatches: +regexp feature, +deep matching
	    ======================================================================== */
	
	_.deferTest (['type', 'matches(regex)'], function () {
	
	    var test = function (a, pattern) {
	        $assert (_.match (a, pattern))
	        $assert (_.matches (pattern) (a))
	        $assertMatches (a, pattern) }
	
	    $assertFails (function () {
	        test ({ foo: [1,2], bar: 2 },
	              { foo: [3], bar: 2 })
	        test ({ bar: { foo: 'foo' } },
	              { bar: { foo: /[0-9]+/ } })
	        test ({}, { foo: 1 }) })
	
	    $assertFails (function () {
	        test ({ foo: 1 }, undefined)    // differs from original impl in that
	        test ('.DS_Store', /.+\.js/) }) // regression
	
	    test ({ foo: [1,2], bar: 2 },
	          { foo: [2] })
	    test ({ bar: { foo: '123', qux: 1 } },
	          { bar: { foo: /[0-9]+/ } })
	    test ({ foo: 1 }, {}) },
	
	    function () { _.mixin ({
	
	        matches: function (pattern) {
	                        return ((arguments.length === 0) && _.constant (true)) ||
	                                                            _.tails2 (_.match, pattern) },
	
	        match: function (a, ptrn) {
	                        return  (a === ptrn)
	                            ||  (_.isArray (a)  && _.isArray (ptrn)  && _.arrayMatch (a, ptrn))
	                            ||  (_.isObject (a) && _.isObject (ptrn) && _.objectMatch (a, ptrn))
	                            ||  (_.isTypeOf (RegExp, ptrn) && _.isString (a) && (a.match (ptrn) !== null)) },
	
	        arrayMatch: function (a, pattern) {
	            return _.every (pattern, _.propertyOf (_.index (a))) },
	         
	        objectMatch: function (a, pattern) {
	                            return _.reduce (_.pairs (pattern),
	                                function (result, kv) {
	                                    return result && _.match (a[kv[0]], kv[1]) }, true) } }) })
	
	/*  Scalar values
	    ======================================================================== */
	
	_.withTest (['type', 'isScalar'], function () {
	
	        $assert (_.every ([0, 42, 'foo', null, undefined, true, false], _.isScalar))
	        $assert (_.every ([/foo/, new Date (), {}, []],       _.not (_.isScalar))) },
	
	    function () {
	
	        _.isScalar = function (v) {
	                        return (v === undefined) ||
	                               (v === null) ||
	                               (v.constructor === String) ||
	                               (v.constructor === Number) ||
	                               (v.constructor === Boolean) } })
	
	
	/*  POD data types
	    ======================================================================== */
	
	_.withTest (['type', 'POD'], function () {
	
	        $assert (_.every ([[], {}, 42, 0, 'foo', null, undefined, true].map (_.isPOD)))
	        $assert (_.every ([/foo/, new Date ()].map (_.isNonPOD))) },
	
	    function () {
	
	        _.isNonPOD = function (v) {
	                        return !_.isPOD (v) }
	
	        _.isPOD = function (v) {
	                    return _.isScalar (v) ||
	                                (v && ((v.constructor === Object) || (v.constructor === Array))) } })
	
	
	/*  'empty' classifiers (fixes underscore shit)
	    ======================================================================== */
	
	_.withTest (['type', 'empty-centric routines'], function () {
	
	    $assert (_.coerceToObject ({ foo: 42 }), { foo: 42 })
	    $assert (_.coerceToObject ([1,2,3]),     [1,2,3])
	    $assert (_.coerceToObject (42),          {})
	    $assert (_.coerceToObject (undefined),   {})
	
	    $assert (_.coerceToEmpty (42), undefined)
	    $assert (_.coerceToEmpty ([42]), [])
	    $assert (_.coerceToEmpty ({ foo: 42 }), {})
	
	    $assert ([
	        _.isNonemptyString ('foo'),
	        _.isNonemptyString (''),
	        _.isNonemptyString ([])], [true, false, false])
	
	    $assert (_.isEmptyArray ([]),           true)
	    $assert (_.isEmptyArray ([1,2,3]),      false)
	    $assert (_.isEmptyArray (undefined),    false)
	    $assert (_.isEmptyArray (null),         false)
	    $assert (_.isEmptyArray (''),           false)
	
	    $assert (_.isEmptyObject ({}),          true)
	    $assert (_.isEmptyObject ([]),          false)
	    $assert (_.isEmptyObject ({ foo: 1 }),  false)
	    $assert (_.isEmptyObject (undefined),   false) 
	    $assert (_.isEmptyObject (null),        false)
	    $assert (_.isEmptyObject (''),          false)
	    $assert (_.isEmptyObject (0),           false)
	    $assert (_.isEmptyObject (false),       false)
	
	    $assert (_.isEmpty (0),         false)
	    $assert (_.isEmpty (false),     false)
	    $assert (_.isEmpty (/.+\.js/),  false) // regression
	    $assert (_.isEmpty (null),      true)
	    $assert (_.isEmpty ({}),        true)
	    $assert (_.isEmpty ([]),        true)
	
	    $assert (_.isNonempty ('foo'),  true) // negated _.isEmpty
	
	    $assert (_.coerceToUndefined (undefined),   undefined)
	    $assert (_.coerceToUndefined ({}),          undefined)
	    $assert (_.coerceToUndefined ([]),          undefined)
	    $assert (_.coerceToUndefined (''),          undefined)
	    $assert (_.coerceToUndefined (null),        undefined)
	    $assert (_.coerceToUndefined (0),           0)
	    $assert (_.coerceToUndefined (Math.NaN),    undefined)
	    $assert (_.coerceToUndefined (false),       false)
	    $assert (_.coerceToUndefined ({ foo: 1 }),  { foo: 1 })
	    $assert (_.coerceToUndefined ([1, 2]),      [1, 2])  }, function () { _.extend (_, {
	
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
	    isEmpty: function (obj) {
	        return _.coerceToUndefined (obj) === undefined },
	
	    isNonempty: function (obj) {
	        return _.coerceToUndefined (obj) !== undefined },
	
	    isEmptyObject: function (v) {
	                        return   !_.isArray (v) &&
	                                 !_.isFunction (v) &&
	                                  _.isObject (v) &&
	                                 (_.keys (v).length === 0) },
	
	    isStrictlyObject: function (v) {
	        return (v && (typeof v === 'object')) ? true : false },
	
	    isEmptyArray: function (v) {
	                        return _.isArray (v) && v.length === 0 },
	
	    isNonemptyString: function (v) {
	        return (typeof v === 'string') && (v.length > 0) },
	
	    coerceToObject: function (x) {
	        return _.isStrictlyObject (x) ? x : {} },
	
	    coerceToEmpty: function (x) {
	        if (_.isArray (x)) { return [] }
	        else if (_.isStrictlyObject (x)) { return {} }
	        else { return undefined } },
	
	    /*  Projects a variety of input values through 'undefined/non-undefined' dichotomy.
	     */
	    coerceToUndefined: function (v) {
	                            return ((v === undefined) ||
	                                    (v === null) ||
	                                    (v === Math.NaN) ||
	                                    (v === '') ||
	                                    (_.isPOD (v) &&
	                                        (_.isEmptyObject (v) ||
	                                        (v.length === 0)))) ? undefined : v } })} )
	
	
	
	
	
	


/***/ },
/* 10 */
/***/ function(module, exports) {

	_.hasStdlib = true
	
	/*  _.throwsError
	    ======================================================================== */
	
	_.withTest (['stdlib', 'throwsError'], function () {
	
	        $assertThrows (_.throws ('foo'), 'foo')
	
	        $assertThrows (_.throwsError (           'неуловимый Джо'),  _.matches ({ message: 'неуловимый Джо' }))
	        $assertThrows (_.throwsError (new Error ('неуловимый Джо')), _.matches ({ message: 'неуловимый Джо' }))   },
	
	    function () {
	
	        _.throwsError = _.higherOrder (
	            _.throwError = function (msg) {
	                             throw (msg instanceof Error) ? msg : new Error (msg) })
	
	        _.throws = _.higherOrder (
	                        _.throw = function (msg) { throw msg })
	
	        _.overrideThis   = _.throwsError ('override this')
	        _.notImplemented = _.throwsError ('not implemented') })
	
	
	/*  Abstract _.values
	    ======================================================================== */
	
	_.withTest (['stdlib', 'values2'], function () {
	
	    $assert (_.values2 (undefined), [])
	    $assert (_.values2 (_.identity), [_.identity])
	    $assert (_.values2 ('foo'), ['foo'])
	    $assert (_.values2 (['foo', 'bar']), ['foo', 'bar'])
	    $assert (_.values2 ({ f: 'foo', b: 'bar' }), ['foo', 'bar'])
	
	}, function () { _.mixin ({
	                    values2: function (x) {
	                             if (_.isArrayLike (x))         { return x }
	                        else if (_.isStrictlyObject (x))    { return _.values (x) }
	                        else if (_.isEmpty (x))             { return [] }
	                        else                                { return [x] } } }) })
	
	/*  Map 2.0
	    ======================================================================== */
	
	/*  Semantically-correct abstract map (maps any type of value)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.withTest (['stdlib', 'map2'], function () {
	
	                                 var plusBar =   _.appends ('bar')
	
	    $assert (_.map2 (       'foo',   plusBar),           'foobar'  )
	    $assert (_.map2 ([      'foo'],  plusBar),    [      'foobar' ])
	    $assert (_.map2 ({ foo: 'foo' }, plusBar),    { foo: 'foobar' })
	
	    $assert (Array.from (_.map2 (new Set (['foo',    'bar']), plusBar).values ()),
	                                          ['foobar', 'barbar'])
	
	    /*  With flipped order of arguments (callback first)
	     */
	    $assert (_.mapWith (plusBar, { foo: 'foo' }), { foo: 'foobar' })
	
	}, function () { _.mixin ({     map2: function (value,                       fn,      context) { return (
	                                 _.isArrayLike (value) ? _.map       (value, fn,      context) : (
	                                (value instanceof Set) ? _.mapSet    (value, fn,      context) : (
	                            _.isStrictlyObject (value) ? _.mapObject (value, fn,      context) :
	                                                                             fn.call (context, value)))) } })
	
	                _.mapSet = function (set, fn, ctx) { var out = new Set ()
	                                                     for (var x of set) { out.add (fn.call (ctx, x)) }
	                                                     return out }
	                _.mapsWith = _.higherOrder (
	                _.mapWith  = _.flip2 (_.map2)) })
	
	/*  Pluck 2.0
	    ======================================================================== */
	
	_.pluck2 = function (x, prop) {
	                return _.map2 (x, _.property (prop)) }
	
	
	/*  Maps one-to-many
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.withTest (['stdlib', 'scatter/obj/arr'], function () {
	
	    $assert (undefined, _.scatter ([], _.noop))
	
	    $assert ([1,10, 2,20, 3,30],         _.scatter ([1,2,3], function (x, i, return_) { return_ (x); return_ (x * 10) }))
	    $assert ({ 'b': 0, 'a': 1, 'r': 2 }, _.scatter ('bar',   function (x, i, return_) { _.each (x.split (''), _.flip (return_)) }))
	
	    $assert (_.obj (_.noop),
	             _.arr (_.noop), undefined)
	
	    $assert (_.obj (function (emit) {
	                              emit (42, 'foo')
	                              emit (43, 'bar') }), { foo: 42, bar: 43 })
	
	    $assert (_.arr (function (emit) {
	                              emit (42)
	                              emit (43, 44) }), [42, [43, 44]])
	
	}, function () { _.mixin ({
	                    scatter: function (obj, elem) { var result = undefined
	                                _.map2 (obj, function (x, i) {
	                                                 elem (x, i, function (v, k) {
	                                                                if (arguments.length < 2) { (result = result || []).push (v) }  
	                                                                                     else { (result = result || {})[k] = v } }) }); return result } })
	                 _.obj = function (emitItems) {
	                            var x = undefined; emitItems (function (v, k)  { (x = x || {})[k] = v  })
	                         return x }
	
	                 _.arr = function (emitItems) {
	                            var x = undefined; emitItems (function (v    ) { (x = x || []).push ((arguments.length < 2) ? v : _.asArray (arguments)) })
	                         return x } })
	
	
	/*  Maps keys (instead of values)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.withTest (['stdlib', 'mapKeys'], function () {
	
	    $assert (_.mapKeys ({ 'foo':    [1, 2,{ 'gay':    3 }]}, _.appends ('bar')),
	                        { 'foobar': [1, 2,{ 'gaybar': 3 }]})
	
	}, function () { _.mapKeys = function (x, fn) {
	                        if (_.isArrayLike (x)) {
	                            return _.map (x, _.tails2 (_.mapKeys, fn)) }
	                        else if (_.isStrictlyObject (x)) {
	                            return _.object (_.map (_.pairs (x), function (kv) { return [fn (kv[0]), _.mapKeys (kv[1], fn)] })) }
	                        else {
	                            return x } } })              
	
	
	/*  Hyper map (deep) #1 — maps leafs
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.withTest (['stdlib', 'mapMap'], function () {
	
	        $assert (_.mapMap ( 7,  _.typeOf),  'number')   // degenerate cases
	        $assert (_.mapMap ([7], _.typeOf), ['number'])
	
	        $assert (_.mapMap ( {   foo: 7,
	                                bar: ['foo', {
	                                    bar: undefined } ] }, _.typeOf),
	                            
	                            {   foo: 'number',
	                                bar: ['string', {
	                                    bar: 'undefined' } ] }) },
	    function () {
	
	        _.mapMap = _.hyperOperator (_.unary, _.map2) })
	
	
	/*  Hyper map (deep) #2 — maps branches & leafs 
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.withTest (['stdlib', 'hyperMap'], function () {
	
	        var complexObject = {  garply:         { bar: { baz: 5 } },
	                               frobni: { foo: [{ bar: { baz: 5 } }] } }
	    /*                                         -----------------             */
	
	        var barBazSubstructure =    _.matches ({ bar: { baz: 5 } })
	
	        var transformedObject = _.hyperMap (complexObject, function (x) {
	                                                                if (barBazSubstructure (x)) { return 'pwned!' } })
	
	        $assert (transformedObject, { garply:         'pwned!',
	                                      frobni: { foo: ['pwned!'] } })         },
	
	    function () {
	
	        _.hyperMap =  function (data, op) {
	                        return _.hyperOperator (_.unary, function    (expr, f) {
	                                                           return op (expr) ||
	                                                              _.map2 (expr, f) }) (data, _.identity) } })
	
	
	/*  Abstract _.pairs
	    ======================================================================== */
	
	_.withTest (['stdlib', 'pairs2'], function () {
	
	    $assert (_.pairs2 (undefined),              [[undefined, undefined]]) // TODO: unify semantics with _.values2
	    $assert (_.pairs2 (_.identity),             [[undefined, _.identity]])
	    $assert (_.pairs2 ('foo'),                  [[undefined, 'foo']])
	    $assert (_.pairs2 (['foo', 'bar']),         [[ 0,  'foo'], [ 1,  'bar']])
	    $assert (_.pairs2 ({ 0: 'foo', 1: 'bar' }), [['0', 'foo'], ['1', 'bar']]) },
	
	        function () {
	
	            _.pairs2 = function (x) { return _.scatter (x, function (x, i, return_) { return_ ([i, x]) }) } })
	
	
	
	/*  Filter 2.0
	    ======================================================================== */
	
	_.withTest (['stdlib', 'filter 2.0'], function () { var foo = _.equals ('foo')
	
	    // generic filter behavior for any container type
	
	    $assert (_.filter2 (     'foo'  ,   foo),        'foo' )
	    $assert (_.filter2 ([    'foo' ],   foo),   [    'foo' ])
	    $assert (_.filter2 ({ f: 'foo' },   foo),   { f: 'foo' })
	    
	    $assert (_.filter2 (     'foo'  ,   _.not (foo)),   undefined)
	    $assert (_.filter2 ([    'foo' ],   _.not (foo)),   [])
	    $assert (_.filter2 ({ f: 'foo' },   _.not (foo)),   {})
	
	    // map behavior, if predicate returns not boolean (mixed-behavior test not needed - although its the expected case of use)
	
	    $assert (_.filter2 (     'foo' ,    _.constant ('bar')),         'bar'  )
	    $assert (_.filter2 ([    'foo' ],   _.constant ('bar')),    [    'bar' ])
	    $assert (_.filter2 ({ f: 'foo' },   _.constant ('bar')),    { f: 'bar' })
	
	    // hyper-filter #1 (works on leafs)
	
	    $assert (_.filterFilter (
	                    { foo: 'foo',   bar: [7, 'foo', { bar: 'foo' }] }, _.not (_.equals ('foo'))),
	                    {               bar: [7,        {            }] })  
	
	}, function () {
	
	    _.reject2 = function (value, op) {
	        return _.filter2 (value, _.not (op)) }
	
	    _.filter2 = function (value, op) {
	        if (_.isArrayLike (value)) {                            var result = []
	            for (var i = 0, n = value.length; i < n; i++) {     var v = value[i], opSays = op (v, i)
	                if (opSays === true) {
	                    result.push (v) }
	                else if (opSays !== false) {
	                    result.push (opSays) } } return result }
	
	        else if (_.isStrictlyObject (value)) {                  var result = {}
	            _.each (Object.keys (value), function (key) {       var v = value[key], opSays = op (v, key)
	                if (opSays === true) {
	                    result[key] = v }
	                else if (opSays !== false) {
	                    result[key] = opSays } }); return result }
	
	        else {                                                  var opSays = op (value)
	            if (opSays === true) {
	                return value }
	            else if (opSays !== false) {
	                return opSays }
	            else {
	                return undefined } } }
	
	        _.filterFilter = _.hyperOperator (_.unary, _.filter2)
	
	        _.hyperFilter =  function (data, op) {
	                           return _.hyperOperator (_.unary, function (                   expr, f) {
	                                                           var x =                   op (expr)
	                                                      return ((x === true) && _.filter2 (expr, f)) || x }) (data, _.identity) }
	
	        _.hyperReject = function (data, op) {
	            return _.hyperFilter (data, function (x) { var  opa = op (x)
	                                        return _.isBoolean (opa) ?
	                                                           !opa  :
	                                                            opa }) }
	})
	
	/*  ======================================================================== */
	
	_.withTest (['stdlib', 'each 2.0'], function () {
	
	    var test = function (input) {                                        var output = []
	                _.each2 (input, function ( x,     i,          n) {           output.push (
	                                         [ x,     i,          n]) }); return output }
	                            
	        $assert (test ( 'foo'),         [['foo',  undefined,  1]])        
	        $assert (test (['foo', 'bar']), [['foo',  0,          2],
	                                         ['bar',  1,          2]])
	        $assert (test ({ 'f': 'oo',
	                         'b': 'ar' }),  [[ 'oo', 'f',         2],
	                                         [ 'ar', 'b',         2]])
	}, function () { 
	
	    _.each2 =            function (x,                                                                           f) {
	           if (     _.isArrayLike (x)) {                          for (var     i = 0, n = x.length; i < n; i++) f (x[       i ],     i, n) } // @hide
	      else if (_.isStrictlyObject (x)) { var k = Object.keys (x); for (var ki, i = 0, n = k.length; i < n; i++) f (x[ki = k[i]],    ki, n) }
	         else                          {                                                                        f (x,        undefined, 1) } } })
	
	
	/*  Reduce on steroids
	    ======================================================================== */
	
	_.withTest (['stdlib', 'reduce 2.0'], function () {
	
	    $assert (_.reduce2 (     3,   [7,    9 ], _.sum), 19)
	    $assert (_.reduce2 ([    3,    7,    9 ], _.sum), 19)
	    $assert (_.reduce2 ({ a: 3, b: 7, c: 9 }, _.sum), 19)
	    $assert (_.reduce2 (     3   + 7   + 9  , _.sum), 19)
	
	    $assert (_.reduce2 ([1], _.sum), 1)
	    $assert (_.reduce2 ([],  _.sum), undefined)
	
	    $assert (              1 + 20 + 3 + 4 + 5,
	        _.reduceReduce ([[[1], 20],[3,[ 4,  5]]], function (a, b) { return (_.isNumber (a) && _.isNumber (b)) ? (a + b) : b }))
	
	}, function () {
	
	    /*  Because hyperOperator is fractal thing, it is nessesary to define a compatible argument
	        order for _.reduce and its functor operand, as they get melted together to form a generic
	        self-similar routine of a higher order.
	
	        And that becames kinda "Yodish" when applied to familiar 'reduce'. See how they dont match:
	
	            1. _.reduce (value, op, memo)
	            2.       op (memo, value)
	    */
	
	    _.reduce2 = function (        _1,                 _2,      _3) { var no_left = arguments.length < 3
	                       var left = _1,        rights = _2, op = _3
	         if (no_left) {    left = undefined; rights = _1; op = _2 }
	
	         _.each2 (rights, function (right, i) {
	                  left =  no_left ? right :
	                          op (left, right); no_left = false }); return left } // @hide
	
	    _.reduceReduce = function (_1, _2, _3) {                             var initial = _1, value = _2, op = _3
	                        if (arguments.length < 3) {                          initial = {}; value = _1; op = _2 }
	                        return _.hyperOperator (_.binary,
	                                                _.reduce2,
	                                                _.goDeeperAlwaysIfPossible) (initial,      value,      op) }
	 })
	
	
	/*  Abstract concat
	    ======================================================================== */
	
	_.withTest (['stdlib', 'concat2'], function () {
	
	    $assert (_.concat ([1,2], [3], [4,5]), [1,2,3,4,5])
	    $assert (_.concat ( { foo: 1 }, { bar: 2 }),  { foo: 1, bar: 2 })
	    $assert (_.concat ([{ foo: 1 }, { bar: 2 }]), { foo: 1, bar: 2 })
	    $assert (_.concat (1,2,3), 6)
	
	}, function () { 
	
	    _.concat = function (a, b) { var      first,          rest
	            if (arguments.length === 1) { first = a[0];   rest =  _.rest (a) }
	            else {                        first = a;      rest =  _.rest (arguments) }
	
	            return _.isArrayLike (first)
	                          ? first.concat.apply (first, rest)
	                          :          _.reduce2 (first, rest, function (              a,  b) {
	                                                                if (_.isObject (     a) &&
	                                                                    _.isObject (         b)) {
	                                                                return _.extend ({}, a,  b)  }
	                                                        else {  return               a + b   } }) } })
	
	/*  Zip 2.0
	    ======================================================================== */
	
	/*  Abstract zip that reduces any types of matrices.
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.deferTest (['stdlib', 'zip2'], function () {
	
	    $assert (_.zip2 ([  'f',
	                        'o',
	                        'o'], _.concat), 'foo')
	
	    $assert (_.zip2 ([  ['f', 'b'],
	                        ['o', 'a'],
	                        ['o', 'r']], _.concat), ['foo', 'bar'])
	
	    $assert (_.zip2 ([  { foo:'f', bar:'b' },
	                        { foo:'o', bar:'a' },
	                        { foo:'o', bar:'r' }], _.concat), { foo: 'foo', bar: 'bar' })
	
	    $assert (_.zip2 (   { foo:'f', bar:'b' },           // passing rows as arguments
	                        { foo:'o', bar:'a' },
	                        { foo:'o', bar:'r' },  _.concat), { foo: 'foo', bar: 'bar' })
	
	    $assert (_.zip2 (undefined, _.concat), undefined)   // degenerate cases
	    $assert (_.zip2 (5,         _.concat), 5)
	    $assert (_.zip2 ([],        _.concat), [])
	    $assert (_.zip2 (['foo'],   _.concat), 'foo')
	
	    $assert (_.zipObjectsWith ([
	                { name: 'string' },
	                { born: 123 }], _.array),
	            
	                { name: ['string',  undefined],
	                  born: [undefined, 123] })
	
	    $assert ([3], _.zipSetsWith ([
	                    new Set ([2,3]),
	                    new Set ([3,4])], function (a, b) { return a && b }).asArray)
	
	}, function () { _.mixin ({
	
	    zipSetsWith: function (sets, fn) {
	                    return _.reduce (_.rest (sets), function (memo, obj) {
	                        _.each (_.union (( obj && Array.from ( obj.values ())) || [],
	                                         (memo && Array.from (memo.values ())) || []), function (k) {
	
	                            var zipped = fn ((memo && memo.has (k)) ? k : undefined,
	                                              (obj &&  obj.has (k))  ? k : undefined)
	                            if (zipped === undefined) {
	                                memo.delete (k) }
	                            else {
	                                memo.add (zipped) } }); return memo }, new Set (sets[0])) },
	
	    zipObjectsWith: function (objects, fn) {
	        return _.reduce (_.rest (objects), function (memo, obj) {
	            _.each (_.union (_.keys (obj), _.keys (memo)), function (k) {
	                var zipped = fn (memo && memo[k], obj && obj[k])
	                if (zipped === undefined) {
	                    delete memo[k] }
	                else {
	                    memo[k] = zipped } }); return memo }, _.clone (objects[0])) },
	
	    zip2: function (rows_, fn_) {   var rows = arguments.length === 2 ? rows_ : _.initial (arguments)
	                                    var fn   = arguments.length === 2 ? fn_   : _.last (arguments)
	        if (!_.isArrayLike (rows) || rows.length === 0) {
	            return rows }
	        else {
	                 if (_.isArrayLike (rows[0]))      { return _.zipWith        (rows, fn) }
	            else if (rows[0] instanceof Set)       { return _.zipSetsWith    (rows, fn) }
	            else if (_.isStrictlyObject (rows[0])) { return _.zipObjectsWith (rows, fn) }
	                                              else { return _.reduce2        (rows, fn) } } } }) })
	
	
	/*  Hyperzip (deep one).
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.withTest (['stdlib', 'zipZip'], function () {
	
	    $assert (_.zipZip (
	            { phones: [{ number: 'number' }] },
	            { phones: [{ number: 333 }] }, _.array),
	            { phones: [{ number: ['number', 333] }] })
	
	    $assert (_.zipZip ([{   foo: 7,
	                            bar: ['foo', {
	                                bar: undefined } ] },
	                        
	                        {   foo: 'number',
	                            bar: ['string', {
	                                bar: 'undefined' } ] } ], _.array),
	
	                        {   foo: [7, 'number'],
	                            bar: [['foo', 'string'], {
	                                bar: [undefined, 'undefined'] } ] }) },
	function () {
	
	    _.mixin ({ zipZip: _.hyperOperator (_.binary, _.zip2) }) })
	
	
	/*  Most useful _.extend derivatives
	    ======================================================================== */
	
	_.withTest (['stdlib', 'extend 2.0'], function () {
	
	        /*  Inverted version of _.extend, for humanized narration where it makes sense (not here,
	            but see AOP impl for example of such one)
	         */
	        [(function () {
	
	            var input   = { foo:1,  bar:1 }
	            var plus    = { foo:42, qux:1 }
	            var gives   = { foo:42, qux:1, bar: 1 }
	
	            $assert (_.extendWith (plus, input), gives) }) (),
	
	        /*  Higher-order version of _.extend, allows to use it as _.map operator, which cuts
	            shit in typical arrays-of-objects crunching routines
	         */
	        (function () {
	            var input   = [{ bar:1 }, {}]
	            var plus    = _.extendsWith ({ foo:42 })
	            var gives   = [{ bar:1, foo:42 }, { foo:42 }]
	
	            $assert (_.map (input, _.arity1 (plus)), gives) }) (),
	
	        /*  NOW DEPRECATED, USE _.extendedDeep
	         */
	        (function () {
	            var input   = { foo:1,  bar: { qux:1 } }
	            var plus    = { foo:42, bar: { baz:1 } }
	            var gives   = { foo:42, bar: { baz:1, qux:1 }}
	
	            $assert (_.extend2 (input, plus), gives) }) (),
	
	        /*  Deep version of _.extend, allowing to extend arbitrary levels deep (referentially transparent, so _.extendedDeep instead of _.extendDeep)
	         */
	        (function () {
	
	            var input   = { foo:1,  bar: { qux:1 } }
	            var plus    = { foo:42, bar: { baz:1 } }
	            var gives   = { foo:42, bar: { baz:1, qux:1 }}
	
	            $assert (_.extendedDeep (input, plus), gives)
	
	            $assert (_.extendedDeep ({ foo: new Set ([7]) }, {}).foo instanceof Set)
	
	            $assert (Array.from (_.extendedDeep ({ foo: new Set ([1,2]) },
	                                                 { foo: new Set ([2,3]) }).foo.values ()), [1,2,3]) }) (),
	
	        /*  Referentially-transparent version (to be used in functional expressions)
	         */
	        (function () {
	            var x = { foo: 1 }
	
	            $assert (_.extended (x, { bar: 1 }), { foo: 1, bar: 1 })
	            $assert (            x,              { foo: 1 }) }) () ]  }, function () {
	
	    _.extend = $restArg (_.extend) // Mark as having rest argument (to make _.flip work on that shit)
	
	    _.extended = $restArg (function () { return _.extend.apply (this, [{}].concat (_.asArray (arguments))) }) // referentially-transparent version
	
	    _.extendWith = _.flip (_.extend)                                        
	    _.extendsWith = _.flip (_.partial (_.partial, _.flip (_.extend)))   // higher order shit
	
	    _.extendedDeep = _.tails3 (_.zipZip, function (a, b) { return b === undefined ? a : b })
	
	    _.extend2 = $restArg (function (what) { 
	                                return _.extend (what, _.reduceRight (arguments, function (right, left) {
	                                    return _.object (_.map (_.union (_.keys (left), _.keys (right)),
	                                                            function (key) {
	                                                                var lvalue = left[key]
	                                                                return [key, (key in right) ?
	                                                                                (typeof lvalue === 'object' ?
	                                                                                    _.extend (lvalue, right[key]) :
	                                                                                    right[key]) :
	                                                                                lvalue] }))}, {})) }) })
	
	/*  Find 2.0 + Hyperfind
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	_.withTest (['stdlib', 'findFind'], function () {
	
	    var obj = { x: 1, y: { z: 2 }}
	
	    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.constant (false)), false)
	    $assert (_.findFind ({ foo: 1, bar: [1,2,3]  }, _.equals (2)),       2)
	    $assert (_.findFind ({ foo: { bar: obj     } }, _.equals (obj)),     obj) },
	
	function () {
	
	    _.find2 = function (value, pred) {
	        if (_.isArrayLike (value)) {                                
	            for (var i = 0, n = value.length; i < n; i++) { var x = pred (value[i], i, value)
	                              if (typeof x !== 'boolean') { return x }
	                                     else if (x === true) { return value[i] } } }
	        else if (_.isStrictlyObject (value)) {        
	            for (var i = 0, ks = Object.keys (value), n = ks.length; i < n; i++) { var k = ks[i]; var x = pred (value[k], k, value)
	                                                     if (typeof x !== 'boolean') { return x }
	                                                            else if (x === true) { return value[k] } } } }
	
	    _.findFind = function (obj, pred_) {
	                    return _.hyperOperator (_.unary,
	                             function (value, pred) {
	                                    if (_.isArrayLike (value)) {                                
	                                        for (var i = 0, n = value.length; i < n; i++) { var x = pred (value[i])
	                                                          if (typeof x !== 'boolean') { return x }
	                                                                 else if (x === true) { return value[i] } } }
	
	                                    else if (_.isStrictlyObject (value)) {        
	                                        for (var i = 0, ks = Object.keys (value), n = ks.length; i < n; i++) { var k = ks[i]; var x = pred (value[k])
	                                                                                 if (typeof x !== 'boolean') { return x }
	                                                                                        else if (x === true) { return value[k] } } }
	
	                                                                                          var x = pred_ (value)
	                                                            if (typeof x !== 'boolean') { return x }
	                                                                   else if (x === true) { return value }
	                                                                                          return false }) (obj, pred_) } })
	
	
	/*  removes empty contents from any kinds of objects
	    ======================================================================== */
	
	_.withTest (['stdlib', 'nonempty'], function () {
	
	    var obj = { blank: {}, empty: [], one: 1, none: undefined, nil: null, clear: '', zero: 0, no: false }
	    var arr = [{}, [], 1, undefined, null, '', 0, false]
	
	    $assert (_.nonempty (obj), { one: 1, zero: 0, no: false })
	    $assert (_.nonempty (arr), [1, 0, false])
	
	    $assert (_.nonempty (null), undefined)
	    $assert (_.nonempty (''),   undefined)
	
	}, function () {
	
	    _.nonempty = function (obj) { return _.filter2 (obj, _.isNonempty) } })
	
	
	/*  deep cloning of objects (as _.clone is shallow)
	    ======================================================================== */
	
	_.deferTest (['stdlib', 'cloneDeep'], function () {
	
	    var Proto = $prototype ({})
	
	    var obj     = { a: [{ b: { c: 'd' } }], b: {}, c: new Proto ()  }
	    var copy    = _.cloneDeep (obj)
	
	    $assert (obj   !== copy)    // should be distinct references
	    $assert (obj.a !== copy.a)  //
	    $assert (obj.b !== copy.b)  //
	    $assert (obj.c === copy.c)  // should be same instance (should consider prototype instances as atomic value)
	
	    $assert (obj, copy)     // structure should not change
	
	    $assert (            _.cloneDeep ({ foo: new Set ()        }).foo instanceof Set)
	    $assert (Array.from (_.cloneDeep ({ foo: new Set ([1,2,3]) }).foo.values ()), [1,2,3])
	
	}, function () { _.extend (_, {
	
	    clone: function (x) {
	                return  (x instanceof Set) ? new Set (x) :
	                        (!_.isObject (x)   ? x :
	                        (_.isArray   (x)   ? x.slice () : _.extend ({}, x))) },
	
	    cloneDeep: _.tails2 (_.mapMap, function (value) {
	                                        return ( _.isStrictlyObject    (value) &&
	                                                !_.isPrototypeInstance (value)) ? _.clone (value) : value }) }) })
	
	
	/*  given objects A and B, _.diff subtracts A's structure from B,
	    and returns difference in terms of B
	    ======================================================================== */
	
	_.deferTest (['stdlib', 'diff'], function () {
	
	        $assert (_.diff ('foo', 'foo'), undefined)
	        $assert (_.diff ('foo', 'bar'), 'bar')
	
	        $assert (_.diff ({ a: 1, b: 2, c: 3 },
	                         { a: 1, b: 3,      d: 4 }),
	                         {       b: 3,      d: 4 })
	
	        $assert (_.diff ([1,2,3], [1,2,3]), undefined)
	
	        $assert (_.diff ([1,'foo',2], [1,2,3]), [2,3])
	
	}, function () {
	
	    _.hyperMatch = _.hyperOperator (_.binary, function (a, b, pred) {
	                                        return _.coerceToUndefined (_.nonempty (_.zip2 (a, b, pred))) })
	
	    _.diff = _.tails3 (_.hyperMatch, function (a, b) { 
	                                        return  ((($atom.unwrap (a) === $atom.unwrap (b)) || (a === $any) || (b === $any)) ? undefined : b) }) })
	
	
	/*  inverse of _.diff (returns similarities)
	    ======================================================================== */
	
	_.deferTest (['stdlib', 'undiff'], function () {
	
	        $assert (_.undiff ('foo', 'foo'), 'foo')
	        $assert (_.undiff ('foo', 'bar'), undefined)
	
	        $assert (_.undiff ({ a: 1, b: 2, c: 3 },
	                           { a: 1, b: 3,      d: 4 }),
	                           { a: 1 })
	
	        $assert (_.undiff ([1,2,3], [1,2,3]), [1,2,3])
	
	        $assert (_.undiff ([1,2], [1,3]), [1,undefined])
	        $assert (_.undiff ([1,2], [0,2]), [undefined,2])
	
	}, function () {
	
	    _.hyperMatch = _.hyperOperator (_.binary, function (a, b, pred) {
	                                        return _.coerceToUndefined (_.zip2 (a, b, pred)) })
	
	    _.undiff = _.tails3 (_.hyperMatch, function (a, b) {
	                                            return (($atom.unwrap (a) === $atom.unwrap (b)) || (a === $any) || (b === $any))  ? b : undefined }) })
	
	
	/*  Makes { foo: true, bar: true } from ['foo', 'bar']
	    ======================================================================== */
	
	_.withTest (['stdlib', 'index'], function () {
	    
	        $assert (_.index (['foo', 'bar']), { foo: true, bar: true }) }, function () { _.extend (_, {
	
	    index: function (list) {
	            var result = {}
	            for (var i = 0, n = list.length; i < n; i++) {
	                result[list[i]] = true }
	            return result } }) })
	
	
	/*  For string wrapping
	    ======================================================================== */
	
	_.withTest (['stdlib', 'quote'], function () {
	
	        $assert (_.quote      ('qux'),            'qux')
	        $assert (_.quote      ('qux', '[]'),     '[qux]')
	        $assert (_.quote      ('qux', '/'),      '/qux/')
	        $assert (_.quote      ('qux', '{  }'),   '{ qux }')
	        $assert (_.quote      ('qux', '</>'),    '</qux>')
	        $assert (_.quoteWith  ('[]', 'qux'), '[qux]') }, function () {
	
	    _.quote = function (s, pattern_) {
	                    var pattern = pattern_ || ''
	                    var splitAt = Math.floor (pattern.length / 2 + (pattern.length % 2))
	                    var before  = pattern.slice (0, splitAt)
	                    var after   = pattern.slice (splitAt) || before
	
	                    return before + s + after }
	
	
	    _.quoteWith  = _.flip2 (_.quote)
	    _.quotesWith = _.higherOrder (_.quoteWith) })
	
	
	/*  _.partition 2.0
	    ======================================================================== */
	
	_.withTest (['stdlib', 'partition2'], function () {
	
	        $assert (_.partition2 (
	                    [ 'a', 'b', 'c',   undefined, undefined,   42], _.isNonempty),
	                    [['a', 'b', 'c'], [undefined, undefined], [42]])
	
	        $assert (_.partition3 ([ 'a', 'b', 'c', undefined, undefined, 42], _.typeOf),
	                [{ label: 'string',    items: ['a', 'b', 'c'] },
	                 { label: 'undefined', items: [undefined, undefined] },
	                 { label: 'number',    items: [42] }]) }, function () {
	
	    _.partition2 = function (arr, pred) { return _.pluck (_.partition3 (arr, pred), 'items') }
	
	    _.partition3 = function (arr_, pred) {  var arr  = arr_ || []
	                                            var spans = [],
	                                                span  = { label: undefined, items: [arr.first] }
	
	            _.each (arr, function (x) { var label = pred (x)
	                if ((span.label != label) &&
	                     span.items.length) { spans.push (span = { label: label, items: [x] }) }
	                                   else { span.items.push (x) } })
	
	            return (span.length && spans.push (span)),
	                    spans } })
	
	
	/*  Taken from  npmjs.com/package/longest-common-substring
	    Props to    npmjs.com/~mirkok
	    ======================================================================== */
	
	
	_.withTest (['stdlib', 'longestCommonSubstring'], function () {
	
	    $assert ('foo', _.longestCommonSubstring ('foo', 'ffooa'))
	
	}, function () {
	    
	    var indexMap = function(list) {
	        var map = {}
	        _.each (list, function(each, i) {
	            map[each] = map[each] || []
	            map[each].push(i) })
	        return map }
	
	    _.longestCommonSubstring = function (a, b) {
	        var where = _.indexOfLongestCommonSubstring (a, b)
	        return (where.length) ? a.substr (where.a, where.length) : undefined }
	
	    _.indexOfLongestCommonSubstring = function(a, b) {
	        var result = { a:0, b:0, length:0}
	        var indexMapBefore = indexMap(a)
	        var previousOverlap = []
	        _.each (b, function(eachAfter, indexAfter) {
	            var overlapLength
	            var overlap = []
	            var indexesBefore = indexMapBefore[eachAfter] || []
	            _.each (indexesBefore, function(indexBefore) {
	                overlapLength = ((indexBefore && previousOverlap[indexBefore-1]) || 0) + 1;
	                if (overlapLength > result.length) {
	                    result.length = overlapLength;
	                    result.a = indexBefore - overlapLength + 1;
	                    result.b = indexAfter - overlapLength + 1; }
	                overlap[indexBefore] = overlapLength })
	            previousOverlap = overlap })
	        return result } })
	
	
	/*  experimental shit (subject to removal)
	    ======================================================================== */
	
	_.key = function (fn) {
	            return function (value, key) {
	                return fn (key) } }
	
	_.filterKeys = function (arr, predicate) {
	                    return _.filter (arr, function (v, k) { return predicate (k) }) }
	
	_.rejectKeys = function (arr, predicate) {
	                    return _.reject (arr, function (v, k) { return predicate (k) }) }
	
	_.pickKeys = function (obj, predicate) {
	                    return _.pick (obj, function (v, k) { return predicate (k) }) }
	
	_.omitKeys = function (obj, predicate) {
	                    return _.omit (obj, function (v, k) { return predicate (k) }) }
	
	


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*  Properties
	    ======================================================================== */
	
	_.withTest ('properties', function () { var obj = {}
	
	    _.defineProperty (obj, 'fourtyTwo',         42)
	    _.defineProperty (obj, 'fourtyTwo_too',     function ()  { return 42 })
	    _.defineProperty (obj, 'fourtyTwo_orDie',   function (x) { $assert (x == 42); return 42 })
	    _.defineProperty (obj, 'fourtyTwo_eitherWay', {
	        configurable: true,
	        get: function () { return 42 },
	        set: function (x) { $assert (x == 42) } })
	
	    $assert (42,
	        obj.fourtyTwo,
	        obj.fourtyTwo_too,
	        obj.fourtyTwo_orDie (42),
	        obj.fourtyTwo_eitherWay = 42)
	
	    delete obj.fourtyTwo_eitherWay                              // can be deleted if configurable:true
	    $assert (obj.fourtyTwo_eitherWay === undefined)
	
	    delete obj.fourtyTwo                                        // cannot be deleted (as default behavior)
	    $assert (obj.fourtyTwo === 42)
	
	    _.defineHiddenProperty (obj, 'hiddenAndDangerous', 42)      // shortut for enumerable:false
	    $assert (_.keys (obj).indexOf ('hiddenAndDangerous') < 0)
	
	    $assertEveryCalledOnce (function (mkay) {                   // memoized property
	        _.defineMemoizedProperty (obj, '_42', function () {
	                                                    mkay (); return 42 }) 
	        $assert (                           
	            obj._42,                                
	            obj._42,
	            obj._42, 42) }) }, function () { _.extend (_, {
	
	    defineProperty: function (targetObject, name, def, defaultCfg) {
	        if (_.isObject (targetObject) && targetObject.hasOwnProperty (name)) {
	            throw new Error ('_.defineProperty: targetObject already has property ' + name) }
	        else {
	            Object.defineProperty (targetObject, name,
	                _.extend ({ enumerable: true }, defaultCfg, _.coerceToPropertyDefinition (def, name))) } },
	
	    defineHiddenProperty: function (targetObject, name, def, defaultCfg) {
	        return _.defineProperty (targetObject, name, def, _.extend ({ enumerable: false }, defaultCfg)) },
	
	    defineMemoizedProperty: function (targetObject, name, def_, defaultCfg) {
	        var def = _.coerceToPropertyDefinition (def_, name)
	        return _.defineProperty (targetObject, name,
	                    _.extend ({}, def, {
	                        get: _.memoizeToThis ('_' + name, def.get) }), defaultCfg) },
	
	    defineProperties: function (targetObject, properties) {
	        _.each (properties, _.defineProperty.partial (targetObject).flip2) },
	
	    memoizedState: function (obj) {
	                        return _.filter2 (obj, function (v, k) { return (k[0] === '_') && !_.isFunction (v) }) },
	
	    memoizeToThis: function (name, fn) {
	        return function () {
	            var memo = this[name]
	            return (memo !== undefined) ? memo : (this[name] = fn.call (this)) } },
	
	    coerceToPropertyDefinition: function (value_, /* optional */ name) {
	        var value = value_ || {}
	        var actualValue = (typeof Tags === 'undefined') ? value_ : Tags.unwrap (value_)
	
	                // property definition case (short circuit then)
	        return  (!value.$constant && !value.$get && _.isPropertyDefinition (actualValue) && actualValue) ||
	
	                // get-accessor-alone case
	                ((value.$get || (!value.$constant && _.isFunction (actualValue) && _.noArgs (actualValue))) &&
	                    {   get: actualValue,
	                        set: _.throwsError ('cannot change ' + (name || 'property') + ' (as it\'s an accessor function)') }) ||
	
	                // constant value case
	                (!value.$get && {   get: _.constant (actualValue),
	                                    set: _.throwsError ('cannot change ' + (name || 'property') + ' (as it\'s sealed to ' + actualValue + ')') }) ||
	
	                // any other case (erroneous)
	                _.throwsError ('coerceToPropertyDefinition: crazy input, unable to match') () },
	
	    isPropertyDefinition: function (obj) {
	        return _.isObject (obj) && (_.isFunction (obj.get) || _.isFunction (obj.set)) },
	
	    ownProperties: function (obj) {
	        return (obj && _.pickKeys (obj, obj.hasOwnProperty.bind (obj))) || {} }  }) })
	


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	const O = Object
	
	/*  For checking whether the module is available
	    ======================================================================== */
	
	_.hasTags = true
	
	
	/*  Unit test / spec
	    ======================================================================== */
	
	_.withTest ('meta-tags', function () {
	
	/*  This is how you define tags     */
	
	    Tags.define ('foo')
	    Tags.define ('bar')
	    Tags.define ('qux')
	
	    $assert (Tags.isDefined ('foo'))
	    $assert ($foo instanceof Function)
	
	/*  Tags produce objects containing them as boolean flags. You can tag anything.
	    Order doesn't matter, redundancy is legal.   */
	
	    $assert ($foo (42).$foo,    true)
	    $assert ($bar (null).$bar,  true)
	    $assert ($foo (42).$bar,    undefined)
	    $assert ($foo ($bar (42)),  $bar ($foo ($foo (42))))
	
	/*  Safe way to check for a tag presence is $tag.is method:     */
	
	    $assert ($foo.is ($foo (42)), true)
	    $assert ($foo.is ($bar (42)), false)
	    $assert ($foo.is (42),        false)
	
	/*  Example of complex object containing tagged fields.     */
	
	    var test = {
	        fourtyOne: $bar ($foo (41)),
	        fourtyTwo: $foo ($bar (42)),
	        notTagged: 40 }
	
	/*  This is how you coerce what-might-be-tagged to actual values:   */
	
	    $assert ($untag (42), Tags.unwrap (42), Tags.unwrap (test.fourtyTwo), 42)
	    $assert (Tags.unwrapAll (test), { fourtyTwo: 42, fourtyOne: 41, notTagged: 40 })
	
	/*  Tags have .matches property, which is a predicate to test objects for those tags.   */
	
	    $assert ($foo.matches ($foo ()))
	    $assert ($foo.matches (test.fourtyOne))
	    $assert ($foo.matches (42) === false)
	
	/*  These predicates could be combined to produce complex test (a generic feature of Function provided by common.js)    */
	
	    $assert ({ fourtyOne: 41, fourtyTwo: 42 },  Tags.unwrapAll (_.pick (test, _.and ($foo.matches, $bar.matches))))
	    $assert ({ notTagged: 40 },                 Tags.unwrapAll (_.omit (test, $foo.matches)))
	
	/*  You can replace value that might be tagged, i.e. $foo($bar(x)) → $foo($bar(y))  */
	
	    $assert (43,                Tags.modify (42,         function (subject) { return subject + 1 })) // not tagged
	    $assert ($foo (43),         Tags.modify ($foo (42),  _.constant (43)))
	    $assert ($foo ($bar (43)),  Tags.modify ($foo (42),  function (subject) { return $bar (subject + 1) }))
	
	/*  Low-level way of tags addition, for run-time shit.  */
	
	    $assert (Tags.add ('qux', 42).$qux)
	    $assert (Tags.add ('qux', test.fourtyTwo).$qux)
	
	/*  Wrapping nothing is now legal   */
	
	    $assert (Tags.hasSubject ($foo ()),   false)
	    $assert (Tags.hasSubject ($foo (42)), true)
	
	/*  Map over tagged values:     */
	
	    $assert (     $qux ([8, 9, $foo ($bar (10))]),
	        Tags.map ($qux ([1, 2, $foo ($bar (3))]), _.sums (7)))
	
	/*  Enumerating tags with Tags.each (obj, iter)     */
	
	    $assertMatches (['foo', 'bar', 'qux'], _.arr (function (iter) { Tags.each (test.fourtyTwo, iter) }))
	
	/*  Tagging with non-boolean data   */
	
	    $assert ($foo ({ some: 'params' }, 42).$foo, { some: 'params' })
	
	/*  'Extend' algebra    */
	
	    $assert (Tags.extend ($foo (7), $bar (8)), $foo ($bar (7)))
	    $assert (Tags.extend ($foo (7),       8),  $foo (      7))
	    $assert (Tags.extend (      7,  $foo (8)), $foo (      7))
	    $assert (Tags.extend (      7,        8),              7)
	
	/*  Tags.omit   */
	
	    $assert (Tags.omit (            7,   '$foo'),          7)
	    $assert (Tags.omit ($foo ($bar (7)), '$foo',  '$bar'), 7)
	    $assert (Tags.omit ($foo ($bar (7)), '$foo'),  $bar (  7))
	
	/*  String.ify  */
	
	    if (String.ify) {
	
	        $assert (String.ify ({ foo: $constant ($get ({ bar: 7 }, 1)) }),
	                            '{ foo: $constant ($get ({ bar: 7 }, 1)) }')
	        
	        $assert (String.ify.configure ({ pretty: true })
	                            ({ foo: $constant ($get ([ 7,
	                                                       8  ])) }),
	                            '{ foo: $constant ($get ([ 7,\n'
	                          + '                          8  ])) }')
	    }
	
	/*  Cleanup test stuff  */
	
	    ;['$foo', '$bar', '$qux', '$plusOne'].forEach (function (x) { delete $global[x] })
	        
	
	/*  IMPLEMENTATION
	    ======================================================================== */
	
	}, function () {
	
	/*  Tags object
	    ======================================================================== */
	
	    $global.Tags = function (subject, keys) { if (subject !== undefined) { this.subject = subject }
	                                              if (keys    !== undefined) { _.extend (this, keys) } }
	
	    Tags.$definition = {} // to make it recognizeable by ES3000
	
	
	/*  Instance methods (internal API)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	    
	    O.assign (Tags.prototype, {
	
	        add: function (name, additionalData) {
	                    return this['$' + name] = additionalData || true, this },
	
	        clone: function (newSubject) {
	                    return O.assign (new Tags (newSubject || this.subject), Tags.get (this)) },
	
	        modify: function (changesFn) {
	                            this.subject = changesFn (this.subject)
	                            if (this.subject instanceof Tags) {
	                                return O.assign (this.subject, Tags.get (this)) }
	                            else {
	                                return this }},
	
	        extend: function (other) {
	                    return (other instanceof Tags) ? O.assign (this, Tags.get (other)) : this } })
	
	
	/*  Static methods (public API)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    O.assign (Tags, {
	
	        omit: $restArg (function (what, ___) {
	
	            if (what instanceof Tags) {                   var keysToOmit = _.index (_.rest (arguments))
	                                                          var keysLeft   = _.pick (what, function (v, k) { return (k[0] === '$') && !(k in keysToOmit) })
	                        return (!_.isEmptyObject (            keysLeft)
	                                    ? new Tags (what.subject, keysLeft)
	                                    :           what.subject) }
	            else {
	                return what } }),
	  
	        clone: function (what, newSubject) {
	                    return (what instanceof Tags) ? what.clone (newSubject) : (newSubject || what) },
	
	        extend: function (what, other) { return (what instanceof Tags)  ? what.clone ().extend (other) : (
	                                                (other instanceof Tags) ? Tags.wrap (what).extend (other) : what) },
	
	        get: function (def) {
	                    return ((def instanceof Tags) ? _.pick (def, function (v, k) { return k[0] === '$' }) : {}) },
	
	        each: function (def, accept) {
	                    if (def instanceof Tags) { _.each (def, function (v, k) { if (k[0] === '$') { accept (k.slice (1)) } }) } },
	
	        hasSubject: function (def) {
	                        return ((def instanceof Tags) && ('subject' in def)) },
	
	        matches: function (name) {
	                    return function (obj) { return obj && (obj['$' + name] !== undefined) } },
	
	        unwrapAll: function (definition) {
	                        return _.map2 (definition, Tags.unwrap) },
	
	        unwrap: function (what) {
	                    return (what instanceof Tags) ? what.subject : what },
	
	        wrap: function (what) {
	                    return (what instanceof Tags) ? what : ((arguments.length === 0) ? new Tags () : new Tags (what)) },
	
	        modify: function (what, changesFn) {
	                            return (what instanceof Tags) ?
	                                        what.clone ().modify (changesFn) : changesFn (what) }, // short circuits if not wrapped
	
	        map: function (obj, op) { return Tags.modify (obj,
	                                                function (obj) {
	                                                    return _.map2 (obj, function (t, k) {
	                                                        return Tags.modify (t, function (v) {
	                                                            return op (v, k, (t instanceof Tags) ? t : undefined) }) }) }) },
	
	        add: function (name, toWhat, additionalData) {
	                return Tags.wrap.apply (null, _.rest (arguments, 1)).add (name, additionalData) },
	
	        all: new Set (),
	
	        isDefined: function (k) {
	                        return Tags.all.has (k) },
	
	        define: function (k, fn) { // fn for additional processing of constructed function
	
	                    Tags.all.add (k)
	
	                    fn = (_.isFunction (fn) && fn) || _.identity
	
	                    var $k = '$' + k
	
	                    $global[$k] = fn (function (a, b) {
	                                        if (arguments.length < 2) { return Tags.add (k, a) }       // $tag (value)
	                                                             else { return Tags.add (k, b, a) } }) // $tag (params, value)
	                    
	                    return O.assign ($global[$k], {
	                               matches: Tags.matches (k),
	                                    is: function (x) { return  ((x instanceof Tags) && ($k in x)) || false },
	                                 isNot: function (x) { return !((x instanceof Tags) && ($k in x)) || false },
	                                unwrap: function (x) { return  ($atom.matches (x) === true) ? Tags.unwrap (x) : x } }) },
	    })
	
	/*  $untag
	    ======================================================================== */
	
	    $global.$untag = Tags.unwrap
	
	
	/*  TODO: move out of this file
	    ======================================================================== */
	
	    ;['constant', 'get', 'once', 'async', 'atom'].forEach (Tags.define);
	
	})
	
	/*  Formatting shit
	    ======================================================================== */
	
	    if (typeof Symbol !== 'undefined') {
	
	        var bullet = __webpack_require__ (13)
	
	        Tags.prototype[Symbol.for ('String.ify')] = function (stringify) {
	
	            if (stringify.json) {
	                return stringify ($untag (this)) }
	
	            var tags = Tags.get (this)
	            var left = _.reduce (tags, function (memo, value, tag) {
	                                            return _.isBoolean (value)
	                                                ? (tag + ' (' + memo)
	                                                : (tag + ' (' + stringify.configure ({ pretty: false }) (value) + ', ' + memo) }, '')
	
	            return bullet (left, stringify ($untag (this))) + ')'.repeats (_.keys (tags).length)
	        }
	    }
	
	


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function (bullet, arg) {
	
	                    var isArray = Array.isArray (arg)
	                    
	                    var lines = isArray ? arg : arg.split ('\n')
	                    
	                    var indent = bullet.replace (/[^\s]/g, ' ') // replace non-whitespace with whitespace
	                        lines = lines.map (function (line, i) { return (i === 0) ? (bullet + line) : (indent + line) })
	                    
	                    return isArray ? lines : lines.join ('\n') }

/***/ },
/* 14 */
/***/ function(module, exports) {

	_.hasTypeMatch = true
	
	/*  Type matching for arbitrary complex structures (TODO: test)
	    ======================================================================== */
	
	Tags.define ('required')
	Tags.define ('atom')
	
	$global.const ('$any', _.identity)
	
	_.deferTest (['type', 'type matching'], function () {
	
	    $assert (_.omitTypeMismatches ( { '*': $any, foo: $required ('number'), bar: $required ('number') },
	                                    { baz: 'x', foo: 42, bar: 'foo' }),
	                                    { })
	
	    $assert (_.omitTypeMismatches ( { foo: { '*': $any } },
	                                    { foo: { bar: 42, baz: 'qux' } }),
	                                    { foo: { bar: 42, baz: 'qux' } })
	
	    $assert (_.omitTypeMismatches ( { foo: { bar: $required(42), '*': $any } },
	                                    { foo: { bar: 'foo', baz: 'qux' } }),
	                                    { })
	
	    $assert (_.omitTypeMismatches ( [{ foo: $required ('number'), bar: 'number' }],
	                                    [{ foo: 42,                   bar: 42 },
	                                     { foo: 24,                           },
	                                     {                            bar: 42 }]), [{ foo: 42, bar: 42 }, { foo: 24 }])
	
	    $assert (_.omitTypeMismatches ({ '*': 'number' }, { foo: 42, bar: 42 }), { foo: 42, bar: 42 })
	
	    $assert (_.omitTypeMismatches ({ foo: $any }, { foo: 0 }), { foo: 0 }) // there was a bug (any zero value was omitted)
	
	    $assert (_.decideType ([]), [])
	    $assert (_.decideType (42),         'number')
	    $assert (_.decideType (_.identity), 'function')
	    $assert (_.decideType ([{ foo: 1 }, { foo: 2 }]), [{ foo: 'number' }])
	    $assert (_.decideType ([{ foo: 1 }, { bar: 2 }]), [])
	
	    $assert (_.decideType ( { foo: { bar: 1        }, foo: { baz: [] } }),
	                            { foo: { bar: 'number' }, foo: { baz: [] } })
	
	    $assert (_.decideType ( { foo: { bar: 1        }, foo: { bar: 2 } }),
	                            { foo: { bar: 'number' } })
	
	    $assert (_.decideType ( { foo:         { bar: 1        },
	                              bar:         { bar: 2        } }),
	                            { '*':         { bar: 'number' } })
	
	    if (_.hasOOP) {
	        var Type = $prototype ()
	        $assert (_.decideType ({ x: new Type () }), { x: Type }) }
	
	}, function () {
	
	    _.isMeta = function (x) { return (x === $any) || ($atom.is (x) === true) || ($required.is (x) === true)  }
	
	    var zip = function (type, value, pred) {
	        var required    = Tags.unwrapAll (_.filter2 (type, $required.matches))
	        var match       = _.nonempty (_.zip2 (Tags.unwrapAll (type), value, pred))
	
	        if (_.isEmpty (required)) {
	                return match }
	        
	        else {  var requiredMatch = _.nonempty (_.zip2 (required, value, pred))
	                var allSatisfied  = _.values2 (required).length === _.values2 (requiredMatch).length
	                return allSatisfied ?
	                            match : _.coerceToEmpty (value) } }
	
	    var hyperMatch = _.hyperOperator (_.binary,
	        function (type_, value, pred) { var type = Tags.unwrap (type_)
	
	            if (_.isArray (type)) { // matches [ItemType] → [item, item, ..., N]
	                if (_.isArray (value)) {
	                    return zip (_.times (value.length, _.constant (type[0])), value, pred) }
	                else {
	                    return undefined } }
	
	            else if (_.isStrictlyObject (type) && type['*']) { // matches { *: .. } → { a: .., b: .., c: .. }
	                if (_.isStrictlyObject (value)) {
	                    return zip (_.extend (  _.map2 (value, _.constant (type['*'])),
	                                            _.omit (type, '*')), value, pred) }
	                else {
	                    return undefined } }
	
	            else {
	                return zip (type_, value, pred) } })
	
	 var typeMatchesValue = function (c, v) { var contract = Tags.unwrap (c)
	                                return  (contract === $any) ||
	                                        ((contract === undefined) && (v === undefined)) ||
	                                        (_.isFunction (contract) && (
	                                            _.isPrototypeConstructor (contract) ?
	                                                _.isTypeOf (contract, v) :   // constructor type
	                                                (contract (v) === true))) || // test predicate
	                                        (typeof v === contract) ||           // plain JS type
	                                        (v === contract) }                   // constant match
	
	    _.mismatches = function (op, contract, value) {
	                            return hyperMatch (contract, value,
	                                        function (contract, v) {
	                                            return op (contract, v) ? undefined : contract }) }
	
	    _.omitMismatches = function (op, contract, value) {
	                            return hyperMatch (contract, value,
	                                        function (contract, v) {
	                                            return op (contract, v) ? v : undefined }) }
	
	    _.typeMismatches     = _.partial (_.mismatches,     typeMatchesValue)
	    _.omitTypeMismatches = _.partial (_.omitMismatches, typeMatchesValue)
	
	    _.valueMismatches = _.partial (_.mismatches, function (a, b) { return (a === $any) || (b === $any) || (a === b) })
	
	    var unifyType = function (value) {
	        if (_.isArray (value)) {
	            return _.nonempty ([_.reduce (_.rest (value), function (a, b) { return _.undiff (a, b) }, _.first (value) || undefined)]) }
	        
	        else if (_.isStrictlyObject (value)) {
	            var pairs = _.pairs (value)
	            var unite = _.map ( _.reduce (_.rest (pairs), function (a, b) { return _.undiff (a, b) }, _.first (pairs) || [undefined, undefined]),
	                                _.nonempty)
	
	            return (_.isEmpty (unite) || _.isEmpty (unite[1])) ? value : _.object ([[unite[0] || '*', unite[1]]]) }
	        
	        else {
	            return value } }
	
	    _.decideType = function (value) {
	        var operator = _.hyperOperator (_.unary,
	                            function (value, pred) {
	                                if (value && value.constructor && value.constructor.$definition) {
	                                    return value.constructor }
	                                return unifyType (_.map2 (value, pred)) })
	
	        return operator (value, function (value) {
	            if (_.isPrototypeInstance (value)) {
	                return value.constructor }
	            else {
	                return _.isEmptyArray (value) ? value : (typeof value) } }) } }) // TODO: fix hyperOperator to remove additional check for []
	


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*  CPS primitives module
	    ======================================================================== */
	
	_.cps = function () {
	    return _.cps.sequence.apply (null, arguments) }
	
	
	/*  apply
	    ======================================================================== */
	
	_.withTest (['cps', 'apply'], function () {
	
	    // TODO
	
	}, function () {
	
	    _.cps.apply = function (fn, this_, args_, then) { var args = _.asArray (args_)
	
	        var lastArgN = _.numArgs (fn) - 1
	        var thenArg = args[lastArgN]
	
	        args[lastArgN] = function () {
	            then.call (this, arguments, thenArg) }
	
	        return fn.apply (this_, args) } })
	
	
	/*  each
	    ======================================================================== */
	
	_.withTest (['cps', 'each'], function () {
	
	    /*  Example array
	     */
	    var data = ['foo', 'bar', 'baz']
	    var currentIndex = 0
	
	    _.cps.each (data,
	
	        /*  called for each item, in linear order
	         */
	        function (item, itemIndex, then, complete, arrayWeTraverse) {
	            $assert (item === data[itemIndex])
	            $assert (itemIndex === currentIndex++)
	            $assert (arrayWeTraverse === data)
	
	            $assert (_.isFunction (then))
	            $assert (_.isFunction (complete))
	
	            then () },
	
	        /*  called when all items enumerated
	         */
	        function () {
	            $assert (currentIndex === data.length) })
	
	    /*  You can omit 'index' argument for iterator function
	     */
	    var data2 = []
	    _.cps.each (data,
	        function (item, then) { data2.push (item); then () },
	        function () { $assert (data, data2) })
	
	    /*  You can stop iteration by calling fourth argument
	     */
	    var data3 = []
	    _.cps.each (data,
	        function (item, i, then, break_) { data3.push (item); break_ () },
	        function () { $assert (data3, ['foo']) })
	
	    /*  Iterating over dictionary is legal
	     */
	    $assertEveryCalled (function (items__3, final__1) {
	        var data2 = { 'foo': 1, 'bar': 2, 'baz': 3 }
	        _.cps.each (
	            data2,
	            function (item, name, then) { $assert (item === data2[name]); items__3 (); then () },
	            function () { final__1 () }) })
	
	    /*  Iterating over scalar is legal
	     */
	    $assertEveryCalled (function (items__1, final__1) {
	        _.cps.each (
	            'foo',
	            function (item, name, then) { $assert ([item, name], ['foo', undefined]); items__1 (); then () },
	            function () { final__1 () }) })
	
	    /*  Undefined/null are treated as empty (not scalars)
	     */
	    $assertEveryCalled (function (final__1) {
	        _.cps.each (
	            undefined,
	            function () { $fail },
	            function () { final__1 () }) }) },
	
	function () { _.extend (_.cps, {
	
	    each: function (obj, elem_, complete_, index_, length_, keys_) {
	
	                var complete = complete_ || _.noop
	                var elem     = function (x, k, next) {
	                                    if (_.numArgs (elem_) === 2) { elem_ (x,    next, complete, obj) }
	                                                            else { elem_ (x, k, next, complete, obj) } }
	
	                if (_.isEmpty (obj)) {
	                    complete () }
	
	                else if (_.isScalar (obj)) {
	                    elem (obj, undefined, complete) }
	
	                else {
	
	                    var index   = index_ || 0
	                    var keys    = index === 0 ? (obj.length === undefined ? _.keys(obj) : undefined) : keys_
	                    var length  = index === 0 ? (keys ? keys.length : obj.length) : length_
	
	                    if (index >= (length || 0)) {
	                        complete () }
	
	                    else {
	                        var key = keys ? keys[index] : index
	
	                        elem (obj[key], key, arguments.callee.bind (this, obj, elem_, complete_, index + 1, length, keys)) } } } })} )
	
	
	/*  map
	    ======================================================================== */
	
	_.withTest (['cps', 'map'], function () {
	
	    /*  2-argument iterator semantics
	     */
	    _.cps.map ([7,6,5],
	        function (x, then)    { then (x + 1) },
	        function (result)     { $assert (result, [8,7,6]) })
	
	    /*  3-argument iterator semantics
	     */
	    _.cps.map ([7,6,5],
	        function (x, i, then) { then (x + 1) },
	        function (result)     { $assert (result, [8,7,6]) }) },
	
	function () { _.extend (_.cps, {
	
	    map: function (obj, iter, complete) { var result = _.isArray (obj) ? [] : {}
	            _.cps.each (obj, (_.numArgs (iter) == 2)
	                                    ? function (x, i, next) { iter (x,    function (y) { result[i] = y; next () }) }
	                                    : function (x, i, next) { iter (x, i, function (y) { result[i] = y; next () }) },
	                function () { complete (result) }) } }) })
	
	/*  find
	    ======================================================================== */
	
	_.withTest (['cps', 'find'], function () {
	
	    /*  Basic use
	     */
	    _.cps.find ([7,6,5],
	        function (x, then) { then ((x % 3) === 0) },
	        function (x, key)  { $assert ([x, key], [6, 1]) })
	
	    /*  Over dictionary
	     */
	    _.cps.find ({ foo: 7, bar: 6, baz: 5 },
	        function (x, key, then) { then (key === 'baz') },
	        function (x, key)       { $assert ([x, key], [5, 'baz']) })
	
	    /*  Returning non-boolean
	     */
	    _.cps.find ([7,6,5],
	        function (x, then) { then (((x % 3) === 0) ? 'yeah' : false) },
	        function (x, key)  { $assert ([x, key], ['yeah', 1]) })
	
	    /*  Not found
	     */
	    _.cps.find ([7,6,5],
	        function (x, key, then) { then (false) },
	        function (x)            { $assert (x, undefined) }) },
	
	function () { _.extend (_.cps, {
	
	    find: function (obj, pred, complete) { var passKey = (_.numArgs (pred) !== 2)
	
	        _.cps.each (obj, function (x, key, next, complete) { var take = function (match) {
	                                                                            if (match === false) { next () }
	                                                                            else                 { complete (match === true ? x : match, key) } }
	                            if (passKey) { pred (x, key, take) }
	                            else         { pred (x,      take) } }, complete) } }) })
	
	/*  memoize
	    ======================================================================== */
	
	_.withTest (['cps', 'memoize'], function () {
	
	    $assertEveryCalledOnce (function (noMoreThanOne) {
	        var plusOne = _.cps.memoize (function (x, then) { noMoreThanOne (); then (x + 1) })
	
	        plusOne (2, function (x) { $assert (x === 3) })
	        plusOne (2, function (x) { $assert (x === 3) }) }) },
	
	function () { _.extend (_.cps, {
	
	    memoize: function (fn) {
	        return _.barrier ? _.cps._betterMemoize (fn) : _.cps._poorMemoize (fn) }, 
	
	    /*  This simplified version is used to bootstrap Useless.js code base (where _.barrier not available)
	     */
	    _poorMemoize: function (fn) { var cache = {}
	        return function (value, then) {
	            if (value in cache) {                   //  there's a flaw: cache updates after fetch completes, so while fetch is running,
	                then (cache[value]) }               //  any subsequent call (until cache is ready) will trigger fetch (as it doesnt know that result is already fetching)
	            else {
	                fn.call (this, value, function (result) {
	                    then (cache[value] = result) }) } } },
	
	    /*  UPD: added support for 0-arity semantics
	     */
	    _betterMemoize: function (fn) { var cache = {}  // barrier-enabled impl, eliminates redundant fetches
	                                                    // in this version, any subsequent calls join at barrier (which opens when result is fetched)
	        switch (_.numArgs (fn)) {
	            case 1:
	                return function (then) {             
	                    if (!cache.already) {
	                        fn.call (this, (cache = _.barrier ())) }
	                    cache (then) }
	            case 2:
	                cache = {}
	                return function (value, then) {    
	                    if (!(value in cache)) {
	                        fn.call (this, value, (cache[value] = _.barrier ())) }
	                    cache[value] (then) }
	            default:
	                throw new Error ('_.cps.memoize: unsupported number of arguments') } } }) })
	
	
	/*  reduce
	    ======================================================================== */
	
	_.withTest (['cps', 'reduce'], function () { $assertEveryCalled (function (mkay__2) {
	
	    var input   = [1,2,3]
	    var sums    = function (a, b, then) { then (a + b) }
	    var check   = function (result) { $assert (result === 6); mkay__2 () }
	
	    _.cps.reduce (input, sums, check)
	    _.cps.reduce ([], sums, check, 6)
	
	})}, function () {
	
	    var reduce = function (array, op, then, memo, index) {  // internal impl
	        if (!array || (index >= (array.length || 0))) {
	            then (memo) }
	        else {
	            op (memo, array[index], function (result) { reduce (array, op, then, result, index + 1) }) } }
	
	    _.cps.reduce = function (array, op, then, memo) {       // public API
	        if (arguments.length < 4) {
	            reduce (array, op, then, array[0], 1) }
	        else {
	            reduce (array, op, then, memo, 0) } } } )
	
	
	/*  noop / identity / constant
	    ======================================================================== */
	
	_.withTest (['cps', 'noop, identity, constant'], function () { $assertEveryCalled (function (noop, identity, const1, const2) {
	
	    /*  Port of underscore's _.noop to CPS terms
	     */
	    _.cps.noop (1,2,3, function () { $assert (arguments.length === 0); noop () })
	
	    /*  Port of underscore's _.identity to CPS terms
	     */
	    _.cps.identity (1,2,3, function () { $assert ([1,2,3], _.asArray (arguments)); identity () })
	
	    /*  Port of underscore's _.constant to CPS terms
	     */
	    _.cps.constant (3)    (function (_3)     { $assert (_3 === 3); const1 () })
	    _.cps.constant (1, 2) (function (_1, _2) { $assert (_1 === 1); $assert (_2 === 2); const2 () })
	
	})}, function () { _.extend (_.cps, {
	
	    noop: $restArg (function () {
	        return _.last (arguments).call (this) }),
	
	    identity: $restArg (function () {
	        var args = _.initial (arguments),
	            then = _.last (arguments)
	        if (then) {
	            return then.apply (this, args) } }),
	
	    constant: $restArg (function () { var args = arguments
	                    return function () {
	                        return _.last (arguments).apply (this, args) } }) })} )
	
	
	/*  arity
	    ======================================================================== */
	
	_.deferTest (['cps', 'arity / resultArity'], function () {
	
	    var returnMyArgs = _.cps.identity
	
	    var put123 = function (fn) {
	        return _.partial (fn, 1,2,3) }
	
	    $assertCPS (put123 (              returnMyArgs),  [1,2,3])
	    $assertCPS (put123 (_.cps.arity2 (returnMyArgs)), [1,2])
	    $assertCPS (put123 (_.cps.arity1 (returnMyArgs)), [1])
	    $assertCPS (put123 (_.cps.arity0 (returnMyArgs)))
	
	    var return123 = function (then) {
	        then (1,2,3) }
	
	    $assertCPS (                    return123,  [1,2,3])
	    $assertCPS (_.cps.resultArity2 (return123), [1,2])
	    $assertCPS (_.cps.resultArity1 (return123), [1])
	    $assertCPS (_.cps.resultArity0 (return123))
	
	}, function () {
	
	    _.cps.arity0 = function (fn) {
	                        return function () {
	                            fn.call (this, _.last (arguments)) } }
	
	    _.cps.arity1 = function (fn) {
	                        return function () {
	                            fn.call (this, arguments[0], _.last (arguments)) } }
	
	    _.cps.arity2 = function (fn) {
	                        return function () {
	                            fn.call (this, arguments[0], arguments[1], _.last (arguments)) } }
	
	    _.cps.transformResult = function (operator, fn) {
	                                return function (args) {
	                                    fn.apply (this, _.initial (arguments).concat (operator (_.last (arguments)))) } }
	
	    _.cps.resultArity2 = _.partial (_.cps.transformResult, _.arity2)
	    _.cps.resultArity1 = _.partial (_.cps.transformResult, _.arity1)
	    _.cps.resultArity0 = _.partial (_.cps.transformResult, _.arity0) })
	
	
	/*  sequence / compose
	    ======================================================================== */
	
	_.withTest (['cps', 'sequence / compose'], function () { $assertEveryCalled (function (mkay__4) {
	
	    /*  Basic example of asynchronous functions sequencing
	     */
	    var makeCookies = function (whatCookies, then)  { then ('cookies ' + whatCookies) }
	    var eatCookies  = function (cookies, then)      { then ('nice ' + cookies) }
	    var check       = function (result)             { $assert (result, 'nice cookies from shit'); mkay__4 () }
	
	    _.cps.sequence (makeCookies, eatCookies, check)   ('from shit')     // supports both ways (either argument list...
	    _.cps.sequence ([makeCookies, eatCookies, check]) ('from shit')     // ..or array
	
	    _.cps (makeCookies, eatCookies, check) ('from shit') // shorthand macro
	
	    /*  A port of underscore's _.compose (simply flipped _.sequence)
	     */
	    _.cps.compose (check, eatCookies, makeCookies) ('from shit')
	
	})}, function () {
	
	    _.cps.sequence = $restArg (
	                        function (arr) { var functions = (_.isArray (arr) && arr) || _.asArray (arguments)
	                            return _.reduceRight (functions, function (a, b) {
	                                return function () {
	                                    return b.apply (this, _.asArray (arguments).concat (a)) }}, _.cps.identity) })
	
	    _.cps.compose = $restArg (
	                        function (arr) { var functions = (_.isArray (arr) && arr) || _.asArray (arguments)
	                            return _.cps.sequence (functions.slice ().reverse ()) }) })
	
	
	/*  _.cps.sequence with error handling (kind of a simplified Promise)
	    ======================================================================== */
	
	_.deferTest (['cps', 'trySequence'], function () {
	
	    var testErr = new Error ()
	
	    /*  No error
	     */
	    $assertEveryCalledOnce (function (mkay) {
	        _.cps.trySequence ([
	            _.cps.constant ('foo'),
	            _.appends ('bar').asContinuation],
	                function (result) { $assert (result, 'foobar'); mkay () }) })
	
	    /*  Throwing error
	     */
	    $assertEveryCalledOnce (function (mkay) {
	        _.cps.trySequence ([
	            function () { throw testErr },
	            function () { $fail }],
	                function (result) { $assert (result === testErr); mkay () }) })
	
	    /*  Returning error to continuation
	     */
	    $assertEveryCalledOnce (function (mkay) {
	        _.cps.trySequence ([
	            function (then) { then (testErr) },
	            function () { $fail }],
	                function (result) { $assert (result === testErr); mkay () }) })
	
	    /*  Reading error in separate callback
	     */
	    $assertEveryCalledOnce (function (mkay) {
	        _.cps.trySequence ([
	            function (then) { then (testErr) },
	            function () { $fail }],
	                function (result) { $fail },
	                function (err)    { $assert (err === testErr); mkay () }) })
	
	}, function () {
	
	    _.cps.trySequence = function (functions, then, err) {
	        _.reduceRight (functions, function (a, b) {
	            return function (e) {
	                if (_.isTypeOf (Error, e)) {
	                    return (err || then) (e) }
	                else {
	                    try {
	                        return b.apply (this, _.asArray (arguments).concat (a)) }
	                    catch (e) {
	                        return (err || then) (e) } } } }, then) () }
	
	})

/***/ },
/* 16 */
/***/ function(module, exports) {

	/*  Extensions methods
	    ======================================================================== */
	
	;['method', 'property', 'flipped', 'forceOverride'].forEach (Tags.define)
	    
	$extensionMethods = function (Type, methods) {
	
	    _.each (methods, function (tags, name) { var fn = Tags.unwrap (tags)
	
	        /*  define as _.method (this, ...)
	         */
	        if (!(name in _)) {
	                      _[name] = _[name] || fn }
	
	        /*  define as property of Type
	         */
	        if (!tags.$method && (tags.$property || (_.oneArg (fn)))) {
	            if (!(name in Type.prototype) || tags.$forceOverride) {
	                _.defineHiddenProperty (Type.prototype, name, function () {
	                    return fn (this) }) } }
	
	        /*  define as method
	         */
	        else if (!tags.$property) {
	            if (!(name in Type.prototype) || tags.$forceOverride) {
	                Type.prototype[name] = _.asMethod (tags.$flipped ? _.flip (fn) : fn) } }
	
	        else {
	            throw new Error ('$extensionMethods: crazy input, unable to match') } })}

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*  Function extensions
	    ======================================================================== */
	
	_.tests.Function = {
	
	    '$ for partial application': function () {
	
	             var sum = function (a, b) { return a + b }
	
	        $assert (sum.$  ('foo') ('bar'), 'foobar')      // bind to head of argument list
	        $assert (sum.$$ ('foo') ('bar'), 'barfoo') },   // bind to tail of argument list
	
	    'Fn.callsWith': function () {
	        $assert (42, (function (a,b,c) {
	                      $assert ([a,b,c],
	                               [1,2,3]); return 42; }).callsWith (1,2) (3)) },
	
	    /*  Converts regular function (which returns result) to CPS function (which passes result to 'then')
	     */
	    'asContinuation': function () { $assertEveryCalled (function (mkay__2) {
	
	        var twoPlusTwo   = function () { return 2 + 2 }
	        var shouldBeFour = function (result) {
	            $assert (result == 4)
	            mkay__2 () }
	
	        twoPlusTwo.asContinuation (shouldBeFour)
	        _.asContinuation (twoPlusTwo) (shouldBeFour) }) },
	
	    /*  Postpones execution
	     */
	    'postpone': function (testDone) {
	        $assertEveryCalledOnce ($async (function (mkay1, mkay2) { var testSecondCall = false
	            var callMeLater = function () {
	                if (testSecondCall) {
	                    mkay2 ()
	                    testDone () }
	                else {
	                    mkay1 ()
	                    testSecondCall = true
	                    callMeLater.postpone () } } // should be postponed again
	            callMeLater.postpone ()
	            callMeLater.postpone () })) },       // should not trigger double call
	
	    'postponed': function (testDone) {
	        $assertEveryCalledOnce ($async (function (mkay) {
	            (function (_42) {
	                $assert (this, 'foo')
	                $assert (42, _42); mkay (); }).postponed.call ('foo', 42) }), testDone) },
	
	    'postponed args': function (done) {
	
	        var xs = []
	        var f = function (x) { xs.push (x) }
	
	        f.postponed (42)
	        f.postponed (43)
	
	        _.delay (function () {
	            $assert (xs, [43]); done () }, 1) },
	
	    /*  Returns function that executed after _.delay
	     */
	    'delayed': function (testDone) {
	        var eat42           = function (_42, then) { $assert (_42, 42); then () }
	        var eat42_after5ms  = eat42.delayed (5)
	
	        $assertEveryCalledOnce ($async (function (mkay) {
	            eat42_after5ms (42, function () { mkay () }) }), testDone) } }
	
	/*  Impl.
	 */
	$extensionMethods (Function, {
	
	    $:  $method (_.partial), // binding to head of argument list
	    $$: $method (_.tails),   // binding to tail of argument list
	
	    bind:           _.bind,
	    partial:        _.partial,
	    calls:          _.bind,
	    tails:          _.tails,
	    tails2:         _.tails2,
	    tails3:         _.tails3,
	    applies:        _.applies,
	    compose:        _.compose,
	    then:           _.then,
	    flip:           _.flip,
	    with:           _.flipN,
	    flip2:          _.flip2,
	    flip3:          _.flip3,
	    asFreeFunction: _.asFreeFunction,
	    asMethod:       _.asMethod,
	
	    callsWith: _.callsTo,
	    tailsWith: _.tailsTo,
	
	    higherOrder: _.higherOrder,
	
	    returns: function (              fn,                                returns) {
	                return function () { fn.apply (this, arguments); return returns } },
	                                                
	    asContinuation: function (f) {
	        return $restArg (function () { _.last (arguments) (f.apply (this, _.initial (arguments))) }) },
	
	    wraps: function (f, w) { f._wrapped = _.withSameArgs (f, w); return f },
	    wrapped: function (f) { return f._wrapped || f },
	    original: function (f) {  while (f && f._wrapped) {
	                                     f  = f._wrapped } return f },
	
	    arity0:         _.arity0,
	    arity1:         _.arity1,
	    arity2:         _.arity2,
	    arity3:         _.arity3,
	
	    or:     _.or,
	    and:    _.and,
	    not:    _.not,
	
	    new: _.higherOrder (_.new),
	
	    each: function (fn, obj) { return _.each2 (obj, fn) },
	    map:  function (fn, obj) { return _.map2  (obj, fn) },
	
	    oneShot: function (fn) { var called = false
	        return function () {   if (!called) {
	                                    called = true; return fn.apply (this, arguments) } } },
	
	    memoized: _.memoize,
	    throttled: _.throttle,
	    
	    debounced: function (func, wait, immediate) {
	        
	        var timestamp, timeout, result, args, context
	        var later = function () {
	            var last = Date.now () - timestamp
	            if (last < wait && last > 0) {
	                timeout = setTimeout (later, wait - last) }
	            else {
	                timeout = null;
	                if (!immediate) {
	                    result = func.apply (context, args)
	                    if (!timeout) {
	                        context = args = null } } } }
	
	        var debouncedFn = function() {
	            context = this
	            args = arguments
	            timestamp = Date.now()
	            var callNow = immediate && !timeout
	            if (!timeout) {
	                timeout = setTimeout(later, wait) }
	            if (callNow) {
	                result = func.apply(context, args)
	                context = args = null }
	            return result }
	
	        debouncedFn.cancel = function () {
	            if (timeout) {
	                clearTimeout (timeout)
	                timeout = null } }
	
	        debouncedFn.callImmediately = function () { // cancels timeout (set by fn.debounced/fn.throttled) and calls immediately
	            debouncedFn.cancel ()
	            func.apply (context, args) }
	
	        return debouncedFn },
	
	    postpone: $method (function (fn) { fn.postponed.apply (null, arguments) }),
	
	    postponed: function (fn) {
	        return function () {
	
	            var shouldPostpone = !fn._postponed
	
	            fn._postponed = _.asArray (arguments)
	            fn._postponedThis = this
	            
	            if (shouldPostpone) {
	
	                _.delay (function () {
	                    
	                    var args_ = fn._postponed
	                    var this_ = fn._postponedThis
	
	                    fn._postponed     = undefined
	                    fn._postponedThis = undefined
	
	                    fn.apply (this_, args_) }) } } },
	
	    delay: _.delay,
	    delayed: function (fn, time) {
	        return function () {
	            var args = arguments, context = this
	            _.delay (function () { fn.apply (context, args) }, time) } } })
	
	
	/*  A functional try/catch
	    ======================================================================== */
	
	_.tests.Function.catches = function () {
	
	    $assert (           'yo',
	         _.constant    ('yo').catches ($fails) (),
	         _.identity          .catches ($fails) ('yo'),
	         _.throwsError ('xx').catches          ('yo')   ())
	
	    $assertThrows (function () {
	        _.constant ('yo').catches (function () { $assert ('catch handler shoudnt work on passed continuations') }, _.throwsError ('xx')) () })
	
	    $assert ((function (x) { throw x }).catches (
	                                            _.appends ('+error_case'),
	                                            _.appends ('+no_error_case'),
	                                            _.appends ('+finally')) ('foo'), 'foo+error_case+finally')
	
	    $assertMatches (
	         _.throwError.catches () ('yo'), {
	                         message: 'yo' })
	
	    $assert (_.catches (_.throwsError (  42 ), $assertMatches
	                          .$ ({ message: 42 })
	                              .returns ('yo')) (),
	                                        'yo')
	
	    $assertCPS (_.constant ('yo').catches ($fails),
	                            'yo') }
	
	$extensionMethods (Function, { catch_:  function (fn, catch_, then, finally_) { return fn.catches (catch_, then) () },
	                               catches: function (fn, catch_, then, finally_) {
	                                                              var args = arguments.length
	                                                        catch_ = (args > 1 ? _.coerceToFunction (catch_)   : _.identity)
	                                                         then  = (args > 2 ? _.coerceToFunction (then)     : _.identity)
	                                                    finally_   = (args > 3 ? _.coerceToFunction (finally_) : _.identity)
	                                          return function () {     var result = undefined, catched = false
	                                                      try          {   result = fn.apply (this, arguments) }
	                                                      catch (e)    {   result = catch_ (e); catched = true }
	                                                     if (!catched) {   result = then (result) }
	                                                  return finally_  (   result) } } })
	
	
	
	
	


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*  Array extensions
	    ======================================================================== */
	
	_.withTest ('Array extensions', function () {
	
	    var arr = [1,3,2,3,3,4,3]
	
	    $assert ([arr.first, arr.second, arr.top, arr.last], [1, 3, 3, 3])
	    $assert (arr.rest, [3,2,3,3,4,3])
	
	    $assert (arr.take (4), [1,3,2,3])
	
	    $assert ([arr.contains (4), arr.contains (9)], [true, false])
	
	    $assert (arr.lastIndex, 6)
	
	    $assert (arr.copy, arr)
	    $assert (arr.copy !== arr)
	
	    $assert (arr.remove (3), [1,2,4]) // it is fast
	    $assert (arr,            [1,2,4]) // and mutates original (thats why fast)
	                                      // for immutable version, use underscore's _.without
	
	    $assert (arr.removeAll (),   [])
	    $assert (arr,                [])
	
	    $assert (['a','b','c'].removeAt (1),    ['a','c'])      // NOTE: mutates original
	    $assert (['a','c'].insertAt ('b', 1),   ['a','b','c'])  // NOTE: mutates original
	
	    $assert ([0,1,2].itemAtWrappedIndex (4) === 1)
	
	             arr =         [1,2,3]
	    $assert (arr.reversed, [3,2,1])
	    $assert (arr,          [1,2,3]) // does not mutate original (in contrary to .reverse)
	                                        
	    $assert ([[1], [[2], 3], 4].flat,         [1, [2], 3, 4])
	    $assert ([[1,2,3], [4,5,6]].zip (_.sum),  [5,7,9])
	
	    $assert (['a','b','c'].swap (1,2), ['a','c','b']) // NOTE: mutates original
	
	    $assert ([1].random === 1) // returns random item from array
	    $assert ([].random === undefined)
	
	    $assert ([{ foo: 'bar'}, { foo: 'qux' }].pluck ('foo'),
	                    ['bar',         'qux'])
	
	    $assert ([['foo', 'bar'].join (),
	              ['foo', 'bar'].join ('.'),
	              ['foo', 'bar'].join (777),
	              ['foo'       ].join (777),
	              [       'bar'].join ('.')], ['foobar', 'foo.bar', ['foo', 777, 'bar'], 'foo', 'bar'])
	
	}, function () {
	
	    /*  TODO: rewrite using new $mixin facility
	     */
	    $extensionMethods (Array, {
	
	        each:        _.each,
	        map:         _.map,
	        fold:        _.reduce2,
	        reduce:      _.reduce,
	        reduceRight: _.reduceRight,
	        zip:         _.zipWith,
	        groupBy:     _.groupBy,
	        indexBy:     _.indexBy,
	        find:        _.find,
	        filter:      _.filter,
		reject:      $method (_.reject),
	        flat:        _.flatten.tails2 (true),
	        object:      _.object,
	        shuffle:     _.shuffle,
	        nonempty:    _.nonempty,
	        pluck:       $method (_.pluck),
	        without:     $method (_.without),
	
	        join: (function (strJoin) {
	                    return $forceOverride (function (arr, delim) { delim = (arguments.length < 2) ? '' : delim
	                                                if (/*_.isString (arr[0]) && */ // semantically correct, but breaks compat
	                                                    _.isString (delim)) { return strJoin.call (arr, delim) }
	                                                                   else { return _.reduce2 (arr, function (a, b) { return [a].concat ([delim, b]) }) } }) }) (Array.prototype.join),
	
	        contains: function (arr, item) { return arr.indexOf (item) >= 0 },
	
	
	        top:    function (arr) { return arr[arr.length - 1] },        
	        first:  function (arr) { return arr[0] },
	        second: function (arr) { return arr[1] },
	        rest:   function (arr) { return _.rest (arr) },
	        last:   function (arr) { return arr[arr.length - 1] },
	        
	        /*  TODO: refactor
	         */
	        take:   function (arr, n) { return arr.slice (0, n) },
	        lastN:  $method (_.last),
	
	        before: function (arr, x) { var i = arr.indexOf (x); return i < 0 ? arr : arr.slice (0, i - 1) },
	        after: function (arr, x)  { var i = arr.indexOf (x); return i < 0 ? arr : arr.slice (i + 1) },
	
	        isEmpty: function (arr) { return arr.length === 0 },
	        notEmpty: function (arr) { return arr.length > 0 },
	
	        lastIndex: function (arr) { return arr.length - 1 },
	
	        random: function (arr) {
	            return arr[_.random (0, arr.lastIndex)] },
	
	        copy: function (arr) {
	            return arr.slice (0) },
	
	        removeAll: $method (function (arr) {
	                        return arr.splice (0, arr.length), arr }),
	
	        remove: function (arr, item) {
	            var i; while ((i = arr.indexOf (item)) !== -1) {
	                arr.splice (i, 1) } return arr },
	
	        removeAt: function (arr, index) {
	            arr.splice (index, 1); return arr },
	
	        insertAt: function (arr, item, index) {
	            arr.splice (index, 0, item); return arr },
	
	        itemAtWrappedIndex: function (arr, i) {
	            return arr[i % arr.length] },
	
	        reversed: function (arr) {
	            return arr.slice ().reverse () },
	
	        swap: $method (function (arr, indexA, indexB) {
	            var a = arr[indexA], b = arr[indexB]
	            arr[indexA] = b
	            arr[indexB] = a
	            return arr }) })
	})


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*  String extensions
	    ======================================================================== */
	
	_.deferTest ('String extensions', function () {
	
	    /*  Convenient infix versions of string-crunching basics. The
	        naming scheme of reversed/capitalized/trimmed is chosen to
	        not cause conflicts with built-in methods/properties doing
	        the same (which are implementation-dependent, e.g. str.trim
	        method).
	     */
	    $assert ('ж'.repeats (0)    === '')
	    $assert ('ж'.repeats (4)    === 'жжжж')
	    $assert ('жопа'.first (2)   === 'жо')
	    $assert ('жопа'.reversed    === 'апож')
	    $assert ('жопа'.capitalized === 'Жопа') // capital Zhopa
	    $assert ('  жопа  '.trimmed === 'жопа')
	    $assert ('<жопа>'.escaped   === '&lt;жопа&gt;')
	    $assert ('па'.prepend   ('жо'),
	             'жо'.append    ('па'), 'жопа')
	
	    $assert (['жопа'.contains ('опа'),
	              'жопа'.contains ('апож')], [true, false])
	
	    $assert  (['жопа'.startsWith ('ж'),
	               'жопа'.startsWith ('жо'),
	               'жопа'.startsWith ('о')], [true,
	                                          true,
	                                          false])
	    $assert  (['жопа'.endsWith ('а'),
	               'жопа'.endsWith ('па'),
	               'жопа'.endsWith ('ж')], [true,
	                                        true,
	                                        false])
	
	    /*  Higher order version of former utility
	     */
	    $assert ([  _.map ([1, 2, 3], _.prepends ('foo')), // higher order version
	                _.map ([1, 2, 3], _.appends  ('bar'))].zip (_.append), ['foo11bar', 'foo22bar', 'foo33bar'])
	
	    /*  This one is defined via unicode_regexp_hack and is super slow
	     */
	    $assert ('}|{О/7A с Py4K()Й ololo 321321'.latinAlphanumericValue,   '7APy4Kololo321321')
	    $assert ('}|{О/7A с Py4K()Й ololo 321321'.alphanumericValue,        'О7AсPy4KЙololo321321')
	
	    /*  This one is defined though regexps, and is kinda slow. Don't use
	        in performance-critical code (like mass object rendering in UI)
	     */
	    $assert ('+7(965)412-63-21'.numericValue, '79654126321')
	    $assert ('+7(965)412-63-21'.integerValue,   79654126321)
	    $assert ('foo'.integerValue,                undefined)      // NOTE: returns undefined instead of NaN (for consistency reasons)
	    $assert ('0'.integerValue,                  0)              // regression test (was resulting to undefined due to bug)
	
	    /*  Use str.parsedInt instead of raw parseInt(), because latter requires
	        base-10 argument, often mistakengly omited, thus resulting something
	        like '010' to be parsed as octal number. I once spend hours of debugging
	        to catch this kind of mistake, and now not want for someone's got
	        trapped into the same shitty situation.
	     */
	    $assert ('123'.parsedInt,   123)
	    $assert ('foo'.parsedInt,   undefined)      // NOTE: returns undefined instead of NaN (for consistency reasons)
	    $assert ('0'.parsedInt,     0)              // regression test (was resulting to undefined due to bug)
	
	    /*  This one is taken from Java's object hasher. Not to ever be used in
	        some security-critical calculations, as it's not secure. It's fast.
	     */
	    $assert ('foo'.hash, 101574)
	
	    /*  Use for filename/URL-part generation
	     */
	    $assert ('Пися Камушкинъ'.transliterate, 'pisyakamushkin')
	
	    /*  This one is really convetient!
	     */
	    $assert  ('qux'.quote (''),     'qux')
	    $assert  ('qux'.quote ('"'),    '"qux"')
	    $assert  ('qux'.quote ('[]'),   '[qux]')
	    $assert  ('qux'.quote ('/'),    '/qux/')
	    $assert  ('qux'.quote ('{  }'), '{ qux }')
	    $assert  ('qux'.quote ('</>'),  '</qux>')
	
	    $assert  (_.isTypeOf (Uint8Array, 'foo'.bytes))
	    $assert  (_.asArray ('foo'.bytes), [102, 111, 111])
	
	    $assert  (['foobar'  .limitedTo (6),
	               'tooloong'.limitedTo (6),
	               ''        .limitedTo (0)], ['foobar',
	                                           'toolo…', ''])
	
	    $assert  ('жоп'.pad (5),      'жоп  ')
	    $assert  ('жоп'.pad (5, '→'), 'жоп→→')
	
	    $assert ('foo'.pluck ([    { foo: 10 },    { foo: 11 } ]), [    10,    11 ])
	    $assert ('foo'.pluck ({ a: { foo: 10 }, b: { foo: 11 } }), { a: 10, b: 11 })
	
	    $assert ('foo/'.concatPath ('/bar'),
	             'foo' .concatPath ('/bar'),
	             'foo/'.concatPath ( 'bar'),
	             'foo' .concatPath ( 'bar'), 'foo/bar')
	
	}, function () { $extensionMethods (String, {
	
	    quote: _.quote,
	
	    concatPath: function (a, b) {
	
	                    var a_endsWithSlash = (a[a.length - 1] === '/')
	                    var b_startsWithSlash = (b[0] === '/')
	
	                    return a + ((a_endsWithSlash || b_startsWithSlash) ? '' : '/') +
	                               ((a_endsWithSlash && b_startsWithSlash) ? b.substring (1) : b) },
	
	    pluck: function (s, arr) {
	                return _.pluck2 (arr, s) },
	
	    contains: function (s, other) { return s.indexOf (other) >= 0 },
	
	    startsWith: function (s, x) {
	                    return (x.length === 1) ? (s[0] === x) : (s.substring (0, x.length) === x) },
	
	    endsWith: function (s, x) {
	                    return (x.length === 1) ? (s[s.length - 1] === x) : (s.substring (s.length - x.length) === x) },
	
	    pad: function (s, len, filler) {
	        return s += (filler || ' ').repeats (Math.max (0, len - s.length)) },
	
	    cut: function (s, from) {
	        return s.substring (0, from - 1) + s.substring (from, s.length) },
	
	    insert: function (s, position, what) {
	        return s.substring (0, position) + what + s.substring (position, s.length) },
	
	    lowercase: function (s) {
	        return s.toLowerCase () },
	
	    uppercase: function (s) {
	        return s.toUpperCase () },
	
	    trimmed: function (s) {
	        return s.trim () },
	
	    limitedTo: function (s, n) {
	        return s && ((s.length <= n) ? s : (s.substr (0, n - 1) + '…')) },
	
	    escaped: function (s) {
	        return _.escape (s) },
	
	    repeats: function (s, n) {                              // TODO: this should come in two versions: _.repeat (s, n) and _.repeats (n, s)
	        return _.times (n, _.constant (s)).join ('') },
	
	    prepend: function (s, other) {
	        return other + s },
	
	    append: function (s, other) {
	        return s + other },
	
	    first: function (s, n) {
	        return _.first (s, n).join ('') },
	
	    last: function (s, n) {
	        return _.last (s, n).join ('') },
	
	    reversed: function (s) {
	        return s.split ('').reverse ().join ('') },
	
	    capitalized: function (s) {
	        return s.charAt (0).toUpperCase () + s.slice (1) },
	
	    decapitalized: function (s) {
	        return s.charAt (0).toLowerCase () + s.slice (1) },
	
	    latinAlphanumericValue: function (s) {
	        return s.replace (/[^a-z0-9]/gi, '') },
	
	    alphanumericValue: function (s) {
	        return s.replace (unicode_hack (/[^0-9\p{L}|^0-9\p{N}|^0-9\p{Pc}|^0-9\p{M}]/g), '') }, // utilizes unicode regexp hack (defined at the end of file)
	
	    numericValue: function (s) {
	        return s.replace (/[^0-9]/g, '') },
	
	    integerValue: function (s) {
	        return s.numericValue.parsedInt },
	
	    parsedInt: function (s) {
	        var result = parseInt (s, 10)
	        return _.isFinite (result) ? result : undefined },
	
	    bytes: function (s) {                var bytes = new Uint8Array (s.length)
	        for (var i = 0; i < s.length; ++i) { bytes[i] = s.charCodeAt (i) }
	                                      return bytes },
	
	    hash: function (s) { // unsecure, but fast, taken from Java's object hasher
	        var hash = 0, i, chr, len
	        if (s.length === 0) {
	            return hash; }
	
	        for (i = 0, len = s.length; i < len; i++) {
	            chr   = s.charCodeAt (i)
	            hash  = ((hash << 5) - hash) + chr
	            hash |= 0 } // Convert to 32bit integer
	
	        return hash },
	
	    transliterate: (function () {
	        var table = _.extend ({
	
	            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
	            'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
	            'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
	            'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
	            'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
	            'у': 'u', 'ф': 'ph', 'х': 'h', 'ц': 'ts',
	            'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '',
	            'ъ': '', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya' },
	
	            _.object (_.map ('_-1234567890qwertyuiopasdfghjklzxcvbnm', function (x) { return [x,x] })))
	        
	        return function (s) {
	            var result = ''
	            var source = (s || '').toLowerCase ()
	
	            for (var i = 0, n = source.length; i < n; i++) {
	                var c = source[i]
	                var x = table[c] || ''
	                result += x }
	
	            return result }}) () }) })
	
	_.extend (String, {
	
	    randomHex: function (length) {
	                            if (length === undefined) {
	                                length = _.random (1, 32) }
	                            var string = '';
	                            for (var i = 0; i < length; i++) { string += Math.floor (Math.random () * 16).toString (16) }
	                            return string },
	
	    leadingZero: function (n) {
	                    return (n < 10) ? '0' + n : n.toString () } })
	
	_.deferTest (['identifier naming style interpolation'], function () {
	
	    $assert (_.camelCaseToLoDashes        ('flyingBurritoOption'), 'flying_burrito_option')
	    $assert (_.camelCaseToDashes          ('flyingBurritoOption'), 'flying-burrito-option')
	    $assert (_.dashesToCamelCase          ('flying-burrito-option'), 'flyingBurritoOption')
	    $assert (_.loDashesToCamelCase        ('flying_burrito_option'), 'flyingBurritoOption')
	
	}, function () {
	
	    _.camelCaseToDashes   =   function (x) { return x.replace (/[a-z][A-Z]/g, function (x) { return x[0] + '-' + x[1].lowercase }) }
	    _.camelCaseToLoDashes =   function (x) { return x.replace (/[a-z][A-Z]/g, function (x) { return x[0] + '_' + x[1].lowercase }) }
	    _.dashesToCamelCase   =   function (x) { return x.replace (/(-.)/g,       function (x) { return x[1].uppercase }) } })
	    _.loDashesToCamelCase =   function (x) { return x.replace (/(_.)/g,       function (x) { return x[1].uppercase }) }
	
	
	
	


/***/ },
/* 20 */
/***/ function(module, exports) {

	/*  Interceptable/observable methods
	    ======================================================================== */
	
	
	/*  TODO: rewrite test
	 */
	_.deferTest ('bindable', function () {
	
	    /*  Test subject
	     */
	    var obj = {
	        plusOne: function (x) {
	            return x + 1 },
	
	        innocentMethod: function (x) {
	            return x } }
	
	    $assertEveryCalled (function (before__1, after__1, intercept__2, secondIntercept__1, bindable__1, infixBefore__1) {
	
	        /*  That's how you observe method calls
	         */
	        _.onBefore (obj, 'plusOne', function (x)            { before__1 (); $assert (x === 7) })
	        _.onAfter  (obj, 'plusOne', function (x, result)    { after__1 (); $assert ([x, result], [7, 8]) })
	
	        $assert (obj.plusOne (7), 8)
	
	        /*  That's how you intercept method calls
	         */
	        _.intercept (obj, 'innocentMethod', function (x, method) {
	            intercept__2 ()
	            return method (x + 1) * 2 })
	
	        $assert (obj.innocentMethod (42), (42 + 1) * 2) 
	
	        /*  Consequent interceptors wrap-up previous ones
	         */
	        _.intercept (obj, 'innocentMethod', function (x, method) {
	            secondIntercept__1 ()
	            $assert (method (x), (42 + 1) * 2) 
	            return 'hard boiled shit' })
	
	        $assert (obj.innocentMethod (42), 'hard boiled shit')
	
	        /*  Test infix calls
	         */
	        var method = _.bindable (function (x) { bindable__1 (); $assert (x === 42) })
	            method.onBefore (function (x) { infixBefore__1 (); $assert (x === 42) })
	            method (42) })
	
	    /*  Test 'once' semantics
	     */
	    var obj2 = { plusOne: function (x) { return x + 1 } }
	
	    $assertEveryCalledOnce (function (beforeCalled, afterCalled) {
	
	        var before = function (x) { beforeCalled (); $assert (x === 7) }
	        var after  = function (x, result) { afterCalled ();  $assert ([x, result], [7, 8]) }
	
	        _.times (2, function () {
	            _.onceBefore (obj, 'plusOne', before)
	            _.onceAfter  (obj, 'plusOne', after) })
	
	        $assert (obj.plusOne (7), 8)
	        $assert (obj.plusOne (7), 8) })
	
	    /*  Test unbinding
	     */
	    $assertEveryCalled (function (afterCalled__1, shouldNotCall__0) {
	                                var method = _.bindable (function () {})
	
	                                    /*  Unbind specific delegate
	                                     */
	                                    method.onBefore (shouldNotCall__0)
	                                    method.onAfter (afterCalled__1)
	                                    method.off (shouldNotCall__0)
	                                    method ()
	
	                                    /*  Unbind everything
	                                     */
	                                    method.onBefore (shouldNotCall__0)
	                                    method.onAfter (shouldNotCall__0)
	                                    method.off ()
	                                    method () })
	
	}, function () {
	
	    /*  Internal impl
	     */
	    var hooks      = ['onceBefore', 'onceAfter', 'onBefore', 'onAfter', 'intercept']
	    var hooksShort = ['onceBefore', 'onceAfter', 'before', 'after', 'intercept']
	
	    var copyHooks = function (from, to) {
	        _.extend (to, _.map2 (_.pick (from, hooks), _.clone)) }
	
	    var makeBindable = function (obj, targetMethod) { var method = obj[targetMethod]
	                            return _.isBindable (method) ? method : (obj[targetMethod] = _.bindable (method)) }
	
	    var hookProc = function (name) {
	                        return function (obj, targetMethod, delegate) {
	                               var bindable = makeBindable (obj, targetMethod)
	                            return bindable[name].call (bindable, delegate) } }
	
	    var mixin = function (method, context) { if (typeof method !== 'function') { throw new Error ('method should be a function') }
	
	                    return _.extend ({}, method, {
	
	                                    _bindable: true,
	                                         impl: method,
	                                     _wrapped: method,
	                                      context: context,
	                                          off: function (delegate) {
	                                                    _.each (hooks, function (hook) {
	                                                        if (delegate) { this['_' + hook].remove (delegate) }
	                                                                 else { this['_' + hook].removeAll () } }, this); return this } },
	
	                                /*  .onBefore, .onAfter, .intercept (API methods)
	                                 */
	                                _.object (_.map (hooks, function (name) { var queueName = ('_' + name)
	                                                                          var once      = (name.indexOf ('once') >= 0)
	
	                                                            return [name, function (fn) {
	                                                                            if (!_.isBindable (this)) {
	                                                                                throw new Error ('wrong this') }
	
	                                                                            var queue = this[queueName]
	                                                                            if (!once || queue.indexOf (fn) < 0) {
	                                                                                this[queueName].push (fn) }
	
	                                                                            return this }] })),
	
	                                /*  ._onBefore, ._onAfter, ._intercept (queues)
	                                 */
	                                _.object (_.map (hooks, function (name) {
	                                                            return ['_' + name, []] }))) }
	
	    /*  Public API
	     */
	    _.extend (_, _.mapObject (_.invert (hooks), hookProc.flip2), {
	
	        unbind: function (obj, targetMethod, delegate) {
	                var method = obj[targetMethod]
	                if (method &&
	                    method.off) {
	                    method.off (delegate) } },
	
	        isBindable: function (fn) {
	            return (fn && fn._bindable) ? true : false },
	
	        bindable: _.extendWith ({ hooks: hooks, hooksShort: hooksShort }, function (method, context) {
	            return _.withSameArgs (method, _.extendWith (mixin (method, context), function () {   
	
	                var wrapper     = arguments.callee
	                var onceBefore  = wrapper._onceBefore
	                var onceAfter   = wrapper._onceAfter
	                var before      = wrapper._onBefore
	                var after       = wrapper._onAfter
	                var intercept   = wrapper._intercept
	                var this_       = context || this
	                var i, ni       = undefined
	
	                /*  Call onceBefore
	                 */
	                if (onceBefore.length) {
	                    for (i = 0, ni = onceBefore.length; i < ni; i++) {
	                        onceBefore[i].apply (this_, arguments) }
	                    onceBefore.removeAll () }
	
	                /*  Call before
	                 */
	                for (i = 0, ni = before.length; i < ni; i++) {
	                    before[i].apply (this_, arguments) }
	
	                /*  Call intercept
	                 */
	                var result = (intercept.length ? _.cps.compose ([method].concat (intercept)) : method).apply (this_, arguments)
	
	                if (after.length || onceAfter.length) { var args = _.asArray (arguments).concat (result)
	
	                    /*  Call after
	                     */
	                    for (i = 0, ni = after.length; i < ni; i++) {
	                        after[i].apply (this_, args) }
	
	                    /*  Call onceAfter
	                     */
	                    if (onceAfter.length) { var arr = onceAfter.copy
	                                                      onceAfter.removeAll ()
	                        for (i = 0, ni = arr.length; i < ni; i++) {
	                            arr[i].apply (this_, args) } } }
	
	                return result } )) }) }) })


/***/ },
/* 21 */
/***/ function(module, exports) {

	/*  Generic functional primitives for dynamic code binding
	    ======================================================================== */
	
	_.tests.stream = {
	
	    'triggerOnce': function () { $assertEveryCalledOnce (function (mkay) {
	                                    var t = _.triggerOnce ()
	                                    var f = function (_321) { $assert (_321 === 321); mkay () }
	                                     t (f)
	                                     t (f)
	                                     t (321)
	                                     t (123) }) },
	
	    'observable': function () {
	
	        /*  Should accept value as constructor, it should be accessible by .value property
	         */
	        var initedWithValue = _.observable (555)
	        $assert (initedWithValue.value, 555)
	
	        /*  Should call with current value when upon binding
	         */
	        $assertEveryCalledOnce (function (mkay) { var valueChanged = _.observable ()
	            valueChanged (999)
	            valueChanged (function (_999) { $assert (_999, 999); mkay () }) })
	
	        /*  Should call previously bound callback if changed
	         */
	        $assertEveryCalled (function (mkay__3) { var valueChanged = _.observable ()
	            valueChanged (mkay__3)
	            valueChanged (123)
	            valueChanged (345)
	            valueChanged (567) })
	
	        /*  Should pass last distinct value as argument to callbacks, not calling if its not changed
	         */
	        $assertEveryCalledOnce (function (mkay) { var valueChanged = _.observable ()
	            valueChanged (function (_111) {
	                            $assert (111, _111)
	                            mkay () })
	            valueChanged (111)
	            valueChanged (111) })
	
	        /*  Should pass previous value as second argument
	         */
	        $assertEveryCalledOnce (function (mkay) { var valueChanged = _.observable (444)
	            valueChanged (function (_666, _444) { if (_444) { $assert ([_666, _444], [666, 444]); mkay () } })
	            valueChanged (666) }) },
	
	    'observable.when': function () {
	
	        $assertEveryCalledOnce (function (mkay) {
	            var value = _.observable (234)
	                value.when (          234, function () { mkay () }) }) // passing constant should work
	
	        $assertEveryCalledOnce (function (mkay) {
	            var value = _.observable ()
	                value.when (_.equals (432), function () { mkay () })
	                value (432)
	                value (234) })
	
	        $assertNotCalled (function (mkay) {
	            var value = _.observable ()
	                value.when (_.equals (432), function () { mkay () })
	                value (7) }) },
	
	    'once': function () { $assertEveryCalledOnce (function (mkay) {
	
	        var whenSomething = _.trigger ()
	            whenSomething.once (mkay)
	            whenSomething.once (mkay)
	            whenSomething ()
	            whenSomething () }) },
	
	    '_.gatherChanges': function () {
	
	        var valueA   = _.observable (),
	            valueB   = _.observable (),
	            changes  = []
	
	        _.gatherChanges (valueA, valueB, function (a, b) {
	            changes.push ([a, b]) })
	
	        valueA (123)
	        valueB (777)
	
	        $assert (changes, [[123, undefined], [123, 777]]) },
	
	    'context': function () {
	        var trigger = _.extend (_.trigger (), { context: 42 })
	
	        trigger (function () { $assert (this, 42) })
	        trigger () },
	
	    '_.off (bound)': function () {  var react = function () { $fail }
	                                    var act = _.trigger (react)
	        _.off (react)
	        act () },
	
	    '_.off (stream)': function () { var fail = function () { $fail }
	                                    var act = _.trigger (fail)
	        _.off (act)
	        act () },
	
	    '_.barrier (defaultListener)': function () {
	        $assertEveryCalled (function (mkay) {
	             _.barrier (function () { mkay () }) () }) },
	
	    /*  Need to rewrite it for clariy
	     */
	    'all shit': function () {
	
	        var obj = {
	            somethingReady: _.barrier (),
	            whenSomething:  _.trigger () }
	
	
	        /*  Test conventional semantics (1:1 multicast)
	         */
	        $assertEveryCalled (function (mkay1__2, mkay2__2) {
	
	            obj.whenSomething (mkay1__2)                // that's how you bind
	            obj.whenSomething (mkay2__2)
	
	            obj.whenSomething ()                        // that's how you trigger it
	            obj.whenSomething ()     })                      
	
	
	        /*  Test unbinding
	         */
	        $assertEveryCalledOnce (function (shouldCall) {
	
	            var whenSomething = _.trigger ()
	
	            var shouldBeCalled    = function () { shouldCall () },
	                shouldNotBeCalled = function () { $fail }
	
	            whenSomething (shouldBeCalled)
	            whenSomething (shouldNotBeCalled)
	            whenSomething.off (shouldNotBeCalled) // that's how you unbind specific listeners
	            whenSomething () })
	
	
	        /*  Test 'barrier' semantics + test argument passing
	         */
	        $assertEveryCalledOnce (function (mkay1, mkay2) {
	
	            obj.somethingReady (function (x) {
	                $assert (x === 'foo')               // you may pass arguments to callbacks
	                obj.somethingReady (x)              // should not call anything
	                mkay1 () })
	
	            obj.somethingReady (function (x) {
	                $assert (x === 'foo')
	                mkay2 () })
	
	            obj.somethingReady ('foo') })   // that's how you trigger it (may pass arguments)
	        obj.somethingReady ('bar')          // should not call anything
	
	
	        /*  Test _.allTriggered
	         */
	        var t1 = _.triggerOnce (), t2 = _.triggerOnce (),       // test pair1
	            t3 = _.triggerOnce (), t4 = _.triggerOnce ()        // test pair2
	
	        _.allTriggered ([t1, t2], function () { $fail }); t1 ()     // pair1: should not cause _.allTriggered to trigger
	
	        $assertEveryCalledOnce (function (mkay) {
	            _.allTriggered ([t3, t4], mkay); t3 (); t4 () })        // pair2: should trigger _.allTriggered
	    },
	
	    'call order consistency': function (done) {
	
	        var abc = ''
	        var put = function (x) { return _.barrier (function () { abc += x }) }
	        var a = put ('a'),
	            b = put ('b'),
	            c = put ('c')
	
	        var barr = _.barrier ()
	            barr (a) (function () { barr.postpones = true; barr (c); barr.postpones = false }) (b) // C is bound after B, so it should be executed after B
	            barr (true)
	
	        _.allTriggered ([a,b,c], function () { $assert (abc, 'abc'); done () })
	    },
	
	    '_.barrier reset': function () {
	        var b = _.barrier ()
	
	        b ('not_42')
	        b.reset ()
	
	        $assertEveryCalledOnce (function (mkay) {
	            b (function (value) { mkay (); $assert (value, 42) })
	            b (42) }) },
	
	    '_.barrier (value)': function () { $assertEveryCalledOnce (function (mkay) {
	             var willBe42 = _.barrier (42)
	        $assert (willBe42.already)
	                 willBe42 (function (_42) { $assert (_42, 42); mkay () }) }) },
	
	    'observable.item': function () {
	
	        var items = _.observable ({ foo: 7, bar: 8 })
	        var foo = items.item ('foo')
	        var bar = items.item ('bar')
	
	        $assert (foo, items.item ('foo')) // should be same cached observable
	        $assert (foo.value, 7)
	        $assert (bar.value, 8)
	
	        foo (77)
	
	        $assert (foo.value, 77)
	        $assert (items.value, { foo: 77, bar: 8 })
	
	        items ({ bar: 88 })
	
	        $assert (foo.value, undefined)
	        $assert (bar.value, 88)
	        $assert (items.value, { bar: 88 })
	    }
	}
	
	_.extend (_, {
	
	    gatherChanges: function (observables_) {
	
	        var observables = _.isArray (observables_) ? observables_ : _.initial (arguments)
	        var accept      = _.last (arguments)
	        var gather      =   function (value) {
	                                accept.apply (this, _.pluck (observables, 'value')) }
	
	        _.each (observables, function (read) {
	            read (gather) }) },
	
	    allTriggered: function (triggers, then) {
	                        var triggered = []
	                        if (triggers.length > 0) {
	                            _.each (triggers, function (t) {
	                                t (function () {
	                                    triggered = _.union (triggered, [t])
	                                    if (then && (triggered.length === triggers.length)) {
	                                        then ()
	                                        then = undefined } }) }) }
	                        else {
	                            then () } },
	
	    observableRef: function (value) {
	        return _.extend (_.observable.apply (this, arguments), { trackReference: true }) },
	
	    observable: function (value) {
	        var stream = _.stream ({
	
	                        isObservable: true,
	                        hasValue: arguments.length > 0,
	                        value:    _.isFunction (value) ? undefined : value,
	
	                        read: function (schedule) {
	                                return function (returnResult) {
	                                    if (stream.hasValue) {
	                                        returnResult.call (this, stream.value) }
	                                    schedule.call (this, returnResult) } },
	
	                        write: function (returnResult) {
	                                    return function (value) {
	
	                                        if (stream.beforeWrite) {
	                                            value = stream.beforeWrite (value) }
	
	                                        if (!stream.hasValue ||
	                                            !(stream.trackReference ?
	                                                (stream.value === value) :
	                                                _.isEqual (stream.value, value))) {
	
	                                            var prevValue = stream.value
	                                            var hadValue = stream.hasValue
	
	                                            stream.hasValue = true
	                                            stream.value = value
	
	                                            if (hadValue) {
	                                                returnResult.call (this, false /* flush */, stream.value, prevValue) }
	                                            else {
	                                                returnResult.call (this, false /* flush */, stream.value) } } } } })
	
	        if (arguments.length) {
	            stream.apply (this, arguments) }
	
	        return _.extend (stream, {
	
	            force: function (value) {
	                stream.hasValue = false
	                stream (value || stream.value) },
	
	            then: function (fn) {
	                        var next = _.observable ()
	                            next.beforeWrite = fn
	                        stream (function (x) { next.write (x) })
	                        return next },
	
	            toggle: function () {
	                        return stream (!stream.value) },
	
	            tie: function (other) {
	
	                stream (other)
	                 other (stream)
	
	                return stream },
	
	            item: function (id) {
	
	                var all = stream.itemObservables || (stream.itemObservables = {})
	                var item = all[id]
	                if (!item) { item = all[id] = _.observable ((stream.value && stream.value)[id])
	
	                    item (function (x) {
	                        var oldValue = (stream.value && stream.value[x])
	                        if (oldValue !== x) {
	                            (stream.value || (stream.value = {}))[id] = x
	                            stream.force () } })
	
	                    stream (function (items) {
	                        item.write (items[id]) }) }
	
	                return item
	            },
	
	            when: function (match, then) { var matchFn       = _.isFunction (match) ? match : _.equals (match),
	                                               alreadyCalled = false
	                stream (function (val) {
	                    if (matchFn (val)) {
	                        if (!alreadyCalled) {
	                             alreadyCalled = true
	                             stream.off (arguments.callee)
	                             then.apply (this, arguments) }
	                        else { 
	                            /* log.w ('WTF') */ } } }) } }) },
	
	
	    barrier: function (defaultValue) { var defaultListener = undefined
	
	        if (_.isFunction (defaultValue)) {
	            defaultListener = defaultValue
	            defaultValue = undefined }
	
	        var barrier = _.stream ({
	                    already: defaultValue !== undefined,
	                    value: defaultValue,
	
	                    reset: function () {
	                        barrier.already = false
	                        delete barrier.value },
	
	                    write: function (returnResult) {
	                                return function (value) {
	                                    if (!barrier.already) {
	                                        barrier.already = true
	                                        barrier.value = value }
	                                    
	                                    returnResult.call (this, true /* flush schedule */, barrier.value) } },
	
	                    read: function (schedule) {
	                                return function (returnResult) {
	                                    if (barrier.already) {
	                                        ((barrier.postpones || barrier.commitingReads) ? // solves problem outlined in 'call order consistency' test
	                                            returnResult.postponed :
	                                            returnResult).call (this, barrier.value) }
	                                    else {
	                                        schedule.call (this, returnResult) } } } })
	
	        if (defaultListener) {
	            barrier (defaultListener) }
	
	        _.defineProperty (barrier, 'promise', function () {
	                                                    return new Promise (function (resolve) { barrier (resolve) }) })
	
	        return barrier },
	
	
	    triggerOnce: $restArg (function () {
	                var stream = _.stream ({
	                                read: function (schedule) {
	                                            return function (listener) {
	                                                if (stream.queue.indexOf (listener) < 0) {
	                                                    schedule.call (this, listener) } } },
	                                write: function (writes) {
	                                    return writes.partial (true) } }).apply (this, arguments); return stream }),
	
	    trigger: $restArg (function () {
	                return _.stream ({
	                            read: _.identity,
	                            write: function (writes) {
	                                return writes.partial (false) } }).apply (this, arguments) }),
	
	    off: function (fn, what) {
	        if (fn.queue) {
	            if (arguments.length === 1) { fn.queue.off ()     }
	            else                        { fn.queue.off (what) } }
	        if (fn.queuedBy) {
	            _.each (fn.queuedBy, function (queue) { queue.remove (fn) })
	             delete fn.queuedBy } },
	
	    stream: function (cfg_) {
	
	                var cfg         = cfg_ || {}
	                var queue       = _.extend ([], { off: function (fn) { if (this.length) {
	                                                    if (arguments.length === 0) {
	                                                        _.each (this, function (fn) {
	                                                            fn.queuedBy.remove (this) }, this)
	                                                        this.removeAll () }
	                                                    else {
	                                                        if (fn.queuedBy) {
	                                                            fn.queuedBy.remove (this)
	                                                            this.remove (fn) } } } } })
	
	                var self = undefined
	
	                var scheduleRead = function (fn) {
	                    if (queue.indexOf (fn) < 0) {
	                        if (fn.queuedBy) {
	                            fn.queuedBy.push (queue) }
	                        else {
	                            fn.queuedBy = [queue] }
	                        queue.push (fn) } }
	
	                var commitPendingReads = function (flush, __args__) {
	                    var args        = _.rest (arguments),
	                        context     = self.context || this,
	                        schedule    = queue.copy
	
	                    if (flush) {
	                        queue.off () }
	
	                    self.commitingReads = true
	
	                    for (var i = 0, n = schedule.length; i < n; i++) {
	                        (self.postpones ? schedule[i].postponed : schedule[i]).apply (context, args) }
	
	                    delete self.commitingReads }
	
	                var write = cfg.write (commitPendingReads)
	                var read  = cfg.read (scheduleRead)
	
	                /*  I/O API (two-way)
	                 */
	                var frontEnd  = function (fn) {
	                                    if (_.isFunction (fn)) {
	                                        read.call (this, fn) }
	
	                                    else {
	                                        write.apply (this, arguments) }
	
	                                    return arguments.callee }
	
	                /*  Once semantics
	                 */
	                var once = function (then) {
	                                if (!_.find (queue, function (f) { return f.onceWrapped_ === then })) {
	                                    read (_.extend (function (v) { _.off (self, arguments.callee); then (v) }, { onceWrapped_: then })) } }
	
	                /*  Constructor
	                 */
	                return (self = _.extend ($restArg (frontEnd), cfg, {
	                    queue:    queue,
	                    once:     once,
	                    off:    _.off.asMethod,
	                    read:     read,
	                    write:    write,
	                    postpone: function () { this.postponed.apply (self.context, arguments) } })) } })
	
	
	/*  Observable.map (experimental)
	    ======================================================================== */
	
	_.deferTest (['stream', 'observable.map'], function () {
	
	/*  General semantics   */
	
	    var foo = _.observable ('foo'),
	        bar = _.observable ('bar')
	
	    var fooBar = _.observable.map ([foo, bar], _.appends ('42'))
	
	    var results = []
	
	    fooBar (function (value) {
	        results.push (value.copy) })
	
	    $assert (results, [['foo42', 'bar42']])
	
	    foo ('qux')
	    bar ('zap')
	
	    $assert (results, [['foo42', 'bar42'],
	                       ['qux42', 'bar42'],
	                       ['qux42', 'zap42']])
	
	
	/*  Works over objects  */
	
	    _.observable.map ({ 'foo': _.observable ('bar') }) (function (obj) {
	                                                            $assert ({ 'foo': 'bar' }, obj) })
	
	}, function () {
	
	    _.observable.map = function (obj, fn) { fn = fn || _.identity
	
	        var value = _.isArray (obj) ? new Array (obj.length) : {}
	        var result = _.observable (value)
	
	        _.each (obj, function (read, i) {
	                        read (function (x) {
	                                value[i] = fn (x, i); result.force (value) }) })
	
	        return result
	    }
	
	    _.observable.all = _.observable.map
	
	})
	
	


/***/ },
/* 22 */
/***/ function(module, exports) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	------------------------------------------------------------------------
	
	Hot-wires some common C++/Java/C# ways to OOP with JavaScript's ones.
	
	------------------------------------------------------------------------
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	
	_.hasOOP = true
	
	_.withTest ('OOP', {
	
	    '$prototype / $extends': function () {
	
	    /*  Prototypes are defined via $prototype
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        var Foo = $prototype ({
	
	        /*  If constructor is not defined (like here), it's default impl. will equal
	            to the following:                                                               */
	
	//          constructor: function (cfg) { _.extend (this, cfg) },
	
	        /*  $static is used to designate type-level members (context-free ones),
	            effectively porting that shit from C++/C#/Java world.                           */
	
	            method:                  function () { return 'foo.method' },
	            staticMethod:   $static (function () { return 'Foo.staticMethod' }),
	
	        /*  $property is used to tag a value as an property definition.
	            Property definitions expand itself within properties.js module, which
	            is separate from OOP.js                                                         */
	
	            property:                $property (function () { return 'foo.property' }),
	            staticProperty: $static ($property (function () { return 'Foo.staticProperty' })),
	
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
	                static42:       $static (42),
	                just42:         42,
	                just42_too:     function () { return 42 },
	                fullBlown:  {
	                    enumerable:     false,  // will be visible as object's own property (defaults to true)
	                    configurable:   true,   // can be deleted by delete operator (defaults to false)
	                    get:            function () { return 42 },
	                    set:            function (x) { $stub } } } })
	
	
	    /*  Inherited prototypes are defined via $extends
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        var Bar = $extends (Foo, $final ({
	
	        /*  If constructor is not defined (like here), it's default impl.
	            will be equal to the following one (calls base constructor):     */
	
	//          constructor: function () { Foo.prototype.constructor.apply (this, arguments)) } 
	
	            staticMethod: $static (function () {
	                return 'Bar.staticMethod' }),
	
	            method: function () {
	                return 'bar.method' } }))
	
	
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
	
	        var foo = new Foo ()
	        var fuu = new Foo ({ method: function () { return 'fuu.method' }})
	        var bar = new Bar ({ hi: 'there' })
	
	        $assert (bar.hi         === 'there')
	        $assert (fuu.method ()  === 'fuu.method')
	
	        $assert ([foo.just42,   bar.just42],   [42, 42])        //  inheritance should work
	        $assert ([Foo.static42, Bar.static42], [42, undefined]) //  (static members do not inherit)
	
	    /*  Overriding should work
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assert ([foo.method (),        bar.method ()],         ['foo.method',       'bar.method'])
	        $assert ([Foo.staticMethod (),  Bar.staticMethod ()],   ['Foo.staticMethod', 'Bar.staticMethod'])
	
	    /*  Regular members shouln't be visible at type level
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assert ([foo.property,         foo.staticProperty], ['foo.property',       undefined])
	        $assert ([Foo.staticProperty,   Foo.property],       ['Foo.staticProperty', undefined])
	
	    /*  Until explicitly stated otherwise, properties are constant.
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assertThrows (function () { foo.just42 = 43 },
	            _.matches ({ message: 'cannot change just42 (as it\'s sealed to 42)' })) },
	
	
	/*  Use $final to tag a thing as non-overrideable (comes from Java)
	    ======================================================================== */
	
	    '$final': function () {
	
	    /*  Tagging arbitrary member as $final
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assertThrows (function () {
	
	            var A = $prototype ({
	                        constructor: $final (function () {}) })
	
	            var B = $extends (A, {
	                        constructor: function () {} }) },   // will throw Error
	
	            _.matches ({ message: 'Cannot override $final constructor' }))
	
	    /*  Tagging whole prototype as $final
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assertThrows (function () {
	
	            var A = $prototype ($final ({}))
	            var B = $extends (A) }, // will throw Error
	
	             _.matches ({ message: 'Cannot derive from $final-marked prototype' })) },
	
	
	/*  Use $alias to make member aliases with correct semantics
	    ======================================================================== */
	
	    '$alias': function () {
	
	        var foo = new ($prototype ({
	
	            error: function () { return 'foo.error' },
	
	            failure:              $alias ('error'),
	            crash:                $alias ('error'),
	            finalCrash:   $final ($alias ('crash')) /* chaining works */        })) ()
	                
	                var def = foo.constructor.$definition
	
	                $assert (foo.finalCrash, foo.crash, foo.failure, foo.error) // all point to same function
	
	                $assert    (def.finalCrash.$final)   // you can add new tags to alias members
	                $assertNot (def.crash.$final)        // adding tags to alias members does not affect original members 
	                $assertNot (def.error.$final)
	
	        /*  Ad-hoc property aliases (applicable even when there's no explicitly declared member at what alias points to)
	         */
	        var size = new ($prototype ({
	            w:  $alias ($property ('x')),
	            h:  $alias ($property ('y')) })) ()
	
	                $assert ([size.x = 42, size.y = 24], [size.w, size.h], [42, 24]) },
	
	
	/*  Static (compile-time) constructor gets called at prototype generation
	    ======================================================================== */
	
	    '$constructor': function () {
	        $assertEveryCalledOnce (function (mkay) {
	            var foo = new ($prototype ({
	                $constructor: function () {
	                    mkay ()  } })) }) },
	
	
	/*  Run-time type information APIs
	    ======================================================================== */
	
	    'RTTI': function () {
	
	        var Foo = $prototype ({ $static: { noop: _.noop } }),
	            Bar = $extends (Foo) // empty definition argument read as {}
	
	        var foo = new Foo (),
	            bar = new Bar ()
	
	    /*  Basically, the simplest way to check a type, relying on some native JavaScript prototype semantics.
	        But it does not account inheritance.
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assert (foo.constructor === Foo)
	        $assert (bar.constructor === Bar)
	
	    /*  A functional crossbrowser version of 'instanceof' (accounts inheritance):
	     
	            1.  Boils down to native 'instanceof' where available
	            2.  In elder browsers, emulates with correct semantics
	     
	        Why use (instead of native syntax):
	        
	            -   cross-browser
	            -   functional (can be partial'ed to yield a predicate)
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assert (_.isTypeOf (Function,  foo.constructor.noop))           
	        $assert (_.isTypeOf (Tags,      foo.constructor.$definition.noop)) // note how $static group is collapsed to normal form
	
	    /*  Infix version (a static member of every $prototype)
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assert ( Foo.isTypeOf (foo))
	        $assert (!Bar.isTypeOf (foo))
	        $assert (Bar.isTypeOf (bar))
	        $assert (Foo.isTypeOf (bar))
	
	    /*  Another infix version (a member of every $prototype)
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        $assert ( foo.isInstanceOf (Foo))
	        $assert (!foo.isInstanceOf (Bar))
	        $assert (bar.isInstanceOf (Bar))
	        $assert (bar.isInstanceOf (Foo))
	    },
	
	
	/*  This is how to decide whether a function is $prototype constructor
	    ======================================================================== */
	
	    'isConstructor': function () {
	
	        var Proto = $prototype (),  // empty argument read as {}
	            dummy = function () {}
	
	        $assert ($prototype.isConstructor (Proto), true)
	        $assert ($prototype.isConstructor (dummy), false)
	        $assert ($prototype.isConstructor (null),  false) // regression
	
	        $assert ([Proto, dummy].map ($prototype.isConstructor), [true, false]) },
	
	
	/*  $prototype.inheritanceChain for traversing inheritance chain
	    ======================================================================== */
	
	    'inheritanceChain': function () {
	
	        var A = $prototype ()
	        var B = $extends (A)
	        var C = $extends (B)
	
	        $assert ($prototype.inheritanceChain (C), [C,B,A]) },
	
	/*  $prototype.defines for searching for members on definition chain
	    ======================================================================== */
	
	    'defines': function () {
	
	        var A = $prototype ({ toString: function () {} })
	        var B = $extends (A)
	        var C = $prototype ()
	
	        $assert ([$prototype.defines (B, 'toString'),
	                  $prototype.defines (C, 'toString')], [true, false]) },
	
	/*  $prototype is really same as $extends, if passed two arguments
	    ======================================================================== */
	
	    'two-argument syntax of $prototype': function () {
	
	        var A = $prototype ()
	        var B = $prototype (A, {}) // same as $extends (Base, def)
	
	        $assert (B.$base === A.prototype) },
	
	
	/*  Adds value contracts to arguments for unit testing purposes
	    ======================================================================== */
	
	    'value contracts for arguments': function () {
	
	        var Proto = $prototype ($testArguments ({
	
	            frobnicate:  function (_777, _foo_bar_baz, unaffected) {},
	            noMistake:   function () {} }))
	
	        var obj = new Proto ()
	
	        $assertFails (function () {
	            obj.frobnicate (999, 'not right') })
	
	        obj.frobnicate (777, 'foo bar baz')
	        obj.noMistake () },
	
	
	/*  You can enumerate members grouped by tag name via $membersByTag
	    ======================================================================== */
	
	    '$membersByTag': function () {
	
	        var foo = $static ($property (1)),
	            bar =          $property (2)
	
	        $assertMatches ($prototype ({ foo: foo, bar: bar }).$membersByTag, { 'static'  : { 'foo': foo },
	                                                                             'property': { 'foo': foo, 'bar': bar } }) },
	
	
	/*  Tags on definition render to static properties
	    ======================================================================== */
	
	    'tags on definition': function () {
	
	        $assertMatches ($prototype ($static ($final ({}))), { $static: true, $final: true }) },
	
	
	/*  $mixin to extend existing types with $prototype-style definitions
	    ======================================================================== */
	
	    '$mixin': function () { var Type = $prototype ()
	
	        $mixin (Type, {
	            twentyFour: $static ($property (24)),
	            fourtyTwo:           $property (42) })
	
	        $assert ([Type    .twentyFour,
	             (new Type ()).fourtyTwo], [24, 42]) }                                  }, function () {
	
	
	/*  PUBLIC API
	    ======================================================================== */
	
	    _(['property', 'static', 'final', 'alias', 'memoized', 'private', 'builtin', 'hidden', 'testArguments'])
	        .each (Tags.define)
	
	    $prototype = function (arg1, arg2) {
	                    return $prototype.impl.compile.apply ($prototype.impl,
	                                (arguments.length > 1)
	                                    ? _.asArray (arguments).reverse ()
	                                    : arguments) }
	
	    $extends = function (base, def) {
	                    return $prototype (base, def || {}) }
	
	    $mixin = function (constructor, def) {
	        return $prototype.impl.compileMixin (_.extend (def, { constructor: constructor })) }
	
	    _.extend ($prototype, {
	
	        isConstructor: function (what) {
	            return _.isPrototypeConstructor (what) },
	
	        macro: function (arg, fn) {
	            if (arguments.length === 1) {
	                $prototype.impl.alwaysTriggeredMacros.push (arg) }
	            else {
	                $prototype.impl.memberNameTriggeredMacros[arg] = fn } },
	
	        macroTag: function (name, fn) { Tags.define (name)
	            $prototype.impl.tagTriggeredMacros['$' + name] = fn },
	
	        each: function (visitor) { var namespace = $global
	            for (var k in namespace) {
	                if (!(k[0] === '$')) { var value = namespace[k]
	                    if ($prototype.isConstructor (value)) {
	                        visitor (value, k) } } } },
	
	        defines: function (constructor, member) {
	            return (_.find ($prototype.inheritanceChain (constructor), function (supa) {
	                        return (supa.$definition && supa.$definition.hasOwnProperty (member)) || false })) ? true : false },
	
	        inheritanceChain: function (def) { var chain = []
	            while (def) {
	                chain.push (def)
	                def = def.$base && def.$base.constructor }
	            return chain },
	
	        wrapMethods: function (def, op) {
	                        return Tags.map (def, function (fn, k, t) {
	                            return _.isFunction (fn) ? op (fn, k, t).wraps (fn) : fn }) },
	
	
	    /*  INTERNALS
	        ==================================================================== */
	
	        impl: {
	
	            alwaysTriggeredMacros:     [],
	            memberNameTriggeredMacros: {},
	            tagTriggeredMacros:        {},
	
	            compile: function (def, base) {    var impl = ((base && base.$impl) || this)
	                                    return $untag (impl
	                                                    .sequence (def, base)
	                                                    .call (impl, def || {})
	                                                    .constructor) },
	
	            sequence: function (def, base) { return _.sequence (
	
	                /*  TODO: optimize performance (there's PLENTY of room to do that)
	                 */
	                this.extendWithTags,
	                this.flatten,
	                this.generateCustomCompilerImpl (base),
	                this.generateArgumentContractsIfNeeded,
	                this.ensureFinalContracts (base),
	                this.generateConstructor (base),
	                this.evalAlwaysTriggeredMacros (base),
	                this.evalMemberTriggeredMacros (base),
	                this.contributeTraits (base),
	                this.evalPrototypeSpecificMacros (base),
	                this.generateBuiltInMembers (base),
	                this.callStaticConstructor,
	                this.expandAliases,
	                this.groupMembersByTagForFastEnumeration,
	                this.defineStaticMembers,
	                this.defineInstanceMembers) },
	
	            compileMixin: function (def) {
	                return _.sequence (
	                    this.flatten,
	                    this.contributeTraits (),
	                    this.expandAliases,
	                    this.evalMemberTriggeredMacros (),
	                    this.defineStaticMembers,
	                    this.defineInstanceMembers).call (this, def || {}).constructor },
	
	            flatten: function (def) {
	                var tagGroups    = _.pick (def, this.isTagGroup)
	                var mergedTagGroups = _.object (_.flatten (_.map (tagGroups, function (membersDef, tag) {
	                    return _.map (this.flatten (membersDef), function (member, memberName) {
	                        return [memberName, $global[tag] (member)] }) }, this), true))
	
	                var memberDefinitions   = _.omit (def, this.isTagGroup)
	
	                return _.extend (memberDefinitions, mergedTagGroups) },
	
	            evalAlwaysTriggeredMacros: function (base) {
	                return function (def) { var macros = $prototype.impl.alwaysTriggeredMacros
	                    for (var i = 0, n = macros.length; i < n; i++) {
	                        def = (macros[i] (def, base)) || def }
	                    return def } },
	
	            evalMemberTriggeredMacros: function (base) {
	                return function (def) { var names = $prototype.impl.memberNameTriggeredMacros,
	                                            tags  = $prototype.impl.tagTriggeredMacros
	                    _.each (def, function (value, name) {
	                        if (names.hasOwnProperty (name)) {
	                            def = (names[name] (def, value, name, base)) || def }
	                        _.each (_.keys (value), function (tag) { if (tags.hasOwnProperty (tag)) {
	                            def = (tags [tag] (def, value, name, base)) || def } }) })
	                     return def } },
	
	            evalPrototypeSpecificMacros: function (base) { return function (def) {
	                if (!def.isTraitOf) {
	                    var macroTags = $untag (def.$macroTags || (base && base.$definition && base.$definition.$macroTags))
	                    if (macroTags) {
	                        this.applyMacroTags (macroTags, def) } } return def } },
	
	            applyMacroTags: function (macroTags, def) {
	                _.each (def, function (memberDef, memberName) {
	                            _.each (macroTags, function (macroFn, tagName) { memberDef = def[memberName]
	                                if (_.isObject (memberDef) && (('$' + tagName) in memberDef)) {
	                                    def[memberName] = macroFn.call (def, def, memberDef, memberName) || memberDef } }, this) }, this)
	                return def },
	
	            generateCustomCompilerImpl: function (base) {
	                return function (def) {
	                    if (def.$impl) {
	                        def.$impl = _.extend (Object.create ((base && base.$impl) || this), def.$impl) // sets prototype to base.$impl || this
	                        def.$impl = $static ($builtin ($property (def.$impl))) }
	                    else if (base && base.$impl) {
	                        def.$impl = $static ($builtin ($property (base.$impl))) }
	                    return def } },
	
	            generateArgumentContractsIfNeeded: function (def) {
	                return def.$testArguments ? $prototype.wrapMethods (def, function (fn, name) {
	                                                                     return function () { var args = _.asArray (arguments)
	                                                                        $assertArguments (args.copy, fn.original, name)
	                                                                         return fn.apply (this, args) } }) : def },
	            contributeTraits: function (base) {
	                        return function (def) {
	                
	                if (def.$traits) { var traits = def.$traits
	
	                    this.mergeTraitsMembers (def, traits, base)
	
	                    def.$traits  = $static ($builtin ($property (traits)))
	                    def.hasTrait = $static ($builtin (function (Constructor) {
	                        return traits.indexOf (Constructor) >= 0 })) }
	
	                return def } },
	
	            mergeTraitsMembers: function (def, traits, base) {
	                _.each (traits, function (trait) {
	                    _.defaults (def, _.omit (trait.$definition,
	                        _.or ($builtin.matches, _.key (_.equals ('constructor'))))) }) },
	
	            extendWithTags: function (def) {                    
	                return _.extendWith ($untag (def), _.mapObject (Tags.get (def), $static.arity1)) },
	
	            callStaticConstructor: function (def) { 
	                if (!def.isTraitOf) { 
	                    _.each ($untag (def.$traits), function (T) {
	                                                    if (T.$definition.$constructor) {
	                                                        $untag (T.$definition.$constructor).call (def) } })
	                    if (def.$constructor) {
	                        $untag (def.$constructor).call (def) } } return def },
	
	            generateConstructor: function (base) { return function (def) {
	                return _.extend (def, { constructor:
	                    Tags.modify (def.hasOwnProperty ('constructor') ? def.constructor : this.defaultConstructor (base),
	                        function (fn) {
	                            if (base) { fn.prototype = Object.create (base.prototype);
	                                        fn.prototype.constructor = fn }
	                            return fn }) }) } },
	
	            generateBuiltInMembers: function (base) { return function (def) {
	
	                if (def.$constructor) {
	                    def.$constructor = $builtin ($static (def.$constructor)) }
	
	                return _.defaults (def, {
	                    $base:          $builtin ($static ($property (_.constant (base && base.prototype)))),
	                    $definition:    $builtin ($static ($property (_.constant (_.extend ({}, base && base.$definition, def))))),
	                    isTypeOf:       $builtin ($static (_.partial (_.isTypeOf, $untag (def.constructor)))),
	                    isInstanceOf:   $builtin (function (constructor) { return _.isTypeOf (constructor, this) }),
	                    $:              $builtin ($prototype.impl.$) }) }},
	
	            $: function (fn) { return _.$.apply (null, [this].concat (_.asArray (arguments))) },
	            
	            defaultConstructor: function (base) {
	                return (base ?
	                    function ()    { base.prototype.constructor.apply (this, arguments) } :
	                    function (cfg) { _.extend (this, cfg || {}) }) },
	
	            defineStaticMembers: function (def) {
	                this.defineMembers ($untag (def.constructor), _.pick (def, $static.matches))
	                return def },
	
	            defineInstanceMembers: function (def) {
	                this.defineMembers ($untag (def.constructor).prototype, _.omit (def, $static.matches))
	                return def },
	
	            defineMembers: function (targetObject, def) {
	                _.each (def, function (value, key) {
	                    if (key !== 'constructor' && def.hasOwnProperty (key)) {
	                        this.defineMember (targetObject, value, key) } }, this) },
	
	            defineMember: function (targetObject, def, key) {
	                if (def && def.$property) {
	                    if (def.$memoized) {
	                        _.defineMemoizedProperty (targetObject, key, def) }
	                    else {
	                        _.defineProperty (targetObject, key, def, def.$hidden ? { enumerable: false } : {}) } }
	                else {
	                    var what = $untag (def)
	                    targetObject[key] = what } },
	
	            ensureFinalContracts: function (base) { return function (def) {
	                                        if (base) {
	                                            if (base.$final) {
	                                                throw new Error ('Cannot derive from $final-marked prototype') }
	
	                                            if (base.$definition) {
	                                                var invalidMembers = _.intersection (
	                                                    _.keys (_.pick (base.$definition, $final.matches)),
	                                                    _.keys (def))
	                                                if (invalidMembers.length) {
	                                                    throw new Error ('Cannot override $final ' + invalidMembers.join (', ')) } } }
	
	                                        return def } },
	
	            expandAliases: function (def) {
	                                _.each (def, function (v, k) { def[k] = this.resolveMember (def, k, v)[1] }, this); return def },
	
	            resolveMember: function (def, name, member) { member = member || def[name]
	
	                                if ($alias.is (member)) { var ref      = this.resolveMember (def, $untag (member))
	                                                          var refName  = ref[0]
	                                                          var refValue = ref[1]
	
	                                    return [refName, ($property.is (member) ?
	                                                      $property ({ get: function ()  { return this[refName]     },
	                                                                   set: function (x) {        this[refName] = x } }) : Tags.extend (refValue, Tags.omit (member, '$alias'))) ] }
	
	                                else { return [name, member] } },
	
	            groupMembersByTagForFastEnumeration: function (def) { var membersByTag = {}
	
	                                                    _.each (def, function (m, name) {
	                                                        Tags.each (m, function (tag) {
	                                                            (membersByTag[tag] = (membersByTag[tag] || {}))[name] = m }) })
	
	                                                    def.$membersByTag = $static ($builtin ($property (membersByTag))); return def },
	
	            isTagGroup: function (value_, key) { var value = $untag (value_)
	                return (key[0] === '$') && _.isFunction ($global[key]) && (typeof value === 'object') && !_.isArray (value) },
	
	            modifyMember: function (member, newValue) {
	                return ($property.is (member) && Tags.modify (member, function (value) { return _.extend (value, _.map2 (_.pick (value, 'get', 'set'), newValue)) })) ||
	                       (_.isFunction ($untag (member)) && Tags.modify (member, newValue)) || member } } }) })
	
	
	/*  $trait  A combinatoric-style alternative to inheritance.
	            (also known as "mixin" in some languages)
	    ======================================================================== */
	
	    _.withTest (['OOP', '$traits'], function () {
	
	        var Closeable = $trait ({
	            close: function () {} })
	
	        var Movable = $trait ({
	            move: function () {} })
	
	        var Enumerable = $trait ({
	            each: function (iter) {},
	            length: $property (function () { return 0; }) })
	
	        var JustCloseable     = $prototype ({ $traits: [Closeable] })
	        var MovableEnumerable = $prototype ({ $traits: [Movable, Enumerable], move: function () {} })
	
	        var movableEnumerable = new MovableEnumerable ()
	
	        $assert (movableEnumerable.move === MovableEnumerable.prototype.move)
	
	        $assertThrows (function () { new Closeable () },
	            _.matches ({ message: 'Traits are not instantiable (what for?)' }))
	
	        $assertTypeMatches (movableEnumerable, {
	            move: 'function',
	            each: 'function',
	            length: 'number' })
	
	        $assert ([
	            movableEnumerable.isInstanceOf (Movable),
	            movableEnumerable.isInstanceOf (Enumerable),
	            movableEnumerable.isInstanceOf (Closeable)], [true, true, false])
	
	        $assert (Movable.isTypeOf (movableEnumerable))
	        $assert (Movable.isTraitOf (movableEnumerable))
	
	        $assert (MovableEnumerable.hasTrait (Enumerable))
	
	        $assertMatches (MovableEnumerable,  { $traits: [Movable, Enumerable] })
	        $assertMatches (JustCloseable,      { $traits: [Closeable] })
	
	        $assertCallOrder (function (t1_constructed, t2_constructed, proto_constructed) {
	
	            var T1, T2
	
	            $assertNotCalled (function (not_now) {
	                T1 = $trait ({ $constructor: function () { not_now (); t1_constructed () } })
	                T2 = $trait ({ $constructor: function () { not_now (); t2_constructed () } }) })
	
	            var Proto = $prototype ({
	                            $traits: [T1, T2],
	                            $constructor: function () { proto_constructed () } }) })
	
	}, function () {
	
	    _.isTraitOf = function (Trait, instance) {
	        var constructor = instance && instance.constructor
	        return (constructor &&
	            constructor.hasTrait &&
	            constructor.hasTrait (Trait)) || false }    //  indexOf is fast if has 1-2 traits,
	                                                        //  no need to pre-index
	    _.isTypeOf = _.or (_.isTypeOf, _.isTraitOf)
	
	    $trait = function (arg1, arg2) {
	        var constructor = undefined
	        var def = _.extend (arguments.length > 1 ? arg2 : arg1, {
	                        constructor: _.throwsError ('Traits are not instantiable (what for?)'),
	                          isTraitOf: $static ($builtin (function (instance) {
	                            return _.isTraitOf (constructor, instance) })) })
	
	        return (constructor = $prototype.impl.compile (def, arguments.length > 1 ? arg1 : arg2)) } })
	
	
	/*  $macroTags
	    ======================================================================== */
	
	    $prototype.macro ('$macroTags', function (def, value, name) {
	        _.each ($untag (value), function (v, k) { Tags.define (k) }) })
	
	
	/*  Context-free implementation of this.$
	    ======================================================================== */
	
	    _.$ = function (this_, fn) { var arguments_ = _.rest (arguments, 2)
	
	        var result = (arguments_.length) ?
	                        _.bind.apply (undefined, [fn, this_].concat (_.rest (arguments, 2))) :
	                        _.withSameArgs (fn, function () { return fn.apply (this_, arguments) }) // @hide
	        
	        //result.context = this_
	
	        return result }
	
	
	/*  $const (xxx) as convenient alias for $static ($property (xxx))
	    ======================================================================== */
	 
	    _.withTest (['OOP', '$const'], function () {
	 
	        var A = $prototype ({
	            $const: {
	                foo: 'foo',
	                bar: 'bar' },
	            qux: $const ('qux'),
	            zap: $const ('zap') })
	 
	        $assert ([A.foo, A.bar, A.qux, A.zap], ['foo', 'bar', 'qux', 'zap'])
	        $assertThrows (function () { A.foo = 'bar '}) }, function () {
	
	    $global.$const = function (x) { return $static ($property (x)) }  })
	
	
	
	/*  Dual call interface
	    ======================================================================== */
	
	    /*  method → free function
	     */
	    _.withTest (['OOP', '$callableAsFreeFunction'], function () {
	
	            var X = $prototype ({
	                foo: $callableAsFreeFunction ($property (function () { $assert (this._42, 42); return 42 })) })
	
	                x = new X ({ _42: 42 })
	
	            $assert (x.foo, X.foo (x), 42) },       function () {
	
	                /*  Impl
	                 */
	                Tags.define  ('callableAsFreeFunction')
	                $prototype.macroTag ('callableAsFreeFunction',
	                    function (def, value, name) {
	                              def.constructor[name] = $untag (value).asFreeFunction
	                       return def }) })
	
	    /*  free function → method
	     */
	    _.withTest (['OOP', '$callableAsMethod'],       function () {
	
	            var X = $prototype ({
	                foo: $callableAsMethod (function (this_, _42) { $assert (this_._42, _42, 42); return 42 }) })
	
	                x = new X ({ _42: 42 })
	
	            $assert (x.foo (42), X.foo (x, 42), 42) },  function () {
	
	                /*  Impl 
	                 */
	                Tags.define  ('callableAsMethod')
	                $prototype.macroTag ('callableAsMethod',
	                    function (def, value, name) {
	                              def[name] = Tags.modify (value, _.asMethod)
	                              def.constructor[name] = $untag (value)
	                       return def }) })
	
	
	/*  $singleton (a humanized macro to new ($prototype (definition)))
	    ======================================================================== */
	
	     _.withTest (['OOP', '$singleton'], function () { $assertEveryCalledOnce (function (baseConstructor, derivedConstructor) {
	
	            var Base    = $prototype ({
	                            method:    _.constant (42) })
	
	        /*  returns constructed instance of a definition passed as argument
	            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	            var Simple  = $singleton ({
	                            constructor: function () { baseConstructor () },
	                            method:      function () { return 42 } })
	
	        /*  can inherit from a prototype
	            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	            var Derived = $singleton (Base, {
	                            constructor: function () { derivedConstructor (); Base.prototype.constructor.apply (this, arguments) } })
	
	            $assert (Simple.method (), Derived.method (), 42) })
	
	        /*  inner prototypes
	            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	            var Outside = $singleton ({
	                Inside: $prototype ({ foo: function () {} }) })
	
	            $assertTypeMatches ((new Outside.Inside ()).foo,  'function')           }, function () {
	
	        /*  IMPLEMENTATION
	            ==================================================================== */
	
	            $singleton = function (arg1, arg2) {
	                    return new ($prototype.apply (null, arguments)) () } })
	


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*  TODO:   UNIT TEST DAT MUTHAFUCKA
	 */
	
	/*  TODO:   get rid of _ namespace (now legacy)
	 */
	
	Math.clamp = _.clamp = function (n, min, max) {
	                            return Math.max (min, Math.min (max, n)) }
	
	Math.lerp = _.lerp = function (t, min, max) {
	                        return min + (max - min) * t }
	
	Math.rescale = _.rescale = function (v, from, to, opts) { var unit = (v - from[0]) / (from[1] - from[0])
	                                return _.lerp (opts && opts.clamp ? _.clamp (unit, 0, 1) : unit, to[0], to[1]) }
	
	Math.rescaleClamped = _.rescaleClamped = function (v, from, to) {
	                                            return _.rescale (v, from, to, { clamp: true }) }
	
	Math.sqr = _.sqr = function (x) { return x * x }
	
	
	/*  Math.sign (missing from Safari)
	    ======================================================================== */
	
	if (!Math.sign) {
	    Math.sign = function (x) {
	        return (x < 0) ? -1 : ((x > 0) ? 1 : 0) } }
	
	/*  Intersections (draft)
	    ======================================================================== */
	
	Intersect = {
	
	    rayCircle: function (origin, d, center, r) {
	
	        var f = origin.sub (center)
	        var a = d.dot (d)
	
	        var b = 2.0 * f.dot (d)
	        var c = f.dot (f) - r*r
	
	        var discriminant = b*b - 4.0*a*c
	        if (discriminant < 0) {
	            return undefined }
	
	        else {
	            discriminant = Math.sqrt (discriminant)
	
	            var t1 = (-b - discriminant) / (2.0 * a)
	            var t2 = (-b + discriminant) / (2.0 * a)
	
	            if ((t1 >= 0) && (t1 <= 1)) {
	                return { time: t1, where: origin.add (d.scale (t1)) } }
	
	            if ((t2 >= 0) && (t2 <= 1)) {
	                return { time: t2, where: origin.add (d.scale (t2)), insideOut: true } }
	
	            return undefined } }
	}
	
	/*  TODO: Vec1, for consistency with arity-abstract vector algorithms
	    ======================================================================== */
	
	/*  2-dimensional vector
	    ======================================================================== */
	
	Vec2 = $prototype ({
	
	    $static: {
	        xx:          function (x)   { return new Vec2 (x,x) },
	        xy:          function (x,y) { return new Vec2 (x,y) },
	        x:           function (x)   { return new Vec2 (x,0) },
	        y:           function (y)   { return new Vec2 (0,y) },
	        zero:        $property (function () { return new Vec2 (0, 0) }),
	        unit:        $property (function () { return new Vec2 (1, 1) }),
	        one:         $alias ('unit'),
	        lt:          $alias ('fromLT'),
	        wh:          $alias ('fromWH'),
	        fromLT:      function (lt) { return lt && (new Vec2 (lt.left, lt.top)) },
	        fromWH:      function (wh) { return wh && (new Vec2 (wh.width, wh.height)) },
	        fromLeftTop:     $alias ('fromLT'),
	        fromWidthHeight: $alias ('fromWH'),
	        lerp:        function (t, a, b) { return new Vec2 (_.lerp (t, a.x, b.x), _.lerp (t, a.y, b.y)) },
	        clamp:       function (n, a, b) { return new Vec2 (_.clamp (n.x, a.x, b.x), _.clamp (n.y, a.y, b.y)) } },
	
	    constructor: function (x, y) {
	        if (arguments.length === 1) {
	            if (_.isNumber (x)) {
	                this.x = this.y = x }
	            else {
	                this.x = x.x
	                this.y = x.y } }
	        else {
	            this.x = x
	            this.y = y } },
	
	    w: $alias ($property ('x')),
	    h: $alias ($property ('y')),
	
	    width:  $alias ($property ('x')),
	    height: $alias ($property ('y')),
	
	    length:        $property (function () { return Math.sqrt (this.lengthSquared) }),
	    lengthSquared: $property (function () { return this.x * this.x + this.y * this.y }),
	
	    distance: function (pt) { return this.sub (pt).length },
	
	    aspect: $property (function () { return this.x / this.y }),
	
	    add: function (a, b) {
	        if (b === undefined) {
	            return (typeof a === 'number') ?
	                new Vec2 (this.x + a,   this.y + a) :
	                new Vec2 (this.x + a.x, this.y + a.y) }
	        else {
	            return new Vec2 (this.x + a, this.y + b) } },
	
	    aspect: $property (function () { return this.w / this.h }),
	
	    dot: function (other) {
	        return this.x * other.x + this.y * other.y },
	
	    sub: function (other) {
	        return new Vec2 (this.x - other.x, this.y - other.y) },
	
	    scale: function (tx, ty) {
	        return new Vec2 (this.x * tx, this.y * (ty === undefined ? tx : ty)) },
	
	    mul: function (other) {
	        return new Vec2 (this.x * other.x, this.y * other.y) },
	
	    divide: function (other) {
	        return new Vec2 (this.x / other.x, this.y / other.y) },
	
	    normal: $property (function () {
	        return this.scale (1.0 / this.length) }),
	
	    perp: $property (function () {
	        return new Vec2 (this.y, -this.x) }),
	
	    half: $property (function () {
	        return new Vec2 (this.x * 0.5, this.y * 0.5) }),
	
	    inverse: $property (function () {
	        return new Vec2 (-this.x, -this.y) }),
	
	    asArray: $property (function () {
	        return [this.x, this.y] }),
	
	    asLeftTop: $property (function () {
	        return { left: this.x, top: this.y } }),
	
	    asLeftTopMargin: $property (function () {
	        return { marginLeft: this.x, marginTop: this.y } }),
	
	    asWidthHeight: $property (function () {
	        return { width: this.x, height: this.y } }),
	
	    asTranslate: $property (function () {
	        return 'translate(' + this.x + ' ' + this.y + ')' }),
	
	    separatedWith: function (sep) {
	        return this.x + sep + this.y },
	
	    floor: $property (function () {
	                        return new Vec2 (Math.floor (this.x), Math.floor (this.y)) }),
	
	    sum: $static (function (arr) {
	                    return _.reduce ((_.isArray (arr) && arr) || _.asArray (arguments),
	                        function (memo, v) { return memo.add (v || Vec2.zero) }, Vec2.zero) }),
	
	    projectOnCircle: function (center, r) {
	        return center.add (this.sub (center).normal.scale (r)) },
	
	    projectOnLineSegment: function (v, w) {
	        var wv = w.sub (v)
	        var l2 = wv.lengthSquared
	        if (l2 == 0) return v
	        var t = this.sub (v).dot (wv) / l2
	        if (t < 0) return v
	        if (t > 1) return w
	        return v.add (wv.scale (t)) },
	
	    projectOnRay: function (origin, dir) { 
	        var l2 = dir.lengthSquared
	        if (l2 == 0) return 0
	        return this.sub (origin).dot (dir) / l2 } })
	
	/*  ------------------------------------------------------------------------ */
	
	if (typeof Symbol !== 'undefined') {
	    Vec2.prototype[Symbol.for ('String.ify')] = function () {
	                                                    return '{' + this.x + ',' + this.y + '}'  } }
	
	/*  Cubic bezier
	    ======================================================================== */
	
	Bezier = {
	
	    cubic: function (t, p0, p1, p2, p3) {
	        var cube = t * t * t
	        var square = t * t
	        var ax = 3.0 * (p1.x - p0.x);
	        var ay = 3.0 * (p1.y - p0.y);
	        var bx = 3.0 * (p2.x - p1.x) - ax;
	        var by = 3.0 * (p2.y - p1.y) - ay;
	        var cx = p3.x - p0.x - ax - bx;
	        var cy = p3.y - p0.y - ay - by;
	        var x = (cx * cube) + (bx * square) + (ax * t) + p0.x;
	        var y = (cy * cube) + (by * square) + (ay * t) + p0.y;
	        return new Vec2 (x, y) },
	        
	    cubic1D: function (t, a, b, c, d) {
	        return Bezier.cubic (t, Vec2.zero, new Vec2 (a, b), new Vec2 (c, d), Vec2.one).y },
	
	    make: {
	        
	        cubic:   function (a,b,c,d) { return function (t) { return Bezier.cubic   (t,a,b,c,d) } },
	        cubic1D: function (a,b,c,d) { return function (t) { return Bezier.cubic1D (t,a,b,c,d) } } } }
	
	
	/*  Bounding box (2D)
	    ======================================================================== */
	
	BBox = $prototype ({
	
	    $static: {
	
	        zero: $property (function () {
	            return new BBox (0, 0, 0, 0) }),
	
	        unit: $property (function () {
	            return new BBox (0, 0, 1, 1) }),
	
	        rect: $property (function (sideSize) {
	            return new BBox (0, 0, sideSize, sideSize) }),
	
	        fromLeftTopAndSize: function (pt, size) {
	            return BBox.fromLTWH ({ left: pt.x, top: pt.y, width: size.x, height: size.y }) },
	
	        fromLTWH: function (l,t,w,h) {
	            if (arguments.length === 1) { return l && (BBox.fromLTWH (l.left, l.top, l.width, l.height)) }
	                                   else { return new BBox (l + w / 2.0, t + h / 2.0, w, h) } },
	
	        fromLTRB: function (l,t,r,b) {
	            if (arguments.length === 1) { return l && (BBox.fromLTRB (l.left, l.top, l.right, l.bottom)) }
	                                   else { return new BBox (_.lerp (0.5, l, r), _.lerp (0.5, t, b), r - l, b - t) } },
	
	        fromSizeAndCenter: function (size, center) {
	            return new BBox (center.x - size.x / 2.0, center.y - size.y / 2.0, size.x, size.y) },
	
	        fromSize: function (a, b) {
	            if (b) { return new BBox (-a / 2.0, -b / 2.0, a, b) }
	              else { return new BBox (-a.x / 2.0, -a.y / 2.0, a.x, a.y) } },
	
	        fromPoints: function (pts) { var l = Number.MAX_VALUE, t = Number.MAX_VALUE, r = Number.MIN_VALUE, b = Number.MIN_VALUE
	            _.each (pts, function (pt) {
	                l = Math.min (pt.x, l)
	                t = Math.min (pt.y, t)
	                r = Math.max (pt.x, r)
	                b = Math.max (pt.y, b) })
	            return BBox.fromLTRB (l, t, r, b) } },
	
	    constructor: function (x, y, w, h) {
	        if (arguments.length == 4) {
	            this.x = x
	            this.y = y
	            this.width = w
	            this.height = h }
	        else {
	            _.extend (this, x) } },
	
	    classifyPoint: function (pt) {
	        
	        var sides = _.extend (
	
	            (pt.x > this.right)   ? { right   : true } : {},
	            (pt.x < this.left)    ? { left    : true } : {},
	            (pt.y > this.bottom)  ? { bottom  : true } : {},
	            (pt.y < this.top)     ? { top     : true } : {})
	        
	        return _.extend (sides,
	
	            (!sides.left &&
	             !sides.right &&
	             !sides.bottom && !sides.top) ? { inside: true } : {}) },
	
	    classifyRay: function (origin, delta, cornerRadius) {
	
	        var half = this.size.half
	        var farTime, farTimeX, farTimeY, nearTime, nearTimeX, nearTimeY, scaleX, scaleY, signX, signY
	
	        scaleX = 1.0 / delta.x
	        scaleY = 1.0 / delta.y
	        signX  = Math.sign (scaleX)
	        signY  = Math.sign (scaleY)
	
	        nearTimeX = (this.x - signX * half.x - origin.x) * scaleX
	        nearTimeY = (this.y - signY * half.y - origin.y) * scaleY
	        farTimeX =  (this.x + signX * half.x - origin.x) * scaleX
	        farTimeY =  (this.y + signY * half.y - origin.y) * scaleY
	
	        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
	            return undefined }
	
	        nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY
	        farTime  = farTimeX  < farTimeY  ? farTimeX  : farTimeY
	
	        if (nearTime >= 1 || farTime <= 0) {
	            return undefined }
	
	        var hit = { time: _.clamp (nearTime, 0, 1) }
	        
	        if (nearTimeX > nearTimeY) {
	            hit.normal = new Vec2 (-signX, 0) }
	        else {
	            hit.normal = new Vec2 (0, -signY) }
	
	        hit.delta = delta.scale (hit.time)
	        hit.where = origin.add (hit.delta)
	
	        if (cornerRadius) { var inner = this.grow (-cornerRadius)
	
	            if (hit.where.x > inner.right) {
	                if (hit.where.y < inner.top) {
	                    hit = Intersect.rayCircle (origin, delta, inner.rightTop, cornerRadius) }
	                else if (hit.where.y > inner.bottom) {
	                    hit = Intersect.rayCircle (origin, delta, inner.rightBottom, cornerRadius) } }
	
	            else if (hit.where.x < inner.left) {
	                if (hit.where.y < inner.top) {
	                    hit = Intersect.rayCircle (origin, delta, inner.leftTop, cornerRadius) }
	                else if (hit.where.y > inner.bottom) {
	                    hit = Intersect.rayCircle (origin, delta, inner.leftBottom, cornerRadius) } }
	
	            if (hit && hit.insideOut) {
	                hit.where = origin } }
	
	        return hit
	    },
	
	    nearestPointTo: function (pt, cornerRadius) { var r = cornerRadius || 0
	
	        var a = new Vec2 (this.left,  this.top),
	            b = new Vec2 (this.right, this.top),
	            c = new Vec2 (this.right, this.bottom),
	            d = new Vec2 (this.left,  this.bottom)
	
	        var pts = [ pt.projectOnLineSegment (a.add (r, 0),  b.add (-r, 0)),  // top
	                    pt.projectOnLineSegment (b.add (0, r),  c.add (0, -r)),  // right
	                    pt.projectOnLineSegment (c.add (-r, 0), d.add (r, 0)),   // bottom
	                    pt.projectOnLineSegment (d.add (0, -r), a.add (0, r)),   // left
	
	                    pt.projectOnCircle (a.add ( r,  r), r),
	                    pt.projectOnCircle (b.add (-r,  r), r),
	                    pt.projectOnCircle (c.add (-r, -r), r),
	                    pt.projectOnCircle (d.add ( r, -r), r) ]
	
	        return _.min (pts, function (test) { return pt.sub (test).length }) },
	
	    xywh: $property (function () {
	        return { x: this.x, y: this.y, width: this.width, height: this.height } }),
	
	    ltwh: $property (function () {
	        return { left: this.left, top: this.top, width: this.width, height: this.height } }),
	
	    union: function (other) { return BBox.fromLTRB (
	                                        Math.min (this.left,   other.left),
	                                        Math.min (this.top,    other.top),
	                                        Math.max (this.right,  other.right),
	                                        Math.max (this.bottom, other.bottom)) },
	
	    centerIn: function (other) {
	        return new BBox (other.x, other.y, this.width, this.height) },
	
	    clone: $property (function () {
	        return new BBox (this.x, this.y, this.width, this.height) }),
	    
	    floor: $property (function () {
	        return new BBox.fromLTRB (Math.floor (this.left),
	                                  Math.floor (this.top),
	                                  Math.floor (this.right),
	                                  Math.floor (this.bottom)) }),
	
	    css: $property (function () {
	                        return { left: this.left   + 'px',
	                                  top: this.top    + 'px',
	                                width: this.width  + 'px',
	                               height: this.height + 'px' } }),
	
	    leftTop: $property (function () {
	        return new Vec2 (this.left, this.top) }),
	
	    leftBottom: $property (function () {
	        return new Vec2 (this.left, this.bottom) }),
	
	    rightBottom: $property (function () {
	        return new Vec2 (this.right, this.bottom) }),
	    
	    rightTop: $property (function () {
	        return new Vec2 (this.right, this.top) }),
	
	    left: $property (function () {
	        return this.x - this.width / 2.0 }),
	
	    right: $property (function () {
	        return this.x + this.width / 2.0 }),
	
	    top: $property (function () {
	        return this.y - this.height / 2.0 }),
	
	    bottom: $property (function () {
	        return this.y + this.height / 2.0 }),
	
	    center: $property (function () {
	        return new Vec2 (this.x, this.y) }),
	
	    extent: $alias ('size'),
	
	    size: $property (function () {
	        return new Vec2 (this.width, this.height) }),
	
	    offset: function (amount) {
	        return new BBox (this.x + amount.x, this.y + amount.y, this.width, this.height) },
	
	    newWidth: function (width) {
	        return new BBox (this.x - (width - this.width) / 2.0, this.y, width, this.height) },
	
	    grow: function (amount) {
	        return new BBox (this.x, this.y, this.width + amount * 2, this.height + amount * 2) },
	
	    shrink: function (amount) {
	        return this.grow (-amount) },
	
	    mul: function (z) {
	            return new BBox (this.x * z, this.y * z, this.width * z, this.height * z) },
	
	    area: $property (function () {
	        return Math.abs (this.width * this.height) }),
	
	    intersects: function (other) {
	                    return !((this.right < other.left) ||
	                             (this.left > other.right) ||
	                             (this.bottom < other.top) ||
	                             (this.top > other.bottom)) },
	})
	
	/*  ------------------------------------------------------------------------ */
	
	if (typeof Symbol !== 'undefined') {
	    Vec2.prototype[Symbol.for ('String.ify')] = function () {
	                                                    return '{ ' + this.left + ',' + this.top + ' ←→ ' + this.right + ',' + this.bottom + ' }'  } }
	
	
	/*  3x3 affine transform matrix, encoding scale/offset/rotate/skew in 2D
	    ======================================================================== */
	
	Transform = $prototype ({
	
	    $static: {
	
	        identity: $property (function () { return new Transform () }),
	
	        svgMatrix: function (m) {
	                        return new Transform ([
	                            [m.a, m.c, m.e],
	                            [m.b, m.d, m.f],
	                            [0.0, 0.0, 1.0] ]) },
	
	        translation: function (v) {
	                        return new Transform ([
	                                    [1.0, 0.0, v.x],
	                                    [0.0, 1.0, v.y],
	                                    [0.0, 0.0, 1.0] ]) } },
	
	    constructor: function (components) {
	                    this.components = components || [
	                        [1.0, 0.0, 0.0],
	                        [0.0, 1.0, 0.0],
	                        [0.0, 0.0, 1.0]] },
	
	    multiply: function (m) {
	                    var result = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
	                    var i, j, k, a = this.components, b = m.components;
	                    for (i = 0; i < 3; i++) {
	                        for (j = 0; j < 3; j++) {
	                            for (k = 0; k < 3; k++) {
	                                   result[i][j] += a[i][k] * b[k][j] } } }
	
	                    return new Transform (result) },
	
	    translate: function (v) {
	                    return this.multiply (Transform.translation (v)) },
	
	    scale: function (s) {
	                return this.multiply (new Transform ([
	                    [s,   0.0, 0.0],
	                    [0.0, s,   0.0],
	                    [0.0, 0.0, 1.0] ])) },
	
	    inverse: $property ($memoized (function () { var m = this.components
	                                        var id = (1.0 / 
	                                                    (m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
	                                                     m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
	                                                     m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])))
	
	                                        return new Transform ([[
	
	                                                 (m[1][1]*m[2][2]-m[2][1]*m[1][2])*id,          // 0 0
	                                                -(m[0][1]*m[2][2]-m[0][2]*m[2][1])*id,          // 0 1
	                                                 (m[0][1]*m[1][2]-m[0][2]*m[1][1])*id],         // 0 2
	
	                                                [(m[1][0]*m[2][2]-m[1][2]*m[2][0])*id,          // 1 0
	                                                 (m[0][0]*m[2][2]-m[0][2]*m[2][0])*id,          // 1 1
	                                                -(m[0][0]*m[1][2]-m[1][0]*m[0][2])*id],         // 1 2
	
	                                                [(m[1][0]*m[2][1]-m[2][0]*m[1][1])*id,          // 2 0
	                                                -(m[0][0]*m[2][1]-m[2][0]*m[0][1])*id,          // 2 1
	                                                 (m[0][0]*m[1][1]-m[1][0]*m[0][1])*id] ]) })),  // 2 2
	        
	    unproject: function (v) {
	                    var m = this.components
	                    return new Vec2 (
	                        v.x * m[0][0] + v.y * m[0][1] + m[0][2],
	                        v.x * m[1][0] + v.y * m[1][1] + m[1][2]) },
	
	    project: function (v) {
	                return this.inverse.unproject (v) } })
	
	
	/*  Generates random number generator
	    ======================================================================== */
	
	_.rng = function (seed, from, to) {
	    var m_w = seed;
	    var m_z = 987654321;
	    var mask = 0xffffffff;
	    return function () {
	        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
	        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
	        var result = ((m_z << 16) + m_w) & mask;
	        result /= 4294967296;
	        result += 0.5
	        if (from === undefined && to === undefined) {
	            return result }
	        else {
	            return Math.round (from + result * (to - from)) } } }
	
	
	/*  Kind of Brezenham algorithm for 1D
	    ======================================================================== */
	
	_.equalDistribution = function (value, n) {
	    var average = value / n
	    var realLeft = 0.0
	    return _.times (n, function () {
	        var left = Math.round (realLeft)
	        var right = Math.round (realLeft += average)
	        var rough = Math.floor (right - left)
	        return rough }) }
	
	
	/*  DEPRECATED: use BBox utility
	    ======================================================================== */
	
	_.ptInRect = function (pt, rect) {
	    return ((pt.x >= rect.left) && (pt.y >= rect.top) && (pt.x < rect.right) && (pt.y < rect.bottom)) }
	
	
	/*  Color utility
	    ======================================================================== */
	
	_.hue2CSS = function (H, a)   { return _.RGB2CSS (_.hue2RGB (H), a)       }
	_.HSL2CSS = function (hsl, a) { return _.RGB2CSS (_.HSL2RGB (hsl), a) }
	
	_.HSL2RGB = function (hsl) { var h = hsl[0], s = hsl[1], l = hsl[2]
	    var rgb = _.hue2RGB (h)
	    var c = (1.0 - Math.abs (2.0 * l - 1.0)) * s
	    return [(rgb[0] - 0.5) * c + l,
	            (rgb[1] - 0.5) * c + l,
	            (rgb[2] - 0.5) * c + l] }
	
	_.hue2RGB = function (hue) {
	    return [Math.max (0.0, Math.min (1.0, Math.abs (hue * 6.0 - 3.0) - 1.0)),
	            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 2.0))),
	            Math.max (0.0, Math.min (1.0, 2.0 - Math.abs (hue * 6.0 - 4.0)))] }
	
	_.RGB2CSS = function (rgb, a) {
	    return 'rgba(' +
	        Math.round (rgb[0] * 255) + ',' +
	        Math.round (rgb[1] * 255) + ',' +
	        Math.round (rgb[2] * 255) + ',' + (a === undefined ? (rgb[3] === undefined ? 1.0 : rgb[3]) : a) + ')' }
	
	_.RGB2HSL = function (rgb, a_) {
	    var r = rgb[0], g = rgb[1], b = rgb[2], a = (a_ === undefined ? rgb[3] : a_)
	    var max = Math.max (r, g, b), min = Math.min (r, g, b);
	    var h, s, l = (max + min) / 2;
	
	    if (max == min) {
	        h = s = 0 }
	    else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break; }
	        h /= 6 }
	    return a === undefined ? [h, s, l] : [h, s, l, a] }
	    
	
	/*  Advanced rounding utility
	    ======================================================================== */
	
	_.extend (Math, (function (decimalAdjust) {
	    return {
	        roundTo: function (value, precision) {
	            return value - (value % precision)
	        },
	        round10: function(value, exp) {
	            return decimalAdjust ('round', value, exp);
	        },
	        floor10: function(value, exp) {
	            return decimalAdjust ('floor', value, exp);
	        },
	        ceil10: function(value, exp) {
	            return decimalAdjust ('ceil', value, exp);
	        }
	    }
	}) (function /* decimalAdjust */ (type, value, exp) {
	
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
	    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	    // Shift back
	    value = value.toString().split('e');
	    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}))
	
	/*  ======================================================================== */
	
	;(function () {
	
	    var toposort = __webpack_require__ (24)
	
	    Array.prototype.topoSort = function () { return toposort (this) }
	
	}) ();
	
	/*  ======================================================================== */
	
	_.withTest (['Array', 'topomerge'], function () {
	
	      $assert ( [['all','your',                'to','us'],
	                 [      'your',       'belong',     'us'],
	                 [             'base','belong','to'     ],
	                 [      'your','base'                   ]].topoMerge (),
	               /* -------------------------------------- */
	                 ['all','your','base','belong','to','us'])
	
	/*  ======================================================================== */
	
	}, function () {
	
	    Array.prototype.topoMerge = function () {                    var edges    = []
	        for (var i = 0, ni = this.length;         i < ni; i++) { var sequence = this[i]
	        for (var j = 0, nj = sequence.length - 1; j < nj; j++) {
	            edges.push ([
	                sequence[j    ],
	                sequence[j + 1]]) } }
	
	        return edges.topoSort ()
	    }
	})
	
	/*  ======================================================================== */
	
	_.withTest (['DAG', 'squash'], function () {
	
	    var modules = {
	        
	        '1':    { requires: [] },
	        '11':   { requires: ['1'] },
	        '2':    { requires: ['0'] },
	        '111':  { requires: ['12', '100'] },
	        '12':   { requires: ['0',  '11', '2'] },
	        '100':  { requires: ['10'] },
	        '0':    { requires: [] },
	        '10':   { requires: ['0', '2'] },
	        'root': { requires: ['2', '111'] } }
	
	    $assert (
	        DAG.sortedSubgraphOf ('root', { nodes: function (x) { return modules[x].requires } }),
	        ["0", "1", "11", "2", "12", "10", "100", "111"]  )
	
	/*  ======================================================================== */
	
	}, function () {
	
	    DAG = function (cfg) {
	                    this.cfg   = cfg       || {},
	                    this.nodes = cfg.nodes || _.noop },
	
	    DAG.prototype.each = function (N, fn, prev,  visited) {
	                                                 visited = visited || new Set ()
	
	                                            if (!visited.has (N)) { 
	                                                 visited.add (N);   var self  = this,
	                                                                        nodes = this.nodes (N) || [],
	                                                                        stop  = fn.call (this, N, {     nodes: nodes,
	                                                                                                         prev: prev,
	                                                                                                      visited: visited })
	                                                if (stop !== true) {
	                                                    nodes.forEach (function ( NN) {
	                                                                   self.each (NN, fn, N, visited) }) } }; return visited },
	    DAG.prototype.edges = function (N) {
	                                var edges = []
	                                    this.each (N, function (N, context) {   context .nodes
	                                                                                    .concat (N)
	                                                                                    .reduce (function (A, B) {
	                                                                                          edges.push ([A, B]); return B }) }); return edges },
	    DAG.prototype.sortedSubgraphOf = function (node0) {
	                                          return this.edges  (node0)
	                                                     .topoSort ()
	                                                     .remove (node0) }
	
	    DAG.sortedSubgraphOf = function (node0, cfg) {
	                                return new DAG (cfg).sortedSubgraphOf (node0) }
	
	})
	
	/*  ======================================================================== */
	


/***/ },
/* 24 */
/***/ function(module, exports) {

	
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


/***/ },
/* 25 */
/***/ function(module, exports) {

	/*  Parsers (TODO: REFACTOR)
	    ======================================================================== */
	
	_.tests.parse = {
	    fileName: function () {
	        $assert (Parse.fileName ('блабла'), 'блабла')
	        $assert (Parse.fileName ('блабла.jpg'), 'блабла')
	        $assert (Parse.fileName ('c:\\блабла/path/path2/блабла.jpg'), 'блабла')
	    }
	}
	
	Parse = {
	    keyCodeAsString: function (key) {
	        return String.fromCharCode ((96 <= key && key <= 105) ? key - 48 : key) },
	
	    fileName: function (path) {
	        return _.first (_.last (path.split (/\\|\//)).split ('.')) },
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	/*  Sorting utilities (TODO: REFACTOR)
	    ======================================================================== */
	
	Sort = {
	    Ascending: 1,
	    Descending: -1,
	    strings: function (a, b) {
	        a = $.trim (a).toLowerCase ()
	        b = $.trim (b).toLowerCase ()
	        if (a.length == 0 && b.length > 0) {
	            return 1;
	        } else if (a.length > 0 && b.length == 0) {
	            return -1;
	        } else {
	            return a == b ? 0 : (a < b ? -1 : 1)
	        }
	    },
	    numbers: function (a, b) {
	        if (isNaN (a) && isNaN (b)) {
	            return 0
	        } else if (isNaN (a)) {
	            return -1
	        } else if (isNaN (b)) {
	            return 1
	        } else {
	            return a < b ? -1 : (a > b ? 1 : 0)
	        }
	    },
	    generic: function (a, b) {
	        if (!a && !b) {
	            return 0
	        } else if (!a) {
	            return -1
	        } else if (!b) {
	            return 1
	        } else {
	            return a < b ? -1 : (a > b ? 1 : 0)
	        }
	    },
	    inverse: function (sort) {
	        return function (a, b) {
	            return -(sort (a, b))
	        }
	    },
	    field: function (name, sort, order) {
	        return function (a, b) {
	            return sort (a[name], b[name]) * order
	        }
	    }
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	/*  Concurrency primitives
	 */
	
	/*  Unit test / documentation / specification / how-to.
	    ======================================================================== */
	
	_.tests.concurrency = {
	
	    'scope': function (testDone) { var releases = [],
	                                       acquires = [],
	                                       count    = 10
	
	        var method = $scope (function (release, id, then) {           acquires.push (id)
	                        _.delay (function () { release (function () { releases.push (id)
	                                                            if (then)
	                                                                then () }) }, 10) })
	
	        method (42, function /* released */ () {
	            $assert (count + 1, acquires.length, releases.length)
	            $assert (acquires, releases.reversed)
	            testDone () })
	
	        _.times (count, function () { method (_.random (1000)) }) },
	
	    'interlocked': function () { var isNowRunning = false
	
	        var op = _.interlocked (function (item, i) { $assert (         !isNowRunning)
	                                                                        isNowRunning = true
	                    return __.delay (_.random (2)).then (function () { isNowRunning = false }) })
	
	        return __.scatter (_.times (15, String.randomHex), op, { maxConcurrency: 10 }) } }
	
	
	/*  Mutex/lock (now supports stand-alone operation, and it's re-usable).
	 */
	Lock = $prototype ({
	    acquire: function (then) {
	        this.wait (this.$ (function () {
	            if (!this.waitQueue) {
	                 this.waitQueue = [] }
	            then () })) },
	
	    acquired: function () {
	        return this.waitQueue !== undefined },
	
	    wait: function (then) {
	        if (this.acquired ()) {     
	            this.waitQueue.push (then) }
	        else {
	            then () }},
	
	    release: function () {
	        if (this.waitQueue.length) {
	            var queueFirst = _.first (this.waitQueue)
	            this.waitQueue = _.rest (this.waitQueue)
	            queueFirst () }
	        else
	            delete this.waitQueue } })
	
	_.interlocked = function (fn) { var lock = new Lock (),
	                                    fn   = $untag (fn)
	    return _.extendWith ({
	                lock: lock,
	                wait: lock.$ (lock.wait) }, function () { var this_ = this,
	                                                              args_ = arguments;
	                                                return new Promise (function (resolve) {
	                                                                        lock.acquire (function () {
	                                                                                        __.then (fn.apply (this_, args_),
	                                                                                            function (x) {
	                                                                                                lock.release (); resolve (x) }) }) }) }) }
	/*  EXPERIMENTAL (TBD)
	 */
	$global.$scope = function (fn) { var releaseStack = undefined
	                                                    
	    return _.argumentPrependingWrapper (Tags.unwrap (fn),
	
	            function /* acquire */ (fn) {
	
	                            var released     = { when: undefined };
	                               (releaseStack = (releaseStack || [])).push (released)
	
	                    fn (function /* release */ (then) { if (released.when) throw new Error ('$scope: release called twice')
	                                                            released.when = then
	                        while (releaseStack &&
	                               releaseStack.last &&
	                               releaseStack.last.when) { var trigger =  releaseStack.last.when
	                                                                   if ((releaseStack = _.initial (releaseStack)).isEmpty) {
	                                                                        releaseStack = undefined }
	                                                             trigger () } }) }) }
	
	if ($platform.NodeJS) {
	    module.exports = _ }

/***/ },
/* 28 */
/***/ function(module, exports) {

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
	    'constructor([cfg, ][then])': function () { $assertNotCalled (function (mkay) {
	
	        var Compo = $component ({})
	
	        /*  1. constructor (cfg)
	         */
	        $assertMatches (new Compo ({ foo: 42 }), { foo: 42 })
	
	        /*  2. constructor (then)
	         */
	        //new Compo (mkay)
	
	        /*  3. constructor (cfg, then)
	         */
	        /*$assertMatches (new Compo ({ foo: 42 }, mkay), { foo: 42 })*/ }) },
	
	
	    /*  init() should be entry point to a component, calling at constructor by default
	     */
	    'init': function () { $assertEveryCalledOnce (function (mkay) {
	                            $singleton (Component, {
	                                init: function () {
	                                    mkay () } }) }) },
	
	
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
	    'no constructor overriding': function () { $assertThrows (function () {
	                                        $singleton (Component, {
	                                            constructor: function () {} }) }) },
	
	
	    /*  If you don't want init() to be called at constructor (to call it manually later),
	        pass init:false to constructor's config
	     */
	    'manual init()': function () { $assertNotCalled (function (fail) {
	                                        var Compo = $component ({ init: function () { fail () } })
	                                        var compo = new Compo ({ init: false })
	                                        $assert (typeof compo.init, 'function') }) }, // shouldn't be replaced by false
	
	    /*  initialized is a _.barrier that opens after initialization
	     */
	    'initialized (barrier)': function () {
	        var Compo = $component ({ init: function () {} })
	        var compo = new Compo ({ init: false })
	
	        $assert (!compo.initialized.already)
	        $assertEveryCalledOnce (function (mkay) {
	            compo.initialized (function () { mkay () })
	            compo.init () }) },
	
	    /*  'thiscall' semantics for methods (which can be defined by a variety of ways)
	     */
	    'thiscall for methods': function () {
	        $assertEveryCalledOnce (function (prototypeMethod, instanceMethod) {
	            var instance = null
	            var Compo = new $component ({
	                prototypeMethod: function () { $assert (this === instance); prototypeMethod () } })
	            instance = new Compo ({
	                instanceMethod:  function () { $assert (this === instance); instanceMethod () } })
	
	            instance.prototypeMethod.call (null)
	            instance.instanceMethod.call (null) }) },
	
	    /*  Pluggable init/destroy with $traits (tests all combinations of CPS / sequential style method calling)
	     */
	    'pluggable init with $traits': function () { var A, B, C, D
	
	        var A = $trait ({
	            beforeInit: function () { A = true; return Promise.resolve () },
	            afterInit:  function () { B = true; return Promise.resolve () } })
	
	        var B = $trait ({
	            beforeInit: function () { C = true; },
	            afterInit:  function () { D = true; }
	        })
	
	        var C = $component ({
	            $traits: [B, A] })
	
	        return (new C ()).initialized.promise.then (function () {
	                                                        $assert (A,B,C,D,true) }) },
	
	
	    /*  $defaults is convenient macro to extract _.defaults thing from init() to definition level
	     */
	    '$defaults basic': function () {
	        var Compo = $component ({ $defaults:           { foo: 42 }})
	        $assert ($untag (Compo.$definition.$defaults), { foo: 42 })
	        $assert (        Compo.            $defaults,  { foo: 42 })
	
	        var Compo2 = $component ({ $traits: [$trait ({ $defaults: { foo: 11 } })], $defaults: { } })
	        $assert ($untag (Compo2.$definition.$defaults), { foo: 11 })
	        $assert (        Compo2.            $defaults,  { foo: 11 })
	    },
	
	    '$defaults': function () {
	        var Trait = $trait ({ $defaults: { pff: 'pff', inner: { fromTrait: 1 } }})
	        var Base = $component ({ $defaults: { foo: 12, qux: 'override me', inner: { fromBase: 1 } } })
	        var Derived = $extends (Base, {
	            $traits: [Trait],
	            $defaults: { bar: 34, qux: 'overriden', inner: { fromDerived: 1 } } })
	        
	        //$assert (Derived.$ownDefaults,
	        //               { bar: 34, qux: 'overriden', inner: { fromDerived: 1 } } )
	
	        /* TODO: fix bug not allowing derived to not have $defaults
	           var Derived2 = $extends (Derived, {}) */
	 
	        $assert (new Derived ().inner !== new Derived ().inner) // should clone $defaults at instance construction
	
	        $assertMatches (new Derived ({ pff: 'overriden from cfg' }), { pff: 'overriden from cfg', foo: 12, bar: 34, qux: 'overriden', inner: { fromTrait: 1, fromBase: 1, fromDerived: 1 } }) },
	
	
	    '$defaults cloning semantics': function () { var set = new Set ([1,2,3])
	
	        var S = $component ({ $defaults: { foo: set,
	                                           bar: new Set () } })
	
	        var s = new S ()
	
	        $assert (s.foo instanceof Set,
	                 s.bar instanceof Set,
	                 true)
	
	        $assert (s.foo !== set)
	    },
	
	    /*  Use $requires to specify required config params along with their type signatures
	     */
	    '$requires': function () {
	        var SomeType = $prototype ()
	        var CompoThatRequires = $component ({
	                                    $requires: {
	                                        foo: SomeType,                      // requires foo to be instance of SomeType
	                                        ffu: { a: 'number', b: 'string' },  // breakdown test
	                                        bar: 'number',
	                                        qux: ['number'],
	                                        baz: _.not (_.isEmpty) } })         // custom requirement predicate
	
	
	        var DerivedCompoThatRequiresMore =
	            $extends (CompoThatRequires, {
	                $requires: { more: 'string' } })
	
	
	        $assertFails (function () {
	            new CompoThatRequires ({ baz: {} }) }) // $requires behaves like assertion in case of failure
	
	        $assertFails (function () {
	            new DerivedCompoThatRequiresMore ({ more: 'hey how about other requirements' }) })
	
	        new DerivedCompoThatRequiresMore ({
	            foo: new SomeType (),
	            bar: 42,
	            qux: [1,2,3],
	            more: 'blah blah',
	            ffu: { a: 1, b: '2' },
	            baz: 'blahblah' }) },
	
	
	    /*  $overrideThis is a macro that requires a method to be overriden
	     */
	    /*'overrideThis': function () {
	        $assertThrows (function () { $singleton (Component, { foo: $overrideThis (function () {}) }) },
	            _.matches ({ message: 'foo should be overriden' })) },*/
	
	
	    /*  $bindable lifts _.bindable to Component level, opening new venues to hooking onto existing impl,
	        in ad-hoc way, with no need to specify hard-coded callback structure beforehand.
	
	        Use to implement common beforeXXX and afterXXX semantics.
	     */
	    '$bindable': function () { $assertEveryCalledOnce (function (method, before, after) {
	
	        var compo = $singleton (Component, {
	                        method: $bindable (function (x) { method ()
	                            return 42 }) })
	
	        compo.method.onBefore (function (_5) { before ()
	            $assert (this === compo)
	            $assert (_5, 5) })
	
	        compo.method.onAfter (function (_5, _result) { after ()
	            $assert (this === compo)
	            $assert (_5, 5)
	            $assert (_result, 42) })
	
	        $assert (compo.method (5), 42) }) },
	
	
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
	    '$trigger': function () { $assertEveryCalled (function (mkay__2) {
	        
	        var compo = $singleton (Component, {
	                        mouseMoved: $trigger () })
	
	        compo.mouseMoved (function (x, y) { $assert ([x, y], [7, 12]); mkay__2 () })
	        compo.mouseMoved (7, 12)
	        compo.mouseMoved (7, 12) }) },
	
	    'init streams from config': function () { $assertEveryCalled (function (atDefinition, atInit) {
	
	        var Compo = $component ({
	                        mouseMoved: $trigger (atDefinition),
	                        init: function () {
	                            this.mouseMoved () } })
	
	        new Compo ({ mouseMoved: atInit }) }) },
	
	    /*  A variation of trigger. On 'write' operation, it flushes wait queue, so
	        no callback bound previously gets called in future (until explicitly
	        queued again by 'read' operation).
	     */
	    '$triggerOnce': function () {
	        var compo = $singleton (Component, {
	                        somthingHappened: $triggerOnce () })
	
	        $assertEveryCalled (function (first, second) {
	            compo.somthingHappened (function (what) { $assert (what, 'somthin'); first () })
	            compo.somthingHappened (function (what) { $assert (what, 'somthin'); second () })
	            compo.somthingHappened ('somthin') }) },
	
	
	    /*  Another variation of stream, having 'memory fence / memory barrier' semantics,
	        widely known as synchronization primitive in concurrent programming.
	
	            1.  At first, barrier is in closed state, putting any callback passed to it
	                to a queue.
	
	            2.  When barrier is called with value argument, it state changes to 'opened',
	                triggering all queued callbacks with that value argument passed in.
	
	            3.  After barrier had opened, any futher callback gets called immediately
	                with that value argument passed before, i.e. short-circuits.
	     */
	    '$barrier': function () { $assertEveryCalled (function (early, lately) {
	        
	        var compo = $singleton (Component, {
	                        hasMessage: $barrier () })
	
	        compo.hasMessage (function (_msg) { $assert (_msg, 'mkay'); early () })
	        compo.hasMessage ('mkay')
	        compo.hasMessage (function (_msg) { $assert (_msg, 'mkay'); lately () }) }) },
	
	
	    /*  $observableProperty is a powerful compound mechanism for data-driven dynamic
	        code binding, built around streams described previously.
	     */
	    '$observableProperty': function () { $assertEveryCalled (function (
	                                            fromConstructor,
	                                            fromConfig,
	                                            fromLateBoundListener,
	                                            fromDefinition,
	                                            fromListenerOnlyVariant) {
	
	        var Compo = $component ({
	                        color: $observableProperty (),
	                        smell: $observableProperty (),
	                        shape: $observableProperty ('round', function (now) { $assert (now, 'round'); fromDefinition () }),
	                        size:  $observableProperty (function (x) { $assert (x, 42); fromListenerOnlyVariant () }),
	                        init: function () {
	                            this.colorChange (function (now, was) { if (was) { fromConstructor ()
	                                $assert ([now, was], ['green', 'blue']) } }) } })
	
	        var compo = new Compo ({
	            color: 'blue',
	            size: 42,
	            colorChange: function (now, was) { if (was) {   fromConfig ()
	                                                            $assert ([now, was], ['green', 'blue']) } } })
	
	        compo.smellChange (function (now, was) { fromLateBoundListener ()
	            $assert (compo.smell, now, 'bad')
	            $assert (undefined,   was) })
	
	        compo.color = 'green'
	        compo.smell = 'bad' }) },
	
	
	    /*  $observableProperty automatically calls prototype constructor if supplied with non-prototype instance data
	     */
	    '$observableProperty (Prototype)': function () {
	        var Compo = $component ({
	                        position: $observableProperty (Vec2.zero),
	                        init: function () {
	                            this.positionChange (function (v) {
	                                $assertTypeMatches (v, Vec2)
	                                $assert (v.y, 42) }) } })
	
	        var compo = new Compo ({ position: { x: 10, y: 42 }}) // supply POD value from constructor
	        compo.position = { x: 20, y: 42 } },                  // supply POD value from property accessor
	
	    'binding to streams with traits': function () {
	
	        Tags.define ('dummy')
	
	        $assertEveryCalled (function (mkay1, mkay2) { var this_ = undefined
	
	            var Trait = $trait ({
	                somethingHappened: $trigger () })
	
	            var Other = $trait ({
	                somethingHappened: $dummy (function (_42) { $assert (this, this_); $assert (_42, 42); mkay1 () }) })
	
	            var Compo = $component ({
	                $traits: [Trait, Other],
	                somethingHappened: function (_42) { $assert (this, this_); $assert (_42, 42); mkay2 () } })
	
	            this_ = new Compo ()
	            this_.somethingHappened (42) }) },
	
	    'binding to bindables with traits': function () {
	
	        $assertCallOrder (function (beforeCalled, interceptCalled, bindableCalled, afterCalled) { var this_ = undefined
	
	            var Trait = $trait ({
	                doSomething: $bindable (function (x) { $assert (this, this_); bindableCalled () }) })
	
	            var Other = $trait ({
	                beforeDoSomething: function (_42) { $assert (this, this_); $assert (_42, 42); beforeCalled () },
	                interceptDoSomething: function (_42, impl) { interceptCalled (); $assert (this, this_); return impl (_42) } })
	
	            var Compo = $component ({
	                $traits: [Trait, Other],
	                afterDoSomething: function (_42) { $assert (this, this_); $assert (_42, 42); afterCalled () } })
	
	            this_ = new Compo ()
	            this_.doSomething (42) }) },
	
	    'binding to observable properties with traits': function () {
	
	        $assertEveryCalled (function (one, two) { var this_ = undefined
	
	            var Trait = $trait ({
	                someValue: $observableProperty (42) })
	
	            var Other = $trait ({
	                someValue: function (_42) { one () } })
	
	            var Compo = $component ({
	                $traits: [Trait, Other],
	                someValue: function (_42) { two () } })
	
	            this_ = new Compo ()
	
	            $assert (_.isFunction (this_.someValueChange))
	
	            this_.someValue = 33 }) },
	
	    'hierarchy management': function () { $assertEveryCalled (function (mkay__9) {
	        
	        var Compo = $extends (Component, {
	            init:    function () { mkay__9 () },
	            destroy: function () { mkay__9 () } })
	
	        var parent = new Compo ().attach (
	                        new Compo ().attach (
	                            new Compo ()))
	
	        var parrot = new Compo ()
	                        .attachTo (parent)
	                        .attachTo (parent)
	
	        $assert (parrot.attachedTo === parent)
	        $assert (parrot.detach ().attachedTo === undefined)
	
	        var carrot = new Compo ()
	        parent.attach (carrot)
	        parent.attach (carrot)
	
	        parent.destroy () })},
	
	    'thiscall for streams': function () {
	        
	        var compo = $singleton (Component, {
	            trig: $trigger () })
	
	        compo.trig (function () {
	            $assert (this === compo) })
	
	        compo.trig.call ({}) },
	
	    '$defaults can set $observableProperty': function () {
	
	        var compo = $singleton (Component, {
	            twentyFour: $observableProperty (42),
	            $defaults: { twentyFour: 24 } })
	
	        $assertEveryCalledOnce (function (mkay) {
	            compo.twentyFourChange (function (val) { $assert (val, 24); mkay (); }) }) },
	
	    'defer init with $defaults': function () {
	        var compo = $singleton (Component, {
	            $defaults: { init: false },
	            init: function () { } })
	
	        compo.init () },
	
	    'stream members should be available at property setters when inited from config': function () {
	        var compo = new ($component ({
	            ready: $barrier (),
	            value: $property ({
	                set: function (_42) { $assertTypeMatches (this.ready, 'function') } }) })) ({ value: 42 }) },
	
	    'observableProperty.force (regression)': function () { $assertEveryCalled (function (mkay__2) {
	        
	        var compo = $singleton (Component, {
	            prop: $observableProperty () })
	
	        compo.prop = 42
	        compo.propChange (function (value) {
	            $assert (value, 42)
	            $assert (this === compo)
	            mkay__2 () })
	
	        compo.propChange.force () }) },
	
	    'two-argument $observableProperty syntax': function () {
	
	        $assertEveryCalled (function (mkay) {
	            var compo = $singleton (Component, {
	                                        prop: $observableProperty (42, function (value) { mkay ()
	                                            if (compo) {
	                                                $assert (this  === compo)
	                                                $assert (value === compo.prop) } }) })
	                compo.prop = 43 }) },
	
	    'two-argument $observable': function () {
	
	        $assertEveryCalled (function (mkay) {
	            $assert ('foo', $singleton (Component, {
	                foo: $observable ('foo', function (x) { $assert (x, 'foo'); mkay () }) }).foo.value)
	        })
	    },
	
	    'destroyAll()': function () { $assertEveryCalled (function (destroyed__2) {
	        
	        var Compo = $extends (Component, {
	            destroy: function () { destroyed__2 () } })
	
	        var parent = new Compo ()
	                        .attach (new Compo ())
	                        .attach (new Compo ())
	
	        $assert (parent.attached.length === 2)
	
	        parent.destroyAll ()
	        parent.destroyAll ()
	
	        $assert (parent.attached.length === 0) })},
	
	    '$macroTags for component-specific macros': function () {
	
	        var Trait =    $trait ({   $macroTags: {
	                                        add_2: function (def, fn, name) {
	                                            return Tags.modify (fn, function (fn) {
	                                                return fn.then (_.sum.$ (2)) }) } } })
	
	        var Base = $component ({   $macroTags: {
	                                        add_20: function (def, fn, name) {
	                                            return Tags.modify (fn, function (fn) {
	                                                return fn.then (_.sum.$ (20)) }) } } })
	
	        var Compo = $extends (Base, {
	            $traits: [Trait],
	            $macroTags: { dummy: function () {} },
	
	             testValue: $static ($add_2 ($add_20 (_.constant (20)))) })
	
	        $assert (42, Compo.testValue ())
	        $assertMatches (_.keys (Compo.$macroTags), ['dummy', 'add_2', 'add_20'])
	
	        _.each (_.keys (Compo.$macroTags), function (name) { delete $global['$' + name] }) },
	
	    '$raw for performance-critical methods (disables thiscall proxy)': function () {
	
	        var compo = new ($component ({
	            method:          function (this_) { $assert (this_ === this) },
	            rawMethod: $raw (function (this_) { $assert (this_ !== this) }) }))
	
	        var    method = compo.   method;    method (compo)
	        var rawMethod = compo.rawMethod; rawMethod (compo) },
	
	    'two-way $observable binding': function () {
	
	        var Compo = $component ({ x: $observable ('foo') })
	        var x = _.observable ('bar')
	
	        var compo = new Compo ({ x: x })
	
	        $assert (compo.x !== x)
	        $assert (compo.x.value, x.value, 'bar')
	
	        compo.x (42); $assert (x.value, 42)
	        x ('lol'); $assert (compo.x.value, 'lol')
	
	    /*  Test unbinding    */
	
	        compo.destroy ()
	
	        $assert (compo.x.queue, [])
	
	        compo.x ('yo'); $assert (x.value, 'lol') // shouldnt change
	        x ('oy'); $assert (compo.x.value, 'yo')  // shouldnt change
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
	    'unbinding (simple)': function () {
	        var somethingHappened = _.trigger ()
	        var compo = $singleton (Component, { fail: function () { $fail } })
	
	        somethingHappened (compo.fail)
	        compo.destroy ()
	        somethingHappened () }, // should not invoke compo.fail
	
	
	    '(regression) undefined was allowed as trait': function () {
	        $assertThrows (function () {
	            var Compo = $component ({ $traits: [undefined] }) }, { message: 'invalid $traits value' }) },
	
	    '(regression) undefined members fail': function () {
	        var Compo = $component ({ yoba: undefined })
	        $assert ('yoba' in Compo.prototype) },
	
	    '(regression) $defaults with $traits fail': function () {
	        var Compo = $component ({ $traits: [$trait ({ $defaults: { x: 1 }})], $defaults: { a: {}, b: [], c: 0 } })
	        $assert (Compo.$defaults, { x: 1, a: {}, b: [], c: 0 }) },
	
	    '(regression) $defaults with $traits fail #2': function () {
	        var Compo = $component ({ $traits: [$trait ({ $defaults: { x: 1 }})] })
	        $assert (Compo.$defaults, { x: 1 }) },
	
	    '(regression) method overriding broken': function () {
	        var Compo = $component ({ method: function () { $fail } })
	        var compo = new Compo ({ value: 42, method: function () { return this.value } })
	        $assert (compo.method (), 42) },
	
	    '(regression) $observableProperty (false)': function () {
	        $assertEveryCalledOnce (function (mkay) {
	            $singleton (Component, {
	                foo: $observableProperty (false),
	                init: function () { this.fooChange (mkay) } }) }) },
	
	    '(regression) was not able to define inner compos at singleton compos': function () {
	        var Foo = $singleton (Component, {
	            InnerCompo: $component ({
	                foo: $observableProperty () }) })
	
	        var Bar = $extends (Foo.InnerCompo, { bar: $observableProperty () })
	        var bar = new Bar ()
	
	        $assertTypeMatches (bar, { fooChange: 'function', barChange: 'function' }) },
	
	    /*'(regression) postpone': function (testDone) { $assertEveryCalledOnce ($async (function (foo) {
	        $singleton (Component, {
	            foo: function () { foo (); },
	            init: function () { this.foo.postpone () } }) }), testDone) },*/
	
	    '(regression) undefined at definition': function () { $singleton (Component, { fail: undefined }) },
	
	    '(regression) properties were evaluated before init': function () {
	        $singleton (Component, {
	            fail: $property (function () { $fail }) }) },
	
	    '(regression) misinterpretation of definition': function () {
	        $singleton (Component, { get: function () { $fail } }) },
	
	    '(regression) alias incorrectly worked with destroy': function () {
	            var test = $singleton (Component, {
	                destroy: function () { mkay () },
	                close: $alias ('destroy') })
	
	            $assert (test.close, test.destroy) } }
	
	
	/*  General syntax
	 */
	$global.$component = function (definition) {
	                        return $extends (Component, definition) }
	
	_([ 'extendable', 'trigger', 'triggerOnce', 'barrier', 'bindable', 'memoize', 'interlocked',
	    'memoizeCPS', 'debounce', 'throttle', 'overrideThis', 'listener', 'postpones', 'reference', 'raw', 'binds', 'observes'])
	    .each (Tags.define)
	
	;(function () {
	    var impl = function (impl) {
	                return function (x, fn) {
	                    return ((_.isFunction (x) && (arguments.length === 1)) ?
	                                impl (x, fn) :     // $observableProperty (listener)
	                                impl (fn, x)) } }  // $observableProperty (value[, listener])
	
	    Tags.define ('observableProperty', impl) 
	    Tags.define ('observable',         impl) 
	}) ();
	
	$global.$observableRef = function (x) { return $observableProperty ($reference (x)) }
	
	$prototype.macro ('$depends', function  (def, value, name) {
	                                       (def.$depends = $builtin ($const (_.coerceToArray (value))))
	                                 return def })
	
	$prototype.macroTag ('extendable',
	            function (def, value, name) {
	                      def[name] = $builtin ($const (value))
	               return def })
	
	Component = $prototype ({
	
	    $defaults:  $extendable ({}),
	    $requires:  $extendable ({}),
	    $macroTags: $extendable ({}),
	
	    /*  Overrides default OOP.js implementation
	     */
	    $impl: {
	
	        sequence: function (def, base) { return _.sequence (
	            this.extendWithTags,
	            this.flatten,
	            this.generateCustomCompilerImpl (base),
	            this.generateArgumentContractsIfNeeded,
	            this.ensureFinalContracts (base),
	            this.generateConstructor (base),
	            this.evalAlwaysTriggeredMacros (base),
	            this.evalMemberTriggeredMacros (base),
	            this.expandTraitsDependencies,
	            this.mergeExtendables (base),
	            this.contributeTraits (base),
	            this.mergeStreams,
	            this.mergeBindables,
	            this.generateBuiltInMembers (base),
	            this.callStaticConstructor,
	            this.expandAliases,
	            this.groupMembersByTagForFastEnumeration,
	            this.defineStaticMembers,
	            this.defineInstanceMembers) },
	
	        expandTraitsDependencies: function (def) {
	
	                if (_.isNonempty ($untag (def.$depends)) &&
	                    _.isEmpty    ($untag (def.$traits))) {
	                                          def.$traits = DAG.sortedSubgraphOf (def, {
	                                                                nodes: function (def) {
	                                                                    return $untag (def.$depends) } }) }; return def },
	
	        mergeExtendables: function (base) { return function (def) {
	
	                _.each (base.$definition, function (value, name) {
	                    if (value && value.$extendable) {
	                        def[name] = Tags.modify (                       value,
	                                        function (                      value) {
	                                                                        value =    _.extendedDeep (value, $untag (def[name] || {}))
	                                    _.each ($untag (def.$traits),
	                                                function (trait) { if (!trait) {    log.e (def.$traits)
	                                                                                    throw new Error ('invalid $traits value') }
	                                                      var traitVal = trait.$definition [name]
	                                                      if (traitVal) {   value =   _.extendedDeep ($untag (traitVal), value) } })
	                                                               return   value }) } }); 
	               return def } },
	
	        mergeTraitsMembers: function (def, traits) { var pool = {}, bindables = {}, streams = {}
	
	            var macroTags = $untag (def.$macroTags)
	            var definitions = _.pluck (traits, '$definition').concat (_.clone (def))
	
	            _.each (definitions, function (traitDef) {
	                _.each ((macroTags && this.applyMacroTags (macroTags,
	                                                _.extend (_.clone (traitDef), {
	                                                    constructor: def.constructor }))) || traitDef,
	                    function (member, name) {
	                        if ($builtin.isNot (member) &&
	                            $builtin.isNot (def[name]) && (name !== 'constructor')) {
	
	                            if ($bindable.is (member))                  { bindables[name] = member }
	                            if (Component.isStreamDefinition (member))  {   streams[name] = member }
	                            (pool[name] || (pool[name] = [])).push (member);    def[name] = member } }) }, this)
	
	            def.__bindables     = bindables
	            def.__streams       = streams
	            def.__membersByName = pool },
	
	        mergeStreams: function (def) { var pool = def.__membersByName
	
	            _.each (def.__streams, function (stream, name) {
	
	                    var clonedStream = def[name] = Tags.clone (stream)
	                        clonedStream.listeners = []
	
	                    _.each (pool[name], function (member) {
	                                            if (member !== stream) {
	                                                clonedStream.listeners.push ($untag (member)) } }) }); return def },
	
	        mergeBindables: function (def) { var pool = def.__membersByName
	
	            _.each (def.__bindables, function (member, name) {
	                var bound = _.filter2 (_.bindable.hooks, function (hook, i) {
	                                                            var bound = pool[_.bindable.hooksShort[i] + name.capitalized]
	                                                            return bound ? [hook, bound] : false })
	
	                if (bound.length) { var hooks = {}
	
	                    _.each (bound, function (kv) {
	                        _.each (kv[1], function (fn) { fn = $untag (fn)
	                            if (_.isFunction (fn)) { var k = '_' + kv[0]; (hooks[k] || (hooks[k] = [])).push (fn) } }) })
	
	                    def[name] = $bindable ({ hooks: hooks }, Tags.clone (member)) } }, this)
	
	            return def } },
	
	
	    /*  Syntax helper
	     */
	    isStreamDefinition: $static (function (def) {
	        return _.isObject (def) && (
	            def.$trigger || def.$triggerOnce ||
	            def.$barrier || def.$observable || def.$observableProperty) }),
	    
	
	    /*  Another helper (it was needed because _.methods actually evaluate $property values while enumerating keys,
	        and it ruins most of application code, because it happens before Component is actually created).
	     */
	    mapMethods: function (/* [predicate, ] iterator */) { var iterator  = _.last (arguments),
	                                                               predicate = (arguments.length === 1 ? _.constant (true) : arguments[0])
	        var methods = []
	        for (var k in this) {
	            var def = this.constructor.$definition[k]
	            if (!(def && def.$property)) { var fn = this[k]
	                if (_.isFunction (fn) && !_.isPrototypeConstructor (fn) && predicate (def))  {
	                    this[k] = iterator.call (this, fn, k, def) || fn } } } },
	
	    enumMethods: function (_1, _2) {
	        if (arguments.length === 2) { this.mapMethods (_1, _2.returns (undefined)) }
	                               else { this.mapMethods (    _1.returns (undefined)) } },
	
	
	    /*  Thou shall not override this
	     */
	    constructor: $final (function (arg1, arg2) {
	
	        this.parent_ = undefined
	        this.children_ = []
	
	        var cfg                 = this.cfg = ((typeof arg1 === 'object') ? arg1 : {}),
	            componentDefinition = this.constructor.$definition
	
	
	        /*  Apply $defaults
	         */
	        if (this.constructor.$defaults) {
	            cfg = this.cfg = _.extend (_.cloneDeep (this.constructor.$defaults), cfg) }
	
	
	        /*  Add thiscall semantics to methods
	         */
	        this.mapMethods (function (fn, name, def) { if ((name !== '$') && (name !== 'init') && !(def && def.$raw)) { return this.$ (fn) } })
	
	
	        /*  Listen self destroy method
	         */
	        _.onBefore  (this, 'destroy', this._beforeDestroy)
	        _.onAfter   (this, 'destroy', this._afterDestroy)
	
	
	        var initialStreamListeners = []
	        var excludeFromCfg = { init: true }
	
	
	        /*  Expand macros
	            TODO: execute this substitution at $prototype code-gen level, not at instance level
	         */
	        _.each (componentDefinition, function (def, name) { if (def !== undefined) {
	
	            /*  Expand $observableProperty
	                TODO: rewrite with $prototype.macro
	             */
	            if (def.$observableProperty) {  var definitionValue = def.subject
	                                            var defaultValue = (name in cfg) ? cfg[name] : definitionValue
	                                            var streamName   = name + 'Change'
	
	                /*  xxxChange stream
	                 */
	                var observable           = excludeFromCfg[streamName] = this[streamName] = _.observable ()
	                    observable.context   = this
	                    observable.postpones = def.$postpones
	
	                /*  auto-coercion of incoming values to prototype instance
	                 */
	                if (_.isPrototypeInstance (definitionValue)) { var constructor = definitionValue.constructor
	                    observable.beforeWrite = function (value) {
	                        return constructor.isTypeOf (value) ? value : (new constructor (value)) } }
	
	                /*  tracking by reference
	                 */
	                if (def.$reference) {
	                    observable.trackReference = true }
	
	                /*  property
	                 */
	                _.defineProperty (this, name, {
	                        get: function ()  { return observable.value },
	                        set: function (x) { observable.write.call (this, x) } })
	
	                /*  Default listeners (come from traits)
	                 */
	                if (def.listeners) {
	                    _.each (def.listeners, function (value) {
	                        initialStreamListeners.push ([observable, value]) }) }
	
	                /*  Default listener which comes from $observableProperty (defValue, defListener) syntax
	                 */
	                if (_.isFunction (def.$observableProperty)) {
	                      initialStreamListeners.push ([observable, def.$observableProperty]) }
	
	                /*  write default value
	                 */
	                if (defaultValue !== undefined) {
	                    observable (defaultValue) } }
	
	            /*  Expand streams
	             */
	            else if (Component.isStreamDefinition (def)) {
	                var stream = excludeFromCfg[name] = this[name] = _.extend (
	                                (def.$trigger       ? _.trigger :
	                                (def.$triggerOnce   ? _.triggerOnce :
	                                (def.$observable    ? _.observable :
	                                (def.$barrier       ? _.barrier : undefined)))) (def.subject), { context: this, postpones: def.$postpones })
	
	                /*  tracking by reference
	                 */
	                if (def.$reference) {
	                    observable.trackReference = true }
	
	                if (def.listeners) {
	                    _.each (def.listeners, function (value) {
	                        initialStreamListeners.push ([stream, value]) }) }
	
	                /*  Default listener which comes from $observable (defValue, defListener) syntax
	                 */
	                if (_.isFunction (def.$observable)) {
	                      initialStreamListeners.push ([stream, def.$observable]) }
	
	                var defaultListener = cfg[name]                
	                if (defaultListener) {
	                    if (def.$observable && defaultListener.isObservable) { // two-way observable binding
	                        defaultListener.tie (stream) }
	                    else {
	                        initialStreamListeners.push ([stream, defaultListener]) } } }
	
	            /*  Expand $listener (TODO: REMOVE)
	             */
	            if (def.$listener) {
	                this[name].queuedBy = [] }
	
	            /*  Expand $interlocked
	             */
	            if (def.$interlocked) {
	                this[name] = _.interlocked (this[name]) }
	
	            /*  Expand $bindable
	             */
	            if (def.$bindable) {
	                this[name] = _.extend (_.bindable (this[name], this),
	                                       _.map2 (def.$bindable.hooks || {},
	                                       _.mapsWith (this.$.bind (this).arity1))) }
	            /*  Expand $debounce
	             */
	            if (def.$debounce) { var fn = this[name], opts = _.coerceToObject (def.$debounce)
	                this[name] = fn.debounced (opts.wait || 500, opts.immediate) }
	
	            /*  Expand $throttle
	             */
	            if (def.$throttle) { var fn = this[name], opts = _.coerceToObject (def.$throttle)
	                this[name] = _.throttle (fn, opts.wait || 500, opts) }
	
	            /*  Expand $memoize
	             */
	                 if (def.$memoize) {
	                this[name] = _.memoize (this[name]) }
	            else if (def.$memoizeCPS) {
	                this[name] = _.cps.memoize (this[name]) } } }, this)
	
	        /*  Add before/after stage to init
	         */
	        var init  = this.init
	                    this.init = this._beforeInit
	                                     .then (init
	                                     .then (this._afterInit)).bind (this)
	
	        /*  Apply cfg thing
	         */
	        _.each (cfg, function (value, name) {
	            if (!(name in excludeFromCfg)) {
	                this[name] = _.isFunction (value) ? this.$ (value) : value } }, this)
	
	
	        /*  Fixup aliases (they're now pointing to nothing probably, considering what we've done at this point)
	         */
	        _.each (componentDefinition, function (def, name) {
	            if (def && def.$alias && !def.$raw) {
	                this[name] = this[$untag (def)] } }, this)
	
	
	        /*  Check $overrideThis
	         */
	        /*_.each (componentDefinition, function (def, name) {
	            if (def.$overrideThis && this[name] === undefined) {
	                throw new Error (name + ' should be overriden') } })*/
	
	
	        /*  Check $requires (TODO: make human-readable error reporting)
	         */
	        if (_.hasAsserts) {
	            _.each (this.constructor.$requires, function (contract, name) {
	                $assertTypeMatches (_.object ([[name, this[name]]]),
	                                    _.object ([[name, contract]])) }, this) }
	
	
	        /*  Subscribe default listeners
	         */
	        _.each (initialStreamListeners, function (v) { v[0].call (this, v[1]) }, this)
	
	
	        /*  Call init (if not marked as deferred)
	         */
	        if (!(cfg.init === false || (this.constructor.$defaults && (this.constructor.$defaults.init === false)))) {
	            var result = this.init ()
	            if (result instanceof Promise) {
	                result.panic } } }),
	
	    /*  Arranges methods defined in $traits in chains and evals them
	     */
	    callChainMethod: function (name) { var self = this
	        return __.seq (
	                _.filter2 (this.constructor.$traits || [], function (Trait) {
	                                                              var method = Trait.prototype[name]
	                                                              return (method && method.bind (self)) || false })) },
	
	    /*  Lifecycle
	     */
	    _beforeInit: function () {
	        if (this.initialized.already) {
	            throw new Error ('Component: I am already initialized. Probably you\'re doing it wrong.') }
	
	        return this.callChainMethod ('beforeInit') },
	
	    init: function () { /* return Promise for asynchronous init */ },
	
	    _afterInit: function () { var cfg  = this.cfg,
	                                  self = this
	
	        return __.then (this.callChainMethod.$ ('afterInit'), function () {
	
	                        self.initialized (true)
	                        self.alive (true)
	
	                        /*  Bind default property listeners. Doing this after init, because property listeners
	                            get called immediately after bind (observable semantics), and we're want to make
	                            sure that component is initialized at the moment of call.
	
	                            We do not do this for other streams, as their execution is up to component logic,
	                            and they're might get called at init, so their default values get bound before init.
	                         */
	                        _.each (self.constructor.$definition, function (def, name) {
	                            if (def && def.$observableProperty) {            name += 'Change'
	                                var defaultListener = cfg[name]
	                                if (defaultListener) {
	                                    self[name] (defaultListener) } } })
	
	                        return true }) },
	    
	    initialized: $barrier (),
	    alive:       $observable (false),
	
	    _beforeDestroy: function () {
	        if (this.destroyed_) {
	            throw new Error ('Component: I am already destroyed. Probably you\'re doing it wrong.') }
	        if (this.destroying_) {
	            throw new Error ('Component: Recursive destroy() call detected. Probably you\'re doing it wrong.') }
	            this.destroying_ = true
	
	        _.each (this.constructor.$traits, function (Trait) {
	            if (Trait.prototype.beforeDestroy) {
	                Trait.prototype.beforeDestroy.call (this) } }, this)
	
	        this.alive (false)
	
	        /*  Unbind streams
	         */
	        this.enumMethods (_.off.arity1)
	
	        /*  Destroy children
	         */
	        _.each (this.children_, _.method ('destroy'))
	                this.children_ = [] },
	
	    destroy: function () {},
	
	    _afterDestroy: function () {
	
	        _.each (this.constructor.$traits, function (Trait) {
	            if (Trait.prototype.destroy) {
	                Trait.prototype.destroy.call (this) }
	            if (Trait.prototype.afterDestroy) {
	                Trait.prototype.afterDestroy.call (this) } }, this)
	
	        delete this.destroying_
	        this.parent_ = undefined
	        this.destroyed_ = true },
	
	
	    /*  Parent manip.
	     */ 
	    attachedTo: $property (function () {
	                            return this.parent_ }),
	
	    attachTo: function (p) {
	                    if (p === this) {
	                        throw new Error ('smells like time-travel paradox.. how else can I be parent of myself?') }
	
	                    if (this.parent_ !== p) {
	                        if ((this.parent_) !== undefined) {
	                            this.parent_.children_.remove (this) }
	                            
	                        if ((this.parent_ = p) !== undefined) {
	                            this.parent_.children_.push (this) }} return this },
	
	    detach: function () {
	                return this.attachTo (undefined) },
	
	    /*  Child manip.
	     */
	    attached: $property (function () {
	                            return this.children_ }),
	
	    attach: function (c) {
	                _.invoke (_.coerceToArray (c), 'attachTo', this); return this },
	
	    detachAll: function () {
	                    _.each (this.children_, function (c) { c.parent_ = undefined })
	                            this.children_ = []
	                            return this },
	
	    destroyAll: function () {
	                    _.each (this.children_, function (c) { c.parent_ = undefined; c.destroy () })
	                            this.children_ = []
	                            return this } })


/***/ },
/* 29 */
/***/ function(module, exports) {

	/*  Implementation
	 */
	R = $singleton ({
	
	    $test: function () {
	
	        var $assertExpr = function (a, b) { $assert (a, _.quote (b.str, '//')) }
	
	        /*  R should be used for code clarity purposes when one needs to generate a
	            complex regular expression that is hard to read and maintain.
	         */
	        $assertExpr ('/[^\\s]*/',        $r.anyOf.except.space.$)
	        $assertExpr ('/\\[.*\\]|[\\s]/', $r.anything.inBrackets.or.oneOf.space.$)
	
	        var expr = $r.expr ('before',    $r.anything.text ('$print').something).then (
	                   $r.expr ('argument',  $r.someOf.except.text (',)')).inParentheses.then (
	                   $r.expr ('tail',      $r.anything))).$
	
	        /*  Above construction generates the following regular expression
	         */
	        $assertExpr ('/(.*\\$print.+)\\(([^,\\)]+)\\)(.*)/', expr)
	
	        /*  Main feature: named groups, easily accessible as dictionary elements.
	         */
	        $assert (expr.parse ( ' var x = $print (blabla) // lalala '),
	
	                  {  before:  ' var x = $print ',
	                   argument:  'blabla',              
	                       tail:  ' // lalala ',        })
	
	        /*  Based on Lisp-like list based syntax, for easy programmatic generation and stuff
	         */
	        $assert ([['[^', '\\s', "\]"], '*'], R.anyOf (R.except (R.space))) },
	
	
	    constructor: function () {
	
	        this.reduce = _.hyperOperator (_.binary, _.reduce2,
	                                        _.goDeeperAlwaysIfPossible,
	                                        _.isNonTrivial.and (_.not (this.isSubexpr)))
	
	        this.initDSL () },
	
	    expr: function (expr, subexprs) { subexprs = subexprs || []
	            return new R.Expr (R.reduce ('', expr, function (memo, s) {
	                                                        if (R.isSubexpr (s)) { subexprs.push (s)
	                                                            return memo + R.expr (R.root (s.value), subexprs).str }
	                                                        else {
	                                                            return memo + s } }), subexprs) },
	
	    Expr: $prototype ({
	
	        constructor: function (str, subexprs) {
	                        this.rx = new RegExp ()
	                        this.rx.compile (str)
	                        this.str = str
	                        this.subexprs = subexprs },
	
	        parse: function (str) {
	                var match = str.match (this.rx)
	            return (match && _.extend.apply (null,
	                                _.zipWith ([_.rest (match), this.subexprs], function (match, subexpr) {
	                                                                                return _.object ([[ subexpr.name, match ]]) }))) || {} } }),
	
	    metacharacters: $property (_.index ('\\^$.|?*+()[{')),
	
	    escape:       function (s)    { return _.map (s, function (x) { return R.metacharacters[x] ? ('\\' + x) : x }).join ('') },
	
	    text:         $alias ('escape'),
	
	    subexpr:      function (name, s) { return { name: name, value: ['(', s, ')'] } },
	 
	    maybe:        function (s)    { return [s, '?'] },
	
	    anyOf:        function (s)    { return [s, '*'] },
	    someOf:       function (s)    { return [s, '+'] },
	
	    oneOf:        function (s)    { return ['[',  s, ']'] },
	    except:       function (s)    { return ['[^', s, ']'] },
	
	    or:           function (a, b) { return [a, '|', b] },
	
	    begin:       $property ('^'),
	    end:         $property ('$'),
	    space:       $property ('\\s'),
	    maybeSpaces: $property ('\\s*'),
	    spaces:      $property ('\\s+'),
	    anything:    $property ('.*'),
	    something:   $property ('.+'),
	    comma:       $property (','),
	
	    parentheses: function (s) { return ['\\(', s, '\\)'] },
	    brackets:    function (s) { return ['\\[', s, '\\]'] },
	
	    isSubexpr: function (s) { return (_.isStrictlyObject (s) && !_.isArray (s)) ? true : false },
	
	    root: function (r) { return (r && r.$$) ? r.$$ : r },
	
	    initDSL: function () {
	
	        $global.property ('$r',  function () { return $$r ([]) })
	        $global.const    ('$$r', function (cursor) {
	
	            var shift = function (x) { cursor.push (x); return cursor.forward }
	
	            _.defineHiddenProperty (cursor, 'then', function (x)    { cursor.push (R.root (x));                return cursor })
	            _.defineHiddenProperty (cursor, 'text', function (x)    { cursor.push (R.text (x));                return cursor })
	            _.defineHiddenProperty (cursor, 'expr', function (x, s) { cursor.push (R.subexpr (x, R.root (s))); return cursor })
	
	            _.defineHiddenProperty (cursor, 'forward', function () {
	                return cursor.next || ((cursor.next = $r).prev = cursor).next })
	
	            _.each (['maybe', 'anyOf', 'someOf', 'oneOf', 'except'], function (key) {
	                _.defineHiddenProperty (cursor, key, function () {
	                    return shift (R[key] (cursor.forward)) }) })
	
	            _.each (['parentheses', 'brackets'], function (key) {
	                _.defineHiddenProperty (cursor, 'in' + key.capitalized, function () {
	                    return (cursor.$$.prev = $$r (R[key] (cursor.$$))) }) })
	
	            _.each (['or'], function (key) {
	                _.defineHiddenProperty (cursor, key, function () { var next = $r
	                    return (next.prev = (cursor.$$.prev = $$r (R[key] (cursor.$$, next)))).next = next }) })
	
	            _.each (['begin', 'end', 'space', 'anything', 'something'], function (key) {
	                _.defineHiddenProperty (cursor, key, function () {
	                    return shift ([R[key], cursor.forward]); }) })
	
	            _.defineHiddenProperty (cursor, '$$', function () { var root = cursor
	                while (root.prev) { root = root.prev }
	                return root })
	
	            _.defineHiddenProperty (cursor, '$', function () {
	                return R.expr (cursor.$$) })
	
	            return cursor
	        })
	    }
	})

/***/ },
/* 30 */
/***/ function(module, exports) {

	/* 
	    Aspects are units of behavior expressed in terms of ad-hoc
	    patching of existing components' internals. They embody the
	    powerful idea of a source code patches that are fully defined
	    and maintained by sole terms of that source code itself, with
	    no help of external tool to operate.
	
	    To better understand why this is reasonable, here's overview
	    of every stuff you can use to extend existing behavior of
	    a component.
	
	 1. Simply edit the original component, hardwiring desired behavior
	    into it. And that's the actual way of how we manage things around,
	    not surprisingly.
	
	 2. Good old inheritance. Key difference is that inheritance produces
	    new versions of a component. Instead, $aspect will change existing
	    one - which is more often scenario.
	
	 3. Traits. Comparing to inheritance, $trait looks similar to $aspect,
	    but really they're opposite of each other. Here's why:
	
	    Traits are reasonable when implementing new components. Being
	    generic and abstract, $traits sum up inside of a component,
	    producing it's final implementation, as seen by it's developer.
	
	 4. Aspects do the exact opposite: they define and carry so-called
	   "weak modifications", which are external / temporary / optional /
	    situative by nature, as seen by the external user of a component.
	
	    It's something you'd solve with plugins or extensions...
	    if only you'd had enough time to pre-mind all possible scenarios
	    of code customization. That's why $aspects here.
	
	    They require none, and allow to drop complex pluggable
	    architectures completely - to focus on _what_ we do, not how.
	*/
	
	_.tests.AOP = {
	
	    'basics': function () {     var callLog = []
	
	                                var Thing = $prototype ($testArguments ({
	
	                                    create:            function (_777)              { callLog.push ([this, 'Thing.create']) },
	                                    display:           function (_foobar, _778)     { callLog.push ([this, 'Thing.display']) },
	                                    destroy:           function ()                  { callLog.push ([this, 'Thing.destroy']); return 456 } }))
	
	                                var NewFlavorOfThing = $aspect (Thing, $testArguments ({
	
	                                    beforeCreate:   function (_777)                        { callLog.push ([this, 'NewFlavorOfThing.beforeCreate']) },
	
	                                    display:        function (_foo, _123, originalMethod)  { callLog.push ([this, 'NewFlavorOfThing.display']);
	                                                                                             return originalMethod.call (this, _foo + 'bar', 778) },
	
	                                    afterDestroy:   function (_456)                        { callLog.push ([this, 'NewFlavorOfThing.afterDestroy']) } }))
	
	                                var demo = new Thing ()
	
	                                demo.create   (777)
	                                demo.display  ('foo', 123)
	                                demo.destroy  ()
	
	                                $assert (callLog, [[demo, 'NewFlavorOfThing.beforeCreate'],
	                                                   [demo,            'Thing.create'      ],
	                                                   [demo, 'NewFlavorOfThing.display'     ],
	                                                   [demo,            'Thing.display'     ],
	                                                   [demo,            'Thing.destroy'     ],
	                                                   [demo, 'NewFlavorOfThing.afterDestroy']]) } };
	
	
	(function () {
	
	    var fnNameExpr = $r.expr ('how', $r.text ('before').or.text ('after')).expr ('name', $r.anything).$
	
	    var tryBind = function (target, methodName, bind, boundMethod) {
	        var method = target[methodName]
	        if (method && _.isFunction (method)) {
	            bind (target, methodName, boundMethod) } }
	
	    $global.$aspect = function (ofWhat, cfg) {
	
	        var aspectDef = Tags.unwrap (_.sequence (
	                            $prototype.impl.extendWithTags,
	                            $prototype.impl.flatten,
	                            $prototype.impl.generateArgumentContractsIfNeeded,
	                            $prototype.impl.contributeTraits ({}),
	                            $prototype.impl.expandAliases).call ($prototype.impl, cfg))
	        
	        var motherDef = ofWhat.constructor && ofWhat.constructor.$definition
	        if (motherDef) {
	                (motherDef.$aspects = motherDef.$aspects || []).push (aspectDef) }
	
	        _.each (aspectDef, function (value, name) {
	        
	            if (aspectDef.hasOwnProperty (name) && _.isFunction (value)) {
	
	                var parsed       = fnNameExpr.parse (name)
	                var originalName = (parsed.name &&          parsed.name.decapitalized) || name
	                var bindTool     = (parsed.how  && _['on' + parsed.how .capitalized])  || _.intercept
	
	                if (bindTool) {
	
	                    tryBind (ofWhat,           originalName, bindTool, value)
	                    tryBind (ofWhat.prototype, originalName, bindTool, value) } } })
	
	        if (ofWhat.aspectAdded) {
	            ofWhat.aspectAdded (aspectDef) }
	
	        return aspectDef }
	
	}) ()

/***/ },
/* 31 */
/***/ function(module, exports) {

	/*  Promise-centric extensions (WIP) /// TODO: REFACTOR
	    ======================================================================== */
	
	_.tests['Promise+'] = {
	
	/*  ------------------------------------------------------------------------ */
	
	    promisify: function () {
	
	    /*  Example object  */
	
	        var fs = {
	
	        /*  Shouldn't be converted  */
	
	            42: 42,
	            dontTouchMe:  function () { $assert (arguments.length === 0); return 42 },
	            dontTouchMe2: function () { $assert (arguments.length === 0); return 42 },
	            readFileSync: function () { $assert (arguments.length === 0); return 42 },
	
	        /*  Will be promisified */
	
	            readFile: function (path,   callback) { $assert (this === fs)
	                            if (path) { callback (null, 'contents of ' + path) }
	                                 else { callback ('path empty') } } }
	
	    /*  Run     */
	
	        fsAsync = Function.promisifyAll (fs, { except: _.endsWith.$$ ('Sync').or (['dontTouchMe', 'dontTouchMe2'].asSet.matches) })
	
	    /*  Check if 'except' worked successfully */
	
	        $assert (fsAsync.dontTouchMe (),
	                 fsAsync.dontTouchMe2 (),
	                 fsAsync.readFileSync (), fsAsync['42'], 42)
	
	    /*  Check if 'readFile' converted successfully */
	
	        return __.all ([    fsAsync.readFile (null) .assertRejected ('path empty'),
	                            fsAsync.readFile ('foo').assert         ('contents of foo') ]) },
	
	
	/*  ------------------------------------------------------------------------ */
	
	    __: function () { var adds = function (a, b) {
	                                    return function (x, y) { return [x + a, y + b] } }
	        return [
	            __(123).assert (123),
	            __(Promise.resolve (123)).assert (123),
	            __(function () { return 123 }).assert (123),
	            __(function () { throw 123 }).assertRejected (123),
	            __(adds ('foo', 'bar'), 123, 456).assert (['123foo', '456bar']) ] },
	
	    first: function () {
	            return [
	                Promise.firstResolved ([Promise.reject (123), Promise.resolve (456)]).assert (456),
	                Promise.firstResolved ([Promise.reject (123), Promise.reject  (456)]).assertRejected (null),
	                Promise.firstResolved ([])                                           .assertRejected (null) ] },
	
	/*  ------------------------------------------------------------------------ */
	
	    all: function () {
	            return [
	                __.all ([                 123,                   456 ]).assert ([123, 456]),
	                __.all ([     _.constant (123),      _.constant (456)]).assert ([123, 456]),
	                __.all ([Promise.resolve (123), Promise.resolve (456)]).assert ([123, 456]) ] },
	
	/*  ------------------------------------------------------------------------ */
	
	    seq: function () {  $assert (__.seq (123), 123)
	                        $assert (__.seq ([123, 333]), 333)
	                        $assert (__.seq ([123, _.constant (333)]), 333)
	
	                        return [
	                            __.seq ([Promise.resolve (123), Promise.resolve (333)]).assert (333),
	                            __.seq ([123, __.constant (333)]).assert (333),
	                            __.seq ([123, __.rejects ('foo')]).assertRejected ('foo'),
	                            __.seq ([123, __.delays (0), _.appends ('bar')]).assert ('123bar')
	                        ] },
	
	/*  ------------------------------------------------------------------------ */
	
	    map: function () {
	            return [
	                        __.map (       111 ,   _.appends ('bar')).assert (       '111bar'),
	                        __.map (      [222],   _.appends ('bar')).assert (      ['222bar']),
	                        __.map (    __(333),   _.appends ('bar')).assert (       '333bar'),
	                        __.map ({ foo: 444 },  _.appends ('bar')).assert ({ foo: '444bar' }),
	                        __.map ({ foo: 555 }, __.constant ('bar')).assert ({ foo: 'bar' }),
	
	                        __.map (['a','b','c','d','e'],
	                            function (x,i) { return Promise.resolve ([i,x]).delay (10 - i) })
	                                .assert ([[0,'a'], [1,'b'], [2,'c'], [3,'d'], [4,'e']]) ] },
	
	/*  ------------------------------------------------------------------------ */
	
	    filter: function () {
	            return [
	                        __.filter (123, _.constant (456)).assert (456),
	                        __.filter (['foo', 456], _.isString).assert (['foo']),
	                        __.filter (['foo', 456], __.constant ('baz')).assert (['baz', 'baz']),
	                        __.filter ({ foo: 123, bar: '456' }, _.isNumber).assert ({ foo: 123 })
	                    ] },
	
	/*  ------------------------------------------------------------------------ */
	
	    each: function () {
	
	        var pairs = function (input) { var pairs = []
	                        return __.each (input, function (x, i) { pairs.push ([x, i]) })
	                                    .then (_.constant (pairs)) }
	
	        return [    pairs ()         .assert ([]),
	                    pairs (undefined).assert ([]),
	
	                    pairs (42).assert ([[42, undefined]]),
	                    
	                    pairs ([    42,    48]) .assert ([[42,  0],  [48,  1 ]]),
	                    pairs ({ 0: 42, 1: 48 }).assert ([[42, '0'], [48, '1']]),
	
	                    __.each ([1,2], function (x, i) {
	                                        if (i > 0) $fail // should stop at 0, due to rejection
	                                        return Promise.reject ('foo') }).assertRejected ('foo') ] }
	
	/*  END OF TESTS ----------------------------------------------------------- */
	
	}
	
	
	/*  IMPLEMENTATION
	    ======================================================================== */
	
	
	TimeoutError = $extends (Error, { message: 'timeout expired' })                                
	
	/*  ------------------------------------------------------------------------ */
	
	__ = Promise.eval = function (x) { var this_ = this,
	                                       args = _.rest (arguments)
	
	                        return ((x instanceof Promise)   ?  x :
	                               ((x instanceof Function)  ?  new Promise (function (resolve) { resolve (x.apply (this_, args)) }) : // @hide
	                                                                Promise.resolve (x))) }
	
	Promise.coerce = function (x) {
	                        return (x instanceof Promise) ? x : Promise.resolve (x) }
	
	/*  ------------------------------------------------------------------------ */
	
	__.noop = function () {
	            return Promise.resolve () }
	
	__.eternity = new Promise (function () {})
	
	__.identity = function (x) {
	                return Promise.resolve (x) }
	
	__.constant = function (x) {
	                return function () {
	                    return Promise.resolve (x) } }
	
	__.reject = function (e) { return Promise.reject (e) }
	__.rejects = function (e) { return function () { return Promise.reject (e) } }
	
	/*  ------------------------------------------------------------------------ */
	
	__.then = function (a, b) { b = _.coerceToFunction (b)
	                try {
	                    var x = (a instanceof Function) ? a () : a
	                    return  (x instanceof Promise)  ? x.then (b) : b (x) }
	                catch (e) {
	                    return Promise.reject (e) } }
	
	/*  ------------------------------------------------------------------------ */
	
	__.delay = function (ms) { return __.delays (ms) () }
	
	__.delays = function (ms) {
	                return function (x) {
	                    return new Promise (function (return_) { setTimeout (function () { return_ (x) }, ms || 0) }) } }
	
	$mixin (Promise, {
	    delay:              function (ms) { return this.then (__.delays (ms)) },
	    timeout:            function (ms) { return this.race (__.delay (ms).reject (new TimeoutError ())) },
	    now:     $property (function (  ) { return this.timeout (0) }) })
	
	
	/*  ------------------------------------------------------------------------ */
	
	$mixin (Array, {
	    
	    race: $property (function () { return Promise.race (this) }) })
	
	/*  ------------------------------------------------------------------------ */
	
	$mixin (Promise, {
	
	    race: function (other) { return [this, other].race },
	
	    firstResolved: $static (function (arr) {
	                        return new Promise (function (resolve, reject) { var todo = arr && arr.length
	                            if (!todo) {
	                                reject (null) }
	                            else {
	                                _.each (arr, function (x) {
	                                                Promise.coerce (x)
	                                                       .then (function (x) { todo--
	                                                                if (resolve) {
	                                                                    resolve (x)
	                                                                    resolve = undefined } })
	                                                       .catch (function () { todo--
	                                                            if (!todo) {
	                                                                reject (null) } }) }) } }) }),
	
	    reject: function (e) { return this.then (_.throwsError (e)) },
	
	    chain: function (fn) { return this.then (function (x) { fn (x); return x; }) },
	
	    done: function (fn) { return this.then (function (x) { fn (null, x); return x },
	                                            function (e) { fn (e, null); throw e }) },
	
	    finally: function (fn) { return this.then (function (x) { return fn (null, x) },
	                                               function (e) { return fn (e, null) }) },
	
	    /*state: $property (function () {
	                        return this.then (
	                            function (x) { return { state: 'fulfilled', fulfilled: true, value: x } },
	                            function (e) { return { state: 'rejected', rejected: true, value: x } }).now.catch (function () {
	                                           return { state: 'pending', pending: true } }) }),*/
	
	    log:   $property (function () { return this.then (log,       log.then (_.throwsError)) }),
	    alert: $property (function () { return this.done (alert2, alert2.then (_.throwsError)) }),
	    
	    panic: $property (function () { return this.catch (function (e) {
	
	                                                        if (_.globalUncaughtExceptionHandler) {
	                                                            _.globalUncaughtExceptionHandler (e) }
	
	                                                        throw e }) }),
	
	    assert: function (desired) {
	                return this.then (function (x) { $assert (x, desired); return x }) },
	
	    assertTypeMatches: function (desired) {
	                return this.then (function (x) { $assertTypeMatches (x, desired); return x }) },
	
	    assertRejected: function (desired) { var check = (arguments.length > 0)
	                        return this.catch (function (x) { if (check) { $assert (x, desired) } return x }) },
	
	})
	
	/*  ------------------------------------------------------------------------ */
	
	_.deferTest (['Promise+', '_.scatter with pooling'], function () {
	
	        var data = _.times (21, function (i) { return 'item_' + i })
	        var numItems = 0
	        var processedItems = []
	
	        var op = function (item, i) {
	                    numItems++
	                    $assert (!processedItems.contains (item))
	                    return __.delay (_.random (2))
	                             .then (function () {
	                                        processedItems.push (item)
	                                        return item }) }
	
	        return __.scatter (data, op, { maxConcurrency: 5 })
	                 .then (function () { $assert (_.difference (data, processedItems).isEmpty) }) },
	
	    /*  ------------------------------------------------------------------------ */
	
	    function () {
	
	        var TaskPool = $prototype ({
	
	            constructor: function (cfg) {
	                            
	                            this.maxTime        = cfg && cfg.maxTime
	                            this.pending        = []
	
	                            if (this.maxConcurrency = cfg && cfg.maxConcurrency) {
	                                this.numActive = 0
	                                this.queue     = [] } },
	
	            run: function (task) { var self = this
	
	                        if (this.numActive >= this.maxConcurrency) { // queue task
	
	                            return new Promise (function (resolve) {
	                                                    self.queue.push (function () {
	                                                                        return self.run  (task)
	                                                                                   .then (resolve) }) }) }
	                        else { // execute task
	
	                            var p = __(task)
	
	                            if (this.maxTime !== undefined) {
	                                p = p.timeout (this.maxTime) }
	
	                            if (this.maxConcurrency !== undefined) { // if queueing, wait until complete and pop next task
	
	                                                           self.numActive++
	                                p = p.then (function (x) { self.numActive--
	
	                                                   return (self.queue.length &&
	                                                          (self.numActive < self.maxConcurrency))
	                                                                          ? self.queue.shift () ().then (_.constant (x))
	                                                                          : x }) }
	                            this.pending.push (p)
	
	                            return p } },
	
	
	            all: $property (function () {
	                                return Promise.all (this.pending) }) })
	
	    /*  ------------------------------------------------------------------------ */
	
	        __.scatter = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {
	
	                    return __.then (x, function (x) {
	
	                        if (_.isStrictlyObject (x)) {
	
	                            var result = _.coerceToEmpty (x),
	                                tasks  = new TaskPool (cfg)
	
	                            _.each2 (x, function (v, k) {
	                                            tasks.run (fn.$ (v, k, x)).then (
	                                                                        function (vk) {
	                                                                            if (vk) {
	                                                                                result[vk[1]] = vk[0] } }) })
	                            return tasks.all.then (_.constant (result)) }
	
	                        else {
	                            return __(fn, x, undefined, x).then (function (vk) { return vk[0] }) } }) }
	})
	
	/*  ------------------------------------------------------------------------ */
	
	__.map = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {
	            return __.scatter (x, function (v, k, x) {
	                return __.then (fn.$ (v, k, x), function (x) { return [x, k] }) }, cfg) }
	
	__.filter = function (x, fn, cfg /* { maxConcurrency, maxTime } */) {
	                return __.scatter (x, function (v, k, x) {
	                                        return __.then (fn.$ (v, k, x),
	                                            function (decision) {
	                                                return ((decision === false) ? undefined :
	                                                       ((decision === true)  ? [v, k]
	                                                                             : [decision, k])) }) }, cfg) }
	__.each = function (obj, fn) {
	                return __.then (obj, function (obj) {
	                    return new Promise (function (complete, whoops) {
	                                        _.cps.each (obj, function (x, i, then) {
	                                                            Promise.coerce (fn (x, i))
	                                                                   .then (then)
	                                                                   .catch (whoops) }, complete) }) }) }
	
	__.seq = function (arr) {
	            return _.reduce2 (arr, __.then) }
	
	__.all = function (arr) {
	            return Promise.all (_.map (arr, __)) }
	
	__.race = function (arr) {
	            return Promise.race (_.map (arr, __)) }
	
	/*  ------------------------------------------------------------------------ */
	
	$mixin (Function, {
	    
	    promisifyAll: $static (function (obj, cfg) { var cfg    = cfg || {},
	                                                     except = cfg.except || _.noop
	
	                                if (except instanceof Array) {
	                                    except = except.asSet.matches }
	
	                                var result = {}
	
	                                for (var k in obj) {
	                                    var x = obj[k]
	                                    if (x instanceof Function) {
	                                        var fn = x.bind (obj)
	                                        result[k] = except (k) ? fn : fn.promisify }
	                                    else {
	                                        result[k] = x } }
	
	                                return result }),
	
	    promisify: $hidden ($property (
	                            function () {            var f    = this
	                                return function () { var self = this, args = arguments
	                                    return new Promise (function (resolve, reject) {
	                                        f.apply (self, _.asArray (args).concat (function (err, what) {
	                                                                                      if (err) { reject (err) }
	                                                                                                 resolve (what) })) }) } })) })
	


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	/*  ------------------------------------------------------------------------ */
	
	_.tests['Channel'] = {
	
	    'is promise': () => {
	
	        $assert ((new Channel ()) instanceof Promise) },
	
	    'resolve from constructor + then + chanining': done => {
	
	        new Channel (resolve => { resolve (123) })
	                .then (x => { $assert (x, 123); return 456 }, () => { $fail })
	                .then (y => { $assert (y, 456); done () })
	    },
	
	    'reject from constructor': done => {
	
	        new Channel ((resolve, reject) => { reject (123) })
	                .then (() => { $fail },
	                        x => { $assert (x, 123); done () })
	    },
	
	    'throw from constructor + .catch + chanining': done => {
	
	        new Channel ((resolve, reject) => { throw 'foo' })
	                .then (() => { $fail })
	                .catch (x => { $assert (x, 'foo'); return 'bar' })
	                .then (y => { $assert (y, 'bar'); done () },
	                      () => { $fail })
	    },
	
	    'throw from .then': done => {
	
	        new Channel (123)
	                .then (x => { throw x + 1 })
	                .catch (x => { $assert (x, 124); done () })
	    },
	
	    'pending state': () => { $assert ('pending', new Channel ().then (() => $fail).state) },
	
	    'new Channel (const)': () => (new Channel (123)).assert (123),
	
	    'recognized by tests as Promise': () => Channel.resolve (123).assert (123),
	
	    'accepted by Promise.all': () => Promise.all ([
	                                        Channel.resolve (123).assert (123),
	                                        Channel.reject (456).assertRejected (456) ]).assert ([123, 456]),
	
	
	    'returning channel from then + .resolve': () => {
	
	        var x = Channel.resolve (123),
	            y = undefined,
	            calls = []
	
	            x.then (() => (y = new Channel (456)))
	             .then (x => calls.push (x)) // should call twice, with 456 and 789 (later)
	
	        y.resolve (789)
	
	        $assert (calls, [456, 789])
	    },
	
	    '$channel for $prototype': () => {
	
	        var Model = $prototype ({
	
	            numPersons: $channel ()
	        })
	
	        var View = $prototype ({
	
	            label: $channel ()
	        })
	
	    /*  $channel tag creates a readwrite property with same name,
	        but it should keep $channel tag in meta-information (for reflection purposes)   */
	
	        $assert ($channel.is (Model.$definition.numPersons))
	
	    /*  Should be configurable from constructor params  */
	
	        var model = new Model ({ numPersons: 10 }),
	            view  = new View ()
	
	        $assert (model.numPersons.value, 10)
	        $assert (view.label.state, 'pending')
	
	    /*  This is not a simple by-reference assignment, but a channel binding   */
	
	        view.label = model.numPersons.then (x => x + ' persons')
	
	        $assert (view.label !== model.numPersons)
	        $assert (view.label.value, '10 persons')
	
	    /*  Assignment to a non-promise should update value    */
	
	        model.numPersons = 11
	        
	        $assert (view.label.value, '11 persons')
	    },
	
	    '$channel(const)': () => {
	
	        $assert ($singleton ({ count: $channel (7) }).count.value, 7)
	    },
	
	    'resolve/reject returns this': () => {
	
	        $assert (Channel.resolve (123).resolve (555).resolve (666).value, 666) },
	
	    /*'proxy shit works': () => {
	
	        var Channel = class extends Function {
	
	            constructor (fn, transducers, before) {
	
	                super ()
	
	                this.after = []
	                this.state = 'pending'
	                this.value = undefined
	                this.transducers = {
	                        resolve: (transducers && transducers.resolve) || (x => x),
	                        reject:  (transducers && transducers.reject)  || (e => { throw e }) }
	
	                if (fn instanceof Function) {
	                    try {
	                        fn.call (this,
	                            this.resolve.bind (this),
	                            this.reject.bind (this)) }
	
	                    catch (e) {
	                        this.reject (e) } }
	
	                else if (fn !== undefined) {
	                    this.resolve (fn) } }
	
	            _resolve (x) {
	                        this.state = 'resolved'
	                        this.value = x
	                        this.after.forEach (c => c.resolve (x)) }
	
	            _reject (e) {
	                        this.state = 'rejected'
	                        this.value = e
	                        this.after.forEach (c => c.reject (e)) }
	
	            resolve (x, transducer) {
	
	                        try {
	                            x = (transducer || this.transducers.resolve) (x)
	
	                            if (x instanceof Promise) {
	                                x.then (
	                                    x => this._resolve (x),
	                                    e => this._reject (e)) }
	
	                            else {
	                                this._resolve (x) } }
	                                
	                        catch (e) {
	                            this._reject (e) }
	
	                        return this }
	
	            reject (e) {
	                        return this.resolve (e, this.transducers.reject) }
	
	            then (resolve, reject) {
	
	                    var c = new Channel (undefined, { resolve: resolve, reject: reject }, this)
	
	                    this.after.push (c)
	
	                    if (this.state === 'resolved') {
	                        c.resolve (this.value) }
	
	                    else if (this.state === 'rejected') {
	                        c.reject (this.value) }
	
	                    return c }
	
	            catch (fn) {
	                    
	                    return this.then (undefined, fn) } }
	
	        var props = {}
	
	        for (var key of Object.keys(Promise.prototype)) {
	            if (!Channel.prototype.hasOwnProperty (key)) {
	                props[key] = Object.getOwnPropertyDescriptor (Promise.prototype, key) } }
	
	        Object.defineProperties (Channel.prototype, props);
	
	        Channel = new Proxy (Channel, {
	
	            construct: function (OriginalChannel, args, newTarget) {
	               
	               var proxy = new Proxy (new OriginalChannel (args[0], args[1], args[2]), {
	                    
	                    apply: function (chan, thisArg, args) {
	
	                        if (args[0] instanceof Function) {
	                            return chan.then.apply (chan, args) }
	                        else {
	                            chan.resolve.apply (chan, args)
	                            return proxy } },
	
	                    getPrototypeOf: function () {
	                        return Promise.prototype } })
	
	                return proxy } })
	
	        var foo = new Channel (7)
	
	        $assert (foo instanceof Promise) // is Promise
	        $assert (foo (5).value, 5)       // is Function
	
	        $assert (foo.delay, Promise.prototype.delay)
	
	        return Promise.all ([foo, Promise.resolve (10)]).then (function (x) {
	            $assert (x, [5, 10]) })
	    },*/
	}
	
	/*  ------------------------------------------------------------------------ */
	
	$global.Channel = $extends (Promise, {
	
	    constructor: function (fn, transducers, before) {
	
	        this.after = []
	        this.state = 'pending'
	        this.value = undefined
	        this.transducers = {
	                resolve: (transducers && transducers.resolve) || (x => x),
	                reject:  (transducers && transducers.reject)  || (e => { throw e }) }
	
	        if (fn instanceof Function) {
	            try {
	                fn.call (this,
	                    this.$ (this.resolve),
	                    this.$ (this.reject)) }
	
	            catch (e) {
	                this.reject (e) } }
	
	        else if (fn !== undefined) {
	            this.resolve (fn) } },
	
	    _resolve: function (x) {
	                this.state = 'resolved'
	                this.value = x
	                this.after.forEach (c => c.resolve (x)) },
	
	    _reject: function (e) {
	                this.state = 'rejected'
	                this.value = e
	                this.after.forEach (c => c.reject (e)) },
	
	    resolve: function (x, transducer) {
	
	                try {
	                    x = (transducer || this.transducers.resolve) (x)
	
	                    if (x instanceof Promise) {
	                        x.then (
	                            x => this._resolve (x),
	                            e => this._reject (e)) }
	
	                    else {
	                        this._resolve (x) } }
	                        
	                catch (e) {
	                    this._reject (e) }
	
	                return this },
	
	    reject: function (e) {
	                return this.resolve (e, this.transducers.reject) },
	
	    then: function (resolve, reject) {
	
	            var c = new Channel (undefined, { resolve: resolve, reject: reject }, this)
	
	            this.after.push (c)
	
	            if (this.state === 'resolved') {
	                c.resolve (this.value) }
	
	            else if (this.state === 'rejected') {
	                c.reject (this.value) }
	
	            return c },
	
	    catch: function (fn) {
	            
	            return this.then (undefined, fn) }
	})
	
	/*  ------------------------------------------------------------------------ */
	
	Channel.all = arr => new Channel (resolve => {
	
	                                    var complete = new Set (),
	                                        value = new Array (arr.length)
	
	                                    arr.forEach ((c, i) => {
	
	                                        c.then (x => { value[i] = x
	                                            
	                                            if (complete.length === value.length) {
	                                                resolve (value) }
	                                            else {
	                                                complete.add (i) } }) }) })
	
	/*  ------------------------------------------------------------------------ */
	
	Channel.resolve = x => new Channel ( resolve          => resolve (x))
	Channel.reject  = e => new Channel ((resolve, reject) => reject  (e))
	
	/*  ------------------------------------------------------------------------ */
	
	$prototype.macroTag ('channel', (def, value, name) => {
	
	    var memberName = '_' + name
	    var initialValue = $untag (value)
	
	    def[name] = Tags.modify (value, () => $property ({
	
	        get: function () {
	                return this[memberName] ||
	                      (this[memberName] = new Channel (initialValue)) },
	
	        set: function (x) {
	                this[name].resolve (x) }
	    }))
	})
	
	/*  ------------------------------------------------------------------------ */
	
	


/***/ },
/* 33 */
/***/ function(module, exports) {

	/*  Promise-based HTTP protocol API (cross-platform)
	    ======================================================================== */
	
	Http = $singleton (Component, {
	
	    /*  You can re-use the HttpMethods trait to build API-specific layers over Http
	     */
	
	    $traits: [HttpMethods = $trait ({
	
	                                get: function (path, cfg) {
	                                            return this.request ('GET',  path, cfg) },
	
	                                post: function (path, cfg) {
	                                            return this.request ('POST', path, cfg) },
	
	                                loadFile: function (path, cfg) {
	                                            return this.request ('GET', path, { responseType: 'arraybuffer' }) },
	
	                                uploadFile: function (path, file, cfg) {
	                                                return this.post (path, _.extend2 ({
	                                                    data: file,
	                                                    headers: {
	                                                        'Content-Type': 'binary/octet-stream',
	                                                        'X-File-Name': Parse.fileName (file.name || 'file').transliterate || 'file',
	                                                        'X-File-Size': file.size,
	                                                        'X-File-Type': file.type } }, cfg)) } }) ],
	
	    /*  Impl
	     */
	
	    request: function (type, path, cfg_) { var cfg = cfg_ || {}
	                                           
	                /*  Reference to the abort method (will be initialized at Promise construction)
	                 */
	                var abort = undefined
	
	                /*  returned Promise
	                 */
	                var p = new Promise (function (resolve, reject) {
	
	                    if ($platform.Browser) {
	
	                        var prePath = (cfg.protocol || cfg.hostname || cfg.port) ?
	                                     ((cfg.protocol || window.location.protocol) + '//' +
	                                      (cfg.hostname || window.location.hostname) + ':' +
	                                      (cfg.port     || window.location.port)) : ''
	
	                        /*  Init XMLHttpRequest
	                         */
	                        var xhr = new XMLHttpRequest ()
	                            xhr.open (type, prePath + path, true)
	
	                        /*  Set to 'arraybuffer' to receive binary data
	                         */
	                        if (cfg.responseType)
	                            xhr.responseType = cfg.responseType
	
	                        /*  Set headers
	                         */
	                        _.each (cfg.headers, function (value, key) {
	                            xhr.setRequestHeader (key, value) })
	
	                        /*  Bind events
	                         */
	                        if (cfg.progress) {
	                            xhr.onprogress = Http.progressCallbackWithSimulation (cfg.progress) }
	
	                            xhr.onreadystatechange = function () {
	
	                                if (xhr.readyState === 4) {
	                                    if (cfg.progress) {
	                                        cfg.progress (1) }
	
	                                    var response = (xhr.responseType === 'arraybuffer')
	                                                        ? xhr.response
	                                                        : xhr.responseText
	
	                                    if (xhr.status === 200) { resolve (response) }
	                                                       else { reject  (_.extend (new Error (xhr.statusText), {
	                                                                                        httpResponse: response,
	                                                                                        httpStatus: xhr.status })) } } }
	                        /*  Set up the abort method
	                         */
	                        abort = function () {
	                                    xhr.abort ()
	                                    reject ('aborted') }
	
	                        /*  Send
	                         */
	                        if (cfg.data) { xhr.send (cfg.data) }
	                                 else { xhr.send () } }
	
	                    else {
	                        reject ('not implemented') } })
	
	                /*  Add abort method to the returned Promise
	                 */
	                return _.extend (p, { abort: abort }) },
	
	    progressCallbackWithSimulation: function (progress) { var simulated = 0
	                                                        progress (0)
	        return function (e) { if (e.lengthComputable) { progress (e.loaded / e.total) }
	                                                 else { progress (simulated = ((simulated += 0.1) > 1) ? 0 : simulated) } } },
	})
	
	/*  An example of custom API layer over Http:
	
	    1.  Converts request I/O to JSON
	    2.  Interprets { success: true/false, value: ... } semantics
	    3.  Adds cross-machine exception throwing
	    
	    ------------------------------------------------------------------------ */
	
	JSONAPI = $singleton (Component, {
	
	    $traits: [HttpMethods],
	
	    request: function (type, path, cfg) {
	
	                var cfg = _.extend2 ({ headers: {
	                                            'Cache-Control': 'no-cache',
	                                            'Content-Type' : 'application/json; charset=utf-8' } }, cfg)
	
	                if (cfg.what) {
	                    cfg.data = JSON.stringify (cfg.what) }
	
	                var stackBeforeCall = _.hasReflection && $callStack.offset ((cfg.stackOffset || 0) + 1).asArray
	
	                return Http
	                        .request (type, '/api/' + path, cfg)
	                        .finally (function (e, response) {
	
	                            if (response) {
	                                return JSON.parse (response) }
	
	                            else if (e) {
	                                if (e.httpResponse) {
	                                    return JSON.parse (e.httpResponse) }
	                                else {
	                                    throw e } }
	
	                            else {
	                                throw new Error ('empty response') } })
	
	                        .then (function (response) {
	                            if (response.success) {
	                                return response.value }
	                            else {
	                                if (response.parsedStack) {
	                                    throw _.extend (new Error ('SERVER: ' + response.error), {
	                                                        remote: true,
	                                                        parsedStack: response.parsedStack.concat (stackBeforeCall || []) }) }
	                                else {
	                                    throw new Error (response.error) } } }) } })

/***/ },
/* 34 */
/***/ function(module, exports) {

	(function () { var is = function (tag) { return function () { return this.tagName === tag } }
	
	/*  Constructors
	    ======================================================================== */
	
	/*  N (tag)                                                                  */
	
	    N = function (tag, children) {
	            var n = document.createElement (tag.uppercase)
	                return children ? n.append (children) : n }
	
	/*  N.text                                                                   */
	
	    N.text = function (text) {
	                return document.createTextNode (text) }
	
	/*  N.span / N.div ...                                                       */
	
	    _.each (['br', 'p', 'div', 'em', 'a', 'b', 'i', 'u', 's', 'strong', 'span',
	             'sup', 'sub', 'button', 'iframe', 'pre', 'img', 'video', 'source',
	             'h1', 'h2', 'h3', 'h4', 'h5', 'textarea', 'input', 'style'],
	
	             function (tag) {
	
	                var TAG = tag.uppercase
	
	                _.defineProperty (N, tag, function () {
	                                            return document.createElement (TAG) }) })
	
	
	/*  Querying                                                                 */
	
	    N.all = document.querySelectorAll.bind (document)
	    N.one = document.querySelector.bind (document)
	
	
	/*  Node+
	    ======================================================================== */
	
	    $mixin (Node, {
	
	        $: $prototype.impl.$,    // brings this.$ semantics from $prototype
	
	        
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
	
	                isElement: function () { return (this.nodeType === Node.ELEMENT_NODE) },
	                isText:    function () { return (this.nodeType === Node.TEXT_NODE) },
	
	                isLinebreak: is ('BR'),
	                isDiv:       is ('DIV'),
	                isParagraph: is ('P'),
	                isHyperlink: is ('A'),
	
	                isAttachedToDocument: function () {
	                    return this.matchUpwards (_.equals (document.body)) ? true : false },
	
	                /*  TODO: make use of native .isContentEditable
	                 */
	                forbidsEditing: function () {
	                    return (this.nodeType === Node.ELEMENT_NODE) &&
	                           (this.getAttribute ('contenteditable') === 'false') } } },
	
	
	    /*  Up/outside means
	        ======================================================================== */
	
	        grandParentNode: $property (function () { return this.parentNode && this.parentNode.parentNode }),
	
	        isFirstInParent: $property (function () { return this.parentNode && (this.parentNode.firstChild === this) }),
	        isLastInParent:  $property (function () { return this.parentNode && (this.parentNode.lastChild  === this) }),
	
	        removeFromParent: $callableAsFreeFunction (function () { this.parentNode.removeChild (this); return this }),
	
	        outerLeftBoundaryIn: function (container) { var n = this
	            while (n.grandParentNode && (n.parentNode !== container) && n.isFirstInParent) { n = n.parentNode }
	            return n },
	
	        outerRightBoundaryIn: function (container) { var n = this
	            while (n.grandParentNode && (n.parentNode !== container) && n.isLastInParent) { n = n.parentNode }
	            return n },
	
	        matchUpwards: function (pred) { var n = this
	                   while (n && !pred (n)) { n = n.parentNode }
	                                     return n },
	
	        isLeftmostNodeIn: function (parent) {
	                             return parent && ((this.matchUpwards (function (n) {
	                                                                     return (n === parent) ||
	                                                                            !n.isFirstInParent })) === parent) },
	
	        isRightmostNodeIn: function (parent) {
	                             return parent && ((this.matchUpwards (function (n) {
	                                                                     return (n === parent) ||
	                                                                            !n.isLastInParent })) === parent) },
	
	    /*  Down/inside means
	        ======================================================================== */
	
	        hasChildren: $property (function () { return   this.hasChildNodes () }),
	        noChildren:  $property (function () { return !(this.hasChildNodes ()) }),
	        numChildren: $property (function () { return   this.childNodes.length }),
	
	        length: $property (function () { return (this.childNodes ? this.childNodes.length :
	                                                (this.nodeValue  ? this.nodeValue .length  : 0)) }),
	
	        /*  If you modify childNodes while iterating it, you'll get into problem.
	            Use following method to safely do so.
	         */
	        safeEnumChildren: function (fn, context) {
	                                _.each (this.childNodesArray, fn, context || this); return this },
	
	        /*  childNodes is not really an array, so to get Array instance, use this helper
	         */
	        childNodesArray: $property (function () {
	                                        return _.asArray (this.childNodes) }),
	
	        add:    $alias ('appendChildren'),
	        append: $alias ('appendChildren'),
	
	        appendChildren: function (arg1, arg2) {
	                            for (var arr = (arg2 === undefined ? _.coerceToArray (arg1) : arguments), i = 0, len = arr.length; i < len; i++) {
	                                var n = arr[i]
	                                this.appendChild (_.isString (n) ? document.createTextNode (n) : n) }
	                            return this },
	
	        removeChildren: function (nodes) {
	                            for (var arr = _.coerceToArray (nodes), i = 0, len = arr.length; i < len; i++) {
	                                this.removeChild (arr[i]) }
	                            return this },
	
	        removeAllChildren: function () {
	                                return this.removeChildren (this.childNodesArray) },
	
	        walkTree: function (cfg, accept) { accept = (arguments.length === 1) ? cfg : accept
	
	                    var walker = document.createTreeWalker (this,   (cfg && cfg.what) || NodeFilter.SHOW_ALL,
	                                                                    (cfg && cfg.filter) || null,
	                                                                    (cfg && cfg.entityReferenceExpansion) || null)
	
	                    while ((node = walker.nextNode ())) { accept (node) } },
	
	        firstInnermostChild: $callableAsMethod ($property (function (n) { while (n && n.firstChild) { n = n.firstChild } return n })),
	
	        /*  foo<b>123</b>bar    →   <b>.unwrapChildren  →   foo123bar
	         */
	        unwrapChildren: $callableAsFreeFunction (function () {      this.insertAfterMe (this.childNodesArray)
	                                                       var parent = this.parentNode
	                                                           parent.removeChild (this)
	                                                    return parent }),
	
	    /*  Sideways means
	        ======================================================================== */
	
	        prevSiblings: $property (function ()  { var r = [],     n = this.previousSibling
	                                    while (n) {     r.push (n); n =    n.previousSibling } return r.reversed }),
	
	        nextNextSibling: $property (function () {
	            return (this.nextSibling && this.nextSibling.nextSibling) }),
	
	        nextOutermostSibling: $callableAsMethod ($property (function ( n) {
	                                                                while (n && !n.nextSibling) { n = n.parentNode  } // walk upwards until has next sibling
	                                                                   if (n)                   { n = n.nextSibling } // take next sibling
	                                                                return n })),
	
	        nextInnermostSibling: $callableAsMethod ($property (function (n) {
	                                                                return Node.firstInnermostChild (
	                                                                        Node.nextOutermostSibling (this)) })),
	
	        appendTo: function (ref) {
	            ref.appendChild (this); return this },
	
	        prependTo: function (ref) {
	            ref.insertBefore (this, ref.firstChild); return this },
	
	        replaceWith: function (what) { this.insertBeforeMe (what).removeFromParent () },
	
	        insertMeBefore: function (ref) {
	            ref.parentNode.insertBefore (this, ref); return this },
	
	        insertMeAfter: function (ref) {
	            ref.parentNode.insertBefore (this, ref.nextSibling); return this },
	
	        insertBeforeMe: function (nodes) { var parent = this.parentNode
	                                           var me     = this
	
	            _.each (_.coerceToArray (nodes).reversed, function (n) { parent.insertBefore (n, me) }); return this },
	
	        insertAfterMe: function (nodes) { var parent = this.parentNode
	                                          var next   = this.nextSibling
	
	            _.each (_.coerceToArray (nodes).reversed, function (n) { parent.insertBefore (n, next) }); return this },
	
	
	    /*  Events
	        ======================================================================== */
	
	        on:   function (e, fn) { this.addEventListener (e, fn); return this },
	        once: function (e) {
	                    var node = this, finalize, finalized = false
	                    var p = new Promise (function (resolve) {
	                                            node.addEventListener (e, finalize =
	                                                function (e) {
	                                                    if (!finalized) {
	                                                        finalized = true
	                                                        node.removeEventListener (e, finalize)
	                                                        resolve (e) } }) })
	                    p.finalize = finalize
	                    return p },
	
	        touched: function (fn) {
	                    return this.on ($platform.touch ? 'touchstart' : 'click', fn) },
	
	    /*  Properties
	        ======================================================================== */
	
	        extend: function (props) { return _.extend (this, props) },
	
	
	    /*  Attributes
	        ======================================================================== */
	
	        cls: function (x) { this.className = x; return this },
	        css: function (x) { _.extend (this.style, x); return this; },
	
	        hasClass: function (x) { return (this.className || '').split (' ').contains (x) },
	
	        toggleAttribute: function (name, value) { var arg1 = arguments.length < 2
	
	                                    if (arg1) {
	                                        value = !this.hasAttribute (name) }
	
	                                     if (value) { this.setAttribute    (name, value) }
	                                           else { this.removeAttribute (name) }
	
	                                    return arg1 ? value : this },
	
	        toggleAttributes: function (cfg) { _.map (cfg, _.flip2 (this.toggleAttribute), this); return this },
	        setAttributes:    function (cfg) { _.map (cfg, _.flip2 (this.setAttribute),    this); return this },
	
	        intAttribute: function (name) { return (this.getAttribute (name) || '').parsedInt },
	
	        attr: $alias ('setAttributes'),
	
	        removeAttr: function (name) { this.removeAttribute (name); return this },
	
	
	    /*  Splitting
	        ======================================================================== */
	
	        splitSubtreeBefore: function (node) { // returns right (remaining) subtree
	            if (!node || (node.parentNode === this)) {
	                return node }
	            else {
	                return this.splitSubtreeBefore (
	                                    !node.previousSibling // if first node in parent, nothing to split – simply proceed to parent
	                                        ? node.parentNode
	                                        : document.createElement  (node.parentNode.tagName)
	                                                  .insertMeBefore (node.parentNode)
	                                                  .appendChildren (node.prevSiblings)
	                                                  .nextSibling) } },
	
	        splitSubtreeAt: function (location) { var n = location.node, i = location.offset
	            return (i > 0) ? (location.node.isText ?
	                                this.splitSubtreeBefore (N.text (n.nodeValue.substr (i)).insertMeAfter (_.extend (n, { nodeValue: n.nodeValue.substr (0, i) }))) :
	                                this.splitSubtreeBefore (n.childNodes[i])) :
	                                this.splitSubtreeBefore (n) },
	
	
	    /*  innerHTML/innerText
	        ======================================================================== */
	
	        html: function (x) { this.innerHTML = x; return this },
	        text: function (x) { this.innerText = x; return this },
	
	
	    /*  Animation
	        ======================================================================== */
	
	        attributeUntil: function (attr, promise) {
	                                                                     this.   setAttribute (attr, true)
	                      return promise.done (this.$ (function (e, x) { this.removeAttribute (attr) })) },
	
	        busyUntil: function (promise) { return this.attributeUntil ('busy', promise) },
	
	        onceAnimationEnd: $property (function () {
	            return this.once ($platform.WebKit ? 'webkitAnimationEnd' : 'animationend') }),
	
	        onceTransitionEnd: $property (function () {
	            return this.once ($platform.WebKit ? 'webkitTransitionEnd' : 'transitionend') }),
	
	        animateWithAttribute: function (attr) {
	
	        /*  If already animating with this attribute — return previously allocated promise    */
	
	            if (this.hasAttribute (attr) && this._onceAnimationEnd) {
	                return this._onceAnimationEnd }
	
	        /*  If already animating — finalize the existing promise */
	
	            if (this._onceAnimationEnd) {
	                this._onceAnimationEnd.finalize () }
	
	        /*  Allocate new promise    */
	
	            this.setAttribute (attr, true)
	
	            this._onceAnimationEnd = this.onceAnimationEnd
	
	            return this._onceAnimationEnd.then (this.$ (function () {
	                    this.removeAttribute (attr)
	                    this.getBoundingClientRect () // forces layout recalc, otherwise new animation (if set in callback) may not start
	                    this._onceAnimationEnd = undefined })) },
	
	        animatedWithAttribute: function (attr) {
	                                    this.animateWithAttribute (attr); return this },
	
	        //transitionWithAttribute: function (attr) { this.setAttribute (attr, true)
	        //     return this.onceTransitionEnd.then ( this.removeAttribute.bind (this, attr)).delay () }
	    })
	
	
	/*  ========================================================================= */
	
	    $mixin (Element, {
	
	    /*  Selectors   */
	
	        all: Element.prototype.querySelectorAll,
	        one: Element.prototype.querySelector,
	
	
	    /*  New Safari (as seen in technology preview) defines its own Element.append
	        method, which gets into conflict with our previously-defined Node.append
	        So will explicitly overrride it.    */
	
	        append: Node.prototype.append,
	
	
	    /*  Metrics
	        ======================================================================== */
	
	        clientBBox: $property (function () { return BBox.fromLTWH (this.getBoundingClientRect ()) }),
	              bbox: $property (function () { return this.clientBBox.offset (document.bbox.leftTop) }),
	
	        setWidthHeight: function (v) {
	                            this.style.width = v.x + 'px'
	                            this.style.height = v.y + 'px'
	                            return this },
	
	        setTransform: function (x) { this.transform = x; return this },
	
	        transform: $property ({
	
	            get: function () {
	                    var components = (this.css ('transform') || '').match (/^matrix\((.+\))$/)
	                    if (components) {
	                        var m = components[1].split (',').map (parseFloat)
	                        return new Transform ({ a: m[0], b: m[1], c: m[2], d: m[3], e: m[4], f: m[5] }) }
	                    else {
	                        return Transform.identity } },
	
	            /*  Example value: { translate: new Vec2 (a, b),  scale: new Vec2 (x, y), rotate: 180 }
	             */
	            set: function (cfg) {
	                this.style.transform = (_.isStrictlyObject (cfg) && (
	                                            (cfg.translate ? ('translate(' + cfg.translate.x + 'px,' + cfg.translate.y + 'px) ') : '') +
	                                            (cfg.rotate ? ('rotate(' + cfg.rotate + 'rad) ') : '') +
	                                            (cfg.scale ? ('scale(' + (new Vec2 (cfg.scale).separatedWith (',')) + ')') : ''))) || '' } }),
	
	    /*  Experimental FRP stuff
	        ======================================================================== */
	
	        reads: function (stream, fn) { // DEPRECATED
	                    stream (this.$ (function (x) { x = (fn || _.identity).call (this, x)
	                        this.removeAllChildren ()
	                        this.add (x instanceof Node ? x : (x + '')) }))
	                    return this },
	
	        $toggleAttribute: function (name, value) {
	                                value (this.$ (function (value) { this.toggleAttribute (name, value) })); return this },
	
	        $add: function (nodes) { // TODO: make it default .add impl (but keep .appendChildren intact)
	
	                if (nodes instanceof Promise) {
	                    var placeholder = document.createElement ('PROMISE')
	                        this.appendChild (placeholder)
	                        nodes.then (function (nodes) {
	                            placeholder.replaceWith (nodes) }).panic }
	                else {
	                    this.add (nodes) }
	
	                return this }
	    })
	
	/*  ========================================================================= */
	
	    $mixin (HTMLInputElement, {
	
	        $value: $property (function () {
	
	                            if (!this._observableValue) {
	                                 this._observableValue = _.observable (this.value)
	                                 this._observableValue.context = this
	                                 this.on ('input', this.$ (function () {
	                                     this._observableValue (this.value) })) }
	
	                            return this._observableValue })
	
	    })
	
	/*  ========================================================================= */
	
	    $mixin (Image, {
	        
	        fetch: $static (function (url) {
	                            return new Promise (function (resolve, reject) {
	                                                _.extend (new Image (), {
	                                                                src: url,
	                                                             onload: function ()  { resolve (this) },
	                                                            onerror: function (e) { reject (e) } }) }) }) })
	
	
	/*  document.clientBBox
	    ======================================================================== */
	
	    _.defineProperties (document, {
	
	                            bbox: function () {
	                                    return this.clientBBox.offset (Vec2.y (document.body.scrollTop)) },
	                                    
	                            clientBBox: function () {
	                                            return BBox.fromLTWH (0, 0,
	                                                            window.innerWidth  || document.documentElement.clientWidth,
	                                                            window.innerHeight || document.documentElement.clientHeight) } })
	
	/*  document.ready
	    ======================================================================== */
	
	    document.on ('DOMContentLoaded', document.ready = _.barrier ())
	
	
	/*  ======================================================================== */
	
	_.tests.NodePlus = {
	
	    'tree splitting': function () {
	
	        Testosterone.defineAssertions ({
	            assertSplitAtBr: function (html, desiredResult) {   var node = N.div.html (html)
	                                                                    node.splitSubtreeBefore (node.one ('br'))
	                                                                    return _.assert (node.innerHTML, desiredResult) } })
	        $assertSplitAtBr ('<b><br>foo</b>', '<b><br>foo</b>')
	        $assertSplitAtBr ('<b>foo<br></b>', '<b>foo</b><b><br></b>')
	        $assertSplitAtBr ('<b>foo<i>bar<br>baz</i>qux</b>', '<b>foo<i>bar</i></b>' + '<b><i><br>baz</i>qux</b>') },
	
	    /*'animateWithAttribute': function () {
	
	        var style =
	
	            N.style.text (
	                '@keyframes slide-to-right {' +
	                    '0%   { transform: translate(0,0); opacity: 1; }' +
	                    '100% { transform: translate(100%,0); opacity: 0; } }' +
	
	                '[slide-to-right] { animation: slide-to-right 1s ease-in-out; }' +
	                '[slide-from-right] { animation: slide-to-right 1s ease-in-out; animation-direction: reverse; }'
	
	            ).appendTo (document.body)
	
	        var div =
	            N.div.css ({
	                position: 'fixed', left: '0px', top: '0px', width: '100px', height: '100px', background: 'red' }).appendTo (document.body)
	
	        div.animateWithAttribute ('slide-to-right').then (function () {
	            div.style.background = 'blue'
	            div.animateWithAttribute ('slide-from-right').then (function () {
	                div.style.background = 'green' }) })
	    }*/
	
	}
	
	/*  ======================================================================== */
	
	}) ()
	
	
	
	
	
	


/***/ },
/* 35 */
/***/ function(module, exports) {

	/*  How-to / spec / test
	    ============================================================================ */
	
	_.tests['DOMReference + DOMEvents'] = {
	
	    'DOMReference + DOMEvents basics': function () {
	
	        $assertEveryCalled (function (changeCalled, reactToFocusEventsCalled, reactToWindowResizeCalled, domReadyCalled) {
	
	            /*  Example component that owns a DOM reference and listens to events
	                ---------------------------------------------------------------- */
	
	            var textarea = new ($component ({
	
	                $traits: [DOMReference,
	                          DOMEvents],
	
	            /*  That's how you initialize DOMReference using $barrier (see the big
	                comment below for the example on how to access the stored reference,
	                and why/when you will need that domReady thing).
	                ---------------------------------------------------------------- */
	
	                init: function () { this.domReady (
	                                            N.textarea
	                                             .insertMeAfter (document.body.lastChild)) },
	
	            /*  That's how you bind to events (simplest way)
	                ---------------------------------------------------------------- */
	
	                change: $on (function (e) { changeCalled () }),
	
	            /*  Binding with custom method name
	                ---------------------------------------------------------------- */
	
	                shouldNotCall: $on ('input', function () { $fail }),
	
	            /*  Multiple events
	                ---------------------------------------------------------------- */
	
	                reactToFocusEvents: $on ('focus blur', function (e) { reactToFocusEventsCalled () }),
	
	            /*  Binding to 'window' or 'document' events
	                ---------------------------------------------------------------- */
	
	                reactToWindowResize: $on ({ what: 'resize', target: window }, function () { reactToWindowResizeCalled () }) })) ()
	
	
	        /*  That's how you access DOM if you're 100% sure it's initialized
	            -------------------------------------------------------------------- */
	
	            var dom    = textarea.dom
	                $assert (textarea.dom instanceof Node)
	
	
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
	
	            textarea.domReady (function (dom) { $assert (dom instanceof Node); domReadyCalled () })
	
	
	        /*  That's how you dispatch events programmatically
	            TODO: configuration
	            -------------------------------------------------------------------- */
	
	            textarea.dispatchEvent ('change')
	            textarea.dispatchEvent ('blur')
	
	            /*  Dispatch window.resize
	             */
	                              var e = document.createEvent ('Event')
	                                  e.initEvent ('resize', true, true)
	            window.dispatchEvent (e)
	
	
	        /*  That's how you enumerate listeners bound with $on 
	            -------------------------------------------------------------------- */
	
	            $assert (textarea.constructor.DOMEventListeners,
	
	                     [{ e: 'change', fn: 'change' },
	                      { e: 'input',  fn: 'shouldNotCall' },
	                      { e: 'focus',  fn: 'reactToFocusEvents' },
	                      { e: 'blur',   fn: 'reactToFocusEvents' },
	                      { e: 'resize', fn: 'reactToWindowResize', target: window }])
	
	
	        /*  Deinitialization semantics
	            -------------------------------------------------------------------- */
	        
	            textarea.destroy ()
	
	            textarea.dispatchEvent ('input')    /*  destroy () removes event listeners, so our .shouldNotCall listener shouldn't get called */
	            $assert (!dom.isAttachedToDocument) /*  destroy () removes node from document */
	            $assert (textarea.dom, undefined)   /*  destroy () sets .dom to undefined     */ }) },
	
	
	/*  Listeners defined in traits are bound in order of appearance, so you can
	    utilize built-in e.stopImmediatePropagation () semantics for the flow control.
	    -------------------------------------------------------------------- */
	
	    'Blocking event propagation in $traits with e.stopImmediatePropagation': function () {
	
	        $assertEveryCalled (function (blockChangeEventCalled) {
	
	            var textarea = new ($component ({
	
	                    $traits: [DOMReference,
	                              DOMEvents,
	                              $trait ({ blockChangeEvent: $on ('change', function (e) { blockChangeEventCalled (); e.stopImmediatePropagation () }) }),
	                              $trait ({ shouldNotCall:    $on ('change', function (e) { $fail }) }) ],
	
	                    init: function () { this.domReady (
	                                            N.textarea.insertMeAfter (document.body.lastChild)) } })) ()
	
	                textarea.dispatchEvent ('change')
	                textarea.destroy () }) } }
	
	
	/*  Impl.
	    ======================================================================== */
	
	DOMReference = $trait ({
	
	        domReady: $barrier (function (dom) {
	                                 this.dom = dom
	                                 this.el = jQuery (this.dom) }),
	
	    afterDestroy: function () {  if (this.dom) {
	                                     this.dom.removeFromParent ()
	                                     this.dom = undefined
	                                     this.el  = undefined }
	                                 this.domReady.reset () } })
	
	/*  ======================================================================== */
	
	DOMReferenceWeak = $trait ({
	    
	    domReady: $barrier (function (dom) { this.dom = dom }),
	    afterDestroy:       function ()    { this.dom = undefined } })
	
	
	/*  ======================================================================== */
	
	DOMEvents = $trait ({
	
	    /*  TODO: configuration
	     */
	    dispatchEvent: function (type) {
	                        this.domReady (function (dom) { var e = document.createEvent ('Event')
	                                                            e.initEvent (type, true /* bubbles */, true /* cancellable */)
	                                         dom.dispatchEvent (e) }) },            
	    /*  $on syntax
	     */
	    $macroTags: {
	
	        on: function (def, method, methodName) {        var DOMEventListeners = (def.constructor.DOMEventListeners ||
	                                                                                (def.constructor.DOMEventListeners = []))
	                var on_def = method.$on
	                    on_def = (_.isString (on_def) ? { fn: methodName, e: on_def } :
	                             (_.isObject (on_def) ? { fn: methodName, e: on_def.what, target: on_def.target } :
	                                                    { fn: methodName, e: methodName }))
	
	                _.each (on_def.e.split (' '), function (e) { DOMEventListeners.push (_.defaults ({ e: e }, on_def)) }) } },
	
	    /*  Bindings
	     */
	    domReady: function (dom) {
	                _.each (this.constructor.DOMEventListeners, __supressErrorReporting = function (on_def) {
	                                                                (on_def.target || dom).addEventListener (
	                                                                                                on_def.e,
	                                                                                           this[on_def.fn]) }, this) },
	
	    beforeDestroy: function () {
	        this.domReady (function (dom) {
	                _.each (this.constructor.DOMEventListeners, __supressErrorReporting = function (on_def) {
	                                                                (on_def.target || dom).removeEventListener (
	                                                                                                on_def.e,
	                                                                                           this[on_def.fn]) }, this) }) } })
	
	/*  ======================================================================== */
	
	HideOnEscape = $trait ({
	
	    hideOnEscape: $on ({ what: 'keydown', target: document }, function (e) {
	                                                                if (e.keyCode === 27) {
	                                                                    this.destroy ()
	                                                                    e.preventDefault () } })
	})
	
	/*  ======================================================================== */
	
	


/***/ },
/* 36 */
/***/ function(module, exports) {

	/*  Animation tools
	 */
	
	InertialValue = $component ({
	
	    $defaults: { duration:  0.2,
	                 easing:   'linear' },
	
	    animating: $observableProperty (false),
	    target:    $observableProperty (/* scalar or vector */),
	    current:   $observableProperty (),
	
	    init: function (cfg) {
	
	        this.easing  = (_.isNumber (this.target) ? Easing.scalar : Easing.vector)[this.easing]
	
	        this.targetChange (function (value) {
	
	            if (this.animating === false) {
	                this.start     = this.value
	                this.current   = this.target = value
	                this.startTime = Date.now ()
	                this.step () }
	
	            else {
	                this.start      = this.current
	                this.startTime  = this.lastTime     } })  },
	
	    step: function () {
	
	        var now    = Date.now ()
	        var travel = Math.min (1.0, ((this.lastTime = now) - this.startTime) / (this.duration * 1000.0))
	        if (travel < 1.0) {
	
	             var animated  = this.easing (this.start, this.target, travel)
	            this.animating = true
	            this.current   = animated
	
	            window.requestAnimationFrame (this.step) }
	
	        else {
	            this.current   = this.target
	            this.animating = false          } } })
	
	
	/*  Easing functions (1D an 2D)
	 */
	
	Easing = {
	
	    scalar: {
	
	        linear: function (a, b, t) {
	            return a + (b - a) * t },
	
	        in: function (a, b, t) {
	            return a + (b - a) * Math.pow (t, 2) },
	
	        out: function (a, b, t) {
	            return b - (b - a) * Math.pow (1.0 - t, 2) },
	
	        inOut: function (a, b, t) {
	            var c = b - a
	            if (t < 0.5) {
	                return a + (c * (Math.pow (t * 2.0, 2) * 0.5)) }
	            else {
	                return b - (c * (Math.pow (2.0 - (t * 2.0), 2) * 0.5)) } } },
	
	    vector: {
	
	        linear: function (a, b, t) {
	            console.log (t)
	            return a.add (b.sub (a).scale (t)) },
	
	        inOut: function (a, b, t) { var c = b.sub (a)
	            if (t < 0.5) {
	                return a.add (c.scale (Math.pow (t * 2.0, 2) * 0.5)) }
	            else {
	                return b.sub (c.scale (Math.pow (2.0 - (t * 2.0), 2) * 0.5)) } },
	
	        in: function (a, b, t) {
	            return a.add (b.sub (a).scale (Math.pow (t, 2))) },
	
	        out: function (a, b, t) {
	            return b.sub (b.sub (a).scale (Math.pow (1.0 - t, 2))) } } }

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	String.ify = __webpack_require__ (38)
	
	__webpack_require__ (41)
	__webpack_require__ (42)
	__webpack_require__ (44)
	__webpack_require__ (45)
	__webpack_require__ (47)
	__webpack_require__ (48)
	__webpack_require__ (49)
	
	jQuery = __webpack_require__ (50)
	
	__webpack_require__ (51)
	
	__webpack_require__ (52)
	__webpack_require__ (53)
	__webpack_require__ (54)
	__webpack_require__ (58)
	
	/*  ======================================================================== */
	
	document.ready (function () {
		
		Panic.init ()
	
		CallStack.isThirdParty.intercept (function (file, originalImpl) {
		    return (file.indexOf ('underscore') >= 0) ||
		           (file.indexOf ('jquery') >= 0)     ||
		           (file.indexOf ('useless') >= 0)    ||
		           (file.indexOf ('mootools') >= 0) })
	})

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	const O          = __webpack_require__ (39),
	      bullet     = __webpack_require__ (13),
	      isBrowser  = (typeof window !== 'undefined') && (window.window === window) && window.navigator,
	      maxOf      = (arr, pick) => arr.reduce ((max, s) => Math.max (max, pick ? pick (s) : s), 0),
	      isInteger  = Number.isInteger || (value => (typeof value === 'number') && isFinite (value) && (Math.floor (value) === value))
	
	const configure = cfg => {
	const stringify = O.assign (x => {
	
	        const state = O.assign ({ parents: new Set (), siblings: new Map () }, cfg)
	
	        if (cfg.pretty === 'auto') {
	            const   oneLine =                         stringify.configure ({ pretty: false, siblings: new Map () }) (x)
	            return (oneLine.length <= 80) ? oneLine : stringify.configure ({ pretty: true,  siblings: new Map () }) (x) }
	
	        var customFormat = cfg.formatter && cfg.formatter (x, stringify)
	
	        if (typeof customFormat === 'string') {
	            return customFormat }
	
	        if ((typeof jQuery !== 'undefined') && (x instanceof jQuery)) {
	            x = x.toArray () }
	
	        if (isBrowser && (x === window)) {
	            return 'window' }
	
	        else if (!isBrowser && (typeof global !== 'undefined') && (x === global)) {
	            return 'global' }
	
	        else if (x === null) {
	            return 'null' }
	
	        else if (state.parents.has (x)) {
	            return state.pure ? undefined : '<cyclic>' }
	
	        else if (state.siblings.has (x)) {
	            return state.pure ? undefined : '<ref:' + state.siblings.get (x) + '>' }
	
	        else if (x && (typeof Symbol !== 'undefined')
	                   && (customFormat = x[Symbol.for ('String.ify')])
	                   && (typeof (customFormat = customFormat.call (x, stringify.configure (state))) === 'string')) {
	            return customFormat }
	
	        else if (x instanceof Function) {
	            return (cfg.pure ? x.toString () : (x.name ? ('<function:' + x.name + '>') : '<function>')) }
	
	        else if (typeof x === 'string') {
	            return '"' + stringify.limit (x, cfg.pure ? Number.MAX_SAFE_INTEGER : cfg.maxStringLength) + '"' }
	
	        else if (typeof x === 'object') {
	
	            state.parents.add (x)
	            state.siblings.set (x, state.siblings.size)
	
	            const result = stringify.configure (O.assign ({}, state, { depth: state.depth + 1 })).object (x)
	
	            state.parents.delete (x)
	
	            return result }
	
	        else if (!isInteger (x) && (cfg.precision > 0)) {
	            return x.toFixed (cfg.precision) }
	
	        else {
	            return String (x) }
	
	    }, cfg, {
	
	        configure: newConfig => configure (O.assign ({}, cfg, newConfig)),
	
	        limit: (s, n) => s && ((s.length <= n) ? s : (s.substr (0, n - 1) + '…')),
	
	        rightAlign: strings => {
	                        var max = maxOf (strings, s => s.length)
	                        return strings.map (s => ' '.repeat (max - s.length) + s) },
	
	        object: x => {
	
	            if (x instanceof Set) {
	                x = Array.from (x.values ()) }
	
	            else if (x instanceof Map) {
	                x = Array.from (x.entries ()) }
	
	            const isArray = Array.isArray (x)
	
	            if (isBrowser) {
	                
	                if (x instanceof Element) {
	                    return '<' + (x.tagName.toLowerCase () +
	                                ((x.id && ('#' + x.id)) || '') +
	                                ((x.className && ('.' + x.className)) || '')) + '>' }
	                
	                else if (x instanceof Text) {
	                    return '@' + stringify.limit (x.wholeText, 20) } }
	
	            if (!cfg.pure && ((cfg.depth > cfg.maxDepth) || (isArray && (x.length > cfg.maxArrayLength)))) {
	                return isArray ? '<array[' + x.length + ']>' : '<object>' }
	
	            const pretty   = cfg.pretty ? true : false,
	                  entries  = O.entries (x),
	                  oneLine  = !pretty || (entries.length < 2),
	                  quoteKey = cfg.json ? (k => '"' + k + '"') : (k => k)
	
	            if (pretty) {
	
	                const values        = O.values (x),
	                      printedKeys   = stringify.rightAlign (O.keys (x).map (k => quoteKey (k) + ': ')),
	                      printedValues = values.map (stringify),
	                      leftPaddings  = printedValues.map ((x, i) => (((x[0] === '[') ||
	                                                                     (x[0] === '{'))
	                                                                        ? 3
	                                                                        : ((typeof values[i] === 'string') ? 1 : 0))),
	                      maxLeftPadding = maxOf (leftPaddings),
	
	                      items = leftPaddings.map ((padding, i) => {
	                                        const value = ' '.repeat (maxLeftPadding - padding) + printedValues[i]
	                                        return isArray ? value : bullet (printedKeys[i], value) }),
	
	                      printed = bullet (isArray ? '[ ' :
	                                                  '{ ', items.join (',\n')),
	
	                      lines    = printed.split ('\n'),
	                      lastLine = lines[lines.length - 1]
	
	                return printed +  (' '.repeat (maxOf (lines, l => l.length) - lastLine.length) + (isArray ? ' ]' : ' }')) }
	
	            else {
	
	                const items   = entries.map (kv => (isArray ? '' : (quoteKey (kv[0]) + ': ')) + stringify (kv[1])),
	                      content = items.join (', ')
	
	                return isArray
	                        ? ('['  + content +  ']')
	                        : ('{ ' + content + ' }')
	            }
	        }
	    })
	
	    return stringify
	}
	
	module.exports = configure ({
	
	                    depth:           0,
	                    pure:            false,
	                    json:            false,
	                    color:           false, // not supported yet
	                    maxDepth:        5,
	                    maxArrayLength:  60,
	                    maxStringLength: 60,
	                    precision:       undefined,
	                    formatter:       undefined,
	                    pretty:         'auto'
	
	                })
	
	
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
		"use strict";
	
		var ownKeys      = __webpack_require__ (40)
		var reduce       = Function.bind.call(Function.call, Array.prototype.reduce);
		var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
		var concat       = Function.bind.call(Function.call, Array.prototype.concat);
	
		if (!Object.values) {
			 Object.values = function values(O) {
				return reduce(ownKeys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []) } }
	
		if (!Object.entries) {
			 Object.entries = function entries(O) {
				return reduce(ownKeys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []) } }
	
		return Object
	
	}) ();

/***/ },
/* 40 */
/***/ function(module, exports) {

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


/***/ },
/* 41 */
/***/ function(module, exports) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	------------------------------------------------------------------------
	
	Unit tests (bootstrap code)
	
	------------------------------------------------------------------------
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	
	_.hasAsserts = true
	
	_.extend (_, {
	
	/*  a namespace where you put tests (for enumeration purposes)
	    ======================================================================== */
	
	    tests: {},
	
	/*  A degenerate case of a test shell. We use it to bootstrap most critical
	    useless.js internals, where real shell (Testosterone.js) is not available,
	    as it itself depends on these utility. It takes test and test's subject as
	    arguments (test before code, embodying test-driven philosophy) and executes
	    test immediately, throwing exception if anything fails - which is simply
	    the default behavior of $assert. So expect no advanced error reporting
	    and no controlled execution by using this API.
	    ======================================================================== */
	
	    withTest:   function (name, test, defineSubject) {
	                    defineSubject ()
	                    _.runTest (name, test)
	                    _.publishToTestsNamespace (name, test) },
	
	/*  Publishes to _.tests namespace, but does not run
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    deferTest:  function (name, test, defineSubject) {
	                    defineSubject ()
	                    _.publishToTestsNamespace (name, test) },
	
	    /*  INTERNALS (you won't need that)
	        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	        runTest:    function (name, test) {
	                        try {
	                            if (_.isFunction (test)) {                               test () }
	                                                else { _.each (test, function (fn) { fn () }) } }
	                        catch (e) {
	                            if (_.isAssertionError (e)) { var printedName = ((_.isArray (name) && name) || [name]).join ('.')
	                                                          console.log (printedName + ':', e.message, '\n' + _.times (printedName.length, _.constant ('~')).join ('') + '\n')
	                                                         _.each (e.notMatching, function (x) { console.log ('  •', x) }) }
	                            throw e } },
	
	        publishToTestsNamespace: function (name, test) {
	                        if (_.isArray (name)) { // [suite, name] case
	                            (_.tests[name[0]] || (_.tests[name[0]] = {}))[name[1]] = test }
	                        else {
	                            _.tests[name] = test } } })
	        
	/*  TEST ITSELF
	    ======================================================================== */
	
	_.withTest ('assert.js bootstrap', function () {
	
	/*  One-argument $assert (requires its argument to be strictly 'true')
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assert (true)
	
	    $assert (                       // public front end, may be replaced by environment)
	        _.assert ===                // member of _ namespace (original implementation, do not mess with that)
	        _.assertions.assert)        // member of _.assertions (for enumeration purposes)
	
	    $assertNot (false)
	    $assertNot (5)                  // NB: assertNot means 'assert not true', hence this will pass
	
	/*  Multi-argument assert (requires its arguments be strictly equal to each other)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assert (2 + 2, 2 * 2, 4)                    // any number of arguments
	    $assert ({ foo: [1,2,3] }, { foo: [1,2,3] }) // compares objects (deep match)
	    $assert ({ foo: { bar: 1 }, baz: 2 },        // ignores order of properties
	             { baz: 2, foo: { bar: 1 } })
	
	    $assertNot (2 + 2, 5)
	
	/*  Nonstrict matching (a wrapup over _.matches)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assertMatches ({ foo: 1, bar: 2 },
	                    { foo: 1 })
	
	/*  Nonstrict matching against complex objects (stdlib.js feature)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if (_.hasStdlib) { $assertMatches ( { foo: [1,2], bar: 3 },
	                                        { foo: [1] }) }
	
	/*  Regex matching (stdlib.js feature)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if (_.hasStdlib) { $assertMatches ('123', /[0-9]+/) }
	
	
	/*  Type matching (plain)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if (_.hasStdlib) {  $assertTypeMatches (42, 'number')
	                        $assertFails (function () {
	                            $assertTypeMatches ('foo', 'number') }) }
	
	/*  Type matching (array type)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if (_.hasStdlib) {  $assertTypeMatches ([1,2],   [])
	                        $assertTypeMatches ([],      [])
	                        $assertTypeMatches ([1,2,3], ['number'])
	                        $assertTypeMatches ([],      ['number'])
	                        $assertFails (function () {
	                            $assertTypeMatches ([1,2,3],     ['string'])
	                            $assertTypeMatches ([1,2,'foo'], ['number']) }) }
	
	/*  Type matching (deep)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if (_.hasStdlib) {  $assertTypeMatches ({
	
	                            /*  Input object */
	
	                                foo: 42,
	                                bar: {
	                                    even: 4,
	                                    many: ['foo','bar'] } }, {
	
	                            /*  Type contract */
	
	                                foo: 'number',      // simple type check
	                                qux: 'undefined',   // nonexisting match 'undefined' 
	                                bar: {                                              // breakdown of complex object 
	                                    even: function (n) { return (n % 2) === 0 },    // custom contract predicate    
	                                    many: ['string'] } }) }                         // array contract (here, 'array of strings')
	
	/*  Type matching ($prototype)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if (_.hasOOP) { var Foo = $prototype (),
	                        Bar = $prototype ()
	
	        $assertTypeMatches ({ foo: new Foo (),
	                              bar: new Bar () },
	
	                            { foo: Foo,
	                              bar: Bar })
	
	        $assertFails (function () {
	            $assertTypeMatches (new Bar (), Foo) }) };
	
	
	/*  Argument contracts
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	if (_.hasStdlib) {
	
	    var testF = function (_777, _foo_bar_baz, notInvolved) { $assertArguments (arguments) }
	
	                    testF (777, 'foo bar baz')
	
	    $assertFails (function () { testF (777, 42) }) }
	
	/*  Ensuring throw (and no throw)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assertThrows (function () { throw 42 })
	    $assertNotThrows (function () {})
	
	/*  Ensuring throw (strict version)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assertThrows (     function () { throw 42 }, 42) // accepts either plain value or predicate
	    $assertThrows (     function () { throw new Error ('42') }, _.matches ({ message: '42' }))
	
	    $assertFails (function () {
	        $assertThrows ( function () { throw 42 }, 24)
	        $assertThrows ( function () { throw new Error ('42') }, _.matches ({ message: '24' })) })
	
	/*  Ensuring execution
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assertEveryCalled     (function (a, b, c) { a (); a (); b (); c () })
	    $assertEveryCalledOnce (function (a, b, c) { a ();       b (); c () })
	    $assertEveryCalled     (function (x__3) { x__3 (); x__3 (); x__3 (); })
	
	    /*$assertFails (function () {
	        $assertEveryCalled     (function (a, b, c) { a (); b () })
	        $assertEveryCalledOnce (function (a, b, c) { a (); b (); b (); c (); })
	        $assertEveryCalled     (function (x__3) { x__3 (); x__3 (); }) })*/
	
	
	/*  TODO:   1) add CPS support
	            2) replace $assertCPS with this
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if (_.hasStdlib) {
	
	            $assertCalledWithArguments (   ['foo',
	                                           ['foo', 'bar']], function (fn) {
	
	                                        fn ('foo')
	                                        fn ('foo', 'bar') }) }
	
	
	/*  Ensuring CPS routine result (DEPRECATED)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assertCPS (function (then) { then ('foo', 'bar') }, ['foo', 'bar'])
	    $assertCPS (function (then) { then ('foo') }, 'foo')
	    $assertCPS (function (then) { then () })
	
	
	/*  Ensuring assertion failure
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    $assertFails (function () {
	        $fail                                           // simplest way to generate assertion
	        $stub                                           // to mark code stubs (throws error)
	        $assert ('not true')                            // remember that assert is more strict than JavaScript if clauses
	        $assert ({ foo: 1, bar: 2 }, { foo: 1 })        // not be confused with _.matches behavior (use $assertMatches for that)
	        $assert ([1,2,3,4], [1,2,3])                    // same for arrays
	        $assert (['foo'], { 0: 'foo', length: 1 })      // array-like objects not gonna pass (regression test)
	        $assertFails (function () {}) })                // $assertFails fails if passed code don't
	
	/*  Default fail behavior (never depend on that, as it's environment-dependent)
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	    if ($assert === _.assertions.assert) {
	        $assertThrows (function () { $fail }) }
	
	
	/*  IMPLEMENTATION
	    ======================================================================== */
	
	}, function () {
	
	    var assertImpl = function (positive) {
	                        return function (__) {  var args = [].splice.call (arguments, 0)
	
	                                                if (args.length === 1) {
	                                                    if (positive && (args[0] !== true)) {
	                                                        _.assertionFailed ({ notMatching: args }) } }
	
	                                                else if (positive && (_.allEqual (args) !== true)) {
	                                                    _.assertionFailed ({ notMatching: args }) }
	
	                                                return true } }
	
	    /*  Fix for _.matches semantics (should not be true for _.matches (42) (24))
	     */
	    ;(function () {
	        var _matches = _.matches
	        _.matches = function (a) { return _.isObject (a) ? _matches (a) : function (b) { return a === b } } }) ();
	
	    _.extend (_, _.assertions = {
	
	        assert:    assertImpl (true),
	        assertNot: assertImpl (false),
	
	        assertCPS: function (fn, args, then) { var requiredResult = (args && (_.isArray (args) ? args : [args])) || []
	            fn (function () {
	                $assert ([].splice.call (arguments, 0), requiredResult)
	                if (then) { then (); return true; } }) },
	
	        assertNotCalled: function (context) {
	            var inContext = true; context (function () { if (inContext) { $fail } }); inContext = false },
	
	        assertEveryCalledOnce: function (fn, then) {
	            return _.assertEveryCalled (_.hasTags ? $once (fn) : (fn.once = true, fn), then) },
	
	        assertEveryCalled: function (fn_, then) { var fn    = _.hasTags ? $untag (fn_)    : fn_,
	                                                      async = _.hasTags ? $async.is (fn_) : fn_.async
	                                                      once  = _.hasTags ? $once.is (fn_)  : fn_.once
	
	            var match     = once ? null : fn.toString ().match (/.*function[^\(]\(([^\)]+)\)/)
	            var contracts = once ? _.times (fn.length, _.constant (1)) :
	                                   _.map (match[1].split (','), function (arg) {
	                                                                    var parts = (arg.trim ().match (/^(.+)__(\d+)$/))
	                                                                    var num = (parts && parseInt (parts[2], 10))
	                                                                    return _.isFinite (num) ? (num || false) : true })
	            var status    = _.times (fn.length, _.constant (false))
	            var callbacks = _.times (fn.length, function (i) {
	                                                    return function () {
	                                                        status[i] =
	                                                            _.isNumber (contracts[i]) ?
	                                                                ((status[i] || 0) + 1) : true
	                                                        if (async && _.isEqual (status, contracts))
	                                                            then () } })
	            fn.apply (null, callbacks)
	
	            if (!async)   { _.assert (status, contracts)
	                if (then) { then () } } },
	
	        assertCalledWithArguments: function (argsPattern, generateCalls) {
	                                        return _.assert (_.arr (generateCalls), argsPattern) },
	
	        assertCallOrder: function (fn) {
	            var callIndex = 0
	            var callbacks = _.times (fn.length, function (i) { return function () { arguments.callee.callIndex = callIndex++ } })
	            fn.apply (null, callbacks)
	            return _.assert (_.pluck (callbacks, 'callIndex'), _.times (callbacks.length, _.identity.arity1)) },
	
	        assertMatches: function (value, pattern) {
	            try {       return _.assert (_.matches.apply (null, _.rest (arguments)) (value)) }
	            catch (e) { throw _.isAssertionError (e) ? _.extend (e, { notMatching: [value, pattern] }) : e } },
	
	        assertNotMatches: function (value, pattern) {
	            try {       return _.assert (!_.matches.apply (null, _.rest (arguments)) (value)) }
	            catch (e) { throw _.isAssertionError (e) ? _.extend (e, { notMatching: [value, pattern] }) : e } },
	
	        assertType: function (value, contract) {
	            return _.assert (_.decideType (value), contract) },
	
	        assertTypeMatches: function (value, contract) { 
	                                return _.isEmpty (mismatches = _.typeMismatches (contract, value))
	                                    ? true
	                                    : _.assertionFailed ({
	                                        message: 'provided value type not matches required contract',
	                                        asColumns: true,
	                                        notMatching: [
	                                            { provided: value },
	                                            { required: contract },
	                                            { mismatches: mismatches }] }) },
	
	        assertFails: function (what) {
	            return _.assertThrows.call (this, what, _.isAssertionError) },
	
	        assertThrows: function (what, errorPattern) {
	                            var e = undefined, thrown = false
	                                try         { what.call (this) }
	                                catch (__)  { e = __; thrown = true }
	
	                            _.assert.call (this, thrown)
	
	                            if (arguments.length > 1) {
	                                _.assertMatches.call (this, e, errorPattern) } },
	
	        assertNotThrows: function (what) {
	            return _.assertEveryCalled (function (ok) { what (); ok () }) },
	
	        assertArguments: function (args, callee, name) {
	            var fn    = (callee || args.callee).toString ()
	            var match = fn.match (/.*function[^\(]\(([^\)]+)\)/)
	            if (match) {
	                var valuesPassed   = _.asArray (args);
	                var valuesNeeded   = _.map (match[1].split (','),
	                                            function (_s) {
	                                                var s = (_s.trim ()[0] === '_') ? _s.replace (/_/g, ' ').trim () : undefined
	                                                var n = parseInt (s, 10)
	                                                return _.isFinite (n) ? n : s })
	
	                var zap = _.zipWith ([valuesNeeded, valuesPassed], function (a, b) {
	                                return (a === undefined) ? true : (a === b) })
	
	                if (!_.every (zap)) {
	                    _.assertionFailed ({ notMatching: _.nonempty ([[name, fn].join (': '), valuesNeeded, valuesPassed]) }) } } },
	
	        fail: function () {
	                _.assertionFailed () },
	
	        fails: _.constant (function () {    // higher order version
	                _.assertionFailed () }),
	
	        stub: function () {
	                _.assertionFailed () } })
	
	
	    /*  DEFAULT FAILURE IMPL.
	        ---------------------
	        We do not subclass Error, because _.isTypeOf currently does not support
	        inhertitance (UPDATE: now does) and it would cause troubles in test shell
	        and logging facility. Thus a subclass is defined that way.
	        ======================================================================== */
	
	    _.extend (_, {
	
	        assertionError: function (additionalInfo) {
	                            return _.extend (new Error (
	                                (additionalInfo && additionalInfo.message) || 'assertion failed'), additionalInfo, { assertion: true }) },
	
	        assertionFailed: function (additionalInfo) {
	                            throw _.extend (_.assertionError (additionalInfo), {
	                                        stack: _.rest ((new Error ()).stack.split ('\n'), 3).join ('\n') }) },
	
	        isAssertionError: function (e) {        
	                            return e && (e.assertion === true) } })
	
	
	    /*  $assert helper
	        ======================================================================== */
	
	    _.allEqual = function (values) {
	                    return _.reduce (values, function (prevEqual, x) {
	                        return prevEqual && _.isEqual (values[0], x) }, true) }
	
	    /*  Publish asserts as $-things (will be replaced by Testosterone.js onwards,
	        thus configurable=true)
	        ======================================================================== */
	
	    _.each (_.keys (_.assertions), function (name) {
	                                        var define = ((_[name].length === 0) ? $global.property : $global.const)
	                                        define ('$' + name, _[name], { configurable: true }) })
	})
	
	
	
	


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*  Uncaught exception handling facility
	    ======================================================================== */
	
	(function () {
	
	    _.hasUncaught = true
	
	    var reThrownTag = ' [re-thrown by a hook]' // marks error as already processed by globalUncaughtExceptionHandler
	
	    var globalUncaughtExceptionHandler = _.globalUncaughtExceptionHandler = function (e) {
	
	        var chain = arguments.callee.chain
	                    arguments.callee.chain = _.reject (chain, _.property ('catchesOnce'))
	
	        if (chain.length) {
	            for (var i = 0, n = chain.length; i < n; i++) {
	                try {
	                    chain[i] (e)
	                    break }
	                catch (newE) {
	                    console.log (newE)
	                    if (i === n - 1) {
	                        newE.message += reThrownTag
	                        throw newE }
	                    else {
	                        if (newE && (typeof newE === 'object')) { newE.originalError = e }
	                        e = newE } } } }
	        else {
	            e.message += reThrownTag
	            throw e } }
	
	    _.withUncaughtExceptionHandler = function (handler, context_) { var context = context_ || _.identity
	
	        if (context_) {
	            handler.catchesOnce = true }
	
	                               globalUncaughtExceptionHandler.chain.unshift (handler)
	        context (function () { globalUncaughtExceptionHandler.chain.remove  (handler) }) }
	
	    globalUncaughtExceptionHandler.chain = []
	
	    switch ($platform.engine) {
	        case 'node':
	            __webpack_require__ (43).on ('uncaughtException', globalUncaughtExceptionHandler); break;
	
	        case 'browser':
	            window.addEventListener ('error', function (e) {
	
	                if (e.message.indexOf (reThrownTag) < 0) { // if not already processed by async hooks
	
	                    if (e.error) {
	                        globalUncaughtExceptionHandler (e.error) }
	
	                    else { // emulate missing .error (that's Safari)
	                        globalUncaughtExceptionHandler (_.extend (new Error (e.message), {
	                            stub: true,
	                            stack: 'at ' + e.filename + ':' + e.lineno + ':' + e.colno })) } } }) }
	}) ()

/***/ },
/* 43 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
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


/***/ },
/* 44 */
/***/ function(module, exports) {

	/*  Provides call stack persistence across async call boundaries.
	    ======================================================================== */
	
	(function () {
	
	    if ($platform.Browser) {
	
	        _.hasUncaughtAsync = true
	
	        var globalAsyncContext = undefined
	
	        var listenEventListeners = function (genAddEventListener, genRemoveEventListener) {
	
	            var override = function (obj) {
	
	                obj.addEventListener    = genAddEventListener    (obj.addEventListener)
	                obj.removeEventListener = genRemoveEventListener (obj.removeEventListener) }
	
	            if (window.EventTarget) {
	                override (window.EventTarget.prototype) }
	
	            else {
	                override (Node.prototype)
	                override (XMLHttpRequest.prototype) } }
	
	        var asyncHook = function (originalImpl, callbackArgumentIndex) {
	            return __supressErrorReporting = function () {
	
	                    var asyncContext = {
	                        name: name,
	                        stack: (new Error ()).stack,
	                        asyncContext: globalAsyncContext }
	
	                    var args = _.asArray (arguments)
	                    var fn   = args[callbackArgumentIndex]
	
	                    if (!_.isFunction (fn)) { throw new Error ('[uncaughtAsync.js] callback should be a function')}
	
	                    fn.__uncaughtJS_wrapper = args[callbackArgumentIndex] = __supressErrorReporting = function () {
	
	                        globalAsyncContext = asyncContext
	
	                        try       { return fn.apply (this, arguments) }
	                        catch (e) { _.globalUncaughtExceptionHandler (_.extend (e, { asyncContext: asyncContext })) } }
	
	                    return originalImpl.apply (this, args) } }
	
	        window.setTimeout = asyncHook (window.setTimeout, 0)
	
	        /*  Manually catch uncaught exceptions at async call boundaries (providing missing .error for Safari)
	         */ 
	        listenEventListeners (
	            function (addEventListener) { return asyncHook (addEventListener, 1) },
	            function (removeEventListener) {
	                return function (name, fn, bubble, untrusted) {
	                   return removeEventListener.call (this, name, fn.__uncaughtJS_wrapper || fn, bubble) } }) }
	
	}) ()

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
	
	const O = Object
	
	/*  Self-awareness module
	    ======================================================================== */
	
	_.hasReflection = true
	
	_.tests.reflection = {
	
	    'file paths': function () {
	        $assert (typeof $uselessPath, 'string')
	        $assert ($sourcePath .length > 0)
	        $assert ($uselessPath.length > 0) },
	
	    'readSource': function () { var uselessJS = $uselessPath + $uselessFile
	
	        SourceFiles.read (uselessJS, function (text) {
	            $assert (text.length > 0) })
	
	        SourceFiles.line (uselessJS, 0, function (line) {
	            $assert (line.length > 0) }) },
	
	    'CallStack from error': function () {
	        try {
	            throw new Error ('oh fock') }
	        catch (e) {
	            $assertTypeMatches (CallStack.fromError (e), CallStack) } },
	
	    '$callStack': function (testDone) {
	
	        /*  That's how you access call stack at current location
	         */
	        var stack = $callStack
	
	        /*  It is an array of entries...
	         */
	        $assert (_.isArray (stack))
	
	        /*  ...each having following members
	         */
	        $assertTypeMatches (stack[0], {
	            callee:         'string',       // function name
	            calleeShort:    'string',       // short function name (only the last part of dot-sequence)
	            file:           'string',       // full path to source file at which call occurred
	            fileName:       'string',       // name only (with extension)
	            fileShort:      'string',       // path relative to $sourcePath
	            thirdParty:     'boolean',      // denotes whether the call location occured at 3rd party library
	            index:          'boolean',      // denotes whether the call location occured at index page
	           'native':        'boolean',      // denotes whether the call location occured in native impl.
	            line:           'number',       // line number
	            column:         'number',       // character number
	            source:         'string',       // source code (may be not ready right away)
	            sourceReady:    'function' })   // a barrier, opened when source is loaded (see dynamic/stream.js on how-to use)
	
	        /*  $callStack is CallStack instance, providing some helpful utility:
	         */
	        $assert (_.isTypeOf (CallStack, stack))
	
	        /*  1. clean CallStack (with 3rdparty calls stripped)
	         */
	        $assert (_.isTypeOf (CallStack, stack.clean))
	
	        /*  2. shifted by some N (useful for error reporting, to strip error reporter calls)
	         */
	        $assert (_.isTypeOf (CallStack, stack.offset (2)))
	
	        /*  3. filter and reject semantics supported, returning CallStack instances
	         */
	        $assert (_.isTypeOf (CallStack, stack.filter (_.identity)))
	        $assert (_.isTypeOf (CallStack, stack.reject (_.identity)))
	
	        $assertEveryCalled ($async (function (sourceReady, sourcesReady, safeLocationReady) {
	
	            /*  4. source code access, either per entry..
	             */
	            stack[0].sourceReady (function (src) {               // sourceReady is barrier, i.e. if ready, called immediately
	                $assert (typeof src, 'string'); sourceReady () })
	
	            /*  5. ..or for all stack
	             */
	            stack.sourcesReady (function () {                     // sourcesReady is barrier, i.e. if ready, called immediately
	                _.each (stack, function (entry) {
	                    $assert (typeof entry.source, 'string') }); sourcesReady () })
	
	            /*  Safe location querying
	             */
	            stack.safeLocation (7777).sourceReady (function (line) {
	                $assert ('??? WRONG LOCATION ???', line); safeLocationReady () }) }), testDone) }
	}
	
	/*  Source code access (cross-platform)
	 */
	$global.SourceFiles = $singleton (Component, {
	
	    /*apiConfig: {
	        port:      1338,
	        hostname: 'locahost',
	        protocol: 'http:' },*/
	
	    line: function (file, line, then) {
	        SourceFiles.read (file, function (data) {
	            then ((data.split ('\n')[line] || '').trimmed) }) },
	
	    read: $memoizeCPS (function (file, then) {
	        if (file.indexOf ('<') < 0) { // ignore things like "<anonymous>"
	            try {
	                if ($platform.NodeJS) {
	                    then (__webpack_require__ (!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).readFileSync (file, { encoding: 'utf8' }) || '') }
	                else {
	                    /*  Return response body regardless of status code
	                     */
	                    var xhr = new XMLHttpRequest ()
	                    xhr.open ('GET', file, true)
	                    xhr.onreadystatechange = function () { if (xhr.readyState == 4) { then (xhr.responseText) } }
	                    xhr.send (null) } }
	            catch (e) {
	                then ('') } }
	        else {
	            then ('') } }),
	
	    write: function (file, text, then) {
	
	        if ($platform.NodeJS) {
	
	            this.read (file, function (prevText) { // save previous version at <file>.backups/<date>
	
	                var fs   = __webpack_require__ (!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	                    opts = { encoding: 'utf8' }
	
	          try { fs.mkdirSync     (file + '.backups') } catch (e) {}
	                fs.writeFileSync (file + '.backups/' + Date.now (), prevText, opts)
	                fs.writeFileSync (file,                             text,     opts)
	
	                then () }) }
	            
	        else {
	            JSONAPI
	                .post ('source/' + file, _.extend2 ({}, this.apiConfig, { what: { text: text } }))
	                .then (function () {
	                    log.ok (file, '— successfully saved')
	                    if (then) {
	                        then () } }) }} })
	
	
	/*  Callstack API
	 */
	$global.CallStack = $extends (Array, {
	
	    current: $static ($property (function () {
	        return CallStack.fromRawString (CallStack.currentAsRawString).offset (1) })),
	
	    fromError: $static (function (e) {
	        if (e && e.parsedStack) {
	            return CallStack.fromParsedArray (e.parsedStack).offset (e.stackOffset || 0) }
	        else if (e && e.stack) {
	            return CallStack.fromRawString (e.stack).offset (e.stackOffset || 0) }
	        else {
	            return CallStack.fromParsedArray ([]) } }),
	
	    fromErrorWithAsync: $static (function (e) {
	        var stackEntries = CallStack.fromError (e),
	            asyncContext = e.asyncContext
	
	        while (asyncContext) {
	            stackEntries = stackEntries.concat (CallStack.fromRawString (asyncContext.stack))
	            asyncContext = asyncContext.asyncContext }
	
	        return stackEntries.mergeDuplicateLines }),
	
	    locationEquals: $static (function (a, b) {
	        return (a.file === b.file) && (a.line === b.line) && (a.column === b.column) }),
	
	    safeLocation: function (n) {
	        return this[n] || {
	            callee: '', calleeShort: '', file: '',
	            fileName: '', fileShort: '', thirdParty:    false,
	            source: '??? WRONG LOCATION ???',
	            sourceReady: _.barrier ('??? WRONG LOCATION ???') } },
	
	    mergeDuplicateLines: $property (function () {
	        return CallStack.fromParsedArray (
	            _.map (_.partition2 (this, function (e) { return e.file + e.line }),
	                    function (group) {
	                        return _.reduce (_.rest (group), function (memo, entry) {
	                            memo.callee      = (memo.callee      || '<anonymous>') + ' → ' + (entry.callee      || '<anonymous>')
	                            memo.calleeShort = (memo.calleeShort || '<anonymous>') + ' → ' + (entry.calleeShort || '<anonymous>')
	                            return memo }, _.clone (group[0])) })) }),
	
	    clean: $property (function () {
	        var clean = this.mergeDuplicateLines.reject (function (e, i) { return (e.thirdParty || e.hide) && (i !== 0) })
	        return (clean.length === 0) ? this : clean }),
	
	    asArray: $property (function () {
	        return _.asArray (this) }),
	
	    offset: function (N) {
	        return (N && CallStack.fromParsedArray (_.rest (this, N))) || this },
	
	    initial: function (N) {
	        return (N && CallStack.fromParsedArray (_.initial (this, N))) || this },
	
	    concat: function (stack) {
	        return CallStack.fromParsedArray (this.asArray.concat (stack.asArray)) },
	
	    filter: function (fn) {
	        return CallStack.fromParsedArray (_.filter (this, fn)) },
	
	    reject: function (fn) {
	        return CallStack.fromParsedArray (_.reject (this, fn)) },
	
	    reversed: $property (function () {
	        return CallStack.fromParsedArray (_.reversed (this)) }),
	
	    sourcesReady: function (then) {
	        return _.allTriggered (_.pluck (this, 'sourceReady'), then) },
	
	    /*  Internal impl.
	     */
	    constructor: function (arr) { Array.prototype.constructor.call (this)
	
	        _.each (arr, function (entry) {
	            if (!entry.sourceReady) {
	                 entry.sourceReady = _.barrier ()
	                 SourceFiles.line ((entry.remote ? 'api/source/' : '') + entry.file, entry.line - 1, function (src) {
	                    entry.hide = src.contains ('// @hide')
	                    entry.sourceReady (entry.source = src.replace ('// @hide', '')) }) }
	
	            this.push (entry) }, this) },
	
	    fromParsedArray: $static (function (arr) {
	        return new CallStack (arr) }),
	
	    currentAsRawString: $static ($property (function () {
	        var cut = $platform.Browser ? 3 : 2
	        return _.rest (((new Error ()).stack || '').split ('\n'), cut).join ('\n') })),
	
	    shortenPath: $static (function (path) {
	                    var relative = path.replace ($uselessPath, '')
	                                       .replace ($sourcePath,  '')
	                    return (relative !== path)
	                        ? relative.replace (/^node_modules\//, '')
	                        : path.split ('/').last }), // extract last part of /-separated sequence
	
	    isThirdParty: $static (_.bindable (function (file) { var local = file.replace ($sourcePath, '')
	                    return ($platform.NodeJS && (file[0] !== '/')) || // from Node source
	                           (local.indexOf ('/node_modules/') >= 0) ||
	                           (file.indexOf  ('/node_modules/') >= 0 && !local) ||
	                           (local.indexOf ('underscore') >= 0) ||
	                           (local.indexOf ('jquery') >= 0) })),
	
	    fromRawString: $static (_.sequence (
	        function (rawString) {
	            return CallStack.rawStringToArray (rawString) },
	
	        function (array) {
	            return _.map (array, function (entry) {
	                return _.extend (entry, {
	                            calleeShort:    _.last (entry.callee.split ('.')),
	                            fileName:       _.last (entry.file.split ('/')),
	                            fileShort:      CallStack.shortenPath (entry.file),
	                            thirdParty:     CallStack.isThirdParty (entry.file) && !entry.index }) }) },
	
	        function (parsedArrayWithSourceLines) { return CallStack.fromParsedArray (parsedArrayWithSourceLines) })),
	
	    rawStringToArray: $static (function (rawString) { var lines = (rawString || '').split ('\n')
	
	        return _.filter2 (lines, function (line) { line = line.trimmed
	
	            var callee, fileLineColumn = [], native_ = false
	            var planA = undefined, planB = undefined
	
	            if ((planA = line.match (/at (.+) \((.+)\)/)) ||
	                (planA = line.match (/(.*)@(.*)/))) {
	
	                callee         =         planA[1]
	                native_        =        (planA[2] === 'native')
	                fileLineColumn = _.rest (planA[2].match (/(.*):(.+):(.+)/) || []) }
	
	            else if ((planB = line.match (/^(at\s+)*(.+):([0-9]+):([0-9]+)/) )) {
	                fileLineColumn = _.rest (planB, 2) }
	
	            else {
	                return false } // filter this shit out
	
	            if ((callee || '').indexOf ('__supressErrorReporting') >= 0) {
	                return false }
	
	            return {
	                beforeParse: line,
	                callee:      callee || '',
	                index:       $platform.Browser && (fileLineColumn[0] === window.location.href),
	               'native':     native_,
	                file:        fileLineColumn[0] || '',
	                line:       (fileLineColumn[1] || '').integerValue,
	                column:     (fileLineColumn[2] || '').integerValue } }) }) })
	
	    $global.property ('$callStack',   () => CallStack.fromRawString (CallStack.currentAsRawString).offset ($platform.NodeJS ? 1 : 0))
	    
	;(function () {
	
	    var currentFile = $platform.Browser
	                        ? (CallStack.rawStringToArray (CallStack.currentAsRawString)[2] || { file: '' }).file
	                        : __filename
	
	    $global.const ('$uselessPath', _.initial (currentFile.split ('/'), $platform.NodeJS ? 2 : 1).join ('/') + '/')
	    $global.const ('$sourcePath',  (function () {
	                                        var local = ($uselessPath.match (/(.+)\/node_modules\/(.+)/) || [])[1]
	                                        return local ? (local + '/') : $uselessPath }) ())
	
	}) ();
	
	/*  Stringifiers
	 */
	
	const asTable = __webpack_require__ (46)
	
	CallStack.prototype[Symbol.for ('String.ify')] = function (stringify) {
	
	    return asTable (this.map (entry => [
	                        '\t' + 'at ' + entry.calleeShort.slice (0, 30),
	                        (entry.fileShort && (entry.fileShort + ':' + entry.line)) || '',
	                        (entry.source || '').slice (0, 80)]))
	}
	
	Error.prototype[Symbol.for ('String.ify')] = function (stringify) {
	
	    try {
	        var stack   = CallStack.fromErrorWithAsync (this).offset (this.stackOffset || 0).clean
	        var why     = stringify.limit ((this.message || '').replace (/\r|\n/g, '').trim (), 120)
	
	        return ('[EXCEPTION] ' + why +
	
	                (this.notMatching && ([].concat (this.notMatching).map (x => '\t' + stringify (x)).join ('\n') + '\n\n') || '') +
	
	            '\n\n') + stringify (stack) + '\n' }
	
	    catch (sub) {
	        return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack +
	            '\n\nORIGINAL EXCEPTION:\n\n' + this.stack + '\n\n' }
	}
	
	/*  Reflection for $prototypes
	 */
	
	_.tests.prototypeMeta = {
	
	    'Prototype.$meta': function (done) {
	        var Dummy = $prototype ()
	
	        Dummy.$meta (function (meta) {
	            $assertMatches (meta, { name: 'Dummy', type: 'prototype' })
	            done () }) },
	
	    'Trait.$meta': function (done) {
	        var Dummy = $trait ()
	        Dummy.$meta (function (meta) {
	            $assertMatches (meta, { name: 'Dummy', type: 'trait' })
	            done () }) },
	
	    'String.ify': function () {
	
	        var Proto = $prototype ({})
	
	        $assert (String.ify (Proto), $platform.NodeJS ? 'Proto ()' : '<prototype>')
	    }
	}
	
	$prototype.impl.findMeta = function (stack) {
	
	    return function (then) {
	
	        _.cps.find (CallStack.fromRawString (stack).reversed,
	
	                    function (entry, found) {
	                        entry.sourceReady (function (text) { var match = (text || '').match (
	                                                                             /([A-z]+)\s*=\s*\$(prototype|singleton|component|extends|trait|aspect)/)
	                            found ((match && {
	                                name: match[1],
	                                type: match[2],
	                                file: entry.fileShort }) || false) }) },
	
	                    function (found) {
	                        then (found || {}) }) } }
	
	$prototype.macro (function (def, base) {
	
	    if (typeof Symbol !== 'undefined') {
	
	        def.constructor[Symbol.for ('String.ify')] = function (ctx) {
	
	            if ($platform.NodeJS) {
	                var name = ''
	                this.$meta (function (values) { name = ((values.name === 'exports') ? values.file : values.name) })
	                return name && (name + ' ()') }
	
	            else {
	                return '<prototype>' } } }
	
	    if (!def.$meta) {
	
	        var findMeta = _.cps.memoize ($prototype.impl.findMeta (CallStack.currentAsRawString))
	
	        _.defineMemoizedProperty (findMeta, 'promise', function () {
	              return new Promise (findMeta) })
	
	        def.$meta = $static (findMeta) }
	
	    return def })
	
	
	
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	
	const
	
	O = Object,
	
	asColumns = (rows, cfg_) => {
	    
	    if (rows.length === 0) {
	        return [] }
	
	    else { const
	
	        zip = (arrs, f) => arrs.reduce ((a, b) => b.map ((b, i) => [...a[i] || [], b]), []).map (args => f (...args)),
	
	    /*  Convert cell data to string (converting multiline text to singleline) */
	
	        cells           = rows.map (r => r.map (c => (c === undefined) ? '' : String (c).replace (/\n/g, '\\n'))),
	
	    /*  Compute column widths (per row) and max widths (per column)     */
	
	        cellWidths      = cells.map (r => r.map (c => c.length)),
	        maxWidths       = zip (cellWidths, Math.max),
	
	    /*  Default config     */
	
	        cfg             = O.assign ({
	                            delimiter: '  ',
	                            minColumnWidths: maxWidths.map (x => 0),
	                            maxTotalWidth: 0 }, cfg_),
	
	    /*  Project desired column widths, taking maxTotalWidth and minColumnWidths in account.     */
	
	        totalWidth      = maxWidths.reduce ((a, b) => a + b, 0),
	        relativeWidths  = maxWidths.map (w => w / totalWidth),
	        maxTotalWidth   = cfg.maxTotalWidth - (cfg.delimiter.length * maxWidths.length),
	        excessWidth     = Math.max (0, totalWidth - maxTotalWidth),
	        computedWidths  = zip ([cfg.minColumnWidths, maxWidths, relativeWidths],
	                            (min, max, relative) => Math.max (min, Math.floor (max - excessWidth * relative))),
	
	    /*  This is how many symbols we should pad or cut (per column).  */
	
	        restCellWidths  = cellWidths.map (widths => zip ([computedWidths, widths], (a, b) => a - b))
	
	    /*  Perform final composition.   */
	
	        return zip ([cells, restCellWidths], (a, b) =>
	                zip ([a, b], (str, w) => (w >= 0)
	                                            ? (str + ' '.repeat (w))
	                                            : (str.slice (0, w))).join (cfg.delimiter))
	    }
	},
	
	asTable = cfg => O.assign (arr => {
	
	/*  Print arrays  */
	
	    if (arr[0] && Array.isArray (arr[0]))
	        return asColumns (arr, cfg).join ('\n')
	
	/*  Print objects   */
	
	    const colNames = [...new Set (arr.map (O.keys).reduce ((a, b) => [...a, ...b]))],
	          columns  = [colNames, ...arr.map (o => colNames.map (key => o[key]))],
	          lines    = asColumns (columns, O.assign ({ minColumnWidths: colNames.map (n => n.length) }, cfg))
	
	    return [lines[0], '-'.repeat (lines[0].length), ...lines.slice (1)].join ('\n')
	
	}, cfg, {
	
	    configure: newConfig => asTable (O.assign ({}, cfg, newConfig)),
	})
	
	module.exports = asTable ({ maxTotalWidth: 120 })
	
	


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	const O         = __webpack_require__ (39),
	      bullet    = __webpack_require__ (13),
	      asTable   = __webpack_require__ (46)
	
	_.hasLog = true
	
	_.tests.log = {
	
	    basic: function () {
	
	        log            ('log (x)')         //  Basic API
	
	        log.green      ('log.green')       //  Use for plain colored output.
	        log.boldGreen  ('log.boldGreen')
	        log.darkGreen  ('log.darkGreen')
	        log.blue       ('log.blue')
	        log.boldBlue   ('log.boldBlue')
	        log.darkBlue   ('log.darkBlue')
	        log.orange     ('log.orange')
	        log.boldOrange ('log.boldOrange')
	        log.darkOrange ('log.darkOrange')
	        log.red        ('log.red')         //  ..for more colors, see the implementation below
	        log.boldRed    ('log.boldRed')
	        log.darkRed    ('log.darkRed')
	        log.pink       ('log.pink')
	        log.boldPink   ('log.boldPink')
	        log.darkPink   ('log.darkPink')
	
	        log.margin ()
	        log.margin ()  // collapses
	
	        log.bright ('log.bright')
	        log.dark   ('log.dark')
	
	        log.margin ()
	
	        log.success ('log.success')     //  Use for quality production logging (logging that lasts).
	        log.ok      ('log.ok')
	        log.g       ('log.g')
	        log.gg      ('log.gg')
	        log.info    ('log.info')        //  Printed location greatly helps to find log cause in code.
	        log.i       ('log.i')
	        log.ii      ('log.ii')
	        log.warning ('log.warning')     //  For those who cant remember which one, there's plenty of aliases
	        log.warn    ('log.warn')
	        log.w       ('log.w')
	        log.ww      ('log.ww')        
	        log.error   ('log.error')
	        log.e       ('log.e')
	        log.ee      ('log.ee')
	
	        $assert (log ('log (x) === x'), 'log (x) === x')    // Can be used for debugging of functional expressions
	                                                            // (as it returns it first argument, like in _.identity)
	
	        log.info    (log.stackOffset (2), 'log.info (log.config ({ stackOffset: 2 }), ...)')
	
	        log.write   ('Consequent', 'arguments', log.color.red, ' joins', 'with', 'whitespace')
	
	        log.write (                     'Multi',
	                    log.color.red,      'Colored',
	                    log.color.green,    'Output',
	                    log.color.blue,     'For',
	                    log.color.orange,   'The',
	                    log.color.pink,     'Fucking',
	                    log.color.none,     'Win')
	
	        log.write   (log.boldLine)  //  ASCII art <hr>
	        log.write   (log.thinLine)
	        log.write   (log.line)
	
	        log.write   (log.indent (1),
	                     ['You can set indentation',
	                      'that is nicely handled',
	                      'in case of multiline text'].join ('\n'))
	
	        log.orange  (log.indent (2), '\nCan print nice table layout view for arrays of objects:\n')
	        log.orange  (log.config ({ indent: 2, table: true }), [
	            { field: 'line',    matches: false, valueType: 'string', contractType: 'number' },
	            { field: 'column',  matches: true,  valueType: 'string', contractType: 'number' }])
	
	        log.write ('\nObject:', { foo: 1, bar: 2, qux: 3 })         //  Object printing is supported
	        log.write ('Array:', [1, 2, 3])                             //  Arrays too
	        log.write ('Function:', _.identity)                         //  Prints code of a function
	
	        log.write ('Complex object:', { foo: 1, bar: { qux: [1,2,3], garply: _.identity }}, '\n\n');
	
	        log.withConfig (log.indent (1), function () {
	            log.pink ('Config stack + scopes + higher order API test:')
	            _.each ([5,6,7], logs.pink (log.indent (1), 'item = ', log.color.blue)) })
	
	        $assert (log (42), 42) } }
	
	_.extend (
	
	    /*  Basic API
	     */
	    $global.log = function () {
	        return log.write.apply (this, [log.config ({ location: true, stackOffset: 1 })].concat (_.asArray (arguments))) }, {
	
	    Config: $prototype (),
	
	    /*  Could be passed as any argument to any write function.
	     */
	    config: function (cfg) {
	        return new log.Config (cfg) } })
	
	
	_.extend (log, {
	
	    /*  Shortcut for common cases
	     */
	    indent: function (n) {
	        return log.config ({ indent: n }) },
	
	    stackOffset: function (n) {
	        return log.config ({ stackOffset: n }) },
	
	    where: function (wat) {
	        return log.config ({ location: true, where: wat || undefined }) },
	
	    color: _.extend (function (x) { return (log.color[x] || {}).color },
	
	        _.object (
	        _.map  ([['none',        '0m',           ''],
	                 ['red',         '31m',          'color:crimson'],
	                 ['boldRed',    ['31m', '1m'],   'color:crimson;font-weight:bold'],
	                 ['darkRed',    ['31m', '2m'],   'color:crimson'],
	                 ['blue',        '36m',          'color:royalblue'],
	                 ['boldBlue',   ['36m', '1m'],   'color:royalblue;font-weight:bold;'],
	                 ['darkBlue',   ['36m', '2m'],   'color:rgba(65,105,225,0.5)'],
	                 ['boldOrange', ['33m', '1m'],   'color:saddlebrown;font-weight:bold;'],
	                 ['darkOrange', ['33m', '2m'],   'color:saddlebrown'],
	                 ['orange',      '33m',          'color:saddlebrown'],
	                 ['brown',      ['33m', '2m'],   'color:saddlebrown'],
	                 ['green',       '32m',          'color:forestgreen'],
	                 ['boldGreen',  ['32m', '1m'],   'color:forestgreen;font-weight:bold'],
	                 ['darkGreen',  ['32m', '2m'],   'color:forestgreen;opacity:0.5'],
	                 ['pink',        '35m',          'color:magenta'],
	                 ['boldPink',   ['35m', '1m'],   'color:magenta;font-weight:bold;'],
	                 ['darkPink',   ['35m', '2m'],   'color:magenta'],
	                 ['black',       '0m',           'color:black'],
	                 ['bright',     ['0m', '1m'],    'color:rgba(0,0,0);font-weight:bold'],
	                 ['dark',       ['0m', '2m'],    'color:rgba(0,0,0,0.25)']],
	
	             function (def) {
	                return [def[0], log.config ({ color: { shell: _.coerceToArray (_.map2 (def[1], _.prepends ('\u001B['))).join (), css: def[2] }})] }))),
	
	    /*  Need one? Take! I have plenty of them!
	     */
	    boldLine:   '======================================',
	    line:       '--------------------------------------',
	    thinLine:   '......................................',
	
	    /*  Set to true to precede each log message with date and time (useful for server side logs).
	     */
	    timestampEnabled: false,
	
	    /*  For hacking log output (contextFn should be conformant to CPS interface, e.g. have 'then' as last argument)
	     */
	    withWriteBackend: $scope (function (release, backend, contextFn, done) { var prev = log.writeBackend.value
	                                                                                        log.writeBackend.value = backend
	        contextFn (function /* release */ (then) { // @hide
	                     release (function () {                                             log.writeBackend.value = prev
	                        if (then) then ()
	                        if (done) done () }) }) }),  
	
	    /*  For writing with forced default backend
	     */
	    writeUsingDefaultBackend: function (/* arguments */) { var args = arguments
	        log.withWriteBackend (
	            log.impl.defaultWriteBackend,
	            function (done) {
	                log.write.apply (null, args); done () }) },
	
	    writeBackend: function () {
	        return log.writeBackend.value || log.impl.defaultWriteBackend },
	
	    withConfig: function (config, what) {  log.impl.configStack.push (log.impl.configure ([{ stackOffset: -1 }, config]))
	                     var result = what (); log.impl.configStack.pop ();
	                  return result },
	
	    currentConfig: function () { return log.impl.configure (log.impl.configStack) },
	
	    /*  Use instead of 'log.newline ()' for collapsing newlines
	     */
	    margin: (function () {
	                var lastWrite = undefined
	                return function () {
	                    if (lastWrite !== log.impl.numWrites)
	                        log.newline ()
	                        lastWrite   = log.impl.numWrites } }) (),
	
	    /*  Internals
	     */
	    impl: {
	
	        configStack: [],
	        numWrites: 0,
	
	        configure: function (configs) {
	            return _.reduce2 (
	                { stackOffset: 0, indent: 0 },
	                _.nonempty (configs), function (memo, cfg) {
	                                        return _.extend (memo, _.nonempty (cfg), {
	                                            indent:      memo.indent      + (cfg.indent || 0),
	                                            stackOffset: memo.stackOffset + (cfg.stackOffset || 0) }) }) },
	
	        /*  Nuts & guts
	         */
	        write: $restArg (_.bindable (function () { var writeBackend = log.writeBackend ()
	
	            log.impl.numWrites++
	
	            var args   = _.asArray (arguments)
	            var config = log.impl.configure ([{ stackOffset: $platform.NodeJS ? 1 : 3,
	                                                indent: writeBackend.indent || 0 }].concat (log.impl.configStack))
	
	            var runs = _.reduce2 (
	
	                /*  Initial memo
	                 */
	                [],
	                
	                /*  Arguments split by configs
	                 */
	                _.partition3 (args, _.isTypeOf.$ (log.Config)),
	                
	                /*  Gather function
	                 */
	                function (runs, span) {
	                    if (span.label === true) { config = log.impl.configure ([config].concat (span.items))
	                                               return runs }
	                                        else { return runs.concat ({ config: config,
	                                                                     text: log.impl.stringifyArguments (span.items, config) }) } })
	
	            var trailNewlinesMatch = runs.last && runs.last.text.reversed.match (/(\n*)([^]*)/)
	            var trailNewlines = (trailNewlinesMatch && trailNewlinesMatch[1]) // dumb way to select trailing newlines (i'm no good at regex)
	            if (trailNewlinesMatch) {
	                runs.last.text = trailNewlinesMatch[2].reversed }
	
	
	            /*  Split by linebreaks
	             */
	            var newline = {}
	            var lines = _.pluck.with ('items',
	                            _.reject.with (_.property ('label'),
	                                _.partition3.with (_.equals (newline),
	                                    _.scatter (runs, function (run, i, emit) {
	                                                        _.each (run.text.split ('\n'), function (line, i, arr) {
	                                                                                            emit (_.extended (run, { text: line })); if (i !== arr.lastIndex) {
	                                                                                            emit (newline) } }) }))))
	
	            var totalText       = _.pluck (runs, 'text').join ('')
	            var where           = config.where || log.impl.walkStack ($callStack) || {}
	            var indentation     = (config.indentPattern || '\t').repeats (config.indent)
	
	            writeBackend ({
	                lines:         lines,
	                config:        config,
	                color:         config.color,
	                when:          (new Date ()).toISOString (),
	                args:          _.reject (args, _.isTypeOf.$ (log.Config)),
	                indentation:   indentation,
	                indentedText:  lines.map (_.seq (_.pluck.tails2 ('text'),
	                                                 _.joinsWith (''),
	                                                 _.prepends (indentation))).join ('\n'),
	                text:          totalText,
	                codeLocation:  (config.location && log.impl.location (where)) || '',
	                trailNewlines: trailNewlines || '',
	                where:         (config.location && where) || undefined })
	
	            return _.find (args, _.not (_.isTypeOf.$ (log.Config))) })),
	
	        walkStack: function (stack) {
	            return _.find (stack.clean.offset ($platform.Browser ? 1 : 2),
	                        function (entry) { return (entry.fileShort.indexOf ('base/log.js') < 0) }) || stack[0] },
	
	        defaultWriteBackend: function (params) {
	
	            var codeLocation = params.codeLocation
	
	            if ($platform.NodeJS) {
	
	                var lines = _.map (params.lines, function (line) {
	                                                    return params.indentation + _.map (line, function (run) {
	                                                        return (run.config.color
	                                                                    ? (run.config.color.shell + run.text + '\u001b[0m')
	                                                                    : (                         run.text)) }).join ('') }).join ('\n')
	
	                if (log.timestampEnabled) {
	                    lines = log.color ('dark').shell + bullet (String (params.when), log.color ('none').shell + lines) }
	
	                console.log (lines,
	                             log.color ('dark').shell + codeLocation + '\u001b[0m',
	                             params.trailNewlines) }
	
	            else {
	                console.log.apply (console, _.reject.with (_.equals (undefined), [].concat (
	
	                /*  Text   */
	
	                    [(log.timestampEnabled ? ('%c' + params.when + '%c') : '')
	
	                        , _.map (params.lines, function (line, i) {
	                                                return params.indentation + _.reduce2 ('', line, function (s, run) {
	                                                    return s + (run.text && ((run.config.color ? '%c' : '') +
	                                                        run.text) || '') }) }).join ('\n')
	
	                        , (codeLocation ? ('%c' + codeLocation) : '')].nonempty.join (' '),
	
	                /*  Colors */
	
	                    (log.timestampEnabled ? ['color:rgba(0,0,0,0.4)', 'color:black'] : [])
	
	                        .concat ((_.scatter (params.lines, function (line, i, emit) {
	                            _.each (line, function (run) {
	                                if (run.text && run.config.color) { emit (run.config.color.css) } }) }) || []))
	
	                        .concat (codeLocation ? 'color:rgba(0,0,0,0.25)' : []),
	
	                    params.trailNewlines))) } },
	
	    /*  Ex.: function @ source.js:321  */
	
	        location: where => '(' + [].concat (where.calleeShort || [],
	                                 [].concat (where.fileName || [], where.line || []).join (':')).join (' @ ') + ')',
	
	        stringifyArguments: (args, cfg) =>
	                                args.map (arg => {
	                                    var x = log.impl.stringify (arg, cfg)
	                                    return (cfg.maxArgLength ? String.ify.limit (x, cfg.maxArgLength) : x) }).join (' '),
	
	        stringify: (what, cfg) =>
	                    (typeof what === 'string') ? what :
	                    (Array.isArray (what) && cfg.table) ? asTable (what) :
	                    String.ify.configure (cfg) (what)
	    }
	})
	
	
	/*  Printing API
	 */
	;(function () {                                                var write = log.impl.write
	   _.extend (log,
	             log.printAPI =
	                    _.object (
	                    _.concat (            [[            'newline', write.$ (log.config ({ location: false }), '') ],
	                                           [              'write', write                                                          ]],
	                            _.flat (_.map (['red failure error e',
	                                                    'blue info i',
	                                               'darkBlue minor m',
	                                          'orange warning warn w',
	                                             'green success ok g',
	                                                   'darkGreen dg',
	                                            'pink notice alert p',
	                                                    'boldPink pp',
	                                                    'dark hint d',
	                                                   'boldGreen gg',
	                                                       'bright b',
	                                          'boldRed bloody bad ee',
	                                                    'darkPink dp',
	                                                       'brown br',
	                                                 'darkOrange wtf',
	                                                  'boldOrange ww',
	                                                     'darkRed er',
	                                                    'boldBlue ii' ],
	                                                    _.splitsWith  (' ').then (
	                                                      _.mapsWith  (
	                                                  function (name,                                   i,                         names      )  {
	                                                   return  [name,  write.$ (log.config ({ location: i !== 0, color: log.color (names.first), stackOffset: 2 })) ] })))))))
	
	}) ()
	
	
	/*  Higher order API
	 */
	$global.logs = _.mapWith (_.callsTo.compose (_.callsWith (log.stackOffset (1))), log.printAPI)
	
	
	if ($platform.NodeJS) {
	    module.exports = log }
	
	


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	------------------------------------------------------------------------
	
	Testosterone is a cross-platform unit test shell. Features:
	
	    - asynchronous tests
	    - asynchronous assertions
	    - log handling (log.xxx calls are scheduled to current test log)
	    - exception handling (uncaught exceptions are nicely handled)
	
	------------------------------------------------------------------------
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	
	var bullet  = __webpack_require__ (13),
	    asTable = __webpack_require__ (46)
	
	/*  A contract for test routines that says that test should fail and it's the behavior expected
	 */
	Tags.define ('shouldFail')
	
	
	/*  A contract for custom assertions, says that assertion is asynchronous.
	 */
	Tags.define ('async')
	
	
	/*  This is test suite for tests framework itself.
	
	    As you can see, tests are defined as _.tests.xxx. So, if you have module called 'foo',
	    place tests for that module in _.tests.foo — it will be picked up by tests framework
	    automagically ©
	 */
	_.tests.Testosterone = {
	
	    /*  3.  To write asynchronous tests, define second argument in your test routine, which
	            is 'done' callback. The framework will look into argument count of your routine,
	            and if second argument is there, your routine will be considered as asynchronous,
	            i.e. not completing until 'done' is explicitly triggered.
	     */
	    'async': function (done) {
	        _.delay (function () {
	            done () }) },
	
	
	    /*  4.  Use $tests to define unit tests on prototypes (works only on stuff in global namespace)
	     */
	    '$tests': function () {
	
	        DummyPrototypeWithTest  = $prototype ({ $test: function () {} })
	        DummyPrototypeWithTests = $prototype ({ $tests: { dummy: function () {} } })
	
	        /*  $test/$tests renders to static immutable property $tests
	         */
	        $assertTypeMatches (DummyPrototypeWithTests.$tests, [{ '*': 'function' }])
	        $assertThrows (function () { DummyPrototypeWithTests.$tests = 42 })
	
	        /*  Tests are added to Testosterone.prototypeTests
	         */
	        $assertMatches (_.pluck (Testosterone.prototypeTests, 'tests'), [DummyPrototypeWithTest .$tests,
	                                                                         DummyPrototypeWithTests.$tests]) }
	 }
	
	/*  For marking methods in internal impl that should publish themselves as global functions (like $assert)
	 */
	Tags.define ('assertion')
	
	Testosterone = $singleton ({
	
	    prototypeTests: [],
	
	    isRunning: $property (function () {
	        return this.currentAssertion !== undefined }),
	
	    /*  Hook up to assertion syntax defined in common.js
	     */
	    constructor: function () {
	
	        _.each (_.assertions, function (fn, name) {
	                                    this.defineAssertion (name, (name === 'assertFails') ?
	                                        $shouldFail (function (what) { what.call (this) }) : fn) }, this);
	
	        /*  For defining tests inside prototype definitions
	         */
	        (function (register) {
	            $prototype.macro ('$test',  register)
	            $prototype.macro ('$tests', register) }) (this.$ (function (def, value, name) {
	                                                        this.prototypeTests.push ({
	                                                            proto: def.constructor,
	                                                            tests: value })
	
	                                                        def.$tests = $static ($property ($constant (
	                                                            (_.isStrictlyObject (value) && value) || _.object ([['test', value]]))))
	
	                                                        return def }))
	        this.run = this.$ (this.run) },
	
	    /*  Entry point
	     */
	    run: _.interlocked (function (cfg_) {
	
	        /*  Configuration
	         */
	        var defaults = {
	            suites: [],
	            silent:  true,
	            verbose: false,
	            timeout: 2000,
	            filter: _.identity,
	            testStarted:  function (test) {},
	            testComplete: function (test) {} }
	
	        var cfg = this.runConfig = _.extend (defaults, cfg_)
	
	        /*  Read cfg.suites
	         */
	        var suitesIsArray = _.isArray (cfg.suites) // accept either [{ name: xxx, tests: yyy }, ...] or { name: tests, ... }
	        var suites = _.map (cfg.suites, this.$ (function (suite, name) {
	            return this.testSuite (suitesIsArray ? suite.name : name, suitesIsArray ? suite.tests : suite, cfg.context, suite.proto) }))
	
	        /*  Pick prototype tests
	         */
	        var result = ((cfg.codebase === false) ? __([]) : this.collectPrototypeTests ()).then (this.$ (function (prototypeTests) {
	
	            /*  Gather tests
	             */
	            var baseTests   = cfg.codebase === false ? [] : this.collectTests ()
	            var allTests    = _.flatten (_.pluck (baseTests.concat (suites).concat (prototypeTests), 'tests'))
	            var selectTests = _.filter (allTests, cfg.shouldRun || _.constant (true))
	
	            /*  Reset context (assigning indices)
	             */
	            this.runningTests = _.map (selectTests, function (test, i) { return _.extend (test, { indent: cfg.indent, index: i }) })
	
	            _.each (this.runningTests, function (t) {
	                if (!(t.routine instanceof Function)) {
	                    log.ee (t.suite, t.name, '– test routine is not a function:', t.routine)
	                    throw new Error () } })
	
	            this.runningTests = _.filter (this.runningTests, cfg.filter || _.identity)
	
	            /*  Go
	             */
	            return __ .each (this.runningTests, this.$ (this.runTest))
	                      .then (this.$ (function () {
	                                _.assert (cfg.done !== true)
	                                          cfg.done   = true
	
	                                this.printLog (cfg)
	                                this.failedTests = _.filter (this.runningTests, _.property ('failed'))
	                                this.failed = (this.failedTests.length > 0)
	                                
	                                return !this.failed })) }))
	
	        return result.catch (function (e) {
	                                log.margin ()
	                                log.ee (log.boldLine, 'TESTOSTERONE CRASHED', log.boldLine, '\n\n', e)
	                                throw e }) }),
	
	    onException: function (e) {
	        if (this.currentAssertion) 
	            this.currentAssertion.onException (e)
	        else
	            throw e },
	
	    /*  You may define custom assertions through this API
	     */
	    defineAssertions: function (assertions) {
	        _.each (assertions, function (fn, name) {
	            this.defineAssertion (name, fn) }, this) },
	
	    /*  Internal impl
	     */
	    runTest: function (test, i) { var self = this, runConfig = this.runConfig
	
	        log.impl.configStack = [] // reset log config stack, to prevent stack pollution due to exceptions raised within log.withConfig (..)
	    
	        return __.then (runConfig.testStarted (test), function () {
	
	            test.verbose = runConfig.verbose
	            test.timeout = runConfig.timeout
	            test.startTime = Date.now ()
	
	            return test.run ()
	                       .then (function () {
	                                test.time = (Date.now () - test.startTime)
	                                return runConfig.testComplete (test) }) }) },
	
	    collectTests: function () {
	        return _.map (_.tests, this.$ (function (suite, name) {
	            return this.testSuite (name, suite) } )) },
	
	    collectPrototypeTests: function () { var self = this
	        return __.map (this.prototypeTests, function (def, then) {
	                                                return def.proto.$meta.promise.then (function (meta) {
	                                                    return self.testSuite (meta.name, def.tests, undefined, def.proto) }) }) },
	
	    testSuite: function (name, tests, context, proto) { return { 
	        name: name || '',
	        tests: _(_.pairs (((typeof tests === 'function') && _.object ([[name, tests]])) || tests))
	                .map (function (keyValue) {
	                        var test = new Test ({ proto: proto, name: keyValue[0], routine: keyValue[1], suite: name, context: context })
	                            test.complete (function () {
	                                if (!(test.hasLog = (test.logCalls.length > 0))) {
	                                         if (test.failed)  { log.red   ('FAIL') }
	                                    else if (test.verbose) { log.green ('PASS') } } })
	
	                            return test }) } },
	
	    defineAssertion: function (name, def) {
	
	        var self = this
	        var fn   = $untag (def)
	
	        delete $global['$' + name]
	               $global['$' + name] = _.withSameArgs (fn, function () {
	
	                    var loc = $callStack.safeLocation (($platform.Browser && !$platform.Chrome) ? 0 : 1)
	                    
	                    if (!self.currentAssertion) {
	                        return fn.apply (self, arguments) }
	                    else {
	                        return self.currentAssertion.babyAssertion (name, def, fn, arguments, loc) } })
	    },
	
	    printLog: function (cfg) { if (!cfg.supressLog) {
	
	        var loggedTests = _.filter (this.runningTests, function (test) { return test.failed || (!cfg.silent && test.hasLog) })
	        var failedTests = _.filter (this.runningTests, _.property ('failed'))
	
	        _.invoke (cfg.verbose ? this.runningTests : loggedTests, 'printLog')
	
	        if (failedTests.length) {
	            log.orange ('\n' + log.boldLine + '\n' + 'SOME TESTS FAILED:', _.pluck (failedTests, 'name').join (', '), '\n\n') }
	
	        else if (cfg.silent !== true) {
	            log.green ('\n' + log.boldLine + '\n' + 'ALL TESTS PASS\n\n') } } } })
	
	
	/*  Encapsulates internals of test's I/O.
	 */
	Test = $prototype ({
	
	    constructor: function (cfg) {
	        _.defaults (this, cfg, {
	            name:       '<< UNNAMED FOR UNKNOWN REASON >>',
	            failed:     false,
	            routine:    undefined,
	            verbose:    false,
	            depth:      1,
	            indent:     0,
	            failedAssertions: [],
	            context:    this,
	            complete: _.extend (_.barrier (), { context: this }) })
	
	        this.babyAssertion = _.interlocked (this.babyAssertion) },
	
	    finalize: function () {
	        this.babyAssertion.wait (this.$ (function () {
	            if (this.canFail && this.failedAssertions.length) {
	                this.failed = true }
	            this.complete (true) })) },
	
	    babyAssertion: function (name, def, fn, args, loc) { var self = this
	
	        var assertion = new Test ({
	            mother: this,
	            name: name,
	            shouldFail: def.$shouldFail || this.shouldFail,
	            depth: this.depth + 1,
	            location: loc,
	            context: this.context,
	            timeout: this.timeout / 2,
	            verbose: this.verbose,
	            silent:  this.silent,
	            routine: Tags.modify (def, function (fn) {
	                                            return function (done) {
	                                                    if ($async.is (args[0]) || $async.is (def)) {
	                                                        _.cps.apply (fn, self.context, args, function (args, then) {
	                                                                                                         if (then) {
	                                                                                                             then.apply (this, args) }
	                                                                                                         done () }) }
	                                                    else {
	                                                        try       { fn.apply (self.context, args); done (); }
	                                                        catch (e) { assertion.onException (e); } } } }) })
	
	        return assertion.run ()
	                        .finally (function (e, x) {
	                                Testosterone.currentAssertion = self
	                                if (assertion.failed || (assertion.verbose && assertion.logCalls.notEmpty)) {
	                                    return assertion.location
	                                                    .sourceReady
	                                                    .promise
	                                                    .then (function (src) {
	                                                                log.red (log.config ({ location: assertion.location, where: assertion.location }), src)
	                                                                assertion.evalLogCalls ()
	                                                                return src }) } })
	
	                        .then (function (src) {
	                            if (assertion.failed && self.canFail) {
	                                self.failedAssertions.push (assertion) } }) },
	
	    canFail: $property (function () {
	        return !this.failed && !this.shouldFail }),
	
	    fail: function () {
	        this.failed = true
	        this.finalize () },
	
	    assertionStack: $property (function () { var result = [],
	                                                      a = this; do { result.push (a); a = a.mother } while (a)
	                                          return result }),
	
	    onException: function (e) {
	
	            if (this.canFail || this.verbose) {
	
	                if (_.isAssertionError (e)) {
	                    //  • a
	                    //  • b
	                    if ('notMatching' in e) { var notMatching = _.coerceToArray (e.notMatching)
	                        if (e.asColumns) {
	                            log.orange (
	                                asTable (_.map (notMatching, function (obj) {
	                                    return ['\t• ' + _.keys (obj)[0], String.ify (_.values (obj)[0])] }))) }
	                        else {
	                            var cases  = _.map (notMatching, log.impl.stringify.arity1.then (bullet.$ ('\t• ')))
	                            var common = _.reduce2 (cases, _.longestCommonSubstring) || ''
	                            if (common.length < 4) {
	                                common = undefined }
	
	                            _.each (cases, function (what) {
	
	                                    if (common) {                                  var where  = what.indexOf (common)
	                                        log.write ( log.color.orange,  what.substr (0, where),
	                                                    log.color.dark,    common,
	                                                    log.color.orange,  what.substr (where + common.length)) }
	
	                                    else {
	                                        log.orange (what) } }) }} }
	                        
	                    // print exception
	                else {
	                    if (this.depth > 1) { log.newline () }
	                                          log.write (e) }
	                                          log.newline () }
	
	            if (this.canFail) { this.fail () }
	                        else  { this.finalize () } },
	
	    run: function () { var self    = Testosterone.currentAssertion = this,
	                           routine = Tags.unwrap (this.routine)
	
	        return new Channel (this.$ (function (then) {
	
	            this.shouldFail = $shouldFail.is (this.routine)
	            this.failed = false
	            this.hasLog = false
	            this.logCalls = []
	            this.failureLocations = {}
	
	            _.withTimeout ({
	                maxTime: self.timeout,
	                expired: function () { if (self.canFail) { log.ee ('TIMEOUT EXPIRED'); self.fail () } } },
	                self.complete)
	
	            _.withUncaughtExceptionHandler (self.$ (self.onException), self.complete)
	
	            log.withWriteBackend (_.extendWith ({ indent: 1 },
	                                        function (x) { /*log.impl.defaultWriteBackend (x);*/ self.logCalls.push (x) }),
	
	                                  function (doneWithLogging)  { self.complete (doneWithLogging.arity0)
	                                                    if (then) { self.complete (then) }
	
	                                        /*  Continuation-passing style flow control
	                                         */
	                                        if (routine.length > 0) {
	                                            routine.call (self.context, self.$ (self.finalize)) }
	
	                                        /*  Return-style flow control
	                                         */
	                                        else {
	
	                                        /*  TODO:   investigate why Promise.resolve ().then (self.$ (self.finalize))
	                                                    leads to broken unhandled exception handling after the Testosterone run completes  */
	
	                                            var result = undefined
	
	                                            try       { result = routine.call (self.context) }
	                                            catch (e) { self.onException (e) }
	
	                                            if (_.isArrayLike (result) && (result[0] instanceof Promise)) {
	                                                result = __.all (result) }
	
	                                            if (result instanceof Promise) {
	                                                result.then (
	                                                    function (x) { self.finalize () }.postponed,
	                                                    function (e) { self.onException (e) }) }
	                                            else {
	                                                self.finalize () } } }) })) },
	            
	    printLog: function () { var suiteName = (this.suite && (this.suite !== this.name) && (this.suite || '').quote ('[]')) || ''
	
	        log.write (log.color.blue,
	            '\n' + log.boldLine,
	            '\n' + _.nonempty ([suiteName, this.name]).join (' '),
	            (this.index + ' of ' + Testosterone.runningTests.length).quote ('()') +
	            (this.failed ? ' FAILED' : '') + ':',
	            '\n')
	
	        this.evalLogCalls () },
	
	    evalLogCalls: function () {
	        _.each (this.logCalls, log.writeBackend ().arity1) } })
	
	
	/*
	 */
	Tags.define ('allowsRecursion')
	
	_.limitRecursion = function (max, fn, name) { if (!fn) { fn = max; max = 0 }
	                        var depth       = -1
	                        var reported    = false
	                            return function () {
	                                if (!reported) {
	                                    if (depth > max) { reported = true
	                                        throw _.extendWith ({ notMatching: _.map (arguments, function (arg, i) { return 'arg' + (i + 1) + ': ' + String.ify (arg) }) },
	                                            new Error (name + ': max recursion depth reached (' + max + ')')) }
	                                    else {
	                                        var result = ((++depth), fn.apply (this, arguments)); depth--
	                                            return result } } } }
	                                            
	Testosterone.ValidatesRecursion = $trait ({
	
	    $test: function () {
	
	        var test = new ($component ({
	
	            $traits: [Testosterone.ValidatesRecursion],
	
	            foo: function () {},
	            bar: function () { this.bar () },
	            baz: $allowsRecursion ({ max: 2 }, function () { this.baz () }),
	            qux: $allowsRecursion (function () { if (!this.quxCalled) { this.quxCalled = true; this.qux () } }) }))
	
	                       test.foo ()
	        $assertThrows (test.bar, { message: 'bar: max recursion depth reached (0)' })
	                       test.bar () // should not report second time (to prevent overflood in case of buggy code)
	        $assertThrows (test.baz, { message: 'baz: max recursion depth reached (2)' })
	                       test.qux () },
	
	    $constructor: function () {
	        _.each (this, function (member, name) {
	            if (_.isFunction ($untag (member)) && (name !== 'constructor') && (!member.$allowsRecursion || (member.$allowsRecursion.max !== undefined))) {
	                this[name] = Tags.modify (member, function (fn) {
	                    return _.limitRecursion ((member && member.$allowsRecursion && member.$allowsRecursion.max) || 0, fn, name) }) } }, this) } })
	
	/*  $log for methods
	 */
	;(function () { var colors = _.keys (_.omit (log.color, 'none'))
	                    colors.each (Tags.define)
	
	    Tags.define ('verbose')
	
	    Testosterone.LogsMethodCalls = $trait ({
	
	/*
	        $test: $platform.Browser ? (function () {}) : function (testDone) {
	
	                    var Proto = $prototype ({ $traits: [Testosterone.LogsMethodCalls] })
	                    var Compo = $extends (Proto, {
	                                        foo: $log ($pink ($verbose (function (_42) { $assert (_42, 42); return 24 }))) })
	
	                    var compo = new Compo ()
	                    var testContext = this
	
	                    Compo.$meta (function () {
	                        $assert (compo.foo (42), 24)
	                        $assert (_.pluck (testContext.logCalls, 'text'), ['Compo.foo (42)', '→ 24', ''])
	                        $assert (testContext.logCalls[0].color === log.color ('pink'))
	                        testDone () }) },
	*/
	        $macroTags: {
	
	            log: function (def, member, name) { var param         = (_.isBoolean (member.$log) ? undefined : member.$log) || (member.$verbose ? '{{$proto}}' : '')
	                                                var meta          = {}
	                                                var color         = _.find2 (colors, function (color) { return log.color ((member['$' + color] && color)) || false })
	                                                var template      = param && _.template (param, { interpolate: /\{\{(.+?)\}\}/g })
	
	                $untag (def.$meta) (function (x) { meta = x }) // fetch prototype name
	
	                return $prototype.impl.modifyMember (member, function (fn, name_) { return function () { var this_      = this,
	                                                                                                             arguments_ = _.asArray (arguments)
	
	                        var this_dump = (template && template.call (this, _.extend ({ $proto: meta.name }, _.map2 (this, String.ify.configure ({ pretty: false }).arity1)))) || this.desc || ''
	                        var args_dump = _.map (arguments_, String.ify.oneLine.arity1).join (', ').quote ('()')
	
	                    log.write (log.config ({
	                        color: color,
	                        location: true,
	                        where: member.$verbose ? undefined : { calleeShort: meta.name } }), _.nonempty ([this_dump, name, name_]).join ('.'), args_dump)
	
	                    return log.withConfig ({ indent: 1,
	                                             color: color,
	                                             protoName: meta.name }, function () {
	
	                                                                        var numWritesBefore = log.impl.numWrites
	                                                                        var result          = fn.apply (this_, arguments_);          
	
	                                                                        if (result !== undefined) {
	                                                                            log.write ('→', String.ify.oneLine (result)) }
	
	                                                                        if ((log.currentConfig ().indent < 2) &&
	                                                                            (log.impl.numWrites - numWritesBefore) > 0) { log.newline () }
	
	                                                                        return result }) } }) } } }) }) ();
	
	
	if ($platform.NodeJS) {
	    module.exports = Testosterone }

/***/ },
/* 49 */
/***/ function(module, exports) {

	/*  Measures run time of a routine (either sync or async)
	    ======================================================================== */
	
	_.measure = function (routine, then) {
	    if (then) {                             // async
	        var now = _.now ()
	        routine (function () {
	            then (_.now () - now) }) }
	    else {                                  // sync
	        var now = _.now ()
	        routine ()
	        return _.now () - now } }
	
	
	/*  Measures performance: perfTest (fn || { fn1: .., fn2: ... }, then)
	    ======================================================================== */
	
	_.perfTest = function (arg, then) {
	    var rounds = 500
	    var routines = _.isFunction (arg) ? { test: arg } : arg
	    var timings = {}
	
	    _.cps.each (routines, function (fn, name, then) {
	
	        /*  Define test routine (we store and print result, to assure our routine
	            won't be throwed away by optimizing JIT)
	         */
	        var result = []
	        var run = function () {
	            for (var i = 0; i < rounds; i++) {
	                result.push (fn ()) }
	            console.log (name, result) }
	
	        /*  Warm-up run, to force JIT work its magic (not sure if 500 rounds is enough)
	         */
	        run ()
	
	        /*  Measure (after some delay)
	         */
	        _.delay (function () {
	            timings[name] = _.measure (run) / rounds
	            then () }, 100) },
	
	        /*  all done
	         */
	        function () {
	            then (timings) }) }


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*eslint-disable no-unused-vars*/
	/*!
	 * jQuery JavaScript Library v3.1.0
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2016-07-07T21:44Z
	 */
	( function( global, factory ) {
	
		"use strict";
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
	
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";
	
	var arr = [];
	
	var document = window.document;
	
	var getProto = Object.getPrototypeOf;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var fnToString = hasOwn.toString;
	
	var ObjectFunctionString = fnToString.call( Object );
	
	var support = {};
	
	
	
		function DOMEval( code, doc ) {
			doc = doc || document;
	
			var script = doc.createElement( "script" );
	
			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module
	
	
	
	var
		version = "3.1.0",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&
	
				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},
	
		isPlainObject: function( obj ) {
			var proto, Ctor;
	
			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}
	
			proto = getProto( obj );
	
			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}
	
			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},
	
		isEmptyObject: function( obj ) {
	
			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;
	
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.0
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-01-04
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
	
		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {
	
				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}
	
				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}
	
			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},
	
		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true;
			},
			{ dir: "parentNode", next: "legend" }
		);
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");
	
		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {
		// Known :disabled false positives:
		// IE: *[disabled]:not(button, input, select, textarea, optgroup, option, menuitem, fieldset)
		// not IE: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {
	
			// Check form elements and option elements for explicit disabling
			return "label" in elem && elem.disabled === disabled ||
				"form" in elem && elem.disabled === disabled ||
	
				// Check non-disabled form elements for fieldset[disabled] ancestors
				"form" in elem && elem.disabled === false && (
					// Support: IE6-11+
					// Ancestry is covered for us
					elem.isDisabled === disabled ||
	
					// Otherwise, assume any non-<option> under fieldset[disabled] is disabled
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						("label" in elem || !disabledAncestor( elem )) !== disabled
				);
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
	
			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";
	
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	
	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;
	
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			ret = this.pushStack( [] );
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						if ( elem ) {
	
							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );
	
			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :
	
							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
							matched.push( cur );
							break;
						}
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}
	
	function adoptValue( value, resolve, reject ) {
		var method;
	
		try {
	
			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );
	
			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );
	
			// Other non-thenables
			} else {
	
				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call( undefined, value );
			}
	
		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {
	
			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call( undefined, value );
		}
	}
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},
	
					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
	
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
	
								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
	
								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;
	
										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}
	
										returned = handler.apply( that, args );
	
										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}
	
										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&
	
											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;
	
										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {
	
											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);
	
											// Normal processors (resolve) also hook into progress
											} else {
	
												// ...and disregard older resolution values
												maxDepth++;
	
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}
	
										// Handle all other returned values
										} else {
	
											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}
	
											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},
	
									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {
	
												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}
	
												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {
	
													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}
	
													deferred.rejectWith( that, args );
												}
											}
										};
	
								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {
	
									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}
	
						return jQuery.Deferred( function( newDefer ) {
	
							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);
	
							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);
	
							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];
	
				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(
						function() {
	
							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},
	
						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,
	
						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}
	
				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );
	
				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};
	
				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( singleValue ) {
			var
	
				// count of uncompleted subordinates
				remaining = arguments.length,
	
				// count of unprocessed arguments
				i = remaining,
	
				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),
	
				// the master Deferred
				master = jQuery.Deferred(),
	
				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};
	
			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );
	
				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
	
					return master.then();
				}
			}
	
			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}
	
			return master.promise();
		}
	} );
	
	
	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	
	jQuery.Deferred.exceptionHook = function( error, stack ) {
	
		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};
	
	
	
	
	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};
	
	
	
	
	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();
	
	jQuery.fn.ready = function( fn ) {
	
		readyList
			.then( fn )
	
			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );
	
	jQuery.ready.then = readyList.then;
	
	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );
	
	} else {
	
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );
	
		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		cache: function( owner ) {
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
	
				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				return this.get( owner, key );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key !== undefined ) {
	
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
	
					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );
	
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnotwhite ) || [] );
				}
	
				i = key.length;
	
				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
	
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? JSON.parse( data ) :
						data;
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each( function() {
	
					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHiddenWithinTree = function( elem, el ) {
	
			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
	
			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&
	
				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&
	
				jQuery.css( elem, "display" ) === "none";
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	
	
	var defaultDisplayMap = {};
	
	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];
	
		if ( display ) {
			return display;
		}
	
		temp = doc.body.appendChild( doc.createElement( nodeName ) ),
		display = jQuery.css( temp, "display" );
	
		temp.parentNode.removeChild( temp );
	
		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;
	
		return display;
	}
	
	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;
	
		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			display = elem.style.display;
			if ( show ) {
	
				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";
	
					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}
	
		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}
	
		return elements;
	}
	
	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;
	
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( nativeEvent ) {
	
			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );
	
			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
	
			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}
	
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Support: IE <=9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox <=42
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,
	
				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},
	
				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},
	
		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;
	
			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
	
		which: function( event ) {
			var button = event.button;
	
			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}
	
			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				return ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}
	
			return event.which;
		}
	}, jQuery.event.addProp );
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
	
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
	
		/* eslint-disable max-len */
	
		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	
		/* eslint-enable */
	
		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
	
			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}
	
		return elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	
	
	( function() {
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
	
			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}
	
			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
	
			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
	
			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}
	
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
	
			// If we already have the right measurement, avoid augmentation
			4 :
	
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var val,
			valueIsBorderBox = true,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = elem.getBoundingClientRect()[ name ];
		}
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
	
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					style[ name ] = value;
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
	
						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	function raf() {
		if ( timerId ) {
			window.requestAnimationFrame( raf );
			jQuery.fx.tick();
		}
	}
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
	
					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}
	
		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}
	
		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {
	
			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {
	
					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}
	
			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {
	
					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {
	
			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}
	
				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}
	
				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}
	
				/* eslint-disable no-loop-func */
	
				anim.done( function() {
	
				/* eslint-enable no-loop-func */
	
					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}
	
			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		// Go to the end state if fx are off or if document is hidden
		if ( jQuery.fx.off || document.hidden ) {
			opt.duration = 0;
	
		} else {
			opt.duration = typeof opt.duration === "number" ?
				opt.duration : opt.duration in jQuery.fx.speeds ?
					jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
		}
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.requestAnimationFrame ?
				window.requestAnimationFrame( raf ) :
				window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		if ( window.cancelAnimationFrame ) {
			window.cancelAnimationFrame( timerId );
		} else {
			window.clearInterval( timerId );
		}
	
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();
	
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
	
						// Handle most common string cases
						ret.replace( rreturn, "" ) :
	
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
	
						/* eslint-disable no-cond-assign */
	
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
	
						/* eslint-enable no-cond-assign */
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {
	
				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;
	
				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": JSON.parse,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// Request state (becomes false upon send and true upon completion)
				completed,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// uncached part of the url
				uncached,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {
	
								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR );
	
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in uncached url if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rts, "" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}
	
				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;
	
			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}
	
					// Propagate others as results
					done( -1, e );
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Ignore repeat invocations
				if ( completed ) {
					return;
				}
	
				completed = true;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );
	
	
	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};
	
	
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
	
		var base, parsed, scripts;
	
		if ( !context ) {
	
			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );
	
				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}
	
		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
	
			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var docElem, win, rect, doc,
				elem = this[ 0 ];
	
			if ( !elem ) {
				return;
			}
	
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}
	
			rect = elem.getBoundingClientRect();
	
			// Make sure element is not hidden (display: none)
			if ( rect.width || rect.height ) {
				doc = elem.ownerDocument;
				win = getWindow( doc );
				docElem = doc.documentElement;
	
				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			}
	
			// Return zeros for disconnected and hidden elements (gh-2310)
			return rect;
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );
	
	jQuery.parseJSON = JSON.parse;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	return jQuery;
	} );


/***/ },
/* 51 */
/***/ function(module, exports) {

	/*  Some handy jQuery extensions
	    ======================================================================== */
	
	if (typeof jQuery !== 'undefined') { (function ($) {
	
	/*  We override some jQuery methods, so store previous impl. here
	 */
	var __previousMethods__ = _.clone ($.fn)
	
	/*  Global functions
	 */
	_.extend ($, {
	
	    /*  Instantiates svg elements
	     */
	    svg: function (tag) {
	            var node = document.createElementNS ('http://www.w3.org/2000/svg', tag)
	            if ((tag === 'svg') && !$platform.IE) {
	                node.setAttribute ('xmlns', 'http://www.w3.org/2000/svg') }
	            return $(node) } })
	
	/*  Element methods
	 */
	.fn.extend ({
	
	    /*  For this-binding
	     */
	    $: function () { return _.$.apply (null, [this].concat (_.asArray (arguments))) },
	
	    /*  Provides auto-unbinding of $component $listeners from DOM events upon destroy
	     */
	    on: function (what, method) { var el = this, method = _.find (arguments, _.isFunction)
	
	            /*  See useless/base/dynamic/stream.js for that queue/queuedBy interface.
	             */
	            if (method.queuedBy) {
	                method.queuedBy.push ({ remove: function () { el.off (what, method) } }) }
	
	            /*  Call original impl.
	             */
	            return __previousMethods__.on.apply (this, arguments) },
	
	    /*  Links a data (or controller instance) to its DOM counterpart
	     */
	    item: function (value) {
	        if (value) {                                                // setter
	            if (this.length) {
	                this[0]._item = value }
	            return this }
	        else {                                                      // getter
	            return this.length ? this[0]._item : undefined } },
	
	    /*  Writes properties directly to DOM object
	     */
	    props: function (what) {
	        _.extend.apply (null, [this[0]].concat (arguments))
	        return this },
	    
	    props2: function (what) {
	        _.extend2.apply (null, [this[0]].concat (arguments))
	        return this },
	
	    /*  Wait semantics
	     */
	    hasWait: function () {
	        return this.hasClass ('i-am-busy') },
	
	    waitUntil: function (fn, then) { this.addClass ('i-am-busy').attr ('disabled', true)
	        fn (this.$ (function () {
	            this.removeClass ('i-am-busy').removeAttr ('disabled')
	            if (then) {
	                then.apply (null, arguments) } })); return this },
	
	    /*  Checks if has parent upwards the hierarchy
	     */
	    hasParent: function (el) {
	        var parent = this
	        while (parent.length > 0) {
	            if (parent[0] == (el[0] || el)) {
	                return true }
	            parent = parent.parent () }
	        return false },
	
	    /*  Returns a value or undefined (coercing empty values to undefined)
	     */
	    nonemptyValue: function () {
	        var value = $.trim (this.val ())
	        return (value.length == 0) ? undefined : value },
	
	    /*  Returns a valid integer value or undefined (coercing NaN to undefined)
	     */
	    intValue: function () {
	        var value = parseInt (this.nonemptyValue (), 10)
	        return isNaN (value) ? undefined : value },
	
	    /*  Checks if a mouse/touch event occured within element bounds
	     */
	    hitTest: function (event) {
	        var offset = this.offset ()
	        var pt = {
	            x: event.clientX - offset.left,
	            y: event.clientY - offset.top }
	        return (pt.x >= 0) && (pt.y >= 0) && (pt.x < $(this).width ()) && (pt.y < $(this).height ()) },
	
	    /*  Returns multiple attributes as object of { attr1: value, attr2: value, .. } form
	     */
	    attrs: function (/* name1, name2, ... */) {
	        return _.object (_.map (arguments, function (name) { return [name, this.attr (name)] }, this)) },
	
	    /*  Checks if any element upwards the hierarchy (including this element) conforms to a selector
	     */
	    belongsTo: function (selector) {
	        return (this.is (selector) || this.parents (selector).length) },
	
	    /*  Selects which classes element should have, based on a key selector
	
	        Example: btn.selectClass (state, {  loading: 'btn-wait btn-disabled',
	                                            error: 'btn-invalid',
	                                            ok: '' })
	     */
	    selectClass: function (key, classes) {
	        return this.removeClass (_.values (classes).join (' ')).addClass (classes[key]) },
	
	    /*  Returns a valid integer of an attribute (or undefined)
	     */
	    attrInt: function (name) { return (this.attr (name) || '').integerValue },
	    cssInt:  function (name) { return (this.css  (name) || '').integerValue },
	
	    /*  Enumerates children, returning each child as jQuery object (a handy thing that default .each lacks)
	     */
	    eachChild: function (selector, fn) {
	        _.each (this.find (selector), function (el) { fn ($(el)) }); return this },
	
	    /*  Calls fn when current CSS transition ends
	     */
	    transitionend: function (fn) {
	        return this.one ('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', fn.oneShot) },
	    
	    /*  Calls fn when current CSS animation ends
	     */
	    animationend: function (fn) {
	        return this.one ('animationend webkitAnimationEnd oAnimationEnd oanimation MSAnimationEnd', fn.oneShot) },
	
	    /*  1. Adds a class (that brings CSS animation)
	        2. Waits until CSS animation done
	        3. Removes that class
	        4. Calls 'done'
	     */
	    animateWith: function (cls, done) {
	        if (cls) {
	            this.addClass (cls)
	            this.animationend (this.$ (function () { this.removeClass (cls)
	                                                     if (done) { done.call (this) } })) }
	        return this },
	
	    transitionWith: function (cls, done) {
	        if (cls) {
	            this.addClass (cls)
	            this.transitionend (this.$ (function () { this.removeClass (cls)
	                                                      if (done) { done.call (this) } })) }
	        return this },
	
	    /*  Powerful drag & drop abstraction, perfectly compatible with touch devices. Documentation pending.
	
	        Simplest example:
	
	            $(handle).drag ({
	                start: function ()             { return this.leftTop () },                          // returns 'memo'
	                move:  function (memo, offset) { this.css (memo.add (offset).asLeftTop) } }) })
	     */
	    drag: (function () {
	
	        /*  Helper routine
	         */
	        var translateTouchEvent = function (e, desiredTarget) {
	            return (e.originalEvent.touches &&
	                    _.find (e.originalEvent.touches, function (touch) {
	                                                        return $(touch.target).hasParent (desiredTarget) })) || e }
	        /*  Impl
	         */
	        return function (cfg) {
	
	            this[0].dragConfig = cfg
	
	            if (!$platform.touch && !window.__globalDragOverlay) {
	                 window.__globalDragOverlay =
	                     $('<div>').css ({
	                        display: 'none',
	                        position: 'fixed',
	                        top: 0, right: 0, bottom: 0, left: 0,
	                        zIndex: 999999 }).appendTo (document.body) }
	
	            var overlay = window.__globalDragOverlay
	            var button  = cfg.button || 1
	                
	            var begin = this.$ (function (initialEvent) { var relativeTo = (cfg.relativeTo || this)
	
	                this.addClass (cfg.cls || '')
	                
	                if ($platform.touch || initialEvent.which === button) { var offset = relativeTo.offset (), memo = undefined
	                    
	                    if (!cfg.start || ((memo = cfg.start.call (cfg.context || this, new Vec2 (
	                            // position (relative to delegate target)
	                            initialEvent.pageX - offset.left,
	                            initialEvent.pageY - offset.top), initialEvent)) !== false)) /* one can cancel drag by returning false from 'start' */ {
	                        
	                        var abort = undefined, unbind = undefined, end = undefined
	
	                        memo = _.clone (memo)
	
	                        var move = this.$ (function (e) {
	                            if ($platform.touch || e.which === button) {
	                                e.preventDefault ()
	                                var translatedEvent = translateTouchEvent (e, this[0])
	                                var offset = relativeTo.offset ()
	
	                                memo = cfg.move.call (cfg.context || this, memo, new Vec2 (
	                                    // offset (relative to initial event)
	                                    translatedEvent.pageX - initialEvent.pageX,
	                                    translatedEvent.pageY - initialEvent.pageY), new Vec2 (
	                                    // position (relative to delegate target)
	                                    translatedEvent.pageX - offset.left,
	                                    translatedEvent.pageY - offset.top),
	                                    // the event
	                                    translatedEvent) || memo }
	                            else {
	                                abort (e) } })
	
	                        unbind = function () { $(overlay || document.body)
	                                                .css (overlay ? { display: 'none' } : {})
	                                                .off ('mouseup touchend',    end)
	                                                .off ('mousemove touchmove', move) }
	
	                        end = this.$ (function (e) { unbind ()
	                            
	                            if (cfg.end) { var translatedEvent = translateTouchEvent (e, this[0])
	                                cfg.end.call (cfg.context || this, memo, new Vec2 (
	                                    // offset (relative to initial event)
	                                    translatedEvent.pageX - initialEvent.pageX,
	                                    translatedEvent.pageY - initialEvent.pageY), translatedEvent) }
	
	                            this.removeClass (cfg.cls || '') })
	
	                        abort = this.$ (function (e) { unbind (); end (e) })
	
	                        $(overlay || document.body)
	                            .css (overlay ? { display: '', cursor: cfg.cursor || '' } : {})
	                            .on ('mousemove touchmove', move)
	                            .one ('mouseup touchend', end)
	
	                        if (cfg.callMoveAtStart) {
	                            cfg.move.call (cfg.context || this, memo, Vec2.zero, new Vec2 (
	                                // position (relative to delegate target)
	                                initialEvent.pageX - offset.left,
	                                initialEvent.pageY - offset.top),
	                                // the event
	                                initialEvent) } } } })
	
	            var touchstartListener = _.$ (this, function (e) {
	                var where = _.extend ({}, translateTouchEvent (e, this[0])) /* copy event, cuz on iPad it's re-used by browser */
	                if ($platform.touch && cfg.longPress) {
	                    var cancel = undefined
	                    var timeout = window.setTimeout (_.$ (this, function () {
	                        this.off ('touchmove touchend', cancel)
	                        begin (where) }), 300)
	                    cancel = this.$ (function () {
	                        window.clearTimeout (timeout)
	                        this.off ('touchmove touchend', cancel) })
	                    this.one ('touchmove touchend', cancel) }
	                else {
	                    begin (where)
	                    e.preventDefault ()
	                    e.stopPropagation () } })
	
	            this.on ($platform.touch ? 'touchstart' : 'mousedown', touchstartListener)
	
	            return _.extend (this, {
	                        cancel: this.$ (function () {
	                            this.off ($platform.touch ? 'touchstart' : 'mousedown', touchstartListener) }) }) } }) (),
	
	    /*  $(el).transform ({
	                translate: new Vec2 (a, b),
	                scale:     new Vec2 (x, y),
	                rotate:    180 })
	     */
	    transform: function (cfg) {
	        if (arguments.length === 0) { var components = (this.css ('transform') || '').match (/^matrix\((.+\))$/)
	            if (components) {
	                var m = components[1].split (',').map (parseFloat)
	                return new Transform ({ a: m[0], b: m[1], c: m[2], d: m[3], e: m[4], f: m[5] }) }
	            else {
	                return Transform.identity } }
	        else {
	            return this.css ('transform', (_.isStrictlyObject (cfg) && (
	                (cfg.translate ? ('translate(' + cfg.translate.x + 'px,' + cfg.translate.y + 'px) ') : '') +
	                (cfg.rotate ? ('rotate(' + cfg.rotate + 'rad) ') : '') +
	                (cfg.scale ? ('scale(' + (new Vec2 (cfg.scale).separatedWith (',')) + ')') : ''))) || '') } },
	
	    /*  Other transform helpers
	     */
	    svgTranslate: function (pt) {
	        return this.attr ('transform', 'translate(' + pt.x + ',' + pt.y + ')') },
	    
	    svgTransformMatrix: function (t) {
	        var m = t.components
	        return this.attr ('transform', 'matrix(' +
	            m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')') },
	
	    svgTransformToElement: function (el) {
	        return Transform.svgMatrix (this[0].getTransformToElement (el[0])) },
	
	    svgBBox: function (bbox) {
	        if (arguments.length === 0) { return new BBox (this[0].getBBox ()) }
	                               else { return this.attr (bbox.xywh) } },
	
	    /*  To determine display size of an element
	     */
	    outerExtent:    function () { return new Vec2 (this.outerWidth (), this.outerHeight ()) },
	    extent:         function () { return new Vec2 (this.width (),      this.height ()) },
	    innerExtent:    function () { return new Vec2 (this.innerWidth (), this.innerHeight ()) },
	
	    /*  BBox accessors
	     */
	    outerBBox:      function () { return BBox.fromLTWH (_.extend (this.offset (), this.outerExtent ().asWidthHeight)) },
	    clientBBox:     function () { return BBox.fromLTWH (this[0].getBoundingClientRect ()) },
	
	    /*  Position accessors
	     */
	    leftTop:        function () { return new Vec2.fromLT (this.offset ()) },
	    offsetInParent: function () { return Vec2.fromLeftTop (this.offset ()).sub (
	                                         Vec2.fromLeftTop (this.parent ().offset ())) },
	
	    /*  $(input).monitorInput ({
	                    empty: function (yes) { ... },    // called when empty state changes
	                    focus: function (yes) { ... } })  // called when focus state changes
	     */
	    monitorInput: function (cfg) {
	        var change = function () {
	            if ($.trim ($(this).val ()) === '') { cfg.empty (true) }
	            else                                { cfg.empty (false) } }
	        return this
	            .keyup (change)
	            .change (change)
	            .focus (_.bind (cfg.focus || _.noop, cfg, true))
	            .blur (_.bind (cfg.focus || _.noop, cfg, false)) },
	
	    /*  Use instead of .click for more responsive clicking on touch devices.
	        Reverts to .click on desktop
	     */
	    touchClick: function (fn, cfg) {
	        var self = this
	        cfg = cfg || {}
	        if (!cfg.disableTouch && $platform.touch) { // touch experience
	            var touchstartHandler = function (e) {
	                fn.apply (this, arguments)
	                e.preventDefault () // prevents nasty delayed click-focus effect on iOS
	                return false }
	
	            var clickHandler = function (e) {
	                e.preventDefault ()
	                return false }
	
	            if (cfg.handler) {
	                cfg.handler ({
	                    unbind: function () {
	                        self.off ('touchstart', touchstartHandler).off ('click', clickHandler) } }) }
	
	            return this.on ('touchstart', touchstartHandler).on ('click', clickHandler) }
	
	        else { // mouse experience
	            if (cfg.handler) {
	                cfg.handler ({
	                    unbind: function () {
	                        self.off ('click', fn) } }) }
	            return this.click (fn) } },
	
	    /*  Use instead of .dblclick for responsive doubleclick on touch devices
	        Reverts to .dblclick on desktop
	     */
	    touchDoubleclick: function (fn) {
	        if ($platform.touch) {
	            var lastTime = Date.now ()
	            return this.on ('touchend', function () {
	                var now = Date.now ()
	                if ((now - lastTime) < 200) {
	                    fn.apply (this, arguments) }
	                lastTime = now }) }
	        else {
	            return this.dblclick (fn) } },
	
	    /*  Taken from stackoverflow discussion on how to prevent zoom-on-double-tap behavior on iOS
	     */
	    nodoubletapzoom: function () {
	        return $(this).bind ('touchstart', function preventZoom (e) {
	            var t2 = e.timeStamp
	            var t1 = $(this).data ('lastTouch') || t2
	            var dt = t2 - t1
	            var fingers = e.originalEvent.touches.length
	            $(this).data ('lastTouch', t2)
	            if (!dt || dt > 500 || fingers > 1) {
	                return } // not double-tap
	            e.preventDefault ()                     // double tap - prevent the zoom
	            $(e.target).trigger ('click') }) }      // also synthesize click events we just swallowed up
	    })
	
	}) (jQuery) }

/***/ },
/* 52 */
/***/ function(module, exports) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	------------------------------------------------------------------------
	
	Error reporting UI
	
	------------------------------------------------------------------------
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	
	/*  ======================================================================== */
	
	(function ($ /* JQUERY */) {
	
	if (typeof UI === 'undefined') {
		UI = {} }
	
	Panic = function (what, cfg) { cfg = _.defaults (_.clone (cfg || {}), { dismiss: _.identity, raw: false })
	
		if (_.isTypeOf (Error, what)) {
			_.extend (cfg, _.pick (what, 'retry', 'dismiss')) }
	
		Panic.widget.append (what, cfg.raw)
	
		if (_.isFunction (cfg.retry)) {
			Panic.widget.onRetry (cfg.retry) }
	
		if (_.isFunction (cfg.dismiss)) {
			Panic.widget.onClose (cfg.dismiss) } }
	
	Panic.init = function () {
		if (!Panic._initialized) {
			 Panic._initialized = true
		   _.withUncaughtExceptionHandler (function (e) { Panic (e); throw e /* re-throw, to make it visible in WebInspector */ }) } }
	
	Panic.widget = $singleton (Component, {
	
		retryTriggered: $triggerOnce (),
		closeTriggered: $triggerOnce (),
	
		el: $memoized ($property (function () {
	
			var el = $('<div class="panic-modal-overlay" style="z-index:5000; display:none;">').append ([
				this.bg    = $('<div class="panic-modal-overlay-background">'),
				this.modal = $('<div class="panic-modal">').append ([
					this.modalBody = $('<div class="panic-modal-body">').append (
						this.title = $('<div class="panic-modal-title">Now panic!</div>')),
					$('<div class="panic-modal-footer">').append ([
						this.btnRetry = $('<button type="button" class="panic-btn panic-btn-warning" style="display:none;">Try again</button>')
							.touchClick (this.retry),
						this.btnClose = $('<button type="button" class="panic-btn panic-btn-danger" style="display:none;">Close</button>')
							.touchClick (this.close) ]) ]) ])
	
			el.appendTo (document.body)
			
			$(document).ready (function () {
				el.appendTo (document.body) })
	
			try {
				$(window).resize (this.layout).resize ()
				this.modal.enableScrollFaders ({ scroller: this.modalBody })
				$(document).keydown (this.$ (function (e) { if (e.keyCode === 27) { this.close () } })) }
	
			catch (e) {
				_.delay (function () { Panic (e) }) }
	
			return el })),
	
		layout: function () { var maxContentWidth = _.coerceToUndefined (_.max (_.map (this.modal.find ('pre'), _.property ('scrollWidth'))))
	
			this.modal.css ({ 'max-height': $(window).height () - 100,
							  'width': maxContentWidth && (maxContentWidth + 120) })
	
			this.modalBody.scroll () },
	
		toggleVisibility: function (yes) {
			if (yes !== !(this.el.css ('display') === 'none')) {
		        if (yes) {
		            this.el.css ('display', '') }
		        this.el.animateWith (yes ? 'panic-modal-appear' : 'panic-modal-disappear', this.$ (function () {
		            if (!yes) {
		                this.el.css ('display', 'none') } })) } },
	
		onRetry: function (retry) {
			this.retryTriggered (retry)
			this.btnRetry.css ('display', '') },
	
		onClose: function (close) {
			this.closeTriggered (close)
			this.btnClose.css ('display', '') },
	
		retry: function () {
			this._clean ()
			this.closeTriggered.off ()
			this.toggleVisibility (false)
			this.retryTriggered () },
	
		close: function () {
			this._clean ()
			this.retryTriggered.off ()
			this.toggleVisibility (false)
			this.closeTriggered () },
	
	   _clean: function () {
			this.modalBody.find ('.panic-alert-error').remove ()
			this.modalBody.scroll ()
			this.btnRetry.css ('display', 'none')
			this.btnClose.css ('display', 'none') },
	
		append: function (what, raw) { var id = 'panic' + this.hash (what)
	
			var counter = $('#' + id + ' .panic-alert-counter')
			if (counter.length) {
				counter.text ((counter.text () || '1').parsedInt + 1) }
			else {
				$('<div class="panic-alert-error">').attr ('id', id)
													.append ('<span class="panic-alert-counter">')
													.append (this.print (what, raw))
													.insertAfter (this.el.find ('.panic-modal-title')) }
			this.toggleVisibility (true)
			this.layout ()  },
	
		hash: function (what) {
			return ((_.isTypeOf (Error, what) ? (what && what.stack) :
					(_.isTypeOf (Test, what)  ? (what.suite + what.name) :
	                String.ify (what))) || '').hash },
	
		print: function (what, raw) {
			return (_.isTypeOf (Error, what) ?
							this.printError (what) :
				   (_.isTypeOf (Test, what) ?
							this.printFailedTest (what) :
							this.printUnknownStuff (what, raw))) },
	
		printUnknownStuff: function (what, raw) {
			return raw ? what : $('<span>').text (log.impl.stringify (what)) },
	
		printLocation: function (where) {
			return $('<span class="location">')
						.append ([$('<span class="callee">').text (where.calleeShort),
								  $('<span class="file">')  .text (where.fileName), 
								  $('<span class="line">')  .text (where.line)]) },
	
		printFailedTest: function (test) { var logEl = $('<pre class="test-log" style="margin-top: 13px;">')
	
			log.withWriteBackend (
				this.$ (function (params) { if (_.isTypeOf (Error, params.args.first)) { console.log (params.args.first) }
	
					logEl.append (_.isTypeOf (Error, params.args.first)
							? ($('<div class="inline-exception-entry">')
									.append ([_.escape (params.indentation),
												$('<div class="panic-alert-error inline-exception">').append (
													this.printError (params.args.first))]))
							: $('<div class="log-entry">')
									.append (
										_.map (params.lines, function (line, i, lines) {
																return $('<div class="line">')
																			.append (_.escape (params.indentation))
																			.append (_.map (line, function (run) {
																									return $('<span>')
																										.attr ('style', (run.config.color && run.config.color.css) || '')
																										.text (run.text) }))
																			.append ((i === lines.lastIndex) ?
																				[params.where && this.printLocation (params.where),
																				 params.trailNewlines.replace (/\n/g, '<br>')] : []) }, this))) }),
	
				function (done) {
					test.evalLogCalls ()
					done () })
	
			return [$('<div class="panic-alert-error-message" style="font-weight: bold;">')
					    .text (test.name)
					    .append ('<span style="float:right; opacity: 0.25;">test failed</span>'), logEl] },
	
		printError: function (e) { var stackEntries = CallStack.fromErrorWithAsync (e)
			return [
	
				$('<div class="panic-alert-error-message" style="font-weight: bold;">')
					.text (e.message)
					.append (_.any (stackEntries, function (e, i) { return (e.thirdParty || e['native'] || e.hide) && (i !== 0) })
								? '<a class="clean-toggle" href="javascript:{}"></a>'
								: '')
					.click (this.$ (function (e) {
						$(e.delegateTarget).parent ()
							.toggleClass ('all-stack-entries')
							.transitionend (this.$ (function () {
								this.modalBody.scroll () })) })),
	
				$('<div class="not-matching" style="margin-top: 5px; padding-left: 10px;">').append (_.map (_.coerceToArray (e.notMatching || []), function (s) {
					return $('<pre>').text (log.impl.stringify (s)) })),
	
				$('<ul class="callstack">').append (_.map (stackEntries, this.$ (function (entry) {
	
					var dom = $('<li class="callstack-entry">')
							.toggleClass ('third-party', entry.thirdParty || false)
	                        .toggleClass ('hide',        entry.hide || false)
							.toggleClass ('native',      entry['native'] || false)
							.append ([
								$('<span class="file">').text (_.nonempty ([entry.index ? '(index)' : entry.fileShort,
																			entry.line]).join (':')),
								$('<span class="callee">').text (entry.calleeShort),
								$('<span class="src i-am-busy">').click (this.$ (function (e) { var el = $(e.delegateTarget)
									el.waitUntil (SourceFiles.read.partial ((entry.remote ? 'api/source/' : '') + entry.file), this.$ (function (text) {
										if (dom.is ('.full')) {
											dom.removeClass ('full')
											dom.transitionend (function () {
												if (!dom.is ('.full')) {
													entry.sourceReady (el.$ ($.fn.text)) } }) }
										else {
											dom.addClass ('full'); el.html (_.map (text.split ('\n'), function (line) {
																				return $('<div class="line">').text (line) }))
	
											var line = el.find ('.line').eq (entry.line - 1).addClass ('hili')
											if (line.length) {
												var offset = line.offset ().top - el.offset ().top
												el.scrollTop (offset - 100) }
	
											_.delay (this.$ (function () {
												var shouldScrollDownMore = ((el.outerBBox ().bottom + 242) - this.modalBody.outerBBox ().bottom)
												if (shouldScrollDownMore > 0) {
													this.modalBody.animate ({
														scrollTop: this.modalBody.scrollTop () + shouldScrollDownMore }, 250) }})) } })) })) ])
	
					entry.sourceReady (function (text) {
						dom.find ('.src').removeClass ('i-am-busy').text (text) })
	
					return dom }))) ] } })
	
	$.fn.extend ({
		enableScrollFaders: function (cfg) {
			var horizontal = cfg && cfg.horizontal
			var faderTop, faderBottom, scroller = this.find ((cfg && cfg.scroller) || '.scroller')
	
			this.css ({ position: 'relative' })
			this.append (faderTop = $('<div class="scroll-fader scroll-fader-' + (horizontal ? 'left' : 'top') + '"></div>'))
				.append (faderBottom = $('<div class="scroll-fader scroll-fader-' + (horizontal ? 'right' : 'bottom') + '"></div>'))
			
			scroller.scroll (function () {
					var scrollTop = horizontal ? $(this).scrollLeft () : $(this).scrollTop (),
						height = horizontal ? $(this).width () : $(this).height (),
						max = (horizontal ? this.scrollWidth : this.scrollHeight) - 1
					faderTop.css ({ opacity: scrollTop > 0 ? 1 : 0 })
					faderBottom.css ({ opacity: (scrollTop + height) < max ? 1 : 0 }) }).scroll ()
	
			return this } })
	
	// -- end of namespace
	
	}) (jQuery);

/***/ },
/* 53 */
/***/ function(module, exports) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	------------------------------------------------------------------------
	
	Modal overlay that renders log.js output for debugging purposes
	
	------------------------------------------------------------------------
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	
	(function ($ /* JQUERY */) {
	
		LogOverlay = $singleton (Component, {
	
			$defaults: {
				opaque: false,     // disables passing of printed log messages to default write backend (console.log) 
				/*init: false*/ }, // deferred init
	
			init: function () {
					log.withWriteBackend (this.write, function () {})
	
					$(document).keydown (this.$ (function (e) {
						if (e.keyCode === 192) { // ~
							this.toggle () }
						else if (e.keyCode === 27) { // Esc
							this.body.empty () } })) },
	
			el: $memoized ($property (function () {
										return $('<div class="useless-log-overlay" style="display: none;">')
													.append ('<div class="useless-log-overlay-body">')
													.appendTo (document.body) })),
	
			body: $memoized ($property (function () {
											return this.el.find ('.useless-log-overlay-body') })),
	
			toggle: function (yes) {
						this.el.toggle (yes) },
	
			visible: $property (function () {
									return this.el.is (':visible') }),
	
			clip: function () {
			            var elHeight   = this.el.height ()
			            var bodyHeight = this.body.height ()
	
			            this.body.children ().filter (this.$ (function (i, line) {
	
			            	var lineTop 	= bodyHeight - $(line).offsetInParent ().y
			            	var lineBottom  = lineTop    - $(line).height ()
			            	var clipHeight  = elHeight / 2
	
			            	return (lineTop    > clipHeight) &&
			            		   (lineBottom > clipHeight) })).remove () },
	
			write: function (params) { 	this.toggle (true)
	
										if (params.config.clear) {
											this.body.empty () }
	
							            this.body.append ($('<div class="ulo-line">')
											            	.attr ('style', (params.color && params.color.css) || '')
											            	.append ($('<span class="ulo-line-text">') .text (params.indentedText  + ' '))
											            	.append ($('<span class="ulo-line-where">').text (params.codeLocation  + ' '))
											            	.append ($('<span class="ulo-line-trail">').text (params.trailNewlines)))
	
							            this.clip.postpone ()
	
							            if (!this.opaque) {
											log.impl.defaultWriteBackend (params) } } })
	
	// -- end of namespace
	
	}) (jQuery);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(55);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(57)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./Panic.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./Panic.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(56)();
	// imports
	
	
	// module
	exports.push([module.id, "@-webkit-keyframes bombo-jumbo {\n  0%   { -webkit-transform: scale(0); }\n  80%  { -webkit-transform: scale(1.2); }\n  100% { -webkit-transform: scale(1); } }\n\n@keyframes bombo-jumbo {\n  0%   { transform: scale(0); }\n  80%  { transform: scale(1.2); }\n  100% { transform: scale(1); } }\n\n@-webkit-keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n@keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n.i-am-busy { -webkit-animation: pulse-opacity 1s ease-in infinite; animation: pulse-opacity 1s ease-in infinite; pointer-events: none; }\n\n.panic-modal .scroll-fader-top, .scroll-fader-bottom { left: 42px; right: 42px; position: absolute; height: 20px; pointer-events: none; }\n.panic-modal .scroll-fader-top { top: 36px; background: -webkit-linear-gradient(bottom, rgba(255,255,255,0), rgba(255,255,255,1)); }\n.panic-modal .scroll-fader-bottom { bottom: 128px; background: -webkit-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,1)); }\n\n.panic-modal-appear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1);\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); }\n\n.panic-modal-disappear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); -webkit-animation-direction: reverse;\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); animation-direction: reverse; }\n\n.panic-modal-overlay {\n          display: -ms-flexbox; display: -moz-flex; display: -webkit-flex; display: flex;\n          -ms-flex-direction: column; -moz-flex-direction: column; -webkit-flex-direction: column; flex-direction: column;\n          -ms-align-items: center; -moz-align-items: center; -webkit-align-items: center; align-items: center;\n          -ms-flex-pack: center; -ms-align-content: center; -moz-align-content: center; -webkit-align-content: center; align-content: center;\n          -ms-justify-content: center; -moz-justify-content: center; -webkit-justify-content: center; justify-content: center;\n          position: fixed; left: 0; right: 0; top: 0; bottom: 0; }\n\n.panic-modal-overlay-background { z-index: 1; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background: white; opacity: 0.75; }\n\n.panic-modal * { letter-spacing: 0; font-family: Helvetica, sans-serif; }\n.panic-modal { font-family: Helvetica, sans-serif; min-width: 640px; max-width: 90%; transition: 0.25s width ease-in-out; box-sizing: border-box; display: -webkit-flex; display: flex; position: relative; border-radius: 4px; z-index: 2; width: 640px; background: white; padding: 36px 42px 128px 42px; box-shadow: 0px 30px 80px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15); }\n.panic-alert-counter { float: left; background: #904C34; border-radius: 8px; width: 17px; height: 17px; display: inline-block; text-align: center; line-height: 16px; margin-right: 1em; margin-left: -2px; font-size: 10px; color: white; font-weight: bold; }\n.panic-alert-counter:empty { display: none; }\n\n.panic-modal-title { font-family: Helvetica, sans-serif; color: black; font-weight: 300; font-size: 30px; opacity: 0.5; margin-bottom: 1em; }\n.panic-modal-body { overflow-y: auto; width: 100%; }\n.panic-modal-footer { text-align: right; position: absolute; left: 0; right: 0; bottom: 0; padding: 42px; }\n\n.panic-btn { margin-left: 1em; font-weight: 300; font-family: Helvetica, sans-serif; -webkit-user-select: none; user-select: none; cursor: pointer; display: inline-block; padding: 1em 1.5em; border-radius: 4px; font-size: 14px; border: 1px solid black; color: white; }\n.panic-btn:focus { outline: none; }\n.panic-btn:focus { box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); }\n\n.panic-btn-danger       { background-color: #d9534f; border-color: #d43f3a; }\n.panic-btn-danger:hover { background-color: #c9302c; border-color: #ac2925; }\n\n.panic-btn-warning       { background-color: #f0ad4e; border-color: #eea236; }\n.panic-btn-warning:hover { background-color: #ec971f; border-color: #d58512; }\n\n.panic-alert-error { border-radius: 4px; background: #FFE8E2; color: #904C34; padding: 1em 1.2em 1.2em 1.2em; margin-bottom: 1em; font-size: 14px; }\n\n.panic-alert-error { position: relative; text-shadow: 0px 1px 0px rgba(255,255,255,0.25); }\n\n.panic-alert-error .clean-toggle { height: 2em; text-decoration: none; font-weight: 300; position: absolute; color: black; opacity: 0.25; right: 0; top: 0; display: block; text-align: right; }\n.panic-alert-error .clean-toggle:hover { text-decoration: underline; }\n.panic-alert-error .clean-toggle:before,\n.panic-alert-error .clean-toggle:after { position: absolute; right: 0; transition: all 0.25s ease-in-out; display: inline-block; overflow: hidden; }\n.panic-alert-error .clean-toggle:before { -webkit-transform-origin: center left; transform-origin: center left; content: 'more'; }\n.panic-alert-error .clean-toggle:after { -webkit-transform-origin: center left; transform-origin: center right; content: 'less'; }\n.panic-alert-error.all-stack-entries .clean-toggle:before { -webkit-transform: scale(0); transform: scale(0); }\n.panic-alert-error:not(.all-stack-entries) .clean-toggle:after { -webkit-transform: scale(0); transform: scale(0); }\n\n.panic-alert-error:last-child { margin-bottom: 0; }\n\n.panic-alert-error-message { line-height: 1.2em; position: relative; }\n\n.panic-alert-error .callstack { font-size: 12px; margin: 2em 0 0.1em 0; padding: 0; }\n.panic-alert-error .callstack * { font-family: Menlo, monospace; }\n\n.panic-alert-error .callstack-entry { white-space: nowrap; opacity: 1; transition: all 0.25s ease-in-out; margin-top: 10px; list-style-type: none; max-height: 38px; overflow: hidden; }\n.panic-alert-error .callstack-entry .file { }\n.panic-alert-error .callstack-entry .file:not(:empty) + .callee:not(:empty):before { content: ' \\2192   '; }\n\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.third-party:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.hide:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.native:not(:first-child) { max-height: 0; margin-top: 0; opacity: 0; }\n\n.panic-alert-error .callstack-entry,\n.panic-alert-error .callstack-entry * { line-height: initial; }\n.panic-alert-error .callstack-entry .src { overflow: hidden; transition: height 0.25s ease-in-out; height: 22px; border-radius: 2px; cursor: pointer; margin-top: 2px; white-space: pre; display: block; color: black; background: rgba(255,255,255,0.75); padding: 4px; }\n.panic-alert-error .callstack-entry.full .src { font-size: 12px; height: 200px; overflow: scroll; }\n.panic-alert-error .callstack-entry.full .src .line.hili { background: yellow; }\n.panic-alert-error .callstack-entry.full { max-height: 220px; }\n\n.panic-alert-error .callstack-entry .src.i-am-busy { background: white; }\n\n.panic-alert-error .callstack-entry        .src:empty                  { pointer-events: none; }\n.panic-alert-error .callstack-entry        .src:empty:before           { content: '<< SOURCE NOT LOADED >>'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry.native .src:empty:before           { content: '<< NATIVE CODE >>'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry        .src.i-am-busy:empty:before { content: '<< SOURCE LOADING >>'; color: rgba(0,0,0,0.5); }\n\n.panic-alert-error .test-log .location { transition: opacity 0.25s ease-in-out; color: black; opacity: 0.25; display: inline-block; overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }\n.panic-alert-error .test-log .location:hover { opacity: 1; }\n\n.panic-alert-error .test-log .location:before { content: ' @ '; }\n\n.panic-alert-error .test-log .location .callee:after  { content: ', '; }\n.panic-alert-error .test-log .location .file          { opacity: 0.5; }\n.panic-alert-error .test-log .location .line:before   { content: ':'; }\n.panic-alert-error .test-log .location .line          { opacity: 0.25; }\n\n/*  Hack to prevent inline-blocked divs from wrapping within white-space: pre;\n */\n.panic-alert-error .test-log .inline-exception-entry:after { content: ' '; }\n.panic-alert-error .test-log .log-entry        .line:after { content: ' '; }\n.panic-alert-error           .callstack-entry  .line:after { content: ' '; }\n\n.panic-alert-error pre { overflow: scroll; border-radius: 2px; color: black; background: rgba(255,255,255,0.75); padding: 4px; margin: 0; }\n.panic-alert-error pre,\n.panic-alert-error pre * { font-family: Menlo, monospace; font-size: 11px; white-space: pre !important; }\n\n.panic-alert-error.inline-exception { max-width: 640px; border-radius: 0; margin: 0; background: none; display: inline-block; transform-origin: 0 0; transform: scale(0.95); }\n.panic-alert-error.inline-exception .panic-alert-error-message { cursor: pointer; }\n.panic-alert-error.inline-exception:not(:first-child) { margin-top: 10px; border-top: 1px solid #904C34; }\n\n", ""]);
	
	// exports


/***/ },
/* 56 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(59);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(57)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./LogOverlay.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./LogOverlay.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(56)();
	// imports
	
	
	// module
	exports.push([module.id, ".useless-log-overlay {\tposition: fixed; bottom: 10px; left: 10px; right: 10px; top: 10px; z-index: 5000;\n\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t\t\t-webkit-mask-image: -webkit-gradient(linear, left top, left bottom,\n\t\t\t\t\t\t\tcolor-stop(0.00, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.50, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.60, rgba(0,0,0,0.8)),\n\t\t\t\t\t\t\tcolor-stop(1.00, rgba(0,0,0,1))); }\n\n.useless-log-overlay-body {\n\n\tfont-family: Menlo, monospace;\n\tfont-size: 11px;\n\twhite-space: pre;\n\tbackground: rgba(255,255,255,1);\n\ttext-shadow: 1px 1px 0px rgba(0,0,0,0.07); position: absolute; bottom: 0; left: 0; right: 0; }\n\n.ulo-line \t\t{ white-space: pre; word-wrap: normal; }\n.ulo-line-where { color: black; opacity: 0.25; }", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=panic.js.map