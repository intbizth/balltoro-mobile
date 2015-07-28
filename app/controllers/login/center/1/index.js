var global = {
	load : false
};

var timer = [null, null, null, null, null];
var teams = [Vendor.Chance.name(), Vendor.Chance.name()];
var placehold = require('placehold.it');

$.matchlabelView.test = function() {
	run();

	clearInterval(timer[0]);
	timer[0] = null;

	timer[0] = setInterval(function() {
		teams = [Vendor.Chance.name(), Vendor.Chance.name()];
		run();
	}, 8000);

	function run() {
		var imageSize = $.matchlabelView.setImageSize();
		$.matchlabelView.setImage(placehold.createURL(imageSize).image);
		$.matchlabelView.setTitle(Vendor.Chance.sentence());
	};
};

$.gamelabelView.test = function() {
	run();

	clearInterval(timer[1]);
	timer[1] = null;

	timer[1] = setInterval(function() {
		run();
	}, 8000);

	function run() {
		var random = _.random(0, 6);

		if (random === 0) {
			var imageSize = $.gamelabelView.getBeforeImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [teams[0], teams[1]],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image]
			};

			$.gamelabelView.setBefore(data);
		} else if (random === 1) {
			var imageSize = $.gamelabelView.getGameBeforeImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [teams[0], teams[1]],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image]
			};

			$.gamelabelView.setGameBefore(data);
		} else if (random === 2) {
			var imageSize = $.gamelabelView.getGameLiveImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [teams[0], teams[1]],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})],
				time : Vendor.Chance.integer({
					min : 1,
					max : 60 * 60 * 10
				})
			};

			$.gamelabelView.setGameLive(data);
		} else if (random === 3) {
			var imageSize = $.gamelabelView.getGameLiveHTImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [teams[0], teams[1]],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})]
			};

			$.gamelabelView.setGameLiveHT(data);
		} else if (random === 4) {
			var imageSize = $.gamelabelView.getGameAfterImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [teams[0], teams[1]],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})]
			};

			$.gamelabelView.setGameAfter(data);
		} else if (random === 5) {
			var imageSize = $.gamelabelView.getAfterImageSize();
			var data = {
				datetime : Vendor.Chance.timestamp(),
				title : [teams[0], teams[1]],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image],
				score : [Vendor.Chance.integer({
					min : 0,
					max : 99
				}), Vendor.Chance.integer({
					min : 0,
					max : 99
				})]
			};

			$.gamelabelView.setAfter(data);
		} else {
			var imageSize = $.gamelabelView.getGameVSImageSize();
			var data = {
				title : [teams[0], teams[1]],
				image : [placehold.createURL(imageSize).image, placehold.createURL(imageSize).image]
			};

			$.gamelabelView.setGameVS(data);
		}
	};
};

$.powerBarView.test = function() {
	run();

	clearInterval(timer[2]);
	timer[2] = null;

	timer[2] = setInterval(function() {
		run();
	}, 500);

	function run() {
		var random = _.random(0, 1);

		if (random === 1) {
			$.powerBarView.setLeftValue(Vendor.Chance.floating({
				min : 0,
				max : 1,
				fixed : 7
			}));
		} else {
			$.powerBarView.setRightValue(Vendor.Chance.floating({
				min : 0,
				max : 1,
				fixed : 7
			}));
		}
	};
};

$.winloseordrawView.test = function() {
	run();

	clearInterval(timer[3]);
	timer[3] = null;

	timer[3] = setInterval(function() {
		run();
	}, 8000);

	function run() {
		$.winloseordrawTestSubView.removeAllChildren();

		var lists = ['createWin', 'createLose', 'createDraw'];

		var rand = _.random(1, 10);

		for (var i = 1; i <= rand; i++) {
			$.winloseordrawTestSubView.add($.winloseordrawView[Vendor.Chance.pick(lists)]());

			if (i < rand) {
				$.winloseordrawTestSubView.add(Ti.UI.createView({
					width : 2,
					height : 1
				}));
			}
		}
	};
};

