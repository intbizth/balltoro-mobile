exports.definition = {
	config : {
		adapter : {
			type : 'properties',
			collection_name : 'settings',
			idAttribute : 'id'
		},
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			transformDataToMenus : function() {
				var dataModel = this.toJSON();
				var attrs = dataModel;

				return attrs;
			}
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {

		});

		return Collection;
	}
};
