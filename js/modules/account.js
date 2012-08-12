(function(){
	stash.helpers.extendGlobal('stash.views', {
		account: Backbone.View.extend({
			
			domainDefer: new $.Deferred(),
			domainPromise: {},
			domain: {},

			getListItems: function(section){
				var self = this;
				var success = function(result){
					self.trigger('listUpdated', result);
				};
				var error = function(model, error){

				};
				if (section === 'expenses'){
					new stash.collections.Expenses()
					.fetch({
						success: success,
						error:error
					});
				} else if (section === 'income'){
					new stash.collections.Incomes()
					.fetch({
						success: success,
						error:error
					});
				}
				
			},

			events: {
				'change select[name="frequency"]' : 'onSelectChange',
				'change select[name="category"]'  : 'onSelectChange',
				'submit #account-income form'     : 'onIncomeSubmit',
				'submit #account-expenses form'    : 'onExpenseSubmit',
				'submit #account-details form'    : 'onDetailsSubmit'
			},
			initialize: function(){
				var self = this;
				
				stash.domain.fetch().done(function(domainModel){
					var domainData = domainModel.toJSON();
					self.domain.frequencies = domainData.frequencies;
					self.domain.categories = _.filter(domainData.categories, function(category){ 
						if (self.options.section === 'income'){
							return category.type==='income';
						} else if (self.options.section === 'expenses'){
							return category.type==='expense';
						}
					});
					self.render();
				}).fail(function(error){
					var p = this;

				});

				self.getListItems(self.options.section);

				return self;
			},
			render:function(){
				var self = this;
				self.data = {
					section: self.options.section,
					domain: self.domain
				};
				self.data['section_' + self.options.section] = true;

				var oldContainer = $('#account .active');
				//TODO: Add animation
			
				self.$el.html(ich['account-tpl'](self.data))
				.find('.' + self.data.section + ' .container').show().end()
				.find('input[name="date"]').datepicker({"dateFormat":'yy-mm-dd'});
				
				self.on('listUpdated', function(result){
					console.log('result collection: ', result)
					var view = new stash.views.commonlistItem({collection: result}).render();
					self.$('#list-items-container').html(view.el);
				});

				return self;
			},
			onSelectChange: function(ev){
				var select =  $(ev.currentTarget);
				var isAddNew = select.val() === 'add';
				if (isAddNew){
					var view = new stash.views.accountAddDomainData().render();
					view.$el.dialog({
						modal: true,
						title: 'Add a ' + stash.helpers.capitalizeFirstLetter(select.attr('name'))
					});

					view.on('stash:submit', function(formData){
						if (select.attr('name') === 'category'){
							new stash.models.Category().save(formData, {
								success: function(result){
									select.append('<option value="'+result.get('id')+'" selected>'+result.get('name')+'</option>');
									view.$el.dialog('close');
								},
								error: function(model, error){
									//TODO: Add error handling
								}
							});
						} else if (select.attr('name') === 'frequency'){
							new stash.models.Frequency().save(formData, {
								success:function(result){
									select.val(result.get('id'));
									view.$el.dialog('close');
								},
								error: function(){
									//TODO: Add error handling
								}
							});
						}
						
					});

				} else {
					return false;
				}
			},
			onExpenseSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				var data = form.serializeObject();
				new stash.models.Expense().save(data, {
					success: function(result){
						var p = result;
						self.getListItems('expenses');
					},
					error: function(model, error){
						//TODO: Handle error
					}
				})
				return false;
			},
			onIncomeSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				var data = form.serializeObject();
				
				new stash.models.Income().save(data, {
					success: function(result){
						var p = result;
						self.getListItems('income');
					},
					error: function(model, error){
						//TODO: Handle error
					}
				})
				return false;
			},
			onDetailsSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				var data = form.serializeObject();
				new stash.models.User().save(data, {
					success: function(result){
						var p = result;
						self.render();
					},
					error: function(model, error){
						//TODO: Handle error
					}
				})
				return false;
			}
		}),
		accountAddDomainData: Backbone.View.extend({
			events:{
				'submit form' : 'onSubmit'
			},
			render: function(){
				var self = this;
				self.$el.html(ich['account-add-domainbyname-tpl']);
				return self;
			},
			onSubmit: function(ev){
				ev.preventDefault();
				var self = this;
				var form = $(ev.currentTarget);
				var data = form.serializeObject();
				self.trigger('stash:submit', data);
				
				return false;
			}
		})
	});
})();