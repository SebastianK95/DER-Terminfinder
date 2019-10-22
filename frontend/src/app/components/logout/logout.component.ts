import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }
  async logout() {
    await this.sessionService.logoutUser();
    location.assign('/login');
  }
}
