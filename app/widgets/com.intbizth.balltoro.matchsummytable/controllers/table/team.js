var moment = require('alloy/moment');
var config = require(WPATH('config'));
var tablename = 'team';

exports.createTable = function(data) {
	var headerView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : config.section.height,
		backgroundColor : config[tablename].section.backgroundColor
	});

	var headerLabel = Ti.UI.createLabel({
		top : 0,
		left : 4,
		width : Ti.Platform.displayCaps.platformWidth - 8,
		height : headerView.height,
		color : config[tablename].section.color,
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
		backgroundColor : config[tablename].section.lineColor
	});

	headerView.add(headerLine);
	
	if (data.paginationPrevious || data.paginationNext) {
		headerLabel.width = headerLabel.width - headerLabel.left - 120;

		var pagination = Widget.createController('pagination', config[tablename].pagination);
		pagination.getView().right = headerLabel.left;
		headerView.add(pagination.getView());

		pagination.getView().addEventListener('click:previous', function(e) {
			section.fireEvent('click:previous', e);
		});

		pagination.getView().addEventListener('click:next', function(e) {
			section.fireEvent('click:next', e);
		});
	}

	var section = Ti.UI.createListSection({
		headerView : headerView
	});

	var items = [];

	if (data.data.length === 0) {
		items.push({
			template : 'teamTableNoData',
			properties : {
				height : config.noData.height,
				backgroundColor : config[tablename].noData.backgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			noDataView : {
				width : Ti.UI.FILL,
				height : config.noData.height,
			},
			noDataLabel : {
				width : Ti.Platform.displayCaps.platformWidth - 8,
				height : config.noData.height,
				color : config[tablename].noData.color
			}
		});
	} else {
		var widths = JSON.parse(JSON.stringify(config[tablename].widths));

		for (var i in widths) {
			widths[i] = Ti.Platform.displayCaps.platformWidth * widths[i];
		}

		items.push({
			template : 'teamTableHeader',
			properties : {
				height : config.row.height,
				backgroundColor : config[tablename].header.backgroundColor,
				selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
			},
			positionView : {
				left : 0,
				width : widths[0],
				height : config.row.height
			},
			positionLabel : {
				width : widths[0] - 2,
				height : config.row.height,
				color : config[tablename].header.color
			},
			teamView : {
				left : widths[0],
				width : widths[1],
				height : config.row.height
			},
			teamLabel : {
				width : widths[1] - 2,
				height : config.row.height,
				color : config[tablename].header.color
			},
			playedView : {
				left : widths[0] + widths[1],
				width : widths[2],
				height : config.row.height
			},
			playedLabel : {
				width : widths[2] - 2,
				height : config.row.height,
				color : config[tablename].header.color
			},
			goalDifferenceView : {
				left : widths[0] + widths[1] + widths[2],
				width : widths[3],
				height : config.row.height
			},
			goalDifferenceLabel : {
				width : widths[3] - 2,
				height : config.row.height,
				color : config[tablename].header.color
			},
			pointsView : {
				left : widths[0] + widths[1] + widths[2] + widths[3],
				width : widths[4],
				height : config.row.height
			},
			pointsLabel : {
				width : widths[4] - 2,
				height : config.row.height,
				color : config[tablename].header.color
			},
			rankingView : {
				left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4],
				width : widths[5],
				height : config.row.height
			},
			rankingLabel : {
				width : widths[5] - 2,
				height : config.row.height,
				color : config[tablename].header.color
			}
		});

		for (var i in data.data) {
			i = parseInt(i);

			var backgroundColor = '';
			var color = '';
			var highlightColor = '';

			if (i % 2 === 1) {
				backgroundColor = config[tablename].row1.backgroundColor;
				color = config[tablename].row1.color;
				highlightColor = color;

				if (data.data[i].highlight) {
					highlightColor = config[tablename].row1.highlightColor;
				}
			} else {
				backgroundColor = config[tablename].row2.backgroundColor;
				color = config[tablename].row2.color;
				highlightColor = color;

				if (data.data[i].highlight) {
					highlightColor = config[tablename].row2.highlightColor;
				}
			}

			var colors = [color, highlightColor, color, color, color];

			var ranking = '';

			if (data.data[i].ranking === -1) {
				ranking = WPATH('images/btn_down.png');
			} else if (data.data[i].ranking === 1) {
				ranking = WPATH('images/btn_up.png');
			}

			items.push({
				template : 'teamTableRow',
				properties : {
					height : config.row.height,
					backgroundColor : backgroundColor,
					selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
				},
				positionView : {
					left : 0,
					width : widths[0],
					height : config.row.height
				},
				positionLabel : {
					width : widths[0] - 2,
					height : config.row.height,
					color : colors[0],
					text : data.data[i].position
				},
				teamView : {
					left : widths[0],
					width : widths[1],
					height : config.row.height
				},
				teamLabel : {
					width : widths[1] - 2,
					height : config.row.height,
					color : colors[1],
					text : data.data[i].team
				},
				playedView : {
					left : widths[0] + widths[1],
					width : widths[2],
					height : config.row.height
				},
				playedLabel : {
					width : Ti.UI.SIZE,
					height : config.row.height,
					color : colors[2],
					text : data.data[i].played
				},
				goalDifferenceView : {
					left : widths[0] + widths[1] + widths[2],
					width : widths[3],
					height : config.row.height
				},
				goalDifferenceLabel : {
					width : Ti.UI.SIZE,
					height : config.row.height,
					color : colors[3],
					text : data.data[i].goal_difference
				},
				pointsView : {
					left : widths[0] + widths[1] + widths[2] + widths[3],
					width : widths[4],
					height : config.row.height
				},
				pointsLabel : {
					width : Ti.UI.SIZE,
					height : config.row.height,
					color : colors[4],
					text : data.data[i].points
				},
				rankingView : {
					left : widths[0] + widths[1] + widths[2] + widths[3] + widths[4],
					width : widths[5],
					height : config.row.height
				},
				rankingImage : {
					image : ranking
				}
			});
		}
	}

	section.items = items;

	return section;
};
