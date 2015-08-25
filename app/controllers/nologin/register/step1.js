var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

var step2Window = Alloy.createController('nologin/register/step2', {
    navigation : args.navigation
});

Ti.API.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

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
    $.username.normal();
    $.email.normal();
    $.password.normal();
    $.confirmPassword.normal();

    Alloy.Models.register.set({
        username : $.username.value,
        email : $.email.value,
        password : $.password.value,
        confirmPassword : $.confirmPassword.value
    });

    var validate = Alloy.Models.register.validStep1();

    console.error(validate);

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

function initialize() {
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
        load();
        $.username.normal();
        $.email.normal();
        $.password.normal();
        $.confirmPassword.normal();

        Alloy.Globals.nologin.stackWindows.push($.main);

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
        Alloy.Models.register.resetStep1();

        Alloy.Globals.nologin.stackWindows.pop();

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

    $.main.addEventListener('longpress', function(e) {
        $.username.normal();
        $.email.normal();
        $.password.normal();
        $.confirmPassword.normal();

        Alloy.Models.register.resetStep1();
    });

    $.main.addEventListener('doubletap', function(e) {
        $.username.normal();
        $.email.normal();
        $.password.normal();
        $.confirmPassword.normal();

        Alloy.Models.register.fakeDataStep1();
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
