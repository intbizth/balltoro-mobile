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

                if (_.isNull(data[i])) {
                    data[i] = '';
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
    var methods = {};

    methods = manger.filterMethod(methods, value);

    return methods;
};
