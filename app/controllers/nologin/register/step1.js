var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

var step2Window = Alloy.createController('nologin/register/step2', {
    navigation : args.navigation
});

Ti.API.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

// >> nextButton
$.nextButton.enable = function() {
    this.backgroundColor = this.backgroundColorEnable;
};

$.nextButton.disable = function() {
    this.backgroundColor = this.backgroundColorDisable;
};

$.nextButton.act = function() {
    $.nextLabel.opacity = $.nextLabel.opacityAct;
};

$.nextButton.inAct = function() {
    $.nextLabel.opacity = $.nextLabel.opacityInAct;
};

ui.setInActAndAct($.nextButton);

$.nextButton.addEventListener('click', function() {
    if (openedWindow) {
        return;
    }

    openedWindow = true;

    args.navigation.openWindow(step2Window.getView());

    step2Window.getView().addEventListener('close', function(e) {
        openedWindow = false;
    });
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

function clean() {
    $.username.value = '';
    $.email.value = '';
    $.password.value = '';
    $.confirmPassword.value = '';
};

function checkemail(emailAddress) {
    var str = emailAddress;
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (filter.test(str)) {
        testresults = true;
    } else {
        testresults = false;
    }
    return (testresults);
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
