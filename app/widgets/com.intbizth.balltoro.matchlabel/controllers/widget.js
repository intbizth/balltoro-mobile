Widget.moment = require('alloy/moment');

var debug = true;
var loaded = false;
var listTimer = null;
var listCount = 0;
var clickTimer = null;
var clickCount = 0;
var fetchFirstPage = function() {
};
var fetchNextPage = function() {
};

function extendData() {
	var models = Widget.Collections.matchelabel.models;

	for (var i in models) {
		var data = {};
		var dataModel = models[i].toJSON();

		data = _.extend(data, getBackground(dataModel.template));

		models[i].set(data);
		models[i].save();
	}
};

function getBackground(template) {
	var data = {};
	var style = $.createStyle({
		classes : template + '_row'
	});

	data.backgroundColor = style.backgroundColor;
	data.backgroundColorInAct = data.backgroundColor;
	data.backgroundColorAct = style.backgroundColorAct;

	return data;
};

function pull(e) {
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
	}
};

function pullend(e) {
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
				listTimer = null;
				listCount = 0;
			});
		}
	}, 1000);
};

function itemclick(e) {
	clickCount++;

	var item = $.section.getItemAt(e.itemIndex);
	e.name = item.properties.name;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:e:', e);
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:item:', item);
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:clickCount:', clickCount);
	}

	function claer() {
		clickCount = 0;
		clearTimeout(clickTimer);
		clickTimer = null;
	};

	if (clickCount === 1) {
		clickTimer = _.delay(function() {
		}, 400);
	} else {
	}
};

function load(args) {
	loaded = true;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load', args);
	}

	if (args.data.length === 0) {
		args.data = [{
			template : 'nodata'
		}];
	}

	fetchFirstPage = args.fetchFirstPage;
	fetchNextPage = args.fetchNextPage;

	Widget.Collections.matchelabel.reset(args.data);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:before:matchelabel:', Widget.Collections.matchelabel.toJSON());
	}

	extendData();

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

exports.load = function(args) {
	load(args);
};

exports.unLoad = function() {
	unLoad();
};
