(function(){
	stash.helpers.extendGlobal('stash.domain',(function(){
		var domainData = new stash.models.Domain();

		return _.extend({
			get: function(){
				return domainData;
			},
			fetch: function(){
				var deferred = new $.Deferred();
				domainData.fetch({
					success: deferred.resolve,
					error: deferred.reject
				})
				return deferred.promise();
			}
		});
	})());
})();