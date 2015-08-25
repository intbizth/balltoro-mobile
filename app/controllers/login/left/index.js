var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

if (Alloy.Globals.isIos7Plus) {
    $.main.top = 20;
}

$.main.addEventListener('open', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);
});

$.main.addEventListener('close', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);
});

$.leftmenuView.on('click', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type, e);

    var name = e.name.split(':');

    switch(name[0]) {
    case 'profile':
        var data = {
            name : name[0],
            left : name[0]
        };

        selectMenu(data);
        break;
    case 'homefeed':
        var data = {
            name : name[0],
            left : name[0]
        };

        selectMenu(data);
        break;
    // case 'match':
    // var data = {
    // name : name[0],
    // left : name[0]
    // };
    //
    // selectMenu(data);
    // break;
    // case 'programs':
    // var data = {
    // name : name[0],
    // left : name.join(':'),
    // args : {
    // programCode : name[1]
    // },
    // reload : true
    // };
    //
    // selectMenu(data);
    // break;
    case 'signout':
        var data = {
            name : name[0],
            left : name[0]
        };

        selectMenu(data);
        break;
    };
});

$.leftmenuView.on('dblclick', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type, e);

    var name = e.name.split(':');

    switch(name[0]) {
    case 'profile':
        var data = {
            name : name[0],
            left : name[0],
            reload : true
        };

        selectMenu(data);
        break;
    case 'homefeed':
        var data = {
            name : name[0],
            left : name[0],
            reload : true
        };

        selectMenu(data);
        break;
    // case 'match':
    // var data = {
    // name : name[0],
    // left : name[0],
    // reload : true
    // };
    // case 'programs':
    // var data = {
    // name : name[0],
    // left : name.join(':'),
    // args : {
    // programCode : name[1]
    // },
    // reload : true
    // };
    //
    // selectMenu(data);
    // break;
    case 'signout':
        var data = {
            name : name[0],
            left : name[0]
        };

        selectMenu(data);
        break;
    };
});

$.leftmenuView.on('fetched:nodata', function(e) {
    Alloy.Notifier.showNodata(e);
});

$.leftmenuView.on('fetched:error', function(e) {
    Alloy.Notifier.showError(e);
});

function selectMenu(value) {
    Alloy.Globals.login.leftWindow.selectItem(value.left);
    Alloy.Globals.login.mainWindow.setMenu(value);
};

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
