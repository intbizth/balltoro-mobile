var loaded = false;
var args = {};
var openedWindow = false;
var webservice = {
	matches : 'http://boon.dockertester.com/balltoro/web/app_dev.php/api/matches/day'
};

var matches = Alloy.Collections.matches;

function transformData(model) {
	var data = model.toJSON();

	var attrs = {
		dataModel : {
			id : data.id,
			template : 'before',
			homeClub : {
				name : data.home_club.name,
				logo : data.home_club._links.logo.href,
				score : data.home_score
			},
			awayClub : {
				name : data.away_club.name,
				logo : data.away_club._links.logo.href,
				score : data.away_score
			},
			time : 0,
			datetime : Alloy.Moment(data.start_time).unix()
		}
	};

	var imageSize = {
		width : 100,
		height : 100
	};
	attrs.dataModel.homeClub.logo = Vendor.placehold.createURL(imageSize).image;
	attrs.dataModel.awayClub.logo = Vendor.placehold.createURL(imageSize).image;

	return attrs;
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.setTitleView(L('login.menu.league_game'));

	$.main.addEventListener('open', function(e) {
		load();

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});

	$.main.addEventListener('close', function(e) {
		unLoad();

		Ti.API.debug($.main.name + ':' + e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
	});
};

function load() {
	loaded = true;
	openedWindow = false;
};

function unLoad() {
	loaded = false;
	openedWindow = false;
};

exports.getLoad = function() {
	return loaded;
};

exports.load = function() {
	load();
};

exports.unLoad = function() {
	unLoad();
};

exports.setArgs = function(value) {
	args = value;

	$.matchlabelView.setData({
		image : args.icon,
		title : args.title
	});

	Alloy.Collections.matches.setID(args.name);
	Alloy.Collections.matches.fetch({
		url : webservice.matches,
		timeout : 60000,
		success : function(model, response) {
			Ti.API.info('success:model', JSON.stringify(model));
			updateUi();
		},
		error : function(model, response) {
			Ti.API.error('error:model', JSON.stringify(model));
		}
	});

	// _.delay(function() {
	// Alloy.Collections.matches.nextPage({
	// success : function(model, response) {
	// Ti.API.info('success:model', JSON.stringify(model));
	// },
	// error : function(model, response) {
	// Ti.API.error('error:model', JSON.stringify(model));
	// }
	// });
	//
	// _.delay(function() {
	// Alloy.Collections.matches.nextPage({
	// success : function(model, response) {
	// Ti.API.info('success:model', JSON.stringify(model));
	// },
	// error : function(model, response) {
	// Ti.API.error('error:model', JSON.stringify(model));
	// }
	// });
	//
	// _.delay(function() {
	// Alloy.Collections.matches.firstPage({
	// success : function(model, response) {
	// Ti.API.info('success:model', JSON.stringify(model));
	// },
	// error : function(model, response) {
	// Ti.API.error('error:model', JSON.stringify(model));
	// }
	// });
	// }, 6000);
	// }, 6000);
	// }, 6000);
};

initialize();
