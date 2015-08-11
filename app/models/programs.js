exports.definition = {
	config : {
		URL : 'http://128.199.155.38/api/programs',
		debug : true,
		adapter : {
			type : 'restapi',
			collection_name : 'programs',
			idAttribute : 'id'
		},
		parentNode : '_embedded.items',
		pagerfanta : true
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			transformDataToMenus : function() {
				var dataModel = this.toJSON();
				var attrs = {
					id : this.config.adapter.collection_name + ':' + dataModel.code,
					icon : dataModel._links.logo.href,
					title : dataModel.name
				};

				return attrs;
			}
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			setID : function(id) {
				Alloy.Collections[Collection.prototype.config.adapter.collection_name].id = id;
				Alloy.Collections[Collection.prototype.config.adapter.collection_name].idDefault = id;
			},
			hideID : function() {
				Alloy.Collections[Collection.prototype.config.adapter.collection_name].id = null;
			},
			showID : function() {
				Alloy.Collections[Collection.prototype.config.adapter.collection_name].id = Alloy.Collections[Collection.prototype.config.adapter.collection_name].idDefault;
			},
			selfPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta && Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.self) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.self : null;

				if (url) {
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].hideID();
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].fetch({
						url : url,
						timeout : 60000,
						success : function(model, response) {
							args.success(model, response);
						},
						error : function(model, response) {
							args.error(model, response);
						}
					});
				}
			},
			firstPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta && Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.first) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.first : null;

				if (url) {
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].hideID();
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].fetch({
						url : url,
						timeout : 60000,
						success : function(model, response) {
							args.success(model, response);
						},
						error : function(model, response) {
							args.error(model, response);
						}
					});
				}
			},
			lastPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta && Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.last) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.last : null;

				if (url) {
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].hideID();
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].fetch({
						url : url,
						timeout : 60000,
						success : function(model, response) {
							args.success(model, response);
						},
						error : function(model, response) {
							args.error(model, response);
						}
					});
				}
			},
			nextPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta && Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.next) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.next : null;

				if (url) {
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].hideID();
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].fetch({
						url : url,
						timeout : 60000,
						success : function(model, response) {
							args.success(model, response);
						},
						error : function(model, response) {
							args.error(model, response);
						}
					});
				}
			},
			previousPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta && Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.previous) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].pagerfanta.previous : null;

				if (url) {
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].hideID();
					Alloy.Collections[Collection.prototype.config.adapter.collection_name].fetch({
						url : url,
						timeout : 60000,
						success : function(model, response) {
							args.success(model, response);
						},
						error : function(model, response) {
							args.error(model, response);
						}
					});
				}
			}
		});

		return Collection;
	}
};
