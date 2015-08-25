var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

var step2Window = Alloy.createController('nologin/register/step2', {
    navigation : args.navigation
});

if (Alloy.Globals.isIos7Plus) {
    $.navbarView.getView().top = 20;
}

$.navbarView.setData({
    id : 'nologin.register.step1',
    title : L('nologin.register.title'),
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
    Alloy.Models.register.resetStep1();
});

$.main.addEventListener('doubletap', function(e) {
    normal();
    Alloy.Models.register.fakeDataStep1();
});

// >> username
ui.setTextFieldNormalAndError($.username);
// << username

// >> email
ui.setTextFieldNormalAndError($.email);
// << email

// >> password
ui.setTextFieldNormalAndError($.password);
// << password

// >> confirmPassword
ui.setTextFieldNormalAndError($.confirmPassword);
// << confirmPassword

// >> nextButton
$.nextButton.act = function() {
    $.nextLabel.opacity = $.nextLabel.opacityAct;
};

$.nextButton.inAct = function() {
    $.nextLabel.opacity = $.nextLabel.opacityInAct;
};

ui.setInActAndAct($.nextButton);

$.nextButton.addEventListener('click', function() {
    normal();

    Alloy.Models.register.set({
        username : $.username.value,
        email : $.email.value,
        password : $.password.value,
        confirmPassword : $.confirmPassword.value
    });

    var validate = Alloy.Models.register.validStep1();

    Ti.API.debug('[' + $.main.name + ']', 'validate:', validate);

    if (validate.result) {
        if (openedWindow) {
            return;
        }

        openedWindow = true;

        args.navigation.openWindow(step2Window.getView());

        step2Window.getView().addEventListener('close', function(e) {
            openedWindow = false;
        });
    } else {
        for (var i in validate.fields) {
            $[validate.fields[i]].error();
            Alloy.Animation.shake($[validate.fields[i]]);
        };
    }
});
// << nextButton

function doBlur(e) {
    if (e.source) {
        blur();
    }
};

function blur() {
    $.username.blur();
    $.email.blur();
    $.password.blur();
    $.confirmPassword.blur();
};

function normal() {
    $.username.normal();
    $.email.normal();
    $.password.normal();
    $.confirmPassword.normal();
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

    Alloy.Models.register.resetStep1();
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
