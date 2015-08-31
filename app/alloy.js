// > alloy globals
Alloy.Globals.isIos7Plus = (OS_IOS && parseInt(Ti.Platform.version.split('.')[0]) >= 7);
Alloy.Globals.iPhoneTall = (OS_IOS && Ti.Platform.osname == 'iphone' && Ti.Platform.displayCaps.platformHeight == 568);
Alloy.Globals.nologin = {};
Alloy.Globals.login = {};
Alloy.Globals.login.defaultMenu = 'profile';
Alloy.Globals.login.menu = null;
// < alloy globals

// > alloy loading
Alloy.Animation = require('alloy/animation');
Alloy.Dialogs = require('alloy/dialogs');
Alloy.Facebook = require('facebook');
Alloy.Measurement = require('alloy/measurement');
Alloy.Moment = require('alloy/moment');
Alloy.Sha1 = require('alloy/sha1');
Alloy.Social = require('alloy/social');
Alloy.String = require('alloy/string');

Alloy.Notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications');

Alloy.Notifier.showError = function(e) {
    var message = '';

    if (_.isNull(e.response)) {
        message = L('notconnectedtonetwork');
    } else {
        try {
            var data = JSON.parse(e.response);
            message = [];

            if (data.message) {
                message.push(data.message);
            }

            if (data.code) {
                message.push('(' + data.code + ')');
            }

            message = message.join(' ');
        } catch(e) {
            message = L('dataloadfailure');
        }
    }

    Alloy.Notifier.show({
        message : message,
        style : 'error',
        icon : '/images/notifications/warn.png',
        duration : 3000
    });
};

Alloy.Notifier.showNodata = function(e) {
    Alloy.Notifier.show({
        message : L('nodata'),
        style : 'warn',
        icon : '/images/notifications/database.png',
        duration : 3000
    });
};
// < alloy loading

// > vendor loading
var Vendor = {};
Vendor.Chance = require('chance.min'), Vendor.Chance = new Vendor.Chance();
Vendor.Tinycolor = require('tinycolor.min');
Vendor.underscoreString = require('underscore.string.min');
_.mixin(Vendor.underscoreString.exports());
Vendor.placehold = require('placehold.it');
// < vendor loading

// > collections & models
Alloy.Models.register = Alloy.createModel('register');
Alloy.Models.signin = Alloy.createModel('signin');
Alloy.Collections.matches = Alloy.createCollection('matches');
Alloy.Collections.matches.on('setpaginator', function(response) {
    this.setPaginator(response);
});
Alloy.Collections.programs = Alloy.createCollection('programs');
Alloy.Collections.programs.on('setpaginator', function(response) {
    this.setPaginator(response);
});
Alloy.Collections.homefeed = Alloy.createCollection('homefeed');
Alloy.Collections.homefeed.on('setpaginator', function(response) {
    this.setPaginator(response);
});
Alloy.Collections.news = Alloy.createCollection('news');
Alloy.Collections.news.on('setpaginator', function(response) {
    this.setPaginator(response);
});
// > collections & models
