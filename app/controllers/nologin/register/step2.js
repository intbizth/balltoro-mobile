var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};

Alloy.Logger.debug('[' + $.main.name + '] args ' + JSON.stringify(args));

$.photoCameraView.width = 242;
$.photoCameraView.leftHideRemove = (Ti.Platform.displayCaps.platformWidth / 2) - (($.photoCameraView.width - 106) / 2);
$.photoCameraView.leftShowRemove = (Ti.Platform.displayCaps.platformWidth / 2) - ($.photoCameraView.width / 2);
$.photoCameraView.left = $.photoCameraView.leftHideRemove;

$.photoCameraView.showRemove = function() {
	var duration = 160;

	$.photoCameraView.animate({
		left : $.photoCameraView.leftShowRemove,
		duration : duration
	}, function() {
		$.photoCameraView.left = $.photoCameraView.leftShowRemove;
	});

	$.removePhoto.visible = true;
	$.removePhoto.animate({
		opacity : 1,
		duration : duration
	}, function() {
		$.removePhoto.opacity = 1;
	});
};

$.photoCameraView.hideRemove = function() {
	var duration = 160;

	$.photoCameraView.animate({
		left : $.photoCameraView.leftHideRemove,
		duration : duration
	}, function() {
		$.photoCameraView.left = $.photoCameraView.leftHideRemove;
	});

	$.removePhoto.animate({
		opacity : 0,
		duration : duration
	}, function() {
		$.removePhoto.opacity = 0;
		$.removePhoto.visible = false;
	});
};

$.nextButton.enable = function() {
	this.backgroundColor = this.backgroundColorEnable;
};

$.nextButton.disable = function() {
	this.backgroundColor = this.backgroundColorDisable;
};

// $.nextButton.disable();
// $.nextButton.enable();

$.nextButton.addEventListener('touchstart', function() {
	$.nextLabel.opacity = $.nextLabel.opacityAct;
});

$.nextButton.addEventListener('touchmove', function() {
	this.fireEvent('touchstart');
});

$.nextButton.addEventListener('touchend', function() {
	$.nextLabel.opacity = $.nextLabel.opacityInAct;
});

$.nextButton.addEventListener('touchcancel', function() {
	this.fireEvent('touchend');
});

$.nextButton.addEventListener('click', function() {

});

$.addPhoto.addEventListener('touchstart', function() {
	this.opacity = this.opacityAct;
});

$.addPhoto.addEventListener('touchmove', function() {
	this.fireEvent('touchstart');
});

$.addPhoto.addEventListener('touchend', function() {
	this.opacity = this.opacityInAct;
});

$.addPhoto.addEventListener('touchcancel', function() {
	this.fireEvent('touchend');
});

$.addPhoto.addEventListener('click', function() {
	$.photoCameraView.showRemove();
});

$.openCamera.addEventListener('touchstart', function() {
	this.opacity = this.opacityAct;
});

$.openCamera.addEventListener('touchmove', function() {
	this.fireEvent('touchstart');
});

$.openCamera.addEventListener('touchend', function() {
	this.opacity = this.opacityInAct;
});

$.openCamera.addEventListener('touchcancel', function() {
	this.fireEvent('touchend');
});

$.openCamera.addEventListener('click', function() {
	$.photoCameraView.showRemove();
});

$.removePhoto.addEventListener('touchstart', function() {
	this.opacity = this.opacityAct;
});

$.removePhoto.addEventListener('touchmove', function() {
	this.fireEvent('touchstart');
});

$.removePhoto.addEventListener('touchend', function() {
	this.opacity = this.opacityInAct;
});

$.removePhoto.addEventListener('touchcancel', function() {
	this.fireEvent('touchend');
});

$.removePhoto.addEventListener('click', function() {
	$.photoCameraView.hideRemove();
});

function doBlur(e) {
	if (e.source) {
		blur();
	}
};

function blur() {
	$.name.blur();
	$.surname.blur();
};

function clean() {
	$.name.value = '';
	$.surname.value = '';
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.setData({
		id : 'nologin.register.step2',
		title : L('nologin.register.title'),
		leftIcon : 'arrow_left',
		leftTitle : L('back')
	});

	$.navbarView.on('left:click', function(e) {
		$.main.close();
	});

	$.main.addEventListener('open', function(e) {
		load();

		var log = '[' + $.main.name + '] ';
		log += e.type;
		log += ' ';
		log += '(';
		log += ' nologin stacks: ';
		log += JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name'));
		log += ' ';
		log += Alloy.Globals.nologin.stackWindows.length;
		log += ')';

		Alloy.Logger.debug(log);
	});

	$.main.addEventListener('close', function(e) {
		unLoad();
		clean();

		var log = '[' + $.main.name + '] ';
		log += e.type;
		log += ' ';
		log += '(';
		log += ' nologin stacks: ';
		log += JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name'));
		log += ' ';
		log += Alloy.Globals.nologin.stackWindows.length;
		log += ')';

		Alloy.Logger.debug(log);
	});
};

function load() {
	Alloy.Logger.debug('[' + $.main.name + '] load');

	loaded = true;
	openedWindow = false;
};

function unLoad() {
	Alloy.Logger.debug('[' + $.main.name + '] unLoad');

	loaded = false;
	openedWindow = false;
};

exports.getLoad = function() {
	return loaded;
};

exports.load = function() {
	load();
};

exports.unLoad = function() {
	unLoad();
};

initialize();
