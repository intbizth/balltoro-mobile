var manger = require('model/manger');

exports.createModelMethod = function(value) {
    var methods = {
        transformDataToGrid : function() {
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

            var attrs = {
                id : data.id,
                headline : data.headline,
                image : data.image,
                userImage : data.userImage,
                userName : data.userName,
                datetime : Alloy.Moment(data.datetime).unix()
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

                        _data.push((dataModels.models[i]) ? dataModels.models[i].transformDataToGrid() : null);
                    }

                    data.push(_data);
                }
            }

            return data;
        },
        fakeData : function() {
            var placehold = require('placehold.it');
            var chance = require('chance.min'),
                chance = new chance();
            var data = [];

            for (var i = 1; i <= 20; i++) {
                data.push({
                    id : chance.hash(),
                    headline : chance.sentence(),
                    userImage : placehold.createURL({
                        width : 20,
                        height : 20
                    }).image,
                    userName : chance.name(),
                    datetime : chance.timestamp(),
                    _links : {
                        image : {
                            href : placehold.createURL({
                                width : 320,
                                height : 180
                            }).image
                        }
                    }
                });
            }

            data = _.sortBy(data, 'datetime').reverse();

            this.reset(data);
        }
    };

    methods = manger.filterMethod(methods, value);

    return methods;
};
