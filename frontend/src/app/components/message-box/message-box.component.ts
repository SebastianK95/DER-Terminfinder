import { Component, OnInit } from '@angular/core';
import { MessageBoxService } from '../../services/message-box.service';
declare var $:any;

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  constructor(private ms:MessageBoxService) {
    
  }
  ngOnInit() {}
  
  close() {
    this.ms.state = false;
  }
  
  get state() {
    return this.ms.state;
  }
  
  get config() {
    return this.ms.config;
  }

}
