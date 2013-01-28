define([
		"jquery",
		"backbone",
		"marionette"
], function(
		$,
		Backbone,
		Marionette
) {
	
	var LoginView = Backbone.Marionette.ItemView.extend({
		
		template: '#loginview',
		
		initialize: function() {
			_.bindAll(this, 'render');
			console.log('LoginView');
		},
		
		onRender: function() {
			_.bindAll(this);
			console.log('LoginView');
			console.log(this.$el);
			
			$('.form-signin').append(this.$el);
			return this;
		}
	
	});

	return LoginView;
});