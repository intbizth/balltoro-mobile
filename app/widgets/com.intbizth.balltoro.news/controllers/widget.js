var capitalize = require('underscore.string.min').capitalize;

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

function extendData(data) {
    var newsData = [];

    for (var i in data) {
        i = parseInt(i);

        newsData.push({
            template : (data[i].length === 1) ? 'a' : 'b',
            data : data[i]
        });
    }

    if (newsData.length === 0) {
        newsData.push({
            template : 'nodata'
        });
    } else {
        newsData.push({
            template : 'loading'
        });
    }

    return newsData;
};

function transformData(model) {
    var attrs = model.toJSON();

    if (attrs.template === 'a') {
        if (attrs.data[0]) {
            attrs = attrs.data[0];
        }
    } else if (attrs.template === 'b') {
        if (attrs.data[0]) {
            for (var i in attrs.data[0]) {
                var key = 'left' + capitalize(i);
                attrs[key] = attrs.data[0][i];
            }
        }

        if (attrs.data[1]) {
            for (var i in attrs.data[1]) {
                var key = 'right' + capitalize(i);
                attrs[key] = attrs.data[1][i];
            }
        }
    }

    return attrs;
};

function pull(e) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'pull:start');

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
    Ti.API.debug('[' + Widget.widgetId + ']', 'pullend:start listPulling:', ((listPulling) ? 'true' : 'false'), 'listMarking:', ((listMarking) ? 'true' : 'false'));

    if (listPulling || listMarking) {
        return;
    }

    listPulling = true;

    Ti.API.debug('[' + Widget.widgetId + ']', 'pullend', JSON.stringify(e));

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

                Ti.API.debug('[' + Widget.widgetId + ']', 'pullend:end');
            });
        }
    }, 1000);
};

function marker(e) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'marker:start listPulling:', ((listPulling) ? 'true' : 'false'), 'listMarking:', ((listMarking) ? 'true' : 'false'));

    if (listPulling || listMarking) {
        return;
    }

    listMarking = true;

    Ti.API.debug('[' + Widget.widgetId + ']', 'marker:', JSON.stringify(e));

    fetchNextPage(function() {
        listMarking = false;

        Ti.API.debug('[' + Widget.widgetId + ']', 'marker:end');
    });
};

function doClick(e) {
    e.newsID = e.source.newsID;
    delete e.itemIndex;
    delete e.section;
    delete e.sectionIndex;

    $.trigger('click', e);
};

function doDblClick(e) {
    e.newsID = e.source.newsID;
    delete e.itemIndex;
    delete e.section;
    delete e.sectionIndex;

    $.trigger('dblclick', e);
};

function scrollToTop(animate) {
    $.list.scrollToItem(0, 0, {
        animated : animate
    });
};

function scrollToBottom(animate) {
    $.list.scrollToItem(0, $.section.items.length - 1, {
        animated : animate
    });
};

function getLoad() {
    return loaded;
};

function load(args) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'load:args', JSON.stringify(args));

    loaded = true;

    fetchFirstPage = args.fetchFirstPage;
    fetchNextPage = args.fetchNextPage;

    scrollToTop(false);
    Widget.Collections.news.reset(extendData(args.data));

    Ti.API.debug('[' + Widget.widgetId + ']', 'load:collection', Widget.Collections.news.length, JSON.stringify(Widget.Collections.news.toJSON()));

    if (Widget.Collections.news.length > 0) {
        var marker = {
            sectionIndex : 0,
            itemIndex : Widget.Collections.news.length - 1
        };

        Ti.API.debug('[' + Widget.widgetId + ']', 'addMarker:', JSON.stringify(marker));

        $.list.addMarker(marker);
    }
};

function unload() {
    Ti.API.debug('[' + Widget.widgetId + ']', 'unload');

    loaded = false;

    Widget.Collections.news.reset([]);

    Ti.API.debug('[' + Widget.widgetId + ']', 'unload:collection', Widget.Collections.news.length, JSON.stringify(Widget.Collections.news.toJSON()));
};

function add(args) {
    Ti.API.debug('[' + Widget.widgetId + ']', 'add:args', JSON.stringify(args));

    fetchNextPage = args.fetchNextPage;

    var indexLoading = Widget.Collections.news.length - 1;

    Widget.Collections.news.add(extendData(args.data));

    Widget.Collections.news.remove(Widget.Collections.news.at(indexLoading));

    Ti.API.debug('[' + Widget.widgetId + ']', 'add:collection', Widget.Collections.news.length, JSON.stringify(Widget.Collections.news.toJSON()));

    if (Widget.Collections.news.length > 0) {
        var marker = {
            sectionIndex : 0,
            itemIndex : Widget.Collections.news.length - 1
        };

        Ti.API.debug('[' + Widget.widgetId + ']', 'addMarker:', JSON.stringify(marker));

        $.list.addMarker(marker);
    }
};

function end() {
    if (Widget.Collections.news.length > 1) {
        Widget.Collections.news.pop();
    }
};

var _exports = {
    scrollToTop : scrollToTop,
    scrollToBottom : scrollToBottom,
    getLoad : getLoad,
    load : load,
    unload : unload,
    add : add,
    end : end
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
