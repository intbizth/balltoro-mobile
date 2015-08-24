var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'login.menu.profile',
        title : L('login.menu.profile'),
        leftIcon : 'list'
    });

    $.navbarView.on('left:click', function(e) {
        Alloy.Globals.login.mainWindow.toggleLeftWindow();
    });

    $.navbarView.on('title:dblclick', function(e) {
        $.matchlabelView.scrollToTop();
    });

    $.main.addEventListener('open', function(e) {
        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' login stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.login.stackWindows.length;
        log += ')';

        Ti.API.debug(log);
    });

    $.main.addEventListener('close', function(e) {
        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' login stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.login.stackWindows.length;
        log += ')';

        Ti.API.debug(log);
    });
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');
    Ti.API.debug('[' + $.main.name + ']', 'load:args: ' + JSON.stringify(args));

    loaded = true;
    openedWindow = false;
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;
    openedWindow = false;
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
