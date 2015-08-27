exports.definition = {
    config : {
        adapter : {
            type : 'properties',
            collection_name : 'pages',
            idAttribute : 'id'
        },
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {
            transformDataToSlider : function() {
                var dataModel = this.toJSON();
                var attrs = dataModel;

                return attrs;
            }
        });

        return Model;
    },
    extendCollection : function(Collection) {
        var logoData = {
            template : 'logo',
            icon : 'images/nologin/logo.png',
            title : L('appname')
        };

        _.extend(Collection.prototype, {
            addData : function(values) {
                var data = [logoData];
                data.concat(values);

                this.reset(data);
            },
            fakeData : function() {
                var placehold = require('placehold.it');
                var chance = require('chance.min'),
                    chance = new chance();

                var data = [logoData];

                var random = chance.integer({
                    min : 0,
                    max : 10
                });

                for (var i = 0; i < random; i++) {
                    data.push({
                        template : 'page',
                        image : placehold.createURL({
                            width : 320,
                            height : 388
                        }).image,
                        url : chance.url()
                    });
                }

                this.reset(data);
            }
        });

        return Collection;
    }
};