$.matchsummytableView.test = function() {
	run();

	clearInterval(timer[4]);
	timer[4] = null;

	timer[4] = setInterval(function() {
		run();
	}, 8000);

	function createVsTableData(team1, team2, highlightTeam) {
		var data = {
			table : 'vs',
			headerTitle : Vendor.Chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 10);

		if (random > 0) {
			for (var i = 1; i <= random; i++) {
				var _data = {
					competition : Vendor.Chance.syllable(),
					datetime : Vendor.Chance.timestamp(),
					team : [team1, team2],
					score : [Vendor.Chance.integer({
						min : 0,
						max : 99
					}), Vendor.Chance.integer({
						min : 0,
						max : 99
					})],
					highlight : null
				};

				var random2 = _.random(0, 1);

				if (random2 === 1) {
					_data.team = [team2, team1];

					if (!_.isNull(highlightTeam)) {
						if (_data.highlight === 0) {
							_data.highlight = 1;
						} else if (_data.highlight === 1) {
							_data.highlight = 0;
						}
					}
				}

				data.data.push(_data);
			}

			data.data = _.sortBy(data.data, 'datatime');
		}

		return data;
	};

	function createMatchTableData(team, highlightTeam) {
		var data = {
			table : 'match',
			headerTitle : Vendor.Chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 10);

		if (random > 0) {
			for (var i = 1; i <= random; i++) {
				var teamRandom = Vendor.Chance.name();
				var _data = {
					competition : Vendor.Chance.syllable(),
					datetime : Vendor.Chance.timestamp(),
					team : [team, teamRandom],
					score : [Vendor.Chance.integer({
						min : 0,
						max : 99
					}), Vendor.Chance.integer({
						min : 0,
						max : 99
					})],
					highlight : null
				};

				if (highlightTeam) {
					_data.highlight = 0;
				}

				var random2 = _.random(0, 1);

				if (random2 === 1) {
					_data.team = [teamRandom, team];

					if (highlightTeam) {
						if (_data.highlight === 0) {
							_data.highlight = 1;
						} else if (_data.highlight === 1) {
							_data.highlight = 0;
						}
					}
				}

				data.data.push(_data);
			}

			data.data = _.sortBy(data.data, 'datatime');
		}

		return data;
	};

	function createTeamTableData(teams) {
		var data = {
			table : 'team',
			headerTitle : Vendor.Chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 1);

		if (random === 1) {
			for (var i in teams) {
				var _data = {
					position : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					datatime : Vendor.Chance.timestamp(),
					team : teams[i],
					played : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					goal_difference : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					points : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					ranking : Vendor.Chance.pick([-1, 0, 1])
				};

				data.data.push(_data);
			}

			data.data = _.sortBy(data.data, 'postion');
		}

		return data;
	};

	function createLeagueTableData(teams) {
		var data = {
			table : 'league',
			headerTitle : Vendor.Chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 1);

		if (random === 1) {
			for (var i in teams) {
				var _data = {
					position : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					datatime : Vendor.Chance.timestamp(),
					team : teams[i],
					played : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					win : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					draw : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					lose : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					goal_difference : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					points : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					ranking : Vendor.Chance.pick([-1, 0, 1])
				};

				data.data.push(_data);
			}

			var random2 = _.random(1, 50);

			for (var i = 1; i <= random2; i++) {
				var _data = {
					position : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					datatime : Vendor.Chance.timestamp(),
					team : Vendor.Chance.name(),
					played : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					win : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					draw : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					lose : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					goal_difference : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					points : Vendor.Chance.integer({
						min : 0,
						max : 9999
					}),
					ranking : Vendor.Chance.pick([-1, 0, 1])
				};

				data.data.push(_data);
			}

			data.data = _.sortBy(data.data, 'postion');
		}

		return data;
	};

	function run() {
		var vsTableData = createVsTableData(teams[0], teams[1], null);
		var matchTableData1 = createMatchTableData(teams[0], true);
		var matchTableData2 = createMatchTableData(teams[1], true);
		var teamTableData = createTeamTableData([teams[0], teams[1]]);
		var leagueTableData = createLeagueTableData([teams[0], teams[1]]);

		var data = [vsTableData, matchTableData1, matchTableData2, teamTableData, leagueTableData];

		$.matchsummytableView.setData(data);
	};
};

function loadEvent() {
	Ti.API.debug('1:loadEvent');

	$.main.addEventListener('open', function(e) {

	});

	$.main.addEventListener('close', function(e) {

	});
};

function initialize() {
	Ti.API.debug('1:initialize');

	if (Alloy.Globals.isIos7Plus) {
		$.navbarView.getView().top = 20;
	}

	$.navbarView.loadConfig(Alloy.Widgets.configs['com.intbizth.alloy.navbar']);
	$.gamelabelView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.gamelabel']);
	$.matchlabelView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.matchlabel']);
	$.powerBarView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.powerbar']);
	$.winloseordrawView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.winloseordraw']);
	$.matchsummytableView.loadConfig(Alloy.Widgets.configs['com.intbizth.balltoro.matchsummytable']);

	loadEvent();
};

initialize();

function load() {
	Ti.API.debug('1:load');

	global.load = true;

	$.matchlabelView.test();
	$.gamelabelView.test();
	$.powerBarView.test();
	$.winloseordrawView.test();
	$.matchsummytableView.test();
};

function destroy() {
	Ti.API.debug('1:destroy');

	global.load = false;

	for (var i in timer) {
		clearInterval(timer[i]);
		timer[i] = null;
	}

	$.winloseordrawTestSubView.removeAllChildren();
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
