(function(){
	stash.helpers.extendGlobal('stash.views', {
		aboutUs: Backbone.View.extend({
			render:function(){
				var self = this;
				self.$el.html(ich['aboutus-tpl']);
				return self;
			}
		})
	});
})();