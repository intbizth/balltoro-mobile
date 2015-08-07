Widget.config = require(WPATH('config'));
var timer = null;

$.main.height = Widget.config.height;
$.main.backgroundColor = Widget.config.backgroundColor;

$.imageView.width = $.main.height;
$.imageView.height = $.main.height;
$.image.width = $.imageView.width - 4;
$.image.height = $.image.width;

$.titleView.width = Ti.Platform.displayCaps.platformWidth - $.imageView.width;
$.titleView.height = $.main.height;
$.title.width = $.titleView.width - 4;
$.title.height = $.titleView.height;
$.title.color = Widget.config.fontColor;

$.line.backgroundColor = Widget.config.lineColor;

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
	$.image.image = value;
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
	$.title.text = value;
};

exports.setTitle = function(value) {
	setTitle(value);
};

function setData(args) {
	if (args.image) {
		setImage(args.image);
	}

	if (args.title) {
		setTitle(args.title);
	}
};

exports.setData = function(args) {
	setData(args);
};
