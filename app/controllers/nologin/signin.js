function loadEvent() {
	$.navbarView.getView().addEventListener('left:click', function(e) {
		$.main.close();
	});

	$.main.addEventListener('open', function() {
		_.delay(function() {
			Ti.App.fireEvent('login', {});
		}, 1000);
	});
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Globals.navbar);
	$.navbarView.setTitleView(L('nologin.signin.title'));
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
