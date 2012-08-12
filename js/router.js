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
			'routekey' : 'actualroute',
			'home'          : 'home',
			'aboutus'       : 'aboutus',
			'contactus'     : 'contactus',
			'termsofuse'    : 'termsofuse',
			'privacypolicy' : 'privacypolicy',
			'getstarted'    : 'getstarted',

			'stash'         : 'currentStash',
			'stash/details' : 'stashDetails',
			'account/:page'	: 'account',
			'account'		: 'account',
			
			'*catchall'     : 'catchAll'
		},
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
			//$(window).on('navigation', function(){
				$.fancybox.close();
			//});
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
		currentStash: function(){
			if (stash.identity.amLoggedIn()){
				router._loadHeader();
				router._loadFooter();
				var model = new M.Stash(null)
				model.fetch({
					success: function(result){
						// var result = resultModel.toJSON();
						if (result.has('stasherror')){
							var errors = result.get('stasherror');

						} else {
							var view = new stash.views.currentStash({model:result}).render();
							router._loadPage(view);
						}
						
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
						// var errorView = new stash.views.error({
						// 	model: new stash.models.Error({message:errorTxt})
						// }).render();
						//router._loadPage(errorView);
						stash.helpers.navigate('/account/income');
					}
				});
			} else {
				//Load home page and pop login box if user attempts to load stash without being logged in.
				stash.helpers.navigate('/home');
				var loginView = new stash.views.login().render();
				var loginBox = $.fancybox.open({
					content: loginView.$el,
					title : 'Login',
					helpers:  {
				    	title : {
				        	type : 'over'
				   		}
				   	}
				});
				
			}
			
			
		},
		stashDetails: function(){
			router._loadHeader();
			router._loadPage(new stash.views.stashDetails().render());
			router._loadFooter();
		},
		account: function(page){
			router._loadHeader();
			if (!page){
				page = 'expenses';
			}
			var view = new stash.views.account({section: page}).render();
			router._loadPage(view);
			router._loadFooter();

		},
		catchAll: function(a, b, c){
			router.home();
		}
	});

	var router = new AppRouter();
})();