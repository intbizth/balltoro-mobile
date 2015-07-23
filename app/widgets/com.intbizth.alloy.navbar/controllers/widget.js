var global = {
	height : 40,
	buttonWidth : 64,
	backgroundColor : '#000',
	lineColor : '#fff',
	titleFontColor : '#fff',
	buttonLeftFontColor : '#fff',
	buttonRightFontColor : '#fff'
};

function initialize() {
	$.main.height = global.height;
	$.main.backgroundColor = global.backgroundColor;
	$.line.backgroundColor = global.lineColor;

	$.title.height = global.height;
	$.title.width = parseInt(Ti.Platform.displayCaps.platformWidth - (global.buttonWidth * 2));
	$.title.addEventListener('click', function() {
		$.main.fireEvent('title:click');
	});
	$.title.addEventListener('dblclick', function() {
		$.main.fireEvent('title:dblclick');
	});

	$.left.height = global.height;
	$.left.width = global.buttonWidth;

	$.left.addEventListener('click', function() {
		$.main.fireEvent('left:click');
	});

	$.left.addEventListener('dblclick', function() {
		$.main.fireEvent('left:dblclick');
	});

	$.left.addEventListener('touchstart', function() {
		if (this.children.length > 0) {
			this.children[0].act();
		}
	});

	$.left.addEventListener('touchmove', function() {
		this.fireEvent('touchstart');
	});

	$.left.addEventListener('touchend', function() {
		if (this.children.length > 0) {
			this.children[0].inact();
		}
	});

	$.left.addEventListener('touchcancel', function() {
		this.fireEvent('touchend');
	});

	$.right.height = global.height;
	$.right.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.2);

	$.right.addEventListener('click', function() {
		$.main.fireEvent('right:click');
	});

	$.right.addEventListener('dblclick', function() {
		$.main.fireEvent('right:dblclick');
	});

	$.right.addEventListener('touchstart', function() {
		if (this.children.length > 0) {
			this.children[0].act();
		}
	});

	$.right.addEventListener('touchmove', function() {
		this.fireEvent('touchstart');
	});

	$.right.addEventListener('touchend', function() {
		if (this.children.length > 0) {
			this.children[0].inact();
		}
	});

	$.right.addEventListener('touchcancel', function() {
		this.fireEvent('touchend');
	});
};

initialize();

/**
 *
 * @param {Object} args
 */
exports.loadConfig = function(args) {
	if (args.height) {
		global.height = args.height;
		$.left.height = global.height;
	}

	if (args.backgroundColor) {
		global.backgroundColor = args.backgroundColor;
		$.main.backgroundColor = global.backgroundColor;
	}

	if (args.lineColor) {
		global.lineColor = args.lineColor;
		$.line.backgroundColor = global.lineColor;
	}

	if (args.titleFontColor) {
		global.titleFontColor = args.titleFontColor;
	}

	if (args.buttonLeftFontColor) {
		global.buttonLeftFontColor = args.buttonLeftFontColor;
	}

	if (args.buttonRightFontColor) {
		global.buttonRightFontColor = args.buttonRightFontColor;
	}
};

/**
 *
 * @param {Object|String} view
 */
exports.setTitleView = function(view) {
	if (!view) {
		return;
	}

	$.title.removeAllChildren();

	if (_.isString(view)) {
		view = Ti.UI.createLabel({
			width : $.title.width,
			height : $.title.height,
			color : global.titleFontColor,
			font : {
				fontSize : 16
			},
			text : view,
			textAlign : 'center'
		});
	}

	$.title.add(view);
};

/**
 *
 * @param {Object} view
 */
exports.setLeftView = function(view) {
	if (!view) {
		return;
	}

	$.left.removeAllChildren();

	if (view.toString() === '[object Object]') {
		var subView = Ti.UI.createView({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			layout : 'horizontal',
			opacity : 1,
			opacityAct : 0.2,
			opacityInAct : 1,
			act : function() {
				this.opacity = this.opacityAct;
			},
			inact : function() {
				this.opacity = this.opacityInAct;
			}
		});

		if (view.icon) {
			var icon = Ti.UI.createImageView({
				width : 21,
				height : 21,
				image : 'images/navbar/' + view.icon + '.png'
			});

			subView.add(icon);
		}

		if (view.title) {
			var title = Ti.UI.createLabel({
				height : 22,
				color : global.buttonLeftFontColor,
				font : {
					fontSize : 14
				},
				text : view.title
			});

			subView.add(title);
		}

		view = subView;
	}

	$.left.add(view);
};

/**
 *
 * @param {Object} view
 */
exports.setRightView = function(view) {
	if (!view) {
		return;
	}

	$.right.removeAllChildren();

	if (view.toString() === '[object Object]') {
		var subView = Ti.UI.createView({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			layout : 'horizontal',
			opacity : 1,
			opacityAct : 0.2,
			opacityInAct : 1,
			act : function() {
				this.opacity = this.opacityAct;
			},
			inact : function() {
				this.opacity = this.opacityInAct;
			}
		});

		if (view.icon) {
			var icon = Ti.UI.createImageView({
				width : 21,
				height : 21,
				image : 'images/navbar/' + view.icon + '.png'
			});

			subView.add(icon);
		}

		if (view.title) {
			var title = Ti.UI.createLabel({
				height : 22,
				color : global.buttonRightFontColor,
				font : {
					fontSize : 14
				},
				text : view.title
			});

			subView.add(title);
		}

		view = subView;
	}

	$.right.add(view);
};
