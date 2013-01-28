define([
		"backbone",
		'supermodel',
		'collections/blocks'
], function(
		Backbone,
		Supermodel,
		Blocks
) {
	
    var Page = Supermodel.Model.extend({
		defaults: {
			id: null,
			name: 'Default Page',
			layoutId: 1,
			isEditMode: false
		},
		
		triggerEvent: function() {			
            // Triggers an test event and passes data that can be accessed in the event handler
            this.trigger("testing", { someData: "data1" });		
        }
		
	});	
	
	// Page.has().many('blocks', {
		// collection: Blocks,
		// inverse: 'page'
	// });
	
	return Page;
});	