var global = {
	height1 : 60,
	height2 : 85
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
	var leftWidth = parseInt(Ti.Platform.displayCaps.platformWidth * 0.41);
	var centerWidth = parseInt(Ti.Platform.displayCaps.platformWidth * 0.18);
	var rightWidth = parseInt(Ti.Platform.displayCaps.platformWidth * 0.41);

	// > beforeTemplate
	$.leftViewBeforeTemplate.width = leftWidth;
	$.centerViewBeforeTemplate.width = centerWidth;
	$.rightViewBeforeTemplate.width = rightWidth;

	$.leftLabelViewBeforeTemplate.right = 0;
	$.leftLabelViewBeforeTemplate.width = $.leftViewBeforeTemplate.width * 0.6;
	$.leftLabelBeforeTemplate.width = $.leftLabelViewBeforeTemplate.width * 0.9;
	$.leftImageViewBeforeTemplate.left = 0;
	$.leftImageViewBeforeTemplate.width = $.leftViewBeforeTemplate.width * 0.4;
	$.leftImageBeforeTemplate.width = $.leftImageViewBeforeTemplate.width * 0.9;
	$.leftImageBeforeTemplate.height = $.leftImageBeforeTemplate.width;

	$.rightLabelViewBeforeTemplate.left = 0;
	$.rightLabelViewBeforeTemplate.width = $.rightViewBeforeTemplate.width * 0.6;
	$.rightLabelBeforeTemplate.width = $.rightLabelViewBeforeTemplate.width * 0.9;
	$.rightImageViewBeforeTemplate.right = 0;
	$.rightImageViewBeforeTemplate.width = $.rightViewBeforeTemplate.width * 0.4;
	$.rightImageBeforeTemplate.width = $.rightImageViewBeforeTemplate.width * 0.9;
	$.rightImageBeforeTemplate.height = $.rightImageBeforeTemplate.width;
	// < beforeTemplate

	// > gameBeforeTemplate
	$.leftViewGameBeforeTemplate.width = leftWidth;
	$.centerViewGameBeforeTemplate.width = centerWidth;
	$.rightViewGameBeforeTemplate.width = rightWidth;

	$.leftLabelViewGameBeforeTemplate.left = 0;
	$.leftLabelViewGameBeforeTemplate.width = $.leftViewGameBeforeTemplate.width * 0.6;
	$.leftLabelGameBeforeTemplate.width = $.leftLabelViewGameBeforeTemplate.width * 0.9;
	$.leftImageViewGameBeforeTemplate.right = 0;
	$.leftImageViewGameBeforeTemplate.width = $.leftViewGameBeforeTemplate.width * 0.4;
	$.leftImageGameBeforeTemplate.width = $.leftImageViewGameBeforeTemplate.width * 0.9;
	$.leftImageGameBeforeTemplate.height = $.leftImageGameBeforeTemplate.width;

	$.rightLabelViewGameBeforeTemplate.right = 0;
	$.rightLabelViewGameBeforeTemplate.width = $.rightViewGameBeforeTemplate.width * 0.6;
	$.rightLabelGameBeforeTemplate.width = $.rightLabelViewGameBeforeTemplate.width * 0.9;
	$.rightImageViewGameBeforeTemplate.left = 0;
	$.rightImageViewGameBeforeTemplate.width = $.rightViewGameBeforeTemplate.width * 0.4;
	$.rightImageGameBeforeTemplate.width = $.rightImageViewGameBeforeTemplate.width * 0.9;
	$.rightImageGameBeforeTemplate.height = $.rightImageGameBeforeTemplate.width;
	// < gameBeforeTemplate

	// > gameLiveTemplate
	$.leftViewGameLiveTemplate.width = leftWidth;
	$.centerViewGameLiveTemplate.width = centerWidth;
	$.rightViewGameLiveTemplate.width = rightWidth;

	$.leftLabelViewGameLiveTemplate.left = 0;
	$.leftLabelViewGameLiveTemplate.width = $.leftViewGameLiveTemplate.width * 0.6;
	$.leftLabelGameLiveTemplate.width = $.leftLabelViewGameLiveTemplate.width * 0.9;
	$.leftImageViewGameLiveTemplate.right = 0;
	$.leftImageViewGameLiveTemplate.width = $.leftViewGameLiveTemplate.width * 0.4;
	$.leftImageGameLiveTemplate.width = $.leftImageViewGameLiveTemplate.width * 0.9;
	$.leftImageGameLiveTemplate.height = $.leftImageGameLiveTemplate.width;

	$.rightLabelViewGameLiveTemplate.right = 0;
	$.rightLabelViewGameLiveTemplate.width = $.rightViewGameLiveTemplate.width * 0.6;
	$.rightLabelGameLiveTemplate.width = $.rightLabelViewGameLiveTemplate.width * 0.9;
	$.rightImageViewGameLiveTemplate.left = 0;
	$.rightImageViewGameLiveTemplate.width = $.rightViewGameLiveTemplate.width * 0.4;
	$.rightImageGameLiveTemplate.width = $.rightImageViewGameLiveTemplate.width * 0.9;
	$.rightImageGameLiveTemplate.height = $.rightImageGameLiveTemplate.width;
	// < gameLiveTemplate

	// > gameLiveHTTemplate
	$.leftViewGameLiveHTTemplate.width = leftWidth;
	$.centerViewGameLiveHTTemplate.width = centerWidth;
	$.rightViewGameLiveHTTemplate.width = rightWidth;

	$.leftLabelViewGameLiveHTTemplate.left = 0;
	$.leftLabelViewGameLiveHTTemplate.width = $.leftViewGameLiveHTTemplate.width * 0.6;
	$.leftLabelGameLiveHTTemplate.width = $.leftLabelViewGameLiveHTTemplate.width * 0.9;
	$.leftImageViewGameLiveHTTemplate.right = 0;
	$.leftImageViewGameLiveHTTemplate.width = $.leftViewGameLiveHTTemplate.width * 0.4;
	$.leftImageGameLiveHTTemplate.width = $.leftImageViewGameLiveHTTemplate.width * 0.9;
	$.leftImageGameLiveHTTemplate.height = $.leftImageGameLiveHTTemplate.width;

	$.rightLabelViewGameLiveHTTemplate.right = 0;
	$.rightLabelViewGameLiveHTTemplate.width = $.rightViewGameLiveHTTemplate.width * 0.6;
	$.rightLabelGameLiveHTTemplate.width = $.rightLabelViewGameLiveHTTemplate.width * 0.9;
	$.rightImageViewGameLiveHTTemplate.left = 0;
	$.rightImageViewGameLiveHTTemplate.width = $.rightViewGameLiveHTTemplate.width * 0.4;
	$.rightImageGameLiveHTTemplate.width = $.rightImageViewGameLiveHTTemplate.width * 0.9;
	$.rightImageGameLiveHTTemplate.height = $.rightImageGameLiveHTTemplate.width;
	// < gameLiveHTTemplate

	// > gameAfterTemplate
	$.leftViewGameAfterTemplate.width = leftWidth;
	$.centerViewGameAfterTemplate.width = centerWidth;
	$.rightViewGameAfterTemplate.width = rightWidth;

	$.leftLabelViewGameAfterTemplate.left = 0;
	$.leftLabelViewGameAfterTemplate.width = $.leftViewGameAfterTemplate.width * 0.6;
	$.leftLabelGameAfterTemplate.width = $.leftLabelViewGameAfterTemplate.width * 0.9;
	$.leftImageViewGameAfterTemplate.right = 0;
	$.leftImageViewGameAfterTemplate.width = $.leftViewGameAfterTemplate.width * 0.4;
	$.leftImageGameAfterTemplate.width = $.leftImageViewGameAfterTemplate.width * 0.9;
	$.leftImageGameAfterTemplate.height = $.leftImageGameAfterTemplate.width;

	$.rightLabelViewGameAfterTemplate.right = 0;
	$.rightLabelViewGameAfterTemplate.width = $.rightViewGameAfterTemplate.width * 0.6;
	$.rightLabelGameAfterTemplate.width = $.rightLabelViewGameAfterTemplate.width * 0.9;
	$.rightImageViewGameAfterTemplate.left = 0;
	$.rightImageViewGameAfterTemplate.width = $.rightViewGameAfterTemplate.width * 0.4;
	$.rightImageGameAfterTemplate.width = $.rightImageViewGameAfterTemplate.width * 0.9;
	$.rightImageGameAfterTemplate.height = $.rightImageGameAfterTemplate.width;
	// < gameAfterTemplate

	// > afterTemplate
	$.leftViewAfterTemplate.width = leftWidth;
	$.centerViewAfterTemplate.width = centerWidth;
	$.rightViewAfterTemplate.width = rightWidth;

	$.leftLabelViewAfterTemplate.left = 0;
	$.leftLabelViewAfterTemplate.width = $.leftViewAfterTemplate.width * 0.6;
	$.leftLabelAfterTemplate.width = $.leftLabelViewAfterTemplate.width * 0.9;
	$.leftImageViewAfterTemplate.right = 0;
	$.leftImageViewAfterTemplate.width = $.leftViewAfterTemplate.width * 0.4;
	$.leftImageAfterTemplate.width = $.leftImageViewAfterTemplate.width * 0.9;
	$.leftImageAfterTemplate.height = $.leftImageAfterTemplate.width;

	$.rightLabelViewAfterTemplate.right = 0;
	$.rightLabelViewAfterTemplate.width = $.rightViewAfterTemplate.width * 0.6;
	$.rightLabelAfterTemplate.width = $.rightLabelViewAfterTemplate.width * 0.9;
	$.rightImageViewAfterTemplate.left = 0;
	$.rightImageViewAfterTemplate.width = $.rightViewAfterTemplate.width * 0.4;
	$.rightImageAfterTemplate.width = $.rightImageViewAfterTemplate.width * 0.9;
	$.rightImageAfterTemplate.height = $.rightImageAfterTemplate.width;
	// < afterTemplate
};

