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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

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


/***/ },
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ../es7-object-polyfill/es7-object-polyfill.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = function () {
	"use strict";

	var ownKeys = __webpack_require__(/*! reflect.ownkeys */ 33);
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

/***/ },
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./base/3rd/underscore-fix.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ = module.exports = __webpack_require__(/*! underscore */ 36);

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

/***/ },
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** ./base/CPS.js ***!
  \*********************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./base/Channel.js ***!
  \*************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

    def[name] = Tags.modify(value, function () {
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

/***/ },
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** ./base/OOP.js ***!
  \*********************/
/***/ function(module, exports) {

"use strict";
"use strict";

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
------------------------------------------------------------------------

Hot-wires some common C++/Java/C# ways to OOP with JavaScript's ones.

------------------------------------------------------------------------
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
                $assertTypeMatches(this.constructor.$definition.foo, { subject: { get: 'function' }, $property: true });
                return 42;
            },

            $static: {
                get bar() {
                    return 42;
                }
            }
        });

        $assertTypeMatches(Foo.$definition.bar, { subject: { get: 'function' }, $property: true, $static: true });
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

        $assert(def.finalCrash.$final); // you can add new tags to alias members
        $assertNot(def.crash.$final); // adding tags to alias members does not affect original members 
        $assertNot(def.error.$final);

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
        $assert(_.isTypeOf(Tags, foo.constructor.$definition.noop)); // note how $static group is collapsed to normal form

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

    _(['property', 'static', 'final', 'alias', 'memoized', 'private', 'builtin', 'hidden', 'testArguments']).each(Tags.define);

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
            return $prototype.impl.compileMixin(_.extend(def, { constructor: constructor }));
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
            Tags.define(name);
            $prototype.impl.tagTriggeredMacros['$' + name] = fn;
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

        wrapMethods: function wrapMethods(def, op) {
            return Tags.map(def, function (fn, k, t) {
                return _.isFunction(fn) ? op(fn, k, t).wraps(fn) : fn;
            });
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
                        _.each(_.keys(value), function (tag) {
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
                        if (_.isObject(memberDef) && '$' + tagName in memberDef) {
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
                    _.defaults(def, _.omit(trait.$definition, _.or($builtin.matches, _.key(_.equals('constructor')))));
                });
            },

            extendWithTags: function extendWithTags(def) {
                return _.extendWith($untag(def), _.mapValues(Tags.get(def), $static.arity1));
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
                    return _.extend(def, { constructor: Tags.modify(def.hasOwnProperty('constructor') ? def.constructor : this.defaultConstructor(base), function (fn) {
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
                this.defineMembers($untag(def.constructor), _.pick(def, $static.matches));
                return def;
            },

            defineInstanceMembers: function defineInstanceMembers(def) {
                this.defineMembers($untag(def.constructor).prototype, _.omit(def, $static.matches));
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

            ensureFinalContracts: function ensureFinalContracts(base) {
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

                    return [refName, $property.is(member) ? $property({ get: function get() {
                            return this[refName];
                        },
                        set: function set(x) {
                            this[refName] = x;
                        } }) : Tags.extend(refValue, Tags.omit(member, '$alias'))];
                } else {
                    return [name, member];
                }
            },

            groupMembersByTagForFastEnumeration: function groupMembersByTagForFastEnumeration(def) {
                var membersByTag = {};

                _.each(def, function (m, name) {
                    Tags.each(m, function (tag) {
                        (membersByTag[tag] = membersByTag[tag] || {})[name] = m;
                    });
                });

                def.$membersByTag = $static($builtin($property(membersByTag)));return def;
            },

            isTagGroup: function isTagGroup(value_, key) {
                var value = $untag(value_);
                return key[0] === '$' && _.isFunction($global[key]) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !_.isArray(value);
            },

            modifyMember: function modifyMember(member, newValue) {
                return $property.is(member) && Tags.modify(member, function (value) {
                    return _.extend(value, _.map2(_.pick(value, 'get', 'set'), newValue));
                }) || _.isFunction($untag(member)) && Tags.modify(member, newValue) || member;
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
        Tags.define(k);
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
    Tags.define('callableAsFreeFunction');
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
    Tags.define('callableAsMethod');
    $prototype.macroTag('callableAsMethod', function (def, value, name) {
        def[name] = Tags.modify(value, _.asMethod);
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

/***/ },
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./base/Parse.js ***!
  \***********************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./base/Promise+.js ***!
  \**************************/
/***/ function(module, exports) {

"use strict";
"use strict";

/*  Promise-centric extensions (WIP) /// TODO: REFACTOR
    ======================================================================== */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        return [__.map(111, _.appends('bar')).assert('111bar'), __.map([222], _.appends('bar')).assert(['222bar']), __.map(__(333), _.appends('bar')).assert('333bar'), __.map({ foo: 444 }, _.appends('bar')).assert({ foo: '444bar' }), __.map({ foo: 555 }, __.constant('bar')).assert({ foo: 'bar' }), __.map(['a', 'b', 'c', 'd', 'e'], function (x, i) {
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
    } catch (e) {
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
        return this.race(__.delay(ms).reject(new TimeoutError()));
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
    return __.scatter(x, function (v, k, x) {
        return __.then(fn.$(v, k, x), function (x) {
            return [x, k];
        });
    }, cfg);
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

/***/ },
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!********************!*\
  !*** ./base/Rx.js ***!
  \********************/
/***/ function(module, exports) {

"use strict";
"use strict";

$global.R = $singleton({
    $test: function $test() {

        var $assertExpr = function $assertExpr(a, b) {
            $assert(a, _.quote(b.str, '//'));
        };

        /*  R should be used for code clarity purposes when one needs to generate a
            complex regular expression that is hard to read and maintain.
         */
        $assertExpr('/[^\\s]*/', $r.anyOf.except.space.$);
        $assertExpr('/\\[.*\\]|[\\s]/', $r.anything.inBrackets.or.oneOf.space.$);

        var expr = $r.expr('before', $r.anything.text('$print').something).then($r.expr('argument', $r.someOf.except.text(',)')).inParentheses.then($r.expr('tail', $r.anything))).$;

        /*  Above construction generates the following regular expression
         */
        $assertExpr('/(.*\\$print.+)\\(([^,\\)]+)\\)(.*)/', expr);

        /*  Main feature: named groups, easily accessible as dictionary elements.
         */
        $assert(expr.parse(' var x = $print (blabla) // lalala '), { before: ' var x = $print ',
            argument: 'blabla',
            tail: ' // lalala ' });

        /*  Based on Lisp-like list based syntax, for easy programmatic generation and stuff
         */
        $assert([['[^', '\\s', "\]"], '*'], R.anyOf(R.except(R.space)));
    },


    constructor: function constructor() {

        this.reduce = _.hyperOperator(_.binary, _.reduce2, _.goDeeperAlwaysIfPossible, _.isNonTrivial.and(_.not(this.isSubexpr)));

        this.initDSL();
    },

    expr: function expr(_expr, subexprs) {
        subexprs = subexprs || [];
        return new R.Expr(R.reduce('', _expr, function (memo, s) {
            if (R.isSubexpr(s)) {
                subexprs.push(s);
                return memo + R.expr(R.root(s.value), subexprs).str;
            } else {
                return memo + s;
            }
        }), subexprs);
    },


    Expr: $prototype({

        constructor: function constructor(str, subexprs) {
            this.rx = new RegExp();
            this.rx.compile(str);
            this.str = str;
            this.subexprs = subexprs;
        },

        parse: function parse(str) {
            var match = str.match(this.rx);
            return match && _.extend.apply(null, _.zipWith([match.slice(1), this.subexprs], function (match, subexpr) {
                return _.fromPairs([[subexpr.name, match]]);
            })) || {};
        }
    }),

    escape: function escape(s) {
        return _.map(s, function (x) {
            return R.metacharacters[x] ? '\\' + x : x;
        }).join('');
    },

    text: $alias('escape'),

    subexpr: function subexpr(name, s) {
        return { name: name, value: ['(', s, ')'] };
    },

    maybe: function maybe(s) {
        return [s, '?'];
    },
    anyOf: function anyOf(s) {
        return [s, '*'];
    },
    someOf: function someOf(s) {
        return [s, '+'];
    },

    oneOf: function oneOf(s) {
        return ['[', s, ']'];
    },
    except: function except(s) {
        return ['[^', s, ']'];
    },

    or: function or(a, b) {
        return [a, '|', b];
    },

    $property: {

        metacharacters: _.index('\\^$.|?*+()[{'),

        begin: '^',
        end: '$',
        space: '\\s',
        maybeSpaces: '\\s*',
        spaces: '\\s+',
        anything: '.*',
        something: '.+',
        comma: ','
    },

    parentheses: function parentheses(s) {
        return ['\\(', s, '\\)'];
    },
    brackets: function brackets(s) {
        return ['\\[', s, '\\]'];
    },

    isSubexpr: function isSubexpr(s) {
        return _.isStrictlyObject(s) && !_.isArray(s) ? true : false;
    },

    root: function root(r) {
        return r && r.$$ ? r.$$ : r;
    },

    initDSL: function initDSL() {

        $global.property('$r', function () {
            return $$r([]);
        });
        $global.const('$$r', function (cursor) {

            var shift = function shift(x) {
                return cursor.push(x), cursor.forward;
            };
            var def = _.defineHiddenProperty;

            def(cursor, 'then', function (x) {
                cursor.push(R.root(x));return cursor;
            });
            def(cursor, 'text', function (x) {
                cursor.push(R.text(x));return cursor;
            });
            def(cursor, 'expr', function (x, s) {
                cursor.push(R.subexpr(x, R.root(s)));return cursor;
            });

            def(cursor, 'forward', function () {
                return cursor.next || ((cursor.next = $r).prev = cursor).next;
            });

            _.each(['maybe', 'anyOf', 'someOf', 'oneOf', 'except'], function (key) {
                def(cursor, key, function () {
                    return shift(R[key](cursor.forward));
                });
            });

            _.each(['parentheses', 'brackets'], function (key) {
                return def(cursor, 'in' + key.capitalized, function () {
                    return cursor.$$.prev = $$r(R[key](cursor.$$));
                });
            });

            _.each(['or'], function (key) {
                return def(cursor, key, function () {
                    var next = $r;
                    return (next.prev = cursor.$$.prev = $$r(R[key](cursor.$$, next))).next = next;
                });
            });

            _.each(['begin', 'end', 'space', 'anything', 'something'], function (key) {
                return def(cursor, key, function () {
                    return shift([R[key], cursor.forward]);
                });
            });

            def(cursor, '$$', function () {
                var root = cursor;
                while (root.prev) {
                    root = root.prev;
                }
                return root;
            });

            def(cursor, '$', function () {
                return R.expr(cursor.$$);
            });

            return cursor;
        });
    }
});

/***/ },
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./base/Sort.js ***!
  \**********************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 10 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./base/component.js ***!
  \***************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

        Tags.define('dummy');

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
                    return Tags.modify(fn, function (fn) {
                        return fn.then(_.sum.$(2));
                    });
                } } });

        var Base = $component({ $macroTags: {
                add_20: function add_20(def, fn, name) {
                    return Tags.modify(fn, function (fn) {
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
    } };

/*  General syntax
 */
$global.$component = function (definition) {
    return $extends(Component, definition);
};

_(['extendable', 'trigger', 'triggerOnce', 'barrier', 'bindable', 'memoize', 'interlocked', 'memoizeCPS', 'debounce', 'throttle', 'overrideThis', 'listener', 'postpones', 'reference', 'raw', 'binds', 'observes']).each(Tags.define);(function () {
    var impl = function impl(_impl) {
        return function (x, fn) {
            return _.isFunction(x) && arguments.length === 1 ? _impl(x, fn) : // $observableProperty (listener)
            _impl(fn, x);
        };
    }; // $observableProperty (value[, listener])

    Tags.define('observableProperty', impl);
    Tags.define('observable', impl);
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

                var clonedStream = def[name] = Tags.clone(stream);
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

                    def[name] = $bindable({ hooks: hooks }, Tags.clone(member));
                }
            }, this);

            return def;
        } },

    /*  Syntax helper
     */
    isStreamDefinition: $static(function (def) {
        return _.isObject(def) && (def.$trigger || def.$triggerOnce || def.$barrier || def.$observable || def.$observableProperty);
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
            if (!(def && def.$property)) {
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
            if (name !== '$' && name !== 'init' && !(def && def.$raw)) {
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
            if (def !== undefined) {

                /*  Expand $observableProperty
                    TODO: rewrite with $prototype.macro
                 */
                if (def.$observableProperty) {
                    var definitionValue = def.subject;
                    var defaultValue = name in cfg ? cfg[name] : definitionValue;
                    var streamName = name + 'Change';

                    /*  xxxChange stream
                     */
                    var observable = excludeFromCfg[streamName] = this[streamName] = _.observable();
                    observable.context = this;
                    observable.postpones = def.$postpones;

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
                    if (def.$reference) {
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
                    if (_.isFunction(def.$observableProperty)) {
                        initialStreamListeners.push([observable, def.$observableProperty]);
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
                        var stream = excludeFromCfg[name] = this[name] = _.extend((def.$trigger ? _.trigger : def.$triggerOnce ? _.triggerOnce : def.$observable ? _.observable : def.$barrier ? _.barrier : undefined)(def.subject), { context: this, postpones: def.$postpones });

                        /*  tracking by reference
                         */
                        if (def.$reference) {
                            observable.trackReference = true;
                        }

                        if (def.listeners) {
                            _.each(def.listeners, function (value) {
                                initialStreamListeners.push([stream, value]);
                            });
                        }

                        /*  Default listener which comes from $observable (defValue, defListener) syntax
                         */
                        if (_.isFunction(def.$observable)) {
                            initialStreamListeners.push([stream, def.$observable]);
                        }

                        var defaultListener = cfg[name];
                        if (defaultListener) {
                            if (def.$observable && defaultListener.isObservable) {
                                // two-way observable binding
                                defaultListener.tie(stream);
                            } else {
                                initialStreamListeners.push([stream, defaultListener]);
                            }
                        }
                    }

                /*  Expand $listener (TODO: REMOVE)
                 */
                if (def.$listener) {
                    this[name].queuedBy = [];
                }

                /*  Expand $interlocked
                 */
                if (def.$interlocked) {
                    this[name] = _.interlocked(this[name]);
                }

                /*  Expand $bindable
                 */
                if (def.$bindable) {
                    this[name] = _.extend(_.bindable(this[name], this), _.map2(def.$bindable.hooks || {}, _.mapsWith(this.$.bind(this).arity1)));
                }
                /*  Expand $debounce
                 */
                if (def.$debounce) {
                    var fn = this[name],
                        opts = _.coerceToObject(def.$debounce);
                    this[name] = fn.debounced(opts.wait || 500, opts.immediate);
                }

                /*  Expand $throttle
                 */
                if (def.$throttle) {
                    var fn = this[name],
                        opts = _.coerceToObject(def.$throttle);
                    this[name] = _.throttle(fn, opts.wait || 500, opts);
                }

                /*  Expand $memoize
                 */
                if (def.$memoize) {
                    this[name] = _.memoize(this[name]);
                } else if (def.$memoizeCPS) {
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
            if (def && def.$alias && !def.$raw) {
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

/***/ },
/* 11 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./base/concurrency.js ***!
  \*****************************/
/***/ function(module, exports) {

"use strict";
"use strict";

/*  Unit test / documentation / specification / how-to.
    ======================================================================== */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    return _.argumentPrependingWrapper(Tags.unwrap(fn), function ( /* acquire */fn) {

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

/***/ },
/* 12 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./base/dynamic/bindable.js ***!
  \**********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 13 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/dynamic/stream.js ***!
  \********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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


        /*  Test _.allTriggered
         */
        var t1 = _.triggerOnce(),
            t2 = _.triggerOnce(),
            // test pair1
        t3 = _.triggerOnce(),
            t4 = _.triggerOnce(); // test pair2

        _.allTriggered([t1, t2], function () {
            $fail;
        });t1(); // pair1: should not cause _.allTriggered to trigger

        $assertEveryCalledOnce(function (mkay) {
            _.allTriggered([t3, t4], mkay);t3();t4();
        }); // pair2: should trigger _.allTriggered
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

    allTriggered: function allTriggered(triggers, then) {
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

        _.defineProperty(barrier, 'promise', function () {
            return new Promise(function (resolve) {
                barrier(resolve);
            });
        });

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
        var _this = this;

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
        return self = _.extend($restArg(frontEnd), cfg, {
            queue: queue,
            once: once,
            off: _.off.asMethod,
            read: read,
            write: write,
            postpone: function postpone() {
                for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                    args[_key9] = arguments[_key9];
                }

                _this.postponed.apply(self.context, args);
            } });
    } });

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

/***/ },
/* 14 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./base/http.js ***!
  \**********************/
/***/ function(module, exports) {

"use strict";
"use strict";

/*  ------------------------------------------------------------------------ */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var O = Object;

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

        /*  Reference to the abort method (will be initialized at Promise construction) */

        var abort = undefined;

        /*  returned Promise     */

        var p = new Promise(function (resolve, reject) {

            if ($platform.Browser) {

                var prePath = cfg.protocol || cfg.hostname || cfg.port ? (cfg.protocol || window.location.protocol) + '//' + (cfg.hostname || window.location.hostname) + ':' + (cfg.port || window.location.port) : '';

                /*  Init XMLHttpRequest
                 */
                var xhr = new XMLHttpRequest();
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
                if (cfg.progress) {
                    xhr.onprogress = Http.progressCallbackWithSimulation(cfg.progress);
                }

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
            } else {
                reject('not implemented');
            }
        });

        /*  Add abort method to the returned Promise
         */
        return _.extend(p, { abort: abort });
    },
    progressCallbackWithSimulation: function progressCallbackWithSimulation(progress) {
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

/***/ },
/* 15 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./base/infix/Array.js ***!
  \*****************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

    arr = [1, 2, 3];
    $assert(arr.reversed, [3, 2, 1]);
    $assert(arr, [1, 2, 3]); // does not mutate original (in contrary to .reverse)

    $assert([[1], [[2], 3], 4].flat, [1, [2], 3, 4]);
    $assert([[1, 2, 3], [4, 5, 6]].zip(_.sum), [5, 7, 9]);

    $assert(['a', 'b', 'c'].swap(1, 2), ['a', 'c', 'b']); // NOTE: mutates original

    $assert([1].random === 1); // returns random item from array
    $assert([].random === undefined);

    $assert([{ foo: 'bar' }, { foo: 'qux' }].pluck('foo'), ['bar', 'qux']);

    $assert([['foo', 'bar'].join(), ['foo', 'bar'].join('.'), ['foo', 'bar'].join(777), ['foo'].join(777), ['bar'].join('.')], ['foobar', 'foo.bar', ['foo', 777, 'bar'], 'foo', 'bar']);
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
        nonempty: _.nonempty,
        pluck: $method(_.pluck),
        without: $method(_.without),

        join: function (strJoin) {
            return $forceOverride(function (arr, delim) {
                delim = arguments.length < 2 ? '' : delim;
                if ( /*_.isString (arr[0]) && */ // semantically correct, but breaks compat
                _.isString(delim)) {
                    return strJoin.call(arr, delim);
                } else {
                    return _.reduce2(arr, function (a, b) {
                        return [a].concat([delim, b]);
                    });
                }
            });
        }(Array.prototype.join),

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
            return arr[i % arr.length];
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

/***/ },
/* 16 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/infix/Function.js ***!
  \********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 17 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./base/infix/String.js ***!
  \******************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 18 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./base/infix/extensionMethods.js ***!
  \****************************************/
/***/ function(module, exports) {

"use strict";
"use strict";

/*  Extensions methods
    ======================================================================== */

;['method', 'property', 'flipped', 'forceOverride'].forEach(Tags.define);

$global.$extensionMethods = function (Type, methods) {

    _.each(methods, function (tags, name) {
        var fn = Tags.unwrap(tags);

        /*  define as _.method (this, ...)
         */
        if (!(name in _)) {
            _[name] = _[name] || fn;
        }

        /*  define as property of Type
         */
        if (!tags.$method && (tags.$property || _.oneArg(fn))) {
            if (!(name in Type.prototype) || tags.$forceOverride) {
                _.defineHiddenProperty(Type.prototype, name, function () {
                    return fn(this);
                });
            }
        }

        /*  define as method
         */
        else if (!tags.$property) {
                if (!(name in Type.prototype) || tags.$forceOverride) {
                    Type.prototype[name] = _.asMethod(tags.$flipped ? _.flip(fn) : fn);
                }
            } else {
                throw new Error('$extensionMethods: crazy input, unable to match');
            }
    });
};

/***/ },
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./base/math.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

/*  TODO:   UNIT TEST DAT MUTHAFUCKA
 */

/*  TODO:   get rid of _ namespace (now legacy)
 */

var _$prototype;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        } },

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
})), _defineProperty(_$prototype, 'dot', function dot(other) {
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
        } },

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

    rightTop: $property(function () {
        return new Vec2(this.right, this.top);
    }),

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

    area: $property(function () {
        return Math.abs(this.width * this.height);
    }),

    intersects: function intersects(other) {
        return !(this.right < other.left || this.left > other.right || this.bottom < other.top || this.top > other.bottom);
    }
});

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

    var toposort = __webpack_require__(/*! toposort */ 35);

    Array.prototype.topoSort = function () {
        return toposort(this);
    };
})();

