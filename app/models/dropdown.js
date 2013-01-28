define([
		"backbone"
], function(
		Backbone
) {
	
    var DropDown = Backbone.Model.extend({
		defaults: {
			name: 'Default Title',
			href: '#',
			image: ''
		}
	});
	
	return DropDown;
});	