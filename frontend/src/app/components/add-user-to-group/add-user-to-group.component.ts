import { Component, OnInit } from '@angular/core';
import {GroupApiGatewayService} from '../../services/gateways/group-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
import {MessageBoxService} from '../../services/message-box.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.scss']
})
export class AddUserToGroupComponent implements OnInit {

  public groupId: Number = 0;

  constructor(
    private groupApi:GroupApiGatewayService,
    private route:ActivatedRoute,
    private configure:ConfigureService,
    private ms:MessageBoxService,
    private location:Location
  ) {
    this.groupId = parseInt(this.route.snapshot.params['groupId'], 10);
  }
  
  async update() {
    var userToAddList = this.configure.choosenUserBox().get(), i, userToAdd = '';
    for(i = 0; i < userToAddList.length; i++) {
      userToAdd+= (userToAdd !== '' ? ',' : '') + userToAddList[i].id;
    }
    await this.groupApi.addMembers(userToAdd, this.groupId);
    this.location.back();
  }
  
  back() {
    this.location.back();
  }

  ngOnInit() {
  }

}
