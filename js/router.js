(function(){
	var C = stash.collections,
	 	M = stash.models,
	 	I = stash.identity;
	var baseUrl = 'thestash/index.php/';
	
	
	var AppRouter = Backbone.Router.extend({
		//Override the default ctor to accomodate codeigniters routing
		constructor: function(options){
			options = options || {};
			var self = this;
			var routeList = self.routes;
			self.routes = {};
			_.each(routeList, function(route, routeKey){
				self.routes[baseUrl + routeKey] = route;
			});
			Backbone.Router.prototype.constructor.call(this, options);
		},
		routes: {
			'routekey' 			: 'actualroute',
			'home'          	: 'home',
			'aboutus'       	: 'aboutus',
			'contactus'     	: 'contactus',
			'termsofuse'    	: 'termsofuse',
			'privacypolicy' 	: 'privacypolicy',
			'getstarted'    	: 'getstarted',
			'resetpassword/:id' : 'resetpassword',

			'stash'         	: 'currentStash',
			'stash/details' 	: 'stashDetails',
			'account/:page'		: 'account',
			'account'			: 'account',
			
			'*catchall'     	: 'catchAll'
		},
		/*** Private router methods ***/
		_loadHeader: function(){
			var view = new stash.views.header().render();
			$('header').html(view.el);
		},
		_loadFooter: function(){
			var view = new stash.views.footer().render();
			$('footer').html(view.el);
		},
		_loadPage: function(view){
			$('#content').html(view.el);
		},
		_login: function(){
			var deferred = $.Deferred();

			var loginView = new stash.views.login().render();
			var loginBox = loginView.$el.dialog({
				title : 'Login',
				modal : true,
				close: function(event, ui) {
					if (!I.amLoggedIn()){
					stash.helpers.navigate('/home');
					$('<div/>', {
						html: 'Sorry but you must be logged in to access this page.'
					}).dialog({
						modal:true,
						title: 'Error',
						buttons: {
							Ok: function() {
								$( this ).dialog( "close" );
								
							}
						}
					});}
				}
			});
			loginView.on('stash.login', function(data){
				deferred.resolve(data);
				loginBox.dialog('close');
			});
			return deferred.promise();
		},


		home: function(){
			router._loadHeader();
			var view = new stash.views.home().render();
			router._loadPage(view);
			router._loadFooter();
		},
		aboutus: function(){
			router._loadHeader();
			router._loadPage(new stash.views.aboutUs().render());
			router._loadFooter();
		},
		contactus : function(){
			router._loadHeader();
			router._loadPage(new stash.views.contactUs().render());
			router._loadFooter();
		},
		termsofuse: function(){
			router._loadHeader();
			router._loadPage(new stash.views.termsOfUse().render());
			router._loadFooter();
		},
		privacypolicy: function(){
			router._loadHeader();
			router._loadPage(new stash.views.privacyPolicy().render());
			router._loadFooter();
		},
		getstarted: function(){
			router._loadHeader();
			var view = new stash.views.getStarted().render();
			router._loadPage(view);
			router._loadFooter();
		},
		resetpassword:function(id){
			router._loadHeader();
			var view = new stash.views.resetPassword({resetId: id}).render();
			router._loadPage(view);
			router._loadFooter();
		},
		currentStash: function(){
			router._loadHeader();
			if (stash.identity.amLoggedIn()){	
				var model = new M.Stash(null)
				model.fetch({
					success: function(result){
						var view = new stash.views.currentStash({model:result}).render();
						router._loadPage(view);
					},
					error: function(model, error, options){
						var errors = JSON.parse(error.responseText);
						var errorTxt = '';
						if (errors && errors.length > 0){
							_.each(errors, function(err){
								errorTxt += err.message+'<br />';
							})
							
						} else {
							errorTxt = 'Oops, we could not load your stash.  Please try again later';
						}
						if (errors.expenseserror){
							stash.helpers.navigate('/account/expenses');
						} else if(errors.incomeserror){
							stash.helpers.navigate('/account/income');
						}
						

					}
				});
			} else {
				//Load home page and pop login box if user attempts to load stash without being logged in.
				//stash.helpers.navigate('/home');
				router._login().done(function(user){
					router.currentStash();
				});
			}
			router._loadFooter();
		},
		stashDetails: function(){
			router._loadHeader();
			if (stash.identity.amLoggedIn()){
				router._loadPage(new stash.views.stashDetails().render());
			} else{

			}
			router._loadFooter();
		},
		account: function(page){
			router._loadHeader();
			if (stash.identity.amLoggedIn()){
				if (!page){
					page = 'expenses';
				}
				var view = new stash.views.account({section: page}).render();
				router._loadPage(view);
			} else {
				router._login().done(function(){
					var view = new stash.views.account({section: page}).render();
					router._loadPage(view);
				});
			}
			router._loadFooter();

		},
		catchAll: function(a, b, c){
			router.home();
		}
	});

	var router = new AppRouter();
})();