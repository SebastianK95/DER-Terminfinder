import { Component, OnInit } from '@angular/core';
import {GroupApiGatewayService} from '../../services/gateways/group-api-gateway.service';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
import {MessageBoxService} from '../../services/message-box.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-group-to-finder',
  templateUrl: './add-group-to-finder.component.html',
  styleUrls: ['./add-group-to-finder.component.scss']
})
export class AddGroupToFinderComponent implements OnInit {

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
      'Finder',
      ['name', 'id'],
      {
        userId: self.userId
      }
    );
    await finderPromise.then(function(data) {
      if(data.data.length > 0) {
        self.finderData = data.data;
      }
    });
  }
  
  get finders() {
    return this.finderData;
  }
  
  async update(finderId) {
    await this.groupApi.addToFinder(parseInt(finderId, 10), this.groupId);
    this.location.back();
  }
  
  back() {
    this.location.back();
  }

  ngOnInit() {
    this.finderDataRequest();
  }
}
