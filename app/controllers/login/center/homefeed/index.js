var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var grid = [1, 2];
var limit = 3;

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

    $.menuslider.selectItem($.menuslider.getSelectItem().name);
});

$.main.addEventListener('close', function(e) {
    Ti.API.debug('[' + $.main.name + ']', e.type);

    Alloy.Globals.login.stackWindows.pop();
    Alloy.Globals.login.stackWindowsLogger();
});

$.menuslider.on('click', function(e) {
    $.activityIndicatorView.opacity = 1;
    $.news.getView().opacity = 0;
    $.menuslider.selectItem(e.name);
    loadHomefeed(e.name);
});

$.news.on('click', function(e) {
    console.error(e);

    if (openedWindow) {
        return;
    }

    openedWindow = true;

    Alloy.Globals.login.mainWindow.lock();

    var detailWindow = Alloy.createController('login/center/homefeed/detail', {
        navigation : $.navigation,
        title : e.title,
        newsID : e.newsID
    });

    $.navigation.openWindow(detailWindow.getView());

    detailWindow.getView().addEventListener('close', function(e) {
        openedWindow = false;

        Alloy.Globals.login.mainWindow.unlock();
    });
});

function loadMenu() {
    Alloy.Collections.programs.fetch({
        success : function(model, response) {
            if (Alloy.Collections.programs.models.length > 0) {
                var data = _.map(Alloy.Collections.programs.models, function(model) {
                    return model.transformDataToMenuSlider();
                });

                data.unshift({
                    id : 0,
                    name : 'latest',
                    title : L('login.homefeed.latest')
                });

                $.menuslider.load(data);
                $.menuslider.selectItem(data[0].name);

                loadHomefeed(data[0].name);
            } else {
                Alloy.Notifier.showNodata();
            }
        },
        error : function(model, response) {
            Alloy.Notifier.showError({
                response : response
            });
        }
    });
};

function loadHomefeed(programCode) {
    var url = Alloy.Collections.homefeed.config.URL + '/' + programCode + '?limit=' + limit;

    Alloy.Collections.homefeed.fetch({
        url : url,
        timeout : 60000,
        success : function(model, response) {
            $.contentView.animate({
                opacity : 1,
                duration : 1200
            }, function() {
                $.contentView.opacity = 1;
            });

            $.activityIndicatorView.animate({
                opacity : 0,
                duration : 1200
            }, function() {
                $.activityIndicatorView.opacity = 0;
            });

            $.news.load({
                data : Alloy.Collections.homefeed.transformDataToGrid(grid),
                fetchFirstPage : fetchFirstPage,
                fetchNextPage : fetchNextPage
            });

            $.news.getView().animate({
                opacity : 1,
                duration : 1200
            }, function() {
                $.news.getView().opacity = 1;
            });
        },
        error : function(model, response) {
            Alloy.Notifier.showError({
                response : response
            });
        }
    });

    function fetchFirstPage(callback) {
        var url = Alloy.Collections.homefeed.paginator.first;

        if (url) {
            Alloy.Collections.homefeed.fetch({
                url : url,
                timeout : 60000,
                success : function(model, response) {
                    callback();

                    $.news.load({
                        data : Alloy.Collections.homefeed.transformDataToGrid(grid),
                        fetchFirstPage : fetchFirstPage,
                        fetchNextPage : fetchNextPage
                    });
                },
                error : function(model, response) {
                    callback();

                    Alloy.Notifier.showError({
                        response : response
                    });
                }
            });
        } else {
            callback();
        }
    };

    function fetchNextPage(callback) {
        var url = Alloy.Collections.homefeed.paginator.next;

        if (url) {
            Alloy.Collections.homefeed.fetch({
                url : url,
                timeout : 60000,
                success : function(model, response) {
                    callback();

                    $.news.add({
                        data : Alloy.Collections.homefeed.transformDataToGrid(grid),
                        fetchNextPage : fetchNextPage
                    });
                },
                error : function(model, response) {
                    callback();

                    Alloy.Notifier.showError({
                        response : response
                    });
                }
            });
        } else {
            callback();

            $.news.end();
        }
    };
};

function getLoad() {
    return loaded;
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;

    $.contentView.opacity = 0;
    $.activityIndicatorView.opacity = 1;

    loadMenu();
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;

    $.contentView.opacity = 0;
    $.activityIndicatorView.opacity = 1;
};

var _exports = {
    getLoad : getLoad,
    load : load,
    unload : unload
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
