// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
define(["jquery"], function ($) {
    "use strict";
    var Logger = function (options) {

        if (!window.console) window.console = {};
        if (!window.console.log) window.console.log = function () { };
        
        var defaults = {
            error: true,
            info: false
        };
        options = $.extend(defaults, options);
        
        var logInfoFunc = function (info) {
            /* no logging done */
            return false;
        };
        var logErrorFunc = function(error) {
            /* no logging done */
            return false;
        };
        
        if (options.info === true) {
            logInfoFunc = function (info) {

                if (options.name && typeof info === "string") {
                    info = options.name + ": " + info;
                }
                console.log(info);
                return true;
            };
        }
        if (options.error === true) {
            logErrorFunc = function(e) {
                //todo: externalize the console logger and allow a on screen popup window to be used as a log destination..
                //todo: perhaps just need a service on server that this log should be sent to helping us collect logs when user enables 'log to server' functionality on screen with special key sequence(?).
                // this is to allow for enable diagnostic
                if (options.name && typeof e === "string") {
                    e = options.name + ": " + e;
                }
                console.log(e);
                return true;
            };
        }

        return {
            logError: logErrorFunc,
            logInfo: logInfoFunc
        };
    };
    return Logger;
});