define(["jquery",
    "knockout",
    "core/js/signalRConnection/coreApplicationHub"],
    function ($, ko, CoreApplicationHub) {
        "use strict";
        
        var coreApplicationHub = new CoreApplicationHub();
		coreApplicationHub.load();

        var PageViewModel = function() {

            var divisors = ko.observable();
            var area = ko.observable();
            var mostCommonNumbers = ko.observableArray();
            
            return {
                divisors: divisors,
                area: area,
                mostCommonNumbers: mostCommonNumbers,
                getDivisorsForNumber: function (number, callback){                
                    coreApplicationHub.getDivisorsForNumber(number, callback).done(function(result){
                        divisors(result);
                    });
                },
                calculateTriangleArea: function (sideA, sideB, sideC, callback){                
                    coreApplicationHub.calculateTriangleArea(sideA, sideB, sideC, callback).done(function(result){
                        area(result);
                    });
                },
                findMostCommonNumbers: function (numbers, callback){             
                    coreApplicationHub.findMostCommonNumbers(numbers, callback).done(function(result){
                        mostCommonNumbers(result);
                    });
                }
            }

        };
        return PageViewModel;
    });