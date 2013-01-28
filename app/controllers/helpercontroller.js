define([
  'app',
  'backbone',
  'marionette',
  'layoutmanager',
  'regionmanager'
  
], function(App, Backbone, Marionette, LayoutManager, RegionManager) {
  'use strict';

  var HelperController = Marionette.Controller.extend({
	  
	  initialize: function(){
		
		  var region = RegionManager.initRegion('#helper'); 	  
		  App.addRegions({regionHelper: region});
		  App.regionHelper.show(LayoutManager.initAppLayout('helper', region));	
		  
	  }
    
  });

  return HelperController;

});