var collection = Widget.Collections.instance('gamelabel');
var model = Widget.createModel('gamelabel');
var timer = null;

exports.startTest = function(duration) {
	var chance = require('chance.min'),
	    chance = new chance();
	var placehold = require('placehold.it');

	var teams = [chance.name(), chance.name()];

	run();

	timer = setInterval(function() {
		run();
	}, duration);

	function run() {
		var data = {
			template : chance.pick(['before', 'gamebefore', 'gamebeforesmall', 'gamelive', 'gameliveht', 'gameafter', 'after']),
			homeClub : {
				name : chance.name(),
				logo : '',
				score : chance.integer({
					min : 0,
					max : 99
				})
			},
			awayClub : {
				name : chance.name(),
				logo : '',
				score : chance.integer({
					min : 0,
					max : 99
				})
			},
			time : chance.timestamp(),
			datetime : chance.timestamp()
		};

		var imageSize = getImageSize(data.template);
		data.homeClub.logo = placehold.createURL(imageSize).image;
		data.awayClub.logo = placehold.createURL(imageSize).image;

		setData(data);
	};
};

exports.stopTest = function() {
	clearInterval(timer);
	timer = null;
};

function getImageSize(template) {
	return Widget.createController('template/' + template).getImageSize();
};

exports.getImageSize = function(template) {
	return getImageSize(template);
};

function setData(args) {
	model.set(args);
	model.save();
	model.fetch();

	var data = model.toJSON();

	$.main.removeAllChildren();
	$.main.add(Widget.createController('template/' + data.template, data).getView());
};

exports.setData = function(args) {
	setData(args);
};
