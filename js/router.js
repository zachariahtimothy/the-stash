(function(){
	var C = stash.collections,
	 	M = stash.models,
	 	I = stash.identity;
	var baseUrl = 'TheStash/index.php/';
	
	
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
		},

		home: function(){
			router._loadHeader();
			var view = new stash.views.home().render();
			router._loadPage(view);
			router._loadFooter();
		},
		aboutus: function(){
			router._loadHeader();
			router._loadFooter();
		},
		contactus : function(){
			router._loadHeader();
			router._loadFooter();
		},
		termsofuse: function(){
			router._loadHeader();
			router._loadFooter();
		},
		privacypolicy: function(){
			router._loadHeader();
			router._loadFooter();
		},
		getstarted: function(){
			router._loadHeader();
			var view = new stash.views.getStarted().render();
			router._loadPage(view);
			router._loadFooter();
		},
		currentStash: function(){
			router._loadHeader();
			router._loadFooter();
		},
		stashDetails: function(){
			router._loadHeader();
			router._loadFooter();
		},
		catchAll: function(a, b, c){
			router.home();
		}
	});

	var router = new AppRouter();
})();