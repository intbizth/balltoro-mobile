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
            var name = this.config.adapter.collection_name;

            Alloy.Collections[name].id = id;
            Alloy.Collections[name].idDefault = id;
        },
        hideID : function() {
            var name = this.config.adapter.collection_name;

            Alloy.Collections[name].id = null;
        },
        showID : function() {
            var name = this.config.adapter.collection_name;

            Alloy.Collections[name].id = Alloy.Collections[name].idDefault;
        },
        removeID : function() {
            var name = this.config.adapter.collection_name;
            delete Alloy.Collections[name].id;
            delete Alloy.Collections[name].idDefault;
        },
        fetchSelfPage : function(args) {
            var name = this.config.adapter.collection_name;
            var url = (this.paginator && this.paginator.self) ? this.paginator.self : null;

            Alloy.Logger.debug('[' + name + '] fetch self:' + url);

            if (url) {
                Alloy.Collections[name].hideID();
                Alloy.Collections[name].fetch({
                    url : url,
                    timeout : 60000,
                    success : function(model, response) {
                        args.success(model, response);
                    },
                    error : function(model, response) {
                        args.error(model, response);
                    }
                });
            } else {
                args.error({}, null);
            }
        },
        fetchFirstPage : function(args) {
            var name = this.config.adapter.collection_name;
            var url = (this.paginator && this.paginator.first) ? this.paginator.first : null;

            Alloy.Logger.debug('[' + name + '] fetch first:' + url);

            if (url) {
                Alloy.Collections[name].hideID();
                Alloy.Collections[name].fetch({
                    url : url,
                    timeout : 60000,
                    success : function(model, response) {
                        args.success(model, response);
                    },
                    error : function(model, response) {
                        args.error(model, response);
                    }
                });
            } else {
                args.error({}, null);
            }
        },
        fetchLastPage : function(args) {
            var name = this.config.adapter.collection_name;
            var url = (this.paginator && this.paginator.last) ? this.paginator.last : null;

            Alloy.Logger.debug('[' + name + '] fetch last:' + url);

            if (url) {
                Alloy.Collections[name].hideID();
                Alloy.Collections[name].fetch({
                    url : url,
                    timeout : 60000,
                    success : function(model, response) {
                        args.success(model, response);
                    },
                    error : function(model, response) {
                        args.error(model, response);
                    }
                });
            } else {
                args.error({}, null);
            }
        },
        fetchNextPage : function(args) {
            var name = this.config.adapter.collection_name;
            var url = (this.paginator && this.paginator.next) ? this.paginator.next : null;

            Alloy.Logger.debug('[' + name + '] fetch next:' + url);

            if (url) {
                Alloy.Collections[name].hideID();
                Alloy.Collections[name].fetch({
                    url : url,
                    timeout : 60000,
                    success : function(model, response) {
                        args.success(model, response);
                    },
                    error : function(model, response) {
                        args.error(model, response);
                    }
                });
            } else {
                args.error({}, null);
            }
        },
        fetchPreviousPage : function(args) {
            var name = this.config.adapter.collection_name;
            var url = (this.paginator && this.paginator.previous) ? this.paginator.previous : null;

            Alloy.Logger.debug('[' + name + '] fetch next:' + previous);

            if (url) {
                Alloy.Collections[name].hideID();
                Alloy.Collections[name].fetch({
                    url : url,
                    timeout : 60000,
                    success : function(model, response) {
                        args.success(model, response);
                    },
                    error : function(model, response) {
                        args.error(model, response);
                    }
                });
            } else {
                args.error({}, null);
            }
        }
    };
};
