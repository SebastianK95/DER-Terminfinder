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
    var sql = "INSERT INTO User (`name`, `email`, `password`) VALUES ";
    sql += "('Peter Petersen', 'peter@peter.de', '553f51db72852a623825a7b47448f59663c03eece84e251a6fee915fcf05acf1'), "; //pw: xXPeterXx123
    sql += "('Dummy', 'dummy@dummy.de', '18c2d56c180b61f5f7e0be8b61736e7e90fa7fdfba1a938a4536783ef9540c30'), "; //pw: OhaipefAEg5age
    sql += "('Max', 'maxkaemmerer.hb@gmail.com', 'bdfccb90bbe91a2b3eed18c7280709a96fea8c02c60ff9a310bda824cf058863'), "; //pw: sicher
    sql += "('Hannes', 'Hannes-Bruns@outlook.de', 'bdfccb90bbe91a2b3eed18c7280709a96fea8c02c60ff9a310bda824cf058863'), "; //pw: sicher
    sql += "('Alex', 'herrrheimlich@googlemail.com', 'bdfccb90bbe91a2b3eed18c7280709a96fea8c02c60ff9a310bda824cf058863'), "; //pw: sicher
    sql += "('Philip', 'philip.robben@web.de', 'bdfccb90bbe91a2b3eed18c7280709a96fea8c02c60ff9a310bda824cf058863'), "; //pw: sicher
    sql += "('Sebastian', 'sebastian.a.koers@hotmail.de', 'bdfccb90bbe91a2b3eed18c7280709a96fea8c02c60ff9a310bda824cf058863'), "; //pw: sicher
    sql += "('Silvio', 'silvio@silvio-kennecke.de', 'bdfccb90bbe91a2b3eed18c7280709a96fea8c02c60ff9a310bda824cf058863')"; //pw: sicher
    return db.runSql(sql, function (err) {
        if(err){
            throw new Error('SQL: "' + sql + '" is not valid! ' + err.message)
        }
        console.log("SQL executed successfully: " + sql)
    });
};

exports.down = function(db) {
    const sql = "DELETE FROM User WHERE `email` IN ('peter@peter.de', 'dummy@dummy.de', 'silvio@silvio-kennecke.de', 'sebastian.a.koers@hotmail.de', 'maxkaemmerer.hb@gmail.com', 'philip.robben@web.de', 'Hannes-Bruns@outlook.de', 'herrrheimlich@googlemail.com')";
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
