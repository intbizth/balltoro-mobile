module.exports = [{
	template : 'section',
	name : 'leagueGame',
	icon : 'images/league_game.png',
	title : L('com.intbizth.balltoro.leftmenu.league_game'),
	open : false,
	api : {
		url : 'http://boon.dockertester.com/balltoro/web/app_dev.php/api/programs/',
		template : 'program',
		act : false,
		dataBinding : {
			name : 'code',
			icon : 'logo.media.url',
			title : 'name'
		}
	}
}, {
	template : 'section',
	name : 'signOut',
	icon : '',
	title : L('com.intbizth.balltoro.leftmenu.sign_out'),
	act : false
}];

// module.exports = [{
// template : 'profile',
// name : 'profile',
// icon : 'images/photo.png',
// title : 'Demo Demo',
// act : false
// }, {
// template : 'item',
// name : 'homeFeed',
// icon : 'images/home_feed.png',
// title : L('com.intbizth.balltoro.leftmenu.home_feed'),
// act : false
// }, {
// template : 'item',
// name : 'news',
// icon : 'images/news.png',
// title : L('com.intbizth.balltoro.leftmenu.news'),
// act : false
// }, {
// template : 'item',
// name : 'match',
// icon : 'images/match.png',
// title : L('com.intbizth.balltoro.leftmenu.match'),
// act : false
// }, {
// template : 'section',
// name : 'leagueGame',
// icon : 'images/league_game.png',
// title : L('com.intbizth.balltoro.leftmenu.league_game'),
// open : false,
// api : {
// url : 'http://boon.dockertester.com/balltoro/web/app_dev.php/api/programs/',
// template : 'leaguegame',
// act : false,
// dataBinding : {
// name : 'code',
// icon : 'logo.media.url',
// title : 'name'
// }
// }
// }, {
// template : 'item',
// name : 'peopleRanking',
// icon : 'images/people_ranking.png',
// title : L('com.intbizth.balltoro.leftmenu.people_ranking'),
// act : false
// }, {
// template : 'item',
// name : 'fanzone',
// icon : 'images/fanzone.png',
// title : L('com.intbizth.balltoro.leftmenu.fanzone'),
// act : false
// }, {
// template : 'item',
// name : 'reward',
// icon : 'images/reward.png',
// title : L('com.intbizth.balltoro.leftmenu.reward'),
// act : false
// }, {
// template : 'section',
// name : 'settings',
// icon : '',
// title : L('com.intbizth.balltoro.leftmenu.settings'),
// act : false,
// open : false,
// data : [{
// template : 'setting',
// name : 'profileSetting',
// icon : 'images/profile_setting.png',
// title : L('com.intbizth.balltoro.leftmenu.profile_setting'),
// act : false
// }, {
// template : 'setting',
// name : 'gameSetting',
// icon : 'images/game_setting.png',
// title : L('com.intbizth.balltoro.leftmenu.game_setting'),
// act : false
// }, {
// template : 'setting',
// name : 'appSetting',
// icon : 'images/app_setting.png',
// title : L('com.intbizth.balltoro.leftmenu.app_setting'),
// act : false
// }]
// }, {
// template : 'section',
// name : 'more',
// icon : '',
// title : L('com.intbizth.balltoro.leftmenu.more'),
// act : false
// }, {
// template : 'section',
// name : 'signOut',
// icon : '',
// title : L('com.intbizth.balltoro.leftmenu.sign_out'),
// act : false
// }];