/*  ------------------------------------------------------------------------ */

_.withTest(['Array', 'topomerge'], function () {

    $assert([['all', 'your', 'to', 'us'], ['your', 'belong', 'us'], ['base', 'belong', 'to'], ['your', 'base']].topoMerge(),
    /* -------------------------------------- */
    ['all', 'your', 'base', 'belong', 'to', 'us']);

    /*  ------------------------------------------------------------------------ */
}, function () {

    Array.prototype.topoMerge = function () {
        var edges = [];
        for (var i = 0, ni = this.length; i < ni; i++) {
            var sequence = this[i];
            for (var j = 0, nj = sequence.length - 1; j < nj; j++) {
                edges.push([sequence[j], sequence[j + 1]]);
            }
        }

        return edges.topoSort();
    };
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

/***/ },
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./base/tier0/arguments.js ***!
  \*********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./base/tier0/busybox.js ***!
  \*******************************/
/***/ function(module, exports) {

"use strict";
"use strict";

/*  Basic utility for writing data-crunching functional expressions.
    ======================================================================== */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

/***/ },
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/tier0/function.js ***!
  \********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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
        return _.isEmpty(x) || _.isString(x) || _.isNumber(x) || x instanceof RegExp || !(_.isStrictlyObject(x) || _.isArray(x)) || _.isPrototypeInstance(x) || _.isMeta(x);
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

/***/ },
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./base/tier0/meta-tags.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var O = Object;

