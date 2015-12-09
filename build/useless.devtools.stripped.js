/*    AUTO GENERATED from useless.devtools.js (stripped unit tests and comments) */

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
        return contract === undefined && v === undefined || _.isFunction(contract) && (_.isPrototypeConstructor(contract) ? _.isTypeOf(contract, v) : contract(v)) || typeof v === contract || v === contract;
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
_.hasAsserts = true;
_.extend(_, {
    tests: {},
    withTest: function (name, test, defineSubject) {
        defineSubject();
        _.runTest(test);
        _.publishToTestsNamespace(name, test);
    },
    deferTest: function (name, test, defineSubject) {
        defineSubject();
        _.publishToTestsNamespace(name, test);
    },
    runTest: function (test) {
        if (_.isFunction(test)) {
            test();
        } else {
            _.each(test, function (fn) {
                fn();
            });
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
_.extend(_, _.assertions = {
    assert: function (__) {
        var args = [].splice.call(arguments, 0);
        if (args.length === 1) {
            if (args[0] !== true) {
                _.assertionFailed({ notMatching: args });
            }
        } else if (!_.allEqual(args)) {
            _.assertionFailed({ notMatching: args });
        }
        return true;
    },
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
        context(function () {
            $fail;
        });
    },
    assertEveryCalledOnce: function (fn, then) {
        return _.assertEveryCalled(_.hasTags ? $once(fn) : _.extend(fn, { once: true }), then);
    },
    assertEveryCalled: function (fn_, then) {
        var fn = _.hasTags ? $untag(fn_) : fn_, async = _.hasTags ? $async.is(fn_) : fn_.async;
        once = _.hasTags ? $once.is(fn_) : fn_.once;
        var match = once ? null : fn.toString().match(/.*function[^\(]\(([^\)]+)\)/);
        var contracts = once ? _.times(fn.length, _.constant(1)) : _.map(match[1].split(','), function (arg) {
            var parts = arg.trim().match(/^(.+)__(.+)$/);
            return parts && parseInt(parts[2], 10) || true;
        });
        var status = [];
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
        var mismatches;
        return _.isEmpty(_.typeMismatches(contract, value)) ? true : _.assertionFailed({
            asColumns: true,
            notMatching: [
                { value: value },
                { type: _.decideType(value) },
                { contract: contract },
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
            _.assertMatches.apply(this, [e].concat(_.rest(arguments)));
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
        return _.extend(new Error('assertion failed'), additionalInfo, { assertion: true });
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
    _.defineGlobalProperty('$' + name, _[name], { configurable: true });
});
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
    switch (Platform.engine) {
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
    if (Platform.Browser) {
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
    return CallStack.fromRawString(CallStack.currentAsRawString).offset(Platform.NodeJS ? 1 : 0);
});
_.defineKeyword('currentFile', function () {
    return (CallStack.rawStringToArray(CallStack.currentAsRawString)[Platform.NodeJS ? 3 : 1] || { file: '' }).file;
});
_.defineKeyword('uselessPath', _.memoize(function () {
    return _.initial($currentFile.split('/'), Platform.NodeJS ? 2 : 1).join('/') + '/';
}));
_.defineKeyword('sourcePath', _.memoize(function () {
    var local = ($uselessPath.match(/(.+)\/node_modules\/(.+)/) || [])[1];
    return local ? local + '/' : $uselessPath;
}));
SourceFiles = $singleton(Component, {
    apiConfig: {},
    line: function (file, line, then) {
        SourceFiles.read(file, function (data) {
            then((data.split('\n')[line] || '').trimmed);
        });
    },
    read: $memoizeCPS(function (file, then) {
        if (file.indexOf('<') < 0) {
            try {
                if (Platform.NodeJS) {
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
        if (Platform.NodeJS) {
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
            API.post('source/' + file, _.extend2({}, this.apiConfig, {
                what: { text: text },
                failure: Panic,
                success: function () {
                    log.ok(file, '\u2014 successfully saved');
                    if (then) {
                        then();
                    }
                }
            }));
        }
    }
});
_.readSourceLine = SourceFiles.line;
_.readSource = SourceFiles.read;
_.writeSource = SourceFiles.write;
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
        return this.mergeDuplicateLines.reject(_.property('thirdParty'));
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
                    entry.sourceReady(entry.source = src);
                });
            }
            this.push(entry);
        }, this);
    },
    fromParsedArray: $static(function (arr) {
        return new CallStack(arr);
    }),
    currentAsRawString: $static($property(function () {
        var cut = Platform.Browser ? 3 : 2;
        return _.rest((new Error().stack || '').split('\n'), cut).join('\n');
    })),
    shortenPath: $static(function (path) {
        var relative = path.replace($uselessPath, '').replace($sourcePath, '');
        return relative !== path ? relative : path.split('/').last;
    }),
    isThirdParty: $static(_.bindable(function (file) {
        var local = file.replace($sourcePath, '');
        return Platform.NodeJS && file[0] !== '/' || local.indexOf('/node_modules/') >= 0 || file.indexOf('/node_modules/') >= 0 && !local || local.indexOf('underscore') >= 0 || local.indexOf('jquery') >= 0;
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
                index: Platform.Browser && fileLineColumn[0] === window.location.href,
                'native': native_,
                file: fileLineColumn[0] || '',
                line: (fileLineColumn[1] || '').integerValue,
                column: (fileLineColumn[2] || '').integerValue
            };
        });
    })
});
$prototype.macro(function (def, base) {
    var stack = CallStack.currentAsRawString;
    if (!def.$meta) {
        def.$meta = $static(_.cps.memoize(function (then) {
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
        }));
    }
    return def;
});
_.hasLog = true;
_.extend(log = function () {
    return log.write.apply(this, arguments);
}, {
    Color: $prototype(),
    Config: $prototype(),
    cleanArgs: function (args) {
        return _.reject(args, _.or(log.Color.isTypeOf, log.Config.isTypeOf));
    },
    read: function (type, args) {
        return _.find(args, type.isTypeOf) || new type({});
    },
    modify: function (type, args, operator) {
        return _.reject(args, type.isTypeOf).concat(operator(log.read(type, args)));
    }
});
_.extend(log, {
    config: function (cfg) {
        return new log.Config(cfg);
    },
    indent: function (n) {
        return log.config({ indent: n });
    },
    color: {
        red: new log.Color({
            shell: '\x1B[31m',
            css: 'crimson'
        }),
        blue: new log.Color({
            shell: '\x1B[36m',
            css: 'royalblue'
        }),
        orange: new log.Color({
            shell: '\x1B[33m',
            css: 'saddlebrown'
        }),
        green: new log.Color({
            shell: '\x1B[32m',
            css: 'forestgreen'
        })
    },
    readColor: log.read.partial(log.Color),
    readConfig: log.read.partial(log.Config),
    modifyColor: log.modify.partial(log.Color),
    modifyConfig: log.modify.partial(log.Config),
    boldLine: '======================================',
    line: '--------------------------------------',
    thinLine: '......................................',
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
    impl: {
        write: function (defaultCfg) {
            return $restArg(function () {
                var writeBackend = log.writeBackend();
                var args = _.asArray(arguments);
                var cleanArgs = log.cleanArgs(args);
                var config = _.extend({ indent: 0 }, defaultCfg, log.readConfig(args));
                var stackOffset = Platform.NodeJS ? 3 : 3;
                var indent = (writeBackend.indent || 0) + config.indent;
                var text = log.impl.stringifyArguments(cleanArgs, config);
                var indentation = _.times(indent, _.constant('\t')).join('');
                var match = text.reversed.match(/(\n*)([^]*)/);
                var location = config.location && log.impl.location(config.where || $callStack[stackOffset + (config.stackOffset || 0)]) || '';
                var backendParams = {
                    color: log.readColor(args),
                    indentedText: match[2].reversed.split('\n').map(_.prepends(indentation)).join('\n'),
                    trailNewlines: match[1],
                    codeLocation: location,
                    config: config
                };
                writeBackend(backendParams);
                return cleanArgs[0];
            });
        },
        defaultWriteBackend: function (params) {
            var color = params.color, indentedText = params.indentedText, codeLocation = params.codeLocation, trailNewlines = params.trailNewlines;
            var colorValue = color && (Platform.NodeJS ? color.shell : color.css);
            if (colorValue) {
                if (Platform.NodeJS) {
                    console.log(colorValue + indentedText + '\x1B[0m', codeLocation, trailNewlines);
                } else {
                    var lines = indentedText.split('\n');
                    var allButFirstLinePaddedWithSpace = [_.first(lines) || ''].concat(_.rest(lines).map(_.prepends(' ')));
                    console.log('%c' + allButFirstLinePaddedWithSpace.join('\n'), 'color: ' + colorValue, codeLocation, trailNewlines);
                }
            } else {
                console.log(indentedText, codeLocation, trailNewlines);
            }
        },
        location: function (where) {
            return _.quoteWith('()', _.nonempty([
                where.calleeShort,
                where.fileName + ':' + where.line
            ]).join(' @ '));
        },
        stringifyArguments: function (args, cfg) {
            return _.map(args, log.impl.stringify.tails2(cfg)).join(' ');
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
                var stack = CallStack.fromError(e).clean.offset(e.stackOffset || 0);
                var why = (e.message || '').replace(/\r|\n/g, '').trimmed.first(120);
                return '[EXCEPTION] ' + why + '\n\n' + log.impl.stringifyCallStack(stack) + '\n';
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
_.extend(log, log.printAPI = {
    newline: log.impl.write().partial(''),
    write: log.impl.write(),
    red: log.impl.write().partial(log.color.red),
    blue: log.impl.write().partial(log.color.blue),
    orange: log.impl.write().partial(log.color.orange),
    green: log.impl.write().partial(log.color.green),
    failure: log.impl.write({ location: true }).partial(log.color.red),
    error: log.impl.write({ location: true }).partial(log.color.red),
    e: log.impl.write({ location: true }).partial(log.color.red),
    info: log.impl.write({ location: true }).partial(log.color.blue),
    i: log.impl.write({ location: true }).partial(log.color.blue),
    w: log.impl.write({ location: true }).partial(log.color.orange),
    warn: log.impl.write({ location: true }).partial(log.color.orange),
    warning: log.impl.write({ location: true }).partial(log.color.orange),
    success: log.impl.write({ location: true }).partial(log.color.green),
    ok: log.impl.write({ location: true }).partial(log.color.green),
    g: log.impl.write({ location: true }).partial(log.color.green)
});
log.writes = log.printAPI.writes = _.higherOrder(log.write);
logs = _.map2(log.printAPI, _.higherOrder);
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
                return (col + '').split('\n')[0];
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
if (Platform.NodeJS) {
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
                readPrototypeMeta: Tags.unwrap(def.$meta),
                tests: value
            });
            def[name] = $static($property($constant(def[name])));
            return def;
        })));
        this.run = this.$(this.run);
    },
    run: _.interlocked(function (releaseLock, cfg_, optionalThen) {
        var then = arguments.length === 3 ? optionalThen : _.identity;
        var defaults = {
            silent: true,
            verbose: false,
            timeout: 2000,
            testStarted: function (test) {
            },
            testComplete: function (test) {
            }
        };
        var cfg = this.runConfig = _.extend(defaults, cfg_);
        var suitesIsArray = _.isArray(cfg.suites);
        var suites = _.map(cfg.suites || [], this.$(function (suite, name) {
            return this.testSuite(suitesIsArray ? suite.name : name, suitesIsArray ? suite.tests : suite, cfg.context);
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
        runConfig.testStarted(test);
        test.verbose = runConfig.verbose;
        test.timeout = runConfig.timeout;
        test.startTime = Date.now();
        test.run(function () {
            runConfig.testComplete(test);
            test.time = Date.now() - test.startTime;
            then();
        });
    },
    collectTests: function () {
        return _.map(_.tests, this.$(function (suite, name) {
            return this.testSuite(name, suite);
        }));
    },
    collectPrototypeTests: function (then) {
        _.cps.map(this.prototypeTests, this.$(function (def, then) {
            def.readPrototypeMeta(this.$(function (meta) {
                then(this.testSuite(meta.name, def.tests));
            }));
        }), then);
    },
    testSuite: function (name, tests, context) {
        return {
            name: name || '',
            tests: _(_.pairs(typeof tests === 'function' && _.object([[
                    name,
                    tests
                ]]) || tests)).map(function (keyValue) {
                var test = new Test({
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
        _.defineKeyword(name, Tags.modifySubject(def, function (fn) {
            return _.withSameArgs(fn, function () {
                var loc = $callStack.safeLocation(1);
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
            routine: Tags.modifySubject(def, function (fn) {
                return function (done) {
                    if ($async.is(args[0])) {
                        _.cps.apply(fn, self.context, args, function (args, then) {
                            if (then)
                                then();
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
                    log.red(src, log.config({
                        location: assertion.location,
                        where: assertion.location
                    }));
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
                        _.each(notMatching, function (what, i) {
                            log.orange('\u2022', what);
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
                    log.error('TIMEOUT EXPIRED');
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
            if (routine.length > 0)
                routine.call(self.context, self.$(self.finalize));
            else
                routine.call(self.context), self.finalize();
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
if (Platform.NodeJS) {
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
            this.modal.css('max-height', $(window).height() - 100);
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
        printFailedTest: function (test) {
            var logEl = $('<pre class="test-log" style="margin-top: 13px;">');
            log.withWriteBackend(function (params) {
                logEl.append($('<div>').css({ color: params.color.css }).html(_.escape(params.indentedText) + (params.codeLocation && ' <span class="location">' + params.codeLocation + '</span>' || '') + (params.trailNewlines || '').replace(/\n/g, '<br>')));
            }, function (done) {
                test.evalLogCalls();
                done();
            });
            return [
                $('<div class="panic-alert-error-message" style="font-weight: bold;">').text(test.name).append('<span style="float:right; opacity: 0.25;">test failed</span>'),
                logEl
            ];
        },
        printError: function (e) {
            var stackEntries = CallStack.fromError(e), asyncContext = e.asyncContext;
            while (asyncContext) {
                stackEntries = stackEntries.concat(CallStack.fromRawString(asyncContext.stack));
                asyncContext = asyncContext.asyncContext;
            }
            stackEntries = stackEntries.mergeDuplicateLines;
            return [
                $('<div class="panic-alert-error-message" style="font-weight: bold;">').text(e.message).append(_.any(stackEntries, function (e, i) {
                    return (e.thirdParty || e['native']) && i !== 0;
                }) ? '<a class="clean-toggle" href="javascript:{}"></a>' : '').click(this.$(function (e) {
                    $(e.delegateTarget).parent().toggleClass('all').transitionend(this.$(function () {
                        this.modalBody.scroll();
                    }));
                })),
                $('<ul class="callstack">').append(_.map(stackEntries, this.$(function (entry) {
                    var dom = $('<li class="callstack-entry">').toggleClass('third-party', entry.thirdParty).toggleClass('native', entry['native']).append([
                        $('<span class="file">').text(_.nonempty([
                            entry.index ? '(index)' : entry.fileShort,
                            entry.line
                        ]).join(':')),
                        $('<span class="callee">').text(entry.calleeShort),
                        $('<span class="src i-am-busy">').click(this.$(function (e) {
                            var el = $(e.delegateTarget);
                            el.waitUntil(_.readSource.partial((entry.remote ? 'api/source/' : '') + entry.file), this.$(function (text) {
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
                }
            }));
        },
        el: $memoized($property(function () {
            return $('<div class="useless-log-overlay" style="display: none;">').appendTo(document.body);
        })),
        toggle: function (yes) {
            this.el.toggle(yes);
        },
        write: function (params) {
            this.toggle(true);
            if (params.config.clear) {
                this.el.empty();
            }
            this.el.append($('<div class="ulo-line">').css('color', params.color.css).append($('<span class="ulo-line-text">').text(params.indentedText + ' ')).append($('<span class="ulo-line-where">').text(params.codeLocation + ' ')).append($('<span class="ulo-line-trail">').text(params.trailNewlines)));
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
        $('<style type="text/css">').text('@-webkit-keyframes bombo-jumbo {\n  0%   { -webkit-transform: scale(0); }\n  80%  { -webkit-transform: scale(1.2); }\n  100% { -webkit-transform: scale(1); } }\n\n@keyframes bombo-jumbo {\n  0%   { transform: scale(0); }\n  80%  { transform: scale(1.2); }\n  100% { transform: scale(1); } }\n\n@-webkit-keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n@keyframes pulse-opacity {\n  0% { opacity: 0.5; }\n  50% { opacity: 0.25; }\n  100% { opacity: 0.5; } }\n\n.i-am-busy { -webkit-animation: pulse-opacity 1s ease-in infinite; animation: pulse-opacity 1s ease-in infinite; pointer-events: none; }\n\n.panic-modal .scroll-fader-top, .scroll-fader-bottom { left: 42px; right: 42px; position: absolute; height: 20px; pointer-events: none; }\n.panic-modal .scroll-fader-top { top: 36px; background: -webkit-linear-gradient(bottom, rgba(255,255,255,0), rgba(255,255,255,1)); }\n.panic-modal .scroll-fader-bottom { bottom: 128px; background: -webkit-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,1)); }\n\n.panic-modal-appear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1);\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); }\n\n.panic-modal-disappear {\n  -webkit-animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); -webkit-animation-direction: reverse;\n  animation: bombo-jumbo 0.25s cubic-bezier(1,.03,.48,1); animation-direction: reverse; }\n\n.panic-modal-overlay {\n          display: -ms-flexbox; display: -moz-flex; display: -webkit-flex; display: flex;\n          -ms-flex-direction: column; -moz-flex-direction: column; -webkit-flex-direction: column; flex-direction: column;\n          -ms-align-items: center; -moz-align-items: center; -webkit-align-items: center; align-items: center;\n          -ms-flex-pack: center; -ms-align-content: center; -moz-align-content: center; -webkit-align-content: center; align-content: center;\n          -ms-justify-content: center; -moz-justify-content: center; -webkit-justify-content: center; justify-content: center;\n          position: fixed; left: 0; right: 0; top: 0; bottom: 0;\n          font-family: Helvetica, sans-serif; }\n\n.panic-modal-overlay-background { z-index: 1; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background: white; opacity: 0.75; }\n\n.panic-modal { box-sizing: border-box; display: -webkit-flex; display: flex; position: relative; border-radius: 4px; z-index: 2; width: 600px; background: white; padding: 36px 42px 128px 42px; box-shadow: 0px 30px 80px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15); }\n.panic-alert-counter { float: left; background: #904C34; border-radius: 8px; width: 17px; height: 17px; display: inline-block; text-align: center; line-height: 16px; margin-right: 1em; margin-left: -2px; font-size: 10px; color: white; font-weight: bold; }\n.panic-alert-counter:empty { display: none; }\n\n.panic-modal-title { color: black; font-weight: 300; font-size: 30px; opacity: 0.5; margin-bottom: 1em; }\n.panic-modal-body { overflow-y: auto; width: 100%; }\n.panic-modal-footer { text-align: right; position: absolute; left: 0; right: 0; bottom: 0; padding: 42px; }\n\n.panic-btn { margin-left: 1em; font-weight: 300; font-family: Helvetica, sans-serif; -webkit-user-select: none; user-select: none; cursor: pointer; display: inline-block; padding: 1em 1.5em; border-radius: 4px; font-size: 14px; border: 1px solid black; color: white; }\n.panic-btn:focus { outline: none; }\n.panic-btn:focus { box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); }\n\n.panic-btn-danger       { background-color: #d9534f; border-color: #d43f3a; }\n.panic-btn-danger:hover { background-color: #c9302c; border-color: #ac2925; }\n\n.panic-btn-warning       { background-color: #f0ad4e; border-color: #eea236; }\n.panic-btn-warning:hover { background-color: #ec971f; border-color: #d58512; }\n\n.panic-alert-error { border-radius: 4px; background: #FFE8E2; color: #904C34; padding: 1em 1.2em 1.2em 1.2em; margin-bottom: 1em; font-size: 14px; }\n\n.panic-alert-error { position: relative; text-shadow: 0px 1px 0px rgba(255,255,255,0.25); }\n\n.panic-alert-error .clean-toggle { height: 2em; text-decoration: none; font-weight: 300; position: absolute; color: black; opacity: 0.25; right: 1.2em; left: 0; top: 1em; display: block; text-align: right; }\n.panic-alert-error .clean-toggle:hover { text-decoration: underline; }\n.panic-alert-error .clean-toggle:before,\n.panic-alert-error .clean-toggle:after { position: absolute; right: 0; transition: all 0.25s ease-in-out; display: inline-block; overflow: hidden; }\n.panic-alert-error .clean-toggle:before { -webkit-transform-origin: center left; transform-origin: center left; content: \'more\'; }\n.panic-alert-error .clean-toggle:after { -webkit-transform-origin: center left; transform-origin: center right; content: \'less\'; }\n.panic-alert-error.all .clean-toggle:before { -webkit-transform: scale(0); transform: scale(0); }\n.panic-alert-error:not(.all) .clean-toggle:after { -webkit-transform: scale(0); transform: scale(0); }\n\n.panic-alert-error:last-child { margin-bottom: 0; }\n\n.panic-alert-error-message { line-height: 1.2em; }\n\n.panic-alert-error .callstack { font-size: 12px; margin: 2em 0 0.1em 0; font-family: Menlo, monospace; padding: 0; }\n\n.panic-alert-error .callstack-entry { white-space: nowrap; opacity: 1; transition: all 0.25s ease-in-out; margin-top: 10px; list-style-type: none; max-height: 38px; overflow: hidden; }\n.panic-alert-error .callstack-entry .file { }\n.panic-alert-error .callstack-entry .file:not(:empty) + .callee:not(:empty):before { content: \' \u2192 \'; }\n\n.panic-alert-error:not(.all) .callstack-entry.third-party:not(:first-child),\n.panic-alert-error:not(.all) .callstack-entry.native:not(:first-child) { max-height: 0; margin-top: 0; opacity: 0; }\n\n.panic-alert-error .callstack-entry,\n.panic-alert-error .callstack-entry * { line-height: initial; }\n.panic-alert-error .callstack-entry .src { overflow: hidden; transition: height 0.25s ease-in-out; height: 22px; border-radius: 2px; cursor: pointer; margin-top: 2px; white-space: pre; display: block; color: black; background: rgba(255,255,255,0.75); padding: 4px; }\n.panic-alert-error .callstack-entry.full .src { font-size: 12px; height: 200px; overflow: scroll; }\n.panic-alert-error .callstack-entry.full .src .line.hili { background: yellow; }\n.panic-alert-error .callstack-entry.full { max-height: 220px; }\n\n.panic-alert-error .callstack-entry .src.i-am-busy { background: white; }\n\n.panic-alert-error .callstack-entry        .src:empty                  { pointer-events: none; }\n.panic-alert-error .callstack-entry        .src:empty:before           { content: \'<< SOURCE NOT LOADED >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry.native .src:empty:before           { content: \'<< NATIVE CODE >>\'; color: rgba(0,0,0,0.25); }\n.panic-alert-error .callstack-entry        .src.i-am-busy:empty:before { content: \'<< SOURCE LOADING >>\'; color: rgba(0,0,0,0.5); }\n\n.panic-alert-error .callstack-entry .line:after { content: \' \'; }\n\n.panic-alert-error pre { font-family: Menlo, monospace; overflow: scroll; border-radius: 2px; white-space: pre; color: black; background: rgba(255,255,255,0.75); padding: 4px; margin: 0; font-size: 11px; }\n'),
        $('<style type="text/css">').text('.useless-log-overlay { position: fixed; bottom: 10px; left: 10px; right: 10px; background: rgba(255,255,255,0.75); z-index: 5000;\n\t\t\t\t\t   white-space: pre;\n\t\t\t\t\t   font-family: Menlo, monospace;\n\t\t\t\t\t   font-size: 11px;\n\t\t\t\t\t   pointer-events: none;\n\t\t\t\t\t   text-shadow: 1px 1px 0px rgba(0,0,0,0.07); }\n\n.ulo-line \t\t{ white-space: pre; word-wrap: normal; }\n.ulo-line-where { color: black; opacity: 0.25; }')
    ]);
}(jQuery));