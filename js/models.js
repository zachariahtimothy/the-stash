(function(){
	stash.helpers.extendGlobal('stash.models', {
		User: Backbone.Model.extend({
			url: stash.settings.apiUrl +'users'
		}),
		Stash: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'stash'
		}),
		Error: Backbone.Model.extend({
			
		}),
		Income: Backbone.Model.extend({
			url: function(){
				return stash.settings.apiUrl + 'incomes' + (this.id ? '/' + this.id : '');
			}
		}),
		Expense: Backbone.Model.extend({
			url: function(){
				return stash.settings.apiUrl + 'expenses' + (this.id ? '?id=' + this.id : '');
			}
		}),
		Frequency: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'domain/frequency'
		}),
		Category: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'domain/category'
		}),
		Domain: Backbone.Model.extend({
			url: stash.settings.apiUrl + 'domain'
		}),
		Email: Backbone.Model.extend({
			url: stash.settings.apiUrl +'email',
			send: function(key, value, options){
				return Backbone.Model.prototype.save.call(this, key, value, options);
			}
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