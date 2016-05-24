define([
    "tests/libs/Squire/0.1.0/Squire",
    "tests/libs/testFixture/testFixture",
    "tests/stubs/knockoutStub",
    "tests/stubs/coreApplicationHubStub",
    "jquery"
],
    function (Squire, TestFixture, koStub, coreApplicationHubStub, $) {
        "use strict";
        var testFixture = new TestFixture();

        var callbackStub = new function () { };

        testFixture.registerModule("pageViewModel tests", "core/js/viewModels/pageViewModel",
        {
            "knockout": koStub,
            "core/js/signalRConnection/coreApplicationHub": Squire.Helpers.constructs(coreApplicationHubStub)
        });

        testFixture.registerConstructorTest("test that I can instantiate pageViewModel", function (PageViewModel) {
            //arrange

            //act
            var pageViewModel = new PageViewModel();
            //assert
            ok(pageViewModel, "it should be a valid object..");
        });


        testFixture.functionExists("getDivisorsForNumber");
        testFixture.registerTest("test that getDivisorsForNumber calls execute on coreApplicationHubStub", function (pageViewModel) {
            //arrange
            sinon.spy(coreApplicationHubStub, "getDivisorsForNumber");
            var number = 60;

            //act
            pageViewModel.getDivisorsForNumber(number, callbackStub);

            //assert
            ok(coreApplicationHubStub.getDivisorsForNumber.calledOnce, "getDivisorsForNumber should have been called once");
            if (coreApplicationHubStub.getDivisorsForNumber.called) {
                var args = coreApplicationHubStub.getDivisorsForNumber.args[0];
                equal(args[0], number, "number sent for getDivisorsForNumber");
                equal(args[1], callbackStub, "callback sent for getDivisorsForNumber");
            }
            coreApplicationHubStub.getDivisorsForNumber.restore();
        });


        testFixture.functionExists("calculateTriangleArea");
        testFixture.registerTest("test that calculateTriangleArea calls execute on coreApplicationHubStub", function (pageViewModel) {
            //arrange
            sinon.spy(coreApplicationHubStub, "calculateTriangleArea");
            var sides = [2, 3, 4];

            //act
            pageViewModel.calculateTriangleArea(sides[0], sides[1], sides[2], callbackStub);

            //assert
            ok(coreApplicationHubStub.calculateTriangleArea.calledOnce, "calculateTriangleArea should have been called once");
            if (coreApplicationHubStub.calculateTriangleArea.called) {
                var args = coreApplicationHubStub.calculateTriangleArea.args[0];
                equal(args[0], sides[0], "sideA sent for calculateTriangleArea");
                equal(args[1], sides[1], "sideB sent for calculateTriangleArea");
                equal(args[2], sides[2], "sideC sent for calculateTriangleArea");
                equal(args[3], callbackStub, "callback sent for calculateTriangleArea");
            }
            coreApplicationHubStub.calculateTriangleArea.restore();
        });

        testFixture.functionExists("findMostCommonNumbers");
        testFixture.registerTest("test that findMostCommonNumbers calls execute on coreApplicationHubStub", function (pageViewModel) {
            //arrange
            sinon.spy(coreApplicationHubStub, "findMostCommonNumbers");
            var numbers = [1, 2, 3, 5, 6, 7, 1, 2, 5];

            //act
            pageViewModel.findMostCommonNumbers(numbers, callbackStub);

            //assert
            ok(coreApplicationHubStub.findMostCommonNumbers.calledOnce, "findMostCommonNumbers should have been called once");
            if (coreApplicationHubStub.findMostCommonNumbers.called) {
                var args = coreApplicationHubStub.findMostCommonNumbers.args[0];
                equal(args[0], numbers, "numbers sent for getDivisorsForNumber");
                equal(args[1], callbackStub, "callback sent for getDivisorsForNumber");
            }
            coreApplicationHubStub.findMostCommonNumbers.restore();
        });

        testFixture.start();
    });