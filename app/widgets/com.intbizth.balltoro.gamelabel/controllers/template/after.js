var moment = require('alloy/moment');
var config = require(WPATH('config')).after;
var args = arguments[0] || {};

var leftWidth = Ti.Platform.displayCaps.platformWidth * 0.4;
var centerWidth = Ti.Platform.displayCaps.platformWidth * 0.2;
var rightWidth = Ti.Platform.displayCaps.platformWidth * 0.4;

$.main.height = config.height;
$.leftView.width = leftWidth;
$.leftView.backgroundColor = config.left.backgroundColor;
$.centerView.width = centerWidth;
$.centerView.backgroundColor = config.center.backgroundColor;
$.rightView.width = rightWidth;
$.rightView.backgroundColor = config.right.backgroundColor;

$.leftLabelView.right = 0;
$.leftLabelView.width = $.leftView.width - $.leftLabelView.right - $.main.height;
$.leftLabel.width = $.leftLabelView.width - 4;
$.leftLabel.color = config.left.color;
$.leftImageView.left = 0;
$.leftImageView.width = $.main.height;
$.leftImage.width = $.leftImageView.width - 4;
$.leftImage.height = $.leftImage.width;

$.scoreLabel.color = config.center.scoreColor;
$.dateLabel.color = config.center.dateColor;

$.rightLabelView.left = 0;
$.rightLabelView.width = $.rightView.width - $.rightLabelView.left - $.main.height;
$.rightLabel.width = $.rightLabelView.width - 4;
$.rightLabel.color = config.right.color;
$.rightImageView.right = 0;
$.rightImageView.width = $.main.height;
$.rightImage.width = $.rightImageView.width - 4;
$.rightImage.height = $.rightImage.width;

if (args.homeClub) {
	$.leftLabel.text = args.homeClub.name;
	$.leftImage.image = args.homeClub.logo;
}

if (args.awayClub) {
	$.rightLabel.text = args.awayClub.name;
	$.rightImage.image = args.awayClub.logo;
}

if (args.homeClub && args.awayClub) {
	$.scoreLabel.text = args.homeClub.score + '-' + args.awayClub.score;
}

if (args.datetime) {
	$.dateLabel.text = moment.unix(args.datetime).format('D MMM YYYY');
}

exports.getImageSize = function() {
	return {
		width : $.leftImage.width,
		height : $.leftImage.height
	};
};
