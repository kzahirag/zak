define([
		"backbone"
], function(
		Backbone
) {
	
    var Article = Backbone.Model.extend({
		defaults: {
			title: 'Default Title',
			body: 'Default body text'
		}
	});
	
	return Article;
});	