var modelManger = require('model/manger');
var modelPaginator = require('model/paginator');

exports.definition = {
    config : {
        URL : 'http://demo.balltoro.com/api/programs',
        debug : true,
        adapter : {
            type : 'restapi',
            collection_name : 'programs',
            idAttribute : 'id'
        },
        parentNode : '_embedded.items'
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {
            transformDataToMenus : function() {
                var dataModel = this.toJSON();
                var data = {
                    id : 'id',
                    code : 'code',
                    icon : '_links.logo.href',
                    title : 'name',
                };

                for (var i in data) {
                    data[i] = modelManger.traverseProperties(dataModel, data[i]);

                    if (_.isNull(data[i])) {
                        data[i] = '';
                    }
                }

                var attrs = {
                    id : this.config.adapter.collection_name + ':' + data.code,
                    icon : data.icon,
                    title : data.title
                };

                return attrs;
            },
            transformDataToLabel : function() {
                var dataModel = this.toJSON();
                var data = {
                    id : 'id',
                    code : 'code',
                    icon : '_links.logo.href',
                    title : 'name',
                };

                for (var i in data) {
                    data[i] = modelManger.traverseProperties(dataModel, data[i]);

                    if (_.isNull(data[i])) {
                        data[i] = '';
                    }
                }

                var attrs = {
                    id : data.id,
                    code : data.code,
                    icon : data.icon,
                    title : data.title
                };

                return attrs;
            }
        });

        return Model;
    },
    extendCollection : function(Collection) {
        var methods = {};

        methods = _.extend(methods, modelPaginator.createMethod(Collection.prototype));

        _.extend(Collection.prototype, methods);

        return Collection;
    }
};
