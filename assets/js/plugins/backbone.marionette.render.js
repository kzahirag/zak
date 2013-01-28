define([
  'backbone',
  'marionette',
], function(Backbone, Marionette) {
	 /* =========================================================================
	  * The following will make Marionette's template retrieval work with
	  * in both development (templates found in html files) and production
	  * environment (templates all compiled AS JST templates into the require.js
	  * file. This will also use JST instead of the Marionette.TemplateCache.
	  * http://ricostacruz.com/backbone-patterns/#jst_templates
	  */
		var Renderer = Marionette.Renderer = Backbone.Marionette.Renderer =({ 
			render: function(template, data) {
				var path = 'app/templates/' + template + '.html';
				
				// Localize or create a new JavaScript Template object.
				var JST = window.JST = window.JST || {};
				//console.log(path);
				//console.log(data);
				
				if(path.contains('text!')){
					//remove #zak#
					var html = template.substring(5, template.length);
					return html;
				}	
				// path => app/templates/#modal-view-template.html === true default Marionette Renderer
				else if(path.contains('#')){	
					var templateFunc = typeof template === 'function' ? template : Marionette.TemplateCache.get(template);
					var html = templateFunc(data);
					return html;
				}
				else {
				
					// Make a blocking ajax call (does not reduce performance in production,
					// because templates will be contained by the require.js file).
					if (!JST[path]) {
						$.ajax({
							//url: App.root + path,
							url: path,
							async: false
							}).then(function(templateHtml) {
							JST[path] = _.template(templateHtml);
						});
					}
					
					if (!JST[path]) {
						var msg = 'Could not find "' + template + '"';
						var error = new Error(msg);
						error.name = 'NoTemplateError';
						throw error;
					}
				
					// Call the template function with the data.
					return JST[path](data);
				}
			}
		});
	 /* ======================================================================== */
	 
		String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
		
	 return Renderer;
});