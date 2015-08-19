exports.definition = {
    config : {
        columns : {
            id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
            userId : 'TEXT',
            token : 'TEXT',
            updatedAt : 'INTEGER'
        },
        defaults : {
            userId : null,
            token : null,
            updatedAt : 0
        },
        adapter : {
            type : 'sql',
            collection_name : 'user',
            db_file : 'data.sqlite',
            db_name : 'user',
            idAttribute : 'id',
            remoteBackup : false
        }
    }
};
