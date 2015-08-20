var manger = require('model/manger');
var paginator = require('model/paginator');

exports.definition = {
    config : {
        URL : 'http://demo.balltoro.com/api/matches',
        debug : true,
        adapter : {
            type : 'restapi',
            collection_name : 'matches',
            idAttribute : 'id'
        },
        parentNode : '_embedded.items'
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {

        });

        return Model;
    },
    extendCollection : function(Collection) {
        var methods = {};

         methods = _.extend(methods, paginator.createMethod());

        _.extend(Collection.prototype, methods);

        return Collection;
    }
};
