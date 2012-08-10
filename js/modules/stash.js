(function(){
	var I = stash.identity;

	stash.helpers.extendGlobal('stash.views', {
		currentStash: Backbone.View.extend({
			render: function(){
				var self = this;
				self.$el.html(ich['currentstash-tpl']());
				return self;
			}
		})
	});
})();