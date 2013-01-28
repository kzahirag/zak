define([
  'app',
  'backbone',
  'marionette',
  'layoutmanager',
  'regionmanager',
  'views/block/blockview',
  'views/block/blocktextview'
  
], function(App, Backbone, Marionette, LayoutManager, RegionManager, 	BlockView, BlockTextView) {
  'use strict';

  var BlockController = Marionette.Controller.extend({
	  
	  initialize: function(){
		
		  var region = Marionette.Region.extend({
			  el: '.block'
		  });		
		  
		  App.addRegions({
			  regionBlock: region
		  }); 
		  
		  var blockview = new BlockView();
		  App.regionBlock.show(blockview);
		  blockview.initBlocks();
	
		  //App.regionBlock.show(new BlockTextView());
		 // 
		 
		  var regionWell = RegionManager.initRegion('.well'); 	  
		  
		  App.addRegions({
			  regionWell: regionWell
		  });
		  
		//  App.regionWell.show(new BlockTextView());
	  },
	  
	  listener: function() {
		
		$('#moduletext').click(function(){
			var moduletext = "<div class='column' id='column1'>"+
			"<div class='dragbox' id='item1' >"+
			"<h2>Handle 1</h2>"+
			"<div class='dragbox-content' >"+
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit."+ 
			"</div>"+
			"</div></div>";
			//$('.well').html(moduletext);
		});
		
	  }
    
  });

  return BlockController;

});