var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

Ti.API.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

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
    $.usernameOrEmail.normal();
    $.password.normal();

    Alloy.Models.signin.set({
        usernameOrEmail : $.usernameOrEmail.value,
        password : $.password.value
    });

    var validate = Alloy.Models.signin.valid();

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
        $.usernameOrEmail.normal();
        $.password.normal();
        
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
        Alloy.Models.signin.reset();

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
        $.usernameOrEmail.normal();
        $.password.normal();

        Alloy.Models.signin.reset();
    });

    $.main.addEventListener('doubletap', function(e) {
        $.usernameOrEmail.normal();
        $.password.normal();

        Alloy.Models.signin.fakeData();
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
