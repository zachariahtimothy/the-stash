(function(){
	stash.helpers.extendGlobal('stash.views', {
		contactUs: Backbone.View.extend({
			render:function(){
				var self = this;
				self.$el.html(ich['contactus-tpl']);
				return self;
			}
		})
	});
})();