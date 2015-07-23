// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// > alloy globals
Alloy.Globals.grid = false;
Alloy.Globals.isIos7Plus = (OS_IOS && parseInt(Ti.Platform.version.split('.')[0]) >= 7);
Alloy.Globals.iPhoneTall = (OS_IOS && Ti.Platform.osname == 'iphone' && Ti.Platform.displayCaps.platformHeight == 568);
Alloy.Globals.nologin = {};
Alloy.Globals.login = {};

Alloy.Globals.login.menus = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'signout'];
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
