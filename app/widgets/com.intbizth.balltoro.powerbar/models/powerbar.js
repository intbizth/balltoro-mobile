exports.definition = {
    config : {
        columns : {
            leftvalue : 'INTEGER',
            rightvalue : 'INTEGER'
        },
        defaults : {
            leftvalue : 0,
            rightvalue : 0
        },
        adapter : {
            type : 'properties',
            collection_name : 'powerbar'
        }
    }
};
