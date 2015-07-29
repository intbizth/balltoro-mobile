var args = arguments[0] || {};

Ti.API.error('load', arguments);

var leftWidth = Ti.Platform.displayCaps.platformWidth * 0.4;
var centerWidth = Ti.Platform.displayCaps.platformWidth * 0.2;
var rightWidth = Ti.Platform.displayCaps.platformWidth * 0.4;

$.main.height = args.config.height;
$.leftView.width = leftWidth;
$.leftView.backgroundColor = args.config.left.backgroundColor;
$.centerView.width = centerWidth;
$.centerView.backgroundColor = args.config.center.backgroundColor;
$.rightView.width = rightWidth;
$.rightView.backgroundColor = args.config.right.backgroundColor;

$.leftLabelView.right = 0;
$.leftLabelView.width = $.leftView.width - $.leftLabelView.right - $.main.height;
$.leftLabel.width = $.leftLabelView.width - 4;
$.leftLabel.color = args.config.left.color;
$.leftImageView.left = 0;
$.leftImageView.width = $.main.height;
$.leftImage.width = $.leftImageView.width - 4;
$.leftImage.height = $.leftImage.width;

$.timeLabel.color = args.config.center.timeColor;
$.dateLabel.color = args.config.center.dateColor;

$.rightLabelView.left = 0;
$.rightLabelView.width = $.rightView.width - $.rightLabelView.left - $.main.height;
$.rightLabel.width = $.rightLabelView.width - 4;
$.rightLabel.color = args.config.right.color;
$.rightImageView.right = 0;
$.rightImageView.width = $.main.height;
$.rightImage.width = $.rightImageView.width - 4;
$.rightImage.height = $.rightImage.width;

$.leftLabel.text = args.data.homeClub.name;
$.leftImage.image = args.data.homeClub.logo;
$.rightLabel.text = args.data.awayClub.name;
$.rightImage.image = args.data.awayClub.logo;
$.timeLabel.text = Alloy.Moment.unix(args.data.datetime).format('HH:mm');
$.dateLabel.text = Alloy.Moment.unix(args.data.datetime).format('D MMM YYYY');
