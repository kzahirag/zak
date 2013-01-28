define([
		"jquery",
		"backbone",
		"marionette",
		"text!views/menu/dropdownview.html"
], function(
		$,
		Backbone,
		Marionette,
		DropDownViewHTML
) {
	
	var DropDownView = Marionette.ItemView.extend({
		template: 'text!'+DropDownViewHTML,
		tagName: 'li',
		className: 'dropdown',
	
		initialize: function() { 
			
		},
	     
		onRender:function () {		
			//console.log(this.collection.toJSON());
	
			$('.nav').append(this.$el);
			return this;
		}
		
	});

	return DropDownView;
});