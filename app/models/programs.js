var name = 'programs';
var config = require('model/config');
var manger = require('model/manger');var manger = require('model/manger');
var paginator = require('model/paginator');
var load = require('model/' + name);

exports.definition = {
    config : config[name],
    extendModel : function(Model) {
        var methods = {};

        methods = _.extend(methods, load.createModelMethod());

        _.extend(Model.prototype, methods);

        return Model;
    },
    extendCollection : function(Collection) {
        var methods = {};

        methods = _.extend(methods, load.createCollectionMethod());
        methods = _.extend(methods, paginator.createCollectionMethod());

        _.extend(Collection.prototype, methods);

        return Collection;
    }
};
