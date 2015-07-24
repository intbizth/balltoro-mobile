function loadEvent() {
	$.main.addEventListener('open', function(e) {
		Alloy.Globals.login.mainWindow.lock();

		_.delay(function() {
			Ti.App.fireEvent('logout', {});
		}, _.random(800, 5000));
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

function destroy() {

};

exports.destroy = function() {
	destroy();
};
