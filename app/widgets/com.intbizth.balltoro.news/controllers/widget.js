var loaded = false;

$.template = {
    a : false,
    b : false,
    space : false
};

console.error($);

function extendData(datas) {
    var newsDatas = [];
    for (var i in datas) {
        i = parseInt(i);

        newsDatas.push({
            template : (datas[i].length === 1) ? 'a' : 'b',
            data : datas[i]
        });

        newsDatas.push({
            template : 'space'
        });
    }

    return newsDatas;
};

function transformData(model) {
    var attrs = model.toJSON();

    for (var i in $.template) {
        $.template[i] = (i === attrs.template);
    }

    if (attrs.template === 'a') {
        attrs = attrs.data[0];
    } else if (attrs.template === 'b') {

    }

    return attrs;
};

function getLoad() {
    return loaded;
};

function load(datas) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'load', JSON.stringify(datas));

    loaded = true;

    datas = extendData(datas);

    Widget.Collections.news.reset(datas);
};

function unload() {
    Ti.API.debug('[' + Widget.widgetId + ']', 'unload');

    loaded = false;

    Widget.Collections.news.reset([]);
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
