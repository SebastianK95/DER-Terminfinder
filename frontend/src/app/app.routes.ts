import {Routes} from '@angular/router';
import {TerminfindungComponent} from './components/terminfindung/terminfindung.component';
import {TerminHinzufuegenComponent} from './components/termin-hinzufuegen/termin-hinzufuegen.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {UserSettingsComponent} from './components/user-settings/user-settings.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {CreateGroupComponent} from './components/create-group/create-group.component';
import {PoolsAnzeigenComponent} from './components/pools-anzeigen/pools-anzeigen.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthService} from './services/auth.service';
import {GroupComponent} from './components/group/group.component';
import {InfrastructureAwareInterface} from './InfrastructureAwareInterface';
import {AddUserToGroupComponent} from './components/add-user-to-group/add-user-to-group.component';
import {AddGroupToFinderComponent} from './components/add-group-to-finder/add-group-to-finder.component';
import {DelGroupFromFinderComponent} from './components/del-group-from-finder/del-group-from-finder.component';
import {Session} from './entity/session';

const _session = localStorage.getItem('session');

let userId = 0;
if (_session !== null) {
    let session = Session.fromString(_session);
    let user = session.user;
    userId = user.id;
}

// setze die Routen
export const ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            routeLink: {name: 'Dashboard', path: '/'}
        }
    },
    {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        canActivate: [AuthService],
        data: {requirements: {loggedIn: false}}
    },
    {
        path: 'changePassword/:token',
        component: ChangePasswordComponent,
        canActivate: [AuthService],
        data: {requirements: {loggedIn: false}}
    },
    {
        path: 'pools/:userId',
        component: PoolsAnzeigenComponent,
        canActivate: [AuthService],
        data: {
            requirements: {loggedIn: true},
            routeLink: {
                name: 'Pools', path: '/pools/' + userId
            }
        }
    },
    {
        path: 'pools/:userId/terminpool',
        component: TerminfindungComponent,
        canActivate: [AuthService],
        data: {requirements: {loggedIn: true}}
    },
    {
        path: 'pools/:userId/neuertermin/:finderId',
        component: TerminHinzufuegenComponent,
        canActivate: [AuthService],
        data: {
            requirements: {loggedIn: true}
        }
    },
    {
        path: 'groups/:userId',
        component: GroupComponent,
        canActivate: [AuthService],
        data: {
            requirements: {loggedIn: true},
            routeLink: {
                name: 'Gruppen', path: '/groups/' + userId
            }
        }
    },
    {
        path: 'groups/:userId/creategroup',
        component: CreateGroupComponent,
        canActivate: [AuthService],
        data: {requirements: {loggedIn: true}}
    },
    {
        path: 'settings',
        component: UserSettingsComponent,
        canActivate: [AuthService],
        data: {
            requirements: {loggedIn: true},
            routeLink: {
                name: 'Einstellungen', path: '/settings'
            }
        }
    },

    {
        path: 'register',
        component: RegisterFormComponent,
        canActivate: [AuthService],
        data: {
            requirements: {loggedIn: false},
            routeLink: {
                name: 'Register', path: '/register'
            }
        }
    },
    {
        path: 'login',
        component: LoginFormComponent,
        canActivate: [AuthService],
        data: {
            requirements: {loggedIn: false},
            routeLink: {
                name: 'Login', path: '/login'
            }
        }
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthService],
        data: {
            requirements: {loggedIn: true},
            routeLink: {
                name: 'Logout',
                path: '/logout',
                async callable(component: InfrastructureAwareInterface) {
                    await component.getSessionService().logoutUser();
                    component.getEventService().successOccurred.emit({
                        title: 'Ausgeloggt',
                        message: 'Sie wurden erfolgreich ausgeloggt.'
                    });
                    location.assign('/login');
                }
            }
        }
    },
    {
        path: 'groups/:userId/addUser/:groupId',
        component: AddUserToGroupComponent
    },
    {
        path: 'groups/:userId/addFinder/:groupId',
        component: AddGroupToFinderComponent
    },
    {
        path: 'groups/:userId/removeFinder/:groupId',
        component: DelGroupFromFinderComponent
    },
    // Fallback Route
    {
        path: '**',
        component: PageNotFoundComponent
    },
];