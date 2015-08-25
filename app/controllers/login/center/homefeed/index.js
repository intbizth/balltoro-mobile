var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

if (Alloy.Globals.isIos7Plus) {
    $.navbarView.getView().top = 20;
}

$.navbarView.setData({
    id : 'login.homefeed',
    title : L('login.homefeed.title'),
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

$.menusliderView.on('click', function(e) {
    console.debug(e);
});

$.menusliderView.on('dblclick', function(e) {
    console.debug(e);
});

var datas = [{
    name : 'menu1',
    title : 'Menu1'
}, {
    name : 'menu2',
    title : 'Menu2'
}, {
    name : 'menu3',
    title : 'Menu3'
}, {
    name : 'menu4',
    title : 'Menu4'
}, {
    name : 'menu5',
    title : 'Menu'
}, {
    name : 'menu6',
    title : 'Menu6'
}];

$.menusliderView.load(datas);

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
