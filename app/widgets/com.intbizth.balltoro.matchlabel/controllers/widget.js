Widget.moment = require('alloy/moment');

var chance = require('chance.min'),
    chance = new chance();

var data = [];

var random = chance.integer({
	min : 1,
	max : 20
});

for (var i = 1; i <= random; i++) {
	data.push({
		template : 'after',
		leftIcon : 'http://lorempixel.com/200/200/cats/200x200?hash=' + chance.hash(),
		leftLabel : chance.word(),
		rightIcon : 'http://lorempixel.com/200/200/cats/200x200?hash=' + chance.hash(),
		rightLabel : chance.word(),
		scoreLabel : chance.integer({
			min : 0,
			max : 99
		}) + ' - ' + chance.integer({
			min : 0,
			max : 99
		}),
		dateLabel : Widget.moment.unix(chance.timestamp()).format('D MMM YYYY'),
	});
}

Widget.Collections.matchelabel.reset(data);

console.debug(Widget.Collections.matchelabel.toJSON());

function itemclick(e) {
};

