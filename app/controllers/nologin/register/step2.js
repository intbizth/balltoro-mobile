var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

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

});

$.profileImage.addEventListener('touchstart', function() {
    $.profileImage.opacity = $.profileImage.opacityAct;
});

$.profileImage.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.profileImage.addEventListener('touchend', function() {
    $.profileImage.opacity = $.profileImage.opacityInAct;
});

$.profileImage.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});

$.profileImage.addEventListener('click', function() {

});

$.addPhoto.addEventListener('touchstart', function() {
    $.addPhoto.opacity = $.addPhoto.opacityAct;
});

$.addPhoto.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.addPhoto.addEventListener('touchend', function() {
    $.addPhoto.opacity = $.addPhoto.opacityInAct;
});

$.addPhoto.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});

$.addPhoto.addEventListener('click', function() {

});

$.camera.addEventListener('touchstart', function() {
    $.camera.opacity = $.camera.opacityAct;
});

$.camera.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.camera.addEventListener('touchend', function() {
    $.camera.opacity = $.camera.opacityInAct;
});

$.camera.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});

$.camera.addEventListener('click', function() {

});

function doBlur(e) {
    if (e.source) {
        blur();
    }
};

function blur() {
    $.name.blur();
    $.surname.blur();
};

function clean() {
    $.name.value = '';
    $.surname.value = '';
};

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'nologin.register.step2',
        title : L('nologin.register.title'),
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
