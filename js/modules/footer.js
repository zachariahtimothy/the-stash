(function(){
	stash.helpers.extendGlobal('stash.views', {
		footer: Backbone.View.extend({
			render: function(){
				var self = this;
				self.$el.html(ich['footer-tpl']);
				return this;
			}
		})
	});
})();