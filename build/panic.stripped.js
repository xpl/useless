/*    AUTO GENERATED from panic.js (stripped unit tests and comments) */

$uselessFile = 'useless.micro.js';
if (typeof require !== 'undefined') {
    _ = require('underscore');
    $include = require;
}
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
(function () {
    var p = function () {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.platform && navigator.platform.indexOf) {
            return _.extend({
                engine: 'browser',
                browserEngine: navigator.userAgent.indexOf('AppleWebKit') >= 0 ? 'WebKit' : undefined,
                browser: navigator.userAgent.indexOf('Firefox') >= 0 ? 'Firefox' : navigator.userAgent.indexOf('Chrome') >= 0 ? 'Chrome' : navigator.userAgent.indexOf('Safari') >= 0 ? 'Safari' : navigator.userAgent.indexOf('Trident') >= 0 ? 'IE' : undefined
            }, navigator.platform.indexOf('Linux arm') >= 0 || navigator.platform.indexOf('Android') >= 0 || navigator.userAgent.indexOf('Android') >= 0 ? {
                touch: true,
                system: 'Android'
            } : navigator.platform.indexOf('iPad') >= 0 ? {
                touch: true,
                system: 'iOS',
                device: 'iPad'
            } : navigator.platform.indexOf('iPhone') >= 0 || navigator.platform.indexOf('iPod') >= 0 ? {
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
$overrideUnderscore = function (name, genImpl) {
    return _[name] = genImpl(_[name]);
};
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
    console.log.apply(console.log, arguments);
};
_.extend(_, {
    asArray: function (x) {
        return x.length !== undefined ? [].slice.call(x, 0) : [x];
    }
});
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
$overrideUnderscore('memoize', function (memoize) {
    return function (fn) {
        return _.withSameArgs(fn, memoize(fn));
    };
});
$overrideUnderscore('partial', function (partial) {
    return $restArg(function (fn) {
        return _.withArgs(Math.max(0, _.numArgs(fn) - (arguments.length - 1)), fn._ra, partial.apply(this, arguments));
    });
});
$overrideUnderscore('bind', function (bind) {
    return $restArg(function (fn, this_) {
        return _.withArgs(Math.max(0, _.numArgs(fn) - (arguments.length - 2)), fn._ra, bind.apply(this, arguments));
    });
});
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
_.extend(_, {
    Y: function (eatSelf) {
        var self = eatSelf(function () {
            return self.apply(this, arguments);
        });
        return self;
    }
});
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
_.higherOrder = _.callsTo;
_.eval = function (x) {
    return _.isFunction(x) ? x.call(this) : x;
};
_.evals = function (__args__) {
    var arguments_ = arguments;
    return function (x) {
        return _.isFunction(x) ? x.apply(this, arguments_) : x;
    };
};
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
_.once = function (fn) {
    var called = false;
    return function () {
        if (!called) {
            called = true;
            return fn.apply(this, arguments);
        }
    };
};
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
        return fn2.call(this, fn1.apply(this, arguments));
    };
};
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
_.isArray = function (x) {
    return x instanceof Array;
};
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
_.extend(_, {
    isNonPOD: function (v) {
        return v && v.constructor && v.constructor !== Object && v.constructor !== Array && v.constructor !== String && v.constructor !== Number && v.constructor !== Boolean;
    },
    isPOD: function (v) {
        return !_.isNonPOD(v);
    }
});
if (typeof Number.EPSILON === 'undefined') {
    Object.defineProperty(Number, 'EPSILON', {
        enumerable: true,
        get: _.constant(2.220446049250313e-16)
    });
}
_.extend(_, {
    isDecimal: function (x, tolerance) {
        if (!_.isNumber(x) || _.isNaN(x)) {
            return false;
        } else {
            return Math.abs(Math.floor(x) - x) > (tolerance || Number.EPSILON);
        }
    }
});
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
_.hasStdlib = true;
_.throwsError = _.higherOrder(_.throwError = function (msg) {
    throw msg instanceof Error ? msg : new Error(msg);
});
_.overrideThis = _.throwsError('override this');
_.notImplemented = _.throwsError('not implemented');
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
_.mapMap = _.hyperOperator(_.unary, _.map2);
_.hyperMap = function (data, op) {
    return _.hyperOperator(_.unary, function (expr, f) {
        return op(expr) || _.map2(expr, f);
    })(data, _.identity);
};
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
_.mixin({ zipZip: _.hyperOperator(_.binary, _.zip2) });
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
_.nonempty = function (obj) {
    return _.filter2(obj, _.isNonempty);
};
_.extend(_, {
    clone: function (x) {
        return x instanceof Set ? new Set(x) : !_.isObject(x) ? x : _.isArray(x) ? x.slice() : _.extend({}, x);
    },
    cloneDeep: _.tails2(_.mapMap, function (value) {
        return _.isStrictlyObject(value) && !_.isPrototypeInstance(value) ? _.clone(value) : value;
    })
});
_.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
    return _.coerceToUndefined(_.nonempty(_.zip2(a, b, pred)));
});
_.diff = _.tails3(_.hyperMatch, function (a, b) {
    return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? undefined : b;
});
_.hyperMatch = _.hyperOperator(_.binary, function (a, b, pred) {
    return _.coerceToUndefined(_.zip2(a, b, pred));
});
_.undiff = _.tails3(_.hyperMatch, function (a, b) {
    return $atom.unwrap(a) === $atom.unwrap(b) || a === $any || b === $any ? b : undefined;
});
_.extend(_, {
    index: function (list) {
        var result = {};
        for (var i = 0, n = list.length; i < n; i++) {
            result[list[i]] = true;
        }
        return result;
    }
});
_.quote = function (s, pattern_) {
    var pattern = pattern_ || '';
    var splitAt = Math.floor(pattern.length / 2 + pattern.length % 2);
    var before = pattern.slice(0, splitAt);
    var after = pattern.slice(splitAt) || before;
    return before + s + after;
};
_.quoteWith = _.flip2(_.quote);
_.quotesWith = _.higherOrder(_.quoteWith);
_.partition2 = function (arr, pred) {
    return _.pluck(_.partition3(arr, pred), 'items');
};
_.partition3 = function (arr, pred) {
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
_.hasTags = true;
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
        return contract === $any || contract === undefined && v === undefined || _.isFunction(contract) && (_.isPrototypeConstructor(contract) ? _.isTypeOf(contract, v) : contract(v)) || typeof v === contract || v === contract;
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
_.json = function (arg) {
    if (typeof arg === 'string') {
        try {
            return JSON.parse(arg);
        } catch (e) {
            return {};
        }
    } else {
        return JSON.stringify(arg);
    }
};
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
            name = values.name;
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
        return _.toFixed(x, cfg.precision);
    } else {
        return x + '';
    }
};
_.toFixed = function (x, precision) {
    return x && x.toFixed && x.toFixed(precision) || undefined;
};
_.toFixed2 = function (x) {
    return _.toFixed(x, 2);
};
_.toFixed3 = function (x) {
    return _.toFixed(x, 3);
};
Array.prototype.squash = function (cfg) {
    cfg = cfg || {};
    var key = cfg.key || _.identity, sort = cfg.sort || undefined;
    var head = {
        key: null,
        next: {},
        depth: {}
    };
    var nodes = {};
    _.each(this, function (arr) {
        for (var i = 0, n = arr.length, prev = head, node = undefined; i < n; i++, prev = node) {
            var item = arr[i];
            var k = key(item);
            node = nodes[k] || (nodes[k] = {
                key: k,
                item: item,
                next: {},
                depth: {}
            });
            if (prev) {
                prev.next[k] = node;
                prev.depth[k] = 0;
            }
        }
    });
    var decyclize = function (visited, node, prev, depth) {
        depth = depth || 0;
        visited[node.key] = true;
        node.next = _.filter2(_.values(node.next), function (next) {
            if (next.key in visited) {
                return false;
            } else {
                next = decyclize(visited, next, node);
                depth = Math.max(depth, node.depth[next.key]);
                return next;
            }
        });
        if (prev) {
            prev.depth[node.key] = Math.max(prev.depth[node.key] || 0, depth + 1);
        }
        delete visited[node.key];
        return node;
    };
    var ordered = function (a, b) {
        return a === b || _.some(a.next, function (aa) {
            return ordered(aa, b);
        });
    };
    var flatten = function (node) {
        if (!node)
            return [];
        var next = (node.next || []).sort(function (a, b) {
            return (node.depth[a.key] || 0) < (node.depth[b.key] || 0);
        });
        if (false) {
            log.gg(node.key);
            log.pp(next.map(function (next) {
                return next.key + ' ' + node.depth[next.key];
            }));
        }
        return [node].concat(flatten(_.reduce(next, function (a, b) {
            if (a === b) {
                return a;
            } else if (ordered(b, a)) {
                b.next.push(a);
                return b;
            } else {
                a.next.push(b);
                return a;
            }
        })));
    };
    return _.rest(_.pluck(flatten(decyclize({}, head)), 'item'));
};
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
}, DAG.prototype.squash = function (node0) {
    return this.edges(node0).squash(this.cfg).remove(node0);
};
DAG.squash = function (node0, cfg) {
    return new DAG(cfg).squash(node0);
};
_.cps = function () {
    return _.cps.sequence.apply(null, arguments);
};
_.cps.apply = function (fn, this_, args_, then) {
    var args = _.asArray(args_);
    var lastArgN = _.numArgs(fn) - 1;
    var thenArg = args[lastArgN];
    args[lastArgN] = function () {
        then.call(this, arguments, thenArg);
    };
    return fn.apply(this_, args);
};
_.extend(_.cps, {
    each: function (obj, elem, complete, index_, length_, keys_) {
        var self = arguments.callee;
        var index = index_ || 0;
        var keys = index === 0 ? obj.length === undefined ? _.keys(obj) : undefined : keys_;
        var length = index === 0 ? keys ? keys.length : obj.length : length_;
        var passKey = _.numArgs(elem) !== 2;
        if (!obj || index >= (length || 0)) {
            if (complete) {
                complete();
            }
        } else {
            var key = keys ? keys[index] : index;
            var next = function () {
                self(obj, elem, complete, index + 1, length, keys);
            };
            if (passKey) {
                elem(obj[key], key, next, complete, obj);
            } else {
                elem(obj[key], next, complete, obj);
            }
        }
    }
});
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
            var args = arguments, this_ = this;
            if (!fn._postponed) {
                fn._postponed = true;
                _.delay(function () {
                    fn._postponed = false;
                    fn.apply(this_, args);
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
    flat: _.flatten.tails2(true),
    object: _.object,
    shuffle: _.shuffle,
    pluck: $method(_.pluck),
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
$extensionMethods(String, {
    quote: _.quote,
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
_.extend(String, {
    randomHex: function (length) {
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
_.loDashesToCamelCase = function (x) {
    return x.replace(/(_.)/g, function (x) {
        return x[1].uppercase;
    });
};
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
            hasValue: arguments.length > 0,
            value: _.isFunction(value) ? undefined : value,
            read: _.identity,
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
            when: function (match, then) {
                var matchFn = _.isFunction(match) ? match : _.equals(match);
                stream(function (val) {
                    if (matchFn(val)) {
                        stream.off(arguments.callee);
                        then.apply(this, arguments);
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
_.hasOOP = true;
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
                    if (_.keyword(tagName) in memberDef) {
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
if (typeof jQuery !== 'undefined') {
    jQuery.fn.extend({
        $: function () {
            return _.$.apply(null, [this].concat(_.asArray(arguments)));
        }
    });
}
_.defineKeyword('const', function (x) {
    return $static($property(x));
});
_.defineTagKeyword('callableAsFreeFunction');
$prototype.macroTag('callableAsFreeFunction', function (def, value, name) {
    def.constructor[name] = $untag(value).asFreeFunction;
    return def;
});
_.defineTagKeyword('callableAsMethod');
$prototype.macroTag('callableAsMethod', function (def, value, name) {
    def[name] = Tags.modify(value, _.asMethod);
    def.constructor[name] = $untag(value);
    return def;
});
$singleton = function (arg1, arg2) {
    return new ($prototype.apply(null, arguments))();
};
_.clamp = function (n, min, max) {
    return Math.max(min, Math.min(max, n));
};
_.lerp = function (t, min, max) {
    return min + (max - min) * t;
};
_.rescale = function (v, from, to, opts) {
    var unit = (v - from[0]) / (from[1] - from[0]);
    return _.lerp(opts && opts.clamp ? _.clamp(unit, 0, 1) : unit, to[0], to[1]);
};
_.rescaleClamped = function (v, from, to) {
    return _.rescale(v, from, to, { clamp: true });
};
_.sqr = function (x) {
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
    ltwh: $alias('css'),
    union: function (other) {
        return BBox.fromLTRB(Math.min(this.left, other.left), Math.min(this.top, other.top), Math.max(this.right, other.right), Math.max(this.bottom, other.bottom));
    },
    clone: $property(function () {
        return new BBox(this.x, this.y, this.width, this.height);
    }),
    floor: $property(function () {
        return new BBox.fromLTRB(Math.floor(this.left), Math.floor(this.top), Math.floor(this.right), Math.floor(this.bottom));
    }),
    css: $property(function () {
        return {
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height
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
    area: $property(function () {
        return Math.abs(this.width * this.height);
    }),
    intersects: function (other) {
        return !(this.right < other.left || this.left > other.right || this.bottom < other.top || this.top > other.bottom);
    },
    relativeTo: function (other) {
        return this.offset(other.leftTop.inverse);
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
Parse = {
    keyCodeAsString: function (key) {
        return String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
    },
    fileName: function (path) {
        return _.first(_.last(path.split(/\\|\//)).split('.'));
    }
};
_.enumerate = _.cps.each;
_.mapReduce = function (array, cfg) {
    var cursor = 0;
    var complete = false;
    var length = array && array.length || 0;
    var maxPoolSize = cfg.maxConcurrency || length;
    var poolSize = 0;
    var memo = cfg.memo;
    if (length === 0) {
        cfg.complete(cfg.memo || array);
    } else {
        var fetch = function () {
            while (cursor < length && poolSize < maxPoolSize) {
                poolSize += 1;
                cfg.next(array[cursor], cursor++, function () {
                    poolSize--;
                    if (!complete) {
                        if (cursor >= length) {
                            if (poolSize === 0) {
                                setTimeout(function () {
                                    cfg.complete(cfg.memo || array);
                                }, 0);
                                complete = true;
                            }
                        } else {
                            fetch();
                        }
                    }
                }, function () {
                    poolSize--;
                }, memo);
            }
            if (!complete && cursor >= length && poolSize == 0) {
                cfg.complete(cfg.memo || array);
            }
        };
        fetch();
    }
};
_.asyncJoin = function (functions, complete, context) {
    _.mapReduce(functions, {
        complete: complete.bind(context),
        next: function (fn, i, next, skip) {
            fn.call(context, next, skip);
        }
    });
};
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
    var lock = new Lock();
    return _.extendWith({
        lock: lock,
        wait: lock.$(lock.wait)
    }, _.argumentPrependingWrapper(Tags.unwrap(fn), function (fn) {
        lock.acquire(function () {
            fn(lock.$(lock.release));
        });
    }));
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
;
_.defineKeyword('component', function (definition) {
    return $extends(Component, definition);
});
_([
    'extendable',
    'trigger',
    'triggerOnce',
    'barrier',
    'observable',
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
_.defineTagKeyword('observableProperty', function (impl) {
    return function (x, fn) {
        return _.isFunction(x) && arguments.length === 1 ? impl(x, fn) : impl(fn, x);
    };
});
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
$prototype.macro(function (def) {
    def.$nonce = $static($builtin($property(String.randomHex(32))));
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
                def.$traits = DAG.squash(def, {
                    nodes: function (def) {
                        return $untag(def.$depends);
                    },
                    key: function (def) {
                        return $untag(def.$nonce);
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
        _.onBefore(this, 'destroy', this.beforeDestroy);
        _.onAfter(this, 'destroy', this.afterDestroy);
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
                            observable.call(this, x);
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
                    if (def.listeners) {
                        _.each(def.listeners, function (value) {
                            initialStreamListeners.push([
                                stream,
                                value
                            ]);
                        });
                    }
                    var defaultListener = cfg[name];
                    if (defaultListener) {
                        initialStreamListeners.push([
                            stream,
                            defaultListener
                        ]);
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
        _.intercept(this, 'init', function (init) {
            var evalChain = _.hasArgs(this.constructor.prototype.init) ? _.cps.sequence : _.sequence;
            evalChain([
                this._beforeInit,
                init.bind(this),
                this._afterInit
            ]).call(this);
        });
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
            this.init();
        }
    }),
    callTraitsMethod: function (name, then) {
        if (_.isFunction(then)) {
            _.cps.sequence(_.filter2(this.constructor.$traits || [], this.$(function (Trait) {
                var method = Trait.prototype[name];
                return method && _.cps.arity0(_.noArgs(method) ? method.asContinuation : method).bind(this) || false;
            })).concat(then.arity0))();
        } else {
            _.sequence(_.filter2(this.constructor.$traits || [], this.$(function (Trait) {
                var method = Trait.prototype[name];
                return method && (_.hasArgs(method) ? method.bind(this, _.identity) : method.bind(this)) || false;
            })))();
        }
    },
    _beforeInit: function (then) {
        if (this.initialized.already) {
            throw new Error('Component: I am already initialized. Probably you\'re doing it wrong.');
        }
        this.callTraitsMethod('beforeInit', then);
    },
    init: function () {
    },
    _afterInit: function (then) {
        var cfg = this.cfg;
        this.callTraitsMethod('afterInit', then);
        this.initialized(true);
        _.each(this.constructor.$definition, function (def, name) {
            if (def && def.$observableProperty) {
                name += 'Change';
                var defaultListener = cfg[name];
                if (defaultListener) {
                    this[name](defaultListener);
                }
            }
        }, this);
    },
    initialized: $barrier(),
    beforeDestroy: function () {
        if (this.destroyed_) {
            throw new Error('Component: I am already destroyed. Probably you\'re doing it wrong.');
        }
        if (this.destroying_) {
            throw new Error('Component: Recursive destroy() call detected. Probably you\'re doing it wrong.');
        }
        this.destroying_ = true;
        this.enumMethods(_.off);
        _.each(this.children_, _.method('destroy'));
        this.children_ = [];
    },
    destroy: function () {
    },
    afterDestroy: function () {
        _.each(this.constructor.$traits, function (Trait) {
            if (Trait.prototype.destroy) {
                Trait.prototype.destroy.call(this);
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
TimeoutError = $extends(Error, { message: 'timeout expired' });
__ = Promise.coerce = function (x) {
    return x instanceof Promise ? x : x instanceof Function ? new Promise(function (resolve) {
        resolve(x());
    }) : Promise.resolve(x);
};
__.noop = function () {
    return Promise.resolve();
};
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
__.safe = function (fn) {
    return function () {
        try {
            return Promise.resolve(fn.apply(this, arguments));
        } catch (e) {
            return Promise.reject(e);
        }
    };
};
__.map = __.safe(function (x, fn) {
    if (_.isStrictlyObject(x)) {
        var result = _.coerceToEmpty(x), tasks = [];
        _.each2(x, function (v, k) {
            tasks.push(__.identity(fn(v, k)).then(function (v) {
                result[k] = v;
            }));
        });
        return __.all(tasks).then(_.constant(result));
    } else {
        return fn(x);
    }
});
__.then = function (a, b) {
    return __(a).then(_.coerceToFunction(b));
};
__.seq = function (seq) {
    return __(_.reduce2(seq, __.then));
};
__.all = function (x) {
    return Promise.all(x);
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
    reject: function (e) {
        return this.then(_.throwsError(e));
    },
    delay: function (ms) {
        return this.then(__.delays(ms));
    },
    timeout: function (ms) {
        return this.race(__.delay(ms).reject(new TimeoutError()));
    },
    now: $property(function () {
        return this.timeout(0);
    }),
    log: $property(function () {
        return this.then(function (x) {
            log(x);
            return x;
        }, log.e.then(_.throwError));
    }),
    alert: $property(function () {
        return this.then(alert2, alert2.then(_.throwError));
    }),
    chain: function (fn) {
        return this.then(function (x) {
            fn(x);
            return x;
        });
    },
    done: function (fn) {
        return this.then(function (x) {
            return fn(null, x);
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
    assert: function (desired) {
        return this.then(function (x) {
            $assert(x, desired);
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
    },
    panic: $property(function () {
        return this.catch(function (e) {
            ($global.Panic || $global.log)(e);
            throw e;
        });
    })
});
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
        var cfg = _.extend2({ headers: { 'Cache-Control': 'no-cache' } }, cfg_);
        return new Promise(function (resolve, reject) {
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
                if (cfg.data) {
                    xhr.send(cfg.data);
                } else {
                    xhr.send();
                }
            } else {
                reject('not implemented');
            }
        });
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
        cfg = cfg || {};
        var stackBeforeCall = _.hasReflection && $callStack.offset((cfg.stackOffset || 0) + 1).asArray;
        var cfg = _.extend2({ headers: { 'Content-Type': 'application/json; charset=utf-8' } }, cfg);
        if (cfg.what) {
            cfg.data = JSON.stringify(cfg.what);
        }
        return Http.request(type, '/api/' + path, cfg).finally(function (e, response) {
            if (response && (response = JSON.parse(response)) || e && e.httpResponse && (response = _.json(e.httpResponse)).success === false) {
                return response;
            } else {
                throw e;
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
if (jQuery) {
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
;
;
$uselessFile = 'panic.js';
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
    $overrideUnderscore('matches', function (matches) {
        return function (a) {
            return _.isObject(a) ? matches(a) : function (b) {
                return a === b;
            };
        };
    });
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
            return e.assertion === true;
        }
    });
    _.extend(_, {
        allEqual: function (values) {
            return _.reduce(values, function (prevEqual, x) {
                return prevEqual && _.isEqual(values[0], x);
            }, true);
        }
    });
    _.each(_.keys(_.assertions), function (name) {
        $global.define('$' + name, _[name], { configurable: true });
    });
}());
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
        require('process').on('uncaughtException', globalUncaughtExceptionHandler);
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
_.hasReflection = true;
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
                    then(require('fs').readFileSync(file, { encoding: 'utf8' }) || '');
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
                var fs = require('fs'), opts = { encoding: 'utf8' };
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
        def.$meta = $static(_.cps.memoize($prototype.impl.findMeta(CallStack.currentAsRawString)));
    }
    return def;
});
_.hasLog = true;
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
            'boldRed',
            [
                '31m',
                '1m'
            ],
            'color:crimson;font-weight:bold'
        ],
        [
            'red',
            '31m',
            'color:crimson'
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
            'purple',
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
                when: Date.now(),
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
            return _.find(stack.clean.offset(2), function (entry) {
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
                console.log.apply(console, _.reject.with(_.equals(undefined), [].concat(_.map(params.lines, function (line, i) {
                    return params.indentation + _.reduce2('', line, function (s, run) {
                        return s + (run.text && (run.config.color ? '%c' : '') + run.text || '');
                    });
                }).join('\n') + (codeLocation && '%c ' + codeLocation || ''), (_.scatter(params.lines, function (line, i, emit) {
                    _.each(line, function (run) {
                        if (run.text && run.config.color) {
                            emit(run.config.color.css);
                        }
                    });
                }) || []).concat(codeLocation ? 'color:rgba(0,0,0,0.25)' : []), params.trailNewlines)));
            }
        },
        timestamp: function (x) {
            var date = new Date(x);
            return String.leadingZero(date.getDay()) + '/' + String.leadingZero(date.getMonth() + 1) + ' ' + String.leadingZero(date.getHours()) + ':' + String.leadingZero(date.getMonth());
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
        'pink notice alert p',
        'boldPink pp',
        'dark hint d',
        'boldGreen gg',
        'bright b',
        'boldRed bloody bad ee',
        'purple dp',
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
;
_.defineTagKeyword('shouldFail');
_.defineTagKeyword('async');
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
    run: _.interlocked(function (releaseLock, cfg_, optionalThen) {
        var then = arguments.length === 3 ? optionalThen : _.identity;
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
        var collectPrototypeTests = cfg.codebase === false ? _.cps.constant([]) : this.$(this.collectPrototypeTests);
        collectPrototypeTests(this.$(function (prototypeTests) {
            var baseTests = cfg.codebase === false ? [] : this.collectTests();
            var allTests = _.flatten(_.pluck(baseTests.concat(suites).concat(prototypeTests), 'tests'));
            var selectTests = _.filter(allTests, cfg.shouldRun || _.constant(true));
            this.runningTests = _.map(selectTests, function (test, i) {
                return _.extend(test, {
                    indent: cfg.indent,
                    index: i
                });
            });
            _.assertTypeMatches(_.map(_.pluck(this.runningTests, 'routine'), $untag), ['function']);
            this.runningTests = _.filter(this.runningTests, cfg.filter || _.identity);
            _.cps.each(this.runningTests, this.$(this.runTest), this.$(function () {
                _.assert(cfg.done !== true);
                cfg.done = true;
                this.printLog(cfg);
                this.failedTests = _.filter(this.runningTests, _.property('failed'));
                this.failed = this.failedTests.length > 0;
                then(!this.failed);
                releaseLock();
            }));
        }));
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
    runTest: function (test, i, then) {
        var self = this, runConfig = this.runConfig;
        log.impl.configStack = [];
        self.toCPS(runConfig.testStarted)(test, function (done) {
            done = done || _.noop;
            test.verbose = runConfig.verbose;
            test.timeout = runConfig.timeout;
            test.startTime = Date.now();
            test.run(function () {
                self.toCPS(runConfig.testComplete)(_.extend(test, { time: Date.now() - test.startTime }), function () {
                    done();
                    then();
                });
            });
        });
    },
    toCPS: function (fn) {
        return _.numArgs(fn) === 2 ? fn : function (test, then) {
            fn(test);
            then();
        };
    },
    collectTests: function () {
        return _.map(_.tests, this.$(function (suite, name) {
            return this.testSuite(name, suite);
        }));
    },
    collectPrototypeTests: function (then) {
        _.cps.map(this.prototypeTests, this.$(function (def, then) {
            def.proto.$meta(this.$(function (meta) {
                then(this.testSuite(meta.name, def.tests, undefined, def.proto));
            }));
        }), then);
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
    babyAssertion: function (releaseLock, name, def, fn, args, loc) {
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
        var doneWithAssertion = function () {
            if (assertion.failed && self.canFail) {
                self.failedAssertions.push(assertion);
            }
            releaseLock();
        };
        assertion.run(function () {
            Testosterone.currentAssertion = self;
            if (assertion.failed || assertion.verbose && assertion.logCalls.notEmpty) {
                assertion.location.sourceReady(function (src) {
                    log.red(log.config({
                        location: assertion.location,
                        where: assertion.location
                    }), src);
                    assertion.evalLogCalls();
                    doneWithAssertion();
                });
            } else {
                doneWithAssertion();
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
                                '\u2022 ' + _.keys(obj)[0],
                                _.stringify(_.values(obj)[0])
                            ];
                        })).join('\n'));
                    } else {
                        var cases = _.map(notMatching, log.impl.stringify.arity1.then(_.bullet.$('\u2022 ')));
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
    run: function (then) {
        var self = Testosterone.currentAssertion = this, routine = Tags.unwrap(this.routine);
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
        log.withWriteBackend(_.extendWith({ indent: self.depth + (self.indent || 0) }, function (x) {
            self.logCalls.push(x);
        }), function (doneWithLogging) {
            self.complete(doneWithLogging.arity0);
            if (then) {
                self.complete(then);
            }
            if (routine.length > 0) {
                routine.call(self.context, self.$(self.finalize));
            } else {
                var result = routine.call(self.context);
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
;
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
(function ($) {
    if (typeof UI === 'undefined') {
        UI = {};
    }
    Panic = function (what, cfg) {
        cfg = _.defaults(_.clone(cfg || {}), {
            dismiss: _.identity,
            raw: false
        });
        if (what === null) {
            return;
        }
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
            return ((_.isTypeOf(Error, what) ? what && what.stack : _.isTypeOf(Test, what) ? what.suite + what.name : what) || '').hash;
        },
        print: function (what, raw) {
            return _.isTypeOf(Error, what) ? this.printError(what) : _.isTypeOf(Test, what) ? this.printFailedTest(what) : this.printUnknownStuff(what, raw);
        },
        printUnknownStuff: function (what, raw) {
            return raw ? what : $('<span>').text(log.impl.stringify(what));
        },
        cleanupFileName: function (s) {
            return s && s.replace(/^\d\d\d\d\d+_/, '');
        },
        printLocation: function (where) {
            return $('<span class="location">').append([
                $('<span class="callee">').text(where.calleeShort),
                $('<span class="file">').text(this.cleanupFileName(where.fileName)),
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
                    var dom = $('<li class="callstack-entry">').toggleClass('third-party', entry.thirdParty).toggleClass('hide', entry.hide).toggleClass('native', entry['native']).append([
                        $('<span class="file">').text(_.nonempty([
                            entry.index ? '(index)' : this.cleanupFileName(entry.fileShort),
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
;
(function ($) {
    LogOverlay = $singleton(Component, {
        $defaults: {
            opaque: false,
            init: false
        },
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
;
(function ($) {
    Panic.init();
    CallStack.isThirdParty.intercept(function (file, originalImpl) {
        return file.indexOf('underscore') >= 0 || file.indexOf('jquery') >= 0 || file.indexOf('useless') >= 0 || file.indexOf('mootools') >= 0;
    });
    $('head').append([
        $('<style type="text/css">').text('@-webkit-keyframes bombo-jumbo {\n  0%   { -webkit-transform: scale(0); }\n  80%  { -webkit-transform: scale(1.2); }\n  100% { -webkit-transform: scale(1); } }\n\n@keyframes bombo-jumbo {\n  0%   { transform: scale(0); }\n  80%  { transform: scale(1.2); }\n  100% { transform: scale(1); } }\n\n@-webkit-keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n@keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n.i-am-busy { -webkit-animation: pulse-opacity 1s ease-in infinite; animation: pulse-opacity 1s ease-in infinite; pointer-events: none; }\n\n.panic-modal .scroll-fader-top, .scroll-fader-bottom { left: 42px; right: 42px; position: absolute; height: 20px; pointer-events: none; }\n.panic-modal .scroll-fader-top { top: 36px; background: -webkit-linear-gradient(bottom, rgba(255,255,255,0), rgba(255,255,255,1)); }\n.panic-modal .scroll-fader-bottom { bottom: 128px; background: -webkit-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,1)); }\n\n.panic-modal-appear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1);\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); }\n\n.panic-modal-disappear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); -webkit-animation-direction: reverse;\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); animation-direction: reverse; }\n\n.panic-modal-overlay {\n          display: -ms-flexbox; display: -moz-flex; display: -webkit-flex; display: flex;\n          -ms-flex-direction: column; -moz-flex-direction: column; -webkit-flex-direction: column; flex-direction: column;\n          -ms-align-items: center; -moz-align-items: center; -webkit-align-items: center; align-items: center;\n          -ms-flex-pack: center; -ms-align-content: center; -moz-align-content: center; -webkit-align-content: center; align-content: center;\n          -ms-justify-content: center; -moz-justify-content: center; -webkit-justify-content: center; justify-content: center;\n          position: fixed; left: 0; right: 0; top: 0; bottom: 0; }\n\n.panic-modal-overlay-background { z-index: 1; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background: white; opacity: 0.75; }\n\n.panic-modal * { letter-spacing: 0; font-family: Helvetica, sans-serif; }\n.panic-modal { font-family: Helvetica, sans-serif; min-width: 640px; max-width: 90%; transition: 0.25s width ease-in-out; box-sizing: border-box; display: -webkit-flex; display: flex; position: relative; border-radius: 4px; z-index: 2; width: 640px; background: white; padding: 36px 42px 128px 42px; box-shadow: 0px 30px 80px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15); }\n.panic-alert-counter { float: left; background: #904C34; border-radius: 8px; width: 17px; height: 17px; display: inline-block; text-align: center; line-height: 16px; margin-right: 1em; margin-left: -2px; font-size: 10px; color: white; font-weight: bold; }\n.panic-alert-counter:empty { display: none; }\n\n.panic-modal-title { font-family: Helvetica, sans-serif; color: black; font-weight: 300; font-size: 30px; opacity: 0.5; margin-bottom: 1em; }\n.panic-modal-body { overflow-y: auto; width: 100%; }\n.panic-modal-footer { text-align: right; position: absolute; left: 0; right: 0; bottom: 0; padding: 42px; }\n\n.panic-btn { margin-left: 1em; font-weight: 300; font-family: Helvetica, sans-serif; -webkit-user-select: none; user-select: none; cursor: pointer; display: inline-block; padding: 1em 1.5em; border-radius: 4px; font-size: 14px; border: 1px solid black; color: white; }\n.panic-btn:focus { outline: none; }\n.panic-btn:focus { box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); }\n\n.panic-btn-danger       { background-color: #d9534f; border-color: #d43f3a; }\n.panic-btn-danger:hover { background-color: #c9302c; border-color: #ac2925; }\n\n.panic-btn-warning       { background-color: #f0ad4e; border-color: #eea236; }\n.panic-btn-warning:hover { background-color: #ec971f; border-color: #d58512; }\n\n.panic-alert-error { border-radius: 4px; background: #FFE8E2; color: #904C34; padding: 1em 1.2em 1.2em 1.2em; margin-bottom: 1em; font-size: 14px; }\n\n.panic-alert-error { position: relative; text-shadow: 0px 1px 0px rgba(255,255,255,0.25); }\n\n.panic-alert-error .clean-toggle { height: 2em; text-decoration: none; font-weight: 300; position: absolute; color: black; opacity: 0.25; right: 0; top: 0; display: block; text-align: right; }\n.panic-alert-error .clean-toggle:hover { text-decoration: underline; }\n.panic-alert-error .clean-toggle:before,\n.panic-alert-error .clean-toggle:after { position: absolute; right: 0; transition: all 0.25s ease-in-out; display: inline-block; overflow: hidden; }\n.panic-alert-error .clean-toggle:before { -webkit-transform-origin: center left; transform-origin: center left; content: \'more\'; }\n.panic-alert-error .clean-toggle:after { -webkit-transform-origin: center left; transform-origin: center right; content: \'less\'; }\n.panic-alert-error.all-stack-entries .clean-toggle:before { -webkit-transform: scale(0); transform: scale(0); }\n.panic-alert-error:not(.all-stack-entries) .clean-toggle:after { -webkit-transform: scale(0); transform: scale(0); }\n\n.panic-alert-error:last-child { margin-bottom: 0; }\n\n.panic-alert-error-message { line-height: 1.2em; position: relative; }\n\n.panic-alert-error .callstack { font-size: 12px; margin: 2em 0 0.1em 0; padding: 0; }\n.panic-alert-error .callstack * { font-family: Menlo, monospace; }\n\n.panic-alert-error .callstack-entry { white-space: nowrap; opacity: 1; transition: all 0.25s ease-in-out; margin-top: 10px; list-style-type: none; max-height: 38px; overflow: hidden; }\n.panic-alert-error .callstack-entry .file { }\n.panic-alert-error .callstack-entry .file:not(:empty) + .callee:not(:empty):before { content: \' \u2192 \'; }\n\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.third-party:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.hide:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.native:not(:first-child) { max-height: 0; margin-top: 0; opacity: 0; }\n\n.panic-alert-error .callstack-entry,\n.panic-alert-error .callstack-entry * { line-height: initial; }\n.panic-alert-error .callstack-entry .src { overflow: hidden; transition: height 0.25s ease-in-out; height: 22px; border-radius: 2px; cursor: pointer; margin-top: 2px; white-space: pre; display: block; color: black; background: rgba(255,255,255,0.75); padding: 4px; }\n.panic-alert-error .callstack-entry.full .src { font-size: 12px; height: 200px; overflow: scroll; }\n.panic-alert-error .callstack-entry.full .src .line.hili { background: yellow; }\n.panic-alert-error .callstack-entry.full { max-height: 220px; }\n\n.panic-alert-error .callstack-entry .src.i-am-busy { background: white; }\n\n.panic-alert-error .callstack-entry        .src:empty                  { pointer-events: none; }\n.panic-alert-error .callstack-entry        .src:empty:before           { content: \'<< SOURCE NOT LOADED >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry.native .src:empty:before           { content: \'<< NATIVE CODE >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry        .src.i-am-busy:empty:before { content: \'<< SOURCE LOADING >>\'; color: rgba(0,0,0,0.5); }\n\n.panic-alert-error .test-log .location { transition: opacity 0.25s ease-in-out; color: black; opacity: 0.25; display: inline-block; overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }\n.panic-alert-error .test-log .location:hover { opacity: 1; }\n\n.panic-alert-error .test-log .location:before { content: \' @ \'; }\n\n.panic-alert-error .test-log .location .callee:after  { content: \', \'; }\n.panic-alert-error .test-log .location .file          { opacity: 0.5; }\n.panic-alert-error .test-log .location .line:before   { content: \':\'; }\n.panic-alert-error .test-log .location .line          { opacity: 0.25; }\n\n/*  Hack to prevent inline-blocked divs from wrapping within white-space: pre;\n */\n.panic-alert-error .test-log .inline-exception-entry:after { content: \' \'; }\n.panic-alert-error .test-log .log-entry        .line:after { content: \' \'; }\n.panic-alert-error           .callstack-entry  .line:after { content: \' \'; }\n\n.panic-alert-error pre { overflow: scroll; border-radius: 2px; color: black; background: rgba(255,255,255,0.75); padding: 4px; margin: 0; }\n.panic-alert-error pre,\n.panic-alert-error pre * { font-family: Menlo, monospace; font-size: 11px; white-space: pre !important; }\n\n.panic-alert-error.inline-exception { max-width: 640px; border-radius: 0; margin: 0; background: none; display: inline-block; transform-origin: 0 0; transform: scale(0.95); }\n.panic-alert-error.inline-exception .panic-alert-error-message { cursor: pointer; }\n.panic-alert-error.inline-exception:not(:first-child) { margin-top: 10px; border-top: 1px solid #904C34; }\n\n'),
        $('<style type="text/css">').text('.useless-log-overlay {\tposition: fixed; bottom: 10px; left: 10px; right: 10px; top: 10px; z-index: 5000;\n\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t\t\t-webkit-mask-image: -webkit-gradient(linear, left top, left bottom,\n\t\t\t\t\t\t\tcolor-stop(0.00, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.50, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.60, rgba(0,0,0,0.8)),\n\t\t\t\t\t\t\tcolor-stop(1.00, rgba(0,0,0,1))); }\n\n.useless-log-overlay-body {\n\n\tfont-family: Menlo, monospace;\n\tfont-size: 11px;\n\twhite-space: pre;\n\tbackground: rgba(255,255,255,1);\n\ttext-shadow: 1px 1px 0px rgba(0,0,0,0.07); position: absolute; bottom: 0; left: 0; right: 0; }\n\n.ulo-line \t\t{ white-space: pre; word-wrap: normal; }\n.ulo-line-where { color: black; opacity: 0.25; }')
    ]);
}(jQuery));
;