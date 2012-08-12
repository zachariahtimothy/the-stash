(function(){

	stash.helpers.extendGlobal('stash.collections', {
		Expenses: Backbone.Collection.extend({
			model:stash.models.Expense,
			url: stash.settings.apiUrl + 'expenses'		
		}),
		Incomes: Backbone.Collection.extend({
			model:stash.models.Income,
			url: stash.settings.apiUrl + 'incomes'		
		}),
		Categories: Backbone.Collection.extend({
			model:stash.models.Category,
			url: stash.settings.apiUrl + 'domain/categories'		
		}),
		Frequencies: Backbone.Collection.extend({
			model:stash.models.Frequency,
			url: stash.settings.apiUrl + 'domain/frequencies'		
		})
	});
})();