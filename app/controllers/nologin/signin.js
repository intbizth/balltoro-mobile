var loaded = false;
var args = {};
var openedWindow = false;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.setTitleView(L('nologin.signin.title'));
	$.navbarView.setLeftView({
		icon : 'arrow_left',
		title : L('back')
	});

	// $.navbarView.getView().addEventListener('left:click', function(e) {
	// $.main.close();
	// });

	$.main.addEventListener('open', function(e) {
		load();

		_.delay(function() {
			Alloy.Globals.login.force();
		}, 1000);

		Alloy.Globals.nologin.stackWindows.push($.main);

		Ti.API.debug($.main.name + ':' + e.type, '(', 'nologin stacks:', JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name')), Alloy.Globals.nologin.stackWindows.length, ')');
	});

	$.main.addEventListener('close', function(e) {
		unLoad();

		Alloy.Globals.nologin.stackWindows.pop();

		Ti.API.debug($.main.name + ':' + e.type, '(', 'nologin stacks:', JSON.stringify(_.pluck(Alloy.Globals.nologin.stackWindows, 'name')), Alloy.Globals.nologin.stackWindows.length, ')');
	});
};

function load() {
	loaded = true;
	openedWindow = false;
};

function unLoad() {
	loaded = false;
	openedWindow = false;
};

exports.getLoad = function() {
	return loaded;
};

exports.load = function() {
	load();
};

exports.unLoad = function() {
	unLoad();
};

exports.setArgs = function(value) {
	args = value;
};

initialize();