initialize();

function cleanBefore() {
	$.beforeTemplate.visible = false;
	$.leftLabelBeforeTemplate.text = '';
	$.leftImageBeforeTemplate.image = '';
	$.rightLabelBeforeTemplate.text = '';
	$.rightImageBeforeTemplate.image = '';
	$.timeLabelBeforeTemplate.text = '';
	$.dateLabelBeforeTemplate.text = '';
}

function cleanGameBefore() {
	$.gameBeforeTemplate.visible = false;
	$.leftLabelGameBeforeTemplate.text = '';
	$.leftImageGameBeforeTemplate.image = '';
	$.rightLabelGameBeforeTemplate.text = '';
	$.rightImageGameBeforeTemplate.image = '';
	$.vsLabelGameBeforeTemplate.text = '';
	$.timeLabelGameBeforeTemplate.text = '';
};

function cleanGameLive() {
	$.gameLiveTemplate.visible = false;
	$.leftLabelGameLiveTemplate.text = '';
	$.leftImageGameLiveTemplate.image = '';
	$.rightLabelGameLiveTemplate.text = '';
	$.rightImageGameLiveTemplate.image = '';
	$.liveLabelGameLiveTemplate.text = '';
	$.scoreLabelGameLiveTemplate.text = '';
	$.timeLabelGameLiveTemplate.text = '';
};

