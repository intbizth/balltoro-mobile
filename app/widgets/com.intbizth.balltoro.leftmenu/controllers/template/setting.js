var args = arguments[0] || {};
var config = require(WPATH('config'));
var template = 'setting';

$.main.name = args.name;
$.main.width = config.width;
$.main.height = config[template].height;
$.main.backgroundColor = config[template][(args.act) ? 'backgroundColorAct' : 'backgroundColorInAct'];
$.main.backgroundColorInAct = config[template].backgroundColorInAct;
$.main.backgroundColorAct = config[template].backgroundColorAct;

$.subView.width = $.main.width;
$.subView.height = $.main.height;

if (args.icon !== '') {
	$.iconView.left = 40;
	$.iconView.width = config[template].height - $.iconView.left;
	$.iconView.height = config[template].height;
	$.iconImage.image = WPATH(args.icon);
	$.labelView.left = $.iconView.left + $.iconView.width;
	$.labelView.height = config[template].height;
	$.labelView.width = config.width - $.iconView.width;
	$.label.width = $.labelView.width - 8;
} else {
	$.labelView.left = 40;
	$.labelView.width = config.width - $.labelView.left;
	$.label.width = $.labelView.width - 20;
}

$.label.color = config[template].color;
$.label.text = args.title;
$.lineView.backgroundColor = config[template].line.verticalColor;

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

exports.act = function(value) {
	$.main.backgroundColor = $.main.backgroundColorAct;
};

exports.inact = function(value) {
	$.main.backgroundColor = $.main.backgroundColorInAct;
};

exports.setIcon = function(value) {
	$.iconImage.image = value;
};

exports.setTitle = function(value) {
	$.label.text = value;
};