/*  For checking whether the module is available
    ======================================================================== */

_.hasTags = true;

/*  Unit test / spec
    ======================================================================== */

_.withTest('meta-tags', function () {

    /*  This is how you define tags     */

    Tags.define('foo');
    Tags.define('bar');
    Tags.define('qux');

    $assert(Tags.isDefined('foo'));
    $assert($foo instanceof Function);

    /*  Tags produce objects containing them as boolean flags. You can tag anything.
        Order doesn't matter, redundancy is legal.   */

    $assert($foo(42).$foo, true);
    $assert($bar(null).$bar, true);
    $assert($foo(42).$bar, undefined);
    $assert($foo($bar(42)), $bar($foo($foo(42))));

    /*  Safe way to check for a tag presence is $tag.is method:     */

    $assert($foo.is($foo(42)), true);
    $assert($foo.is($bar(42)), false);
    $assert($foo.is(42), false);

    /*  Example of complex object containing tagged fields.     */

    var test = {
        fourtyOne: $bar($foo(41)),
        fourtyTwo: $foo($bar(42)),
        notTagged: 40 };

    /*  This is how you coerce what-might-be-tagged to actual values:   */

    $assert($untag(42), Tags.unwrap(42), Tags.unwrap(test.fourtyTwo), 42);
    $assert(Tags.unwrapAll(test), { fourtyTwo: 42, fourtyOne: 41, notTagged: 40 });

    /*  Tags have .matches property, which is a predicate to test objects for those tags.   */

    $assert($foo.matches($foo()));
    $assert($foo.matches(test.fourtyOne));
    $assert($foo.matches(42) === false);

    /*  These predicates could be combined to produce complex test (a generic feature of Function provided by common.js)    */

    $assert({ fourtyOne: 41, fourtyTwo: 42 }, Tags.unwrapAll(_.pick(test, _.and($foo.matches, $bar.matches))));
    $assert({ notTagged: 40 }, Tags.unwrapAll(_.omit(test, $foo.matches)));

    /*  You can replace value that might be tagged, i.e. $foo($bar(x)) → $foo($bar(y))  */

    $assert(43, Tags.modify(42, function (subject) {
        return subject + 1;
    })); // not tagged
    $assert($foo(43), Tags.modify($foo(42), _.constant(43)));
    $assert($foo($bar(43)), Tags.modify($foo(42), function (subject) {
        return $bar(subject + 1);
    }));

    /*  Low-level way of tags addition, for run-time shit.  */

    $assert(Tags.add('qux', 42).$qux);
    $assert(Tags.add('qux', test.fourtyTwo).$qux);

    /*  Wrapping nothing is now legal   */

    $assert(Tags.hasSubject($foo()), false);
    $assert(Tags.hasSubject($foo(42)), true);

    /*  Map over tagged values:     */

    $assert($qux([8, 9, $foo($bar(10))]), Tags.map($qux([1, 2, $foo($bar(3))]), _.sums(7)));

    /*  Enumerating tags with Tags.each (obj, iter)     */

    $assertMatches(['foo', 'bar', 'qux'], _.arr(function (iter) {
        Tags.each(test.fourtyTwo, iter);
    }));

    /*  Tagging with non-boolean data   */

    $assert($foo({ some: 'params' }, 42).$foo, { some: 'params' });

    /*  'Extend' algebra    */

    $assert(Tags.extend($foo(7), $bar(8)), $foo($bar(7)));
    $assert(Tags.extend($foo(7), 8), $foo(7));
    $assert(Tags.extend(7, $foo(8)), $foo(7));
    $assert(Tags.extend(7, 8), 7);

    /*  Tags.omit   */

    $assert(Tags.omit(7, '$foo'), 7);
    $assert(Tags.omit($foo($bar(7)), '$foo', '$bar'), 7);
    $assert(Tags.omit($foo($bar(7)), '$foo'), $bar(7));

    /*  String.ify  */

    if (String.ify) {

        $assert(String.ify({ foo: $constant($get({ bar: 7 }, 1)) }), '{ foo: $constant ($get ({ bar: 7 }, 1)) }');

        $assert(String.ify.configure({ pretty: true })({ foo: $constant($get([7, 8])) }), '{ foo: $constant ($get ([ 7,\n' + '                          8  ])) }');
    }

    /*  Cleanup test stuff  */

    ;['$foo', '$bar', '$qux', '$plusOne'].forEach(function (x) {
        delete $global[x];
    });

    /*  IMPLEMENTATION
        ======================================================================== */
}, function () {

    /*  Tags object
        ======================================================================== */

    $global.Tags = function (subject, keys) {
        if (subject !== undefined) {
            this.subject = subject;
        }
        if (keys !== undefined) {
            _.extend(this, keys);
        }
    };

    Tags.$definition = {}; // to make it recognizeable by ES3000


    /*  Instance methods (internal API)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    O.assign(Tags.prototype, {

        add: function add(name, additionalData) {
            return this['$' + name] = additionalData || true, this;
        },

        clone: function clone(newSubject) {
            return O.assign(new Tags(newSubject || this.subject), Tags.get(this));
        },

        modify: function modify(changesFn) {
            this.subject = changesFn(this.subject);
            if (this.subject instanceof Tags) {
                return O.assign(this.subject, Tags.get(this));
            } else {
                return this;
            }
        },

        extend: function extend(other) {
            return other instanceof Tags ? O.assign(this, Tags.get(other)) : this;
        } });

    /*  Static methods (public API)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    O.assign(Tags, {

        omit: $restArg(function (what) {

            if (what instanceof Tags) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var keysToOmit = _.index(args);
                var keysLeft = _.pick(what, function (v, k) {
                    return k[0] === '$' && !(k in keysToOmit);
                });
                return !_.isEmptyObject(keysLeft) ? new Tags(what.subject, keysLeft) : what.subject;
            } else {
                return what;
            }
        }),

        clone: function clone(what, newSubject) {
            return what instanceof Tags ? what.clone(newSubject) : newSubject || what;
        },

        extend: function extend(what, other) {
            return what instanceof Tags ? what.clone().extend(other) : other instanceof Tags ? Tags.wrap(what).extend(other) : what;
        },

        get: function get(def) {
            return def instanceof Tags ? _.pick(def, function (v, k) {
                return k[0] === '$';
            }) : {};
        },

        each: function each(def, accept) {
            if (def instanceof Tags) {
                _.each(def, function (v, k) {
                    if (k[0] === '$') {
                        accept(k.slice(1));
                    }
                });
            }
        },

        hasSubject: function hasSubject(def) {
            return def instanceof Tags && 'subject' in def;
        },

        matches: function matches(name) {
            return function (obj) {
                return obj && obj['$' + name] !== undefined;
            };
        },

        unwrapAll: function unwrapAll(definition) {
            return _.map2(definition, Tags.unwrap);
        },

        unwrap: function unwrap(what) {
            return what instanceof Tags ? what.subject : what;
        },

        wrap: function wrap(what) {
            return what instanceof Tags ? what : arguments.length === 0 ? new Tags() : new Tags(what);
        },

        modify: function modify(what, changesFn) {
            return what instanceof Tags ? what.clone().modify(changesFn) : changesFn(what);
        }, // short circuits if not wrapped

        map: function map(obj, op) {
            return Tags.modify(obj, function (obj) {
                return _.map2(obj, function (t, k) {
                    return Tags.modify(t, function (v) {
                        return op(v, k, t instanceof Tags ? t : undefined);
                    });
                });
            });
        },

        add: function add(name, toWhat, additionalData) {
            return Tags.wrap.apply(null, [].slice.call(arguments, 1)).add(name, additionalData);
        },

        all: new Set(),

        isDefined: function isDefined(k) {
            return Tags.all.has(k);
        },

        define: function define(k, fn) {
            // fn for additional processing of constructed function

            Tags.all.add(k);

            fn = _.isFunction(fn) && fn || _.identity;

            var $k = '$' + k;

            $global[$k] = fn(function (a, b) {
                if (arguments.length < 2) {
                    return Tags.add(k, a);
                } // $tag (value)
                else {
                        return Tags.add(k, b, a);
                    }
            }); // $tag (params, value)

            return O.assign($global[$k], {
                matches: Tags.matches(k),
                is: function is(x) {
                    return x instanceof Tags && $k in x || false;
                },
                isNot: function isNot(x) {
                    return !(x instanceof Tags && $k in x) || false;
                },
                unwrap: function unwrap(x) {
                    return $atom.matches(x) === true ? Tags.unwrap(x) : x;
                } });
        }
    });

    /*  $untag
        ======================================================================== */

    $global.$untag = Tags.unwrap

    /*  TODO: move out of this file
        ======================================================================== */

    ;['constant', 'get', 'once', 'async', 'atom'].forEach(Tags.define);
});

