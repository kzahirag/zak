(function() {
  'use strict';
    
  var models = {},
    views = {},
    collections = {},
    zak = {};
	
  // versioning 
  zak.VERSION = '0.0.1';

  zak.config = {
    // selector to specify block elements   
    selector: '.block'
  };

  models.Editor = Backbone.Model;

  // tack on models, views, etc... as well as init function
  _.extend(zak, {
    models: models,
    views: views,
    collections: collections,

    // This function is to be used as callback to whatever event
    // you use to initialize editing 
    editableInit: function(e) {
      e.stopPropagation();
      var target = e.target || e.srcElement;
	  console.log(target);
	  //$(target).addClass('hoverBlock');
      var $editable = $(target).zakFindEditable();
	  console.log($editable);
      $editable.attr('contenteditable', true);

	  /*
      // if the editor isn't already built, build it
      var $editor = $('.zak-editor-panel');
      var editorModel = $editor.data('model');
      if (!$editor.size()) {
        $editor = $('<div class="zak-editor-panel">');
        var editorAttrs = { editable: $editable, editableModel: this.model };
        document.body.appendChild($editor[0]);
        $editor.zakInstantiate({classType: 'Editor', attrs: editorAttrs});
        editorModel = $editor.data('model');

      // check if we are on a new editable
      } else if ($editable[0] !== editorModel.get('editable')[0]) {
        // set new editable
        editorModel.set({
          editable: $editable,
          editableModel: this.model
        });
      }
      
      // Firefox seems to be only browser that defaults to `StyleWithCSS == true`
      // so we turn it off here. Plus a try..catch to avoid an error being thrown in IE8.
      try {
        document.execCommand('StyleWithCSS', false, false);
      }
      catch (err) {
        // expecting to just eat IE8 error, but if different error, rethrow
        if (err.message !== "Invalid argument.") {
          throw err;
        }
      }

      if (models.EditableImage) {
        // instantiate any images that may be in the editable
        var $imgs = $editable.find('img');
        if ($imgs.size()) {
          var attrs = { editable: $editable, editableModel: this.model };
          $imgs.each(function() {
            var $this = $(this);
            if (!$this.data('editableImageModel')) {
              var editableImageModel =  new models.EditableImage(attrs);
              var editableImageView = new views.EditableImage({model: editableImageModel, el: this, tagName: this.tagName});
              $this.data('editableImageModel', editableImageModel);
            }
          });
        }
      }

      // listen for mousedowns that are not coming from the editor
      // and close the editor
      $('body').bind('mousedown.editor', function(e) {
        // check to see if the click was in an zak tool
        var target = e.target || e.srcElement;
        if ($(target).not('.zak-editor-panel, .zak-editor-panel *, .zak-image-tools, .zak-image-tools *').size()) {
          // remove editor
          $editor.remove();
                    
                    
          if (models.EditableImage) {
            // unblind the image-tools if the editor isn't active
            $editable.find('img').unbind('mouseenter');

            // remove any latent image tool model references
            $(zak.config.selector+' img').data('editableImageModel', false)
          }
                    
          // once the editor is removed, remove the body binding for it
          $(this).unbind('mousedown.editor');
        }
      });
		*/
    }
  });

  // jquery helper functions
  $.fn.zakInstantiate = function(options, cb) {
    return this.each(function() {
      var $el = $(this);
      options || (options = {});

      var settings = {
        el: this,
        attrs: {}
      }

      _.extend(settings, options);

      var model = new models[settings.classType](settings.attrs, settings);

      // initialize a view is there is one
      if (_.isFunction(views[settings.classType])) {
        var view = new views[settings.classType]({model: model, el: this, tagName: this.tagName});
      }
           
      // stash the model and view on the elements data object
      $el.data({model: model});
      $el.data({view: view});

      if (_.isFunction(cb)) {
        cb({model: model, view: view});
      }
    });
  }

  $.fn.zakFindEditable = function() {
    // function that looks for the editable selector on itself or its parents
    // and returns that el when it is found
    var $el = $(this);
    return $el.is(zak.config.selector) ? $el : $el.closest(zak.config.selector);
  }
    
  window.zak = zak;
})();
