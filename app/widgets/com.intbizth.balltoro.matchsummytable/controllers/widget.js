var global = {
	test : {
		timer : null
	},
	sectionHeight : 30,
	rowNoDataHeight : 28,
	rowHeight : 25,
	vsTableWidths : [0.14, 0.2, 0.52, 0.14],
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
	matchTableWidths : [0.14, 0.2, 0.52, 0.14],
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
	teamTableWidths : [0.08, 0.64, 0.08, 0.08, 0.08, 0.04],
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
	teamTableRow2FontHighlightColor : '#549af7',
	leagueTableWidths : [0.08, 0.4, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.04],
	leagueTableSectionBackgroundColor : '#549af7',
	leagueTableSectionFontColor : '#fff',
	leagueTableSectionLineColor : '#4781cb',
	leagueTableNoDataBackgroundColor : '#383a3b',
	leagueTableNoDataFontColor : '#fff',
	leagueTableHeaderBackgroundColor : '#383a3b',
	leagueTableHeaderFontColor : '#fff',
	leagueTableRow1BackgroundColor : '#213647',
	leagueTableRow1FontColor : '#fff',
	leagueTableRow1FontHighlightColor : '#549af7',
	leagueTableRow2BackgroundColor : '#162a38',
	leagueTableRow2FontColor : '#fff',
	leagueTableRow2FontHighlightColor : '#549af7'
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
		var widths = JSON.parse(JSON.stringify(global.vsTableWidths));

		for (var i in widths) {
			widths[i] = Ti.Platform.displayCaps.platformWidth * widths[i];
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
					color : (i % 2 === 1) ? global.vsTableRow1FontColor : global.vsTableRow2FontColor
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
		var widths = JSON.parse(JSON.stringify(global.matchTableWidths));

		for (var i in widths) {
			widths[i] = Ti.Platform.displayCaps.platformWidth * widths[i];
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
					color : (i % 2 === 1) ? global.matchTableRow1FontColor : global.matchTableRow2FontColor
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
		var widths = JSON.parse(JSON.stringify(global.teamTableWidths));

		for (var i in widths) {
			widths[i] = Ti.Platform.displayCaps.platformWidth * widths[i];
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
			goalDifferenceView : {
				left : widths[0] + widths[1] + widths[2],
				width : widths[3],
				height : global.rowHeight
			},
			goalDifferenceLabel : {
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
				goalDifferenceView : {
					left : widths[0] + widths[1] + widths[2],
					width : widths[3],
					height : global.rowHeight
				},
				goalDifferenceLabel : {
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
					image : (data.data[i].ranking === -1) ? WPATH('images/btn_down.png') : ((data.data[i].ranking === 1) ? WPATH('images/btn_up.png') : '')
				}
			});
		}
	}

	section.items = items;

	return section;
};

