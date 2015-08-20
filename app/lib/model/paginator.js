var paginatorNode = {
    page : 'page',
    total : 'total',
    self : '_links.self.href',
    first : '_links.first.href',
    last : '_links.last.href',
    next : '_links.next.href',
    previous : '_links.previous.href'
};

exports.setFromRestAPI = function(manger, model, response) {
    var data = {
        paginator : {}
    };

    for (var i in paginatorNode) {
        data.paginator[i] = manger.traverseProperties(response.responseJSON, paginatorNode[i]);
    }

    model = _.extend(model, data);

    return model;
};

exports.createMethod = function(collection) {
    return {
        setID : function(id) {
            collection.id = id;
            collection.idDefault = id;
        },
        hideID : function() {
            collection.id = null;
        },
        showID : function() {
            collection.id = collection.idDefault;
        },
        removeID : function() {
            delete collection.id;
            delete collection.idDefault;
        },
        fetchSelfPage : function(args) {
            var url = (this.paginator && this.paginator.self) ? this.paginator.self : null;

            Alloy.Logger.debug('fetchSelfPage:url: ' + url);

            if (url) {
                collection.hideID();
                collection.fetch({
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
            var url = (this.paginator && this.paginator.first) ? this.paginator.first : null;

            Alloy.Logger.debug('fetchFirstPage:url: ' + url);

            if (url) {
                collection.hideID();
                collection.fetch({
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
            var url = (this.paginator && this.paginator.last) ? this.paginator.last : null;

            Alloy.Logger.debug('fetchLastPage:url: ' + url);

            if (url) {
                collection.hideID();
                collection.fetch({
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
            var url = (this.paginator && this.paginator.next) ? this.paginator.next : null;

            Alloy.Logger.debug('fetchNextPage:url: ' + url);

            if (url) {
                collection.hideID();
                collection.fetch({
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
            var url = (this.paginator && this.paginator.previous) ? this.paginator.previous : null;

            Alloy.Logger.debug('fetchPreviousPage:url: ' + url);

            if (url) {
                collection.hideID();
                collection.fetch({
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
    };
};
