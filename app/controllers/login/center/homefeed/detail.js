var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var timeID = null;
var timeCount = 0;

if (Alloy.Globals.isIos7Plus) {
    $.navbarView.getView().top = 20;
}

$.navbarView.setData({
    id : 'login.homefeed.detail',
    title : _.truncate(args.title, 18),
    leftIcon : 'arrow_left',
    leftTitle : L('back') ,
});

$.navbarView.on('left:click', function(e) {
    unload();
    $.main.close();
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
});

function loadNews(id) {
    var url = Alloy.Collections.news.config.URL + '/' + id;

    Alloy.Collections.news.fetch({
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

            $.detail.load({
                data : {}
            });
        },
        error : function(model, response) {
            Alloy.Notifier.showError({
                response : response
            });
        }
    });
};

function getLoad() {
    return loaded;
};

function load() {
    Ti.API.debug('[' + $.main.name + ']', 'load');

    loaded = true;
    clearInterval(timeID);
    timeID = null;
    timeCount = 0;

    $.contentView.opacity = 0;
    $.activityIndicatorView.opacity = 1;

    timeID = setInterval(function() {
        timeCount += 100;

        console.error('timeCount:', timeCount);

        if (timeCount >= 1400) {

            loadNews(args.newsID);

            clearInterval(timeID);
            timeID = null;
            timeCount = 0;
        }
    }, 100);
};

function unload() {
    Ti.API.debug('[' + $.main.name + ']', 'unload');

    loaded = false;
    clearInterval(timeID);
    timeID = null;
    timeCount = 0;

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
