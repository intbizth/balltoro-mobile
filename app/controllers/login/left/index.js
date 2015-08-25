var loaded = false;
var openedWindow = false;

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.main.top = 20;
    }

    $.main.addEventListener('open', function(e) {
        Ti.API.debug('[' + $.main.name + '] ' + e.type);
    });

    $.main.addEventListener('close', function(e) {
        Ti.API.debug('[' + $.main.name + '] ' + e.type);
    });

    $.leftmenuView.on('click', function(e) {
        Ti.API.debug('[' + $.main.name + '] click:' + JSON.stringify(e));

        var name = e.name.split(':');

        switch(name[0]) {
        case 'profile':
            var data = {
                name : name[0]
            };

            Alloy.Globals.login.mainWindow.setMenu(data);
            break;
        case 'match':
            var data = {
                name : name[0]
            };

            Alloy.Globals.login.mainWindow.setMenu(data);
            break;
        case 'programs':
            var data = {
                name : name[0],
                args : {
                    programCode : name[1]
                },
                reload : true
            };

            Alloy.Globals.login.mainWindow.setMenu(data);
            break;
        case 'signout':
            var data = {
                name : name[0]
            };

            Alloy.Globals.login.mainWindow.setMenu(data);
            break;
        };
    });

    $.leftmenuView.on('dblclick', function(e) {
        Ti.API.debug('[' + $.main.name + '] dblclick:' + JSON.stringify(e));

        var name = e.name.split(':');

        switch(name[0]) {
        case 'profile':
            var data = {
                name : name[0],
                reload : true
            };

            Alloy.Globals.login.mainWindow.setMenu(data);
            break;
        case 'match':
            var data = {
                name : name[0],
                reload : true
            };
        case 'programs':
            var data = {
                name : name[0],
                args : {
                    programCode : name[1]
                },
                reload : true
            };

            Alloy.Globals.login.mainWindow.setMenu(data);
            break;
        case 'signout':
            var data = {
                name : name[0]
            };

            Alloy.Globals.login.mainWindow.setMenu(data);
            break;
        };
    });

    $.leftmenuView.on('fetched:nodata', function(e) {
        Alloy.Notifier.showNodata(e);
    });

    $.leftmenuView.on('fetched:error', function(e) {
        Alloy.Notifier.showError(e);
    });
};

function selectMenu(value) {
    $.leftmenuView.selectItem(value.name);
    Alloy.Globals.login.mainWindow.setMenu(value);
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;
    openedWindow = false;
    $.leftmenuView.load();
    selectMenu({
        name : Alloy.Globals.login.defaultMenu,
        noToggle : true
    });
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;
    openedWindow = false;
    $.leftmenuView.unload();
};

exports.getLoad = function() {
    return loaded;
};

exports.load = function() {
    load();
};

exports.unload = function() {
    unload();
};

initialize();
