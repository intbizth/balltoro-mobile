exports.definition = {
	config : {
		columns : {
			template : 'TEXT',
			homeClub : 'OBJECT',
			awayClub : 'OBJECT',
			time : 'INTEGER',
			datetime : 'INTEGER'
		},
		defaults : {
			template : '',
			homeClub : {},
			awayClub : {},
			time : 0,
			datetime : 0
		},
		adapter : {
			type : 'properties',
			collection_name : 'gamelabel'
		}
	}
};