/*  Formatting shit
    ======================================================================== */

if (typeof Symbol !== 'undefined') {

    var bullet = __webpack_require__(/*! string.bullet */ 34);

    Tags.prototype[Symbol.for('String.ify')] = function (stringify) {

        if (stringify.json) {
            return stringify($untag(this));
        }

        var tags = Tags.get(this);
        var left = _.reduce(tags, function (memo, value, tag) {
            return _.isBoolean(value) ? tag + ' (' + memo : tag + ' (' + stringify.configure({ pretty: false })(value) + ', ' + memo;
        }, '');

        return bullet(left, stringify($untag(this))) + ')'.repeats(_.keys(tags).length);
    };
}

/***/ },
/* 24 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./base/tier0/platform.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {"use strict";

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/buildin/global.js */ 0)))

/***/ },
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./base/tier0/properties.js ***!
  \**********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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
            var actualValue = typeof Tags === 'undefined' ? value_ : Tags.unwrap(value_);

            // property definition case (short circuit then)
            return !value.$constant && !value.$get && _.isPropertyDefinition(actualValue) && actualValue ||

            // get-accessor-alone case
            (value.$get || !value.$constant && _.isFunction(actualValue) && _.noArgs(actualValue)) && { get: actualValue,
                set: _.throwsError('cannot change ' + (name || 'property') + ' (as it\'s an accessor function)') } ||

            // constant value case
            !value.$get && { get: _.constant(actualValue),
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

/***/ },
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./base/tier0/stdlib.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var O = __webpack_require__(/*! es7-object-polyfill */ 1);

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

    var obj = { a: [{ b: { c: 'd' } }], b: {}, c: new Proto() };
    var copy = _.cloneDeep(obj);

    $assert(obj !== copy); // should be distinct references
    $assert(obj.a !== copy.a); //
    $assert(obj.b !== copy.b); //
    $assert(obj.c === copy.c); // should be same instance (should consider prototype instances as atomic value)

    $assert(obj, copy); // structure should not change

    $assert(_.cloneDeep({ foo: new Set() }).foo instanceof Set);
    $assert(Array.from(_.cloneDeep({ foo: new Set([1, 2, 3]) }).foo.values()), [1, 2, 3]);
}, function () {
    _.extend(_, {

        clone: function clone(x) {
            return x instanceof Set ? new Set(x) : !_.isObject(x) ? x : _.isArray(x) ? x.slice() : _.extend({}, x);
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

/***/ },
/* 27 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./base/tier0/type.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var O = __webpack_require__(/*! es7-object-polyfill */ 1);

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

/***/ },
/* 28 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./base/tier0/typeMatch.js ***!
  \*********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_.hasTypeMatch = true;

/*  Type matching for arbitrary complex structures (TODO: test)
    ======================================================================== */

Tags.define('required');
Tags.define('atom');

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
        return x === $any || $atom.is(x) === true || $required.is(x) === true;
    };

    var zip = function zip(type, value, pred) {
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
        var contract = Tags.unwrap(c);
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

/***/ },
/* 29 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./client/DOMReference.js ***!
  \********************************/
