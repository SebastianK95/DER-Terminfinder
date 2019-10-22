import {Database} from 'sqlite3';
import {Logger} from '../Services/Logger';
import {SMTP_FROM} from "../config";
import {MailerContent} from "../Mailer/MailerContent";
import {DB} from "../DB";
import {Mailer} from "../Mailer/Mailer";

// Mappings
import { MappingManager } from '../Mappings/MappingManager';

export class GeneralRepository{
    
    private result: any;
    
    constructor(private db: Database) {}
    
    buildSubObject(value) {
      var ret = {}, tmp, objectSet = false;
      if(typeof value === 'string') {
        if(value.indexOf('NAME_') > -1) {
          tmp = value.split('NAME_');
          for(var j = 1; j < tmp.length; j++) {
            ret[tmp[j].substr(0, tmp[j].indexOf(':'))] = tmp[j].substr(tmp[j].indexOf(':') + 1, tmp[j].length);
          }
          objectSet = true;
        }
      }
      return (objectSet) ? ret : false;
    }
    
    /**
     * Diese Methode "baut" einen SELECT - Query.
     * @param    (string)    tableName    Der notwendige Tabellenname
     * @param    (string)    felder       Ein Array mit den auuzulistenden Feldern:
     *                                    [
     *                                      'feld1',
     *                                      'feld2',....
     *                                    ]
     * @param    (object)    filter       Objekt mit Filterargumenten fuer die Haupttabelle
     *                                    {
     *                                      'feld1': Wert fuer das das Feld
     *                                    }
     * @param    (object)    joins        Array mit Joinobjekten
     *                                    [
     *                                      {
     *                                        forField: Feldname aus dem Felderarray fuer den ein MApping verwendet werden soll.
     *                                        selectField: Feldname aus der Jointabelle, welches ermittelt werden soll
     *                                        joinTableName: Name der Jointabelle
     *                                        joinFilter: Filterobjekt
     *                                          {
     *                                            Feldname aus der Jointabelle: Wert
     *                                            (Wenn der Wert ein Feld aus der Haupttabelle sein soll, dann
     *                                            muss hier der Feldname in <> angeben werden)
     *                                          }
     *                                      }
     *                                    ]
     */
    async dynamicSelect(tableName: string, felder = [], filter = {}, joins = []) {
        
        var whereString = '', filterKeys = Object.keys(filter), tableAlias = tableName.substr(0, 2),
          felderString = '', setJoinField = false, joinString = '', tmpJoinString = '', mappings = MappingManager.getMappings(tableName)
        ;
        
        // Felderstring bilden
        for(var i = 0; i < felder.length; i++) {
          setJoinField = false;
          
          // Pruefung JOINS im Request
          for(var j = 0; j < joins.length; j++) {
            var joinAlias = (typeof joins[j].joinAlias === 'string') ? joins[j].joinAlias : joins[j].joinTableName.substr(0, 2);
            if(typeof joins[j].forField !== 'undefined' && felder[i] === joins[j].forField) {
              felderString+= (i === 0 ? '' : ',') + '`'+ joinAlias +'`.`'+ joins[j].selectField +'` AS `'+ joins[j].forField +'`';
              setJoinField = true;
              break;
            }
          }
          // "normales" Feld
          if(setJoinField === false) {
            if(mappings !== false) {
                if(typeof mappings[felder[i]] === 'object') {
                  felderString+= (felderString === '' ? '' : ',') + mappings[felder[i]].select + ' AS ' + felder[i];
                  tmpJoinString+= ' ' + mappings[felder[i]].join.replace(/ALIAS/g, '`' + tableAlias + '`');
                  setJoinField = true;
                }
            }
            if(setJoinField === false) {
              felderString+= (i === 0 ? '' : ',') + '`'+ tableAlias +'`.`'+ felder[i] +'`';
            }
            
          }
        }
        
        // WHERE - Bedienung bilden
        if(filterKeys.length > 0) {
          var findInSet = false, operator = 'AND';
          for(var i = 0; i < filterKeys.length; i++) {
            if(filterKeys[i] === 'operator') {
              operator = filter[filterKeys[i]];
              break;
            }
          }
          for(var i = 1; i < filterKeys.length; i++) {
                console.log(filter[filterKeys[i]]);
                if(typeof filter[filterKeys[i]] === 'string' && filter[filterKeys[i]].indexOf(',') > -1) {
                  var tmpValues = filter[filterKeys[i]].split(','), tmp = '';
                  for(var j = 0; j < tmpValues.length; j++) {
                    if(typeof tmpValues[j] === 'string') {
                      if(tmpValues[j].indexOf('*') > -1) {
                        tmpValues[j] = tmpValues[j].replace('*', '%');
                      }
                      tmpValues[j] = '"' + tmpValues[j] + '"';
                    }
                    tmp+= (j === 0 ? '' : ' OR ') + '`' + tableAlias + '`.`' + filterKeys[i] + '` ' +
                    (filter[filterKeys[i]].indexOf('%') > -1 ? 'LIKE' : '=') + ' ' + tmpValues[j];
                  }
                  whereString+= (i === 1 ? ' WHERE ' : ' ' + operator + ' ') + '(' + tmp + ')';
                } else {
                  if(typeof filter[filterKeys[i]] === 'string') {
                    if(filter[filterKeys[i]].indexOf('*') > -1) {
                      filter[filterKeys[i]] = filter[filterKeys[i]].replace('*', '%');
                    }
                    if(filter[filterKeys[i]].indexOf('FIS:') > -1) {
                      var tmpFis = filter[filterKeys[i]].split('FIS:');
                      findInSet = true;
                      filter[filterKeys[i]] = tmpFis[1];
                    }
                    filter[filterKeys[i]] = '"' + filter[filterKeys[i]] + '"';
                  } // ( '%' || spalte || '%', 'a,b,c,d' )
                  console.log('A')
                  if(findInSet === false) {
                    console.log('B')
                    whereString+= (i === 1 ? ' WHERE ' : ' ' + operator + ' ') + '`' + tableAlias + '`.`' + filterKeys[i] + '` ' +
                    (typeof filter[filterKeys[i]] === 'string' && filter[filterKeys[i]].indexOf('%') > -1 ? 'LIKE' : '=') + ' ' + filter[filterKeys[i]];
                  } else {
                    whereString+= (i === 1 ? ' WHERE ' : ' ' + operator + ' ') + ' LIKE("%" || ' + filter[filterKeys[i]] + ' || "%", ' +
                    '`' + tableAlias + '`.`' + filterKeys[i] + '`)';
                  }
                  findInSet = false;
                }
          }
        }
        
        //JOIN - Bedienung
        for(var i = 0; i < joins.length; i++) {
          console.log(i);
          var filterKeys = Object.keys(joins[i].joinFilter);
          var joinAlias = (typeof joins[i].joinAlias === 'string') ? joins[i].joinAlias : joins[i].joinTableName.substr(0, 2),
           operator = 'AND', findInSet = false, turnFindInSet = false
          ;
          for(var j = 0; j < filterKeys.length; j++) {
            if(filterKeys[j] === 'operator') {
              operator = joins[i].joinFilter[filterKeys[j]];
              break;
            }
          }
          tmpJoinString+= ' LEFT JOIN `' + joins[i].joinTableName + '` AS `' + joinAlias + '` ON ';
          console.log(tmpJoinString);
          
          // Join Filter
            if(filterKeys.length > 0) {
              for(var j = 0; j < filterKeys.length; j++) {
                findInSet = turnFindInSet = false;
                if(typeof joins[i].joinFilter[filterKeys[j]] === 'string' && joins[i].joinFilter[filterKeys[j]].indexOf(',') > -1) {
                  var tmpValues = joins[i].joinFilter[filterKeys[j]].split(','), tmp = '';
                  for(var k = 0; k < tmpValues.length; k++) {
                    if(typeof tmpValues[k] === 'string') {
                      tmpValues[k] = '"' + tmpValues[k] + '"';
                    }
                    tmp+= (j === 0 ? '' : ' OR ') + '`' + joinAlias +'`.`' + filterKeys[j] + '` = ' + tmpValues[k];
                  }
                  tmpJoinString+= (j === 0 ? '' : ' ' + operator + ' ') + '('+ tmp +')';
                } else {
                  if(typeof joins[i].joinFilter[filterKeys[j]] === 'string') {
                    if(joins[i].joinFilter[filterKeys[j]].indexOf('FIS:') > -1) {
                      var tmpFis = joins[i].joinFilter[filterKeys[j]].split('FIS:');
                      findInSet = true;
                      joins[i].joinFilter[filterKeys[j]] = tmpFis[1];
                    }
                    if((joins[i].joinFilter[filterKeys[j]].indexOf('<') > -1) && (joins[i].joinFilter[filterKeys[j]].indexOf('>') > -1)) {
                      if(joins[i].joinFilter[filterKeys[j]].indexOf('TURN:') > -1) {
                        var tmpFis = joins[i].joinFilter[filterKeys[j]].split('TURN:');
                        turnFindInSet = true;
                        joins[i].joinFilter[filterKeys[j]] = tmpFis[1];
                      }
                      joins[i].joinFilter[filterKeys[j]] = '`' + tableAlias + '`.`' + joins[i].joinFilter[filterKeys[j]].substr(1, joins[i].joinFilter[filterKeys[j]].length - 2) + '`';
                    } else {
                      joins[i].joinFilter[filterKeys[j]] = '"' + joins[i].joinFilter[filterKeys[j]] + '"';
                    }
                  }
                  if(findInSet === false && turnFindInSet === false) {
                    tmpJoinString+= (j === 0 ? '' : ' ' + operator + ' ') + '`' + joinAlias +'`.`' + filterKeys[j] + '` = ' + joins[i].joinFilter[filterKeys[j]];
                  } else if(findInSet === true) {
                    tmpJoinString+= (j === 0 ? '' : ' ' + operator + ' ') + ' LIKE("%" || ' + joins[i].joinFilter[filterKeys[j]] + ' || "%", ' + '`' + joinAlias +'`.`' + filterKeys[j] + '`)'
                  } else if(turnFindInSet === true) {
                    tmpJoinString+= (j === 0 ? '' : ' ' + operator + ' ') + ' LIKE("%" || ' + joins[i].joinFilter[filterKeys[j]] + ' || "%", ' + '`' + joinAlias +'`.`' + filterKeys[j] + '`)'
                  }
                }
              }
            }
        }
        
        joinString = tmpJoinString;
        console.log('SELECT ' + felderString + ' FROM `' + tableName + '` AS `' + tableAlias + '`' + joinString + whereString)
        // Query ausfuehren
        await new Promise((resolve, reject) => {
            var returnData = {}, ret = [], keys = [], valueFound, datensatzGefunden = false, pushValue, self = this;
            this.db.all('SELECT ' + felderString + ' FROM `' + tableName + '` AS `' + tableAlias + '`' + joinString + whereString, {
            }, (err, rows) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    reject(err);
                } else {
                    for(var i = 0; i < rows.length; i++) {
                      // Row ist bereits vorhanden
                      if(typeof returnData[rows[i].id] === 'object') {
                        for(var p in rows[i]) {
                          // Prop bereits ein Array
                          if(Array.isArray(returnData[rows[i].id][p])) {
                            pushValue = self.buildSubObject(rows[i][p]);
                            if(pushValue === false && returnData[rows[i].id][p].indexOf(rows[i][p]) <= -1) {
                              returnData[rows[i].id][p].push(rows[i][p]);
                            } else if(pushValue) {
                                var found = false;
                                for(var j = 0; j < returnData[rows[i].id][p].length; j++) {
                                  for(var prop in pushValue) {
                                    found = false;
                                    if(returnData[rows[i].id][p][j][prop] !== pushValue[prop]) {
                                      break;
                                    } else {
                                      found = true;
                                    }
                                  }
                                  if(found) {
                                    break;
                                  }
                                }
                                if(found === false) {
                                  returnData[rows[i].id][p].push(pushValue);
                                }
                            }
                          // Prop kein Array und neue Prop entspricht nicht dem vorherigen Wert
                          } else if(returnData[rows[i].id][p] !== rows[i][p]) {
                            var tmpValue = self.buildSubObject(returnData[rows[i].id][p]);
                            /*pushValue = self.buildSubObject(rows[i][p]);
                            if(pushValue !== false && tmpValue !== false) {
                              for(var prop in pushValue) {
                                if(pushValue[prop] !== tmpValue[prop]) {
                                  returnData[rows[i].id][p] = [tmpValue, pushValue]
                                  break;
                                }
                              }
                            } else {
                              returnData[rows[i].id][p] = [
                                returnData[rows[i].id][p],
                                rows[i][p]
                              ];   
                            }*/
                            returnData[rows[i].id][p] = [
                                //(tmpValue !== false ? tmpValue : rows[i][p])
                              ];
                          }
                        }
                      // Row ist noch nicht vorhanden
                      } else {
                        returnData[rows[i].id] = {};
                        for(var p in rows[i]) {
                          pushValue = self.buildSubObject(rows[i][p]);
                          returnData[rows[i].id][p] = (pushValue !== false) ? [pushValue] : rows[i][p];
                        }
                      }
                    }
                    
                    for(var p in returnData) {
                      for(var prop in returnData[p]) {
                        if(Array.isArray(returnData[p][prop])) {
                          returnData[p][prop] = JSON.stringify(returnData[p][prop]);
                        }
                      }
                      ret.push(returnData[p]);
                    }
                    /*for(var i = 0; i < rows.length; i++) {
                        valueFound = false;
                        keys = Object.keys(rows[0]);
                        for(var j = 0; j < returnData.length; j++) {
                          // Datensatz bereits vorhanden
                          if(returnData[j].id === rows[i].id) {
                            valueFound = true;
                            for(var k = 0; k < keys.length; k++) {
                              // Wenn bereits ein Wert vorhanden ist.
                              //console.log(returnData[j][keys[k]])
                              //console.log(returnData[j][keys[k]] instanceof Array);
                              if(typeof returnData[j][keys[k]] !== 'object') {
                                console.log('BBBB' + rows[i][keys[k]]);
                                //if(returnData[j][keys[k]] !== rows[i][keys[k]]) {
                                  var tmp = returnData[j][keys[k]];
                                  returnData[j][keys[k]] = {'data':[]};
                                  console.log('AAAA' + rows[i][keys[k]]);
                                  if(typeof rows[i][keys[k]] === 'string' && rows[i][keys[k]].indexOf('NAME_') > -1) {
                                    var tmp = rows[i][keys[k]].split('NAME_'), tmpObj = {};
                                    console.log('vvvv' + tmp);
                                    for(var m = 1; m < tmp.length; m++) {
                                      tmpObj[tmp[m].substr(0, tmp[m].indexOf(':'))] = tmp[m].substr(tmp[m].indexOf(':') + 1, tmp[m].length);
                                    }
                                    console.log('-->' + JSON.stringify(tmpObj));
                                    returnData[j][keys[k]].data.push(JSON.stringify(tmpObj));  
                                  } else {
                                    returnData[j][keys[k]].data.push(tmp, rows[i][keys[k]]);
                                  }
                                //}
                              // Wenn bereits ein Array ist.
                              } else {
                                for(var m = 0; m < returnData[j][keys[k]].data.length; m++) {
                                  if(returnData[j][keys[k]].data[m] === rows[i][keys[k]]) {
                                    datensatzGefunden = true;
                                  }
                                }
                                //if(datensatzGefunden === false) {
                                  console.log('AAAA' + rows[i][keys[k]]);
                                  if(typeof rows[i][keys[k]] === 'string' && rows[i][keys[k]].indexOf('NAME_') > -1) {
                                    var tmp = rows[i][keys[k]].split('NAME_'), tmpObj = {};
                                    console.log('vvvv' + tmp);
                                    for(var m = 1; m < tmp.length; m++) {
                                      tmpObj[tmp[m].substr(0, tmp[m].indexOf(':'))] = tmp[m].substr(tmp[m].indexOf(':') + 1, tmp[m].length);
                                    }
                                    console.log('-->' + JSON.stringify(tmpObj));
                                    returnData[j][keys[k]].data.push(JSON.stringify(tmpObj));  
                                  } else {
                                    returnData[j][keys[k]].data.push(rows[i][keys[k]]);
                                  }
                                //}
                                datensatzGefunden = false;
                              }
                            }
                            break;
                          }
                        }
                        // Neuer Datensatz
                        if(valueFound === false) {
                          returnData.push(rows[i]);
                        }
                    }*/
                    /*for(var i = 0; i < returnData.length; i++) {
                      for(var j = 0; j < keys.length; j++) {
                        if(returnData[i][keys[j]] !== null) {
                            if(typeof returnData[i][keys[j]] === 'object') {
                              if(typeof returnData[i][keys[j]].data !== 'undefined') {
                                returnData[i][keys[j]] = JSON.stringify(returnData[i][keys[j]].data);
                              }
                            }
                        }
                      }
                    }*/
                    
                    this.result = ret;
                    //this.result = rows;
                    resolve();
                }
            });
        });
        return this.result;
    }
    
    async dynamicInsert(tableName: string, hinzufuegenFelder = {}) {
      var insertString = '', valueString = '', felderString = '',
        keys = Object.keys(hinzufuegenFelder)
      ;
      for(var i = 0; i < keys.length; i++) {
        valueString+= (i === 0 ? '' : ',') + keys[i];
        if(typeof hinzufuegenFelder[keys[i]] === 'string') {
          hinzufuegenFelder[keys[i]] = '"' + hinzufuegenFelder[keys[i]] + '"';
        }
        felderString+= (i === 0 ? '' : ',') + hinzufuegenFelder[keys[i]];
      }
      console.log('INSERT INTO `' + tableName + '` (' + valueString + ') VALUES (' + felderString + ')');
      await new Promise((resolve, reject) => {
            this.db.run('INSERT INTO `' + tableName + '` (' + valueString + ') VALUES (' + felderString + ')',
                {}, (err) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    this.result = false;
                    reject(err);
                } else {
                    this.result = true;
                    resolve();
                }
            });
        });
      return this.result;
    }
    
    async dynamicUpdate(tableName: string, aendernFelder: {}, filter = {}) {
      var updateString = '', valueString = '', filterString = '', operator = (typeof filter['operator'] === 'string') ? filter['operator'] : 'AND';
      for(var p in aendernFelder) {
        if(typeof aendernFelder[p] === 'string') {
          aendernFelder[p] = '"' + aendernFelder[p] + '"';
        }
        valueString+= (valueString === '' ? '' : ',') + 'SET `' + p + '` = ' + aendernFelder[p];
      }
      for(var p in filter) {
        if(p !== 'operator') {
            if(typeof filter[p] === 'string') {
              if(filter[p].indexOf('*') > -1) {
                filter[p] = filter[p].replace('*', '%');
              }
              filter[p] = '"' + filter[p] + '"';
            }
            
            filterString+= (filterString === '' ? 'WHERE ' : operator) + ' `' + p + '` = ' + filter[p];
        }
      }
      updateString = 'UPDATE `' + tableName + '` ' + valueString + ' ' + filterString;
      await new Promise((resolve, reject) => {
            this.db.run(updateString,
                {}, (err) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    this.result = false;
                    reject(err);
                } else {
                    this.result = true;
                    resolve();
                }
            });
        });
    }
    
    sendMail = function(emailTo, subject, message) {
        console.log('TESTMAIL');
        let content = new MailerContent();
        const mailer = new Mailer();
        content.from = SMTP_FROM;
        content.html = message + '<br><br>Ihr Terminfinder - Team';
        content.to = emailTo;
        content.subject = subject;
        mailer.send(content);
        Logger.info('E-Mail was send: ' + subject + 'to (' + emailTo + ')');
    };
    
    async select(tableName: string, felder: string = '*', filter = {}) {
        var whereString = '', filterKeys = Object.keys(filter);
        
        // WHERE - Bedienung bilden
        if(filterKeys.length > 0) {
          for(var i = 0; i < filterKeys.length; i++) {
            if(typeof filter[filterKeys[i]] === 'string') {
              filter[filterKeys[i]] = '"' + filter[filterKeys[i]] + '"';
            }
            whereString+= (i === 0 ? ' WHERE ' : ' AND ') + filterKeys[i] + ' = ' + filter[filterKeys[i]];
          }
        }
        
        // Query ausfuehren
        await new Promise((resolve, reject) => {
            this.db.all('SELECT ' + felder + ' FROM ' + tableName + whereString, {
            }, (err, rows) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    reject(err);
                } else {
                    //console.log(rows);
                    this.result = rows;
                    resolve();
                }
            });
        });
        return this.result;
    }
    
    async insert(tableName: string, hinzufuegenFelder) {
      var insertString = '', valueString = '', felderString = '',
        keys = Object.keys(hinzufuegenFelder)
      ;
      for(var i = 0; i < keys.length; i++) {
        valueString+= (i === 0 ? '' : ',') + keys[i];
        felderString+= (i === 0 ? '' : ',') + '"' + hinzufuegenFelder[keys[i]] + '"';
      }
      
      console.log('INSERT INTO ' + tableName + ' (' + valueString + ') VALUES (' + felderString + ')');
      
      await new Promise((resolve, reject) => {
            this.db.run('INSERT INTO ' + tableName + ' (' + valueString + ') VALUES (' + felderString + ')',
                {}, (err) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    this.result = false;
                    reject(err);
                } else {
                    this.result = true;
                }
            });
        });
      return this.result;
    }
}