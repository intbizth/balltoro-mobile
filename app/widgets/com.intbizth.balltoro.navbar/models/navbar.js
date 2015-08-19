exports.definition = {
	config : {
		defaults : {
			leftIcon : null,
			leftTitle : null,
			leftView : null,
			title : null,
			rightIcon : null,
			rightTitle : null,
			rightView : null
		},
		adapter : {
			type : 'properties',
			collection_name : 'navbar',
			idAttribute : 'id'
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {

		});

		return Model;
	}
};
