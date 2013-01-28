define([
		"backbone",
	
		'models/block'
], function(
		Backbone,
	
		Block
) {
	
	/*
    var Blocks = Backbone.Collection.extend({
		model : Block
	});
	*/
//console.log(Block);
/*
	var Blocks = Backbone.Collection.extend({
		model : function(attrs, options) {
			return Block.create(attrs, options);
		}
	});
	*/
	var Blocks = null;
	
	return Blocks;
});	