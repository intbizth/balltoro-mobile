exports.definition = {
	config : {
		URL : 'http://demo.balltoro.com/api/matches',
		debug : true,
		adapter : {
			type : 'restapi',
			collection_name : 'matches',
			idAttribute : 'id'
		},
		parentNode : '_embedded.items',
		paginatorNode : {
			page : 'page',
			total : 'total',
			self : '_links.self.href',
			first : '_links.first.href',
			last : '_links.last.href',
			next : '_links.next.href',
			previous : '_links.previous.href'
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {

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
			removeID : function() {
				delete Alloy.Collections[Collection.prototype.config.adapter.collection_name].id;
				delete Alloy.Collections[Collection.prototype.config.adapter.collection_name].idDefault;
			},
			fetchSelfPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator && Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.self) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.self : null;

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
			fetchFirstPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator && Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.first) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.first : null;

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
			fetchLastPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator && Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.last) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.last : null;

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
			fetchNextPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator && Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.next) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.next : null;

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
			fetchPreviousPage : function(args) {
				var url = (Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator && Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.previous) ? Alloy.Collections[Collection.prototype.config.adapter.collection_name].paginator.previous : null;

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
