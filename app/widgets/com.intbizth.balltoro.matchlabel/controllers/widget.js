Widget.moment = require('alloy/moment');
Widget.string = require('alloy/string');
Widget.Logger = require('logger');

var log = true;
var loaded = false;
var listPulling = false;
var listMarking = false;
var listTimer = null;
var listCount = 0;
var clickTimer = null;
var clickCount = 0;
var fetchFirstPage = function() {
};
var fetchNextPage = function() {
};

$.list.addEventListener('marker', function(e) {
    Widget.Logger.debug('[' + Widget.widgetId + '] marker:start listPulling:' + ((listPulling) ? 'true' : 'false') + ' listMarking:' + ((listMarking) ? 'true' : 'false'));

    if (listPulling || listMarking) {
        return;
    }

    listMarking = true;

    Widget.Logger.debug('[' + Widget.widgetId + '] marker ' + JSON.stringify(e));

    fetchNextPage(function() {
        listMarking = false;

        Widget.Logger.debug('[' + Widget.widgetId + '] marker:end');
    });
});

function extendData(models) {
    if (models.length === 0) {
        models = [models];
    }

    for (var i in models) {
        var data = {};
        var dataModel = models[i].toJSON();

        data = _.extend(data, getBackground(dataModel.template));

        console.error('dataModel:', dataModel);

        models[i].set(data);
        models[i].save();
    }
};

function getBackground(template) {
    var classes = ['_leftView', '_centerView', '_rightView'];
    var data = {};

    for (var i in classes) {
        var backgroundProps = ['backgroundColor', 'backgroundColorInAct', 'backgroundColorAct'];
        var style = $.createStyle({
            classes : template + classes[i]
        });

        for (var j in backgroundProps) {
            var prop = classes[i].replace('_', '') + Widget.string.ucfirst(backgroundProps[j]);

            data[prop] = style[backgroundProps[j]];
        }
    }

    return data;
};

function pull(e) {
    Widget.Logger.debug('[' + Widget.widgetId + '] pull:start');

    if (e.active) {
        $.activityIndicator.animate({
            transform : $.UI.create('2DMatrix').scale(1.5),
            duration : 600
        });
    } else {
        $.activityIndicator.animate({
            transform : $.UI.create('2DMatrix').scale(1),
            duration : 200
        });

        listPulling = false;
    }
};

function pullend(e) {
    Widget.Logger.debug('[' + Widget.widgetId + '] pullend:start listPulling:' + ((listPulling) ? 'true' : 'false') + ' listMarking:' + ((listMarking) ? 'true' : 'false'));

    if (listPulling || listMarking) {
        return;
    }

    listPulling = true;

    Widget.Logger.debug('[' + Widget.widgetId + '] pullend ' + JSON.stringify(e));

    $.list.setContentInsets({
        top : 50
    }, {
        animated : true
    });

    clearInterval(listTimer);
    listTimer = null;
    listCount = 0;

    listTimer = setInterval(function() {
        listCount++;

        console.debug('listTimer:', listTimer);
        console.debug('listCount:', listCount);

        if (listCount >= 2) {
            clearInterval(listTimer);
            listTimer = null;
            listCount = 0;

            fetchFirstPage(function() {
                $.list.setContentInsets({
                    top : 0
                }, {
                    animated : true
                });

                $.activityIndicator.transform = $.UI.create('2DMatrix').scale(1);

                listPulling = false;

                Widget.Logger.debug('[' + Widget.widgetId + '] pullend:end');
            });
        }
    }, 1000);
};

