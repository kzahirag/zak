define([
		"jquery",
		"backbone",
		"marionette",
		'views/article/articleview',
		'text!views/menu/edit.html'
], function(
		$,
		Backbone,
		Marionette,
		ArticleView//,
	//	EditView
) {
	
	var EditmodeView = Marionette.ItemView.extend({
		//template: EditView,
		//className: "divider",
		
		events: {
			'click': 'editMode'
		},
		
		initialize: function() { 
			console.log('articleview');
			_.bindAll(this, 'render', 'editMode');
			//this.render();
		},
		
		render: function() {
			console.log(this.$el);
			$(this.el).html('<i class="icon-wrench"></i> Edit');
			return this;
		},
		
	     /*
		onRender:function () {
			$(this.el).html('hh');
			return this;
		},
		*/
		editMode: function(ev){
			
			//remove edit link in admin console
			$(this.el).parent().remove();
			
			//console.log('edit Mode');
			var av = new ArticleView();
			av.initEtch();
		}
		
	});

	return EditmodeView;
});