function cleanGameLiveHT() {
	$.gameLiveHTTemplate.visible = false;
	$.leftLabelGameLiveHTTemplate.text = '';
	$.leftImageGameLiveHTTemplate.image = '';
	$.rightLabelGameLiveHTTemplate.text = '';
	$.rightImageGameLiveHTTemplate.image = '';
	$.liveLabelGameLiveHTTemplate.text = '';
	$.scoreLabelGameLiveHTTemplate.text = '';
	$.statusLabelGameLiveHTTemplate.text = '';
};

function cleanGameAfter() {
	$.gameAfterTemplate.visible = false;
	$.leftLabelGameAfterTemplate.text = '';
	$.leftImageGameAfterTemplate.image = '';
	$.rightLabelGameAfterTemplate.text = '';
	$.rightImageGameAfterTemplate.image = '';
	$.liveLabelGameAfterTemplate.text = '';
	$.scoreLabelGameAfterTemplate.text = '';
	$.statusLabelGameAfterTemplate.text = '';
};

function cleanAfter() {
	$.afterTemplate.visible = false;
	$.leftLabelAfterTemplate.text = '';
	$.leftImageAfterTemplate.image = '';
	$.rightLabelAfterTemplate.text = '';
	$.rightImageAfterTemplate.image = '';
	$.scoreLabelAfterTemplate.text = '';
	$.dateLabelAfterTemplate.text = '';
};

function cleanAll() {
	cleanBefore();
	cleanGameBefore();
	cleanGameLive();
	cleanGameLiveHT();
	cleanGameAfter();
	cleanAfter();
};

/**
 *
 * @param {Object} args
 * state: before
 */
exports.setBefore = function(args) {
	Ti.API.error('setBefore:', args);

	cleanAll();

	$.main.height = global.height1;
	$.beforeTemplate.visible = true;

	$.leftLabelBeforeTemplate.text = args.title[0];
	$.leftImageBeforeTemplate.image = args.image[0];
	$.rightLabelBeforeTemplate.text = args.title[1];
	$.rightImageBeforeTemplate.image = args.image[1];
	$.timeLabelBeforeTemplate.text = Alloy.Moment.unix(args.datetime).format('HH:mm');
	$.dateLabelBeforeTemplate.text = Alloy.Moment.unix(args.datetime).format('D MMM YYYY');
};

