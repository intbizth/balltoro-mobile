$.list.addEventListener('itemclick', function(e) {
	for (var i in $.section.getItems()) {
		var item = $.section.getItemAt(i);
		item.template = 'templateInAct';
		$.section.updateItemAt(i, item);
	}

	var item = $.section.getItemAt(e.itemIndex);
	item.template = 'templateAct';
	$.section.updateItemAt(e.itemIndex, item);

	Alloy.Globals.loginWindow.toggleLeftWindow();

	_.delay(function() {
		if (e.itemIndex === 9) {
			Ti.App.fireEvent('logout');
		}
	}, 600);
});

// > event
$.main.addEventListener('open', function(e) {
	load();
});
// < event

function load() {
	Ti.API.debug('leftWindow:load');

	$.section.setItems([]);

	var items = [];

	for (var i = 1; i <= 10; i++) {
		var item = {
			template : (i === 1) ? 'templateAct' : 'templateInAct',
			properties : {
				width : Ti.UI.FILL,
				height : 42,
				backgroundColor : 'transparent',
				selectedBackgroundColor : '#244675'
			},
			title : {
				text : L('login.menu.' + i)
			}
		};

		items.push(item);
	}

	$.section.setItems(items);
};

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.content.top = 20;
	}
};

initialize();
