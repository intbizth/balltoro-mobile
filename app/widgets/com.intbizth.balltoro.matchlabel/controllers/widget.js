var config = require(WPATH('config'));
Widget.Models.matchlabel = Widget.createModel('matchlabel');
var timer = null;

$.main.height = config.height;
$.main.backgroundColor = config.backgroundColor;

$.imageView.width = $.main.height;
$.imageView.height = $.main.height;
$.image.width = $.imageView.width - 4;
$.image.height = $.image.width;

$.titleView.width = Ti.Platform.displayCaps.platformWidth - $.imageView.width;
$.titleView.height = $.main.height;
$.title.width = $.titleView.width - 4;
$.title.height = $.titleView.height;
$.title.color = config.fontColor;

$.line.backgroundColor = config.lineColor;

exports.startTest = function(duration) {
	var chance = require('chance.min'),
	    chance = new chance();
	var placehold = require('placehold.it');

	run();

	timer = setInterval(function() {
		run();
	}, duration);

	function run() {
		var data = {
			image : placehold.createURL(getImageSize()).image,
			title : chance.sentence()
		};

		setData(data);
	};
};

exports.stopTest = function() {
	clearInterval(timer);
	timer = null;
};

function setImage(value) {
	Widget.Models.matchlabel.set({
		image : image
	});
	Widget.Models.matchlabel.save();
	Widget.Models.matchlabel.fetch();

	var data = Widget.Models.matchlabel.toJSON();

	$.image.image = data.image;
};

exports.setImage = function(value) {
	setImage(value);
};

function getImageSize() {
	return {
		width : $.image.width,
		height : $.image.height
	};
};

exports.getImageSize = function() {
	return getImageSize();
};

function setTitle(value) {
	Widget.Models.matchlabel.set({
		title : value
	});
	Widget.Models.matchlabel.save();
	Widget.Models.matchlabel.fetch();

	var data = Widget.Models.matchlabel.toJSON();

	$.title.text = data.title;
};

exports.setTitle = function(value) {
	setTitle(value);
};

function setData(args) {
	Widget.Models.matchlabel.set(args);
	Widget.Models.matchlabel.save();
	Widget.Models.matchlabel.fetch();

	var data = Widget.Models.matchlabel.toJSON();

	$.image.image = data.image;
	$.title.text = data.title;
};

exports.setData = function(args) {
	setData(args);
};
