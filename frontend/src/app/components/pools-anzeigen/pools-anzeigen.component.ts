import {Component, OnInit} from '@angular/core';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
import {Router, ActivatedRoute} from '@angular/router';

import {Session} from '../../entity/session';
import { VotingCounterPipe } from '../../pipes/voting-counter.pipe';

@Component({
  selector: 'app-pools-anzeigen',
  templateUrl: './pools-anzeigen.component.html',
  styleUrls: ['./pools-anzeigen.component.scss']
})
export class PoolsAnzeigenComponent implements OnInit {
  
  /**
   * Array mit den Findern zzgl.
   * Informationen.
   * @access public
   * var Array
   */
  public data = [];
  
  /**
   * Status, ob eine Box
   * ein-/ oder ausgeklappt ist.
   * @access public
   * var Boolean
   */
  public expanded = false;
  
  /**
   * Fehlermeldungen zur DatensatzId.
   * @access public
   * var Object
   */
  public errorMessages = {};
  
  /**
   * Fehlerstatus zur DatensatzId.
   * @access public
   * var Object
   */
  public errorState = {};
  
  /**
   * Id des auszuklappenden Finders.
   * @access public
   * var Number
   */
  public expandId = 0;
  
  /**
   * UserId zum eingeloggten User.
   * @access public
   * var Number
   */
  public myUserId = 0;
  
  public voting = [];
  
  public newVoting = '';
  
  constructor(
    private general:GeneralApiGateway,
    private router:Router,
    private route:ActivatedRoute,
    private configure:ConfigureService,
  ) {
    this.myUserId = this.route.snapshot.params['userId'];
  }
  
  /**
   * Diese Methode ermittelt und parst alle Daten zum Finder.
   * @author Sebastian Koers
   */
  async finderData() {
    var self = this, data, i;
    
    this.configure.showLoadingBar();
    
    data = this.general.select(
      'Finder',
      ['id', 'name', 'description', 'userId', 'memberIds', 'terminDaten', 'benutzernamen', 'votes'],
      {
        operator: 'OR',
        userId: self.myUserId,
        memberIds: 'FIS:' + self.myUserId
      }
    );
    await data.then(function(data) {
      
      if(data.data.length > 0) {
        for(i = 0; i < data.data.length; i++) {
          // Für jeden Finder ein Voting-Objekt anlegen
          self.voting[data.data[i].id] = {};
          // Daten parsen
          data.data[i].benutzernamen = JSON.parse(data.data[i].benutzernamen);
          data.data[i].terminDaten = JSON.parse(data.data[i].terminDaten);
          data.data[i].votes = JSON.parse(data.data[i].votes);
        }
        
        for(i = 0; i < data.data.length; i++) {
          self.errorState[data.data[i].id] = false;
          if(data.data[i].terminDaten === null) {
            self.errorState[data.data[i].id] = true;
            self.errorMessages[data.data[i].id] = [];
            self.errorMessages[data.data[i].id].push('Zu diesem Pool existieren keine Termine');
          } else {
            // Wenn Termine vorhanden
            for(var j = 0; j < data.data[i].terminDaten.length; j++) {
              self.voting[data.data[i].id][data.data[i].terminDaten[j].ID] = [];
              for(var k = 0; k < data.data[i].benutzernamen.length; k++) {
                self.voting[data.data[i].id][data.data[i].terminDaten[j].ID][data.data[i].benutzernamen[k].ID] = [{STATUS:'', TYPE: 'default'}];
              }
              if(data.data[i].votes !== null) {
                
                for(var k = 0; k < data.data[i].votes.length; k++) {
                  if(data.data[i].terminDaten[j].ID === data.data[i].votes[k].TERMINID) {
                    self.voting[data.data[i].id][data.data[i].terminDaten[j].ID][data.data[i].votes[k].USERID].splice(0, 1);
                    self.voting[data.data[i].id][data.data[i].terminDaten[j].ID][data.data[i].votes[k].USERID].push(data.data[i].votes[k]);
                  }
                }
              }
            }
          }
        }
      } else {
        self.errorState[0] = true;
        self.errorMessages[0] = [];
        self.errorMessages[0].push('Zu Ihrem Account wurden keine Pools gefunden');
      }
      self.data = data.data;
      self.configure.showLoadingBar();
    });
  }
  
  public expand(id) {
    this.expanded = !(this.expanded === true);
    this.expandId = id;
  }
  
  ngOnInit() {
    this.finderData();
  }
  
  setVoting(terminId, finderId, userId) {
    if(userId === this.myUserId) {
      if(typeof this.voting[finderId][terminId][userId][0].TYPE === 'string'
        && this.voting[finderId][terminId][userId][0].TYPE === 'default'
      ) {
        this.general.insert(
          'Votes',
          {
            finderId: finderId,
            terminId: terminId,
            userId: this.myUserId,
            status: this.voting[finderId][terminId][userId][0].STATUS
          }
        );
      } else {
        this.general.update(
          'Votes', {
            status: this.voting[finderId][terminId][userId][0].STATUS
          }, {
            operator: 'AND',
            terminId: terminId,
            userId: userId
          }
        );
      }
    }
  }

  getVotingCount(datensatz, termin) {
    let userVotings = this.voting[datensatz.id][termin.ID];
    let counter = new VotingCounterPipe();
    return counter.transform(userVotings);
  }

  formatDate(date: number){
    const year = String(date).substr(0, 4);
    const month = String(date).substr(4, 2);
    const day = String(date).substr(6, 2);
    return day + '.' + month + '.' + year;
  }
}
