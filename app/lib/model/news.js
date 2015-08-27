var manger = require('model/manger');

exports.createModelMethod = function(value) {
    var methods = {
        transformDataToPage : function() {
            var dataModel = this.toJSON();

            var data = {
                id : 'id',
                headline : 'headline',
                image : '_links.image.href',
                userImage : '_links.user_avatar.href',
                userName : 'user.displayname',
                datetime : 'published_date'
            };

            dataModel.image = '';

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

            var unixtime = Alloy.Moment(data.datetime).unix();

            var attrs = {
                id : data.id,
                headline : data.headline,
                image : data.image,
                userImage : data.userImage,
                userName : data.userName,
                timeLabel : Alloy.Moment.unix(unixtime).format('HH:mm'),
                dateLabel : Alloy.Moment.unix(unixtime).format('D MMM YYYY'),
            };

            return attrs;
        },
    };

    methods = manger.filterMethod(methods, value);

    return methods;
};

exports.createCollectionMethod = function(value) {
    var methods = {
        transformDataToGrid : function(grids) {
            var dataModels = this;
            var data = [];

            var length = dataModels.length;

            for (var i = 0; i < length; i++) {
                i = parseInt(i);

                for (var j in grids) {
                    var _data = [];

                    if (grids[j] > 1) {
                        i++;
                    }

                    for (var k = 0; k < grids[j]; k++) {
                        i += k;

                        dataModel = (dataModels.models[i]) ? dataModels.models[i].transformDataToPage() : null;

                        _data.push(dataModel);
                    }

                    data.push(_data);
                }
            }

            return data;
        }
    };

    methods = manger.filterMethod(methods, value);

    return methods;
};