function itemclick(e) {
    clickCount++;

    var item = $.section.getItemAt(e.itemIndex);

    Widget.Logger.debug('[' + Widget.widgetId + '] itemclick:e: ' + JSON.stringify(e));
    Widget.Logger.debug('[' + Widget.widgetId + '] itemclick:item: ' + JSON.stringify(item));
    Widget.Logger.debug('[' + Widget.widgetId + '] itemclick:clickCount: ' + clickCount);

    function clear() {
        clickCount = 0;
        clearTimeout(clickTimer);
        clickTimer = null;
    };

    if (clickCount === 1) {
        clickTimer = _.delay(function() {
            item.leftView.backgroundColor = item.leftView.backgroundColorAct;
            item.centerView.backgroundColor = item.centerView.backgroundColorAct;
            item.rightView.backgroundColor = item.rightView.backgroundColorAct;
            $.section.updateItemAt(e.itemIndex, item);

            _.delay(function() {
                item.leftView.backgroundColor = item.leftView.backgroundColorInAct;
                item.centerView.backgroundColor = item.centerView.backgroundColorInAct;
                item.rightView.backgroundColor = item.rightView.backgroundColorInAct;
                $.section.updateItemAt(e.itemIndex, item);
            }, 400);

            $.trigger('dblclick', e);

            clear();
        }, 400);
    } else {
        item.leftView.backgroundColor = item.leftView.backgroundColorAct;
        item.centerView.backgroundColor = item.centerView.backgroundColorAct;
        item.rightView.backgroundColor = item.rightView.backgroundColorAct;
        $.section.updateItemAt(e.itemIndex, item);

        _.delay(function() {
            item.leftView.backgroundColor = item.leftView.backgroundColorInAct;
            item.centerView.backgroundColor = item.centerView.backgroundColorInAct;
            item.rightView.backgroundColor = item.rightView.backgroundColorInAct;
            $.section.updateItemAt(e.itemIndex, item);
        }, 400);

        $.trigger('click', e);

        clear();
    }
};

function add(args) {
    Widget.Logger.debug('[' + Widget.widgetId + '] add ' + JSON.stringify(args));

    if (args.data.length > 0) {
        var marker = {
            sectionIndex : 0,
            itemIndex : ($.section.items.length + args.data.length) - 1
        };

        Widget.Logger.debug('[' + Widget.widgetId + '] addMarker:' + JSON.stringify(marker));

        $.list.addMarker(marker);
    }

    fetchNextPage = args.fetchNextPage;

    Widget.Collections.matchelabel.add(args.data);

    extendData(Widget.Collections.matchelabel.models);

    Widget.Logger.debug('[' + Widget.widgetId + '] load:after:matchelabel:' + JSON.stringify(Widget.Collections.matchelabel.toJSON()));
};

function load(args) {
    loaded = true;

    Widget.Logger.debug('[' + Widget.widgetId + '] load ' + JSON.stringify(args));

    fetchFirstPage = args.fetchFirstPage;
    fetchNextPage = args.fetchNextPage;

    if (!args.noData) {
        var marker = {
            sectionIndex : 0,
            itemIndex : args.data.length - 1
        };

        Widget.Logger.debug('[' + Widget.widgetId + '] addMarker:' + JSON.stringify(marker));

        $.list.addMarker(marker);
    }

    Widget.Collections.matchelabel.reset(args.data);

    Widget.Logger.debug('[' + Widget.widgetId + '] load:before:matchelabel:' + JSON.stringify(Widget.Collections.matchelabel.toJSON()));

    extendData(Widget.Collections.matchelabel.models);

    Widget.Logger.debug('[' + Widget.widgetId + '] load:after:matchelabel:' + JSON.stringify(Widget.Collections.matchelabel.toJSON()));
};

function unLoad() {
    loaded = false;

    Widget.Logger.debug('[' + Widget.widgetId + '] unLoad');

    Widget.Collections.matchelabel.reset([]);

    Widget.Logger.debug('[' + Widget.widgetId + '] unLoad:matchelabel:' + JSON.stringify(Widget.Collections.matchelabel.toJSON()));
};

exports.getLoad = function() {
    return loaded;
};

exports.add = function(args) {
    add(args);
};

exports.load = function(args) {
    load(args);
};

exports.unLoad = function() {
    unLoad();
};

exports.scrollToTop = function() {
    $.list.scrollToItem(0, 0);
};

exports.scrollToBottom = function() {
    $.list.scrollToItem(0, $.section.items.length - 1);
};
