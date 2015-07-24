var global = {
	load : false
};

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
