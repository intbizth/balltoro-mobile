var global = {
	load : false
};

function loadEvent() {
	$.main.addEventListener('open', function(e) {
		Alloy.Globals.login.mainWindow.lock();

		_.delay(function() {
			Ti.App.fireEvent('logout', {});
		}, _.random(800, 4000));
	});
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Globals.navbar);
	$.navbarView.setTitleView(L('login.menu.signout'));

	$.activityIndicator.show();

	loadEvent();
};

initialize();

function load() {

};

function destroy() {
	global.load = false;
};

exports.getLoad = function() {
	return global.load;
};

exports.load = function() {
	load();
};

exports.destroy = function() {
	destroy();
};
