(function(){
	var I = stash.identity;
	var H = stash.helpers;
	var V = stash.views;

	stash.helpers.extendGlobal('stash.views', {
	
		currentStash: Backbone.View.extend({
			events: {
				'click a[href].expenses' : 'onMonthlyExpensesClick',
				'click a[href].details'  : 'onDetailsClick'
			},
			render: function(){
				var self = this;
			
				var today = new Date();
				self.today = today;
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
			},
			onMonthlyExpensesClick: function(ev){
				ev.preventDefault();
				
				var self = this;
				var view = new V.stashMonthlyExpenses({model: self.model}).render();
				var dialog = view.$el.dialog({
					modal: true,
					title: H.getMonthName(self.today.getMonth()) + ' Expenses'
				});
				view.on('expense:save', function(result){
					var expenses = self.model.get('expenses');
					expenses.push(result);
					self.model.set('expenses', expenses);
					//self.render();
				});
			},
			onDetailsClick: function(ev){
				ev.preventDefault();
				var self = this;
				var view = new V.stashDetail({model: self.model}).render();
				view.$el.dialog({
					modal: true,
					title: H.getMonthName(self.today.getMonth()) + ' Stash Details'
				});
			}
		})
		,
		stashMonthlyExpenses: Backbone.View.extend({
			initialize: function(){
				var self = this;
				new stash.collections.Expenses()
					.fetch({
						success: function(result){
							self.trigger('listUpdated', result);
						},
						error:function(model, error){

						}
					});
				
				stash.domain.fetch().done(function(domainModel){
					var domainData = domainModel.toJSON();
					self.domain.frequencies = domainData.frequencies;
					self.domain.categories = _.filter(domainData.categories, function(category){ 
						return category.type==='expenses';
					});
					self.render();
				});

				return self;
			},
			render: function(){
				var self = this;
				self.data = {

				};
				self.$el.html(ich['stash-monthly-expenses-tpl'](self.data));

				self.on('listUpdated', function(result){
					var view = new stash.views.commonlistItem({collection: result}).render();
					// Use set timeout because payload returns before page render complete;
					setTimeout(function(){
						self.$('#list-items-container').html(view.el);
					}, 10)
					
				});

				return self;
			}
		})
		,
		stashDetail:  Backbone.View.extend({
			render: function(ev){
				var self = this;
				self.data = {

				};
				self.$el.html(ich['stash-detail-tpl'](self.data));
				return self;	
			}
		})
	});
})();