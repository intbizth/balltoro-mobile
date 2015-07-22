$.main.addEventListener('dblclick', function(e) {
	Ti.App.fireEvent('logout');
});

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.content.top = 20;
	}
};

initialize();