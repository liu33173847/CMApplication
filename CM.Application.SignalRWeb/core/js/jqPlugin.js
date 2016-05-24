define(["jquery"], function ($) {
    $.fn.openExternalLinkInNewWindow = function(options) {
      var a = new RegExp('/' + window.location.host + '/')

      this.filter("a").each(function() {
          var link = $( this );
          if(!a.test(link.attr("href"))) {                
            link.click(function(event){                                      
                event.preventDefault();                   
                openLinkInNewWindow(link.attr( "href" ), options);
            });
          }            
      });

      return this;
    };

    function openLinkInNewWindow(url, options) 
    {
      if(options == undefined) options = {};
      var name = options.name == undefined ? 'New Window' : options.name;
      var width = options.width == undefined ? 800 : options.width;
      var height = options.height == undefined ? 800 : options.height;

      //default with scrollbars and resizeable, located at the centre of the window
      var specs = 'width='+width+', '+
                  'height='+height+', '+
                  'top='+(options.top == undefined ? (screen.height - height) / 2 : options.top)+', '+
                  'left='+(options.left == undefined ? (screen.width - width) / 2 : options.left)+', '+
                  'directories='+(options.directories == undefined ? 'no' : options.directories)+', '+
                  'location='+(options.location == undefined ? 'no' : options.location)+', '+
                  'menubar='+(options.menubar == undefined ? 'no' : options.menubar)+', '+
                  'resizable='+(options.resizable == undefined ? 'yes' : options.resizable)+', '+
                  'scrollbars='+(options.scrollbars == undefined ? 'yes' : options.scrollbars)+', '+
                  'status='+(options.status == undefined ? 'no' : options.status)+', '+
                  'toolbar='+(options.toolbar == undefined ? 'no' : options.toolbar);
      
      newWindow=window.open(url,'',specs);
      if (window.focus) {newWindow.focus()}      
    }
});