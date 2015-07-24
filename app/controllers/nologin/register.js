function loadEvent() {
	$.navbarView.getView().addEventListener('left:click', function(e) {
		$.main.close();
	});
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Globals.navbar);
	$.navbarView.setTitleView(L('nologin.register.title'));
	$.navbarView.setLeftView({
		icon : 'arrow_left',
		title : L('back')
	});

	loadEvent();
};

initialize();

function destroy() {

};

exports.destroy = function() {
	destroy();
};
