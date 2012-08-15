(function(){
	var I = stash.identity;
	var H = stash.helpers;

	stash.helpers.extendGlobal('stash.views', {
		currentStash: Backbone.View.extend({
			render: function(){
				var self = this;
				var today = new Date();
				var dayOfWeek = today.getDay();
				var month = today.getMonth()+1;
				var formatMonth = (month < 10 ? '0' + month : month);
				var todayFormatted = today.getFullYear()  + '-'+ (month < 10 ? '0' + month : month) + '-' + today.getDate() ;

				self.data = {
					today_text:  month+ '/'+ today.getDate() + '/' +  today.getFullYear(),
					week_text: month + '/' + today.getDate() +  ' ('+ (0 | today.getDate() / 7)+')',
					month_text : H.getMonthName(today.getMonth()) + ' ('+month+')',
					today: {},
					week:{},
					month:{}
				}
				
				var stashObj = self.model.toJSON();
				(function calculateExpenses(expenses){
					var todaysLeft = 0;
					var weeksLeft = 0;
					var monthLeft = 0;
					_.each(expenses, function(expense){
						var date = new Date(expense.date);
						if (expense.date === todayFormatted){
							todaysLeft += parseFloat(expense.amount);
						}
						if (date.getDay() == dayOfWeek){
							weeksLeft += parseFloat(expense.amount);
						}
						if (expense.date.split('-')[1] == month && (date.getDate() == today.getDate() || date.getDate() > today.getDate())) {
							monthLeft += parseFloat(expense.amount);
						}
					});
					self.data.today.expense = todaysLeft;
					self.data.week.expense = weeksLeft;
					self.data.month.expense = monthLeft;
				})(stashObj.expenses);

				(function calculateIncome(incomes){
					var todaysLeft = 0;
					var weeksLeft = 0;
					var monthLeft = 0;
					_.each(incomes, function(income){
						var date = new Date(income.date);
						if (income.date === todayFormatted){
							todaysLeft += parseFloat(income.amount);
						}
						if (date.getDay() == dayOfWeek){
							weeksLeft += parseFloat(income.amount);
						}
						if (income.date.split('-')[1] == month && date.getDate() > today.getDate()) {
							monthLeft += parseFloat(income.amount);
						}
					});
					self.data.today.income = todaysLeft-self.data.today.expense;
					self.data.week.income = weeksLeft-self.data.week.expense;
					self.data.month.income = monthLeft-self.data.month.expense;
				})(stashObj.incomes);

				self.$el.html(ich['currentstash-tpl'](self.data));
				return self;
			}
		})
	});
})();