define([
  'app',
  'backbone',
  'marionette',
  'layoutmanager'
  
], function(
	App, 
	Backbone, 
	Marionette, 
	LayoutManager
) {
	
  'use strict';

  var RegionManager = ({ 	
	
	initRegion: function(id) {
		var region = Marionette.Region.extend({
			el: id
		});
		return region;
	},
	
	initDummyRegion: function() {
		  var region = Marionette.Region.extend({
			  el: '#dummy'
		  });
		  return region;
	  }
	
  });	
	return RegionManager;
});

