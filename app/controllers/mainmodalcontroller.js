define([
  'app',
  'jquery',
  'backbone',
  'marionette',
  'layoutmanager',
  'regionmanager',
  'bootstrap',
  'views/modal/mainmodalview'
  
], function(App, $, Backbone, Marionette, LayoutManager, RegionManager, bootstrap, MainModalView) {
  'use strict';

  var MainModalController = Marionette.Controller.extend({
	  
	  initialize: function(){
		
		 // var region = RegionManager.initRegion('#mainmodalregion'); 	  
		/*  
		  App.addRegions({
			  regionMainModal: RegionManager.initRegion('#mainmodalregion')
		  });
		  App.regionMainModal.show(new MainModalView());
		  */
		 //new MainModalView().render();
	  }
    
  });

  return MainModalController;

});