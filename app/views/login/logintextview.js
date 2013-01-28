define([
		"jquery",
		"backbone",
		"marionette",
		'text!views/login/logintextview.html'
], function(
		$,
		Backbone,
		Marionette,
		LoginTextViewHTML
) {
	
	var LoginTextView = Backbone.Marionette.ItemView.extend({
		
		template: 'text!'+LoginTextViewHTML,
		
		initialize: function() {
		},
		
		onRender: function() {
			_.bindAll(this);
			console.log('LoginView');
			console.log(this.$el);
			
			var mhm = '<div>color</div>';
			this.$el.append(mhm);
				
			$('.form-signin').append(this.$el);
		    
			return this;
		}
	
	});

	return LoginTextView;
});