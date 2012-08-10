(function(){
	var I = stash.identity;
	stash.helpers.extendGlobal('stash.views', {
		header: Backbone.View.extend({
			events:{
				'click .logout' : 'onLogout'
			},
			initialize: function(){
				var self = this;
				if (I.amLoggedIn()){
					self.me = I.getMe();
				}
				return self;
			},
			render: function(){
				var self = this;
				self.data = {
					user : (self.me ? self.me.toJSON() : null)
				};

				self.$el.html(ich['header-tpl'](self.data));

				var loginView = new stash.views.login().render();
				var loginBox = self.$('.login').fancybox({
					content: loginView.$el
				});

				return this;
			},

			onLogout: function(ev){
				ev.preventDefault();
				var self = this;
				I.logMeOut()
				.done(function(result){
					stash.helpers.navigate('/home');
				});
			}
		})
	});
})();