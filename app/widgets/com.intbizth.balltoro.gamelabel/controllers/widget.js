var global = {
	height1 : 60,
	height2 : 85,
	height3 : 30
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
	$.beforeTemplate.height = global.height1;
	$.leftViewBeforeTemplate.width = leftWidth;
	$.centerViewBeforeTemplate.width = centerWidth;
	$.rightViewBeforeTemplate.width = rightWidth;

	$.leftLabelViewBeforeTemplate.right = 0;
	$.leftLabelViewBeforeTemplate.width = $.leftViewBeforeTemplate.width - $.leftLabelViewBeforeTemplate.right - $.beforeTemplate.height;
	$.leftLabelBeforeTemplate.width = $.leftLabelViewBeforeTemplate.width - 4;
	$.leftImageViewBeforeTemplate.left = 0;
	$.leftImageViewBeforeTemplate.width = $.beforeTemplate.height;
	$.leftImageBeforeTemplate.width = $.leftImageViewBeforeTemplate.width - 4;
	$.leftImageBeforeTemplate.height = $.leftImageBeforeTemplate.width;

	$.rightLabelViewBeforeTemplate.left = 0;
	$.rightLabelViewBeforeTemplate.width = $.rightViewBeforeTemplate.width - $.rightLabelViewBeforeTemplate.left - $.beforeTemplate.height;
	$.rightLabelBeforeTemplate.width = $.rightLabelViewBeforeTemplate.width - 4;
	$.rightImageViewBeforeTemplate.right = 0;
	$.rightImageViewBeforeTemplate.width = $.beforeTemplate.height;
	$.rightImageBeforeTemplate.width = $.rightImageViewBeforeTemplate.width - 4;
	$.rightImageBeforeTemplate.height = $.rightImageBeforeTemplate.width;
	// < beforeTemplate

	// > gameBeforeTemplate
	$.gameBeforeTemplate.height = global.height1;
	$.leftViewGameBeforeTemplate.width = leftWidth;
	$.centerViewGameBeforeTemplate.width = centerWidth;
	$.rightViewGameBeforeTemplate.width = rightWidth;

	$.leftLabelViewGameBeforeTemplate.left = 0;
	$.leftLabelViewGameBeforeTemplate.width = $.leftViewGameBeforeTemplate.width - $.leftLabelViewGameBeforeTemplate.left - $.gameBeforeTemplate.height;
	$.leftLabelGameBeforeTemplate.width = $.leftLabelViewGameBeforeTemplate.width - 4;
	$.leftImageViewGameBeforeTemplate.right = 0;
	$.leftImageViewGameBeforeTemplate.width = $.gameBeforeTemplate.height;
	$.leftImageGameBeforeTemplate.width = $.leftImageViewGameBeforeTemplate.width - 4;
	$.leftImageGameBeforeTemplate.height = $.leftImageGameBeforeTemplate.width;

	$.rightLabelViewGameBeforeTemplate.right = 0;
	$.rightLabelViewGameBeforeTemplate.width = $.rightViewGameBeforeTemplate.width - $.rightLabelViewGameBeforeTemplate.right - $.gameBeforeTemplate.height;
	$.rightLabelGameBeforeTemplate.width = $.rightLabelViewGameBeforeTemplate.width - 4;
	$.rightImageViewGameBeforeTemplate.left = 0;
	$.rightImageViewGameBeforeTemplate.width = $.gameBeforeTemplate.height;
	$.rightImageGameBeforeTemplate.width = $.rightImageViewGameBeforeTemplate.width - 4;
	$.rightImageGameBeforeTemplate.height = $.rightImageGameBeforeTemplate.width;
	// < gameBeforeTemplate

	// > gameLiveTemplate
	$.gameLiveTemplate.height = global.height1;
	$.leftViewGameLiveTemplate.width = leftWidth;
	$.centerViewGameLiveTemplate.width = centerWidth;
	$.rightViewGameLiveTemplate.width = rightWidth;

	$.leftLabelViewGameLiveTemplate.left = 0;
	$.leftLabelViewGameLiveTemplate.width = $.leftViewGameLiveTemplate.width - $.leftLabelViewGameLiveTemplate.left - $.gameLiveTemplate.height;
	$.leftLabelGameLiveTemplate.width = $.leftLabelViewGameLiveTemplate.width - 4;
	$.leftImageViewGameLiveTemplate.right = 0;
	$.leftImageViewGameLiveTemplate.width = $.gameLiveTemplate.height;
	$.leftImageGameLiveTemplate.width = $.leftImageViewGameLiveTemplate.width - 4;
	$.leftImageGameLiveTemplate.height = $.leftImageGameLiveTemplate.width;

	$.rightLabelViewGameLiveTemplate.right = 0;
	$.rightLabelViewGameLiveTemplate.width = $.rightViewGameLiveTemplate.width - $.leftLabelViewGameLiveTemplate.left - $.gameLiveTemplate.height;
	$.rightLabelGameLiveTemplate.width = $.rightLabelViewGameLiveTemplate.width - 4;
	$.rightImageViewGameLiveTemplate.left = 0;
	$.rightImageViewGameLiveTemplate.width = $.gameLiveTemplate.height;
	$.rightImageGameLiveTemplate.width = $.rightImageViewGameLiveTemplate.width - 4;
	$.rightImageGameLiveTemplate.height = $.rightImageGameLiveTemplate.width;
	// < gameLiveTemplate

	// > gameLiveHTTemplate
	$.gameLiveHTTemplate.height = global.height1;
	$.leftViewGameLiveHTTemplate.width = leftWidth;
	$.centerViewGameLiveHTTemplate.width = centerWidth;
	$.rightViewGameLiveHTTemplate.width = rightWidth;

	$.leftLabelViewGameLiveHTTemplate.left = 0;
	$.leftLabelViewGameLiveHTTemplate.width = $.leftViewGameLiveHTTemplate.width - $.leftLabelViewGameLiveHTTemplate.left - $.gameLiveHTTemplate.height;
	$.leftLabelGameLiveHTTemplate.width = $.leftLabelViewGameLiveHTTemplate.width - 4;
	$.leftImageViewGameLiveHTTemplate.right = 0;
	$.leftImageViewGameLiveHTTemplate.width = $.gameLiveHTTemplate.height;
	$.leftImageGameLiveHTTemplate.width = $.leftImageViewGameLiveHTTemplate.width - 4;
	$.leftImageGameLiveHTTemplate.height = $.leftImageGameLiveHTTemplate.width;

	$.rightLabelViewGameLiveHTTemplate.right = 0;
	$.rightLabelViewGameLiveHTTemplate.width = $.rightViewGameLiveHTTemplate.width - $.leftLabelViewGameLiveHTTemplate.left - $.gameLiveHTTemplate.height;
	$.rightLabelGameLiveHTTemplate.width = $.rightLabelViewGameLiveHTTemplate.width - 4;
	$.rightImageViewGameLiveHTTemplate.left = 0;
	$.rightImageViewGameLiveHTTemplate.width = $.gameLiveHTTemplate.height;
	$.rightImageGameLiveHTTemplate.width = $.rightImageViewGameLiveHTTemplate.width - 4;
	$.rightImageGameLiveHTTemplate.height = $.rightImageGameLiveHTTemplate.width;
	// < gameLiveHTTemplate

	// > gameAfterTemplate
	$.gameAfterTemplate.height = global.height1;
	$.leftViewGameAfterTemplate.width = leftWidth;
	$.centerViewGameAfterTemplate.width = centerWidth;
	$.rightViewGameAfterTemplate.width = rightWidth;

	$.leftLabelViewGameAfterTemplate.left = 0;
	$.leftLabelViewGameAfterTemplate.width = $.leftViewGameAfterTemplate.width - $.leftLabelViewGameAfterTemplate.left - $.gameAfterTemplate.height;
	$.leftLabelGameAfterTemplate.width = $.leftLabelViewGameAfterTemplate.width - 4;
	$.leftImageViewGameAfterTemplate.right = 0;
	$.leftImageViewGameAfterTemplate.width = $.gameAfterTemplate.height;
	$.leftImageGameAfterTemplate.width = $.leftImageViewGameAfterTemplate.width - 4;
	$.leftImageGameAfterTemplate.height = $.leftImageGameAfterTemplate.width;

	$.rightLabelViewGameAfterTemplate.right = 0;
	$.rightLabelViewGameAfterTemplate.width = $.rightViewGameAfterTemplate.width - $.leftLabelViewGameAfterTemplate.left - $.gameAfterTemplate.height;
	$.rightLabelGameAfterTemplate.width = $.rightLabelViewGameAfterTemplate.width - 4;
	$.rightImageViewGameAfterTemplate.left = 0;
	$.rightImageViewGameAfterTemplate.width = $.gameAfterTemplate.height;
	$.rightImageGameAfterTemplate.width = $.rightImageViewGameAfterTemplate.width - 4;
	$.rightImageGameAfterTemplate.height = $.rightImageGameAfterTemplate.width;
	// < gameAfterTemplate

	// > afterTemplate
	$.afterTemplate.height = global.height1;
	$.leftViewAfterTemplate.width = leftWidth;
	$.centerViewAfterTemplate.width = centerWidth;
	$.rightViewAfterTemplate.width = rightWidth;

	$.leftLabelViewAfterTemplate.left = 0;
	$.leftLabelViewAfterTemplate.width = $.leftViewAfterTemplate.width - $.leftLabelViewAfterTemplate.left - $.afterTemplate.height;
	$.leftLabelAfterTemplate.width = $.leftLabelViewAfterTemplate.width - 4;
	$.leftImageViewAfterTemplate.right = 0;
	$.leftImageViewAfterTemplate.width = $.afterTemplate.height;
	$.leftImageAfterTemplate.width = $.leftImageViewAfterTemplate.width - 4;
	$.leftImageAfterTemplate.height = $.leftImageAfterTemplate.width;

	$.rightLabelViewAfterTemplate.right = 0;
	$.rightLabelViewAfterTemplate.width = $.rightViewAfterTemplate.width - $.leftLabelViewAfterTemplate.left - $.afterTemplate.height;
	$.rightLabelAfterTemplate.width = $.rightLabelViewAfterTemplate.width - 4;
	$.rightImageViewAfterTemplate.left = 0;
	$.rightImageViewAfterTemplate.width = $.afterTemplate.height;
	$.rightImageAfterTemplate.width = $.rightImageViewAfterTemplate.width - 4;
	$.rightImageAfterTemplate.height = $.rightImageAfterTemplate.width;
	// < afterTemplate

	// > gameVSTemplate
	$.gameVSTemplate.height = global.height3;
	$.leftViewGameVSTemplate.width = leftWidth;
	$.centerViewGameVSTemplate.width = centerWidth;
	$.rightViewGameVSTemplate.width = rightWidth;

	$.leftLabelViewGameVSTemplate.left = 2;
	$.leftLabelViewGameVSTemplate.width = $.leftViewGameVSTemplate.width - $.leftLabelViewGameVSTemplate.left - $.gameVSTemplate.height;
	$.leftLabelGameVSTemplate.width = $.leftLabelViewGameVSTemplate.width - 4;
	$.leftImageViewGameVSTemplate.right = 0;
	$.leftImageViewGameVSTemplate.width = $.gameVSTemplate.height;
	$.leftImageGameVSTemplate.width = $.gameVSTemplate.height - 4;
	$.leftImageGameVSTemplate.height = $.leftImageGameVSTemplate.width;

	$.rightLabelViewGameVSTemplate.right = 2;
	$.rightLabelViewGameVSTemplate.width = $.rightViewGameVSTemplate.width - $.rightLabelViewGameVSTemplate.right - $.gameVSTemplate.height;
	$.rightLabelGameVSTemplate.width = $.rightLabelViewGameVSTemplate.width - 4;
	$.rightImageViewGameVSTemplate.left = 0;
	$.rightImageViewGameVSTemplate.width = $.gameVSTemplate.height;
	$.rightImageGameVSTemplate.width = $.gameVSTemplate.height - 4;
	$.rightImageGameVSTemplate.height = $.rightImageGameVSTemplate.width;
	// < gameVSTemplate
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

function cleanGameVS() {
	$.gameVSTemplate.visible = false;
	$.leftLabelGameVSTemplate.text = '';
	$.leftImageGameVSTemplate.image = '';
	$.rightLabelGameVSTemplate.text = '';
	$.rightImageGameVSTemplate.image = '';
	$.vsLabelGameVSTemplate.text = '';
};

function cleanAll() {
	cleanBefore();
	cleanGameBefore();
	cleanGameLive();
	cleanGameLiveHT();
	cleanGameAfter();
	cleanAfter();
	cleanGameVS();
};

/**
 *
 * @param {Object} args
 * state: before
 */
exports.setBefore = function(args) {
	Ti.API.error('setBefore:', args);

	cleanAll();

	$.main.height = $.beforeTemplate.height;
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

	$.main.height = $.gameBeforeTemplate.height;
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

	$.main.height = $.gameLiveTemplate.height;
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

	$.main.height = $.gameLiveHTTemplate.height;
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

	$.main.height = $.gameAfterTemplate.height;
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

	$.main.height = $.afterTemplate.height;
	$.afterTemplate.visible = true;
	$.leftLabelAfterTemplate.text = args.title[0];
	$.leftImageAfterTemplate.image = args.image[0];
	$.rightLabelAfterTemplate.text = args.title[1];
	$.rightImageAfterTemplate.image = args.image[1];
	$.scoreLabelAfterTemplate.text = args.score[0] + '-' + args.score[1];
	$.dateLabelAfterTemplate.text = Alloy.Moment.unix(args.datetime).format('D MMM YYYY');
};

/**
 *
 * @param {Object} args
 * state: gamevs
 */
exports.setGameVS = function(args) {
	Ti.API.error('setGameVS:', args);

	cleanAll();

	$.main.height = $.gameVSTemplate.height;
	$.gameVSTemplate.visible = true;
	$.leftLabelGameVSTemplate.text = args.title[0];
	$.leftImageGameVSTemplate.image = args.image[0];
	$.rightLabelGameVSTemplate.text = args.title[1];
	$.rightImageGameVSTemplate.image = args.image[1];
	$.vsLabelGameVSTemplate.text = L('com.intbizth.balltoro.gamelabel.vs');
};
