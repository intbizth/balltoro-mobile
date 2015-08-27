var manger = require('model/manger');
var news = require('model/news');

exports.createModelMethod = function(value) {
    var methods = {};

    methods = _.extend(methods, news.createModelMethod('transformDataToPage'));

    methods = manger.filterMethod(methods, value);

    return methods;
};

exports.createCollectionMethod = function(value) {
    var methods = {};

    methods = _.extend(methods, news.createCollectionMethod('transformDataToGrid'));

    methods = manger.filterMethod(methods, value);

    return methods;
};
