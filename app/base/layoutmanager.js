																																								define([
	"backbone",
	'marionette',
	'../assets/js/plugins/backbone.marionette.render',
	'regionmanager',
	'app'
]
, function(
		Backbone,
		Marionette,
		Renderer,
		RegionManager,
		App
	) {
		
	var LayoutManager = ({ 	
	
		initAppLayout: function(template) {
			
			var AppLayout = Backbone.Marionette.Layout.extend({
				template: template
			});
			
			var layout = new AppLayout();
			return layout;		
		},
		
		initAppLayout: function(template, region) { 
			
			var AppLayout = Backbone.Marionette.Layout.extend({
				template: template,
				regions: region
			});
			
			var layout = new AppLayout();	
			return layout;
		}
		
	});	
	return LayoutManager;
});