requirejs.config({
    paths: {
        /*Note:  This file must contain third party file references or redirects for third party references only.. */
        "main": "app/js/main",        
        "jquery": "core/lib/jquery/1.11/jquery-1.11.2.min",
        "jqueryui": "core/lib/jquery_ui/1.11.1/jquery-ui.min-1.11.1",
        "jquery.cookie": "core/lib/jquery.cookie",
        "knockout": "core/lib/knockout/3.2.0/knockout-3.2.0",
        "signalR": "core/lib/signalr/2.2.0/jquery.signalR-2.2.0.min",
        "komapping": "core/lib/knockout.mapping/2.4.1/knockout.mapping",                       
        "jquery.prebind": "core/lib/jquery.prebind",                
        "noty": "core/lib/noty/2.3.8/jquery.noty.packaged.min",
        "signalRServiceConnector": "core/js/signalRConnection/signalRServiceConnector",	
    },
    shim: {
        "komapping": {
            deps: ["knockout"],
            exports: "komapping"
        },
        "jquery.prebind": {
            deps: ["jquery"]
        },
        "jquery.timeago": {
            deps: ["jquery"]
        },
        "noty":{
            deps: ["jquery"]  
        }
    }
});