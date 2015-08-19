var fake = true;
var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var program = null;

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'login.menu.league_game',
        title : L('login.menu.league_game'),
        leftIcon : 'list'
    });

    $.navbarView.on('left:click', function(e) {
        Alloy.Globals.login.mainWindow.toggleLeftWindow();
    });

    $.navbarView.on('title:dblclick', function(e) {
        $.matchlabelView.scrollToTop();
    });

    $.main.addEventListener('open', function(e) {
        Alloy.Logger.debug('[' + $.main.name + '] ' + e.type + ' (', 'login stacks: ' + JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')) + ' ' + Alloy.Globals.login.stackWindows.length, ')');
    });

    $.main.addEventListener('close', function(e) {
        Alloy.Logger.debug('[' + $.main.name + '] ' + e.type + ' (', 'login stacks: ' + JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')) + ' ' + Alloy.Globals.login.stackWindows.length, ')');
    });
};

function load() {
    Alloy.Logger.debug('[' + $.main.name + '] load');
    Alloy.Logger.debug('[' + $.main.name + '] load:args: ' + JSON.stringify(args));

    loaded = true;
    openedWindow = false;
    program = Alloy.Collections.programs.where({
        code : args.programCode
    });
    program = program[0].transformDataToLabel();

    Alloy.Logger.debug('[' + $.main.name + '] program: ' + JSON.stringify(program));

    Alloy.Collections.matchesday.setID(args.programCode);

    Alloy.Collections.matchesday.fetch({
        timeout : 60000,
        success : function(model, response) {
            $.activityIndicatorView.visible = false;
            $.contentView.visible = true;

            var data = [];
            var noData = false;

            var section = {
                template : 'section'
            };

            section = _.extend(section, program);

            data.push(section);

            if (fake) {
                data = fakeData(data);
            } else {
                if (Alloy.Collections.matchesday.models.length > 0) {
                    for (var i in Alloy.Collections.matchesday.models) {
                        var _data = Alloy.Collections.matchesday.models[i].transformDataToMatchlabel();

                        data.push(_data);
                    }
                } else {
                    noData = true;
                    data.push({
                        template : 'nodata'
                    });
                }
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
        Alloy.Collections.matchesday.fetchFirstPage({
            timeout : 60000,
            success : function(model, response) {
                $.activityIndicatorView.visible = false;
                $.contentView.visible = true;

                callback();

                var data = [];
                var noData = false;

                var section = {
                    template : 'section'
                };

                section = _.extend(section, program);

                data.push(section);

                if (fake) {
                    data = fakeData(data);
                } else {
                    if (Alloy.Collections.matchesday.models.length > 0) {
                        for (var i in Alloy.Collections.matchesday.models) {
                            var _data = Alloy.Collections.matchesday.models[i].transformDataToMatchlabel();

                            data.push(_data);
                        }
                    } else {
                        data.push({
                            template : 'nodata'
                        });
                    }
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
    };

    function fetchNextPage(callback) {
        if (fake) {
            Alloy.Collections.matchesday.paginator.next = Alloy.Collections.matchesday.config.URL + '/' + Vendor.Chance.pick(['tpl', 'tpl-d1', 'epl', 'tpl-d2']);
        }

        Alloy.Collections.matchesday.fetchNextPage({
            timeout : 60000,
            success : function(model, response) {
                callback();

                var data = [];

                for (var i in Alloy.Collections.matchesday.models) {
                    var _data = Alloy.Collections.matchesday.models[i].transformDataToMatchlabel();

                    data.push(_data);
                }

                if (fake) {
                    data = fakeData(data);
                }

                $.matchlabelView.add({
                    data : data,
                    fetchNextPage : fetchNextPage
                });
            },
            error : function(model, response) {
                Alloy.Notifier.showError({
                    response : response
                });
            }
        });
    };
};

function unLoad() {
    Alloy.Logger.debug('[' + $.main.name + '] unLoad');

    loaded = false;
    openedWindow = false;
    program = null;

    Alloy.Collections.matchesday.removeID();
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
