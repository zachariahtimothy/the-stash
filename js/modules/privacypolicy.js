(function(){
	stash.helpers.extendGlobal('stash.views', {
		privacyPolicy: Backbone.View.extend({
			render:function(){
				var self = this;
				self.$el.html(ich['privacypolicy-tpl']);
				return self;
			}
		})
	});
})();