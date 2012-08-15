(function(){
	var I = stash.identity;

	stash.helpers.extendGlobal('stash.views', {
		currentStash: Backbone.View.extend({
			render: function(){
				var self = this;
				self.data = {
					today: {},
					week:{},
					month:{}
				}
				var today = new Date();
				var stash = self.model.toJSON();

				var todaysExpenses = _.filter(stash.expenses, function(expense){
					return new Date(expense.date) == today;
				});
				

				
				self.$el.html(ich['currentstash-tpl'](self.data));
				return self;
			}
		})
	});
})();