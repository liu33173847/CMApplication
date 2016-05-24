define(["jquery", "signalRServiceConnector", "core/js/logger", "core/js/jsUtils"],
    function ($, SignalRServiceConnector, Logger, jsUtils) {
        "use strict";
        var CoreApplicationHub = function (options) {
            var _logger = new Logger({ name: "CoreApplicationHub", info: true });
            var defaults = {
                "applicationUrl": window.location.protocol + "//" + window.location.host + "/SignalRWeb/signalr/hubs",
                "hubName": "coreApplicationHub"
            };
            var _options = $.extend(defaults, options);
            var _signalRConnector = new SignalRServiceConnector();
            var hub;
            var _onRequestFailedCallback;
            
            var callbacks = {
                //todo: graduate to using emitter rather than this single binding: https://github.com/component/emitter/blob/master/index.js
                "onRequestFailed": function(exception) {                                        
                    _logger.logInfo(exception);
                    if (!jsUtils.isNullOrUndefined(_onRequestFailedCallback)) {
                        _onRequestFailedCallback(exception);
                    }                    
                }
            };
            return {
                "load": function () {
                    _logger.logInfo('load: ' + _options.applicationUrl + ', hubName: ' + _options.hubName);
                    hub = _signalRConnector.load(_options.applicationUrl, _options.hubName);
                    $.each(callbacks, function(eventName, eventSinkFunction) {
                        hub.on(eventName, eventSinkFunction);
                    });
                },
                "getDivisorsForNumber": function (number, onRequestFailed) {
                    _logger.logInfo("getDivisorsForNumber,number: " + number);                    
                    if (!jsUtils.isNullOrUndefined(onRequestFailed)) {
                        _onRequestFailedCallback = onRequestFailed;
                    }
                    return _signalRConnector.executeRequestedAction("GetDivisorsForNumber", number);
                },
                "calculateTriangleArea": function (sideA, sideB, sideC, onRequestFailed) {
                    _logger.logInfo("CalculateTriangleArea: sides: " + sideA + " " + sideB + " " + sideC);                    
                    if (!jsUtils.isNullOrUndefined(onRequestFailed)) {
                        _onRequestFailedCallback = onRequestFailed;
                    }
                    return _signalRConnector.executeRequestedAction("CalculateTriangleArea", sideA, sideB, sideC);
                },
                "findMostCommonNumbers": function (numbers, onRequestFailed) {
                    _logger.logInfo("findMostCommonNumbers, numbers:");
                    _logger.logInfo(numbers);
                    if (!jsUtils.isNullOrUndefined(onRequestFailed)) {
                        _onRequestFailedCallback = onRequestFailed;
                    }
                    return _signalRConnector.executeRequestedAction("FindMostCommonNumbers", numbers);
                }
            }
        };
        return CoreApplicationHub;
    });