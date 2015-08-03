var global = {
	load : false,
	selected : 0
};

function loadEvent() {
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
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	loadEvent();
};

initialize();

function load() {
	global.load = true;
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

function destroy() {
	global.selected = 0;
	$.section.items = [];
};

exports.getLoad = function() {
	return global.load;
};

exports.load = function() {
	load();
};

exports.destroy = function() {
	destroy();
};
