define([

  // Libraries.
  'backbone',
  'marionette',

  // Modules.
  'controller'
  
], function(Backbone, Marionette, controller) {
  'use strict';

  var Router = Backbone.Marionette.AppRouter.extend({

    appRoutes: {
	  "editMode" : "showeditMode",
	  "edit" : "showCockpit",
	   "left" : "showLeftPageLayout",
	   "drag" : "showDraggablePageLayout",
	   "drag2" : "showDraggablePageLayout2",
	   "*index" : "index"
    }
  });

  return new Router({
    controller: controller
  });

});