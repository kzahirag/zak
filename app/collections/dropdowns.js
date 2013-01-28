define([
		"backbone",
		'models/dropdown'
], function(
		Backbone,
		DropDown
) {
	
    var DropDowns = Backbone.Collection.extend({
		model : DropDown
	});
	
	return DropDowns;
});	