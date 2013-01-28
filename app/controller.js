/* 
 * The controller is basically just a collection of methods that correspond
 * to routes and are called by the application router.
 */
/*jslint browser: true*/
define([

  // Application.
  'app',
  'layoutmanager',
  'views/menu/editmodeview',
  // Misc.
  'base/session',
  'models/block',
  'collections/blocks',
 
  'controllers/menucontroller',
  'controllers/helpercontroller',
  'controllers/blockcontroller',
  'controllers/modalcontroller',
  'controllers/mainmodalcontroller',
  'controllers/logincontroller',
  'controllers/cockpitcontroller'

], function(
	App, 
	LayoutManager, 
	EditmodeView, 
	session,
	Block,
	Blocks,
	MenuController,
	HelperController,
	BlockController,
	ModalController,
	MainModalController,
	LoginController,
	CockpitController
) {
  'use strict';

  return {
  
    // The main page.
    index: function() {
		this.initBefore();
		console.log('called index-controller');
		new LoginController();	
    },

	  // edit Panel 
	  showCockpit : function(){
		  this.initBefore();
		  
		  console.log('called edit controller');		
		  
		  new MenuController();	
		  
		  App.regionMain.show(LayoutManager.initAppLayout('layouts/drag3'));
		  
		  new CockpitController();
		  
		  this.init();
		  
	  },
	  
	// edit Panel 
	showeditMode : function(){
		this.initBefore();
		
		console.log('called edit mode controller');		
	
		new MenuController();
		App.regionMain.show(LayoutManager.initAppLayout('layouts/main'));
		App.regionEdit.show(new EditmodeView());
		
		
		this.init();
		
	},
	
	showDraggablePageLayout : function(){	
		this.initBefore();
		
		new MenuController();	
		App.regionMain.show(LayoutManager.initAppLayout('layouts/drag'));
		new BlockController();
		
		/*
		$('.dragbox')
		.each(function(){
			$(this).hover(function(){
				$(this).find('h2').addClass('collapse');
				}, function(){
				$(this).find('h2').removeClass('collapse');
			})
			.find('h2').hover(function(){
				$(this).find('.configure').css('visibility', 'visible');
				}, function(){
				$(this).find('.configure').css('visibility', 'hidden');
			})
			.click(function(){
				$(this).siblings('.dragbox-content').toggle();
			})
			.end()
			.find('.configure').css('visibility', 'hidden');
		});
		*/
	
		$('.column').sortable({
			connectWith: '.column',
			handle: 'h2',
			cursor: 'move',
			placeholder: 'placeholder',
			forcePlaceholderSize: true,
			opacity: 0.4,
			stop: function(event, ui){
				$(ui.item).find('h2').click();
				var sortorder='';
				$('.column').each(function(){
					var itemorder=$(this).sortable('toArray');
					var columnId=$(this).attr('id');
					sortorder+=columnId+'='+itemorder.toString()+'&';
				});
				alert('SortOrder: '+sortorder);
				/*Pass sortorder variable to server using ajax to save state*/
			}
		})
		.disableSelection();
		
		
		this.init();
	},
	
	  showDraggablePageLayout2 : function(){	
		  this.initBefore();
		  
		  new MenuController();	
		  App.regionMain.show(LayoutManager.initAppLayout('layouts/drag3'));
		
		  $(".blocksbox").sortable({
			  connectWith: '.blocksbox',
			  items: '.blocks',
			  handle: 'h3.blocks-title',
			  placeholder: 'blocks-placer',
			  forcePlaceholderSize: true,
			  forceHelperSize: true,
			  revert: true,
			  dropOnEmpty: true
		  });
		  
		  $('button.blockminimize').click(function() {
			 var block = $(this).parent().find('.blocks-content');
		
			block.toggle();
				  
		   });
		
		  //set up portlets for drag and drop
		  $(".portalbox").sortable({
			  connectWith: '.portalbox',
			  items: '.sortable',
			  handle: '.portlet-header',
			  placeholder: 'placer',
			  forcePlaceholderSize: true,
			  forceHelperSize: true,
			  revert: true,
			  dropOnEmpty: true
		  });
		  
		  
		  // minmize & maximize portlet
		  $(".portlet-header .minmax").click(function() {
			  $(this).toggleClass("na-icon-triangle-1-n").toggleClass("na-icon-triangle-1-s");
			  $(this).parents(".portlet:first").find(".content").toggle();
			  var porletId = $(this).parents(".portlet:first").attr("id");
			  if ($(this).attr("title") == "Minimize") {
				  $(this).attr("title", "Maximize");
				  $("#" + porletId).attr("_max", "0");
			  } else {
				  $(this).attr("title", "Minimize");
				  $("#" + porletId).attr("_max", "1");
			  }
			  //write code to save the sate of the portlet if required
			  updatePortletOrder();
		  });
		  
		  //on double click on anywhere on header minimize or maximize portlet
		  $(".portlet-header").dblclick(function() {
			  var portletId = $(this).parents(".portlet:first").attr("id");
			  if ($("#" + portletId + " > div.portlet-header > span.minmax").length) {
				  //child exists
				  $("#" + portletId + " > div.portlet-header > span.minmax").click();
			  }
		  });
		  
		  //Close buttonClick
		  $(".portlet-header .portlet-close").click(function() {
			  var portletId = $(this).parents(".portlet:first").attr("id");
			  $("#" + portletId).hide();
			  $("#" + portletId).attr("_close", '1');
			  //update portal order
			  updatePortletOrder();
		  });
		  
		  //After dropping update the portal order
		  $(".portalbox").bind("sortstop", function(event, ui) {
			  ui.item.data("container", $(event.target));
			  updatePortletOrder();
		  });
		  
		  //Popout button click
		  $(".portlet-header .popout").live("click", function() {
			  var portletId = $(this).parents(".portlet:first").attr("id");
			  var insafter_portlet = "";
			  if ($(this).parents(".portlet:first").prev(".portlet").length > 0) {
				  insafter_portlet = $(this).parents(".portlet:first").prev(".portlet").attr("id");
			  }
			  if ($(this).attr("title") == "Pop-out") {
				  //only one pop out at a time, remove popout link to all
				  $(".popout").removeClass("na-icon").removeClass("na-icon-extlink");
				  
				  $(this).attr("title", "Pop-in").addClass("na-icon").addClass("na-icon-arrowthick-1-se").parents(".portlet")
				  $(this).attr("_insafter", insafter_portlet)
				  popout(portletId);
			  } else {
				  $(this).attr("title", "Pop-in").removeClass("na-icon").removeClass("na-icon-arrowthick-1-se").parents(".portlet")
				  $(".popout").addClass("na-icon").addClass("na-icon-extlink");
				  popin(portletId);
			  }
		  });
		  
		  function SetPortletOrder() {
			  var PortletOrder = $.cookie('MCPortletOrder');
			  
			  var JsonObj = eval('(' + PortletOrder + ')');
			  //alert(JsonObj.POrder[0].ColumnId);
			  
			  if (JSON.stringify(JsonObj) != "null") {
				  
				  var POrder = JsonObj.POrder;
				  if (POrder.length > 0) {
					  $(JsonObj.POrder).each(function(i, obj) {
						  $("#" + obj.PortletId).appendTo("#" + obj.ColumnId ).data("container", $("#" + obj.PortletId));
					  });
				  }
				  
				  var PClosed = JsonObj.PClosed;
				  if (PClosed.length > 0) {
					  $(PClosed.split(',')).each(function(i, id) {
						  $("#" + id).attr("_close", '1');
						  $("#" + id).hide();
					  });
				  }
				  
				  //First Hide all the portlet content area and Show which are maximized
				  $(".sortable .content").hide();
				  var PMax = JsonObj.PMax;
				  if (PMax.length > 0) {
					  $(PMax.split(',')).each(function(i, id) {
						  //alert(id);
						  $("#" + id).show();
						  $("#" + id).attr("_max", '1');
						  //maximize ,show content
						  $("#" + id).find(".content").show();
						  $("#" + id).find(".portlet-header").find(".minmax").attr("title", "Minimize");
						  $("#" + id).find(".portlet-header").find(".minmax").removeClass("na-icon-triangle-1-s").addClass("na-icon-triangle-1-n");
					  });
				  }
			  }
			  
		  }
		  
		  function updatePortletOrder() {
			  var oprid = "123456"; //get login username/userid
			  var POrder = '[';
			  $(".sortable").each(function() {
				  var colid = $(this).parents(".portalbox:first").attr("id");
				  POrder = POrder + '{"ColumnId":"' + colid + '","PortletId":"' + $(this).attr("id") + '"},';
			  });
			  POrder = POrder.substring(0, POrder.length - 1) + ']';
			  
			  var PClosed = "";
			  $(".portalbox > div.portlet[_close='1']").each(function() {
				  //alert($(this).attr("id"));
				  PClosed = PClosed + $(this).attr("id") + ",";
			  });
			  if (PClosed.length > 0) {
				  PClosed = PClosed.substring(0, PClosed.length - 1);
			  }
			  
			  var PMax = "";
			  $(".portalbox > div.portlet[_max='1']").each(function() {
				  //alert($(this).attr("id"));
				  PMax = PMax + $(this).attr("id") + ",";
			  });
			  if (PMax.length > 0) {
				  PMax = PMax.substring(0, PMax.length - 1);
			  }
			  
			  var parameters = "{'Oprid':'" + oprid + "','POrder':" + POrder + ",'PClosed':'" + PClosed + "','PMax':'" + PMax + "'}";
			  document.cookie = "MCPortletOrder=" + parameters;
			  //alert(parameters);
			  //If updating to database you can use the code below to call Page Mehod to update 
		   /*
			   $.ajax({
			   type: "POST",
			   url: "Portal.aspx/updatePortletOrder",
			   data: parameters,
			   contentType: "application/json; charset=utf-8",
			   dataType: "json",
			   error: function (resp, status,error) {
			   alert(resp.responseText);
			   },
			   success: function (msg) {
			   //setPortalOrder(msg);
			   }
			   });
            */
		  }
	   
		  
		  function popout(portletId) {
			  prtlt = $("#" + portletId);
			  prtlt.appendTo(document.body).removeClass("sortable").addClass("popup").draggable({
				  handle: prtlt.find(".portlet-header")
				  }).resizable({
				  minWidth: 150,
				  minHeight: 70,
				  alsoResize: prtlt.find(".content")
				  }).css({
				  "width": prtlt.width() - 250,
				  "position": "absolute",
				  "z-index": "101"
			  });
			  
			  var top = document.body.scrollTop + (document.body.clientHeight / 2 - prtlt.outerHeight() / 2),
			  lft = document.body.scrollLeft + (document.body.clientWidth / 2 - prtlt.outerWidth() / 2);
			  if (prtlt.outerHeight() > document.body.clientHeight) top = 0;
			  if (prtlt.outerWidth() > document.body.clientWidth) lft = 0;
			  
			  prtlt.css({
				  "top": top,
				  "left": lft
			  });
		  }
		  
		  function popin(portletId) {
			  var insafter_portlet = $("#" + portletId).find(".portlet-header").find(".popout").attr("_insafter");
			  prtlt = $("#" + portletId);
			  
			  prtlt.insertAfter($("#" + insafter_portlet));
			  $(prtlt).addClass("sortable").removeClass("popup").draggable("destroy").resizable("destroy").css({
				  "width": "",
				  "position": "",
				  "z-index": "5",
				  "height": ""
			  });
			  $(prtlt).find(".content").css({
				  "width": "",
				  "height": ""
			  });
		  }

		  this.init();
	  },
	
	  // edit Panel 
	  showLeftPageLayout : function(){	
		this.initBefore();
	  
		 new MenuController();	
	     App.regionMain.show(LayoutManager.initAppLayout('layouts/left'));
		  		  
		 var blockcontroller = new BlockController();
		 blockcontroller.listener();  
		
		   
		 this.init();
	  },       

	initBefore: function() {
		new HelperController();
	},

	init: function() {
		new ModalController();
		new MainModalController();
	},

    // The login page.
    login: function() {
		console.log('called login-controller');
    },


    // Redirects to the login screen if the user is not logged in.
    isAuthenticated: function() {
      if (!session.authenticated()) {
          App.Router.navigate('login', {
          trigger: true
        });
      }
    }
  };
  
});
