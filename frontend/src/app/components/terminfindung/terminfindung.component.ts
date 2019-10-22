import {Component, OnInit} from '@angular/core';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {EventService} from '../../services/event.service';
import { Session } from '../../entity/session';

@Component({
    selector: 'app-terminfindung',
    templateUrl: './terminfindung.component.html',
    styleUrls: ['./terminfindung.component.scss']
})
export class TerminfindungComponent implements OnInit {

    /**
     * Bezeichnung der Terminfindung
     * @access private
     * var String
     */
    private bezeichnung: string = '';

    /**
     * Beschreibung der Terminfindung
     * [OPTIONAL]
     * @access private
     * var String
     */
    private beschreibung: string = '';

    /**
     * Fehlermeldungen
     * @access private
     * var Array
     */
    private errors = [];

    private user = {};

    constructor(private eventService: EventService, private general: GeneralApiGateway) {
    }


    /**
     *
     */
    validateInput() {
        if (this.bezeichnung !== '') {
          this.general.insert(
            'Finder',
            {
              name: this.bezeichnung,
              description: this.beschreibung,
              userId: this.user
            }).then(() => {
              this.eventService.successOccurred.emit({
                  title: 'Erfolgreich',
                  message: 'Der Terminpool wurde angelegt. Hier <a href="">klicken</a>z um Termine hinzuzufügen.'
              });
              location.assign('/pools/' + this.user)
          });
        } else {
            this.eventService.errorOccurred.emit({
                title: 'Fehlende Eingabe',
                message: 'Pflichtfeld "Bezeichnung" wurde nicht ausgefühlt'
            });
        }
    }

    ngOnInit() {
        this.user = Session.fromString(localStorage.getItem('session')).user.id;
    }

}
