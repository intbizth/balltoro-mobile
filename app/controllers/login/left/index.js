var loaded = false;
var openedWindow = false;

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.main.top = 20;
    }

    $.main.addEventListener('open', function(e) {
        Alloy.Logger.debug('[' + $.main.name + '] ' + e.type);
    });

    $.main.addEventListener('close', function(e) {
        Alloy.Logger.debug('[' + $.main.name + '] ' + e.type);
    });

    $.leftmenuView.on('click', function(e) {
        Alloy.Logger.debug('[' + $.main.name + '] click:' + JSON.stringify(e));

        var name = e.name.split(':');

        switch(name[0]) {
        case 'tester':
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
        Alloy.Logger.debug('[' + $.main.name + '] dblclick:' + JSON.stringify(e));

        var name = e.name.split(':');

        switch(name[0]) {
        case 'tester':
            var data = {
                name : name[0],
                reload : true
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

    $.leftmenuView.on('fetched:nodata', function(e) {
        Alloy.Notifier.showNodata(e);
    });

    $.leftmenuView.on('fetched:error', function(e) {
        Alloy.Notifier.showError(e);
    });

    // $.leftmenuView.getView().addEventListener('click', function(e) {
    // if (!e.source.name) {
    // return;
    // }
    //
    // var menu = e.source.name;
    //
    // if (/program\:/.test(menu)) {
    // menu = 'program';
    // var args = {
    // programCode : menu.replace('program:', '')
    // };
    //
    // Alloy.Globals.login.mainWindow.setMenu(menu, e.source.data);
    // } else {
    // Alloy.Globals.login.mainWindow.setMenu(menu);
    // }
    // });
};

function selectMenu(value) {
    $.leftmenuView.selectItem(value.name);
    Alloy.Globals.login.mainWindow.setMenu(value);
};

function load() {
    Alloy.Logger.debug('[' + $.main.name + '] load');

    loaded = true;
    openedWindow = false;
    $.leftmenuView.load();
    selectMenu({
        name : Alloy.Globals.login.defaultMenu,
        noToggle : true
    });
};

function unLoad() {
    Alloy.Logger.debug('[' + $.main.name + '] unLoad');

    loaded = false;
    openedWindow = false;
    $.leftmenuView.unLoad();
};

exports.getLoad = function() {
    return loaded;
};

exports.load = function() {
    load();
};

exports.unLoad = function() {
    unLoad();
};

initialize();
