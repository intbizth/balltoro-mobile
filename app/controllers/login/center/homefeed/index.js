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

    load();
});

$.main.addEventListener('close', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.login.stackWindows.pop();
    Alloy.Globals.login.stackWindowsLogger();

    unload();
});

$.menusliderView.on('click', function(e) {
    console.debug(e);
});

$.menusliderView.on('dblclick', function(e) {
    console.debug(e);
});

function getLoad() {
    return loaded;
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;

    Alloy.Collections.programs.fetch({
        timeout : 60000,
        success : function(model, response) {
            if (Alloy.Collections.programs.models.length > 0) {
                $.contentView.visible = true;
                $.activityIndicatorView.visible = false;

                var data = [{
                    id : 0,
                    name : '',
                    title : L('login.homefeed.lasted')
                }];

                for (var i in Alloy.Collections.programs.models) {
                    data.push(Alloy.Collections.programs.models[i].transformDataToMenuSlider());
                }

                $.menusliderView.load(data);
            } else {
                Alloy.Notifier.showNodata();
            }
        },
        error : function(model, response) {
            Alloy.Notifier.showError(response);
        }
    });
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
