Widget.moment = require('alloy/moment');

var debug = false;
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

$.activityIndicator.animateScale = null;

$.list.addEventListener('marker', function(e) {
	console.error('marker:', 'start');

	if (listPulling || listMarking) {
		return;
	}

	listMarking = true;

	console.error('marker:', e);

	fetchNextPage(function() {
		listMarking = false;
		console.error('marker:', 'clear');
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
	console.error('pull:', 'start');

	if (e.active) {
		if ($.activityIndicator.animateScale) {
			$.activityIndicator.transform = $.UI.create('2DMatrix').scale($.activityIndicator.animateScale);
		} else {
			$.activityIndicator.animate({
				transform : $.UI.create('2DMatrix').scale(1.5),
				duration : 600
			}, function() {
				$.activityIndicator.animateScale = 1.5;
			});
		}
	} else {
		if ($.activityIndicator.animateScale) {
			$.activityIndicator.transform = $.UI.create('2DMatrix').scale($.activityIndicator.animateScale);
		} else {
			$.activityIndicator.animate({
				transform : $.UI.create('2DMatrix').scale(1),
				duration : 200
			}, function() {
				$.activityIndicator.animateScale = 1;
			});
		}

		listPulling = false;
	}
};

function pullend(e) {
	console.error('pullend:', 'start');

	if (listPulling || listMarking) {
		return;
	}

	listPulling = true;

	console.error('pullend:', e);

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
				$.activityIndicator.animateScale = null;
				console.error('pullend:', 'clear');
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

function add(args) {
	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'add', args);
	}

	if (args.data.length > 0) {
		$.list.addMarker({
			sectionIndex : 0,
			itemIndex : ($.list.sections.length + args.data.length) - 1
		});
	}

	fetchNextPage = args.fetchNextPage;

	for (var i in args.data) {
		Widget.Collections.matchelabel.add(args.data[i]);
	}

	// Widget.Collections.matchelabel.reset(args.data);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:before:matchelabel:', Widget.Collections.matchelabel.toJSON());
	}

	// extendData();

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

	if (args.data.length === 0) {
		args.data = [{
			template : 'nodata'
		}];
	} else {
		$.list.addMarker({
			sectionIndex : 0,
			itemIndex : args.data.length - 1
		});
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
