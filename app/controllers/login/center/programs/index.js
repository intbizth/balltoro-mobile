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

			var data = [];

			for (var i in Alloy.Collections.matchesday.models) {
				var _data = Alloy.Collections.matchesday.models[i].transformDataToMatchlabel();

				data.push(_data);
			}

			var placehold = require('placehold.it');
			var random = 20 - data.length;

			if (random > 0) {
				for (var i = 1; i <= random; i++) {
					var datetime = Vendor.Chance.timestamp();
					data.push({
						template : Vendor.Chance.pick(['after', 'before', 'gameafter', 'gamebefore', 'gamelive', 'gamelivehalftime']),
						leftIcon : placehold.createURL({
							width : 100,
							height : 100
						}).image,
						leftLabel : Vendor.Chance.word(),
						rightIcon : placehold.createURL({
							width : 100,
							height : 100
						}).image,
						rightLabel : Vendor.Chance.word(),
						scoreLabel : Vendor.Chance.integer({
							min : 0,
							max : 99
						}) + ' - ' + Vendor.Chance.integer({
							min : 0,
							max : 99
						}),
						startTimeLabel : Alloy.Moment.unix(datetime).format('HH:mm'),
						startDateLabel : Alloy.Moment.unix(datetime).format('D MMM YYYY'),
					});
				}
			}

			data = _.shuffle(data);

			Alloy.Collections.matchesday.reset(data);
			var dataModels = Alloy.Collections.matchesday.models;

			$.matchlabelView.load({
				data : data,
				fetchFirstPage : fetchFirstPage,
				fetchNextPage : fetchNextPage
			});
		},
		error : function(model, response) {
			Alloy.Notifier.showError({
				response : response
			});
		}
	});

	function fetchFirstPage() {
		Alloy.Collections.matchesday.fetchFirstPage({
			timeout : 60000,
			success : function(model, response) {

			},
			error : function(model, response) {
				Alloy.Notifier.showError({
					response : response
				});
			}
		});
	};

	function fetchNextPage() {
		Alloy.Collections.matchesday.fetchNextPage({
			timeout : 60000,
			success : function(model, response) {

			},
			error : function(model, response) {
				Alloy.Notifier.showError({
					response : response
				});
			}
		});
	};
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
