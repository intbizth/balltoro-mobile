var global = {
	beforeHeight : 60,
	beforeLeftBackgroundColor : '#fff',
	beforeLeftFontColor : '#000',
	beforeCenterBackgroundColor : '#fff',
	beforeRightBackgroundColor : '#fff',
	beforeRightFontColor : '#000',
	beforeTimeFontColor : '#0088cf',
	beforeDateFontColor : '#58595b',
	gameBeforeHeight : 60,
	gameBeforeLeftBackgroundColor : '#fff',
	gameBeforeLeftFontColor : '#000',
	gameBeforeCenterBackgroundColor : '#4188c7',
	gameBeforeRightBackgroundColor : '#fff',
	gameBeforeRightFontColor : '#000',
	gameBeforeVsFontColor : '#fff',
	gameBeforeTimeFontColor : '#fff',
	gameLiveHeight : 60,
	gameLiveLeftBackgroundColor : '#fff',
	gameLiveLeftFontColor : '#000',
	gameLiveCenterBackgroundColor : '#4188c7',
	gameLiveRightBackgroundColor : '#fff',
	gameLiveRightFontColor : '#000',
	gameLiveLiveFontColor : '#caf906',
	gameLiveScoreFontColor : '#fff',
	gameLiveTimeFontColor : '#fff',
	gameLiveHTHeight : 60,
	gameLiveHTLeftBackgroundColor : '#fff',
	gameLiveHTLeftFontColor : '#000',
	gameLiveHTCenterBackgroundColor : '#4188c7',
	gameLiveHTRightBackgroundColor : '#fff',
	gameLiveHTRightFontColor : '#000',
	gameLiveHTLiveFontColor : '#caf906',
	gameLiveHTScoreFontColor : '#fff',
	gameLiveHTStatusFontColor : '#fff',
	gameAfterHeight : 60,
	gameAfterLeftBackgroundColor : '#fff',
	gameAfterLeftFontColor : '#000',
	gameAfterCenterBackgroundColor : '#4188c7',
	gameAfterRightBackgroundColor : '#fff',
	gameAfterRightFontColor : '#000',
	gameAfterScoreFontColor : '#fff',
	gameAfterStatusFontColor : '#fff',
	afterHeight : 60,
	afterLeftBackgroundColor : '#fff',
	afterLeftFontColor : '#000',
	afterCenterBackgroundColor : '#fff',
	afterRightBackgroundColor : '#fff',
	afterRightFontColor : '#000',
	afterScoreFontColor : '#4188c7',
	afterDateFontColor : '#58595b',
	gameVSHeight : 30,
	gameVSLeftBackgroundColor : '#fff',
	gameVSLeftFontColor : '#000',
	gameVSCenterBackgroundColor : '#4188c7',
	gameVSRightBackgroundColor : '#fff',
	gameVSRightFontColor : '#000',
	gameVSVsFontColor : '#fff'
};

