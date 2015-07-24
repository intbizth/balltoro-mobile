var global = {
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
	}, 2000);
};

function loadEvent() {
	$.main.addEventListener('open', function(e) {
		$.powerBarView.test();
	});

	$.main.addEventListener('close', function(e) {
		destroy();
	});
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Globals.navbar);
	$.powerBarView.loadConfig(Alloy.Globals.powerbar);

	loadEvent();
};

initialize();

function destroy() {
	clearInterval(global.timer);
	global.timer = null;
};

exports.destroy = function() {
	destroy();
};
