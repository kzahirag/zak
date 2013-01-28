define([
		"backbone",
		'supermodel',
		'models/page'
], function(
		Backbone, Supermodel, Page
) {
	/*
    var Block = Backbone.Model.extend({
		defaults: {
			name: 'Default body text',
			desc: 'Default Title',
			source: '<div class="blocks article">'+
			'<button type="button" class="close blockminimize" data-dismiss="blockminimize" aria-hidden="true"><i class="icon-angle-down"></i></button>'+
			'<h3 class="blocks-title">Block mhm</h3>'+
			'<div class="blocks-content editable" data-button-class="all" >'+
			'<p>Sed posuere consectetur est at lobortis. Aenean eu leo quam.</p>'+
			'</div>'+
			'</div>'
		}
	});
	*/
	//console.log(Supermodel);
	//https://github.com/pathable/supermodel/issues/27
    var Block = Supermodel.Model.extend({
		
		defaults: {
			id: null,
			name: 'Default BlockText',
			desc: 'Default Desc',
			moduleId: 1,
			header: 'Block 1',
			content: 'Sed posuere consectetur est at lobortis. Aenean eu leo quam',
			regionId: 1,
			rankId: 1,
			visible: true,
			collapsed: true,
			source: '<div class="blocks article">'+
			'<button type="button" class="close blockminimize" data-dismiss="blockminimize" aria-hidden="true"><i class="icon-double-angle-down"></i></button>'+
			'<button type="button" class="close blockclose" data-dismiss="blockclose" aria-hidden="true"><i class="icon-remove"></i></button>'+
			'<h3 class="blocks-title"></h3>'+
			'<div class="blocks-content editable" data-button-class="all" >'+
			'<p></p>'+
		    '</div>'+
			'</div>'
		
		},
		
		toString: function(){

			//var b = this.models;

			_.forEach(this, function(item) {
				console.log('id =>'+item.get('id') +';name '+item.get('name') +';name '+item.get('id')  +';name '+item.get('id') +';name '+item.get('id') +';name '+item.get('id') +';name '+item.get('id') +';name '+item.get('id'));
				
			});
		}
		
			
	});	
	
	// Block.has().one('page', {
		// model: Page,
		// inverse: 'blocks'
	// });
	
	return Block;
});	