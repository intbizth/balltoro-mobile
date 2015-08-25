var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

var step1Window = Alloy.createController('nologin/register/step1', {
    navigation : $.navigation
});
var signinWindow = Alloy.createController('nologin/signin', {
    navigation : $.navigation
});

// TODO facebook
Alloy.Facebook.permissions = ['publish_stream', 'read_stream'];
Alloy.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        alert('login from uid: ' + e.uid + ', name: ' + JSON.parse(e.data).name);
    } else if (e.cancelled) {
        // user cancelled
        alert('cancelled');
    } else {
        alert(e.error);
    }
});

Alloy.Facebook.addEventListener('logout', function(e) {
    alert('Logged out');
});

if (Alloy.Globals.isIos7Plus) {
    $.content.top = 20;
}

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

$.adssliderView.load();

$.adssliderView.on('click', function(e) {
    Alloy.Dialogs.confirm({
        title : L('openlink'),
        message : e.url,
        yes : L('yes'),
        no : L('no'),
        callback : function(e) {
            Ti.Platform.openURL(e.url);
        },
        evt : {
            url : e.url
        }
    });
});

// >> registerButton
$.registerButton.act = function() {
    $.registerLabel.opacity = $.registerLabel.opacityAct;
};

$.registerButton.inAct = function() {
    $.registerLabel.opacity = $.registerLabel.opacityInAct;
};

ui.setInActAndAct($.registerButton);

$.registerButton.addEventListener('click', function(e) {
    if (openedWindow) {
        return;
    }

    openedWindow = true;

    $.navigation.openWindow(step1Window.getView());

    step1Window.getView().addEventListener('close', function(e) {
        openedWindow = false;
    });
});
// << registerButton

// >> signinButton
$.signinButton.act = function() {
    $.signinLabel.opacity = $.signinLabel.opacityAct;
};

$.signinButton.inAct = function() {
    $.signinLabel.opacity = $.signinLabel.opacityInAct;
};

ui.setInActAndAct($.signinButton);

$.signinButton.addEventListener('click', function(e) {
    if (openedWindow) {
        return;
    }

    openedWindow = true;

    $.navigation.openWindow(signinWindow.getView());

    signinWindow.getView().addEventListener('close', function(e) {
        openedWindow = false;
    });
});
// << signinButton

// >> signinWithFacebookButton
$.signinWithFacebookButton.act = function() {
    $.signinWithFacebookSubButton.opacity = $.signinWithFacebookSubButton.opacityAct;
};

$.signinWithFacebookButton.inAct = function() {
    $.signinWithFacebookSubButton.opacity = $.signinWithFacebookSubButton.opacityInAct;
};

ui.setInActAndAct($.signinButton);

$.signinWithFacebookButton.addEventListener('click', function(e) {
    // TODO facebook
    Ti.API.error('Alloy.Facebook.loggedIn', typeof Alloy.Facebook.loggedIn, Alloy.Facebook.loggedIn);

    if (!Alloy.Facebook.loggedIn) {
        Alloy.Facebook.authorize();
    } else {
        Alloy.Facebook.logout();
    }
});
// << signinWithFacebookButton

function getLoad() {
    return loaded;
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
