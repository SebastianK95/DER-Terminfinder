'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    const sql = "CREATE TABLE `User` (`id` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, `name` TEXT NOT NULL, `email` TEXT NOT NULL UNIQUE, `password` TEXT NOT NULL);";
    return db.runSql(sql, function (err) {
        if(err){
            throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
        }
        console.log("SQL executed successfully: " + sql)
    });
};

exports.down = function (db) {
    return db.dropTable('User');
};

exports._meta = {
    "version": 1
};
