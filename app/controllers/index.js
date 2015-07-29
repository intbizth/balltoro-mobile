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

var global = {
	changeWindow : false
};

Alloy.Globals.nologin.mainWindow = $.nologin.getView();
Alloy.Globals.login.mainWindow = $.login.getView();
Alloy.Globals.login.leftWindow = Alloy.createController('login/left/index');
Alloy.Globals.login.mainWindow.setLeftWindow(Alloy.Globals.login.leftWindow.getView());
Alloy.Globals.login.menuWindows = {};

for (var i in Alloy.Globals.login.menus) {
	var menuWindow = Alloy.createController('login/center/' + Alloy.Globals.login.menus[i] + '/index');
	Alloy.Globals.login.menuWindows[Alloy.Globals.login.menus[i]] = menuWindow;
}

Alloy.Globals.login.mainWindow.lock = function() {
	Alloy.Globals.login.mainWindow.openDrawerGestureMode = 'OPEN_MODE_NONE';
};

Alloy.Globals.login.mainWindow.unlock = function() {
	Alloy.Globals.login.mainWindow.openDrawerGestureMode = 'OPEN_MODE_ALL';
};

Alloy.Globals.login.mainWindow.setMenu = function(menu, noToggle) {
	Ti.API.debug('loginWindow:setMenu:' + menu);
	Alloy.Globals.login.mainWindow.setCenterWindow(Alloy.Globals.login.menuWindows[menu].getView());
	Alloy.Globals.login.menu = menu;

	if (!Alloy.Globals.login.menuWindows[Alloy.Globals.login.menu].getLoad()) {
		Alloy.Globals.login.menuWindows[Alloy.Globals.login.menu].load();
	}

	if (!noToggle) {
		Alloy.Globals.login.mainWindow.toggleLeftWindow();
	}
};

$.login.getView().open();
$.nologin.getView().open();

$.nologin.getView().opacity = 1;

// > event
Ti.App.addEventListener('login', function(e) {
	if (global.changeWindow) {
		return;
	}

	global.changeWindow = true;

	Alloy.Globals.login.leftWindow.load();
	Alloy.Globals.login.mainWindow.unlock();
	Alloy.Globals.login.mainWindow.setMenu(Alloy.Globals.login.menu, true);

	$.login.getView().opacity = 1;
	$.nologin.getView().opacity = 0;

	_.delay(function() {
		global.changeWindow = false;
	}, 800);
});

Ti.App.addEventListener('logout', function(e) {
	if (global.changeWindow) {
		return;
	}

	global.changeWindow = true;

	Alloy.Globals.login.menu = Alloy.Globals.login.defaultMenu;

	$.nologin.getView().animate({
		opacity : 1,
		duration : 800
	}, function() {
		$.login.getView().opacity = 0;
	});

	_.delay(function() {
		global.changeWindow = false;

		Alloy.Globals.login.leftWindow.destroy();

		for (var i in Alloy.Globals.login.menuWindows) {
			Alloy.Globals.login.menuWindows[i].destroy();
		}
	}, 800);
});
// < event