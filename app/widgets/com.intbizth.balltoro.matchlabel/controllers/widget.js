var global = {
	test : {
		timer : null
	},
	height : 30,
	backgroundColor : '#fff',
	fontColor : '#000',
	lineColor : '#c5c5c5'
};

function initialize() {
	$.main.height = global.height;
	$.main.backgroundColor = global.backgroundColor;

	$.imageView.width = $.main.height;
	$.imageView.height = $.main.height;
	$.image.width = $.imageView.width - 4;
	$.image.height = $.image.width;

	$.titleView.width = Ti.Platform.displayCaps.platformWidth - $.imageView.width;
	$.titleView.height = $.main.height;
	$.title.width = $.titleView.width - 4;
	$.title.height = $.titleView.height;
	$.title.color = global.fontColor;

	$.line.backgroundColor = global.lineColor;
};

initialize();

/**
 *
 * @param {Object} args
 */
exports.loadConfig = function(args) {
	for (var i in global) {
		if (args[i]) {
			global[i] = args[i];
		}
	}

	initialize();
};

/**
 * @param {Integer} duration
 */
exports.startTest = function(duration) {
	var chance = require('chance.min'),
	    chance = new chance();
	var placehold = require('placehold.it');

	run();

	global.timer = setInterval(function() {
		run();
	}, duration);

	function run() {
		var imageSize = {
			width : $.image.width,
			height : $.image.height
		};
		$.image.image = placehold.createURL(imageSize).image;
		$.title.text = chance.sentence();
	};
};

exports.stopTest = function() {
	clearInterval(global.timer);
	global.timer = null;
};

/**
 *
 * @param {String} value
 */
exports.setImage = function(value) {
	$.image.image = value;
};

/**
 * return {width:Integer, height:Integer}
 */
exports.getImageSize = function() {
	return {
		width : $.image.width,
		height : $.image.height
	};
};

/**
 *
 * @param {String} value
 */
exports.setTitle = function(value) {
	$.title.text = value;
};
