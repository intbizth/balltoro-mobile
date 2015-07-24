var global = {
	load : false
};

var timer = [null, null];

$.gamelabelView.test = function() {
	var placehold = require('placehold.it');

	Ti.API.error('before:timer[0]', timer[0]);

	clearInterval(timer[0]);
	timer[0] = null;

	timer[0] = setInterval(function() {
		var random = _.random(0, 4);

		random = 0;
		if (random === 0) {
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL({
					width : 70,
					height : 70
				}).image, placehold.createURL({
					width : 70,
					height : 70
				}).image]
			};

			$.gamelabelView.setBefore(data);
		} else if (random === 1) {
			var data = {};

			$.gamelabelView.setGameBefore(data);
		} else if (random === 2) {
			var data = {};

			$.gamelabelView.setGameLive(data);
		} else if (random === 3) {
			var data = {};

			$.gamelabelView.setGameAfter(data);
		} else {
			var data = {};

			$.gamelabelView.setAfter(data);
		}
	}, 2000);

	Ti.API.error('after:timer[0]', timer[0]);
};

$.powerBarView.test = function() {
	Ti.API.error('before:timer[1]', timer[1]);

	clearInterval(timer[1]);
	timer[1] = null;

	timer[1] = setInterval(function() {
		var random = _.random(0, 1);

		if (random === 1) {
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

	Ti.API.error('after:timer[1]', timer[1]);
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
	Ti.API.debug('1:load');

	global.load = true;

	$.gamelabelView.test();
	$.powerBarView.test();
	$.winloseordrawView.test();
};

function destroy() {
	Ti.API.debug('1:destroy');

	global.load = false;

	for (var i in timer) {
		clearInterval(timer[i]);
		timer[i] = null;
	}

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
