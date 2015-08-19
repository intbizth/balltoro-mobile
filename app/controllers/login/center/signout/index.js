var debug = true;
var loaded = false;
var openedWindow = false;

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'login.menu.signout',
        title : L('login.menu.signout')
    });

    $.main.addEventListener('open', function(e) {
        if (debug) {
            Ti.API.debug('[' + $.main.name + ']', e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
        }
    });

    $.main.addEventListener('close', function(e) {
        if (debug) {
            Ti.API.debug('[' + $.main.name + ']', e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
        }
    });
};

function load() {
    if (debug) {
        Ti.API.debug('[' + $.main.name + ']', 'load');
    }

    loaded = true;
    openedWindow = false;

    Alloy.Globals.login.mainWindow.lock();

    _.delay(function() {
        Alloy.Globals.nologin.force();
    }, _.random(800, 4000));
};

function unLoad() {
    if (debug) {
        Ti.API.debug('[' + $.main.name + ']', 'unLoad');
    }

    loaded = false;
    openedWindow = false;

    Alloy.Globals.login.mainWindow.unlock();
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
