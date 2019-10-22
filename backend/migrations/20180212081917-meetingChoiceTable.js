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
  var sql = 'CREATE TABLE `MeetingChoice` (`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,`finderId` INTEGER NOT NULL,`date` INTEGER NOT NULL,`time` INTEGER,`isprivat` INTEGER NOT NULL);';
  return db.runSql(sql, function (err) {
    if (err) {
      throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
    }
    console.log("SQL executed successfully: " + sql)
  });
};

exports.down = function (db) {
  return db.dropTable('MeetingChoice');
};

exports._meta = {
  "version": 1
};
