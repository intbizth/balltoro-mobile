// > alloy globals
Alloy.Globals.grid = false;
Alloy.Globals.isIos7Plus = (OS_IOS && parseInt(Ti.Platform.version.split('.')[0]) >= 7);
Alloy.Globals.iPhoneTall = (OS_IOS && Ti.Platform.osname == 'iphone' && Ti.Platform.displayCaps.platformHeight == 568);
Alloy.Globals.nologin = {};
Alloy.Globals.login = {};

Alloy.Globals.login.menus = ['1', '2', 'signout'];
Alloy.Globals.login.defaultMenu = '1';
Alloy.Globals.login.menu = '1';
// < alloy globals

// > alloy loading
var _ = require('alloy/underscore')._;
Alloy.Animation = require('alloy/animation');
Alloy.Dialogs = require('alloy/dialogs');
Alloy.Facebook = require('facebook');
Alloy.Measurement = require('alloy/measurement');
Alloy.Moment = require('alloy/moment');
Alloy.Sha1 = require('alloy/sha1');
Alloy.Social = require('alloy/social');
Alloy.String = require('alloy/string');
// < alloy loading

// > vendor loading
var Vendor = {};
Vendor.Chance = require('chance.min'), Vendor.Chance = new Vendor.Chance();
Vendor.Tinycolor = require('tinycolor');
// < vendor loading

// > collections & models
Alloy.Models.user = Alloy.createModel('user');
// > collections & models

Alloy.Widgets = {
	loads : ['com.intbizth.alloy.navbar', 'com.intbizth.balltoro.gamelabel', 'com.intbizth.balltoro.matchlabel', 'com.intbizth.balltoro.powerbar', 'com.intbizth.balltoro.winloseordraw'],
	configs : {}
};

for (var i in Alloy.Widgets.loads) {
	try {
		var config = require('config/' + Alloy.Widgets.loads[i]);
		Alloy.Widgets.configs[Alloy.Widgets.loads[i]] = config.config;
	} catch(e) {
	}
}
