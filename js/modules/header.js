(function(){
	var I = stash.identity;
	stash.helpers.extendGlobal('stash.views', {
		header: Backbone.View.extend({
			events:{
				'click .login'  : 'onLoginClick',
				'click .logout' : 'onLogoutClick'
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
				
				return self;
			},
			onLoginClick: function(ev){
				var loginView = new stash.views.login().render();
				var loginDialog = loginView.$el.dialog({
					modal: true,
					title: 'Login',
					open: function(event, ui) {
						loginView.$('input[name="email"]').focus();
					}
				});
				loginView.on('stash.login', function(data){
					loginDialog.dialog('destroy');
					stash.helpers.navigate('/stash');
				})
				
			},
			onLogoutClick: function(ev){
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