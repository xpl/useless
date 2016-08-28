/*    AUTO GENERATED from useless.devtools.js (stripped unit tests and comments) */

(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.i = function (value) {
        return value;
    };
    __webpack_require__.d = function (exports, name, getter) {
        Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: getter
        });
    };
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module['default'];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = '';
    return __webpack_require__(__webpack_require__.s = 39);
}([
    function (module, exports) {
        function getArg(aArgs, aName, aDefaultValue) {
            if (aName in aArgs) {
                return aArgs[aName];
            } else if (arguments.length === 3) {
                return aDefaultValue;
            } else {
                throw new Error('"' + aName + '" is a required argument.');
            }
        }
        exports.getArg = getArg;
        var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
        var dataUrlRegexp = /^data:.+\,.+$/;
        function urlParse(aUrl) {
            var match = aUrl.match(urlRegexp);
            if (!match) {
                return null;
            }
            return {
                scheme: match[1],
                auth: match[2],
                host: match[3],
                port: match[4],
                path: match[5]
            };
        }
        exports.urlParse = urlParse;
        function urlGenerate(aParsedUrl) {
            var url = '';
            if (aParsedUrl.scheme) {
                url += aParsedUrl.scheme + ':';
            }
            url += '//';
            if (aParsedUrl.auth) {
                url += aParsedUrl.auth + '@';
            }
            if (aParsedUrl.host) {
                url += aParsedUrl.host;
            }
            if (aParsedUrl.port) {
                url += ':' + aParsedUrl.port;
            }
            if (aParsedUrl.path) {
                url += aParsedUrl.path;
            }
            return url;
        }
        exports.urlGenerate = urlGenerate;
        function normalize(aPath) {
            var path = aPath;
            var url = urlParse(aPath);
            if (url) {
                if (!url.path) {
                    return aPath;
                }
                path = url.path;
            }
            var isAbsolute = exports.isAbsolute(path);
            var parts = path.split(/\/+/);
            for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
                part = parts[i];
                if (part === '.') {
                    parts.splice(i, 1);
                } else if (part === '..') {
                    up++;
                } else if (up > 0) {
                    if (part === '') {
                        parts.splice(i + 1, up);
                        up = 0;
                    } else {
                        parts.splice(i, 2);
                        up--;
                    }
                }
            }
            path = parts.join('/');
            if (path === '') {
                path = isAbsolute ? '/' : '.';
            }
            if (url) {
                url.path = path;
                return urlGenerate(url);
            }
            return path;
        }
        exports.normalize = normalize;
        function join(aRoot, aPath) {
            if (aRoot === '') {
                aRoot = '.';
            }
            if (aPath === '') {
                aPath = '.';
            }
            var aPathUrl = urlParse(aPath);
            var aRootUrl = urlParse(aRoot);
            if (aRootUrl) {
                aRoot = aRootUrl.path || '/';
            }
            if (aPathUrl && !aPathUrl.scheme) {
                if (aRootUrl) {
                    aPathUrl.scheme = aRootUrl.scheme;
                }
                return urlGenerate(aPathUrl);
            }
            if (aPathUrl || aPath.match(dataUrlRegexp)) {
                return aPath;
            }
            if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
                aRootUrl.host = aPath;
                return urlGenerate(aRootUrl);
            }
            var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
            if (aRootUrl) {
                aRootUrl.path = joined;
                return urlGenerate(aRootUrl);
            }
            return joined;
        }
        exports.join = join;
        exports.isAbsolute = function (aPath) {
            return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
        };
        function relative(aRoot, aPath) {
            if (aRoot === '') {
                aRoot = '.';
            }
            aRoot = aRoot.replace(/\/$/, '');
            var level = 0;
            while (aPath.indexOf(aRoot + '/') !== 0) {
                var index = aRoot.lastIndexOf('/');
                if (index < 0) {
                    return aPath;
                }
                aRoot = aRoot.slice(0, index);
                if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
                    return aPath;
                }
                ++level;
            }
            return Array(level + 1).join('../') + aPath.substr(aRoot.length + 1);
        }
        exports.relative = relative;
        var supportsNullProto = function () {
            var obj = Object.create(null);
            return !('__proto__' in obj);
        }();
        function identity(s) {
            return s;
        }
        function toSetString(aStr) {
            if (isProtoString(aStr)) {
                return '$' + aStr;
            }
            return aStr;
        }
        exports.toSetString = supportsNullProto ? identity : toSetString;
        function fromSetString(aStr) {
            if (isProtoString(aStr)) {
                return aStr.slice(1);
            }
            return aStr;
        }
        exports.fromSetString = supportsNullProto ? identity : fromSetString;
        function isProtoString(s) {
            if (!s) {
                return false;
            }
            var length = s.length;
            if (length < 9) {
                return false;
            }
            if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
                return false;
            }
            for (var i = length - 10; i >= 0; i--) {
                if (s.charCodeAt(i) !== 36) {
                    return false;
                }
            }
            return true;
        }
        function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
            var cmp = mappingA.source - mappingB.source;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.originalLine - mappingB.originalLine;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.originalColumn - mappingB.originalColumn;
            if (cmp !== 0 || onlyCompareOriginal) {
                return cmp;
            }
            cmp = mappingA.generatedColumn - mappingB.generatedColumn;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.generatedLine - mappingB.generatedLine;
            if (cmp !== 0) {
                return cmp;
            }
            return mappingA.name - mappingB.name;
        }
        exports.compareByOriginalPositions = compareByOriginalPositions;
        function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
            var cmp = mappingA.generatedLine - mappingB.generatedLine;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.generatedColumn - mappingB.generatedColumn;
            if (cmp !== 0 || onlyCompareGenerated) {
                return cmp;
            }
            cmp = mappingA.source - mappingB.source;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.originalLine - mappingB.originalLine;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.originalColumn - mappingB.originalColumn;
            if (cmp !== 0) {
                return cmp;
            }
            return mappingA.name - mappingB.name;
        }
        exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
        function strcmp(aStr1, aStr2) {
            if (aStr1 === aStr2) {
                return 0;
            }
            if (aStr1 > aStr2) {
                return 1;
            }
            return -1;
        }
        function compareByGeneratedPositionsInflated(mappingA, mappingB) {
            var cmp = mappingA.generatedLine - mappingB.generatedLine;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.generatedColumn - mappingB.generatedColumn;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = strcmp(mappingA.source, mappingB.source);
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.originalLine - mappingB.originalLine;
            if (cmp !== 0) {
                return cmp;
            }
            cmp = mappingA.originalColumn - mappingB.originalColumn;
            if (cmp !== 0) {
                return cmp;
            }
            return strcmp(mappingA.name, mappingB.name);
        }
        exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    },
    function (module, exports) {
        'use strict';
        'use strict';
        const O = Object, asColumns = (rows, cfg_) => {
                if (rows.length === 0) {
                    return [];
                } else {
                    const zip = (arrs, f) => arrs.reduce((a, b) => b.map((b, i) => [
                            ...a[i] || [],
                            b
                        ]), []).map(args => f(...args)), cells = rows.map(r => r.map(c => c === undefined ? '' : String(c).replace(/\n/g, '\\n'))), cellWidths = cells.map(r => r.map(c => c.length)), maxWidths = zip(cellWidths, Math.max), cfg = O.assign({
                            delimiter: '  ',
                            minColumnWidths: maxWidths.map(x => 0),
                            maxTotalWidth: 0
                        }, cfg_), totalWidth = maxWidths.reduce((a, b) => a + b, 0), relativeWidths = maxWidths.map(w => w / totalWidth), maxTotalWidth = cfg.maxTotalWidth - cfg.delimiter.length * maxWidths.length, excessWidth = Math.max(0, totalWidth - maxTotalWidth), computedWidths = zip([
                            cfg.minColumnWidths,
                            maxWidths,
                            relativeWidths
                        ], (min, max, relative) => Math.max(min, Math.floor(max - excessWidth * relative))), restCellWidths = cellWidths.map(widths => zip([
                            computedWidths,
                            widths
                        ], (a, b) => a - b));
                    return zip([
                        cells,
                        restCellWidths
                    ], (a, b) => zip([
                        a,
                        b
                    ], (str, w) => w >= 0 ? str + ' '.repeat(w) : str.slice(0, w)).join(cfg.delimiter));
                }
            }, asTable = cfg => O.assign(arr => {
                if (arr[0] && Array.isArray(arr[0]))
                    return asColumns(arr, cfg).join('\n');
                const colNames = [...new Set(arr.map(O.keys).reduce((a, b) => [
                            ...a,
                            ...b
                        ], []))], columns = [
                        colNames,
                        ...arr.map(o => colNames.map(key => o[key]))
                    ], lines = asColumns(columns, O.assign({ minColumnWidths: colNames.map(n => n.length) }, cfg));
                return [
                    lines[0],
                    '-'.repeat(lines[0].length),
                    ...lines.slice(1)
                ].join('\n');
            }, cfg, { configure: newConfig => asTable(O.assign({}, cfg, newConfig)) });
        module.exports = asTable({ maxTotalWidth: 120 });
    },
    function (module, exports, __webpack_require__) {
        module.exports = function () {
            'use strict';
            var ownKeys = __webpack_require__(26);
            var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
            var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
            var concat = Function.bind.call(Function.call, Array.prototype.concat);
            if (!Object.values) {
                Object.values = function values(O) {
                    return reduce(ownKeys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
                };
            }
            if (!Object.entries) {
                Object.entries = function entries(O) {
                    return reduce(ownKeys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[
                            k,
                            O[k]
                        ]] : []), []);
                };
            }
            return Object;
        }();
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
        module.exports = function (bullet, arg) {
            var isArray = Array.isArray(arg);
            var lines = isArray ? arg : arg.split('\n');
            var indent = bullet.replace(/[^\s]/g, ' ');
            lines = lines.map(function (line, i) {
                return i === 0 ? bullet + line : indent + line;
            });
            return isArray ? lines : lines.join('\n');
        };
    },
    function (module, exports, __webpack_require__) {
        'use strict';
        'use strict';
        const O = Object, isBrowser = typeof window !== 'undefined' && window.window === window && window.navigator, SourceMapConsumer = __webpack_require__(34).SourceMapConsumer, path = __webpack_require__(!function webpackMissingModule() {
                var e = new Error('Cannot find module "./impl/path"');
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            }()), memoize = __webpack_require__(27), lastOf = x => x[x.length - 1];
        const newSourceFileMemoized = memoize(file => new SourceFile(file));
        const getSource = module.exports = file => {
            return newSourceFileMemoized(path.resolve(file));
        };
        class SourceMap {
            constructor(originalFilePath, sourceMapPath) {
                this.file = getSource(path.relativeToFile(originalFilePath, sourceMapPath));
                this.parsed = this.file.text && SourceMapConsumer(JSON.parse(this.file.text)) || null;
                this.sourceFor = memoize(this.sourceFor.bind(this));
            }
            sourceFor(file) {
                const content = this.parsed.sourceContentFor(file, true);
                const fullPath = path.relativeToFile(this.file.path, file);
                return content ? new SourceFile(fullPath, content) : getSource(fullPath);
            }
            resolve(loc) {
                const originalLoc = this.parsed.originalPositionFor(loc);
                return originalLoc.source ? this.sourceFor(originalLoc.source).resolve(O.assign({}, loc, {
                    line: originalLoc.line,
                    column: originalLoc.column,
                    name: originalLoc.name
                })) : loc;
            }
        }
        class SourceFile {
            constructor(path, text) {
                this.path = path;
                if (text) {
                    this.text = text;
                } else {
                    try {
                        if (isBrowser) {
                            let xhr = new XMLHttpRequest();
                            xhr.open('GET', path, false);
                            xhr.send(null);
                            this.text = xhr.responseText;
                        } else {
                            this.text = __webpack_require__(!function webpackMissingModule() {
                                var e = new Error('Cannot find module "fs"');
                                e.code = 'MODULE_NOT_FOUND';
                                throw e;
                            }()).readFileSync(path, { encoding: 'utf8' });
                        }
                    } catch (e) {
                        this.error = e;
                        this.text = '';
                    }
                }
            }
            get lines() {
                return this.lines_ = this.lines_ || this.text.split('\n');
            }
            get sourceMap() {
                try {
                    if (this.sourceMap_ === undefined) {
                        let url = this.text.match(/\u0023 sourceMappingURL=(.+\.map)/);
                        if (url = url && url[1]) {
                            this.sourceMap_ = new SourceMap(this.path, url);
                        } else {
                            this.sourceMap_ = null;
                        }
                    }
                } catch (e) {
                    this.sourceMapError = e;
                    this.sourceMap_ = null;
                }
                return this.sourceMap_;
            }
            resolve(loc) {
                return this.sourceMap ? this.sourceMap.resolve(loc) : O.assign({}, loc, {
                    sourceFile: this,
                    sourceLine: this.lines[loc.line - 1] || '',
                    error: this.error
                });
            }
        }
    },
    function (module, exports, __webpack_require__) {
        var util = __webpack_require__(0);
        var has = Object.prototype.hasOwnProperty;
        function ArraySet() {
            this._array = [];
            this._set = Object.create(null);
        }
        ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
            var set = new ArraySet();
            for (var i = 0, len = aArray.length; i < len; i++) {
                set.add(aArray[i], aAllowDuplicates);
            }
            return set;
        };
        ArraySet.prototype.size = function ArraySet_size() {
            return Object.getOwnPropertyNames(this._set).length;
        };
        ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
            var sStr = util.toSetString(aStr);
            var isDuplicate = has.call(this._set, sStr);
            var idx = this._array.length;
            if (!isDuplicate || aAllowDuplicates) {
                this._array.push(aStr);
            }
            if (!isDuplicate) {
                this._set[sStr] = idx;
            }
        };
        ArraySet.prototype.has = function ArraySet_has(aStr) {
            var sStr = util.toSetString(aStr);
            return has.call(this._set, sStr);
        };
        ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
            var sStr = util.toSetString(aStr);
            if (has.call(this._set, sStr)) {
                return this._set[sStr];
            }
            throw new Error('"' + aStr + '" is not in the set.');
        };
        ArraySet.prototype.at = function ArraySet_at(aIdx) {
            if (aIdx >= 0 && aIdx < this._array.length) {
                return this._array[aIdx];
            }
            throw new Error('No element indexed by ' + aIdx);
        };
        ArraySet.prototype.toArray = function ArraySet_toArray() {
            return this._array.slice();
        };
        exports.ArraySet = ArraySet;
    },
    function (module, exports, __webpack_require__) {
        var base64 = __webpack_require__(28);
        var VLQ_BASE_SHIFT = 5;
        var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
        var VLQ_BASE_MASK = VLQ_BASE - 1;
        var VLQ_CONTINUATION_BIT = VLQ_BASE;
        function toVLQSigned(aValue) {
            return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
        }
        function fromVLQSigned(aValue) {
            var isNegative = (aValue & 1) === 1;
            var shifted = aValue >> 1;
            return isNegative ? -shifted : shifted;
        }
        exports.encode = function base64VLQ_encode(aValue) {
            var encoded = '';
            var digit;
            var vlq = toVLQSigned(aValue);
            do {
                digit = vlq & VLQ_BASE_MASK;
                vlq >>>= VLQ_BASE_SHIFT;
                if (vlq > 0) {
                    digit |= VLQ_CONTINUATION_BIT;
                }
                encoded += base64.encode(digit);
            } while (vlq > 0);
            return encoded;
        };
        exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
            var strLen = aStr.length;
            var result = 0;
            var shift = 0;
            var continuation, digit;
            do {
                if (aIndex >= strLen) {
                    throw new Error('Expected more digits in base 64 VLQ value.');
                }
                digit = base64.decode(aStr.charCodeAt(aIndex++));
                if (digit === -1) {
                    throw new Error('Invalid base64 digit: ' + aStr.charAt(aIndex - 1));
                }
                continuation = !!(digit & VLQ_CONTINUATION_BIT);
                digit &= VLQ_BASE_MASK;
                result = result + (digit << shift);
                shift += VLQ_BASE_SHIFT;
            } while (continuation);
            aOutParam.value = fromVLQSigned(result);
            aOutParam.rest = aIndex;
        };
    },
    function (module, exports, __webpack_require__) {
        var base64VLQ = __webpack_require__(7);
        var util = __webpack_require__(0);
        var ArraySet = __webpack_require__(6).ArraySet;
        var MappingList = __webpack_require__(30).MappingList;
        function SourceMapGenerator(aArgs) {
            if (!aArgs) {
                aArgs = {};
            }
            this._file = util.getArg(aArgs, 'file', null);
            this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
            this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
            this._sources = new ArraySet();
            this._names = new ArraySet();
            this._mappings = new MappingList();
            this._sourcesContents = null;
        }
        SourceMapGenerator.prototype._version = 3;
        SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
            var sourceRoot = aSourceMapConsumer.sourceRoot;
            var generator = new SourceMapGenerator({
                file: aSourceMapConsumer.file,
                sourceRoot: sourceRoot
            });
            aSourceMapConsumer.eachMapping(function (mapping) {
                var newMapping = {
                    generated: {
                        line: mapping.generatedLine,
                        column: mapping.generatedColumn
                    }
                };
                if (mapping.source != null) {
                    newMapping.source = mapping.source;
                    if (sourceRoot != null) {
                        newMapping.source = util.relative(sourceRoot, newMapping.source);
                    }
                    newMapping.original = {
                        line: mapping.originalLine,
                        column: mapping.originalColumn
                    };
                    if (mapping.name != null) {
                        newMapping.name = mapping.name;
                    }
                }
                generator.addMapping(newMapping);
            });
            aSourceMapConsumer.sources.forEach(function (sourceFile) {
                var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                if (content != null) {
                    generator.setSourceContent(sourceFile, content);
                }
            });
            return generator;
        };
        SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
            var generated = util.getArg(aArgs, 'generated');
            var original = util.getArg(aArgs, 'original', null);
            var source = util.getArg(aArgs, 'source', null);
            var name = util.getArg(aArgs, 'name', null);
            if (!this._skipValidation) {
                this._validateMapping(generated, original, source, name);
            }
            if (source != null) {
                source = String(source);
                if (!this._sources.has(source)) {
                    this._sources.add(source);
                }
            }
            if (name != null) {
                name = String(name);
                if (!this._names.has(name)) {
                    this._names.add(name);
                }
            }
            this._mappings.add({
                generatedLine: generated.line,
                generatedColumn: generated.column,
                originalLine: original != null && original.line,
                originalColumn: original != null && original.column,
                source: source,
                name: name
            });
        };
        SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
            var source = aSourceFile;
            if (this._sourceRoot != null) {
                source = util.relative(this._sourceRoot, source);
            }
            if (aSourceContent != null) {
                if (!this._sourcesContents) {
                    this._sourcesContents = Object.create(null);
                }
                this._sourcesContents[util.toSetString(source)] = aSourceContent;
            } else if (this._sourcesContents) {
                delete this._sourcesContents[util.toSetString(source)];
                if (Object.keys(this._sourcesContents).length === 0) {
                    this._sourcesContents = null;
                }
            }
        };
        SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
            var sourceFile = aSourceFile;
            if (aSourceFile == null) {
                if (aSourceMapConsumer.file == null) {
                    throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
                }
                sourceFile = aSourceMapConsumer.file;
            }
            var sourceRoot = this._sourceRoot;
            if (sourceRoot != null) {
                sourceFile = util.relative(sourceRoot, sourceFile);
            }
            var newSources = new ArraySet();
            var newNames = new ArraySet();
            this._mappings.unsortedForEach(function (mapping) {
                if (mapping.source === sourceFile && mapping.originalLine != null) {
                    var original = aSourceMapConsumer.originalPositionFor({
                        line: mapping.originalLine,
                        column: mapping.originalColumn
                    });
                    if (original.source != null) {
                        mapping.source = original.source;
                        if (aSourceMapPath != null) {
                            mapping.source = util.join(aSourceMapPath, mapping.source);
                        }
                        if (sourceRoot != null) {
                            mapping.source = util.relative(sourceRoot, mapping.source);
                        }
                        mapping.originalLine = original.line;
                        mapping.originalColumn = original.column;
                        if (original.name != null) {
                            mapping.name = original.name;
                        }
                    }
                }
                var source = mapping.source;
                if (source != null && !newSources.has(source)) {
                    newSources.add(source);
                }
                var name = mapping.name;
                if (name != null && !newNames.has(name)) {
                    newNames.add(name);
                }
            }, this);
            this._sources = newSources;
            this._names = newNames;
            aSourceMapConsumer.sources.forEach(function (sourceFile) {
                var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                if (content != null) {
                    if (aSourceMapPath != null) {
                        sourceFile = util.join(aSourceMapPath, sourceFile);
                    }
                    if (sourceRoot != null) {
                        sourceFile = util.relative(sourceRoot, sourceFile);
                    }
                    this.setSourceContent(sourceFile, content);
                }
            }, this);
        };
        SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
            if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
                return;
            } else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
                return;
            } else {
                throw new Error('Invalid mapping: ' + JSON.stringify({
                    generated: aGenerated,
                    source: aSource,
                    original: aOriginal,
                    name: aName
                }));
            }
        };
        SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
            var previousGeneratedColumn = 0;
            var previousGeneratedLine = 1;
            var previousOriginalColumn = 0;
            var previousOriginalLine = 0;
            var previousName = 0;
            var previousSource = 0;
            var result = '';
            var next;
            var mapping;
            var nameIdx;
            var sourceIdx;
            var mappings = this._mappings.toArray();
            for (var i = 0, len = mappings.length; i < len; i++) {
                mapping = mappings[i];
                next = '';
                if (mapping.generatedLine !== previousGeneratedLine) {
                    previousGeneratedColumn = 0;
                    while (mapping.generatedLine !== previousGeneratedLine) {
                        next += ';';
                        previousGeneratedLine++;
                    }
                } else {
                    if (i > 0) {
                        if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
                            continue;
                        }
                        next += ',';
                    }
                }
                next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
                previousGeneratedColumn = mapping.generatedColumn;
                if (mapping.source != null) {
                    sourceIdx = this._sources.indexOf(mapping.source);
                    next += base64VLQ.encode(sourceIdx - previousSource);
                    previousSource = sourceIdx;
                    next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
                    previousOriginalLine = mapping.originalLine - 1;
                    next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
                    previousOriginalColumn = mapping.originalColumn;
                    if (mapping.name != null) {
                        nameIdx = this._names.indexOf(mapping.name);
                        next += base64VLQ.encode(nameIdx - previousName);
                        previousName = nameIdx;
                    }
                }
                result += next;
            }
            return result;
        };
        SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
            return aSources.map(function (source) {
                if (!this._sourcesContents) {
                    return null;
                }
                if (aSourceRoot != null) {
                    source = util.relative(aSourceRoot, source);
                }
                var key = util.toSetString(source);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
            }, this);
        };
        SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
            var map = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            if (this._file != null) {
                map.file = this._file;
            }
            if (this._sourceRoot != null) {
                map.sourceRoot = this._sourceRoot;
            }
            if (this._sourcesContents) {
                map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
            }
            return map;
        };
        SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
            return JSON.stringify(this.toJSON());
        };
        exports.SourceMapGenerator = SourceMapGenerator;
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
            if (typeof DEBUG !== 'undefined' && DEBUG) {
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
    function (module, exports) {
        var g;
        g = function () {
            return this;
        }();
        try {
            g = g || Function('return this')() || (1, eval)('this');
        } catch (e) {
            if (typeof window === 'object')
                g = window;
        }
        module.exports = g;
    },
    function (module, exports, __webpack_require__) {
        var content = __webpack_require__(35);
        if (typeof content === 'string')
            content = [[
                    module.i,
                    content,
                    ''
                ]];
        var update = __webpack_require__(11)(content, {});
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
        var content = __webpack_require__(36);
        if (typeof content === 'string')
            content = [[
                    module.i,
                    content,
                    ''
                ]];
        var update = __webpack_require__(11)(content, {});
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
        'use strict';
        'use strict';
        const O = __webpack_require__(2);
        const bullet = __webpack_require__(4), asTable = __webpack_require__(1);
        Tags.define('shouldFail');
        Tags.define('async');
        ;
        Tags.define('assertion');
        $global.Testosterone = $singleton({
            prototypeTests: [],
            get isRunning() {
                return this.currentAssertion !== undefined;
            },
            constructor: function () {
                _.each(_.assertions, function (fn, name) {
                    this.defineAssertion(name, name === 'assertFails' ? $shouldFail(function (what) {
                        what.call(this);
                    }) : fn);
                }, this);
                (function (register) {
                    $prototype.macro('$test', register);
                    $prototype.macro('$tests', register);
                }((def, value, name) => {
                    this.prototypeTests.push({
                        proto: def.constructor,
                        tests: value
                    });
                    def.$tests = $static($property($constant(_.isStrictlyObject(value) && value || _.object([[
                            'test',
                            value
                        ]]))));
                    return def;
                }));
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
                var prototypeTests = cfg.codebase === false ? [] : this.collectPrototypeTests();
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
                return __.each(this.runningTests, this.$(this.runTest)).then(() => {
                    _.assert(cfg.done !== true);
                    cfg.done = true;
                    this.printLog(cfg);
                    this.failedTests = _.filter(this.runningTests, _.property('failed'));
                    this.failed = this.failedTests.length > 0;
                    return !this.failed;
                }).catch(e => {
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
            collectPrototypeTests() {
                return this.prototypeTests.map(def => this.testSuite(def.proto.$meta.name, def.tests, undefined, def.proto));
            },
            testSuite: function (name, tests, context, proto) {
                return {
                    name: name || '',
                    tests: _(O.entries(typeof tests === 'function' && _.fromPairs([[
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
                var fn = $untag(def);
                delete $global['$' + name];
                $global['$' + name] = _.withSameArgs(fn, function () {
                    var loc = new StackTracey().withSource($platform.Browser && !$platform.Chrome ? 0 : 1);
                    if (!self.currentAssertion) {
                        return fn.apply(self, arguments);
                    } else {
                        return self.currentAssertion.babyAssertion(name, def, fn, arguments, loc);
                    }
                });
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
        $global.Test = $prototype({
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
                        var src = assertion.location.sourceLine.trim();
                        log.red(log.config({
                            location: assertion.location,
                            where: assertion.location
                        }), src);
                        assertion.evalLogCalls();
                        return src;
                    }
                }).then(function () {
                    if (assertion.failed && self.canFail) {
                        self.failedAssertions.push(assertion);
                    }
                }).catch(function (e) {
                    log.ee(log.boldLine, 'TESTOSTERONE CRASHED', log.boldLine, '\n\n', e);
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
                                log.orange(asTable(_.map(notMatching, function (obj) {
                                    return [
                                        '\t\u2022 ' + _.keys(obj)[0],
                                        String.ify(_.values(obj)[0])
                                    ];
                                })));
                            } else {
                                var cases = _.map(notMatching, log.impl.stringify.arity1.then(bullet.$('\t\u2022 ')));
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
        Tags.define('allowsRecursion');
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
                                return 'arg' + (i + 1) + ': ' + String.ify(arg);
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
            colors.each(Tags.define);
            var stringify = String.ify.configure({ pretty: false });
            Tags.define('verbose');
            Testosterone.LogsMethodCalls = $trait({
                $macroTags: {
                    log: function (def, member, name) {
                        var param = (_.isBoolean(member.$log) ? undefined : member.$log) || (member.$verbose ? '{{$proto}}' : '');
                        var meta = def.$meta || {};
                        var color = _.find2(colors, function (color) {
                            return log.color(member['$' + color] && color) || false;
                        });
                        var template = param && _.template(param, { interpolate: /\{\{(.+?)\}\}/g });
                        return $prototype.impl.modifyMember(member, function (fn, name_) {
                            return function () {
                                var this_ = this, arguments_ = _.asArray(arguments);
                                var this_dump = template && template.call(this, _.extend({ $proto: meta.name }, _.map2(this, stringify))) || this.desc || '';
                                var args_dump = _.map(arguments_, stringify).join(', ').quote('()');
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
                                        log.write('\u2192', stringify(result));
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
    function (module, exports, __webpack_require__) {
        'use strict';
        'use strict';
        const O = __webpack_require__(2), bullet = __webpack_require__(4), asTable = __webpack_require__(1);
        _.hasLog = true;
        ;
        _.extend($global.log = function () {
            return log.write.apply(this, [log.config({ location: true })].concat(_.asArray(arguments)));
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
            where: function (wat) {
                return log.config({
                    location: true,
                    where: wat || undefined
                });
            },
            color: _.extend(function (x) {
                return (log.color[x] || {}).color;
            }, _.fromPairs(_.map([
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
                return log.writeBackend.value || log.impl.defaultWriteBackend;
            },
            withConfig: function (config, what) {
                log.impl.configStack.push(config);
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
                    return _.reduce2({ indent: 0 }, _.nonempty(configs), function (memo, cfg) {
                        return _.extend(memo, _.nonempty(cfg), { indent: memo.indent + (cfg.indent || 0) });
                    });
                },
                write: $restArg(_.bindable(function () {
                    var writeBackend = log.writeBackend();
                    log.impl.numWrites++;
                    var args = _.asArray(arguments);
                    var config = log.impl.configure([{ indent: writeBackend.indent || 0 }].concat(log.impl.configStack));
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
                    var where = config.where || log.impl.findWhere(new StackTracey());
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
                findWhere: function (stack) {
                    return stack.withSources.filter(x => !x.hide).at(2);
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
                            lines = log.color('dark').shell + bullet(String(params.when), log.color('none').shell + lines);
                        }
                        console.log(lines, log.color('dark').shell + codeLocation + '\x1B[0m', params.trailNewlines);
                    } else {
                        console.log.apply(console, _.reject.with(_.equals(undefined), [].concat([
                            log.timestampEnabled ? '%c' + params.when + '%c' : '',
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
                location: where => '(' + [].concat(where.calleeShort || [], [].concat(where.fileName || [], where.line || []).join(':')).join(' @ ') + ')',
                stringifyArguments: (args, cfg) => args.map(arg => {
                    var x = log.impl.stringify(arg, cfg);
                    return cfg.maxArgLength ? String.ify.limit(x, cfg.maxArgLength) : x;
                }).join(' '),
                stringify: (what, cfg) => typeof what === 'string' ? what : Array.isArray(what) && (cfg || {}).table ? asTable(what) : String.ify.configure(cfg || {})(what)
            }
        });
        (function () {
            var write = log.impl.write;
            _.extend(log, log.printAPI = _.fromPairs(_.concat([
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
                        color: log.color(names.first)
                    }))
                ];
            })))))));
        }());
        $global.logs = _.higherOrder.map(log.printAPI);
        if ($platform.NodeJS) {
            module.exports = log;
        }
    },
    function (module, exports) {
        'use strict';
        'use strict';
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
        'use strict';
        (function (__filename) {
            'use strict';
            const O = Object;
            _.hasReflection = true;
            $global.getSource = __webpack_require__(5);
            $global.StackTracey = O.assign(__webpack_require__(38), {
                fromErrorWithAsync(e) {
                    let stackEntries = new StackTracey(e), asyncContext = e.asyncContext;
                    while (asyncContext) {
                        stackEntries = stackEntries.concat(new StackTracey(asyncContext.stack));
                        asyncContext = asyncContext.asyncContext;
                    }
                    return stackEntries.mergeRepeatedLines;
                }
            });
            _.tests.reflection = {
                'file paths': function () {
                    $assert(typeof $uselessPath, 'string');
                    $assert($sourcePath.length > 0);
                    $assert($uselessPath.length > 0);
                }
            };
            (function () {
                var currentFile = $platform.Browser ? (new StackTracey()[2] || { file: '' }).file : __filename;
                $global.const('$uselessPath', _.initial(currentFile.split('/'), $platform.NodeJS ? 2 : 1).join('/') + '/');
                $global.const('$sourcePath', function () {
                    var local = ($uselessPath.match(/(.+)\/node_modules\/(.+)/) || [])[1];
                    return local ? local + '/' : $uselessPath;
                }());
            }());
            const asTable = __webpack_require__(1);
            StackTracey.prototype[Symbol.for('String.ify')] = function (stringify) {
                return asTable(this.map(entry => [
                    '\t' + 'at ' + entry.calleeShort.slice(0, 30),
                    entry.fileShort && entry.fileShort + ':' + entry.line || '',
                    ((entry.sourceLine || '').trim() || '').slice(0, 80)
                ]));
            };
            Error.prototype[Symbol.for('String.ify')] = function (stringify) {
                try {
                    var stack = StackTracey.fromErrorWithAsync(this).slice(this.stackOffset || 0).clean;
                    var why = stringify.limit((this.message || '').replace(/\r|\n/g, '').trim(), 120);
                    return '[EXCEPTION] ' + why + (this.notMatching && [].concat(this.notMatching).map(x => '\t' + stringify(x)).join('\n') + '\n\n' || '') + '\n\n' + stringify(stack) + '\n';
                } catch (sub) {
                    return 'YO DAWG I HEARD YOU LIKE EXCEPTIONS... SO WE THREW EXCEPTION WHILE PRINTING YOUR EXCEPTION:\n\n' + sub.stack + '\n\nORIGINAL EXCEPTION:\n\n' + this.stack + '\n\n';
                }
            };
            _.tests.prototypeMeta = {
                'Prototype.$meta': function () {
                    const DummyProto = $prototype();
                    const DummyTrait = $trait();
                    $assertMatches(DummyProto.$meta, {
                        name: 'DummyProto',
                        type: 'prototype'
                    });
                    $assertMatches(DummyTrait.$meta, {
                        name: 'DummyTrait',
                        type: 'trait'
                    });
                },
                'String.ify': function () {
                    const Dummy = $prototype({});
                    $assert(String.ify(Dummy), 'Dummy ()');
                }
            };
            (() => {
                const findMeta = stack => _.find2(stack.withSources.reverse(), location => {
                    let match = location.sourceLine.match(/([A-z]+)\s*=\s*\$(prototype|singleton|component|extends|trait)/);
                    return match && {
                        name: match[1] === 'exports' ? location.fileName : match[1],
                        type: match[2],
                        file: location.fileShort
                    } || false;
                });
                $prototype.macro(function (def, base) {
                    if (typeof Symbol !== 'undefined') {
                        def.constructor[Symbol.for('String.ify')] = function () {
                            return (this.$meta && this.$meta.name || '<prototype>') + ' ()';
                        };
                    }
                    if (!def.$meta) {
                        const stack = new StackTracey();
                        def.$meta = $static($property(_.memoize(() => findMeta(stack))));
                    }
                    return def;
                });
            })();
        }.call(exports, '/index.js'));
    },
    function (module, exports) {
        'use strict';
        'use strict';
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
                    const fn = _.hasTags ? $untag(fn_) : fn_, async = _.hasTags ? $async.is(fn_) : fn_.async, once = _.hasTags ? $once.is(fn_) : fn_.once;
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
                    var callbacks = _.times(fn.length, i => function callee() {
                        callee.callIndex = callIndex++;
                    });
                    fn.apply(null, callbacks);
                    return _.assert(_.pluck(callbacks, 'callIndex'), _.times(callbacks.length, _.identity.arity1));
                },
                assertMatches: function (value, ...args) {
                    const pattern = args[0];
                    try {
                        return _.assert(_.matches.apply(null, args)(value));
                    } catch (e) {
                        throw _.isAssertionError(e) ? _.extend(e, {
                            notMatching: [
                                value,
                                pattern
                            ]
                        }) : e;
                    }
                },
                assertNotMatches: function (value, ...args) {
                    const pattern = args[0];
                    try {
                        return _.assert(!_.matches.apply(null, args)(value));
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
                    const mismatches = _.typeMismatches(contract, value);
                    return _.isEmpty(mismatches) ? true : _.assertionFailed({
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
                    throw _.extend(_.assertionError(additionalInfo), { stack: new Error().stack.split('\n').slice(3).join('\n') });
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
                var define = _[name].length === 0 ? $global.property : $global.const;
                define('$' + name, _[name], { configurable: true });
            });
        }());
    },
    function (module, exports, __webpack_require__) {
        'use strict';
        'use strict';
        (function () {
            _.hasUncaught = true;
            var reThrownTag = ' [re-thrown by a hook]';
            var globalUncaughtExceptionHandler = _.globalUncaughtExceptionHandler = function (e) {
                var chain = globalUncaughtExceptionHandler.chain;
                globalUncaughtExceptionHandler.chain = _.reject(chain, _.property('catchesOnce'));
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
                    console.log(e);
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
                __webpack_require__(10).on('uncaughtException', globalUncaughtExceptionHandler);
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
        'use strict';
        'use strict';
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
                    return function () {
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
                        fn.__uncaughtJS_wrapper = args[callbackArgumentIndex] = function () {
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
        'use strict';
        'use strict';
        (function ($) {
            $global.LogOverlay = $singleton(Component, {
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
        }(__webpack_require__(3)));
    },
    function (module, exports, __webpack_require__) {
        'use strict';
        'use strict';
        (function ($) {
            $global.Panic = (what, cfg) => {
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
            Panic.init = () => {
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
                layout() {
                    var maxContentWidth = _.coerceToUndefined(_.max(_.map(this.modal.find('pre'), _.property('scrollWidth'))));
                    this.modal.css({
                        'max-height': $(window).height() - 100,
                        'width': maxContentWidth && maxContentWidth + 120
                    });
                    this.modalBody.scroll();
                },
                toggleVisibility(yes) {
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
                onRetry(retry) {
                    this.retryTriggered(retry);
                    this.btnRetry.css('display', '');
                },
                onClose(close) {
                    this.closeTriggered(close);
                    this.btnClose.css('display', '');
                },
                retry() {
                    this._clean();
                    this.closeTriggered.off();
                    this.toggleVisibility(false);
                    this.retryTriggered();
                },
                close() {
                    this._clean();
                    this.retryTriggered.off();
                    this.toggleVisibility(false);
                    this.closeTriggered();
                },
                _clean() {
                    this.modalBody.find('.panic-alert-error').remove();
                    this.modalBody.scroll();
                    this.btnRetry.css('display', 'none');
                    this.btnClose.css('display', 'none');
                },
                append(what, raw) {
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
                hash(what) {
                    return ((_.isTypeOf(Error, what) ? what && what.stack : _.isTypeOf(Test, what) ? what.suite + what.name : String.ify(what)) || '').hash;
                },
                print(what, raw) {
                    return _.isTypeOf(Error, what) ? this.printError(what) : _.isTypeOf(Test, what) ? this.printFailedTest(what) : this.printUnknownStuff(what, raw);
                },
                printUnknownStuff(what, raw) {
                    return raw ? what : $('<span>').text(log.impl.stringify(what));
                },
                printLocation(where) {
                    return $('<span class="location">').append([
                        $('<span class="callee">').text(where.calleeShort),
                        $('<span class="file">').text(where.fileName),
                        $('<span class="line">').text(where.line)
                    ]);
                },
                printFailedTest(test) {
                    var logEl = $('<pre class="test-log" style="margin-top: 13px;">');
                    log.withWriteBackend(params => {
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
                    }, done => {
                        test.evalLogCalls();
                        done();
                    });
                    return [
                        $('<div class="panic-alert-error-message" style="font-weight: bold;">').text(test.name).append('<span style="float:right; opacity: 0.25;">test failed</span>'),
                        logEl
                    ];
                },
                printError(e) {
                    var stackEntries = StackTracey.fromErrorWithAsync(e).withSources;
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
                                $('<span class="src">').text((entry.sourceLine || '').trim()).click(this.$(function (e) {
                                    var el = $(e.delegateTarget);
                                    if (dom.is('.full')) {
                                        dom.removeClass('full');
                                        dom.transitionend(function () {
                                            if (!dom.is('.full')) {
                                                el.text((entry.sourceLine || '').trim());
                                            }
                                        });
                                    } else {
                                        const lines = (entry.sourceFile || { lines: [] }).lines;
                                        dom.addClass('full');
                                        el.html(lines.map(line => $('<div class="line">').text(line)));
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
                                }))
                            ]);
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
        }(__webpack_require__(3)));
    },
    function (module, exports, __webpack_require__) {
        'use strict';
        'use strict';
        ;
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
                    return _.fromPairs(_.map(arguments, function (name) {
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
        }(__webpack_require__(3)));
    },
    function (module, exports, __webpack_require__) {
        'use strict';
        (function (global) {
            'use strict';
            const O = __webpack_require__(2), bullet = __webpack_require__(4), isBrowser = typeof window !== 'undefined' && window.window === window && window.navigator, maxOf = (arr, pick) => arr.reduce((max, s) => Math.max(max, pick ? pick(s) : s), 0), isInteger = Number.isInteger || (value => typeof value === 'number' && isFinite(value) && Math.floor(value) === value);
            const configure = cfg => {
                const stringify = O.assign(x => {
                    const state = O.assign({
                        parents: new Set(),
                        siblings: new Map()
                    }, cfg);
                    if (cfg.pretty === 'auto') {
                        const oneLine = stringify.configure({
                            pretty: false,
                            siblings: new Map()
                        })(x);
                        return oneLine.length <= 80 ? oneLine : stringify.configure({
                            pretty: true,
                            siblings: new Map()
                        })(x);
                    }
                    var customFormat = cfg.formatter && cfg.formatter(x, stringify);
                    if (typeof customFormat === 'string') {
                        return customFormat;
                    }
                    if (typeof jQuery !== 'undefined' && x instanceof jQuery) {
                        x = x.toArray();
                    }
                    if (isBrowser && x === window) {
                        return 'window';
                    } else if (!isBrowser && typeof global !== 'undefined' && x === global) {
                        return 'global';
                    } else if (x === null) {
                        return 'null';
                    } else if (state.parents.has(x)) {
                        return state.pure ? undefined : '<cyclic>';
                    } else if (state.siblings.has(x)) {
                        return state.pure ? undefined : '<ref:' + state.siblings.get(x) + '>';
                    } else if (x && typeof Symbol !== 'undefined' && (customFormat = x[Symbol.for('String.ify')]) && typeof (customFormat = customFormat.call(x, stringify.configure(state))) === 'string') {
                        return customFormat;
                    } else if (x instanceof Function) {
                        return cfg.pure ? x.toString() : x.name ? '<function:' + x.name + '>' : '<function>';
                    } else if (typeof x === 'string') {
                        return '"' + stringify.limit(x, cfg.pure ? Number.MAX_SAFE_INTEGER : cfg.maxStringLength) + '"';
                    } else if (typeof x === 'object') {
                        state.parents.add(x);
                        state.siblings.set(x, state.siblings.size);
                        const result = stringify.configure(O.assign({}, state, { depth: state.depth + 1 })).object(x);
                        state.parents.delete(x);
                        return result;
                    } else if (!isInteger(x) && cfg.precision > 0) {
                        return x.toFixed(cfg.precision);
                    } else {
                        return String(x);
                    }
                }, cfg, {
                    configure: newConfig => configure(O.assign({}, cfg, newConfig)),
                    limit: (s, n) => s && (s.length <= n ? s : s.substr(0, n - 1) + '\u2026'),
                    rightAlign: strings => {
                        var max = maxOf(strings, s => s.length);
                        return strings.map(s => ' '.repeat(max - s.length) + s);
                    },
                    object: x => {
                        if (x instanceof Set) {
                            x = Array.from(x.values());
                        } else if (x instanceof Map) {
                            x = Array.from(x.entries());
                        }
                        const isArray = Array.isArray(x);
                        if (isBrowser) {
                            if (x instanceof Element) {
                                return '<' + (x.tagName.toLowerCase() + (x.id && '#' + x.id || '') + (x.className && '.' + x.className || '')) + '>';
                            } else if (x instanceof Text) {
                                return '@' + stringify.limit(x.wholeText, 20);
                            }
                        }
                        if (!cfg.pure && (cfg.depth > cfg.maxDepth || isArray && x.length > cfg.maxArrayLength)) {
                            return isArray ? '<array[' + x.length + ']>' : '<object>';
                        }
                        const pretty = cfg.pretty ? true : false, entries = O.entries(x), oneLine = !pretty || entries.length < 2, quoteKey = cfg.json ? k => '"' + k + '"' : k => k;
                        if (pretty) {
                            const values = O.values(x), printedKeys = stringify.rightAlign(O.keys(x).map(k => quoteKey(k) + ': ')), printedValues = values.map(stringify), leftPaddings = printedValues.map((x, i) => x[0] === '[' || x[0] === '{' ? 3 : typeof values[i] === 'string' ? 1 : 0), maxLeftPadding = maxOf(leftPaddings), items = leftPaddings.map((padding, i) => {
                                    const value = ' '.repeat(maxLeftPadding - padding) + printedValues[i];
                                    return isArray ? value : bullet(printedKeys[i], value);
                                }), printed = bullet(isArray ? '[ ' : '{ ', items.join(',\n')), lines = printed.split('\n'), lastLine = lines[lines.length - 1];
                            return printed + (' '.repeat(maxOf(lines, l => l.length) - lastLine.length) + (isArray ? ' ]' : ' }'));
                        } else {
                            const items = entries.map(kv => (isArray ? '' : quoteKey(kv[0]) + ': ') + stringify(kv[1])), content = items.join(', ');
                            return isArray ? '[' + content + ']' : '{ ' + content + ' }';
                        }
                    }
                });
                return stringify;
            };
            module.exports = configure({
                depth: 0,
                pure: false,
                json: false,
                color: false,
                maxDepth: 5,
                maxArrayLength: 60,
                maxStringLength: 60,
                precision: undefined,
                formatter: undefined,
                pretty: 'auto'
            });
        }.call(exports, __webpack_require__(12)));
    },
    function (module, exports) {
        if (typeof Reflect === 'object' && typeof Reflect.ownKeys === 'function') {
            module.exports = Reflect.ownKeys;
        } else if (typeof Object.getOwnPropertySymbols === 'function') {
            module.exports = function Reflect_ownKeys(o) {
                return Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o));
            };
        } else {
            module.exports = Object.getOwnPropertyNames;
        }
    },
    function (module, exports, __webpack_require__) {
        (function (global) {
            var FUNC_ERROR_TEXT = 'Expected a function';
            var HASH_UNDEFINED = '__lodash_hash_undefined__';
            var funcTag = '[object Function]', genTag = '[object GeneratorFunction]';
            var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
            var reIsHostCtor = /^\[object .+?Constructor\]$/;
            var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
            var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
            var root = freeGlobal || freeSelf || Function('return this')();
            function getValue(object, key) {
                return object == null ? undefined : object[key];
            }
            function isHostObject(value) {
                var result = false;
                if (value != null && typeof value.toString != 'function') {
                    try {
                        result = !!(value + '');
                    } catch (e) {
                    }
                }
                return result;
            }
            var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
            var coreJsData = root['__core-js_shared__'];
            var maskSrcKey = function () {
                var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
                return uid ? 'Symbol(src)_1.' + uid : '';
            }();
            var funcToString = funcProto.toString;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var objectToString = objectProto.toString;
            var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
            var splice = arrayProto.splice;
            var Map = getNative(root, 'Map'), nativeCreate = getNative(Object, 'create');
            function Hash(entries) {
                var index = -1, length = entries ? entries.length : 0;
                this.clear();
                while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1]);
                }
            }
            function hashClear() {
                this.__data__ = nativeCreate ? nativeCreate(null) : {};
            }
            function hashDelete(key) {
                return this.has(key) && delete this.__data__[key];
            }
            function hashGet(key) {
                var data = this.__data__;
                if (nativeCreate) {
                    var result = data[key];
                    return result === HASH_UNDEFINED ? undefined : result;
                }
                return hasOwnProperty.call(data, key) ? data[key] : undefined;
            }
            function hashHas(key) {
                var data = this.__data__;
                return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
            }
            function hashSet(key, value) {
                var data = this.__data__;
                data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
                return this;
            }
            Hash.prototype.clear = hashClear;
            Hash.prototype['delete'] = hashDelete;
            Hash.prototype.get = hashGet;
            Hash.prototype.has = hashHas;
            Hash.prototype.set = hashSet;
            function ListCache(entries) {
                var index = -1, length = entries ? entries.length : 0;
                this.clear();
                while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1]);
                }
            }
            function listCacheClear() {
                this.__data__ = [];
            }
            function listCacheDelete(key) {
                var data = this.__data__, index = assocIndexOf(data, key);
                if (index < 0) {
                    return false;
                }
                var lastIndex = data.length - 1;
                if (index == lastIndex) {
                    data.pop();
                } else {
                    splice.call(data, index, 1);
                }
                return true;
            }
            function listCacheGet(key) {
                var data = this.__data__, index = assocIndexOf(data, key);
                return index < 0 ? undefined : data[index][1];
            }
            function listCacheHas(key) {
                return assocIndexOf(this.__data__, key) > -1;
            }
            function listCacheSet(key, value) {
                var data = this.__data__, index = assocIndexOf(data, key);
                if (index < 0) {
                    data.push([
                        key,
                        value
                    ]);
                } else {
                    data[index][1] = value;
                }
                return this;
            }
            ListCache.prototype.clear = listCacheClear;
            ListCache.prototype['delete'] = listCacheDelete;
            ListCache.prototype.get = listCacheGet;
            ListCache.prototype.has = listCacheHas;
            ListCache.prototype.set = listCacheSet;
            function MapCache(entries) {
                var index = -1, length = entries ? entries.length : 0;
                this.clear();
                while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1]);
                }
            }
            function mapCacheClear() {
                this.__data__ = {
                    'hash': new Hash(),
                    'map': new (Map || ListCache)(),
                    'string': new Hash()
                };
            }
            function mapCacheDelete(key) {
                return getMapData(this, key)['delete'](key);
            }
            function mapCacheGet(key) {
                return getMapData(this, key).get(key);
            }
            function mapCacheHas(key) {
                return getMapData(this, key).has(key);
            }
            function mapCacheSet(key, value) {
                getMapData(this, key).set(key, value);
                return this;
            }
            MapCache.prototype.clear = mapCacheClear;
            MapCache.prototype['delete'] = mapCacheDelete;
            MapCache.prototype.get = mapCacheGet;
            MapCache.prototype.has = mapCacheHas;
            MapCache.prototype.set = mapCacheSet;
            function assocIndexOf(array, key) {
                var length = array.length;
                while (length--) {
                    if (eq(array[length][0], key)) {
                        return length;
                    }
                }
                return -1;
            }
            function baseIsNative(value) {
                if (!isObject(value) || isMasked(value)) {
                    return false;
                }
                var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
                return pattern.test(toSource(value));
            }
            function getMapData(map, key) {
                var data = map.__data__;
                return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
            }
            function getNative(object, key) {
                var value = getValue(object, key);
                return baseIsNative(value) ? value : undefined;
            }
            function isKeyable(value) {
                var type = typeof value;
                return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
            }
            function isMasked(func) {
                return !!maskSrcKey && maskSrcKey in func;
            }
            function toSource(func) {
                if (func != null) {
                    try {
                        return funcToString.call(func);
                    } catch (e) {
                    }
                    try {
                        return func + '';
                    } catch (e) {
                    }
                }
                return '';
            }
            function memoize(func, resolver) {
                if (typeof func != 'function' || resolver && typeof resolver != 'function') {
                    throw new TypeError(FUNC_ERROR_TEXT);
                }
                var memoized = function () {
                    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
                    if (cache.has(key)) {
                        return cache.get(key);
                    }
                    var result = func.apply(this, args);
                    memoized.cache = cache.set(key, result);
                    return result;
                };
                memoized.cache = new (memoize.Cache || MapCache)();
                return memoized;
            }
            memoize.Cache = MapCache;
            function eq(value, other) {
                return value === other || value !== value && other !== other;
            }
            function isFunction(value) {
                var tag = isObject(value) ? objectToString.call(value) : '';
                return tag == funcTag || tag == genTag;
            }
            function isObject(value) {
                var type = typeof value;
                return !!value && (type == 'object' || type == 'function');
            }
            module.exports = memoize;
        }.call(exports, __webpack_require__(12)));
    },
    function (module, exports) {
        var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
        exports.encode = function (number) {
            if (0 <= number && number < intToCharMap.length) {
                return intToCharMap[number];
            }
            throw new TypeError('Must be between 0 and 63: ' + number);
        };
        exports.decode = function (charCode) {
            var bigA = 65;
            var bigZ = 90;
            var littleA = 97;
            var littleZ = 122;
            var zero = 48;
            var nine = 57;
            var plus = 43;
            var slash = 47;
            var littleOffset = 26;
            var numberOffset = 52;
            if (bigA <= charCode && charCode <= bigZ) {
                return charCode - bigA;
            }
            if (littleA <= charCode && charCode <= littleZ) {
                return charCode - littleA + littleOffset;
            }
            if (zero <= charCode && charCode <= nine) {
                return charCode - zero + numberOffset;
            }
            if (charCode == plus) {
                return 62;
            }
            if (charCode == slash) {
                return 63;
            }
            return -1;
        };
    },
    function (module, exports) {
        exports.GREATEST_LOWER_BOUND = 1;
        exports.LEAST_UPPER_BOUND = 2;
        function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
            var mid = Math.floor((aHigh - aLow) / 2) + aLow;
            var cmp = aCompare(aNeedle, aHaystack[mid], true);
            if (cmp === 0) {
                return mid;
            } else if (cmp > 0) {
                if (aHigh - mid > 1) {
                    return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
                }
                if (aBias == exports.LEAST_UPPER_BOUND) {
                    return aHigh < aHaystack.length ? aHigh : -1;
                } else {
                    return mid;
                }
            } else {
                if (mid - aLow > 1) {
                    return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
                }
                if (aBias == exports.LEAST_UPPER_BOUND) {
                    return mid;
                } else {
                    return aLow < 0 ? -1 : aLow;
                }
            }
        }
        exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
            if (aHaystack.length === 0) {
                return -1;
            }
            var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
            if (index < 0) {
                return -1;
            }
            while (index - 1 >= 0) {
                if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
                    break;
                }
                --index;
            }
            return index;
        };
    },
    function (module, exports, __webpack_require__) {
        var util = __webpack_require__(0);
        function generatedPositionAfter(mappingA, mappingB) {
            var lineA = mappingA.generatedLine;
            var lineB = mappingB.generatedLine;
            var columnA = mappingA.generatedColumn;
            var columnB = mappingB.generatedColumn;
            return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
        }
        function MappingList() {
            this._array = [];
            this._sorted = true;
            this._last = {
                generatedLine: -1,
                generatedColumn: 0
            };
        }
        MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
            this._array.forEach(aCallback, aThisArg);
        };
        MappingList.prototype.add = function MappingList_add(aMapping) {
            if (generatedPositionAfter(this._last, aMapping)) {
                this._last = aMapping;
                this._array.push(aMapping);
            } else {
                this._sorted = false;
                this._array.push(aMapping);
            }
        };
        MappingList.prototype.toArray = function MappingList_toArray() {
            if (!this._sorted) {
                this._array.sort(util.compareByGeneratedPositionsInflated);
                this._sorted = true;
            }
            return this._array;
        };
        exports.MappingList = MappingList;
    },
    function (module, exports) {
        function swap(ary, x, y) {
            var temp = ary[x];
            ary[x] = ary[y];
            ary[y] = temp;
        }
        function randomIntInRange(low, high) {
            return Math.round(low + Math.random() * (high - low));
        }
        function doQuickSort(ary, comparator, p, r) {
            if (p < r) {
                var pivotIndex = randomIntInRange(p, r);
                var i = p - 1;
                swap(ary, pivotIndex, r);
                var pivot = ary[r];
                for (var j = p; j < r; j++) {
                    if (comparator(ary[j], pivot) <= 0) {
                        i += 1;
                        swap(ary, i, j);
                    }
                }
                swap(ary, i + 1, j);
                var q = i + 1;
                doQuickSort(ary, comparator, p, q - 1);
                doQuickSort(ary, comparator, q + 1, r);
            }
        }
        exports.quickSort = function (ary, comparator) {
            doQuickSort(ary, comparator, 0, ary.length - 1);
        };
    },
    function (module, exports, __webpack_require__) {
        var util = __webpack_require__(0);
        var binarySearch = __webpack_require__(29);
        var ArraySet = __webpack_require__(6).ArraySet;
        var base64VLQ = __webpack_require__(7);
        var quickSort = __webpack_require__(31).quickSort;
        function SourceMapConsumer(aSourceMap) {
            var sourceMap = aSourceMap;
            if (typeof aSourceMap === 'string') {
                sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
            }
            return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
        }
        SourceMapConsumer.fromSourceMap = function (aSourceMap) {
            return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
        };
        SourceMapConsumer.prototype._version = 3;
        SourceMapConsumer.prototype.__generatedMappings = null;
        Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
            get: function () {
                if (!this.__generatedMappings) {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }
                return this.__generatedMappings;
            }
        });
        SourceMapConsumer.prototype.__originalMappings = null;
        Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
            get: function () {
                if (!this.__originalMappings) {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }
                return this.__originalMappings;
            }
        });
        SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
            var c = aStr.charAt(index);
            return c === ';' || c === ',';
        };
        SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
            throw new Error('Subclasses must implement _parseMappings');
        };
        SourceMapConsumer.GENERATED_ORDER = 1;
        SourceMapConsumer.ORIGINAL_ORDER = 2;
        SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
        SourceMapConsumer.LEAST_UPPER_BOUND = 2;
        SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
            var context = aContext || null;
            var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
            var mappings;
            switch (order) {
            case SourceMapConsumer.GENERATED_ORDER:
                mappings = this._generatedMappings;
                break;
            case SourceMapConsumer.ORIGINAL_ORDER:
                mappings = this._originalMappings;
                break;
            default:
                throw new Error('Unknown order of iteration.');
            }
            var sourceRoot = this.sourceRoot;
            mappings.map(function (mapping) {
                var source = mapping.source === null ? null : this._sources.at(mapping.source);
                if (source != null && sourceRoot != null) {
                    source = util.join(sourceRoot, source);
                }
                return {
                    source: source,
                    generatedLine: mapping.generatedLine,
                    generatedColumn: mapping.generatedColumn,
                    originalLine: mapping.originalLine,
                    originalColumn: mapping.originalColumn,
                    name: mapping.name === null ? null : this._names.at(mapping.name)
                };
            }, this).forEach(aCallback, context);
        };
        SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
            var line = util.getArg(aArgs, 'line');
            var needle = {
                source: util.getArg(aArgs, 'source'),
                originalLine: line,
                originalColumn: util.getArg(aArgs, 'column', 0)
            };
            if (this.sourceRoot != null) {
                needle.source = util.relative(this.sourceRoot, needle.source);
            }
            if (!this._sources.has(needle.source)) {
                return [];
            }
            needle.source = this._sources.indexOf(needle.source);
            var mappings = [];
            var index = this._findMapping(needle, this._originalMappings, 'originalLine', 'originalColumn', util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
            if (index >= 0) {
                var mapping = this._originalMappings[index];
                if (aArgs.column === undefined) {
                    var originalLine = mapping.originalLine;
                    while (mapping && mapping.originalLine === originalLine) {
                        mappings.push({
                            line: util.getArg(mapping, 'generatedLine', null),
                            column: util.getArg(mapping, 'generatedColumn', null),
                            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
                        });
                        mapping = this._originalMappings[++index];
                    }
                } else {
                    var originalColumn = mapping.originalColumn;
                    while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
                        mappings.push({
                            line: util.getArg(mapping, 'generatedLine', null),
                            column: util.getArg(mapping, 'generatedColumn', null),
                            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
                        });
                        mapping = this._originalMappings[++index];
                    }
                }
            }
            return mappings;
        };
        exports.SourceMapConsumer = SourceMapConsumer;
        function BasicSourceMapConsumer(aSourceMap) {
            var sourceMap = aSourceMap;
            if (typeof aSourceMap === 'string') {
                sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
            }
            var version = util.getArg(sourceMap, 'version');
            var sources = util.getArg(sourceMap, 'sources');
            var names = util.getArg(sourceMap, 'names', []);
            var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
            var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
            var mappings = util.getArg(sourceMap, 'mappings');
            var file = util.getArg(sourceMap, 'file', null);
            if (version != this._version) {
                throw new Error('Unsupported version: ' + version);
            }
            sources = sources.map(String).map(util.normalize).map(function (source) {
                return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
            });
            this._names = ArraySet.fromArray(names.map(String), true);
            this._sources = ArraySet.fromArray(sources, true);
            this.sourceRoot = sourceRoot;
            this.sourcesContent = sourcesContent;
            this._mappings = mappings;
            this.file = file;
        }
        BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
        BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
        BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
            var smc = Object.create(BasicSourceMapConsumer.prototype);
            var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
            var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
            smc.sourceRoot = aSourceMap._sourceRoot;
            smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
            smc.file = aSourceMap._file;
            var generatedMappings = aSourceMap._mappings.toArray().slice();
            var destGeneratedMappings = smc.__generatedMappings = [];
            var destOriginalMappings = smc.__originalMappings = [];
            for (var i = 0, length = generatedMappings.length; i < length; i++) {
                var srcMapping = generatedMappings[i];
                var destMapping = new Mapping();
                destMapping.generatedLine = srcMapping.generatedLine;
                destMapping.generatedColumn = srcMapping.generatedColumn;
                if (srcMapping.source) {
                    destMapping.source = sources.indexOf(srcMapping.source);
                    destMapping.originalLine = srcMapping.originalLine;
                    destMapping.originalColumn = srcMapping.originalColumn;
                    if (srcMapping.name) {
                        destMapping.name = names.indexOf(srcMapping.name);
                    }
                    destOriginalMappings.push(destMapping);
                }
                destGeneratedMappings.push(destMapping);
            }
            quickSort(smc.__originalMappings, util.compareByOriginalPositions);
            return smc;
        };
        BasicSourceMapConsumer.prototype._version = 3;
        Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
            get: function () {
                return this._sources.toArray().map(function (s) {
                    return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
                }, this);
            }
        });
        function Mapping() {
            this.generatedLine = 0;
            this.generatedColumn = 0;
            this.source = null;
            this.originalLine = null;
            this.originalColumn = null;
            this.name = null;
        }
        BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
            var generatedLine = 1;
            var previousGeneratedColumn = 0;
            var previousOriginalLine = 0;
            var previousOriginalColumn = 0;
            var previousSource = 0;
            var previousName = 0;
            var length = aStr.length;
            var index = 0;
            var cachedSegments = {};
            var temp = {};
            var originalMappings = [];
            var generatedMappings = [];
            var mapping, str, segment, end, value;
            while (index < length) {
                if (aStr.charAt(index) === ';') {
                    generatedLine++;
                    index++;
                    previousGeneratedColumn = 0;
                } else if (aStr.charAt(index) === ',') {
                    index++;
                } else {
                    mapping = new Mapping();
                    mapping.generatedLine = generatedLine;
                    for (end = index; end < length; end++) {
                        if (this._charIsMappingSeparator(aStr, end)) {
                            break;
                        }
                    }
                    str = aStr.slice(index, end);
                    segment = cachedSegments[str];
                    if (segment) {
                        index += str.length;
                    } else {
                        segment = [];
                        while (index < end) {
                            base64VLQ.decode(aStr, index, temp);
                            value = temp.value;
                            index = temp.rest;
                            segment.push(value);
                        }
                        if (segment.length === 2) {
                            throw new Error('Found a source, but no line and column');
                        }
                        if (segment.length === 3) {
                            throw new Error('Found a source and line, but no column');
                        }
                        cachedSegments[str] = segment;
                    }
                    mapping.generatedColumn = previousGeneratedColumn + segment[0];
                    previousGeneratedColumn = mapping.generatedColumn;
                    if (segment.length > 1) {
                        mapping.source = previousSource + segment[1];
                        previousSource += segment[1];
                        mapping.originalLine = previousOriginalLine + segment[2];
                        previousOriginalLine = mapping.originalLine;
                        mapping.originalLine += 1;
                        mapping.originalColumn = previousOriginalColumn + segment[3];
                        previousOriginalColumn = mapping.originalColumn;
                        if (segment.length > 4) {
                            mapping.name = previousName + segment[4];
                            previousName += segment[4];
                        }
                    }
                    generatedMappings.push(mapping);
                    if (typeof mapping.originalLine === 'number') {
                        originalMappings.push(mapping);
                    }
                }
            }
            quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
            this.__generatedMappings = generatedMappings;
            quickSort(originalMappings, util.compareByOriginalPositions);
            this.__originalMappings = originalMappings;
        };
        BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
            if (aNeedle[aLineName] <= 0) {
                throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
            }
            if (aNeedle[aColumnName] < 0) {
                throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
            }
            return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
        };
        BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
            for (var index = 0; index < this._generatedMappings.length; ++index) {
                var mapping = this._generatedMappings[index];
                if (index + 1 < this._generatedMappings.length) {
                    var nextMapping = this._generatedMappings[index + 1];
                    if (mapping.generatedLine === nextMapping.generatedLine) {
                        mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
                        continue;
                    }
                }
                mapping.lastGeneratedColumn = Infinity;
            }
        };
        BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
            var needle = {
                generatedLine: util.getArg(aArgs, 'line'),
                generatedColumn: util.getArg(aArgs, 'column')
            };
            var index = this._findMapping(needle, this._generatedMappings, 'generatedLine', 'generatedColumn', util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
            if (index >= 0) {
                var mapping = this._generatedMappings[index];
                if (mapping.generatedLine === needle.generatedLine) {
                    var source = util.getArg(mapping, 'source', null);
                    if (source !== null) {
                        source = this._sources.at(source);
                        if (this.sourceRoot != null) {
                            source = util.join(this.sourceRoot, source);
                        }
                    }
                    var name = util.getArg(mapping, 'name', null);
                    if (name !== null) {
                        name = this._names.at(name);
                    }
                    return {
                        source: source,
                        line: util.getArg(mapping, 'originalLine', null),
                        column: util.getArg(mapping, 'originalColumn', null),
                        name: name
                    };
                }
            }
            return {
                source: null,
                line: null,
                column: null,
                name: null
            };
        };
        BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
            if (!this.sourcesContent) {
                return false;
            }
            return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function (sc) {
                return sc == null;
            });
        };
        BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
            if (!this.sourcesContent) {
                return null;
            }
            if (this.sourceRoot != null) {
                aSource = util.relative(this.sourceRoot, aSource);
            }
            if (this._sources.has(aSource)) {
                return this.sourcesContent[this._sources.indexOf(aSource)];
            }
            var url;
            if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
                var fileUriAbsPath = aSource.replace(/^file:\/\//, '');
                if (url.scheme == 'file' && this._sources.has(fileUriAbsPath)) {
                    return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
                }
                if ((!url.path || url.path == '/') && this._sources.has('/' + aSource)) {
                    return this.sourcesContent[this._sources.indexOf('/' + aSource)];
                }
            }
            if (nullOnMissing) {
                return null;
            } else {
                throw new Error('"' + aSource + '" is not in the SourceMap.');
            }
        };
        BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
            var source = util.getArg(aArgs, 'source');
            if (this.sourceRoot != null) {
                source = util.relative(this.sourceRoot, source);
            }
            if (!this._sources.has(source)) {
                return {
                    line: null,
                    column: null,
                    lastColumn: null
                };
            }
            source = this._sources.indexOf(source);
            var needle = {
                source: source,
                originalLine: util.getArg(aArgs, 'line'),
                originalColumn: util.getArg(aArgs, 'column')
            };
            var index = this._findMapping(needle, this._originalMappings, 'originalLine', 'originalColumn', util.compareByOriginalPositions, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
            if (index >= 0) {
                var mapping = this._originalMappings[index];
                if (mapping.source === needle.source) {
                    return {
                        line: util.getArg(mapping, 'generatedLine', null),
                        column: util.getArg(mapping, 'generatedColumn', null),
                        lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
                    };
                }
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            };
        };
        exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
        function IndexedSourceMapConsumer(aSourceMap) {
            var sourceMap = aSourceMap;
            if (typeof aSourceMap === 'string') {
                sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
            }
            var version = util.getArg(sourceMap, 'version');
            var sections = util.getArg(sourceMap, 'sections');
            if (version != this._version) {
                throw new Error('Unsupported version: ' + version);
            }
            this._sources = new ArraySet();
            this._names = new ArraySet();
            var lastOffset = {
                line: -1,
                column: 0
            };
            this._sections = sections.map(function (s) {
                if (s.url) {
                    throw new Error('Support for url field in sections not implemented.');
                }
                var offset = util.getArg(s, 'offset');
                var offsetLine = util.getArg(offset, 'line');
                var offsetColumn = util.getArg(offset, 'column');
                if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
                    throw new Error('Section offsets must be ordered and non-overlapping.');
                }
                lastOffset = offset;
                return {
                    generatedOffset: {
                        generatedLine: offsetLine + 1,
                        generatedColumn: offsetColumn + 1
                    },
                    consumer: new SourceMapConsumer(util.getArg(s, 'map'))
                };
            });
        }
        IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
        IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
        IndexedSourceMapConsumer.prototype._version = 3;
        Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
            get: function () {
                var sources = [];
                for (var i = 0; i < this._sections.length; i++) {
                    for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
                        sources.push(this._sections[i].consumer.sources[j]);
                    }
                }
                return sources;
            }
        });
        IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
            var needle = {
                generatedLine: util.getArg(aArgs, 'line'),
                generatedColumn: util.getArg(aArgs, 'column')
            };
            var sectionIndex = binarySearch.search(needle, this._sections, function (needle, section) {
                var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
                if (cmp) {
                    return cmp;
                }
                return needle.generatedColumn - section.generatedOffset.generatedColumn;
            });
            var section = this._sections[sectionIndex];
            if (!section) {
                return {
                    source: null,
                    line: null,
                    column: null,
                    name: null
                };
            }
            return section.consumer.originalPositionFor({
                line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
                column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
                bias: aArgs.bias
            });
        };
        IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
            return this._sections.every(function (s) {
                return s.consumer.hasContentsOfAllSources();
            });
        };
        IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
            for (var i = 0; i < this._sections.length; i++) {
                var section = this._sections[i];
                var content = section.consumer.sourceContentFor(aSource, true);
                if (content) {
                    return content;
                }
            }
            if (nullOnMissing) {
                return null;
            } else {
                throw new Error('"' + aSource + '" is not in the SourceMap.');
            }
        };
        IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
            for (var i = 0; i < this._sections.length; i++) {
                var section = this._sections[i];
                if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
                    continue;
                }
                var generatedPosition = section.consumer.generatedPositionFor(aArgs);
                if (generatedPosition) {
                    var ret = {
                        line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
                        column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
                    };
                    return ret;
                }
            }
            return {
                line: null,
                column: null
            };
        };
        IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
            this.__generatedMappings = [];
            this.__originalMappings = [];
            for (var i = 0; i < this._sections.length; i++) {
                var section = this._sections[i];
                var sectionMappings = section.consumer._generatedMappings;
                for (var j = 0; j < sectionMappings.length; j++) {
                    var mapping = sectionMappings[j];
                    var source = section.consumer._sources.at(mapping.source);
                    if (section.consumer.sourceRoot !== null) {
                        source = util.join(section.consumer.sourceRoot, source);
                    }
                    this._sources.add(source);
                    source = this._sources.indexOf(source);
                    var name = section.consumer._names.at(mapping.name);
                    this._names.add(name);
                    name = this._names.indexOf(name);
                    var adjustedMapping = {
                        source: source,
                        generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
                        generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
                        originalLine: mapping.originalLine,
                        originalColumn: mapping.originalColumn,
                        name: name
                    };
                    this.__generatedMappings.push(adjustedMapping);
                    if (typeof adjustedMapping.originalLine === 'number') {
                        this.__originalMappings.push(adjustedMapping);
                    }
                }
            }
            quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
            quickSort(this.__originalMappings, util.compareByOriginalPositions);
        };
        exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
    },
    function (module, exports, __webpack_require__) {
        var SourceMapGenerator = __webpack_require__(8).SourceMapGenerator;
        var util = __webpack_require__(0);
        var REGEX_NEWLINE = /(\r?\n)/;
        var NEWLINE_CODE = 10;
        var isSourceNode = '$$$isSourceNode$$$';
        function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
            this.children = [];
            this.sourceContents = {};
            this.line = aLine == null ? null : aLine;
            this.column = aColumn == null ? null : aColumn;
            this.source = aSource == null ? null : aSource;
            this.name = aName == null ? null : aName;
            this[isSourceNode] = true;
            if (aChunks != null)
                this.add(aChunks);
        }
        SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
            var node = new SourceNode();
            var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
            var shiftNextLine = function () {
                var lineContents = remainingLines.shift();
                var newLine = remainingLines.shift() || '';
                return lineContents + newLine;
            };
            var lastGeneratedLine = 1, lastGeneratedColumn = 0;
            var lastMapping = null;
            aSourceMapConsumer.eachMapping(function (mapping) {
                if (lastMapping !== null) {
                    if (lastGeneratedLine < mapping.generatedLine) {
                        addMappingWithCode(lastMapping, shiftNextLine());
                        lastGeneratedLine++;
                        lastGeneratedColumn = 0;
                    } else {
                        var nextLine = remainingLines[0];
                        var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
                        remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
                        lastGeneratedColumn = mapping.generatedColumn;
                        addMappingWithCode(lastMapping, code);
                        lastMapping = mapping;
                        return;
                    }
                }
                while (lastGeneratedLine < mapping.generatedLine) {
                    node.add(shiftNextLine());
                    lastGeneratedLine++;
                }
                if (lastGeneratedColumn < mapping.generatedColumn) {
                    var nextLine = remainingLines[0];
                    node.add(nextLine.substr(0, mapping.generatedColumn));
                    remainingLines[0] = nextLine.substr(mapping.generatedColumn);
                    lastGeneratedColumn = mapping.generatedColumn;
                }
                lastMapping = mapping;
            }, this);
            if (remainingLines.length > 0) {
                if (lastMapping) {
                    addMappingWithCode(lastMapping, shiftNextLine());
                }
                node.add(remainingLines.join(''));
            }
            aSourceMapConsumer.sources.forEach(function (sourceFile) {
                var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                if (content != null) {
                    if (aRelativePath != null) {
                        sourceFile = util.join(aRelativePath, sourceFile);
                    }
                    node.setSourceContent(sourceFile, content);
                }
            });
            return node;
            function addMappingWithCode(mapping, code) {
                if (mapping === null || mapping.source === undefined) {
                    node.add(code);
                } else {
                    var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
                    node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
                }
            }
        };
        SourceNode.prototype.add = function SourceNode_add(aChunk) {
            if (Array.isArray(aChunk)) {
                aChunk.forEach(function (chunk) {
                    this.add(chunk);
                }, this);
            } else if (aChunk[isSourceNode] || typeof aChunk === 'string') {
                if (aChunk) {
                    this.children.push(aChunk);
                }
            } else {
                throw new TypeError('Expected a SourceNode, string, or an array of SourceNodes and strings. Got ' + aChunk);
            }
            return this;
        };
        SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
            if (Array.isArray(aChunk)) {
                for (var i = aChunk.length - 1; i >= 0; i--) {
                    this.prepend(aChunk[i]);
                }
            } else if (aChunk[isSourceNode] || typeof aChunk === 'string') {
                this.children.unshift(aChunk);
            } else {
                throw new TypeError('Expected a SourceNode, string, or an array of SourceNodes and strings. Got ' + aChunk);
            }
            return this;
        };
        SourceNode.prototype.walk = function SourceNode_walk(aFn) {
            var chunk;
            for (var i = 0, len = this.children.length; i < len; i++) {
                chunk = this.children[i];
                if (chunk[isSourceNode]) {
                    chunk.walk(aFn);
                } else {
                    if (chunk !== '') {
                        aFn(chunk, {
                            source: this.source,
                            line: this.line,
                            column: this.column,
                            name: this.name
                        });
                    }
                }
            }
        };
        SourceNode.prototype.join = function SourceNode_join(aSep) {
            var newChildren;
            var i;
            var len = this.children.length;
            if (len > 0) {
                newChildren = [];
                for (i = 0; i < len - 1; i++) {
                    newChildren.push(this.children[i]);
                    newChildren.push(aSep);
                }
                newChildren.push(this.children[i]);
                this.children = newChildren;
            }
            return this;
        };
        SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
            var lastChild = this.children[this.children.length - 1];
            if (lastChild[isSourceNode]) {
                lastChild.replaceRight(aPattern, aReplacement);
            } else if (typeof lastChild === 'string') {
                this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
            } else {
                this.children.push(''.replace(aPattern, aReplacement));
            }
            return this;
        };
        SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
            this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
        };
        SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
            for (var i = 0, len = this.children.length; i < len; i++) {
                if (this.children[i][isSourceNode]) {
                    this.children[i].walkSourceContents(aFn);
                }
            }
            var sources = Object.keys(this.sourceContents);
            for (var i = 0, len = sources.length; i < len; i++) {
                aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
            }
        };
        SourceNode.prototype.toString = function SourceNode_toString() {
            var str = '';
            this.walk(function (chunk) {
                str += chunk;
            });
            return str;
        };
        SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
            var generated = {
                code: '',
                line: 1,
                column: 0
            };
            var map = new SourceMapGenerator(aArgs);
            var sourceMappingActive = false;
            var lastOriginalSource = null;
            var lastOriginalLine = null;
            var lastOriginalColumn = null;
            var lastOriginalName = null;
            this.walk(function (chunk, original) {
                generated.code += chunk;
                if (original.source !== null && original.line !== null && original.column !== null) {
                    if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
                        map.addMapping({
                            source: original.source,
                            original: {
                                line: original.line,
                                column: original.column
                            },
                            generated: {
                                line: generated.line,
                                column: generated.column
                            },
                            name: original.name
                        });
                    }
                    lastOriginalSource = original.source;
                    lastOriginalLine = original.line;
                    lastOriginalColumn = original.column;
                    lastOriginalName = original.name;
                    sourceMappingActive = true;
                } else if (sourceMappingActive) {
                    map.addMapping({
                        generated: {
                            line: generated.line,
                            column: generated.column
                        }
                    });
                    lastOriginalSource = null;
                    sourceMappingActive = false;
                }
                for (var idx = 0, length = chunk.length; idx < length; idx++) {
                    if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
                        generated.line++;
                        generated.column = 0;
                        if (idx + 1 === length) {
                            lastOriginalSource = null;
                            sourceMappingActive = false;
                        } else if (sourceMappingActive) {
                            map.addMapping({
                                source: original.source,
                                original: {
                                    line: original.line,
                                    column: original.column
                                },
                                generated: {
                                    line: generated.line,
                                    column: generated.column
                                },
                                name: original.name
                            });
                        }
                    } else {
                        generated.column++;
                    }
                }
            });
            this.walkSourceContents(function (sourceFile, sourceContent) {
                map.setSourceContent(sourceFile, sourceContent);
            });
            return {
                code: generated.code,
                map: map
            };
        };
        exports.SourceNode = SourceNode;
    },
    function (module, exports, __webpack_require__) {
        exports.SourceMapGenerator = __webpack_require__(8).SourceMapGenerator;
        exports.SourceMapConsumer = __webpack_require__(32).SourceMapConsumer;
        exports.SourceNode = __webpack_require__(33).SourceNode;
    },
    function (module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(9)();
        exports.push([
            module.i,
            '.useless-log-overlay {\tposition: fixed; bottom: 10px; left: 10px; right: 10px; top: 10px; z-index: 5000;\n\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t\t\t-webkit-mask-image: -webkit-gradient(linear, left top, left bottom,\n\t\t\t\t\t\t\tcolor-stop(0.00, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.50, rgba(0,0,0,0)),\n\t\t\t\t\t\t\tcolor-stop(0.60, rgba(0,0,0,0.8)),\n\t\t\t\t\t\t\tcolor-stop(1.00, rgba(0,0,0,1))); }\n\n.useless-log-overlay-body {\n\n\tfont-family: Menlo, monospace;\n\tfont-size: 11px;\n\twhite-space: pre;\n\tbackground: rgba(255,255,255,1);\n\ttext-shadow: 1px 1px 0px rgba(0,0,0,0.07); position: absolute; bottom: 0; left: 0; right: 0; }\n\n.ulo-line \t\t{ white-space: pre; word-wrap: normal; }\n.ulo-line-where { color: black; opacity: 0.25; }',
            ''
        ]);
    },
    function (module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(9)();
        exports.push([
            module.i,
            '@-webkit-keyframes bombo-jumbo {\n  0%   { -webkit-transform: scale(0); }\n  80%  { -webkit-transform: scale(1.2); }\n  100% { -webkit-transform: scale(1); } }\n\n@keyframes bombo-jumbo {\n  0%   { transform: scale(0); }\n  80%  { transform: scale(1.2); }\n  100% { transform: scale(1); } }\n\n@-webkit-keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n@keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n.i-am-busy { -webkit-animation: pulse-opacity 1s ease-in infinite; animation: pulse-opacity 1s ease-in infinite; pointer-events: none; }\n\n.panic-modal .scroll-fader-top, .scroll-fader-bottom { left: 42px; right: 42px; position: absolute; height: 20px; pointer-events: none; }\n.panic-modal .scroll-fader-top { top: 36px; background: -webkit-linear-gradient(bottom, rgba(255,255,255,0), rgba(255,255,255,1)); }\n.panic-modal .scroll-fader-bottom { bottom: 128px; background: -webkit-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,1)); }\n\n.panic-modal-appear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1);\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); }\n\n.panic-modal-disappear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); -webkit-animation-direction: reverse;\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); animation-direction: reverse; }\n\n.panic-modal-overlay {\n          display: -ms-flexbox; display: -moz-flex; display: -webkit-flex; display: flex;\n          -ms-flex-direction: column; -moz-flex-direction: column; -webkit-flex-direction: column; flex-direction: column;\n          -ms-align-items: center; -moz-align-items: center; -webkit-align-items: center; align-items: center;\n          -ms-flex-pack: center; -ms-align-content: center; -moz-align-content: center; -webkit-align-content: center; align-content: center;\n          -ms-justify-content: center; -moz-justify-content: center; -webkit-justify-content: center; justify-content: center;\n          position: fixed; left: 0; right: 0; top: 0; bottom: 0; }\n\n.panic-modal-overlay-background { z-index: 1; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background: white; opacity: 0.75; }\n\n.panic-modal * { letter-spacing: 0; font-family: Helvetica, sans-serif; }\n.panic-modal { font-family: Helvetica, sans-serif; min-width: 640px; max-width: 90%; transition: 0.25s width ease-in-out; box-sizing: border-box; display: -webkit-flex; display: flex; position: relative; border-radius: 4px; z-index: 2; width: 640px; background: white; padding: 36px 42px 128px 42px; box-shadow: 0px 30px 80px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15); }\n.panic-alert-counter { float: left; background: #904C34; border-radius: 8px; width: 17px; height: 17px; display: inline-block; text-align: center; line-height: 16px; margin-right: 1em; margin-left: -2px; font-size: 10px; color: white; font-weight: bold; }\n.panic-alert-counter:empty { display: none; }\n\n.panic-modal-title { font-family: Helvetica, sans-serif; color: black; font-weight: 300; font-size: 30px; opacity: 0.5; margin-bottom: 1em; }\n.panic-modal-body { overflow-y: auto; width: 100%; }\n.panic-modal-footer { text-align: right; position: absolute; left: 0; right: 0; bottom: 0; padding: 42px; }\n\n.panic-btn { margin-left: 1em; font-weight: 300; font-family: Helvetica, sans-serif; -webkit-user-select: none; user-select: none; cursor: pointer; display: inline-block; padding: 1em 1.5em; border-radius: 4px; font-size: 14px; border: 1px solid black; color: white; }\n.panic-btn:focus { outline: none; }\n.panic-btn:focus { box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); }\n\n.panic-btn-danger       { background-color: #d9534f; border-color: #d43f3a; }\n.panic-btn-danger:hover { background-color: #c9302c; border-color: #ac2925; }\n\n.panic-btn-warning       { background-color: #f0ad4e; border-color: #eea236; }\n.panic-btn-warning:hover { background-color: #ec971f; border-color: #d58512; }\n\n.panic-alert-error { border-radius: 4px; background: #FFE8E2; color: #904C34; padding: 1em 1.2em 1.2em 1.2em; margin-bottom: 1em; font-size: 14px; }\n\n.panic-alert-error { position: relative; text-shadow: 0px 1px 0px rgba(255,255,255,0.25); }\n\n.panic-alert-error .clean-toggle { height: 2em; text-decoration: none; font-weight: 300; position: absolute; color: black; opacity: 0.25; right: 0; top: 0; display: block; text-align: right; }\n.panic-alert-error .clean-toggle:hover { text-decoration: underline; }\n.panic-alert-error .clean-toggle:before,\n.panic-alert-error .clean-toggle:after { position: absolute; right: 0; transition: all 0.25s ease-in-out; display: inline-block; overflow: hidden; }\n.panic-alert-error .clean-toggle:before { -webkit-transform-origin: center left; transform-origin: center left; content: \'more\'; }\n.panic-alert-error .clean-toggle:after { -webkit-transform-origin: center left; transform-origin: center right; content: \'less\'; }\n.panic-alert-error.all-stack-entries .clean-toggle:before { -webkit-transform: scale(0); transform: scale(0); }\n.panic-alert-error:not(.all-stack-entries) .clean-toggle:after { -webkit-transform: scale(0); transform: scale(0); }\n\n.panic-alert-error:last-child { margin-bottom: 0; }\n\n.panic-alert-error-message { line-height: 1.2em; position: relative; }\n\n.panic-alert-error .callstack { font-size: 12px; margin: 2em 0 0.1em 0; padding: 0; }\n.panic-alert-error .callstack * { font-family: Menlo, monospace; }\n\n.panic-alert-error .callstack-entry { white-space: nowrap; opacity: 1; transition: all 0.25s ease-in-out; margin-top: 10px; list-style-type: none; max-height: 38px; overflow: hidden; }\n.panic-alert-error .callstack-entry .file { }\n.panic-alert-error .callstack-entry .file:not(:empty) + .callee:not(:empty):before { content: \' \\2192   \'; }\n\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.third-party:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.hide:not(:first-child),\n.panic-alert-error:not(.all-stack-entries) > .callstack > .callstack-entry.native:not(:first-child) { max-height: 0; margin-top: 0; opacity: 0; }\n\n.panic-alert-error .callstack-entry,\n.panic-alert-error .callstack-entry * { line-height: initial; }\n.panic-alert-error .callstack-entry .src { overflow: hidden; transition: height 0.25s ease-in-out; height: 22px; border-radius: 2px; cursor: pointer; margin-top: 2px; white-space: pre; display: block; color: black; background: rgba(255,255,255,0.75); padding: 4px; }\n.panic-alert-error .callstack-entry.full .src { font-size: 12px; height: 200px; overflow: scroll; }\n.panic-alert-error .callstack-entry.full .src .line.hili { background: yellow; }\n.panic-alert-error .callstack-entry.full { max-height: 220px; }\n\n.panic-alert-error .callstack-entry .src.i-am-busy { background: white; }\n\n.panic-alert-error .callstack-entry        .src:empty                  { pointer-events: none; }\n.panic-alert-error .callstack-entry        .src:empty:before           { content: \'<< SOURCE NOT LOADED >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry.native .src:empty:before           { content: \'<< NATIVE CODE >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry        .src.i-am-busy:empty:before { content: \'<< SOURCE LOADING >>\'; color: rgba(0,0,0,0.5); }\n\n.panic-alert-error .test-log .location { transition: opacity 0.25s ease-in-out; color: black; opacity: 0.25; display: inline-block; overflow: hidden; text-overflow: ellipsis; vertical-align: middle; }\n.panic-alert-error .test-log .location:hover { opacity: 1; }\n\n.panic-alert-error .test-log .location:before { content: \' @ \'; }\n\n.panic-alert-error .test-log .location .callee:after  { content: \', \'; }\n.panic-alert-error .test-log .location .file          { opacity: 0.5; }\n.panic-alert-error .test-log .location .line:before   { content: \':\'; }\n.panic-alert-error .test-log .location .line          { opacity: 0.25; }\n\n/*  Hack to prevent inline-blocked divs from wrapping within white-space: pre;\n */\n.panic-alert-error .test-log .inline-exception-entry:after { content: \' \'; }\n.panic-alert-error .test-log .log-entry        .line:after { content: \' \'; }\n.panic-alert-error           .callstack-entry  .line:after { content: \' \'; }\n\n.panic-alert-error pre { overflow: scroll; border-radius: 2px; color: black; background: rgba(255,255,255,0.75); padding: 4px; margin: 0; }\n.panic-alert-error pre,\n.panic-alert-error pre * { font-family: Menlo, monospace; font-size: 11px; white-space: pre !important; }\n\n.panic-alert-error.inline-exception { max-width: 640px; border-radius: 0; margin: 0; background: none; display: inline-block; transform-origin: 0 0; transform: scale(0.95); }\n.panic-alert-error.inline-exception .panic-alert-error-message { cursor: pointer; }\n.panic-alert-error.inline-exception:not(:first-child) { margin-top: 10px; border-top: 1px solid #904C34; }\n\n',
            ''
        ]);
    },
    function (module, exports) {
        'use strict';
        'use strict';
        module.exports = (arr_, pred) => {
            const arr = arr_ || [], spans = [];
            let span = {
                label: undefined,
                items: [arr.first]
            };
            arr.forEach(x => {
                const label = pred(x);
                if (span.label !== label && span.items.length) {
                    spans.push(span = {
                        label: label,
                        items: [x]
                    });
                } else {
                    span.items.push(x);
                }
            });
            if (span.length)
                spans.push(span);
            return spans;
        };
    },
    function (module, exports, __webpack_require__) {
        'use strict';
        (function (process) {
            'use strict';
            const O = Object, isBrowser = typeof window !== 'undefined' && window.window === window && window.navigator, lastOf = x => x[x.length - 1], getSource = __webpack_require__(5), partition = __webpack_require__(37);
            class StackTracey extends Array {
                constructor(input, offset) {
                    super();
                    this.constructor = StackTracey;
                    this.__proto__ = StackTracey.prototype;
                    if (!input) {
                        input = new Error();
                        offset = offset === undefined ? 1 : offset;
                    }
                    if (input instanceof Error) {
                        input = input[StackTracey.stack] || input.stack || '';
                    }
                    if (typeof input === 'string') {
                        input = StackTracey.rawParse(input).slice(offset).map(StackTracey.extractEntryMetadata);
                    }
                    if (Array.isArray(input)) {
                        this.length = input.length;
                        input.forEach((x, i) => this[i] = x);
                    }
                }
                static extractEntryMetadata(e) {
                    return StackTracey.updateEntryFilePath(O.assign(e, {
                        calleeShort: lastOf(e.callee.split('.')),
                        fileName: lastOf(e.file.split('/'))
                    }));
                }
                static updateEntryFilePath(e) {
                    const short = StackTracey.shortenPath(e.file);
                    return O.assign(e, {
                        fileShort: short,
                        thirdParty: StackTracey.isThirdParty(short) && !e.index
                    });
                }
                static shortenPath(s) {
                    return s.replace(isBrowser ? window.location.href : process.cwd() + '/', '').replace(/^.*\:\/\/?\/?/, '');
                }
                static isThirdParty(shortPath) {
                    return shortPath[0] === '~' || shortPath[0] === '/' || shortPath.indexOf('node_modules') === 0 || shortPath.indexOf('webpack/bootstrap') === 0;
                }
                static rawParse(str) {
                    const lines = (str || '').split('\n');
                    const entries = lines.map(line => {
                        line = line.trim();
                        var callee, fileLineColumn = [], native, planA, planB;
                        if ((planA = line.match(/at (.+) \((.+)\)/)) || (planA = line.match(/(.*)@(.*)/))) {
                            callee = planA[1];
                            native = planA[2] === 'native';
                            fileLineColumn = (planA[2].match(/(.*):(.+):(.+)/) || []).slice(1);
                        } else if (planB = line.match(/^(at\s+)*(.+):([0-9]+):([0-9]+)/)) {
                            fileLineColumn = planB.slice(2);
                        } else {
                            return undefined;
                        }
                        return {
                            beforeParse: line,
                            callee: callee || '',
                            index: isBrowser && fileLineColumn[0] === window.location.href,
                            native: native || false,
                            file: fileLineColumn[0] || '',
                            line: parseInt(fileLineColumn[1] || '', 10) || undefined,
                            column: parseInt(fileLineColumn[2] || '', 10) || undefined
                        };
                    });
                    return entries.filter(x => x !== undefined);
                }
                withSource(i) {
                    return StackTracey.withSource(this[i]);
                }
                static withSource(loc) {
                    if (loc.sourceFile || loc.file && loc.file.indexOf('<') >= 0) {
                        return loc;
                    } else {
                        let resolved = getSource(loc.file).resolve(loc);
                        if (resolved.sourceFile) {
                            resolved = StackTracey.updateEntryFilePath(O.assign(resolved, { file: resolved.sourceFile.path }));
                        }
                        if (resolved.sourceLine && resolved.sourceLine.includes('// @hide')) {
                            resolved.sourceLine = resolved.sourceLine.replace('// @hide', '');
                            resolved.hide = true;
                        }
                        return O.assign({ sourceLine: '' }, loc, resolved);
                    }
                }
                get withSources() {
                    return new StackTracey(this.map(StackTracey.withSource));
                }
                get mergeRepeatedLines() {
                    return new StackTracey(partition(this, e => e.file + e.line).map(group => {
                        return group.items.slice(1).reduce((memo, entry) => {
                            memo.callee = (memo.callee || '<anonymous>') + ' \u2192 ' + (entry.callee || '<anonymous>');
                            memo.calleeShort = (memo.calleeShort || '<anonymous>') + ' \u2192 ' + (entry.calleeShort || '<anonymous>');
                            return memo;
                        }, O.assign({}, group.items[0]));
                    }));
                }
                get clean() {
                    return this.withSources.mergeRepeatedLines.filter((e, i) => i === 0 || !(e.thirdParty || e.hide));
                }
                at(i) {
                    return O.assign({
                        beforeParse: '',
                        callee: '<???>',
                        index: false,
                        native: false,
                        file: '<???>',
                        line: 0,
                        column: 0
                    }, this[i]);
                }
                static locationsEqual(a, b) {
                    return a.file === b.file && a.line === b.line && a.column === b.column;
                }
            }
            ;
            [
                'map',
                'filter',
                'slice',
                'concat',
                'reverse'
            ].forEach(name => {
                StackTracey.prototype[name] = function (...args) {
                    return new StackTracey(Array.prototype[name].apply(this, args));
                };
            });
            StackTracey.stack = typeof Symbol !== 'undefined' ? Symbol.for('StackTracey') : '__StackTracey';
            module.exports = StackTracey;
        }.call(exports, __webpack_require__(10)));
    },
    function (module, exports, __webpack_require__) {
        String.ify = __webpack_require__(25);
        __webpack_require__(19);
        __webpack_require__(20);
        __webpack_require__(21);
        __webpack_require__(18);
        __webpack_require__(16);
        __webpack_require__(15);
        __webpack_require__(17);
        __webpack_require__(24);
        __webpack_require__(23);
        __webpack_require__(22);
        __webpack_require__(14);
        __webpack_require__(13);
        document.ready(() => {
            Panic.init();
        });
    }
]));