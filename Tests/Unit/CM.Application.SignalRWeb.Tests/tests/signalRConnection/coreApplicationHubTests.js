define([
    "tests/libs/Squire/0.1.0/Squire", 
    "tests/libs/testFixture/testFixture",
    "tests/stubs/signalRServiceConnectorStub",
    "tests/stubs/loggerStub",
    "jquery"
],
    function (Squire, TestFixture, signalRServiceConnectorStub, loggerStub, $) {
        "use strict";
        var testFixture = new TestFixture();

        testFixture.registerModule("coreApplicationHub tests", "core/js/signalRConnection/coreApplicationHub",
        {
            "signalRServiceConnector": Squire.Helpers.constructs(signalRServiceConnectorStub),
            "core/js/logger": Squire.Helpers.constructs(loggerStub)            
        });

        testFixture.registerConstructorTest("test that I can instantiate coreApplicationHub", function (CoreApplicationHub) {
            //arrange

            //act
            var coreApplicationHub = new CoreApplicationHub();
            //assert
            ok(coreApplicationHub, "it should be a valid object..");
        });


        var options = {
            applicationUrl: 'xyz',
            hubName: 'coreApplicationHub'
        };

        //load tests
        (function () {
            var loadTest = function (testDescription, testExtras) {
                testFixture.registerTest(testDescription, function (coreApplicationHub) {
                    //arrange
                    sinon.stub(signalRServiceConnectorStub, "load");
                    signalRServiceConnectorStub.load.returns({
                        "on": function () {

                        }
                    });

                    //act
                    if (coreApplicationHub.load) {
                        coreApplicationHub.load();
                    }
                    //assert
                    testExtras.asserts(coreApplicationHub);
                    signalRServiceConnectorStub.load.restore();
                }, options);
            };

            testFixture.functionExists("load");

            loadTest("test that load calls Load on signalr connector", {
                "asserts": function (coreApplicationHub) {
                    ok(signalRServiceConnectorStub.load.calledOnce, "load should be called on generic connector once ..");
                }
            });

            loadTest("test that load calls Load on signalr connector", {
                "asserts": function (coreApplicationHub) {
                    ok(signalRServiceConnectorStub.load.calledOnce, "load should be called on generic connector once ..");
                    if (signalRServiceConnectorStub.load.called) {
                        var args = signalRServiceConnectorStub.load.args[0];
                        equal(args[0], options.applicationUrl, "first argument must be address of signalr connection");
                        equal(args[1], options.hubName, "second argument must be name of hub");
                    }
                }
            });
        })();

        testFixture.functionExists("getDivisorsForNumber");
        testFixture.registerTest("test that getDivisorsForNumber calls execute on connector", function (coreApplicationHub) {
            //arrange
            sinon.spy(signalRServiceConnectorStub, "executeRequestedAction");
            var callback = sinon.spy();
            var number = 60;

            //act
            coreApplicationHub.getDivisorsForNumber(number, callback);

            //assert
            ok(signalRServiceConnectorStub.executeRequestedAction.calledOnce, "executeRequestedAction should have been called for getDivisorsForNumber");
            if (signalRServiceConnectorStub.executeRequestedAction.called) {
                var args = signalRServiceConnectorStub.executeRequestedAction.args[0];
                equal(args[0], "GetDivisorsForNumber", "GetDivisorsForNumber command sent as executeRequestedAction");
                equal(args[1], number, "number sent for getDivisorsForNumber");
            }
            signalRServiceConnectorStub.executeRequestedAction.restore();
        });

        
        testFixture.registerTest("test that getDivisorsForNumber calls execute on connector", function (coreApplicationHub) {
            //arrange
            sinon.stub(signalRServiceConnectorStub, "load");
            var hubReturned = $("<div>");
            signalRServiceConnectorStub.load.returns(hubReturned);
            sinon.spy(signalRServiceConnectorStub, "executeRequestedAction");
            var callback = sinon.spy();
            var number = 60;

            //act
            coreApplicationHub.load();
            coreApplicationHub.getDivisorsForNumber(number, callback);
            hubReturned.trigger("onRequestFailed", {});

            //assert
            ok(callback.calledOnce, "callback should have called for getDivisorsForNumber failed");

            signalRServiceConnectorStub.load.restore();
            signalRServiceConnectorStub.executeRequestedAction.restore();
        });

        testFixture.functionExists("calculateTriangleArea");
        testFixture.registerTest("test that calculateTriangleArea calls execute on connector", function (coreApplicationHub) {
            //arrange
            sinon.spy(signalRServiceConnectorStub, "executeRequestedAction");
            var callback = sinon.spy();
            var sides = [2, 3, 4];

            //act
            coreApplicationHub.calculateTriangleArea(sides[0], sides[1], sides[2], callback);

            //assert
            ok(signalRServiceConnectorStub.executeRequestedAction.calledOnce, "executeRequestedAction should have been called for calculateTriangleArea");
            if (signalRServiceConnectorStub.executeRequestedAction.called) {
                var args = signalRServiceConnectorStub.executeRequestedAction.args[0];
                equal(args[0], "CalculateTriangleArea", "CalculateTriangleArea command sent as executeRequestedAction");
                equal(args[1], sides[0], "sideA sent for calculateTriangleArea");
                equal(args[2], sides[1], "sideB sent for calculateTriangleArea");
                equal(args[3], sides[2], "sideC sent for calculateTriangleArea");
            }
            signalRServiceConnectorStub.executeRequestedAction.restore();
        });


        testFixture.registerTest("test that calculateTriangleArea calls execute on connector", function (coreApplicationHub) {
            //arrange
            sinon.stub(signalRServiceConnectorStub, "load");
            var hubReturned = $("<div>");
            signalRServiceConnectorStub.load.returns(hubReturned);
            sinon.spy(signalRServiceConnectorStub, "executeRequestedAction");
            var callback = sinon.spy();
            var sides = [2, 3, 4];

            //act
            coreApplicationHub.load();
            coreApplicationHub.calculateTriangleArea(sides[0], sides[1], sides[2], callback);
            hubReturned.trigger("onRequestFailed", {});

            //assert
            ok(callback.calledOnce, "callback should have called for calculateTriangleArea failed");

            signalRServiceConnectorStub.load.restore();
            signalRServiceConnectorStub.executeRequestedAction.restore();
        });

        testFixture.functionExists("findMostCommonNumbers");
        testFixture.registerTest("test that findMostCommonNumbers calls execute on connector", function (coreApplicationHub) {
            //arrange
            sinon.spy(signalRServiceConnectorStub, "executeRequestedAction");
            var callback = sinon.spy();
            var numbers = [1, 2, 3, 5, 6, 7, 1, 2, 5];

            //act
            coreApplicationHub.findMostCommonNumbers(numbers, callback);

            //assert
            ok(signalRServiceConnectorStub.executeRequestedAction.calledOnce, "executeRequestedAction should have been called for findMostCommonNumbers");
            if (signalRServiceConnectorStub.executeRequestedAction.called) {
                var args = signalRServiceConnectorStub.executeRequestedAction.args[0];
                equal(args[0], "FindMostCommonNumbers", "FindMostCommonNumbers command sent as executeRequestedAction");
                equal(args[1], numbers, "numbers sent for getDivisorsForNumber");
            }
            signalRServiceConnectorStub.executeRequestedAction.restore();
        });


        testFixture.registerTest("test that findMostCommonNumbers calls execute on connector", function (coreApplicationHub) {
            //arrange
            sinon.stub(signalRServiceConnectorStub, "load");
            var hubReturned = $("<div>");
            signalRServiceConnectorStub.load.returns(hubReturned);
            sinon.spy(signalRServiceConnectorStub, "executeRequestedAction");
            var callback = sinon.spy();
            var numbers = [1, 2, 3, 5, 6, 7, 1, 2, 5];

            //act
            coreApplicationHub.load();
            coreApplicationHub.findMostCommonNumbers(numbers, callback);
            hubReturned.trigger("onRequestFailed", {});

            //assert
            ok(callback.calledOnce, "callback should have called for findMostCommonNumbers failed");

            signalRServiceConnectorStub.load.restore();
            signalRServiceConnectorStub.executeRequestedAction.restore();
        });

        testFixture.start();
    });