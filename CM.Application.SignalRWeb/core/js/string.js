define([], function () {
	// from ECMAScript 6 specification
	// link:https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
	String.prototype.startsWith = function(searchString, position){
  		position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };

	// from ECMAScript 6 specification
	// link:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };

  String.prototype.stripHtml = function() { 
  		return this.replace(/<.+?>/g, ''); 
  };
});