import { Component, OnInit } from '@angular/core';
import { ConfigureService } from '../../services/configure.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  
  constructor(private configure:ConfigureService) { }
  
  get show() {
    return this.configure.showLoadingBarState;
  }
  
  ngOnInit() {
  }

}
