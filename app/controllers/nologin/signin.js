var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

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
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.nologin.stackWindows.push($.main);
    Alloy.Globals.nologin.stackWindowsLogger();

    load();
});

$.main.addEventListener('close', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.nologin.stackWindows.pop();
    Alloy.Globals.nologin.stackWindowsLogger();

    unload();
});

$.main.addEventListener('longpress', function(e) {
    normal();
    Alloy.Models.signin.reset();
});

$.main.addEventListener('doubletap', function(e) {
    normal();
    Alloy.Models.signin.fakeData();
});

// >> usernameOrEmail
ui.setTextFieldNormalAndError($.usernameOrEmail);
// << usernameOrEmail

// >> password
ui.setTextFieldNormalAndError($.password);
// << password

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
    normal();

    Alloy.Models.signin.set({
        usernameOrEmail : $.usernameOrEmail.value,
        password : $.password.value
    });

    var validate = Alloy.Models.signin.valid();

    Ti.API.debug('[' + $.main.name + ']', 'validate:', validate);

    if (validate.result) {
        // TODO submit data
        Alloy.Models.signin.save();
        Alloy.Globals.login.force();

        _.delay(function() {
            Alloy.Models.signin.reset();
        }, 800);
    } else {
        for (var i in validate.fields) {
            $[validate.fields[i]].error();
            Alloy.Animation.shake($[validate.fields[i]]);
        };
    }
});
// << signinButton

function doBlur(e) {
    if (e.source) {
        blur();
    }
};

function blur() {
    $.usernameOrEmail.blur();
    $.password.blur();
};

function normal() {
    $.usernameOrEmail.normal();
    $.password.normal();
};

function getLoad() {
    return loaded;
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;

    normal();
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;

    Alloy.Models.signin.reset();
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
