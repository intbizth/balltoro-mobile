var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

Ti.API.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

// >> signinButton
$.signinButton.enable = function() {
    this.backgroundColor = this.backgroundColorEnable;
};

$.signinButton.disable = function() {
    this.backgroundColor = this.backgroundColorDisable;
};

$.signinButton.act = function() {
    $.signinLabel.opacity = $.signinLabel.opacityAct;
};

$.signinButton.inAct = function() {
    $.signinLabel.opacity = $.signinLabel.opacityInAct;
};

ui.setInActAndAct($.signinButton);

$.signinButton.addEventListener('click', function() {
    Alloy.Globals.login.force();
});
// << signinButton

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

        Ti.API.debug(log);
    });

    $.main.addEventListener('close', function(e) {
        unload();
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

        Ti.API.debug(log);
    });
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;
    openedWindow = false;
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;
    openedWindow = false;
};

var _exports = {
    getLoad : function() {
        return loaded;
    },
    load : function() {
        load();
    },
    unload : function() {
        unload();
    }
};

initialize();

for (var i in _exports) {
    exports[i] = _exports[i];
};
