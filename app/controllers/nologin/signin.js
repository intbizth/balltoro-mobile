var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Alloy.Logger.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

$.signinButton.enable = function() {
    this.backgroundColor = this.backgroundColorEnable;
};

$.signinButton.disable = function() {
    this.backgroundColor = this.backgroundColorDisable;
};

// $.nextButton.disable();
// $.nextButton.enable();

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

        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' nologin stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.nologin.stackWindows.length;
        log += ')';

        Alloy.Logger.debug(log);
    });

    $.main.addEventListener('close', function(e) {
        unLoad();
        clean();

        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' nologin stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.nologin.stackWindows.length;
        log += ')';

        Alloy.Logger.debug(log);
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
