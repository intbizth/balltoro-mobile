var loaded = false;
var args = {};
var openedWindow = false;

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

function loadEvent() {
    $.registerButton.addEventListener('click', function(e) {
        if (openedWindow) {
            return;
        }

        openedWindow = true;

        $.navigation.openWindow($.registerWindow.getView());

        $.registerWindow.getView().addEventListener('close', function(e) {
            openedWindow = false;
        });
    });

    $.signinButton.addEventListener('click', function(e) {
        if (openedWindow) {
            return;
        }

        openedWindow = true;

        $.navigation.openWindow($.signinWindow.getView());

        $.signinWindow.getView().addEventListener('close', function(e) {
            openedWindow = false;
        });
    });

    $.signinWithFacebookButton.addEventListener('click', function(e) {
        Ti.API.error('Alloy.Facebook.loggedIn', typeof Alloy.Facebook.loggedIn, Alloy.Facebook.loggedIn);

        if (!Alloy.Facebook.loggedIn) {
            Alloy.Facebook.authorize();
        } else {
            Alloy.Facebook.logout();
        }
    });
};

function unLoadEvent() {
    $.registerButton.removeEventListener('click', function(e) {
    });

    $.signinButton.removeEventListener('click', function(e) {
    });

    $.signinWithFacebookButton.removeEventListener('click', function(e) {
    });
};

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
        unLoad();

        Alloy.Globals.nologin.stackWindows.pop();
    });

    $.logoImage.width = Ti.Platform.displayCaps.platformWidth * 0.40;
    $.logoImage.height = $.logoImage.width;

    // >> button
    // > register button
    $.registerLabel.act = function() {
        this.opacity = this.opacityAct;
    };

    $.registerLabel.inact = function() {
        this.opacity = this.opacityInAct;
    };

    $.registerButton.addEventListener('touchstart', function() {
        $.registerLabel.act();
    });

    $.registerButton.addEventListener('touchmove', function() {
        this.fireEvent('touchstart');
    });

    $.registerButton.addEventListener('touchend', function() {
        $.registerLabel.inact();
    });

    $.registerButton.addEventListener('touchcancel', function() {
        this.fireEvent('touchend');
    });
    // < register button

    // > signin button
    $.signinLabel.act = function() {
        this.opacity = this.opacityAct;
    };

    $.signinLabel.inact = function() {
        this.opacity = this.opacityInAct;
    };

    $.signinButton.addEventListener('touchstart', function() {
        $.signinLabel.act();
    });

    $.signinButton.addEventListener('touchmove', function() {
        this.fireEvent('touchstart');
    });

    $.signinButton.addEventListener('touchend', function() {
        $.signinLabel.inact();
    });

    $.signinButton.addEventListener('touchcancel', function() {
        this.fireEvent('touchend');
    });
    // < signin button

    // > signin with facebook button
    $.signinWithFacebookSubButton.act = function() {
        this.opacity = this.opacityAct;
    };

    $.signinWithFacebookSubButton.inact = function() {
        this.opacity = this.opacityInAct;
    };

    $.signinWithFacebookButton.addEventListener('touchstart', function() {
        $.signinWithFacebookSubButton.act();
    });

    $.signinWithFacebookButton.addEventListener('touchmove', function() {
        this.fireEvent('touchstart');
    });

    $.signinWithFacebookButton.addEventListener('touchend', function() {
        $.signinWithFacebookSubButton.inact();
    });

    $.signinWithFacebookButton.addEventListener('touchcancel', function() {
        this.fireEvent('touchend');
    });
    // < signin with facebook button
    // << button

    slider.initialize();
    // slider.test();
};

function load() {
    loaded = true;
    openedWindow = false;
    loadEvent();

    Ti.API.debug($.main.name + ':load');
};

function unLoad() {
    loaded = false;
    openedWindow = false;
    unLoadEvent();

    Ti.API.debug($.main.name + ':unLoad');
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

exports.setArgs = function(value) {
    args = value;
};

initialize();
