(function(){
	stash.helpers.extendGlobal('stash.observer', {
		identity: _.extend({}, Backbone.Events)
	});

	stash.helpers.extendGlobal('stash.identity',(function(){

		var me = new stash.models.User({id:'me'});

		// leverage the bootstrapped 'myself' object if available
		if (window.myself) {
			me = new stash.models.User(window.myself);
		}
		return _.extend({
			amLoggedIn: function(){
				return me.get('type') && me.get('type') !== 'anon'; 
			},
			fetchMe: function(){
				return me.fetch();
			},
			getMe: function(){
				return me;
			},
			logMeIn: function(args){
				var defer = new $.Deferred();
				defer.done(function(got){
					me = new stash.models.User(got.user);
					 //stash.identity.trigger('identityChange identityChange:login');
				});
				//TODO: Uncomment when login is ready
				 $.ajax({
					url: stash.settings.apiUrl + 'user/login',
					type: 'POST',
					data: args,
					success:function(result){
						defer.resolve(result);
					},
					error: function(error){
						defer.reject(error);
					}
				});
				// var meModel = me;
				// defer.resolve(meModel);
				return defer.promise();
			},
			logMeOut: function(){
				var defer = new $.Deferred();
				defer.done(function(userModel){
					me = new stash.models.User({id:'me'});
				});

				$.ajax({
					url: stash.settings.apiUrl + 'user/logout',
					contentType: 'application/json',
					type: 'GET',
					success:function(result){
						defer.resolve(result);
					},
					error: function(error){
						defer.reject(error);
					}
				});

				return defer.promise();
			}
		})
	})());
})();