var manger = require('model/manger');

exports.definition = {
    config : {
        columns : {
            id : 'TEXT',
            username : 'TEXT',
            email : 'TEXT',
            password : 'TEXT',
            confirmPassword : 'TEXT',
            firstName : 'TEXT',
            lastName : 'TEXT',
            updatedAt : 'INTEGER'
        },
        defaults : {
            username : '',
            email : '',
            password : '',
            confirmPassword : '',
            firstName : '',
            lastName : '',
            updatedAt : 0
        },
        adapter : {
            type : 'properties',
            collection_name : 'register',
            idAttribute : 'id'
        }
    },
    extendModel : function(Model) {
        var fields = {
            step1 : ['username', 'email', 'password', 'confirmPassword'],
            step2 : ['firstName', 'lastName']
        };

        function validStep(model, keys) {
            var dataModel = model.toJSON();

            dataModel = _.pick(dataModel, keys);

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

            if (dataModel.password && dataModel.confirmPassword && dataModel.password !== dataModel.confirmPassword) {
                output.result = false;
                output.fields.push('password');
                output.fields.push('confirmPassword');
            }

            output.fields = _.uniq(output.fields);

            return output;
        };

        function fakeData(model, keys) {
            var chance = require('chance.min'),
                chance = new chance();
            var data = {
                username : (chance.first() + chance.last()).toLowerCase(),
                email : chance.email(),
                password : chance.ssn({
                    dashes : false
                }),
                confirmPassword : '',
                firstName : chance.first(),
                lastName : chance.last(),
                updatedAt : _.now()
            };

            data.confirmPassword = data.password;

            data = _.pick(data, keys);

            model.set(data);
            model.save();
        };

        function reset(model, keys) {
            var data = _.pick(model.defaults, keys);

            model.set(data);
            model.save();
        };

        var methods = {
            validStep1 : function() {
                return validStep(this, fields.step1);
            },
            validStep2 : function() {
                return validStep(this, fields.step2);
            },
            fakeDataStep1 : function() {
                fakeData(this, fields.step1);
            },
            fakeDataStep2 : function() {
                fakeData(this, fields.step2);
            },
            resetStep1 : function() {
                reset(this, fields.step1);
            },
            resetStep2 : function() {
                reset(this, fields.step2);
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
