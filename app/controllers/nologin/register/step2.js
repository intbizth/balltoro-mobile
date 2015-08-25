var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Alloy.Logger.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

$.nextButton.enable = function() {
    this.backgroundColor = this.backgroundColorEnable;
};

$.nextButton.disable = function() {
    this.backgroundColor = this.backgroundColorDisable;
};

// $.nextButton.disable();
// $.nextButton.enable();

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

console.valueOf(doClickCamera);

function doClickCamera(e){
      Ti.Media.showCamera({
      	saveToPhotoGallery : true
      	
      });
};

function doClickAddPhoto(e){
	Ti.Media.openPhotoGallery();
};

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
