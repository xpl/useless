/*    AUTO GENERATED from panic.js (stripped unit tests and comments) */

(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = '';
    return __webpack_require__(0);
}([
    function (module, exports, __webpack_require__) {
        __webpack_require__(1);
        $uselessFile = 'panic.js';
        __webpack_require__(37);
    },
    function (module, exports, __webpack_require__) {
        $uselessFile = 'useless.client.js';
        _ = __webpack_require__(2);
        _ = function () {
            _.mixin({
                zipWith: function (rows, zippo) {
                    return _.reduce(_.rest(rows), function (memo, row) {
                        return _.times(Math.max(memo && memo.length || 0, row && row.length || 0), function (i) {
                            return zippo(memo && memo[i], row && row[i]);
                        });
                    }, _.first(rows));
                }
            });
            if ('a1 b2 c3' !== _.zipWith([
                    [
                        'a',
                        'b',
                        'c'
                    ],
                    [
                        1,
                        2,
                        3
                    ]
                ], function (a, b) {
                    return a + b;
                }).join(' ')) {
                throw new Error('_.zipWith broken');
            }
            return _;
        }();
        _.tests = {};
        _.deferTest = _.withTest = function (name, test, subj) {
            subj();
        };
        __webpack_require__(3);
        __webpack_require__(4);
        __webpack_require__(5);
        __webpack_require__(6);
        __webpack_require__(7);
        __webpack_require__(8);
        __webpack_require__(9);
        __webpack_require__(10);
        __webpack_require__(11);
        __webpack_require__(12);
        __webpack_require__(13);
        __webpack_require__(14);
        __webpack_require__(15);
        __webpack_require__(16);
        __webpack_require__(17);
        __webpack_require__(18);
        __webpack_require__(19);
        __webpack_require__(20);
        __webpack_require__(21);
        __webpack_require__(22);
        __webpack_require__(23);
        __webpack_require__(25);
        __webpack_require__(26);
        __webpack_require__(27);
        __webpack_require__(28);
        __webpack_require__(29);
        __webpack_require__(30);
        __webpack_require__(31);
        __webpack_require__(32);
        __webpack_require__(33);
        __webpack_require__(34);
        __webpack_require__(35);
        __webpack_require__(36);
    },
    function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        (function () {
            var root = this;
            var previousUnderscore = root._;
            var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
            var push = ArrayProto.push, slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
            var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, nativeCreate = Object.create;
            var Ctor = function () {
            };
            var _ = function (obj) {
                if (obj instanceof _)
                    return obj;
                if (!(this instanceof _))
                    return new _(obj);
                this._wrapped = obj;
            };
            if (true) {
                if (typeof module !== 'undefined' && module.exports) {
                    exports = module.exports = _;
                }
                exports._ = _;
            } else {
                root._ = _;
            }
            _.VERSION = '1.8.3';
            var optimizeCb = function (func, context, argCount) {
                if (context === void 0)
                    return func;
                switch (argCount == null ? 3 : argCount) {
                case 1:
                    return function (value) {
                        return func.call(context, value);
                    };
                case 2:
                    return function (value, other) {
                        return func.call(context, value, other);
                    };
                case 3:
                    return function (value, index, collection) {
                        return func.call(context, value, index, collection);
                    };
                case 4:
                    return function (accumulator, value, index, collection) {
                        return func.call(context, accumulator, value, index, collection);
                    };
                }
                return function () {
                    return func.apply(context, arguments);
                };
            };
            var cb = function (value, context, argCount) {
                if (value == null)
                    return _.identity;
                if (_.isFunction(value))
                    return optimizeCb(value, context, argCount);
                if (_.isObject(value))
                    return _.matcher(value);
                return _.property(value);
            };
            _.iteratee = function (value, context) {
                return cb(value, context, Infinity);
            };
            var createAssigner = function (keysFunc, undefinedOnly) {
                return function (obj) {
                    var length = arguments.length;
                    if (length < 2 || obj == null)
                        return obj;
                    for (var index = 1; index < length; index++) {
                        var source = arguments[index], keys = keysFunc(source), l = keys.length;
                        for (var i = 0; i < l; i++) {
                            var key = keys[i];
                            if (!undefinedOnly || obj[key] === void 0)
                                obj[key] = source[key];
                        }
                    }
                    return obj;
                };
            };
            var baseCreate = function (prototype) {
                if (!_.isObject(prototype))
                    return {};
                if (nativeCreate)
                    return nativeCreate(prototype);
                Ctor.prototype = prototype;
                var result = new Ctor();
                Ctor.prototype = null;
                return result;
            };
            var property = function (key) {
                return function (obj) {
                    return obj == null ? void 0 : obj[key];
                };
            };
            var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
            var getLength = property('length');
            var isArrayLike = function (collection) {
                var length = getLength(collection);
                return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
            };
            _.each = _.forEach = function (obj, iteratee, context) {
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
            _.map = _.collect = function (obj, iteratee, context) {
                iteratee = cb(iteratee, context);
                var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, results = Array(length);
                for (var index = 0; index < length; index++) {
                    var currentKey = keys ? keys[index] : index;
                    results[index] = iteratee(obj[currentKey], currentKey, obj);
                }
                return results;
            };
            function createReduce(dir) {
                function iterator(obj, iteratee, memo, keys, index, length) {
                    for (; index >= 0 && index < length; index += dir) {
                        var currentKey = keys ? keys[index] : index;
                        memo = iteratee(memo, obj[currentKey], currentKey, obj);
                    }
                    return memo;
                }
                return function (obj, iteratee, memo, context) {
                    iteratee = optimizeCb(iteratee, context, 4);
                    var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = dir > 0 ? 0 : length - 1;
                    if (arguments.length < 3) {
                        memo = obj[keys ? keys[index] : index];
                        index += dir;
                    }
                    return iterator(obj, iteratee, memo, keys, index, length);
                };
            }
            _.reduce = _.foldl = _.inject = createReduce(1);
            _.reduceRight = _.foldr = createReduce(-1);
            _.find = _.detect = function (obj, predicate, context) {
                var key;
                if (isArrayLike(obj)) {
                    key = _.findIndex(obj, predicate, context);
                } else {
                    key = _.findKey(obj, predicate, context);
                }
                if (key !== void 0 && key !== -1)
                    return obj[key];
            };
            _.filter = _.select = function (obj, predicate, context) {
                var results = [];
                predicate = cb(predicate, context);
                _.each(obj, function (value, index, list) {
                    if (predicate(value, index, list))
                        results.push(value);
                });
                return results;
            };
            _.reject = function (obj, predicate, context) {
                return _.filter(obj, _.negate(cb(predicate)), context);
            };
            _.every = _.all = function (obj, predicate, context) {
                predicate = cb(predicate, context);
                var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
                for (var index = 0; index < length; index++) {
                    var currentKey = keys ? keys[index] : index;
                    if (!predicate(obj[currentKey], currentKey, obj))
                        return false;
                }
                return true;
            };
            _.some = _.any = function (obj, predicate, context) {
                predicate = cb(predicate, context);
                var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
                for (var index = 0; index < length; index++) {
                    var currentKey = keys ? keys[index] : index;
                    if (predicate(obj[currentKey], currentKey, obj))
                        return true;
                }
                return false;
            };
            _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
                if (!isArrayLike(obj))
                    obj = _.values(obj);
                if (typeof fromIndex != 'number' || guard)
                    fromIndex = 0;
                return _.indexOf(obj, item, fromIndex) >= 0;
            };
            _.invoke = function (obj, method) {
                var args = slice.call(arguments, 2);
                var isFunc = _.isFunction(method);
                return _.map(obj, function (value) {
                    var func = isFunc ? method : value[method];
                    return func == null ? func : func.apply(value, args);
                });
            };
            _.pluck = function (obj, key) {
                return _.map(obj, _.property(key));
            };
            _.where = function (obj, attrs) {
                return _.filter(obj, _.matcher(attrs));
            };
            _.findWhere = function (obj, attrs) {
                return _.find(obj, _.matcher(attrs));
            };
            _.max = function (obj, iteratee, context) {
                var result = -Infinity, lastComputed = -Infinity, value, computed;
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
                    _.each(obj, function (value, index, list) {
                        computed = iteratee(value, index, list);
                        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                            result = value;
                            lastComputed = computed;
                        }
                    });
                }
                return result;
            };
            _.min = function (obj, iteratee, context) {
                var result = Infinity, lastComputed = Infinity, value, computed;
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
                    _.each(obj, function (value, index, list) {
                        computed = iteratee(value, index, list);
                        if (computed < lastComputed || computed === Infinity && result === Infinity) {
                            result = value;
                            lastComputed = computed;
                        }
                    });
                }
                return result;
            };
            _.shuffle = function (obj) {
                var set = isArrayLike(obj) ? obj : _.values(obj);
                var length = set.length;
                var shuffled = Array(length);
                for (var index = 0, rand; index < length; index++) {
                    rand = _.random(0, index);
                    if (rand !== index)
                        shuffled[index] = shuffled[rand];
                    shuffled[rand] = set[index];
                }
                return shuffled;
            };
            _.sample = function (obj, n, guard) {
                if (n == null || guard) {
                    if (!isArrayLike(obj))
                        obj = _.values(obj);
                    return obj[_.random(obj.length - 1)];
                }
                return _.shuffle(obj).slice(0, Math.max(0, n));
            };
            _.sortBy = function (obj, iteratee, context) {
                iteratee = cb(iteratee, context);
                return _.pluck(_.map(obj, function (value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iteratee(value, index, list)
                    };
                }).sort(function (left, right) {
                    var a = left.criteria;
                    var b = right.criteria;
                    if (a !== b) {
                        if (a > b || a === void 0)
                            return 1;
                        if (a < b || b === void 0)
                            return -1;
                    }
                    return left.index - right.index;
                }), 'value');
            };
            var group = function (behavior) {
                return function (obj, iteratee, context) {
                    var result = {};
                    iteratee = cb(iteratee, context);
                    _.each(obj, function (value, index) {
                        var key = iteratee(value, index, obj);
                        behavior(result, value, key);
                    });
                    return result;
                };
            };
            _.groupBy = group(function (result, value, key) {
                if (_.has(result, key))
                    result[key].push(value);
                else
                    result[key] = [value];
            });
            _.indexBy = group(function (result, value, key) {
                result[key] = value;
            });
            _.countBy = group(function (result, value, key) {
                if (_.has(result, key))
                    result[key]++;
                else
                    result[key] = 1;
            });
            _.toArray = function (obj) {
                if (!obj)
                    return [];
                if (_.isArray(obj))
                    return slice.call(obj);
                if (isArrayLike(obj))
                    return _.map(obj, _.identity);
                return _.values(obj);
            };
            _.size = function (obj) {
                if (obj == null)
                    return 0;
                return isArrayLike(obj) ? obj.length : _.keys(obj).length;
            };
            _.partition = function (obj, predicate, context) {
                predicate = cb(predicate, context);
                var pass = [], fail = [];
                _.each(obj, function (value, key, obj) {
                    (predicate(value, key, obj) ? pass : fail).push(value);
                });
                return [
                    pass,
                    fail
                ];
            };
            _.first = _.head = _.take = function (array, n, guard) {
                if (array == null)
                    return void 0;
                if (n == null || guard)
                    return array[0];
                return _.initial(array, array.length - n);
            };
            _.initial = function (array, n, guard) {
                return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
            };
            _.last = function (array, n, guard) {
                if (array == null)
                    return void 0;
                if (n == null || guard)
                    return array[array.length - 1];
                return _.rest(array, Math.max(0, array.length - n));
            };
            _.rest = _.tail = _.drop = function (array, n, guard) {
                return slice.call(array, n == null || guard ? 1 : n);
            };
            _.compact = function (array) {
                return _.filter(array, _.identity);
            };
            var flatten = function (input, shallow, strict, startIndex) {
                var output = [], idx = 0;
                for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
                    var value = input[i];
                    if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                        if (!shallow)
                            value = flatten(value, shallow, strict);
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
            _.flatten = function (array, shallow) {
                return flatten(array, shallow, false);
            };
            _.without = function (array) {
                return _.difference(array, slice.call(arguments, 1));
            };
            _.uniq = _.unique = function (array, isSorted, iteratee, context) {
                if (!_.isBoolean(isSorted)) {
                    context = iteratee;
                    iteratee = isSorted;
                    isSorted = false;
                }
                if (iteratee != null)
                    iteratee = cb(iteratee, context);
                var result = [];
                var seen = [];
                for (var i = 0, length = getLength(array); i < length; i++) {
                    var value = array[i], computed = iteratee ? iteratee(value, i, array) : value;
                    if (isSorted) {
                        if (!i || seen !== computed)
                            result.push(value);
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
            _.union = function () {
                return _.uniq(flatten(arguments, true, true));
            };
            _.intersection = function (array) {
                var result = [];
                var argsLength = arguments.length;
                for (var i = 0, length = getLength(array); i < length; i++) {
                    var item = array[i];
                    if (_.contains(result, item))
                        continue;
                    for (var j = 1; j < argsLength; j++) {
                        if (!_.contains(arguments[j], item))
                            break;
                    }
                    if (j === argsLength)
                        result.push(item);
                }
                return result;
            };
            _.difference = function (array) {
                var rest = flatten(arguments, true, true, 1);
                return _.filter(array, function (value) {
                    return !_.contains(rest, value);
                });
            };
            _.zip = function () {
                return _.unzip(arguments);
            };
            _.unzip = function (array) {
                var length = array && _.max(array, getLength).length || 0;
                var result = Array(length);
                for (var index = 0; index < length; index++) {
                    result[index] = _.pluck(array, index);
                }
                return result;
            };
            _.object = function (list, values) {
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
            function createPredicateIndexFinder(dir) {
                return function (array, predicate, context) {
                    predicate = cb(predicate, context);
                    var length = getLength(array);
                    var index = dir > 0 ? 0 : length - 1;
                    for (; index >= 0 && index < length; index += dir) {
                        if (predicate(array[index], index, array))
                            return index;
                    }
                    return -1;
                };
            }
            _.findIndex = createPredicateIndexFinder(1);
            _.findLastIndex = createPredicateIndexFinder(-1);
            _.sortedIndex = function (array, obj, iteratee, context) {
                iteratee = cb(iteratee, context, 1);
                var value = iteratee(obj);
                var low = 0, high = getLength(array);
                while (low < high) {
                    var mid = Math.floor((low + high) / 2);
                    if (iteratee(array[mid]) < value)
                        low = mid + 1;
                    else
                        high = mid;
                }
                return low;
            };
            function createIndexFinder(dir, predicateFind, sortedIndex) {
                return function (array, item, idx) {
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
                        if (array[idx] === item)
                            return idx;
                    }
                    return -1;
                };
            }
            _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
            _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
            _.range = function (start, stop, step) {
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
            var executeBound = function (sourceFunc, boundFunc, context, callingContext, args) {
                if (!(callingContext instanceof boundFunc))
                    return sourceFunc.apply(context, args);
                var self = baseCreate(sourceFunc.prototype);
                var result = sourceFunc.apply(self, args);
                if (_.isObject(result))
                    return result;
                return self;
            };
            _.bind = function (func, context) {
                if (nativeBind && func.bind === nativeBind)
                    return nativeBind.apply(func, slice.call(arguments, 1));
                if (!_.isFunction(func))
                    throw new TypeError('Bind must be called on a function');
                var args = slice.call(arguments, 2);
                var bound = function () {
                    return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
                };
                return bound;
            };
            _.partial = function (func) {
                var boundArgs = slice.call(arguments, 1);
                var bound = function () {
                    var position = 0, length = boundArgs.length;
                    var args = Array(length);
                    for (var i = 0; i < length; i++) {
                        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
                    }
                    while (position < arguments.length)
                        args.push(arguments[position++]);
                    return executeBound(func, bound, this, this, args);
                };
                return bound;
            };
            _.bindAll = function (obj) {
                var i, length = arguments.length, key;
                if (length <= 1)
                    throw new Error('bindAll must be passed function names');
                for (i = 1; i < length; i++) {
                    key = arguments[i];
                    obj[key] = _.bind(obj[key], obj);
                }
                return obj;
            };
            _.memoize = function (func, hasher) {
                var memoize = function (key) {
                    var cache = memoize.cache;
                    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
                    if (!_.has(cache, address))
                        cache[address] = func.apply(this, arguments);
                    return cache[address];
                };
                memoize.cache = {};
                return memoize;
            };
            _.delay = function (func, wait) {
                var args = slice.call(arguments, 2);
                return setTimeout(function () {
                    return func.apply(null, args);
                }, wait);
            };
            _.defer = _.partial(_.delay, _, 1);
            _.throttle = function (func, wait, options) {
                var context, args, result;
                var timeout = null;
                var previous = 0;
                if (!options)
                    options = {};
                var later = function () {
                    previous = options.leading === false ? 0 : _.now();
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout)
                        context = args = null;
                };
                return function () {
                    var now = _.now();
                    if (!previous && options.leading === false)
                        previous = now;
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
                        if (!timeout)
                            context = args = null;
                    } else if (!timeout && options.trailing !== false) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            };
            _.debounce = function (func, wait, immediate) {
                var timeout, args, context, timestamp, result;
                var later = function () {
                    var last = _.now() - timestamp;
                    if (last < wait && last >= 0) {
                        timeout = setTimeout(later, wait - last);
                    } else {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                            if (!timeout)
                                context = args = null;
                        }
                    }
                };
                return function () {
                    context = this;
                    args = arguments;
                    timestamp = _.now();
                    var callNow = immediate && !timeout;
                    if (!timeout)
                        timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                        context = args = null;
                    }
                    return result;
                };
            };
            _.wrap = function (func, wrapper) {
                return _.partial(wrapper, func);
            };
            _.negate = function (predicate) {
                return function () {
                    return !predicate.apply(this, arguments);
                };
            };
            _.compose = function () {
                var args = arguments;
                var start = args.length - 1;
                return function () {
                    var i = start;
                    var result = args[start].apply(this, arguments);
                    while (i--)
                        result = args[i].call(this, result);
                    return result;
                };
            };
            _.after = function (times, func) {
                return function () {
                    if (--times < 1) {
                        return func.apply(this, arguments);
                    }
                };
            };
            _.before = function (times, func) {
                var memo;
                return function () {
                    if (--times > 0) {
                        memo = func.apply(this, arguments);
                    }
                    if (times <= 1)
                        func = null;
                    return memo;
                };
            };
            _.once = _.partial(_.before, 2);
            var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
            var nonEnumerableProps = [
                'valueOf',
                'isPrototypeOf',
                'toString',
                'propertyIsEnumerable',
                'hasOwnProperty',
                'toLocaleString'
            ];
            function collectNonEnumProps(obj, keys) {
                var nonEnumIdx = nonEnumerableProps.length;
                var constructor = obj.constructor;
                var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;
                var prop = 'constructor';
                if (_.has(obj, prop) && !_.contains(keys, prop))
                    keys.push(prop);
                while (nonEnumIdx--) {
                    prop = nonEnumerableProps[nonEnumIdx];
                    if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                        keys.push(prop);
                    }
                }
            }
            _.keys = function (obj) {
                if (!_.isObject(obj))
                    return [];
                if (nativeKeys)
                    return nativeKeys(obj);
                var keys = [];
                for (var key in obj)
                    if (_.has(obj, key))
                        keys.push(key);
                if (hasEnumBug)
                    collectNonEnumProps(obj, keys);
                return keys;
            };
            _.allKeys = function (obj) {
                if (!_.isObject(obj))
                    return [];
                var keys = [];
                for (var key in obj)
                    keys.push(key);
                if (hasEnumBug)
                    collectNonEnumProps(obj, keys);
                return keys;
            };
            _.values = function (obj) {
                var keys = _.keys(obj);
                var length = keys.length;
                var values = Array(length);
                for (var i = 0; i < length; i++) {
                    values[i] = obj[keys[i]];
                }
                return values;
            };
            _.mapObject = function (obj, iteratee, context) {
                iteratee = cb(iteratee, context);
                var keys = _.keys(obj), length = keys.length, results = {}, currentKey;
                for (var index = 0; index < length; index++) {
                    currentKey = keys[index];
                    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
                }
                return results;
            };
            _.pairs = function (obj) {
                var keys = _.keys(obj);
                var length = keys.length;
                var pairs = Array(length);
                for (var i = 0; i < length; i++) {
                    pairs[i] = [
                        keys[i],
                        obj[keys[i]]
                    ];
                }
                return pairs;
            };
            _.invert = function (obj) {
                var result = {};
                var keys = _.keys(obj);
                for (var i = 0, length = keys.length; i < length; i++) {
                    result[obj[keys[i]]] = keys[i];
                }
                return result;
            };
            _.functions = _.methods = function (obj) {
                var names = [];
                for (var key in obj) {
                    if (_.isFunction(obj[key]))
                        names.push(key);
                }
                return names.sort();
            };
            _.extend = createAssigner(_.allKeys);
            _.extendOwn = _.assign = createAssigner(_.keys);
            _.findKey = function (obj, predicate, context) {
                predicate = cb(predicate, context);
                var keys = _.keys(obj), key;
                for (var i = 0, length = keys.length; i < length; i++) {
                    key = keys[i];
                    if (predicate(obj[key], key, obj))
                        return key;
                }
            };
            _.pick = function (object, oiteratee, context) {
                var result = {}, obj = object, iteratee, keys;
                if (obj == null)
                    return result;
                if (_.isFunction(oiteratee)) {
                    keys = _.allKeys(obj);
                    iteratee = optimizeCb(oiteratee, context);
                } else {
                    keys = flatten(arguments, false, false, 1);
                    iteratee = function (value, key, obj) {
                        return key in obj;
                    };
                    obj = Object(obj);
                }
                for (var i = 0, length = keys.length; i < length; i++) {
                    var key = keys[i];
                    var value = obj[key];
                    if (iteratee(value, key, obj))
                        result[key] = value;
                }
                return result;
            };
            _.omit = function (obj, iteratee, context) {
                if (_.isFunction(iteratee)) {
                    iteratee = _.negate(iteratee);
                } else {
                    var keys = _.map(flatten(arguments, false, false, 1), String);
                    iteratee = function (value, key) {
                        return !_.contains(keys, key);
                    };
                }
                return _.pick(obj, iteratee, context);
            };
            _.defaults = createAssigner(_.allKeys, true);
            _.create = function (prototype, props) {
                var result = baseCreate(prototype);
                if (props)
                    _.extendOwn(result, props);
                return result;
            };
            _.clone = function (obj) {
                if (!_.isObject(obj))
                    return obj;
                return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
            };
            _.tap = function (obj, interceptor) {
                interceptor(obj);
                return obj;
            };
            _.isMatch = function (object, attrs) {
                var keys = _.keys(attrs), length = keys.length;
                if (object == null)
                    return !length;
                var obj = Object(object);
                for (var i = 0; i < length; i++) {
                    var key = keys[i];
                    if (attrs[key] !== obj[key] || !(key in obj))
                        return false;
                }
                return true;
            };
            var eq = function (a, b, aStack, bStack) {
                if (a === b)
                    return a !== 0 || 1 / a === 1 / b;
                if (a == null || b == null)
                    return a === b;
                if (a instanceof _)
                    a = a._wrapped;
                if (b instanceof _)
                    b = b._wrapped;
                var className = toString.call(a);
                if (className !== toString.call(b))
                    return false;
                switch (className) {
                case '[object RegExp]':
                case '[object String]':
                    return '' + a === '' + b;
                case '[object Number]':
                    if (+a !== +a)
                        return +b !== +b;
                    return +a === 0 ? 1 / +a === 1 / b : +a === +b;
                case '[object Date]':
                case '[object Boolean]':
                    return +a === +b;
                }
                var areArrays = className === '[object Array]';
                if (!areArrays) {
                    if (typeof a != 'object' || typeof b != 'object')
                        return false;
                    var aCtor = a.constructor, bCtor = b.constructor;
                    if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                        return false;
                    }
                }
                aStack = aStack || [];
                bStack = bStack || [];
                var length = aStack.length;
                while (length--) {
                    if (aStack[length] === a)
                        return bStack[length] === b;
                }
                aStack.push(a);
                bStack.push(b);
                if (areArrays) {
                    length = a.length;
                    if (length !== b.length)
                        return false;
                    while (length--) {
                        if (!eq(a[length], b[length], aStack, bStack))
                            return false;
                    }
                } else {
                    var keys = _.keys(a), key;
                    length = keys.length;
                    if (_.keys(b).length !== length)
                        return false;
                    while (length--) {
                        key = keys[length];
                        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack)))
                            return false;
                    }
                }
                aStack.pop();
                bStack.pop();
                return true;
            };
            _.isEqual = function (a, b) {
                return eq(a, b);
            };
            _.isEmpty = function (obj) {
                if (obj == null)
                    return true;
                if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)))
                    return obj.length === 0;
                return _.keys(obj).length === 0;
            };
            _.isElement = function (obj) {
                return !!(obj && obj.nodeType === 1);
            };
            _.isArray = nativeIsArray || function (obj) {
                return toString.call(obj) === '[object Array]';
            };
            _.isObject = function (obj) {
                var type = typeof obj;
                return type === 'function' || type === 'object' && !!obj;
            };
            _.each([
                'Arguments',
                'Function',
                'String',
                'Number',
                'Date',
                'RegExp',
                'Error'
            ], function (name) {
                _['is' + name] = function (obj) {
                    return toString.call(obj) === '[object ' + name + ']';
                };
            });
            if (!_.isArguments(arguments)) {
                _.isArguments = function (obj) {
                    return _.has(obj, 'callee');
                };
            }
            if (typeof /./ != 'function' && typeof Int8Array != 'object') {
                _.isFunction = function (obj) {
                    return typeof obj == 'function' || false;
                };
            }
            _.isFinite = function (obj) {
                return isFinite(obj) && !isNaN(parseFloat(obj));
            };
            _.isNaN = function (obj) {
                return _.isNumber(obj) && obj !== +obj;
            };
            _.isBoolean = function (obj) {
                return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
            };
            _.isNull = function (obj) {
                return obj === null;
            };
            _.isUndefined = function (obj) {
                return obj === void 0;
            };
            _.has = function (obj, key) {
                return obj != null && hasOwnProperty.call(obj, key);
            };
            _.noConflict = function () {
                root._ = previousUnderscore;
                return this;
            };
            _.identity = function (value) {
                return value;
            };
            _.constant = function (value) {
                return function () {
                    return value;
                };
            };
            _.noop = function () {
            };
            _.property = property;
            _.propertyOf = function (obj) {
                return obj == null ? function () {
                } : function (key) {
                    return obj[key];
                };
            };
            _.matcher = _.matches = function (attrs) {
                attrs = _.extendOwn({}, attrs);
                return function (obj) {
                    return _.isMatch(obj, attrs);
                };
            };
            _.times = function (n, iteratee, context) {
                var accum = Array(Math.max(0, n));
                iteratee = optimizeCb(iteratee, context, 1);
                for (var i = 0; i < n; i++)
                    accum[i] = iteratee(i);
                return accum;
            };
            _.random = function (min, max) {
                if (max == null) {
                    max = min;
                    min = 0;
                }
                return min + Math.floor(Math.random() * (max - min + 1));
            };
            _.now = Date.now || function () {
                return new Date().getTime();
            };
            var escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&#x27;',
                '`': '&#x60;'
            };
            var unescapeMap = _.invert(escapeMap);
            var createEscaper = function (map) {
                var escaper = function (match) {
                    return map[match];
                };
                var source = '(?:' + _.keys(map).join('|') + ')';
                var testRegexp = RegExp(source);
                var replaceRegexp = RegExp(source, 'g');
                return function (string) {
                    string = string == null ? '' : '' + string;
                    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
                };
            };
            _.escape = createEscaper(escapeMap);
            _.unescape = createEscaper(unescapeMap);
            _.result = function (object, property, fallback) {
                var value = object == null ? void 0 : object[property];
                if (value === void 0) {
                    value = fallback;
                }
                return _.isFunction(value) ? value.call(object) : value;
            };
            var idCounter = 0;
            _.uniqueId = function (prefix) {
                var id = ++idCounter + '';
                return prefix ? prefix + id : id;
            };
            _.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var noMatch = /(.)^/;
            var escapes = {
                '\'': '\'',
                '\\': '\\',
                '\r': 'r',
                '\n': 'n',
                '\u2028': 'u2028',
                '\u2029': 'u2029'
            };
            var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
            var escapeChar = function (match) {
                return '\\' + escapes[match];
            };
            _.template = function (text, settings, oldSettings) {
                if (!settings && oldSettings)
                    settings = oldSettings;
                settings = _.defaults({}, settings, _.templateSettings);
                var matcher = RegExp([
                    (settings.escape || noMatch).source,
                    (settings.interpolate || noMatch).source,
                    (settings.evaluate || noMatch).source
                ].join('|') + '|$', 'g');
                var index = 0;
                var source = '__p+=\'';
                text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
                    source += text.slice(index, offset).replace(escaper, escapeChar);
                    index = offset + match.length;
                    if (escape) {
                        source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
                    } else if (interpolate) {
                        source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
                    } else if (evaluate) {
                        source += '\';\n' + evaluate + '\n__p+=\'';
                    }
                    return match;
                });
                source += '\';\n';
                if (!settings.variable)
                    source = 'with(obj||{}){\n' + source + '}\n';
                source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';
                try {
                    var render = new Function(settings.variable || 'obj', '_', source);
                } catch (e) {
                    e.source = source;
                    throw e;
                }
                var template = function (data) {
                    return render.call(this, data, _);
                };
                var argument = settings.variable || 'obj';
                template.source = 'function(' + argument + '){\n' + source + '}';
                return template;
            };
            _.chain = function (obj) {
                var instance = _(obj);
                instance._chain = true;
                return instance;
            };
            var result = function (instance, obj) {
                return instance._chain ? _(obj).chain() : obj;
            };
            _.mixin = function (obj) {
                _.each(_.functions(obj), function (name) {
                    var func = _[name] = obj[name];
                    _.prototype[name] = function () {
                        var args = [this._wrapped];
                        push.apply(args, arguments);
                        return result(this, func.apply(_, args));
                    };
                });
            };
            _.mixin(_);
            _.each([
                'pop',
                'push',
                'reverse',
                'shift',
                'sort',
                'splice',
                'unshift'
            ], function (name) {
                var method = ArrayProto[name];
                _.prototype[name] = function () {
                    var obj = this._wrapped;
                    method.apply(obj, arguments);
                    if ((name === 'shift' || name === 'splice') && obj.length === 0)
                        delete obj[0];
                    return result(this, obj);
                };
            });
            _.each([
                'concat',
                'join',
                'slice'
            ], function (name) {
                var method = ArrayProto[name];
                _.prototype[name] = function () {
                    return result(this, method.apply(this._wrapped, arguments));
                };
            });
            _.prototype.value = function () {
                return this._wrapped;
            };
            _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
            _.prototype.toString = function () {
                return '' + this._wrapped;
            };
            if (true) {
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return _;
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }
        }.call(this));
    },
    function (module, exports) {
        unicode_hack = function () {
            var unicodeCategories = {
                Cn: '[\u0378\u0379Ϳ-\u0383\u038B\u038D\u03A2Ԩ-\u0530\u0557\u0558\u0560\u0588\u058B-\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u05FF\u0604\u0605\u061C\u061D\u070E\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-ࣿॸঀ\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-ఀ\u0C04\u0C0D\u0C11\u0C29ఴ\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80ಁ\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-ഁ\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDBໞ-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6-\u10CFჽ-ჿ\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169Fᛱ-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FFᤝ-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F᮫-ᮭᮺ-ᮿ\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CCFᳳ-\u1CFFᷧ-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u2065-\u2069\u2072\u2073\u208F\u209D-\u209F\u20BA-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u27CB\u27CD\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5FⳲ-\u2CF8\u2D26-\u2D2Fⵦ-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E32-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF鿌-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63Fꙴ-ꙻꚘ-ꚟ\uA6F8-\uA6FF\uA78FꞒ-ꞟꞪ-ꟹ\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DDꧠ-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5Bꩼ-ꩿ\uAAC3-\uAADAꫠ-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF郞隷\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F︧-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD\uFEFE\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFF8\uFFFE\uFFFF]',
                Lu: '[A-ZÀ-ÖØ-ÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸŹŻŽƁƂƄƆƇƉ-ƋƎ-ƑƓƔƖ-ƘƜƝƟƠƢƤƦƧƩƬƮƯƱ-ƳƵƷƸƼǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺȻȽȾɁɃ-ɆɈɊɌɎͰͲͶΆΈ-ΊΌΎΏΑ-ΡΣ-ΫϏϒ-ϔϘϚϜϞϠϢϤϦϨϪϬϮϴϷϹϺϽ-ЯѠѢѤѦѨѪѬѮѰѲѴѶѸѺѼѾҀҊҌҎҐҒҔҖҘҚҜҞҠҢҤҦҨҪҬҮҰҲҴҶҸҺҼҾӀӁӃӅӇӉӋӍӐӒӔӖӘӚӜӞӠӢӤӦӨӪӬӮӰӲӴӶӸӺӼӾԀԂԄԆԈԊԌԎԐԒԔԖԘԚԜԞԠԢԤԦԱ-ՖႠ-ჅḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾἈ-ἏἘ-ἝἨ-ἯἸ-ἿὈ-ὍὙὛὝὟὨ-ὯᾸ-ΆῈ-ΉῘ-ΊῨ-ῬῸ-Ώℂℇℋ-ℍℐ-ℒℕℙ-ℝℤΩℨK-ℭℰ-ℳℾℿⅅↃⰀ-ⰮⱠⱢ-ⱤⱧⱩⱫⱭ-ⱰⱲⱵⱾ-ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢⳫⳭꙀꙂꙄꙆꙈꙊꙌꙎꙐꙒꙔꙖꙘꙚꙜꙞꙠꙢꙤꙦꙨꙪꙬꚀꚂꚄꚆꚈꚊꚌꚎꚐꚒꚔꚖꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽꝾꞀꞂꞄꞆꞋꞍꞐꞠꞢꞤꞦꞨＡ-Ｚ]',
                Ll: '[a-zªµºß-öø-ÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķĸĺļľŀłńņňŉŋōŏőœŕŗřśŝşšţťŧũūŭůűųŵŷźżž-ƀƃƅƈƌƍƒƕƙ-ƛƞơƣƥƨƪƫƭưƴƶƹƺƽ-ƿǆǉǌǎǐǒǔǖǘǚǜǝǟǡǣǥǧǩǫǭǯǰǳǵǹǻǽǿȁȃȅȇȉȋȍȏȑȓȕȗșțȝȟȡȣȥȧȩȫȭȯȱȳ-ȹȼȿɀɂɇɉɋɍɏ-ʓʕ-ʯͱͳͷͻ-ͽΐά-ώϐϑϕ-ϗϙϛϝϟϡϣϥϧϩϫϭϯ-ϳϵϸϻϼа-џѡѣѥѧѩѫѭѯѱѳѵѷѹѻѽѿҁҋҍҏґғҕҗҙқҝҟҡңҥҧҩҫҭүұҳҵҷҹһҽҿӂӄӆӈӊӌӎӏӑӓӕӗәӛӝӟӡӣӥӧөӫӭӯӱӳӵӷӹӻӽӿԁԃԅԇԉԋԍԏԑԓԕԗԙԛԝԟԡԣԥԧա-ևᴀ-ᴫᵢ-ᵷᵹ-ᶚḁḃḅḇḉḋḍḏḑḓḕḗḙḛḝḟḡḣḥḧḩḫḭḯḱḳḵḷḹḻḽḿṁṃṅṇṉṋṍṏṑṓṕṗṙṛṝṟṡṣṥṧṩṫṭṯṱṳṵṷṹṻṽṿẁẃẅẇẉẋẍẏẑẓẕ-ẝẟạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹỻỽỿ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶᾷιῂ-ῄῆῇῐ-ΐῖῗῠ-ῧῲ-ῴῶῷℊℎℏℓℯℴℹℼℽⅆ-ⅉⅎↄⰰ-ⱞⱡⱥⱦⱨⱪⱬⱱⱳⱴⱶ-ⱼⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⲳⲵⲷⲹⲻⲽⲿⳁⳃⳅⳇⳉⳋⳍⳏⳑⳓⳕⳗⳙⳛⳝⳟⳡⳣⳤⳬⳮⴀ-ⴥꙁꙃꙅꙇꙉꙋꙍꙏꙑꙓꙕꙗꙙꙛꙝꙟꙡꙣꙥꙧꙩꙫꙭꚁꚃꚅꚇꚉꚋꚍꚏꚑꚓꚕꚗꜣꜥꜧꜩꜫꜭꜯ-ꜱꜳꜵꜷꜹꜻꜽꜿꝁꝃꝅꝇꝉꝋꝍꝏꝑꝓꝕꝗꝙꝛꝝꝟꝡꝣꝥꝧꝩꝫꝭꝯꝱ-ꝸꝺꝼꝿꞁꞃꞅꞇꞌꞎꞑꞡꞣꞥꞧꞩꟺﬀ-ﬆﬓ-ﬗａ-ｚ]',
                Lt: '[ǅǈǋǲᾈ-ᾏᾘ-ᾟᾨ-ᾯᾼῌῼ]',
                Lm: '[ʰ-ˁˆ-ˑˠ-ˤˬˮʹͺՙـۥۦߴߵߺࠚࠤࠨॱๆໆჼៗᡃᪧᱸ-ᱽᴬ-ᵡᵸᶛ-ᶿⁱⁿₐ-ₜⱽⵯⸯ々〱-〵〻ゝゞー-ヾꀕꓸ-ꓽꘌꙿꜗ-ꜟꝰꞈꧏꩰꫝｰﾞﾟ]',
                Lo: '[ƻǀ-ǃʔא-תװ-ײؠ-ؿف-يٮٯٱ-ۓەۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪࠀ-ࠕࡀ-ࡘऄ-हऽॐक़-ॡॲ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๅກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໜໝༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎა-ჺᄀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៜᠠ-ᡂᡄ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᯀ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱷᳩ-ᳬᳮ-ᳱℵ-ℸⴰ-ⵥⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ〆〼ぁ-ゖゟァ-ヺヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿋ꀀ-ꀔꀖ-ꒌꓐ-ꓷꔀ-ꘋꘐ-ꘟꘪꘫꙮꚠ-ꛥꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩯꩱ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛꫜꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-鶴侮-舘並-龎יִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼｦ-ｯｱ-ﾝﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]',
                Mn: '[̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ऀ-ंऺ़ु-ै्॑-ॗॢॣঁ়ু-ৄ্ৢৣਁਂ਼ੁੂੇੈੋ-੍ੑੰੱੵઁં઼ુ-ૅેૈ્ૢૣଁ଼ିୁ-ୄ୍ୖୢୣஂீ்ా-ీె-ైొ-్ౕౖౢౣ಼ಿೆೌ್ೢೣു-ൄ്ൢൣ්ි-ුූัิ-ฺ็-๎ັິ-ູົຼ່-ໍཱ༹༘༙༵༷-ཾྀ-྄྆྇ྍ-ྗྙ-ྼ࿆ိ-ူဲ-့္်ွှၘၙၞ-ၠၱ-ၴႂႅႆႍႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳិ-ួំ៉-៓៝᠋-᠍ᢩᤠ-ᤢᤧᤨᤲ᤹-᤻ᨘᨗᩖᩘ-ᩞ᩠ᩢᩥ-ᩬᩳ-᩿᩼ᬀ-ᬃ᬴ᬶ-ᬺᬼᭂ᭫-᭳ᮀᮁᮢ-ᮥᮨᮩ᯦ᯨᯩᯭᯯ-ᯱᰬ-ᰳᰶ᰷᳐-᳔᳒-᳢᳠-᳨᳭᷀-ᷦ᷼-᷿⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯꙼꙽꛰꛱ꠂ꠆ꠋꠥꠦ꣄꣠-꣱ꤦ-꤭ꥇ-ꥑꦀ-ꦂ꦳ꦶ-ꦹꦼꨩ-ꨮꨱꨲꨵꨶꩃꩌꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꯥꯨ꯭ﬞ︀-️︠-︦]',
                Me: '[\u0488\u0489\u20DD-\u20E0\u20E2-\u20E4\uA670-\uA672]',
                Mc: '[ःऻा-ीॉ-ौॎॏংঃা-ীেৈোৌৗਃਾ-ੀઃા-ીૉોૌଂଃାୀେୈୋୌୗாிுூெ-ைொ-ௌௗఁ-ఃు-ౄಂಃಾೀ-ೄೇೈೊೋೕೖംഃാ-ീെ-ൈൊ-ൌൗංඃා-ෑෘ-ෟෲෳ༾༿ཿါာေးျြၖၗၢ-ၤၧ-ၭႃႄႇ-ႌႏႚ-ႜាើ-ៅះៈᤣ-ᤦᤩ-ᤫᤰᤱᤳ-ᤸᦰ-ᧀᧈᧉᨙ-ᨛᩕᩗᩡᩣᩤᩭ-ᩲᬄᬵᬻᬽ-ᭁᭃ᭄ᮂᮡᮦᮧ᮪ᯧᯪ-ᯬᯮ᯲᯳ᰤ-ᰫᰴᰵ᳡ᳲꠣꠤꠧꢀꢁꢴ-ꣃꥒ꥓ꦃꦴꦵꦺꦻꦽ-꧀ꨯꨰꨳꨴꩍꩻꯣꯤꯦꯧꯩꯪ꯬]',
                Nd: '[0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹０-９]',
                Nl: '[ᛮ-ᛰⅠ-ↂↅ-ↈ〇〡-〩〸-〺ꛦ-ꛯ]',
                No: '[\xB2\xB3\xB9\xBC-\xBE\u09F4-\u09F9\u0B72-\u0B77\u0BF0-\u0BF2\u0C78-\u0C7E\u0D70-\u0D75\u0F2A-\u0F33\u1369-\u137C\u17F0-\u17F9\u19DA\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215F\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3192-\u3195\u3220-\u3229\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA830-\uA835]',
                Zs: '[ \xA0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]',
                Zl: '[\u2028]',
                Zp: '[\u2029]',
                Cc: '[\0-\x1F\x7F-\x9F]',
                Cf: '[\xAD\u0600-\u0603\u06DD\u070F឴឵\u200B-\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]',
                Cs: '[\uD800-\uDFFF]',
                Co: '[\uE000-\uF8FF]',
                Ps: '[([{\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3E\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62]',
                Pd: '[-\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D]',
                Pc: '[_‿⁀⁔︳︴﹍-﹏＿]',
                Pe: '[)]}\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3F\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63]',
                Sm: '[+<->|~\xAC\xB1\xD7\xF7\u03F6\u0606-\u0608\u2044\u2052\u207A-\u207C\u208A-\u208C\u2118\u2140-\u2144\u214B\u2190-\u2194\u219A\u219B\u21A0\u21A3\u21A6\u21AE\u21CE\u21CF\u21D2\u21D4\u21F4-\u22FF\u2308-\u230B\u2320\u2321\u237C\u239B-\u23B3\u23DC-\u23E1\u25B7\u25C1\u25F8-\u25FF\u266F\u27C0-\u27C4\u27C7-\u27CA\u27CC\u27CE-\u27E5\u27F0-\u27FF\u2900-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2AFF\u2B30-\u2B44\u2B47-\u2B4C\uFB29\uFE62\uFE64-\uFE66\uFF0B\uFF1C-\uFF1E\uFF5C\uFF5E\uFFE2\uFFE9-\uFFEC]',
                Po: '[!-#%-\'*,./:;?@\\\xA1\xB7\xBF\u037E\u0387\u055A-\u055F\u0589\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u166D\u166E\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u1805\u1807-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205E\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E16\u2E18\u2E19\u2E1B\u2E1E\u2E1F\u2E2A-\u2E2E\u2E30\u2E31\u3001-\u3003\u303D\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFE10-\uFE16\uFE19\uFE30\uFE45\uFE46\uFE49-\uFE4C\uFE50-\uFE52\uFE54-\uFE57\uFE5F-\uFE61\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF07\uFF0A\uFF0C\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3C\uFF61\uFF64\uFF65]',
                Sk: '[^`\xA8\xAF\xB4\xB8\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u309B\u309C\uA700-\uA716\uA720\uA721\uA789\uA78A\uFBB2-\uFBC1\uFF3E\uFF40\uFFE3]',
                Sc: '[$\xA2-\xA5\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20B9\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]',
                Pi: '[\xAB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20]',
                So: '[\xA6\xA7\xA9\xAE\xB0\xB6\u0482\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09FA\u0B70\u0BF3-\u0BF8\u0BFA\u0C7F\u0D79\u0F01-\u0F03\u0F13-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1360\u1390-\u1399\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u214A\u214C\u214D\u214F\u2195-\u2199\u219C-\u219F\u21A1\u21A2\u21A4\u21A5\u21A7-\u21AD\u21AF-\u21CD\u21D0\u21D1\u21D3\u21D5-\u21F3\u2300-\u2307\u230C-\u231F\u2322-\u2328\u232B-\u237B\u237D-\u239A\u23B4-\u23DB\u23E2-\u23F3\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u25B6\u25B8-\u25C0\u25C2-\u25F7\u2600-\u266E\u2670-\u26FF\u2701-\u2767\u2794-\u27BF\u2800-\u28FF\u2B00-\u2B2F\u2B45\u2B46\u2B50-\u2B59\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA828-\uA82B\uA836\uA837\uA839\uAA77-\uAA79\uFDFD\uFFE4\uFFE8\uFFED\uFFEE\uFFFC\uFFFD]',
                Pf: '[\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21]'
            };
            var firstLetters = {};
            for (var p in unicodeCategories) {
                if (firstLetters[p[0]])
                    firstLetters[p[0]] = unicodeCategories[p].substring(0, unicodeCategories[p].length - 1) + firstLetters[p[0]].substring(1);
                else
                    firstLetters[p[0]] = unicodeCategories[p];
            }
            for (var p in firstLetters)
                unicodeCategories[p] = firstLetters[p];
            return function (regexpString) {
                var modifiers = '';
                if (regexpString instanceof RegExp) {
                    modifiers = (regexpString.global ? 'g' : '') + (regexpString.ignoreCase ? 'i' : '') + (regexpString.multiline ? 'm' : '');
                    regexpString = regexpString.source;
                }
                regexpString = regexpString.replace(/\\p\{(..?)\}/g, function (match, group) {
                    return unicodeCategories[group] || match;
                });
                return new RegExp(regexpString, modifiers);
            };
        }();
    },
    function (module, exports) {
        Base64 = {
            _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            encode: function (input) {
                var output = '';
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = Base64._utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
                }
                return output;
            },
            decode: function (input) {
                var output = '';
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
                while (i < input.length) {
                    enc1 = Base64._keyStr.indexOf(input.charAt(i++));
                    enc2 = Base64._keyStr.indexOf(input.charAt(i++));
                    enc3 = Base64._keyStr.indexOf(input.charAt(i++));
                    enc4 = Base64._keyStr.indexOf(input.charAt(i++));
                    chr1 = enc1 << 2 | enc2 >> 4;
                    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                    chr3 = (enc3 & 3) << 6 | enc4;
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
            _utf8_encode: function (string) {
                string = string.replace(/\r\n/g, '\n');
                var utftext = '';
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if (c > 127 && c < 2048) {
                        utftext += String.fromCharCode(c >> 6 | 192);
                        utftext += String.fromCharCode(c & 63 | 128);
                    } else {
                        utftext += String.fromCharCode(c >> 12 | 224);
                        utftext += String.fromCharCode(c >> 6 & 63 | 128);
                        utftext += String.fromCharCode(c & 63 | 128);
                    }
                }
                return utftext;
            },
            _utf8_decode: function (utftext) {
                var string = '';
                var i = 0;
                var c = c1 = c2 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if (c > 191 && c < 224) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode((c & 31) << 6 | c2 & 63);
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        i += 3;
                    }
                }
                return string;
            }
        };
    },
    function (module, exports) {
        (function (global) {
            ;
            (function () {
                var p = function () {
                    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.platform && navigator.platform.indexOf) {
                        var platform = navigator.platform, userAgent = navigator.userAgent, platformOrUserAgent = platform + '\n' + userAgent;
                        return _.extend({
                            engine: 'browser',
                            browserEngine: userAgent.indexOf('AppleWebKit') >= 0 ? 'WebKit' : undefined,
                            browser: userAgent.indexOf('Firefox') >= 0 ? 'Firefox' : userAgent.indexOf('Chrome') >= 0 ? 'Chrome' : userAgent.indexOf('Safari') >= 0 ? 'Safari' : userAgent.indexOf('Trident') >= 0 ? 'IE' : undefined
                        }, platform.indexOf('Linux arm') >= 0 || platformOrUserAgent.indexOf('Android') >= 0 ? {
                            touch: true,
                            system: 'Android'
                        } : platformOrUserAgent.indexOf('iPad') >= 0 ? {
                            touch: true,
                            system: 'iOS',
                            device: 'iPad'
                        } : platformOrUserAgent.indexOf('iPhone') >= 0 || platformOrUserAgent.indexOf('iPod') >= 0 ? {
                            touch: true,
                            system: 'iOS',
                            device: 'iPhone'
                        } : {});
                    } else if (typeof global !== 'undefined' && global._) {
                        return { engine: 'node' };
                    } else {
                        return {};
                    }
                }();
                var $global = p.engine === 'browser' ? window : p.engine === 'node' ? global : undefined;
                $global.define = function (name, v, cfg) {
                    if (name in $global) {
                        throw new Error('cannot define global ' + name + ': already there');
                    }
                    var def = v && v.get instanceof Function && v.set instanceof Function && v || v instanceof Function && v.length === 0 && { get: v } || { value: v };
                    return Object.defineProperty($global, name, _.extend(def, { enumerable: true }, cfg));
                };
                $global.define('$global', $global);
                $global.define('$platform', Object.defineProperties({}, _.mapObject({
                    engine: p.engine,
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
                    iOS: p.system === 'iOS'
                }, function (v, k) {
                    return {
                        enumerable: true,
                        value: v
                    };
                })));
            }());
            if ($platform.NodeJS) {
                $global.alert = function (args) {
                    var print = $global.log && _.partial(log.warn, log.config({ stackOffset: 2 })) || console.log;
                    print.apply(print, ['ALERT:'].concat(_.asArray(arguments)));
                };
            }
            $global.alert2 = function (args) {
                alert(_.map(arguments, _.stringify).join(', '));
                return arguments[0];
            };
            $global.log = function () {
                console.log.apply(console, arguments);
            };
        }.call(exports, function () {
            return this;
        }()));
    },
    function (module, exports) {
        {
            _.extend(_, {
                asArray: function (x) {
                    return x.length !== undefined ? [].slice.call(x, 0) : [x];
                }
            });
        }
        {
            _.extend(_, {
                numArgs: function (fn) {
                    return fn._ac === undefined ? fn.length : fn._ac;
                },
                restArg: function (fn) {
                    return fn._ra || false;
                },
                noArgs: function (fn) {
                    return _.numArgs(fn) === 0 && !fn._ra;
                },
                hasArgs: function (fn) {
                    return _.numArgs(fn) > 0 && !fn._ra;
                },
                oneArg: function (fn) {
                    return _.numArgs(fn) === 1 && !fn._ra;
                },
                withRestArg: $restArg = function (fn) {
                    Object.defineProperty(fn, '_ra', {
                        enumerable: false,
                        writable: true,
                        value: true
                    });
                    return fn;
                },
                withArgs: function (numArgs, restArg, fn) {
                    if (numArgs !== undefined) {
                        Object.defineProperty(fn, '_ac', {
                            enumerable: false,
                            writable: true,
                            value: numArgs
                        });
                    }
                    if (restArg !== undefined) {
                        Object.defineProperty(fn, '_ra', {
                            enumerable: false,
                            writable: true,
                            value: restArg
                        });
                    }
                    return fn;
                },
                withSameArgs: function (other, fn) {
                    return _.withArgs(_.numArgs(other), _.restArg(other), fn);
                }
            });
        }
        (function () {
            var override = function (name, genImpl) {
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
        }());
    },
    function (module, exports) {
        _.debugEcho = function () {
            return [this].concat(_.asArray(arguments));
        };
        _.call = function (fn, this_, args) {
            return fn.apply(this_, _.rest(arguments, 2));
        };
        _.arity = function (N, fn) {
            return function () {
                return fn.apply(this, _.first(arguments, N));
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
        _.tails = $restArg(function (fn) {
            var tailArgs = _.rest(arguments);
            return function () {
                return fn.apply(this, _.asArray(arguments).concat(tailArgs));
            };
        });
        _.tails2 = $restArg(function (fn) {
            var tailArgs = _.rest(arguments);
            return function (a) {
                return fn.apply(this, [a].concat(tailArgs));
            };
        });
        _.tails3 = $restArg(function (fn) {
            var tailArgs = _.rest(arguments);
            return function (a, b) {
                return fn.apply(this, [
                    a,
                    b
                ].concat(tailArgs));
            };
        });
        {
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
            _.callsWith = $restArg(function () {
                var args = _.asArray(arguments);
                return function (fn) {
                    return _.withSameArgs(fn, function () {
                        return fn.apply(this, args.concat(_.asArray(arguments)));
                    });
                };
            });
            _.tailsWith = $restArg(function () {
                var args = _.asArray(arguments);
                return function (fn) {
                    return _.withSameArgs(fn, function () {
                        return fn.apply(this, _.asArray(arguments).concat(args));
                    });
                };
            });
            _.argumentAppendingWrapper = function (fn, then) {
                return _.withSameArgs(fn, function () {
                    var this_ = this, args = _.asArray(arguments);
                    return then(function () {
                        return fn.apply(this_, args.concat(_.asArray(arguments)));
                    });
                });
            };
            _.argumentPrependingWrapper = function (fn, then) {
                return _.withSameArgs(fn, function () {
                    var this_ = this, args = _.asArray(arguments);
                    return then(function () {
                        return fn.apply(this_, _.asArray(arguments).concat(args));
                    });
                });
            };
        }
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
                _.notImplemented();
            }
        });
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
                    throw new Error('flip: unsupported arity');
                }
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
        {
            _.extend(_, {
                Y: function (eatSelf) {
                    var self = eatSelf(function () {
                        return self.apply(this, arguments);
                    });
                    return self;
                }
            });
        }
        (function () {
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
                return _.isEmpty(x) || _.isString(x) || _.isNumber(x) || !(_.isStrictlyObject(x) || _.isArray(x)) || _.isPrototypeInstance(x) || _.isMeta(x);
            };
            _.isMeta = _.constant(false);
            _.isNonTrivial = _.not(_.isTrivial);
            _.binary = 2;
            _.unary = 1;
        }());
        {
            _.higherOrder = _.callsTo;
        }
        {
            _.eval = function (x) {
                return _.isFunction(x) ? x.call(this) : x;
            };
            _.evals = function (__args__) {
                var arguments_ = arguments;
                return function (x) {
                    return _.isFunction(x) ? x.apply(this, arguments_) : x;
                };
            };
        }
        _.method = function (name) {
            var args = _.rest(arguments);
            return function (obj) {
                return obj[name].apply(obj, args);
            };
        };
        _.asFreeFunction = function (fn) {
            return function (this_, restArg) {
                return fn.apply(this_, _.rest(arguments));
            };
        };
        _.asMethod = function (fn) {
            return function () {
                return fn.apply(undefined, [this].concat(_.asArray(arguments)));
            };
        };
        {
            _.once = function (fn) {
                var called = false;
                return function () {
                    if (!called) {
                        called = true;
                        return fn.apply(this, arguments);
                    }
                };
            };
        }
        {
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
        }
        {
            _.sequence = function (arg) {
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
        }
    },
    function (module, exports) {
        _.asString = function (what) {
            return what + '';
        };
        _.typeOf = function (what) {
            return typeof what;
        };
        _.instanceOf = function (what) {
            return function (x) {
                return x instanceof what;
            };
        };
        _.count = function (what) {
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
                return obj[prop];
            };
        };
        _.oneOf = $restArg(function () {
            return _.propertyOf(_.index(_.asArray(arguments)));
        });
    },
    function (module, exports) {
        _.isInstanceofSyntaxAvailable = function () {
            var e = new Error();
            try {
                return e instanceof Error;
            } catch (e) {
                return false;
            }
        };
        _.isTypeOf_ES4 = function (constructor, what) {
            while (what) {
                if (what.constructor === constructor) {
                    return true;
                }
                what = what.constructor.$base;
            }
            return false;
        };
        _.isTypeOf_ES5 = function (constructor, what) {
            return what instanceof constructor;
        };
        _.isTypeOf = _.isInstanceofSyntaxAvailable() ? _.isTypeOf_ES5 : _.isTypeOf_ES4;
        _.isPrototypeInstance = function (x) {
            return x && x.constructor && _.isPrototypeConstructor(x.constructor);
        };
        _.isPrototypeConstructor = function (x) {
            return x && x.$definition !== undefined || false;
        };
        _.coerceToNaN = function (x) {
            return _.isFinite(x) ? x : Number.NaN;
        };
        _.coerceToArray = function (x) {
            return x === undefined ? [] : _.isArray(x) ? x : [x];
        };
        _.coerceToFunction = function (x) {
            return _.isFunction(x) ? x : _.constant(x);
        };
        _.isArrayLike = function (x) {
            return x instanceof Array || $platform.Browser && x instanceof NodeList;
        };
        {
            _.isArray = function (x) {
                return x instanceof Array;
            };
        }
        {
            _.mixin({
                matches: function (pattern) {
                    return arguments.length === 0 && _.constant(true) || _.tails2(_.match, pattern);
                },
                match: function (a, ptrn) {
                    return a === ptrn || _.isArray(a) && _.isArray(ptrn) && _.arrayMatch(a, ptrn) || _.isObject(a) && _.isObject(ptrn) && _.objectMatch(a, ptrn) || _.isTypeOf(RegExp, ptrn) && _.isString(a) && a.match(ptrn) !== null;
                },
                arrayMatch: function (a, pattern) {
                    return _.every(pattern, _.propertyOf(_.index(a)));
                },
                objectMatch: function (a, pattern) {
                    return _.reduce(_.pairs(pattern), function (result, kv) {
                        return result && _.match(a[kv[0]], kv[1]);
                    }, true);
                }
            });
        }
        {
            _.isScalar = function (v) {
                return v === undefined || v === null || v && v.constructor && (v.constructor === String || v.constructor === Number || v.constructor === Boolean);
            };
        }
        {
            _.isNonPOD = function (v) {
                return v && v.constructor && v.constructor !== Object && v.constructor !== Array && v.constructor !== String && v.constructor !== Number && v.constructor !== Boolean;
            };
            _.isPOD = function (v) {
                return !_.isNonPOD(v);
            };
        }
        {
            if (typeof Number.EPSILON === 'undefined') {
                Object.defineProperty(Number, 'EPSILON', {
                    enumerable: true,
                    get: _.constant(2.220446049250313e-16)
                });
            }
            _.isDecimal = function (x, tolerance) {
                if (!_.isNumber(x) || _.isNaN(x)) {
                    return false;
                } else {
                    return Math.abs(Math.floor(x) - x) > (tolerance || Number.EPSILON);
                }
            };
        }
        {
            _.extend(_, {
                isEmpty: function (obj) {
                    return _.coerceToUndefined(obj) === undefined;
                },
                isNonempty: function (obj) {
                    return _.coerceToUndefined(obj) !== undefined;
                },
                isEmptyObject: function (v) {
                    return !_.isArray(v) && !_.isFunction(v) && _.isObject(v) && _.keys(v).length === 0;
                },
                isStrictlyObject: function (v) {
                    return v && typeof v === 'object' ? true : false;
                },
                isEmptyArray: function (v) {
                    return _.isArray(v) && v.length === 0;
                },
                isNonemptyString: function (v) {
                    return typeof v === 'string' && v.length > 0;
                },
                coerceToObject: function (x) {
                    return _.isStrictlyObject(x) ? x : {};
                },
                coerceToEmpty: function (x) {
                    if (_.isArray(x)) {
                        return [];
                    } else if (_.isStrictlyObject(x)) {
                        return {};
                    } else {
                        return undefined;
                    }
                },
                coerceToUndefined: function (v) {
                    return v === undefined || v === null || v === Math.NaN || v === '' || _.isPOD(v) && (_.isEmptyObject(v) || v.length === 0) ? undefined : v;
                }
            });
        }
    },
    function (module, exports) {
        _.hasStdlib = true;
        {
            _.throwsError = _.higherOrder(_.throwError = function (msg) {
                throw msg instanceof Error ? msg : new Error(msg);
            });
            _.throws = _.higherOrder(_.throw = function (msg) {
                throw msg;
            });
            _.overrideThis = _.throwsError('override this');
            _.notImplemented = _.throwsError('not implemented');
        }
        {
            _.mixin({
                values2: function (x) {
                    if (_.isArrayLike(x)) {
                        return x;
                    } else if (_.isStrictlyObject(x)) {
                        return _.values(x);
                    } else if (_.isEmpty(x)) {
                        return [];
                    } else {
                        return [x];
                    }
                }
            });
        }
        {
            _.mixin({
                map2: function (value, fn, context) {
                    return _.isArrayLike(value) ? _.map(value, fn, context) : value instanceof Set ? _.mapSet(value, fn, context) : _.isStrictlyObject(value) ? _.mapObject(value, fn, context) : fn.call(context, value);
                }
            });
            _.mapSet = function (set, fn, ctx) {
                var out = new Set();
                for (var x of set) {
                    out.add(fn.call(ctx, x));
                }
                return out;
            };
            _.mapsWith = _.higherOrder(_.mapWith = _.flip2(_.map2));
        }
        _.pluck2 = function (x, prop) {
            return _.map2(x, _.property(prop));
        };
        {
            _.mixin({
                scatter: function (obj, elem) {
                    var result = undefined;
                    _.map2(obj, function (x, i) {
                        elem(x, i, function (v, k) {
                            if (arguments.length < 2) {
                                (result = result || []).push(v);
                            } else {
                                (result = result || {})[k] = v;
                            }
                        });
                    });
                    return result;
                }
            });
            _.obj = function (emitItems) {
                var x = undefined;
                emitItems(function (v, k) {
                    (x = x || {})[k] = v;
                });
                return x;
            };
            _.arr = function (emitItems) {
                var x = undefined;
                emitItems(function (v) {
                    (x = x || []).push(arguments.length < 2 ? v : _.asArray(arguments));
                });
                return x;
            };
        }
        {
            _.mapKeys = function (x, fn) {
                if (_.isArrayLike(x)) {
                    return _.map(x, _.tails2(_.mapKeys, fn));
                } else if (_.isStrictlyObject(x)) {
                    return _.object(_.map(_.pairs(x), function (kv) {
                        return [
                            fn(kv[0]),
                            _.mapKeys(kv[1], fn)
                        ];
                    }));
                } else {
                    return x;
                }
            };
        }
        {
            _.mapMap = _.hyperOperator(_.unary, _.map2);
        }
        {
            _.hyperMap = function (data, op) {
                return _.hyperOperator(_.unary, function (expr, f) {
                    return op(expr) || _.map2(expr, f);
                })(data, _.identity);
            };
        }
        {
            _.pairs2 = function (x) {
                return _.scatter(x, function (x, i, return_) {
                    return_([
                        i,
                        x
                    ]);
                });
            };
        }
        {
            _.reject2 = function (value, op) {
                return _.filter2(value, _.not(op));
            };
            _.filter2 = function (value, op) {
                if (_.isArrayLike(value)) {
                    var result = [];
                    for (var i = 0, n = value.length; i < n; i++) {
                        var v = value[i], opSays = op(v, i);
                        if (opSays === true) {
                            result.push(v);
                        } else if (opSays !== false) {
                            result.push(opSays);
                        }
                    }
                    return result;
                } else if (_.isStrictlyObject(value)) {
                    var result = {};
                    _.each(Object.keys(value), function (key) {
                        var v = value[key], opSays = op(v, key);
                        if (opSays === true) {
                            result[key] = v;
                        } else if (opSays !== false) {
                            result[key] = opSays;
                        }
                    });
                    return result;
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
        }
        {
            _.each2 = function (x, f) {
                if (_.isArrayLike(x)) {
                    for (var i = 0, n = x.length; i < n; i++)
                        f(x[i], i, n);
                } else if (_.isStrictlyObject(x)) {
                    var k = Object.keys(x);
                    for (var ki, i = 0, n = k.length; i < n; i++)
                        f(x[ki = k[i]], ki, n);
                } else {
                    f(x, undefined, 1);
                }
            };
        }
        {
            _.reduce2 = function (_1, _2, _3) {
                var no_left = arguments.length < 3;
                var left = _1, rights = _2, op = _3;
                if (no_left) {
                    left = undefined;
                    rights = _1;
                    op = _2;
                }
                _.each2(rights, function (right, i) {
                    left = no_left ? right : op(left, right);
                    no_left = false;
                });
                return left;
            };
            _.reduceReduce = function (_1, _2, _3) {
                var initial = _1, value = _2, op = _3;
                if (arguments.length < 3) {
                    initial = {};
                    value = _1;
                    op = _2;
                }
                return _.hyperOperator(_.binary, _.reduce2, _.goDeeperAlwaysIfPossible)(initial, value, op);
            };
        }
        {
            _.concat = function (a, b) {
                var first, rest;
                if (arguments.length === 1) {
                    first = a[0];
                    rest = _.rest(a);
                } else {
                    first = a;
                    rest = _.rest(arguments);
                }
                return _.isArrayLike(first) ? first.concat.apply(first, rest) : _.reduce2(first, rest, function (a, b) {
                    if (_.isObject(a) && _.isObject(b)) {
                        return _.extend({}, a, b);
                    } else {
                        return a + b;
                    }
                });
            };
        }
        {
            _.mixin({
                zipSetsWith: function (sets, fn) {
                    return _.reduce(_.rest(sets), function (memo, obj) {
                        _.each(_.union(obj && Array.from(obj.values()) || [], memo && Array.from(memo.values()) || []), function (k) {
                            var zipped = fn(memo && memo.has(k) ? k : undefined, obj && obj.has(k) ? k : undefined);
                            if (zipped === undefined) {
                                memo.delete(k);
                            } else {
                                memo.add(zipped);
                            }
                        });
                        return memo;
                    }, new Set(sets[0]));
                },
                zipObjectsWith: function (objects, fn) {
                    return _.reduce(_.rest(objects), function (memo, obj) {
                        _.each(_.union(_.keys(obj), _.keys(memo)), function (k) {
                            var zipped = fn(memo && memo[k], obj && obj[k]);
                            if (zipped === undefined) {
                                delete memo[k];
                            } else {
                                memo[k] = zipped;
                            }
                        });
                        return memo;
                    }, _.clone(objects[0]));
                },
                zip2: function (rows_, fn_) {
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
                }
            });
        }
        {
            _.mixin({ zipZip: _.hyperOperator(_.binary, _.zip2) });
        }
        {
            _.extend = $restArg(_.extend);
            _.extended = $restArg(function () {
                return _.extend.apply(this, [{}].concat(_.asArray(arguments)));
            });
            _.extendWith = _.flip(_.extend);
            _.extendsWith = _.flip(_.partial(_.partial, _.flip(_.extend)));
            _.extendedDeep = _.tails3(_.zipZip, function (a, b) {
                return b === undefined ? a : b;
            });
            _.extend2 = $restArg(function (what) {
                return _.extend(what, _.reduceRight(arguments, function (right, left) {
                    return _.object(_.map(_.union(_.keys(left), _.keys(right)), function (key) {
                        var lvalue = left[key];
                        return [
                            key,
                            key in right ? typeof lvalue === 'object' ? _.extend(lvalue, right[key]) : right[key] : lvalue
                        ];
                    }));
                }, {}));
            });
        }
        {
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
                        var k = ks[i];
                        var x = pred(value[k], k, value);
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
                            var k = ks[i];
                            var x = pred(value[k]);
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
        }
        {
            _.nonempty = function (obj) {
                return _.filter2(obj, _.isNonempty);
            };
        }
        {
            _.extend(_, {
                clone: function (x) {
                    return x instanceof Set ? new Set(x) : !_.isObject(x) ? x : _.isArray(x) ? x.slice() : _.extend({}, x);
                },
                cloneDeep: _.tails2(_.mapMap, function (value) {
                    return _.isStrictlyObject(value) && !_.isPrototypeInstance(value) ? _.clone(value) : value;
                })
            });
        }
        {
            _.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
                return _.coerceToUndefined(_.nonempty(_.zip2(a, b, pred)));
            });
            _.diff = _.tails3(_.hyperMatch, function (a, b) {
                return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? undefined : b;
            });
        }
        {
            _.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
                return _.coerceToUndefined(_.zip2(a, b, pred));
            });
            _.undiff = _.tails3(_.hyperMatch, function (a, b) {
                return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? b : undefined;
            });
        }
        {
            _.extend(_, {
                index: function (list) {
                    var result = {};
                    for (var i = 0, n = list.length; i < n; i++) {
                        result[list[i]] = true;
                    }
                    return result;
                }
            });
        }
        {
            _.quote = function (s, pattern_) {
                var pattern = pattern_ || '';
                var splitAt = Math.floor(pattern.length / 2 + pattern.length % 2);
                var before = pattern.slice(0, splitAt);
                var after = pattern.slice(splitAt) || before;
                return before + s + after;
            };
            _.quoteWith = _.flip2(_.quote);
            _.quotesWith = _.higherOrder(_.quoteWith);
        }
        {
            _.partition2 = function (arr, pred) {
                return _.pluck(_.partition3(arr, pred), 'items');
            };
            _.partition3 = function (arr_, pred) {
                var arr = arr_ || [];
                var spans = [], span = {
                        label: undefined,
                        items: [arr.first]
                    };
                _.each(arr, function (x) {
                    var label = pred(x);
                    if (span.label != label && span.items.length) {
                        spans.push(span = {
                            label: label,
                            items: [x]
                        });
                    } else {
                        span.items.push(x);
                    }
                });
                return span.length && spans.push(span), spans;
            };
        }
        (function () {
            var indexMap = function (list) {
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
                var result = {
                    a: 0,
                    b: 0,
                    length: 0
                };
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
        }());
        _.key = function (fn) {
            return function (value, key) {
                return fn(key);
            };
        };
        _.filterKeys = function (arr, predicate) {
            return _.filter(arr, function (v, k) {
                return predicate(k);
            });
        };
        _.rejectKeys = function (arr, predicate) {
            return _.reject(arr, function (v, k) {
                return predicate(k);
            });
        };
        _.pickKeys = function (obj, predicate) {
            return _.pick(obj, function (v, k) {
                return predicate(k);
            });
        };
        _.omitKeys = function (obj, predicate) {
            return _.omit(obj, function (v, k) {
                return predicate(k);
            });
        };
    },
    function (module, exports) {
        {
            _.extend(_, {
                defineProperty: function (targetObject, name, def, defaultCfg) {
                    if (_.isObject(targetObject) && targetObject.hasOwnProperty(name)) {
                        throw new Error('_.defineProperty: targetObject already has property ' + name);
                    } else {
                        Object.defineProperty(targetObject, name, _.extend({ enumerable: true }, defaultCfg, _.coerceToPropertyDefinition(def, name)));
                    }
                },
                defineHiddenProperty: function (targetObject, name, def, defaultCfg) {
                    return _.defineProperty(targetObject, name, def, _.extend({ enumerable: false }, defaultCfg));
                },
                defineMemoizedProperty: function (targetObject, name, def_, defaultCfg) {
                    var def = _.coerceToPropertyDefinition(def_, name);
                    return _.defineProperty(targetObject, name, _.extend({}, def, { get: _.memoizeToThis('_' + name, def.get) }), defaultCfg);
                },
                defineProperties: function (targetObject, properties) {
                    _.each(properties, _.defineProperty.partial(targetObject).flip2);
                },
                memoizedState: function (obj) {
                    return _.filter2(obj, function (v, k) {
                        return k[0] === '_' && !_.isFunction(v);
                    });
                },
                memoizeToThis: function (name, fn) {
                    return function () {
                        var memo = this[name];
                        return memo !== undefined ? memo : this[name] = fn.call(this);
                    };
                },
                coerceToPropertyDefinition: function (value_, name) {
                    var value = value_ || {};
                    var actualValue = typeof Tags === 'undefined' ? value_ : Tags.unwrap(value_);
                    return !value.$constant && !value.$get && _.isPropertyDefinition(actualValue) && actualValue || (value.$get || !value.$constant && _.isFunction(actualValue) && _.noArgs(actualValue)) && {
                        get: actualValue,
                        set: _.throwsError('cannot change ' + (name || 'property') + ' (as it\'s an accessor function)')
                    } || !value.$get && {
                        get: _.constant(actualValue),
                        set: _.throwsError('cannot change ' + (name || 'property') + ' (as it\'s sealed to ' + actualValue + ')')
                    } || _.throwsError('coerceToPropertyDefinition: crazy input, unable to match')();
                },
                isPropertyDefinition: function (obj) {
                    return _.isObject(obj) && (_.isFunction(obj.get) || _.isFunction(obj.set));
                },
                ownProperties: function (obj) {
                    return obj && _.pickKeys(obj, obj.hasOwnProperty.bind(obj)) || {};
                }
            });
        }
    },
    function (module, exports) {
        _.hasTags = true;
        {
            Tags = _.extend2(function (subject, keys) {
                if (subject !== undefined) {
                    this.subject = subject;
                }
                if (keys !== undefined) {
                    _.extend(this, keys);
                }
            }, {
                $definition: {},
                prototype: {
                    add: function (name, additionalData) {
                        return this[_.keyword(name)] = additionalData || true, this;
                    },
                    clone: function (newSubject) {
                        return _.extend(new Tags(newSubject || this.subject), _.pick(this, _.keyIsKeyword));
                    },
                    modify: function (changesFn) {
                        this.subject = changesFn(this.subject);
                        if (_.isTypeOf(Tags, this.subject)) {
                            return _.extend(this.subject, _.pick(this, _.keyIsKeyword));
                        } else {
                            return this;
                        }
                    },
                    extend: function (other) {
                        return _.isTypeOf(Tags, other) ? _.extend(this, _.pick(other, _.keyIsKeyword)) : this;
                    }
                },
                omit: $restArg(function (what, ___) {
                    if (_.isTypeOf(Tags, what)) {
                        var keysToOmit = _.index(_.rest(arguments));
                        var keysLeft = _.pick(what, function (v, k) {
                            return _.isKeyword(k) && !(k in keysToOmit);
                        });
                        return !_.isEmptyObject(keysLeft) ? new Tags(what.subject, keysLeft) : what.subject;
                    } else {
                        return what;
                    }
                }),
                clone: function (what, newSubject) {
                    return _.isTypeOf(Tags, what) ? what.clone(newSubject) : newSubject || what;
                },
                extend: function (what, other) {
                    return _.isTypeOf(Tags, what) ? what.clone().extend(other) : _.isTypeOf(Tags, other) ? Tags.wrap(what).extend(other) : what;
                },
                get: function (def) {
                    return _.isTypeOf(Tags, def) ? _.pick(def, _.keyIsKeyword) : {};
                },
                each: function (def, accept) {
                    if (_.isTypeOf(Tags, def)) {
                        _.each(def, function (v, k) {
                            if (k[0] === '$') {
                                accept(k.slice(1));
                            }
                        });
                    }
                },
                hasSubject: function (def) {
                    return _.isTypeOf(Tags, def) && 'subject' in def;
                },
                matches: function (name) {
                    return function (obj) {
                        return obj && obj[_.keyword(name)] !== undefined;
                    };
                },
                unwrapAll: function (definition) {
                    return _.map2(definition, Tags.unwrap);
                },
                unwrap: function (what) {
                    return _.isTypeOf(Tags, what) ? what.subject : what;
                },
                wrap: function (what) {
                    return _.isTypeOf(Tags, what) ? what : arguments.length === 0 ? new Tags() : new Tags(what);
                },
                modify: function (what, changesFn) {
                    return _.isTypeOf(Tags, what) ? what.clone().modify(changesFn) : changesFn(what);
                },
                map: function (obj, op) {
                    return Tags.modify(obj, function (obj) {
                        return _.map2(obj, function (t, k) {
                            return Tags.modify(t, function (v) {
                                return op(v, k, _.isTypeOf(Tags, t) ? t : undefined);
                            });
                        });
                    });
                },
                add: function (name, toWhat, additionalData) {
                    return Tags.wrap.apply(null, _.rest(arguments, 1)).add(name, additionalData);
                }
            });
            _.keyword = function (name) {
                return '$' + name;
            };
            _.isKeyword = function (key) {
                return key[0] == '$';
            };
            _.keywordName = function (x) {
                return _.isKeyword(x) ? x.slice(1) : x;
            };
            _.keywords = function (obj) {
                return _.pick(obj, _.keyIsKeyword);
            };
            _.tagKeywords = {};
            _.isTagKeyword = function (k) {
                return _.keywordName(k) in _.tagKeywords;
            };
            _.keyIsKeyword = function (value, key) {
                return _.isKeyword(key[0]);
            };
            _.defineKeyword = function (name, value) {
                _.defineProperty($global, _.keyword(name), value);
            };
            _.defineKeyword('untag', Tags.unwrap);
            _.defineTagKeyword = function (k, fn) {
                fn = _.isFunction(fn) && fn || _.identity;
                if (!(_.keyword(k) in $global)) {
                    _.defineKeyword(k, Tags.add('constant', _.extendWith({ matches: Tags.matches(k) }, fn(function (a, b) {
                        if (arguments.length < 2) {
                            return Tags.add(k, a);
                        } else {
                            return Tags.add(k, b, a);
                        }
                    }))));
                    _.tagKeywords[k] = true;
                }
                var kk = _.keyword(k);
                return _.extend($global[kk], {
                    is: function (x) {
                        return _.isTypeOf(Tags, x) && kk in x || false;
                    },
                    isNot: function (x) {
                        return !(_.isTypeOf(Tags, x) && kk in x) || false;
                    },
                    unwrap: function (x) {
                        return $atom.matches(x) === true ? Tags.unwrap(x) : x;
                    }
                });
            };
            _([
                'constant',
                'get',
                'once',
                'async'
            ]).each(_.defineTagKeyword);
            _.defineModifierKeyword = function (name, fn) {
                _.defineKeyword(name, function (val) {
                    return Tags.modify(val, fn);
                });
            };
            _.deleteKeyword = function (name) {
                delete $global[_.keyword(name)];
            };
        }
    },
    function (module, exports) {
        _.hasTypeMatch = true;
        _.defineTagKeyword('required');
        _.defineTagKeyword('atom');
        _.defineKeyword('any', _.identity);
        (function () {
            _.isMeta = function (x) {
                return x === $any || $atom.is(x) === true || $required.is(x) === true;
            };
            var zip = function (type, value, pred) {
                var required = Tags.unwrapAll(_.filter2(type, $required.matches));
                var match = _.nonempty(_.zip2(Tags.unwrapAll(type), value, pred));
                if (_.isEmpty(required)) {
                    return match;
                } else {
                    var requiredMatch = _.nonempty(_.zip2(required, value, pred));
                    var allSatisfied = _.values2(required).length === _.values2(requiredMatch).length;
                    return allSatisfied ? match : _.coerceToEmpty(value);
                }
            };
            var hyperMatch = _.hyperOperator(_.binary, function (type_, value, pred) {
                var type = Tags.unwrap(type_);
                if (_.isArray(type)) {
                    if (_.isArray(value)) {
                        return zip(_.times(value.length, _.constant(type[0])), value, pred);
                    } else {
                        return undefined;
                    }
                } else if (_.isStrictlyObject(type) && type['*']) {
                    if (_.isStrictlyObject(value)) {
                        return zip(_.extend(_.map2(value, _.constant(type['*'])), _.omit(type, '*')), value, pred);
                    } else {
                        return undefined;
                    }
                } else {
                    return zip(type_, value, pred);
                }
            });
            var typeMatchesValue = function (c, v) {
                var contract = Tags.unwrap(c);
                return contract === $any || contract === undefined && v === undefined || _.isFunction(contract) && (_.isPrototypeConstructor(contract) ? _.isTypeOf(contract, v) : contract(v) === true) || typeof v === contract || v === contract;
            };
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
            var unifyType = function (value) {
                if (_.isArray(value)) {
                    return _.nonempty([_.reduce(_.rest(value), function (a, b) {
                            return _.undiff(a, b);
                        }, _.first(value) || undefined)]);
                } else if (_.isStrictlyObject(value)) {
                    var pairs = _.pairs(value);
                    var unite = _.map(_.reduce(_.rest(pairs), function (a, b) {
                        return _.undiff(a, b);
                    }, _.first(pairs) || [
                        undefined,
                        undefined
                    ]), _.nonempty);
                    return _.isEmpty(unite) || _.isEmpty(unite[1]) ? value : _.object([[
                            unite[0] || '*',
                            unite[1]
                        ]]);
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
                        return _.isEmptyArray(value) ? value : typeof value;
                    }
                });
            };
        }());
    },
    function (module, exports) {
        {
            _.alignStringsRight = function (strings) {
                var lengths = strings.map(_.count);
                var max = _.max(lengths);
                return [
                    lengths,
                    strings
                ].zip(function (ln, str) {
                    return ' '.repeats(max - ln) + str;
                });
            };
            _.bullet = function (bullet, str) {
                var indent = ' '.repeats(bullet.length);
                return _.joinWith('\n', _.splitWith('\n', str).map(function (line, i) {
                    return i === 0 ? bullet + line : indent + line;
                }));
            };
            _.stringifyOneLine = function (x, cfg) {
                return _.stringify(x, _.extend(cfg || {}, { pretty: false }));
            };
            _.pretty = function (x, cfg) {
                return _.stringify(x, _.extend(cfg || {}, { pretty: true }));
            };
            _.stringify = function (x, cfg) {
                cfg = cfg || {};
                var measured = _.stringifyImpl(x, [], [], 0, cfg);
                return measured.length < 80 || 'pretty' in cfg ? measured : _.pretty(x, cfg);
            };
            _.stringifyPrototype = function (x) {
                if ($platform.NodeJS && x.$meta) {
                    var name = '';
                    x.$meta(function (values) {
                        name = values.name === 'exports' ? values.file : values.name;
                    });
                    return name && name + ' ()';
                } else
                    return '<prototype>';
            };
            _.builtInTypes = {
                'Event': { target: $any },
                'MutationEvent': {
                    target: $any,
                    attrName: $any,
                    prevValue: $any
                },
                'Range': {
                    startContainer: $any,
                    startOffset: $any,
                    endContainer: $any,
                    endOffset: $any
                },
                'ClientRect': {
                    left: $any,
                    top: $any,
                    right: $any,
                    bottom: $any,
                    width: $any,
                    height: $any
                }
            };
            _.stringifyImpl = function (x, parents, siblings, depth, cfg) {
                var customFormat = cfg.formatter && cfg.formatter(x);
                if (customFormat) {
                    return customFormat;
                }
                if (typeof jQuery !== 'undefined' && _.isTypeOf(jQuery, x)) {
                    x = _.asArray(x);
                }
                if (x === $global) {
                    return '$global';
                } else if (parents.indexOf(x) >= 0) {
                    return cfg.pure ? undefined : '<cyclic>';
                } else if (siblings.indexOf(x) >= 0) {
                    return cfg.pure ? undefined : '<ref:' + siblings.indexOf(x) + '>';
                } else if (x === undefined) {
                    return 'undefined';
                } else if (x === null) {
                    return 'null';
                } else if (_.isFunction(x)) {
                    return cfg.pure ? x.toString() : _.isPrototypeConstructor(x) && _.stringifyPrototype(x) || '<function>';
                } else if (typeof x === 'string') {
                    return _.quoteWith('"', x.limitedTo(cfg.pure ? Number.MAX_SAFE_INTEGER : 60));
                } else if (_.isTypeOf(Tags, x)) {
                    return _.reduce(Tags.get(x), function (memo, value, tag) {
                        return _.isBoolean(value) ? tag + ' ' + memo.quote('()') : tag + ' (' + _.stringifyImpl(value, parents, siblings, 0, { pretty: false }) + ', ' + memo + ')';
                    }, _.stringifyImpl($untag(x), parents, siblings, depth + 1, cfg));
                } else if (!cfg.pure && _.hasOOP && _.isPrototypeInstance(x) && $prototype.defines(x.constructor, 'toString')) {
                    return x.toString();
                } else if (_.isObject(x) && !(typeof $atom !== 'undefined' && $atom.is(x))) {
                    var builtInValue = _.find2(_.builtInTypes, function (schema, name) {
                        return $global[name] && x instanceof $global[name] && name + ' ' + _.stringifyOneLine(_.omitTypeMismatches(schema, x)) || false;
                    });
                    if (builtInValue) {
                        return builtInValue;
                    } else {
                        if (x instanceof Set) {
                            x = x.asArray;
                        }
                        var isArray = _.isArray(x);
                        var pretty = cfg.pretty || false;
                        if ($platform.Browser) {
                            if (_.isTypeOf(Element, x)) {
                                return (x.tagName.lowercase + (x.id && '#' + x.id || '') + (x.className && '.' + x.className || '')).quote('<>');
                            } else if (_.isTypeOf(Text, x)) {
                                return '@' + x.wholeText.limitedTo(20);
                            }
                        }
                        if (x.toJSON) {
                            return _.quoteWith('"', x.toJSON());
                        }
                        if (!cfg.pure && (depth > (cfg.maxDepth || 5) || isArray && x.length > (cfg.maxArrayLength || 60))) {
                            return isArray ? '<array[' + x.length + ']>' : '<object>';
                        }
                        var parentsPlusX = parents.concat([x]);
                        siblings.push(x);
                        var values = _.pairs(x);
                        var oneLine = !pretty || values.length < 2;
                        var impl = _.stringifyImpl.tails2(parentsPlusX, siblings, depth + 1, cfg);
                        var quoteKeys = cfg.json ? '""' : '';
                        if (pretty) {
                            values = _.values(x);
                            var printedKeys = _.alignStringsRight(_.keys(x).map(_.quotesWith(quoteKeys).then(_.appends(': '))));
                            var printedValues = values.map(impl);
                            var leftPaddings = printedValues.map(function (x, i) {
                                return x[0] === '[' || x[0] === '{' ? 3 : _.isString(values[i]) ? 1 : 0;
                            });
                            var maxLeftPadding = _.max(leftPaddings);
                            var indentedValues = [
                                leftPaddings,
                                printedValues
                            ].zip(function (padding, x) {
                                return ' '.repeats(maxLeftPadding - padding) + x;
                            });
                            var internals = isArray ? indentedValues : [
                                printedKeys,
                                indentedValues
                            ].zip(_.bullet);
                            var printed = _.bullet(isArray ? '[ ' : '{ ', internals.join(',\n'));
                            var lines = printed.split('\n');
                            return printed + (' '.repeats(_.max(lines.map(_.count)) - _.count(lines.last)) + (isArray ? ' ]' : ' }'));
                        }
                        return _.quoteWith(isArray ? '[]' : '{  }', _.joinWith(', ', _.map(values, function (kv) {
                            return (isArray ? '' : kv[0].quote(quoteKeys) + ': ') + impl(kv[1]);
                        })));
                    }
                } else if (_.isDecimal(x) && cfg.precision > 0) {
                    return x.toFixed(cfg.precision);
                } else {
                    return String(x);
                }
            };
        }
    },
    function (module, exports) {
        _.cps = function () {
            return _.cps.sequence.apply(null, arguments);
        };
        {
            _.cps.apply = function (fn, this_, args_, then) {
                var args = _.asArray(args_);
                var lastArgN = _.numArgs(fn) - 1;
                var thenArg = args[lastArgN];
                args[lastArgN] = function () {
                    then.call(this, arguments, thenArg);
                };
                return fn.apply(this_, args);
            };
        }
        {
            _.extend(_.cps, {
                each: function (obj, elem_, complete_, index_, length_, keys_) {
                    var complete = complete_ || _.noop;
                    var elem = function (x, k, next) {
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
                            elem(obj[key], key, arguments.callee.bind(this, obj, elem_, complete_, index + 1, length, keys));
                        }
                    }
                }
            });
        }
        {
            _.extend(_.cps, {
                map: function (obj, iter, complete) {
                    var result = _.isArray(obj) ? [] : {};
                    _.cps.each(obj, _.numArgs(iter) == 2 ? function (x, i, next) {
                        iter(x, function (y) {
                            result[i] = y;
                            next();
                        });
                    } : function (x, i, next) {
                        iter(x, i, function (y) {
                            result[i] = y;
                            next();
                        });
                    }, function () {
                        complete(result);
                    });
                }
            });
        }
        {
            _.extend(_.cps, {
                find: function (obj, pred, complete) {
                    var passKey = _.numArgs(pred) !== 2;
                    _.cps.each(obj, function (x, key, next, complete) {
                        var take = function (match) {
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
                }
            });
        }
        {
            _.extend(_.cps, {
                memoize: function (fn) {
                    return _.barrier ? _.cps._betterMemoize(fn) : _.cps._poorMemoize(fn);
                },
                _poorMemoize: function (fn) {
                    var cache = {};
                    return function (value, then) {
                        if (value in cache) {
                            then(cache[value]);
                        } else {
                            fn.call(this, value, function (result) {
                                then(cache[value] = result);
                            });
                        }
                    };
                },
                _betterMemoize: function (fn) {
                    var cache = {};
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
                        throw new Error('_.cps.memoize: unsupported number of arguments');
                    }
                }
            });
        }
        (function () {
            var reduce = function (array, op, then, memo, index) {
                if (!array || index >= (array.length || 0)) {
                    then(memo);
                } else {
                    op(memo, array[index], function (result) {
                        reduce(array, op, then, result, index + 1);
                    });
                }
            };
            _.cps.reduce = function (array, op, then, memo) {
                if (arguments.length < 4) {
                    reduce(array, op, then, array[0], 1);
                } else {
                    reduce(array, op, then, memo, 0);
                }
            };
        }());
        {
            _.extend(_.cps, {
                noop: $restArg(function () {
                    return _.last(arguments).call(this);
                }),
                identity: $restArg(function () {
                    var args = _.initial(arguments), then = _.last(arguments);
                    if (then) {
                        return then.apply(this, args);
                    }
                }),
                constant: $restArg(function () {
                    var args = arguments;
                    return function () {
                        return _.last(arguments).apply(this, args);
                    };
                })
            });
        }
        {
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
        }
        {
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
        }
        {
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
        }
    },
    function (module, exports) {
        _([
            'method',
            'property',
            'flipped',
            'forceOverride'
        ]).each(_.defineTagKeyword);
        $extensionMethods = function (Type, methods) {
            _.each(methods, function (tags, name) {
                var fn = Tags.unwrap(tags);
                if (!(name in _)) {
                    _[name] = _[name] || fn;
                }
                if (!tags.$method && (tags.$property || _.oneArg(fn))) {
                    if (!(name in Type.prototype) || tags.$forceOverride) {
                        _.defineHiddenProperty(Type.prototype, name, function () {
                            return fn(this);
                        });
                    }
                } else if (!tags.$property) {
                    if (!(name in Type.prototype) || tags.$forceOverride) {
                        Type.prototype[name] = _.asMethod(tags.$flipped ? _.flip(fn) : fn);
                    }
                } else {
                    throw new Error('$extensionMethods: crazy input, unable to match');
                }
            });
        };
    },
    function (module, exports) {
        ;
        $extensionMethods(Function, {
            $: $method(_.partial),
            $$: $method(_.tails),
            bind: _.bind,
            partial: _.partial,
            calls: _.bind,
            tails: _.tails,
            tails2: _.tails2,
            tails3: _.tails3,
            applies: _.applies,
            compose: _.compose,
            then: _.then,
            flip: _.flip,
            with: _.flipN,
            flip2: _.flip2,
            flip3: _.flip3,
            asFreeFunction: _.asFreeFunction,
            asMethod: _.asMethod,
            callsWith: _.callsTo,
            tailsWith: _.tailsTo,
            higherOrder: _.higherOrder,
            returns: function (fn, returns) {
                return function () {
                    fn.apply(this, arguments);
                    return returns;
                };
            },
            asContinuation: function (f) {
                return $restArg(function () {
                    _.last(arguments)(f.apply(this, _.initial(arguments)));
                });
            },
            wraps: function (f, w) {
                f._wrapped = _.withSameArgs(f, w);
                return f;
            },
            wrapped: function (f) {
                return f._wrapped || f;
            },
            original: function (f) {
                while (f && f._wrapped) {
                    f = f._wrapped;
                }
                return f;
            },
            arity0: _.arity0,
            arity1: _.arity1,
            arity2: _.arity2,
            arity3: _.arity3,
            or: _.or,
            and: _.and,
            not: _.not,
            new: _.higherOrder(_.new),
            each: function (fn, obj) {
                return _.each2(obj, fn);
            },
            map: function (fn, obj) {
                return _.map2(obj, fn);
            },
            oneShot: function (fn) {
                var called = false;
                return function () {
                    if (!called) {
                        called = true;
                        return fn.apply(this, arguments);
                    }
                };
            },
            memoized: _.memoize,
            throttled: _.throttle,
            debounced: function (func, wait, immediate) {
                var timestamp, timeout, result, args, context;
                var later = function () {
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
                var debouncedFn = function () {
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
                    debouncedFn.cancel();
                    func.apply(context, args);
                };
                return debouncedFn;
            },
            postpone: $method(function (fn) {
                fn.postponed.apply(null, arguments);
            }),
            postponed: function (fn) {
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
            delayed: function (fn, time) {
                return function () {
                    var args = arguments, context = this;
                    _.delay(function () {
                        fn.apply(context, args);
                    }, time);
                };
            }
        });
        ;
        $extensionMethods(Function, {
            catch_: function (fn, catch_, then, finally_) {
                return fn.catches(catch_, then)();
            },
            catches: function (fn, catch_, then, finally_) {
                var args = arguments.length;
                catch_ = args > 1 ? _.coerceToFunction(catch_) : _.identity;
                then = args > 2 ? _.coerceToFunction(then) : _.identity;
                finally_ = args > 3 ? _.coerceToFunction(finally_) : _.identity;
                return function () {
                    var result = undefined, catched = false;
                    try {
                        result = fn.apply(this, arguments);
                    } catch (e) {
                        result = catch_(e);
                        catched = true;
                    }
                    if (!catched) {
                        result = then(result);
                    }
                    return finally_(result);
                };
            }
        });
    },
    function (module, exports) {
        {
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
                filter: _.filter,
                reject: $method(_.reject),
                flat: _.flatten.tails2(true),
                object: _.object,
                shuffle: _.shuffle,
                nonempty: _.nonempty,
                pluck: $method(_.pluck),
                without: $method(_.without),
                join: function (strJoin) {
                    return $forceOverride(function (arr, delim) {
                        delim = arguments.length < 2 ? '' : delim;
                        if (_.isString(delim)) {
                            return strJoin.call(arr, delim);
                        } else {
                            return _.reduce2(arr, function (a, b) {
                                return [a].concat([
                                    delim,
                                    b
                                ]);
                            });
                        }
                    });
                }(Array.prototype.join),
                contains: function (arr, item) {
                    return arr.indexOf(item) >= 0;
                },
                top: function (arr) {
                    return arr[arr.length - 1];
                },
                first: function (arr) {
                    return arr[0];
                },
                second: function (arr) {
                    return arr[1];
                },
                rest: function (arr) {
                    return _.rest(arr);
                },
                last: function (arr) {
                    return arr[arr.length - 1];
                },
                take: function (arr, n) {
                    return arr.slice(0, n);
                },
                lastN: $method(_.last),
                before: function (arr, x) {
                    var i = arr.indexOf(x);
                    return i < 0 ? arr : arr.slice(0, i - 1);
                },
                after: function (arr, x) {
                    var i = arr.indexOf(x);
                    return i < 0 ? arr : arr.slice(i + 1);
                },
                isEmpty: function (arr) {
                    return arr.length === 0;
                },
                notEmpty: function (arr) {
                    return arr.length > 0;
                },
                lastIndex: function (arr) {
                    return arr.length - 1;
                },
                random: function (arr) {
                    return arr[_.random(0, arr.lastIndex)];
                },
                copy: function (arr) {
                    return arr.slice(0);
                },
                removeAll: $method(function (arr) {
                    return arr.splice(0, arr.length), arr;
                }),
                remove: function (arr, item) {
                    var i;
                    while ((i = arr.indexOf(item)) !== -1) {
                        arr.splice(i, 1);
                    }
                    return arr;
                },
                removeAt: function (arr, index) {
                    arr.splice(index, 1);
                    return arr;
                },
                insertAt: function (arr, item, index) {
                    arr.splice(index, 0, item);
                    return arr;
                },
                itemAtWrappedIndex: function (arr, i) {
                    return arr[i % arr.length];
                },
                reversed: function (arr) {
                    return arr.slice().reverse();
                },
                swap: $method(function (arr, indexA, indexB) {
                    var a = arr[indexA], b = arr[indexB];
                    arr[indexA] = b;
                    arr[indexB] = a;
                    return arr;
                })
            });
            _.zap = function (firstArg) {
                var zippo = _.last(arguments);
                return _.reduce(_.rest(_.initial(arguments)), function (memo, row) {
                    return _.times(Math.max(memo.length, row.length), function (i) {
                        return zippo(memo[i], row[i]);
                    });
                }, firstArg);
            };
        }
    },
    function (module, exports) {
        {
            $extensionMethods(String, {
                quote: _.quote,
                concatPath: function (a, b) {
                    var a_endsWithSlash = a[a.length - 1] === '/';
                    var b_startsWithSlash = b[0] === '/';
                    return a + (a_endsWithSlash || b_startsWithSlash ? '' : '/') + (a_endsWithSlash && b_startsWithSlash ? b.substring(1) : b);
                },
                pluck: function (s, arr) {
                    return _.pluck2(arr, s);
                },
                contains: function (s, other) {
                    return s.indexOf(other) >= 0;
                },
                startsWith: function (s, x) {
                    return x.length === 1 ? s[0] === x : s.substring(0, x.length) === x;
                },
                endsWith: function (s, x) {
                    return x.length === 1 ? s[s.length - 1] === x : s.substring(s.length - x.length) === x;
                },
                pad: function (s, len, filler) {
                    return s += (filler || ' ').repeats(Math.max(0, len - s.length));
                },
                cut: function (s, from) {
                    return s.substring(0, from - 1) + s.substring(from, s.length);
                },
                insert: function (s, position, what) {
                    return s.substring(0, position) + what + s.substring(position, s.length);
                },
                lowercase: function (s) {
                    return s.toLowerCase();
                },
                uppercase: function (s) {
                    return s.toUpperCase();
                },
                trimmed: function (s) {
                    return s.trim();
                },
                limitedTo: function (s, n) {
                    return s && (s.length <= n ? s : s.substr(0, n - 1) + '\u2026');
                },
                escaped: function (s) {
                    return _.escape(s);
                },
                repeats: function (s, n) {
                    return _.times(n, _.constant(s)).join('');
                },
                prepend: function (s, other) {
                    return other + s;
                },
                append: function (s, other) {
                    return s + other;
                },
                first: function (s, n) {
                    return _.first(s, n).join('');
                },
                last: function (s, n) {
                    return _.last(s, n).join('');
                },
                reversed: function (s) {
                    return s.split('').reverse().join('');
                },
                capitalized: function (s) {
                    return s.charAt(0).toUpperCase() + s.slice(1);
                },
                decapitalized: function (s) {
                    return s.charAt(0).toLowerCase() + s.slice(1);
                },
                latinAlphanumericValue: function (s) {
                    return s.replace(/[^a-z0-9]/gi, '');
                },
                alphanumericValue: function (s) {
                    return s.replace(unicode_hack(/[^0-9\p{L}|^0-9\p{N}|^0-9\p{Pc}|^0-9\p{M}]/g), '');
                },
                numericValue: function (s) {
                    return s.replace(/[^0-9]/g, '');
                },
                integerValue: function (s) {
                    return s.numericValue.parsedInt;
                },
                parsedInt: function (s) {
                    var result = parseInt(s, 10);
                    return _.isFinite(result) ? result : undefined;
                },
                bytes: function (s) {
                    var bytes = new Uint8Array(s.length);
                    for (var i = 0; i < s.length; ++i) {
                        bytes[i] = s.charCodeAt(i);
                    }
                    return bytes;
                },
                hash: function (s) {
                    var hash = 0, i, chr, len;
                    if (s.length === 0) {
                        return hash;
                    }
                    for (i = 0, len = s.length; i < len; i++) {
                        chr = s.charCodeAt(i);
                        hash = (hash << 5) - hash + chr;
                        hash |= 0;
                    }
                    return hash;
                },
                transliterate: function () {
                    var table = _.extend({
                        'а': 'a',
                        'б': 'b',
                        'в': 'v',
                        'г': 'g',
                        'д': 'd',
                        'е': 'e',
                        'ё': 'yo',
                        'ж': 'zh',
                        'з': 'z',
                        'и': 'i',
                        'й': 'y',
                        'к': 'k',
                        'л': 'l',
                        'м': 'm',
                        'н': 'n',
                        'о': 'o',
                        'п': 'p',
                        'р': 'r',
                        'с': 's',
                        'т': 't',
                        'у': 'u',
                        'ф': 'ph',
                        'х': 'h',
                        'ц': 'ts',
                        'ч': 'ch',
                        'ш': 'sh',
                        'щ': 'sch',
                        'ь': '',
                        'ъ': '',
                        'ы': 'y',
                        'э': 'e',
                        'ю': 'yu',
                        'я': 'ya'
                    }, _.object(_.map('_-1234567890qwertyuiopasdfghjklzxcvbnm', function (x) {
                        return [
                            x,
                            x
                        ];
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
                }()
            });
        }
        _.extend(String, {
            randomHex: function (length) {
                if (length === undefined) {
                    length = _.random(1, 32);
                }
                var string = '';
                for (var i = 0; i < length; i++) {
                    string += Math.floor(Math.random() * 16).toString(16);
                }
                return string;
            },
            leadingZero: function (n) {
                return n < 10 ? '0' + n : n.toString();
            }
        });
        {
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
        }
        _.loDashesToCamelCase = function (x) {
            return x.replace(/(_.)/g, function (x) {
                return x[1].uppercase;
            });
        };
    },
    function (module, exports) {
        (function () {
            var hooks = [
                'onceBefore',
                'onceAfter',
                'onBefore',
                'onAfter',
                'intercept'
            ];
            var hooksShort = [
                'onceBefore',
                'onceAfter',
                'before',
                'after',
                'intercept'
            ];
            var copyHooks = function (from, to) {
                _.extend(to, _.map2(_.pick(from, hooks), _.clone));
            };
            var makeBindable = function (obj, targetMethod) {
                var method = obj[targetMethod];
                return _.isBindable(method) ? method : obj[targetMethod] = _.bindable(method);
            };
            var hookProc = function (name) {
                return function (obj, targetMethod, delegate) {
                    var bindable = makeBindable(obj, targetMethod);
                    return bindable[name].call(bindable, delegate);
                };
            };
            var mixin = function (method, context) {
                if (typeof method !== 'function') {
                    throw new Error('method should be a function');
                }
                return _.extend({}, method, {
                    _bindable: true,
                    impl: method,
                    _wrapped: method,
                    context: context,
                    off: function (delegate) {
                        _.each(hooks, function (hook) {
                            if (delegate) {
                                this['_' + hook].remove(delegate);
                            } else {
                                this['_' + hook].removeAll();
                            }
                        }, this);
                        return this;
                    }
                }, _.object(_.map(hooks, function (name) {
                    var queueName = '_' + name;
                    var once = name.indexOf('once') >= 0;
                    return [
                        name,
                        function (fn) {
                            if (!_.isBindable(this)) {
                                throw new Error('wrong this');
                            }
                            var queue = this[queueName];
                            if (!once || queue.indexOf(fn) < 0) {
                                this[queueName].push(fn);
                            }
                            return this;
                        }
                    ];
                })), _.object(_.map(hooks, function (name) {
                    return [
                        '_' + name,
                        []
                    ];
                })));
            };
            _.extend(_, _.mapObject(_.invert(hooks), hookProc.flip2), {
                unbind: function (obj, targetMethod, delegate) {
                    var method = obj[targetMethod];
                    if (method && method.off) {
                        method.off(delegate);
                    }
                },
                isBindable: function (fn) {
                    return fn && fn._bindable ? true : false;
                },
                bindable: _.extendWith({
                    hooks: hooks,
                    hooksShort: hooksShort
                }, function (method, context) {
                    return _.withSameArgs(method, _.extendWith(mixin(method, context), function () {
                        var wrapper = arguments.callee;
                        var onceBefore = wrapper._onceBefore;
                        var onceAfter = wrapper._onceAfter;
                        var before = wrapper._onBefore;
                        var after = wrapper._onAfter;
                        var intercept = wrapper._intercept;
                        var this_ = context || this;
                        var i, ni = undefined;
                        if (onceBefore.length) {
                            for (i = 0, ni = onceBefore.length; i < ni; i++) {
                                onceBefore[i].apply(this_, arguments);
                            }
                            onceBefore.removeAll();
                        }
                        for (i = 0, ni = before.length; i < ni; i++) {
                            before[i].apply(this_, arguments);
                        }
                        var result = (intercept.length ? _.cps.compose([method].concat(intercept)) : method).apply(this_, arguments);
                        if (after.length || onceAfter.length) {
                            var args = _.asArray(arguments).concat(result);
                            for (i = 0, ni = after.length; i < ni; i++) {
                                after[i].apply(this_, args);
                            }
                            if (onceAfter.length) {
                                var arr = onceAfter.copy;
                                onceAfter.removeAll();
                                for (i = 0, ni = arr.length; i < ni; i++) {
                                    arr[i].apply(this_, args);
                                }
                            }
                        }
                        return result;
                    }));
                })
            });
        }());
    },
    function (module, exports) {
        ;
        _.extend(_, {
            gatherChanges: function (observables_) {
                var observables = _.isArray(observables_) ? observables_ : _.initial(arguments);
                var accept = _.last(arguments);
                var gather = function (value) {
                    accept.apply(this, _.pluck(observables, 'value'));
                };
                _.each(observables, function (read) {
                    read(gather);
                });
            },
            allTriggered: function (triggers, then) {
                var triggered = [];
                if (triggers.length > 0) {
                    _.each(triggers, function (t) {
                        t(function () {
                            triggered = _.union(triggered, [t]);
                            if (then && triggered.length === triggers.length) {
                                then();
                                then = undefined;
                            }
                        });
                    });
                } else {
                    then();
                }
            },
            observableRef: function (value) {
                return _.extend(_.observable.apply(this, arguments), { trackReference: true });
            },
            observable: function (value) {
                var stream = _.stream({
                    isObservable: true,
                    hasValue: arguments.length > 0,
                    value: _.isFunction(value) ? undefined : value,
                    read: function (schedule) {
                        return function (returnResult) {
                            if (stream.hasValue) {
                                returnResult.call(this, stream.value);
                            }
                            schedule.call(this, returnResult);
                        };
                    },
                    write: function (returnResult) {
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
                                    returnResult.call(this, false, stream.value, prevValue);
                                } else {
                                    returnResult.call(this, false, stream.value);
                                }
                            }
                        };
                    }
                });
                if (arguments.length) {
                    stream.apply(this, arguments);
                }
                return _.extend(stream, {
                    force: function (value) {
                        stream.hasValue = false;
                        stream(value || stream.value);
                    },
                    then: function (fn) {
                        var next = _.observable();
                        next.beforeWrite = fn;
                        stream(function (x) {
                            next.write(x);
                        });
                        return next;
                    },
                    toggle: function () {
                        return stream(!stream.value);
                    },
                    tie: function (other) {
                        stream(other);
                        other(stream);
                        return stream;
                    },
                    item: function (id) {
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
                    when: function (match, then) {
                        var matchFn = _.isFunction(match) ? match : _.equals(match), alreadyCalled = false;
                        stream(function (val) {
                            if (matchFn(val)) {
                                if (!alreadyCalled) {
                                    alreadyCalled = true;
                                    stream.off(arguments.callee);
                                    then.apply(this, arguments);
                                } else {
                                }
                            }
                        });
                    }
                });
            },
            barrier: function (defaultValue) {
                var defaultListener = undefined;
                if (_.isFunction(defaultValue)) {
                    defaultListener = defaultValue;
                    defaultValue = undefined;
                }
                var barrier = _.stream({
                    already: defaultValue !== undefined,
                    value: defaultValue,
                    reset: function () {
                        barrier.already = false;
                        delete barrier.value;
                    },
                    write: function (returnResult) {
                        return function (value) {
                            if (!barrier.already) {
                                barrier.already = true;
                                barrier.value = value;
                            }
                            returnResult.call(this, true, barrier.value);
                        };
                    },
                    read: function (schedule) {
                        return function (returnResult) {
                            if (barrier.already) {
                                (barrier.postpones || barrier.commitingReads ? returnResult.postponed : returnResult).call(this, barrier.value);
                            } else {
                                schedule.call(this, returnResult);
                            }
                        };
                    }
                });
                if (defaultListener) {
                    barrier(defaultListener);
                }
                _.defineProperty(barrier, 'promise', function () {
                    return new Promise(function (resolve) {
                        barrier(resolve);
                    });
                });
                return barrier;
            },
            triggerOnce: $restArg(function () {
                var stream = _.stream({
                    read: function (schedule) {
                        return function (listener) {
                            if (stream.queue.indexOf(listener) < 0) {
                                schedule.call(this, listener);
                            }
                        };
                    },
                    write: function (writes) {
                        return writes.partial(true);
                    }
                }).apply(this, arguments);
                return stream;
            }),
            trigger: $restArg(function () {
                return _.stream({
                    read: _.identity,
                    write: function (writes) {
                        return writes.partial(false);
                    }
                }).apply(this, arguments);
            }),
            off: function (fn, what) {
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
            stream: function (cfg_) {
                var cfg = cfg_ || {};
                var queue = _.extend([], {
                    off: function (fn) {
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
                    }
                });
                var self = undefined;
                var scheduleRead = function (fn) {
                    if (queue.indexOf(fn) < 0) {
                        if (fn.queuedBy) {
                            fn.queuedBy.push(queue);
                        } else {
                            fn.queuedBy = [queue];
                        }
                        queue.push(fn);
                    }
                };
                var commitPendingReads = function (flush, __args__) {
                    var args = _.rest(arguments), context = self.context || this, schedule = queue.copy;
                    if (flush) {
                        queue.off();
                    }
                    self.commitingReads = true;
                    for (var i = 0, n = schedule.length; i < n; i++) {
                        (self.postpones ? schedule[i].postponed : schedule[i]).apply(context, args);
                    }
                    delete self.commitingReads;
                };
                var write = cfg.write(commitPendingReads);
                var read = cfg.read(scheduleRead);
                var frontEnd = function (fn) {
                    if (_.isFunction(fn)) {
                        read.call(this, fn);
                    } else {
                        write.apply(this, arguments);
                    }
                    return arguments.callee;
                };
                var once = function (then) {
                    if (!_.find(queue, function (f) {
                            return f.onceWrapped_ === then;
                        })) {
                        read(_.extend(function (v) {
                            _.off(self, arguments.callee);
                            then(v);
                        }, { onceWrapped_: then }));
                    }
                };
                return self = _.extend($restArg(frontEnd), cfg, {
                    queue: queue,
                    once: once,
                    off: _.off.asMethod,
                    read: read,
                    write: write,
                    postpone: function () {
                        this.postponed.apply(self.context, arguments);
                    }
                });
            }
        });
        {
            _.observable.map = function (obj, fn) {
                fn = fn || _.identity;
                var value = _.isArray(obj) ? new Array(obj.length) : {};
                var result = _.observable(value);
                _.each(obj, function (read, i) {
                    read(function (x) {
                        value[i] = fn(x, i);
                        result.force(value);
                    });
                });
                return result;
            };
            _.observable.all = _.observable.map;
        }
    },
    function (module, exports) {
        _.hasOOP = true;
        {
            _([
                'property',
                'static',
                'final',
                'alias',
                'memoized',
                'private',
                'builtin',
                'hidden',
                'testArguments'
            ]).each(_.defineTagKeyword);
            $prototype = function (arg1, arg2) {
                return $prototype.impl.compile.apply($prototype.impl, arguments.length > 1 ? _.asArray(arguments).reverse() : arguments);
            };
            $extends = function (base, def) {
                return $prototype(base, def || {});
            };
            $mixin = function (constructor, def) {
                return $prototype.impl.compileMixin(_.extend(def, { constructor: constructor }));
            };
            _.extend($prototype, {
                isConstructor: function (what) {
                    return _.isPrototypeConstructor(what);
                },
                macro: function (arg, fn) {
                    if (arguments.length === 1) {
                        $prototype.impl.alwaysTriggeredMacros.push(arg);
                    } else {
                        $prototype.impl.memberNameTriggeredMacros[arg] = fn;
                    }
                },
                macroTag: function (name, fn) {
                    _.defineTagKeyword(name);
                    $prototype.impl.tagTriggeredMacros[_.keyword(name)] = fn;
                },
                each: function (visitor) {
                    var namespace = $global;
                    for (var k in namespace) {
                        if (!_.isKeyword(k)) {
                            var value = namespace[k];
                            if ($prototype.isConstructor(value)) {
                                visitor(value, k);
                            }
                        }
                    }
                },
                defines: function (constructor, member) {
                    return _.find($prototype.inheritanceChain(constructor), function (supa) {
                        return supa.$definition && supa.$definition.hasOwnProperty(member) || false;
                    }) ? true : false;
                },
                inheritanceChain: function (def) {
                    var chain = [];
                    while (def) {
                        chain.push(def);
                        def = def.$base && def.$base.constructor;
                    }
                    return chain;
                },
                wrapMethods: function (def, op) {
                    return Tags.map(def, function (fn, k, t) {
                        return _.isFunction(fn) ? op(fn, k, t).wraps(fn) : fn;
                    });
                },
                impl: {
                    alwaysTriggeredMacros: [],
                    memberNameTriggeredMacros: {},
                    tagTriggeredMacros: {},
                    compile: function (def, base) {
                        var impl = base && base.$impl || this;
                        return $untag(impl.sequence(def, base).call(impl, def || {}).constructor);
                    },
                    sequence: function (def, base) {
                        return _.sequence(this.extendWithTags, this.flatten, this.generateCustomCompilerImpl(base), this.generateArgumentContractsIfNeeded, this.ensureFinalContracts(base), this.generateConstructor(base), this.evalAlwaysTriggeredMacros(base), this.evalMemberTriggeredMacros(base), this.contributeTraits(base), this.evalPrototypeSpecificMacros(base), this.generateBuiltInMembers(base), this.callStaticConstructor, this.expandAliases, this.groupMembersByTagForFastEnumeration, this.defineStaticMembers, this.defineInstanceMembers);
                    },
                    compileMixin: function (def) {
                        return _.sequence(this.flatten, this.contributeTraits(), this.expandAliases, this.evalMemberTriggeredMacros(), this.defineStaticMembers, this.defineInstanceMembers).call(this, def || {}).constructor;
                    },
                    flatten: function (def) {
                        var tagKeywordGroups = _.pick(def, this.isTagKeywordGroup);
                        var mergedKeywordGroups = _.object(_.flatten(_.map(tagKeywordGroups, function (membersDef, keyword) {
                            return _.map(this.flatten(membersDef), function (member, memberName) {
                                return [
                                    memberName,
                                    $global[keyword](member)
                                ];
                            });
                        }, this), true));
                        var memberDefinitions = _.omit(def, this.isTagKeywordGroup);
                        return _.extend(memberDefinitions, mergedKeywordGroups);
                    },
                    evalAlwaysTriggeredMacros: function (base) {
                        return function (def) {
                            var macros = $prototype.impl.alwaysTriggeredMacros;
                            for (var i = 0, n = macros.length; i < n; i++) {
                                def = macros[i](def, base) || def;
                            }
                            return def;
                        };
                    },
                    evalMemberTriggeredMacros: function (base) {
                        return function (def) {
                            var names = $prototype.impl.memberNameTriggeredMacros, tags = $prototype.impl.tagTriggeredMacros;
                            _.each(def, function (value, name) {
                                if (names.hasOwnProperty(name)) {
                                    def = names[name](def, value, name, base) || def;
                                }
                                _.each(_.keys(value), function (tag) {
                                    if (tags.hasOwnProperty(tag)) {
                                        def = tags[tag](def, value, name, base) || def;
                                    }
                                });
                            });
                            return def;
                        };
                    },
                    evalPrototypeSpecificMacros: function (base) {
                        return function (def) {
                            if (!def.isTraitOf) {
                                var macroTags = $untag(def.$macroTags || base && base.$definition && base.$definition.$macroTags);
                                if (macroTags) {
                                    this.applyMacroTags(macroTags, def);
                                }
                            }
                            return def;
                        };
                    },
                    applyMacroTags: function (macroTags, def) {
                        _.each(def, function (memberDef, memberName) {
                            _.each(macroTags, function (macroFn, tagName) {
                                memberDef = def[memberName];
                                if (_.isObject(memberDef) && _.keyword(tagName) in memberDef) {
                                    def[memberName] = macroFn.call(def, def, memberDef, memberName) || memberDef;
                                }
                            }, this);
                        }, this);
                        return def;
                    },
                    generateCustomCompilerImpl: function (base) {
                        return function (def) {
                            if (def.$impl) {
                                def.$impl = _.extend(Object.create(base && base.$impl || this), def.$impl);
                                def.$impl = $static($builtin($property(def.$impl)));
                            } else if (base && base.$impl) {
                                def.$impl = $static($builtin($property(base.$impl)));
                            }
                            return def;
                        };
                    },
                    generateArgumentContractsIfNeeded: function (def) {
                        return def.$testArguments ? $prototype.wrapMethods(def, function (fn, name) {
                            return function () {
                                var args = _.asArray(arguments);
                                $assertArguments(args.copy, fn.original, name);
                                return fn.apply(this, args);
                            };
                        }) : def;
                    },
                    contributeTraits: function (base) {
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
                    mergeTraitsMembers: function (def, traits, base) {
                        _.each(traits, function (trait) {
                            _.defaults(def, _.omit(trait.$definition, _.or($builtin.matches, _.key(_.equals('constructor')))));
                        });
                    },
                    extendWithTags: function (def) {
                        return _.extendWith($untag(def), _.mapObject(Tags.get(def), $static.arity1));
                    },
                    callStaticConstructor: function (def) {
                        if (!def.isTraitOf) {
                            _.each($untag(def.$traits), function (T) {
                                if (T.$definition.$constructor) {
                                    $untag(T.$definition.$constructor).call(def);
                                }
                            });
                            if (def.$constructor) {
                                $untag(def.$constructor).call(def);
                            }
                        }
                        return def;
                    },
                    generateConstructor: function (base) {
                        return function (def) {
                            return _.extend(def, {
                                constructor: Tags.modify(def.hasOwnProperty('constructor') ? def.constructor : this.defaultConstructor(base), function (fn) {
                                    if (base) {
                                        fn.prototype = Object.create(base.prototype);
                                        fn.prototype.constructor = fn;
                                    }
                                    return fn;
                                })
                            });
                        };
                    },
                    generateBuiltInMembers: function (base) {
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
                                $: $builtin($prototype.impl.$)
                            });
                        };
                    },
                    $: function (fn) {
                        return _.$.apply(null, [this].concat(_.asArray(arguments)));
                    },
                    defaultConstructor: function (base) {
                        return base ? function () {
                            base.prototype.constructor.apply(this, arguments);
                        } : function (cfg) {
                            _.extend(this, cfg || {});
                        };
                    },
                    defineStaticMembers: function (def) {
                        this.defineMembers($untag(def.constructor), _.pick(def, $static.matches));
                        return def;
                    },
                    defineInstanceMembers: function (def) {
                        this.defineMembers($untag(def.constructor).prototype, _.omit(def, $static.matches));
                        return def;
                    },
                    defineMembers: function (targetObject, def) {
                        _.each(def, function (value, key) {
                            if (key !== 'constructor' && def.hasOwnProperty(key)) {
                                this.defineMember(targetObject, value, key);
                            }
                        }, this);
                    },
                    defineMember: function (targetObject, def, key) {
                        if (def && def.$property) {
                            if (def.$memoized) {
                                _.defineMemoizedProperty(targetObject, key, def);
                            } else {
                                _.defineProperty(targetObject, key, def, def.$hidden ? { enumerable: false } : {});
                            }
                        } else {
                            var what = $untag(def);
                            targetObject[key] = what;
                        }
                    },
                    ensureFinalContracts: function (base) {
                        return function (def) {
                            if (base) {
                                if (base.$final) {
                                    throw new Error('Cannot derive from $final-marked prototype');
                                }
                                if (base.$definition) {
                                    var invalidMembers = _.intersection(_.keys(_.pick(base.$definition, $final.matches)), _.keys(def));
                                    if (invalidMembers.length) {
                                        throw new Error('Cannot override $final ' + invalidMembers.join(', '));
                                    }
                                }
                            }
                            return def;
                        };
                    },
                    expandAliases: function (def) {
                        _.each(def, function (v, k) {
                            def[k] = this.resolveMember(def, k, v)[1];
                        }, this);
                        return def;
                    },
                    resolveMember: function (def, name, member) {
                        member = member || def[name];
                        if ($alias.is(member)) {
                            var ref = this.resolveMember(def, $untag(member));
                            var refName = ref[0];
                            var refValue = ref[1];
                            return [
                                refName,
                                $property.is(member) ? $property({
                                    get: function () {
                                        return this[refName];
                                    },
                                    set: function (x) {
                                        this[refName] = x;
                                    }
                                }) : Tags.extend(refValue, Tags.omit(member, '$alias'))
                            ];
                        } else {
                            return [
                                name,
                                member
                            ];
                        }
                    },
                    groupMembersByTagForFastEnumeration: function (def) {
                        var membersByTag = {};
                        _.each(def, function (m, name) {
                            Tags.each(m, function (tag) {
                                (membersByTag[tag] = membersByTag[tag] || {})[name] = m;
                            });
                        });
                        def.$membersByTag = $static($builtin($property(membersByTag)));
                        return def;
                    },
                    isTagKeywordGroup: function (value_, key) {
                        var value = $untag(value_);
                        return _.isKeyword(key) && _.isFunction($global[key]) && typeof value === 'object' && !_.isArray(value);
                    },
                    modifyMember: function (member, newValue) {
                        return $property.is(member) && Tags.modify(member, function (value) {
                            return _.extend(value, _.map2(_.pick(value, 'get', 'set'), newValue));
                        }) || _.isFunction($untag(member)) && Tags.modify(member, newValue) || member;
                    }
                }
            });
        }
        {
            _.isTraitOf = function (Trait, instance) {
                var constructor = instance && instance.constructor;
                return constructor && constructor.hasTrait && constructor.hasTrait(Trait) || false;
            };
            _.isTypeOf = _.or(_.isTypeOf, _.isTraitOf);
            $trait = function (arg1, arg2) {
                var constructor = undefined;
                var def = _.extend(arguments.length > 1 ? arg2 : arg1, {
                    constructor: _.throwsError('Traits are not instantiable (what for?)'),
                    isTraitOf: $static($builtin(function (instance) {
                        return _.isTraitOf(constructor, instance);
                    }))
                });
                return constructor = $prototype.impl.compile(def, arguments.length > 1 ? arg1 : arg2);
            };
        }
        $prototype.macro('$macroTags', function (def, value, name) {
            _.each($untag(value), function (v, k) {
                _.defineTagKeyword(k);
            });
        });
        _.$ = function (this_, fn) {
            var arguments_ = _.rest(arguments, 2);
            var result = arguments_.length ? _.bind.apply(undefined, [
                fn,
                this_
            ].concat(_.rest(arguments, 2))) : _.withSameArgs(fn, function () {
                return fn.apply(this_, arguments);
            });
            return result;
        };
        {
            _.defineKeyword('const', function (x) {
                return $static($property(x));
            });
        }
        {
            _.defineTagKeyword('callableAsFreeFunction');
            $prototype.macroTag('callableAsFreeFunction', function (def, value, name) {
                def.constructor[name] = $untag(value).asFreeFunction;
                return def;
            });
        }
        {
            _.defineTagKeyword('callableAsMethod');
            $prototype.macroTag('callableAsMethod', function (def, value, name) {
                def[name] = Tags.modify(value, _.asMethod);
                def.constructor[name] = $untag(value);
                return def;
            });
        }
        {
            $singleton = function (arg1, arg2) {
                return new ($prototype.apply(null, arguments))();
            };
        }
    },
    function (module, exports, __webpack_require__) {
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
        if (!Math.sign) {
            Math.sign = function (x) {
                return x < 0 ? -1 : x > 0 ? 1 : 0;
            };
        }
        Intersect = {
            rayCircle: function (origin, d, center, r) {
                var f = origin.sub(center);
                var a = d.dot(d);
                var b = 2 * f.dot(d);
                var c = f.dot(f) - r * r;
                var discriminant = b * b - 4 * a * c;
                if (discriminant < 0) {
                    return undefined;
                } else {
                    discriminant = Math.sqrt(discriminant);
                    var t1 = (-b - discriminant) / (2 * a);
                    var t2 = (-b + discriminant) / (2 * a);
                    if (t1 >= 0 && t1 <= 1) {
                        return {
                            time: t1,
                            where: origin.add(d.scale(t1))
                        };
                    }
                    if (t2 >= 0 && t2 <= 1) {
                        return {
                            time: t2,
                            where: origin.add(d.scale(t2)),
                            insideOut: true
                        };
                    }
                    return undefined;
                }
            }
        };
        Vec2 = $prototype({
            $static: {
                xx: function (x) {
                    return new Vec2(x, x);
                },
                xy: function (x, y) {
                    return new Vec2(x, y);
                },
                x: function (x) {
                    return new Vec2(x, 0);
                },
                y: function (y) {
                    return new Vec2(0, y);
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
                fromLT: function (lt) {
                    return lt && new Vec2(lt.left, lt.top);
                },
                fromWH: function (wh) {
                    return wh && new Vec2(wh.width, wh.height);
                },
                fromLeftTop: $alias('fromLT'),
                fromWidthHeight: $alias('fromWH'),
                lerp: function (t, a, b) {
                    return new Vec2(_.lerp(t, a.x, b.x), _.lerp(t, a.y, b.y));
                },
                clamp: function (n, a, b) {
                    return new Vec2(_.clamp(n.x, a.x, b.x), _.clamp(n.y, a.y, b.y));
                }
            },
            constructor: function (x, y) {
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
            length: $property(function () {
                return Math.sqrt(this.lengthSquared);
            }),
            lengthSquared: $property(function () {
                return this.x * this.x + this.y * this.y;
            }),
            distance: function (pt) {
                return this.sub(pt).length;
            },
            aspect: $property(function () {
                return this.x / this.y;
            }),
            add: function (a, b) {
                if (b === undefined) {
                    return typeof a === 'number' ? new Vec2(this.x + a, this.y + a) : new Vec2(this.x + a.x, this.y + a.y);
                } else {
                    return new Vec2(this.x + a, this.y + b);
                }
            },
            aspect: $property(function () {
                return this.w / this.h;
            }),
            dot: function (other) {
                return this.x * other.x + this.y * other.y;
            },
            sub: function (other) {
                return new Vec2(this.x - other.x, this.y - other.y);
            },
            scale: function (tx, ty) {
                return new Vec2(this.x * tx, this.y * (ty === undefined ? tx : ty));
            },
            mul: function (other) {
                return new Vec2(this.x * other.x, this.y * other.y);
            },
            divide: function (other) {
                return new Vec2(this.x / other.x, this.y / other.y);
            },
            normal: $property(function () {
                return this.scale(1 / this.length);
            }),
            perp: $property(function () {
                return new Vec2(this.y, -this.x);
            }),
            half: $property(function () {
                return new Vec2(this.x * 0.5, this.y * 0.5);
            }),
            inverse: $property(function () {
                return new Vec2(-this.x, -this.y);
            }),
            asArray: $property(function () {
                return [
                    this.x,
                    this.y
                ];
            }),
            asLeftTop: $property(function () {
                return {
                    left: this.x,
                    top: this.y
                };
            }),
            asLeftTopMargin: $property(function () {
                return {
                    marginLeft: this.x,
                    marginTop: this.y
                };
            }),
            asWidthHeight: $property(function () {
                return {
                    width: this.x,
                    height: this.y
                };
            }),
            asTranslate: $property(function () {
                return 'translate(' + this.x + ' ' + this.y + ')';
            }),
            separatedWith: function (sep) {
                return this.x + sep + this.y;
            },
            floor: $property(function () {
                return new Vec2(Math.floor(this.x), Math.floor(this.y));
            }),
            sum: $static(function (arr) {
                return _.reduce(_.isArray(arr) && arr || _.asArray(arguments), function (memo, v) {
                    return memo.add(v || Vec2.zero);
                }, Vec2.zero);
            }),
            toString: function () {
                return '{' + this.x + ',' + this.y + '}';
            },
            projectOnCircle: function (center, r) {
                return center.add(this.sub(center).normal.scale(r));
            },
            projectOnLineSegment: function (v, w) {
                var wv = w.sub(v);
                var l2 = wv.lengthSquared;
                if (l2 == 0)
                    return v;
                var t = this.sub(v).dot(wv) / l2;
                if (t < 0)
                    return v;
                if (t > 1)
                    return w;
                return v.add(wv.scale(t));
            },
            projectOnRay: function (origin, dir) {
                var l2 = dir.lengthSquared;
                if (l2 == 0)
                    return 0;
                return this.sub(origin).dot(dir) / l2;
            }
        });
        Bezier = {
            cubic: function (t, p0, p1, p2, p3) {
                var cube = t * t * t;
                var square = t * t;
                var ax = 3 * (p1.x - p0.x);
                var ay = 3 * (p1.y - p0.y);
                var bx = 3 * (p2.x - p1.x) - ax;
                var by = 3 * (p2.y - p1.y) - ay;
                var cx = p3.x - p0.x - ax - bx;
                var cy = p3.y - p0.y - ay - by;
                var x = cx * cube + bx * square + ax * t + p0.x;
                var y = cy * cube + by * square + ay * t + p0.y;
                return new Vec2(x, y);
            },
            cubic1D: function (t, a, b, c, d) {
                return Bezier.cubic(t, Vec2.zero, new Vec2(a, b), new Vec2(c, d), Vec2.one).y;
            },
            make: {
                cubic: function (a, b, c, d) {
                    return function (t) {
                        return Bezier.cubic(t, a, b, c, d);
                    };
                },
                cubic1D: function (a, b, c, d) {
                    return function (t) {
                        return Bezier.cubic1D(t, a, b, c, d);
                    };
                }
            }
        };
        BBox = $prototype({
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
                fromLeftTopAndSize: function (pt, size) {
                    return BBox.fromLTWH({
                        left: pt.x,
                        top: pt.y,
                        width: size.x,
                        height: size.y
                    });
                },
                fromLTWH: function (l, t, w, h) {
                    if (arguments.length === 1) {
                        return l && BBox.fromLTWH(l.left, l.top, l.width, l.height);
                    } else {
                        return new BBox(l + w / 2, t + h / 2, w, h);
                    }
                },
                fromLTRB: function (l, t, r, b) {
                    if (arguments.length === 1) {
                        return l && BBox.fromLTRB(l.left, l.top, l.right, l.bottom);
                    } else {
                        return new BBox(_.lerp(0.5, l, r), _.lerp(0.5, t, b), r - l, b - t);
                    }
                },
                fromSizeAndCenter: function (size, center) {
                    return new BBox(center.x - size.x / 2, center.y - size.y / 2, size.x, size.y);
                },
                fromSize: function (a, b) {
                    if (b) {
                        return new BBox(-a / 2, -b / 2, a, b);
                    } else {
                        return new BBox(-a.x / 2, -a.y / 2, a.x, a.y);
                    }
                },
                fromPoints: function (pts) {
                    var l = Number.MAX_VALUE, t = Number.MAX_VALUE, r = Number.MIN_VALUE, b = Number.MIN_VALUE;
                    _.each(pts, function (pt) {
                        l = Math.min(pt.x, l);
                        t = Math.min(pt.y, t);
                        r = Math.max(pt.x, r);
                        b = Math.max(pt.y, b);
                    });
                    return BBox.fromLTRB(l, t, r, b);
                }
            },
            constructor: function (x, y, w, h) {
                if (arguments.length == 4) {
                    this.x = x;
                    this.y = y;
                    this.width = w;
                    this.height = h;
                } else {
                    _.extend(this, x);
                }
            },
            classifyPoint: function (pt) {
                var sides = _.extend(pt.x > this.right ? { right: true } : {}, pt.x < this.left ? { left: true } : {}, pt.y > this.bottom ? { bottom: true } : {}, pt.y < this.top ? { top: true } : {});
                return _.extend(sides, !sides.left && !sides.right && !sides.bottom && !sides.top ? { inside: true } : {});
            },
            classifyRay: function (origin, delta, cornerRadius) {
                var half = this.size.half;
                var farTime, farTimeX, farTimeY, nearTime, nearTimeX, nearTimeY, scaleX, scaleY, signX, signY;
                scaleX = 1 / delta.x;
                scaleY = 1 / delta.y;
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
            nearestPointTo: function (pt, cornerRadius) {
                var r = cornerRadius || 0;
                var a = new Vec2(this.left, this.top), b = new Vec2(this.right, this.top), c = new Vec2(this.right, this.bottom), d = new Vec2(this.left, this.bottom);
                var pts = [
                    pt.projectOnLineSegment(a.add(r, 0), b.add(-r, 0)),
                    pt.projectOnLineSegment(b.add(0, r), c.add(0, -r)),
                    pt.projectOnLineSegment(c.add(-r, 0), d.add(r, 0)),
                    pt.projectOnLineSegment(d.add(0, -r), a.add(0, r)),
                    pt.projectOnCircle(a.add(r, r), r),
                    pt.projectOnCircle(b.add(-r, r), r),
                    pt.projectOnCircle(c.add(-r, -r), r),
                    pt.projectOnCircle(d.add(r, -r), r)
                ];
                return _.min(pts, function (test) {
                    return pt.sub(test).length;
                });
            },
            xywh: $property(function () {
                return {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
            }),
            ltwh: $property(function () {
                return {
                    left: this.left,
                    top: this.top,
                    width: this.width,
                    height: this.height
                };
            }),
            union: function (other) {
                return BBox.fromLTRB(Math.min(this.left, other.left), Math.min(this.top, other.top), Math.max(this.right, other.right), Math.max(this.bottom, other.bottom));
            },
            centerIn: function (other) {
                return new BBox(other.x, other.y, this.width, this.height);
            },
            clone: $property(function () {
                return new BBox(this.x, this.y, this.width, this.height);
            }),
            floor: $property(function () {
                return new BBox.fromLTRB(Math.floor(this.left), Math.floor(this.top), Math.floor(this.right), Math.floor(this.bottom));
            }),
            css: $property(function () {
                return {
                    left: this.left + 'px',
                    top: this.top + 'px',
                    width: this.width + 'px',
                    height: this.height + 'px'
                };
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
            rightTop: $property(function () {
                return new Vec2(this.right, this.top);
            }),
            left: $property(function () {
                return this.x - this.width / 2;
            }),
            right: $property(function () {
                return this.x + this.width / 2;
            }),
            top: $property(function () {
                return this.y - this.height / 2;
            }),
            bottom: $property(function () {
                return this.y + this.height / 2;
            }),
            center: $property(function () {
                return new Vec2(this.x, this.y);
            }),
            extent: $alias('size'),
            size: $property(function () {
                return new Vec2(this.width, this.height);
            }),
            offset: function (amount) {
                return new BBox(this.x + amount.x, this.y + amount.y, this.width, this.height);
            },
            newWidth: function (width) {
                return new BBox(this.x - (width - this.width) / 2, this.y, width, this.height);
            },
            grow: function (amount) {
                return new BBox(this.x, this.y, this.width + amount * 2, this.height + amount * 2);
            },
            shrink: function (amount) {
                return this.grow(-amount);
            },
            mul: function (z) {
                return new BBox(this.x * z, this.y * z, this.width * z, this.height * z);
            },
            area: $property(function () {
                return Math.abs(this.width * this.height);
            }),
            intersects: function (other) {
                return !(this.right < other.left || this.left > other.right || this.bottom < other.top || this.top > other.bottom);
            },
            toString: function () {
                return '{ ' + this.left + ',' + this.top + ' \u2190\u2192 ' + this.right + ',' + this.bottom + ' }';
            }
        });
        Transform = $prototype({
            $static: {
                identity: $property(function () {
                    return new Transform();
                }),
                svgMatrix: function (m) {
                    return new Transform([
                        [
                            m.a,
                            m.c,
                            m.e
                        ],
                        [
                            m.b,
                            m.d,
                            m.f
                        ],
                        [
                            0,
                            0,
                            1
                        ]
                    ]);
                },
                translation: function (v) {
                    return new Transform([
                        [
                            1,
                            0,
                            v.x
                        ],
                        [
                            0,
                            1,
                            v.y
                        ],
                        [
                            0,
                            0,
                            1
                        ]
                    ]);
                }
            },
            constructor: function (components) {
                this.components = components || [
                    [
                        1,
                        0,
                        0
                    ],
                    [
                        0,
                        1,
                        0
                    ],
                    [
                        0,
                        0,
                        1
                    ]
                ];
            },
            multiply: function (m) {
                var result = [
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ]
                ];
                var i, j, k, a = this.components, b = m.components;
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        for (k = 0; k < 3; k++) {
                            result[i][j] += a[i][k] * b[k][j];
                        }
                    }
                }
                return new Transform(result);
            },
            translate: function (v) {
                return this.multiply(Transform.translation(v));
            },
            scale: function (s) {
                return this.multiply(new Transform([
                    [
                        s,
                        0,
                        0
                    ],
                    [
                        0,
                        s,
                        0
                    ],
                    [
                        0,
                        0,
                        1
                    ]
                ]));
            },
            inverse: $property($memoized(function () {
                var m = this.components;
                var id = 1 / (m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]));
                return new Transform([
                    [
                        (m[1][1] * m[2][2] - m[2][1] * m[1][2]) * id,
                        -(m[0][1] * m[2][2] - m[0][2] * m[2][1]) * id,
                        (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * id
                    ],
                    [
                        (m[1][0] * m[2][2] - m[1][2] * m[2][0]) * id,
                        (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * id,
                        -(m[0][0] * m[1][2] - m[1][0] * m[0][2]) * id
                    ],
                    [
                        (m[1][0] * m[2][1] - m[2][0] * m[1][1]) * id,
                        -(m[0][0] * m[2][1] - m[2][0] * m[0][1]) * id,
                        (m[0][0] * m[1][1] - m[1][0] * m[0][1]) * id
                    ]
                ]);
            })),
            unproject: function (v) {
                var m = this.components;
                return new Vec2(v.x * m[0][0] + v.y * m[0][1] + m[0][2], v.x * m[1][0] + v.y * m[1][1] + m[1][2]);
            },
            project: function (v) {
                return this.inverse.unproject(v);
            }
        });
        _.rng = function (seed, from, to) {
            var m_w = seed;
            var m_z = 987654321;
            var mask = 4294967295;
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
        _.equalDistribution = function (value, n) {
            var average = value / n;
            var realLeft = 0;
            return _.times(n, function () {
                var left = Math.round(realLeft);
                var right = Math.round(realLeft += average);
                var rough = Math.floor(right - left);
                return rough;
            });
        };
        _.ptInRect = function (pt, rect) {
            return pt.x >= rect.left && pt.y >= rect.top && pt.x < rect.right && pt.y < rect.bottom;
        };
        _.hue2CSS = function (H, a) {
            return _.RGB2CSS(_.hue2RGB(H), a);
        };
        _.HSL2CSS = function (hsl, a) {
            return _.RGB2CSS(_.HSL2RGB(hsl), a);
        };
        _.HSL2RGB = function (hsl) {
            var h = hsl[0], s = hsl[1], l = hsl[2];
            var rgb = _.hue2RGB(h);
            var c = (1 - Math.abs(2 * l - 1)) * s;
            return [
                (rgb[0] - 0.5) * c + l,
                (rgb[1] - 0.5) * c + l,
                (rgb[2] - 0.5) * c + l
            ];
        };
        _.hue2RGB = function (hue) {
            return [
                Math.max(0, Math.min(1, Math.abs(hue * 6 - 3) - 1)),
                Math.max(0, Math.min(1, 2 - Math.abs(hue * 6 - 2))),
                Math.max(0, Math.min(1, 2 - Math.abs(hue * 6 - 4)))
            ];
        };
        _.RGB2CSS = function (rgb, a) {
            return 'rgba(' + Math.round(rgb[0] * 255) + ',' + Math.round(rgb[1] * 255) + ',' + Math.round(rgb[2] * 255) + ',' + (a === undefined ? rgb[3] === undefined ? 1 : rgb[3] : a) + ')';
        };
        _.RGB2HSL = function (rgb, a_) {
            var r = rgb[0], g = rgb[1], b = rgb[2], a = a_ === undefined ? rgb[3] : a_;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0;
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                }
                h /= 6;
            }
            return a === undefined ? [
                h,
                s,
                l
            ] : [
                h,
                s,
                l,
                a
            ];
        };
        _.extend(Math, function (decimalAdjust) {
            return {
                roundTo: function (value, precision) {
                    return value - value % precision;
                },
                round10: function (value, exp) {
                    return decimalAdjust('round', value, exp);
                },
                floor10: function (value, exp) {
                    return decimalAdjust('floor', value, exp);
                },
                ceil10: function (value, exp) {
                    return decimalAdjust('ceil', value, exp);
                }
            };
        }(function (type, value, exp) {
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
        }));
        (function () {
            var toposort = __webpack_require__(24);
            Array.prototype.topoSort = function () {
                return toposort(this);
            };
        }());
        {
            Array.prototype.topoMerge = function () {
                var edges = [];
                for (var i = 0, ni = this.length; i < ni; i++) {
                    var sequence = this[i];
                    for (var j = 0, nj = sequence.length - 1; j < nj; j++) {
                        edges.push([
                            sequence[j],
                            sequence[j + 1]
                        ]);
                    }
                }
                return edges.topoSort();
            };
        }
        {
            DAG = function (cfg) {
                this.cfg = cfg || {}, this.nodes = cfg.nodes || _.noop;
            }, DAG.prototype.each = function (N, fn, prev, visited) {
                visited = visited || new Set();
                if (!visited.has(N)) {
                    visited.add(N);
                    var self = this, nodes = this.nodes(N) || [], stop = fn.call(this, N, {
                            nodes: nodes,
                            prev: prev,
                            visited: visited
                        });
                    if (stop !== true) {
                        nodes.forEach(function (NN) {
                            self.each(NN, fn, N, visited);
                        });
                    }
                }
                ;
                return visited;
            }, DAG.prototype.edges = function (N) {
                var edges = [];
                this.each(N, function (N, context) {
                    context.nodes.concat(N).reduce(function (A, B) {
                        edges.push([
                            A,
                            B
                        ]);
                        return B;
                    });
                });
                return edges;
            }, DAG.prototype.sortedSubgraphOf = function (node0) {
                return this.edges(node0).topoSort().remove(node0);
            };
            DAG.sortedSubgraphOf = function (node0, cfg) {
                return new DAG(cfg).sortedSubgraphOf(node0);
            };
        }
    },
    function (module, exports) {
        module.exports = exports = function (edges) {
            return toposort(uniqueNodes(edges), edges);
        };
        exports.array = toposort;
        function toposort(nodes, edges) {
            var cursor = nodes.length, sorted = new Array(cursor), visited = {}, i = cursor;
            while (i--) {
                if (!visited[i])
                    visit(nodes[i], i, []);
            }
            return sorted;
            function visit(node, i, predecessors) {
                if (predecessors.indexOf(node) >= 0) {
                    throw new Error('Cyclic dependency: ' + JSON.stringify(node));
                }
                if (!~nodes.indexOf(node)) {
                    throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: ' + JSON.stringify(node));
                }
                if (visited[i])
                    return;
                visited[i] = true;
                var outgoing = edges.filter(function (edge) {
                    return edge[0] === node;
                });
                if (i = outgoing.length) {
                    var preds = predecessors.concat(node);
                    do {
                        var child = outgoing[--i][1];
                        visit(child, nodes.indexOf(child), preds);
                    } while (i);
                }
                sorted[--cursor] = node;
            }
        }
        function uniqueNodes(arr) {
            var res = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                var edge = arr[i];
                if (res.indexOf(edge[0]) < 0)
                    res.push(edge[0]);
                if (res.indexOf(edge[1]) < 0)
                    res.push(edge[1]);
            }
            return res;
        }
    },
    function (module, exports) {
        ;
        Parse = {
            keyCodeAsString: function (key) {
                return String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
            },
            fileName: function (path) {
                return _.first(_.last(path.split(/\\|\//)).split('.'));
            }
        };
    },
    function (module, exports) {
        Sort = {
            Ascending: 1,
            Descending: -1,
            strings: function (a, b) {
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
            numbers: function (a, b) {
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
            generic: function (a, b) {
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
            inverse: function (sort) {
                return function (a, b) {
                    return -sort(a, b);
                };
            },
            field: function (name, sort, order) {
                return function (a, b) {
                    return sort(a[name], b[name]) * order;
                };
            }
        };
    },
    function (module, exports) {
        ;
        Lock = $prototype({
            acquire: function (then) {
                this.wait(this.$(function () {
                    if (!this.waitQueue) {
                        this.waitQueue = [];
                    }
                    then();
                }));
            },
            acquired: function () {
                return this.waitQueue !== undefined;
            },
            wait: function (then) {
                if (this.acquired()) {
                    this.waitQueue.push(then);
                } else {
                    then();
                }
            },
            release: function () {
                if (this.waitQueue.length) {
                    var queueFirst = _.first(this.waitQueue);
                    this.waitQueue = _.rest(this.waitQueue);
                    queueFirst();
                } else
                    delete this.waitQueue;
            }
        });
        _.interlocked = function (fn) {
            var lock = new Lock(), fn = $untag(fn);
            return _.extendWith({
                lock: lock,
                wait: lock.$(lock.wait)
            }, function () {
                var this_ = this, args_ = arguments;
                return new Promise(function (resolve) {
                    lock.acquire(function () {
                        __.then(fn.apply(this_, args_), function (x) {
                            lock.release();
                            resolve(x);
                        });
                    });
                });
            });
        };
        _.defineKeyword('scope', function (fn) {
            var releaseStack = undefined;
            return _.argumentPrependingWrapper(Tags.unwrap(fn), function (fn) {
                var released = { when: undefined };
                (releaseStack = releaseStack || []).push(released);
                fn(function (then) {
                    if (released.when)
                        throw new Error('$scope: release called twice');
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
        });
        if ($platform.NodeJS) {
            module.exports = _;
        }
    },
    function (module, exports) {
        ;
        _.defineKeyword('component', function (definition) {
            return $extends(Component, definition);
        });
        _([
            'extendable',
            'trigger',
            'triggerOnce',
            'barrier',
            'bindable',
            'memoize',
            'interlocked',
            'memoizeCPS',
            'debounce',
            'throttle',
            'overrideThis',
            'listener',
            'postpones',
            'reference',
            'raw',
            'binds',
            'observes'
        ]).each(_.defineTagKeyword);
        (function () {
            var impl = function (impl) {
                return function (x, fn) {
                    return _.isFunction(x) && arguments.length === 1 ? impl(x, fn) : impl(fn, x);
                };
            };
            _.defineTagKeyword('observableProperty', impl);
            _.defineTagKeyword('observable', impl);
        }());
        _.defineKeyword('observableRef', function (x) {
            return $observableProperty($reference(x));
        });
        $prototype.macro('$depends', function (def, value, name) {
            def.$depends = $builtin($const(_.coerceToArray(value)));
            return def;
        });
        $prototype.macroTag('extendable', function (def, value, name) {
            def[name] = $builtin($const(value));
            return def;
        });
        Component = $prototype({
            $defaults: $extendable({}),
            $requires: $extendable({}),
            $macroTags: $extendable({}),
            $impl: {
                sequence: function (def, base) {
                    return _.sequence(this.extendWithTags, this.flatten, this.generateCustomCompilerImpl(base), this.generateArgumentContractsIfNeeded, this.ensureFinalContracts(base), this.generateConstructor(base), this.evalAlwaysTriggeredMacros(base), this.evalMemberTriggeredMacros(base), this.expandTraitsDependencies, this.mergeExtendables(base), this.contributeTraits(base), this.mergeStreams, this.mergeBindables, this.generateBuiltInMembers(base), this.callStaticConstructor, this.expandAliases, this.groupMembersByTagForFastEnumeration, this.defineStaticMembers, this.defineInstanceMembers);
                },
                expandTraitsDependencies: function (def) {
                    if (_.isNonempty($untag(def.$depends)) && _.isEmpty($untag(def.$traits))) {
                        def.$traits = DAG.sortedSubgraphOf(def, {
                            nodes: function (def) {
                                return $untag(def.$depends);
                            }
                        });
                    }
                    ;
                    return def;
                },
                mergeExtendables: function (base) {
                    return function (def) {
                        _.each(base.$definition, function (value, name) {
                            if (value && value.$extendable) {
                                def[name] = Tags.modify(value, function (value) {
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
                mergeTraitsMembers: function (def, traits) {
                    var pool = {}, bindables = {}, streams = {};
                    var macroTags = $untag(def.$macroTags);
                    var definitions = _.pluck(traits, '$definition').concat(_.clone(def));
                    _.each(definitions, function (traitDef) {
                        _.each(macroTags && this.applyMacroTags(macroTags, _.extend(_.clone(traitDef), { constructor: def.constructor })) || traitDef, function (member, name) {
                            if ($builtin.isNot(member) && $builtin.isNot(def[name]) && name !== 'constructor') {
                                if ($bindable.is(member)) {
                                    bindables[name] = member;
                                }
                                if (Component.isStreamDefinition(member)) {
                                    streams[name] = member;
                                }
                                (pool[name] || (pool[name] = [])).push(member);
                                def[name] = member;
                            }
                        });
                    }, this);
                    def.__bindables = bindables;
                    def.__streams = streams;
                    def.__membersByName = pool;
                },
                mergeStreams: function (def) {
                    var pool = def.__membersByName;
                    _.each(def.__streams, function (stream, name) {
                        var clonedStream = def[name] = Tags.clone(stream);
                        clonedStream.listeners = [];
                        _.each(pool[name], function (member) {
                            if (member !== stream) {
                                clonedStream.listeners.push($untag(member));
                            }
                        });
                    });
                    return def;
                },
                mergeBindables: function (def) {
                    var pool = def.__membersByName;
                    _.each(def.__bindables, function (member, name) {
                        var bound = _.filter2(_.bindable.hooks, function (hook, i) {
                            var bound = pool[_.bindable.hooksShort[i] + name.capitalized];
                            return bound ? [
                                hook,
                                bound
                            ] : false;
                        });
                        if (bound.length) {
                            var hooks = {};
                            _.each(bound, function (kv) {
                                _.each(kv[1], function (fn) {
                                    fn = $untag(fn);
                                    if (_.isFunction(fn)) {
                                        var k = '_' + kv[0];
                                        (hooks[k] || (hooks[k] = [])).push(fn);
                                    }
                                });
                            });
                            def[name] = $bindable({ hooks: hooks }, Tags.clone(member));
                        }
                    }, this);
                    return def;
                }
            },
            isStreamDefinition: $static(function (def) {
                return _.isObject(def) && (def.$trigger || def.$triggerOnce || def.$barrier || def.$observable || def.$observableProperty);
            }),
            mapMethods: function () {
                var iterator = _.last(arguments), predicate = arguments.length === 1 ? _.constant(true) : arguments[0];
                var methods = [];
                for (var k in this) {
                    var def = this.constructor.$definition[k];
                    if (!(def && def.$property)) {
                        var fn = this[k];
                        if (_.isFunction(fn) && !_.isPrototypeConstructor(fn) && predicate(def)) {
                            this[k] = iterator.call(this, fn, k, def) || fn;
                        }
                    }
                }
            },
            enumMethods: function (_1, _2) {
                if (arguments.length === 2) {
                    this.mapMethods(_1, _2.returns(undefined));
                } else {
                    this.mapMethods(_1.returns(undefined));
                }
            },
            constructor: $final(function (arg1, arg2) {
                this.parent_ = undefined;
                this.children_ = [];
                var cfg = this.cfg = typeof arg1 === 'object' ? arg1 : {}, componentDefinition = this.constructor.$definition;
                if (this.constructor.$defaults) {
                    cfg = this.cfg = _.extend(_.cloneDeep(this.constructor.$defaults), cfg);
                }
                this.mapMethods(function (fn, name, def) {
                    if (name !== '$' && name !== 'init' && !(def && def.$raw)) {
                        return this.$(fn);
                    }
                });
                _.onBefore(this, 'destroy', this._beforeDestroy);
                _.onAfter(this, 'destroy', this._afterDestroy);
                var initialStreamListeners = [];
                var excludeFromCfg = { init: true };
                _.each(componentDefinition, function (def, name) {
                    if (def !== undefined) {
                        if (def.$observableProperty) {
                            var definitionValue = def.subject;
                            var defaultValue = name in cfg ? cfg[name] : definitionValue;
                            var streamName = name + 'Change';
                            var observable = excludeFromCfg[streamName] = this[streamName] = _.observable();
                            observable.context = this;
                            observable.postpones = def.$postpones;
                            if (_.isPrototypeInstance(definitionValue)) {
                                var constructor = definitionValue.constructor;
                                observable.beforeWrite = function (value) {
                                    return constructor.isTypeOf(value) ? value : new constructor(value);
                                };
                            }
                            if (def.$reference) {
                                observable.trackReference = true;
                            }
                            _.defineProperty(this, name, {
                                get: function () {
                                    return observable.value;
                                },
                                set: function (x) {
                                    observable.write.call(this, x);
                                }
                            });
                            if (def.listeners) {
                                _.each(def.listeners, function (value) {
                                    initialStreamListeners.push([
                                        observable,
                                        value
                                    ]);
                                });
                            }
                            if (_.isFunction(def.$observableProperty)) {
                                initialStreamListeners.push([
                                    observable,
                                    def.$observableProperty
                                ]);
                            }
                            if (defaultValue !== undefined) {
                                observable(defaultValue);
                            }
                        } else if (Component.isStreamDefinition(def)) {
                            var stream = excludeFromCfg[name] = this[name] = _.extend((def.$trigger ? _.trigger : def.$triggerOnce ? _.triggerOnce : def.$observable ? _.observable : def.$barrier ? _.barrier : undefined)(def.subject), {
                                context: this,
                                postpones: def.$postpones
                            });
                            if (def.$reference) {
                                observable.trackReference = true;
                            }
                            if (def.listeners) {
                                _.each(def.listeners, function (value) {
                                    initialStreamListeners.push([
                                        stream,
                                        value
                                    ]);
                                });
                            }
                            if (_.isFunction(def.$observable)) {
                                initialStreamListeners.push([
                                    stream,
                                    def.$observable
                                ]);
                            }
                            var defaultListener = cfg[name];
                            if (defaultListener) {
                                if (def.$observable && defaultListener.isObservable) {
                                    defaultListener.tie(stream);
                                } else {
                                    initialStreamListeners.push([
                                        stream,
                                        defaultListener
                                    ]);
                                }
                            }
                        }
                        if (def.$listener) {
                            this[name].queuedBy = [];
                        }
                        if (def.$interlocked) {
                            this[name] = _.interlocked(this[name]);
                        }
                        if (def.$bindable) {
                            this[name] = _.extend(_.bindable(this[name], this), _.map2(def.$bindable.hooks || {}, _.mapsWith(this.$.bind(this).arity1)));
                        }
                        if (def.$debounce) {
                            var fn = this[name], opts = _.coerceToObject(def.$debounce);
                            this[name] = fn.debounced(opts.wait || 500, opts.immediate);
                        }
                        if (def.$throttle) {
                            var fn = this[name], opts = _.coerceToObject(def.$throttle);
                            this[name] = _.throttle(fn, opts.wait || 500, opts);
                        }
                        if (def.$memoize) {
                            this[name] = _.memoize(this[name]);
                        } else if (def.$memoizeCPS) {
                            this[name] = _.cps.memoize(this[name]);
                        }
                    }
                }, this);
                var init = this.init;
                this.init = this._beforeInit.then(init.then(this._afterInit)).bind(this);
                _.each(cfg, function (value, name) {
                    if (!(name in excludeFromCfg)) {
                        this[name] = _.isFunction(value) ? this.$(value) : value;
                    }
                }, this);
                _.each(componentDefinition, function (def, name) {
                    if (def && def.$alias && !def.$raw) {
                        this[name] = this[$untag(def)];
                    }
                }, this);
                if (_.hasAsserts) {
                    _.each(this.constructor.$requires, function (contract, name) {
                        $assertTypeMatches(_.object([[
                                name,
                                this[name]
                            ]]), _.object([[
                                name,
                                contract
                            ]]));
                    }, this);
                }
                _.each(initialStreamListeners, function (v) {
                    v[0].call(this, v[1]);
                }, this);
                if (!(cfg.init === false || this.constructor.$defaults && this.constructor.$defaults.init === false)) {
                    var result = this.init();
                    if (result instanceof Promise) {
                        result.panic;
                    }
                }
            }),
            callChainMethod: function (name) {
                var self = this;
                return __.seq(_.filter2(this.constructor.$traits || [], function (Trait) {
                    var method = Trait.prototype[name];
                    return method && method.bind(self) || false;
                }));
            },
            _beforeInit: function () {
                if (this.initialized.already) {
                    throw new Error('Component: I am already initialized. Probably you\'re doing it wrong.');
                }
                return this.callChainMethod('beforeInit');
            },
            init: function () {
            },
            _afterInit: function () {
                var cfg = this.cfg, self = this;
                return __.then(this.callChainMethod.$('afterInit'), function () {
                    self.initialized(true);
                    self.alive(true);
                    _.each(self.constructor.$definition, function (def, name) {
                        if (def && def.$observableProperty) {
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
            _beforeDestroy: function () {
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
                this.enumMethods(_.off.arity1);
                _.each(this.children_, _.method('destroy'));
                this.children_ = [];
            },
            destroy: function () {
            },
            _afterDestroy: function () {
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
            attachedTo: $property(function () {
                return this.parent_;
            }),
            attachTo: function (p) {
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
                }
                return this;
            },
            detach: function () {
                return this.attachTo(undefined);
            },
            attached: $property(function () {
                return this.children_;
            }),
            attach: function (c) {
                _.invoke(_.coerceToArray(c), 'attachTo', this);
                return this;
            },
            detachAll: function () {
                _.each(this.children_, function (c) {
                    c.parent_ = undefined;
                });
                this.children_ = [];
                return this;
            },
            destroyAll: function () {
                _.each(this.children_, function (c) {
                    c.parent_ = undefined;
                    c.destroy();
                });
                this.children_ = [];
                return this;
            }
        });
    },
    function (module, exports) {
        R = $singleton({
            $test: function () {
                var $assertExpr = function (a, b) {
                    $assert(a, _.quote(b.str, '//'));
                };
                $assertExpr('/[^\\s]*/', $r.anyOf.except.space.$);
                $assertExpr('/\\[.*\\]|[\\s]/', $r.anything.inBrackets.or.oneOf.space.$);
                var expr = $r.expr('before', $r.anything.text('$print').something).then($r.expr('argument', $r.someOf.except.text(',)')).inParentheses.then($r.expr('tail', $r.anything))).$;
                $assertExpr('/(.*\\$print.+)\\(([^,\\)]+)\\)(.*)/', expr);
                $assert(expr.parse(' var x = $print (blabla) // lalala '), {
                    before: ' var x = $print ',
                    argument: 'blabla',
                    tail: ' // lalala '
                });
                $assert([
                    [
                        '[^',
                        '\\s',
                        ']'
                    ],
                    '*'
                ], R.anyOf(R.except(R.space)));
            },
            constructor: function () {
                this.reduce = _.hyperOperator(_.binary, _.reduce2, _.goDeeperAlwaysIfPossible, _.isNonTrivial.and(_.not(this.isSubexpr)));
                this.initDSL();
            },
            expr: function (expr, subexprs) {
                subexprs = subexprs || [];
                return new R.Expr(R.reduce('', expr, function (memo, s) {
                    if (R.isSubexpr(s)) {
                        subexprs.push(s);
                        return memo + R.expr(R.root(s.value), subexprs).str;
                    } else {
                        return memo + s;
                    }
                }), subexprs);
            },
            Expr: $prototype({
                constructor: function (str, subexprs) {
                    this.rx = new RegExp();
                    this.rx.compile(str);
                    this.str = str;
                    this.subexprs = subexprs;
                },
                parse: function (str) {
                    var match = str.match(this.rx);
                    return match && _.extend.apply(null, _.zipWith([
                        _.rest(match),
                        this.subexprs
                    ], function (match, subexpr) {
                        return _.object([[
                                subexpr.name,
                                match
                            ]]);
                    })) || {};
                }
            }),
            metacharacters: $property(_.index('\\^$.|?*+()[{')),
            escape: function (s) {
                return _.map(s, function (x) {
                    return R.metacharacters[x] ? '\\' + x : x;
                }).join('');
            },
            text: $alias('escape'),
            subexpr: function (name, s) {
                return {
                    name: name,
                    value: [
                        '(',
                        s,
                        ')'
                    ]
                };
            },
            maybe: function (s) {
                return [
                    s,
                    '?'
                ];
            },
            anyOf: function (s) {
                return [
                    s,
                    '*'
                ];
            },
            someOf: function (s) {
                return [
                    s,
                    '+'
                ];
            },
            oneOf: function (s) {
                return [
                    '[',
                    s,
                    ']'
                ];
            },
            except: function (s) {
                return [
                    '[^',
                    s,
                    ']'
                ];
            },
            or: function (a, b) {
                return [
                    a,
                    '|',
                    b
                ];
            },
            begin: $property('^'),
            end: $property('$'),
            space: $property('\\s'),
            maybeSpaces: $property('\\s*'),
            spaces: $property('\\s+'),
            anything: $property('.*'),
            something: $property('.+'),
            comma: $property(','),
            parentheses: function (s) {
                return [
                    '\\(',
                    s,
                    '\\)'
                ];
            },
            brackets: function (s) {
                return [
                    '\\[',
                    s,
                    '\\]'
                ];
            },
            isSubexpr: function (s) {
                return _.isStrictlyObject(s) && !_.isArray(s) ? true : false;
            },
            root: function (r) {
                return r && r.$$ ? r.$$ : r;
            },
            initDSL: function () {
                _.defineKeyword('r', function () {
                    return $$r([]);
                });
                _.defineKeyword('$r', function (cursor) {
                    var shift = function (x) {
                        cursor.push(x);
                        return cursor.forward;
                    };
                    _.defineHiddenProperty(cursor, 'then', function (x) {
                        cursor.push(R.root(x));
                        return cursor;
                    });
                    _.defineHiddenProperty(cursor, 'text', function (x) {
                        cursor.push(R.text(x));
                        return cursor;
                    });
                    _.defineHiddenProperty(cursor, 'expr', function (x, s) {
                        cursor.push(R.subexpr(x, R.root(s)));
                        return cursor;
                    });
                    _.defineHiddenProperty(cursor, 'forward', function () {
                        return cursor.next || ((cursor.next = $r).prev = cursor).next;
                    });
                    _.each([
                        'maybe',
                        'anyOf',
                        'someOf',
                        'oneOf',
                        'except'
                    ], function (key) {
                        _.defineHiddenProperty(cursor, key, function () {
                            return shift(R[key](cursor.forward));
                        });
                    });
                    _.each([
                        'parentheses',
                        'brackets'
                    ], function (key) {
                        _.defineHiddenProperty(cursor, 'in' + key.capitalized, function () {
                            return cursor.$$.prev = $$r(R[key](cursor.$$));
                        });
                    });
                    _.each(['or'], function (key) {
                        _.defineHiddenProperty(cursor, key, function () {
                            var next = $r;
                            return (next.prev = cursor.$$.prev = $$r(R[key](cursor.$$, next))).next = next;
                        });
                    });
                    _.each([
                        'begin',
                        'end',
                        'space',
                        'anything',
                        'something'
                    ], function (key) {
                        _.defineHiddenProperty(cursor, key, function () {
                            return shift([
                                R[key],
                                cursor.forward
                            ]);
                        });
                    });
                    _.defineHiddenProperty(cursor, '$$', function () {
                        var root = cursor;
                        while (root.prev) {
                            root = root.prev;
                        }
                        return root;
                    });
                    _.defineHiddenProperty(cursor, '$', function () {
                        return R.expr(cursor.$$);
                    });
                    return cursor;
                });
            }
        });
    },
    function (module, exports) {
        ;
        (function () {
            var fnNameExpr = $r.expr('how', $r.text('before').or.text('after')).expr('name', $r.anything).$;
            var tryBind = function (target, methodName, bind, boundMethod) {
                var method = target[methodName];
                if (method && _.isFunction(method)) {
                    bind(target, methodName, boundMethod);
                }
            };
            _.defineKeyword('aspect', function (ofWhat, cfg) {
                var aspectDef = Tags.unwrap(_.sequence($prototype.impl.extendWithTags, $prototype.impl.flatten, $prototype.impl.generateArgumentContractsIfNeeded, $prototype.impl.contributeTraits({}), $prototype.impl.expandAliases).call($prototype.impl, cfg));
                var motherDef = ofWhat.constructor && ofWhat.constructor.$definition;
                if (motherDef) {
                    (motherDef.$aspects = motherDef.$aspects || []).push(aspectDef);
                }
                _.each(aspectDef, function (value, name) {
                    if (aspectDef.hasOwnProperty(name) && _.isFunction(value)) {
                        var parsed = fnNameExpr.parse(name);
                        var originalName = parsed.name && parsed.name.decapitalized || name;
                        var bindTool = parsed.how && _['on' + parsed.how.capitalized] || _.intercept;
                        if (bindTool) {
                            tryBind(ofWhat, originalName, bindTool, value);
                            tryBind(ofWhat.prototype, originalName, bindTool, value);
                        }
                    }
                });
                if (ofWhat.aspectAdded) {
                    ofWhat.aspectAdded(aspectDef);
                }
                return aspectDef;
            });
        }());
    },
    function (module, exports) {
        ;
        TimeoutError = $extends(Error, { message: 'timeout expired' });
        __ = Promise.eval = function (x) {
            var this_ = this, args = _.rest(arguments);
            return x instanceof Promise ? x : x instanceof Function ? new Promise(function (resolve) {
                resolve(x.apply(this_, args));
            }) : Promise.resolve(x);
        };
        Promise.coerce = function (x) {
            return x instanceof Promise ? x : Promise.resolve(x);
        };
        __.noop = function () {
            return Promise.resolve();
        };
        __.eternity = new Promise(function () {
        });
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
        __.then = function (a, b) {
            b = _.coerceToFunction(b);
            try {
                var x = a instanceof Function ? a() : a;
                return x instanceof Promise ? x.then(b) : b(x);
            } catch (e) {
                return Promise.reject(e);
            }
        };
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
            delay: function (ms) {
                return this.then(__.delays(ms));
            },
            timeout: function (ms) {
                return this.race(__.delay(ms).reject(new TimeoutError()));
            },
            now: $property(function () {
                return this.timeout(0);
            })
        });
        $mixin(Array, {
            race: $property(function () {
                return Promise.race(this);
            })
        });
        $mixin(Promise, {
            race: function (other) {
                return [
                    this,
                    other
                ].race;
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
            reject: function (e) {
                return this.then(_.throwsError(e));
            },
            chain: function (fn) {
                return this.then(function (x) {
                    fn(x);
                    return x;
                });
            },
            done: function (fn) {
                return this.then(function (x) {
                    fn(null, x);
                    return x;
                }, function (e) {
                    fn(e, null);
                    throw e;
                });
            },
            finally: function (fn) {
                return this.then(function (x) {
                    return fn(null, x);
                }, function (e) {
                    return fn(e, null);
                });
            },
            log: $property(function () {
                return this.then(log, log.then(_.throwsError));
            }),
            alert: $property(function () {
                return this.done(alert2, alert2.then(_.throwsError));
            }),
            panic: $property(function () {
                return this.catch(function (e) {
                    if (_.globalUncaughtExceptionHandler) {
                        _.globalUncaughtExceptionHandler(e);
                    }
                    throw e;
                });
            }),
            assert: function (desired) {
                return this.then(function (x) {
                    $assert(x, desired);
                    return x;
                });
            },
            assertTypeMatches: function (desired) {
                return this.then(function (x) {
                    $assertTypeMatches(x, desired);
                    return x;
                });
            },
            assertRejected: function (desired) {
                var check = arguments.length > 0;
                return this.catch(function (x) {
                    if (check) {
                        $assert(x, desired);
                    }
                    return x;
                });
            }
        });
        (function () {
            var TaskPool = $prototype({
                constructor: function (cfg) {
                    this.maxTime = cfg && cfg.maxTime;
                    this.pending = [];
                    if (this.maxConcurrency = cfg && cfg.maxConcurrency) {
                        this.numActive = 0;
                        this.queue = [];
                    }
                },
                run: function (task) {
                    var self = this;
                    if (this.numActive >= this.maxConcurrency) {
                        return new Promise(function (resolve) {
                            self.queue.push(function () {
                                return self.run(task).then(resolve);
                            });
                        });
                    } else {
                        var p = __(task);
                        if (this.maxTime !== undefined) {
                            p = p.timeout(this.maxTime);
                        }
                        if (this.maxConcurrency !== undefined) {
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
                })
            });
            __.scatter = function (x, fn, cfg) {
                return __.then(x, function (x) {
                    if (_.isStrictlyObject(x)) {
                        var result = _.coerceToEmpty(x), tasks = new TaskPool(cfg);
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
        }());
        __.map = function (x, fn, cfg) {
            return __.scatter(x, function (v, k, x) {
                return __.then(fn.$(v, k, x), function (x) {
                    return [
                        x,
                        k
                    ];
                });
            }, cfg);
        };
        __.filter = function (x, fn, cfg) {
            return __.scatter(x, function (v, k, x) {
                return __.then(fn.$(v, k, x), function (decision) {
                    return decision === false ? undefined : decision === true ? [
                        v,
                        k
                    ] : [
                        decision,
                        k
                    ];
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
        __.seq = function (arr) {
            return _.reduce2(arr, __.then);
        };
        __.all = function (arr) {
            return Promise.all(_.map(arr, __));
        };
        __.race = function (arr) {
            return Promise.race(_.map(arr, __));
        };
        $mixin(Function, {
            promisifyAll: $static(function (obj, cfg) {
                var cfg = cfg || {}, except = cfg.except || _.noop;
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
                    var self = this, args = arguments;
                    return new Promise(function (resolve, reject) {
                        f.apply(self, _.asArray(args).concat(function (err, what) {
                            if (err) {
                                reject(err);
                            }
                            resolve(what);
                        }));
                    });
                };
            }))
        });
    },
    function (module, exports) {
        'use strict';
        ;
        $global.Channel = $extends(Promise, {
            constructor: function (fn, transducers, before) {
                this.after = [];
                this.state = 'pending';
                this.value = undefined;
                this.transducers = {
                    resolve: transducers && transducers.resolve || (x => x),
                    reject: transducers && transducers.reject || (e => {
                        throw e;
                    })
                };
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
            _resolve: function (x) {
                this.state = 'resolved';
                this.value = x;
                this.after.forEach(c => c.resolve(x));
            },
            _reject: function (e) {
                this.state = 'rejected';
                this.value = e;
                this.after.forEach(c => c.reject(e));
            },
            resolve: function (x, transducer) {
                try {
                    x = (transducer || this.transducers.resolve)(x);
                    if (x instanceof Promise) {
                        x.then(x => this._resolve(x), e => this._reject(e));
                    } else {
                        this._resolve(x);
                    }
                } catch (e) {
                    this._reject(e);
                }
                return this;
            },
            reject: function (e) {
                return this.resolve(e, this.transducers.reject);
            },
            then: function (resolve, reject) {
                var c = new Channel(undefined, {
                    resolve: resolve,
                    reject: reject
                }, this);
                this.after.push(c);
                if (this.state === 'resolved') {
                    c.resolve(this.value);
                } else if (this.state === 'rejected') {
                    c.reject(this.value);
                }
                return c;
            },
            catch: function (fn) {
                return this.then(undefined, fn);
            }
        });
        Channel.all = arr => new Channel(resolve => {
            var complete = new Set(), value = new Array(arr.length);
            arr.forEach((c, i) => {
                c.then(x => {
                    value[i] = x;
                    if (complete.length === value.length) {
                        resolve(value);
                    } else {
                        complete.add(i);
                    }
                });
            });
        });
        Channel.resolve = x => new Channel(resolve => resolve(x));
        Channel.reject = e => new Channel((resolve, reject) => reject(e));
        $prototype.macroTag('channel', (def, value, name) => {
            var memberName = '_' + name;
            var initialValue = $untag(value);
            def[name] = Tags.modify(value, () => $property({
                get: function () {
                    return this[memberName] || (this[memberName] = new Channel(initialValue));
                },
                set: function (x) {
                    this[name].resolve(x);
                }
            }));
        });
    },
    function (module, exports) {
        Http = $singleton(Component, {
            $traits: [HttpMethods = $trait({
                    get: function (path, cfg) {
                        return this.request('GET', path, cfg);
                    },
                    post: function (path, cfg) {
                        return this.request('POST', path, cfg);
                    },
                    loadFile: function (path, cfg) {
                        return this.request('GET', path, { responseType: 'arraybuffer' });
                    },
                    uploadFile: function (path, file, cfg) {
                        return this.post(path, _.extend2({
                            data: file,
                            headers: {
                                'Content-Type': 'binary/octet-stream',
                                'X-File-Name': Parse.fileName(file.name || 'file').transliterate || 'file',
                                'X-File-Size': file.size,
                                'X-File-Type': file.type
                            }
                        }, cfg));
                    }
                })],
            request: function (type, path, cfg_) {
                var cfg = cfg_ || {};
                var abort = undefined;
                var p = new Promise(function (resolve, reject) {
                    if ($platform.Browser) {
                        var prePath = cfg.protocol || cfg.hostname || cfg.port ? (cfg.protocol || window.location.protocol) + '//' + (cfg.hostname || window.location.hostname) + ':' + (cfg.port || window.location.port) : '';
                        var xhr = new XMLHttpRequest();
                        xhr.open(type, prePath + path, true);
                        if (cfg.responseType)
                            xhr.responseType = cfg.responseType;
                        _.each(cfg.headers, function (value, key) {
                            xhr.setRequestHeader(key, value);
                        });
                        if (cfg.progress) {
                            xhr.onprogress = Http.progressCallbackWithSimulation(cfg.progress);
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (cfg.progress) {
                                    cfg.progress(1);
                                }
                                var response = xhr.responseType === 'arraybuffer' ? xhr.response : xhr.responseText;
                                if (xhr.status === 200) {
                                    resolve(response);
                                } else {
                                    reject(_.extend(new Error(xhr.statusText), {
                                        httpResponse: response,
                                        httpStatus: xhr.status
                                    }));
                                }
                            }
                        };
                        abort = function () {
                            xhr.abort();
                            reject('aborted');
                        };
                        if (cfg.data) {
                            xhr.send(cfg.data);
                        } else {
                            xhr.send();
                        }
                    } else {
                        reject('not implemented');
                    }
                });
                return _.extend(p, { abort: abort });
            },
            progressCallbackWithSimulation: function (progress) {
                var simulated = 0;
                progress(0);
                return function (e) {
                    if (e.lengthComputable) {
                        progress(e.loaded / e.total);
                    } else {
                        progress(simulated = (simulated += 0.1) > 1 ? 0 : simulated);
                    }
                };
            }
        });
        JSONAPI = $singleton(Component, {
            $traits: [HttpMethods],
            request: function (type, path, cfg) {
                var cfg = _.extend2({
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }, cfg);
                if (cfg.what) {
                    cfg.data = JSON.stringify(cfg.what);
                }
                var stackBeforeCall = _.hasReflection && $callStack.offset((cfg.stackOffset || 0) + 1).asArray;
                return Http.request(type, '/api/' + path, cfg).finally(function (e, response) {
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
                            throw _.extend(new Error('SERVER: ' + response.error), {
                                remote: true,
                                parsedStack: response.parsedStack.concat(stackBeforeCall || [])
                            });
                        } else {
                            throw new Error(response.error);
                        }
                    }
                });
            }
        });
    },
    function (module, exports) {
        (function () {
            var is = function (tag) {
                return function () {
                    return this.tagName === tag;
                };
            };
            N = function (tag, children) {
                var n = document.createElement(tag.uppercase);
                return children ? n.append(children) : n;
            };
            N.text = function (text) {
                return document.createTextNode(text);
            };
            _.each([
                'br',
                'p',
                'div',
                'em',
                'a',
                'b',
                'i',
                'u',
                's',
                'strong',
                'span',
                'sup',
                'sub',
                'button',
                'iframe',
                'pre',
                'img',
                'video',
                'source',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'textarea',
                'input',
                'style'
            ], function (tag) {
                var TAG = tag.uppercase;
                _.defineProperty(N, tag, function () {
                    return document.createElement(TAG);
                });
            });
            N.all = document.querySelectorAll.bind(document);
            N.one = document.querySelector.bind(document);
            $mixin(Node, {
                $: $prototype.impl.$,
                $callableAsFreeFunction: {
                    $property: {
                        isElement: function () {
                            return this.nodeType === Node.ELEMENT_NODE;
                        },
                        isText: function () {
                            return this.nodeType === Node.TEXT_NODE;
                        },
                        isLinebreak: is('BR'),
                        isDiv: is('DIV'),
                        isParagraph: is('P'),
                        isHyperlink: is('A'),
                        isAttachedToDocument: function () {
                            return this.matchUpwards(_.equals(document.body)) ? true : false;
                        },
                        forbidsEditing: function () {
                            return this.nodeType === Node.ELEMENT_NODE && this.getAttribute('contenteditable') === 'false';
                        }
                    }
                },
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
                    this.parentNode.removeChild(this);
                    return this;
                }),
                outerLeftBoundaryIn: function (container) {
                    var n = this;
                    while (n.grandParentNode && n.parentNode !== container && n.isFirstInParent) {
                        n = n.parentNode;
                    }
                    return n;
                },
                outerRightBoundaryIn: function (container) {
                    var n = this;
                    while (n.grandParentNode && n.parentNode !== container && n.isLastInParent) {
                        n = n.parentNode;
                    }
                    return n;
                },
                matchUpwards: function (pred) {
                    var n = this;
                    while (n && !pred(n)) {
                        n = n.parentNode;
                    }
                    return n;
                },
                isLeftmostNodeIn: function (parent) {
                    return parent && this.matchUpwards(function (n) {
                        return n === parent || !n.isFirstInParent;
                    }) === parent;
                },
                isRightmostNodeIn: function (parent) {
                    return parent && this.matchUpwards(function (n) {
                        return n === parent || !n.isLastInParent;
                    }) === parent;
                },
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
                safeEnumChildren: function (fn, context) {
                    _.each(this.childNodesArray, fn, context || this);
                    return this;
                },
                childNodesArray: $property(function () {
                    return _.asArray(this.childNodes);
                }),
                add: $alias('appendChildren'),
                append: $alias('appendChildren'),
                appendChildren: function (arg1, arg2) {
                    for (var arr = arg2 === undefined ? _.coerceToArray(arg1) : arguments, i = 0, len = arr.length; i < len; i++) {
                        var n = arr[i];
                        this.appendChild(_.isString(n) ? document.createTextNode(n) : n);
                    }
                    return this;
                },
                removeChildren: function (nodes) {
                    for (var arr = _.coerceToArray(nodes), i = 0, len = arr.length; i < len; i++) {
                        this.removeChild(arr[i]);
                    }
                    return this;
                },
                removeAllChildren: function () {
                    return this.removeChildren(this.childNodesArray);
                },
                walkTree: function (cfg, accept) {
                    accept = arguments.length === 1 ? cfg : accept;
                    var walker = document.createTreeWalker(this, cfg && cfg.what || NodeFilter.SHOW_ALL, cfg && cfg.filter || null, cfg && cfg.entityReferenceExpansion || null);
                    while (node = walker.nextNode()) {
                        accept(node);
                    }
                },
                firstInnermostChild: $callableAsMethod($property(function (n) {
                    while (n && n.firstChild) {
                        n = n.firstChild;
                    }
                    return n;
                })),
                unwrapChildren: $callableAsFreeFunction(function () {
                    this.insertAfterMe(this.childNodesArray);
                    var parent = this.parentNode;
                    parent.removeChild(this);
                    return parent;
                }),
                prevSiblings: $property(function () {
                    var r = [], n = this.previousSibling;
                    while (n) {
                        r.push(n);
                        n = n.previousSibling;
                    }
                    return r.reversed;
                }),
                nextNextSibling: $property(function () {
                    return this.nextSibling && this.nextSibling.nextSibling;
                }),
                nextOutermostSibling: $callableAsMethod($property(function (n) {
                    while (n && !n.nextSibling) {
                        n = n.parentNode;
                    }
                    if (n) {
                        n = n.nextSibling;
                    }
                    return n;
                })),
                nextInnermostSibling: $callableAsMethod($property(function (n) {
                    return Node.firstInnermostChild(Node.nextOutermostSibling(this));
                })),
                appendTo: function (ref) {
                    ref.appendChild(this);
                    return this;
                },
                prependTo: function (ref) {
                    ref.insertBefore(this, ref.firstChild);
                    return this;
                },
                replaceWith: function (what) {
                    this.insertBeforeMe(what).removeFromParent();
                },
                insertMeBefore: function (ref) {
                    ref.parentNode.insertBefore(this, ref);
                    return this;
                },
                insertMeAfter: function (ref) {
                    ref.parentNode.insertBefore(this, ref.nextSibling);
                    return this;
                },
                insertBeforeMe: function (nodes) {
                    var parent = this.parentNode;
                    var me = this;
                    _.each(_.coerceToArray(nodes).reversed, function (n) {
                        parent.insertBefore(n, me);
                    });
                    return this;
                },
                insertAfterMe: function (nodes) {
                    var parent = this.parentNode;
                    var next = this.nextSibling;
                    _.each(_.coerceToArray(nodes).reversed, function (n) {
                        parent.insertBefore(n, next);
                    });
                    return this;
                },
                on: function (e, fn) {
                    this.addEventListener(e, fn);
                    return this;
                },
                once: function (e) {
                    var node = this, finalize, finalized = false;
                    var p = new Promise(function (resolve) {
                        node.addEventListener(e, finalize = function (e) {
                            if (!finalized) {
                                finalized = true;
                                node.removeEventListener(e, finalize);
                                resolve(e);
                            }
                        });
                    });
                    p.finalize = finalize;
                    return p;
                },
                touched: function (fn) {
                    return this.on($platform.touch ? 'touchstart' : 'click', fn);
                },
                extend: function (props) {
                    return _.extend(this, props);
                },
                cls: function (x) {
                    this.className = x;
                    return this;
                },
                css: function (x) {
                    _.extend(this.style, x);
                    return this;
                },
                hasClass: function (x) {
                    return (this.className || '').split(' ').contains(x);
                },
                toggleAttribute: function (name, value) {
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
                toggleAttributes: function (cfg) {
                    _.map(cfg, _.flip2(this.toggleAttribute), this);
                    return this;
                },
                setAttributes: function (cfg) {
                    _.map(cfg, _.flip2(this.setAttribute), this);
                    return this;
                },
                intAttribute: function (name) {
                    return (this.getAttribute(name) || '').parsedInt;
                },
                attr: $alias('setAttributes'),
                removeAttr: function (name) {
                    this.removeAttribute(name);
                    return this;
                },
                splitSubtreeBefore: function (node) {
                    if (!node || node.parentNode === this) {
                        return node;
                    } else {
                        return this.splitSubtreeBefore(!node.previousSibling ? node.parentNode : document.createElement(node.parentNode.tagName).insertMeBefore(node.parentNode).appendChildren(node.prevSiblings).nextSibling);
                    }
                },
                splitSubtreeAt: function (location) {
                    var n = location.node, i = location.offset;
                    return i > 0 ? location.node.isText ? this.splitSubtreeBefore(N.text(n.nodeValue.substr(i)).insertMeAfter(_.extend(n, { nodeValue: n.nodeValue.substr(0, i) }))) : this.splitSubtreeBefore(n.childNodes[i]) : this.splitSubtreeBefore(n);
                },
                html: function (x) {
                    this.innerHTML = x;
                    return this;
                },
                text: function (x) {
                    this.innerText = x;
                    return this;
                },
                attributeUntil: function (attr, promise) {
                    this.setAttribute(attr, true);
                    return promise.done(this.$(function (e, x) {
                        this.removeAttribute(attr);
                    }));
                },
                busyUntil: function (promise) {
                    return this.attributeUntil('busy', promise);
                },
                onceAnimationEnd: $property(function () {
                    return this.once($platform.WebKit ? 'webkitAnimationEnd' : 'animationend');
                }),
                onceTransitionEnd: $property(function () {
                    return this.once($platform.WebKit ? 'webkitTransitionEnd' : 'transitionend');
                }),
                animateWithAttribute: function (attr) {
                    if (this.hasAttribute(attr) && this._onceAnimationEnd) {
                        return this._onceAnimationEnd;
                    }
                    if (this._onceAnimationEnd) {
                        this._onceAnimationEnd.finalize();
                    }
                    this.setAttribute(attr, true);
                    this._onceAnimationEnd = this.onceAnimationEnd;
                    return this._onceAnimationEnd.then(this.$(function () {
                        this.removeAttribute(attr);
                        this.getBoundingClientRect();
                        this._onceAnimationEnd = undefined;
                    }));
                },
                animatedWithAttribute: function (attr) {
                    this.animateWithAttribute(attr);
                    return this;
                }
            });
            $mixin(Element, {
                all: Element.prototype.querySelectorAll,
                one: Element.prototype.querySelector,
                append: Node.prototype.append,
                clientBBox: $property(function () {
                    return BBox.fromLTWH(this.getBoundingClientRect());
                }),
                bbox: $property(function () {
                    return this.clientBBox.offset(document.bbox.leftTop);
                }),
                setWidthHeight: function (v) {
                    this.style.width = v.x + 'px';
                    this.style.height = v.y + 'px';
                    return this;
                },
                setTransform: function (x) {
                    this.transform = x;
                    return this;
                },
                transform: $property({
                    get: function () {
                        var components = (this.css('transform') || '').match(/^matrix\((.+\))$/);
                        if (components) {
                            var m = components[1].split(',').map(parseFloat);
                            return new Transform({
                                a: m[0],
                                b: m[1],
                                c: m[2],
                                d: m[3],
                                e: m[4],
                                f: m[5]
                            });
                        } else {
                            return Transform.identity;
                        }
                    },
                    set: function (cfg) {
                        this.style.transform = _.isStrictlyObject(cfg) && (cfg.translate ? 'translate(' + cfg.translate.x + 'px,' + cfg.translate.y + 'px) ' : '') + (cfg.rotate ? 'rotate(' + cfg.rotate + 'rad) ' : '') + (cfg.scale ? 'scale(' + new Vec2(cfg.scale).separatedWith(',') + ')' : '') || '';
                    }
                }),
                reads: function (stream, fn) {
                    stream(this.$(function (x) {
                        x = (fn || _.identity).call(this, x);
                        this.removeAllChildren();
                        this.add(x instanceof Node ? x : x + '');
                    }));
                    return this;
                },
                $toggleAttribute: function (name, value) {
                    value(this.$(function (value) {
                        this.toggleAttribute(name, value);
                    }));
                    return this;
                },
                $add: function (nodes) {
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
                }
            });
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
            $mixin(Image, {
                fetch: $static(function (url) {
                    return new Promise(function (resolve, reject) {
                        _.extend(new Image(), {
                            src: url,
                            onload: function () {
                                resolve(this);
                            },
                            onerror: function (e) {
                                reject(e);
                            }
                        });
                    });
                })
            });
            _.defineProperties(document, {
                bbox: function () {
                    return this.clientBBox.offset(Vec2.y(document.body.scrollTop));
                },
                clientBBox: function () {
                    return BBox.fromLTWH(0, 0, window.innerWidth || document.documentElement.clientWidth, window.innerHeight || document.documentElement.clientHeight);
                }
            });
            document.on('DOMContentLoaded', document.ready = _.barrier());
            _.tests.NodePlus = {
                'tree splitting': function () {
                    Testosterone.defineAssertions({
                        assertSplitAtBr: function (html, desiredResult) {
                            var node = N.div.html(html);
                            node.splitSubtreeBefore(node.one('br'));
                            return _.assert(node.innerHTML, desiredResult);
                        }
                    });
                    $assertSplitAtBr('<b><br>foo</b>', '<b><br>foo</b>');
                    $assertSplitAtBr('<b>foo<br></b>', '<b>foo</b><b><br></b>');
                    $assertSplitAtBr('<b>foo<i>bar<br>baz</i>qux</b>', '<b>foo<i>bar</i></b>' + '<b><i><br>baz</i>qux</b>');
                }
            };
        }());
    },
    function (module, exports) {
        ;
        DOMReference = $trait({
            domReady: $barrier(function (dom) {
                this.dom = dom;
                this.el = jQuery(this.dom);
            }),
            afterDestroy: function () {
                if (this.dom) {
                    this.dom.removeFromParent();
                    this.dom = undefined;
                    this.el = undefined;
                }
                this.domReady.reset();
            }
        });
        DOMReferenceWeak = $trait({
            domReady: $barrier(function (dom) {
                this.dom = dom;
            }),
            afterDestroy: function () {
                this.dom = undefined;
            }
        });
        DOMEvents = $trait({
            dispatchEvent: function (type) {
                this.domReady(function (dom) {
                    var e = document.createEvent('Event');
                    e.initEvent(type, true, true);
                    dom.dispatchEvent(e);
                });
            },
            $macroTags: {
                on: function (def, method, methodName) {
                    var DOMEventListeners = def.constructor.DOMEventListeners || (def.constructor.DOMEventListeners = []);
                    var on_def = method.$on;
                    on_def = _.isString(on_def) ? {
                        fn: methodName,
                        e: on_def
                    } : _.isObject(on_def) ? {
                        fn: methodName,
                        e: on_def.what,
                        target: on_def.target
                    } : {
                        fn: methodName,
                        e: methodName
                    };
                    _.each(on_def.e.split(' '), function (e) {
                        DOMEventListeners.push(_.defaults({ e: e }, on_def));
                    });
                }
            },
            domReady: function (dom) {
                _.each(this.constructor.DOMEventListeners, __supressErrorReporting = function (on_def) {
                    (on_def.target || dom).addEventListener(on_def.e, this[on_def.fn]);
                }, this);
            },
            beforeDestroy: function () {
                this.domReady(function (dom) {
                    _.each(this.constructor.DOMEventListeners, __supressErrorReporting = function (on_def) {
                        (on_def.target || dom).removeEventListener(on_def.e, this[on_def.fn]);
                    }, this);
                });
            }
        });
        HideOnEscape = $trait({
            hideOnEscape: $on({
                what: 'keydown',
                target: document
            }, function (e) {
                if (e.keyCode === 27) {
                    this.destroy();
                    e.preventDefault();
                }
            })
        });
    },
    function (module, exports) {
        InertialValue = $component({
            $defaults: {
                duration: 0.2,
                easing: 'linear'
            },
            animating: $observableProperty(false),
            target: $observableProperty(),
            current: $observableProperty(),
            init: function (cfg) {
                this.easing = (_.isNumber(this.target) ? Easing.scalar : Easing.vector)[this.easing];
                this.targetChange(function (value) {
                    if (this.animating === false) {
                        this.start = this.value;
                        this.current = this.target = value;
                        this.startTime = Date.now();
                        this.step();
                    } else {
                        this.start = this.current;
                        this.startTime = this.lastTime;
                    }
                });
            },
            step: function () {
                var now = Date.now();
                var travel = Math.min(1, ((this.lastTime = now) - this.startTime) / (this.duration * 1000));
                if (travel < 1) {
                    var animated = this.easing(this.start, this.target, travel);
                    this.animating = true;
                    this.current = animated;
                    window.requestAnimationFrame(this.step);
                } else {
                    this.current = this.target;
                    this.animating = false;
                }
            }
        });
        Easing = {
            scalar: {
                linear: function (a, b, t) {
                    return a + (b - a) * t;
                },
                in: function (a, b, t) {
                    return a + (b - a) * Math.pow(t, 2);
                },
                out: function (a, b, t) {
                    return b - (b - a) * Math.pow(1 - t, 2);
                },
                inOut: function (a, b, t) {
                    var c = b - a;
                    if (t < 0.5) {
                        return a + c * (Math.pow(t * 2, 2) * 0.5);
                    } else {
                        return b - c * (Math.pow(2 - t * 2, 2) * 0.5);
                    }
                }
            },
            vector: {
                linear: function (a, b, t) {
                    console.log(t);
                    return a.add(b.sub(a).scale(t));
                },
                inOut: function (a, b, t) {
                    var c = b.sub(a);
                    if (t < 0.5) {
                        return a.add(c.scale(Math.pow(t * 2, 2) * 0.5));
                    } else {
                        return b.sub(c.scale(Math.pow(2 - t * 2, 2) * 0.5));
                    }
                },
                in: function (a, b, t) {
                    return a.add(b.sub(a).scale(Math.pow(t, 2)));
                },
                out: function (a, b, t) {
                    return b.sub(b.sub(a).scale(Math.pow(1 - t, 2)));
                }
            }
        };
    },
    function (module, exports, __webpack_require__) {
        __webpack_require__(38);
        __webpack_require__(39);
        __webpack_require__(41);
        __webpack_require__(42);
        __webpack_require__(43);
        __webpack_require__(44);
        __webpack_require__(45);
        jQuery = __webpack_require__(46);
        __webpack_require__(47);
        __webpack_require__(48);
        __webpack_require__(49);
        __webpack_require__(50);
        __webpack_require__(54);
        document.ready(function () {
            Panic.init();
            CallStack.isThirdParty.intercept(function (file, originalImpl) {
                return file.indexOf('underscore') >= 0 || file.indexOf('jquery') >= 0 || file.indexOf('useless') >= 0 || file.indexOf('mootools') >= 0;
            });
        });
    },
    function (module, exports) {
        _.hasAsserts = true;
        _.extend(_, {
            tests: {},
            withTest: function (name, test, defineSubject) {
                defineSubject();
                _.runTest(name, test);
                _.publishToTestsNamespace(name, test);
            },
            deferTest: function (name, test, defineSubject) {
                defineSubject();
                _.publishToTestsNamespace(name, test);
            },
            runTest: function (name, test) {
                try {
                    if (_.isFunction(test)) {
                        test();
                    } else {
                        _.each(test, function (fn) {
                            fn();
                        });
                    }
                } catch (e) {
                    if (_.isAssertionError(e)) {
                        var printedName = (_.isArray(name) && name || [name]).join('.');
                        console.log(printedName + ':', e.message, '\n' + _.times(printedName.length, _.constant('~')).join('') + '\n');
                        _.each(e.notMatching, function (x) {
                            console.log('  \u2022', x);
                        });
                    }
                    throw e;
                }
            },
            publishToTestsNamespace: function (name, test) {
                if (_.isArray(name)) {
                    (_.tests[name[0]] || (_.tests[name[0]] = {}))[name[1]] = test;
                } else {
                    _.tests[name] = test;
                }
            }
        });
        (function () {
            var assertImpl = function (positive) {
                return function (__) {
                    var args = [].splice.call(arguments, 0);
                    if (args.length === 1) {
                        if (positive && args[0] !== true) {
                            _.assertionFailed({ notMatching: args });
                        }
                    } else if (positive && _.allEqual(args) !== true) {
                        _.assertionFailed({ notMatching: args });
                    }
                    return true;
                };
            };
            (function () {
                var _matches = _.matches;
                _.matches = function (a) {
                    return _.isObject(a) ? _matches(a) : function (b) {
                        return a === b;
                    };
                };
            }());
            _.extend(_, _.assertions = {
                assert: assertImpl(true),
                assertNot: assertImpl(false),
                assertCPS: function (fn, args, then) {
                    var requiredResult = args && (_.isArray(args) ? args : [args]) || [];
                    fn(function () {
                        $assert([].splice.call(arguments, 0), requiredResult);
                        if (then) {
                            then();
                            return true;
                        }
                    });
                },
                assertNotCalled: function (context) {
                    var inContext = true;
                    context(function () {
                        if (inContext) {
                            $fail;
                        }
                    });
                    inContext = false;
                },
                assertEveryCalledOnce: function (fn, then) {
                    return _.assertEveryCalled(_.hasTags ? $once(fn) : (fn.once = true, fn), then);
                },
                assertEveryCalled: function (fn_, then) {
                    var fn = _.hasTags ? $untag(fn_) : fn_, async = _.hasTags ? $async.is(fn_) : fn_.async;
                    once = _.hasTags ? $once.is(fn_) : fn_.once;
                    var match = once ? null : fn.toString().match(/.*function[^\(]\(([^\)]+)\)/);
                    var contracts = once ? _.times(fn.length, _.constant(1)) : _.map(match[1].split(','), function (arg) {
                        var parts = arg.trim().match(/^(.+)__(\d+)$/);
                        var num = parts && parseInt(parts[2], 10);
                        return _.isFinite(num) ? num || false : true;
                    });
                    var status = _.times(fn.length, _.constant(false));
                    var callbacks = _.times(fn.length, function (i) {
                        return function () {
                            status[i] = _.isNumber(contracts[i]) ? (status[i] || 0) + 1 : true;
                            if (async && _.isEqual(status, contracts))
                                then();
                        };
                    });
                    fn.apply(null, callbacks);
                    if (!async) {
                        _.assert(status, contracts);
                        if (then) {
                            then();
                        }
                    }
                },
                assertCalledWithArguments: function (argsPattern, generateCalls) {
                    return _.assert(_.arr(generateCalls), argsPattern);
                },
                assertCallOrder: function (fn) {
                    var callIndex = 0;
                    var callbacks = _.times(fn.length, function (i) {
                        return function () {
                            arguments.callee.callIndex = callIndex++;
                        };
                    });
                    fn.apply(null, callbacks);
                    return _.assert(_.pluck(callbacks, 'callIndex'), _.times(callbacks.length, _.identity.arity1));
                },
                assertMatches: function (value, pattern) {
                    try {
                        return _.assert(_.matches.apply(null, _.rest(arguments))(value));
                    } catch (e) {
                        throw _.isAssertionError(e) ? _.extend(e, {
                            notMatching: [
                                value,
                                pattern
                            ]
                        }) : e;
                    }
                },
                assertNotMatches: function (value, pattern) {
                    try {
                        return _.assert(!_.matches.apply(null, _.rest(arguments))(value));
                    } catch (e) {
                        throw _.isAssertionError(e) ? _.extend(e, {
                            notMatching: [
                                value,
                                pattern
                            ]
                        }) : e;
                    }
                },
                assertType: function (value, contract) {
                    return _.assert(_.decideType(value), contract);
                },
                assertTypeMatches: function (value, contract) {
                    return _.isEmpty(mismatches = _.typeMismatches(contract, value)) ? true : _.assertionFailed({
                        message: 'provided value type not matches required contract',
                        asColumns: true,
                        notMatching: [
                            { provided: value },
                            { required: contract },
                            { mismatches: mismatches }
                        ]
                    });
                },
                assertFails: function (what) {
                    return _.assertThrows.call(this, what, _.isAssertionError);
                },
                assertThrows: function (what, errorPattern) {
                    var e = undefined, thrown = false;
                    try {
                        what.call(this);
                    } catch (__) {
                        e = __;
                        thrown = true;
                    }
                    _.assert.call(this, thrown);
                    if (arguments.length > 1) {
                        _.assertMatches.call(this, e, errorPattern);
                    }
                },
                assertNotThrows: function (what) {
                    return _.assertEveryCalled(function (ok) {
                        what();
                        ok();
                    });
                },
                assertArguments: function (args, callee, name) {
                    var fn = (callee || args.callee).toString();
                    var match = fn.match(/.*function[^\(]\(([^\)]+)\)/);
                    if (match) {
                        var valuesPassed = _.asArray(args);
                        var valuesNeeded = _.map(match[1].split(','), function (_s) {
                            var s = _s.trim()[0] === '_' ? _s.replace(/_/g, ' ').trim() : undefined;
                            var n = parseInt(s, 10);
                            return _.isFinite(n) ? n : s;
                        });
                        var zap = _.zipWith([
                            valuesNeeded,
                            valuesPassed
                        ], function (a, b) {
                            return a === undefined ? true : a === b;
                        });
                        if (!_.every(zap)) {
                            _.assertionFailed({
                                notMatching: _.nonempty([
                                    [
                                        name,
                                        fn
                                    ].join(': '),
                                    valuesNeeded,
                                    valuesPassed
                                ])
                            });
                        }
                    }
                },
                fail: function () {
                    _.assertionFailed();
                },
                fails: _.constant(function () {
                    _.assertionFailed();
                }),
                stub: function () {
                    _.assertionFailed();
                }
            });
            _.extend(_, {
                assertionError: function (additionalInfo) {
                    return _.extend(new Error(additionalInfo && additionalInfo.message || 'assertion failed'), additionalInfo, { assertion: true });
                },
                assertionFailed: function (additionalInfo) {
                    throw _.extend(_.assertionError(additionalInfo), { stack: _.rest(new Error().stack.split('\n'), 3).join('\n') });
                },
                isAssertionError: function (e) {
                    return e && e.assertion === true;
                }
            });
            _.allEqual = function (values) {
                return _.reduce(values, function (prevEqual, x) {
                    return prevEqual && _.isEqual(values[0], x);
                }, true);
            };
            _.each(_.keys(_.assertions), function (name) {
                $global.define('$' + name, _[name], { configurable: true });
            });
            for (var k in _.assertions) {
                $global['$' + k] = 1;
            }
        }());
    },
    function (module, exports, __webpack_require__) {
        (function () {
            _.hasUncaught = true;
            var reThrownTag = ' [re-thrown by a hook]';
            var globalUncaughtExceptionHandler = _.globalUncaughtExceptionHandler = function (e) {
                var chain = arguments.callee.chain;
                arguments.callee.chain = _.reject(chain, _.property('catchesOnce'));
                if (chain.length) {
                    for (var i = 0, n = chain.length; i < n; i++) {
                        try {
                            chain[i](e);
                            break;
                        } catch (newE) {
                            console.log(newE);
                            if (i === n - 1) {
                                newE.message += reThrownTag;
                                throw newE;
                            } else {
                                if (newE && typeof newE === 'object') {
                                    newE.originalError = e;
                                }
                                e = newE;
                            }
                        }
                    }
                } else {
                    e.message += reThrownTag;
                    throw e;
                }
            };
            _.withUncaughtExceptionHandler = function (handler, context_) {
                var context = context_ || _.identity;
                if (context_) {
                    handler.catchesOnce = true;
                }
                globalUncaughtExceptionHandler.chain.unshift(handler);
                context(function () {
                    globalUncaughtExceptionHandler.chain.remove(handler);
                });
            };
            globalUncaughtExceptionHandler.chain = [];
            switch ($platform.engine) {
            case 'node':
                __webpack_require__(40).on('uncaughtException', globalUncaughtExceptionHandler);
                break;
            case 'browser':
                window.addEventListener('error', function (e) {
                    if (e.message.indexOf(reThrownTag) < 0) {
                        if (e.error) {
                            globalUncaughtExceptionHandler(e.error);
                        } else {
                            globalUncaughtExceptionHandler(_.extend(new Error(e.message), {
                                stub: true,
                                stack: 'at ' + e.filename + ':' + e.lineno + ':' + e.colno
                            }));
                        }
                    }
                });
            }
        }());
    },
    function (module, exports) {
        var process = module.exports = {};
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
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
            var timeout = setTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
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
            clearTimeout(timeout);
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
                setTimeout(drainQueue, 0);
            }
        };
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
        process.version = '';
        process.versions = {};
        function noop() {
        }
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
        process.cwd = function () {
            return '/';
        };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function () {
            return 0;
        };
    },
    function (module, exports) {
        (function () {
            if ($platform.Browser) {
                _.hasUncaughtAsync = true;
                var globalAsyncContext = undefined;
                var listenEventListeners = function (genAddEventListener, genRemoveEventListener) {
                    var override = function (obj) {
                        obj.addEventListener = genAddEventListener(obj.addEventListener);
                        obj.removeEventListener = genRemoveEventListener(obj.removeEventListener);
                    };
                    if (window.EventTarget) {
                        override(window.EventTarget.prototype);
                    } else {
                        override(Node.prototype);
                        override(XMLHttpRequest.prototype);
                    }
                };
                var asyncHook = function (originalImpl, callbackArgumentIndex) {
                    return __supressErrorReporting = function () {
                        var asyncContext = {
                            name: name,
                            stack: new Error().stack,
                            asyncContext: globalAsyncContext
                        };
                        var args = _.asArray(arguments);
                        var fn = args[callbackArgumentIndex];
                        if (!_.isFunction(fn)) {
                            throw new Error('[uncaughtAsync.js] callback should be a function');
                        }
                        fn.__uncaughtJS_wrapper = args[callbackArgumentIndex] = __supressErrorReporting = function () {
                            globalAsyncContext = asyncContext;
                            try {
                                return fn.apply(this, arguments);
                            } catch (e) {
                                _.globalUncaughtExceptionHandler(_.extend(e, { asyncContext: asyncContext }));
                            }
                        };
                        return originalImpl.apply(this, args);
                    };
                };
                window.setTimeout = asyncHook(window.setTimeout, 0);
                listenEventListeners(function (addEventListener) {
                    return asyncHook(addEventListener, 1);
                }, function (removeEventListener) {
                    return function (name, fn, bubble, untrusted) {
                        return removeEventListener.call(this, name, fn.__uncaughtJS_wrapper || fn, bubble);
                    };
                });
            }
        }());
    },
    function (module, exports, __webpack_require__) {
        (function (__filename) {
            _.hasReflection = true;
            _.tests.reflection = {
                'file paths': function () {
                    $assert($sourcePath.length > 0);
                    $assert($uselessPath.length > 0);
                },
                'readSource': function () {
                    var uselessJS = $uselessPath + $uselessFile;
                    SourceFiles.read(uselessJS, function (text) {
                        $assert(text.length > 0);
                    });
                    SourceFiles.line(uselessJS, 0, function (line) {
                        $assert(line.length > 0);
                    });
                },
                'CallStack from error': function () {
                    try {
                        throw new Error('oh fock');
                    } catch (e) {
                        $assertTypeMatches(CallStack.fromError(e), CallStack);
                    }
                },
                '$callStack': function (testDone) {
                    var stack = $callStack;
                    $assert(_.isArray(stack));
                    $assertTypeMatches(stack[0], {
                        callee: 'string',
                        calleeShort: 'string',
                        file: 'string',
                        fileName: 'string',
                        fileShort: 'string',
                        thirdParty: 'boolean',
                        index: 'boolean',
                        'native': 'boolean',
                        line: 'number',
                        column: 'number',
                        source: 'string',
                        sourceReady: 'function'
                    });
                    $assert(_.isTypeOf(CallStack, stack));
                    $assert(_.isTypeOf(CallStack, stack.clean));
                    $assert(_.isTypeOf(CallStack, stack.offset(2)));
                    $assert(_.isTypeOf(CallStack, stack.filter(_.identity)));
                    $assert(_.isTypeOf(CallStack, stack.reject(_.identity)));
                    $assertEveryCalled($async(function (sourceReady, sourcesReady, safeLocationReady) {
                        stack[0].sourceReady(function (src) {
                            $assert(typeof src, 'string');
                            sourceReady();
                        });
                        stack.sourcesReady(function () {
                            _.each(stack, function (entry) {
                                $assert(typeof entry.source, 'string');
                            });
                            sourcesReady();
                        });
                        stack.safeLocation(7777).sourceReady(function (line) {
                            $assert('??? WRONG LOCATION ???', line);
                            safeLocationReady();
                        });
                    }), testDone);
                },
                'Prototype.$meta': function (done) {
                    var Dummy = $prototype();
                    Dummy.$meta(function (meta) {
                        $assertMatches(meta, {
                            name: 'Dummy',
                            type: 'prototype'
                        });
                        done();
                    });
                },
                'Trait.$meta': function (done) {
                    var Dummy = $trait();
                    Dummy.$meta(function (meta) {
                        $assertMatches(meta, {
                            name: 'Dummy',
                            type: 'trait'
                        });
                        done();
                    });
                }
            };
            _.defineKeyword('callStack', function () {
                return CallStack.fromRawString(CallStack.currentAsRawString).offset($platform.NodeJS ? 1 : 0);
            });
            _.defineKeyword('currentFile', function () {
                return (CallStack.rawStringToArray(CallStack.currentAsRawString)[$platform.NodeJS ? 3 : 1] || { file: '' }).file;
            });
            _.defineKeyword('uselessPath', _.memoize(function () {
                return _.initial(__filename.split('/'), $platform.NodeJS ? 2 : 1).join('/') + '/';
            }));
            _.defineKeyword('sourcePath', _.memoize(function () {
                var local = ($uselessPath.match(/(.+)\/node_modules\/(.+)/) || [])[1];
                return local ? local + '/' : $uselessPath;
            }));
            if ($platform.Browser) {
                _.defineProperty(window, '__filename', function () {
                    return $currentFile;
                });
            }
            SourceFiles = $singleton(Component, {
                line: function (file, line, then) {
                    SourceFiles.read(file, function (data) {
                        then((data.split('\n')[line] || '').trimmed);
                    });
                },
                read: $memoizeCPS(function (file, then) {
                    if (file.indexOf('<') < 0) {
                        try {
                            if ($platform.NodeJS) {
                                then(__webpack_require__(!function webpackMissingModule() {
                                    var e = new Error('Cannot find module "fs"');
                                    e.code = 'MODULE_NOT_FOUND';
                                    throw e;
                                }()).readFileSync(file, { encoding: 'utf8' }) || '');
                            } else {
                                var xhr = new XMLHttpRequest();
                                xhr.open('GET', file, true);
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState == 4) {
                                        then(xhr.responseText);
                                    }
                                };
                                xhr.send(null);
                            }
                        } catch (e) {
                            then('');
                        }
                    } else {
                        then('');
                    }
                }),
                write: function (file, text, then) {
                    if ($platform.NodeJS) {
                        this.read(file, function (prevText) {
                            var fs = __webpack_require__(!function webpackMissingModule() {
                                    var e = new Error('Cannot find module "fs"');
                                    e.code = 'MODULE_NOT_FOUND';
                                    throw e;
                                }()), opts = { encoding: 'utf8' };
                            try {
                                fs.mkdirSync(file + '.backups');
                            } catch (e) {
                            }
                            fs.writeFileSync(file + '.backups/' + Date.now(), prevText, opts);
                            fs.writeFileSync(file, text, opts);
                            then();
                        });
                    } else {
                        JSONAPI.post('source/' + file, _.extend2({}, this.apiConfig, { what: { text: text } })).then(function () {
                            log.ok(file, '\u2014 successfully saved');
                            if (then) {
                                then();
                            }
                        });
                    }
                }
            });
            CallStack = $extends(Array, {
                current: $static($property(function () {
                    return CallStack.fromRawString(CallStack.currentAsRawString).offset(1);
                })),
                fromError: $static(function (e) {
                    if (e && e.parsedStack) {
                        return CallStack.fromParsedArray(e.parsedStack).offset(e.stackOffset || 0);
                    } else if (e && e.stack) {
                        return CallStack.fromRawString(e.stack).offset(e.stackOffset || 0);
                    } else {
                        return CallStack.fromParsedArray([]);
                    }
                }),
                fromErrorWithAsync: $static(function (e) {
                    var stackEntries = CallStack.fromError(e), asyncContext = e.asyncContext;
                    while (asyncContext) {
                        stackEntries = stackEntries.concat(CallStack.fromRawString(asyncContext.stack));
                        asyncContext = asyncContext.asyncContext;
                    }
                    return stackEntries.mergeDuplicateLines;
                }),
                locationEquals: $static(function (a, b) {
                    return a.file === b.file && a.line === b.line && a.column === b.column;
                }),
                safeLocation: function (n) {
                    return this[n] || {
                        callee: '',
                        calleeShort: '',
                        file: '',
                        fileName: '',
                        fileShort: '',
                        thirdParty: false,
                        source: '??? WRONG LOCATION ???',
                        sourceReady: _.barrier('??? WRONG LOCATION ???')
                    };
                },
                mergeDuplicateLines: $property(function () {
                    return CallStack.fromParsedArray(_.map(_.partition2(this, function (e) {
                        return e.file + e.line;
                    }), function (group) {
                        return _.reduce(_.rest(group), function (memo, entry) {
                            memo.callee = (memo.callee || '<anonymous>') + ' \u2192 ' + (entry.callee || '<anonymous>');
                            memo.calleeShort = (memo.calleeShort || '<anonymous>') + ' \u2192 ' + (entry.calleeShort || '<anonymous>');
                            return memo;
                        }, _.clone(group[0]));
                    }));
                }),
                clean: $property(function () {
                    var clean = this.mergeDuplicateLines.reject(function (e, i) {
                        return (e.thirdParty || e.hide) && i !== 0;
                    });
                    return clean.length === 0 ? this : clean;
                }),
                asArray: $property(function () {
                    return _.asArray(this);
                }),
                offset: function (N) {
                    return N && CallStack.fromParsedArray(_.rest(this, N)) || this;
                },
                initial: function (N) {
                    return N && CallStack.fromParsedArray(_.initial(this, N)) || this;
                },
                concat: function (stack) {
                    return CallStack.fromParsedArray(this.asArray.concat(stack.asArray));
                },
                filter: function (fn) {
                    return CallStack.fromParsedArray(_.filter(this, fn));
                },
                reject: function (fn) {
                    return CallStack.fromParsedArray(_.reject(this, fn));
                },
                reversed: $property(function () {
                    return CallStack.fromParsedArray(_.reversed(this));
                }),
                sourcesReady: function (then) {
                    return _.allTriggered(_.pluck(this, 'sourceReady'), then);
                },
                constructor: function (arr) {
                    Array.prototype.constructor.call(this);
                    _.each(arr, function (entry) {
                        if (!entry.sourceReady) {
                            entry.sourceReady = _.barrier();
                            SourceFiles.line((entry.remote ? 'api/source/' : '') + entry.file, entry.line - 1, function (src) {
                                entry.hide = src.contains('// @hide');
                                entry.sourceReady(entry.source = src.replace('// @hide', ''));
                            });
                        }
                        this.push(entry);
                    }, this);
                },
                fromParsedArray: $static(function (arr) {
                    return new CallStack(arr);
                }),
                currentAsRawString: $static($property(function () {
                    var cut = $platform.Browser ? 3 : 2;
                    return _.rest((new Error().stack || '').split('\n'), cut).join('\n');
                })),
                shortenPath: $static(function (path) {
                    var relative = path.replace($uselessPath, '').replace($sourcePath, '');
                    return relative !== path ? relative.replace(/^node_modules\//, '') : path.split('/').last;
                }),
                isThirdParty: $static(_.bindable(function (file) {
                    var local = file.replace($sourcePath, '');
                    return $platform.NodeJS && file[0] !== '/' || local.indexOf('/node_modules/') >= 0 || file.indexOf('/node_modules/') >= 0 && !local || local.indexOf('underscore') >= 0 || local.indexOf('jquery') >= 0;
                })),
                fromRawString: $static(_.sequence(function (rawString) {
                    return CallStack.rawStringToArray(rawString);
                }, function (array) {
                    return _.map(array, function (entry) {
                        return _.extend(entry, {
                            calleeShort: _.last(entry.callee.split('.')),
                            fileName: _.last(entry.file.split('/')),
                            fileShort: CallStack.shortenPath(entry.file),
                            thirdParty: CallStack.isThirdParty(entry.file) && !entry.index
                        });
                    });
                }, function (parsedArrayWithSourceLines) {
                    return CallStack.fromParsedArray(parsedArrayWithSourceLines);
                })),
                rawStringToArray: $static(function (rawString) {
                    var lines = (rawString || '').split('\n');
                    return _.filter2(lines, function (line) {
                        line = line.trimmed;
                        var callee, fileLineColumn = [], native_ = false;
                        var planA = undefined, planB = undefined;
                        if ((planA = line.match(/at (.+) \((.+)\)/)) || (planA = line.match(/(.*)@(.*)/))) {
                            callee = planA[1];
                            native_ = planA[2] === 'native';
                            fileLineColumn = _.rest(planA[2].match(/(.*):(.+):(.+)/) || []);
                        } else if (planB = line.match(/^(at\s+)*(.+):([0-9]+):([0-9]+)/)) {
                            fileLineColumn = _.rest(planB, 2);
                        } else {
                            return false;
                        }
                        if ((callee || '').indexOf('__supressErrorReporting') >= 0) {
                            return false;
                        }
                        return {
                            beforeParse: line,
                            callee: callee || '',
                            index: $platform.Browser && fileLineColumn[0] === window.location.href,
                            'native': native_,
                            file: fileLineColumn[0] || '',
                            line: (fileLineColumn[1] || '').integerValue,
                            column: (fileLineColumn[2] || '').integerValue
                        };
                    });
                })
            });
            $prototype.impl.findMeta = function (stack) {
                return function (then) {
                    _.cps.find(CallStack.fromRawString(stack).reversed, function (entry, found) {
                        entry.sourceReady(function (text) {
                            var match = (text || '').match(/([A-z]+)\s*=\s*\$(prototype|singleton|component|extends|trait|aspect)/);
                            found(match && {
                                name: match[1],
                                type: match[2],
                                file: entry.fileShort
                            } || false);
                        });
                    }, function (found) {
                        then(found || {});
                    });
                };
            };
            $prototype.macro(function (def, base) {
                if (!def.$meta) {
                    var findMeta = _.cps.memoize($prototype.impl.findMeta(CallStack.currentAsRawString));
                    _.defineMemoizedProperty(findMeta, 'promise', function () {
                        return new Promise(findMeta);
                    });
                    def.$meta = $static(findMeta);
                }
                return def;
            });
        }.call(exports, '/index.js'));
    },
    function (module, exports) {
        _.hasLog = true;
        ;
        _.extend(log = function () {
            return log.write.apply(this, [log.config({
                    location: true,
                    stackOffset: 1
                })].concat(_.asArray(arguments)));
        }, {
            Config: $prototype(),
            config: function (cfg) {
                return new log.Config(cfg);
            }
        });
        _.extend(log, {
            indent: function (n) {
                return log.config({ indent: n });
            },
            stackOffset: function (n) {
                return log.config({ stackOffset: n });
            },
            where: function (wat) {
                return log.config({
                    location: true,
                    where: wat || undefined
                });
            },
            color: _.extend(function (x) {
                return (log.color[x] || {}).color;
            }, _.object(_.map([
                [
                    'none',
                    '0m',
                    ''
                ],
                [
                    'red',
                    '31m',
                    'color:crimson'
                ],
                [
                    'boldRed',
                    [
                        '31m',
                        '1m'
                    ],
                    'color:crimson;font-weight:bold'
                ],
                [
                    'darkRed',
                    [
                        '31m',
                        '2m'
                    ],
                    'color:crimson'
                ],
                [
                    'blue',
                    '36m',
                    'color:royalblue'
                ],
                [
                    'boldBlue',
                    [
                        '36m',
                        '1m'
                    ],
                    'color:royalblue;font-weight:bold;'
                ],
                [
                    'darkBlue',
                    [
                        '36m',
                        '2m'
                    ],
                    'color:rgba(65,105,225,0.5)'
                ],
                [
                    'boldOrange',
                    [
                        '33m',
                        '1m'
                    ],
                    'color:saddlebrown;font-weight:bold;'
                ],
                [
                    'darkOrange',
                    [
                        '33m',
                        '2m'
                    ],
                    'color:saddlebrown'
                ],
                [
                    'orange',
                    '33m',
                    'color:saddlebrown'
                ],
                [
                    'brown',
                    [
                        '33m',
                        '2m'
                    ],
                    'color:saddlebrown'
                ],
                [
                    'green',
                    '32m',
                    'color:forestgreen'
                ],
                [
                    'boldGreen',
                    [
                        '32m',
                        '1m'
                    ],
                    'color:forestgreen;font-weight:bold'
                ],
                [
                    'darkGreen',
                    [
                        '32m',
                        '2m'
                    ],
                    'color:forestgreen;opacity:0.5'
                ],
                [
                    'pink',
                    '35m',
                    'color:magenta'
                ],
                [
                    'boldPink',
                    [
                        '35m',
                        '1m'
                    ],
                    'color:magenta;font-weight:bold;'
                ],
                [
                    'darkPink',
                    [
                        '35m',
                        '2m'
                    ],
                    'color:magenta'
                ],
                [
                    'black',
                    '0m',
                    'color:black'
                ],
                [
                    'bright',
                    [
                        '0m',
                        '1m'
                    ],
                    'color:rgba(0,0,0);font-weight:bold'
                ],
                [
                    'dark',
                    [
                        '0m',
                        '2m'
                    ],
                    'color:rgba(0,0,0,0.25)'
                ]
            ], function (def) {
                return [
                    def[0],
                    log.config({
                        color: {
                            shell: _.coerceToArray(_.map2(def[1], _.prepends('\x1B['))).join(),
                            css: def[2]
                        }
                    })
                ];
            }))),
            boldLine: '======================================',
            line: '--------------------------------------',
            thinLine: '......................................',
            timestampEnabled: false,
            withWriteBackend: $scope(function (release, backend, contextFn, done) {
                var prev = log.writeBackend.value;
                log.writeBackend.value = backend;
                contextFn(function (then) {
                    release(function () {
                        log.writeBackend.value = prev;
                        if (then)
                            then();
                        if (done)
                            done();
                    });
                });
            }),
            writeUsingDefaultBackend: function () {
                var args = arguments;
                log.withWriteBackend(log.impl.defaultWriteBackend, function (done) {
                    log.write.apply(null, args);
                    done();
                });
            },
            writeBackend: function () {
                return arguments.callee.value || log.impl.defaultWriteBackend;
            },
            withConfig: function (config, what) {
                log.impl.configStack.push(log.impl.configure([
                    { stackOffset: -1 },
                    config
                ]));
                var result = what();
                log.impl.configStack.pop();
                return result;
            },
            currentConfig: function () {
                return log.impl.configure(log.impl.configStack);
            },
            margin: function () {
                var lastWrite = undefined;
                return function () {
                    if (lastWrite !== log.impl.numWrites)
                        log.newline();
                    lastWrite = log.impl.numWrites;
                };
            }(),
            impl: {
                configStack: [],
                numWrites: 0,
                configure: function (configs) {
                    return _.reduce2({
                        stackOffset: 0,
                        indent: 0
                    }, _.nonempty(configs), function (memo, cfg) {
                        return _.extend(memo, _.nonempty(cfg), {
                            indent: memo.indent + (cfg.indent || 0),
                            stackOffset: memo.stackOffset + (cfg.stackOffset || 0)
                        });
                    });
                },
                write: $restArg(_.bindable(function () {
                    var writeBackend = log.writeBackend();
                    log.impl.numWrites++;
                    var args = _.asArray(arguments);
                    var config = log.impl.configure([{
                            stackOffset: $platform.NodeJS ? 1 : 3,
                            indent: writeBackend.indent || 0
                        }].concat(log.impl.configStack));
                    var runs = _.reduce2([], _.partition3(args, _.isTypeOf.$(log.Config)), function (runs, span) {
                        if (span.label === true) {
                            config = log.impl.configure([config].concat(span.items));
                            return runs;
                        } else {
                            return runs.concat({
                                config: config,
                                text: log.impl.stringifyArguments(span.items, config)
                            });
                        }
                    });
                    var trailNewlinesMatch = runs.last && runs.last.text.reversed.match(/(\n*)([^]*)/);
                    var trailNewlines = trailNewlinesMatch && trailNewlinesMatch[1];
                    if (trailNewlinesMatch) {
                        runs.last.text = trailNewlinesMatch[2].reversed;
                    }
                    var newline = {};
                    var lines = _.pluck.with('items', _.reject.with(_.property('label'), _.partition3.with(_.equals(newline), _.scatter(runs, function (run, i, emit) {
                        _.each(run.text.split('\n'), function (line, i, arr) {
                            emit(_.extended(run, { text: line }));
                            if (i !== arr.lastIndex) {
                                emit(newline);
                            }
                        });
                    }))));
                    var totalText = _.pluck(runs, 'text').join('');
                    var where = config.where || log.impl.walkStack($callStack) || {};
                    var indentation = (config.indentPattern || '\t').repeats(config.indent);
                    writeBackend({
                        lines: lines,
                        config: config,
                        color: config.color,
                        when: new Date().toISOString(),
                        args: _.reject(args, _.isTypeOf.$(log.Config)),
                        indentation: indentation,
                        indentedText: lines.map(_.seq(_.pluck.tails2('text'), _.joinsWith(''), _.prepends(indentation))).join('\n'),
                        text: totalText,
                        codeLocation: config.location && log.impl.location(where) || '',
                        trailNewlines: trailNewlines || '',
                        where: config.location && where || undefined
                    });
                    return _.find(args, _.not(_.isTypeOf.$(log.Config)));
                })),
                walkStack: function (stack) {
                    return _.find(stack.clean.offset($platform.Browser ? 1 : 2), function (entry) {
                        return entry.fileShort.indexOf('base/log.js') < 0;
                    }) || stack[0];
                },
                defaultWriteBackend: function (params) {
                    var codeLocation = params.codeLocation;
                    if ($platform.NodeJS) {
                        var lines = _.map(params.lines, function (line) {
                            return params.indentation + _.map(line, function (run) {
                                return run.config.color ? run.config.color.shell + run.text + '\x1B[0m' : run.text;
                            }).join('');
                        }).join('\n');
                        if (log.timestampEnabled) {
                            lines = log.color('dark').shell + _.bullet(log.impl.timestamp(params.when) + ' ', log.color('none').shell + lines);
                        }
                        console.log(lines, log.color('dark').shell + codeLocation + '\x1B[0m', params.trailNewlines);
                    } else {
                        console.log.apply(console, _.reject.with(_.equals(undefined), [].concat([
                            log.timestampEnabled ? '%c' + log.impl.timestamp(params.when) + '%c' : '',
                            _.map(params.lines, function (line, i) {
                                return params.indentation + _.reduce2('', line, function (s, run) {
                                    return s + (run.text && (run.config.color ? '%c' : '') + run.text || '');
                                });
                            }).join('\n'),
                            codeLocation ? '%c' + codeLocation : ''
                        ].nonempty.join(' '), (log.timestampEnabled ? [
                            'color:rgba(0,0,0,0.4)',
                            'color:black'
                        ] : []).concat(_.scatter(params.lines, function (line, i, emit) {
                            _.each(line, function (run) {
                                if (run.text && run.config.color) {
                                    emit(run.config.color.css);
                                }
                            });
                        }) || []).concat(codeLocation ? 'color:rgba(0,0,0,0.25)' : []), params.trailNewlines)));
                    }
                },
                timestamp: function (x) {
                    return x;
                },
                location: function (where) {
                    return _.quoteWith('()', _.nonempty([
                        where.calleeShort,
                        _.nonempty([
                            where.fileName,
                            where.line
                        ]).join(':')
                    ]).join(' @ '));
                },
                stringifyArguments: function (args, cfg) {
                    return _.map(args, function (arg) {
                        var x = log.impl.stringify(arg, cfg);
                        return cfg.maxArgLength ? x.limitedTo(cfg.maxArgLength) : x;
                    }).join(' ');
                },
                stringify: function (what, cfg) {
                    cfg = cfg || {};
                    if (_.isTypeOf(Error, what)) {
                        var str = log.impl.stringifyError(what);
                        if (what.originalError) {
                            return str + '\n\n' + log.impl.stringify(what.originalError);
                        } else {
                            return str;
                        }
                    } else if (_.isTypeOf(CallStack, what)) {
                        return log.impl.stringifyCallStack(what);
                    } else if (typeof what === 'object') {
                        if (_.isArray(what) && what.length > 1 && _.isObject(what[0]) && cfg.table) {
                            return log.asTable(what);
                        } else {
                            return _.stringify(what, cfg);
                        }
                    } else if (typeof what === 'string') {
                        return what;
                    } else {
                        return _.stringify(what);
                    }
                },
                stringifyError: function (e) {
                    try {
                        var stack = CallStack.fromErrorWithAsync(e).offset(e.stackOffset || 0).clean;
                        var why = (e.message || '').replace(/\r|\n/g, '').trimmed.limitedTo(120);
                        return '[EXCEPTION] ' + why + '\n\n' + (e.notMatching && _.map(_.coerceToArray(e.notMatching || []), log.impl.stringify.then(_.prepends('\t'))).join('\n') + '\n\n' || '') + log.impl.stringifyCallStack(stack) + '\n';
                    } catch (sub) {
                        return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack + '\n\nORIGINAL EXCEPTION:\n\n' + e.stack + '\n\n';
                    }
                },
                stringifyCallStack: function (stack) {
                    return log.columns(stack.map(function (entry) {
                        return [
                            '\t' + 'at ' + entry.calleeShort.first(30),
                            _.nonempty([
                                entry.fileShort,
                                ':',
                                entry.line
                            ]).join(''),
                            (entry.source || '').first(80)
                        ];
                    })).join('\n');
                }
            }
        });
        (function () {
            var write = log.impl.write;
            _.extend(log, log.printAPI = _.object(_.concat([
                [
                    'newline',
                    write.$(log.config({ location: false }), '')
                ],
                [
                    'write',
                    write
                ]
            ], _.flat(_.map([
                'red failure error e',
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
                'boldBlue ii'
            ], _.splitsWith(' ').then(_.mapsWith(function (name, i, names) {
                return [
                    name,
                    write.$(log.config({
                        location: i !== 0,
                        color: log.color(names.first),
                        stackOffset: 2
                    }))
                ];
            })))))));
        }());
        logs = _.mapWith(_.callsTo.compose(_.callsWith(log.stackOffset(1))), log.printAPI);
        _.extend(log, {
            asTable: function (arrayOfObjects) {
                var columnsDef = arrayOfObjects.map(_.keys.arity1).reduce(_.union.arity2, []);
                var lines = log.columns([columnsDef].concat(_.map(arrayOfObjects, function (object) {
                    return columnsDef.map(_.propertyOf(object));
                })), {
                    maxTotalWidth: 120,
                    minColumnWidths: columnsDef.map(_.property('length'))
                });
                return [
                    lines[0],
                    log.thinLine[0].repeats(lines[0].length),
                    _.rest(lines)
                ].flat.join('\n');
            },
            columns: function (rows, cfg_) {
                if (rows.length === 0) {
                    return [];
                } else {
                    var rowsToStr = rows.map(_.map.tails2(function (col) {
                        return _.asString(col).split('\n')[0];
                    }));
                    var columnWidths = rowsToStr.map(_.map.tails2(_.property('length')));
                    var maxWidths = columnWidths.zip(_.largest);
                    var cfg = cfg_ || {
                        minColumnWidths: maxWidths,
                        maxTotalWidth: 0
                    };
                    var totalWidth = _.reduce(maxWidths, _.sum, 0);
                    var relativeWidths = _.map(maxWidths, _.muls(1 / totalWidth));
                    var excessWidth = Math.max(0, totalWidth - cfg.maxTotalWidth);
                    var computedWidths = _.map(maxWidths, function (w, i) {
                        return Math.max(cfg.minColumnWidths[i], Math.floor(w - excessWidth * relativeWidths[i]));
                    });
                    var restWidths = columnWidths.map(function (widths) {
                        return [
                            computedWidths,
                            widths
                        ].zip(_.subtract);
                    });
                    return [
                        rowsToStr,
                        restWidths
                    ].zip(_.zap.tails(function (str, w) {
                        return w >= 0 ? str + ' '.repeats(w) : _.initial(str, -w).join('');
                    }).then(_.joinsWith('  ')));
                }
            }
        });
        if ($platform.NodeJS) {
            module.exports = log;
        }
    },
    function (module, exports) {
        _.defineTagKeyword('shouldFail');
        _.defineTagKeyword('async');
        ;
        _.defineTagKeyword('assertion');
        Testosterone = $singleton({
            prototypeTests: [],
            isRunning: $property(function () {
                return this.currentAssertion !== undefined;
            }),
            constructor: function () {
                _.each(_.assertions, function (fn, name) {
                    this.defineAssertion(name, name === 'assertFails' ? $shouldFail(function (what) {
                        what.call(this);
                    }) : fn);
                }, this);
                (function (register) {
                    $prototype.macro('$test', register);
                    $prototype.macro('$tests', register);
                }(this.$(function (def, value, name) {
                    this.prototypeTests.push({
                        proto: def.constructor,
                        tests: value
                    });
                    def.$tests = $static($property($constant(_.isStrictlyObject(value) && value || _.object([[
                            'test',
                            value
                        ]]))));
                    return def;
                })));
                this.run = this.$(this.run);
            },
            run: _.interlocked(function (cfg_) {
                var defaults = {
                    suites: [],
                    silent: true,
                    verbose: false,
                    timeout: 2000,
                    filter: _.identity,
                    testStarted: function (test) {
                    },
                    testComplete: function (test) {
                    }
                };
                var cfg = this.runConfig = _.extend(defaults, cfg_);
                var suitesIsArray = _.isArray(cfg.suites);
                var suites = _.map(cfg.suites, this.$(function (suite, name) {
                    return this.testSuite(suitesIsArray ? suite.name : name, suitesIsArray ? suite.tests : suite, cfg.context, suite.proto);
                }));
                var result = (cfg.codebase === false ? __([]) : this.collectPrototypeTests()).then(this.$(function (prototypeTests) {
                    var baseTests = cfg.codebase === false ? [] : this.collectTests();
                    var allTests = _.flatten(_.pluck(baseTests.concat(suites).concat(prototypeTests), 'tests'));
                    var selectTests = _.filter(allTests, cfg.shouldRun || _.constant(true));
                    this.runningTests = _.map(selectTests, function (test, i) {
                        return _.extend(test, {
                            indent: cfg.indent,
                            index: i
                        });
                    });
                    _.each(this.runningTests, function (t) {
                        if (!(t.routine instanceof Function)) {
                            log.ee(t.suite, t.name, '\u2013 test routine is not a function:', t.routine);
                            throw new Error();
                        }
                    });
                    this.runningTests = _.filter(this.runningTests, cfg.filter || _.identity);
                    return __.each(this.runningTests, this.$(this.runTest)).then(this.$(function () {
                        _.assert(cfg.done !== true);
                        cfg.done = true;
                        this.printLog(cfg);
                        this.failedTests = _.filter(this.runningTests, _.property('failed'));
                        this.failed = this.failedTests.length > 0;
                        return !this.failed;
                    }));
                }));
                return result.catch(function (e) {
                    log.margin();
                    log.ee(log.boldLine, 'TESTOSTERONE CRASHED', log.boldLine, '\n\n', e);
                    throw e;
                });
            }),
            onException: function (e) {
                if (this.currentAssertion)
                    this.currentAssertion.onException(e);
                else
                    throw e;
            },
            defineAssertions: function (assertions) {
                _.each(assertions, function (fn, name) {
                    this.defineAssertion(name, fn);
                }, this);
            },
            runTest: function (test, i) {
                var self = this, runConfig = this.runConfig;
                log.impl.configStack = [];
                return __.then(runConfig.testStarted(test), function () {
                    test.verbose = runConfig.verbose;
                    test.timeout = runConfig.timeout;
                    test.startTime = Date.now();
                    return test.run().then(function () {
                        test.time = Date.now() - test.startTime;
                        return runConfig.testComplete(test);
                    });
                });
            },
            collectTests: function () {
                return _.map(_.tests, this.$(function (suite, name) {
                    return this.testSuite(name, suite);
                }));
            },
            collectPrototypeTests: function () {
                var self = this;
                return __.map(this.prototypeTests, function (def, then) {
                    return def.proto.$meta.promise.then(function (meta) {
                        return self.testSuite(meta.name, def.tests, undefined, def.proto);
                    });
                });
            },
            testSuite: function (name, tests, context, proto) {
                return {
                    name: name || '',
                    tests: _(_.pairs(typeof tests === 'function' && _.object([[
                            name,
                            tests
                        ]]) || tests)).map(function (keyValue) {
                        var test = new Test({
                            proto: proto,
                            name: keyValue[0],
                            routine: keyValue[1],
                            suite: name,
                            context: context
                        });
                        test.complete(function () {
                            if (!(test.hasLog = test.logCalls.length > 0)) {
                                if (test.failed) {
                                    log.red('FAIL');
                                } else if (test.verbose) {
                                    log.green('PASS');
                                }
                            }
                        });
                        return test;
                    })
                };
            },
            defineAssertion: function (name, def) {
                var self = this;
                _.deleteKeyword(name);
                _.defineKeyword(name, Tags.modify(def, function (fn) {
                    return _.withSameArgs(fn, function () {
                        var loc = $callStack.safeLocation($platform.Browser && !$platform.Chrome ? 0 : 1);
                        if (!self.currentAssertion) {
                            return fn.apply(self, arguments);
                        } else {
                            return self.currentAssertion.babyAssertion(name, def, fn, arguments, loc);
                        }
                    });
                }));
            },
            printLog: function (cfg) {
                if (!cfg.supressLog) {
                    var loggedTests = _.filter(this.runningTests, function (test) {
                        return test.failed || !cfg.silent && test.hasLog;
                    });
                    var failedTests = _.filter(this.runningTests, _.property('failed'));
                    _.invoke(cfg.verbose ? this.runningTests : loggedTests, 'printLog');
                    if (failedTests.length) {
                        log.orange('\n' + log.boldLine + '\n' + 'SOME TESTS FAILED:', _.pluck(failedTests, 'name').join(', '), '\n\n');
                    } else if (cfg.silent !== true) {
                        log.green('\n' + log.boldLine + '\n' + 'ALL TESTS PASS\n\n');
                    }
                }
            }
        });
        Test = $prototype({
            constructor: function (cfg) {
                _.defaults(this, cfg, {
                    name: '<< UNNAMED FOR UNKNOWN REASON >>',
                    failed: false,
                    routine: undefined,
                    verbose: false,
                    depth: 1,
                    indent: 0,
                    failedAssertions: [],
                    context: this,
                    complete: _.extend(_.barrier(), { context: this })
                });
                this.babyAssertion = _.interlocked(this.babyAssertion);
            },
            finalize: function () {
                this.babyAssertion.wait(this.$(function () {
                    if (this.canFail && this.failedAssertions.length) {
                        this.failed = true;
                    }
                    this.complete(true);
                }));
            },
            babyAssertion: function (name, def, fn, args, loc) {
                var self = this;
                var assertion = new Test({
                    mother: this,
                    name: name,
                    shouldFail: def.$shouldFail || this.shouldFail,
                    depth: this.depth + 1,
                    location: loc,
                    context: this.context,
                    timeout: this.timeout / 2,
                    verbose: this.verbose,
                    silent: this.silent,
                    routine: Tags.modify(def, function (fn) {
                        return function (done) {
                            if ($async.is(args[0]) || $async.is(def)) {
                                _.cps.apply(fn, self.context, args, function (args, then) {
                                    if (then) {
                                        then.apply(this, args);
                                    }
                                    done();
                                });
                            } else {
                                try {
                                    fn.apply(self.context, args);
                                    done();
                                } catch (e) {
                                    assertion.onException(e);
                                }
                            }
                        };
                    })
                });
                return assertion.run().finally(function (e, x) {
                    Testosterone.currentAssertion = self;
                    if (assertion.failed || assertion.verbose && assertion.logCalls.notEmpty) {
                        return assertion.location.sourceReady.promise.then(function (src) {
                            log.red(log.config({
                                location: assertion.location,
                                where: assertion.location
                            }), src);
                            assertion.evalLogCalls();
                            return src;
                        });
                    }
                }).then(function (src) {
                    if (assertion.failed && self.canFail) {
                        self.failedAssertions.push(assertion);
                    }
                });
            },
            canFail: $property(function () {
                return !this.failed && !this.shouldFail;
            }),
            fail: function () {
                this.failed = true;
                this.finalize();
            },
            assertionStack: $property(function () {
                var result = [], a = this;
                do {
                    result.push(a);
                    a = a.mother;
                } while (a);
                return result;
            }),
            onException: function (e) {
                if (this.canFail || this.verbose) {
                    if (_.isAssertionError(e)) {
                        if ('notMatching' in e) {
                            var notMatching = _.coerceToArray(e.notMatching);
                            if (e.asColumns) {
                                log.orange(log.columns(_.map(notMatching, function (obj) {
                                    return [
                                        '\t\u2022 ' + _.keys(obj)[0],
                                        _.stringify(_.values(obj)[0])
                                    ];
                                })).join('\n'));
                            } else {
                                var cases = _.map(notMatching, log.impl.stringify.arity1.then(_.bullet.$('\t\u2022 ')));
                                var common = _.reduce2(cases, _.longestCommonSubstring) || '';
                                if (common.length < 4) {
                                    common = undefined;
                                }
                                _.each(cases, function (what) {
                                    if (common) {
                                        var where = what.indexOf(common);
                                        log.write(log.color.orange, what.substr(0, where), log.color.dark, common, log.color.orange, what.substr(where + common.length));
                                    } else {
                                        log.orange(what);
                                    }
                                });
                            }
                        }
                    } else {
                        if (this.depth > 1) {
                            log.newline();
                        }
                        log.write(e);
                    }
                    log.newline();
                }
                if (this.canFail) {
                    this.fail();
                } else {
                    this.finalize();
                }
            },
            run: function () {
                var self = Testosterone.currentAssertion = this, routine = Tags.unwrap(this.routine);
                return new Channel(this.$(function (then) {
                    this.shouldFail = $shouldFail.is(this.routine);
                    this.failed = false;
                    this.hasLog = false;
                    this.logCalls = [];
                    this.failureLocations = {};
                    _.withTimeout({
                        maxTime: self.timeout,
                        expired: function () {
                            if (self.canFail) {
                                log.ee('TIMEOUT EXPIRED');
                                self.fail();
                            }
                        }
                    }, self.complete);
                    _.withUncaughtExceptionHandler(self.$(self.onException), self.complete);
                    log.withWriteBackend(_.extendWith({ indent: 1 }, function (x) {
                        self.logCalls.push(x);
                    }), function (doneWithLogging) {
                        self.complete(doneWithLogging.arity0);
                        if (then) {
                            self.complete(then);
                        }
                        if (routine.length > 0) {
                            routine.call(self.context, self.$(self.finalize));
                        } else {
                            var result = undefined;
                            try {
                                result = routine.call(self.context);
                            } catch (e) {
                                self.onException(e);
                            }
                            if (_.isArrayLike(result) && result[0] instanceof Promise) {
                                result = __.all(result);
                            }
                            if (result instanceof Promise) {
                                result.then(function (x) {
                                    self.finalize();
                                }.postponed, function (e) {
                                    self.onException(e);
                                });
                            } else {
                                self.finalize();
                            }
                        }
                    });
                }));
            },
            printLog: function () {
                var suiteName = this.suite && this.suite !== this.name && (this.suite || '').quote('[]') || '';
                log.write(log.color.blue, '\n' + log.boldLine, '\n' + _.nonempty([
                    suiteName,
                    this.name
                ]).join(' '), (this.index + ' of ' + Testosterone.runningTests.length).quote('()') + (this.failed ? ' FAILED' : '') + ':', '\n');
                this.evalLogCalls();
            },
            evalLogCalls: function () {
                _.each(this.logCalls, log.writeBackend().arity1);
            }
        });
        _.defineTagKeyword('allowsRecursion');
        _.limitRecursion = function (max, fn, name) {
            if (!fn) {
                fn = max;
                max = 0;
            }
            var depth = -1;
            var reported = false;
            return function () {
                if (!reported) {
                    if (depth > max) {
                        reported = true;
                        throw _.extendWith({
                            notMatching: _.map(arguments, function (arg, i) {
                                return 'arg' + (i + 1) + ': ' + _.stringify(arg);
                            })
                        }, new Error(name + ': max recursion depth reached (' + max + ')'));
                    } else {
                        var result = (++depth, fn.apply(this, arguments));
                        depth--;
                        return result;
                    }
                }
            };
        };
        Testosterone.ValidatesRecursion = $trait({
            $test: function () {
                var test = new ($component({
                    $traits: [Testosterone.ValidatesRecursion],
                    foo: function () {
                    },
                    bar: function () {
                        this.bar();
                    },
                    baz: $allowsRecursion({ max: 2 }, function () {
                        this.baz();
                    }),
                    qux: $allowsRecursion(function () {
                        if (!this.quxCalled) {
                            this.quxCalled = true;
                            this.qux();
                        }
                    })
                }))();
                test.foo();
                $assertThrows(test.bar, { message: 'bar: max recursion depth reached (0)' });
                test.bar();
                $assertThrows(test.baz, { message: 'baz: max recursion depth reached (2)' });
                test.qux();
            },
            $constructor: function () {
                _.each(this, function (member, name) {
                    if (_.isFunction($untag(member)) && name !== 'constructor' && (!member.$allowsRecursion || member.$allowsRecursion.max !== undefined)) {
                        this[name] = Tags.modify(member, function (fn) {
                            return _.limitRecursion(member && member.$allowsRecursion && member.$allowsRecursion.max || 0, fn, name);
                        });
                    }
                }, this);
            }
        });
        (function () {
            var colors = _.keys(_.omit(log.color, 'none'));
            colors.each(_.defineTagKeyword);
            _.defineTagKeyword('verbose');
            Testosterone.LogsMethodCalls = $trait({
                $test: $platform.Browser ? function () {
                } : function (testDone) {
                    var Proto = $prototype({ $traits: [Testosterone.LogsMethodCalls] });
                    var Compo = $extends(Proto, {
                        foo: $log($pink($verbose(function (_42) {
                            $assert(_42, 42);
                            return 24;
                        })))
                    });
                    var compo = new Compo();
                    var testContext = this;
                    Compo.$meta(function () {
                        $assert(compo.foo(42), 24);
                        $assert(_.pluck(testContext.logCalls, 'text'), [
                            'Compo.foo (42)',
                            '\u2192 24',
                            ''
                        ]);
                        $assert(testContext.logCalls[0].color === log.color('pink'));
                        testDone();
                    });
                },
                $macroTags: {
                    log: function (def, member, name) {
                        var param = (_.isBoolean(member.$log) ? undefined : member.$log) || (member.$verbose ? '{{$proto}}' : '');
                        var meta = {};
                        var color = _.find2(colors, function (color) {
                            return log.color(member['$' + color] && color) || false;
                        });
                        var template = param && _.template(param, { interpolate: /\{\{(.+?)\}\}/g });
                        $untag(def.$meta)(function (x) {
                            meta = x;
                        });
                        return $prototype.impl.modifyMember(member, function (fn, name_) {
                            return function () {
                                var this_ = this, arguments_ = _.asArray(arguments);
                                var this_dump = template && template.call(this, _.extend({ $proto: meta.name }, _.map2(this, _.stringifyOneLine.arity1))) || this.desc || '';
                                var args_dump = _.map(arguments_, _.stringifyOneLine.arity1).join(', ').quote('()');
                                log.write(log.config({
                                    color: color,
                                    location: true,
                                    where: member.$verbose ? undefined : { calleeShort: meta.name }
                                }), _.nonempty([
                                    this_dump,
                                    name,
                                    name_
                                ]).join('.'), args_dump);
                                return log.withConfig({
                                    indent: 1,
                                    color: color,
                                    protoName: meta.name
                                }, function () {
                                    var numWritesBefore = log.impl.numWrites;
                                    var result = fn.apply(this_, arguments_);
                                    if (result !== undefined) {
                                        log.write('\u2192', _.stringifyOneLine(result));
                                    }
                                    if (log.currentConfig().indent < 2 && log.impl.numWrites - numWritesBefore > 0) {
                                        log.newline();
                                    }
                                    return result;
                                });
                            };
                        });
                    }
                }
            });
        }());
        if ($platform.NodeJS) {
            module.exports = Testosterone;
        }
    },
    function (module, exports) {
        _.measure = function (routine, then) {
            if (then) {
                var now = _.now();
                routine(function () {
                    then(_.now() - now);
                });
            } else {
                var now = _.now();
                routine();
                return _.now() - now;
            }
        };
        _.perfTest = function (arg, then) {
            var rounds = 500;
            var routines = _.isFunction(arg) ? { test: arg } : arg;
            var timings = {};
            _.cps.each(routines, function (fn, name, then) {
                var result = [];
                var run = function () {
                    for (var i = 0; i < rounds; i++) {
                        result.push(fn());
                    }
                    console.log(name, result);
                };
                run();
                _.delay(function () {
                    timings[name] = _.measure(run) / rounds;
                    then();
                }, 100);
            }, function () {
                then(timings);
            });
        };
    },
    function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        (function (global, factory) {
            'use strict';
            if (typeof module === 'object' && typeof module.exports === 'object') {
                module.exports = global.document ? factory(global, true) : function (w) {
                    if (!w.document) {
                        throw new Error('jQuery requires a window with a document');
                    }
                    return factory(w);
                };
            } else {
                factory(global);
            }
        }(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
            'use strict';
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
            var ObjectFunctionString = fnToString.call(Object);
            var support = {};
            function DOMEval(code, doc) {
                doc = doc || document;
                var script = doc.createElement('script');
                script.text = code;
                doc.head.appendChild(script).parentNode.removeChild(script);
            }
            var version = '3.1.0', jQuery = function (selector, context) {
                    return new jQuery.fn.init(selector, context);
                }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g, fcamelCase = function (all, letter) {
                    return letter.toUpperCase();
                };
            jQuery.fn = jQuery.prototype = {
                jquery: version,
                constructor: jQuery,
                length: 0,
                toArray: function () {
                    return slice.call(this);
                },
                get: function (num) {
                    return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
                },
                pushStack: function (elems) {
                    var ret = jQuery.merge(this.constructor(), elems);
                    ret.prevObject = this;
                    return ret;
                },
                each: function (callback) {
                    return jQuery.each(this, callback);
                },
                map: function (callback) {
                    return this.pushStack(jQuery.map(this, function (elem, i) {
                        return callback.call(elem, i, elem);
                    }));
                },
                slice: function () {
                    return this.pushStack(slice.apply(this, arguments));
                },
                first: function () {
                    return this.eq(0);
                },
                last: function () {
                    return this.eq(-1);
                },
                eq: function (i) {
                    var len = this.length, j = +i + (i < 0 ? len : 0);
                    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
                },
                end: function () {
                    return this.prevObject || this.constructor();
                },
                push: push,
                sort: arr.sort,
                splice: arr.splice
            };
            jQuery.extend = jQuery.fn.extend = function () {
                var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
                if (typeof target === 'boolean') {
                    deep = target;
                    target = arguments[i] || {};
                    i++;
                }
                if (typeof target !== 'object' && !jQuery.isFunction(target)) {
                    target = {};
                }
                if (i === length) {
                    target = this;
                    i--;
                }
                for (; i < length; i++) {
                    if ((options = arguments[i]) != null) {
                        for (name in options) {
                            src = target[name];
                            copy = options[name];
                            if (target === copy) {
                                continue;
                            }
                            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && jQuery.isArray(src) ? src : [];
                                } else {
                                    clone = src && jQuery.isPlainObject(src) ? src : {};
                                }
                                target[name] = jQuery.extend(deep, clone, copy);
                            } else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }
                return target;
            };
            jQuery.extend({
                expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),
                isReady: true,
                error: function (msg) {
                    throw new Error(msg);
                },
                noop: function () {
                },
                isFunction: function (obj) {
                    return jQuery.type(obj) === 'function';
                },
                isArray: Array.isArray,
                isWindow: function (obj) {
                    return obj != null && obj === obj.window;
                },
                isNumeric: function (obj) {
                    var type = jQuery.type(obj);
                    return (type === 'number' || type === 'string') && !isNaN(obj - parseFloat(obj));
                },
                isPlainObject: function (obj) {
                    var proto, Ctor;
                    if (!obj || toString.call(obj) !== '[object Object]') {
                        return false;
                    }
                    proto = getProto(obj);
                    if (!proto) {
                        return true;
                    }
                    Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
                    return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
                },
                isEmptyObject: function (obj) {
                    var name;
                    for (name in obj) {
                        return false;
                    }
                    return true;
                },
                type: function (obj) {
                    if (obj == null) {
                        return obj + '';
                    }
                    return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
                },
                globalEval: function (code) {
                    DOMEval(code);
                },
                camelCase: function (string) {
                    return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
                },
                nodeName: function (elem, name) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
                },
                each: function (obj, callback) {
                    var length, i = 0;
                    if (isArrayLike(obj)) {
                        length = obj.length;
                        for (; i < length; i++) {
                            if (callback.call(obj[i], i, obj[i]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (i in obj) {
                            if (callback.call(obj[i], i, obj[i]) === false) {
                                break;
                            }
                        }
                    }
                    return obj;
                },
                trim: function (text) {
                    return text == null ? '' : (text + '').replace(rtrim, '');
                },
                makeArray: function (arr, results) {
                    var ret = results || [];
                    if (arr != null) {
                        if (isArrayLike(Object(arr))) {
                            jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
                        } else {
                            push.call(ret, arr);
                        }
                    }
                    return ret;
                },
                inArray: function (elem, arr, i) {
                    return arr == null ? -1 : indexOf.call(arr, elem, i);
                },
                merge: function (first, second) {
                    var len = +second.length, j = 0, i = first.length;
                    for (; j < len; j++) {
                        first[i++] = second[j];
                    }
                    first.length = i;
                    return first;
                },
                grep: function (elems, callback, invert) {
                    var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
                    for (; i < length; i++) {
                        callbackInverse = !callback(elems[i], i);
                        if (callbackInverse !== callbackExpect) {
                            matches.push(elems[i]);
                        }
                    }
                    return matches;
                },
                map: function (elems, callback, arg) {
                    var length, value, i = 0, ret = [];
                    if (isArrayLike(elems)) {
                        length = elems.length;
                        for (; i < length; i++) {
                            value = callback(elems[i], i, arg);
                            if (value != null) {
                                ret.push(value);
                            }
                        }
                    } else {
                        for (i in elems) {
                            value = callback(elems[i], i, arg);
                            if (value != null) {
                                ret.push(value);
                            }
                        }
                    }
                    return concat.apply([], ret);
                },
                guid: 1,
                proxy: function (fn, context) {
                    var tmp, args, proxy;
                    if (typeof context === 'string') {
                        tmp = fn[context];
                        context = fn;
                        fn = tmp;
                    }
                    if (!jQuery.isFunction(fn)) {
                        return undefined;
                    }
                    args = slice.call(arguments, 2);
                    proxy = function () {
                        return fn.apply(context || this, args.concat(slice.call(arguments)));
                    };
                    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
                    return proxy;
                },
                now: Date.now,
                support: support
            });
            if (typeof Symbol === 'function') {
                jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
            }
            jQuery.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (i, name) {
                class2type['[object ' + name + ']'] = name.toLowerCase();
            });
            function isArrayLike(obj) {
                var length = !!obj && 'length' in obj && obj.length, type = jQuery.type(obj);
                if (type === 'function' || jQuery.isWindow(obj)) {
                    return false;
                }
                return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
            }
            var Sizzle = function (window) {
                var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = 'sizzle' + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function (a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                        }
                        return 0;
                    }, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function (list, elem) {
                        var i = 0, len = list.length;
                        for (; i < len; i++) {
                            if (list[i] === elem) {
                                return i;
                            }
                        }
                        return -1;
                    }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', whitespace = '[\\x20\\t\\r\\n\\f]', identifier = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+', attributes = '\\[' + whitespace + '*(' + identifier + ')(?:' + whitespace + '*([*^$|!~]?=)' + whitespace + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier + '))|)' + whitespace + '*\\]', pseudos = ':(' + identifier + ')(?:\\((' + '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' + '((?:\\\\.|[^\\\\()[\\]]|' + attributes + ')*)|' + '.*' + ')\\)|)', rwhitespace = new RegExp(whitespace + '+', 'g'), rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*?)' + whitespace + '*\\]', 'g'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
                        'ID': new RegExp('^#(' + identifier + ')'),
                        'CLASS': new RegExp('^\\.(' + identifier + ')'),
                        'TAG': new RegExp('^(' + identifier + '|[*])'),
                        'ATTR': new RegExp('^' + attributes),
                        'PSEUDO': new RegExp('^' + pseudos),
                        'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
                        'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
                        'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
                    }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
                        var high = '0x' + escaped - 65536;
                        return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
                    }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, fcssescape = function (ch, asCodePoint) {
                        if (asCodePoint) {
                            if (ch === '\0') {
                                return '\uFFFD';
                            }
                            return ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' ';
                        }
                        return '\\' + ch;
                    }, unloadHandler = function () {
                        setDocument();
                    }, disabledAncestor = addCombinator(function (elem) {
                        return elem.disabled === true;
                    }, {
                        dir: 'parentNode',
                        next: 'legend'
                    });
                try {
                    push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
                    arr[preferredDoc.childNodes.length].nodeType;
                } catch (e) {
                    push = {
                        apply: arr.length ? function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } : function (target, els) {
                            var j = target.length, i = 0;
                            while (target[j++] = els[i++]) {
                            }
                            target.length = j - 1;
                        }
                    };
                }
                function Sizzle(selector, context, results, seed) {
                    var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
                    results = results || [];
                    if (typeof selector !== 'string' || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                        return results;
                    }
                    if (!seed) {
                        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                            setDocument(context);
                        }
                        context = context || document;
                        if (documentIsHTML) {
                            if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                                if (m = match[1]) {
                                    if (nodeType === 9) {
                                        if (elem = context.getElementById(m)) {
                                            if (elem.id === m) {
                                                results.push(elem);
                                                return results;
                                            }
                                        } else {
                                            return results;
                                        }
                                    } else {
                                        if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    }
                                } else if (match[2]) {
                                    push.apply(results, context.getElementsByTagName(selector));
                                    return results;
                                } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                                    push.apply(results, context.getElementsByClassName(m));
                                    return results;
                                }
                            }
                            if (support.qsa && !compilerCache[selector + ' '] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                                if (nodeType !== 1) {
                                    newContext = context;
                                    newSelector = selector;
                                } else if (context.nodeName.toLowerCase() !== 'object') {
                                    if (nid = context.getAttribute('id')) {
                                        nid = nid.replace(rcssescape, fcssescape);
                                    } else {
                                        context.setAttribute('id', nid = expando);
                                    }
                                    groups = tokenize(selector);
                                    i = groups.length;
                                    while (i--) {
                                        groups[i] = '#' + nid + ' ' + toSelector(groups[i]);
                                    }
                                    newSelector = groups.join(',');
                                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                                }
                                if (newSelector) {
                                    try {
                                        push.apply(results, newContext.querySelectorAll(newSelector));
                                        return results;
                                    } catch (qsaError) {
                                    } finally {
                                        if (nid === expando) {
                                            context.removeAttribute('id');
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return select(selector.replace(rtrim, '$1'), context, results, seed);
                }
                function createCache() {
                    var keys = [];
                    function cache(key, value) {
                        if (keys.push(key + ' ') > Expr.cacheLength) {
                            delete cache[keys.shift()];
                        }
                        return cache[key + ' '] = value;
                    }
                    return cache;
                }
                function markFunction(fn) {
                    fn[expando] = true;
                    return fn;
                }
                function assert(fn) {
                    var el = document.createElement('fieldset');
                    try {
                        return !!fn(el);
                    } catch (e) {
                        return false;
                    } finally {
                        if (el.parentNode) {
                            el.parentNode.removeChild(el);
                        }
                        el = null;
                    }
                }
                function addHandle(attrs, handler) {
                    var arr = attrs.split('|'), i = arr.length;
                    while (i--) {
                        Expr.attrHandle[arr[i]] = handler;
                    }
                }
                function siblingCheck(a, b) {
                    var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
                    if (diff) {
                        return diff;
                    }
                    if (cur) {
                        while (cur = cur.nextSibling) {
                            if (cur === b) {
                                return -1;
                            }
                        }
                    }
                    return a ? 1 : -1;
                }
                function createInputPseudo(type) {
                    return function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === 'input' && elem.type === type;
                    };
                }
                function createButtonPseudo(type) {
                    return function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return (name === 'input' || name === 'button') && elem.type === type;
                    };
                }
                function createDisabledPseudo(disabled) {
                    return function (elem) {
                        return 'label' in elem && elem.disabled === disabled || 'form' in elem && elem.disabled === disabled || 'form' in elem && elem.disabled === false && (elem.isDisabled === disabled || elem.isDisabled !== !disabled && ('label' in elem || !disabledAncestor(elem)) !== disabled);
                    };
                }
                function createPositionalPseudo(fn) {
                    return markFunction(function (argument) {
                        argument = +argument;
                        return markFunction(function (seed, matches) {
                            var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                            while (i--) {
                                if (seed[j = matchIndexes[i]]) {
                                    seed[j] = !(matches[j] = seed[j]);
                                }
                            }
                        });
                    });
                }
                function testContext(context) {
                    return context && typeof context.getElementsByTagName !== 'undefined' && context;
                }
                support = Sizzle.support = {};
                isXML = Sizzle.isXML = function (elem) {
                    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                    return documentElement ? documentElement.nodeName !== 'HTML' : false;
                };
                setDocument = Sizzle.setDocument = function (node) {
                    var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
                    if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                        return document;
                    }
                    document = doc;
                    docElem = document.documentElement;
                    documentIsHTML = !isXML(document);
                    if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
                        if (subWindow.addEventListener) {
                            subWindow.addEventListener('unload', unloadHandler, false);
                        } else if (subWindow.attachEvent) {
                            subWindow.attachEvent('onunload', unloadHandler);
                        }
                    }
                    support.attributes = assert(function (el) {
                        el.className = 'i';
                        return !el.getAttribute('className');
                    });
                    support.getElementsByTagName = assert(function (el) {
                        el.appendChild(document.createComment(''));
                        return !el.getElementsByTagName('*').length;
                    });
                    support.getElementsByClassName = rnative.test(document.getElementsByClassName);
                    support.getById = assert(function (el) {
                        docElem.appendChild(el).id = expando;
                        return !document.getElementsByName || !document.getElementsByName(expando).length;
                    });
                    if (support.getById) {
                        Expr.find['ID'] = function (id, context) {
                            if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
                                var m = context.getElementById(id);
                                return m ? [m] : [];
                            }
                        };
                        Expr.filter['ID'] = function (id) {
                            var attrId = id.replace(runescape, funescape);
                            return function (elem) {
                                return elem.getAttribute('id') === attrId;
                            };
                        };
                    } else {
                        delete Expr.find['ID'];
                        Expr.filter['ID'] = function (id) {
                            var attrId = id.replace(runescape, funescape);
                            return function (elem) {
                                var node = typeof elem.getAttributeNode !== 'undefined' && elem.getAttributeNode('id');
                                return node && node.value === attrId;
                            };
                        };
                    }
                    Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
                        if (typeof context.getElementsByTagName !== 'undefined') {
                            return context.getElementsByTagName(tag);
                        } else if (support.qsa) {
                            return context.querySelectorAll(tag);
                        }
                    } : function (tag, context) {
                        var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                        if (tag === '*') {
                            while (elem = results[i++]) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }
                            return tmp;
                        }
                        return results;
                    };
                    Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
                        if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
                            return context.getElementsByClassName(className);
                        }
                    };
                    rbuggyMatches = [];
                    rbuggyQSA = [];
                    if (support.qsa = rnative.test(document.querySelectorAll)) {
                        assert(function (el) {
                            docElem.appendChild(el).innerHTML = '<a id=\'' + expando + '\'></a>' + '<select id=\'' + expando + '-\r\\\' msallowcapture=\'\'>' + '<option selected=\'\'></option></select>';
                            if (el.querySelectorAll('[msallowcapture^=\'\']').length) {
                                rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
                            }
                            if (!el.querySelectorAll('[selected]').length) {
                                rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
                            }
                            if (!el.querySelectorAll('[id~=' + expando + '-]').length) {
                                rbuggyQSA.push('~=');
                            }
                            if (!el.querySelectorAll(':checked').length) {
                                rbuggyQSA.push(':checked');
                            }
                            if (!el.querySelectorAll('a#' + expando + '+*').length) {
                                rbuggyQSA.push('.#.+[+~]');
                            }
                        });
                        assert(function (el) {
                            el.innerHTML = '<a href=\'\' disabled=\'disabled\'></a>' + '<select disabled=\'disabled\'><option/></select>';
                            var input = document.createElement('input');
                            input.setAttribute('type', 'hidden');
                            el.appendChild(input).setAttribute('name', 'D');
                            if (el.querySelectorAll('[name=d]').length) {
                                rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=');
                            }
                            if (el.querySelectorAll(':enabled').length !== 2) {
                                rbuggyQSA.push(':enabled', ':disabled');
                            }
                            docElem.appendChild(el).disabled = true;
                            if (el.querySelectorAll(':disabled').length !== 2) {
                                rbuggyQSA.push(':enabled', ':disabled');
                            }
                            el.querySelectorAll('*,:x');
                            rbuggyQSA.push(',.*:');
                        });
                    }
                    if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                        assert(function (el) {
                            support.disconnectedMatch = matches.call(el, '*');
                            matches.call(el, '[s!=\'\']:x');
                            rbuggyMatches.push('!=', pseudos);
                        });
                    }
                    rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
                    rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
                    hasCompare = rnative.test(docElem.compareDocumentPosition);
                    contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                    } : function (a, b) {
                        if (b) {
                            while (b = b.parentNode) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                    sortOrder = hasCompare ? function (a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                            if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }
                            return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                        }
                        return compare & 4 ? -1 : 1;
                    } : function (a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                        if (!aup || !bup) {
                            return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }
                        cur = a;
                        while (cur = cur.parentNode) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while (cur = cur.parentNode) {
                            bp.unshift(cur);
                        }
                        while (ap[i] === bp[i]) {
                            i++;
                        }
                        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
                    };
                    return document;
                };
                Sizzle.matches = function (expr, elements) {
                    return Sizzle(expr, null, null, elements);
                };
                Sizzle.matchesSelector = function (elem, expr) {
                    if ((elem.ownerDocument || elem) !== document) {
                        setDocument(elem);
                    }
                    expr = expr.replace(rattributeQuotes, '=\'$1\']');
                    if (support.matchesSelector && documentIsHTML && !compilerCache[expr + ' '] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                        try {
                            var ret = matches.call(elem, expr);
                            if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                                return ret;
                            }
                        } catch (e) {
                        }
                    }
                    return Sizzle(expr, document, null, [elem]).length > 0;
                };
                Sizzle.contains = function (context, elem) {
                    if ((context.ownerDocument || context) !== document) {
                        setDocument(context);
                    }
                    return contains(context, elem);
                };
                Sizzle.attr = function (elem, name) {
                    if ((elem.ownerDocument || elem) !== document) {
                        setDocument(elem);
                    }
                    var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
                    return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                };
                Sizzle.escape = function (sel) {
                    return (sel + '').replace(rcssescape, fcssescape);
                };
                Sizzle.error = function (msg) {
                    throw new Error('Syntax error, unrecognized expression: ' + msg);
                };
                Sizzle.uniqueSort = function (results) {
                    var elem, duplicates = [], j = 0, i = 0;
                    hasDuplicate = !support.detectDuplicates;
                    sortInput = !support.sortStable && results.slice(0);
                    results.sort(sortOrder);
                    if (hasDuplicate) {
                        while (elem = results[i++]) {
                            if (elem === results[i]) {
                                j = duplicates.push(i);
                            }
                        }
                        while (j--) {
                            results.splice(duplicates[j], 1);
                        }
                    }
                    sortInput = null;
                    return results;
                };
                getText = Sizzle.getText = function (elem) {
                    var node, ret = '', i = 0, nodeType = elem.nodeType;
                    if (!nodeType) {
                        while (node = elem[i++]) {
                            ret += getText(node);
                        }
                    } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                        if (typeof elem.textContent === 'string') {
                            return elem.textContent;
                        } else {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                ret += getText(elem);
                            }
                        }
                    } else if (nodeType === 3 || nodeType === 4) {
                        return elem.nodeValue;
                    }
                    return ret;
                };
                Expr = Sizzle.selectors = {
                    cacheLength: 50,
                    createPseudo: markFunction,
                    match: matchExpr,
                    attrHandle: {},
                    find: {},
                    relative: {
                        '>': {
                            dir: 'parentNode',
                            first: true
                        },
                        ' ': { dir: 'parentNode' },
                        '+': {
                            dir: 'previousSibling',
                            first: true
                        },
                        '~': { dir: 'previousSibling' }
                    },
                    preFilter: {
                        'ATTR': function (match) {
                            match[1] = match[1].replace(runescape, funescape);
                            match[3] = (match[3] || match[4] || match[5] || '').replace(runescape, funescape);
                            if (match[2] === '~=') {
                                match[3] = ' ' + match[3] + ' ';
                            }
                            return match.slice(0, 4);
                        },
                        'CHILD': function (match) {
                            match[1] = match[1].toLowerCase();
                            if (match[1].slice(0, 3) === 'nth') {
                                if (!match[3]) {
                                    Sizzle.error(match[0]);
                                }
                                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
                                match[5] = +(match[7] + match[8] || match[3] === 'odd');
                            } else if (match[3]) {
                                Sizzle.error(match[0]);
                            }
                            return match;
                        },
                        'PSEUDO': function (match) {
                            var excess, unquoted = !match[6] && match[2];
                            if (matchExpr['CHILD'].test(match[0])) {
                                return null;
                            }
                            if (match[3]) {
                                match[2] = match[4] || match[5] || '';
                            } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
                                match[0] = match[0].slice(0, excess);
                                match[2] = unquoted.slice(0, excess);
                            }
                            return match.slice(0, 3);
                        }
                    },
                    filter: {
                        'TAG': function (nodeNameSelector) {
                            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                            return nodeNameSelector === '*' ? function () {
                                return true;
                            } : function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                        },
                        'CLASS': function (className) {
                            var pattern = classCache[className + ' '];
                            return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
                                return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== 'undefined' && elem.getAttribute('class') || '');
                            });
                        },
                        'ATTR': function (name, operator, check) {
                            return function (elem) {
                                var result = Sizzle.attr(elem, name);
                                if (result == null) {
                                    return operator === '!=';
                                }
                                if (!operator) {
                                    return true;
                                }
                                result += '';
                                return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
                            };
                        },
                        'CHILD': function (type, what, argument, first, last) {
                            var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
                            return first === 1 && last === 0 ? function (elem) {
                                return !!elem.parentNode;
                            } : function (elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                                if (parent) {
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while (node = node[dir]) {
                                                if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                    return false;
                                                }
                                            }
                                            start = dir = type === 'only' && !start && 'nextSibling';
                                        }
                                        return true;
                                    }
                                    start = [forward ? parent.firstChild : parent.lastChild];
                                    if (forward && useCache) {
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});
                                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];
                                        while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [
                                                    dirruns,
                                                    nodeIndex,
                                                    diff
                                                ];
                                                break;
                                            }
                                        }
                                    } else {
                                        if (useCache) {
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});
                                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }
                                        if (diff === false) {
                                            while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                                if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                                    if (useCache) {
                                                        outerCache = node[expando] || (node[expando] = {});
                                                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                        uniqueCache[type] = [
                                                            dirruns,
                                                            diff
                                                        ];
                                                    }
                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    diff -= last;
                                    return diff === first || diff % first === 0 && diff / first >= 0;
                                }
                            };
                        },
                        'PSEUDO': function (pseudo, argument) {
                            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
                            if (fn[expando]) {
                                return fn(argument);
                            }
                            if (fn.length > 1) {
                                args = [
                                    pseudo,
                                    pseudo,
                                    '',
                                    argument
                                ];
                                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
                                    var idx, matched = fn(seed, argument), i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) : function (elem) {
                                    return fn(elem, 0, args);
                                };
                            }
                            return fn;
                        }
                    },
                    pseudos: {
                        'not': markFunction(function (selector) {
                            var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
                            return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
                                var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                                while (i--) {
                                    if (elem = unmatched[i]) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) : function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                input[0] = null;
                                return !results.pop();
                            };
                        }),
                        'has': markFunction(function (selector) {
                            return function (elem) {
                                return Sizzle(selector, elem).length > 0;
                            };
                        }),
                        'contains': markFunction(function (text) {
                            text = text.replace(runescape, funescape);
                            return function (elem) {
                                return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                            };
                        }),
                        'lang': markFunction(function (lang) {
                            if (!ridentifier.test(lang || '')) {
                                Sizzle.error('unsupported lang: ' + lang);
                            }
                            lang = lang.replace(runescape, funescape).toLowerCase();
                            return function (elem) {
                                var elemLang;
                                do {
                                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                                        elemLang = elemLang.toLowerCase();
                                        return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
                                    }
                                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                                return false;
                            };
                        }),
                        'target': function (elem) {
                            var hash = window.location && window.location.hash;
                            return hash && hash.slice(1) === elem.id;
                        },
                        'root': function (elem) {
                            return elem === docElem;
                        },
                        'focus': function (elem) {
                            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                        },
                        'enabled': createDisabledPseudo(false),
                        'disabled': createDisabledPseudo(true),
                        'checked': function (elem) {
                            var nodeName = elem.nodeName.toLowerCase();
                            return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
                        },
                        'selected': function (elem) {
                            if (elem.parentNode) {
                                elem.parentNode.selectedIndex;
                            }
                            return elem.selected === true;
                        },
                        'empty': function (elem) {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                if (elem.nodeType < 6) {
                                    return false;
                                }
                            }
                            return true;
                        },
                        'parent': function (elem) {
                            return !Expr.pseudos['empty'](elem);
                        },
                        'header': function (elem) {
                            return rheader.test(elem.nodeName);
                        },
                        'input': function (elem) {
                            return rinputs.test(elem.nodeName);
                        },
                        'button': function (elem) {
                            var name = elem.nodeName.toLowerCase();
                            return name === 'input' && elem.type === 'button' || name === 'button';
                        },
                        'text': function (elem) {
                            var attr;
                            return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === 'text');
                        },
                        'first': createPositionalPseudo(function () {
                            return [0];
                        }),
                        'last': createPositionalPseudo(function (matchIndexes, length) {
                            return [length - 1];
                        }),
                        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
                            return [argument < 0 ? argument + length : argument];
                        }),
                        'even': createPositionalPseudo(function (matchIndexes, length) {
                            var i = 0;
                            for (; i < length; i += 2) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),
                        'odd': createPositionalPseudo(function (matchIndexes, length) {
                            var i = 1;
                            for (; i < length; i += 2) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),
                        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
                            var i = argument < 0 ? argument + length : argument;
                            for (; --i >= 0;) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),
                        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
                            var i = argument < 0 ? argument + length : argument;
                            for (; ++i < length;) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        })
                    }
                };
                Expr.pseudos['nth'] = Expr.pseudos['eq'];
                for (i in {
                        radio: true,
                        checkbox: true,
                        file: true,
                        password: true,
                        image: true
                    }) {
                    Expr.pseudos[i] = createInputPseudo(i);
                }
                for (i in {
                        submit: true,
                        reset: true
                    }) {
                    Expr.pseudos[i] = createButtonPseudo(i);
                }
                function setFilters() {
                }
                setFilters.prototype = Expr.filters = Expr.pseudos;
                Expr.setFilters = new setFilters();
                tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                    var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
                    if (cached) {
                        return parseOnly ? 0 : cached.slice(0);
                    }
                    soFar = selector;
                    groups = [];
                    preFilters = Expr.preFilter;
                    while (soFar) {
                        if (!matched || (match = rcomma.exec(soFar))) {
                            if (match) {
                                soFar = soFar.slice(match[0].length) || soFar;
                            }
                            groups.push(tokens = []);
                        }
                        matched = false;
                        if (match = rcombinators.exec(soFar)) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: match[0].replace(rtrim, ' ')
                            });
                            soFar = soFar.slice(matched.length);
                        }
                        for (type in Expr.filter) {
                            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                                matched = match.shift();
                                tokens.push({
                                    value: matched,
                                    type: type,
                                    matches: match
                                });
                                soFar = soFar.slice(matched.length);
                            }
                        }
                        if (!matched) {
                            break;
                        }
                    }
                    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
                };
                function toSelector(tokens) {
                    var i = 0, len = tokens.length, selector = '';
                    for (; i < len; i++) {
                        selector += tokens[i].value;
                    }
                    return selector;
                }
                function addCombinator(matcher, combinator, base) {
                    var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === 'parentNode', doneName = done++;
                    return combinator.first ? function (elem, context, xml) {
                        while (elem = elem[dir]) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                    } : function (elem, context, xml) {
                        var oldCache, uniqueCache, outerCache, newCache = [
                                dirruns,
                                doneName
                            ];
                        if (xml) {
                            while (elem = elem[dir]) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while (elem = elem[dir]) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                                    if (skip && skip === elem.nodeName.toLowerCase()) {
                                        elem = elem[dir] || elem;
                                    } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                        return newCache[2] = oldCache[2];
                                    } else {
                                        uniqueCache[key] = newCache;
                                        if (newCache[2] = matcher(elem, context, xml)) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
                }
                function elementMatcher(matchers) {
                    return matchers.length > 1 ? function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } : matchers[0];
                }
                function multipleContexts(selector, contexts, results) {
                    var i = 0, len = contexts.length;
                    for (; i < len; i++) {
                        Sizzle(selector, contexts[i], results);
                    }
                    return results;
                }
                function condense(unmatched, map, filter, context, xml) {
                    var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
                    for (; i < len; i++) {
                        if (elem = unmatched[i]) {
                            if (!filter || filter(elem, context, xml)) {
                                newUnmatched.push(elem);
                                if (mapped) {
                                    map.push(i);
                                }
                            }
                        }
                    }
                    return newUnmatched;
                }
                function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                    if (postFilter && !postFilter[expando]) {
                        postFilter = setMatcher(postFilter);
                    }
                    if (postFinder && !postFinder[expando]) {
                        postFinder = setMatcher(postFinder, postSelector);
                    }
                    return markFunction(function (seed, results, context, xml) {
                        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                        if (matcher) {
                            matcher(matcherIn, matcherOut, context, xml);
                        }
                        if (postFilter) {
                            temp = condense(matcherOut, postMap);
                            postFilter(temp, [], context, xml);
                            i = temp.length;
                            while (i--) {
                                if (elem = temp[i]) {
                                    matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                                }
                            }
                        }
                        if (seed) {
                            if (postFinder || preFilter) {
                                if (postFinder) {
                                    temp = [];
                                    i = matcherOut.length;
                                    while (i--) {
                                        if (elem = matcherOut[i]) {
                                            temp.push(matcherIn[i] = elem);
                                        }
                                    }
                                    postFinder(null, matcherOut = [], temp, xml);
                                }
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                        seed[temp] = !(results[temp] = elem);
                                    }
                                }
                            }
                        } else {
                            matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                            if (postFinder) {
                                postFinder(null, results, matcherOut, xml);
                            } else {
                                push.apply(results, matcherOut);
                            }
                        }
                    });
                }
                function matcherFromTokens(tokens) {
                    var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
                            return elem === checkContext;
                        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
                            return indexOf(checkContext, elem) > -1;
                        }, implicitRelative, true), matchers = [function (elem, context, xml) {
                                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                                checkContext = null;
                                return ret;
                            }];
                    for (; i < len; i++) {
                        if (matcher = Expr.relative[tokens[i].type]) {
                            matchers = [addCombinator(elementMatcher(matchers), matcher)];
                        } else {
                            matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                            if (matcher[expando]) {
                                j = ++i;
                                for (; j < len; j++) {
                                    if (Expr.relative[tokens[j].type]) {
                                        break;
                                    }
                                }
                                return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                            }
                            matchers.push(matcher);
                        }
                    }
                    return elementMatcher(matchers);
                }
                function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                    var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
                            var elem, j, matcher, matchedCount = 0, i = '0', unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find['TAG']('*', outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
                            if (outermost) {
                                outermostContext = context === document || context || outermost;
                            }
                            for (; i !== len && (elem = elems[i]) != null; i++) {
                                if (byElement && elem) {
                                    j = 0;
                                    if (!context && elem.ownerDocument !== document) {
                                        setDocument(elem);
                                        xml = !documentIsHTML;
                                    }
                                    while (matcher = elementMatchers[j++]) {
                                        if (matcher(elem, context || document, xml)) {
                                            results.push(elem);
                                            break;
                                        }
                                    }
                                    if (outermost) {
                                        dirruns = dirrunsUnique;
                                    }
                                }
                                if (bySet) {
                                    if (elem = !matcher && elem) {
                                        matchedCount--;
                                    }
                                    if (seed) {
                                        unmatched.push(elem);
                                    }
                                }
                            }
                            matchedCount += i;
                            if (bySet && i !== matchedCount) {
                                j = 0;
                                while (matcher = setMatchers[j++]) {
                                    matcher(unmatched, setMatched, context, xml);
                                }
                                if (seed) {
                                    if (matchedCount > 0) {
                                        while (i--) {
                                            if (!(unmatched[i] || setMatched[i])) {
                                                setMatched[i] = pop.call(results);
                                            }
                                        }
                                    }
                                    setMatched = condense(setMatched);
                                }
                                push.apply(results, setMatched);
                                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                                    Sizzle.uniqueSort(results);
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                outermostContext = contextBackup;
                            }
                            return unmatched;
                        };
                    return bySet ? markFunction(superMatcher) : superMatcher;
                }
                compile = Sizzle.compile = function (selector, match) {
                    var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
                    if (!cached) {
                        if (!match) {
                            match = tokenize(selector);
                        }
                        i = match.length;
                        while (i--) {
                            cached = matcherFromTokens(match[i]);
                            if (cached[expando]) {
                                setMatchers.push(cached);
                            } else {
                                elementMatchers.push(cached);
                            }
                        }
                        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                        cached.selector = selector;
                    }
                    return cached;
                };
                select = Sizzle.select = function (selector, context, results, seed) {
                    var i, tokens, token, type, find, compiled = typeof selector === 'function' && selector, match = !seed && tokenize(selector = compiled.selector || selector);
                    results = results || [];
                    if (match.length === 1) {
                        tokens = match[0] = match[0].slice(0);
                        if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                            context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
                            if (!context) {
                                return results;
                            } else if (compiled) {
                                context = context.parentNode;
                            }
                            selector = selector.slice(tokens.shift().value.length);
                        }
                        i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
                        while (i--) {
                            token = tokens[i];
                            if (Expr.relative[type = token.type]) {
                                break;
                            }
                            if (find = Expr.find[type]) {
                                if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                                    tokens.splice(i, 1);
                                    selector = seed.length && toSelector(tokens);
                                    if (!selector) {
                                        push.apply(results, seed);
                                        return results;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
                    return results;
                };
                support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
                support.detectDuplicates = !!hasDuplicate;
                setDocument();
                support.sortDetached = assert(function (el) {
                    return el.compareDocumentPosition(document.createElement('fieldset')) & 1;
                });
                if (!assert(function (el) {
                        el.innerHTML = '<a href=\'#\'></a>';
                        return el.firstChild.getAttribute('href') === '#';
                    })) {
                    addHandle('type|href|height|width', function (elem, name, isXML) {
                        if (!isXML) {
                            return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
                        }
                    });
                }
                if (!support.attributes || !assert(function (el) {
                        el.innerHTML = '<input/>';
                        el.firstChild.setAttribute('value', '');
                        return el.firstChild.getAttribute('value') === '';
                    })) {
                    addHandle('value', function (elem, name, isXML) {
                        if (!isXML && elem.nodeName.toLowerCase() === 'input') {
                            return elem.defaultValue;
                        }
                    });
                }
                if (!assert(function (el) {
                        return el.getAttribute('disabled') == null;
                    })) {
                    addHandle(booleans, function (elem, name, isXML) {
                        var val;
                        if (!isXML) {
                            return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                        }
                    });
                }
                return Sizzle;
            }(window);
            jQuery.find = Sizzle;
            jQuery.expr = Sizzle.selectors;
            jQuery.expr[':'] = jQuery.expr.pseudos;
            jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
            jQuery.text = Sizzle.getText;
            jQuery.isXMLDoc = Sizzle.isXML;
            jQuery.contains = Sizzle.contains;
            jQuery.escapeSelector = Sizzle.escape;
            var dir = function (elem, dir, until) {
                var matched = [], truncate = until !== undefined;
                while ((elem = elem[dir]) && elem.nodeType !== 9) {
                    if (elem.nodeType === 1) {
                        if (truncate && jQuery(elem).is(until)) {
                            break;
                        }
                        matched.push(elem);
                    }
                }
                return matched;
            };
            var siblings = function (n, elem) {
                var matched = [];
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        matched.push(n);
                    }
                }
                return matched;
            };
            var rneedsContext = jQuery.expr.match.needsContext;
            var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            var risSimple = /^.[^:#\[\.,]*$/;
            function winnow(elements, qualifier, not) {
                if (jQuery.isFunction(qualifier)) {
                    return jQuery.grep(elements, function (elem, i) {
                        return !!qualifier.call(elem, i, elem) !== not;
                    });
                }
                if (qualifier.nodeType) {
                    return jQuery.grep(elements, function (elem) {
                        return elem === qualifier !== not;
                    });
                }
                if (typeof qualifier === 'string') {
                    if (risSimple.test(qualifier)) {
                        return jQuery.filter(qualifier, elements, not);
                    }
                    qualifier = jQuery.filter(qualifier, elements);
                }
                return jQuery.grep(elements, function (elem) {
                    return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
                });
            }
            jQuery.filter = function (expr, elems, not) {
                var elem = elems[0];
                if (not) {
                    expr = ':not(' + expr + ')';
                }
                return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                    return elem.nodeType === 1;
                }));
            };
            jQuery.fn.extend({
                find: function (selector) {
                    var i, ret, len = this.length, self = this;
                    if (typeof selector !== 'string') {
                        return this.pushStack(jQuery(selector).filter(function () {
                            for (i = 0; i < len; i++) {
                                if (jQuery.contains(self[i], this)) {
                                    return true;
                                }
                            }
                        }));
                    }
                    ret = this.pushStack([]);
                    for (i = 0; i < len; i++) {
                        jQuery.find(selector, self[i], ret);
                    }
                    return len > 1 ? jQuery.uniqueSort(ret) : ret;
                },
                filter: function (selector) {
                    return this.pushStack(winnow(this, selector || [], false));
                },
                not: function (selector) {
                    return this.pushStack(winnow(this, selector || [], true));
                },
                is: function (selector) {
                    return !!winnow(this, typeof selector === 'string' && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
                }
            });
            var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function (selector, context, root) {
                    var match, elem;
                    if (!selector) {
                        return this;
                    }
                    root = root || rootjQuery;
                    if (typeof selector === 'string') {
                        if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
                            match = [
                                null,
                                selector,
                                null
                            ];
                        } else {
                            match = rquickExpr.exec(selector);
                        }
                        if (match && (match[1] || !context)) {
                            if (match[1]) {
                                context = context instanceof jQuery ? context[0] : context;
                                jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                                if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                                    for (match in context) {
                                        if (jQuery.isFunction(this[match])) {
                                            this[match](context[match]);
                                        } else {
                                            this.attr(match, context[match]);
                                        }
                                    }
                                }
                                return this;
                            } else {
                                elem = document.getElementById(match[2]);
                                if (elem) {
                                    this[0] = elem;
                                    this.length = 1;
                                }
                                return this;
                            }
                        } else if (!context || context.jquery) {
                            return (context || root).find(selector);
                        } else {
                            return this.constructor(context).find(selector);
                        }
                    } else if (selector.nodeType) {
                        this[0] = selector;
                        this.length = 1;
                        return this;
                    } else if (jQuery.isFunction(selector)) {
                        return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
                    }
                    return jQuery.makeArray(selector, this);
                };
            init.prototype = jQuery.fn;
            rootjQuery = jQuery(document);
            var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
                    children: true,
                    contents: true,
                    next: true,
                    prev: true
                };
            jQuery.fn.extend({
                has: function (target) {
                    var targets = jQuery(target, this), l = targets.length;
                    return this.filter(function () {
                        var i = 0;
                        for (; i < l; i++) {
                            if (jQuery.contains(this, targets[i])) {
                                return true;
                            }
                        }
                    });
                },
                closest: function (selectors, context) {
                    var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== 'string' && jQuery(selectors);
                    if (!rneedsContext.test(selectors)) {
                        for (; i < l; i++) {
                            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                                if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                                    matched.push(cur);
                                    break;
                                }
                            }
                        }
                    }
                    return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
                },
                index: function (elem) {
                    if (!elem) {
                        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                    }
                    if (typeof elem === 'string') {
                        return indexOf.call(jQuery(elem), this[0]);
                    }
                    return indexOf.call(this, elem.jquery ? elem[0] : elem);
                },
                add: function (selector, context) {
                    return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
                },
                addBack: function (selector) {
                    return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
                }
            });
            function sibling(cur, dir) {
                while ((cur = cur[dir]) && cur.nodeType !== 1) {
                }
                return cur;
            }
            jQuery.each({
                parent: function (elem) {
                    var parent = elem.parentNode;
                    return parent && parent.nodeType !== 11 ? parent : null;
                },
                parents: function (elem) {
                    return dir(elem, 'parentNode');
                },
                parentsUntil: function (elem, i, until) {
                    return dir(elem, 'parentNode', until);
                },
                next: function (elem) {
                    return sibling(elem, 'nextSibling');
                },
                prev: function (elem) {
                    return sibling(elem, 'previousSibling');
                },
                nextAll: function (elem) {
                    return dir(elem, 'nextSibling');
                },
                prevAll: function (elem) {
                    return dir(elem, 'previousSibling');
                },
                nextUntil: function (elem, i, until) {
                    return dir(elem, 'nextSibling', until);
                },
                prevUntil: function (elem, i, until) {
                    return dir(elem, 'previousSibling', until);
                },
                siblings: function (elem) {
                    return siblings((elem.parentNode || {}).firstChild, elem);
                },
                children: function (elem) {
                    return siblings(elem.firstChild);
                },
                contents: function (elem) {
                    return elem.contentDocument || jQuery.merge([], elem.childNodes);
                }
            }, function (name, fn) {
                jQuery.fn[name] = function (until, selector) {
                    var matched = jQuery.map(this, fn, until);
                    if (name.slice(-5) !== 'Until') {
                        selector = until;
                    }
                    if (selector && typeof selector === 'string') {
                        matched = jQuery.filter(selector, matched);
                    }
                    if (this.length > 1) {
                        if (!guaranteedUnique[name]) {
                            jQuery.uniqueSort(matched);
                        }
                        if (rparentsprev.test(name)) {
                            matched.reverse();
                        }
                    }
                    return this.pushStack(matched);
                };
            });
            var rnotwhite = /\S+/g;
            function createOptions(options) {
                var object = {};
                jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
                    object[flag] = true;
                });
                return object;
            }
            jQuery.Callbacks = function (options) {
                options = typeof options === 'string' ? createOptions(options) : jQuery.extend({}, options);
                var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function () {
                        locked = options.once;
                        fired = firing = true;
                        for (; queue.length; firingIndex = -1) {
                            memory = queue.shift();
                            while (++firingIndex < list.length) {
                                if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                                    firingIndex = list.length;
                                    memory = false;
                                }
                            }
                        }
                        if (!options.memory) {
                            memory = false;
                        }
                        firing = false;
                        if (locked) {
                            if (memory) {
                                list = [];
                            } else {
                                list = '';
                            }
                        }
                    }, self = {
                        add: function () {
                            if (list) {
                                if (memory && !firing) {
                                    firingIndex = list.length - 1;
                                    queue.push(memory);
                                }
                                (function add(args) {
                                    jQuery.each(args, function (_, arg) {
                                        if (jQuery.isFunction(arg)) {
                                            if (!options.unique || !self.has(arg)) {
                                                list.push(arg);
                                            }
                                        } else if (arg && arg.length && jQuery.type(arg) !== 'string') {
                                            add(arg);
                                        }
                                    });
                                }(arguments));
                                if (memory && !firing) {
                                    fire();
                                }
                            }
                            return this;
                        },
                        remove: function () {
                            jQuery.each(arguments, function (_, arg) {
                                var index;
                                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                    list.splice(index, 1);
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            });
                            return this;
                        },
                        has: function (fn) {
                            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
                        },
                        empty: function () {
                            if (list) {
                                list = [];
                            }
                            return this;
                        },
                        disable: function () {
                            locked = queue = [];
                            list = memory = '';
                            return this;
                        },
                        disabled: function () {
                            return !list;
                        },
                        lock: function () {
                            locked = queue = [];
                            if (!memory && !firing) {
                                list = memory = '';
                            }
                            return this;
                        },
                        locked: function () {
                            return !!locked;
                        },
                        fireWith: function (context, args) {
                            if (!locked) {
                                args = args || [];
                                args = [
                                    context,
                                    args.slice ? args.slice() : args
                                ];
                                queue.push(args);
                                if (!firing) {
                                    fire();
                                }
                            }
                            return this;
                        },
                        fire: function () {
                            self.fireWith(this, arguments);
                            return this;
                        },
                        fired: function () {
                            return !!fired;
                        }
                    };
                return self;
            };
            function Identity(v) {
                return v;
            }
            function Thrower(ex) {
                throw ex;
            }
            function adoptValue(value, resolve, reject) {
                var method;
                try {
                    if (value && jQuery.isFunction(method = value.promise)) {
                        method.call(value).done(resolve).fail(reject);
                    } else if (value && jQuery.isFunction(method = value.then)) {
                        method.call(value, resolve, reject);
                    } else {
                        resolve.call(undefined, value);
                    }
                } catch (value) {
                    reject.call(undefined, value);
                }
            }
            jQuery.extend({
                Deferred: function (func) {
                    var tuples = [
                            [
                                'notify',
                                'progress',
                                jQuery.Callbacks('memory'),
                                jQuery.Callbacks('memory'),
                                2
                            ],
                            [
                                'resolve',
                                'done',
                                jQuery.Callbacks('once memory'),
                                jQuery.Callbacks('once memory'),
                                0,
                                'resolved'
                            ],
                            [
                                'reject',
                                'fail',
                                jQuery.Callbacks('once memory'),
                                jQuery.Callbacks('once memory'),
                                1,
                                'rejected'
                            ]
                        ], state = 'pending', promise = {
                            state: function () {
                                return state;
                            },
                            always: function () {
                                deferred.done(arguments).fail(arguments);
                                return this;
                            },
                            'catch': function (fn) {
                                return promise.then(null, fn);
                            },
                            pipe: function () {
                                var fns = arguments;
                                return jQuery.Deferred(function (newDefer) {
                                    jQuery.each(tuples, function (i, tuple) {
                                        var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                        deferred[tuple[1]](function () {
                                            var returned = fn && fn.apply(this, arguments);
                                            if (returned && jQuery.isFunction(returned.promise)) {
                                                returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                                            } else {
                                                newDefer[tuple[0] + 'With'](this, fn ? [returned] : arguments);
                                            }
                                        });
                                    });
                                    fns = null;
                                }).promise();
                            },
                            then: function (onFulfilled, onRejected, onProgress) {
                                var maxDepth = 0;
                                function resolve(depth, deferred, handler, special) {
                                    return function () {
                                        var that = this, args = arguments, mightThrow = function () {
                                                var returned, then;
                                                if (depth < maxDepth) {
                                                    return;
                                                }
                                                returned = handler.apply(that, args);
                                                if (returned === deferred.promise()) {
                                                    throw new TypeError('Thenable self-resolution');
                                                }
                                                then = returned && (typeof returned === 'object' || typeof returned === 'function') && returned.then;
                                                if (jQuery.isFunction(then)) {
                                                    if (special) {
                                                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                                                    } else {
                                                        maxDepth++;
                                                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                                                    }
                                                } else {
                                                    if (handler !== Identity) {
                                                        that = undefined;
                                                        args = [returned];
                                                    }
                                                    (special || deferred.resolveWith)(that, args);
                                                }
                                            }, process = special ? mightThrow : function () {
                                                try {
                                                    mightThrow();
                                                } catch (e) {
                                                    if (jQuery.Deferred.exceptionHook) {
                                                        jQuery.Deferred.exceptionHook(e, process.stackTrace);
                                                    }
                                                    if (depth + 1 >= maxDepth) {
                                                        if (handler !== Thrower) {
                                                            that = undefined;
                                                            args = [e];
                                                        }
                                                        deferred.rejectWith(that, args);
                                                    }
                                                }
                                            };
                                        if (depth) {
                                            process();
                                        } else {
                                            if (jQuery.Deferred.getStackHook) {
                                                process.stackTrace = jQuery.Deferred.getStackHook();
                                            }
                                            window.setTimeout(process);
                                        }
                                    };
                                }
                                return jQuery.Deferred(function (newDefer) {
                                    tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));
                                    tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));
                                    tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
                                }).promise();
                            },
                            promise: function (obj) {
                                return obj != null ? jQuery.extend(obj, promise) : promise;
                            }
                        }, deferred = {};
                    jQuery.each(tuples, function (i, tuple) {
                        var list = tuple[2], stateString = tuple[5];
                        promise[tuple[1]] = list.add;
                        if (stateString) {
                            list.add(function () {
                                state = stateString;
                            }, tuples[3 - i][2].disable, tuples[0][2].lock);
                        }
                        list.add(tuple[3].fire);
                        deferred[tuple[0]] = function () {
                            deferred[tuple[0] + 'With'](this === deferred ? undefined : this, arguments);
                            return this;
                        };
                        deferred[tuple[0] + 'With'] = list.fireWith;
                    });
                    promise.promise(deferred);
                    if (func) {
                        func.call(deferred, deferred);
                    }
                    return deferred;
                },
                when: function (singleValue) {
                    var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), master = jQuery.Deferred(), updateFunc = function (i) {
                            return function (value) {
                                resolveContexts[i] = this;
                                resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                                if (!--remaining) {
                                    master.resolveWith(resolveContexts, resolveValues);
                                }
                            };
                        };
                    if (remaining <= 1) {
                        adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);
                        if (master.state() === 'pending' || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
                            return master.then();
                        }
                    }
                    while (i--) {
                        adoptValue(resolveValues[i], updateFunc(i), master.reject);
                    }
                    return master.promise();
                }
            });
            var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            jQuery.Deferred.exceptionHook = function (error, stack) {
                if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
                    window.console.warn('jQuery.Deferred exception: ' + error.message, error.stack, stack);
                }
            };
            jQuery.readyException = function (error) {
                window.setTimeout(function () {
                    throw error;
                });
            };
            var readyList = jQuery.Deferred();
            jQuery.fn.ready = function (fn) {
                readyList.then(fn).catch(function (error) {
                    jQuery.readyException(error);
                });
                return this;
            };
            jQuery.extend({
                isReady: false,
                readyWait: 1,
                holdReady: function (hold) {
                    if (hold) {
                        jQuery.readyWait++;
                    } else {
                        jQuery.ready(true);
                    }
                },
                ready: function (wait) {
                    if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                        return;
                    }
                    jQuery.isReady = true;
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }
                    readyList.resolveWith(document, [jQuery]);
                }
            });
            jQuery.ready.then = readyList.then;
            function completed() {
                document.removeEventListener('DOMContentLoaded', completed);
                window.removeEventListener('load', completed);
                jQuery.ready();
            }
            if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
                window.setTimeout(jQuery.ready);
            } else {
                document.addEventListener('DOMContentLoaded', completed);
                window.addEventListener('load', completed);
            }
            var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
                var i = 0, len = elems.length, bulk = key == null;
                if (jQuery.type(key) === 'object') {
                    chainable = true;
                    for (i in key) {
                        access(elems, fn, i, key[i], true, emptyGet, raw);
                    }
                } else if (value !== undefined) {
                    chainable = true;
                    if (!jQuery.isFunction(value)) {
                        raw = true;
                    }
                    if (bulk) {
                        if (raw) {
                            fn.call(elems, value);
                            fn = null;
                        } else {
                            bulk = fn;
                            fn = function (elem, key, value) {
                                return bulk.call(jQuery(elem), value);
                            };
                        }
                    }
                    if (fn) {
                        for (; i < len; i++) {
                            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                        }
                    }
                }
                return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
            };
            var acceptData = function (owner) {
                return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
            };
            function Data() {
                this.expando = jQuery.expando + Data.uid++;
            }
            Data.uid = 1;
            Data.prototype = {
                cache: function (owner) {
                    var value = owner[this.expando];
                    if (!value) {
                        value = {};
                        if (acceptData(owner)) {
                            if (owner.nodeType) {
                                owner[this.expando] = value;
                            } else {
                                Object.defineProperty(owner, this.expando, {
                                    value: value,
                                    configurable: true
                                });
                            }
                        }
                    }
                    return value;
                },
                set: function (owner, data, value) {
                    var prop, cache = this.cache(owner);
                    if (typeof data === 'string') {
                        cache[jQuery.camelCase(data)] = value;
                    } else {
                        for (prop in data) {
                            cache[jQuery.camelCase(prop)] = data[prop];
                        }
                    }
                    return cache;
                },
                get: function (owner, key) {
                    return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
                },
                access: function (owner, key, value) {
                    if (key === undefined || key && typeof key === 'string' && value === undefined) {
                        return this.get(owner, key);
                    }
                    this.set(owner, key, value);
                    return value !== undefined ? value : key;
                },
                remove: function (owner, key) {
                    var i, cache = owner[this.expando];
                    if (cache === undefined) {
                        return;
                    }
                    if (key !== undefined) {
                        if (jQuery.isArray(key)) {
                            key = key.map(jQuery.camelCase);
                        } else {
                            key = jQuery.camelCase(key);
                            key = key in cache ? [key] : key.match(rnotwhite) || [];
                        }
                        i = key.length;
                        while (i--) {
                            delete cache[key[i]];
                        }
                    }
                    if (key === undefined || jQuery.isEmptyObject(cache)) {
                        if (owner.nodeType) {
                            owner[this.expando] = undefined;
                        } else {
                            delete owner[this.expando];
                        }
                    }
                },
                hasData: function (owner) {
                    var cache = owner[this.expando];
                    return cache !== undefined && !jQuery.isEmptyObject(cache);
                }
            };
            var dataPriv = new Data();
            var dataUser = new Data();
            var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
            function dataAttr(elem, key, data) {
                var name;
                if (data === undefined && elem.nodeType === 1) {
                    name = 'data-' + key.replace(rmultiDash, '-$&').toLowerCase();
                    data = elem.getAttribute(name);
                    if (typeof data === 'string') {
                        try {
                            data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : +data + '' === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
                        } catch (e) {
                        }
                        dataUser.set(elem, key, data);
                    } else {
                        data = undefined;
                    }
                }
                return data;
            }
            jQuery.extend({
                hasData: function (elem) {
                    return dataUser.hasData(elem) || dataPriv.hasData(elem);
                },
                data: function (elem, name, data) {
                    return dataUser.access(elem, name, data);
                },
                removeData: function (elem, name) {
                    dataUser.remove(elem, name);
                },
                _data: function (elem, name, data) {
                    return dataPriv.access(elem, name, data);
                },
                _removeData: function (elem, name) {
                    dataPriv.remove(elem, name);
                }
            });
            jQuery.fn.extend({
                data: function (key, value) {
                    var i, name, data, elem = this[0], attrs = elem && elem.attributes;
                    if (key === undefined) {
                        if (this.length) {
                            data = dataUser.get(elem);
                            if (elem.nodeType === 1 && !dataPriv.get(elem, 'hasDataAttrs')) {
                                i = attrs.length;
                                while (i--) {
                                    if (attrs[i]) {
                                        name = attrs[i].name;
                                        if (name.indexOf('data-') === 0) {
                                            name = jQuery.camelCase(name.slice(5));
                                            dataAttr(elem, name, data[name]);
                                        }
                                    }
                                }
                                dataPriv.set(elem, 'hasDataAttrs', true);
                            }
                        }
                        return data;
                    }
                    if (typeof key === 'object') {
                        return this.each(function () {
                            dataUser.set(this, key);
                        });
                    }
                    return access(this, function (value) {
                        var data;
                        if (elem && value === undefined) {
                            data = dataUser.get(elem, key);
                            if (data !== undefined) {
                                return data;
                            }
                            data = dataAttr(elem, key);
                            if (data !== undefined) {
                                return data;
                            }
                            return;
                        }
                        this.each(function () {
                            dataUser.set(this, key, value);
                        });
                    }, null, value, arguments.length > 1, null, true);
                },
                removeData: function (key) {
                    return this.each(function () {
                        dataUser.remove(this, key);
                    });
                }
            });
            jQuery.extend({
                queue: function (elem, type, data) {
                    var queue;
                    if (elem) {
                        type = (type || 'fx') + 'queue';
                        queue = dataPriv.get(elem, type);
                        if (data) {
                            if (!queue || jQuery.isArray(data)) {
                                queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                            } else {
                                queue.push(data);
                            }
                        }
                        return queue || [];
                    }
                },
                dequeue: function (elem, type) {
                    type = type || 'fx';
                    var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
                            jQuery.dequeue(elem, type);
                        };
                    if (fn === 'inprogress') {
                        fn = queue.shift();
                        startLength--;
                    }
                    if (fn) {
                        if (type === 'fx') {
                            queue.unshift('inprogress');
                        }
                        delete hooks.stop;
                        fn.call(elem, next, hooks);
                    }
                    if (!startLength && hooks) {
                        hooks.empty.fire();
                    }
                },
                _queueHooks: function (elem, type) {
                    var key = type + 'queueHooks';
                    return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                        empty: jQuery.Callbacks('once memory').add(function () {
                            dataPriv.remove(elem, [
                                type + 'queue',
                                key
                            ]);
                        })
                    });
                }
            });
            jQuery.fn.extend({
                queue: function (type, data) {
                    var setter = 2;
                    if (typeof type !== 'string') {
                        data = type;
                        type = 'fx';
                        setter--;
                    }
                    if (arguments.length < setter) {
                        return jQuery.queue(this[0], type);
                    }
                    return data === undefined ? this : this.each(function () {
                        var queue = jQuery.queue(this, type, data);
                        jQuery._queueHooks(this, type);
                        if (type === 'fx' && queue[0] !== 'inprogress') {
                            jQuery.dequeue(this, type);
                        }
                    });
                },
                dequeue: function (type) {
                    return this.each(function () {
                        jQuery.dequeue(this, type);
                    });
                },
                clearQueue: function (type) {
                    return this.queue(type || 'fx', []);
                },
                promise: function (type, obj) {
                    var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
                            if (!--count) {
                                defer.resolveWith(elements, [elements]);
                            }
                        };
                    if (typeof type !== 'string') {
                        obj = type;
                        type = undefined;
                    }
                    type = type || 'fx';
                    while (i--) {
                        tmp = dataPriv.get(elements[i], type + 'queueHooks');
                        if (tmp && tmp.empty) {
                            count++;
                            tmp.empty.add(resolve);
                        }
                    }
                    resolve();
                    return defer.promise(obj);
                }
            });
            var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
            var rcssNum = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i');
            var cssExpand = [
                'Top',
                'Right',
                'Bottom',
                'Left'
            ];
            var isHiddenWithinTree = function (elem, el) {
                elem = el || elem;
                return elem.style.display === 'none' || elem.style.display === '' && jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, 'display') === 'none';
            };
            var swap = function (elem, options, callback, args) {
                var ret, name, old = {};
                for (name in options) {
                    old[name] = elem.style[name];
                    elem.style[name] = options[name];
                }
                ret = callback.apply(elem, args || []);
                for (name in options) {
                    elem.style[name] = old[name];
                }
                return ret;
            };
            function adjustCSS(elem, prop, valueParts, tween) {
                var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function () {
                        return tween.cur();
                    } : function () {
                        return jQuery.css(elem, prop, '');
                    }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? '' : 'px'), initialInUnit = (jQuery.cssNumber[prop] || unit !== 'px' && +initial) && rcssNum.exec(jQuery.css(elem, prop));
                if (initialInUnit && initialInUnit[3] !== unit) {
                    unit = unit || initialInUnit[3];
                    valueParts = valueParts || [];
                    initialInUnit = +initial || 1;
                    do {
                        scale = scale || '.5';
                        initialInUnit = initialInUnit / scale;
                        jQuery.style(elem, prop, initialInUnit + unit);
                    } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
                }
                if (valueParts) {
                    initialInUnit = +initialInUnit || +initial || 0;
                    adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
                    if (tween) {
                        tween.unit = unit;
                        tween.start = initialInUnit;
                        tween.end = adjusted;
                    }
                }
                return adjusted;
            }
            var defaultDisplayMap = {};
            function getDefaultDisplay(elem) {
                var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
                if (display) {
                    return display;
                }
                temp = doc.body.appendChild(doc.createElement(nodeName)), display = jQuery.css(temp, 'display');
                temp.parentNode.removeChild(temp);
                if (display === 'none') {
                    display = 'block';
                }
                defaultDisplayMap[nodeName] = display;
                return display;
            }
            function showHide(elements, show) {
                var display, elem, values = [], index = 0, length = elements.length;
                for (; index < length; index++) {
                    elem = elements[index];
                    if (!elem.style) {
                        continue;
                    }
                    display = elem.style.display;
                    if (show) {
                        if (display === 'none') {
                            values[index] = dataPriv.get(elem, 'display') || null;
                            if (!values[index]) {
                                elem.style.display = '';
                            }
                        }
                        if (elem.style.display === '' && isHiddenWithinTree(elem)) {
                            values[index] = getDefaultDisplay(elem);
                        }
                    } else {
                        if (display !== 'none') {
                            values[index] = 'none';
                            dataPriv.set(elem, 'display', display);
                        }
                    }
                }
                for (index = 0; index < length; index++) {
                    if (values[index] != null) {
                        elements[index].style.display = values[index];
                    }
                }
                return elements;
            }
            jQuery.fn.extend({
                show: function () {
                    return showHide(this, true);
                },
                hide: function () {
                    return showHide(this);
                },
                toggle: function (state) {
                    if (typeof state === 'boolean') {
                        return state ? this.show() : this.hide();
                    }
                    return this.each(function () {
                        if (isHiddenWithinTree(this)) {
                            jQuery(this).show();
                        } else {
                            jQuery(this).hide();
                        }
                    });
                }
            });
            var rcheckableType = /^(?:checkbox|radio)$/i;
            var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
            var rscriptType = /^$|\/(?:java|ecma)script/i;
            var wrapMap = {
                option: [
                    1,
                    '<select multiple=\'multiple\'>',
                    '</select>'
                ],
                thead: [
                    1,
                    '<table>',
                    '</table>'
                ],
                col: [
                    2,
                    '<table><colgroup>',
                    '</colgroup></table>'
                ],
                tr: [
                    2,
                    '<table><tbody>',
                    '</tbody></table>'
                ],
                td: [
                    3,
                    '<table><tbody><tr>',
                    '</tr></tbody></table>'
                ],
                _default: [
                    0,
                    '',
                    ''
                ]
            };
            wrapMap.optgroup = wrapMap.option;
            wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
            wrapMap.th = wrapMap.td;
            function getAll(context, tag) {
                var ret = typeof context.getElementsByTagName !== 'undefined' ? context.getElementsByTagName(tag || '*') : typeof context.querySelectorAll !== 'undefined' ? context.querySelectorAll(tag || '*') : [];
                return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
            }
            function setGlobalEval(elems, refElements) {
                var i = 0, l = elems.length;
                for (; i < l; i++) {
                    dataPriv.set(elems[i], 'globalEval', !refElements || dataPriv.get(refElements[i], 'globalEval'));
                }
            }
            var rhtml = /<|&#?\w+;/;
            function buildFragment(elems, context, scripts, selection, ignored) {
                var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
                for (; i < l; i++) {
                    elem = elems[i];
                    if (elem || elem === 0) {
                        if (jQuery.type(elem) === 'object') {
                            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                        } else if (!rhtml.test(elem)) {
                            nodes.push(context.createTextNode(elem));
                        } else {
                            tmp = tmp || fragment.appendChild(context.createElement('div'));
                            tag = (rtagName.exec(elem) || [
                                '',
                                ''
                            ])[1].toLowerCase();
                            wrap = wrapMap[tag] || wrapMap._default;
                            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                            j = wrap[0];
                            while (j--) {
                                tmp = tmp.lastChild;
                            }
                            jQuery.merge(nodes, tmp.childNodes);
                            tmp = fragment.firstChild;
                            tmp.textContent = '';
                        }
                    }
                }
                fragment.textContent = '';
                i = 0;
                while (elem = nodes[i++]) {
                    if (selection && jQuery.inArray(elem, selection) > -1) {
                        if (ignored) {
                            ignored.push(elem);
                        }
                        continue;
                    }
                    contains = jQuery.contains(elem.ownerDocument, elem);
                    tmp = getAll(fragment.appendChild(elem), 'script');
                    if (contains) {
                        setGlobalEval(tmp);
                    }
                    if (scripts) {
                        j = 0;
                        while (elem = tmp[j++]) {
                            if (rscriptType.test(elem.type || '')) {
                                scripts.push(elem);
                            }
                        }
                    }
                }
                return fragment;
            }
            (function () {
                var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement('div')), input = document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('checked', 'checked');
                input.setAttribute('name', 't');
                div.appendChild(input);
                support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
                div.innerHTML = '<textarea>x</textarea>';
                support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
            }());
            var documentElement = document.documentElement;
            var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
            function returnTrue() {
                return true;
            }
            function returnFalse() {
                return false;
            }
            function safeActiveElement() {
                try {
                    return document.activeElement;
                } catch (err) {
                }
            }
            function on(elem, types, selector, data, fn, one) {
                var origFn, type;
                if (typeof types === 'object') {
                    if (typeof selector !== 'string') {
                        data = data || selector;
                        selector = undefined;
                    }
                    for (type in types) {
                        on(elem, type, selector, data, types[type], one);
                    }
                    return elem;
                }
                if (data == null && fn == null) {
                    fn = selector;
                    data = selector = undefined;
                } else if (fn == null) {
                    if (typeof selector === 'string') {
                        fn = data;
                        data = undefined;
                    } else {
                        fn = data;
                        data = selector;
                        selector = undefined;
                    }
                }
                if (fn === false) {
                    fn = returnFalse;
                } else if (!fn) {
                    return elem;
                }
                if (one === 1) {
                    origFn = fn;
                    fn = function (event) {
                        jQuery().off(event);
                        return origFn.apply(this, arguments);
                    };
                    fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
                }
                return elem.each(function () {
                    jQuery.event.add(this, types, fn, data, selector);
                });
            }
            jQuery.event = {
                global: {},
                add: function (elem, types, handler, data, selector) {
                    var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                    if (!elemData) {
                        return;
                    }
                    if (handler.handler) {
                        handleObjIn = handler;
                        handler = handleObjIn.handler;
                        selector = handleObjIn.selector;
                    }
                    if (selector) {
                        jQuery.find.matchesSelector(documentElement, selector);
                    }
                    if (!handler.guid) {
                        handler.guid = jQuery.guid++;
                    }
                    if (!(events = elemData.events)) {
                        events = elemData.events = {};
                    }
                    if (!(eventHandle = elemData.handle)) {
                        eventHandle = elemData.handle = function (e) {
                            return typeof jQuery !== 'undefined' && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
                        };
                    }
                    types = (types || '').match(rnotwhite) || [''];
                    t = types.length;
                    while (t--) {
                        tmp = rtypenamespace.exec(types[t]) || [];
                        type = origType = tmp[1];
                        namespaces = (tmp[2] || '').split('.').sort();
                        if (!type) {
                            continue;
                        }
                        special = jQuery.event.special[type] || {};
                        type = (selector ? special.delegateType : special.bindType) || type;
                        special = jQuery.event.special[type] || {};
                        handleObj = jQuery.extend({
                            type: type,
                            origType: origType,
                            data: data,
                            handler: handler,
                            guid: handler.guid,
                            selector: selector,
                            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                            namespace: namespaces.join('.')
                        }, handleObjIn);
                        if (!(handlers = events[type])) {
                            handlers = events[type] = [];
                            handlers.delegateCount = 0;
                            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                                if (elem.addEventListener) {
                                    elem.addEventListener(type, eventHandle);
                                }
                            }
                        }
                        if (special.add) {
                            special.add.call(elem, handleObj);
                            if (!handleObj.handler.guid) {
                                handleObj.handler.guid = handler.guid;
                            }
                        }
                        if (selector) {
                            handlers.splice(handlers.delegateCount++, 0, handleObj);
                        } else {
                            handlers.push(handleObj);
                        }
                        jQuery.event.global[type] = true;
                    }
                },
                remove: function (elem, types, handler, selector, mappedTypes) {
                    var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                    if (!elemData || !(events = elemData.events)) {
                        return;
                    }
                    types = (types || '').match(rnotwhite) || [''];
                    t = types.length;
                    while (t--) {
                        tmp = rtypenamespace.exec(types[t]) || [];
                        type = origType = tmp[1];
                        namespaces = (tmp[2] || '').split('.').sort();
                        if (!type) {
                            for (type in events) {
                                jQuery.event.remove(elem, type + types[t], handler, selector, true);
                            }
                            continue;
                        }
                        special = jQuery.event.special[type] || {};
                        type = (selector ? special.delegateType : special.bindType) || type;
                        handlers = events[type] || [];
                        tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
                        origCount = j = handlers.length;
                        while (j--) {
                            handleObj = handlers[j];
                            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
                                handlers.splice(j, 1);
                                if (handleObj.selector) {
                                    handlers.delegateCount--;
                                }
                                if (special.remove) {
                                    special.remove.call(elem, handleObj);
                                }
                            }
                        }
                        if (origCount && !handlers.length) {
                            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                                jQuery.removeEvent(elem, type, elemData.handle);
                            }
                            delete events[type];
                        }
                    }
                    if (jQuery.isEmptyObject(events)) {
                        dataPriv.remove(elem, 'handle events');
                    }
                },
                dispatch: function (nativeEvent) {
                    var event = jQuery.event.fix(nativeEvent);
                    var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), handlers = (dataPriv.get(this, 'events') || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
                    args[0] = event;
                    for (i = 1; i < arguments.length; i++) {
                        args[i] = arguments[i];
                    }
                    event.delegateTarget = this;
                    if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                        return;
                    }
                    handlerQueue = jQuery.event.handlers.call(this, event, handlers);
                    i = 0;
                    while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                        event.currentTarget = matched.elem;
                        j = 0;
                        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                            if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                                event.handleObj = handleObj;
                                event.data = handleObj.data;
                                ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                                if (ret !== undefined) {
                                    if ((event.result = ret) === false) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                }
                            }
                        }
                    }
                    if (special.postDispatch) {
                        special.postDispatch.call(this, event);
                    }
                    return event.result;
                },
                handlers: function (event, handlers) {
                    var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
                    if (delegateCount && cur.nodeType && (event.type !== 'click' || isNaN(event.button) || event.button < 1)) {
                        for (; cur !== this; cur = cur.parentNode || this) {
                            if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== 'click')) {
                                matches = [];
                                for (i = 0; i < delegateCount; i++) {
                                    handleObj = handlers[i];
                                    sel = handleObj.selector + ' ';
                                    if (matches[sel] === undefined) {
                                        matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                                    }
                                    if (matches[sel]) {
                                        matches.push(handleObj);
                                    }
                                }
                                if (matches.length) {
                                    handlerQueue.push({
                                        elem: cur,
                                        handlers: matches
                                    });
                                }
                            }
                        }
                    }
                    if (delegateCount < handlers.length) {
                        handlerQueue.push({
                            elem: this,
                            handlers: handlers.slice(delegateCount)
                        });
                    }
                    return handlerQueue;
                },
                addProp: function (name, hook) {
                    Object.defineProperty(jQuery.Event.prototype, name, {
                        enumerable: true,
                        configurable: true,
                        get: jQuery.isFunction(hook) ? function () {
                            if (this.originalEvent) {
                                return hook(this.originalEvent);
                            }
                        } : function () {
                            if (this.originalEvent) {
                                return this.originalEvent[name];
                            }
                        },
                        set: function (value) {
                            Object.defineProperty(this, name, {
                                enumerable: true,
                                configurable: true,
                                writable: true,
                                value: value
                            });
                        }
                    });
                },
                fix: function (originalEvent) {
                    return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
                },
                special: {
                    load: { noBubble: true },
                    focus: {
                        trigger: function () {
                            if (this !== safeActiveElement() && this.focus) {
                                this.focus();
                                return false;
                            }
                        },
                        delegateType: 'focusin'
                    },
                    blur: {
                        trigger: function () {
                            if (this === safeActiveElement() && this.blur) {
                                this.blur();
                                return false;
                            }
                        },
                        delegateType: 'focusout'
                    },
                    click: {
                        trigger: function () {
                            if (this.type === 'checkbox' && this.click && jQuery.nodeName(this, 'input')) {
                                this.click();
                                return false;
                            }
                        },
                        _default: function (event) {
                            return jQuery.nodeName(event.target, 'a');
                        }
                    },
                    beforeunload: {
                        postDispatch: function (event) {
                            if (event.result !== undefined && event.originalEvent) {
                                event.originalEvent.returnValue = event.result;
                            }
                        }
                    }
                }
            };
            jQuery.removeEvent = function (elem, type, handle) {
                if (elem.removeEventListener) {
                    elem.removeEventListener(type, handle);
                }
            };
            jQuery.Event = function (src, props) {
                if (!(this instanceof jQuery.Event)) {
                    return new jQuery.Event(src, props);
                }
                if (src && src.type) {
                    this.originalEvent = src;
                    this.type = src.type;
                    this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
                    this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
                    this.currentTarget = src.currentTarget;
                    this.relatedTarget = src.relatedTarget;
                } else {
                    this.type = src;
                }
                if (props) {
                    jQuery.extend(this, props);
                }
                this.timeStamp = src && src.timeStamp || jQuery.now();
                this[jQuery.expando] = true;
            };
            jQuery.Event.prototype = {
                constructor: jQuery.Event,
                isDefaultPrevented: returnFalse,
                isPropagationStopped: returnFalse,
                isImmediatePropagationStopped: returnFalse,
                isSimulated: false,
                preventDefault: function () {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = returnTrue;
                    if (e && !this.isSimulated) {
                        e.preventDefault();
                    }
                },
                stopPropagation: function () {
                    var e = this.originalEvent;
                    this.isPropagationStopped = returnTrue;
                    if (e && !this.isSimulated) {
                        e.stopPropagation();
                    }
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = returnTrue;
                    if (e && !this.isSimulated) {
                        e.stopImmediatePropagation();
                    }
                    this.stopPropagation();
                }
            };
            jQuery.each({
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
                'char': true,
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
                which: function (event) {
                    var button = event.button;
                    if (event.which == null && rkeyEvent.test(event.type)) {
                        return event.charCode != null ? event.charCode : event.keyCode;
                    }
                    if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                        return button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                    }
                    return event.which;
                }
            }, jQuery.event.addProp);
            jQuery.each({
                mouseenter: 'mouseover',
                mouseleave: 'mouseout',
                pointerenter: 'pointerover',
                pointerleave: 'pointerout'
            }, function (orig, fix) {
                jQuery.event.special[orig] = {
                    delegateType: fix,
                    bindType: fix,
                    handle: function (event) {
                        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                        if (!related || related !== target && !jQuery.contains(target, related)) {
                            event.type = handleObj.origType;
                            ret = handleObj.handler.apply(this, arguments);
                            event.type = fix;
                        }
                        return ret;
                    }
                };
            });
            jQuery.fn.extend({
                on: function (types, selector, data, fn) {
                    return on(this, types, selector, data, fn);
                },
                one: function (types, selector, data, fn) {
                    return on(this, types, selector, data, fn, 1);
                },
                off: function (types, selector, fn) {
                    var handleObj, type;
                    if (types && types.preventDefault && types.handleObj) {
                        handleObj = types.handleObj;
                        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                        return this;
                    }
                    if (typeof types === 'object') {
                        for (type in types) {
                            this.off(type, selector, types[type]);
                        }
                        return this;
                    }
                    if (selector === false || typeof selector === 'function') {
                        fn = selector;
                        selector = undefined;
                    }
                    if (fn === false) {
                        fn = returnFalse;
                    }
                    return this.each(function () {
                        jQuery.event.remove(this, types, fn, selector);
                    });
                }
            });
            var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            function manipulationTarget(elem, content) {
                if (jQuery.nodeName(elem, 'table') && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr')) {
                    return elem.getElementsByTagName('tbody')[0] || elem;
                }
                return elem;
            }
            function disableScript(elem) {
                elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type;
                return elem;
            }
            function restoreScript(elem) {
                var match = rscriptTypeMasked.exec(elem.type);
                if (match) {
                    elem.type = match[1];
                } else {
                    elem.removeAttribute('type');
                }
                return elem;
            }
            function cloneCopyEvent(src, dest) {
                var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
                if (dest.nodeType !== 1) {
                    return;
                }
                if (dataPriv.hasData(src)) {
                    pdataOld = dataPriv.access(src);
                    pdataCur = dataPriv.set(dest, pdataOld);
                    events = pdataOld.events;
                    if (events) {
                        delete pdataCur.handle;
                        pdataCur.events = {};
                        for (type in events) {
                            for (i = 0, l = events[type].length; i < l; i++) {
                                jQuery.event.add(dest, type, events[type][i]);
                            }
                        }
                    }
                }
                if (dataUser.hasData(src)) {
                    udataOld = dataUser.access(src);
                    udataCur = jQuery.extend({}, udataOld);
                    dataUser.set(dest, udataCur);
                }
            }
            function fixInput(src, dest) {
                var nodeName = dest.nodeName.toLowerCase();
                if (nodeName === 'input' && rcheckableType.test(src.type)) {
                    dest.checked = src.checked;
                } else if (nodeName === 'input' || nodeName === 'textarea') {
                    dest.defaultValue = src.defaultValue;
                }
            }
            function domManip(collection, args, callback, ignored) {
                args = concat.apply([], args);
                var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
                if (isFunction || l > 1 && typeof value === 'string' && !support.checkClone && rchecked.test(value)) {
                    return collection.each(function (index) {
                        var self = collection.eq(index);
                        if (isFunction) {
                            args[0] = value.call(this, index, self.html());
                        }
                        domManip(self, args, callback, ignored);
                    });
                }
                if (l) {
                    fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                    first = fragment.firstChild;
                    if (fragment.childNodes.length === 1) {
                        fragment = first;
                    }
                    if (first || ignored) {
                        scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
                        hasScripts = scripts.length;
                        for (; i < l; i++) {
                            node = fragment;
                            if (i !== iNoClone) {
                                node = jQuery.clone(node, true, true);
                                if (hasScripts) {
                                    jQuery.merge(scripts, getAll(node, 'script'));
                                }
                            }
                            callback.call(collection[i], node, i);
                        }
                        if (hasScripts) {
                            doc = scripts[scripts.length - 1].ownerDocument;
                            jQuery.map(scripts, restoreScript);
                            for (i = 0; i < hasScripts; i++) {
                                node = scripts[i];
                                if (rscriptType.test(node.type || '') && !dataPriv.access(node, 'globalEval') && jQuery.contains(doc, node)) {
                                    if (node.src) {
                                        if (jQuery._evalUrl) {
                                            jQuery._evalUrl(node.src);
                                        }
                                    } else {
                                        DOMEval(node.textContent.replace(rcleanScript, ''), doc);
                                    }
                                }
                            }
                        }
                    }
                }
                return collection;
            }
            function remove(elem, selector, keepData) {
                var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
                for (; (node = nodes[i]) != null; i++) {
                    if (!keepData && node.nodeType === 1) {
                        jQuery.cleanData(getAll(node));
                    }
                    if (node.parentNode) {
                        if (keepData && jQuery.contains(node.ownerDocument, node)) {
                            setGlobalEval(getAll(node, 'script'));
                        }
                        node.parentNode.removeChild(node);
                    }
                }
                return elem;
            }
            jQuery.extend({
                htmlPrefilter: function (html) {
                    return html.replace(rxhtmlTag, '<$1></$2>');
                },
                clone: function (elem, dataAndEvents, deepDataAndEvents) {
                    var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
                    if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                        destElements = getAll(clone);
                        srcElements = getAll(elem);
                        for (i = 0, l = srcElements.length; i < l; i++) {
                            fixInput(srcElements[i], destElements[i]);
                        }
                    }
                    if (dataAndEvents) {
                        if (deepDataAndEvents) {
                            srcElements = srcElements || getAll(elem);
                            destElements = destElements || getAll(clone);
                            for (i = 0, l = srcElements.length; i < l; i++) {
                                cloneCopyEvent(srcElements[i], destElements[i]);
                            }
                        } else {
                            cloneCopyEvent(elem, clone);
                        }
                    }
                    destElements = getAll(clone, 'script');
                    if (destElements.length > 0) {
                        setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
                    }
                    return clone;
                },
                cleanData: function (elems) {
                    var data, elem, type, special = jQuery.event.special, i = 0;
                    for (; (elem = elems[i]) !== undefined; i++) {
                        if (acceptData(elem)) {
                            if (data = elem[dataPriv.expando]) {
                                if (data.events) {
                                    for (type in data.events) {
                                        if (special[type]) {
                                            jQuery.event.remove(elem, type);
                                        } else {
                                            jQuery.removeEvent(elem, type, data.handle);
                                        }
                                    }
                                }
                                elem[dataPriv.expando] = undefined;
                            }
                            if (elem[dataUser.expando]) {
                                elem[dataUser.expando] = undefined;
                            }
                        }
                    }
                }
            });
            jQuery.fn.extend({
                detach: function (selector) {
                    return remove(this, selector, true);
                },
                remove: function (selector) {
                    return remove(this, selector);
                },
                text: function (value) {
                    return access(this, function (value) {
                        return value === undefined ? jQuery.text(this) : this.empty().each(function () {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                this.textContent = value;
                            }
                        });
                    }, null, value, arguments.length);
                },
                append: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var target = manipulationTarget(this, elem);
                            target.appendChild(elem);
                        }
                    });
                },
                prepend: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var target = manipulationTarget(this, elem);
                            target.insertBefore(elem, target.firstChild);
                        }
                    });
                },
                before: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(elem, this);
                        }
                    });
                },
                after: function () {
                    return domManip(this, arguments, function (elem) {
                        if (this.parentNode) {
                            this.parentNode.insertBefore(elem, this.nextSibling);
                        }
                    });
                },
                empty: function () {
                    var elem, i = 0;
                    for (; (elem = this[i]) != null; i++) {
                        if (elem.nodeType === 1) {
                            jQuery.cleanData(getAll(elem, false));
                            elem.textContent = '';
                        }
                    }
                    return this;
                },
                clone: function (dataAndEvents, deepDataAndEvents) {
                    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                    return this.map(function () {
                        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                    });
                },
                html: function (value) {
                    return access(this, function (value) {
                        var elem = this[0] || {}, i = 0, l = this.length;
                        if (value === undefined && elem.nodeType === 1) {
                            return elem.innerHTML;
                        }
                        if (typeof value === 'string' && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [
                                '',
                                ''
                            ])[1].toLowerCase()]) {
                            value = jQuery.htmlPrefilter(value);
                            try {
                                for (; i < l; i++) {
                                    elem = this[i] || {};
                                    if (elem.nodeType === 1) {
                                        jQuery.cleanData(getAll(elem, false));
                                        elem.innerHTML = value;
                                    }
                                }
                                elem = 0;
                            } catch (e) {
                            }
                        }
                        if (elem) {
                            this.empty().append(value);
                        }
                    }, null, value, arguments.length);
                },
                replaceWith: function () {
                    var ignored = [];
                    return domManip(this, arguments, function (elem) {
                        var parent = this.parentNode;
                        if (jQuery.inArray(this, ignored) < 0) {
                            jQuery.cleanData(getAll(this));
                            if (parent) {
                                parent.replaceChild(elem, this);
                            }
                        }
                    }, ignored);
                }
            });
            jQuery.each({
                appendTo: 'append',
                prependTo: 'prepend',
                insertBefore: 'before',
                insertAfter: 'after',
                replaceAll: 'replaceWith'
            }, function (name, original) {
                jQuery.fn[name] = function (selector) {
                    var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
                    for (; i <= last; i++) {
                        elems = i === last ? this : this.clone(true);
                        jQuery(insert[i])[original](elems);
                        push.apply(ret, elems.get());
                    }
                    return this.pushStack(ret);
                };
            });
            var rmargin = /^margin/;
            var rnumnonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i');
            var getStyles = function (elem) {
                var view = elem.ownerDocument.defaultView;
                if (!view || !view.opener) {
                    view = window;
                }
                return view.getComputedStyle(elem);
            };
            (function () {
                function computeStyleTests() {
                    if (!div) {
                        return;
                    }
                    div.style.cssText = 'box-sizing:border-box;' + 'position:relative;display:block;' + 'margin:auto;border:1px;padding:1px;' + 'top:1%;width:50%';
                    div.innerHTML = '';
                    documentElement.appendChild(container);
                    var divStyle = window.getComputedStyle(div);
                    pixelPositionVal = divStyle.top !== '1%';
                    reliableMarginLeftVal = divStyle.marginLeft === '2px';
                    boxSizingReliableVal = divStyle.width === '4px';
                    div.style.marginRight = '50%';
                    pixelMarginRightVal = divStyle.marginRight === '4px';
                    documentElement.removeChild(container);
                    div = null;
                }
                var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement('div'), div = document.createElement('div');
                if (!div.style) {
                    return;
                }
                div.style.backgroundClip = 'content-box';
                div.cloneNode(true).style.backgroundClip = '';
                support.clearCloneStyle = div.style.backgroundClip === 'content-box';
                container.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;' + 'padding:0;margin-top:1px;position:absolute';
                container.appendChild(div);
                jQuery.extend(support, {
                    pixelPosition: function () {
                        computeStyleTests();
                        return pixelPositionVal;
                    },
                    boxSizingReliable: function () {
                        computeStyleTests();
                        return boxSizingReliableVal;
                    },
                    pixelMarginRight: function () {
                        computeStyleTests();
                        return pixelMarginRightVal;
                    },
                    reliableMarginLeft: function () {
                        computeStyleTests();
                        return reliableMarginLeftVal;
                    }
                });
            }());
            function curCSS(elem, name, computed) {
                var width, minWidth, maxWidth, ret, style = elem.style;
                computed = computed || getStyles(elem);
                if (computed) {
                    ret = computed.getPropertyValue(name) || computed[name];
                    if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
                        ret = jQuery.style(elem, name);
                    }
                    if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
                        width = style.width;
                        minWidth = style.minWidth;
                        maxWidth = style.maxWidth;
                        style.minWidth = style.maxWidth = style.width = ret;
                        ret = computed.width;
                        style.width = width;
                        style.minWidth = minWidth;
                        style.maxWidth = maxWidth;
                    }
                }
                return ret !== undefined ? ret + '' : ret;
            }
            function addGetHookIf(conditionFn, hookFn) {
                return {
                    get: function () {
                        if (conditionFn()) {
                            delete this.get;
                            return;
                        }
                        return (this.get = hookFn).apply(this, arguments);
                    }
                };
            }
            var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = {
                    position: 'absolute',
                    visibility: 'hidden',
                    display: 'block'
                }, cssNormalTransform = {
                    letterSpacing: '0',
                    fontWeight: '400'
                }, cssPrefixes = [
                    'Webkit',
                    'Moz',
                    'ms'
                ], emptyStyle = document.createElement('div').style;
            function vendorPropName(name) {
                if (name in emptyStyle) {
                    return name;
                }
                var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
                while (i--) {
                    name = cssPrefixes[i] + capName;
                    if (name in emptyStyle) {
                        return name;
                    }
                }
            }
            function setPositiveNumber(elem, value, subtract) {
                var matches = rcssNum.exec(value);
                return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || 'px') : value;
            }
            function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
                var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : name === 'width' ? 1 : 0, val = 0;
                for (; i < 4; i += 2) {
                    if (extra === 'margin') {
                        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
                    }
                    if (isBorderBox) {
                        if (extra === 'content') {
                            val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
                        }
                        if (extra !== 'margin') {
                            val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
                        }
                    } else {
                        val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
                        if (extra !== 'padding') {
                            val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
                        }
                    }
                }
                return val;
            }
            function getWidthOrHeight(elem, name, extra) {
                var val, valueIsBorderBox = true, styles = getStyles(elem), isBorderBox = jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
                if (elem.getClientRects().length) {
                    val = elem.getBoundingClientRect()[name];
                }
                if (val <= 0 || val == null) {
                    val = curCSS(elem, name, styles);
                    if (val < 0 || val == null) {
                        val = elem.style[name];
                    }
                    if (rnumnonpx.test(val)) {
                        return val;
                    }
                    valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
                    val = parseFloat(val) || 0;
                }
                return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles) + 'px';
            }
            jQuery.extend({
                cssHooks: {
                    opacity: {
                        get: function (elem, computed) {
                            if (computed) {
                                var ret = curCSS(elem, 'opacity');
                                return ret === '' ? '1' : ret;
                            }
                        }
                    }
                },
                cssNumber: {
                    'animationIterationCount': true,
                    'columnCount': true,
                    'fillOpacity': true,
                    'flexGrow': true,
                    'flexShrink': true,
                    'fontWeight': true,
                    'lineHeight': true,
                    'opacity': true,
                    'order': true,
                    'orphans': true,
                    'widows': true,
                    'zIndex': true,
                    'zoom': true
                },
                cssProps: { 'float': 'cssFloat' },
                style: function (elem, name, value, extra) {
                    if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                        return;
                    }
                    var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                    name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
                    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                    if (value !== undefined) {
                        type = typeof value;
                        if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
                            value = adjustCSS(elem, name, ret);
                            type = 'number';
                        }
                        if (value == null || value !== value) {
                            return;
                        }
                        if (type === 'number') {
                            value += ret && ret[3] || (jQuery.cssNumber[origName] ? '' : 'px');
                        }
                        if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
                            style[name] = 'inherit';
                        }
                        if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                            style[name] = value;
                        }
                    } else {
                        if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                            return ret;
                        }
                        return style[name];
                    }
                },
                css: function (elem, name, extra, styles) {
                    var val, num, hooks, origName = jQuery.camelCase(name);
                    name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
                    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                    if (hooks && 'get' in hooks) {
                        val = hooks.get(elem, true, extra);
                    }
                    if (val === undefined) {
                        val = curCSS(elem, name, styles);
                    }
                    if (val === 'normal' && name in cssNormalTransform) {
                        val = cssNormalTransform[name];
                    }
                    if (extra === '' || extra) {
                        num = parseFloat(val);
                        return extra === true || isFinite(num) ? num || 0 : val;
                    }
                    return val;
                }
            });
            jQuery.each([
                'height',
                'width'
            ], function (i, name) {
                jQuery.cssHooks[name] = {
                    get: function (elem, computed, extra) {
                        if (computed) {
                            return rdisplayswap.test(jQuery.css(elem, 'display')) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
                                return getWidthOrHeight(elem, name, extra);
                            }) : getWidthOrHeight(elem, name, extra);
                        }
                    },
                    set: function (elem, value, extra) {
                        var matches, styles = extra && getStyles(elem), subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles);
                        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || 'px') !== 'px') {
                            elem.style[name] = value;
                            value = jQuery.css(elem, name);
                        }
                        return setPositiveNumber(elem, value, subtract);
                    }
                };
            });
            jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
                if (computed) {
                    return (parseFloat(curCSS(elem, 'marginLeft')) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
                        return elem.getBoundingClientRect().left;
                    })) + 'px';
                }
            });
            jQuery.each({
                margin: '',
                padding: '',
                border: 'Width'
            }, function (prefix, suffix) {
                jQuery.cssHooks[prefix + suffix] = {
                    expand: function (value) {
                        var i = 0, expanded = {}, parts = typeof value === 'string' ? value.split(' ') : [value];
                        for (; i < 4; i++) {
                            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                        }
                        return expanded;
                    }
                };
                if (!rmargin.test(prefix)) {
                    jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
                }
            });
            jQuery.fn.extend({
                css: function (name, value) {
                    return access(this, function (elem, name, value) {
                        var styles, len, map = {}, i = 0;
                        if (jQuery.isArray(name)) {
                            styles = getStyles(elem);
                            len = name.length;
                            for (; i < len; i++) {
                                map[name[i]] = jQuery.css(elem, name[i], false, styles);
                            }
                            return map;
                        }
                        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
                    }, name, value, arguments.length > 1);
                }
            });
            function Tween(elem, options, prop, end, easing) {
                return new Tween.prototype.init(elem, options, prop, end, easing);
            }
            jQuery.Tween = Tween;
            Tween.prototype = {
                constructor: Tween,
                init: function (elem, options, prop, end, easing, unit) {
                    this.elem = elem;
                    this.prop = prop;
                    this.easing = easing || jQuery.easing._default;
                    this.options = options;
                    this.start = this.now = this.cur();
                    this.end = end;
                    this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
                },
                cur: function () {
                    var hooks = Tween.propHooks[this.prop];
                    return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
                },
                run: function (percent) {
                    var eased, hooks = Tween.propHooks[this.prop];
                    if (this.options.duration) {
                        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
                    } else {
                        this.pos = eased = percent;
                    }
                    this.now = (this.end - this.start) * eased + this.start;
                    if (this.options.step) {
                        this.options.step.call(this.elem, this.now, this);
                    }
                    if (hooks && hooks.set) {
                        hooks.set(this);
                    } else {
                        Tween.propHooks._default.set(this);
                    }
                    return this;
                }
            };
            Tween.prototype.init.prototype = Tween.prototype;
            Tween.propHooks = {
                _default: {
                    get: function (tween) {
                        var result;
                        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                            return tween.elem[tween.prop];
                        }
                        result = jQuery.css(tween.elem, tween.prop, '');
                        return !result || result === 'auto' ? 0 : result;
                    },
                    set: function (tween) {
                        if (jQuery.fx.step[tween.prop]) {
                            jQuery.fx.step[tween.prop](tween);
                        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                        } else {
                            tween.elem[tween.prop] = tween.now;
                        }
                    }
                }
            };
            Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
                set: function (tween) {
                    if (tween.elem.nodeType && tween.elem.parentNode) {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            };
            jQuery.easing = {
                linear: function (p) {
                    return p;
                },
                swing: function (p) {
                    return 0.5 - Math.cos(p * Math.PI) / 2;
                },
                _default: 'swing'
            };
            jQuery.fx = Tween.prototype.init;
            jQuery.fx.step = {};
            var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
            function raf() {
                if (timerId) {
                    window.requestAnimationFrame(raf);
                    jQuery.fx.tick();
                }
            }
            function createFxNow() {
                window.setTimeout(function () {
                    fxNow = undefined;
                });
                return fxNow = jQuery.now();
            }
            function genFx(type, includeWidth) {
                var which, i = 0, attrs = { height: type };
                includeWidth = includeWidth ? 1 : 0;
                for (; i < 4; i += 2 - includeWidth) {
                    which = cssExpand[i];
                    attrs['margin' + which] = attrs['padding' + which] = type;
                }
                if (includeWidth) {
                    attrs.opacity = attrs.width = type;
                }
                return attrs;
            }
            function createTween(value, prop, animation) {
                var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners['*']), index = 0, length = collection.length;
                for (; index < length; index++) {
                    if (tween = collection[index].call(animation, prop, value)) {
                        return tween;
                    }
                }
            }
            function defaultPrefilter(elem, props, opts) {
                var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = 'width' in props || 'height' in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, 'fxshow');
                if (!opts.queue) {
                    hooks = jQuery._queueHooks(elem, 'fx');
                    if (hooks.unqueued == null) {
                        hooks.unqueued = 0;
                        oldfire = hooks.empty.fire;
                        hooks.empty.fire = function () {
                            if (!hooks.unqueued) {
                                oldfire();
                            }
                        };
                    }
                    hooks.unqueued++;
                    anim.always(function () {
                        anim.always(function () {
                            hooks.unqueued--;
                            if (!jQuery.queue(elem, 'fx').length) {
                                hooks.empty.fire();
                            }
                        });
                    });
                }
                for (prop in props) {
                    value = props[prop];
                    if (rfxtypes.test(value)) {
                        delete props[prop];
                        toggle = toggle || value === 'toggle';
                        if (value === (hidden ? 'hide' : 'show')) {
                            if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
                                hidden = true;
                            } else {
                                continue;
                            }
                        }
                        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                    }
                }
                propTween = !jQuery.isEmptyObject(props);
                if (!propTween && jQuery.isEmptyObject(orig)) {
                    return;
                }
                if (isBox && elem.nodeType === 1) {
                    opts.overflow = [
                        style.overflow,
                        style.overflowX,
                        style.overflowY
                    ];
                    restoreDisplay = dataShow && dataShow.display;
                    if (restoreDisplay == null) {
                        restoreDisplay = dataPriv.get(elem, 'display');
                    }
                    display = jQuery.css(elem, 'display');
                    if (display === 'none') {
                        if (restoreDisplay) {
                            display = restoreDisplay;
                        } else {
                            showHide([elem], true);
                            restoreDisplay = elem.style.display || restoreDisplay;
                            display = jQuery.css(elem, 'display');
                            showHide([elem]);
                        }
                    }
                    if (display === 'inline' || display === 'inline-block' && restoreDisplay != null) {
                        if (jQuery.css(elem, 'float') === 'none') {
                            if (!propTween) {
                                anim.done(function () {
                                    style.display = restoreDisplay;
                                });
                                if (restoreDisplay == null) {
                                    display = style.display;
                                    restoreDisplay = display === 'none' ? '' : display;
                                }
                            }
                            style.display = 'inline-block';
                        }
                    }
                }
                if (opts.overflow) {
                    style.overflow = 'hidden';
                    anim.always(function () {
                        style.overflow = opts.overflow[0];
                        style.overflowX = opts.overflow[1];
                        style.overflowY = opts.overflow[2];
                    });
                }
                propTween = false;
                for (prop in orig) {
                    if (!propTween) {
                        if (dataShow) {
                            if ('hidden' in dataShow) {
                                hidden = dataShow.hidden;
                            }
                        } else {
                            dataShow = dataPriv.access(elem, 'fxshow', { display: restoreDisplay });
                        }
                        if (toggle) {
                            dataShow.hidden = !hidden;
                        }
                        if (hidden) {
                            showHide([elem], true);
                        }
                        anim.done(function () {
                            if (!hidden) {
                                showHide([elem]);
                            }
                            dataPriv.remove(elem, 'fxshow');
                            for (prop in orig) {
                                jQuery.style(elem, prop, orig[prop]);
                            }
                        });
                    }
                    propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                    if (!(prop in dataShow)) {
                        dataShow[prop] = propTween.start;
                        if (hidden) {
                            propTween.end = propTween.start;
                            propTween.start = 0;
                        }
                    }
                }
            }
            function propFilter(props, specialEasing) {
                var index, name, easing, value, hooks;
                for (index in props) {
                    name = jQuery.camelCase(index);
                    easing = specialEasing[name];
                    value = props[index];
                    if (jQuery.isArray(value)) {
                        easing = value[1];
                        value = props[index] = value[0];
                    }
                    if (index !== name) {
                        props[name] = value;
                        delete props[index];
                    }
                    hooks = jQuery.cssHooks[name];
                    if (hooks && 'expand' in hooks) {
                        value = hooks.expand(value);
                        delete props[name];
                        for (index in value) {
                            if (!(index in props)) {
                                props[index] = value[index];
                                specialEasing[index] = easing;
                            }
                        }
                    } else {
                        specialEasing[name] = easing;
                    }
                }
            }
            function Animation(elem, properties, options) {
                var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function () {
                        delete tick.elem;
                    }), tick = function () {
                        if (stopped) {
                            return false;
                        }
                        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
                        for (; index < length; index++) {
                            animation.tweens[index].run(percent);
                        }
                        deferred.notifyWith(elem, [
                            animation,
                            percent,
                            remaining
                        ]);
                        if (percent < 1 && length) {
                            return remaining;
                        } else {
                            deferred.resolveWith(elem, [animation]);
                            return false;
                        }
                    }, animation = deferred.promise({
                        elem: elem,
                        props: jQuery.extend({}, properties),
                        opts: jQuery.extend(true, {
                            specialEasing: {},
                            easing: jQuery.easing._default
                        }, options),
                        originalProperties: properties,
                        originalOptions: options,
                        startTime: fxNow || createFxNow(),
                        duration: options.duration,
                        tweens: [],
                        createTween: function (prop, end) {
                            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                            animation.tweens.push(tween);
                            return tween;
                        },
                        stop: function (gotoEnd) {
                            var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                            if (stopped) {
                                return this;
                            }
                            stopped = true;
                            for (; index < length; index++) {
                                animation.tweens[index].run(1);
                            }
                            if (gotoEnd) {
                                deferred.notifyWith(elem, [
                                    animation,
                                    1,
                                    0
                                ]);
                                deferred.resolveWith(elem, [
                                    animation,
                                    gotoEnd
                                ]);
                            } else {
                                deferred.rejectWith(elem, [
                                    animation,
                                    gotoEnd
                                ]);
                            }
                            return this;
                        }
                    }), props = animation.props;
                propFilter(props, animation.opts.specialEasing);
                for (; index < length; index++) {
                    result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
                    if (result) {
                        if (jQuery.isFunction(result.stop)) {
                            jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
                        }
                        return result;
                    }
                }
                jQuery.map(props, createTween, animation);
                if (jQuery.isFunction(animation.opts.start)) {
                    animation.opts.start.call(elem, animation);
                }
                jQuery.fx.timer(jQuery.extend(tick, {
                    elem: elem,
                    anim: animation,
                    queue: animation.opts.queue
                }));
                return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
            }
            jQuery.Animation = jQuery.extend(Animation, {
                tweeners: {
                    '*': [function (prop, value) {
                            var tween = this.createTween(prop, value);
                            adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                            return tween;
                        }]
                },
                tweener: function (props, callback) {
                    if (jQuery.isFunction(props)) {
                        callback = props;
                        props = ['*'];
                    } else {
                        props = props.match(rnotwhite);
                    }
                    var prop, index = 0, length = props.length;
                    for (; index < length; index++) {
                        prop = props[index];
                        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                        Animation.tweeners[prop].unshift(callback);
                    }
                },
                prefilters: [defaultPrefilter],
                prefilter: function (callback, prepend) {
                    if (prepend) {
                        Animation.prefilters.unshift(callback);
                    } else {
                        Animation.prefilters.push(callback);
                    }
                }
            });
            jQuery.speed = function (speed, easing, fn) {
                var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
                    complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                    duration: speed,
                    easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
                };
                if (jQuery.fx.off || document.hidden) {
                    opt.duration = 0;
                } else {
                    opt.duration = typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
                }
                if (opt.queue == null || opt.queue === true) {
                    opt.queue = 'fx';
                }
                opt.old = opt.complete;
                opt.complete = function () {
                    if (jQuery.isFunction(opt.old)) {
                        opt.old.call(this);
                    }
                    if (opt.queue) {
                        jQuery.dequeue(this, opt.queue);
                    }
                };
                return opt;
            };
            jQuery.fn.extend({
                fadeTo: function (speed, to, easing, callback) {
                    return this.filter(isHiddenWithinTree).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
                },
                animate: function (prop, speed, easing, callback) {
                    var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
                            var anim = Animation(this, jQuery.extend({}, prop), optall);
                            if (empty || dataPriv.get(this, 'finish')) {
                                anim.stop(true);
                            }
                        };
                    doAnimation.finish = doAnimation;
                    return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
                },
                stop: function (type, clearQueue, gotoEnd) {
                    var stopQueue = function (hooks) {
                        var stop = hooks.stop;
                        delete hooks.stop;
                        stop(gotoEnd);
                    };
                    if (typeof type !== 'string') {
                        gotoEnd = clearQueue;
                        clearQueue = type;
                        type = undefined;
                    }
                    if (clearQueue && type !== false) {
                        this.queue(type || 'fx', []);
                    }
                    return this.each(function () {
                        var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = dataPriv.get(this);
                        if (index) {
                            if (data[index] && data[index].stop) {
                                stopQueue(data[index]);
                            }
                        } else {
                            for (index in data) {
                                if (data[index] && data[index].stop && rrun.test(index)) {
                                    stopQueue(data[index]);
                                }
                            }
                        }
                        for (index = timers.length; index--;) {
                            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                                timers[index].anim.stop(gotoEnd);
                                dequeue = false;
                                timers.splice(index, 1);
                            }
                        }
                        if (dequeue || !gotoEnd) {
                            jQuery.dequeue(this, type);
                        }
                    });
                },
                finish: function (type) {
                    if (type !== false) {
                        type = type || 'fx';
                    }
                    return this.each(function () {
                        var index, data = dataPriv.get(this), queue = data[type + 'queue'], hooks = data[type + 'queueHooks'], timers = jQuery.timers, length = queue ? queue.length : 0;
                        data.finish = true;
                        jQuery.queue(this, type, []);
                        if (hooks && hooks.stop) {
                            hooks.stop.call(this, true);
                        }
                        for (index = timers.length; index--;) {
                            if (timers[index].elem === this && timers[index].queue === type) {
                                timers[index].anim.stop(true);
                                timers.splice(index, 1);
                            }
                        }
                        for (index = 0; index < length; index++) {
                            if (queue[index] && queue[index].finish) {
                                queue[index].finish.call(this);
                            }
                        }
                        delete data.finish;
                    });
                }
            });
            jQuery.each([
                'toggle',
                'show',
                'hide'
            ], function (i, name) {
                var cssFn = jQuery.fn[name];
                jQuery.fn[name] = function (speed, easing, callback) {
                    return speed == null || typeof speed === 'boolean' ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
                };
            });
            jQuery.each({
                slideDown: genFx('show'),
                slideUp: genFx('hide'),
                slideToggle: genFx('toggle'),
                fadeIn: { opacity: 'show' },
                fadeOut: { opacity: 'hide' },
                fadeToggle: { opacity: 'toggle' }
            }, function (name, props) {
                jQuery.fn[name] = function (speed, easing, callback) {
                    return this.animate(props, speed, easing, callback);
                };
            });
            jQuery.timers = [];
            jQuery.fx.tick = function () {
                var timer, i = 0, timers = jQuery.timers;
                fxNow = jQuery.now();
                for (; i < timers.length; i++) {
                    timer = timers[i];
                    if (!timer() && timers[i] === timer) {
                        timers.splice(i--, 1);
                    }
                }
                if (!timers.length) {
                    jQuery.fx.stop();
                }
                fxNow = undefined;
            };
            jQuery.fx.timer = function (timer) {
                jQuery.timers.push(timer);
                if (timer()) {
                    jQuery.fx.start();
                } else {
                    jQuery.timers.pop();
                }
            };
            jQuery.fx.interval = 13;
            jQuery.fx.start = function () {
                if (!timerId) {
                    timerId = window.requestAnimationFrame ? window.requestAnimationFrame(raf) : window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
                }
            };
            jQuery.fx.stop = function () {
                if (window.cancelAnimationFrame) {
                    window.cancelAnimationFrame(timerId);
                } else {
                    window.clearInterval(timerId);
                }
                timerId = null;
            };
            jQuery.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            };
            jQuery.fn.delay = function (time, type) {
                time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
                type = type || 'fx';
                return this.queue(type, function (next, hooks) {
                    var timeout = window.setTimeout(next, time);
                    hooks.stop = function () {
                        window.clearTimeout(timeout);
                    };
                });
            };
            (function () {
                var input = document.createElement('input'), select = document.createElement('select'), opt = select.appendChild(document.createElement('option'));
                input.type = 'checkbox';
                support.checkOn = input.value !== '';
                support.optSelected = opt.selected;
                input = document.createElement('input');
                input.value = 't';
                input.type = 'radio';
                support.radioValue = input.value === 't';
            }());
            var boolHook, attrHandle = jQuery.expr.attrHandle;
            jQuery.fn.extend({
                attr: function (name, value) {
                    return access(this, jQuery.attr, name, value, arguments.length > 1);
                },
                removeAttr: function (name) {
                    return this.each(function () {
                        jQuery.removeAttr(this, name);
                    });
                }
            });
            jQuery.extend({
                attr: function (elem, name, value) {
                    var ret, hooks, nType = elem.nodeType;
                    if (nType === 3 || nType === 8 || nType === 2) {
                        return;
                    }
                    if (typeof elem.getAttribute === 'undefined') {
                        return jQuery.prop(elem, name, value);
                    }
                    if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
                    }
                    if (value !== undefined) {
                        if (value === null) {
                            jQuery.removeAttr(elem, name);
                            return;
                        }
                        if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                            return ret;
                        }
                        elem.setAttribute(name, value + '');
                        return value;
                    }
                    if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                        return ret;
                    }
                    ret = jQuery.find.attr(elem, name);
                    return ret == null ? undefined : ret;
                },
                attrHooks: {
                    type: {
                        set: function (elem, value) {
                            if (!support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
                                var val = elem.value;
                                elem.setAttribute('type', value);
                                if (val) {
                                    elem.value = val;
                                }
                                return value;
                            }
                        }
                    }
                },
                removeAttr: function (elem, value) {
                    var name, i = 0, attrNames = value && value.match(rnotwhite);
                    if (attrNames && elem.nodeType === 1) {
                        while (name = attrNames[i++]) {
                            elem.removeAttribute(name);
                        }
                    }
                }
            });
            boolHook = {
                set: function (elem, value, name) {
                    if (value === false) {
                        jQuery.removeAttr(elem, name);
                    } else {
                        elem.setAttribute(name, name);
                    }
                    return name;
                }
            };
            jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
                var getter = attrHandle[name] || jQuery.find.attr;
                attrHandle[name] = function (elem, name, isXML) {
                    var ret, handle, lowercaseName = name.toLowerCase();
                    if (!isXML) {
                        handle = attrHandle[lowercaseName];
                        attrHandle[lowercaseName] = ret;
                        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
                        attrHandle[lowercaseName] = handle;
                    }
                    return ret;
                };
            });
            var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
            jQuery.fn.extend({
                prop: function (name, value) {
                    return access(this, jQuery.prop, name, value, arguments.length > 1);
                },
                removeProp: function (name) {
                    return this.each(function () {
                        delete this[jQuery.propFix[name] || name];
                    });
                }
            });
            jQuery.extend({
                prop: function (elem, name, value) {
                    var ret, hooks, nType = elem.nodeType;
                    if (nType === 3 || nType === 8 || nType === 2) {
                        return;
                    }
                    if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                        name = jQuery.propFix[name] || name;
                        hooks = jQuery.propHooks[name];
                    }
                    if (value !== undefined) {
                        if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                            return ret;
                        }
                        return elem[name] = value;
                    }
                    if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
                        return ret;
                    }
                    return elem[name];
                },
                propHooks: {
                    tabIndex: {
                        get: function (elem) {
                            var tabindex = jQuery.find.attr(elem, 'tabindex');
                            return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                        }
                    }
                },
                propFix: {
                    'for': 'htmlFor',
                    'class': 'className'
                }
            });
            if (!support.optSelected) {
                jQuery.propHooks.selected = {
                    get: function (elem) {
                        var parent = elem.parentNode;
                        if (parent && parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                        return null;
                    },
                    set: function (elem) {
                        var parent = elem.parentNode;
                        if (parent) {
                            parent.selectedIndex;
                            if (parent.parentNode) {
                                parent.parentNode.selectedIndex;
                            }
                        }
                    }
                };
            }
            jQuery.each([
                'tabIndex',
                'readOnly',
                'maxLength',
                'cellSpacing',
                'cellPadding',
                'rowSpan',
                'colSpan',
                'useMap',
                'frameBorder',
                'contentEditable'
            ], function () {
                jQuery.propFix[this.toLowerCase()] = this;
            });
            var rclass = /[\t\r\n\f]/g;
            function getClass(elem) {
                return elem.getAttribute && elem.getAttribute('class') || '';
            }
            jQuery.fn.extend({
                addClass: function (value) {
                    var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                    if (jQuery.isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).addClass(value.call(this, j, getClass(this)));
                        });
                    }
                    if (typeof value === 'string' && value) {
                        classes = value.match(rnotwhite) || [];
                        while (elem = this[i++]) {
                            curValue = getClass(elem);
                            cur = elem.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');
                            if (cur) {
                                j = 0;
                                while (clazz = classes[j++]) {
                                    if (cur.indexOf(' ' + clazz + ' ') < 0) {
                                        cur += clazz + ' ';
                                    }
                                }
                                finalValue = jQuery.trim(cur);
                                if (curValue !== finalValue) {
                                    elem.setAttribute('class', finalValue);
                                }
                            }
                        }
                    }
                    return this;
                },
                removeClass: function (value) {
                    var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                    if (jQuery.isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).removeClass(value.call(this, j, getClass(this)));
                        });
                    }
                    if (!arguments.length) {
                        return this.attr('class', '');
                    }
                    if (typeof value === 'string' && value) {
                        classes = value.match(rnotwhite) || [];
                        while (elem = this[i++]) {
                            curValue = getClass(elem);
                            cur = elem.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');
                            if (cur) {
                                j = 0;
                                while (clazz = classes[j++]) {
                                    while (cur.indexOf(' ' + clazz + ' ') > -1) {
                                        cur = cur.replace(' ' + clazz + ' ', ' ');
                                    }
                                }
                                finalValue = jQuery.trim(cur);
                                if (curValue !== finalValue) {
                                    elem.setAttribute('class', finalValue);
                                }
                            }
                        }
                    }
                    return this;
                },
                toggleClass: function (value, stateVal) {
                    var type = typeof value;
                    if (typeof stateVal === 'boolean' && type === 'string') {
                        return stateVal ? this.addClass(value) : this.removeClass(value);
                    }
                    if (jQuery.isFunction(value)) {
                        return this.each(function (i) {
                            jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                        });
                    }
                    return this.each(function () {
                        var className, i, self, classNames;
                        if (type === 'string') {
                            i = 0;
                            self = jQuery(this);
                            classNames = value.match(rnotwhite) || [];
                            while (className = classNames[i++]) {
                                if (self.hasClass(className)) {
                                    self.removeClass(className);
                                } else {
                                    self.addClass(className);
                                }
                            }
                        } else if (value === undefined || type === 'boolean') {
                            className = getClass(this);
                            if (className) {
                                dataPriv.set(this, '__className__', className);
                            }
                            if (this.setAttribute) {
                                this.setAttribute('class', className || value === false ? '' : dataPriv.get(this, '__className__') || '');
                            }
                        }
                    });
                },
                hasClass: function (selector) {
                    var className, elem, i = 0;
                    className = ' ' + selector + ' ';
                    while (elem = this[i++]) {
                        if (elem.nodeType === 1 && (' ' + getClass(elem) + ' ').replace(rclass, ' ').indexOf(className) > -1) {
                            return true;
                        }
                    }
                    return false;
                }
            });
            var rreturn = /\r/g, rspaces = /[\x20\t\r\n\f]+/g;
            jQuery.fn.extend({
                val: function (value) {
                    var hooks, ret, isFunction, elem = this[0];
                    if (!arguments.length) {
                        if (elem) {
                            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                            if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
                                return ret;
                            }
                            ret = elem.value;
                            return typeof ret === 'string' ? ret.replace(rreturn, '') : ret == null ? '' : ret;
                        }
                        return;
                    }
                    isFunction = jQuery.isFunction(value);
                    return this.each(function (i) {
                        var val;
                        if (this.nodeType !== 1) {
                            return;
                        }
                        if (isFunction) {
                            val = value.call(this, i, jQuery(this).val());
                        } else {
                            val = value;
                        }
                        if (val == null) {
                            val = '';
                        } else if (typeof val === 'number') {
                            val += '';
                        } else if (jQuery.isArray(val)) {
                            val = jQuery.map(val, function (value) {
                                return value == null ? '' : value + '';
                            });
                        }
                        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
                            this.value = val;
                        }
                    });
                }
            });
            jQuery.extend({
                valHooks: {
                    option: {
                        get: function (elem) {
                            var val = jQuery.find.attr(elem, 'value');
                            return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, ' ');
                        }
                    },
                    select: {
                        get: function (elem) {
                            var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one', values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                            for (; i < max; i++) {
                                option = options[i];
                                if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
                                    value = jQuery(option).val();
                                    if (one) {
                                        return value;
                                    }
                                    values.push(value);
                                }
                            }
                            return values;
                        },
                        set: function (elem, value) {
                            var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                            while (i--) {
                                option = options[i];
                                if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                                    optionSet = true;
                                }
                            }
                            if (!optionSet) {
                                elem.selectedIndex = -1;
                            }
                            return values;
                        }
                    }
                }
            });
            jQuery.each([
                'radio',
                'checkbox'
            ], function () {
                jQuery.valHooks[this] = {
                    set: function (elem, value) {
                        if (jQuery.isArray(value)) {
                            return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
                        }
                    }
                };
                if (!support.checkOn) {
                    jQuery.valHooks[this].get = function (elem) {
                        return elem.getAttribute('value') === null ? 'on' : elem.value;
                    };
                }
            });
            var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
            jQuery.extend(jQuery.event, {
                trigger: function (event, data, elem, onlyHandlers) {
                    var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = hasOwn.call(event, 'type') ? event.type : event, namespaces = hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];
                    cur = tmp = elem = elem || document;
                    if (elem.nodeType === 3 || elem.nodeType === 8) {
                        return;
                    }
                    if (rfocusMorph.test(type + jQuery.event.triggered)) {
                        return;
                    }
                    if (type.indexOf('.') > -1) {
                        namespaces = type.split('.');
                        type = namespaces.shift();
                        namespaces.sort();
                    }
                    ontype = type.indexOf(':') < 0 && 'on' + type;
                    event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === 'object' && event);
                    event.isTrigger = onlyHandlers ? 2 : 3;
                    event.namespace = namespaces.join('.');
                    event.rnamespace = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
                    event.result = undefined;
                    if (!event.target) {
                        event.target = elem;
                    }
                    data = data == null ? [event] : jQuery.makeArray(data, [event]);
                    special = jQuery.event.special[type] || {};
                    if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                        return;
                    }
                    if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                        bubbleType = special.delegateType || type;
                        if (!rfocusMorph.test(bubbleType + type)) {
                            cur = cur.parentNode;
                        }
                        for (; cur; cur = cur.parentNode) {
                            eventPath.push(cur);
                            tmp = cur;
                        }
                        if (tmp === (elem.ownerDocument || document)) {
                            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                        }
                    }
                    i = 0;
                    while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                        event.type = i > 1 ? bubbleType : special.bindType || type;
                        handle = (dataPriv.get(cur, 'events') || {})[event.type] && dataPriv.get(cur, 'handle');
                        if (handle) {
                            handle.apply(cur, data);
                        }
                        handle = ontype && cur[ontype];
                        if (handle && handle.apply && acceptData(cur)) {
                            event.result = handle.apply(cur, data);
                            if (event.result === false) {
                                event.preventDefault();
                            }
                        }
                    }
                    event.type = type;
                    if (!onlyHandlers && !event.isDefaultPrevented()) {
                        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                            if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                                tmp = elem[ontype];
                                if (tmp) {
                                    elem[ontype] = null;
                                }
                                jQuery.event.triggered = type;
                                elem[type]();
                                jQuery.event.triggered = undefined;
                                if (tmp) {
                                    elem[ontype] = tmp;
                                }
                            }
                        }
                    }
                    return event.result;
                },
                simulate: function (type, elem, event) {
                    var e = jQuery.extend(new jQuery.Event(), event, {
                        type: type,
                        isSimulated: true
                    });
                    jQuery.event.trigger(e, null, elem);
                }
            });
            jQuery.fn.extend({
                trigger: function (type, data) {
                    return this.each(function () {
                        jQuery.event.trigger(type, data, this);
                    });
                },
                triggerHandler: function (type, data) {
                    var elem = this[0];
                    if (elem) {
                        return jQuery.event.trigger(type, data, elem, true);
                    }
                }
            });
            jQuery.each(('blur focus focusin focusout resize scroll click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup contextmenu').split(' '), function (i, name) {
                jQuery.fn[name] = function (data, fn) {
                    return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
                };
            });
            jQuery.fn.extend({
                hover: function (fnOver, fnOut) {
                    return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
                }
            });
            support.focusin = 'onfocusin' in window;
            if (!support.focusin) {
                jQuery.each({
                    focus: 'focusin',
                    blur: 'focusout'
                }, function (orig, fix) {
                    var handler = function (event) {
                        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
                    };
                    jQuery.event.special[fix] = {
                        setup: function () {
                            var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                            if (!attaches) {
                                doc.addEventListener(orig, handler, true);
                            }
                            dataPriv.access(doc, fix, (attaches || 0) + 1);
                        },
                        teardown: function () {
                            var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                            if (!attaches) {
                                doc.removeEventListener(orig, handler, true);
                                dataPriv.remove(doc, fix);
                            } else {
                                dataPriv.access(doc, fix, attaches);
                            }
                        }
                    };
                });
            }
            var location = window.location;
            var nonce = jQuery.now();
            var rquery = /\?/;
            jQuery.parseXML = function (data) {
                var xml;
                if (!data || typeof data !== 'string') {
                    return null;
                }
                try {
                    xml = new window.DOMParser().parseFromString(data, 'text/xml');
                } catch (e) {
                    xml = undefined;
                }
                if (!xml || xml.getElementsByTagName('parsererror').length) {
                    jQuery.error('Invalid XML: ' + data);
                }
                return xml;
            };
            var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
            function buildParams(prefix, obj, traditional, add) {
                var name;
                if (jQuery.isArray(obj)) {
                    jQuery.each(obj, function (i, v) {
                        if (traditional || rbracket.test(prefix)) {
                            add(prefix, v);
                        } else {
                            buildParams(prefix + '[' + (typeof v === 'object' && v != null ? i : '') + ']', v, traditional, add);
                        }
                    });
                } else if (!traditional && jQuery.type(obj) === 'object') {
                    for (name in obj) {
                        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
                    }
                } else {
                    add(prefix, obj);
                }
            }
            jQuery.param = function (a, traditional) {
                var prefix, s = [], add = function (key, valueOrFunction) {
                        var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
                        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value == null ? '' : value);
                    };
                if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
                    jQuery.each(a, function () {
                        add(this.name, this.value);
                    });
                } else {
                    for (prefix in a) {
                        buildParams(prefix, a[prefix], traditional, add);
                    }
                }
                return s.join('&');
            };
            jQuery.fn.extend({
                serialize: function () {
                    return jQuery.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {
                        var elements = jQuery.prop(this, 'elements');
                        return elements ? jQuery.makeArray(elements) : this;
                    }).filter(function () {
                        var type = this.type;
                        return this.name && !jQuery(this).is(':disabled') && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
                    }).map(function (i, elem) {
                        var val = jQuery(this).val();
                        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, '\r\n')
                            };
                        }) : {
                            name: elem.name,
                            value: val.replace(rCRLF, '\r\n')
                        };
                    }).get();
                }
            });
            var r20 = /%20/g, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = '*/'.concat('*'), originAnchor = document.createElement('a');
            originAnchor.href = location.href;
            function addToPrefiltersOrTransports(structure) {
                return function (dataTypeExpression, func) {
                    if (typeof dataTypeExpression !== 'string') {
                        func = dataTypeExpression;
                        dataTypeExpression = '*';
                    }
                    var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                    if (jQuery.isFunction(func)) {
                        while (dataType = dataTypes[i++]) {
                            if (dataType[0] === '+') {
                                dataType = dataType.slice(1) || '*';
                                (structure[dataType] = structure[dataType] || []).unshift(func);
                            } else {
                                (structure[dataType] = structure[dataType] || []).push(func);
                            }
                        }
                    }
                };
            }
            function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
                var inspected = {}, seekingTransport = structure === transports;
                function inspect(dataType) {
                    var selected;
                    inspected[dataType] = true;
                    jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                        if (typeof dataTypeOrTransport === 'string' && !seekingTransport && !inspected[dataTypeOrTransport]) {
                            options.dataTypes.unshift(dataTypeOrTransport);
                            inspect(dataTypeOrTransport);
                            return false;
                        } else if (seekingTransport) {
                            return !(selected = dataTypeOrTransport);
                        }
                    });
                    return selected;
                }
                return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
            }
            function ajaxExtend(target, src) {
                var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
                for (key in src) {
                    if (src[key] !== undefined) {
                        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
                    }
                }
                if (deep) {
                    jQuery.extend(true, target, deep);
                }
                return target;
            }
            function ajaxHandleResponses(s, jqXHR, responses) {
                var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
                while (dataTypes[0] === '*') {
                    dataTypes.shift();
                    if (ct === undefined) {
                        ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
                    }
                }
                if (ct) {
                    for (type in contents) {
                        if (contents[type] && contents[type].test(ct)) {
                            dataTypes.unshift(type);
                            break;
                        }
                    }
                }
                if (dataTypes[0] in responses) {
                    finalDataType = dataTypes[0];
                } else {
                    for (type in responses) {
                        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
                            finalDataType = type;
                            break;
                        }
                        if (!firstDataType) {
                            firstDataType = type;
                        }
                    }
                    finalDataType = finalDataType || firstDataType;
                }
                if (finalDataType) {
                    if (finalDataType !== dataTypes[0]) {
                        dataTypes.unshift(finalDataType);
                    }
                    return responses[finalDataType];
                }
            }
            function ajaxConvert(s, response, jqXHR, isSuccess) {
                var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
                if (dataTypes[1]) {
                    for (conv in s.converters) {
                        converters[conv.toLowerCase()] = s.converters[conv];
                    }
                }
                current = dataTypes.shift();
                while (current) {
                    if (s.responseFields[current]) {
                        jqXHR[s.responseFields[current]] = response;
                    }
                    if (!prev && isSuccess && s.dataFilter) {
                        response = s.dataFilter(response, s.dataType);
                    }
                    prev = current;
                    current = dataTypes.shift();
                    if (current) {
                        if (current === '*') {
                            current = prev;
                        } else if (prev !== '*' && prev !== current) {
                            conv = converters[prev + ' ' + current] || converters['* ' + current];
                            if (!conv) {
                                for (conv2 in converters) {
                                    tmp = conv2.split(' ');
                                    if (tmp[1] === current) {
                                        conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                                        if (conv) {
                                            if (conv === true) {
                                                conv = converters[conv2];
                                            } else if (converters[conv2] !== true) {
                                                current = tmp[0];
                                                dataTypes.unshift(tmp[1]);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if (conv !== true) {
                                if (conv && s.throws) {
                                    response = conv(response);
                                } else {
                                    try {
                                        response = conv(response);
                                    } catch (e) {
                                        return {
                                            state: 'parsererror',
                                            error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                return {
                    state: 'success',
                    data: response
                };
            }
            jQuery.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: location.href,
                    type: 'GET',
                    isLocal: rlocalProtocol.test(location.protocol),
                    global: true,
                    processData: true,
                    async: true,
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    accepts: {
                        '*': allTypes,
                        text: 'text/plain',
                        html: 'text/html',
                        xml: 'application/xml, text/xml',
                        json: 'application/json, text/javascript'
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: 'responseXML',
                        text: 'responseText',
                        json: 'responseJSON'
                    },
                    converters: {
                        '* text': String,
                        'text html': true,
                        'text json': JSON.parse,
                        'text xml': jQuery.parseXML
                    },
                    flatOptions: {
                        url: true,
                        context: true
                    }
                },
                ajaxSetup: function (target, settings) {
                    return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
                },
                ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
                ajaxTransport: addToPrefiltersOrTransports(transports),
                ajax: function (url, options) {
                    if (typeof url === 'object') {
                        options = url;
                        url = undefined;
                    }
                    options = options || {};
                    var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = 'canceled', jqXHR = {
                            readyState: 0,
                            getResponseHeader: function (key) {
                                var match;
                                if (completed) {
                                    if (!responseHeaders) {
                                        responseHeaders = {};
                                        while (match = rheaders.exec(responseHeadersString)) {
                                            responseHeaders[match[1].toLowerCase()] = match[2];
                                        }
                                    }
                                    match = responseHeaders[key.toLowerCase()];
                                }
                                return match == null ? null : match;
                            },
                            getAllResponseHeaders: function () {
                                return completed ? responseHeadersString : null;
                            },
                            setRequestHeader: function (name, value) {
                                if (completed == null) {
                                    name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                                    requestHeaders[name] = value;
                                }
                                return this;
                            },
                            overrideMimeType: function (type) {
                                if (completed == null) {
                                    s.mimeType = type;
                                }
                                return this;
                            },
                            statusCode: function (map) {
                                var code;
                                if (map) {
                                    if (completed) {
                                        jqXHR.always(map[jqXHR.status]);
                                    } else {
                                        for (code in map) {
                                            statusCode[code] = [
                                                statusCode[code],
                                                map[code]
                                            ];
                                        }
                                    }
                                }
                                return this;
                            },
                            abort: function (statusText) {
                                var finalText = statusText || strAbort;
                                if (transport) {
                                    transport.abort(finalText);
                                }
                                done(0, finalText);
                                return this;
                            }
                        };
                    deferred.promise(jqXHR);
                    s.url = ((url || s.url || location.href) + '').replace(rprotocol, location.protocol + '//');
                    s.type = options.method || options.type || s.method || s.type;
                    s.dataTypes = (s.dataType || '*').toLowerCase().match(rnotwhite) || [''];
                    if (s.crossDomain == null) {
                        urlAnchor = document.createElement('a');
                        try {
                            urlAnchor.href = s.url;
                            urlAnchor.href = urlAnchor.href;
                            s.crossDomain = originAnchor.protocol + '//' + originAnchor.host !== urlAnchor.protocol + '//' + urlAnchor.host;
                        } catch (e) {
                            s.crossDomain = true;
                        }
                    }
                    if (s.data && s.processData && typeof s.data !== 'string') {
                        s.data = jQuery.param(s.data, s.traditional);
                    }
                    inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                    if (completed) {
                        return jqXHR;
                    }
                    fireGlobals = jQuery.event && s.global;
                    if (fireGlobals && jQuery.active++ === 0) {
                        jQuery.event.trigger('ajaxStart');
                    }
                    s.type = s.type.toUpperCase();
                    s.hasContent = !rnoContent.test(s.type);
                    cacheURL = s.url.replace(rhash, '');
                    if (!s.hasContent) {
                        uncached = s.url.slice(cacheURL.length);
                        if (s.data) {
                            cacheURL += (rquery.test(cacheURL) ? '&' : '?') + s.data;
                            delete s.data;
                        }
                        if (s.cache === false) {
                            cacheURL = cacheURL.replace(rts, '');
                            uncached = (rquery.test(cacheURL) ? '&' : '?') + '_=' + nonce++ + uncached;
                        }
                        s.url = cacheURL + uncached;
                    } else if (s.data && s.processData && (s.contentType || '').indexOf('application/x-www-form-urlencoded') === 0) {
                        s.data = s.data.replace(r20, '+');
                    }
                    if (s.ifModified) {
                        if (jQuery.lastModified[cacheURL]) {
                            jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
                        }
                        if (jQuery.etag[cacheURL]) {
                            jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
                        }
                    }
                    if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                        jqXHR.setRequestHeader('Content-Type', s.contentType);
                    }
                    jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
                    for (i in s.headers) {
                        jqXHR.setRequestHeader(i, s.headers[i]);
                    }
                    if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
                        return jqXHR.abort();
                    }
                    strAbort = 'abort';
                    completeDeferred.add(s.complete);
                    jqXHR.done(s.success);
                    jqXHR.fail(s.error);
                    transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                    if (!transport) {
                        done(-1, 'No Transport');
                    } else {
                        jqXHR.readyState = 1;
                        if (fireGlobals) {
                            globalEventContext.trigger('ajaxSend', [
                                jqXHR,
                                s
                            ]);
                        }
                        if (completed) {
                            return jqXHR;
                        }
                        if (s.async && s.timeout > 0) {
                            timeoutTimer = window.setTimeout(function () {
                                jqXHR.abort('timeout');
                            }, s.timeout);
                        }
                        try {
                            completed = false;
                            transport.send(requestHeaders, done);
                        } catch (e) {
                            if (completed) {
                                throw e;
                            }
                            done(-1, e);
                        }
                    }
                    function done(status, nativeStatusText, responses, headers) {
                        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                        if (completed) {
                            return;
                        }
                        completed = true;
                        if (timeoutTimer) {
                            window.clearTimeout(timeoutTimer);
                        }
                        transport = undefined;
                        responseHeadersString = headers || '';
                        jqXHR.readyState = status > 0 ? 4 : 0;
                        isSuccess = status >= 200 && status < 300 || status === 304;
                        if (responses) {
                            response = ajaxHandleResponses(s, jqXHR, responses);
                        }
                        response = ajaxConvert(s, response, jqXHR, isSuccess);
                        if (isSuccess) {
                            if (s.ifModified) {
                                modified = jqXHR.getResponseHeader('Last-Modified');
                                if (modified) {
                                    jQuery.lastModified[cacheURL] = modified;
                                }
                                modified = jqXHR.getResponseHeader('etag');
                                if (modified) {
                                    jQuery.etag[cacheURL] = modified;
                                }
                            }
                            if (status === 204 || s.type === 'HEAD') {
                                statusText = 'nocontent';
                            } else if (status === 304) {
                                statusText = 'notmodified';
                            } else {
                                statusText = response.state;
                                success = response.data;
                                error = response.error;
                                isSuccess = !error;
                            }
                        } else {
                            error = statusText;
                            if (status || !statusText) {
                                statusText = 'error';
                                if (status < 0) {
                                    status = 0;
                                }
                            }
                        }
                        jqXHR.status = status;
                        jqXHR.statusText = (nativeStatusText || statusText) + '';
                        if (isSuccess) {
                            deferred.resolveWith(callbackContext, [
                                success,
                                statusText,
                                jqXHR
                            ]);
                        } else {
                            deferred.rejectWith(callbackContext, [
                                jqXHR,
                                statusText,
                                error
                            ]);
                        }
                        jqXHR.statusCode(statusCode);
                        statusCode = undefined;
                        if (fireGlobals) {
                            globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
                                jqXHR,
                                s,
                                isSuccess ? success : error
                            ]);
                        }
                        completeDeferred.fireWith(callbackContext, [
                            jqXHR,
                            statusText
                        ]);
                        if (fireGlobals) {
                            globalEventContext.trigger('ajaxComplete', [
                                jqXHR,
                                s
                            ]);
                            if (!--jQuery.active) {
                                jQuery.event.trigger('ajaxStop');
                            }
                        }
                    }
                    return jqXHR;
                },
                getJSON: function (url, data, callback) {
                    return jQuery.get(url, data, callback, 'json');
                },
                getScript: function (url, callback) {
                    return jQuery.get(url, undefined, callback, 'script');
                }
            });
            jQuery.each([
                'get',
                'post'
            ], function (i, method) {
                jQuery[method] = function (url, data, callback, type) {
                    if (jQuery.isFunction(data)) {
                        type = type || callback;
                        callback = data;
                        data = undefined;
                    }
                    return jQuery.ajax(jQuery.extend({
                        url: url,
                        type: method,
                        dataType: type,
                        data: data,
                        success: callback
                    }, jQuery.isPlainObject(url) && url));
                };
            });
            jQuery._evalUrl = function (url) {
                return jQuery.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'script',
                    cache: true,
                    async: false,
                    global: false,
                    'throws': true
                });
            };
            jQuery.fn.extend({
                wrapAll: function (html) {
                    var wrap;
                    if (this[0]) {
                        if (jQuery.isFunction(html)) {
                            html = html.call(this[0]);
                        }
                        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                        if (this[0].parentNode) {
                            wrap.insertBefore(this[0]);
                        }
                        wrap.map(function () {
                            var elem = this;
                            while (elem.firstElementChild) {
                                elem = elem.firstElementChild;
                            }
                            return elem;
                        }).append(this);
                    }
                    return this;
                },
                wrapInner: function (html) {
                    if (jQuery.isFunction(html)) {
                        return this.each(function (i) {
                            jQuery(this).wrapInner(html.call(this, i));
                        });
                    }
                    return this.each(function () {
                        var self = jQuery(this), contents = self.contents();
                        if (contents.length) {
                            contents.wrapAll(html);
                        } else {
                            self.append(html);
                        }
                    });
                },
                wrap: function (html) {
                    var isFunction = jQuery.isFunction(html);
                    return this.each(function (i) {
                        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
                    });
                },
                unwrap: function (selector) {
                    this.parent(selector).not('body').each(function () {
                        jQuery(this).replaceWith(this.childNodes);
                    });
                    return this;
                }
            });
            jQuery.expr.pseudos.hidden = function (elem) {
                return !jQuery.expr.pseudos.visible(elem);
            };
            jQuery.expr.pseudos.visible = function (elem) {
                return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
            };
            jQuery.ajaxSettings.xhr = function () {
                try {
                    return new window.XMLHttpRequest();
                } catch (e) {
                }
            };
            var xhrSuccessStatus = {
                    0: 200,
                    1223: 204
                }, xhrSupported = jQuery.ajaxSettings.xhr();
            support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
            support.ajax = xhrSupported = !!xhrSupported;
            jQuery.ajaxTransport(function (options) {
                var callback, errorCallback;
                if (support.cors || xhrSupported && !options.crossDomain) {
                    return {
                        send: function (headers, complete) {
                            var i, xhr = options.xhr();
                            xhr.open(options.type, options.url, options.async, options.username, options.password);
                            if (options.xhrFields) {
                                for (i in options.xhrFields) {
                                    xhr[i] = options.xhrFields[i];
                                }
                            }
                            if (options.mimeType && xhr.overrideMimeType) {
                                xhr.overrideMimeType(options.mimeType);
                            }
                            if (!options.crossDomain && !headers['X-Requested-With']) {
                                headers['X-Requested-With'] = 'XMLHttpRequest';
                            }
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }
                            callback = function (type) {
                                return function () {
                                    if (callback) {
                                        callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                                        if (type === 'abort') {
                                            xhr.abort();
                                        } else if (type === 'error') {
                                            if (typeof xhr.status !== 'number') {
                                                complete(0, 'error');
                                            } else {
                                                complete(xhr.status, xhr.statusText);
                                            }
                                        } else {
                                            complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || 'text') !== 'text' || typeof xhr.responseText !== 'string' ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
                                        }
                                    }
                                };
                            };
                            xhr.onload = callback();
                            errorCallback = xhr.onerror = callback('error');
                            if (xhr.onabort !== undefined) {
                                xhr.onabort = errorCallback;
                            } else {
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4) {
                                        window.setTimeout(function () {
                                            if (callback) {
                                                errorCallback();
                                            }
                                        });
                                    }
                                };
                            }
                            callback = callback('abort');
                            try {
                                xhr.send(options.hasContent && options.data || null);
                            } catch (e) {
                                if (callback) {
                                    throw e;
                                }
                            }
                        },
                        abort: function () {
                            if (callback) {
                                callback();
                            }
                        }
                    };
                }
            });
            jQuery.ajaxPrefilter(function (s) {
                if (s.crossDomain) {
                    s.contents.script = false;
                }
            });
            jQuery.ajaxSetup({
                accepts: { script: 'text/javascript, application/javascript, ' + 'application/ecmascript, application/x-ecmascript' },
                contents: { script: /\b(?:java|ecma)script\b/ },
                converters: {
                    'text script': function (text) {
                        jQuery.globalEval(text);
                        return text;
                    }
                }
            });
            jQuery.ajaxPrefilter('script', function (s) {
                if (s.cache === undefined) {
                    s.cache = false;
                }
                if (s.crossDomain) {
                    s.type = 'GET';
                }
            });
            jQuery.ajaxTransport('script', function (s) {
                if (s.crossDomain) {
                    var script, callback;
                    return {
                        send: function (_, complete) {
                            script = jQuery('<script>').prop({
                                charset: s.scriptCharset,
                                src: s.url
                            }).on('load error', callback = function (evt) {
                                script.remove();
                                callback = null;
                                if (evt) {
                                    complete(evt.type === 'error' ? 404 : 200, evt.type);
                                }
                            });
                            document.head.appendChild(script[0]);
                        },
                        abort: function () {
                            if (callback) {
                                callback();
                            }
                        }
                    };
                }
            });
            var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
            jQuery.ajaxSetup({
                jsonp: 'callback',
                jsonpCallback: function () {
                    var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++;
                    this[callback] = true;
                    return callback;
                }
            });
            jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
                var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? 'url' : typeof s.data === 'string' && (s.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && rjsonp.test(s.data) && 'data');
                if (jsonProp || s.dataTypes[0] === 'jsonp') {
                    callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
                    if (jsonProp) {
                        s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
                    } else if (s.jsonp !== false) {
                        s.url += (rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
                    }
                    s.converters['script json'] = function () {
                        if (!responseContainer) {
                            jQuery.error(callbackName + ' was not called');
                        }
                        return responseContainer[0];
                    };
                    s.dataTypes[0] = 'json';
                    overwritten = window[callbackName];
                    window[callbackName] = function () {
                        responseContainer = arguments;
                    };
                    jqXHR.always(function () {
                        if (overwritten === undefined) {
                            jQuery(window).removeProp(callbackName);
                        } else {
                            window[callbackName] = overwritten;
                        }
                        if (s[callbackName]) {
                            s.jsonpCallback = originalSettings.jsonpCallback;
                            oldCallbacks.push(callbackName);
                        }
                        if (responseContainer && jQuery.isFunction(overwritten)) {
                            overwritten(responseContainer[0]);
                        }
                        responseContainer = overwritten = undefined;
                    });
                    return 'script';
                }
            });
            support.createHTMLDocument = function () {
                var body = document.implementation.createHTMLDocument('').body;
                body.innerHTML = '<form></form><form></form>';
                return body.childNodes.length === 2;
            }();
            jQuery.parseHTML = function (data, context, keepScripts) {
                if (typeof data !== 'string') {
                    return [];
                }
                if (typeof context === 'boolean') {
                    keepScripts = context;
                    context = false;
                }
                var base, parsed, scripts;
                if (!context) {
                    if (support.createHTMLDocument) {
                        context = document.implementation.createHTMLDocument('');
                        base = context.createElement('base');
                        base.href = document.location.href;
                        context.head.appendChild(base);
                    } else {
                        context = document;
                    }
                }
                parsed = rsingleTag.exec(data);
                scripts = !keepScripts && [];
                if (parsed) {
                    return [context.createElement(parsed[1])];
                }
                parsed = buildFragment([data], context, scripts);
                if (scripts && scripts.length) {
                    jQuery(scripts).remove();
                }
                return jQuery.merge([], parsed.childNodes);
            };
            jQuery.fn.load = function (url, params, callback) {
                var selector, type, response, self = this, off = url.indexOf(' ');
                if (off > -1) {
                    selector = jQuery.trim(url.slice(off));
                    url = url.slice(0, off);
                }
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = undefined;
                } else if (params && typeof params === 'object') {
                    type = 'POST';
                }
                if (self.length > 0) {
                    jQuery.ajax({
                        url: url,
                        type: type || 'GET',
                        dataType: 'html',
                        data: params
                    }).done(function (responseText) {
                        response = arguments;
                        self.html(selector ? jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector) : responseText);
                    }).always(callback && function (jqXHR, status) {
                        self.each(function () {
                            callback.apply(this, response || [
                                jqXHR.responseText,
                                status,
                                jqXHR
                            ]);
                        });
                    });
                }
                return this;
            };
            jQuery.each([
                'ajaxStart',
                'ajaxStop',
                'ajaxComplete',
                'ajaxError',
                'ajaxSuccess',
                'ajaxSend'
            ], function (i, type) {
                jQuery.fn[type] = function (fn) {
                    return this.on(type, fn);
                };
            });
            jQuery.expr.pseudos.animated = function (elem) {
                return jQuery.grep(jQuery.timers, function (fn) {
                    return elem === fn.elem;
                }).length;
            };
            function getWindow(elem) {
                return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
            }
            jQuery.offset = {
                setOffset: function (elem, options, i) {
                    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, 'position'), curElem = jQuery(elem), props = {};
                    if (position === 'static') {
                        elem.style.position = 'relative';
                    }
                    curOffset = curElem.offset();
                    curCSSTop = jQuery.css(elem, 'top');
                    curCSSLeft = jQuery.css(elem, 'left');
                    calculatePosition = (position === 'absolute' || position === 'fixed') && (curCSSTop + curCSSLeft).indexOf('auto') > -1;
                    if (calculatePosition) {
                        curPosition = curElem.position();
                        curTop = curPosition.top;
                        curLeft = curPosition.left;
                    } else {
                        curTop = parseFloat(curCSSTop) || 0;
                        curLeft = parseFloat(curCSSLeft) || 0;
                    }
                    if (jQuery.isFunction(options)) {
                        options = options.call(elem, i, jQuery.extend({}, curOffset));
                    }
                    if (options.top != null) {
                        props.top = options.top - curOffset.top + curTop;
                    }
                    if (options.left != null) {
                        props.left = options.left - curOffset.left + curLeft;
                    }
                    if ('using' in options) {
                        options.using.call(elem, props);
                    } else {
                        curElem.css(props);
                    }
                }
            };
            jQuery.fn.extend({
                offset: function (options) {
                    if (arguments.length) {
                        return options === undefined ? this : this.each(function (i) {
                            jQuery.offset.setOffset(this, options, i);
                        });
                    }
                    var docElem, win, rect, doc, elem = this[0];
                    if (!elem) {
                        return;
                    }
                    if (!elem.getClientRects().length) {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                    rect = elem.getBoundingClientRect();
                    if (rect.width || rect.height) {
                        doc = elem.ownerDocument;
                        win = getWindow(doc);
                        docElem = doc.documentElement;
                        return {
                            top: rect.top + win.pageYOffset - docElem.clientTop,
                            left: rect.left + win.pageXOffset - docElem.clientLeft
                        };
                    }
                    return rect;
                },
                position: function () {
                    if (!this[0]) {
                        return;
                    }
                    var offsetParent, offset, elem = this[0], parentOffset = {
                            top: 0,
                            left: 0
                        };
                    if (jQuery.css(elem, 'position') === 'fixed') {
                        offset = elem.getBoundingClientRect();
                    } else {
                        offsetParent = this.offsetParent();
                        offset = this.offset();
                        if (!jQuery.nodeName(offsetParent[0], 'html')) {
                            parentOffset = offsetParent.offset();
                        }
                        parentOffset = {
                            top: parentOffset.top + jQuery.css(offsetParent[0], 'borderTopWidth', true),
                            left: parentOffset.left + jQuery.css(offsetParent[0], 'borderLeftWidth', true)
                        };
                    }
                    return {
                        top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
                        left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
                    };
                },
                offsetParent: function () {
                    return this.map(function () {
                        var offsetParent = this.offsetParent;
                        while (offsetParent && jQuery.css(offsetParent, 'position') === 'static') {
                            offsetParent = offsetParent.offsetParent;
                        }
                        return offsetParent || documentElement;
                    });
                }
            });
            jQuery.each({
                scrollLeft: 'pageXOffset',
                scrollTop: 'pageYOffset'
            }, function (method, prop) {
                var top = 'pageYOffset' === prop;
                jQuery.fn[method] = function (val) {
                    return access(this, function (elem, method, val) {
                        var win = getWindow(elem);
                        if (val === undefined) {
                            return win ? win[prop] : elem[method];
                        }
                        if (win) {
                            win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
                        } else {
                            elem[method] = val;
                        }
                    }, method, val, arguments.length);
                };
            });
            jQuery.each([
                'top',
                'left'
            ], function (i, prop) {
                jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
                    if (computed) {
                        computed = curCSS(elem, prop);
                        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + 'px' : computed;
                    }
                });
            });
            jQuery.each({
                Height: 'height',
                Width: 'width'
            }, function (name, type) {
                jQuery.each({
                    padding: 'inner' + name,
                    content: type,
                    '': 'outer' + name
                }, function (defaultExtra, funcName) {
                    jQuery.fn[funcName] = function (margin, value) {
                        var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
                        return access(this, function (elem, type, value) {
                            var doc;
                            if (jQuery.isWindow(elem)) {
                                return funcName.indexOf('outer') === 0 ? elem['inner' + name] : elem.document.documentElement['client' + name];
                            }
                            if (elem.nodeType === 9) {
                                doc = elem.documentElement;
                                return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
                            }
                            return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                        }, type, chainable ? margin : undefined, chainable);
                    };
                });
            });
            jQuery.fn.extend({
                bind: function (types, data, fn) {
                    return this.on(types, null, data, fn);
                },
                unbind: function (types, fn) {
                    return this.off(types, null, fn);
                },
                delegate: function (selector, types, data, fn) {
                    return this.on(types, selector, data, fn);
                },
                undelegate: function (selector, types, fn) {
                    return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
                }
            });
            jQuery.parseJSON = JSON.parse;
            if (true) {
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return jQuery;
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }
            var _jQuery = window.jQuery, _$ = window.$;
            jQuery.noConflict = function (deep) {
                if (window.$ === jQuery) {
                    window.$ = _$;
                }
                if (deep && window.jQuery === jQuery) {
                    window.jQuery = _jQuery;
                }
                return jQuery;
            };
            if (!noGlobal) {
                window.jQuery = window.$ = jQuery;
            }
            return jQuery;
        }));
    },
    function (module, exports) {
        if (typeof jQuery !== 'undefined') {
            (function ($) {
                var __previousMethods__ = _.clone($.fn);
                _.extend($, {
                    svg: function (tag) {
                        var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
                        if (tag === 'svg' && !$platform.IE) {
                            node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                        }
                        return $(node);
                    }
                }).fn.extend({
                    $: function () {
                        return _.$.apply(null, [this].concat(_.asArray(arguments)));
                    },
                    on: function (what, method) {
                        var el = this, method = _.find(arguments, _.isFunction);
                        if (method.queuedBy) {
                            method.queuedBy.push({
                                remove: function () {
                                    el.off(what, method);
                                }
                            });
                        }
                        return __previousMethods__.on.apply(this, arguments);
                    },
                    item: function (value) {
                        if (value) {
                            if (this.length) {
                                this[0]._item = value;
                            }
                            return this;
                        } else {
                            return this.length ? this[0]._item : undefined;
                        }
                    },
                    props: function (what) {
                        _.extend.apply(null, [this[0]].concat(arguments));
                        return this;
                    },
                    props2: function (what) {
                        _.extend2.apply(null, [this[0]].concat(arguments));
                        return this;
                    },
                    hasWait: function () {
                        return this.hasClass('i-am-busy');
                    },
                    waitUntil: function (fn, then) {
                        this.addClass('i-am-busy').attr('disabled', true);
                        fn(this.$(function () {
                            this.removeClass('i-am-busy').removeAttr('disabled');
                            if (then) {
                                then.apply(null, arguments);
                            }
                        }));
                        return this;
                    },
                    hasParent: function (el) {
                        var parent = this;
                        while (parent.length > 0) {
                            if (parent[0] == (el[0] || el)) {
                                return true;
                            }
                            parent = parent.parent();
                        }
                        return false;
                    },
                    nonemptyValue: function () {
                        var value = $.trim(this.val());
                        return value.length == 0 ? undefined : value;
                    },
                    intValue: function () {
                        var value = parseInt(this.nonemptyValue(), 10);
                        return isNaN(value) ? undefined : value;
                    },
                    hitTest: function (event) {
                        var offset = this.offset();
                        var pt = {
                            x: event.clientX - offset.left,
                            y: event.clientY - offset.top
                        };
                        return pt.x >= 0 && pt.y >= 0 && pt.x < $(this).width() && pt.y < $(this).height();
                    },
                    attrs: function () {
                        return _.object(_.map(arguments, function (name) {
                            return [
                                name,
                                this.attr(name)
                            ];
                        }, this));
                    },
                    belongsTo: function (selector) {
                        return this.is(selector) || this.parents(selector).length;
                    },
                    selectClass: function (key, classes) {
                        return this.removeClass(_.values(classes).join(' ')).addClass(classes[key]);
                    },
                    attrInt: function (name) {
                        return (this.attr(name) || '').integerValue;
                    },
                    cssInt: function (name) {
                        return (this.css(name) || '').integerValue;
                    },
                    eachChild: function (selector, fn) {
                        _.each(this.find(selector), function (el) {
                            fn($(el));
                        });
                        return this;
                    },
                    transitionend: function (fn) {
                        return this.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', fn.oneShot);
                    },
                    animationend: function (fn) {
                        return this.one('animationend webkitAnimationEnd oAnimationEnd oanimation MSAnimationEnd', fn.oneShot);
                    },
                    animateWith: function (cls, done) {
                        if (cls) {
                            this.addClass(cls);
                            this.animationend(this.$(function () {
                                this.removeClass(cls);
                                if (done) {
                                    done.call(this);
                                }
                            }));
                        }
                        return this;
                    },
                    transitionWith: function (cls, done) {
                        if (cls) {
                            this.addClass(cls);
                            this.transitionend(this.$(function () {
                                this.removeClass(cls);
                                if (done) {
                                    done.call(this);
                                }
                            }));
                        }
                        return this;
                    },
                    drag: function () {
                        var translateTouchEvent = function (e, desiredTarget) {
                            return e.originalEvent.touches && _.find(e.originalEvent.touches, function (touch) {
                                return $(touch.target).hasParent(desiredTarget);
                            }) || e;
                        };
                        return function (cfg) {
                            this[0].dragConfig = cfg;
                            if (!$platform.touch && !window.__globalDragOverlay) {
                                window.__globalDragOverlay = $('<div>').css({
                                    display: 'none',
                                    position: 'fixed',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    zIndex: 999999
                                }).appendTo(document.body);
                            }
                            var overlay = window.__globalDragOverlay;
                            var button = cfg.button || 1;
                            var begin = this.$(function (initialEvent) {
                                var relativeTo = cfg.relativeTo || this;
                                this.addClass(cfg.cls || '');
                                if ($platform.touch || initialEvent.which === button) {
                                    var offset = relativeTo.offset(), memo = undefined;
                                    if (!cfg.start || (memo = cfg.start.call(cfg.context || this, new Vec2(initialEvent.pageX - offset.left, initialEvent.pageY - offset.top), initialEvent)) !== false) {
                                        var abort = undefined, unbind = undefined, end = undefined;
                                        memo = _.clone(memo);
                                        var move = this.$(function (e) {
                                            if ($platform.touch || e.which === button) {
                                                e.preventDefault();
                                                var translatedEvent = translateTouchEvent(e, this[0]);
                                                var offset = relativeTo.offset();
                                                memo = cfg.move.call(cfg.context || this, memo, new Vec2(translatedEvent.pageX - initialEvent.pageX, translatedEvent.pageY - initialEvent.pageY), new Vec2(translatedEvent.pageX - offset.left, translatedEvent.pageY - offset.top), translatedEvent) || memo;
                                            } else {
                                                abort(e);
                                            }
                                        });
                                        unbind = function () {
                                            $(overlay || document.body).css(overlay ? { display: 'none' } : {}).off('mouseup touchend', end).off('mousemove touchmove', move);
                                        };
                                        end = this.$(function (e) {
                                            unbind();
                                            if (cfg.end) {
                                                var translatedEvent = translateTouchEvent(e, this[0]);
                                                cfg.end.call(cfg.context || this, memo, new Vec2(translatedEvent.pageX - initialEvent.pageX, translatedEvent.pageY - initialEvent.pageY), translatedEvent);
                                            }
                                            this.removeClass(cfg.cls || '');
                                        });
                                        abort = this.$(function (e) {
                                            unbind();
                                            end(e);
                                        });
                                        $(overlay || document.body).css(overlay ? {
                                            display: '',
                                            cursor: cfg.cursor || ''
                                        } : {}).on('mousemove touchmove', move).one('mouseup touchend', end);
                                        if (cfg.callMoveAtStart) {
                                            cfg.move.call(cfg.context || this, memo, Vec2.zero, new Vec2(initialEvent.pageX - offset.left, initialEvent.pageY - offset.top), initialEvent);
                                        }
                                    }
                                }
                            });
                            var touchstartListener = _.$(this, function (e) {
                                var where = _.extend({}, translateTouchEvent(e, this[0]));
                                if ($platform.touch && cfg.longPress) {
                                    var cancel = undefined;
                                    var timeout = window.setTimeout(_.$(this, function () {
                                        this.off('touchmove touchend', cancel);
                                        begin(where);
                                    }), 300);
                                    cancel = this.$(function () {
                                        window.clearTimeout(timeout);
                                        this.off('touchmove touchend', cancel);
                                    });
                                    this.one('touchmove touchend', cancel);
                                } else {
                                    begin(where);
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            });
                            this.on($platform.touch ? 'touchstart' : 'mousedown', touchstartListener);
                            return _.extend(this, {
                                cancel: this.$(function () {
                                    this.off($platform.touch ? 'touchstart' : 'mousedown', touchstartListener);
                                })
                            });
                        };
                    }(),
                    transform: function (cfg) {
                        if (arguments.length === 0) {
                            var components = (this.css('transform') || '').match(/^matrix\((.+\))$/);
                            if (components) {
                                var m = components[1].split(',').map(parseFloat);
                                return new Transform({
                                    a: m[0],
                                    b: m[1],
                                    c: m[2],
                                    d: m[3],
                                    e: m[4],
                                    f: m[5]
                                });
                            } else {
                                return Transform.identity;
                            }
                        } else {
                            return this.css('transform', _.isStrictlyObject(cfg) && (cfg.translate ? 'translate(' + cfg.translate.x + 'px,' + cfg.translate.y + 'px) ' : '') + (cfg.rotate ? 'rotate(' + cfg.rotate + 'rad) ' : '') + (cfg.scale ? 'scale(' + new Vec2(cfg.scale).separatedWith(',') + ')' : '') || '');
                        }
                    },
                    svgTranslate: function (pt) {
                        return this.attr('transform', 'translate(' + pt.x + ',' + pt.y + ')');
                    },
                    svgTransformMatrix: function (t) {
                        var m = t.components;
                        return this.attr('transform', 'matrix(' + m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')');
                    },
                    svgTransformToElement: function (el) {
                        return Transform.svgMatrix(this[0].getTransformToElement(el[0]));
                    },
                    svgBBox: function (bbox) {
                        if (arguments.length === 0) {
                            return new BBox(this[0].getBBox());
                        } else {
                            return this.attr(bbox.xywh);
                        }
                    },
                    outerExtent: function () {
                        return new Vec2(this.outerWidth(), this.outerHeight());
                    },
                    extent: function () {
                        return new Vec2(this.width(), this.height());
                    },
                    innerExtent: function () {
                        return new Vec2(this.innerWidth(), this.innerHeight());
                    },
                    outerBBox: function () {
                        return BBox.fromLTWH(_.extend(this.offset(), this.outerExtent().asWidthHeight));
                    },
                    clientBBox: function () {
                        return BBox.fromLTWH(this[0].getBoundingClientRect());
                    },
                    leftTop: function () {
                        return new Vec2.fromLT(this.offset());
                    },
                    offsetInParent: function () {
                        return Vec2.fromLeftTop(this.offset()).sub(Vec2.fromLeftTop(this.parent().offset()));
                    },
                    monitorInput: function (cfg) {
                        var change = function () {
                            if ($.trim($(this).val()) === '') {
                                cfg.empty(true);
                            } else {
                                cfg.empty(false);
                            }
                        };
                        return this.keyup(change).change(change).focus(_.bind(cfg.focus || _.noop, cfg, true)).blur(_.bind(cfg.focus || _.noop, cfg, false));
                    },
                    touchClick: function (fn, cfg) {
                        var self = this;
                        cfg = cfg || {};
                        if (!cfg.disableTouch && $platform.touch) {
                            var touchstartHandler = function (e) {
                                fn.apply(this, arguments);
                                e.preventDefault();
                                return false;
                            };
                            var clickHandler = function (e) {
                                e.preventDefault();
                                return false;
                            };
                            if (cfg.handler) {
                                cfg.handler({
                                    unbind: function () {
                                        self.off('touchstart', touchstartHandler).off('click', clickHandler);
                                    }
                                });
                            }
                            return this.on('touchstart', touchstartHandler).on('click', clickHandler);
                        } else {
                            if (cfg.handler) {
                                cfg.handler({
                                    unbind: function () {
                                        self.off('click', fn);
                                    }
                                });
                            }
                            return this.click(fn);
                        }
                    },
                    touchDoubleclick: function (fn) {
                        if ($platform.touch) {
                            var lastTime = Date.now();
                            return this.on('touchend', function () {
                                var now = Date.now();
                                if (now - lastTime < 200) {
                                    fn.apply(this, arguments);
                                }
                                lastTime = now;
                            });
                        } else {
                            return this.dblclick(fn);
                        }
                    },
                    nodoubletapzoom: function () {
                        return $(this).bind('touchstart', function preventZoom(e) {
                            var t2 = e.timeStamp;
                            var t1 = $(this).data('lastTouch') || t2;
                            var dt = t2 - t1;
                            var fingers = e.originalEvent.touches.length;
                            $(this).data('lastTouch', t2);
                            if (!dt || dt > 500 || fingers > 1) {
                                return;
                            }
                            e.preventDefault();
                            $(e.target).trigger('click');
                        });
                    }
                });
            }(jQuery));
        }
    },
    function (module, exports) {
        (function ($) {
            if (typeof UI === 'undefined') {
                UI = {};
            }
            Panic = function (what, cfg) {
                cfg = _.defaults(_.clone(cfg || {}), {
                    dismiss: _.identity,
                    raw: false
                });
                if (_.isTypeOf(Error, what)) {
                    _.extend(cfg, _.pick(what, 'retry', 'dismiss'));
                }
                Panic.widget.append(what, cfg.raw);
                if (_.isFunction(cfg.retry)) {
                    Panic.widget.onRetry(cfg.retry);
                }
                if (_.isFunction(cfg.dismiss)) {
                    Panic.widget.onClose(cfg.dismiss);
                }
            };
            Panic.init = function () {
                if (!Panic._initialized) {
                    Panic._initialized = true;
                    _.withUncaughtExceptionHandler(function (e) {
                        Panic(e);
                        throw e;
                    });
                }
            };
            Panic.widget = $singleton(Component, {
                retryTriggered: $triggerOnce(),
                closeTriggered: $triggerOnce(),
                el: $memoized($property(function () {
                    var el = $('<div class="panic-modal-overlay" style="z-index:5000; display:none;">').append([
                        this.bg = $('<div class="panic-modal-overlay-background">'),
                        this.modal = $('<div class="panic-modal">').append([
                            this.modalBody = $('<div class="panic-modal-body">').append(this.title = $('<div class="panic-modal-title">Now panic!</div>')),
                            $('<div class="panic-modal-footer">').append([
                                this.btnRetry = $('<button type="button" class="panic-btn panic-btn-warning" style="display:none;">Try again</button>').touchClick(this.retry),
                                this.btnClose = $('<button type="button" class="panic-btn panic-btn-danger" style="display:none;">Close</button>').touchClick(this.close)
                            ])
                        ])
                    ]);
                    el.appendTo(document.body);
                    $(document).ready(function () {
                        el.appendTo(document.body);
                    });
                    try {
                        $(window).resize(this.layout).resize();
                        this.modal.enableScrollFaders({ scroller: this.modalBody });
                        $(document).keydown(this.$(function (e) {
                            if (e.keyCode === 27) {
                                this.close();
                            }
                        }));
                    } catch (e) {
                        _.delay(function () {
                            Panic(e);
                        });
                    }
                    return el;
                })),
                layout: function () {
                    var maxContentWidth = _.coerceToUndefined(_.max(_.map(this.modal.find('pre'), _.property('scrollWidth'))));
                    this.modal.css({
                        'max-height': $(window).height() - 100,
                        'width': maxContentWidth && maxContentWidth + 120
                    });
                    this.modalBody.scroll();
                },
                toggleVisibility: function (yes) {
                    if (yes !== !(this.el.css('display') === 'none')) {
                        if (yes) {
                            this.el.css('display', '');
                        }
                        this.el.animateWith(yes ? 'panic-modal-appear' : 'panic-modal-disappear', this.$(function () {
                            if (!yes) {
                                this.el.css('display', 'none');
                            }
                        }));
                    }
                },
                onRetry: function (retry) {
                    this.retryTriggered(retry);
                    this.btnRetry.css('display', '');
                },
                onClose: function (close) {
                    this.closeTriggered(close);
                    this.btnClose.css('display', '');
                },
                retry: function () {
                    this._clean();
                    this.closeTriggered.off();
                    this.toggleVisibility(false);
                    this.retryTriggered();
                },
                close: function () {
                    this._clean();
                    this.retryTriggered.off();
                    this.toggleVisibility(false);
                    this.closeTriggered();
                },
                _clean: function () {
                    this.modalBody.find('.panic-alert-error').remove();
                    this.modalBody.scroll();
                    this.btnRetry.css('display', 'none');
                    this.btnClose.css('display', 'none');
                },
                append: function (what, raw) {
                    var id = 'panic' + this.hash(what);
                    var counter = $('#' + id + ' .panic-alert-counter');
                    if (counter.length) {
                        counter.text((counter.text() || '1').parsedInt + 1);
                    } else {
                        $('<div class="panic-alert-error">').attr('id', id).append('<span class="panic-alert-counter">').append(this.print(what, raw)).insertAfter(this.el.find('.panic-modal-title'));
                    }
                    this.toggleVisibility(true);
                    this.layout();
                },
                hash: function (what) {
                    return ((_.isTypeOf(Error, what) ? what && what.stack : _.isTypeOf(Test, what) ? what.suite + what.name : _.stringify(what)) || '').hash;
                },
                print: function (what, raw) {
                    return _.isTypeOf(Error, what) ? this.printError(what) : _.isTypeOf(Test, what) ? this.printFailedTest(what) : this.printUnknownStuff(what, raw);
                },
                printUnknownStuff: function (what, raw) {
                    return raw ? what : $('<span>').text(log.impl.stringify(what));
                },
                printLocation: function (where) {
                    return $('<span class="location">').append([
                        $('<span class="callee">').text(where.calleeShort),
                        $('<span class="file">').text(where.fileName),
                        $('<span class="line">').text(where.line)
                    ]);
                },
                printFailedTest: function (test) {
                    var logEl = $('<pre class="test-log" style="margin-top: 13px;">');
                    log.withWriteBackend(this.$(function (params) {
                        if (_.isTypeOf(Error, params.args.first)) {
                            console.log(params.args.first);
                        }
                        logEl.append(_.isTypeOf(Error, params.args.first) ? $('<div class="inline-exception-entry">').append([
                            _.escape(params.indentation),
                            $('<div class="panic-alert-error inline-exception">').append(this.printError(params.args.first))
                        ]) : $('<div class="log-entry">').append(_.map(params.lines, function (line, i, lines) {
                            return $('<div class="line">').append(_.escape(params.indentation)).append(_.map(line, function (run) {
                                return $('<span>').attr('style', run.config.color && run.config.color.css || '').text(run.text);
                            })).append(i === lines.lastIndex ? [
                                params.where && this.printLocation(params.where),
                                params.trailNewlines.replace(/\n/g, '<br>')
                            ] : []);
                        }, this)));
                    }), function (done) {
                        test.evalLogCalls();
                        done();
                    });
                    return [
                        $('<div class="panic-alert-error-message" style="font-weight: bold;">').text(test.name).append('<span style="float:right; opacity: 0.25;">test failed</span>'),
                        logEl
                    ];
                },
                printError: function (e) {
                    var stackEntries = CallStack.fromErrorWithAsync(e);
                    return [
                        $('<div class="panic-alert-error-message" style="font-weight: bold;">').text(e.message).append(_.any(stackEntries, function (e, i) {
                            return (e.thirdParty || e['native'] || e.hide) && i !== 0;
                        }) ? '<a class="clean-toggle" href="javascript:{}"></a>' : '').click(this.$(function (e) {
                            $(e.delegateTarget).parent().toggleClass('all-stack-entries').transitionend(this.$(function () {
                                this.modalBody.scroll();
                            }));
                        })),
                        $('<div class="not-matching" style="margin-top: 5px; padding-left: 10px;">').append(_.map(_.coerceToArray(e.notMatching || []), function (s) {
                            return $('<pre>').text(log.impl.stringify(s));
                        })),
                        $('<ul class="callstack">').append(_.map(stackEntries, this.$(function (entry) {
                            var dom = $('<li class="callstack-entry">').toggleClass('third-party', entry.thirdParty || false).toggleClass('hide', entry.hide || false).toggleClass('native', entry['native'] || false).append([
                                $('<span class="file">').text(_.nonempty([
                                    entry.index ? '(index)' : entry.fileShort,
                                    entry.line
                                ]).join(':')),
                                $('<span class="callee">').text(entry.calleeShort),
                                $('<span class="src i-am-busy">').click(this.$(function (e) {
                                    var el = $(e.delegateTarget);
                                    el.waitUntil(SourceFiles.read.partial((entry.remote ? 'api/source/' : '') + entry.file), this.$(function (text) {
                                        if (dom.is('.full')) {
                                            dom.removeClass('full');
                                            dom.transitionend(function () {
                                                if (!dom.is('.full')) {
                                                    entry.sourceReady(el.$($.fn.text));
                                                }
                                            });
                                        } else {
                                            dom.addClass('full');
                                            el.html(_.map(text.split('\n'), function (line) {
                                                return $('<div class="line">').text(line);
                                            }));
                                            var line = el.find('.line').eq(entry.line - 1).addClass('hili');
                                            if (line.length) {
                                                var offset = line.offset().top - el.offset().top;
                                                el.scrollTop(offset - 100);
                                            }
                                            _.delay(this.$(function () {
                                                var shouldScrollDownMore = el.outerBBox().bottom + 242 - this.modalBody.outerBBox().bottom;
                                                if (shouldScrollDownMore > 0) {
                                                    this.modalBody.animate({ scrollTop: this.modalBody.scrollTop() + shouldScrollDownMore }, 250);
                                                }
                                            }));
                                        }
                                    }));
                                }))
                            ]);
                            entry.sourceReady(function (text) {
                                dom.find('.src').removeClass('i-am-busy').text(text);
                            });
                            return dom;
                        })))
                    ];
                }
            });
            $.fn.extend({
                enableScrollFaders: function (cfg) {
                    var horizontal = cfg && cfg.horizontal;
                    var faderTop, faderBottom, scroller = this.find(cfg && cfg.scroller || '.scroller');
                    this.css({ position: 'relative' });
                    this.append(faderTop = $('<div class="scroll-fader scroll-fader-' + (horizontal ? 'left' : 'top') + '"></div>')).append(faderBottom = $('<div class="scroll-fader scroll-fader-' + (horizontal ? 'right' : 'bottom') + '"></div>'));
                    scroller.scroll(function () {
                        var scrollTop = horizontal ? $(this).scrollLeft() : $(this).scrollTop(), height = horizontal ? $(this).width() : $(this).height(), max = (horizontal ? this.scrollWidth : this.scrollHeight) - 1;
                        faderTop.css({ opacity: scrollTop > 0 ? 1 : 0 });
                        faderBottom.css({ opacity: scrollTop + height < max ? 1 : 0 });
                    }).scroll();
                    return this;
                }
            });
        }(jQuery));
    },
    function (module, exports) {
        (function ($) {
            LogOverlay = $singleton(Component, {
                $defaults: { opaque: false },
                init: function () {
                    log.withWriteBackend(this.write, function () {
                    });
                    $(document).keydown(this.$(function (e) {
                        if (e.keyCode === 192) {
                            this.toggle();
                        } else if (e.keyCode === 27) {
                            this.body.empty();
                        }
                    }));
                },
                el: $memoized($property(function () {
                    return $('<div class="useless-log-overlay" style="display: none;">').append('<div class="useless-log-overlay-body">').appendTo(document.body);
                })),
                body: $memoized($property(function () {
                    return this.el.find('.useless-log-overlay-body');
                })),
                toggle: function (yes) {
                    this.el.toggle(yes);
                },
                visible: $property(function () {
                    return this.el.is(':visible');
                }),
                clip: function () {
                    var elHeight = this.el.height();
                    var bodyHeight = this.body.height();
                    this.body.children().filter(this.$(function (i, line) {
                        var lineTop = bodyHeight - $(line).offsetInParent().y;
                        var lineBottom = lineTop - $(line).height();
                        var clipHeight = elHeight / 2;
                        return lineTop > clipHeight && lineBottom > clipHeight;
                    })).remove();
                },
                write: function (params) {
                    this.toggle(true);
                    if (params.config.clear) {
                        this.body.empty();
                    }
                    this.body.append($('<div class="ulo-line">').attr('style', params.color && params.color.css || '').append($('<span class="ulo-line-text">').text(params.indentedText + ' ')).append($('<span class="ulo-line-where">').text(params.codeLocation + ' ')).append($('<span class="ulo-line-trail">').text(params.trailNewlines)));
                    this.clip.postpone();
                    if (!this.opaque) {
                        log.impl.defaultWriteBackend(params);
                    }
                }
            });
        }(jQuery));
    },
    function (module, exports, __webpack_require__) {
        var content = __webpack_require__(51);
        if (typeof content === 'string')
            content = [[
                    module.id,
                    content,
                    ''
                ]];
        var update = __webpack_require__(53)(content, {});
        if (content.locals)
            module.exports = content.locals;
        if (false) {
            if (!content.locals) {
                module.hot.accept('!!./../../css-loader/index.js!./Panic.css', function () {
                    var newContent = require('!!./../../css-loader/index.js!./Panic.css');
                    if (typeof newContent === 'string')
                        newContent = [[
                                module.id,
                                newContent,
                                ''
                            ]];
                    update(newContent);
                });
            }
            module.hot.dispose(function () {
                update();
            });
        }
    },
    function (module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(52)();
        exports.push([
            module.id,
            '@-webkit-keyframes bombo-jumbo {\n  0%   { -webkit-transform: scale(0); }\n  80%  { -webkit-transform: scale(1.2); }\n  100% { -webkit-transform: scale(1); } }\n\n@keyframes bombo-jumbo {\n  0%   { transform: scale(0); }\n  80%  { transform: scale(1.2); }\n  100% { transform: scale(1); } }\n\n@-webkit-keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n@keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n.i-am-busy { -webkit-animation: pulse-opacity 1s ease-in infinite; animation: pulse-opacity 1s ease-in infinite; pointer-events: none; }\n\n.panic-modal .scroll-fader-top, .scroll-fader-bottom { left: 42px; right: 42px; position: absolute; height: 20px; pointer-events: none; }\n.panic-modal .scroll-fader-top { top: 36px; background: -webkit-linear-gradient(bottom, rgba(255,255,255,0), rgba(255,255,255,1)); }\n.panic-modal .scroll-fader-bottom { bottom: 128px; background: -webkit-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,1)); }\n\n.panic-modal-appear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1);\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); }\n\n.panic-modal-disappear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); -webkit-animation-direction: reverse;\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); animation-direction: reverse; }\n\n.panic-modal-overlay {\n          display: -ms-flexbox; display: -moz-flex; display: -webkit-flex; display: flex;\n          -ms-flex-direction: column; -moz-flex-direction: column; -webkit-flex-direction: column; flex-direction: column;\n          -ms-align-items: center; -moz-align-items: center; -webkit-align-items: center; align-items: center;\n          -ms-flex-pack: center; -ms-align-content: center; -moz-align-content: center; -webkit-align-content: center; align-content: center;\n          -ms-justify-content: center; -moz-justify-content: center; -webkit-justify-content: center; justify-content: center;\n          position: fixed; left: 0; right: 0; top: 0; bottom: 0; }\n\n.panic-modal-overlay-background { z-index: 1; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background: white; opacity: 0.75; }\n\n.panic-modal * { letter-spacing: 0; font-family: Helvetica, sans-serif; }\n.panic-modal { font-family: Helvetica, sans-serif; min-width: 640px; max-width: 90%; transition: 0.25s width ease-in-out; box-sizing: border-box; display: -webkit-flex; display: flex; position: relative; border-radius: 4px; z-index: 2; width: 640px; background: white; padding: 36px 42px 128px 42px; box-shadow: 0px 30px 80px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15); }\n.panic-alert-counter { float: left; background: #904C34; border-radius: 8px; width: 17px; height: 17px; display: inline-block; text-align: center; line-height: 16px; margin-right: 1em; margin-left: -2px; font-size: 10px; color: white; font-weight: bold; }\n.panic-alert-counter:empty { display: none; }\n\n.panic-modal-title { font-family: Helvetica, sans-serif; color: black; font-weight: 300; font-size: 30px; opacity: 0.5; margin-bottom: 1em; }\n.panic-modal-body { overflow-y: auto; width: 100%; }\n.panic-modal-footer { text-align: right; position: absolute; left: 0; right: 0; bottom: 0; padding: 42px; }\n\n.panic-btn { margin-left: 1em; font-weight: 300; font-family: Helvetica, sans-serif; -webkit-user-select: none; user-select: none; cursor: pointer; display: inline-block; padding: 1em 1.5em; border-radius: 4px; font-size: 14px; border: 1px solid black; color: white; }\n.panic-btn:focus { outline: none; }\n.panic-btn:focus { box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); }\n\n.panic-btn-danger       { background-color: #d9534f; border-color: #d43f3a; }\n.panic-btn-danger:hover { background-color: #c9302c; border-color: #ac2925; }\n\n.panic-btn-warning       { background-color: #f0ad4e; border-color: #eea236; }\n.panic-btn-warning:hover { background-color: #ec971f; border-color: #d58512; }\n\n.panic-alert-error { border-radius: 4px; background: #FFE8E2; color: #904C34; padding: 1em 1.2em 1.2em 1.2em; margin-bottom: 1em; font-size: 14px; }\n\n.panic-alert-error { position: relative; text-shadow: 0px 1px 0px rgba(255,255,255,0.25); }\n\n.panic-alert-error .clean-toggle { height: 2em; text-decoration: none; font-weight: 300; position: absolute; color: black; opacity: 0.25; right: 0; top: 0; display: block; text-align: right; }\n.panic-alert-error .clean-toggle:hover { text-decoration: underline; }\n.panic-alert-error .clean-toggle:before,\n.panic-alert-error .clean-toggle:after { position: absolute; right: 0; transition: all 0.25s ease-in-out; display: inline-block; overflow: hidden; }\n.panic-alert-error .clean-toggle:before { -webkit-transform-origin: center left; transform-origin: center left; content: \'more\'; }\n.panic-alert-error .clean-toggle:after { -webkit-transform-origin: center left; transform-origin: center right; content: \'less\'; }\n.panic-alert-error.all-stack-entries .clean-toggle:before { -webkit-transform: scale(0); transform: scale(0); }\n.panic-alert-error:not(.all-stack-entries) .clean-toggle:after { -webkit-transform: scale(0); transform: scale(0); }\n\n.panic-alert-error:last-child { margin-bottom: 0; }\n\n.panic-alert-error-message { line-height: 1.2em; position: relative; }\n\n.panic-alert-error .callstack { font-size: 12px; margin: 2em 0 0.1em 0; padding: 0; }\n.panic-alert-error .callstack * { font-family: Menlo, monospace; }\n\n.panic-alert-error .callstack-entry { white-space: nowrap; opacity: 1; transition: all 0.25s ease-in-out; margin-top: 10px; list-style-type: none; max-height: 38px; overflow: hidden; }\n.panic-alert-error .callstack-entry .file { }\n.panic-alert-error .callstack-entry .file:not(:empty) + .callee:not(:empty):before { content: \' \\2192   \'; }\n\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.third-party:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.hide:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.native:not(:first-child) { max-height: 0; margin-top: 0; opacity: 0; }\n\n.panic-alert-error .callstack-entry,\n.panic-alert-error .callstack-entry * { line-height: initial; }\n.panic-alert-error .callstack-entry .src { overflow: hidden; transition: height 0.25s ease-in-out; height: 22px; border-radius: 2px; cursor: pointer; margin-top: 2px; white-space: pre; display: block; color: black; background: rgba(255,255,255,0.75); padding: 4px; }\n.panic-alert-error .callstack-entry.full .src { font-size: 12px; height: 200px; overflow: scroll; }\n.panic-alert-error .callstack-entry.full .src .line.hili { background: yellow; }\n.panic-alert-error .callstack-entry.full { max-height: 220px; }\n\n.panic-alert-error .callstack-entry .src.i-am-busy { background: white; }\n\n.panic-alert-error .callstack-entry        .src:empty                  { pointer-events: none; }\n.panic-alert-error .callstack-entry        .src:empty:before           { content: \'<< SOURCE NOT LOADED >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry.native .src:empty:before           { content: \'<< NATIVE CODE >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry        .src.i-am-busy:empty:before { content: \'<< SOURCE LOADING >>\'; color: rgba(0,0,0,0.5); }\n\n.panic-alert-error .test-log .location { transition: opacity 0.25s ease-in-out; color: black; opacity: 0.25; display: inline-block; overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }\n.panic-alert-error .test-log .location:hover { opacity: 1; }\n\n.panic-alert-error .test-log .location:before { content: \' @ \'; }\n\n.panic-alert-error .test-log .location .callee:after  { content: \', \'; }\n.panic-alert-error .test-log .location .file          { opacity: 0.5; }\n.panic-alert-error .test-log .location .line:before   { content: \':\'; }\n.panic-alert-error .test-log .location .line          { opacity: 0.25; }\n\n/*  Hack to prevent inline-blocked divs from wrapping within white-space: pre;\n */\n.panic-alert-error .test-log .inline-exception-entry:after { content: \' \'; }\n.panic-alert-error .test-log .log-entry        .line:after { content: \' \'; }\n.panic-alert-error           .callstack-entry  .line:after { content: \' \'; }\n\n.panic-alert-error pre { overflow: scroll; border-radius: 2px; color: black; background: rgba(255,255,255,0.75); padding: 4px; margin: 0; }\n.panic-alert-error pre,\n.panic-alert-error pre * { font-family: Menlo, monospace; font-size: 11px; white-space: pre !important; }\n\n.panic-alert-error.inline-exception { max-width: 640px; border-radius: 0; margin: 0; background: none; display: inline-block; transform-origin: 0 0; transform: scale(0.95); }\n.panic-alert-error.inline-exception .panic-alert-error-message { cursor: pointer; }\n.panic-alert-error.inline-exception:not(:first-child) { margin-top: 10px; border-top: 1px solid #904C34; }\n\n',
            ''
        ]);
    },
    function (module, exports) {
        module.exports = function () {
            var list = [];
            list.toString = function toString() {
                var result = [];
                for (var i = 0; i < this.length; i++) {
                    var item = this[i];
                    if (item[2]) {
                        result.push('@media ' + item[2] + '{' + item[1] + '}');
                    } else {
                        result.push(item[1]);
                    }
                }
                return result.join('');
            };
            list.i = function (modules, mediaQuery) {
                if (typeof modules === 'string')
                    modules = [[
                            null,
                            modules,
                            ''
                        ]];
                var alreadyImportedModules = {};
                for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    if (typeof id === 'number')
                        alreadyImportedModules[id] = true;
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    if (typeof item[0] !== 'number' || !alreadyImportedModules[item[0]]) {
                        if (mediaQuery && !item[2]) {
                            item[2] = mediaQuery;
                        } else if (mediaQuery) {
                            item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
                        }
                        list.push(item);
                    }
                }
            };
            return list;
        };
    },
    function (module, exports, __webpack_require__) {
        var stylesInDom = {}, memoize = function (fn) {
                var memo;
                return function () {
                    if (typeof memo === 'undefined')
                        memo = fn.apply(this, arguments);
                    return memo;
                };
            }, isOldIE = memoize(function () {
                return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
            }), getHeadElement = memoize(function () {
                return document.head || document.getElementsByTagName('head')[0];
            }), singletonElement = null, singletonCounter = 0, styleElementsInsertedAtTop = [];
        module.exports = function (list, options) {
            if (false) {
                if (typeof document !== 'object')
                    throw new Error('The style-loader cannot be used in a non-browser environment');
            }
            options = options || {};
            if (typeof options.singleton === 'undefined')
                options.singleton = isOldIE();
            if (typeof options.insertAt === 'undefined')
                options.insertAt = 'bottom';
            var styles = listToStyles(list);
            addStylesToDom(styles, options);
            return function update(newList) {
                var mayRemove = [];
                for (var i = 0; i < styles.length; i++) {
                    var item = styles[i];
                    var domStyle = stylesInDom[item.id];
                    domStyle.refs--;
                    mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (domStyle.refs === 0) {
                        for (var j = 0; j < domStyle.parts.length; j++)
                            domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) {
                        domStyle.parts[j](item.parts[j]);
                    }
                    for (; j < item.parts.length; j++) {
                        domStyle.parts.push(addStyle(item.parts[j], options));
                    }
                } else {
                    var parts = [];
                    for (var j = 0; j < item.parts.length; j++) {
                        parts.push(addStyle(item.parts[j], options));
                    }
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function listToStyles(list) {
            var styles = [];
            var newStyles = {};
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var id = item[0];
                var css = item[1];
                var media = item[2];
                var sourceMap = item[3];
                var part = {
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                if (!newStyles[id])
                    styles.push(newStyles[id] = {
                        id: id,
                        parts: [part]
                    });
                else
                    newStyles[id].parts.push(part);
            }
            return styles;
        }
        function insertStyleElement(options, styleElement) {
            var head = getHeadElement();
            var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
            if (options.insertAt === 'top') {
                if (!lastStyleElementInsertedAtTop) {
                    head.insertBefore(styleElement, head.firstChild);
                } else if (lastStyleElementInsertedAtTop.nextSibling) {
                    head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
                } else {
                    head.appendChild(styleElement);
                }
                styleElementsInsertedAtTop.push(styleElement);
            } else if (options.insertAt === 'bottom') {
                head.appendChild(styleElement);
            } else {
                throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
            }
        }
        function removeStyleElement(styleElement) {
            styleElement.parentNode.removeChild(styleElement);
            var idx = styleElementsInsertedAtTop.indexOf(styleElement);
            if (idx >= 0) {
                styleElementsInsertedAtTop.splice(idx, 1);
            }
        }
        function createStyleElement(options) {
            var styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            insertStyleElement(options, styleElement);
            return styleElement;
        }
        function createLinkElement(options) {
            var linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
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
            } else if (obj.sourceMap && typeof URL === 'function' && typeof URL.createObjectURL === 'function' && typeof URL.revokeObjectURL === 'function' && typeof Blob === 'function' && typeof btoa === 'function') {
                styleElement = createLinkElement(options);
                update = updateLink.bind(null, styleElement);
                remove = function () {
                    removeStyleElement(styleElement);
                    if (styleElement.href)
                        URL.revokeObjectURL(styleElement.href);
                };
            } else {
                styleElement = createStyleElement(options);
                update = applyToTag.bind(null, styleElement);
                remove = function () {
                    removeStyleElement(styleElement);
                };
            }
            update(obj);
            return function updateStyle(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
                        return;
                    update(obj = newObj);
                } else {
                    remove();
                }
            };
        }
        var replaceText = function () {
            var textStore = [];
            return function (index, replacement) {
                textStore[index] = replacement;
                return textStore.filter(Boolean).join('\n');
            };
        }();
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? '' : obj.css;
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = replaceText(index, css);
            } else {
                var cssNode = document.createTextNode(css);
                var childNodes = styleElement.childNodes;
                if (childNodes[index])
                    styleElement.removeChild(childNodes[index]);
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
            if (media) {
                styleElement.setAttribute('media', media);
            }
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = css;
            } else {
                while (styleElement.firstChild) {
                    styleElement.removeChild(styleElement.firstChild);
                }
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        function updateLink(linkElement, obj) {
            var css = obj.css;
            var sourceMap = obj.sourceMap;
            if (sourceMap) {
                css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */';
            }
            var blob = new Blob([css], { type: 'text/css' });
            var oldSrc = linkElement.href;
            linkElement.href = URL.createObjectURL(blob);
            if (oldSrc)
                URL.revokeObjectURL(oldSrc);
        }
    },
    function (module, exports, __webpack_require__) {
        var content = __webpack_require__(55);
        if (typeof content === 'string')
            content = [[
                    module.id,
                    content,
                    ''
                ]];
        var update = __webpack_require__(53)(content, {});
        if (content.locals)
            module.exports = content.locals;
        if (false) {
            if (!content.locals) {
                module.hot.accept('!!./../../css-loader/index.js!./LogOverlay.css', function () {
                    var newContent = require('!!./../../css-loader/index.js!./LogOverlay.css');
                    if (typeof newContent === 'string')
                        newContent = [[
                                module.id,
                                newContent,
                                ''
                            ]];
                    update(newContent);
                });
            }
            module.hot.dispose(function () {
                update();
            });
        }
    },
    function (module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(52)();
        exports.push([
            module.id,
            '.useless-log-overlay {\tposition: fixed; bottom: 10px; left: 10px; right: 10px; top: 10px; z-index: 5000;\n\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t\t\t-webkit-mask-image: -webkit-gradient(linear, left top, left bottom,\n\t\t\t\t\t\t\tcolor-stop(0.00, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.50, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.60, rgba(0,0,0,0.8)),\n\t\t\t\t\t\t\tcolor-stop(1.00, rgba(0,0,0,1))); }\n\n.useless-log-overlay-body {\n\n\tfont-family: Menlo, monospace;\n\tfont-size: 11px;\n\twhite-space: pre;\n\tbackground: rgba(255,255,255,1);\n\ttext-shadow: 1px 1px 0px rgba(0,0,0,0.07); position: absolute; bottom: 0; left: 0; right: 0; }\n\n.ulo-line \t\t{ white-space: pre; word-wrap: normal; }\n.ulo-line-where { color: black; opacity: 0.25; }',
            ''
        ]);
    }
]));