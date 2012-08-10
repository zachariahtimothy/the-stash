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
	})
})();