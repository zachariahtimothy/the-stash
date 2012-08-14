(function(){
	stash.helpers.extendGlobal('stash.views', {
		contactUs: Backbone.View.extend({
			events: {
				'submit form' : 'onSubmit'
			},
			render:function(){
				var self = this;
				self.$el.html(ich['contactus-tpl']);
				return self;
			},
			onSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				new stash.models.Email().send(form.serializeObject(), {
					success: function(result){
						var view = new stash.views.contactUsConfirmation().render();
						self.$el.html(view.el);
					},
					error: function(model, error){
						$('<div/>',{html: stash.helpers.getBackboneError(error)}).dialog();
					}
				})
				
				return false;
			}
		}),
		contactUsConfirmation: Backbone.View.extend({
			render: function(){
				var self = this;
				self.$el.html(ich['contactus-confirmation-tpl']);
				return self;
			}
		})
	});
})();