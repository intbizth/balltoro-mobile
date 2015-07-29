var global = {
	load : false
};

function loadEvent() {
	Ti.API.debug('1:loadEvent');

	$.main.addEventListener('open', function(e) {

	});

	$.main.addEventListener('close', function(e) {

	});
};

function initialize() {
	Ti.API.debug('1:initialize');

	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Widgets.configs['com.intbizth.alloy.navbar']);
	$.gamelabelView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.gamelabel']);
	$.matchlabelView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.matchlabel']);
	$.powerBarView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.powerbar']);
	$.winloseordrawView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.winloseordraw']);
	$.matchsummytableView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.matchsummytable']);

	loadEvent();
};

initialize();

function load() {
	Ti.API.debug('1:load');

	global.load = true;

	$.matchlabelView.startTest(8000);
	$.gamelabelView.startTest(8000);
	$.powerBarView.startTest(500);
	$.winloseordrawView.startTest(8000, $.winloseordrawTestSubView);
	$.matchsummytableView.startTest(8000);
};

function destroy() {
	Ti.API.debug('1:destroy');

	global.load = false;

	for (var i in timer) {
		clearInterval(timer[i]);
		timer[i] = null;
	}

	$.matchlabelView.stopTest();
	$.gamelabelView.stopTest();
	$.powerBarView.stopTest();
	$.winloseordrawView.stopTest($.winloseordrawTestSubView);
	$.matchsummytableView.stopTest();
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
