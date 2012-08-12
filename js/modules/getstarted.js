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
				var self = this;
				var form = $(ev.currentTarget);
				var data = form.serializeObject();
				new stash.models.User().save(data, {
					success: function(result){
						stash.helpers.navigate('/stash');
					},
					error: function(model, error){

					}
				});
				return false;
			}
		})
	});
})();