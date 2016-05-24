// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
define([], function () {
    "use strict";
    var toBeRemoved = /[#\.,\/\\:]/g,
        toBeReplacedByUnserscore = /-/g,
        emptyString = "",
        underscore = "_";

    var uriUtility = function() {
        
        return {
            cleanInstanceUri: function (uriInput) {
                var uri = uriInput || "";
                return uri.replace(toBeRemoved, emptyString).replace(toBeReplacedByUnserscore, underscore).toLowerCase();
            }
        };
    };
    return uriUtility;
});