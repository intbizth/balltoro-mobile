var manger = require('model/manger');
var matches = require('model/matches');

exports.createModelMethod = function(value) {
    var methods = {};

    methods = _.extend(methods, matches.createModelMethod('transformDataToMatchlabel'));

    methods = manger.filterMethod(methods, value);

    return methods;
};

exports.createCollectionMethod = function(value) {
    var methods = {};

    methods = manger.filterMethod(methods, value);

    return methods;
};
