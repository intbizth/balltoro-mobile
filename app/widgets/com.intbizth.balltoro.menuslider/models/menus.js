exports.definition = {
    config : {
        adapter : {
            type : 'properties',
            collection_name : 'menus',
            idAttribute : 'id'
        },
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {

        });

        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {

        });

        return Collection;
    }
};
