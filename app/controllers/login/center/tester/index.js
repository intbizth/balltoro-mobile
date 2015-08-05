var loaded = false;
var args = {};
var openedWindow = false;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.main.addEventListener('open', function(e) {
		load();

		Alloy.Globals.login.stackWindows.push($.main);

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});

	$.main.addEventListener('close', function(e) {
		unLoad();

		Alloy.Globals.login.stackWindows.pop();

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});
};

function load() {
	loaded = true;
	openedWindow = false;

	$.matchlabelView.startTest(8000);
	$.gamelabelView.startTest(8000);
	$.powerBarView.startTest(2000);
	$.winloseordrawView.startTest(8000, $.winloseordrawTestSubView);
	$.matchsummytableView.startTest(8000);
};

function unLoad() {
	loaded = false;
	openedWindow = false;

	$.matchlabelView.stopTest();
	$.gamelabelView.stopTest();
	$.powerBarView.stopTest();
	$.winloseordrawView.stopTest($.winloseordrawTestSubView);
	$.matchsummytableView.stopTest();
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
