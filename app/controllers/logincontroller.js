define([
  'app',
  'backbone',
  'marionette',
  'layoutmanager',
  'regionmanager',
  'appmanager',
  "views/login/loginview",
  "views/login/logintextview"
  
], function(App, Backbone, Marionette, LayoutManager, RegionManager, AppManager, LoginView, LoginTextView) {
  'use strict';

  var LoginController = Marionette.Controller.extend({
	  
	  initialize: function(){
		
		 
		  var region = RegionManager.initDummyRegion(); 	  
		  App.addRegions({regionLogin: region});
		  App.regionLogin.show(new LoginView());	
		  
		  var region = RegionManager.initDummyRegion(); 	
		  App.addRegions({regionLogin2: region});
		  App.regionLogin2.show(new LoginView());	
		  
		  //App.regionMain.show(new LoginView());	
		  
		  var region = RegionManager.initDummyRegion(); 	
		  App.addRegions({regionLoginText: region});
		  App.regionLoginText.show(new LoginTextView());	
		  
		  var region = RegionManager.initDummyRegion(); 	
		  App.addRegions({regionLoginText: region});
		  App.regionLoginText.show(new LoginTextView());	
		  
		  AppManager.init(new LoginTextView());
		  
		  AppManager.init(new LoginView());
		//  this.addTests();
		  this.getTests();
		  
		  $('.form-signin').append('<a id="addTests" href="#">Add</a>');
		  /*
		  $('#addTests').click(function(){
			this.addTests();
		  });
		  	  */
	  },
	  
	  addTests: function(){
		  $.ajax({
			  type: 'POST',
			  contentType: 'application/json',
			  url: 'api/tests',
			  dataType: "json",
			  data: this.formToJSON(),
			  success: function(data, textStatus, jqXHR){
				  alert('Tests created successfully');
				  
			  },
			  error: function(jqXHR, textStatus, errorThrown){
				  alert('addTests error: ' + textStatus);
			  }
			  
		  });
	  },
	  
	  
	  getTests: function(){
		  $.ajax({
			  type: 'GET',
			  // url: rootURL,
			  //  url: 'http://localhost/zak3/api/tests',
			  url: 'api/tests',
			  dataType: "json", 
			  success: function(data) {
				  console.log(data);
				  console.log(data.test);
				  for(var i=0; i<data.test.length; i++) { 
					  $('.form-signin').append('<li style="color:blue;">'+data.test[i].name+'</li>');
				  }
				  //alert('Success.');
			  }
		  });
	  },
	  
	 
	 formToJSON: function() {
		  var s = JSON.stringify({
			  "name": 'klaus', 
			  "desc": 'zahir'
		  });
		  console.log(s);
		  return s;
	  }
    
  });

  return LoginController;

});