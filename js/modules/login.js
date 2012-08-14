(function(){
	var I = stash.identity;

	stash.helpers.extendGlobal('stash.views', {
		login: Backbone.View.extend({
			events:{
				'submit form' 			 : 'onSubmit',
				'click a[href].facebook' : 'onFBClick',
				'click a[href].forgot'   : 'onForgotClick',
			},
			render:function(){
				var self = this;
				self.data = {
					email : self.email || null
				};
				self.$el.html(ich['login-tpl'](self.data));

				setTimeout(function(){
            		if (typeof FB !== 'undefined'){
						// listen for and handle auth.statusChange events
						FB.Event.subscribe('auth.statusChange', function(response) {
							if (response.authResponse) {
								// user has auth'd your app and is logged into Facebook
								FB.api('/me', function(me){

								});
							} else {
								//stash.currentUser = null;
							}
						});
					} else {
						return false;
					}
				}, 10);


				return self;
			},

			onSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var data = $(ev.currentTarget).serializeObject();

				I.logMeIn(data)
				.done(function(result){
					self.trigger('stash.login', data.email);
				})
				.fail(function(){
					
					//TODO: Add error here.
				});
			},
			onFBClick: function(ev){
				ev.preventDefault();
				var self = this;
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
					// the user is logged in and has authenticated your
					// app, and response.authResponse supplies
					// the user's ID, a valid access token, a signed
					// request, and the time the access token 
					// and signed request each expire
						var uid = response.authResponse.userID;
						var accessToken = response.authResponse.accessToken;
						I.logMeIn({facebookId: response.authResponse.userID})
						.done(function(result){
							self.trigger('stash.login', result);
						})
						.fail(function(error){

						})
					} else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook, 
					// but has not authenticated your app
					} else {
					// the user isn't logged in to Facebook.
						FB.login();
					}
 				});
				
				
			},
			onForgotClick: function(ev){
				ev.preventDefault();
				var self = this;
				var view = new stash.views.forgotPassword().render();
				view.on('stash.forgot', function(data){
					self.email = data;
					self.render();
				});
				self.$el.html(view.el);
			}

		})
		,
		forgotPassword: Backbone.View.extend({
			events:{
				'submit form' : 'onSubmit'
			},
			render: function(){
				var self = this;
				self.data = {
					hostname: location.hostname
				};
				self.$el.html(ich['forgot-password-tpl'](self.data));
				return self;
			},
			onSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				new stash.models.Email().send(form.serializeObject(), {
					success: function(result){
						self.trigger('stash.forgot', result);
					},
					error: function(model, error){
						$('<div/>',{html: stash.helpers.getBackboneError(error)}).dialog();
					}
				})
				return false;
			}
		}),
		resetPassword: Backbone.View.extend({
			events:{
				'submit form' : 'onSubmit'
			},
			render: function(){
				var self = this;
				self.data = {
					reset_id: self.options.resetId
				};
				self.$el.html(ich['reset-password-tpl'](self.data));
				return self;
			},
			onSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				$.ajax({
					url: stash.settings.apiUrl +'users/resetPassword',
					type: 'POST',
					dataType: 'json',
					data: JSON.stringify(form.serializeObject()),
					success:function(result){
						stash.helpers.navigate('/stash');
					},
					error: function(xhrError){
						var error = stash.helpers.getBackboneError(xhrError); 
						$('<div/>', {html: error.message}).dialog({
							title: 'Error',
							modal: true,
							buttons:{
								Ok: function(){
									$(this).dialog('close');
								}
							}
						});
					}
				});
				return false;
			}
		})
	});
})();