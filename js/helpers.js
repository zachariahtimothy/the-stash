(function(){

	function extendGlobal(namespace, obj){
		var ctx = window;
		_(namespace.split('.')).each(function(name){
			ctx[name] = ctx[name] || {};
			ctx = ctx[name];
		});
		if (obj) { $.extend(ctx, obj); }
		return ctx;
	}
	extendGlobal('stash.helpers', {
		/**
		Uses jQuery.extend internally but also adds to the global
		namespace if the given namespace doesn't exist.
		*/
		extendGlobal: extendGlobal
	});

	stash.helpers.extendGlobal('stash.helpers', {
		reload: function(){
			Backbone.history.loadUrl();
			$(window).trigger('navigation', {
				oldUrl: location.href,
				newUrl: location.href
			});
		},
		navigate: function(uri){
			var oldUrl = location.href;
			uri = '/thestash/index.php'+uri;
			if (uri.charAt(0)==='/' || uri.charAt(0)==='#') {uri = uri.substring(1);}
			if ((location.hash && location.hash.substring(1) === uri) || (!location.hash && location.pathname.substring(1) === uri)){
				stash.helpers.reload();
			} else {
				Backbone.history.navigate(uri, {trigger:true});
				$(window).trigger('navigation', {
					oldUrl: oldUrl,
					newUrl: location.href
				});
			}
		},
		fetchTemplatesFromUrl: function(urls){
			var defer = new $.Deferred();
			if (!_.isArray(urls)){ urls = [urls];}
			
			if (urls.length === 0) { defer.resolve();}
			
			function getTemplates() {
			    var deferreds = [];

			    _(urls).each(function(url){
			    	deferreds.push(
					$.ajax({
						url:url, 
						success: function(data){
							$('<span/>', {html: data}).find('script[type="text/html"]').each(function(i, script){
								if (ich[script.id]){
									return;
								}
								script = $(script);
								ich.addTemplate(script.attr('id'), script.html().trim());
							});

						}, 
						error: function(error){
							defer.reject(error);
						}
					}));
				});
			    return deferreds;
			}
			
			var templates = getTemplates();
			$.when.apply(null, templates).done(function(){
				defer.resolve();
			});
			return defer.promise();
		},
		getBackboneError: function(error){
			var result = JSON.parse(error.responseText);
			return {
				message: result.message,
				status: error.status
			};
		},
		capitalizeFirstLetter: function(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		getMonthName: function(monthIdx){
			var month=['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		 	return month[monthIdx];
		},
		errorDialog: function(args){
			var dialog = $('<div/>', {
				html: args.html
			}).dialog({
				modal:true, 
				title: args.title || 'Error'
			});
			if (args.timeout){
				setTimeout(function(){
					dialog.dialog('destroy')
				}, args.timeout);
			}
			return dialog;
		}
	});
})();