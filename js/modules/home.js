(function(){
	stash.helpers.extendGlobal('stash.views', {
		home: Backbone.View.extend({
			events:{
				'click .getstarted' : 'getStarted'
			},
			render: function(){
				var self = this;
				self.$el.html(ich['home-tpl']);
				return self;
			},

			getStarted: function(ev){
				
			}
		})
	});
})();