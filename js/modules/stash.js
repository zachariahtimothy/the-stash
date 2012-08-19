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
				var todayFormatted = today.getFullYear()  + '-'+ (month < 10 ? '0' + month : month) + '-' + today.getDate();

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
					self.data.today.expense = {
						amount_left: todaysLeft<0 ? todaysLeft*-1 : todaysLeft,
						has_expenses: todaysLeft>0
					};
					self.data.week.expense = {
						amount_left: weeksLeft,
						has_expenses: weeksLeft>0
					};
					self.data.month.expense ={
						amount_left:monthLeft,
						has_expenses: monthLeft>0
					};
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
					var amtLeft;
					amtLeft = todaysLeft-self.data.today.expense.amount_left;
					self.data.today.income ={
						amount_left: amtLeft<0 ? amtLeft*-1 : amtLeft,
						is_negative: amtLeft<0
					};
					amtLeft = weeksLeft-self.data.week.expense.amount_left;
					self.data.week.income = {
						amount_left: amtLeft<0 ? amtLeft*-1 : amtLeft,
						is_negative: amtLeft<0
					}
					amtLeft = monthLeft-self.data.month.expense.amount_left;
					self.data.month.income = {
						amount_left: amtLeft<0 ? amtLeft*-1 : amtLeft,
						is_negative: amtLeft<0
					};
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
					title: H.getMonthName(self.today.getMonth()) + ' Stash Details',
					width:700
				});
			}
		})
		,
		stashMonthlyExpenses: Backbone.View.extend({
			events: {
				'submit form' : 'onFormSubmit',
				'change select[name="category"]'  : 'onSelectChange'
			},
			initialize: function(){
				var self = this;
				
				self.domain = {};
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
				var today = new Date();
				var month = today.getMonth()+1;
				var todayFormatted = today.getFullYear()  + '-'+ (month < 10 ? '0' + month : month) + '-' + today.getDate();
				self.data = {
					domain : self.domain || {},
					today: todayFormatted
				};
				
				self.$el.html(ich['stash-monthly-expenses-tpl'](self.data));

				return self;
			},
			onFormSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				new stash.models.Expense().save(form.serializeObject(), {
					success: function(result){
						var p = result;
						self.render();
					},
					error: function(model, error){
						//TODO: Handle error
					}
				});
				return false;
			},
			onSelectChange: function(ev){
				var select =  $(ev.currentTarget);
				var self = this;
				var isAddNew = select.val() === 'add';
				if (isAddNew){
					var view = new stash.views.accountAddDomainData({type: 'expenses'}).render();
					view.$el.dialog({
						modal: true,
						title: 'Add a ' + stash.helpers.capitalizeFirstLetter(select.attr('name'))
					});

					view.on('stash:submit', function(formData){
						if (select.attr('name') === 'category'){
							new stash.models.Category().save(formData, {
								success: function(result){
									select.append('<option value="'+result.get('id')+'" selected>'+result.get('name')+'</option>');
									view.$el.dialog('destroy');
								},
								error: function(model, error){
									//TODO: Add error handling
								}
							});
						} 
					});

				} else {
					return false;
				}
			}
		})
		,
		stashDetail:  Backbone.View.extend({
			events: {
				'submit form' : 'onFormSubmit'
			},
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
				self.domain = {};
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
			render: function(ev){
				var self = this;
				var today = new Date();
				var month = today.getMonth()+1;
				var todayFormatted = today.getFullYear()  + '-'+ (month < 10 ? '0' + month : month) + '-' + today.getDate();
				self.data = {
					domain: self.domain || {},
					today: todayFormatted
				};
				var view = new stash.views.stashMonthlyExpenses().render();
				self.$el.html(ich['stash-detail-tpl'](self.data)).find('#addExpensesContainer').html(view.el);

				self.on('listUpdated', function(result){
					var view = new stash.views.commonlistItem({collection: result}).render();
					// Use set timeout because payload returns before page render complete;
					setTimeout(function(){
						self.$('#list-items-container').html(view.el);
					}, 10)
					
				});

				return self;	
			},
			onFormSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				new stash.models.Expense().save(form.serializeObject(), {
					success: function(result){
						self.render();
						new stash.collections.Expenses()
						.fetch({
							success: function(result){
								self.trigger('listUpdated', result);
							},
							error:function(model, error){

							}
						});
					},
					error: function(model, error){
						//TODO: Handle error
					}
				});

				return false;
			}
		})
	});
})();