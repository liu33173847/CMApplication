define(["core/js/formats", "core/js/logger","knockout",], function (formats, Logger,ko) {
    "use strict";

    var _logger = new Logger({ name: "jsUtils", info: false });
    var utils = {
        cloneArray: function(sourceArray) {
            return sourceArray.slice(0);
        },  
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
        format: function (str) {
            if (str === undefined || str === null) {
                return "";
            }
            var args = arguments;
            return str.toString().replace(/\{(\S+)\}/g, function (match, key) {
                var index = parseInt(key);
                if (isNaN(index)) {
                    throw new Error('invalid place holder ' + match);
                }
                return args[index + 1];
            });
        },
        formatDecimals: function (value, decimalPlaces) {
            if (isNaN(value)) return value;
            value = Number(value);
            return value.toFixed(decimalPlaces);
        }
    };
    return utils;
});