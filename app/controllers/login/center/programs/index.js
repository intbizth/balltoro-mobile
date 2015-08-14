var debug = true;
var loaded = false;
var openedWindow = false;
var args = arguments[0] || {};
var program = null;

function initialize() {
	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.setData({
		id : 'login.menu.league_game',
		title : L('login.menu.league_game'),
		leftIcon : 'list'
	});

	$.navbarView.on('left:click', function(e) {
		Alloy.Globals.login.mainWindow.toggleLeftWindow();
	});

	$.main.addEventListener('open', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
		}
	});

	$.main.addEventListener('close', function(e) {
		if (debug) {
			Ti.API.debug('[' + $.main.name + ']', e.type, '(', 'login stacks:', JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name')), Alloy.Globals.login.stackWindows.length, ')');
		}
	});
};

function load() {
	if (debug) {
		Ti.API.debug('[' + $.main.name + ']', 'load');
		Ti.API.debug('[' + $.main.name + ']', 'load:args:', args);
	}

	loaded = true;
	openedWindow = false;
	program = Alloy.Collections.programs.where({
		code : args.programCode
	});
	program = program[0].transformDataToLabel();

	console.error('program:', JSON.stringify(program));

	Alloy.Collections.matchesday.setID(args.programCode);

	Alloy.Collections.matchesday.fetch({
		timeout : 60000,
		success : function(model, response) {
			$.activityIndicatorView.visible = false;
			$.contentView.visible = true;

			var dataModels = Alloy.Collections.matchesday.models;

			if (dataModels.length > 0) {

			} else {
				Alloy.Notifier.showNodata({});
			}
		},
		error : function(model, response) {
			Alloy.Notifier.showError({
				response : response
			});
		}
	});
};

function unLoad() {
	if (debug) {
		Ti.API.debug('[' + $.main.name + ']', 'unLoad');
	}

	loaded = false;
	openedWindow = false;
	program = null;

	Alloy.Collections.matchesday.removeID();
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

initialize();
