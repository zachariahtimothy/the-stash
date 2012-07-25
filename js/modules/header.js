(function(){
	stash.helpers.extendGlobal('stash.views', {
		header: Backbone.View.extend({
			events:{
				'click button.login' 	   : 'login'
			},
			render: function(){
				var self = this;
				self.$el.html(ich['header-tpl']);
				return this;
			},
			
			login: function(ev){
				var self = this;

				ev.preventDefault();
			}
		})
	});
})();