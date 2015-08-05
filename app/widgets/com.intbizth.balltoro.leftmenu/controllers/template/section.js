var args = arguments[0] || {};
var config = Widget.config;
var template = 'section';
var items = {};
var accordion = false;

$.main.open = function() {
};
$.main.close = function() {
};

$.main.opened = args.data.open;

$.content.width = config.width;
$.content.height = config[template].height;
$.content.backgroundColor = config[template][(args.data.act) ? 'backgroundColorAct' : 'backgroundColorInAct'];
$.content.backgroundColorInAct = config[template].backgroundColorInAct;
$.content.backgroundColorAct = config[template].backgroundColorAct;

$.subView.width = $.content.width;
$.subView.height = $.content.height;

if (args.data.icon !== '') {
	$.iconView.width = config[template].height;
	$.iconView.height = config[template].height;
	$.iconImage.image = WPATH(args.data.icon);
	$.labelView.left = $.iconView.width;
	$.labelView.height = config[template].height;
	$.labelView.width = config.width - $.iconView.width;
	$.label.width = $.labelView.width - 8;
} else {
	$.labelView.width = config.width;
	$.label.left = 10;
	$.label.width = $.labelView.width - 20;
}

$.label.color = config[template].color;
$.label.text = args.data.title;

$.lineView.backgroundColor = config[template].line.verticalColor;
$.arrowLineView.height = config[template].height - 12;
$.arrowLineView.backgroundColor = config[template].line.horizontalColor;

if (args.data.data) {
	accordion = true;

	$.main.open = function() {
		if ($.main.animating) {
			return;
		}

		$.main.animating = true;

		$.item.height = $.item.heightMax;

		$.arrowImage.animate({
			transform : Ti.UI.create2DMatrix().rotate(180),
			duration : $.main.duration
		}, function() {
			$.main.animating = false;
			$.arrowImage.transform = Ti.UI.create2DMatrix().rotate(180);
		});
	};

	$.main.close = function() {
		if ($.main.animating) {
			return;
		}

		$.main.animating = true;

		$.item.height = $.item.heightMin;

		$.arrowImage.animate({
			transform : Ti.UI.create2DMatrix(),
			duration : $.main.duration
		}, function() {
			$.main.animating = false;
			$.arrowImage.transform = Ti.UI.create2DMatrix();
		});
	};

	$.labelView.width = $.labelView.width - config[template].height;
	$.label.width = $.labelView.width - 8;

	$.arrowView.width = config[template].height;
	$.arrowView.height = $.arrowView.width;
	$.arrowView.visible = true;

	$.item.width = $.content.width;

	if (args.data.data) {
		for (var i in args.data.data) {
			var main = Widget.createController('template/' + args.data.data[i].template, {
				data : args.data.data[i],
				loadItems : args.loadItems
			});
			var view = main.getView();

			items[args.data.data[i].name] = main;

			$.item.add(view);
			$.item.heightMax += view.height;
		}
	}

	if ($.main.opened) {
		$.arrowImage.transform = Ti.UI.create2DMatrix().rotate(180);
		$.item.height = $.item.heightMax;
	}

	$.content.addEventListener('click', function() {
		$.main.opened = !$.main.opened;
		$.main[($.main.opened) ? 'open': 'close']();
	});
} else {
	$.main.name = $.content.name = $.subView.name = $.iconView.name = $.iconImage.name = $.labelView.name = $.label.name = $.arrowView.name = $.arrowLineView.name = $.arrowImage.name = $.lineView.name = args.data.name;
}

$.content.addEventListener('touchstart', function() {
	$.subView.opacity = $.subView.opacityAct;
});

$.content.addEventListener('touchmove', function() {
	this.fireEvent('touchstart');
});

$.content.addEventListener('touchend', function() {
	$.subView.opacity = $.subView.opacityInAct;
});

$.content.addEventListener('touchcancel', function() {
	this.fireEvent('touchend');
});

exports.getAct = function() {
	return args.data.act;
};

exports.act = function(value) {
	$.content.backgroundColor = $.content.backgroundColorAct;
};

exports.inact = function(value) {
	$.content.backgroundColor = $.content.backgroundColorInAct;
};

exports.setIcon = function(value) {
	$.iconImage.image = value;
};

exports.setTitle = function(value) {
	$.label.text = value;
};

exports.getItems = function() {
	return items;
};

exports.open = function() {
	if (!accordion) {
		return;
	}

	$.main.open();
};

exports.close = function() {
	if (!accordion) {
		return;
	}

	$.main.close();
};
