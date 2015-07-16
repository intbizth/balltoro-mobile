migration.up = function(db) {
	db.createTable({
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
	});

	db.insertRow({
		userId : null,
		token : null,
		updatedAt : 0
	});
};

migration.down = function(db) {
	db.dropTable();
};
