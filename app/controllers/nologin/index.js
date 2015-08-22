var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var ui = require('ui');

var step1Window = Alloy.createController('nologin/register/step1', {
    navigation : $.navigation
});
var signinWindow = Alloy.createController('nologin/signin', {
    navigation : $.navigation
});

// TODO create new widget
var slider = {
    initialize : function() {
        var height = parseInt(Ti.Platform.displayCaps.platformHeight - 160);

        if (Alloy.Globals.isIos7Plus) {
            height = height - 20;
        }

        $.contentTop.height = height;
        $.slider.height = height;
    },
    addView : function(view) {
        if ($.slider.views.length >= 10) {
            return;
        }

        $.slider.addView(view);
        $.slider.showPagingControl = !($.slider.views.length == 1);
    },
    removeView : function(view) {
        $.slider.removeView(view);
        $.slider.showPagingControl = !($.slider.views.length == 1);
    },
    removeAllView : function() {
        if ($.slider.views.length <= 1) {
            return;
        }

        var views = $.slider.views.reverse();

        for (var i in views) {
            if (views[i].toString() !== '[object sliderMain]') {
                $.slider.removeView(views[i]);
            }
        }

        $.slider.showPagingControl = !($.slider.views.length == 1);
    },
    test : function() {
        var random = _.random(1, 100);

        for (var i = 1; i <= random; i++) {
            var view = Ti.UI.createView({
                id : 'slideView' + i,
                backgroundColor : Vendor.Tinycolor.random().toHexString()
            });

            var color = Vendor.Tinycolor(view.backgroundColor);
            color = color.spin(Vendor.Chance.integer({
                min : -360,
                max : 360
            })).toString();

            var label = Ti.UI.createLabel({
                text : i,
                color : color,
                font : {
                    fontSize : 60
                }
            });

            view.add(label);

            slider.addView(view);

            Ti.API.info('slider addView:', i);
        }

        Ti.API.info('slider total:', $.slider.views.length);

        _.delay(function() {
            var random = _.random(0, 1);

            if (random === 0) {
                var random = _.random(1, 100);

                for (var i = 1; i <= random; i++) {
                    if ($.slider.views.length > 0) {
                        var views = _.shuffle($.slider.views);

                        if (views[0].toString() !== '[object sliderMain]') {
                            slider.removeView(views[0]);

                            Ti.API.info('slider removeView:', views[0].toString());
                        }
                    }
                }

            } else if (random === 1) {
                slider.removeAllView();

                Ti.API.info('slider removeAllView');
            }

            Ti.API.info('slider total:', $.slider.views.length);

            _.delay(function() {
                slider.test();
            }, 2000);
        }, 6000);
    },
};

// >> logoImage
$.logoImage.width = Ti.Platform.displayCaps.platformWidth * 0.40;
$.logoImage.height = $.logoImage.width;
// << logoImage

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
    // TODO
    Ti.API.error('Alloy.Facebook.loggedIn', typeof Alloy.Facebook.loggedIn, Alloy.Facebook.loggedIn);

    if (!Alloy.Facebook.loggedIn) {
        Alloy.Facebook.authorize();
    } else {
        Alloy.Facebook.logout();
    }
});
// << signinWithFacebookButton

function initialize() {
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

    $.main.addEventListener('open', function() {
        load();

        Alloy.Globals.nologin.stackWindows.push($.main);
    });

    $.main.addEventListener('close', function() {
        unload();

        Alloy.Globals.nologin.stackWindows.pop();
    });

    slider.initialize();
    // slider.test();
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
