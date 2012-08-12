(function(){
	stash.helpers.extendGlobal('stash.views', {
		home: Backbone.View.extend({
			events:{
				'click .getstarted' 	 : 'getStarted',
				'click .minibox a[href]' : 'onMoreClick'
			},
			render: function(){
				var self = this;
				self.$el.html(ich['home-tpl']);
				return self;
			},

			getStarted: function(ev){
				
			},
			onMoreClick: function(ev){
				ev.preventDefault();
				var moreText = $(ev.currentTarget).data('more');
				$('<div/>', {
					html: moreText
				}).dialog({
					modal:true
				});
				return false;
			}
		})
	});
})();