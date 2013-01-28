define([
		'app',
		"jquery",
		"backbone",
		"marionette",
		"text!views/cockpit/cockpitview.html",
		'appmanager',
		'layoutmanager',
		'views/article/articleview',
		'models/block',
		'models/page'
], function(
		App,
		$,
		Backbone,
		Marionette,
		CockpitViewHTML,
		AppManager,
		LayoutManager,
		ArticleView,
		Block,
		Page,
		
		jquerytogglebuttons
) {
	
	var CockpitView = Marionette.ItemView.extend({
		template: 'text!'+CockpitViewHTML,
		tagName: 'div',
		id: 'cockpit',
		that: null,
		_ArticleView: null,
	
	    
		events: {
			'click .cockpitmodule': 'switchMode',
			'click .layoutbtn1': 'switchLayout1',
			'click .layoutbtn2': 'switchLayout2',
			'click .layoutbtn3': 'switchLayout3',
			'click .layoutbtn4': 'switchLayout4',
			'click .btnview': 'view',
			'click .btnedit': 'edit'
		},
		
		view: function(ev){	
			that.switchMode(false);
		},
		
		edit: function(ev){	
			that.switchMode(true);
		},
		
		switchMode: function(isEdit){
			var regions = that.getRegions();
			if(regions != null){
				for(var i=0; i< regions.length; i++){
					if(isEdit){
						$(regions).addClass('blocksbox');
					}else{
						$(regions).removeClass('blocksbox');
						var block = $(regions).find('.blocks');
						var children =block.children();
						for(var i=0; i< children.length; i++){
							
						}
					}
				}
			}
			
		
		},
		
		switchLayout1: function(ev){		
			 App.regionMain.show(LayoutManager.initAppLayout('layouts/layout1'));
			 that.doDefault();
		},
		
		switchLayout2: function(ev){		
			 App.regionMain.show(LayoutManager.initAppLayout('layouts/layout2'));
			 that.doDefault();
		},
		
		switchLayout3: function(ev){		
			App.regionMain.show(LayoutManager.initAppLayout('layouts/layout3'));
			that.doDefault();
		},
		
		switchLayout4: function(ev){		
			App.regionMain.show(LayoutManager.initAppLayout('layouts/layout4'));	
			that.doDefault();
		},
		
		doDefault: function(){
			this.initDraggable();
			this.model.triggerEvent();
			
			that.initBlocks();
		},
		
		
		switchMode2: function(ev){		
			alert('ss');
			this.model.set({isEditMode : false});
			console.log(this.model);
			$('#edit').html('<i class="icon-wrench"></i> Edit');
			//$(this.el).render();
		},
		
	
		initialize: function() { 
			that = this;
			
			//this.model.bind( 'change', this.render );
			//_.bindAll(this);
		  // _.bindAll(this, 'switchMode');
		  
		  //http://gregfranko.com/blog/backbone-dot-js-convincing-the-boss-guide/
		    that.model.on("testing", this.testing);
			
			that.initBlocks();
			
	
		},
		
		initBlocks: function(){
			
			//console.log(that.model.blocks());
		
		    $('.blocksbox').empty();
			
			var blocks = that.model.blocks().models;
	
			if(blocks != null){
				//console.log(blocks);
				for(var i=0; i< blocks.length; i++){
					//console.log(blocks[i]);
					var source = blocks[i].get('source');
					
					//console.log(source);
					var name = blocks[i].get('name');
					var desc = blocks[i].get('desc');
					var header = blocks[i].get('header');
					var content = blocks[i].get('content');

					var bl = $(source).children(".blocks-title").html(header);	
					bl[0].nextSibling.firstChild.innerHTML = content;
				
					//console.log(bl);
					
					var regionId = blocks[i].get('regionId');
					var region = that.getRegion(regionId);
					region.append(bl[0].parentElement);

				}
			}
			
			that.onEvent();
		},

        testing: function(obj) {
			
            console.log("Just got " + obj.someData + " from my model!");
			
        },
		
			
		onEvent: function(){
			
			var av = AppManager.init(new ArticleView);
			_ArticleView = av;
			av.initEtch();
			
			$('button.blockminimize').click(function() {
				//console.log($( this ).find('i'));
				$( this ).find('i').toggleClass( "icon-double-angle-down" ).toggleClass( "icon-double-angle-right" );
				var block = $(this).parent().find('.blocks-content');		  
				block.toggle();		  
			});
			
			$('button.blockclose').click(function() {
				var blockId = $(this).parent().attr('data-block');		  
				// console.log(blockId);	
				var blocks = that.model.blocks();
				blocks.remove(blockId);
			    $(this).parent().remove();
				// console.log(blocks);
			});
			
			$('.blocks').hover(
			function () {
				console.log($(this));
				//$(this).addClass("hover");
				$(this).find('.blockminimize').css('display', 'block');
				$(this).find('.blockclose').css('display', 'block');
				$(this).find('h3.blocks-title').css('display', 'block');
			},
			function () {
				$(this).find('.blockminimize').css('display', 'none');
				$(this).find('.blockclose').css('display', 'none');
				$(this).find('h3.blocks-title').css('display', 'none');
			});
			
			
		},
		
		onRender:function () {		
			
			$('#menu').after(this.$el);		
			$('#edit').html('<i class="icon-wrench"></i> View');		
			this.initDraggable();
			
		
			
			$(".switch-container").on("click", ".switch", function  (e) {
				var method = $(this).hasClass("active") ? "enable" : "disable";
				
				if(method == "enable"){
					$(e.currentTarget).removeClass('active') ;
					that.switchMode(true);
					_ArticleView.enable();
				}
				else {
					$(e.currentTarget).addClass('active');
					that.switchMode(false);
					_ArticleView.disable();
				}
			
			});
			
			
			
			return this;
		},
		
		initDraggable: function(){

			$(".blocksbox").sortable({
				connectWith: '.blocksbox',
				items: '.blocks',
				handle: 'h3.blocks-title',
				placeholder: 'blocks-placer',
				forcePlaceholderSize: true,
				forceHelperSize: true,
				revert: true,
				dropOnEmpty: true,
				update: function(event, ui) { 
					//that.model.blocks().add(block);
					//console.log(that.model.blocks());
					that.updateBlockModel(event, ui);
				
					
				}
			});
			
			$('.cockpitmodule').draggable({ 
				//cursor: "crosshair",
				//connectToSortable: ".blocksbox",
				helper: "clone",
				revert: "valid" 
			});
			
			$( ".blocksbox" ).droppable({
				accept: ".cockpitmodule",
				activeClass: "cockpitactive",
			    hoverClass: "cockpithover",
			    over: function(event, ui) { 
					var region = that.getRegionInner(event);
					$(region).css('visibility','hidden');
				},
				out: function(event, ui) { 
				    var region = that.getRegionInner(event);
					$(region).css('visibility','visible');
				},
				drop: function( event, ui ) {	
					that.createPage(event);		
					var regionId = that.getTargetRegionId(event);
					that.setRankIdByRegion(regionId);
					console.log(that.model.blocks().models);
				
				}
				
			});

		},
		
		createPage: function(event){
		    var regionId = that.getTargetRegionId(event);
			var blockId = that.addBlockId();
			var block = Block.create({
					id: blockId,
					name: 'Default BlockText',
					desc: 'Default Desc',
					moduleId: 1,
					header: 'Block '+blockId,
					content: 'Sed posuere consectetur est at lobortis. Aenean eu leo quam',
					regionId: regionId,
					rankId: null,
					source: '<div class="blocks article" data-block="'+blockId+'">'+
					'<button type="button" class="close blockminimize" data-dismiss="blockminimize" aria-hidden="true"><i class="icon-double-angle-down"></i></button>'+
				    '<button type="button" class="close blockclose" data-dismiss="blockclose" aria-hidden="true"><i class="icon-remove"></i></button>'+
     				'<h3 class="blocks-title"></h3>'+
					'<div class="blocks-content editable" data-button-class="all" >'+
					'<p></p>'+
					'</div>'+
					'</div>'
				});
				
			that.model.blocks().add(block);
			//console.log('region '+regionId);
		    
		    that.initBlocks();
		},

		updateBlockModel : function(event, ui){
			//console.log(ui);
			
			var blockId = ui.item[0].dataset['block'];
			var regionId = that.getTargetRegionId(event);
			var blocks = that.model.blocks().models;
		
			//set new region for block
		    _.forEach(blocks, function(item) {
				//console.log(i);
				if(item.get('id') == blockId){
					item.set('regionId', parseInt(regionId));
				}
			});
			
			//set new order/ranking for blocks
			that.setRankIdByRegion(regionId);
		
		},
		
		setRankIdByRegion : function(regionId){
			
			var blocks = that.model.blocks().models;
			var region = that.getRegion(regionId);
			
			console.log($(region)[0].children);
			console.log($(region).children());
			
			var index = 1; 
			if($(region).children() != null){
				_.forEach($(region).children(), function(block){
					//console.log($(block));
					var blockingId = $(block)[0].dataset['block'];
					//console.log('BlockingId '+blockingId);
					//console.log(blocks);
					_.forEach(blocks, function(block) {
						//console.log(block.get('id'));
						//console.log('index '+index);
						if(block.get('id') == blockingId){
							//console.log('set '+index);
							block.set('rankId', parseInt(index));
							index++;
						}
					});
					
				});
			}
			
			console.log('-------');			
			console.log(that.model.blocks());
		},
		
		addBlockId : function(){
			var maxBlock = _.max(_.forEach(that.model.blocks().models), function(item) { return item.id; });
			return (maxBlock.get('id')+1);
			//return (that.model.blocks().length+1);
		},
		
		getTargetRegionId : function(event){
			return event.target.parentNode.dataset['region'];
		},
		
		getRegion: function(event){
			return  $('body').find("[data-region='" + that.getTargetRegionId(event) + "'] div.blocksbox");
		},
		
		getRegion: function(regionId){
			return  $('body').find("[data-region='" + regionId+ "'] div.blocksbox");
		},
		
		getRegions: function(){
			return  $('body').find("div.ui-sortable");
		},
		getRegionInner: function(event){
			return  $('body').find("[data-region='" + that.getTargetRegionId(event) + "'] div.blocksbox .blocks");
		}
		
		
	});

	return CockpitView;
});