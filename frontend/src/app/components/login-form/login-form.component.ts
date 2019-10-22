import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {SessionService} from "../../services/session.service";
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    email: string = '';
    password: string = '';

    // tslint:disable-next-line:max-line-length
    constructor(private us: UserService, private router: Router, private sessionService: SessionService, private eventService: EventService) {

    }

    ngOnInit() {
    }

    async login() {

        if (this.email !== '' && this.password !== '' && this.emailIsValid(this.email)) {
            if (await this.us.userIsAuthorizedByEmail(this.email, this.password)) {
                // Weiterleiten zum Dashboard
                await this.sessionService.loginUser(await this.us.getUser({email: this.email}));
                this.router.navigate(['/dashboard']);
            } else {
                // Fehlermeldung -> Einlogdaten ungültig
                this.eventService.errorOccurred.emit({message: 'Die Login Daten sind ungültig!'});
            }
            location.assign('/');

        }
        else {
            // Fehlermeldung -> Eingabe ungültig
            if (this.email === '') {
                this.eventService.errorOccurred.emit({message: 'Die E-Mail wurde nicht eingetragen'});
            } else if (this.password === '') {
                this.eventService.errorOccurred.emit({message: 'Das Kennwort wurde nicht eingetragen'});
            } else {
                this.eventService.errorOccurred.emit({message: 'Die E-Mail hat das falsche Format!'});
            }

        }
    }

    emailIsValid(email: string) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    resetPassword() {
        this.router.navigateByUrl('/resetPassword');
    }
}
