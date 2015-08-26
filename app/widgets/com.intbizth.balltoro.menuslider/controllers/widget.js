var loaded = false;
var itemSelectedIndex = null;
var itemSelectedName = null;

function extendData(datas) {
    for (var i in datas) {
        i = parseInt(i);

        var data = {
            index : i
        };

        datas[i] = _.extend(data, datas[i]);
    }

    return datas;
};

function doClick(e) {
    e.index = this.dataIndex;
    e.name = this.dataName;
    $.trigger('click', e);
};

function doDblclick(e) {
    e.index = this.dataIndex;
    e.name = this.dataName;
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

function load(datas) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'load', JSON.stringify(datas));

    loaded = true;
    itemSelectedIndex = null;
    itemSelectedName = null;

    datas = extendData(datas);

    $.main.opacity = $.main.opacityInAct;
    $.main.animate({
        opacity : $.main.opacityAct,
        duration : 1000
    }, function() {
        $.main.opacity = $.main.opacityAct;
    });

    Widget.Collections.menus.reset(datas);
};

function unload() {
    Ti.API.debug('[' + Widget.widgetId + ']', 'unload');

    loaded = false;
    itemSelectedIndex = null;
    itemSelectedName = null;

    $.main.opacity = $.main.opacityInAct;

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