/***/ function(module, exports) {

"use strict";
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
            var on_def = method.$on;
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

/*  ------------------------------------------------------------------------ */

/***/ },
/* 30 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** ./client/anim.js ***!
  \************************/
/***/ function(module, exports) {

"use strict";
"use strict";

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

/***/ },
/* 31 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./client/node+.js ***!
  \*************************/
/***/ function(module, exports) {

"use strict";
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

    matchUpwards: function matchUpwards(pred) {
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
        return (this.className || '').split(' ').contains(x);
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

    attr: $alias('setAttributes'),

    removeAttr: function removeAttr(name) {
        this.removeAttribute(name);return this;
    },

    /*  Splitting
        ======================================================================== */

    splitSubtreeBefore: function splitSubtreeBefore(node) {
        // returns right (remaining) subtree
        if (!node || node.parentNode === this) {
            return node;
        } else {
            return this.splitSubtreeBefore(!node.previousSibling // if first node in parent, nothing to split – simply proceed to parent
            ? node.parentNode : document.createElement(node.parentNode.tagName).insertMeBefore(node.parentNode).appendChildren(node.prevSiblings).nextSibling);
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
    }
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

document.on('DOMContentLoaded', document.ready = _.barrier());

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
        $assertSplitAtBr('<b>foo<br></b>', '<b>foo</b><b><br></b>');
        $assertSplitAtBr('<b>foo<i>bar<br>baz</i>qux</b>', '<b>foo<i>bar</i></b>' + '<b><i><br>baz</i>qux</b>');
    }

};

/***/ },
/* 32 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./~/es6-object-assign/src/index.js ***!
  \******************************************/
