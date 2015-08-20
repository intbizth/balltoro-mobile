var manger = require('model/manger');

exports.createModelMethod = function(value) {
    var methods = {
        transformDataToMenus : function() {
            var dataModel = this.toJSON();
            var data = {
                id : 'id',
                code : 'code',
                icon : '_links.logo.href',
                title : 'name',
            };

            for (var i in data) {
                data[i] = manger.traverseProperties(dataModel, data[i]);

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
                data[i] = manger.traverseProperties(dataModel, data[i]);

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
    };

    methods = manger.filterMethod(methods, value);

    return methods;
};

exports.createCollectionMethod = function(value) {
    var methods = {};

    methods = manger.filterMethod(methods, value);

    return methods;
};
