var _exports = {
    matchesday : {
        URL : 'http://demo.balltoro.com/api/matches/day',
        debug : true,
        fake : true,
        adapter : {
            type : 'restapi',
            collection_name : 'matchesday',
            idAttribute : 'id'
        },
        parentNode : '_embedded.items'
    },
    matches : {
        URL : 'http://demo.balltoro.com/api/matches',
        debug : true,
        fake : true,
        adapter : {
            type : 'restapi',
            collection_name : 'matches',
            idAttribute : 'id'
        },
        parentNode : '_embedded.items'
    },
    programs : {
        URL : 'http://demo.balltoro.com/api/programs',
        debug : true,
        fake : true,
        adapter : {
            type : 'restapi',
            collection_name : 'programs',
            idAttribute : 'id'
        },
        parentNode : '_embedded.items'
    }
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
