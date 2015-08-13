// var rand = Vendor.Chance.pick([true, false]);
//
// Ti.API.info('set user:', (rand) ? 'yes' : 'no');
//
// var data = {
// id : 1,
// userId : null,
// token : null,
// updatedAt : 0
// };
//
// // if (rand) {
// // data = {
// // id : 1,
// // userId : Chance.guid(),
// // token : Chance.hash(),
// // updatedAt : Chance.timestamp()
// // };
// // }
//
// Alloy.Models.user.set(data);
// Alloy.Models.user.save();
//
// Ti.API.error('userId:', typeof Alloy.Models.user.get('userId'), Alloy.Models.user.get('userId'));
// Ti.API.error('token:', typeof Alloy.Models.user.get('token'), Alloy.Models.user.get('token'));
// Ti.API.error('updatedAt:', typeof Alloy.Models.user.get('updatedAt'), Alloy.Models.user.get('updatedAt'));
//
// if (_.isNull(Alloy.Models.user.get('userId')) && _.isNull(Alloy.Models.user.get('token'))) {
// $.nologin.getView().open();
// } else {
// $.login.getView().open();
// }
//
// Ti.API.info("Ti.Locale.currentLanguage = " + Ti.Locale.currentLanguage);
// Ti.API.info("Ti.Locale.currentLocale = " + Ti.Locale.currentLocale);

var animating = false;

Alloy.Globals.nologin.mainWindow = $.nologin.getView();
Alloy.Globals.nologin.stackWindows = [];
Alloy.Globals.login.stackWindows = [];
Alloy.Globals.login.mainWindow = $.login.getView();
Alloy.Globals.login.leftWindow = Alloy.createController('login/left/index');
Alloy.Globals.login.mainWindow.setLeftWindow(Alloy.Globals.login.leftWindow.getView());
Alloy.Globals.login.menuWindows = {};

Alloy.Globals.login.mainWindow.lock = function() {
	Alloy.Globals.login.mainWindow.openDrawerGestureMode = 'OPEN_MODE_NONE';
};

Alloy.Globals.login.mainWindow.unlock = function() {
	Alloy.Globals.login.mainWindow.openDrawerGestureMode = 'OPEN_MODE_ALL';
};

Alloy.Globals.login.mainWindow.setMenu = function(value) {
	var debug = true;
	var data = {
		name : '',
		args : {},
		reload : false,
		noToggle : false
	};

	data = _.extend(data, value);

	if (debug) {
		Ti.API.debug('[setmenu]', 'data:', data);
	}

	Alloy.Globals.login.stackWindows = [];

	if (!Alloy.Globals.login.menuWindows[data.name]) {
		var menuWindow = Alloy.createController('login/center/' + data.name + '/index', data.args);
		Alloy.Globals.login.menuWindows[data.name] = menuWindow;
	}

	if (data.reload) {
		Alloy.Globals.login.menuWindows[data.name].unLoad();
	}

	Alloy.Globals.login.mainWindow.setCenterWindow(Alloy.Globals.login.menuWindows[data.name].getView());
	Alloy.Globals.login.menu = data.name;

	if (debug) {
		Ti.API.debug('[setmenu]', data.name + ':getLoad:', (Alloy.Globals.login.menuWindows[data.name].getLoad()) ? 'true' : 'false');
	}

	if (!Alloy.Globals.login.menuWindows[data.name].getLoad()) {
		Alloy.Globals.login.menuWindows[data.name].load();
	}

	if (!data.noToggle) {
		Alloy.Globals.login.mainWindow.toggleLeftWindow();
	}
};

$.login.getView().open();
$.nologin.getView().open();

$.nologin.getView().opacity = 1;

// > event
Alloy.Globals.login.force = function(fn) {
	if (animating) {
		return;
	}

	animating = true;

	Alloy.Globals.login.leftWindow.load();
	Alloy.Globals.login.mainWindow.unlock();

	$.login.getView().opacity = 1;
	$.nologin.getView().opacity = 0;

	if (fn) {
		fn();
	}

	_.delay(function() {
		animating = false;

		for (var i in Alloy.Globals.nologin.stackWindows) {
			i = parseInt(i);

			if (i !== 0) {
				Alloy.Globals.nologin.stackWindows[i].close();
			}
		}
	}, 800);
};

Alloy.Globals.nologin.force = function(fn) {
	if (animating) {
		return;
	}

	animating = true;

	Alloy.Globals.login.menu = Alloy.Globals.login.defaultMenu;

	$.nologin.getView().animate({
		opacity : 1,
		duration : 800
	}, function() {
		$.login.getView().opacity = 0;
	});

	if (fn) {
		fn();
	}

	_.delay(function() {
		animating = false;

		Alloy.Globals.login.leftWindow.unLoad();

		for (var i in Alloy.Globals.login.menuWindows) {
			Alloy.Globals.login.menuWindows[i].unLoad();
		}
	}, 800);
};
// < event