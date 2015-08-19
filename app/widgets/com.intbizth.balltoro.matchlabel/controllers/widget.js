Widget.moment = require('alloy/moment');
Widget.string = require('alloy/string');

var debug = true;
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
	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'marker:start', 'listPulling:', listPulling, 'listMarking:', listMarking);
	}

	if (listPulling || listMarking) {
		return;
	}

	listMarking = true;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'marker', e);
	}

	fetchNextPage(function() {
		listMarking = false;

		if (debug) {
			Ti.API.debug('[' + Widget.widgetId + ']', 'marker:end');
		}
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
	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'pull:start');
	}

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
	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'pullend:start', 'listPulling:', listPulling, 'listMarking:', listMarking);
	}

	if (listPulling || listMarking) {
		return;
	}

	listPulling = true;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'pullend', e);
	}

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

		if (listCount >= 2) {
			fetchFirstPage(function() {
				$.list.setContentInsets({
					top : 0
				}, {
					animated : true
				});

				$.activityIndicator.transform = $.UI.create('2DMatrix').scale(1);

				clearInterval(listTimer);
				listPulling = false;
				listTimer = null;
				listCount = 0;

				if (debug) {
					Ti.API.debug('[' + Widget.widgetId + ']', 'pullend:end');
				}
			});
		}
	}, 1000);
};

function itemclick(e) {
	clickCount++;

	var item = $.section.getItemAt(e.itemIndex);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:e:', e);
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:item:', item);
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:clickCount:', clickCount);
	}

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

		clear();
	}
};

function add(args) {
	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'add', args);
	}

	if (args.data.length > 0) {
		var marker = {
			sectionIndex : 0,
			itemIndex : args.data.length - 1
		};

		if (debug) {
			Ti.API.debug('[' + Widget.widgetId + ']', 'addMarker:', marker);
		}

		$.list.addMarker({
			sectionIndex : 0,
			itemIndex : ($.section.items.length + args.data.length) - 1
		});
	}

	fetchNextPage = args.fetchNextPage;

	Widget.Collections.matchelabel.add(args.data);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:after:matchelabel:', Widget.Collections.matchelabel.toJSON());
	}
};

function load(args) {
	loaded = true;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load', args);
	}

	fetchFirstPage = args.fetchFirstPage;
	fetchNextPage = args.fetchNextPage;

	if (!args.noData) {
		var marker = {
			sectionIndex : 0,
			itemIndex : args.data.length - 1
		};

		if (debug) {
			Ti.API.debug('[' + Widget.widgetId + ']', 'addMarker:', marker);
		}

		$.list.addMarker(marker);
	}

	Widget.Collections.matchelabel.reset(args.data);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:before:matchelabel:', Widget.Collections.matchelabel.toJSON());
	}

	extendData(Widget.Collections.matchelabel.models);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:after:matchelabel:', Widget.Collections.matchelabel.toJSON());
	}
};

function unLoad() {
	loaded = false;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'unLoad');
	}

	Widget.Collections.matchelabel.reset([]);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'unLoad:matchelabel:', Widget.Collections.matchelabel.toJSON());
	}
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
