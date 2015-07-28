var global = {
	sectionHeight : 30,
	rowNoDataHeight : 28,
	rowHeight : 25,
	vsTableSectionBackgroundColor : '#ff3b30',
	vsTableSectionFontColor : '#fff',
	vsTableSectionLineColor : '#b22922',
	vsTableNoDataBackgroundColor : '#383a3b',
	vsTableNoDataFontColor : '#fff',
	vsTableHeaderBackgroundColor : '#383a3b',
	vsTableHeaderFontColor : '#fff',
	vsTableRow1BackgroundColor : '#213647',
	vsTableRow1FontColor : '#fff',
	vsTableRow1FontHighlightColor : '#549af7',
	vsTableRow2BackgroundColor : '#162a38',
	vsTableRow2FontColor : '#fff',
	vsTableRow2FontHighlightColor : '#549af7',
	matchTableSectionBackgroundColor : '#549af7',
	matchTableSectionFontColor : '#fff',
	matchTableSectionLineColor : '#4781cb',
	matchTableNoDataBackgroundColor : '#383a3b',
	matchTableNoDataFontColor : '#fff',
	matchTableHeaderBackgroundColor : '#383a3b',
	matchTableHeaderFontColor : '#fff',
	matchTableRow1BackgroundColor : '#213647',
	matchTableRow1FontColor : '#fff',
	matchTableRow1FontHighlightColor : '#549af7',
	matchTableRow2BackgroundColor : '#162a38',
	matchTableRow2FontColor : '#fff',
	matchTableRow2FontHighlightColor : '#549af7',
	teamTableSectionBackgroundColor : '#549af7',
	teamTableSectionFontColor : '#fff',
	teamTableSectionLineColor : '#4781cb',
	teamTableNoDataBackgroundColor : '#383a3b',
	teamTableNoDataFontColor : '#fff',
	teamTableHeaderBackgroundColor : '#383a3b',
	teamTableHeaderFontColor : '#fff',
	teamTableRow1BackgroundColor : '#213647',
	teamTableRow1FontColor : '#fff',
	teamTableRow1FontHighlightColor : '#549af7',
	teamTableRow2BackgroundColor : '#162a38',
	teamTableRow2FontColor : '#fff',
	teamTableRow2FontHighlightColor : '#549af7'
};

function initialize() {

};

initialize();

