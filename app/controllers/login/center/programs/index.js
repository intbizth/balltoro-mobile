var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var program = null;

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'login.menu.leagueGame',
        title : L('login.menu.leagueGame'),
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
    program = Alloy.Collections.programs.where({
        code : args.programCode
    });
    program = program[0].transformDataToLabel();

    Alloy.Logger.debug('[' + $.main.name + '] program: ' + JSON.stringify(program));

    Alloy.Collections.matchesday.setID(args.programCode);

    Alloy.Collections.matchesday.fetchStartPage({
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
        Alloy.Collections.matchesday.fetchNextPage({
            success : function(model, response) {
                callback();

                var data = [];

                for (var i in Alloy.Collections.matchesday.models) {
                    var _data = Alloy.Collections.matchesday.models[i].transformDataToMatchlabel();

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
    program = null;

    Alloy.Collections.matchesday.removeID();
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
