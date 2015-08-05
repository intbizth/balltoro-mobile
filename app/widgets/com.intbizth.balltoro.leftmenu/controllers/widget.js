var string = require('alloy/string');
var timer = null;
var selected = null;
var items = {
	items : {},
	sections : {},
	sectionItems : {}
};
Widget.config = require(WPATH('config'));
Widget.data = require(WPATH('data'));
Widget.webservice = require('webservice');

function loadItems() {
	for (var key in items.sections) {
		for (var j in items.sections[key].getItems()) {
			items.sectionItems[j] = items.sections[key].getItems()[j];
		}
	}

	for (var key in items) {
		Ti.API.info('1 loadItems:', key, JSON.stringify(_.keys(items[key])));
	};
};

function load() {
	for (var i in Widget.data) {
		if (_.isObject(Widget.data[i])) {
			var args = {
				loadItems : loadItems,
				data : Widget.data[i]
			};

			var main = Widget.createController('template/' + Widget.data[i].template, args);
			var view = main.getView();

			$.main.add(view);

			view.addEventListener('click', function(e) {
				if (!e.source.name) {
					return;
				}

				select(e.source.name);
			});

			if (Widget.data[i].template === 'section') {
				items.sections[Widget.data[i].name] = main;

				for (var j in main.getItems()) {
					items.sectionItems[j] = main.getItems()[j];
				}
			} else {
				items.items[Widget.data[i].name] = main;
			}
		}
	}

	for (var key in items) {
		Ti.API.info('1 load:', key, JSON.stringify(_.keys(items[key])));
	}
};

function unLoad() {
	$.main.removeAllChildren();
};

function findKey(name) {
	var itemsKey = _.keys(items.items);
	var sectionsKey = _.keys(items.sections);
	var sectionItemsKey = _.keys(items.sectionItems);
	var key = '';

	if (_.contains(itemsKey, name)) {
		key = 'items';
	} else if (_.contains(sectionsKey, name)) {
		key = 'sections';
	} else if (_.contains(sectionItemsKey, name)) {
		key = 'sectionItems';
	}

	return key;
};

function select(value) {
	var key1 = findKey(selected);
	var key2 = findKey(value);

	if (key1 !== '') {
		items[key1][selected].inact();
	}

	if (key2 !== '') {
		items[key2][value].act();
	}

	selected = value;
};

exports.startTest = function(duration) {
	var chance = require('chance.min'),
	    chance = new chance();

	run();

	timer = setInterval(function() {
		run();
	}, duration);

	function run() {
		var names = [];

		for (var key in items) {
			for (var name in items[key]) {
				names.push(name);
			}
		}

		select(chance.pick(names));
	};
};

exports.stopTest = function() {
	clearInterval(timer);
	timer = null;
};

exports.act = function(name) {
	var key = findKey(name);

	if (key !== '') {
		items[key][name].act();
	}
};

exports.inact = function(name) {
	var key = findKey(name);

	if (key !== '') {
		items[key][name].inact();
	}
};

exports.setIcon = function(name, value) {
	var key = findKey(name);

	if (key !== '') {
		items[key][name].setIcon(value);
	}
};

exports.setTitle = function(name, value) {
	var key = findKey(name);

	if (key !== '') {
		items[key][name].setTitle(value);
	}
};

exports.getItems = function() {
	return items;
};

exports.getEvents = function() {
	return events;
};

exports.select = function(name) {
	select(name);
};

exports.open = function(name) {
	items.sectionItems[name].open();
};

exports.close = function(name) {
	items.sectionItems[name].close();
};

exports.load = function() {
	load();
};

exports.unLoad = function() {
	unLoad();
};
