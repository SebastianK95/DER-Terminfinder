import {Component} from '@angular/core';
import {SessionService} from './services/session.service';
import {EventService} from './services/event.service';
import {Route} from './types/Route';
import {ROUTES} from './app.routes';
import {InfrastructureAwareInterface} from './InfrastructureAwareInterface';
import {ResolveEnd, Router} from '@angular/router';
import { Session } from './entity/session';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements InfrastructureAwareInterface {
    title = 'Der Terminfinder';

    routes = [];


    constructor(private sessionService: SessionService, private eventService: EventService, private router: Router) {
        this.eventService.appStarted.emit();
        this.sessionService.userIsLoggedIn().then((userIsLoggedIn) => this.filterRoutes(userIsLoggedIn));

        this.eventService.loginStateUpdated.subscribe(AppComponent.name, (payload) => {
            this.filterRoutes(payload.userIsLoggedIn)
        });
    }

    private filterRoutes(userIsLoggedIn) {
        this.routes = ROUTES.filter((route) => {
            return this.navLinkExists(route) && this.requirementsAreMet(route, userIsLoggedIn);
        }).map((route) => {
            return route.data.routeLink
        });
        this.highlightActiveRoute();
    }

    private navLinkExists(route) {
        return route.data && route.data.routeLink;
    }

    private requirementsAreMet(route, userIsLoggedIn) {
        return this.noRequirementsExist(route) || this.loginRequirementAndStatusMatch(route, userIsLoggedIn);
    }

    private noRequirementsExist(route) {
        return !route.data.requirements;
    }

    private loginRequirementAndStatusMatch(route, userIsLoggedIn) {
        return route.data.requirements.loggedIn === userIsLoggedIn;
    }

    private highlightActiveRoute() {
        this.router.events.forEach((event) => {
                if (event instanceof ResolveEnd) {
                    this.routes.forEach((route) => {
                        route.active = route.path === event.url;
                    })
                }
            }
        );
    }

    /**
     * Gibt die aktuelle UserID zurück.
     * @return int|false Wenn der User nicht angemeldet ist, wird false zurückgegeben.
     */
    get userId() {
        var _session = localStorage.getItem('session');
        var _userId = 0;
        if (_session !== null) {
            _userId = Session.fromString(_session).user.id;
        }
        return _userId;
    }

    isActiveRoute(route: Route) {
        return route.active ? 'activeNav' : '';
    }

    getEventService(): EventService {
        return this.eventService;
    }

    getSessionService(): SessionService {
        return this.sessionService;
    }

    async call(route: Route) {
        await route.callable(this)
    }
}
