import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {UserService} from "../../services/user.service";
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    private password: string;
    private passwordConfirm: string;
    private showChange: boolean = false;
    private token = null;

    constructor(route: ActivatedRoute, private tokenService: TokenService, private userService: UserService, private eventService: EventService) {
        this.init(route);
    }


    async init(route) {
        let routeString = route.toString();
        let token = routeString.match(/url:\'changePassword\/(.*)\', path/)[1];
        let notExpired = await this.tokenService.tokenIsNotExpired(token);
        if (token !== null && notExpired) {
            this.showChange = true;
            this.token = token;
        } else {
            this.eventService.errorOccurred.emit({message: 'Dies ist kein valider token, entweder der Token ist inkorrekt oder er ist abgelaufen.'})
        }
    }


    async changePassword() {
        if (this.password === this.passwordConfirm) {
            let token = await this.tokenService.getToken(this.token);
            console.log(this.token);
            console.log(token);
            const tokenIsNotExpired = await this.tokenService.tokenIsNotExpired(token.tokenString);
            console.log(tokenIsNotExpired);
            if (token && tokenIsNotExpired) {
                let passwordChanged = await this.userService.updatePassword(token.userId, this.password);
                this.tokenService.setTokenAsUsed(this.token);
                if (passwordChanged) {
                    this.eventService.successOccurred.emit({message: 'Ihr Passwort wurde erfolgreich geändert, sie werden nun zur Login Seite weitergeleitet.'})
                    setTimeout(() => {
                        location.assign('/login');
                    }, 3000)
                } else {
                    this.eventService.errorOccurred.emit({message: 'Es gab einen Fehler beim ändern ihres Passworts.'})
                }
            } else {
                this.eventService.errorOccurred.emit({message: 'Dies ist kein valider token, entweder der Token ist inkorrekt oder er ist abgelaufen.'})
            }
        } else {
            this.eventService.errorOccurred.emit({message: 'Passwörter stimmen nicht überein.'})
        }
    }

    ngOnInit() {
    }

}