function initialize() {
	var leftWidth = parseInt(Ti.Platform.displayCaps.platformWidth * 0.4);
	var centerWidth = parseInt(Ti.Platform.displayCaps.platformWidth * 0.2);
	var rightWidth = parseInt(Ti.Platform.displayCaps.platformWidth * 0.4);

	// > beforeTemplate
	$.beforeTemplate.height = global.beforeHeight;
	$.leftViewBeforeTemplate.width = leftWidth;
	$.leftViewBeforeTemplate.backgroundColor = global.beforeLeftBackgroundColor;
	$.centerViewBeforeTemplate.width = centerWidth;
	$.centerViewBeforeTemplate.backgroundColor = global.beforeCenterBackgroundColor;
	$.rightViewBeforeTemplate.width = rightWidth;
	$.rightViewBeforeTemplate.backgroundColor = global.beforeRightBackgroundColor;

	$.leftLabelViewBeforeTemplate.right = 0;
	$.leftLabelViewBeforeTemplate.width = $.leftViewBeforeTemplate.width - $.leftLabelViewBeforeTemplate.right - $.beforeTemplate.height;
	$.leftLabelBeforeTemplate.width = $.leftLabelViewBeforeTemplate.width - 4;
	$.leftLabelBeforeTemplate.color = global.beforeLeftFontColor;
	$.leftImageViewBeforeTemplate.left = 0;
	$.leftImageViewBeforeTemplate.width = $.beforeTemplate.height;
	$.leftImageBeforeTemplate.width = $.leftImageViewBeforeTemplate.width - 4;
	$.leftImageBeforeTemplate.height = $.leftImageBeforeTemplate.width;

	$.timeLabelBeforeTemplate.color = global.beforeTimeFontColor;
	$.dateLabelBeforeTemplate.color = global.beforeDateFontColor;

	$.rightLabelViewBeforeTemplate.left = 0;
	$.rightLabelViewBeforeTemplate.width = $.rightViewBeforeTemplate.width - $.rightLabelViewBeforeTemplate.left - $.beforeTemplate.height;
	$.rightLabelBeforeTemplate.width = $.rightLabelViewBeforeTemplate.width - 4;
	$.rightLabelBeforeTemplate.color = global.beforeRightFontColor;
	$.rightImageViewBeforeTemplate.right = 0;
	$.rightImageViewBeforeTemplate.width = $.beforeTemplate.height;
	$.rightImageBeforeTemplate.width = $.rightImageViewBeforeTemplate.width - 4;
	$.rightImageBeforeTemplate.height = $.rightImageBeforeTemplate.width;
	// < beforeTemplate

	// > gameBeforeTemplate
	$.gameBeforeTemplate.height = global.gameBeforeHeight;
	$.leftViewGameBeforeTemplate.width = leftWidth;
	$.leftViewGameBeforeTemplate.backgroundColor = global.gameBeforeLeftBackgroundColor;
	$.centerViewGameBeforeTemplate.width = centerWidth;
	$.centerViewGameBeforeTemplate.backgroundColor = global.gameBeforeCenterBackgroundColor;
	$.rightViewGameBeforeTemplate.width = rightWidth;
	$.rightViewGameBeforeTemplate.backgroundColor = global.gameBeforeRightBackgroundColor;

	$.leftLabelViewGameBeforeTemplate.right = 0;
	$.leftLabelViewGameBeforeTemplate.width = $.leftViewGameBeforeTemplate.width - $.leftLabelViewGameBeforeTemplate.right - $.gameBeforeTemplate.height;
	$.leftLabelGameBeforeTemplate.width = $.leftLabelViewGameBeforeTemplate.width - 4;
	$.leftLabelGameBeforeTemplate.color = global.gameBeforeLeftFontColor;
	$.leftImageViewGameBeforeTemplate.left = 0;
	$.leftImageViewGameBeforeTemplate.width = $.gameBeforeTemplate.height;
	$.leftImageGameBeforeTemplate.width = $.leftImageViewGameBeforeTemplate.width - 4;
	$.leftImageGameBeforeTemplate.height = $.leftImageGameBeforeTemplate.width;

	$.vsLabelGameBeforeTemplate.color = global.gameBeforeVsFontColor;
	$.timeLabelGameBeforeTemplate.color = global.gameBeforeTimeFontColor;

	$.rightLabelViewGameBeforeTemplate.left = 0;
	$.rightLabelViewGameBeforeTemplate.width = $.rightViewGameBeforeTemplate.width - $.rightLabelViewGameBeforeTemplate.left - $.gameBeforeTemplate.height;
	$.rightLabelGameBeforeTemplate.width = $.rightLabelViewGameBeforeTemplate.width - 4;
	$.rightLabelGameBeforeTemplate.color = global.gameBeforeRightFontColor;
	$.rightImageViewGameBeforeTemplate.right = 0;
	$.rightImageViewGameBeforeTemplate.width = $.gameBeforeTemplate.height;
	$.rightImageGameBeforeTemplate.width = $.rightImageViewGameBeforeTemplate.width - 4;
	$.rightImageGameBeforeTemplate.height = $.rightImageGameBeforeTemplate.width;
	// < gameBeforeTemplate

	// > gameLiveTemplate
	$.gameLiveTemplate.height = global.gameLiveHeight;
	$.leftViewGameLiveTemplate.width = leftWidth;
	$.leftViewGameLiveTemplate.backgroundColor = global.gameLiveLeftBackgroundColor;
	$.centerViewGameLiveTemplate.width = centerWidth;
	$.centerViewGameLiveTemplate.backgroundColor = global.gameLiveCenterBackgroundColor;
	$.rightViewGameLiveTemplate.width = rightWidth;
	$.rightViewGameLiveTemplate.backgroundColor = global.gameLiveRightBackgroundColor;

	$.leftLabelViewGameLiveTemplate.right = 0;
	$.leftLabelViewGameLiveTemplate.width = $.leftViewGameLiveTemplate.width - $.leftLabelViewGameLiveTemplate.right - $.gameLiveTemplate.height;
	$.leftLabelGameLiveTemplate.width = $.leftLabelViewGameLiveTemplate.width - 4;
	$.leftLabelGameLiveTemplate.color = global.gameLiveLeftFontColor;
	$.leftImageViewGameLiveTemplate.left = 0;
	$.leftImageViewGameLiveTemplate.width = $.gameLiveTemplate.height;
	$.leftImageGameLiveTemplate.width = $.leftImageViewGameLiveTemplate.width - 4;
	$.leftImageGameLiveTemplate.height = $.leftImageGameLiveTemplate.width;

	$.liveLabelGameLiveTemplate.color = global.gameLiveLiveFontColor;
	$.scoreLabelGameLiveTemplate.color = global.gameLiveScoreFontColor;
	$.timeLabelGameLiveTemplate.color = global.gameLiveTimeFontColor;
	
	$.rightLabelViewGameLiveTemplate.left = 0;
	$.rightLabelViewGameLiveTemplate.width = $.rightViewGameLiveTemplate.width - $.rightLabelViewGameLiveTemplate.left - $.gameLiveTemplate.height;
	$.rightLabelGameLiveTemplate.width = $.rightLabelViewGameLiveTemplate.width - 4;
	$.rightLabelGameLiveTemplate.color = global.gameLiveRightFontColor;
	$.rightImageViewGameLiveTemplate.right = 0;
	$.rightImageViewGameLiveTemplate.width = $.gameLiveTemplate.height;
	$.rightImageGameLiveTemplate.width = $.rightImageViewGameLiveTemplate.width - 4;
	$.rightImageGameLiveTemplate.height = $.rightImageGameLiveTemplate.width;
	// < gameLiveTemplate

	// > gameLiveHTTemplate
	$.gameLiveHTTemplate.height = global.gameLiveHTHeight;
	$.leftViewGameLiveHTTemplate.width = leftWidth;
	$.leftViewGameLiveHTTemplate.backgroundColor = global.gameLiveHTLeftBackgroundColor;
	$.centerViewGameLiveHTTemplate.width = centerWidth;
	$.centerViewGameLiveHTTemplate.backgroundColor = global.gameLiveHTCenterBackgroundColor;
	$.rightViewGameLiveHTTemplate.width = rightWidth;
	$.rightViewGameLiveHTTemplate.backgroundColor = global.gameLiveHTRightBackgroundColor;

	$.leftLabelViewGameLiveHTTemplate.right = 0;
	$.leftLabelViewGameLiveHTTemplate.width = $.leftViewGameLiveHTTemplate.width - $.leftLabelViewGameLiveHTTemplate.right - $.gameLiveHTTemplate.height;
	$.leftLabelGameLiveHTTemplate.width = $.leftLabelViewGameLiveHTTemplate.width - 4;
	$.leftLabelGameLiveHTTemplate.color = global.gameLiveHTLeftFontColor;
	$.leftImageViewGameLiveHTTemplate.left = 0;
	$.leftImageViewGameLiveHTTemplate.width = $.gameLiveHTTemplate.height;
	$.leftImageGameLiveHTTemplate.width = $.leftImageViewGameLiveHTTemplate.width - 4;
	$.leftImageGameLiveHTTemplate.height = $.leftImageGameLiveHTTemplate.width;

	$.liveLabelGameLiveHTTemplate.color = global.gameLiveHTLiveFontColor;
	$.scoreLabelGameLiveHTTemplate.color = global.gameLiveHTScoreFontColor;
	$.statusLabelGameLiveHTTemplate.color = global.gameLiveHTStatusFontColor;

	$.rightLabelViewGameLiveHTTemplate.left = 0;
	$.rightLabelViewGameLiveHTTemplate.width = $.rightViewGameLiveHTTemplate.width - $.rightLabelViewGameLiveHTTemplate.left - $.gameLiveHTTemplate.height;
	$.rightLabelGameLiveHTTemplate.width = $.rightLabelViewGameLiveHTTemplate.width - 4;
	$.rightLabelGameLiveHTTemplate.color = global.gameLiveHTRightFontColor;
	$.rightImageViewGameLiveHTTemplate.right = 0;
	$.rightImageViewGameLiveHTTemplate.width = $.gameLiveHTTemplate.height;
	$.rightImageGameLiveHTTemplate.width = $.rightImageViewGameLiveHTTemplate.width - 4;
	$.rightImageGameLiveHTTemplate.height = $.rightImageGameLiveHTTemplate.width;
	// < gameLiveHTTemplate

	// > gameAfterTemplate
	$.gameAfterTemplate.height = global.gameAfterHeight;
	$.leftViewGameAfterTemplate.width = leftWidth;
	$.leftViewGameAfterTemplate.backgroundColor = global.gameAfterLeftBackgroundColor;
	$.centerViewGameAfterTemplate.width = centerWidth;
	$.centerViewGameAfterTemplate.backgroundColor = global.gameAfterCenterBackgroundColor;
	$.rightViewGameAfterTemplate.width = rightWidth;
	$.rightViewGameAfterTemplate.backgroundColor = global.gameAfterRightBackgroundColor;

	$.leftLabelViewGameAfterTemplate.right = 0;
	$.leftLabelViewGameAfterTemplate.width = $.leftViewGameAfterTemplate.width - $.leftLabelViewGameAfterTemplate.right - $.gameAfterTemplate.height;
	$.leftLabelGameAfterTemplate.width = $.leftLabelViewGameAfterTemplate.width - 4;
	$.leftLabelGameAfterTemplate.color = global.gameAfterLeftFontColor;
	$.leftImageViewGameAfterTemplate.left = 0;
	$.leftImageViewGameAfterTemplate.width = $.gameAfterTemplate.height;
	$.leftImageGameAfterTemplate.width = $.leftImageViewGameAfterTemplate.width - 4;
	$.leftImageGameAfterTemplate.height = $.leftImageGameAfterTemplate.width;

	$.scoreLabelGameAfterTemplate.color = global.gameAfterScoreFontColor;
	$.statusLabelGameAfterTemplate.color = global.gameAfterStatusFontColor;

	$.rightLabelViewGameAfterTemplate.left = 0;
	$.rightLabelViewGameAfterTemplate.width = $.rightViewGameAfterTemplate.width - $.rightLabelViewGameAfterTemplate.left - $.gameAfterTemplate.height;
	$.rightLabelGameAfterTemplate.width = $.rightLabelViewGameAfterTemplate.width - 4;
	$.rightLabelGameAfterTemplate.color = global.gameAfterRightFontColor;
	$.rightImageViewGameAfterTemplate.right = 0;
	$.rightImageViewGameAfterTemplate.width = $.gameAfterTemplate.height;
	$.rightImageGameAfterTemplate.width = $.rightImageViewGameAfterTemplate.width - 4;
	$.rightImageGameAfterTemplate.height = $.rightImageGameAfterTemplate.width;
	// < gameAfterTemplate

	// > afterTemplate
	$.afterTemplate.height = global.afterHeight;
	$.leftViewAfterTemplate.width = leftWidth;
	$.leftViewAfterTemplate.backgroundColor = global.afterLeftBackgroundColor;
	$.centerViewAfterTemplate.width = centerWidth;
	$.centerViewAfterTemplate.backgroundColor = global.afterCenterBackgroundColor;
	$.rightViewAfterTemplate.width = rightWidth;
	$.rightViewAfterTemplate.backgroundColor = global.afterRightBackgroundColor;

	$.leftLabelViewAfterTemplate.right = 0;
	$.leftLabelViewAfterTemplate.width = $.leftViewAfterTemplate.width - $.leftLabelViewAfterTemplate.right - $.afterTemplate.height;
	$.leftLabelAfterTemplate.width = $.leftLabelViewAfterTemplate.width - 4;
	$.leftLabelAfterTemplate.color = global.afterLeftFontColor;
	$.leftImageViewAfterTemplate.left = 0;
	$.leftImageViewAfterTemplate.width = $.afterTemplate.height;
	$.leftImageAfterTemplate.width = $.leftImageViewAfterTemplate.width - 4;
	$.leftImageAfterTemplate.height = $.leftImageAfterTemplate.width;

	$.scoreLabelAfterTemplate.color = global.afterScoreFontColor;
	$.dateLabelAfterTemplate.color = global.afterDateFontColor;

	$.rightLabelViewAfterTemplate.left = 0;
	$.rightLabelViewAfterTemplate.width = $.rightViewAfterTemplate.width - $.rightLabelViewAfterTemplate.left - $.afterTemplate.height;
	$.rightLabelAfterTemplate.width = $.rightLabelViewAfterTemplate.width - 4;
	$.rightLabelAfterTemplate.color = global.afterRightFontColor;
	$.rightImageViewAfterTemplate.right = 0;
	$.rightImageViewAfterTemplate.width = $.afterTemplate.height;
	$.rightImageAfterTemplate.width = $.rightImageViewAfterTemplate.width - 4;
	$.rightImageAfterTemplate.height = $.rightImageAfterTemplate.width;
	// < afterTemplate

	// > gameVSTemplate
	$.gameVSTemplate.height = global.gameVSHeight;
	$.leftViewGameVSTemplate.width = leftWidth;
	$.leftViewGameVSTemplate.backgroundColor = global.gameVSLeftBackgroundColor;
	$.centerViewGameVSTemplate.width = centerWidth;
	$.centerViewGameVSTemplate.backgroundColor = global.gameVSCenterBackgroundColor;
	$.rightViewGameVSTemplate.width = rightWidth;
	$.rightViewGameVSTemplate.backgroundColor = global.gameVSRightBackgroundColor;

	$.leftLabelViewGameVSTemplate.right = 0;
	$.leftLabelViewGameVSTemplate.width = $.leftViewGameVSTemplate.width - $.leftLabelViewGameVSTemplate.right - $.gameVSTemplate.height;
	$.leftLabelGameVSTemplate.width = $.leftLabelViewGameVSTemplate.width - 4;
	$.leftLabelGameVSTemplate.color = global.gameVSLeftFontColor;
	$.leftImageViewGameVSTemplate.left = 2;
	$.leftImageViewGameVSTemplate.width = $.gameVSTemplate.height;
	$.leftImageGameVSTemplate.width = $.gameVSTemplate.height - 4;
	$.leftImageGameVSTemplate.height = $.leftImageGameVSTemplate.width;

	$.vsLabelGameVSTemplate.color = global.gameVSVsFontColor;

	$.rightLabelViewGameVSTemplate.left = 0;
	$.rightLabelViewGameVSTemplate.width = $.rightViewGameVSTemplate.width - $.rightLabelViewGameVSTemplate.left - $.gameVSTemplate.height;
	$.rightLabelGameVSTemplate.width = $.rightLabelViewGameVSTemplate.width - 4;
	$.rightLabelGameVSTemplate.color = global.gameVSRightFontColor;
	$.rightImageViewGameVSTemplate.right = 2;
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
 * @param {Object} args
 * state: before
 */
exports.setBefore = function(args) {
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
 * return {width:Integer, height:Integer}
 */
exports.getBeforeImageSize = function() {
	return {
		width : $.leftImageBeforeTemplate.width,
		height : $.leftImageBeforeTemplate.height
	};
};

/**
 *
 * @param {Object} args
 * state: gamebefore
 */
exports.setGameBefore = function(args) {
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
 * return {width:Integer, height:Integer}
 */
exports.getGameBeforeImageSize = function() {
	return {
		width : $.leftImageGameBeforeTemplate.width,
		height : $.leftImageGameBeforeTemplate.height
	};
};

/**
 *
 * @param {Object} args
 * state: gamelive
 */
exports.setGameLive = function(args) {
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
 * return {width:Integer, height:Integer}
 */
exports.getGameLiveImageSize = function() {
	return {
		width : $.leftImageGameLiveTemplate.width,
		height : $.leftImageGameLiveTemplate.height
	};
};

/**
 *
 * @param {Object} args
 * state: gameliveht
 */
exports.setGameLiveHT = function(args) {
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
 * return {width:Integer, height:Integer}
 */
exports.getGameLiveHTImageSize = function() {
	return {
		width : $.leftImageGameLiveHTTemplate.width,
		height : $.leftImageGameLiveHTTemplate.height
	};
};

/**
 *
 * @param {Object} args
 * state: gameafter
 */
exports.setGameAfter = function(args) {
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
 * return {width:Integer, height:Integer}
 */
exports.getGameAfterImageSize = function() {
	return {
		width : $.leftImageGameAfterTemplate.width,
		height : $.leftImageGameAfterTemplate.height
	};
};

/**
 *
 * @param {Object} args
 * state: after
 */
exports.setAfter = function(args) {
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
 * return {width:Integer, height:Integer}
 */
exports.getAfterImageSize = function() {
	return {
		width : $.leftImageAfterTemplate.width,
		height : $.leftImageAfterTemplate.height
	};
};

/**
 *
 * @param {Object} args
 * state: gamevs
 */
exports.setGameVS = function(args) {
	cleanAll();

	$.main.height = $.gameVSTemplate.height;
	$.gameVSTemplate.visible = true;
	$.leftLabelGameVSTemplate.text = args.title[0];
	$.leftImageGameVSTemplate.image = args.image[0];
	$.rightLabelGameVSTemplate.text = args.title[1];
	$.rightImageGameVSTemplate.image = args.image[1];
	$.vsLabelGameVSTemplate.text = L('com.intbizth.balltoro.gamelabel.vs');
};

/**
 * return {width:Integer, height:Integer}
 */
exports.getGameVSImageSize = function() {
	return {
		width : $.leftImageGameVSTemplate.width,
		height : $.leftImageGameVSTemplate.height
	};
};
