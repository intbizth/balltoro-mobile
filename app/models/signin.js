var manger = require('model/manger');

exports.definition = {
    config : {
        columns : {
            id : 'TEXT',
            usernameOrEmail : 'TEXT',
            password : 'TEXT'
        },
        defaults : {
            usernameOrEmail : '',
            password : ''
        },
        adapter : {
            type : 'properties',
            collection_name : 'signin',
            idAttribute : 'id'
        }
    },
    extendModel : function(Model) {
        var methods = {
            valid : function() {
                var dataModel = this.toJSON();

                var output = {
                    result : true,
                    fields : []
                };

                for (var i in dataModel) {
                    if (dataModel[i] === '') {
                        output.result = false;
                        output.fields.push(i);
                    }
                }

                return output;
            },
            fakeData : function() {
                var chance = require('chance.min'),
                    chance = new chance();
                var data = {
                    usernameOrEmail : chance.pick([(chance.first() + chance.last()).toLowerCase(), chance.email()]),
                    password : chance.ssn({
                        dashes : false
                    })
                };

                this.set(data);
                this.save();
            },
            reset : function() {
                this.set(this.defaults);
                this.save();
            }
        };

        _.extend(Model.prototype, methods);

        return Model;
    }
};
