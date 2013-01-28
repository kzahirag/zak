define([
	"jquery",
	"underscore",
	"backbone",
	'marionette',
	'text',
	'supermodel',
	"etch",
	"zak",
	'fokus',
	"bootstrap",
	"handlebars",
	'../assets/js/plugins/backbone.marionette.render',
	'layoutmanager',
	'models/article',
	'views/article/articleview',
	'views/menu/editmodeview',
	'views/block/blockview',
	
	//Plugin
	"jqueryui",
	"jquerytogglebuttons"
]
, function(
		$, 
		_,
		Backbone,
		Marionette,
		text,
		Supermodel,
		etch,
		zak,
		fokus,
		bootstrap,
		Handlebars,
		Renderer,
		LayoutManager,
		Article,
		ArticleView,
		EditmodeView,
		BlockView
	) {
		
	$( "#loadingSpinner" ).hide();

		
	// set up the app instance
	// Creates a new Marionette application. 
	var App = new Marionette.Application();
	//console.log(App);
	//console.log(SuperModel);
	
	// Set up basic paths.
	App.root = '/zak3/';
	
	// Add the main region, that will hold the page layout.
	App.addRegions({
		regionMenu: '#menu',
		regionMain: '#main'
	});
	
	// Adds any methods to be run after the app was initialized.
	App.addInitializer(function() {
		App.regionMain.show(LayoutManager.initAppLayout('layouts/login'));	  
	});
	
	
	// Start backbone's history for hash navigation after the app was initialized.
	App.on('initialize:after', function() {
		Backbone.history.start({
		//	pushState: true,
		//	root: App.root
		});
	})
	
	// Returns the app object to be available to other modules through require.js.
	return App;
	 
});