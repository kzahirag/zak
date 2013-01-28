define([
		'app',
		"jquery",
		"backbone",
		"marionette",
		"regionmanager",
		"zak",
		'models/block',
		'controllers/mainmodalcontroller',
		'views/modal/mainmodalview',
		
		//Plugin
		'plugins/zakmenu'
], function(
		App,
		$,
		Backbone,
		Marionette,
		RegionManager,
		zak,
		Block,
		MainModalController,
		MainModalView
) {
	
	//var BlockView = Backbone.Marionette.ItemView.extend({
	var BlockView = Backbone.View.extend({	
		className: 'well',
		tagName: "div",
		 
		events: {
			'mouseover': 'listener',
			'mouseout': 'removeCss'
			//',click': 'openModal'
		},
		
		openModal: function(e){
			console.log('init mmv');
			new MainModalView().render();
		//	new MainModalController();
			var target = e.target || e.srcElement;
		
			var pos = $(target).offset();
			console.log(e.pageX);
			console.log(e.pageY);
			console.log(pos);
			var x = e.pageX - target.offsetLeft;
			var y = e.pageY - target.offsetTop;
			
			$('#mainmodalregion').css({position:"absolute", top:e.pageX+"px", left:e.pageY+"px"});	      
		},
		
		initialize: function() {
			_.bindAll(this, 'render', 'listener', 'initBlocks', 'initJJMenu');
			
			// bind the model change to re-render this view
			//this.model.on('change', this.render, this);
			this.render();	
			
			this.initJJMenu();
			
			console.log('BlockView');
		},
		
		render: function(){
			var mhm = 'mm';
			if(this.model != null){
				console.log(this.model);
				console.log(this.model.get('name'));
				this.$el.html(this.model.get('name'));
				mhm = this.model.get('name');
				console.log(mhm);
			}
			this.$el.html(mhm);
		},
		
		listener: function(e) {
			var target = e.target || e.srcElement;
			$(target).addClass('hoverBlock');		
		},
		
		removeCss: function(e){
			var target = e.target || e.srcElement;
			$(target).removeClass('hoverBlock');
		},
		
		initJJMenu: function() {
			
			var options = [
			//{title:"Menu", customClass:"nav-header"}, 
			{title:"Add Module to Block ''", customClass:"addBlock", action:{type:"zak",callback:"modal"}},
			{title:"Edit Block"},
			{title:"Menu Item 3 - submenu", type:"sub", src:[{title:"Submenu 1"},{title:"Submenu 2"},{title:"Submenu 3"}, {title:"Submenu 4 - submenu", type:"sub", src:[{title:"SubSubmenu 1"},{title:"SubSubmenu 2"}]}]},
			{title:"Menu Item 4 - Js function", action:{type:"fn",callback:"(function(){ alert('THIS IS THE TEST');  })"}}
			];
			
			$(".well").zakmenu("click", options, {}, {show:"fadeIn", xposition:"mouse", yposition:"mouse"});
			
		},
		
		initModal: function(){
			//var cb = (function(){ initModal(); })
			alert('lol');
		},

		initBlocks: function() {	
			var $block = $('.block');
			for(var i =0; i < $block.length; i++){
				var block = new Block({
					name : 'block'+i,
					desc : 'description'+i
				});
				//console.log($block[i]);
				var blockview = new BlockView({model: block, el: this, tagName: this.tagName});		
			}
		}	
	});

	return BlockView;
});