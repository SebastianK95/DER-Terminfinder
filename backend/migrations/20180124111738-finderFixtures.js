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

exports.up = function(db) {
    var sql = "INSERT INTO Finder (`name`, `userId`, `description`, `memberIds`) VALUES ";
    sql += "('Daily Scrum', '1', 'Very Good Description', null), ";
    sql += "('Planning', '1', null, null);";
    return db.runSql(sql, function (err) {
        if(err){
            throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
        }
        console.log("SQL executed successfully: " + sql)
    });
};

exports.down = function(db) {
    const sql = "DELETE FROM Finder WHERE `name` IN ('Daily Scrum', 'Planning') AND `userId` LIKE 1";
    return db.runSql(sql, function (err) {
        if(err){
            throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
        }
        console.log("SQL executed successfully: " + sql)
    });
};

exports._meta = {
    "version": 1
};
