define([
    "core/js/string"
],
    function () {
        "use strict";
        module("string extension tests");

        var stringStartsWithTest = function (testDescription, sampleString, input, expectedOutput) {
            test(testDescription, function () {
                var returnedValue = sampleString.startsWith(input);
                //assert
                equal(returnedValue, expectedOutput);
            });
        }

        stringStartsWithTest("hand the dj should startsWith ''", "hang the dj", "", true);
        stringStartsWithTest("hand the dj should startsWith hang", "hang the dj", "hang", true);
        stringStartsWithTest("hand the dj should startsWith hang the", "hang the dj", "hang the", true);
        stringStartsWithTest("hand the dj should startsWith hang the dj", "hang the dj", "hang the dj", true);
        stringStartsWithTest("hand the dj should not startsWith hanga", "hang the dj", "hanga", false);
        stringStartsWithTest("hand the dj should not startsWith Hang", "hang the dj", "Hang", false);
        stringStartsWithTest("hand the dj should not startsWith I've got a room for rent", "hang the dj", "I've got a room for rent", false);        
        stringStartsWithTest("hand the dj should not startsWith 42", "hang the dj", 42, false);
        stringStartsWithTest("hand the dj should not startsWith {first: 'johnny'}", "hang the dj", { first: "johnny" }, false);

        var stringEndsWithTest = function (testDescription, sampleString, input, expectedOutput) {
            test(testDescription, function () {
                var returnedValue = sampleString.endsWith(input);
                //assert
                equal(returnedValue, expectedOutput);
            });
        }

        stringEndsWithTest("hand the dj should endsWith ''", "hang the dj", "", true);
        stringEndsWithTest("hand the dj should endsWith dj", "hang the dj", "dj", true);
        stringEndsWithTest("hand the dj should endsWith the dj", "hang the dj", "the dj", true);
        stringEndsWithTest("hand the dj should endsWith e dj", "hang the dj", "e dj", true);
        stringEndsWithTest("hand the dj should endsWith j", "hang the dj", "j", true);
        stringEndsWithTest("hand the dj should endsWith hang the dj", "hang the dj", "hang the dj", true);
        stringEndsWithTest("hand the dj should not endsWith panic on the streets", "hang the dj", "panic on the streets", false);
        stringEndsWithTest("hand the dj should not startsWith 42", "hang the dj", 42, false);
        stringEndsWithTest("hand the dj should not startsWith {first: 'johnny'}", "hang the dj", { first: "johnny" }, false);
        
        var stringStripHtmlTest = function (testDescription, input, expectedOutput) {
            test(testDescription, function () {
                var returnedValue = input.stripHtml();
                //assert
                equal(returnedValue, expectedOutput);
            });
        }

        stringStripHtmlTest("All html/xml tags should be removed", "<label for='req2Result'>RESULT: </label>", "RESULT: ");
        stringStripHtmlTest("All html/xml tags should be removed", "<p>Shoplifters of the World <em>Unite</em>!</p>", "Shoplifters of the World Unite!");
        stringStripHtmlTest("Notmal text and symbols shoud not be removed", "1 &lt; 2", "1 &lt; 2");
        stringStripHtmlTest("Notmal text and symbols shoud not be removed", "test whether &nbsp;&nbsp; 1 %gt; 2", "test whether &nbsp;&nbsp; 1 %gt; 2");

    });