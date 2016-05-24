// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
define(["core/js/formats","knockout", "noty"], function (formats, ko, noty) {
    "use strict";
    
    var utils = {
        isNullOrUndefined: function (obj) {
            return obj === undefined || obj === null;
        },
        isStringNullUndefinedOrEmpty: function (str) {
            return (this.isNullOrUndefined(str) || /^\s*$/.test(str));
        },
        isStringBlank: function (str) {
            return (/^\s*$/.test(str));
        },
        isInteger: function (val) {
            if ((parseFloat(val) == parseInt(val)) && !isNaN(val))
                return true;
            else
                return false;
        },
        isIntegerArray: function (vals) {
            for (var i = 0; i < vals.length; i++) {
                if (!this.isInteger(vals[i])) {
                    return false;
                }                
            }
            return true;
        },
        removeFromArray: function (item, array) {
            var itemIndex = array.indexOf(item);
            if (itemIndex !== -1) {
                array.splice(itemIndex, 1);
            }
        },
        displayMessage : function(text, type, timeout){
            noty({
                text: text,
                timeout: timeout == undefined ? 500 : timeout,
                type: type == undefined ? "information" : type,
                dismissQueue: true,
                layout: "top",
                theme: "defaultTheme"
            });
        }
    };
    return utils;
});