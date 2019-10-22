import {async} from '@angular/core/testing';

import {ResetPasswordComponent} from './reset-password.component';
import {EventService} from '../../services/event.service';

class MockUserService {
}

class MockSessionService {
    userIsLoggedIn() {
        return false
    }
}

describe('ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let userService;
    let eventService;
    let sessionService;
    beforeEach(async(() => {
        userService = new MockUserService();
        sessionService = new MockSessionService();
        eventService = new EventService();
        component = new ResetPasswordComponent(userService, eventService, sessionService);
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
