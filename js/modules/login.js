(function(){
	var I = stash.identity;

	stash.helpers.extendGlobal('stash.views', {
		login: Backbone.View.extend({
			events:{
				'submit form' : 'onSubmit'
			},
			render:function(){
				var self = this;
				self.$el.html(ich['login-tpl']);
				return self;
			},

			onSubmit: function(ev){
				ev.preventDefault();
				var formData = $(ev.currentTarget).serializeArray();
				var data = {};
				_.each(formData, function(item, i){
					var name = item.name;
					data[name] = item.value;
				});
				I.logMeIn(data)
				.done(function(){
					$.fancybox.close(true);
					stash.helpers.navigate('/stash');
				})
				.fail(function(){
					
					//TODO: Add error here.
				});
				return false;
			}
		})
	});
})();