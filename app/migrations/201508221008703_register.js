migration.up = function(db) {
    db.createTable({
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
    });

    db.insertRow({
        username : '',
        email : '',
        firstName : '',
        lastName : '',
        password : '',
        confirmPassword : '',
        updatedAt : 0
    });
};

migration.down = function(db) {
    db.dropTable();
};
