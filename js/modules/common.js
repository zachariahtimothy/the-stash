(function(){
	stash.helpers.extendGlobal('stash.views', {
		commonlistItem: Backbone.View.extend({
			events: {
				'click a[href].edit'   : 'onEditClick',
				'click a[href].delete' : 'onDeleteClick'
			},
			initialize: function(){
				 _.bindAll(this, 'render');
				  this.collection.bind('remove', this.remove, this);
			},
			render:function(){
				var self = this;

				self.data = {	
					items: []
				};
				self.collection.forEach(function(item){
					self.data.items.push(item.toJSON());
				});
				self.$el.html(ich['common-list-item-tpl'](self.data));
				return self;
			},
			remove: function(model, collection, idx){
				var self = this;
				var removedItem = self.$('li').each(function(li){
					if ($(this).data() && $(this).data('id') === parseInt(model.id)){
						model.destroy({
							success:function(model, response){
								debugger;
							},
							error: function(model, xhrError){
								debugger;
							}
						});
					}
				});
			},
			onEditClick: function(ev){
				ev.preventDefault();
				var self = this;
			},
			onDeleteClick: function(ev){
				ev.preventDefault();
				var self = this;
			}
		})
	});
})();