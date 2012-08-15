(function(){
	stash.helpers.extendGlobal('stash.views', {
		commonlistItem: Backbone.View.extend({
			events: {
				'click a[href].edit'   : 'onEditClick',
				'click a[href].delete' : 'onDeleteClick'
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