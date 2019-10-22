import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {SessionService} from "../../services/session.service";
import 'rxjs/add/operator/switchMap';
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    private email: string;
    private showReset: boolean = false;

    constructor(private userService: UserService, private eventService: EventService, private sessionService: SessionService) {
        this.init();
    }

    private async init() {
        if (await this.sessionService.userIsLoggedIn()) {
            this.eventService.redirectOccurred.emit({reason: 'Sie sind bereits eingeloggt.'});
            setTimeout(() => {
                location.assign('/dashboard');
            }, 2000);
        } else {
            this.showReset = true;
        }
    }

    async submit() {
        if (this.userService.userExistsByEmail(this.email)) {
            let result = await this.userService.resetPassword(this.email);
            if (result) {
                this.eventService.successOccurred.emit({
                    title: 'Erfolgreich',
                    message: 'Es wurde Ihnen eine E-Mail zum zurücksetzen Ihres Passworts zugesandt.'
                });
                setTimeout(() => {
                    location.assign('/login');
                }, 3000)
            } else {
                this.eventService.errorOccurred.emit({
                    title: 'Fehler',
                    message: 'Es gab einen Fehler beim zurücksetzen ihres Passworts.'
                });
            }
        } else {
            this.eventService.errorOccurred.emit({
                title: 'Fehler',
                message: 'Es gibt keinen Benutzer mit dieser E-Mail Adresse.'
            });
        }
    }

    ngOnInit() {
    }
}
