var config = require(WPATH('config'));
Widget.Models.matchsummytable = Widget.createModel('matchsummytable');
var timer = null;

exports.startTest = function(duration) {
	var chance = require('chance.min'),
	    chance = new chance();

	var teams = [chance.name(), chance.name()];

	run();

	timer = setInterval(function() {
		run();
	}, duration);

	function createVsTableData(team1, team2, highlightTeam) {
		var data = {
			table : 'vs',
			headerTitle : chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 10);

		if (random > 0) {
			for (var i = 1; i <= random; i++) {
				var _data = {
					competition : chance.syllable(),
					datetime : chance.timestamp(),
					team : [team1, team2],
					score : [chance.integer({
						min : 0,
						max : 99
					}), chance.integer({
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

			data.paginationPrevious = chance.pick([chance.url(), null]);
			data.paginationNext = chance.pick([chance.url(), null]);
		}

		return data;
	};

	function createMatchTableData(team, highlightTeam) {
		var data = {
			table : 'match',
			headerTitle : chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 10);

		if (random > 0) {
			for (var i = 1; i <= random; i++) {
				var teamRandom = chance.name();
				var _data = {
					competition : chance.syllable(),
					datetime : chance.timestamp(),
					team : [team, teamRandom],
					score : [chance.integer({
						min : 0,
						max : 99
					}), chance.integer({
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

			data.paginationPrevious = chance.pick([chance.url(), null]);
			data.paginationNext = chance.pick([chance.url(), null]);
		}

		return data;
	};

	function createTeamTableData(teams) {
		var data = {
			table : 'team',
			headerTitle : chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 1);

		if (random === 1) {
			for (var i in teams) {
				var _data = {
					position : chance.integer({
						min : 0,
						max : 999
					}),
					datatime : chance.timestamp(),
					team : teams[i],
					played : chance.integer({
						min : 0,
						max : 999
					}),
					goal_difference : chance.integer({
						min : 0,
						max : 999
					}),
					points : chance.integer({
						min : 0,
						max : 999
					}),
					ranking : chance.pick([-1, 0, 1])
				};

				data.data.push(_data);
			}

			data.data = _.sortBy(data.data, 'position');

			data.paginationPrevious = chance.pick([chance.url(), null]);
			data.paginationNext = chance.pick([chance.url(), null]);
		}

		return data;
	};

	function createLeagueTableData(teams) {
		var data = {
			table : 'league',
			headerTitle : chance.sentence(),
			data : [],
			paginationPrevious : null,
			paginationNext : null
		};

		var random = _.random(0, 1);

		if (random === 1) {
			for (var i in teams) {
				var _data = {
					position : chance.integer({
						min : 0,
						max : 999
					}),
					datatime : chance.timestamp(),
					team : teams[i],
					played : chance.integer({
						min : 0,
						max : 999
					}),
					win : chance.integer({
						min : 0,
						max : 999
					}),
					draw : chance.integer({
						min : 0,
						max : 999
					}),
					lose : chance.integer({
						min : 0,
						max : 999
					}),
					goal_difference : chance.integer({
						min : 0,
						max : 999
					}),
					points : chance.integer({
						min : 0,
						max : 999
					}),
					ranking : chance.pick([-1, 0, 1])
				};

				data.data.push(_data);
			}

			var random2 = _.random(0, 10);

			for (var i = 1; i <= random2; i++) {
				var _data = {
					position : chance.integer({
						min : 0,
						max : 999
					}),
					datatime : chance.timestamp(),
					team : chance.name(),
					played : chance.integer({
						min : 0,
						max : 999
					}),
					win : chance.integer({
						min : 0,
						max : 999
					}),
					draw : chance.integer({
						min : 0,
						max : 999
					}),
					lose : chance.integer({
						min : 0,
						max : 999
					}),
					goal_difference : chance.integer({
						min : 0,
						max : 999
					}),
					points : chance.integer({
						min : 0,
						max : 999
					}),
					ranking : chance.pick([-1, 0, 1])
				};

				data.data.push(_data);
			}

			data.data = _.sortBy(data.data, 'position');

			data.paginationPrevious = chance.pick([chance.url(), null]);
			data.paginationNext = chance.pick([chance.url(), null]);
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

		setData(data);
	};
};

exports.stopTest = function() {
	clearInterval(timer);
	timer = null;
};

function setData(datas) {
	var sections = [];

	for (var i in datas) {
		var section = Widget.createController('table/' + datas[i].table).createTable(datas[i]);

		section.addEventListener('click:previous', function(e) {
			Ti.API.error(e);
		});

		section.addEventListener('click:next', function(e) {
			Ti.API.error(e);
		});

		sections.push(section);
	}

	$.list.sections = sections;
};

exports.setData = function(datas) {
	setData(datas);
};
