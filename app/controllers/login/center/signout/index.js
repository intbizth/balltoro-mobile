$.navbarView.setTitleView(L('login.menu.signout'));

$.main.addEventListener('open', function(e) {
	Alloy.Globals.login.mainWindow.lock();

	_.delay(function() {
		Ti.App.fireEvent('logout', {});
	}, _.random(800, 5000));
});

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.content.top = 20;
	}

	$.activityIndicator.show();
};

initialize();