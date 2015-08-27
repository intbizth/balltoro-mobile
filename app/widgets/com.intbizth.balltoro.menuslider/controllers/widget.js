var loaded = false;

function doClick(e) {
    // console.error(e);
    e.name = e.source.dataName;
    $.trigger('click', e);
};

function doDblclick(e) {
    // console.error(e);

    e.name = e.source.dataName;
    $.trigger('dblclick', e);
};

function selectItem(name) {

};

function getLoad() {
    return loaded;
};

function load(datas) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'load', JSON.stringify(datas));

    loaded = true;

    Widget.Collections.menus.reset(datas);
};

function unload() {
    Ti.API.debug('[' + Widget.widgetId + ']', 'unload');

    loaded = false;

    Widget.Collections.menus.reset([]);

    Ti.API.debug('[' + Widget.widgetId + ']', 'unload:menus:', JSON.stringify(Widget.Collections.menus.toJSON()));
};

var _exports = {
    selectItem : selectItem,
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
