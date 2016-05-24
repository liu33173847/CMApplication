// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
(function () {
    define(['tests/libs/Squire/0.1.0/Squire', "jquery"], function (Squire, $) {
        "use strict";
        var TestFixture = function () {

            var injector = new Squire(),
            _filesUnderTest,
            _tests = [],
            _moduleName,
            _moduleOptions;

            return {
                "registerModule": function (moduleName, filePaths, mocks, moduleOptions) {
                    _moduleName = moduleName;
                    _moduleOptions = moduleOptions;
                    if (typeof filePaths === "string") {
                        filePaths = [filePaths];
                    }
                    _filesUnderTest = filePaths;
                    for (var key in mocks) {
                        if (mocks.hasOwnProperty(key)) {
                            var mock = mocks[key];
                            injector.mock(key, mock);
                        }
                    }
                    injector.mock("jquery", function () {
                        return $;
                    });
                },
                "registerTest": function (description, action, args) {
                    if (args !== undefined && !$.isArray(args)) args = [args];
                    _tests.push({
                        description: description,
                        action: action,
                        args: args
                    });
                },
                "functionExists": function (name) {
                    var description = "function " + name + " exists";
                    this.registerTest(description, function (instance) {
                        ok(typeof instance[name] === "function", description);
                    });
                },
                "registerConstructorTest": function (description, action, args) {
                    _tests.push({
                        description: description,
                        action: action,
                        args: args,
                        isConstructorTest: true
                    });
                },
                "start": function () {
                    module(_moduleName);
                    asyncTest("loading: " + _moduleName, function() {
                        injector.require(_filesUnderTest, function() {
                            module(_moduleName, _moduleOptions);
                            var target = arguments[0];
                            if (!target) {
                                ok(false, "test target is not defined");
                                return;
                            }
                            ok(true, "module tests ran");
                            $.each(_tests, function(i, item) {
                                test(item.description, function () {
                                    try {
                                        var args = getArgumentsToTest(target, item);
                                        item.action.apply(this, args);
                                    } catch (e) {
                                        ok(false, "the test threw an excepton: " + e.stack);
                                    }
                                });
                            });
                            
                            start();
                        });
                    });
                }
            };

            function getArgumentsToTest(target, test) {
                var argsToTest = [];
                if (test.isConstructorTest) {
                    argsToTest.push(target);
                } else if (typeof target === "function") {
                    var instance = Object.create(target.prototype);
                    argsToTest.push(target.apply(instance, test.args));
                } else {
                    argsToTest.push($.extend({}, target));
                }
                return argsToTest;
            }
        };

        var promise;
        TestFixture.synchronize = function (parameters) {
            promise = $.Deferred();
            return promise;
        };

        return TestFixture;

    });
})();