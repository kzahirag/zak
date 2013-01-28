define([

  // Libraries.
  'backbone',
  'marionette',

  // Modules.
  'controller'
  
], function(Backbone, Marionette, Controller) {
  'use strict';

  var EditController = Marionette.Controller.extend({
	  
	  initialize: function(options){
		  // store a region that will be used to show the stuff rendered by this component
		  this.mainRegion = options.mainRegion;
	  }
	  
	  // call the "show" method to get this thing on screen
	  show: function(){
		  // get the layout and show it
		  var layout = this._getLayout();
		  this.mainRegion.show(layout);
	  }	  
    
  });

  return EditController;

});