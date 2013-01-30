define([

  // Libraries.
  'backbone',
  'marionette',

  // Modules.
  'controller',
  'appmanager',
  'views/cockpit/cockpitview',
  'views/article/articleview',
  'collections/blocks',
  'models/block',
  'models/page'
  
], function(Backbone, Marionette, Controller, AppManager, CockpitView,  ArticleView, Blocks, Block, Page) {
  'use strict';

  var CockpitController = Marionette.Controller.extend({
	  
	  initialize: function(options){		
	   
		  var Blocks = Backbone.Collection.extend({
			  model : function(attrs, options) {
				  return Block.create(attrs, options);
			  }
		  });
		  
		  Page.has().many('blocks', {
			  collection: Blocks,
			  inverse: 'page'
		  });
		  
		  Block.has().one('page', {
			  model: Page,
			  inverse: 'blocks'
		  });
		  
	      var page = Page.create({
			  id: 1,
			  name: 'Default body text',
			  layoutId: 1,
			  isEditMode: true,
	
			  blocks: [
			  {
				  id: 1,
				  name: 'Default BlockText',
				  desc: 'Default Desc',
				  moduleId: 1,
				  header: 'Block 1',
				  content: 'Sed posuere consectetur est at lobortis. Aenean eu leo quam',
				  regionId: 1,
				  rankId: 1,
				  visible: true,
				  collapsed: true,
				  source: '<div class="blocks article" data-block="1">'+
				  '<button type="button" class="close blockminimize" data-dismiss="blockminimize" aria-hidden="true"><i class="icon-double-angle-down"></i></button>'+
				  '<button type="button" class="close blockclose" data-dismiss="blockclose" aria-hidden="true"><i class="icon-remove"></i></button>'+				  
				  '<h3 class="blocks-title"></h3>'+
				  '<div class="blocks-content editable" data-button-class="zak" >'+
				  '<p></p>'+
				  '</div>'+
				  '</div>'
			  },
			  {
				  id: 2,
				  name: 'Default BlockText',
				  desc: 'Default Desc',
				  moduleId: 1,
				  header: 'Block 2',
				  content: 'Sed posuere consectetur est at lobortis. leo quam',
				  regionId: 2,
				  rankId: 1,
				  visible: true,
				  collapsed: true,
				  source: '<div class="blocks article" data-block="2">'+
				  '<button type="button" class="close blockminimize" data-dismiss="blockminimize" aria-hidden="true"><i class="icon-double-angle-down"></i></button>'+
				  '<button type="button" class="close blockclose" data-dismiss="blockclose" aria-hidden="true"><i class="icon-remove"></i></button>'+				  
				  '<h3 class="blocks-title"></h3>'+
				  '<div class="blocks-content editable" data-button-class="all" >'+
				  '<p></p>'+
				  '</div>'+
				  '</div>'
			  },
			  {
				  id: 3,
				  name: 'Default BlockText',
				  desc: 'Default Desc',
				  moduleId: 1,
				  header: 'Block 3',
				  content: 'Sed posuere consectetur est at lobortis. Aenean eu leo quam',
				  regionId: 2,
				  rankId: 2,
				  visible: true,
				  collapsed: true,
				  source: '<div class="blocks article" data-block="3">'+
				  '<button type="button" class="close blockminimize" data-dismiss="blockminimize" aria-hidden="true"><i class="icon-double-angle-down"></i></button>'+
				  '<button type="button" class="close blockclose" data-dismiss="blockclose" aria-hidden="true"><i class="icon-remove"></i></button>'+
				  '<h3 class="blocks-title"></h3>'+
				  '<div class="blocks-content editable" data-button-class="all" >'+
				  '<p></p>'+
				  '</div>'+
				  '</div>'
			  }
			  ]
			  
		  });

		
		  // console.log(page.blocks().length);
		  
		  if(page.get('isEditMode') == false){
			
		  }
		  else {
			AppManager.init(new CockpitView({ model: page }));
		  }
		   
		   
		   //AppManager.init(new CockpitView2({ model: page }));
	  }
	 
  });

  return CockpitController;

});