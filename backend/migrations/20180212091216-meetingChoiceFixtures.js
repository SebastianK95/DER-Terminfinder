'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    var sql = "INSERT INTO MeetingChoice (`finderId`, `date`, `time`,`isprivat`) VALUES ";
    sql += "(1, 20180504, 1013,1), ";
    sql += "(1, 20180504, null,0);";
    return db.runSql(sql, function (err) {
        if (err) {
            throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
        }
        console.log("SQL executed successfully: " + sql)
    });
};

exports.down = function (db) {
    const sql = "DELETE FROM MeetingChoice WHERE `finderId` IN (1) AND `date` LIKE 12022018";
    return db.runSql(sql, function (err) {
        if (err) {
            throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
        }
        console.log("SQL executed successfully: " + sql)
    });
};

exports._meta = {
    "version": 1
};
