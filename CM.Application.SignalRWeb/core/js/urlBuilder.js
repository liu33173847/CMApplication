// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
define([], function () {
    "use strict";
    var UrlBuilder = function () {
        var defaults = {
            hubAddress: "/SignalRWeb/signalr/hubs"
    };
        return {
            getWindowLocation: function () {
                return window.location;
            },
            getApplicationUrl: function () {
                var location = this.getWindowLocation();
                return location.protocol + "//" + location.host + defaults.hubAddress;
            }
        };
    };

    return UrlBuilder;
});