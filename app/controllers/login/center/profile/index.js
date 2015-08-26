var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

if (Alloy.Globals.isIos7Plus) {
    $.navbarView.getView().top = 20;
}

$.navbarView.setData({
    id : 'login.profile',
    title : L('login.profile.title'),
    leftIcon : 'list'
});

$.navbarView.on('left:click', function(e) {
    Alloy.Globals.login.mainWindow.toggleLeftWindow();
});

$.main.addEventListener('open', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.login.stackWindows.push($.main);
    Alloy.Globals.login.stackWindowsLogger();

    load();
});

$.main.addEventListener('close', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.login.stackWindows.pop();
    Alloy.Globals.login.stackWindowsLogger();

    unload();
});

function getLoad() {
    return loaded;
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
