(function(){
	stash.helpers.extendGlobal('stash.views', {
		commonExpenselistItem: Backbone.View.extend({
			render:function(){
				var self = this;
				self.data = {

				};
				self.$el.html(ich['common-expenselist-item-tpl'](self.data));
				return self;
			}
		})
	});
})();