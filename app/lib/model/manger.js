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
