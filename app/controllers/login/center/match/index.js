var loaded = false;
var args = {
	matchlabel : {
		image : '',
		title : ''
	}
};
var openedWindow = false;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.setTitleView(args.matchlabel.title);

	$.main.addEventListener('open', function(e) {
		load();

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});

	$.main.addEventListener('close', function(e) {
		unLoad();

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});

	$.matchlabelView.setData(args.matchlabel);
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
	Ti.API.error('setArgs:', value);
	args = value;
};

initialize();
