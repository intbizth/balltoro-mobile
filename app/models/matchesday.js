var manger = require('model/manger');
var paginator = require('model/paginator');

exports.definition = {
    config : {
        URL : 'http://demo.balltoro.com/api/matches/day',
        debug : true,
        adapter : {
            type : 'restapi',
            collection_name : 'matchesday',
            idAttribute : 'id'
        },
        parentNode : '_embedded.items'
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {
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
            },
        });

        return Model;
    },
    extendCollection : function(Collection) {
        var methods = {};

        methods = _.extend(methods, paginator.createMethod());

        _.extend(Collection.prototype, methods);

        return Collection;
    }
};
