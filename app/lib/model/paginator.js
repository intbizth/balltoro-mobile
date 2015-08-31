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

exports.createCollectionMethod = function() {
    return {
        setPaginator : function(response) {
            var name = this.config.adapter.collection_name;

            var data = {
                paginator : {}
            };

            for (var i in paginatorNode) {
                data.paginator[i] = manger.traverseProperties(response.responseJSON, paginatorNode[i]);
            }

            _.extend(Alloy.Collections[name], data);
        }
    };
};
