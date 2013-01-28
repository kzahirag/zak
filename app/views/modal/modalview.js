define([
		"jquery",
		"backbone",
		"marionette"
], function(
		$,
		Backbone,
		Marionette
) {
	
	var ModalView = Backbone.Marionette.ItemView.extend({
		
		template: '#modal',
		className: 'myDlgClass2',
		
		onRender: function() {
			_.bindAll(this);
			this.$el.dialog({
				title: "My Dialog",
				modal: true,
				buttons: {
					"Ok": this.func1,
					"Cancel": this.func2
				}
			});
		},
		
		func1: function() {
			console.log("calling func1");
			this.$el.dialog("close");
		},
		
		func2: function() {
			console.log("calling func2");
			this.$el.dialog("close");
		}
	
	});

	return ModalView;
});