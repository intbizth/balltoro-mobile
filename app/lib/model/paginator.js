var manger = require('model/manger');

var paginatorNode = {
    page : 'page',
    total : 'total',
    self : '_links.self.href',
    first : '_links.first.href',
    last : '_links.last.href',
    next : '_links.next.href',
    previous : '_links.previous.href'
};

exports.setFromRestAPI = function(model, response) {
    var data = {
        paginator : {}
    };

    for (var i in paginatorNode) {
        data.paginator[i] = manger.traverseProperties(response.responseJSON, paginatorNode[i]);
    }

    model = _.extend(model, data);

    return model;
};

exports.createCollectionMethod = function() {
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
        fetchStartPage : function(args) {
            var name = this.config.adapter.collection_name;
            var fake = this.config.fake || false;
            var url = this.config.URL || null;

            Ti.API.debug('[' + name + '] fetch start:' + url);

            if (fake) {
                Alloy.Collections[name].fakeData();
                args.success(Alloy.Collections[name].models, Alloy.Collections[name].toJSON());
            } else {
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
                    args.done();
                }
            }
        },
        fetchSelfPage : function(args) {
            var name = this.config.adapter.collection_name;
            var fake = this.config.fake || false;
            var url = (this.paginator && this.paginator.self) ? this.paginator.self : null;

            Ti.API.debug('[' + name + '] fetch self:' + url);

            if (fake) {
                Alloy.Collections[name].fakeData();
                args.success(Alloy.Collections[name].models, Alloy.Collections[name].toJSON());
            } else {
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
                    args.done();
                }
            }
        },
        fetchFirstPage : function(args) {
            var name = this.config.adapter.collection_name;
            var fake = this.config.fake || false;
            var url = (this.paginator && this.paginator.first) ? this.paginator.first : null;

            Ti.API.debug('[' + name + '] fetch first:' + url);

            if (fake) {
                Alloy.Collections[name].fakeData();
                args.success(Alloy.Collections[name].models, Alloy.Collections[name].toJSON());
            } else {
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
                    args.done();
                }
            }
        },
        fetchLastPage : function(args) {
            var name = this.config.adapter.collection_name;
            var fake = this.config.fake || false;
            var url = (this.paginator && this.paginator.last) ? this.paginator.last : null;

            Ti.API.debug('[' + name + '] fetch last:' + url);

            if (fake) {
                Alloy.Collections[name].fakeData();
                args.success(Alloy.Collections[name].models, Alloy.Collections[name].toJSON());
            } else {
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
                    args.done();
                }
            }
        },
        fetchNextPage : function(args) {
            var name = this.config.adapter.collection_name;
            var fake = this.config.fake || false;
            var url = (this.paginator && this.paginator.next) ? this.paginator.next : null;

            Ti.API.debug('[' + name + '] fetch next:' + url);

            if (fake) {
                Alloy.Collections[name].fakeData();
                args.success(Alloy.Collections[name].models, Alloy.Collections[name].toJSON());
            } else {
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
                    args.done();
                }
            }
        },
        fetchPreviousPage : function(args) {
            var name = this.config.adapter.collection_name;
            var fake = this.config.fake || false;
            var url = (this.paginator && this.paginator.previous) ? this.paginator.previous : null;

            Ti.API.debug('[' + name + '] fetch next:' + previous);

            if (fake) {
                Alloy.Collections[name].fakeData();
                args.success(Alloy.Collections[name].models, Alloy.Collections[name].toJSON());
            } else {
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
                    args.done();
                }
            }
        }
    };
};
