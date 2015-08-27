var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Ti.API.debug('[' + $.main.name + ']', 'args:', args);

if (Alloy.Globals.isIos7Plus) {
    $.navbarView.getView().top = 20;
}

$.navbarView.setData({
    id : 'login.homefeed',
    title : L('login.homefeed.title'),
    leftIcon : 'list'
});

$.navbarView.on('left:click', function(e) {
    Alloy.Globals.login.mainWindow.toggleLeftWindow();
});

$.main.addEventListener('open', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.login.stackWindows.push($.main);
    Alloy.Globals.login.stackWindowsLogger();

    $.menusliderView.selectItem($.menusliderView.getSelectItem().name);
});

$.main.addEventListener('close', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.login.stackWindows.pop();
    Alloy.Globals.login.stackWindowsLogger();
});

$.menusliderView.on('click', function(e) {
    $.menusliderView.selectItem(e.name);
    loadHomefeed(e.name);
});

$.menusliderView.on('dblclick', function(e) {
    $.menusliderView.selectItem(e.name);
    loadHomefeed(e.name);
});

$.newsView.on('click', function(e) {
    console.error(e);
});

function loadMenu() {
    Alloy.Collections.programs.fetch({
        timeout : 60000,
        success : function(model, response) {
            if (Alloy.Collections.programs.models.length > 0) {
                $.contentView.visible = true;
                $.activityIndicatorView.visible = false;

                var data = _.map(Alloy.Collections.programs.models, function(model) {
                    return model.transformDataToMenuSlider();
                });

                data.unshift({
                    id : 0,
                    name : 'latest',
                    title : L('login.homefeed.latest')
                });

                $.menusliderView.load(data);
                $.menusliderView.selectItem(data[0].name);

                loadHomefeed(data[0].name);
            } else {
                Alloy.Notifier.showNodata();
            }
        },
        error : function(model, response) {
            Alloy.Notifier.showError(response);
        }
    });
};

function loadHomefeed(programCode) {
    Alloy.Collections.homefeed.setID(programCode);
    Alloy.Collections.homefeed.fetch({
        timeout : 60000,
        success : function(model, response) {
            if (Alloy.Collections.homefeed.models.length > 0) {
                var data = Alloy.Collections.homefeed.transformDataToGrid([1, 2]);

                $.newsView.load(data);
            } else {
                Alloy.Notifier.showNodata();
            }
        },
        error : function(model, response) {
            Alloy.Notifier.showError(response);
        }
    });
};

function getLoad() {
    return loaded;
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;

    loadMenu();
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
