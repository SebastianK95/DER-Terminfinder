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
    var sql = "INSERT INTO `Group` (`name`, `description`, `memberIds`, `userId`, `finderIds`) VALUES ";
    sql += "('GruenWaldOrganisation', 'ggggggg', '2,3,4,5,6', 1, NULL), ";
    sql += "('SchuetzenvereinDEL', 'hhhhh', '1,4,5,7,8', 2, NULL);";
    return db.runSql(sql, function (err) {
        if(err){
            throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
        }
        console.log("SQL executed successfully: " + sql)
    });
};

exports.down = function(db) {
    const sql = "DELETE FROM Group WHERE `name` IN ('GruenWaldOrganisation', 'Schuetzenverein DEL')";
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
