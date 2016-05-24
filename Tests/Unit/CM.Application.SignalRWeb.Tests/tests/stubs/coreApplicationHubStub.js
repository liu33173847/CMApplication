define(["jquery"], function ($) {
    var deferred = new $.Deferred();
    var coreApplicationHubStub = {
        getDivisorsForNumber: function (number, onRequestFailed) {
            return deferred;
        },
        calculateTriangleArea: function (sideA, sideB, sideC, onRequestFailed) {
            return deferred;
        },
        findMostCommonNumbers: function (numbers, onRequestFailed) {
            return deferred;
        },
        load: function () {

        }
    };
    return coreApplicationHubStub;
});