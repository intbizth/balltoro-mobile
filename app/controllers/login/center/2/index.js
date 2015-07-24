function loadEvent() {

};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Globals.navbar);

	loadEvent();
};

initialize();

function destroy() {

};

exports.destroy = function() {
	destroy();
};
