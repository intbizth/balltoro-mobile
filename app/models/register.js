var manger = require('model/manger');

exports.definition = {
    config : {
        columns : {
            id : 'TEXT',
            username : 'TEXT',
            email : 'TEXT',
            firstName : 'TEXT',
            lastName : 'TEXT',
            password : 'TEXT',
            confirmPassword : 'TEXT',
            updatedAt : 'INTEGER'
        },
        defaults : {
            username : '',
            email : '',
            firstName : '',
            lastName : '',
            password : '',
            confirmPassword : '',
            updatedAt : 0
        },
        adapter : {
            type : 'sql',
            collection_name : 'register',
            db_file : 'data.sqlite',
            db_name : 'register',
            idAttribute : 'id',
            remoteBackup : false
        }
    },
    extendModel : function(Model) {
        function validStep(dataModel) {
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

        var methods = {
            validStep1 : function() {
                var dataModel = this.toJSON();

                return validStep(_.omit(dataModel, ['firstName', 'lastName']));
            },
            validStep2 : function() {
                var dataModel = this.toJSON();

                return validStep(_.omit(dataModel, ['username', 'email', 'password', 'confirmPassword']));
            },
            reset : function() {
                this.set(this.defaults);
                this.save();
            },
            fakeData : function() {
                var chance = require('chance.min'),
                    chance = new chance();
                var data = {
                    username : (chance.first() + chance.last()).toLowerCase(),
                    email : chance.email(),
                    firstName : chance.first(),
                    lastName : chance.last(),
                    password : chance.ssn({
                        dashes : false
                    }),
                    confirmPassword : '',
                    updatedAt : _.now()
                };

                data.confirmPassword = data.password;

                this.set(data);
                this.save();
            }
        };

        _.extend(Model.prototype, methods);

        return Model;
    }
};