/***/ function(module, exports) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

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


/***/ },
/* 33 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************!*\
  !*** ../es7-object-polyfill/~/reflect.ownkeys/index.js ***!
  \*********************************************************/
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
/* 34 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ../string.bullet/string.bullet.js ***!
  \*****************************************/
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function (bullet, arg) {

    var isArray = Array.isArray(arg);

    var lines = isArray ? arg : arg.split('\n');

    var indent = bullet.replace(/[^\s]/g, ' '); // replace non-whitespace with whitespace
    lines = lines.map(function (line, i) {
        return i === 0 ? bullet + line : indent + line;
    });

    return isArray ? lines : lines.join('\n');
};

/***/ },
/* 35 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./~/toposort/index.js ***!
  \*****************************/
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
/* 36 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/underscore/underscore.js ***!
  \************************************/
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
/* 37 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./useless.client.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {'use strict';

var $global = typeof window === 'undefined' ? global : window;

$global.$uselessFile = 'useless.client.js';

$global._ = module.exports = __webpack_require__(/*! ./base/3rd/underscore-fix */ 2); // latest underscore from GitHub, fixes strict-mode issue

/*  Tests stub
 */
_.tests = {};
_.deferTest = _.withTest = function (name, test, subj) {
    subj();
};

/*  Polyfills   */

