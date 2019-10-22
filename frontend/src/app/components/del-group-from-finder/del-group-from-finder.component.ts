import { Component, OnInit } from '@angular/core';
import {GroupApiGatewayService} from '../../services/gateways/group-api-gateway.service';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
import {MessageBoxService} from '../../services/message-box.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-del-group-from-finder',
  templateUrl: './del-group-from-finder.component.html',
  styleUrls: ['./del-group-from-finder.component.scss']
})
export class DelGroupFromFinderComponent implements OnInit {

  public groupId: Number = 0;
  
  public userId: Number = 0;
  
  public finderData = [];

  constructor(
    private groupApi:GroupApiGatewayService,
    private generalApi:GeneralApiGateway,
    private route:ActivatedRoute,
    private configure:ConfigureService,
    private ms:MessageBoxService,
    private location:Location
  ) {
    this.groupId = parseInt(this.route.snapshot.params['groupId'], 10);
    this.userId = parseInt(this.route.snapshot.params['userId'], 10);
  }
  
  async finderDataRequest() {
    var self = this, finderPromise;
    finderPromise = this.generalApi.select(
      'Group',
      ['finderNames', 'id'],
      {
        operator: 'AND',
        id: self.groupId
      }
    );
    await finderPromise.then(function(data) {
      if(data.data.length > 0) {
        for(var i = 0; i < data.data.length; i++) {
          if(data.data[i].finderNames !== null) {
            data.data[i].finderNames = JSON.parse(data.data[i].finderNames);
          }
        }
        self.finderData = data.data;
      }
    });
  }
  
  get finders() {
    return this.finderData;
  }
  
  async update(finderId) {
    await this.groupApi.removeFromFinder(parseInt(finderId, 10), this.groupId);
    this.location.back();
  }
  
  back() {
    this.location.back();
  }

  ngOnInit() {
    this.finderDataRequest();
  }

}
