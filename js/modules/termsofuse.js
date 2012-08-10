(function(){
	stash.helpers.extendGlobal('stash.views', {
		termsOfUse: Backbone.View.extend({
			render:function(){
				var self = this;
				self.$el.html(ich['termsofuse-tpl']);
				return self;
			}
		})
	});
})();