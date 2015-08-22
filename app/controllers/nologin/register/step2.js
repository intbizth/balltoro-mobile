var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var photocamera = require('photocamera');
var ui = require('ui');

Alloy.Logger.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

// >> photoCameraView
$.photoCameraView.width = 242;
$.photoCameraView.leftHideRemove = (Ti.Platform.displayCaps.platformWidth / 2) - (($.photoCameraView.width - 106) / 2);
$.photoCameraView.leftShowRemove = (Ti.Platform.displayCaps.platformWidth / 2) - ($.photoCameraView.width / 2);
$.photoCameraView.left = $.photoCameraView.leftHideRemove;

$.photoCameraView.showRemove = function() {
    var duration = 160;

    $.photoCameraView.animate({
        left : $.photoCameraView.leftShowRemove,
        duration : duration
    }, function() {
        $.photoCameraView.left = $.photoCameraView.leftShowRemove;
    });

    $.removePhoto.visible = true;
    $.removePhoto.animate({
        opacity : 1,
        duration : duration
    }, function() {
        $.removePhoto.opacity = 1;
    });
};

$.photoCameraView.hideRemove = function() {
    var duration = 160;

    $.photoCameraView.animate({
        left : $.photoCameraView.leftHideRemove,
        duration : duration
    }, function() {
        $.photoCameraView.left = $.photoCameraView.leftHideRemove;
    });

    $.removePhoto.animate({
        opacity : 0,
        duration : duration
    }, function() {
        $.removePhoto.opacity = 0;
        $.removePhoto.visible = false;
    });
};
// << photoCameraView

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

});
// << nextButton

// >> addPhoto
$.addPhoto.act = function() {
    this.opacity = this.opacityAct;
};

$.addPhoto.inAct = function() {
    this.opacity = this.opacityInAct;
};

ui.setInActAndAct($.addPhoto);

$.addPhoto.addEventListener('click', function() {
    $.photoCameraView.showRemove();
});
// << addPhoto

// >> openCamera
$.openCamera.act = function() {
    this.opacity = this.opacityAct;
};

$.openCamera.inAct = function() {
    this.opacity = this.opacityInAct;
};

ui.setInActAndAct($.openCamera);

$.openCamera.addEventListener('click', function() {
    $.photoCameraView.showRemove();
});
// << openCamera

// >> removePhoto
$.removePhoto.act = function() {
    this.opacity = this.opacityAct;
};

$.removePhoto.inAct = function() {
    this.opacity = this.opacityInAct;
};

ui.setInActAndAct($.removePhoto);

$.removePhoto.addEventListener('click', function() {
    $.photoCameraView.hideRemove();
});
// << removePhoto

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

        Alloy.Logger.debug(log);
    });
};

function load() {
    Alloy.Logger.debug('[' + $.main.name + '] load');

    loaded = true;
    openedWindow = false;
};

function unload() {
    Alloy.Logger.debug('[' + $.main.name + '] unLoad');

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
