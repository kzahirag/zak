define([
  'app',
  'backbone',
  'marionette',
  'regionmanager',
  'appmanager'
  
], function(
	App, 
	Backbone, 
	Marionette, 
	RegionManager,
	AppManager
) {
	
  'use strict';

  var AppManager = ({ 	
	
	init: function(el) {
		var region = RegionManager.initDummyRegion(); 	
		App.addRegions({regionDefault: region});
		App.regionDefault.show(el);	
		return el;
	}
	
  });	
	return AppManager;
});

