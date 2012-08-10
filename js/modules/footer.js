(function(){
	var I = stash.identity;
	
	stash.helpers.extendGlobal('stash.views', {
		footer: Backbone.View.extend({
			render: function(){
				var self = this;
				self.data = {
					is_logged_in: I.amLoggedIn()
				};
				self.$el.html(ich['footer-tpl'](self.data));
				return this;
			}
		})
	});
})();