var loaded = false;
var itemSelectedIndex = null;
var itemSelectedName = null;

function extendData(data) {
    for (var i in data) {
        i = parseInt(i);

        var _data = {
            index : i
        };

        data[i] = _.extend(_data, data[i]);
    }

    return data;
};

function doClick(e) {
    if (itemSelectedName === e.source.dataName) {
        return;
    }

    e.index = e.source.dataIndex;
    e.name = e.source.dataName;

    $.trigger('click', e);
};

function doDblclick(e) {
    e.index = e.source.dataIndex;
    e.name = e.source.dataName;

    $.trigger('dblclick', e);
};

function getSelectItem() {
    return {
        index : itemSelectedIndex,
        name : itemSelectedName
    };
};

function selectItem(name) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'before:itemSelectedIndex:', itemSelectedIndex);
    Ti.API.debug('[' + Widget.widgetId + ']', 'before:itemSelectedName:', itemSelectedName);

    $.main.touchEnabled = false;

    var dataModels = Widget.Collections.menus.toJSON();

    for (var i in dataModels) {
        i = parseInt(i);

        if (itemSelectedName === dataModels[i].name && $.main.children[i]) {
            $.main.children[i].children[0].visible = true;
            $.main.children[i].children[1].visible = false;

            break;
        }
    }

    for (var i in dataModels) {
        i = parseInt(i);

        if (name === dataModels[i].name && $.main.children[i]) {
            $.main.scrollTo(i * (Ti.Platform.displayCaps.platformWidth * 0.7), 0);

            $.main.children[i].children[0].visible = false;
            $.main.children[i].children[1].visible = true;

            itemSelectedIndex = i;
            itemSelectedName = name;

            break;
        }
    }

    _.delay(function() {
        $.main.touchEnabled = true;
    }, 800);

    Ti.API.debug('[' + Widget.widgetId + ']', 'after:itemSelectedIndex:', itemSelectedIndex);
    Ti.API.debug('[' + Widget.widgetId + ']', 'after:itemSelectedName:', itemSelectedName);
};

function getLoad() {
    return loaded;
};

function load(data) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'load', JSON.stringify(data));

    loaded = true;
    itemSelectedIndex = null;
    itemSelectedName = null;

    Widget.Collections.menus.reset(extendData(data));
};

function unload() {
    Ti.API.debug('[' + Widget.widgetId + ']', 'unload');

    loaded = false;
    itemSelectedIndex = null;
    itemSelectedName = null;

    Widget.Collections.menus.reset([]);

    Ti.API.debug('[' + Widget.widgetId + ']', 'unload:menus:', JSON.stringify(Widget.Collections.menus.toJSON()));
};

var _exports = {
    getSelectItem : getSelectItem,
    selectItem : selectItem,
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
