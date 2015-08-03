var string = require('alloy/string');
var config = require(WPATH('config'));
var data = require(WPATH('data'));

$.main.removeAllChildren();

for (var i in data) {
	var main = Widget.createController('template/' + data[i].template, data[i]);
	var view = main.getView();

	view.addEventListener('click', function(e) {
		$.main.fireEvent('click:' + this.name, e);

		Ti.API.error('click:' + this.name, e);
	});

	$.main.add(view);

	exports['set' + string.ucfirst(data[i].name) + 'Icon'] = function(value) {
		main.setIcon(value);
	};

	exports['set' + string.ucfirst(data[i].name) + 'Title'] = function(value) {
		main.setTitle(value);
	};
}
