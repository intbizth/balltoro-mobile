function initialize() {
	$.imageView.width = $.main.height;
	$.imageView.height = $.main.height;
	$.image.width = $.imageView.width - 4;
	$.image.height = $.image.width;

	$.titleView.width = Ti.Platform.displayCaps.platformWidth - $.imageView.width;
	$.titleView.height = $.main.height;
	$.title.width = $.titleView.width - 4;
	$.title.height = $.titleView.height;
};

initialize();

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
