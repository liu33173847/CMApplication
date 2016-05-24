/**************************************************************************
 Copyright 2014 Honeywell International Sàrl
 **************************************************************************/
define(["jquery", "core/js/logger"], function ($, Logger) {
    "use strict";
    function SignalRHubAdapter(hubProxy) {

        var _logger = new Logger({ name: "SignalRHubAdapter", info: false });

        var _callbacks = {};
        function storeWrappedCallback(eventName, callback, wrappedCallback) {
            _callbacks[eventName] = _callbacks[eventName] || [];
            var list = _callbacks[eventName];
            list.push({callback: callback, wrappedCallback: wrappedCallback});
        }

        function getWrappedCallback (eventName, callback) {
            var list = _callbacks[eventName];
            if (list === undefined)
                return null;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.callback === callback) {
                    return item.wrappedCallback;
                }
            }
            return null;
        }

        function removeWrappedCallback (eventName, callback) {
            var list = _callbacks[eventName];
            if (list === undefined)
                return;
            _callbacks[eventName] = $.grep(list, function (item) {
                return item.callback !== callback;
            });
        }

        return {
            on: function (eventName, callback) {
                var wrappedCallback = getWrappedCallback(eventName, callback);
                if (wrappedCallback === null) {
                    wrappedCallback = function () {
                        try {
                            callback.apply(this, arguments);
                        } catch (e) {
                            _logger.logError(e);
                        }
                    }
                }
                hubProxy.on(eventName, wrappedCallback);
                storeWrappedCallback(eventName, callback, wrappedCallback);
            },
            off: function (eventName, callback) {
                var wrappedCallback = getWrappedCallback(eventName, callback);
                if (wrappedCallback !== null) {
                    hubProxy.off(eventName, wrappedCallback);
                    removeWrappedCallback(eventName, callback);
                }
            },
            invoke: function () {
                return hubProxy.invoke.apply(hubProxy, arguments);
            },
            unload: function () {
                $.each(_callbacks, function (eventName, list) {
                    $.each(list, function (i, item) {
                        hubProxy.off(eventName, item.wrappedCallback);
                    });
                });

            }
        }
    }
    return SignalRHubAdapter;
});