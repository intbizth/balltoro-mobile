var global = {
	test : {
		timer : null
	},
	height : 30,
	backgroundColor : '#000',
	leftColor : '#f4564f',
	rightColor : '#f8b92a',
	fontColor : '#fff',
	leftValue : 0,
	rightValue : 0
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

function setLeftValue(value) {
	// 0 -------> 1
	var percentLeft = value * (100 / 1);
	var percentRight = 100 - percentLeft;

	global.leftValue = percentLeft;
	global.rightValue = percentRight;

	$.leftLabel.text = percentLeft.toFixed(2) + '%';
	$.rightLabel.text = percentRight.toFixed(2) + '%';
	$.rightBarView.width = parseInt(percentRight * ($.centerView.width / 100));

	$.centerBarView.transform = Ti.UI.create2DMatrix().rotate(45);

	if (percentLeft === 50) {
		$.centerBarView.visible = false;
	} else if (percentLeft > 50) {
		$.centerBarView.visible = true;
		$.centerBarView.backgroundColor = $.leftBarView.backgroundColor;
	} else if (percentLeft < 50) {
		$.centerBarView.visible = true;
		$.centerBarView.backgroundColor = $.rightBarView.backgroundColor;
	}

	$.centerBarView.left = parseInt(percentLeft * ($.centerView.width / 100)) - 6;
};

function setRightValue(value) {
	// 1 <------- 0
	var percentRight = value * (100 / 1);
	var percentLeft = 100 - percentRight;

	global.leftValue = percentLeft;
	global.rightValue = percentRight;

	$.leftLabel.text = percentLeft.toFixed(2) + '%';
	$.rightLabel.text = percentRight.toFixed(2) + '%';
	$.rightBarView.width = parseInt(percentRight * ($.centerView.width / 100));

	$.centerBarView.transform = Ti.UI.create2DMatrix().rotate(45);

	if (percentLeft === 50) {
		$.centerBarView.visible = false;
	} else if (percentLeft > 50) {
		$.centerBarView.visible = true;
		$.centerBarView.backgroundColor = $.leftBarView.backgroundColor;
	} else if (percentLeft < 50) {
		$.centerBarView.visible = true;
		$.centerBarView.backgroundColor = $.rightBarView.backgroundColor;
	}

	$.centerBarView.left = parseInt(percentLeft * ($.centerView.width / 100)) - 6;
};

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

	global.timer = setInterval(function() {
		run();
	}, duration);

	function run() {
		var random = _.random(0, 1);

		if (random === 1) {
			setLeftValue(chance.floating({
				min : 0,
				max : 1,
				fixed : 7
			}));
		} else {
			setRightValue(chance.floating({
				min : 0,
				max : 1,
				fixed : 7
			}));
		}
	};
};

exports.stopTest = function() {
	clearInterval(global.timer);
	global.timer = null;
};

/**
 *
 * @param {Float} value
 */
exports.setLeftValue = function(value) {
	setLeftValue(value);
};

/**
 *
 * @param {Float} value
 */
exports.setRightValue = function(value) {
	setRightValue(value);
};

/**
 * return {Integer}
 */
exports.getLeftValue = function() {
	return global.leftValue;
};

/**
 * return {Integer}
 */
exports.getRightValue = function() {
	return global.rightValue;
};
