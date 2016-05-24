requirejs(["jquery", "core/js/jsUtils", "knockout", "core/js/viewModels/pageViewModel", "core/js/string", "core/js/jqPlugin"], function ($, jsUtils, ko, PageViewModel) {
	 var pageViewModel = new PageViewModel();	
	 ko.applyBindings(pageViewModel);

	 var errorMessageTimeout = 1000;

     var onRequestFailedCallback = function(Error){
        jsUtils.displayMessage(Error, "error", errorMessageTimeout);
     };

	 $("#req2Submit").click(function(){
	 	var input = $("#req2Input").val();
	 	pageViewModel.divisors('');
	 	if(jsUtils.isStringBlank(input) || input <= 0){
	 		jsUtils.displayMessage("Please enter a positive number", "error", errorMessageTimeout);
	 		$("#req2Input").val('');
	 		return;	
	 	}	 	
	 	pageViewModel.getDivisorsForNumber(input, onRequestFailedCallback);
	 });

	 $("#req3Submit").click(function(){
	 	var input = $("#req3Input").val()
	 	var sides = input.split(',');
	 	pageViewModel.area('');
	 	if(jsUtils.isStringBlank(input) || sides.length != 3 || !jsUtils.isIntegerArray(sides))
	 	{
	 		jsUtils.displayMessage("Please enter 3 integers for triangle sides", "error", errorMessageTimeout);
	 		$("#req3Input").val('');
	 		return;	
	 	}	 	
	 	pageViewModel.calculateTriangleArea(sides[0],sides[1],sides[2], onRequestFailedCallback);
	 });

	 $("#req4Submit").click(function(){
	 	var input = $("#req4Input").val();
	 	var numbers = input.split(',');
	 	pageViewModel.mostCommonNumbers([]);
	 	if(jsUtils.isStringBlank(input) || !jsUtils.isIntegerArray(numbers))
	 	{
	 		jsUtils.displayMessage("Please enter integers to find most common numbers", "error", errorMessageTimeout);
	 		$("#req4Input").val('');
	 		return;	
	 	}	 	
	 	pageViewModel.findMostCommonNumbers(numbers, onRequestFailedCallback);
	 });

	 $("#req5StartsWithInput").keyup(function(){
	 	var sampleString = $("#req5Input").val();
	 	var startWithString = $("#req5StartsWithInput").val();	 	
	 	$("#req5StartsWithResult").val(sampleString.startsWith(startWithString));	 	
	 });

	 $("#req5EndsWithInput").keyup(function(){
	 	var sampleString = $("#req5Input").val();
	 	var startWithString = $("#req5EndsWithInput").val();	 	
	 	$("#req5EndsWithResult").val(sampleString.endsWith(startWithString));	 	
	 });

	 $("#req6Submit").click(function(){
	 	var input = $("#req6Input").val();
	 	$("#req6Result").val(input.stripHtml());
	 });

	 $("#internalLink").attr("href","http://"+window.location.host+window.location.pathname)
	 $("a[href^=http]").openExternalLinkInNewWindow();
});
