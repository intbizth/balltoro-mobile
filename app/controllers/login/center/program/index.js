var loaded = false;
var args = {
	matchlabel : {
		image : '',
		title : ''
	}
};
var openedWindow = false;
var dataBinding = {
	// template : chance.pick(['before', 'gamebefore', 'gamebeforesmall', 'gamelive', 'gameliveht', 'gameafter', 'after']),
	homeClub : {
		name : 'home_club.name',
		logo : 'home_club._links.logo_70x70.href',
		score : 'home_score'
	},
	awayClub : {
		name : 'away_club.name',
		logo : 'away_club._links.logo_70x70.href',
		score : 'away_score'
	},
	datetime : 'start_time'
};

// function transformData(dataBinding, items) {
// var data = [];
//
// for (var i in items) {
// var item = {
// template : ''
// };
//
// for (var j in dataBinding) {
// if (dataBinding[j] !== '') {
// var value = items[i];
// var keys = dataBinding[j].split('.');
//
// for (var k in keys) {
// if (value[keys[k]]) {
// value = value[keys[k]];
// } else {
// value = '';
// }
// }
//
// item[j] = value;
// } else {
// item[j] = false;
// }
// }
//
// data.push(item);
// }
//
// return data;
// };

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

	$.matchlabelView.setData(args.matchlabel);
};

initialize();
