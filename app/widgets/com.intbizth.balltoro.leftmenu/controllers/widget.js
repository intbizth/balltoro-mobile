Widget.Collections.programs = Alloy.Collections.instance('programs');

var debug = false;
var loaded = false;
var itemSelectedIndex = null;
var itemSelectedName = null;
var clickTimer = null;
var clickCount = 0;
var datas = {
	menus : [{
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
		accordion : {
			opened : false,
			fetching : false,
			fetched : false,
			collection : 'programs'
		}
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
		accordion : {
			opened : false,
			fetching : false,
			fetched : false,
			collection : 'settings'
		}
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
	}],
	settings : [{
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
};

function extendData() {
	var models = Widget.Collections.menus.models;

	for (var i in models) {
		var data = {};
		var dataModel = models[i].toJSON();

		data = _.extend(data, getBackground(dataModel.template));

		if (dataModel.template === 'sectionAccordion' || dataModel.template === 'sectionNoIconAccordion') {
			data.accordion = {};
			data.accordion = _.extend(data.accordion, dataModel.accordion);

			data = _.extend(data, getArrow(dataModel.template));
		}

		models[i].set(data);
		models[i].save();
	}
};

function getBackground(template) {
	var data = {};
	var style = $.createStyle({
		classes : template + '_row'
	});

	data.backgroundColor = style.backgroundColor;
	data.backgroundColorInAct = data.backgroundColor;
	data.backgroundColorAct = style.backgroundColorAct;

	return data;
};

function getArrow(template) {
	var data = {};
	var style = $.createStyle({
		classes : template + '_arrow'
	});

	data.arrow = style.image;
	data.arrowDown = style.imageDown;
	data.arrowUp = style.imageUp;

	return data;
};

function selectItem(name) {
	var isExist = false;

	for (var i in $.section.items) {
		var item = $.section.items[i];

		if (name === item.properties.name) {
			isExist = true;
			itemSelectedIndex = i;

			item.view.backgroundColor = item.view.backgroundColorAct;
			$.section.updateItemAt(i, item);

			break;
		}
	}

	if (!isExist) {
		itemSelectedIndex = null;
	}
};

function itemclick(e) {
	clickCount++;

	var item = $.section.getItemAt(e.itemIndex);
	e.name = item.properties.name;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:e:', e);
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:item:', item);
		Ti.API.debug('[' + Widget.widgetId + ']', 'itemclick:clickCount:', clickCount);
	}

	function claer() {
		clickCount = 0;
		clearTimeout(clickTimer);
		clickTimer = null;
	};

	if (clickCount === 1) {
		clickTimer = _.delay(function() {
			if (!_.isUndefined(item.properties) && !_.isUndefined(item.properties.accordion)) {
				item.view.backgroundColor = item.view.backgroundColorAct;

				_.delay(function() {
					item.view.backgroundColor = item.view.backgroundColorInAct;
					$.section.updateItemAt(e.itemIndex, item);
				}, 100);

				item.properties.accordion.opened = !item.properties.accordion.opened;

				if (item.properties.accordion.opened && !item.properties.accordion.fetched) {
					item.properties.accordion.fetching = true;

					$.activityIndicatorView.visible = true;

					Widget.Collections[item.properties.accordion.collection].fetch({
						timeout : 60000,
						success : function(model, response) {
							if (datas[item.properties.accordion.collection]) {
								Widget.Collections[item.properties.accordion.collection].reset(datas[item.properties.accordion.collection]);
							}

							$.activityIndicatorView.visible = false;

							item.arrow.image = item.arrow.imageUp;
							item.properties.accordion.fetched = true;
							item.properties.accordion.fetching = false;
							$.section.updateItemAt(e.itemIndex, item);

							var dataModels = Widget.Collections[item.properties.accordion.collection].models;

							if (dataModels.length > 0) {
								var dataItems = [];

								for (var i in dataModels) {
									var dataModel = dataModels[i].transformDataToMenus();

									var _item = {
										template : dataModel.template || item.properties.accordion.collection,
										properties : {
											name : dataModel.id
										},
										icon : {
											image : dataModel.icon
										},
										label : {
											text : dataModel.title
										},
										view : getBackground(dataModel.template || item.properties.accordion.collection)
									};

									var style = $.createStyle({
										classes : 'listItem'
									});

									_item.properties = _.extend(_item.properties, style);

									dataItems.push(_item);
								}

								var style = $.createStyle({
									classes : 'insertItemAnimatetion'
								});

								if (debug) {
									Ti.API.debug('[' + Widget.widgetId + ']', 'dataItems:', dataItems.length, dataItems);
								}

								$.section.insertItemsAt(e.itemIndex + 1, dataItems, style);
							} else {
								$.trigger('fetched:nodata', {});
							}

							selectItem(itemSelectedName);

							if (debug) {
								Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedIndex:', itemSelectedIndex);
								Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedName:', itemSelectedName);
							}
						},
						error : function(model, response) {
							$.trigger('fetched:error', {
								response : response
							});

							$.activityIndicatorView.visible = false;

							item.properties.accordion.fetching = false;
							$.section.updateItemAt(e.itemIndex, item);

							if (debug) {
								Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedIndex:', itemSelectedIndex);
								Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedName:', itemSelectedName);
							}
						}
					});
				} else {
					item.arrow.image = (item.properties.accordion.opened) ? item.arrow.imageUp : item.arrow.imageDown;
					$.section.updateItemAt(e.itemIndex, item);

					var dataModels = Widget.Collections[item.properties.accordion.collection].models;

					if (item.properties.accordion.opened) {
						var dataItems = [];

						for (var i in dataModels) {
							var dataModel = dataModels[i].transformDataToMenus();

							var _item = {
								template : dataModel.template || item.properties.accordion.collection,
								properties : {
									name : dataModel.id
								},
								icon : {
									image : dataModel.icon
								},
								label : {
									text : dataModel.title
								},
								view : getBackground(dataModel.template || item.properties.accordion.collection)
							};

							var style = $.createStyle({
								classes : 'listItem'
							});

							_item.properties = _.extend(_item.properties, style);

							dataItems.push(_item);
						}

						var style = $.createStyle({
							classes : 'insertItemAnimatetion'
						});

						if (debug) {
							Ti.API.debug('[' + Widget.widgetId + ']', 'dataItems:', dataItems.length, dataItems);
						}

						$.section.insertItemsAt(e.itemIndex + 1, dataItems, style);
					} else {
						var style = $.createStyle({
							classes : 'deleteItemsAnimatetion'
						});

						$.section.deleteItemsAt(e.itemIndex + 1, dataModels.length, style);
					}

					selectItem(itemSelectedName);

					if (debug) {
						Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedIndex:', itemSelectedIndex);
						Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedName:', itemSelectedName);
					}
				}

				claer();

				return;
			} else {
				if (!_.isNull(itemSelectedIndex)) {
					var itemSelected = $.section.getItemAt(itemSelectedIndex);

					itemSelected.view.backgroundColor = itemSelected.view.backgroundColorInAct;
					$.section.updateItemAt(itemSelectedIndex, itemSelected);
				}

				item.view.backgroundColor = item.view.backgroundColorAct;
				$.section.updateItemAt(e.itemIndex, item);

				itemSelectedIndex = e.itemIndex;
				itemSelectedName = e.name;
				delete e.accessoryClicked;
				delete e.bindId;
				delete e.bubbles;
				delete e.cancelBubble;
				delete e.section;
				delete e.sectionIndex;

				claer();

				$.trigger('click', e);

				if (debug) {
					Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedIndex:', itemSelectedIndex);
					Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedName:', itemSelectedName);
				}
			}
		}, 400);
	} else {
		if (!_.isUndefined(item.properties) && !_.isUndefined(item.properties.accordion)) {
			item.view.backgroundColor = item.view.backgroundColorAct;

			_.delay(function() {
				item.view.backgroundColor = item.view.backgroundColorInAct;
				$.section.updateItemAt(e.itemIndex, item);
			}, 100);

			$.activityIndicatorView.visible = true;

			item.properties.accordion.fetched = false;
			item.properties.accordion.fetching = true;
			$.section.updateItemAt(e.itemIndex, item);

			Widget.Collections[item.properties.accordion.collection].fetch({
				timeout : 60000,
				success : function(model, response) {
					if (item.properties.accordion.opened) {
						var dataModels = Widget.Collections[item.properties.accordion.collection].models;

						var style = $.createStyle({
							classes : 'deleteItemsAnimatetion'
						});

						$.section.deleteItemsAt(e.itemIndex + 1, dataModels.length, style);
					}

					if (datas[item.properties.accordion.collection]) {
						Widget.Collections[item.properties.accordion.collection].reset(datas[item.properties.accordion.collection]);
					}

					$.activityIndicatorView.visible = false;

					item.arrow.image = item.arrow.imageUp;
					item.properties.accordion.opened = true;
					item.properties.accordion.fetched = true;
					item.properties.accordion.fetching = false;
					$.section.updateItemAt(e.itemIndex, item);

					var dataModels = Widget.Collections[item.properties.accordion.collection].models;

					if (dataModels.length > 0) {
						var dataItems = [];

						for (var i in dataModels) {
							var dataModel = dataModels[i].transformDataToMenus();

							var _item = {
								template : dataModel.template || item.properties.accordion.collection,
								properties : {
									name : dataModel.id
								},
								icon : {
									image : dataModel.icon
								},
								label : {
									text : dataModel.title
								},
								view : getBackground(dataModel.template || item.properties.accordion.collection)
							};

							var style = $.createStyle({
								classes : 'listItem'
							});

							_item.properties = _.extend(_item.properties, style);

							dataItems.push(_item);
						}

						var style = $.createStyle({
							classes : 'insertItemAnimatetion'
						});

						if (debug) {
							Ti.API.debug('[' + Widget.widgetId + ']', 'dataItems:', dataItems.length, dataItems);
						}

						$.section.insertItemsAt(e.itemIndex + 1, dataItems, style);
					} else {
						$.trigger('fetched:nodata', {});
					}

					selectItem(itemSelectedName);

					if (debug) {
						Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedIndex:', itemSelectedIndex);
						Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedName:', itemSelectedName);
					}
				},
				error : function(model, response) {
					$.trigger('fetched:error', {
						response : response
					});

					$.activityIndicatorView.visible = false;

					item.properties.accordion.fetching = false;
					$.section.updateItemAt(e.itemIndex, item);

					if (debug) {
						Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedIndex:', itemSelectedIndex);
						Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedName:', itemSelectedName);
					}
				}
			});

			claer();

			return;
		} else {
			if (!_.isNull(itemSelectedIndex)) {
				var itemSelected = $.section.getItemAt(itemSelectedIndex);

				itemSelected.view.backgroundColor = itemSelected.view.backgroundColorInAct;
				$.section.updateItemAt(itemSelectedIndex, itemSelected);
			}

			item.view.backgroundColor = item.view.backgroundColorAct;
			$.section.updateItemAt(e.itemIndex, item);

			itemSelectedIndex = e.itemIndex;
			itemSelectedName = e.name;
			delete e.accessoryClicked;
			delete e.bindId;
			delete e.bubbles;
			delete e.cancelBubble;
			delete e.section;
			delete e.sectionIndex;

			claer();

			$.trigger('dblclick', e);

			if (debug) {
				Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedIndex:', itemSelectedIndex);
				Ti.API.debug('[' + Widget.widgetId + ']', 'itemSelectedName:', itemSelectedName);
			}
		}
	}
};

function load() {
	loaded = true;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load');
	}

	Widget.Collections.menus.reset(datas.menus);
	Widget.Collections.settings.reset(datas.settings);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:before:menus:', Widget.Collections.menus.toJSON());
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:before:settings:', Widget.Collections.settings.toJSON());
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:before:programs:', Widget.Collections.programs.toJSON());
	}

	extendData();

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:after:menus:', Widget.Collections.menus.toJSON());
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:after:settings:', Widget.Collections.settings.toJSON());
		Ti.API.debug('[' + Widget.widgetId + ']', 'load:after:programs:', Widget.Collections.programs.toJSON());
	}
};

function unLoad() {
	loaded = false;

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'unLoad');
	}

	Widget.Collections.menus.reset([]);
	Widget.Collections.settings.reset([]);

	if (debug) {
		Ti.API.debug('[' + Widget.widgetId + ']', 'unLoad:menus:', Widget.Collections.menus.toJSON());
		Ti.API.debug('[' + Widget.widgetId + ']', 'unLoad:settings:', Widget.Collections.settings.toJSON());
	}
};

exports.selectItem = function(value) {
	selectItem(value);
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
