var global = {
	selected : 0
};

// > event
$.main.addEventListener('open', function(e) {
	load();
});

$.main.addEventListener('close', function(e) {
	unload();
});

$.list.addEventListener('itemclick', function(e) {
	if (global.selected !== e.itemIndex) {
		var item = $.section.getItemAt(global.selected);
		item.template = 'inAct';
		$.section.updateItemAt(global.selected, item);

		global.selected = e.itemIndex;
	}

	var item = $.section.getItemAt(e.itemIndex);
	item.template = 'act';
	$.section.updateItemAt(e.itemIndex, item);

	Alloy.Globals.login.mainWindow.setMenu(item.name);
});
// < event

function load() {
	Ti.API.debug('leftWindow:load');

	global.selected = 0;

	var items = [];

	for (var i in Alloy.Globals.login.menus) {
		var item = {
			template : (i == 0) ? 'act' : 'inAct',
			name : Alloy.Globals.login.menus[i],
			title : {
				text : L('login.menu.' + Alloy.Globals.login.menus[i])
			}
		};

		items.push(item);
	}

	$.section.items = items;
};

function unload() {
	Ti.API.debug('leftWindow:unload');

	global.selected = 0;

	$.section.items = [];
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.content.top = 20;
	}
};

initialize();
