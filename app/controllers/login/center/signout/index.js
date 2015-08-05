var loaded = false;
var args = {};
var openedWindow = false;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.setTitleView(L('login.menu.signout'));

	$.main.addEventListener('open', function(e) {
		load();

		Alloy.Globals.login.mainWindow.lock();

		_.delay(function() {
			Alloy.Globals.nologin.force();
		}, _.random(800, 4000));

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});

	$.main.addEventListener('close', function(e) {
		unLoad();

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});

	$.activityIndicator.show();
};

function load() {
	loaded = true;
	openedWindow = false;
};

function unLoad() {
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

exports.setArgs = function(value) {
	args = value;
};

initialize();
