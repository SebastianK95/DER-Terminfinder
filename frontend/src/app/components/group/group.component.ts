import { Component, OnInit } from '@angular/core';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
import {MessageBoxService} from '../../services/message-box.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GroupApiGatewayService} from '../../services/gateways/group-api-gateway.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

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
  
  constructor(
    private general:GeneralApiGateway,
    private router:Router,
    private route:ActivatedRoute,
    private configure:ConfigureService,
    private ms:MessageBoxService,
    private groupApi:GroupApiGatewayService
  ) {
    this.myUserId = this.route.snapshot.params['userId'];
  }
  
  async getRequestData() {
    var data, self = this;
    data = this.general.select(
      'Group',
      ['id', 'name', 'description', 'benutzernamen', 'memberIds', 'userId', 'finderIds', 'finderNames'],
      {
        operator: 'OR',
        userId: self.myUserId,
        memberIds: 'FIS:' + self.myUserId
      }
    );
    
    await data.then(function(data) {
      if(data.data.length > 0) {
        for(var i = 0; i < data.data.length; i++) {
          if(data.data[i].benutzernamen !== null) {
            self.errorState[data.data[i].id] = false;
            data.data[i].benutzernamen = JSON.parse(data.data[i].benutzernamen);
          } else {
            self.errorState[data.data[i].id] = true;
            self.errorMessages[data.data[i].id] = ['Zu der Gruppen existieren keine Benutzer'];
          }
          if(data.data[i].finderNames !== null) {
            data.data[i].finderNames = JSON.parse(data.data[i].finderNames);
          }
        }
      } else {
        self.errorState[0] = true;
        self.errorMessages[0] = ['Zu Ihrem Account wurden keine Datensätze gefunden'];
      }
      self.data = data.data;
    });
    
  }
  
  public expand(id) {
    this.expanded = (this.expanded === true) ? false : true;
    this.expandId = id;
  }
  
  async removeUserFromGroup(userId, groupId) {
    await this.groupApi.removeFromFinder(parseInt(userId, 10), parseInt(groupId, 10));
  }

  
  ngOnInit() {
    this.getRequestData();
  }
}