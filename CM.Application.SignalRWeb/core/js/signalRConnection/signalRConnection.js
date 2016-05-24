/**************************************************************************
 Copyright 2014 Honeywell International Sàrl
 **************************************************************************/
define(["knockout", "jquery",
    "core/js/uriUtility",
    "core/js/jsUtils",
    "core/js/logger",
    "core/js/signalRConnection/signalRConnectionList",
    "core/js/signalRConnection/signalRHubAdapter",
    "signalR",
    "jquery.cookie"],
    function (ko, $, UriUtility, jsUtils, Logger, SignalRConnectionList, SignalRHubAdapter) {

        "use strict";

        var SignalRConnection = function () {

            var _logger = new Logger({ name: "SignalRConnection", info: false });

            var moduleName = "SignalRConnection";
            var _connectionCache = {};
            var _uriUtility = new UriUtility();
            var _signalRConnectionList = new SignalRConnectionList();

            var _states = {
                "connecting": $.signalR.connectionState.connecting,
                "connected": $.signalR.connectionState.connected,
                "disconnected": $.signalR.connectionState.disconnected,
                "reconnecting": $.signalR.connectionState.reconnecting
            }

            function getOrCreateConnectionCache(hubUrl) {
                var cleanedUrl = _uriUtility.cleanInstanceUri(hubUrl);
                var cache = _connectionCache[cleanedUrl];
                if (jsUtils.isNullOrUndefined(cache)) {
                    _logger.logInfo(moduleName + ": creating " + hubUrl);
                    var hubConnection = $.hubConnection(hubUrl);
                    cache = {
                        connection: hubConnection,
                        hubs: {}
                    };
                    _connectionCache[cleanedUrl] = cache;
                }
                return cache;
            }

            function createHubProxyIfNotExists(connectionCache, hubName) {
                hubName = hubName.toLowerCase();
                var connection = connectionCache.connection;
                var hubs = connectionCache.hubs;
                var cachedHub = hubs[hubName];
                if (jsUtils.isNullOrUndefined(cachedHub)) {
                    var hubProxy = connection.createHubProxy(hubName);

                    var onServiceConnectionLost = function () {
                        hubProxy.serviceConnectionState = _states.disconnected;
                    };

                    bindHubEvent(hubProxy, "onServiceConnectionLost", onServiceConnectionLost);
                    
                    hubs[hubName] = {
                        "hubProxy": hubProxy,
                        "serviceConnectionState": _states.connected,
                        "onServiceConnectionLost": onServiceConnectionLost
                    };
                }
            }

            function getCache(hubUrl) {
                var cleanedUrl = _uriUtility.cleanInstanceUri(hubUrl);
                var cache = _connectionCache[cleanedUrl];
                if (jsUtils.isNullOrUndefined(cache)) {
                    _logger.logError(moduleName + ":get cache object not found for url: " + hubUrl + " which was searched as: " + cleanedUrl);
                    return null;
                }
                return cache;
            }
            var bindHubEvent = function (hub, eventName, callback) {
                if (jsUtils.isNullOrUndefined(callback)) {
                    return;
                }
                hub.on(eventName, callback);
            };
            var unbindHubEvent = function (hub, eventName, callback) {
                if (jsUtils.isNullOrUndefined(callback)) {
                    return;
                }
                hub.off(eventName, callback);
            };

            var bindConnectionEvent = function (connection, eventName, callback) {
                if (jsUtils.isNullOrUndefined(callback)) {
                    return;
                }
                $(connection).bind(eventName, callback);
            };
            var unbindConnectionEvent = function (connection, eventName, callback) {
                if (jsUtils.isNullOrUndefined(callback)) {
                    return;
                }
                $(connection).unbind(eventName, callback);
            };
            var _viewModel = {
                "load": function () {
                    $.each(_signalRConnectionList.get(), function (i, hub) {
                        if (jsUtils.isNullOrUndefined(hub.hubUrl)) {
                            return;
                        }
                        var cache = getOrCreateConnectionCache(hub.hubUrl);
                        createHubProxyIfNotExists(cache, hub.hubName);
                        return;
                    });

                    $.each(_connectionCache, function (key, cache) {
                        var promiseToStart = cache.connection.start({ transport: ["webSockets", "serverSentEvents", "longPolling"] });
                        cache.startPromise = promiseToStart;
                        cache.startPromise.done(function() {
                            _logger.logError(moduleName + ": connection started " + key + " , connectionId: " + cache.connection.id);
                        });

                    });
                },
				"restart" : function(url) {
					var cache = getCache(url);
					if (!jsUtils.isNullOrUndefined(cache)) {
						cache.connection.start({ transport: ["webSockets", "serverSentEvents", "longPolling"] });
					}
				},
                "get": function (hubUrl, hubName) {
                    var cache = getCache(hubUrl);
                    if (jsUtils.isNullOrUndefined(cache)) {
                        return null;
                    }
                    hubName = hubName.toLowerCase();
                    var hub = cache.hubs[hubName];
                    if (jsUtils.isNullOrUndefined(hub)) {
                        _logger.logError(moduleName + ": get hub proxy not found for hub name: " + hubName + " on url: " + hubUrl);
                        return null;
                    }
                    return new SignalRHubAdapter(hub.hubProxy);
                },
                "subscribeToConnectionEvents": function (hubUrl, hubName, connectionEventHandler, debugName) {
                    var cache = getCache(hubUrl);
                    if (jsUtils.isNullOrUndefined(cache)) {
                        return null;
                    }
                    hubName = hubName.toLowerCase();
                    var hub = cache.hubs[hubName];
                    if (jsUtils.isNullOrUndefined(hub)) {
                        _logger.logError(moduleName + ": get hub proxy not found for hub name: " + hubName + " on url: " + hubUrl);
                        return null;
                    }
                    if (!jsUtils.isNullOrUndefined(connectionEventHandler)) {
                        cache.startPromise.done(connectionEventHandler.connected);
                        var connection = cache.connection;
                        bindConnectionEvent(connection, $.signalR.events.onStart, connectionEventHandler.connected);
                        bindConnectionEvent(connection, $.signalR.events.onReconnecting, connectionEventHandler.disconnected);
                        bindConnectionEvent(connection, $.signalR.events.onReconnect, connectionEventHandler.connected);
                        bindConnectionEvent(connection, $.signalR.events.onDisconnect, connectionEventHandler.disconnected);
                        var hubProxy = hub.hubProxy;
                        bindHubEvent(hubProxy, "onServiceConnectionLost", connectionEventHandler.serviceConnectionLost);
                        
                        if (hubProxy.serviceConnectionState === _states.disconnected && typeof connectionEventHandler.serviceConnectionLost === "function") {
                            connectionEventHandler.serviceConnectionLost();
                        }
                    }
                },
                "unsubscribeToConnectionEvents": function (hubUrl, hubName, connectionEventHandler) {
                    var cache = getCache(hubUrl);
                    if (jsUtils.isNullOrUndefined(cache)) {
                        return;
                    }
                    var connection = cache.connection;
                    unbindConnectionEvent(connection, $.signalR.events.onStart, connectionEventHandler.connected);
                    unbindConnectionEvent(connection, $.signalR.events.onReconnecting, connectionEventHandler.disconnected);
                    unbindConnectionEvent(connection, $.signalR.events.onReconnect, connectionEventHandler.connected);
                    unbindConnectionEvent(connection, $.signalR.events.onDisconnect, connectionEventHandler.disconnected);

                    hubName = hubName.toLowerCase();
                    var hub = cache.hubs[hubName];
                    if (jsUtils.isNullOrUndefined(hub)) {
                        _logger.logError("SignalRConnection:get hub proxy not found for hub name: " + hubName + " on url: " + hubUrl);
                        return;
                    }
                    var hubProxy = hub.hubProxy;

                    unbindHubEvent(hubProxy, "onServiceConnectionLost", connectionEventHandler.serviceConnectionLost);
                }
            };

            return _viewModel;
        };
        return SignalRConnection;
    });