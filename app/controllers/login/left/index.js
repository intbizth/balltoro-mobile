var debug = true;
var loaded = false;
var openedWindow = false;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.main.top = 20;
	}

	$.main.addEventListener('open', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', e.type);
		}
	});

	$.main.addEventListener('close', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', e.type);
		}
	});

	$.leftmenuView.on('click', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', 'click:', e);
		}

		var name = e.name;

		switch(name) {
		case 'tester':
			var data = {
				name : name
			};

			Alloy.Globals.login.mainWindow.setMenu(data);
			break;
		case 'signout':
			var data = {
				name : name
			};

			Alloy.Globals.login.mainWindow.setMenu(data);
			break;
		};
	});

	$.leftmenuView.on('dblclick', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', 'dblclick:', e);
		}

		var name = e.name;

		switch(name) {
		case 'tester':
			var data = {
				name : name,
				reload : true
			};

			Alloy.Globals.login.mainWindow.setMenu(data);
			break;
		case 'signout':
			var data = {
				name : name
			};

			Alloy.Globals.login.mainWindow.setMenu(data);
			break;
		};
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

function selectMenu(value) {
	$.leftmenuView.selectItem(value.name);
	Alloy.Globals.login.mainWindow.setMenu(value);
};

function load() {
	if (debug) {
		Ti.API.debug('[' + $.main.name + ']', 'load');
	}

	loaded = true;
	openedWindow = false;
	$.leftmenuView.load();
	selectMenu({
		name : Alloy.Globals.login.defaultMenu,
		noToggle : true
	});
};

function unLoad() {
	if (debug) {
		Ti.API.debug('[' + $.main.name + ']', 'unLoad');
	}

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
