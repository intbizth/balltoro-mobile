var global = {
	test : {
		timer : null
	},
	width : 15,
	height : 15,
	winBackgroundColor : '#32ac41',
	winFontColor : '#000',
	loseBackgroundColor : '#ff332b',
	loseFontColor : '#000',
	drawBackgroundColor : '#f4d01e',
	drawFontColor : '#000'
};

function createWin() {
	var view = Ti.UI.createView({
		width : global.width,
		height : global.height,
		backgroundColor : global.winBackgroundColor
	});

	var label = Ti.UI.createLabel({
		width : global.width,
		height : global.height,
		font : {
			fontSize : 10
		},
		color : global.winFontColor,
		text : 'W',
		textAlign : 'center'
	});

	view.add(label);

	return view;
};

function createLose() {
	var view = Ti.UI.createView({
		width : global.width,
		height : global.height,
		backgroundColor : global.loseBackgroundColor
	});

	var label = Ti.UI.createLabel({
		width : global.width,
		height : global.height,
		font : {
			fontSize : 10
		},
		color : global.loseFontColor,
		text : 'L',
		textAlign : 'center'
	});

	view.add(label);

	return view;
};

function createDraw() {
	var view = Ti.UI.createView({
		width : global.width,
		height : global.height,
		backgroundColor : global.drawBackgroundColor
	});

	var label = Ti.UI.createLabel({
		width : global.width,
		height : global.height,
		font : {
			fontSize : 10
		},
		color : global.drawFontColor,
		text : 'D',
		textAlign : 'center'
	});

	view.add(label);

	return view;
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
};

/**
 * @param {Integer} duration
 */
exports.startTest = function(duration, element) {
	run();

	global.timer = setInterval(function() {
		run();
	}, duration);

	function run() {
		element.removeAllChildren();

		var random = _.random(1, 10);

		for (var i = 1; i <= random; i++) {
			var random2 = _.random(0, 2);

			if (random2 === 0) {
				element.add(createWin());
			} else if (random2 === 1) {
				element.add(createLose());
			} else if (random2 === 2) {
				element.add(createDraw());
			}

			if (i < random) {
				element.add(Ti.UI.createView({
					width : 2,
					height : 1
				}));
			}
		}
	};
};

exports.stopTest = function(element) {
	clearInterval(global.timer);
	global.timer = null;

	element.removeAllChildren();
};

/**
 * return {UIView}
 */
exports.createWin = function() {
	return createWin();
};

/**
 * return {UIView}
 */
exports.createLose = function() {
	return createLose();
};

/**
 * return {UIView}
 */
exports.createDraw = function() {
	return createDraw();
};
