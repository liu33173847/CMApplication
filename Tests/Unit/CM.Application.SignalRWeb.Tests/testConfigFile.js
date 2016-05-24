var testsPath = location.protocol.indexOf("http") === 0 ? "../SignalRWebTests/tests" : "../Tests/Unit/CM.Application.SignalRWeb.Tests/tests";
requirejs.config({
    paths: {
        "core": location.protocol.indexOf("http") === 0 ? "../SignalRWeb/core" : "../CM.Application.SignalRWeb/core",
        "tests": testsPath,
        
        "jquery": "core/lib/jquery/2.1.1/jquery-2.1.1.min",
        "jqueryui": "core/lib/jquery_ui/1.11.1/jquery-ui.min-1.11.1",
        "jquery.cookie": "core/lib/jquery.cookie",
        "jquery.prebind": "core/lib/jquery.prebind",
        "knockout": "core/lib/knockout/3.2.0/knockout-3.2.0",
        "signalR": "core/lib/signalr/2.2.0/jquery.signalR-2.2.0.min",
        "noty": "core/lib/noty/2.3.8/jquery.noty.packaged.min",

        "logger": "core/js/logger",
        "core/js/jsUtils": "core/js/jsUtils",
        "urlBuilder": "core/js/urlBuilder",
        "signalRConnection": "core/js/signalRConnection/signalRConnection",
        "signalRServiceConnector": "core/js/signalRConnection/signalRServiceConnector"
        
    },
    shim: {
        "jquery.prebind": {
            deps: ["jquery"]
        }
    }//,urlArgs: "bust=" + (new Date()).getTime()

});