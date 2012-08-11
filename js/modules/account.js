(function(){
	stash.helpers.extendGlobal('stash.views', {
		account: Backbone.View.extend({
			initialize: function(){
				var self = this;
				if (self.options.section === 'expenses'){
				}
				return self;
			},
			render:function(){
				var self = this;
				self.data = {
					expenses: []
				};
				self.data['section_' + self.options.section] = true;

				var oldContainer = $('#account .active');
				if (oldContainer.length > 0){
					oldContainer.slideUp();
				}

				self.$el.html(ich['account-tpl'](self.data));

				if (self.options.section === 'expenses'){
					var view = new stash.views.commonExpenselistItem({collection: self.data.expenses}).render();
					self.$('#expense-items-container').html(view.el);
				}
				
				return self;
			}
		})
	});
})();