__webpack_require__(/*! es6-object-assign */ 32).polyfill();

/*  Internal dependencies
    ======================================================================== */

__webpack_require__(/*! ./base/tier0/platform */ 24); // platform abstraction layer
__webpack_require__(/*! ./base/tier0/arguments */ 20); // argument count tracking utility (to streamline metaprogramming utilities)
__webpack_require__(/*! ./base/tier0/function */ 22); // function-centric utilities
__webpack_require__(/*! ./base/tier0/busybox */ 21); // a vocabulary for functional expressions that process real stuff
__webpack_require__(/*! ./base/tier0/type */ 27); // type system extensions
__webpack_require__(/*! ./base/tier0/stdlib */ 26); // consider it as underscore 2.0
__webpack_require__(/*! ./base/tier0/properties */ 25); // properties 2.0
__webpack_require__(/*! ./base/tier0/meta-tags */ 23); // metaprogramming utility
__webpack_require__(/*! ./base/tier0/typeMatch */ 28); // advanced type system extensions

__webpack_require__(/*! ./base/CPS */ 3);

__webpack_require__(/*! ./base/infix/extensionMethods */ 18); // bootstrap
__webpack_require__(/*! ./base/infix/Function */ 16); // extends Function
__webpack_require__(/*! ./base/infix/Array */ 15); // extends Array
__webpack_require__(/*! ./base/infix/String */ 17); // extends String

__webpack_require__(/*! ./base/dynamic/bindable */ 12); // for ad-hoc dependency injection in any object's method
__webpack_require__(/*! ./base/dynamic/stream */ 13); // a generalization of Event (multicast model for function calls)

__webpack_require__(/*! ./base/OOP */ 5);

__webpack_require__(/*! ./base/math */ 19); // clumsy math utils
__webpack_require__(/*! ./base/Parse */ 6); // clumsy parsing utils
__webpack_require__(/*! ./base/Sort */ 9); // (this one is normal)


/*  Otherwise basic utility
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./base/concurrency */ 11); // concurrency utility
__webpack_require__(/*! ./base/component */ 10); // component model
__webpack_require__(/*! ./base/Rx */ 8); // regular expressions helper


/*  Experimental stuff
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./base/Promise+ */ 7);
__webpack_require__(/*! ./base/Channel */ 4);

/*  Networking
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./base/http */ 14);

/*  Browser-related code
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

__webpack_require__(/*! ./client/node+ */ 31);
__webpack_require__(/*! ./client/DOMReference */ 29);
__webpack_require__(/*! ./client/anim */ 30);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/buildin/global.js */ 0)))

/***/ }
/******/ ]);
//# sourceMappingURL=useless.client.js.map