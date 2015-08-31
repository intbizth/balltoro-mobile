var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var photocamera = require('photocamera');
var ui = require('ui');
var photo = null;

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

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
    unload();
    $.photoCameraView.removeProfile();
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
});

$.main.addEventListener('longpress', function(e) {
    normal();
    Alloy.Models.register.resetStep2();
});

$.main.addEventListener('doubletap', function(e) {
    normal();
    Alloy.Models.register.fakeDataStep2();
});

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

$.photoCameraView.removeProfile = function() {
    photo = null;
    $.photoCameraView.hideRemove();
    $.profile.image = $.profile.imageDefault;
};
// << photoCameraView

// >> nextButton
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
    photocamera.openPhotoGallery({
        success : function(e) {
            photo = e.image;
            $.profile.image = e.image;
            $.photoCameraView.showRemove();

            Ti.API.debug('[' + $.main.name + ']', 'photo:', photo);
        },
        error : function(e) {
            var message = photocamera.message(e.code);

            Alloy.Notifier.show({
                message : message,
                style : 'error',
                icon : '/images/notifications/image.png',
                duration : 3000
            });
        },
        cancel : function() {
        }
    });
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
    photocamera.openCamera({
        success : function(e) {
            photo = e.image;
            $.profile.image = e.image;
            $.photoCameraView.showRemove();

            Ti.API.debug('[' + $.main.name + ']', 'photo:', photo);
        },
        error : function(e) {
            var message = photocamera.message(e.code);

            Alloy.Notifier.show({
                message : message,
                style : 'error',
                icon : '/images/notifications/camera.png',
                duration : 3000
            });
        },
        cancel : function() {
        }
    });
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
    $.photoCameraView.removeProfile();

    Ti.API.debug('[' + $.main.name + ']', 'photo:', photo);
});
// << removePhoto

// >> firstName
ui.setTextFieldNormalAndError($.firstName);
// << firstName

// >> lastName
ui.setTextFieldNormalAndError($.lastName);
// << lastName

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
        firstName : $.firstName.value,
        lastName : $.lastName.value
    });

    var validate = Alloy.Models.register.validStep2();

    Ti.API.debug('[' + $.main.name + ']', 'validate:', validate);

    if (validate.result) {
        // TODO submit data and upload photo
        Alloy.Models.register.save();
        Alloy.Globals.login.force();

        _.delay(function() {
            Alloy.Models.register.reset();
            $.photoCameraView.removeProfile();
        }, 800);
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
    $.firstName.blur();
    $.lastName.blur();
};

function normal() {
    $.firstName.normal();
    $.lastName.normal();
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

    Alloy.Models.register.resetStep2();
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
