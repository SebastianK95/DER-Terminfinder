import { Component, OnInit } from '@angular/core';
import { GeneralApiGateway } from '../../services/gateways/general-api-gateway.service';
import { ConfigureService } from '../../services/configure.service';
import { MessageBoxService } from '../../services/message-box.service';
import { Session } from '../../entity/session';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  
  public name:string = '';
  
  public description:string = '';
  
  public memberIds:string = '';
  
  public errorMessage = '';
  
  constructor(private general: GeneralApiGateway, private configure: ConfigureService, private message: MessageBoxService) {}
  
  validateInput() {
    for(var i = 0; i < this.configure.choosenUserBox().get().length; i++) {
      this.memberIds+= (i === 0 ? '' : ',') + this.configure.choosenUserBox().get()[i].id;
    }
    if(this.name === '' || this.memberIds === '') {
      if(this.name === '') {
        this.errorMessage+= 'Das Feld "Name" muss einen gültigen Gruppennamen enthalten<br><br>';
      }
      if(this.memberIds === '') {
        this.errorMessage+= 'Sie müssen mindestens einen Benutzer auswählen<br><br>';
      }
      this.message.show('Fehlgeschlagen', this.errorMessage);
      this.errorMessage = '';
    } else {
      this.general.insert('Group',
        {
          name: this.name,
          description: this.description,
          userId: Session.fromString(localStorage.getItem('session')).user.id,
          memberIds: this.memberIds
        }
      );
      this.message.show('Erfolgreich', 'Die Gruppe ' + this.name + ' wurde erfolgreich angelegt.');
      for(var i = 0; i < this.configure.choosenUserBox().get().length; i++) {
        this.general.sendMail(this.configure.choosenUserBox().get()[i].email,
          'DER Terminfinder: Gruppe "'+ this.name +'"',
          'Sie wurden der Gruppe "'+ this.name +'" im Tool "DER Terminfinder"<br>'+
          'hinzugefügt, um gemeinsame Termine für "' + this.name + '" festlegen zu können.'
        );
      }
    }
  }
  
  ngOnInit() {
  }

}