/**
 *
 * @param {Object} args
 * state: gamebefore
 */
exports.setGameBefore = function(args) {
	Ti.API.error('setGameBefore:', args);

	cleanAll();

	$.main.height = global.height1;
	$.gameBeforeTemplate.visible = true;

	$.leftLabelGameBeforeTemplate.text = args.title[0];
	$.leftImageGameBeforeTemplate.image = args.image[0];
	$.rightLabelGameBeforeTemplate.text = args.title[1];
	$.rightImageGameBeforeTemplate.image = args.image[1];
	$.vsLabelGameBeforeTemplate.text = L('com.intbizth.balltoro.gamelabel.vs');
	$.timeLabelGameBeforeTemplate.text = Alloy.Moment.unix(args.datetime).format('HH:mm');
};

/**
 *
 * @param {Object} args
 * state: gamelive
 */
exports.setGameLive = function(args) {
	Ti.API.error('setGameLive:', args);

	cleanAll();

	$.main.height = global.height1;
	$.gameLiveTemplate.visible = true;
	$.leftLabelGameLiveTemplate.text = args.title[0];
	$.leftImageGameLiveTemplate.image = args.image[0];
	$.rightLabelGameLiveTemplate.text = args.title[1];
	$.rightImageGameLiveTemplate.image = args.image[1];
	$.liveLabelGameLiveTemplate.text = L('com.intbizth.balltoro.gamelabel.live');
	$.scoreLabelGameLiveTemplate.text = args.score[0] + '-' + args.score[1];

	var d = Alloy.Moment.duration(args.time, 'seconds');
	var minutes = d.minutes();

	if (d.hours() > 0) {
		minutes += d.hours() * 60;
	}

	var seconds = d.seconds();

	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	$.timeLabelGameLiveTemplate.text = minutes + ':' + seconds;
};

/**
 *
 * @param {Object} args
 * state: gameliveht
 */
exports.setGameLiveHT = function(args) {
	Ti.API.error('setGameLiveHT:', args);

	cleanAll();

	$.main.height = global.height1;
	$.gameLiveHTTemplate.visible = true;
	$.leftLabelGameLiveHTTemplate.text = args.title[0];
	$.leftImageGameLiveHTTemplate.image = args.image[0];
	$.rightLabelGameLiveHTTemplate.text = args.title[1];
	$.rightImageGameLiveHTTemplate.image = args.image[1];
	$.liveLabelGameLiveHTTemplate.text = L('com.intbizth.balltoro.gamelabel.live');
	$.scoreLabelGameLiveHTTemplate.text = args.score[0] + '-' + args.score[1];
	$.statusLabelGameLiveHTTemplate.text = L('com.intbizth.balltoro.gamelabel.halftime');
};

/**
 *
 * @param {Object} args
 * state: gameafter
 */
exports.setGameAfter = function(args) {
	Ti.API.error('setGameAfter:', args);

	cleanAll();

	$.main.height = global.height1;
	$.gameAfterTemplate.visible = true;
	$.leftLabelGameAfterTemplate.text = args.title[0];
	$.leftImageGameAfterTemplate.image = args.image[0];
	$.rightLabelGameAfterTemplate.text = args.title[1];
	$.rightImageGameAfterTemplate.image = args.image[1];
	$.liveLabelGameAfterTemplate.text = ' ';
	$.scoreLabelGameAfterTemplate.text = args.score[0] + '-' + args.score[1];
	$.statusLabelGameAfterTemplate.text = L('com.intbizth.balltoro.gamelabel.fulltime');
};

/**
 *
 * @param {Object} args
 * state: after
 */
exports.setAfter = function(args) {
	Ti.API.error('setAfter:', args);

	cleanAll();

	$.main.height = global.height1;
	$.afterTemplate.visible = true;
	$.leftLabelAfterTemplate.text = args.title[0];
	$.leftImageAfterTemplate.image = args.image[0];
	$.rightLabelAfterTemplate.text = args.title[1];
	$.rightImageAfterTemplate.image = args.image[1];
	$.scoreLabelAfterTemplate.text = args.score[0] + '-' + args.score[1];
	$.dateLabelAfterTemplate.text = Alloy.Moment.unix(args.datetime).format('D MMM YYYY');
};
