(function(){
	var I = stash.identity;

	stash.helpers.extendGlobal('stash.views', {
		error: Backbone.View.extend({
			render: function(){
				var self = this;
				self.data = self.model.toJSON();
				self.$el.html(ich['error-tpl'](self.data));
				return self;
			}
		})
	});
})();