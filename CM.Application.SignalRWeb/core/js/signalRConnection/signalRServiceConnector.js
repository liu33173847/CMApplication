/**************************************************************************
 Copyright 2014 Honeywell International Sàrl
 **************************************************************************/
define(['jquery', 
		'core/js/signalRConnection/signalRConnection', 
		'core/js/urlBuilder', 
		'core/js/logger', 
		'core/js/jsUtils'
],
    function ($, SignalRConnection, UrlBuilder, Logger, jsUtils) {
        'use strict';
        var signalRConnection = new SignalRConnection();
        signalRConnection.load();
        var states = {
            "connected": "connected",
            "pending": "pending",
            "disconected": "disconnected",
            "reconnecting": "reconnecting"
        };
        var estimatedReconnectWaitTimeInMilliseconds = 5000;
		
        var SignalRServiceConnector = function (debugName) {
            var _pendingRequests = [];
            var _logger = new Logger({ info: false });
            var _promiseToExecutePendingCall = new $.Deferred();
            var _pendingCall, _hubProxy, _url, _hubName, _state = states.pending;
			
            var _connectionEventHandler = {
                'connected': function () {
                    _state = states.connected;
                    if (jsUtils.isNullOrUndefined(_pendingCall) === false) {
                        try {
                            _hubProxy.invoke.apply(_hubProxy, _pendingCall).done(function (value) {
                                _promiseToExecutePendingCall.resolve(value);
                            });
                            _pendingCall = undefined;
                        } catch (e) {
                            _logger.logError(e);
                        }
                    }

                    var failedRequests = [];
                    $.each(_pendingRequests, function (i, item) {
                        try {
                            _hubProxy.invoke.apply(_hubProxy, item.arguments).done(function () {
                                item.promise.resolve();
                            });
                        } catch (e) {
                            failedRequests.push(item);
                            _logger.logError(e);
                        }
                    });

                    _pendingRequests = failedRequests;
					
                    $('html')
                        .trigger('removeMessage', "onSignalRDisconnected")
                        .trigger('removeMessage', "onSignalRReconnecting")
                        .trigger('timedDisplayMessage', ["onSignalRConnected", "success"]);
                },
                'reconnecting': function () {
                    _state = states.reconnecting;
                    $('html')
                        .trigger('removeMessage', "onSignalRConnected")
                        .trigger('removeMessage', "onSignalRDisconnected")
                        .trigger('displayMessage', ["onSignalRReconnecting", "info"]);
                },
                'disconnected': function (e) {
                    _logger.logInfo("SignalRServiceConnector:disconnected..url: " + _url + ", hubName: " + _hubName);
                    _state = states.disconected;
                    setTimeout(function () {
                        _logger.logInfo("SignalRServiceConnector:disconnected.. attempting reconnect url: " + _url + ", hubName: " + _hubName);
                        signalRConnection.restart(_url);
                    }, estimatedReconnectWaitTimeInMilliseconds);
                    $('html')
                        .trigger('removeMessage', "onSignalRConnected")
                        .trigger('removeMessage', "onSignalRReconnecting")
                        .trigger('displayMessage', ["onSignalRDisconnected", "error"]);
                }
            };

            var _executeRequest = function (args, handlerForPromise) {
                if (_state !== states.connected) {
                    return handlerForPromise(args);
                }
                try {
                    return _hubProxy.invoke.apply(_hubProxy, args);
                } catch (e) {
                    _logger.logError(e);
                    return handlerForPromise(args);
                }
            };

            var executeRequestedAction = function () {
                var makePromise = function (actionArguments) {
                    _promiseToExecutePendingCall = new $.Deferred();
                    _pendingCall = actionArguments;
                    return _promiseToExecutePendingCall;
                };
                return _executeRequest(arguments, makePromise);
            };

            var executeMandatoryRequestedAction = function () {
                var addPromise = function (actionArguments) {
                    var d = new $.Deferred();
                    _pendingRequests.push({
                        promise: d,
                        arguments: actionArguments
                    });
                    return d;
                };
                return _executeRequest(arguments, addPromise);
            };

            return {
                "load": function (url, hubName) {
                    try {
                        _hubName = hubName;
                        _url = url;
                        _hubProxy = signalRConnection.get(url, hubName);
                        signalRConnection.subscribeToConnectionEvents(url, hubName, _connectionEventHandler, debugName);
                        return _hubProxy;

                    } catch (e) {
                        _logger.logInfo('SignalRServiceConnector::load: error starting' + e);
                        _logger.logInfo(e);
                    }

                },
                "unload": function () {
                    try {
						_hubProxy.unload();
                        signalRConnection.release(_url, _connectionEventHandler);
                    } catch (e) {
                        _logger.logInfo('SignalRServiceConnector::load: error unloading' + e);
                        _logger.logInfo(e);
                    }
                },
                "state": function () {
                    return _state;
                },
                "subscribeToConnectionEvents": function (connectEventHandlerCallback) {
                    signalRConnection.subscribeToConnectionEvents(_url, _hubName, connectEventHandlerCallback);
                    _logger.logError("subscribeToConnectionEvents: current state at load: " + _state + " for : " + debugName);
                    if (_state === states.connected) {
                        connectEventHandlerCallback.connected();
                    }
                },
                "unsubscribeToConnectionEvents": function (connectEventHandlerCallback) {
                    signalRConnection.unsubscribeToConnectionEvents(_url, _hubName, connectEventHandlerCallback);
                },
                "executeRequestedAction": executeRequestedAction,
                "executeMandatoryRequestedAction": executeMandatoryRequestedAction
            };
        };
        return SignalRServiceConnector;
    });