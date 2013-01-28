define([
		"jquery",
		"backbone",
		"marionette"
], function(
		$,
		Backbone,
		Marionette
) {
	
	var MainModalView = Backbone.Marionette.ItemView.extend({
		
		template: '#mainmodal',
		
		initialize: function() {
			//
		},
		
		onRender: function() {
			_.bindAll(this);
			console.log('MainModalView');
			console.log(this.$el);
			console.log(this.$el[0]);
			$('#mainmodalregion').html(this.$el[0]);
			$('#mainmodalregion .dropdown-menu').css('display','block');
			
		}
	
	});

	return MainModalView;
});