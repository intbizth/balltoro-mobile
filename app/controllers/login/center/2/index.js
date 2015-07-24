function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.content.top = 20;
	}
	
	$.navbarView.loadConfig(Alloy.Globals.navbar);
};

initialize();

function destroy() {

};

exports.destroy = function() {
	destroy();
};
