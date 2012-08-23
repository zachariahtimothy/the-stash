(function(){
	var I = stash.identity;
	var H = stash.helpers;

	stash.helpers.extendGlobal('stash.views', {
		getStarted: Backbone.View.extend({
			events:{
				'submit form' 			 : 'onSubmit',
				'click a[href].facebook' : 'onFBClick',
			},
			render:function(){
				var self = this;
				self.data = {
					facebookId: self.facebookId || null,
					name: self.name || '',
					amLoggedIn: I.amLoggedIn()
				};
				self.$el.html(ich['getstarted-tpl'](self.data));

			
		     	setTimeout(function(){
            		if (FB){
            			// listen for and handle auth.statusChange events
						FB.Event.subscribe('auth.statusChange', function(response) {
							if (response.authResponse) {
								// user has auth'd your app and is logged into Facebook
								FB.api('/me', function(me){
									self.facebookId = me.id;
									self.name = me.first_name + ' ' + me.last_name;
									self.render();
								});
							} else {
								return false;
							}
						});
            		} else {
            			return false;
            		} 
                }, 10);


				return self;
			},

			onSubmit : function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				form.find('[type="submit"]').attr('disabled', 'disabled');
				var data = form.serializeObject();
				new stash.models.User().save(data, {
					success: function(model, result){
						I.logMeIn(data)
						.done(function(result){
							stash.helpers.navigate('/stash');
						});
						form.find('[type="submit"]').attr('disabled', '');
					},
					error: function(model, error){
						form.find('[type="submit"]').attr('disabled', '');
					}
				});
				return false;
			},
			onFBClick: function(ev){
				ev.preventDefault();
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
					// the user is logged in and has authenticated your
					// app, and response.authResponse supplies
					// the user's ID, a valid access token, a signed
					// request, and the time the access token 
					// and signed request each expire
						var uid = response.authResponse.userID;
						var accessToken = response.authResponse.accessToken;
						I.logMeIn({facebookId: uid})
						.done(function(result){
							self.trigger('stash.login', result);
						})
						.fail(function(error){
							FB.login();
						})
					} else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook, 
					// but has not authenticated your app
						FB.login();
					} else {
					// the user isn't logged in to Facebook.
						FB.login();
					}
 				});

				return false;
			}
		})
	});
})();