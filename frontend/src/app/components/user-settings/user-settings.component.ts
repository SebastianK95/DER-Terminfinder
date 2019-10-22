import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {SessionService} from "../../services/session.service";
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

    private currentPassword: string;
    private newPassword: string;
    private show: boolean = false;

    constructor(private userService: UserService, private sessionService: SessionService, private eventService: EventService) {
        this.init();
    }

    private async init() {
        if (!await this.sessionService.userIsLoggedIn()) {
            this.eventService.redirectOccurred.emit({reason: 'Sie sind nicht eingeloggt und werden weitergeleitet.'});
            setTimeout(() => {
                location.assign('/login');
            }, 2000);
        } else {
            this.show = true;
        }
    }

    async submit() {
        let result = null;

        let user = this.sessionService.getUser();
        let userAuthorized = await this.userService.userIsAuthorizedByEmail(user.email, this.currentPassword);
        if (userAuthorized) {
            result = await this.userService.updatePassword(user.id, this.newPassword);
        }

        if (result !== null) {
            this.eventService.successOccurred.emit({title: 'Erfolg', message: 'Passwort wurde erfolgreich geändert.'});
        } else {
            this.eventService.errorOccurred.emit({
                title: 'Fehlgeschlagen',
                message: 'Das Ändern des Passworts ist fehlgeschlagen.'
            });
        }
    }

    ngOnInit() {

    }
}
