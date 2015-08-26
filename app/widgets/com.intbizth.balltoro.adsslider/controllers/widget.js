var loaded = false;

$.template = {
    logo : false,
    page : false
};

$.main.height = parseInt(Ti.Platform.displayCaps.platformHeight - 160);

if (Alloy.Globals.isIos7Plus) {
    $.main.height -= 20;
}

showPagingControl();

function doScroll(e) {
    if (Widget.Collections.pages.length > 0) {
        for (var i in $.pagingControlSubView.children) {
            i = parseInt(i);

            $.pagingControlSubView.children[i].children[1].visible = !(i === e.currentPage);
        }
    }
};

function doClick(e) {
    e.url = e.source.dataURL;

    $.trigger('click', e);
};

function doDblclick(e) {
    e.url = e.source.dataURL;

    $.trigger('dblclick', e);
};

function transformData(model) {
    var attrs = model.toJSON();

    for (var i in $.template) {
        $.template[i] = (i === attrs.template);
    }

    return attrs;
};

function showPagingControl() {
    $.pagingControl.visible = !(Widget.Collections.pages.length === 1);

    if (Widget.Collections.pages.length > 0) {
        $.pagingControlSubView.children[0].children[1].visible = false;
    }
};

function addData(datas) {
    if (!values) {
        values = [];
    }

    Widget.Collections.pages.addData(datas);
    showPagingControl();
};

function getLoad() {
    return loaded;
};

function load(datas) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'load', JSON.stringify(datas));

    Widget.Collections.pages.addData([]);
    showPagingControl();
};

function unload() {
    Ti.API.debug('[' + Widget.widgetId + ']', 'unload');

    loaded = false;

    Widget.Collections.pages.reset([]);

    Ti.API.debug('[' + Widget.widgetId + ']', 'unload:pages:', JSON.stringify(Widget.Collections.pages.toJSON()));
};

var _exports = {
    addData : addData,
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
