var global = {
	height1 : 120,
	height2 : 170
};

var params = {
	datetime : 1234567890,
	title : ['', ''],
	image : ['', ''],
	score : [0, 0],
	time : 0,
	halftime : true,
	fulltime : true
};

function initialize() {
	$.leftView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.4);
	$.centerView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.2);
	$.rightView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.4);

	$.leftLabel.width = $.leftView.width * 0.6;
	$.leftImage.width = $.leftView.width * 0.4;

	$.rightLabel.width = $.rightView.width * 0.6;
	$.rightImage.width = $.rightView.width * 0.4;

	Ti.API.error('$.leftView.width:', $.leftView.width);
	Ti.API.error('$.leftLabel.width:', $.leftLabel.width);
	Ti.API.error('$.leftImage.width:', $.leftImage.width);
	Ti.API.error('$.centerView.width:', $.centerView.width);
	Ti.API.error('$.rightView.width:', $.rightView.width);
	Ti.API.error('$.rightLabel.width:', $.rightLabel.width);
	Ti.API.error('$.rightImage.width:', $.rightImage.width);
};

initialize();

/**
 *
 * @param {Object} args
 * state: before
 */
exports.setBefore = function(args) {
	$.main.height = global.height1;
	$.leftLabel.right = 0;
	$.leftImage.left = 0;
	$.leftImage.image = args.image[0];

	$.rightLabel.left = 0;
	$.rightImage.right = 0;
	$.rightImage.image = args.image[1];

	// Ti.API.error(args);
};

/**
 *
 * @param {Object} args
 * state: gamebefore
 */
exports.setGameBefore = function(args) {
	$.main.height = global.height1;
};

/**
 *
 * @param {Object} args
 * state: gamelive
 */
exports.setGameLive = function(args) {
	$.main.height = global.height1;
};

/**
 *
 * @param {Object} args
 * state: gameafter
 */
exports.setGameAfter = function(args) {
	$.main.height = global.height1;
};

/**
 *
 * @param {Object} args
 * state: after
 */
exports.setAfter = function(args) {
	$.main.height = global.height2;
};
