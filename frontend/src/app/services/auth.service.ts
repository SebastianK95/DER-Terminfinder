import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from './session.service';
import {EventService} from './event.service';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private sessionService: SessionService, private eventService: EventService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authenticate(route);
    }

    async authenticate(route: ActivatedRouteSnapshot): Promise<boolean> {
        const userIsLoggedIn = await this.sessionService.userIsLoggedIn();
        const requirements = route.data.requirements;

        if (requirements) {
            if (requirements.loggedIn && !userIsLoggedIn) {
                this.eventService.redirectOccurred.emit({
                    title: 'Umgeleitet',
                    message: 'Bitte loggen sie sich erstmal ein.'
                });
                location.assign('/login');
                return false;
            }
            if (!requirements.loggedIn && userIsLoggedIn) {
                this.eventService.redirectOccurred.emit({
                    title: 'Umgeleitet',
                    message: 'Bitte loggen sie sich erstmal aus.'
                });
                location.assign('/logout');
                return false;
            }
        }
        return true;
    }
}
