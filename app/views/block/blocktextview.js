define([
		"jquery",
		"backbone",
		"marionette"
], function(
		$,
		Backbone,
		Marionette
) {
	
	var BlockTextView = Backbone.Marionette.ItemView.extend({
	
		template: "#draggableText",
		 
		onRender: function() {
			_.bindAll(this);
			console.log('BlockTextView');
			console.log(this.$el);
			$('.well').html(this.$el);
		}
		
	});

	return BlockTextView;
});