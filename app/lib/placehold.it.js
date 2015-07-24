function createURL(args) {
	var data = {
		width : args.width || 600,
		height : args.height || 600,
		image : ''
	};

	data.width = data.width * (Ti.Platform.displayCaps.dpi / 160);
	data.height = data.height * (Ti.Platform.displayCaps.dpi / 160);

	var fontColor = Vendor.Tinycolor.random().toHex();
	var backgroundColor = Vendor.Tinycolor(fontColor);
	backgroundColor = backgroundColor.spin(Vendor.Chance.integer({
		min : -360,
		max : 360
	})).toHex();

	data.image = 'http://placehold.it/' + data.width + 'x' + data.height + '.png/' + fontColor + '/' + backgroundColor + '&text=' + data.width + 'x' + data.height;

	return data;
}

exports.createURL = function(args) {
	return createURL(args);
};

exports.createImageView = function(args) {
	var data = createURL(args);
	var image = Ti.UI.createImageView();
	image = _.extend(data);

	return image;
};