function createLeagueTable(data) {
	var headerView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : global.sectionHeight,
		backgroundColor : global.leagueTableSectionBackgroundColor
	});

	var headerLabel = Ti.UI.createLabel({
		top : 0,
		left : 4,
		width : Ti.Platform.displayCaps.platformWidth - 8,
		height : headerView.height,
		color : global.leagueTableSectionFontColor,
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
		backgroundColor : global.leagueTableSectionLineColor
	});

	headerView.add(headerLine);

	var section = Ti.UI.createListSection({
		headerView : headerView
	});

	var items = [];

	if (data.data.length === 0) {
		items.push({
			template : 'leagueTableNoData',
			properties : {
				height : global.rowNoDataHeight,
				backgroundColor : global.leagueTableNoDataBackgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			noDataView : {
				width : Ti.UI.FILL,
				height : global.rowNoDataHeight
			},
			noDataLabel : {
				width : Ti.Platform.displayCaps.platformWidth - 8,
				height : global.rowNoDataHeight,
				color : global.leagueTableNoDataFontColor
			}
		});
	} else {
		var widths = JSON.parse(JSON.stringify(global.leagueTableWidths));

		for (var i in widths) {
			widths[i] = Ti.Platform.displayCaps.platformWidth * widths[i];
		}

		items.push({
			template : 'leagueTableHeader',
			properties : {
				height : global.rowHeight,
				backgroundColor : global.leagueTableHeaderBackgroundColor,
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
				color : global.leagueTableHeaderFontColor
			},
			teamView : {
				left : widths[0],
				width : widths[1],
				height : global.rowHeight
			},
			teamLabel : {
				width : widths[1] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			},
			playedView : {
				left : widths[0] + widths[1],
				width : widths[2],
				height : global.rowHeight
			},
			playedLabel : {
				width : widths[2] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			},
			winView : {
				left : widths[0] + widths[1] + widths[2],
				width : widths[3],
				height : global.rowHeight
			},
			winLabel : {
				width : widths[3] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			},
			drawView : {
				left : widths[0] + widths[1] + widths[2] + widths[3],
				width : widths[4],
				height : global.rowHeight
			},
			drawLabel : {
				width : widths[4] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			},
			loseView : {
				left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4],
				width : widths[5],
				height : global.rowHeight
			},
			loseLabel : {
				width : widths[5] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			},
			goalDifferenceView : {
				left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + widths[5],
				width : widths[6],
				height : global.rowHeight
			},
			goalDifferenceLabel : {
				width : widths[6] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			},
			pointsView : {
				left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + widths[5] + widths[6],
				width : widths[7],
				height : global.rowHeight
			},
			pointsLabel : {
				width : widths[7] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			},
			rankingView : {
				left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + widths[5] + widths[6] + widths[7],
				width : widths[8],
				height : global.rowHeight
			},
			rankingLabel : {
				width : widths[8] - 2,
				height : global.rowHeight,
				color : global.leagueTableHeaderFontColor
			}
		});

		for (var i in data.data) {
			i = parseInt(i);

			items.push({
				template : 'leagueTableRow',
				properties : {
					height : global.rowHeight,
					backgroundColor : (i % 2 === 1) ? global.leagueTableRow1BackgroundColor : global.leagueTableRow2BackgroundColor,
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
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
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
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
					text : data.data[i].team
				},
				playedView : {
					left : widths[0] + widths[1],
					width : widths[2],
					height : global.rowHeight
				},
				playedLabel : {
					width : widths[2] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
					text : data.data[i].played
				},
				winView : {
					left : widths[0] + widths[1] + widths[2],
					width : widths[3],
					height : global.rowHeight
				},
				winLabel : {
					width : widths[3] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
					text : data.data[i].win
				},
				drawView : {
					left : widths[0] + widths[1] + widths[2] + widths[3],
					width : widths[4],
					height : global.rowHeight
				},
				drawLabel : {
					width : widths[4] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
					text : data.data[i].draw
				},
				loseView : {
					left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4],
					width : widths[5],
					height : global.rowHeight
				},
				loseLabel : {
					width : widths[5] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
					text : data.data[i].lose
				},
				goalDifferenceView : {
					left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + widths[5],
					width : widths[6],
					height : global.rowHeight
				},
				goalDifferenceLabel : {
					width : widths[6] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
					text : data.data[i].goal_difference
				},
				pointsView : {
					left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + widths[5] + widths[6],
					width : widths[7],
					height : global.rowHeight
				},
				pointsLabel : {
					width : widths[7] - 2,
					height : global.rowHeight,
					color : (i % 2 === 1) ? global.leagueTableRow1FontColor : global.leagueTableRow2FontColor,
					text : data.data[i].points
				},
				rankingView : {
					left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + widths[5] + widths[6] + widths[7],
					width : widths[8],
					height : global.rowHeight
				},
				rankingImage : {
					image : (data.data[i].ranking === -1) ? WPATH('images/btn_down.png') : ((data.data[i].ranking === 1) ? WPATH('images/btn_up.png') : '')
				}
			});
		}
	}

	section.items = items;

	return section;
};

function setData(datas) {
	var sections = [];

	for (var i in datas) {
		if (datas[i].table === 'vs') {
			sections.push(createVsTable(datas[i]));
		} else if (datas[i].table === 'match') {
			sections.push(createMatchTable(datas[i]));
		} else if (datas[i].table === 'team') {
			sections.push(createTeamTable(datas[i]));
		} else if (datas[i].table === 'league') {
			sections.push(createLeagueTable(datas[i]));
		}
	}

	$.list.sections = sections;
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
 * @param {Integer} duration
 */
exports.startTest = function(duration) {
	var chance = require('chance.min'),
	    chance = new chance();

	var teams = [chance.name(), chance.name()];

	run();

	global.timer = setInterval(function() {
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
	clearInterval(global.timer);
	global.timer = null;
};

/**
 *
 * @param {Object} datas
 */
exports.setData = function(datas) {
	setData(datas);
};
