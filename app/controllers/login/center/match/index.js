var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'login.menu.match',
        title : L('login.menu.match'),
        leftIcon : 'list'
    });

    $.navbarView.on('left:click', function(e) {
        Alloy.Globals.login.mainWindow.toggleLeftWindow();
    });

    $.navbarView.on('title:dblclick', function(e) {
        $.matchlabelView.scrollToTop();
    });

    $.main.addEventListener('open', function(e) {
        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' login stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.login.stackWindows.length;
        log += ')';

        Alloy.Logger.debug(log);
    });

    $.main.addEventListener('close', function(e) {
        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' login stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.login.stackWindows.length;
        log += ')';

        Alloy.Logger.debug(log);
    });
};

function load() {
    Alloy.Logger.debug('[' + $.main.name + '] load');
    Alloy.Logger.debug('[' + $.main.name + '] load:args: ' + JSON.stringify(args));

    loaded = true;
    openedWindow = false;

    Alloy.Collections.matches.fetch({
        timeout : 60000,
        success : function(model, response) {
            $.activityIndicatorView.visible = false;
            $.contentView.visible = true;

            var data = [];
            var noData = false;

            if (Alloy.Collections.matches.models.length > 0) {
                for (var i in Alloy.Collections.matches.models) {
                    var _data = Alloy.Collections.matches.models[i].transformDataToMatchlabel();

                    data.push(_data);
                }
            } else {
                noData = true;
                data.push({
                    template : 'nodata'
                });
            }

            $.matchlabelView.load({
                data : data,
                noData : noData,
                fetchFirstPage : fetchFirstPage,
                fetchNextPage : fetchNextPage
            });
        },
        error : function(model, response) {
            Alloy.Notifier.showError({
                response : response
            });
        }
    });

    function fetchFirstPage(callback) {
        Alloy.Collections.matches.fetchFirstPage({
            timeout : 60000,
            success : function(model, response) {
                $.activityIndicatorView.visible = false;
                $.contentView.visible = true;

                callback();

                var data = [];
                var noData = false;

                if (Alloy.Collections.matches.models.length > 0) {
                    for (var i in Alloy.Collections.matches.models) {
                        var _data = Alloy.Collections.matches.models[i].transformDataToMatchlabel();

                        data.push(_data);
                    }
                } else {
                    data.push({
                        template : 'nodata'
                    });
                }

                $.matchlabelView.load({
                    data : data,
                    noData : noData,
                    fetchFirstPage : fetchFirstPage,
                    fetchNextPage : fetchNextPage
                });
            },
            error : function(model, response) {
                callback();

                Alloy.Notifier.showError({
                    response : response
                });
            },
            done : function() {
                callback();
            }
        });
    };

    function fetchNextPage(callback) {
        Alloy.Collections.matches.fetchNextPage({
            timeout : 60000,
            success : function(model, response) {
                callback();

                var data = [];

                for (var i in Alloy.Collections.matches.models) {
                    var _data = Alloy.Collections.matches.models[i].transformDataToMatchlabel();

                    data.push(_data);
                }

                $.matchlabelView.add({
                    data : data,
                    fetchNextPage : fetchNextPage
                });
            },
            error : function(model, response) {
                callback();

                Alloy.Notifier.showError({
                    response : response
                });
            },
            done : function() {
                callback();
            }
        });
    };
};

function unLoad() {
    Alloy.Logger.debug('[' + $.main.name + '] unLoad');

    loaded = false;
    openedWindow = false;
};

function fakeData(data) {
    var placehold = require('placehold.it');
    var datas = [];

    for (var i = 1; i <= 20; i++) {
        var datetime = Vendor.Chance.timestamp();
        datas.push({
            template : Vendor.Chance.pick(['after', 'before', 'gameafter', 'gamebefore', 'gamelive', 'gamelivehalftime']),
            leftIcon : placehold.createURL({
                width : 100,
                height : 100
            }).image,
            leftLabel : Vendor.Chance.word(),
            rightIcon : placehold.createURL({
                width : 100,
                height : 100
            }).image,
            rightLabel : Vendor.Chance.word(),
            scoreLabel : Vendor.Chance.integer({
                min : 0,
                max : 99
            }) + ' - ' + Vendor.Chance.integer({
                min : 0,
                max : 99
            }),
            startTimeLabel : Alloy.Moment.unix(datetime).format('HH:mm'),
            startDateLabel : Alloy.Moment.unix(datetime).format('D MMM YYYY')
        });
    }

    datas = _.shuffle(datas);

    return data.concat(datas);
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
