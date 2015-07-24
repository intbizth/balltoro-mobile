exports.createWin = function() {
	var view = Ti.UI.createView({
		width : 30,
		height : 30,
		backgroundColor : '#32ac41'
	});

	var label = Ti.UI.createLabel({
		font : {
			fontSize : 14
		},
		color : '#000',
		text : 'W',
		textAlign : 'center'
	});

	view.add(label);

	return view;
};

exports.createLose = function() {
	var view = Ti.UI.createView({
		width : 30,
		height : 30,
		backgroundColor : '#ff332b'
	});

	var label = Ti.UI.createLabel({
		font : {
			fontSize : 14
		},
		color : '#000',
		text : 'L',
		textAlign : 'center'
	});

	view.add(label);

	return view;
};

exports.createDraw = function() {
	var view = Ti.UI.createView({
		width : 30,
		height : 30,
		backgroundColor : '#f4d01e'
	});

	var label = Ti.UI.createLabel({
		font : {
			fontSize : 14
		},
		color : '#000',
		text : 'D',
		textAlign : 'center'
	});

	view.add(label);

	return view;
};
