(function(){
	stash.helpers.extendGlobal('stash.models', {
		User: Backbone.Model.extend({
			url: function(){
				return '/users/' + (this.id ? '/'+this.id : '');
			}
		}),
		Stash: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'stash'
		}),
		Error: Backbone.Model.extend({
			
		}),
		Income: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'incomes'
		}),
		Expense: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'expenses'
		}),
		Frequency: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'domain/frequency'
		}),
		Category: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'domain/category'
		}),
		Domain: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'domain'
		})
	});

	_.extend(Backbone.Model.prototype, {
		sfetch: function(options){
			var model = this;
			options = options || {};
			var defer = new $.Deferred();

			options.success = function(){
				defer.resolve(model);
			};
			options.error = function(model, xhr){
				defer.reject(mode, xhr);
			}
			return defer.promise();
		}
		// ,
		// save: function(options){
		// 	var p = this;
		// 	debugger;
		// }
	})
})();