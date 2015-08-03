var args = arguments[0] || {};
var config = require(WPATH('config'));
var template = 'section';
var accordion = false;

$.main.name = args.name;
$.main.width = config.width;
$.main.height = config[template].height;
$.main.backgroundColor = config[template].backgroundColor;
$.main.open = args.open;

$.subView.width = $.main.width;
$.subView.height = config[template].height;

if (args.icon !== '') {
	$.iconView.width = config[template].height;
	$.iconView.height = config[template].height;
	$.iconImage.image = WPATH(args.icon);
	$.labelView.left = $.iconView.width;
	$.labelView.height = config[template].height;
	$.labelView.width = config.width - $.iconView.width;
	$.label.width = $.labelView.width - 8;
} else {
	$.labelView.width = config.width;
	$.label.width = $.labelView.width - 20;
}

$.label.color = config[template].color;
$.label.text = args.title;

$.lineView.backgroundColor = config[template].line.verticalColor;
$.arrowLineView.height = config[template].height - 12;
$.arrowLineView.backgroundColor = config[template].line.horizontalColor;

if (args.data || args.api) {
	accordion = true;

	$.labelView.width = $.labelView.width - 40;
	$.label.width = $.labelView.width - 8;

	$.arrowView.width = config[template].height;
	$.arrowView.height = $.arrowView.width;
	$.arrowView.visible = true;

	$.dataView.top = $.main.height;
	$.dataView.width = $.main.width;

	if (args.data) {
		for (var i in args.data) {
			var main = Widget.createController('template/setting', args.data[i]);
			var view = main.getView();

			$.dataView.add(view);
			$.dataView.heightMax += view.height;
		}
	}

	$.dataView.height = $.dataView.heightMax;

	$.main.addEventListener('click', function() {
		this.open = !this.open;

		if (this.open) {
			$.arrowImage.transform = Ti.UI.create2DMatrix().rotate(180);
		} else {
			$.arrowImage.transform = Ti.UI.create2DMatrix();
		}
	});
}

$.main.addEventListener('touchstart', function() {
	$.subView.opacity = $.subView.opacityAct;
});

$.main.addEventListener('touchmove', function() {
	this.fireEvent('touchstart');
});

$.main.addEventListener('touchend', function() {
	$.subView.opacity = $.subView.opacityInAct;
});

$.main.addEventListener('touchcancel', function() {
	this.fireEvent('touchend');
});

exports.setIcon = function(value) {
	$.iconImage.image = value;
};

exports.setTitle = function(value) {
	$.label.text = value;
};

exports.open = function() {
	if (!accordion) {
		return;
	}
};

exports.close = function() {
	if (!accordion) {
		return;
	}
};
