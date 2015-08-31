var manger = require('model/manger');

exports.createModelMethod = function(value) {
    var methods = {
        transformDataToMatchlabel : function() {
            /**
             * # template
             * - after
             * - before
             * - gameafter
             * - gamebefore
             * - gamelive
             * - gamelivehalftime
             */

            var dataModel = this.toJSON();
            var data = {
                id : 'id',
                homeIcon : 'home_club._links.logo.href',
                homeName : 'home_club.name',
                homeScore : 'home_score',
                awayIcon : 'away_club._links.logo.href',
                awayName : 'away_club.name',
                awayScore : 'away_score',
                datetime : 'start_time'
            };

            for (var i in data) {
                data[i] = manger.traverseProperties(dataModel, data[i]);

                if (dataModel[i]) {
                    data[i] = dataModel[i];
                } else {
                    if (_.isNull(data[i])) {
                        data[i] = '';
                    }
                }
            }

            data.template = 'before';

            var unixtime = Alloy.Moment(data.datetime).unix();

            var attrs = {
                id : data.id,
                template : data.template,
                leftIcon : data.homeIcon,
                leftLabel : data.homeName,
                rightIcon : data.awayIcon,
                rightLabel : data.awayName,
                scoreLabel : data.homeScore + ' - ' + data.awayScore,
                startTimeLabel : Alloy.Moment.unix(unixtime).format('HH:mm'),
                startDateLabel : Alloy.Moment.unix(unixtime).format('D MMM YYYY'),
            };

            return attrs;
        }
    };

    methods = manger.filterMethod(methods, value);

    return methods;
};

exports.createCollectionMethod = function(value) {
    var methods = {
        fakeData : function() {
            var placehold = require('placehold.it');
            var chance = require('chance.min'),
                chance = new chance();
            var data = [];

            for (var i = 1; i <= 20; i++) {
                var datetime = chance.timestamp();
                datetime = Alloy.Moment.unix(datetime).format('YYYY-MM-DD') + 'T' + Alloy.Moment.unix(datetime).format('HH:mm:ss') + '+0700';

                data.push({
                    id : chance.hash(),
                    homeIcon : placehold.createURL({
                        width : 30,
                        height : 30
                    }).image,
                    homeName : chance.word(),
                    homeScore : chance.integer({
                        min : 0,
                        max : 99
                    }),
                    awayIcon : placehold.createURL({
                        width : 30,
                        height : 30
                    }).image,
                    awayName : chance.word(),
                    awayScore : chance.integer({
                        min : 0,
                        max : 99
                    }),
                    datetime : datetime
                });
            }

            data = _.sortBy(data, 'datetime').reverse();

            this.reset(data);
        }
    };

    methods = manger.filterMethod(methods, value);

    return methods;
};