function createVsTable(data) {
	var headerView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : global.sectionHeight,
		backgroundColor : global.vsTableSectionBackgroundColor
	});

	var headerLabel = Ti.UI.createLabel({
		top : 0,
		left : 4,
		width : Ti.Platform.displayCaps.platformWidth - 8,
		height : headerView.height,
		color : global.vsTableSectionFontColor,
		font : {
			fontSize : 14
		},
		text : (data.headerTitle) ? data.headerTitle : '',
		textAlign : 'left'
	});

	headerView.add(headerLabel);

	var headerLine = Ti.UI.createView({
		bottom : 0,
		width : Ti.UI.FILL,
		height : 1,
		backgroundColor : global.vsTableSectionLineColor
	});

	headerView.add(headerLine);

	var section = Ti.UI.createListSection({
		headerView : headerView
	});

	var items = [];

	if (data.data.length === 0) {
		items.push({
			template : 'vsTableNoData',
			properties : {
				height : global.rowNoDataHeight,
				backgroundColor : global.vsTableNoDataBackgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			noDataView : {
				width : Ti.UI.FILL,
				height : global.rowNoDataHeight
			},
			noDataLabel : {
				width : Ti.Platform.displayCaps.platformWidth - 8,
				height : global.rowNoDataHeight,
				color : global.vsTableNoDataFontColor
			}
		});
	} else {
		var widths = [0.14, 0.2, 0.52, 0.14];

		for (var i in widths) {
			widths[i] = parseInt(Ti.Platform.displayCaps.platformWidth * widths[i]);
		}

		items.push({
			template : 'vsTableHeader',
			properties : {
				height : global.rowHeight,
				backgroundColor : global.vsTableHeaderBackgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			competitionView : {
				left : 0,
				width : widths[0],
				height : global.rowHeight
			},
			competitionLabel : {
				width : widths[0] - 2,
				height : global.rowHeight,
				color : global.vsTableHeaderFontColor
			},
			dateView : {
				left : widths[0],
				width : widths[1],
				height : global.rowHeight
			},
			dateLabel : {
				width : widths[1] - 2,
				height : global.rowHeight,
				color : global.vsTableHeaderFontColor
			},
			teamView : {
				left : widths[0] + widths[1],
				width : widths[2],
				height : global.rowHeight
			},
			teamLabel : {
				width : widths[2] - 2,
				height : global.rowHeight,
				color : global.vsTableHeaderFontColor
			},
			fulltimeView : {
				left : widths[0] + widths[1] + widths[2],
				width : widths[3],
				height : global.rowHeight
			},
			fulltimeLabel : {
				width : widths[3] - 2,
				height : global.rowHeight,
				color : global.vsTableHeaderFontColor
			}
		});

		for (var i in data.data) {
			i = parseInt(i);

			items.push({
				template : 'vsTableRow',
				properties : {
					height : global.rowHeight,
					backgroundColor : (i % 2 === 1) ? global.vsTableRow1BackgroundColor : global.vsTableRow2BackgroundColor,
					selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
				},
				competitionView : {
					left : 0,
					width : widths[0],
					height : global.rowHeight
				},
				competitionLabel : {
					width : widths[0] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.vsTableRow1FontColor : global.vsTableRow2FontColor,
					text : data.data[i].competition
				},
				dateView : {
					left : widths[0],
					width : widths[1],
					height : global.rowHeight
				},
				dateLabel : {
					width : widths[1] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.vsTableRow1FontColor : global.vsTableRow2FontColor,
					text : Alloy.Moment.unix(data.data[i].datetime).format('DD/MM/YY')
				},
				teamView : {
					left : widths[0] + widths[1],
					width : widths[2],
					height : global.rowHeight
				},
				team1Label : {
					width : Ti.UI.SIZE,
					height : global.rowHeight,
					color : (data.data[i].highlight === 0) ? global.vsTableRow1FontHighlightColor : ((i % 2 === 1) ? global.vsTableRow1FontColor : global.vsTableRow2FontColor),
					text : data.data[i].team[0]
				},
				dashLabel : {
					color : (i % 2 === 1) ? global.vsTableRow1FontColor : global.vsTableRow2FontColor,
				},
				team2Label : {
					width : Ti.UI.SIZE,
					height : global.rowHeight,
					color : (data.data[i].highlight === 1) ? global.vsTableRow1FontHighlightColor : ((i % 2 === 1) ? global.vsTableRow1FontColor : global.vsTableRow2FontColor),
					text : data.data[i].team[1]
				},
				fulltimeView : {
					left : widths[0] + widths[1] + widths[2],
					width : widths[3],
					height : global.rowHeight
				},
				fulltimeLabel : {
					width : widths[3] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.vsTableRow1FontColor : global.vsTableRow2FontColor,
					text : data.data[i].score[0] + '-' + data.data[i].score[1]
				}
			});
		}
	}

	section.items = items;

	return section;
};

function createMatchTable(data) {
	var headerView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : global.sectionHeight,
		backgroundColor : global.matchTableSectionBackgroundColor
	});

	var headerLabel = Ti.UI.createLabel({
		top : 0,
		left : 4,
		width : Ti.Platform.displayCaps.platformWidth - 8,
		height : headerView.height,
		color : global.matchTableSectionFontColor,
		font : {
			fontSize : 14
		},
		text : (data.headerTitle) ? data.headerTitle : '',
		textAlign : 'left'
	});

	headerView.add(headerLabel);

	var headerLine = Ti.UI.createView({
		bottom : 0,
		width : Ti.UI.FILL,
		height : 1,
		backgroundColor : global.matchTableSectionLineColor
	});

	headerView.add(headerLine);

	var section = Ti.UI.createListSection({
		headerView : headerView
	});

	var items = [];

	if (data.data.length === 0) {
		items.push({
			template : 'matchTableNoData',
			properties : {
				height : global.rowNoDataHeight,
				backgroundColor : global.matchTableNoDataBackgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			noDataView : {
				width : Ti.UI.FILL,
				height : global.rowNoDataHeight
			},
			noDataLabel : {
				width : Ti.Platform.displayCaps.platformWidth - 8,
				height : global.rowNoDataHeight,
				color : global.matchTableNoDataFontColor
			}
		});
	} else {
		var widths = [0.14, 0.2, 0.52, 0.14];

		for (var i in widths) {
			widths[i] = parseInt(Ti.Platform.displayCaps.platformWidth * widths[i]);
		}

		items.push({
			template : 'matchTableHeader',
			properties : {
				height : global.rowHeight,
				backgroundColor : global.matchTableHeaderBackgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			competitionView : {
				left : 0,
				width : widths[0],
				height : global.rowHeight
			},
			competitionLabel : {
				width : widths[0] - 2,
				height : global.rowHeight,
				color : global.matchTableHeaderFontColor
			},
			dateView : {
				left : widths[0],
				width : widths[1],
				height : global.rowHeight
			},
			dateLabel : {
				width : widths[1] - 2,
				height : global.rowHeight,
				color : global.matchTableHeaderFontColor
			},
			teamView : {
				left : widths[0] + widths[1],
				width : widths[2],
				height : global.rowHeight
			},
			teamLabel : {
				width : widths[2] - 2,
				height : global.rowHeight,
				color : global.matchTableHeaderFontColor
			},
			fulltimeView : {
				left : widths[0] + widths[1] + widths[2],
				width : widths[3],
				height : global.rowHeight
			},
			fulltimeLabel : {
				width : widths[3] - 2,
				height : global.rowHeight,
				color : global.matchTableHeaderFontColor
			}
		});

		for (var i in data.data) {
			i = parseInt(i);

			items.push({
				template : 'matchTableRow',
				properties : {
					height : global.rowHeight,
					backgroundColor : (i % 2 === 1) ? global.matchTableRow1BackgroundColor : global.matchTableRow2BackgroundColor,
					selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
				},
				competitionView : {
					left : 0,
					width : widths[0],
					height : global.rowHeight
				},
				competitionLabel : {
					width : widths[0] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.matchTableRow1FontColor : global.matchTableRow2FontColor,
					text : data.data[i].competition
				},
				dateView : {
					left : widths[0],
					width : widths[1],
					height : global.rowHeight
				},
				dateLabel : {
					width : widths[1] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.matchTableRow1FontColor : global.matchTableRow2FontColor,
					text : Alloy.Moment.unix(data.data[i].datetime).format('DD/MM/YY')
				},
				teamView : {
					left : widths[0] + widths[1],
					width : widths[2],
					height : global.rowHeight
				},
				team1Label : {
					width : Ti.UI.SIZE,
					height : global.rowHeight,
					color : (data.data[i].highlight === 0) ? global.matchTableRow1FontHighlightColor : ((i % 2 === 1) ? global.matchTableRow1FontColor : global.matchTableRow2FontColor),
					text : data.data[i].team[0]
				},
				dashLabel : {
					color : (i % 2 === 1) ? global.matchTableRow1FontColor : global.matchTableRow2FontColor,
				},
				team2Label : {
					width : Ti.UI.SIZE,
					height : global.rowHeight,
					color : (data.data[i].highlight === 1) ? global.matchTableRow1FontHighlightColor : ((i % 2 === 1) ? global.matchTableRow1FontColor : global.matchTableRow2FontColor),
					text : data.data[i].team[1]
				},
				fulltimeView : {
					left : widths[0] + widths[1] + widths[2],
					width : widths[3],
					height : global.rowHeight
				},
				fulltimeLabel : {
					width : widths[3] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.matchTableRow1FontColor : global.matchTableRow2FontColor,
					text : data.data[i].score[0] + '-' + data.data[i].score[1]
				}
			});
		}
	}

	section.items = items;

	return section;
};

function createTeamTable(data) {
	var headerView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : global.sectionHeight,
		backgroundColor : global.teamTableSectionBackgroundColor
	});

	var headerLabel = Ti.UI.createLabel({
		top : 0,
		left : 4,
		width : Ti.Platform.displayCaps.platformWidth - 8,
		height : headerView.height,
		color : global.teamTableSectionFontColor,
		font : {
			fontSize : 14
		},
		text : (data.headerTitle) ? data.headerTitle : '',
		textAlign : 'left'
	});

	headerView.add(headerLabel);

	var headerLine = Ti.UI.createView({
		bottom : 0,
		width : Ti.UI.FILL,
		height : 1,
		backgroundColor : global.teamTableSectionLineColor
	});

	headerView.add(headerLine);

	var section = Ti.UI.createListSection({
		headerView : headerView
	});

	var items = [];

	if (data.data.length === 0) {
		items.push({
			template : 'teamTableNoData',
			properties : {
				height : global.rowNoDataHeight,
				backgroundColor : global.teamTableNoDataBackgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			noDataView : {
				width : Ti.UI.FILL,
				height : global.rowNoDataHeight
			},
			noDataLabel : {
				width : Ti.Platform.displayCaps.platformWidth - 8,
				height : global.rowNoDataHeight,
				color : global.teamTableNoDataFontColor
			}
		});
	} else {
		var widths = [0.14, 0.46, 0.1, 0.1, 0.1, 0.1];

		for (var i in widths) {
			widths[i] = parseInt(Ti.Platform.displayCaps.platformWidth * widths[i]);
		}

		items.push({
			template : 'teamTableHeader',
			properties : {
				height : global.rowHeight,
				backgroundColor : global.teamTableHeaderBackgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			positionView : {
				left : 0,
				width : widths[0],
				height : global.rowHeight
			},
			positionLabel : {
				width : widths[0] - 2,
				height : global.rowHeight,
				color : global.teamTableHeaderFontColor
			},
			teamView : {
				left : widths[0],
				width : widths[1],
				height : global.rowHeight
			},
			teamLabel : {
				width : widths[1] - 2,
				height : global.rowHeight,
				color : global.teamTableHeaderFontColor
			},
			playedView : {
				left : widths[0] + widths[1],
				width : widths[2],
				height : global.rowHeight
			},
			playedLabel : {
				width : widths[2] - 2,
				height : global.rowHeight,
				color : global.teamTableHeaderFontColor
			},
			goalGifferenceView : {
				left : widths[0] + widths[1] + widths[2],
				width : widths[3],
				height : global.rowHeight
			},
			goalGifferenceLabel : {
				width : widths[3] - 2,
				height : global.rowHeight,
				color : global.teamTableHeaderFontColor
			},
			pointsView : {
				left : widths[0] + widths[1] + widths[2] + widths[3],
				width : widths[4],
				height : global.rowHeight
			},
			pointsLabel : {
				width : widths[4] - 2,
				height : global.rowHeight,
				color : global.teamTableHeaderFontColor
			},
			rankingView : {
				left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4],
				width : widths[5],
				height : global.rowHeight
			},
			rankingLabel : {
				width : widths[5] - 2,
				height : global.rowHeight,
				color : global.teamTableHeaderFontColor
			}
		});

		for (var i in data.data) {
			i = parseInt(i);

			items.push({
				template : 'teamTableRow',
				properties : {
					height : global.rowHeight,
					backgroundColor : (i % 2 === 1) ? global.teamTableRow1BackgroundColor : global.teamTableRow2BackgroundColor,
					selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
				},
				positionView : {
					left : 0,
					width : widths[0],
					height : global.rowHeight
				},
				positionLabel : {
					width : widths[0] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.teamTableRow1FontColor : global.teamTableRow2FontColor,
					text : data.data[i].position
				},
				teamView : {
					left : widths[0],
					width : widths[1],
					height : global.rowHeight
				},
				teamLabel : {
					width : widths[1] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.teamTableRow1FontColor : global.teamTableRow2FontColor,
					text : data.data[i].team
				},
				playedView : {
					left : widths[0] + widths[1],
					width : widths[2],
					height : global.rowHeight
				},
				playedLabel : {
					width : Ti.UI.SIZE,
					height : global.rowHeight,
					color : (data.data[i].highlight === 0) ? global.teamTableRow1FontHighlightColor : ((i % 2 === 1) ? global.teamTableRow1FontColor : global.teamTableRow2FontColor),
					text : data.data[i].played
				},
				goalGifferenceView : {
					left : widths[0] + widths[1] + widths[2],
					width : widths[3],
					height : global.rowHeight
				},
				goalGifferenceLabel : {
					width : Ti.UI.SIZE,
					height : global.rowHeight,
					color : (data.data[i].highlight === 0) ? global.teamTableRow1FontHighlightColor : ((i % 2 === 1) ? global.teamTableRow1FontColor : global.teamTableRow2FontColor),
					text : data.data[i].goal_difference
				},
				pointsView : {
					left : widths[0] + widths[1] + widths[2] + widths[3],
					width : widths[4],
					height : global.rowHeight
				},
				pointsLabel : {
					width : Ti.UI.SIZE,
					height : global.rowHeight,
					color : (data.data[i].highlight === 0) ? global.teamTableRow1FontHighlightColor : ((i % 2 === 1) ? global.teamTableRow1FontColor : global.teamTableRow2FontColor),
					text : data.data[i].points
				},
				rankingView : {
					left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4],
					width : widths[5],
					height : global.rowHeight
				},
				rankingImage : {
					image : (data.data[i].ranking === -1) ? 'images/com.intbizth.balltoro.matchsummytable/btn_down.png' : ((data.data[i].ranking === 1) ? 'images/com.intbizth.balltoro.matchsummytable/btn_up.png' : '')
				}
			});
		}
	}

	section.items = items;

	return section;
};

function createLeagueTable(data) {
	var section = Ti.UI.createListSection({

	});

	return section;
};

/**
 *
 * @param {Object} args
 */
exports.loadConfig = function(args) {
	for (var i in global) {
		if (args[i]) {
			global[i] = args[i];
		}
	}

	initialize();
};

/**
 *
 * @param {Object} datas
 */
exports.setData = function(datas) {
	var sections = [];

	for (var i in datas) {
		if (datas[i].table === 'vs') {
			sections.push(createVsTable(datas[i]));
		} else if (datas[i].table === 'match') {
			sections.push(createMatchTable(datas[i]));
		} else if (datas[i].table === 'team') {
			sections.push(createTeamTable(datas[i]));
		} else if (datas[i].table === 'league') {
			// sections.push(createLeagueTable(datas[i]));
		}
	}

	Ti.API.debug('sections:', sections);

	$.list.sections = sections;
};
