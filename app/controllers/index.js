var animating = false;

Alloy.Globals.nologin.mainWindow = $.nologin.getView();
Alloy.Globals.nologin.stackWindows = [];
Alloy.Globals.nologin.stackWindowsLogger = function() {
    Ti.API.debug('nologin:stackWindows:', JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name')), Alloy.Globals.nologin.stackWindows.length);
};
Alloy.Globals.login.stackWindows = [];
Alloy.Globals.login.stackWindowsLogger = function() {
    Ti.API.debug('login:stackWindows:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length);
};
Alloy.Globals.login.menuWindows = {};
Alloy.Globals.login.mainWindow = $.login.getView();
Alloy.Globals.login.mainWindow.lock = function() {
    Alloy.Globals.login.mainWindow.openDrawerGestureMode = 'OPEN_MODE_NONE';
};
Alloy.Globals.login.mainWindow.unlock = function() {
    Alloy.Globals.login.mainWindow.openDrawerGestureMode = 'OPEN_MODE_ALL';
};

Alloy.Globals.login.mainWindow.setMenu = function(value) {
    var data = {
        name : '',
        args : {},
        reload : false,
        noToggle : false
    };

    data = _.extend(data, value);

    Ti.API.debug('[setmenu]', 'data:', data);

    Alloy.Globals.login.stackWindows = [];

    if (!data.noToggle) {
        Alloy.Globals.login.mainWindow.toggleLeftWindow();
    }

    Alloy.Globals.login.menuWindows[data.name] = Alloy.createController('login/center/' + data.name + '/index', data.args);
    Alloy.Globals.login.mainWindow.setCenterWindow(Alloy.Globals.login.menuWindows[data.name].getView());
    Alloy.Globals.login.menu = data.name;
};

$.login.getView().open();
$.nologin.getView().open();

$.nologin.getView().opacity = 1;

// >> login & logout
Alloy.Globals.login.force = function(fn) {
    if (animating) {
        return;
    }

    Ti.API.debug('[Alloy.Globals.login.force]', '-->|');

    animating = true;

    Alloy.Globals.login.leftWindow.load();
    Alloy.Globals.login.leftWindow.selectItem(Alloy.Globals.login.defaultMenu);
    Alloy.Globals.login.mainWindow.setMenu({
        name : Alloy.Globals.login.defaultMenu,
        noToggle : true
    });

    Alloy.Globals.login.mainWindow.unlock();

    $.login.getView().opacity = 1;
    $.nologin.getView().opacity = 0;

    if (_.isFunction(fn)) {
        fn();
    }

    _.delay(function() {
        animating = false;

        for (var i in Alloy.Globals.nologin.stackWindows) {
            i = parseInt(i);

            if (i !== 0) {
                Alloy.Globals.nologin.stackWindows[i].close();
            }
        }
    }, 800);
};

Alloy.Globals.nologin.force = function(fn) {
    if (animating) {
        return;
    }

    Ti.API.debug('[Alloy.Globals.nologin.force]', '<--|');

    animating = true;

    Alloy.Globals.login.menu = Alloy.Globals.login.defaultMenu;

    $.nologin.getView().animate({
        opacity : 1,
        duration : 800
    }, function() {
        $.login.getView().opacity = 0;
    });

    if (_.isFunction(fn)) {
        fn();
    }

    _.delay(function() {
        animating = false;

        Alloy.Globals.login.leftWindow.unload();

        for (var i in Alloy.Globals.login.stackWindows) {
            i = parseInt(i);

            if (i !== 0) {
                Alloy.Globals.login.stackWindows[i].close();
            }
        }
    }, 800);
};
// << login & logout

Alloy.Globals.login.force();
