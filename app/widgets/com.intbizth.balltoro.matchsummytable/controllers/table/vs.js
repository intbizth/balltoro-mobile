var moment = require('alloy/moment');
var config = require(WPATH('config'));
var tablename = 'vs';

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
        textAlign : 'left',
        backgroundColor : 'pink'
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
            template : 'vsTableNoData',
            properties : {
                height : config.noData.height,
                backgroundColor : config[tablename].noData.backgroundColor,
                selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
            },
            noDataView : {
                width : Ti.UI.FILL,
                height : config.noData.height
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
            template : 'vsTableHeader',
            properties : {
                height : config.row.height,
                backgroundColor : config[tablename].header.backgroundColor,
                selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
            },
            competitionView : {
                left : 0,
                width : widths[0],
                height : config.row.height
            },
            competitionLabel : {
                width : widths[0] - 2,
                height : config.row.height,
                color : config[tablename].header.color
            },
            dateView : {
                left : widths[0],
                width : widths[1],
                height : config.row.height
            },
            dateLabel : {
                width : widths[1] - 2,
                height : config.row.height,
                color : config[tablename].header.color
            },
            teamView : {
                left : widths[0] + widths[1],
                width : widths[2],
                height : config.row.height
            },
            teamLabel : {
                width : widths[2] - 2,
                height : config.row.height,
                color : config[tablename].header.color
            },
            fulltimeView : {
                left : widths[0] + widths[1] + widths[2],
                width : widths[3],
                height : config.row.height
            },
            fulltimeLabel : {
                width : widths[3] - 2,
                height : config.row.height,
                color : config[tablename].header.color
            }
        });

        for (var i in data.data) {
            i = parseInt(i);

            var backgroundColor = '';
            var color = '';
            var highlightColor = ['', ''];

            if (i % 2 === 1) {
                backgroundColor = config[tablename].row1.backgroundColor;
                color = config[tablename].row1.color;
                highlightColor = [color, color];

                if (data.data[i].highlight === 0) {
                    highlightColor[0] = config[tablename].row1.highlightColor;
                } else if (data.data[i].highlight === 1) {
                    highlightColor[1] = config[tablename].row1.highlightColor;
                }
            } else {
                backgroundColor = config[tablename].row2.backgroundColor;
                color = config[tablename].row2.color;
                highlightColor = [color, color];

                if (data.data[i].highlight === 0) {
                    highlightColor[0] = config[tablename].row2.highlightColor;
                } else if (data.data[i].highlight === 1) {
                    highlightColor[1] = config[tablename].row2.highlightColor;
                }
            }

            var colors = [color, color, [highlightColor[0], color, highlightColor[1]], color];

            items.push({
                template : 'vsTableRow',
                properties : {
                    height : config.row.height,
                    backgroundColor : backgroundColor,
                    selectionStyle : Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
                },
                competitionView : {
                    left : 0,
                    width : widths[0],
                    height : config.row.height
                },
                competitionLabel : {
                    width : widths[0] - 2,
                    height : config.row.height,
                    color : colors[0],
                    text : data.data[i].competition
                },
                dateView : {
                    left : widths[0],
                    width : widths[1],
                    height : config.row.height
                },
                dateLabel : {
                    width : widths[1] - 2,
                    height : config.row.height,
                    color : colors[1],
                    text : moment.unix(data.data[i].datetime).format('DD/MM/YY')
                },
                teamView : {
                    left : widths[0] + widths[1],
                    width : widths[2],
                    height : config.row.height
                },
                team1Label : {
                    width : Ti.UI.SIZE,
                    height : config.row.height,
                    color : colors[2][0],
                    text : data.data[i].team[0]
                },
                dashLabel : {
                    color : colors[2][1]
                },
                team2Label : {
                    width : Ti.UI.SIZE,
                    height : config.row.height,
                    color : colors[2][2],
                    text : data.data[i].team[1]
                },
                fulltimeView : {
                    left : widths[0] + widths[1] + widths[2],
                    width : widths[3],
                    height : config.row.height
                },
                fulltimeLabel : {
                    width : widths[3] - 2,
                    height : config.row.height,
                    color : colors[3],
                    text : data.data[i].score[0] + '-' + data.data[i].score[1]
                }
            });
        }
    }

    section.items = items;

    return section;
};
