var global = {
	timer : null
};

$.navbarView.loadConfig(Alloy.Globals.navbar);
$.powerBarView.loadConfig(Alloy.Globals.powerbar);

// > event
$.main.addEventListener('open', function(e) {
	test();
});
// < event

function test() {
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
	}, 400);
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.content.top = 20;
	}

	test();
};

initialize();
