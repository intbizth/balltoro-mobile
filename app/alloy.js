// > alloy globals
Alloy.Globals.grid = false;
Alloy.Globals.isIos7Plus = (OS_IOS && parseInt(Ti.Platform.version.split('.')[0]) >= 7);
Alloy.Globals.iPhoneTall = (OS_IOS && Ti.Platform.osname == 'iphone' && Ti.Platform.displayCaps.platformHeight == 568);
Alloy.Globals.nologin = {};
Alloy.Globals.login = {};
Alloy.Globals.login.defaultMenu = 'tester';
Alloy.Globals.login.menu = 'tester';
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
Vendor.underscoreString = require('underscore.string.min');
_.mixin(Vendor.underscoreString.exports());
// < vendor loading

// > collections & models
Alloy.Models.user = Alloy.createModel('user');
// > collections & models