(function(){

	ich.grabTemplates();

	var getTemplates = new $.Deferred();
	var getUser = new $.Deferred();

	$.when(getTemplates, getUser, stash.domain.fetch())
	.done(function(templates, user, domainData){
		Backbone.history.start({pushState: true});
	});

	var templateArray = [];
	$('link[rel=template]').each(function(){
		templateArray.push($(this).attr('href'));
	});
	stash.helpers.fetchTemplatesFromUrl(templateArray)
	.done(getTemplates.resolve)
	.fail(getTemplates.reject);

	getUser.resolve('me');

	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));


	window.fbAsyncInit = function() {
		FB.init({
			appId      : '354627471275289', // App ID
			channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});

		// listen for and handle auth.statusChange events
		FB.Event.subscribe('auth.statusChange', function(response) {

			if (response.authResponse) {
				// user has auth'd your app and is logged into Facebook
				FB.api('/me', function(me){
					stash.currentUser = me;
					//$.mobile.changePage($("#a0-current-month"));
				});
			} else {
				stash.currentUser = null;
			}
		});
	}

	// Trap internal link clicks and navigate via backbone pushstate instead 
	// of letting the browser handle link clicks natively.
	$('a[href^="/"]').live('click',function(ev){
		ev.preventDefault();
		var link = $(ev.currentTarget).attr('href');
		stash.helpers.navigate(link);
	});

	$.fn.serializeObject = function(){
	    var o = {};
	    $.each(this.serializeArray(), function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

})();




