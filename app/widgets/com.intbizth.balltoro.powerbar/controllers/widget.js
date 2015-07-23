var global = {
	height : 30,
	backgroundColor : '#000',
	leftColor : '#f4564f',
	rightColor : '#f8b92a',
	fontColor : '#fff'
};

function initialize() {
	$.main.height = global.height;
	$.main.backgroundColor = global.backgroundColor;
	$.leftBarView.backgroundColor = global.leftColor;
	$.rightBarView.backgroundColor = global.rightColor;
	$.rightBarView.backgroundColor = global.rightColor;
	$.leftLabel.color = global.fontColor;
	$.rightLabel.color = global.fontColor;

	$.leftView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.25);
	$.centerView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.5);
	$.rightView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.25);

	$.leftBarView.width = $.centerView.width;
	$.rightBarView.width = $.centerView.width;
};

initialize();

/**
 *
 * @param {Object} args
 */
exports.loadConfig = function(args) {
	if (args.height) {
		global.height = args.height;
		$.main.height = global.height;
	}

	if (args.backgroundColor) {
		global.backgroundColor = args.backgroundColor;
		$.main.backgroundColor = global.backgroundColor;
	}

	if (args.leftColor) {
		global.leftColor = args.leftColor;
		$.leftBarView.backgroundColor = global.leftColor;
	}

	if (args.rightColor) {
		global.rightColor = args.rightColor;
		$.rightBarView.backgroundColor = global.rightColor;
	}

	if (args.rightColor) {
		global.rightColor = args.rightColor;
		$.rightBarView.backgroundColor = global.rightColor;
	}

	if (args.fontColor) {
		global.fontColor = args.fontColor;
		$.leftLabel.color = global.fontColor;
		$.rightLabel.color = global.fontColor;
	}
};

/**
 *
 * @param {Float} value
 */
exports.setLeftValue = function(value) {
	// 0 -------> 1
	var percentLeft = value * (100 / 1);
	var percentRight = 100 - percentLeft;

	$.leftLabel.text = percentLeft.toFixed(2) + '%';
	$.rightLabel.text = percentRight.toFixed(2) + '%';
	$.rightBarView.width = parseInt(percentRight * ($.centerView.width / 100));

	Ti.API.error($.leftLabel.text, $.rightLabel.text, (parseInt($.leftLabel.text) + parseInt($.rightLabel.text)));
};

/**
 *
 * @param {Float} value
 */
exports.setRightValue = function(value) {
	// 1 <------- 0
	var percentRight = value * (100 / 1);
	var percentLeft = 100 - percentRight;

	$.leftLabel.text = percentLeft.toFixed(2) + '%';
	$.rightLabel.text = percentRight.toFixed(2) + '%';
	$.rightBarView.width = parseInt(percentRight * ($.centerView.width / 100));

	Ti.API.error($.leftLabel.text, $.rightLabel.text, (parseInt($.leftLabel.text) + parseInt($.rightLabel.text)));
};
