var global = {
	width : 15,
	height : 15,
	winBackgroundColor : '#32ac41',
	winFontColor : '#000',
	loseBackgroundColor : '#ff332b',
	loseFontColor : '#000',
	drawBackgroundColor : '#f4d01e',
	drawFontColor : '#000'
};

/**
 *
 * @param {Object} args
 */
exports.loadConfig = function(args) {
	if (args.width) {
		global.width = args.width;
	}

	if (args.height) {
		global.height = args.height;
	}

	if (args.winBackgroundColor) {
		global.winBackgroundColor = args.winBackgroundColor;
	}

	if (args.winFontColor) {
		global.winFontColor = args.winFontColor;
	}

	if (args.loseBackgroundColor) {
		global.loseBackgroundColor = args.loseBackgroundColor;
	}

	if (args.loseFontColor) {
		global.loseFontColor = args.loseFontColor;
	}

	if (args.drawBackgroundColor) {
		global.drawBackgroundColor = args.drawBackgroundColor;
	}

	if (args.drawFontColor) {
		global.drawFontColor = args.drawFontColor;
	}
};

/**
 * return {UIView}
 */
exports.createWin = function() {
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

/**
 * return {UIView}
 */
exports.createLose = function() {
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

/**
 * return {UIView}
 */
exports.createDraw = function() {
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
