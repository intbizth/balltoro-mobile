exports.definition = {
	config : {
		columns : {
			template : 'TEXT',
			homeClub : 'TEXT',
			awayClub : 'TEXT',
			time : 'INTEGER',
			datetime : 'INTEGER'
		},
		defaults : {
			template : '',
			homeClub : '',
			awayClub : '',
			time : 0,
			datetime : 0
		},
		adapter : {
			type : 'properties',
			collection_name : 'gamelabel'
		}
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {

			// For Backbone v1.1.2, uncomment this to override the fetch method
			/*
			 fetch: function(options) {
			 options = options ? _.clone(options) : {};
			 options.reset = true;
			 return Backbone.Collection.prototype.fetch.call(this, options);
			 },
			 */
		});
		return Collection;
	}
};
