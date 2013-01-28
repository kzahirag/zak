define([
  'app',
  'backbone',
  'marionette',
  'layoutmanager',
  'regionmanager',
  'appmanager',
  'collections/dropdowns',
  'views/menu/dropdownview'
  
], function(App, Backbone, Marionette, LayoutManager, RegionManager, AppManager, DropDowns, DropDownView) {
  'use strict';

  var MenuController = Marionette.Controller.extend({
	  
	  initialize: function(){
		
		/*
		 * Default
		 * 
		 var regions = Marionette.Region.extend({
		    el: '#edit'
		 });		
		  
		  App.addRegions({
			  regionEdit: regions
		  });
		  
		  App.regionMenu.show(LayoutManager.initAppLayout('layouts/menu', regions));	
		 */
		  //RegionManager.addRegion({regionEdit: region }); 
		  //http://stackoverflow.com/questions/1866084/javascript-function-declaration

		  
		var region = RegionManager.initRegion('#edit'); 	  
		App.addRegions({regionEdit: region});
		App.regionMenu.show(LayoutManager.initAppLayout('layouts/menu', region));	
		
		var dropdowns = new DropDowns();
		dropdowns.add([
		  { name: 'Downloads', href: '#', image:'' },
		  { name: 'go to Jamaica.', href: '#', image:'' },
		  { name: 'go to China.', href: '#', image:'' },
		  { name: 'go to Disneyland.', href: '#', image:'' }
		  ]);
		  
		AppManager.init(new DropDownView(
		  {
			  collection: dropdowns
		  }
		));
		
	  }
    
  });

  return MenuController;

});