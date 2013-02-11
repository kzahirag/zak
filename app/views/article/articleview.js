define([
		"jquery",
		"backbone",
		"etch",
		'models/article'
], function(
		$,
		Backbone,
		etch,
		Article
) {
	
	var ArticleView = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'save', 'initEtch');
			//articleModel.bind('save', this.save);
		},
		
		events: {
			'mousedown .editable': 'editableClick'
		},
		
		editableClick: etch.editableInit,
		
		save: function() {
			
		},
		
		initEtch: function() {
			$article = $('.article');
			$article.each(function(){
				var article = new Article();
				//console.log(article);
				//var articleview = new ArticleView({model: article, el: this, tagName: 'span'});
				var articleview = new ArticleView({model: article, el: this, tagName: this.tagName});
			});
			
			//$('.blockminimize').css('display', 'none');
			//$('.blockclose').css('display', 'none');
			//$('.blocks h3').css('display', 'none');
			
		},
		
		disable: function(){
			$blocks = $('#main .article .blocks-content');
			$blocks.each(function(){
				$(this).attr('style', 'display:block;');
				$(this).removeClass('editable');
				$(this).attr('contenteditable', 'false');
			});
			
			//$('.blockminimize').css('display', 'none');
			//$('.blockclose').css('display', 'none');
			//$('.blocks h3').css('display', 'none');
			//$('#main .article').removeClass('blocks');
			//$('.blocks-content').attr('style', 'padding:0px;');
		},
		
		enable: function(){
			$blocks = $('#main .article  .blocks-content');
			$blocks.each(function(){
				$(this).addClass('editable');
				$(this).attr('contenteditable', 'true');
			});
			
			//$('#main .article').addClass('blocks');
			//$('.blockminimize').css('display', 'block');
			//$('.blockclose').css('display', 'block');
			//$('.blocks h3').css('display', 'block');
			//$('.blocks-content').removeAttr('style');
		}
		
	});

	return ArticleView;
});