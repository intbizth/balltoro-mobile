var loaded = false;

function getLoad() {
    return loaded;
};

function load(args) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'load:args', JSON.stringify(args));

    loaded = true;
};

function unload() {
    Ti.API.debug('[' + Widget.widgetId + ']', 'unload');

    loaded = false;

    Widget.Models.news.clear();
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
