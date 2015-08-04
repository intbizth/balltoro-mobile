if (Alloy.Globals.isIos7Plus) {
	$.main.top = 20;
}

exports.getLoad = function() {

};

exports.load = function() {
	$.leftmenuView.load();
};

exports.unLoad = function() {
	$.leftmenuView.unLoad();
};
