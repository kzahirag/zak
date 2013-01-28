define([
  'app',
  'jquery',
  'backbone',
  'marionette',
  'layoutmanager',
  'regionmanager',
  'bootstrap',
  'views/modal/modalview'
  
], function(App, $, Backbone, Marionette, LayoutManager, RegionManager, bootstrap, ModalView) {
  'use strict';

  var ModalController = Marionette.Controller.extend({
	  
	  initialize: function(){
		
		  var ModalRegion = Backbone.Marionette.Region.extend({
			/*
			  el: "#modal",
			  
			  constructor: function(){
				  _.bindAll(this);
				  Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
				  console.log('super');
				  this.on("show", this.showModal, this);
			  },
			  
			  getEl: function(selector){
				  var $el = $(selector);
				  $el.on("hidden", this.close);
				  return $el;
			  },
			  
			  showModal: function(modalview){
				  modalview.on("close", this.hideModal, this);
				  this.$el.modal('show');
			  },
			  
			  hideModal: function(){
				  this.$el.modal('hide');
			  }
			  */
		  });
		/*
		  var region = RegionManager.initRegion('#modal'); 	  
		  
		  App.addRegions({
			  //regionModal: ModalRegion
			  regionModal: region
		  });
		  */
		  $('#modalbtn').click(function(){
				var modalview = new ModalView();
				modalview.render();
		  });
		
		  //App.regionModal.show(modalview);
		  
	  }
    
  });

  return ModalController;

});