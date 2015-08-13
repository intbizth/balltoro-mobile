var debug = true;
var loaded = false;
var openedWindow = false;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	// $.navbarView.setTitleView(L('login.menu.league_game'));

	$.main.addEventListener('open', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
		}
	});

	$.main.addEventListener('close', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
		}
	});

	$.activityIndicator.show();
};

function load() {
	if (debug) {
		Ti.API.debug('[' + $.main.name + ']', 'load');
	}

	loaded = true;
	openedWindow = false;
};

function unLoad() {
	if (debug) {
		Ti.API.debug('[' + $.main.name + ']', 'unLoad');
	}

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
