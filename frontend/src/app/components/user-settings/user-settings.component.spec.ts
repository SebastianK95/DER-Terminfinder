import {UserSettingsComponent} from './user-settings.component';
import {User} from "../../entity/user";
import {EventService} from '../../services/event.service';


class MockUserService {
    userIsAuthorizedByEmail() {

    }

    updatePassword() {
    }
}

class MockSessionService {
    userIsLoggedIn() {
        return true
    }

    getUser() {
        return User.fromData({
            id: 1,
            name: 'test',
            email: 'test@test.de'
        })
    }
}

describe('UserSettingsComponent', () => {

    let userService;
    let sessionService;
    let eventService;
    let component: UserSettingsComponent;

    beforeEach(() => {
        userService = new MockUserService();
        sessionService = new MockSessionService();
        eventService = new EventService();
        component = new UserSettingsComponent(userService, sessionService, eventService);
    });

    it('should be created', () => {
        expect(component).toBeTruthy();

    });

    it('should create Success Message Box on Success', () => {
        let spy1 = spyOn(userService, 'userIsAuthorizedByEmail').and.returnValue(true);
        let spy2 = spyOn(userService, 'updatePassword').and.returnValue(true);
        let spy3 = spyOn(eventService.successOccurred, 'emit').and.callThrough();

        component.submit().then(() => {
            expect(userService.userIsAuthorizedByEmail).toHaveBeenCalled();
            expect(userService.updatePassword).toHaveBeenCalled();
            expect(eventService.successOccurred.emit).toHaveBeenCalledWith({
                title: 'Erfolg',
                message: 'Passwort wurde erfolgreich geändert.'
            });
        });
    });

    it('should create Failed Message Box on Failure', () => {
        let spy1 = spyOn(userService, 'userIsAuthorizedByEmail').and.returnValue(false);
        let spy3 = spyOn(eventService.errorOccurred, 'emit').and.callThrough();

        component.submit().then(() => {
            expect(userService.userIsAuthorizedByEmail).toHaveBeenCalled();
            expect(eventService.errorOccurred.emit).toHaveBeenCalledWith({
                title: 'Fehlgeschlagen',
                message: 'Das Ändern des Passworts ist fehlgeschlagen.'
            });
        });
    });
});
