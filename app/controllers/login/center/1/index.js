var global = {
	load : false
};

var timer = [null, null, null, null];

var placehold = require('placehold.it');

$.matchlabelView.test = function() {
	run();

	clearInterval(timer[0]);
	timer[0] = null;

	timer[0] = setInterval(function() {
		run();
	}, 5000);

	function run() {
		var imageSize = $.matchlabelView.setImageSize();
		$.matchlabelView.setImage(placehold.createURL(imageSize).image);
		$.matchlabelView.setTitle(Vendor.Chance.sentence());
	};
};

$.gamelabelView.test = function() {
	run();

	clearInterval(timer[1]);
	timer[1] = null;

	timer[1] = setInterval(function() {
		run();
	}, 5000);

	function run() {
		var random = _.random(0, 6);
		
		if (random === 0) {
			var imageSize = $.gamelabelView.getBeforeImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image]
			};

			$.gamelabelView.setBefore(data);
		} else if (random === 1) {
			var imageSize = $.gamelabelView.getGameBeforeImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image]
			};

			$.gamelabelView.setGameBefore(data);
		} else if (random === 2) {
			var imageSize = $.gamelabelView.getGameLiveImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})],
				time : Vendor.Chance.integer({
					min : 1,
					max : 60 * 60 * 10
				})
			};

			$.gamelabelView.setGameLive(data);
		} else if (random === 3) {
			var imageSize = $.gamelabelView.getGameLiveHTImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})]
			};

			$.gamelabelView.setGameLiveHT(data);
		} else if (random === 4) {
			var imageSize = $.gamelabelView.getGameAfterImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})]
			};

			$.gamelabelView.setGameAfter(data);
		} else if (random === 5) {
			var imageSize = $.gamelabelView.getAfterImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})]
			};

			$.gamelabelView.setAfter(data);
		} else {
			var imageSize = $.gamelabelView.getGameVSImageSize();
			var data = {
				title : [Vendor.Chance.name(), Vendor.Chance.name()],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image]
			};

			$.gamelabelView.setGameVS(data);
		}
	};
};

$.powerBarView.test = function() {
	run();

	clearInterval(timer[2]);
	timer[2] = null;

	timer[2] = setInterval(function() {
		run();
	}, 500);

	function run() {
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
	};
};

$.winloseordrawView.test = function() {
	run();

	clearInterval(timer[3]);
	timer[3] = null;

	timer[3] = setInterval(function() {
		run();
	}, 5000);

	function run() {
		$.winloseordrawTestSubView.removeAllChildren();

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

	loadEvent();
};

initialize();

function load() {
	Ti.API.debug('1:load');

	global.load = true;

	$.matchlabelView.test();
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
