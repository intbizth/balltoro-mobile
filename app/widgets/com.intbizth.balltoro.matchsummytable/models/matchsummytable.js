exports.definition = {
    config : {
        columns : {
            image : 'TEXT',
            title : 'TEXT'
        },
        defaults : {
            image : '',
            title : ''
        },
        adapter : {
            type : 'properties',
            collection_name : 'matchsummytable'
        }
    }
};
