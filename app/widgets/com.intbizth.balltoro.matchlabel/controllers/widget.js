var global = {
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
 *
 * @param {String} value
 */
exports.setImage = function(value) {
	$.image.image = value;
};

/**
 * return {width:Integer, height:Integer}
 */
exports.setImageSize = function() {
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
