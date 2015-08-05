var args = arguments[0] || {};
var config = Widget.config;
var template = 'setting';
var left = 30;

$.main.name = $.subView.name = $.iconView.name = $.iconImage.name = $.labelView.name = $.label.name = $.lineView.name = args.data.name;
$.main.width = config.width;
$.main.height = config[template].height;
$.main.backgroundColor = config[template][(args.data.act) ? 'backgroundColorAct' : 'backgroundColorInAct'];
$.main.backgroundColorInAct = config[template].backgroundColorInAct;
$.main.backgroundColorAct = config[template].backgroundColorAct;

$.subView.width = $.main.width;
$.subView.height = $.main.height;

if (args.data.icon !== '') {
	$.iconView.left = left;
	$.iconView.width = config[template].height;
	$.iconView.height = config[template].height;
	$.iconImage.image = WPATH(args.data.icon);
	$.labelView.left = $.iconView.left + $.iconView.width;
	$.labelView.height = config[template].height;
	$.labelView.width = config.width - ($.iconView.left + $.iconView.width);
	$.label.width = $.labelView.width - 8;
} else {
	$.labelView.left = left;
	$.labelView.width = config.width - $.labelView.left;
	$.label.width = $.labelView.width - 20;
}

$.label.color = config[template].color;
$.label.text = args.data.title;
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

exports.getAct = function() {
	return args.data.act;
};

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
