(function(){
	stash.helpers.extendGlobal('stash.views', {
		getStarted: Backbone.View.extend({
			events:{
				'submit form' : 'onSubmit'
			},
			render:function(){
				var self = this;
				self.$el.html(ich['getstarted-tpl']);
				return self;
			},

			onSubmit : function(ev){
				ev.preventDefault();
				return false;
			}
		})
	});
})();