// var rand = Vendor.Chance.pick([true, false]);
//
// Ti.API.info('set user:', (rand) ? 'yes' : 'no');
//
// var data = {
// id : 1,
// userId : null,
// token : null,
// updatedAt : 0
// };
//
// // if (rand) {
// // data = {
// // id : 1,
// // userId : Chance.guid(),
// // token : Chance.hash(),
// // updatedAt : Chance.timestamp()
// // };
// // }
//
// Alloy.Models.user.set(data);
// Alloy.Models.user.save();
//
// Ti.API.error('userId:', typeof Alloy.Models.user.get('userId'), Alloy.Models.user.get('userId'));
// Ti.API.error('token:', typeof Alloy.Models.user.get('token'), Alloy.Models.user.get('token'));
// Ti.API.error('updatedAt:', typeof Alloy.Models.user.get('updatedAt'), Alloy.Models.user.get('updatedAt'));
//
// if (_.isNull(Alloy.Models.user.get('userId')) && _.isNull(Alloy.Models.user.get('token'))) {
// $.nologin.getView().open();
// } else {
// $.login.getView().open();
// }
//
// Ti.API.info("Ti.Locale.currentLanguage = " + Ti.Locale.currentLanguage);
// Ti.API.info("Ti.Locale.currentLocale = " + Ti.Locale.currentLocale);

var global = {
	state : {
		changeWindow : false
	}
};

Alloy.Globals.nologinWindow = $.nologin.getView();
Alloy.Globals.loginWindow = $.login.getView();

$.nologin.getView().open();

// > event
$.nologin.getView().addEventListener('open', function(e) {
	global.state.changeWindow = true;
});

$.nologin.getView().addEventListener('close', function(e) {
	_.delay(function() {
		global.state.changeWindow = false;
	}, 800);
});

$.login.getView().addEventListener('open', function(e) {
	global.state.changeWindow = true;
});

$.login.getView().addEventListener('close', function(e) {
	_.delay(function() {
		global.state.changeWindow = false;
	}, 800);
});

Ti.App.addEventListener('login', function(e) {
	if (global.state.changeWindow) {
		return;
	}

	$.login.getView().open();

	_.delay(function() {
		$.nologin.getView().close();
	}, 800);
});

Ti.App.addEventListener('logout', function(e) {
	if (global.state.changeWindow) {
		return;
	}

	$.nologin.getView().open();

	_.delay(function() {
		$.login.getView().close();
	}, 800);
});
// < event