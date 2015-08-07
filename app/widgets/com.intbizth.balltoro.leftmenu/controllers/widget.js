Widget.string = require('alloy/string');
Widget.config = require(WPATH('config'));

Alloy.Collections.menus = Widget.createCollection('menus');
Alloy.Collections.programs = Alloy.Collections.instance('programs');

var checker = {
	template : {
		item : false,
		section : false,
		section_accordion : false,
		setting : false
	},
	icon : false
};

Widget.Collections.menus.reset([{
	id : 'tester',
	template : 'item',
	icon : '',
	title : 'Tester'
}, {
	id : 'profile',
	template : 'item',
	icon : WPATH('images/photo.png'),
	title : 'Demo Demo'
}, {
	id : 'homefeed',
	template : 'item',
	icon : WPATH('images/home_feed.png'),
	title : L('com.intbizth.balltoro.leftmenu.home_feed')
}, {
	id : 'news',
	template : 'item',
	icon : WPATH('images/news.png'),
	title : L('com.intbizth.balltoro.leftmenu.news')
}, {
	id : 'match',
	template : 'item',
	icon : WPATH('images/match.png'),
	title : L('com.intbizth.balltoro.leftmenu.match')
}, {
	id : 'program',
	template : 'section',
	icon : WPATH('images/league_game.png'),
	title : L('com.intbizth.balltoro.leftmenu.league_game'),
	items : []
}, {
	id : 'peopleranking',
	template : 'item',
	icon : WPATH('images/people_ranking.png'),
	title : L('com.intbizth.balltoro.leftmenu.people_ranking')
}, {
	id : 'fanzone',
	template : 'item',
	icon : WPATH('images/fanzone.png'),
	title : L('com.intbizth.balltoro.leftmenu.fanzone')
}, {
	id : 'reward',
	template : 'item',
	icon : WPATH('images/reward.png'),
	title : L('com.intbizth.balltoro.leftmenu.reward')
}, {
	id : 'settings',
	section : 'settings',
	template : 'section_accordion',
	icon : '',
	title : L('com.intbizth.balltoro.leftmenu.settings')
}, {
	id : 'setting:profile',
	parent : 'settings',
	template : 'setting',
	icon : WPATH('images/profile_setting.png'),
	title : L('com.intbizth.balltoro.leftmenu.profile_setting')
}, {
	id : 'setting:game',
	parent : 'settings',
	template : 'setting',
	icon : WPATH('images/game_setting.png'),
	title : L('com.intbizth.balltoro.leftmenu.game_setting')
}, {
	id : 'setting:app',
	parent : 'settings',
	template : 'setting',
	icon : WPATH('images/app_setting.png'),
	title : L('com.intbizth.balltoro.leftmenu.app_setting')
}, {
	id : 'more',
	template : 'section',
	icon : '',
	title : L('com.intbizth.balltoro.leftmenu.more')
}, {
	id : 'signout',
	template : 'section',
	icon : '',
	title : L('com.intbizth.balltoro.leftmenu.sign_out')
}]);

function doClick(e) {
	e.name = e.row.dataID;
	e.template = e.row.dataTemplate;
	$.trigger('click:' + e.name, e);
	Ti.API.error(e);
};

function doDblclick(e) {
	e.name = e.row.dataID;
	e.template = e.row.dataTemplate;
	$.trigger('dblclick:' + e.name);
	Ti.API.error(e);
};

function transformData(model) {
	var attrs = model.toJSON();

	changeChecker('template', attrs.template);
	changeChecker('icon', (attrs.icon !== ''));

	return attrs;
};

function changeChecker(key, value) {
	if (_.isString(value)) {
		for (var i in checker[key]) {
			checker[key][i] = (i === value);
		}
	} else if (_.isBoolean(value)) {
		checker[key] = value;
	}
};

// Widget.Collections.programs.fetch({
// timeout : 60000,
// success : function(model, response) {
// Ti.API.info('success:model', JSON.stringify(model));
// // updateUi();
// },
// error : function(model, response) {
// Ti.API.error('error:model', JSON.stringify(model));
// }
// });
