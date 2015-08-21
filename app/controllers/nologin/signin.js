var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Alloy.Logger.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

$.signinButton.addEventListener('touchstart', function() {
    $.signinLabel.opacity = $.signinLabel.opacityAct;
});

$.signinButton.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.signinButton.addEventListener('touchend', function() {
    $.signinLabel.opacity = $.signinLabel.opacityInAct;
});

$.signinButton.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});

$.signinButton.addEventListener('click', function() {
    Alloy.Globals.login.force();
});

function doBlur(e) {
    if (e.source) {
        blur();
    }
};

function blur() {
    $.username.blur();
    $.email.blur();
    $.password.blur();

};

function clean() {
    $.username.value = '';
    $.email.value = '';
    $.password.value = '';
};

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'nologin.signin.title',
        title : L('nologin.signin.title'),
        leftIcon : 'arrow_left',
        leftTitle : L('back')
    });

    $.navbarView.on('left:click', function(e) {
        $.main.close();
    });

    $.main.addEventListener('open', function(e) {
        load();

        Alloy.Globals.nologin.stackWindows.push($.main);

        Alloy.Logger.debug('[' + $.main.name + '] ' + e.type + ' (', 'nologin stacks: ' + JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name')) + ' ' + Alloy.Globals.nologin.stackWindows.length, ')');
    });

    $.main.addEventListener('close', function(e) {
        unLoad();
        clean();

        Alloy.Globals.nologin.stackWindows.pop();

        Alloy.Logger.debug('[' + $.main.name + '] ' + e.type + ' (', 'nologin stacks: ' + JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name')) + ' ' + Alloy.Globals.nologin.stackWindows.length, ')');
    });
};

function load() {
    Alloy.Logger.debug('[' + $.main.name + '] load');

    loaded = true;
    openedWindow = false;
};

function unLoad() {
    Alloy.Logger.debug('[' + $.main.name + '] unLoad');

    loaded = false;
    openedWindow = false;
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
