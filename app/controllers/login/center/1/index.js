var global = {
	load : false,
	timer : null
};

$.powerBarView.test = function() {
	clearInterval(global.timer);
	global.timer = null;

	global.timer = setInterval(function() {
		if (_.random(0, 1) === 1) {
			$.powerBarView.setLeftValue(Vendor.Chance.floating({
				min : 0,
				max : 1,
				fixed : 7
			}));
		} else {
			$.powerBarView.setRightValue(Vendor.Chance.floating({
				min : 0,
				max : 1,
				fixed : 7
			}));
		}
	}, 500);
};

$.winloseordrawView.test = function() {
	var lists = ['createWin', 'createLose', 'createDraw'];

	var rand = _.random(1, 10);

	for (var i = 1; i <= rand; i++) {
		$.winloseordrawTestSubView.add($.winloseordrawView[Vendor.Chance.pick(lists)]());

		if (i < rand) {
			$.winloseordrawTestSubView.add(Ti.UI.createView({
				width : 2,
				height : 1
			}));
		}
	}
};

function loadEvent() {
	Ti.API.debug('1:loadEvent');

	$.main.addEventListener('open', function(e) {
		Ti.API.debug('1:main:open');
		global.load = true;
	});

	$.main.addEventListener('close', function(e) {

	});
};

function initialize() {
	Ti.API.debug('1:initialize');

	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Globals.navbar);
	$.powerBarView.loadConfig(Alloy.Globals.powerbar);

	loadEvent();
};

initialize();

function load() {
	$.powerBarView.test();
	$.winloseordrawView.test();
};

function destroy() {
	Ti.API.debug('1:destroy');

	global.load = false;
	clearInterval(global.timer);
	global.timer = null;

	$.winloseordrawTestSubView.removeAllChildren();
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
