var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

var step2Window = Alloy.createController('nologin/register/step2', {
    navigation : args.navigation
});

Alloy.Logger.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

$.nextButton.addEventListener('touchstart', function() {
    $.nextLabel.opacity = $.nextLabel.opacityAct;
});

$.nextButton.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.nextButton.addEventListener('touchend', function() {
    $.nextLabel.opacity = $.nextLabel.opacityInAct;
});

$.nextButton.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});

$.nextButton.addEventListener('click', function() {
    args.navigation.openWindow(step2Window.getView());
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
    $.confirmPassword.blur();
};

function clean() {
    $.username.value = '';
    $.email.value = '';
    $.password.value = '';
    $.confirmPassword.value = '';
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
