var loaded = false;
var args = {};
var openedWindow = false;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.main.top = 20;
	}

	$.main.addEventListener('open', function(e) {
		Ti.API.debug($.main.name + ':' + e.type);
	});

	$.main.addEventListener('close', function(e) {
		Ti.API.debug($.main.name + ':' + e.type);
	});

	$.leftmenuView.getView().addEventListener('click', function(e) {
		if (!e.source.name) {
			return;
		}

		var menu = e.source.name;

		if (/program\:/.test(menu)) {
			menu = 'program';
			var args = {
				programCode : menu.replace('program:', '')
			};

			Alloy.Globals.login.mainWindow.setMenu(menu, args);
		} else {
			Alloy.Globals.login.mainWindow.setMenu(menu);
		}
	});
};

function load() {
	loaded = true;
	openedWindow = false;

	$.leftmenuView.load();
	$.leftmenuView.act(Alloy.Globals.login.defaultMenu);
};

function unLoad() {
	loaded = false;
	openedWindow = false;
	$.leftmenuView.unLoad();
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
