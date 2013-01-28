require.config({
   urlArgs:
		"bust=" +  (new Date()).getTime(),
   
   paths: {
		jquery: '../assets/js/lib/jquery-1.8.3.min',
		jqueryui: '../assets/js/lib/jquery-ui-1.9.2.custom.min',
		bootstrap: '../assets/js/lib/bootstrap.min',
		underscore: '../assets/js/lib/lodash',//'../assets/js/lib/underscore-min',
		//underscore: '../assets/js/lib/underscore-min',
		backbone: '../assets/js/lib/backbone-min',
		etch: '../assets/js/lib/etch',
		zak: '../assets/js/lib/zak',
		fokus: '../assets/js/lib/fokus.min',
		'handlebars': '../assets/js/lib/handlebars',
	    marionette : '../assets/js/lib/backbone.marionette.min',
		text:'../assets/js/lib/text',
		supermodel:'../assets/js/lib/supermodel.min',
		jquerytogglebuttons:'../assets/js/lib/jquery.toggle.buttons',
		
		//base
		regionmanager:'base/regionmanager',
		layoutmanager:'base/layoutmanager',
		appmanager:'base/applicationmanager',
		
	    // The plugins folder contains library plugins such as jquery.cookie.
	    plugins: '../assets/js/plugins'
	  
  },
  
  shim: {
		jquery: {
			exports: '$'
		},
	    jqueryui: {
		    deps: ["jquery"] 
	    },
	   jquerytogglebuttons: {
		  deps: ['jquery']
	    },
		underscore: {
			exports: '_'
		},
		handlebars: {
			exports: 'Handlebars'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ["jquery"],
			exports: "bootstrap" 
		},
		etch : {
			deps: ["backbone", "underscore", "jquery"],
			exports: "etch"  
		},
	    zak : {
		    deps: ["backbone", "underscore", "jquery"],
		    exports: "zak"  
	    },
	    marionette : {
		  deps : ['jquery', 'underscore', 'backbone'],
		  exports : 'Marionette'
	    },
	    text: {
		   exports: 'text'
	    },
	    supermodel : {
		  deps: ['backbone', 'underscore'],
		  exports: 'Supermodel'  
	    },
	    regionmanager: {
		   exports: 'regionmanager'
	    },
	    layoutmanager: {
		    exports: 'layoutmanager'
	    },
	    appmanager: {
		    exports: 'appmanager'
	    },
	    fokus: {
		  exports: 'fokus'
	  }
  }
});

require([
   // The application.
  'app',

  // Misc.
  'router'
 ], function(App, router){
	// The "app" dependency is passed in as "App"
    App.Router = router;
	App.start();
});
  
  