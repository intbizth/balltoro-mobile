Widget.config = require(WPATH('config'));
Widget.moment = require('alloy/moment');
var timer = null;

if ($.args && $.args.dataModel) {
	setData($.args.dataModel);
}

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
			id : chance.integer({
				min : 0,
				max : 9999
			}),
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
	$.main.add(Widget.createController('template/' + args.template, args).getView());
};

exports.setData = function(args) {
	setData(args);
};
