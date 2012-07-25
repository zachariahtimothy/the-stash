(function(){
	stash.helpers.extendGlobal('stash.identity',(function(){

		var me = new stash.models.User({id:'me'});

		// leverage the bootstrapped 'myself' object if available
		if (window.myself && window.myself.val) {
			me = window.myself;
		}
		return _.extend({
			fetchMe: function(){
				return me.fetch();
			},
		})
	})());
})();