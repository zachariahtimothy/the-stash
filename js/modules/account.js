(function(){
	stash.helpers.extendGlobal('stash.views', {
		account: Backbone.View.extend({
			events: {
				'click h3 a[href]' : 'onHeaderClick'
			},
			render:function(){
				var self = this;
				self.data = {

				};
				self.$el.html(ich['account-tpl'](self.data));
				return self;
			},
			onHeaderClick: function(ev){
				ev.preventDefault();
				self.$('.container.open').slideUp().removeClass('open').addClass('closed');
				$(ev.currentTarget).parent().parent().find('.container.closed').slideDown().addClass('open').removeClass('closed');
				return false;
			}
		})
	});
})();