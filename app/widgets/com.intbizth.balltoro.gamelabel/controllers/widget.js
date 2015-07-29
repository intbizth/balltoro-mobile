var config = require(WPATH('config'));

Ti.API.error(config, Widget.Collections.gamelabel);

var args = {
	config : config.before,
	data : {
		homeClub : {
			name : '',
			logo : ''
		},
		awayClub : {
			name : '',
			logo : ''
		},
		datetime : 0
	}
};

$.main.add(Widget.createController('template/before', args).getView());
