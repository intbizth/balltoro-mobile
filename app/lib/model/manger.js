exports.traverseProperties = function(object, string) {
    var output = null;
    var explodedString = string.split('.');

    try {
        var l = explodedString.length;

        for (var i = 0; i < l; i++) {
            object = object[explodedString[i]];
        }

        output = object;
    } catch(e) {
    }

    return output;
};

exports.filterMethod = function(methods, value) {
    if (value) {
        if (_.isString(value)) {
            value = [value];
        }

        var keys = _.keys(methods);
        keys = _.intersection(keys, value);

        if (keys.length > 0) {
            var newMethods = {};

            for (var i in keys) {
                newMethods[keys[i]] = methods[keys[i]];
            }

            methods = newMethods;
        }
    }

    return methods;
};
