Widget.string = require('alloy/string');

Alloy.Collections.menus = Widget.createCollection('menus');
Alloy.Collections.programs = Alloy.Collections.instance('programs');

var itemSelectedIndex = null;
var clicking = false;

Widget.Collections.menus.reset([{
	id : 'tester',
	template : 'itemNoIcon',
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
	template : 'sectionAccordion',
	icon : WPATH('images/league_game.png'),
	title : L('com.intbizth.balltoro.leftmenu.league_game'),
	opened : false
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
	template : 'sectionNoIconAccordion',
	icon : '',
	title : L('com.intbizth.balltoro.leftmenu.settings'),
	opened : false,
	data : [{
		id : 'settings:profile',
		template : 'setting',
		icon : WPATH('images/profile_setting.png'),
		title : L('com.intbizth.balltoro.leftmenu.profile_setting')
	}, {
		id : 'settings:game',
		template : 'setting',
		icon : WPATH('images/game_setting.png'),
		title : L('com.intbizth.balltoro.leftmenu.game_setting')
	}, {
		id : 'settings:app',
		template : 'setting',
		icon : WPATH('images/app_setting.png'),
		title : L('com.intbizth.balltoro.leftmenu.app_setting')
	}]
}, {
	id : 'more',
	template : 'sectionNoIcon',
	icon : '',
	title : L('com.intbizth.balltoro.leftmenu.more')
}, {
	id : 'signout',
	template : 'sectionNoIcon',
	icon : '',
	title : L('com.intbizth.balltoro.leftmenu.sign_out')
}]);

Ti.API.debug(Widget.Collections.menus.toJSON());

extendData();

Ti.API.debug(Widget.Collections.menus.toJSON());
Ti.API.debug($);

function extendData() {
	var models = Widget.Collections.menus.models;

	for (var i in models) {
		var data = {};
		var dataModel = models[i].toJSON();

		var style = $.createStyle({
			classes : dataModel.template + '_row'
		});

		data.backgroundColor = style.backgroundColor;
		data.backgroundColorInAct = data.backgroundColor;
		data.backgroundColorAct = style.backgroundColorAct;

		if (dataModel.template === 'sectionAccordion' || dataModel.template === 'sectionNoIconAccordion') {
			var style = $.createStyle({
				classes : dataModel.template + '_arrow'
			});

			data.arrow = style.image;
			data.arrowDown = style.imageDown;
			data.arrowUp = style.imageUp;
		}

		models[i].set(data);
		models[i].save();
	}
};

function itemclick(e) {
	if (clicking) {
		return;
	}

	clicking = true;

	_.delay(function() {
		clicking = false;
	}, 300);

	Ti.API.debug('1:itemclick:', e, $.section.getItemAt(e.itemIndex));

	if (!_.isNull(itemSelectedIndex)) {
		var itemSelected = $.section.getItemAt(itemSelectedIndex);

		itemSelected.view.backgroundColor = itemSelected.view.backgroundColorInAct;
		$.section.updateItemAt(itemSelectedIndex, itemSelected);
	}

	var item = $.section.getItemAt(e.itemIndex);

	if (!_.isUndefined(item.properties) && !_.isUndefined(item.properties.opened)) {
		item.properties.opened = !item.properties.opened;
		item.view.backgroundColor = item.view.backgroundColorAct;
		item.arrow.image = (item.properties.opened) ? item.arrow.imageUp : item.arrow.imageDown;
		$.section.updateItemAt(e.itemIndex, item);

		_.delay(function() {
			item.view.backgroundColor = item.view.backgroundColorInAct;
			$.section.updateItemAt(e.itemIndex, item);
		}, 100);

		return;
	} else {
		item.view.backgroundColor = item.view.backgroundColorAct;
		$.section.updateItemAt(e.itemIndex, item);

		itemSelectedIndex = e.itemIndex;

		e.name = item.properties.name;
		delete e.bindId;
		delete e.section;
		delete e.sectionIndex;
	}

	Ti.API.debug('2:itemclick:', e, $.section.getItemAt(e.itemIndex));

	$.trigger('click', e);
};

function transformData(model) {
	var attrs = model.toJSON();

	return attrs;
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
