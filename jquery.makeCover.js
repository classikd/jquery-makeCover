/*
jquery.makeCover - Small jQuery plugin which simulates background-size:cover with img tag
Copyright (C) 2016 Mehdi Ittobane

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

;(function($, window, document, undefined){

  var pluginName = "makeCover",
      defaults = {
        'positionHorizontal': 'center',
  			'positionVertical': 'center',
  			'beforeMove': null,
  			'afterMove': null
      };

  // Constructor
  Plugin = function(element, settings)
  {
      this.dom = { cover:element };
      this.settings = $.extend( {}, defaults, settings) ;
      this.defaults = defaults;
      this.name = pluginName;
      this.init();
  }

	// Prototype
  Plugin.prototype = {

    init: function() {
			this.initDOM();
      this.initResizeListener();
			this.initContainer();
			this.initCover();
      this.setNewWidth();
    },
		initDOM : function(){
			this.dom.document = $(document);
			this.dom.container = this.dom.cover.parent();
		},
		initContainer : function(){
      var styles = { overflow : 'hidden' }
      if(this.dom.container.css('position') == 'static'){
        styles.position = 'relative';
        styles.left = 0;
        styles.right = 0;
        styles.top = 0;
        styles.bottom = 0;
      }
      this.dom.container.css(styles);
		},
		initCover : function(){
      this.dom.cover.css({ position : 'absolute'});
		},
    initResizeListener : function(){
      var o = this;
      $(window).resize(function(e){
        o.setNewWidth();
      });
    },
		setNewWidth : function(){

      var o = this;

      if(o.settings.beforeResize)
         o.settings.beforeResize();

      var $c = o.dom.cover,
           cHeight = $c.height(),
           cWidth = $c.width();

      var $p = o.dom.container,
           pHeight = $p.height(),
           pWidth = $p.width();

      var cWidthNew = pWidth,
          cHeightNew = Math.round(cWidthNew * cHeight / cWidth);

      if(cHeightNew < pHeight){
       cWidthNew = Math.round(cWidthNew * pHeight / cHeightNew);
      }

      // Define CSS
      var translateX,
          translateY,
          styles = {
            width :  cWidthNew + "px", // New width
            position : 'absolute'
          };

      if(o.dom.cover[0].tagName == 'IMG'){
        styles.height = 'auto';
        styles.verticalAlign = 'middle';
        styles.maxWidth = 'initial';
      }

      switch (o.settings.positionHorizontal) {
        case "left":
          styles.left = '0';
          translateX = '0';
          break;
        case "right":
          styles.right = '0';
          translateX = '0';
          break;
        default:
          styles.left = '50%';
          translateX = '-50%';
      }

      switch (o.settings.positionVertical) {
        case "top":
          styles.top = '0';
          translateY = '0';
          break;
        case "bottom":
          styles.bottom = '0';
          translateY = '0';
          break;
        default:
          styles.top = '50%';
          translateY = '-50%';
      }

      styles.transform = 'translate('+ translateX +', '+ translateY +')';

      // Apply CSS
      $c.css(styles).addClass('mc-cover-actived');

      if(o.settings.afterResize)
         o.settings.afterResize();
		}

  };

  // Adds the plugin method to jQuery
  $.fn[pluginName] = function(settings){
      return this.each(function(){
          if(!$.data(this, "plugin_"+pluginName)){
              $.data(this, "plugin_"+pluginName,
              new Plugin($(this), settings));
          }
      });
  };

})(jQuery, window, document);
