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

	Ti.API.error('$.leftmenuView:', $.leftmenuView);

	$.leftmenuView.on('click', function(e) {
		Ti.API.error('click', e);
	});

	$.leftmenuView.on('dblclick', function(e) {
		Ti.API.error('dblclick', e);
	});

	// $.leftmenuView.getView().addEventListener('click', function(e) {
	// if (!e.source.name) {
	// return;
	// }
	//
	// var menu = e.source.name;
	//
	// if (/program\:/.test(menu)) {
	// menu = 'program';
	// var args = {
	// programCode : menu.replace('program:', '')
	// };
	//
	// Alloy.Globals.login.mainWindow.setMenu(menu, e.source.data);
	// } else {
	// Alloy.Globals.login.mainWindow.setMenu(menu);
	// }
	// });
};

function selectMenu(value, args) {
	$.leftmenuView.selectItem(value);
	Alloy.Globals.login.mainWindow.setMenu(value, args);
};

function load() {
	loaded = true;
	openedWindow = false;
	$.leftmenuView.load();
	selectMenu(Alloy.Globals.login.defaultMenu);
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
