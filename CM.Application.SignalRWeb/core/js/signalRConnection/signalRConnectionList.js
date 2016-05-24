define(["core/js/urlBuilder"], function (UrlBuilder) {
    "use strict";
    var urlBuilder = new UrlBuilder();
    var applicationUrl = urlBuilder.getApplicationUrl();

    var connectionList = [
    {
        "hubUrl": applicationUrl,
        "hubName": "CoreApplicationHub"
    }
    ];
    var SignalRConnectionList = function() {
        return{
            "get": function() {
                return connectionList;
            }
        };
    };
    return SignalRConnectionList;
});