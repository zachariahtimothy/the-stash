(function(){
	stash.helpers.extendGlobal('stash.views', {
		getStarted: Backbone.View.extend({
			render:function(){
				var self = this;
				self.$el.html(ich['getstarted-tpl']);
				return self;
			}
		})
	});
})();